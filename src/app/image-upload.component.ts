import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanvasService } from './Services/canvas.service';
import { SharedObservablesService } from './Services/shared-observables.service';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @ViewChild('imageUpload') input: ElementRef; 

  public inputSubscription: Subscription;

  constructor(
    private _imageResize: CanvasService,
    private _sharedObservables: SharedObservablesService) {}

  ngOnInit() {
    this.inputSubscription = this._sharedObservables.setImageInputObservable$.subscribe((res) => {
      this.setInputValue(res);
    });
  }

  ngOnDestroy() {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
  }

  public get hasImageSource(): boolean {
    return this._imageResize.imageSource != null;
  }

  public get filename(): string {
    return this._imageResize.imageSource.name;
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
    this._sharedObservables.sendRefresh(true);
  }

  public removeImage(): void {
    this.setInputValue('');
    this._imageResize.setImageSource(null, this.refresh.bind(this));
  }

  public setInputValue(value: string): void {
    if (this.input) {
      this.input.nativeElement.value = value;
    }
  }
}
