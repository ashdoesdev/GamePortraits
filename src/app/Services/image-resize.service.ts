import { Injectable } from "@angular/core";
import { Game } from "../Model/Game";
import { Games } from "../Model/Games";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";
import { plainToClass } from "class-transformer";

@Injectable()
export class ImageResizeService {
    private _imageSource: File;
    private _games: Games;

    public selectedGame: Game;
    public savableCanvas = new Array<[Canvas, string]>();

    public setGames(pojo: Games) {
        let games = plainToClass<Games, object>(Games, pojo);
        this._games = games;
    }

    public get games(): Game[] {
        return this._games?.games;
    }

    public setImageSource(image: File, refreshCallback?) {
        this._imageSource = image;   
        
        refreshCallback ? refreshCallback() : null;

        let imageSource = new fabric.Canvas('imageSource', { width: 50, height: 50 });
        this.previewImage(image, imageSource);

        for (let dimension of this.selectedGame.dimensions) {
            let canvas = new fabric.Canvas(`${dimension.name}`);

            
            this.savableCanvas.push([canvas, dimension.name]);

            this.previewImage(image, canvas);
        }
    }

    public get imageSource(): File {
        return this._imageSource;
    }

    private previewImage(event: File, canvas: Canvas) {
        var reader  = new FileReader();
        var img = new Image();

        img.onload = function() {
            var canvasAspect = canvas.width / canvas.height;
            var imgAspect = img.width / img.height;
            var left, top, scaleFactor;
    
            if (canvasAspect >= imgAspect) {
                scaleFactor = canvas.width / img.width;
                left = 0;
                top = -((img.height * scaleFactor) - canvas.height) / 2;
            } else {
                scaleFactor = canvas.height / img.height;
                top = 0;
                left = -((img.width * scaleFactor) - canvas.width) / 2;
            }


            var image = new fabric.Image(img, {
                scaleX: scaleFactor,
                scaleY: scaleFactor
            });
            canvas.controlsAboveOverlay = true
            canvas.centerObject(image);
            canvas.add(image);
            canvas.renderAll();
        }

        reader.onloadend = function () {
            img.src = reader.result as string;
        }
        
        reader.readAsDataURL(event);
    }
}