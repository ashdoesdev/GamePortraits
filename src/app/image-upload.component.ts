import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { FetchDataService } from './Services/fetch-data.service';
import { CanvasService } from './Services/canvas.service';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Output() sendRefresh = new EventEmitter<any>();
  @ViewChild('imageUpload') input: ElementRef; 

  constructor(private _imageResize: CanvasService) {}

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
    this.sendRefresh.emit();
  }

  public removeImage(): void {
    this.input.nativeElement.value = '';
    this._imageResize.setImageSource(null, this.refresh.bind(this));
  }
}
