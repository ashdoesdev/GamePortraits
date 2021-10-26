import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './Components/app.component';
import { DragDropUploadDirective } from './Directives/drag-drop-upload.directive';
import { CanvasService } from './Services/canvas.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleDown, faChevronRight, faImage, faTimes } from '@fortawesome/free-solid-svg-icons'
import { HttpClientModule } from '@angular/common/http'
import { FetchDataService } from './Services/fetch-data.service';
import { GameSelectorComponent } from './Components/game-selector.component';
import { ImageUploadComponent } from './Components/image-upload.component';
import { SharedObservablesService } from './Services/shared-observables.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DragDropUploadDirective,
    ImageUploadComponent,
    GameSelectorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CanvasService,
    FetchDataService,
    SharedObservablesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faImage, faTimes, faChevronCircleDown, faChevronRight);
  }
 }
