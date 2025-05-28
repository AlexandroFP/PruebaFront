import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CapacityDemand } from '../models/capacity-demand.model';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private readonly apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getCapacityDemands(): Observable<ApiResponse<CapacityDemand[]>> {
  return this.http.get<ApiResponse<CapacityDemand[]>>(`${this.apiUrl}/capacitydemand`);
}

deleteAllDemands(): Observable<string> {
  return this.http.delete(`${this.apiUrl}/capacitydemand/delete-all`, {
    responseType: 'text' 
  });
}

downloadValues(): Observable<string> {
  return this.http.post(
    `${this.apiUrl}/capacitydemand/download-data`, 
    {},
    { responseType: 'text' }
  );
}

}
