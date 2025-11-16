// services/userService/types.ts

import { boolean } from "zod";
import { RegisteredUser, Address } from "../authService/types";

export interface GetProfileResponse {
    user: RegisteredUser;
}

export interface UpdatePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePasswordResponse {
    status: string;
    message: string;
}

export interface UpdatePhoneNumberRequest {
    phoneNumber: string;
}

export interface UpdatePhoneNumberResponse {
    status: string;
    data:{
        phoneNumber: string;
    }
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