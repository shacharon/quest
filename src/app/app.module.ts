import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkerDetailsComponent } from './worker/worker-details.component';
import { WorkerService } from './services/worker.service';
 
import { HttpClientModule } from '@angular/common/http';
import { HoverRowDirective } from './directive/hover-row.directive';
@NgModule({
  declarations: [
    AppComponent,
    WorkerDetailsComponent,
    HoverRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
