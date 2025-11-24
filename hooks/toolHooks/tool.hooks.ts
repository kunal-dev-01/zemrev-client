// src/hooks/toolHooks/tool.hooks.ts

import { useState, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  setFingerprint,
  setGuestCredentials,
  setCredits,
} from '@/services/authService/auth.slice';
import { useLazyGetCreditStatusQuery } from '@/services/authService/auth.api';
import { getFingerprint } from '@/utils/fingerprint.util';

interface UseToolGuardOptions {
  requiredCredits?: number;
  onInsufficientCredits?: () => void;
  onGuestInitialized?: () => void;
  onError?: (error: string) => void;
}

interface CreditsShape {
  remaining?: number | string;
  [k: string]: any;
}

interface ToolGuardResult {
  canUseTool: () => Promise<boolean>;
  ensureInitialized: () => Promise<boolean>;
  isInitializing: boolean;
  hasEnoughCredits: boolean;
  creditsRemaining: number | string;
  isGuest: boolean;
  isRegistered: boolean;
  isAnonymous: boolean;
}

// Hook to guard access to tools
export const useToolGuard = (options: UseToolGuardOptions = {}): ToolGuardResult => {
  const {
    requiredCredits = 1,
    onInsufficientCredits,
    onGuestInitialized,
    onError,
  } = options;

  const dispatch = useAppDispatch();

  const {
    userType,
    guestUser,
    credits,
    fingerprint: storedFingerprint,
    isAuthenticated,
  } = useAppSelector((s) => s.auth);

  // lazy query to call /credit/status (auto-creates guest if needed)
  const [triggerGetCredits, { isLoading }] = useLazyGetCreditStatusQuery();

  const [isInitializing, setIsInitializing] = useState(false);

  // Ensure guest or registered user is available; will auto-create guest by calling credit status
  const ensureInitialized = useCallback(async (): Promise<boolean> => {
    // If already registered and authenticated — done
    if (userType === 'registered' && isAuthenticated) return true;

    // If already a guest and guest data present — done
    if (userType === 'guest' && guestUser) return true;

    setIsInitializing(true);
    try {
      const fp = storedFingerprint ?? (await getFingerprint());
      dispatch(setFingerprint(fp));

      // call server which will return credits and possibly guest credentials
      const result = await triggerGetCredits().unwrap();

      if (result?.data?.guest) {
        dispatch(
          setGuestCredentials({
            guest: result.data.guest,
            fingerprint: fp,
          })
        );
      }

      if (result?.data?.credits) {
        dispatch(setCredits(result.data.credits));
      }

      onGuestInitialized?.();
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to initialize user';
      console.error('ensureInitialized error:', err);
      onError?.(msg);
      return false;
    } finally {
      setIsInitializing(false);
    }
  }, [
    userType,
    isAuthenticated,
    guestUser,
    storedFingerprint,
    dispatch,
    triggerGetCredits,
    onGuestInitialized,
    onError,
  ]);

  // Readable remaining credits value
  const creditsRemaining = useMemo<number | string>(() => {
    const rem = (credits as CreditsShape | undefined)?.remaining;
    return rem ?? 0;
  }, [credits]);

  // Pure check for having enough credits
  const hasEnoughCredits = useCallback((): boolean => {
    const rem = creditsRemaining;
    if (typeof rem === 'number') return rem >= requiredCredits;
    // if string parse to number if possible
    const parsed = typeof rem === 'string' ? Number(rem) : NaN;
    return !Number.isNaN(parsed) && parsed >= requiredCredits;
  }, [creditsRemaining, requiredCredits]);

  // Main guard to check initialization + credits
  const canUseTool = useCallback(async (): Promise<boolean> => {
    try {
      const initialized = await ensureInitialized();
      if (!initialized) {
        onError?.('Failed to initialize user');
        return false;
      }

      if (!hasEnoughCredits()) {
        onInsufficientCredits?.();
        return false;
      }

      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to verify tool access';
      console.error('canUseTool error:', err);
      onError?.(msg);
      return false;
    }
  }, [ensureInitialized, hasEnoughCredits, onInsufficientCredits, onError]);

  // Derived booleans
  const isGuest = userType === 'guest';
  const isRegistered = userType === 'registered';
  const isAnonymous = userType === 'anonymous';

  return {
    canUseTool,
    ensureInitialized,
    isInitializing: isInitializing || isLoading,
    hasEnoughCredits: hasEnoughCredits(),
    creditsRemaining,
    isGuest,
    isRegistered,
    isAnonymous,
  };
};
