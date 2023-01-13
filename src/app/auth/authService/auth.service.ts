import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 apiBaseUrl: any = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // login api
  login (data: any): Observable<any> {
    const url = this.apiBaseUrl + 'apiRouter/login'
    return this.http.post(url, data, { observe: 'response' }).pipe(map((response: any) => {
      return response.body;
    }), catchError((error: HttpErrorResponse) => {
      return throwError (error)
    }))
  }

   // login api
   signup (data: any): Observable<any> {
    const url = this.apiBaseUrl + 'apiRouter/register'
    return this.http.post(url, data, { observe: 'response' }).pipe(map((response: any) => {
      return response.body;
    }), catchError((error: HttpErrorResponse) => {
      return throwError (error)
    }))
  }
}
