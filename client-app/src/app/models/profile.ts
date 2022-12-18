import { User } from "./user";

export interface Profile {
    username: string;
    firstName: string;
    image?: string;
    photos?: Photo[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.firstName = user.firstName;
        this.image = user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}
