// services/userService/user.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";
import { extractErrorMessage } from "../authService/auth.slice";
import { userApi } from "./user.api";

const initialState: UserState = {
    isLoading: false,
    isUpdating: false,
    userError: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserError: (state, action: PayloadAction<string>) => {
            state.userError = action.payload;
        },
        clearUserError: (state) => {
            state.userError = null;
        }
    },
    extraReducers: (builder) => {
        // ==================== GET PROFILE ====================
        builder
            .addMatcher(
                userApi.endpoints.getProfile.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.userError = null;
                }
            )
            .addMatcher(
                userApi.endpoints.getProfile.matchFulfilled,
                (state) => {
                    state.isLoading = false;
                }
            )
            .addMatcher(
                userApi.endpoints.getProfile.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.userError = extractErrorMessage(action.error);
                }
            );

        // ==================== UPDATE OPERATIONS ====================
        const updateEndpoints = [
            userApi.endpoints.updatePassword,
            userApi.endpoints.updatePhoneNumber,
            userApi.endpoints.updateAddress,
            userApi.endpoints.updateFullName
        ];

        // Handle all update pending states
        updateEndpoints.forEach(endpoint => {
            builder.addMatcher(
                endpoint.matchPending,
                (state) => {
                    state.isUpdating = true;
                    state.userError = null;
                }
            );
        });

        // Handle all update fulfilled states
        updateEndpoints.forEach(endpoint => {
            builder.addMatcher(
                endpoint.matchFulfilled,
                (state) => {
                    state.isUpdating = false;
                }
            );
        });

        // Handle all update rejected states
        updateEndpoints.forEach(endpoint => {
            builder.addMatcher(
                endpoint.matchRejected,
                (state, action) => {
                    state.isUpdating = false;
                    state.userError = extractErrorMessage(action.error);
                }
            );
        });
    }
});

export const { setUserError, clearUserError } = userSlice.actions;

export default userSlice.reducer;