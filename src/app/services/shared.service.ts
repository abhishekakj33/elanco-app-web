import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// TODO: Move it to environment file
const baseURL = 'https://engineering-task.elancoapps.com/api'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getAllApplications() {
    const url = `${baseURL}/applications`;

    return this.http
      .get(url);
  }

  getApplicationByName(name: string) {
    const url = `${baseURL}/applications/${name}`;

    return this.http
      .get(url);
  }

  getRawData() {
    const url = `${baseURL}/raw`;

    return this.http
      .get(url);
  }
}
