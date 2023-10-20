export interface User {
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    bio: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    username?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    rePassword?: string;
}
