import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkerService } from '../../services/worker.service';
import { iFlightDetail, iWorker } from './../models';

@Component({
  selector: 'app-worker-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  workers: iWorker[];
  flights: iFlightDetail[];

  public flight = new Subject<iFlightDetail>();

  private currentWorkerId: number;
  private currentFlightId: string;

  employees$: Subscription
  flightDetailsListener$: Subscription

  readonly duration: number = 60000;
  constructor(private workerService: WorkerService) { }

  ngOnInit() {

    // get all workers details
    this.employees$ = this.workerService.getWorkerDetails()
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        }))
      .subscribe(workers => {
        if (workers) {
          this.workers = workers;
          this.getEmployeeFlights(workers[0].id);
        }
      });

    // set interval every 60 seconds
    this.flightDetailsListener$ = interval(this.duration).subscribe(x => {
      this.workerService.getWorkerFlightsDetails(this.currentWorkerId).subscribe(flights => {
        if (flights)
          this.flight.next(flights.find(res => res.num === this.currentFlightId));
      });
    });

  }

  // get employee all flights details
  getEmployeeFlights(id) {
    this.currentWorkerId = id;
    // reset current flight
    this.currentFlightId = null;
    this.workerService.getWorkerFlightsDetails(id).subscribe(res => {
      if (res) {
        this.flights = res;
        this.showFlightInformation(res[0].num);
      }
    });
  }

  // get specific flight information
  showFlightInformation(flightId) {
    this.currentFlightId = flightId;
    const flight = this.flights.find(res => res.num === flightId);
    if (flight)
      this.flight.next(flight);
  }

  ngOnDestroy(): void {
    if (this.flightDetailsListener$) this.flightDetailsListener$.unsubscribe();
    if (this.employees$) this.employees$.unsubscribe();
  }

}


