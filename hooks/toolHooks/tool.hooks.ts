// src/hooks/toolHooks/tool.hooks.ts

import { useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import { setFingerprint, setGuestCredentials, setCredits } from '@/services/authService/auth.slice';
import { useLazyGetCreditStatusQuery } from '@/services/authService/auth.api';
import { getFingerprint } from '@/utils/fingerprint.util';

interface UseToolGuardOptions {
  requiredCredits?: number; // Credits needed for this tool
  onInsufficientCredits?: () => void;
  onGuestInitialized?: () => void;
  onError?: (error: string) => void;
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

/**
 * Guard hook for tools that need credits
 * Automatically initializes guest if needed
 * Checks if user has enough credits
 * 
 * @example
 * ```typescript
 * const { canUseTool, hasEnoughCredits } = useToolGuard({
 *   requiredCredits: 5,
 *   onInsufficientCredits: () => router.push('/buy-credits'),
 * });
 * 
 * const handleToolUse = async () => {
 *   if (await canUseTool()) {
 *     // Use tool
 *   }
 * };
 * ```
 */
export const useToolGuard = (options: UseToolGuardOptions = {}): ToolGuardResult => {
  const { 
    requiredCredits = 1, 
    onInsufficientCredits, 
    onGuestInitialized,
    onError 
  } = options;

  const dispatch = useAppDispatch();
  const { 
    userType, 
    guestUser, 
    credits, 
    fingerprint: storedFingerprint,
    isAuthenticated 
  } = useAppSelector((state) => state.auth);

  const [triggerGetCredits, { isLoading }] = useLazyGetCreditStatusQuery();
  const [isInitializing, setIsInitializing] = useState(false);

  // ==================== ENSURE GUEST INITIALIZED ====================
  const ensureInitialized = useCallback(async (): Promise<boolean> => {
    try {
      // ✅ Already registered - good to go
      if (userType === 'registered' && isAuthenticated) {
        return true;
      }

      // ✅ Already guest - good to go
      if (userType === 'guest' && guestUser) {
        return true;
      }

      // ✅ Need to initialize guest
      setIsInitializing(true);

      const fp = storedFingerprint || (await getFingerprint());
      dispatch(setFingerprint(fp));

      // ✅ Call /credit/status - this auto-creates guest
      const result = await triggerGetCredits().unwrap();

      if (result.data.guest) {
        dispatch(
          setGuestCredentials({
            guest: result.data.guest,
            fingerprint: fp,
          })
        );
      }

      // ✅ Update credits in auth state
      if (result.data.credits) {
        dispatch(setCredits(result.data.credits));
      }

      onGuestInitialized?.();
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to initialize';
      console.error('Failed to initialize:', error);
      onError?.(errorMsg);
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

  // ==================== CHECK CREDITS AVAILABLE ====================
  const hasEnoughCredits = useCallback((): boolean => {
    if (!credits) return false;
    const remaining = credits.remaining;
    return typeof remaining === 'number' && remaining >= requiredCredits;
  }, [credits, requiredCredits]);

  // ==================== CHECK IF CAN USE TOOL ====================
  const canUseTool = useCallback(async (): Promise<boolean> => {
    try {
      // ✅ Step 1: Ensure user is initialized (guest or registered)
      const initialized = await ensureInitialized();
      if (!initialized) {
        onError?.('Failed to initialize user');
        return false;
      }

      // ✅ Step 2: Check if has enough credits
      const hasCredits = hasEnoughCredits();
      if (!hasCredits) {
        onInsufficientCredits?.();
        return false;
      }

      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to verify tool access';
      console.error('Tool guard error:', error);
      onError?.(errorMsg);
      return false;
    }
  }, [ensureInitialized, hasEnoughCredits, onInsufficientCredits, onError]);

  return {
    // Operations
    canUseTool,
    ensureInitialized,

    // Status
    isInitializing: isInitializing || isLoading,
    hasEnoughCredits: hasEnoughCredits(),
    creditsRemaining: credits?.remaining || 0,
    isGuest: userType === 'guest',
    isRegistered: userType === 'registered',
    isAnonymous: userType === 'anonymous',
  };
};