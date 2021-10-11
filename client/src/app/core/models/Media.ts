import { Actor } from "./Actor";
import { Screening } from "./Screening";

export interface Media {
    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    coverImageUrl: string;
    type: string;
    actors: Actor[];
    screenings: Screening[];
    averageRating: number;
}