import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http:HttpClient, private router:Router) { }

  public getProjectsStats() {
    return this.http.get('http://localhost:3000/projects/stats')
  }

  public getSalesRevenue() {
    return this.http.get('http://localhost:3000/projects/revenue')
  }
}
