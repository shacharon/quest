import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { WorkerService } from './services/worker.service';
 
import { HttpClientModule } from '@angular/common/http';
import { HoverRowDirective } from './directive/hover-row.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { EmployeeDetailsComponent } from './flights/employee/employee-details.component';
import { FlightsDetailComponent } from './flights/flights-detail/flights-detail.component';
 
@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    HoverRowDirective,
    DurationPipe,
    FlightsDetailComponent,
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
