import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Dimension } from './Model/Dimension';

@Component({
  selector: 'dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent {
  @Input() dimension: Dimension;

  private static __instanceCounter = 0;
  public instance: number;

  constructor() {
    this.instance = DimensionComponent.__instanceCounter++;
  }

  public get canvasId(): string {
    return this.dimension.name;
  }
    
  public get title(): string {
    return "Title";
  }

  public get width(): number {
    return this.dimension.width + 100;
  }

  public get height(): number {
    return this.dimension.height + 100;
  }
}
