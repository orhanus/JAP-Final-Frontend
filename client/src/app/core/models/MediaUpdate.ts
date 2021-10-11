import { Actor } from "./Actor";

export interface MediaUpdate{
    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    coverImageUrl: string;
    type: string;
    actors: Actor[];
}