import { Type } from "class-transformer";
import { Dimension } from "./Dimension";

export class Game {
    public name: string;
    public color: string;
    public extension: string;
    public disabled?: boolean;

    @Type(() => Dimension)
    public dimensions: Dimension[];
}