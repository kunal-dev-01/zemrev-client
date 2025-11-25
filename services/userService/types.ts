// services/userService/types.ts

import { RegisteredUser, Address } from "../authService/types";

export interface GetProfileResponse {
    status: string;
    data: {
        user: RegisteredUser;
    }
}

export interface UpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePasswordResponse {
    status: string;
    message: string;
}

export interface UpdateAddressRequest {
    address: Address;
}

export interface UpdateAddressResponse {
    status: string;
    data:{
        address: Address;
    }
}

export interface UpdateFullNameRequest {
    fullName: string;
}

export interface UpdateFullNameResponse {
    status: string;
    data:{
        fullName: string;
    }
}

export interface UserState {
    isLoading: boolean,
    isUpdating: boolean,
    userError: string | null,
}