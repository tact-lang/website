import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '@features/main/main-routing.module';
import { MainPageComponent } from 'src/app/features/main/main-page.component';
import { MainPageTitleComponent } from './components/main-page-title/main-page-title.component';

@NgModule({
  declarations: [MainPageComponent, MainPageTitleComponent],
  imports: [CommonModule, MainRoutingModule]
})
export class MainModule {}
