import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http:HttpClient, private router:Router) { }

  public getProjectsStats() {
    return this.http.get('http://localhost:3000/projects/stats')
  }
}
