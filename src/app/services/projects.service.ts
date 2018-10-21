import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http:HttpClient, private router:Router) { }

  public getProjectsStats() {
    return this.http.get(`${environment.BASE_API}/projects/stats`)
  }

  public getSalesRevenue() {
    return this.http.get(`${environment.BASE_API}/projects/revenue`)
  }

  public getAllProjects() {
    return this.http.get(`${environment.BASE_API}/projects`)
  }
  
  public getDetailedProject(id) {
    return this.http.get(`${environment.BASE_API}/projects/find/${id}`)
  }
}
