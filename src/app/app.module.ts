import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DragDropUploadDirective } from './Directives/drag-drop-upload.directive';
import { CanvasService } from './Services/canvas.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleDown, faImage, faTimes } from '@fortawesome/free-solid-svg-icons'
import { HttpClientModule } from '@angular/common/http'
import { FetchDataService } from './Services/fetch-data.service';
import { DimensionComponent } from './dimension.component';
import { GameSelectorComponent } from './game-selector.component';
import { ImageUploadComponent } from './image-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    DimensionComponent,
    DragDropUploadDirective,
    ImageUploadComponent,
    GameSelectorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    CanvasService,
    FetchDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faImage, faTimes, faChevronCircleDown);
  }
 }
