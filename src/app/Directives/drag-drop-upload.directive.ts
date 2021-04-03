import { Directive, EventEmitter, HostBinding, HostListener, Output } from "@angular/core";

@Directive({
    selector: '[dragDropUpload]'
  })
  export class DragDropUploadDirective {
    @HostBinding('class.dragged-over') draggedOver: boolean;
    @Output() imageDropped = new EventEmitter<File>();
  
    @HostListener('dragover', ['$event']) onDragOver(event) {
      this.manageDragState(event, true);
    }
  
    @HostListener('dragleave', ['$event']) public onDragLeave(event) {
      this.manageDragState(event, false);
    }
  
    @HostListener('drop', ['$event']) public onDrop(event) {
      this.manageDragState(event, false);

      let files = event.dataTransfer.files;
      
      if (files.length > 0) {
        var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (validTypes.indexOf(files[0].type) === -1) {
            alert("Invalid File Type");
            return false;
        }
 
        this.imageDropped.emit(files[0]);
      }
    }

    private manageDragState(event, draggedOver: boolean): void {
      event.preventDefault();
      event.stopPropagation();
      this.draggedOver = draggedOver;
    }
  }