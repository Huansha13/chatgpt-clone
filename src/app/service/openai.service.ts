
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://magicloops.dev/api/loop/53a6d80b-1b71-490f-bcac-b38c416ec245/run';

  constructor(private http: HttpClient) {}

  magicloopsRun(value: string): Observable<any> {
    const body = { question: value };
    return this.http.post<any>(this.apiUrl, body);
  }
}
