import { User } from "./user";

export interface Profile {
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    bio: string;
    image?: string;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    title: string;
    url: string;
    isMain: boolean;
    date: Date;
}
