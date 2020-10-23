import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
 
import { catchError, debounceTime, map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { iFlightDetail, iHttpErrorHandler, iWorker } from '../flights/models';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private url: string = "https://interview-mock.herokuapp.com/api/workers/";

  constructor(private http: HttpClient) {

  }

  getWorkerDetails(): Observable<iWorker[]> {
    return this.http.get<iWorker[]>(this.url)
      .pipe(map(response => response)
        , catchError((err: iHttpErrorHandler) => {
          err.friendlyMessage = "error in worker service";
          return throwError(err);
        }));
  }

  getWorkerFlightsDetails(flightId: number): Observable<iFlightDetail[]> {
    return this.http.get<iFlightDetail[]>(this.url + flightId)
      .pipe(map(response => response)
        , catchError((err: iHttpErrorHandler) => {
          err.friendlyMessage = "error in flight service";
          return throwError(err);
        }));
  }
}
