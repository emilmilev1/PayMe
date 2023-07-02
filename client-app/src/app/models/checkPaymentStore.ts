import { Profile } from "./profile";

export interface CheckPaymentData {
    id: string;
    date: Date;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    total: number;
    zipCode: number;
    isHost: boolean;
    hostUsername: string;
    checkAttendees: Profile[];
}

export class CheckPayment {
    id!: string;
    date!: Date;
    firstName!: string;
    lastName!: string;
    address!: string;
    country!: string;
    total!: number;
    zipCode!: number;
    isHost!: boolean;
    hostUsername!: string;
    checkAttendees!: Profile[];

    constructor(init?: CheckPaymentFormValues) {
        Object.assign(this, init);
    }
}

export class CheckPaymentFormValues {
    id?: string = undefined;
    date: Date | null = null;
    firstName: string = "";
    lastName: string = "";
    address: string = "";
    country: string = "";
    zipCode!: number;
    total!: number;

    constructor(checkPayment?: CheckPaymentFormValues) {
        if (checkPayment) {
            this.id = checkPayment.id;
            this.date = checkPayment.date;
            this.firstName = checkPayment.firstName;
            this.lastName = checkPayment.lastName;
            this.address = checkPayment.address;
            this.country = checkPayment.country;
            this.zipCode = checkPayment.zipCode;
            this.total = checkPayment.total;
        }
    }
}
