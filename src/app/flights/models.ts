export interface iWorker {
	id: number;
	name :string;
}

export interface iFlightDetail {
    num : string;
    from : string;
    to :string;
    from_date : string;
    to_date : string;
    plane : string;
    duration : number;
    from_gate : number;
    to_gate :number;

}

export class iHttpErrorHandler {
    originalError?: any;
    errorNumber: number;
    message: string;
    friendlyMessage: string;
  }
  