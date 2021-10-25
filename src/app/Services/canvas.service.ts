import { Injectable } from "@angular/core";
import { Game } from "../Model/Game";
import { Games } from "../Model/Games";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";
import { plainToClass } from "class-transformer";
import { SaveableArea } from "../Model/SaveableArea";

@Injectable()
export class CanvasService {
    private _games: Games;

    public selectedGame: Game;
    public imageSource: File;
    public primaryCanvas: Canvas;
    public saveableAreas = new Array<SaveableArea>();

    public setGames(pojo: Games) {
        let games = plainToClass<Games, object>(Games, pojo);
        this._games = games;
    }

    public get games(): Game[] {
        return this._games?.games;
    }

    public setImageSource(image: File, refreshCallback?) {
        this.imageSource = image;

        refreshCallback ? refreshCallback() : null;

        let imageSource = new fabric.Canvas('imageSource', { width: 50, height: 50 });

        this.previewImage(image, imageSource);

        let minCanvasHeight = 0;

        for (let dimension of this.selectedGame.dimensions) {
            minCanvasHeight += dimension.height + 100;
        }

        minCanvasHeight += 200;

        this.primaryCanvas = new fabric.Canvas('canvas-main', { width: window.innerWidth, height: minCanvasHeight });

        let offset = 100;

        for (let dimension of this.selectedGame.dimensions) {
            let clipPath = new fabric.Rect({ width: dimension.width, height: dimension.height, top: offset, left: (window.innerWidth - dimension.width - 100), absolutePositioned: true });

            this.previewImage(image, this.primaryCanvas, clipPath, offset, dimension.name);

            offset += (dimension.height + 100);
            
            this.primaryCanvas.add(clipPath.set({backgroundColor: "#d3d3d3", fill: "#252525", selectable: false}));
        }

        this.primaryCanvas.controlsAboveOverlay = true

        refreshCallback ? refreshCallback() : null;
    }

    private previewImage(event: File, canvas: Canvas, clipPath?, offset?, name?) {
        var reader = new FileReader();
        var img = new Image();

        img.onload = (function () {
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
                image.left = clipPath.left;

                let area = new SaveableArea();
                area.bounds = clipPath;
                area.name = name;

                this.saveableAreas.push(area);
            }

            canvas.add(image);
            canvas.renderAll();
        }).bind(this);

        reader.onloadend = function (event) {
            img.src = reader.result as string;
        }

        event ? reader.readAsDataURL(event) : null;
    }
}