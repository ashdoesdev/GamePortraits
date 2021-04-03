import { Type } from "class-transformer";
import { Game } from "./Game";

export class Games {
    @Type(() => Game)
    public games: Game[];
}