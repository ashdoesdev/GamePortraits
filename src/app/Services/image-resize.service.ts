import { Injectable } from "@angular/core";
import { Game } from "../Model/Game";
import { Games } from "../Model/Games";

@Injectable()
export class ImageResizeService {
    private _imageSource: File;
    private _games: Game[];

    public selectedGame: Game;

    public setGames(pojo: Games) {
        this._games = pojo.games;
    }

    public get games(): Game[] {
        return this._games;
    }

    public setImageSource(image: File, refreshCallback?) {
        this._imageSource = image;   
        
        refreshCallback ? refreshCallback() : null;

        let imageSource = document.getElementById('imageSource') as HTMLCanvasElement;
        this.previewImage(image, imageSource);

        let fullLength = document.getElementById('fullLength') as HTMLCanvasElement;
        this.previewImage(image, fullLength);

        let medium = document.getElementById('medium') as HTMLCanvasElement;
        this.previewImage(image, medium);

        let small = document.getElementById('small') as HTMLCanvasElement;
        this.previewImage(image, small);
    }

    public get imageSource(): File {
        return this._imageSource;
    }

    private previewImage(event: File, canvas: HTMLCanvasElement) {
        let context = canvas.getContext('2d');
        var reader  = new FileReader();
        var img = new Image();

        img.onload = function() {
            context.canvas.width = img.width;
            context.canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height,
                                   0, 0, canvas.clientWidth, canvas.clientHeight);
        }

        reader.onloadend = function () {
            img.src = reader.result as string;
        }
        
        reader.readAsDataURL(event);
    }
}