import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkerService } from '../../services/worker.service';
import { iFlightDetail, iWorker } from './../models';

@Component({
  selector: 'app-worker-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsComponent implements OnInit {
  workers: iWorker[];
  flights: iFlightDetail[];

  public flight = new Subject<iFlightDetail>();

  private currentWorkerId: number;
  private currentFlightId: string;
  readonly duration: number = 2000;
  constructor(private workerService: WorkerService) { }

  ngOnInit() {
    
    // get all workers details
    this.workerService.getWorkerDetails()
      .pipe(
     
        catchError(err => {
          console.log(err);
          return of([]);
        }))
      .subscribe(workers => {
        this.workers = workers;
        this.showFlights(workers[0].id);
      });

    // set interval every 60 seconds
    interval(this.duration).subscribe(x => {
      this.workerService.getWorkerFlightsDetails(this.currentWorkerId).subscribe(flights => {
        this.flight.next(flights.find(res => res.num === this.currentFlightId));
      });
    });

  }

  // get workers all flights details
  showFlights(id) {
    this.currentWorkerId = id;
    this.currentFlightId = null;
    this.workerService.getWorkerFlightsDetails(id).subscribe(res => {
      this.flights = res;
      // check for null 
      if (res.length > 0)
        this.showFlightInformation(res[0].num);
    });
  }

  // get specif flight information
  showFlightInformation(flightId) {
    this.currentFlightId = flightId;
    this.flight.next(this.flights.find(res => res.num === flightId));
  }

}

