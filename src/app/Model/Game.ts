import { Type } from "class-transformer";
import { Dimension } from "./Dimension";

export class Game {
    public name: string;
    public color: string;
    @Type(() => Dimension)
    public dimensions: Dimension[];
}