import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDirective } from '@shared/directives/link.directive';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [LinkDirective, EditorComponent],
  imports: [CommonModule],
  exports: [LinkDirective, EditorComponent]
})
export class SharedModule {}
