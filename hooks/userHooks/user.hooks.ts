// src/hooks/userHooks/user.hooks.ts

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxHooks/redux.hooks';
import {
  useGetProfileQuery,
  useUpdatePasswordMutation,
  useUpdatePhoneNumberMutation,
  useUpdateAddressMutation,
  useUpdateFullNameMutation,
} from '@/services/userService/user.api';
import { setUserError, clearUserError } from '@/services/userService/user.slice';
import {
  updateRegisteredUser,
  updateAddress as updateAuthAddress,
  updateFullName as updateAuthFullName,
  updatePhoneNumber as updateAuthPhoneNumber,
} from '@/services/authService/auth.slice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type {
  UpdatePasswordRequest,
  UpdatePhoneNumberRequest,
  UpdateAddressRequest,
  UpdateFullNameRequest,
} from '@/services/userService/types';
import type { Address } from '@/services/authService/types';

// Extract error message
const extractApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError | unknown
): string => {
  if (!error) return 'Something went wrong';
  if ('status' in (error as FetchBaseQueryError)) {
    const fetchError = error as FetchBaseQueryError;
    const errorData = fetchError.data as {
      message?: string;
      error?: string;
    };
    return errorData?.message || errorData?.error || 'Request failed';
  }
  if ('message' in (error as SerializedError)) {
    return (error as SerializedError).message || 'Something went wrong';
  }
  return 'Unexpected error occurred';
};

export const useUser = () => {
  const dispatch = useAppDispatch();

  // RTK Query mutations and query
  const { data: profileData, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetProfileQuery();
  const [updatePasswordMutation, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();
  const [updatePhoneNumberMutation, { isLoading: isUpdatingPhone }] = useUpdatePhoneNumberMutation();
  const [updateAddressMutation, { isLoading: isUpdatingAddress }] = useUpdateAddressMutation();
  const [updateFullNameMutation, { isLoading: isUpdatingName }] = useUpdateFullNameMutation();

  // Redux state
  const { isUpdating, userError } = useAppSelector((state) => state.user);
  const currentUser = useAppSelector((state) => state.auth.registeredUser);

  // ==================== GET PROFILE ====================
  const getProfile = useCallback(async (): Promise<boolean> => {
    try {
      dispatch(clearUserError());
      const result = await refetchProfile().unwrap();
      
      if (result.user) {
        dispatch(updateRegisteredUser(result.user));
      }
      
      return true;
    } catch (err: unknown) {
      const errorMessage = extractApiErrorMessage(err);
      dispatch(setUserError(errorMessage));
      return false;
    }
  }, [refetchProfile, dispatch]);

  // ==================== UPDATE PASSWORD ====================
  const updatePassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<boolean> => {
      try {
        dispatch(clearUserError());
        const credentials: UpdatePasswordRequest = { oldPassword, newPassword };
        await updatePasswordMutation(credentials).unwrap();
        return true;
      } catch (err: unknown) {
        const errorMessage = extractApiErrorMessage(err);
        dispatch(setUserError(errorMessage));
        return false;
      }
    },
    [updatePasswordMutation, dispatch]
  );

  // ==================== UPDATE PHONE NUMBER ====================
  const updatePhoneNumber = useCallback(
    async (phoneNumber: string): Promise<boolean> => {
      try {
        dispatch(clearUserError());
        const credentials: UpdatePhoneNumberRequest = { phoneNumber };
        const result = await updatePhoneNumberMutation(credentials).unwrap();
        
        if (result.data?.phoneNumber) {
          dispatch(updateAuthPhoneNumber(result.data.phoneNumber));
        }
        
        return true;
      } catch (err: unknown) {
        const errorMessage = extractApiErrorMessage(err);
        dispatch(setUserError(errorMessage));
        return false;
      }
    },
    [updatePhoneNumberMutation, dispatch]
  );

  // ==================== UPDATE ADDRESS ====================
  const updateAddress = useCallback(
    async (address: Address): Promise<boolean> => {
      try {
        dispatch(clearUserError());
        const credentials: UpdateAddressRequest = { address };
        const result = await updateAddressMutation(credentials).unwrap();
        
        if (result.data?.address) {
          dispatch(updateAuthAddress(result.data.address));
        }
        
        return true;
      } catch (err: unknown) {
        const errorMessage = extractApiErrorMessage(err);
        dispatch(setUserError(errorMessage));
        return false;
      }
    },
    [updateAddressMutation, dispatch]
  );

  // ==================== UPDATE FULL NAME ====================
  const updateFullName = useCallback(
    async (fullName: string): Promise<boolean> => {
      try {
        dispatch(clearUserError());
        const credentials: UpdateFullNameRequest = { fullName };
        const result = await updateFullNameMutation(credentials).unwrap();
        
        if (result.data?.fullName) {
          dispatch(updateAuthFullName(result.data.fullName));
        }
        
        return true;
      } catch (err: unknown) {
        const errorMessage = extractApiErrorMessage(err);
        dispatch(setUserError(errorMessage));
        return false;
      }
    },
    [updateFullNameMutation, dispatch]
  );

  // ==================== CLEAR ERROR ====================
  const clearError = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Combined loading state
  const isLoading = 
    isLoadingProfile || 
    isUpdatingPassword || 
    isUpdatingPhone || 
    isUpdatingAddress || 
    isUpdatingName || 
    isUpdating;

  return {
    // Operations
    getProfile,
    updatePassword,
    updatePhoneNumber,
    updateAddress,
    updateFullName,
    clearError,

    // Status & Data
    isLoading,
    isLoadingProfile,
    isUpdatingPassword,
    isUpdatingPhone,
    isUpdatingAddress,
    isUpdatingName,
    userError,
    user: currentUser,
    profileData: profileData?.user,
  };
};