export type CreateUserPayload = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export type UserResponse = {
    message: string;
    data: {
        name: string;
        email: string;
        role: string;
        updated_at: string;
        created_at: string;
        id: number;
    };
};

export type UserFailureResponse = {
    email: string[];
};

