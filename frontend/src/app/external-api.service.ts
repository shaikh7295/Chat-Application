import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  constructor(private http: HttpClient) { }
  httpData: any;
  url: string = 'http:localhost:5001/'

  RegisterClient(data: any) {
    this.httpData = ''
    return this.http.post(this.url + 'api/auth/register', data)
  }

  verifyUser(data: any) {
    this.httpData = ''
    this.http.post(this.url + 'api/auth/login', data).subscribe(data => {
      this.httpData = data;
    });
  }

}


