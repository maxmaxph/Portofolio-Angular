import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private siteData = 'assets/data.json';
  constructor(private http: HttpClient) { }
   // Méthode pour récupérer les données du header
  getSiteData(): Observable<any> {
    return this.http.get(this.siteData);
  }
}
