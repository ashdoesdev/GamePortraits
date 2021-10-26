import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import * as JSZip from 'jszip';
import { Dimension } from '../Model/Dimension';
import { Game } from '../Model/Game';
import { FetchDataService } from '../Services/fetch-data.service';
import { CanvasService } from '../Services/canvas.service';
import { Subscription } from 'rxjs';
import { SharedObservablesService } from '../Services/shared-observables.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectToggled = false;
  public refreshSubscription: Subscription;
  
  constructor(
    private _imageResize: CanvasService,
    private _changeDetector: ChangeDetectorRef,
    private _fetchData: FetchDataService,
    private _sharedObservables: SharedObservablesService) {}

  ngOnInit() {
    this._fetchData.getGamePortraits().subscribe((res) => {
      this._imageResize.setGames(res);
    })

    this.refreshSubscription = this._sharedObservables.sendRefreshObservable$.subscribe((res) => {
      if (res) {
        this.refresh();
      }
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
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

  public get shouldShowScrollIndicator(): boolean {
    return document.body.scrollHeight > window.outerHeight && window.scrollY < 100;
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
    this._imageResize.primaryCanvas = null;
    this._imageResize.setImageSource(this._imageResize.imageSource, this.refresh.bind(this));
  }

  public setImageFromEvent(event) {
    let files = event.target.files;
      
    if (files.length > 0) {
      var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validTypes.indexOf(files[0].type) === -1) {
          alert("Invalid File Type");
          return false;
      }

      this.setImage(files[0]);
    }
  }

  public setImage(event: File): void {
    this._imageResize.setImageSource(event, this.refresh.bind(this));
  }

  public refresh(): void {
    this._changeDetector.detectChanges();
  }

  public toggleSelect(): void {
    this.selectToggled = !this.selectToggled;
  }

  public async downloadImages(): Promise<void> {
    var zip = new JSZip();

    for (let area of this._imageResize.saveableAreas) {
      var data = this._imageResize.primaryCanvas.toDataURL({ format: 'jpeg', top: area.bounds.top, left: area.bounds.left, width: area.bounds.width, height: area.bounds.height });
      zip.file(`${area.name}.jpg`, data.substr(22), {base64: true});
    }

    zip.generateAsync({type:"base64"}).then(function (base64) {
      location.href="data:application/zip;base64," + base64;
    });
  }
}
