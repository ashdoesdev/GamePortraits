import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import * as JSZip from 'jszip';
import { Dimension } from './Model/Dimension';
import { Game } from './Model/Game';
import { FetchDataService } from './Services/fetch-data.service';
import { ImageResizeService } from './Services/image-resize.service';

@Component({
  selector: 'game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent {
 
  constructor(
    private _imageResize: ImageResizeService,
    private _changeDetector: ChangeDetectorRef,
    private _fetchData: FetchDataService) {}

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

  public getSubtitle(game: Game): string {
    return game.subtitle;
  }

  public setSelectedGame(game: Game): void {
    this._imageResize.selectedGame = game;
  }

  public isSelected(game: Game): boolean {
    return this._imageResize?.selectedGame?.name == game.name;
  }
}
