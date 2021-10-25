import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Game } from './Model/Game';
import { CanvasService } from './Services/canvas.service';

@Component({
  selector: 'game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent {
  @Output() sendRefresh = new EventEmitter<any>();

  constructor(private _imageResize: CanvasService) {}

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
    this._imageResize.setImageSource(null, this.refresh.bind(this));
  }

  public refresh(): void {
    this.sendRefresh.emit();
  }

  public isSelected(game: Game): boolean {
    return this._imageResize?.selectedGame?.name == game.name;
  }
}
