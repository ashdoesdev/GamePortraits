import { Injectable } from "@angular/core";
import { Game } from "../Model/Game";
import { Games } from "../Model/Games";
import { fabric } from "fabric";
import { Canvas, Rect } from "fabric/fabric-impl";
import { plainToClass } from "class-transformer";
import { SaveableArea } from "../Model/SaveableArea";

@Injectable()
export class ImageResizeService {
    private _imageSource: File;
    private _games: Games;

    public selectedGame: Game;
    public saveableAreas = new Array<SaveableArea>();
    public primaryCanvas: Canvas;

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

        this.primaryCanvas = new fabric.Canvas('canvas-main', { width: 1000, height: 2200 });

        let offset = 100;

        for (let dimension of this.selectedGame.dimensions) {
            let clipPath = new fabric.Rect({ width: dimension.width, height: dimension.height, top: offset, left: 0, absolutePositioned: true });

            this.previewImage(image, this.primaryCanvas, clipPath, offset, dimension.name);

            offset += (dimension.height + 100);
        }

    }

    public get imageSource(): File {
        return this._imageSource;
    }

    private previewImage(event: File, canvas: Canvas, clipPath?, offset?, name?) {
        var reader  = new FileReader();
        var img = new Image();

        img.onload = (function() {
            let boundsWidth = clipPath ? clipPath.width : canvas.width;
            let boundsHeight = clipPath ? clipPath.height : canvas.height;

            var canvasAspect = boundsWidth / boundsHeight;
            var imgAspect = img.width / img.height;
            var left, top, scaleFactor;
    
            if (canvasAspect >= imgAspect) {
                scaleFactor = boundsWidth / img.width;
                left = 0;
                top = -((img.height * scaleFactor) - boundsHeight) / 2;
            } else {
                scaleFactor = boundsHeight / img.height;
                top = 0;
                left = -((img.width * scaleFactor) - boundsWidth) / 2;
            }

            var image = new fabric.Image(img, {
                scaleX: scaleFactor,
                scaleY: scaleFactor
            });

            canvas.controlsAboveOverlay = true

            if (clipPath) {
                image.clipPath = clipPath;
                image.top = offset;
                            
                let area = new SaveableArea();
                area.image = image;
                area.bounds = clipPath;
                area.name = name;

                this.saveableAreas.push(area);
            }

            canvas.add(image);
            canvas.renderAll();
        }).bind(this);

        reader.onloadend = function () {
            img.src = reader.result as string;
        }
        
        reader.readAsDataURL(event);
    }
}