import { NgModule } from '@angular/core';
import { DeleteIconComponent } from './icons/delete-icon/delete-icon.component';
import { ConfirmIconComponent } from './icons/confirm-icon/confirm-icon.component';
import { UndoIconComponent } from './icons/undo-icon/undo-icon.component';
import { FowardIconComponent } from './icons/foward-icon/foward-icon.component';
import { BackIconComponent } from './icons/back-icon/back-icon.component';


@NgModule({
  declarations: [
    DeleteIconComponent,
    ConfirmIconComponent,
    UndoIconComponent,
    FowardIconComponent,
    BackIconComponent
  ],
  exports: [
    DeleteIconComponent,
    ConfirmIconComponent,
    UndoIconComponent,
    FowardIconComponent,
    BackIconComponent
  ],
})
export class SharedModule { }
