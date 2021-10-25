import { Component } from '@angular/core';
import { Game } from './Model/Game';
import { CanvasService } from './Services/canvas.service';
import { SharedObservablesService } from './Services/shared-observables.service';

@Component({
  selector: 'game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent {
  constructor(
    private _imageResize: CanvasService,
    private _sharedObservables: SharedObservablesService) {}

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

  public isDisabled(game: Game): boolean {
    return game.disabled;
  }

  public setSelectedGame(game: Game): void {
    this._sharedObservables.setImageInput('');
    this._imageResize.selectedGame = game;
    this._imageResize.setImageSource(null, this.refresh.bind(this));
  }

  public refresh(): void {
    this._sharedObservables.sendRefresh(true);
  }

  public isSelected(game: Game): boolean {
    return this._imageResize?.selectedGame?.name == game.name;
  }
}
