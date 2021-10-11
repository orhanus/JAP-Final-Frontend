import { Actor } from "./Actor";

export interface MediaAdd{
    title: string;
    description: string;
    releaseDate: Date;
    coverImageUrl: string;
    type: string;
    actors: Actor[];
}