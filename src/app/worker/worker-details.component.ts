import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subject } from 'rxjs';
import { WorkerService } from '../services/worker.service';
import { flightsDetail, workers } from './mockData';
import { iFlightDetail, iWorker } from './models';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkerDetailsComponent implements OnInit {
  workers: iWorker[];
  flights: iFlightDetail[];

  public flight = new Subject<iFlightDetail>();

  currentWorkerId :number;
  currentFlightId : string;
  constructor(private workerService: WorkerService) { }

  ngOnInit() {
    // get all workers details
    this.workerService.getWorkerDetails().subscribe(workers => {
      this.workers = workers;
      this.showFlights(workers[0].id);
    });
    
    // set interval every 60 seconds
    interval(4000).subscribe(x => {
      this.workerService.getWorkerFlightsDetails(this.currentWorkerId).subscribe(flights => {
        this.flight.next(flights.find(res => res.num === this.currentFlightId));
      });
    });

  }
  
  // get workers all flights details
  showFlights(id) {
    this.currentWorkerId = id;
    this.workerService.getWorkerFlightsDetails(id).subscribe(res => {
      this.currentFlightId =  this.currentFlightId  ?  this.currentFlightId : res[0].num;
      this.flights = res;
      // check for null 
      if (res.length > 0)
        this.showFlightInformation(this.currentFlightId);
    });
  }

  // get specif flight information
  showFlightInformation(flightId) {
    this.currentFlightId=flightId;
    this.flight.next(this.flights.find(res => res.num === flightId));
  }

}


