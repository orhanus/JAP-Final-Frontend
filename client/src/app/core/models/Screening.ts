import { Address } from "./Address";


export interface Screening{
    id: number;
    movieTitle: string;
    screeningTime: Date;
    address: Address;
}