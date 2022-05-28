import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TuiHostedDropdownModule } from '@taiga-ui/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    TuiHostedDropdownModule
  ]
})
export class CoreModule {}
