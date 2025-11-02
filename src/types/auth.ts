export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export interface AuthError {
    message: string;
    status: number;
}