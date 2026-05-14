export type CreateClassesPayload = {
    name: string;
    total_sessions: number;
    price: number;
};

export type ClassesResponse = {
    message: string;
    data: {
        name: string;
        total_sessions: number;
        price: number;
        updated_at: string;
        created_at: string;
        id: number;
    };
};

export type ClassesFailureResponse = {
    price: string[];
};

export type GetClassesResponse = {
    id: number;
    name: string;
    total_sessions: number;
    price: number;
}[];

export type DeleteClassesResponse = {
    message: string;
};
