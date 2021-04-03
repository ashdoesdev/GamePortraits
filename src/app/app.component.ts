import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import * as JSZip from 'jszip';
import { Dimension } from './Model/Dimension';
import { Game } from './Model/Game';
import { FetchDataService } from './Services/fetch-data.service';
import { ImageResizeService } from './Services/image-resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public shouldShowScrollArrow = true;
  public selectToggled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      if (this.shouldShowScrollArrow) {
        this.shouldShowScrollArrow = scrollOffset <= 100;
      }
  }
  
  constructor(
    private _imageResize: ImageResizeService,
    private _changeDetector: ChangeDetectorRef,
    private _fetchData: FetchDataService) {}


  ngOnInit() {
    this._fetchData.getGamePortraits().subscribe((res) => {
      this._imageResize.setGames(res);
    })
  }

  public get selectedGameName(): string {
    return this._imageResize.selectedGame?.name;
  }
  
  public get hasImageSource(): boolean {
    return this._imageResize.imageSource != null;
  }

  public get filename(): string {
    return this._imageResize.imageSource.name;
  }

  public get games(): Game[] {
    return this._imageResize.games;
  }

  public get selectedGame(): Game {
    return this._imageResize.selectedGame;
  }

  public getName(game: Game): string {
    return game.name;
  }

  public getColor(game: Game): string {
    return game?.color || "#666";
  }

  public getDimensions(game: Game): Dimension[] {
    return game.dimensions;
  }

  public getWidth(dimension: Dimension): number {
    return dimension.width;
  }

  public getHeight(dimension: Dimension): number {
    return dimension.height;
  }

  public setSelectedGame(game: Game): void {
    this._imageResize.selectedGame = game;
    if (this.selectToggled) {
      this.toggleSelect();
    }
  }

  public setImage(event: File): void {
    this.shouldShowScrollArrow = true;
    this._imageResize.setImageSource(event, this.refresh.bind(this));
  }

  public refresh(): void {
    this._changeDetector.detectChanges();
  }

  public removeImage(): void {
    this._imageResize.setImageSource(null, this.refresh.bind(this));
  }

  public toggleSelect(): void {
    this.selectToggled = !this.selectToggled;
  }

  public async downloadImages(): Promise<void> {
    var zip = new JSZip();

    for (let canvas of this._imageResize.savableCanvas) {
      var data = canvas[0].toDataURL();
      zip.file(`${canvas[1]}.jpg`, data.substr(22), {base64: true});
    }

    zip.generateAsync({type:"base64"}).then(function (base64) {
      location.href="data:application/zip;base64," + base64;
    });
  }
}
