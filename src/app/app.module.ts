import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragDropUploadDirective } from './Directives/drag-drop-upload.directive';
import { ImageResizeService } from './Services/image-resize.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleDown, faImage, faTimes } from '@fortawesome/free-solid-svg-icons'
import { HttpClientModule } from '@angular/common/http'
import { FetchDataService } from './Services/fetch-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DragDropUploadDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    ImageResizeService,
    FetchDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faImage, faTimes, faChevronCircleDown);
  }
 }
