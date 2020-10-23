import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iFlightDetail } from '../models';

@Component({
  selector: 'app-flights-detail',
  templateUrl: './flights-detail.component.html',
  styleUrls: ['./flights-detail.component.scss']
})
export class FlightsDetailComponent implements OnInit {
  @Output() showFlightId = new EventEmitter<any>();
  @Input() flight: iFlightDetail;
  
  constructor() { }

  ngOnInit() {
  }

  showFlightInformation(flightId) {
    this.showFlightId.emit(flightId);
  }

}
