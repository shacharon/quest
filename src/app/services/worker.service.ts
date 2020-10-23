import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { iFlightDetail, iWorker } from '../worker/models';
import { debounceTime, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private url: string = "https://interview-mock.herokuapp.com/api/workers/";
  
  public flight = new Subject<iFlightDetail>();
  
  flights: iFlightDetail[];
  
  
  constructor(private http: HttpClient) { 
 
  }

  getWorkerDetails(): Observable<iWorker[]> {
    return this.http.get<iWorker[]>(this.url)
      .pipe(map(response => response)
      );  
  }

  getWorkerFlightsDetails(flightId : number): Observable<iFlightDetail[]> {

    return this.http.get<iFlightDetail[]>(this.url +flightId)
      .pipe(map(response => response)
      );  
  }

}
