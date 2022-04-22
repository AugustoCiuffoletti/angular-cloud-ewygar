import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MongoDB } from './mongodb.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  profile: any;

  constructor(public authService: AuthService, private db: MongoDB) {}

  ngOnInit() {
    this.authService.userProfile$.subscribe((data) => {
      if (data) {
        this.profile = { ...data };
      }
    });
  }

  remove(query: string) {
    const xhttp = new XMLHttpRequest();
    let message: string;
    console.log(query);
    let obs = this.db.remove(query);
    obs.subscribe({
      next: (responseText: string) => {
        console.log(responseText);
        document.getElementById('removeOutput').innerHTML = responseText;
        (<HTMLInputElement>document.getElementById('removeQuery')).value = '';
      },
      error: (e: Error) => {
        console.error(e);
        document.getElementById('removeOutput').innerHTML = e.message;
        (<HTMLInputElement>document.getElementById('removeQuery')).value = '';
        throw e.message;
      },
    });
  }

  upload(event) {
    let file: File = event.target.files[0];
    let filename: string = file.name;
    let source: string = filename.split('.')[0];
    let date: string, description: string;
    console.log(filename);
    try {
      [date, description] = this.checkfilename(filename);
    } catch (e) {
      console.error('Non compliant filename: ' + e);
      throw e;
    }
    console.log(date);
    console.log(description);
    let obs = this.db.stat(source);
    obs.subscribe({
      next: (responseText: string) => {
        let stat = JSON.parse(responseText);
        console.log(stat.n);
        (<HTMLInputElement>document.getElementById('uploadQuery')).value = '';
        if (stat.n != 0) {
          document.getElementById(
            'uploadOutput'
          ).innerHTML = `A source named ${source} has been already uploaded`;
          throw `${source} is duplicate`;
        }
        let obs = this.db.upload(file, source);
        obs.subscribe({
          next: (responseText: string) => {
            console.log('Uploaded');
          },
          error: (e: Error) => {
            console.log('Error');
          },
        });
      },
      error: (e: Error) => {
        console.error(e);
        document.getElementById('removeOutput').innerHTML = e.message;
        (<HTMLInputElement>document.getElementById('removeQuery')).value = '';
        throw e.message;
      },
    });
    document.getElementById('uploadOutput').innerHTML = 'Loading';
  }

  private checkfilename(fn: string) {
    let parts = fn.split('.');
    if (parts.length !== 2) throw 'no dots in the description';
    if (parts[1] !== 'geojson') throw 'extension MUST be "geojson"';
    if (parts[0].length < 5 || parts[0].length > 30)
      throw 'description length in [5..30]';
    if (!parts[0].match(/^[0-9]{8}-[0-9a-zA-Z]+$/))
      throw 'Description must be in format "yyyymmdd-xxxxxxxxxxx"';
    return parts[0].split('-');
  }
}
