import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, TopBannerComponent],
  exports: [HeaderComponent, FooterComponent, TopBannerComponent],
  imports: [CommonModule, SharedModule, HttpClientModule, InlineSVGModule.forRoot()]
})
export class CoreModule {}
