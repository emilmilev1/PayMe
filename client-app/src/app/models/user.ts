export interface User {
    username: string;
    firstName: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    firstName?: string;
    username?: string;
}
