import { Type } from "class-transformer";
import { Dimension } from "./Dimension";

export class Game {
    public name: string;
    public subtitle: string;
    public color: string;
    public extension: string;
    
    @Type(() => Dimension)
    public dimensions: Dimension[];
}