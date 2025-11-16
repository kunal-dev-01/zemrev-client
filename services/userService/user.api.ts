// services/userService/user.api.ts

import { baseApi } from "@/lib/baseApi/base.api";
import {
  GetProfileResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  UpdateFullNameRequest,
  UpdateFullNameResponse,
} from "./types";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ==================== GET PROFILE ====================
        getProfile: builder.query<GetProfileResponse, void>({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        // ==================== UPDATE PASSWORD ====================
        updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
            query: (credentials) => ({
                url: '/user/update-password',
                method: 'PATCH',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        // ==================== UPDATE PHONE NUMBER ====================
        updatePhoneNumber: builder.mutation<UpdatePhoneNumberResponse, UpdatePhoneNumberRequest>({
            query: (credentials) => ({
                url: '/user/update-phone-number',
                method: 'PATCH',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        // ==================== UPDATE ADDRESS ====================
        updateAddress: builder.mutation<UpdateAddressResponse, UpdateAddressRequest>({
            query: (credentials) => ({
                url: '/user/update-address',
                method: 'PATCH',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),

        // ==================== UPDATE FULL NAME ====================
        updateFullName: builder.mutation<UpdateFullNameResponse, UpdateFullNameRequest>({
            query: (credentials) => ({
                url: '/user/update-full-name',
                method: 'PATCH',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetProfileQuery,
    useUpdatePasswordMutation,
    useUpdatePhoneNumberMutation,
    useUpdateAddressMutation,
    useUpdateFullNameMutation,
} = userApi;
