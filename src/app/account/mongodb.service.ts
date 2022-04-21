import { Injectable } from '@angular/core'; // per Injectable
import { Observable } from 'rxjs'; // per Observable
import { HttpClient } from '@angular/common/http'; // per HttpClient
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class MongoDB {
  key: string;
  removeSecret = 'czYZJvY2';
  URL: string =
    'https://data.mongodb-api.com/app/underlandscape-app-fwkpt/endpoint';

  constructor(private http: HttpClient) {
    this.key = '9cf84c28';
  }

  public remove(query: string): Observable<Object> {
    console.log(query);
    const headers= new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(`${this.URL}/remove?secret=${this.removeSecret}&source=${query}`, { 'headers': headers });
  }

  public postvalue(data: string, key: string): Observable<Object> {
    return this.http.post(this.URL + '/set?key=' + key, data);
  }
}
