import { Injectable } from '@angular/core'; // per Injectable
import { Observable } from 'rxjs'; // per Observable
import { HttpClient } from '@angular/common/http'; // per HttpClient
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class MongoDB {
  key: string;
  removeSecret = 'czYZJvY2';
  uploadSecret = 'arazHX6V';
  URL: string =
    'https://data.mongodb-api.com/app/underlandscape-app-fwkpt/endpoint';

  constructor(private http: HttpClient) {
    this.key = '9cf84c28';
  }

  // removes documents based on query string
  public remove(query: string): Observable<Object> {
    console.log(query);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(
      `${this.URL}/remove?secret=${this.removeSecret}&source=${query}`,
      { headers: headers }
    );
  }
  // returns object with statistics about matched documents
  public stat(query: string): Observable<Object> {
    console.log(query);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get(`${this.URL}/stat?source=${query}`, {
      headers: headers,
    });
  }

  public upload(file: File, source: string): Observable<Object> {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function () {
      try {
        let data = JSON.parse(fileReader.result);
        if (data['type'] !== 'FeatureCollection') {
          throw 'Not a FeatureCollection';
        }
        let n = 0;
        for (let feature of data.features) {
          feature.source = file.name.split('.')[0];
          feature.serial = n + 1;
          //        console.log(JSON.stringify(feature));
          n = n + 1;
        }
      } catch (e) {
        console.error('Parse error: ' + e);
      }
      const formData = new FormData();
      formData.append('features', filename);
      return this.http.post(
        `${this.URL}/upload_geojson?secret=arazHX6V`,
        formData
      );
    };
  }
}
