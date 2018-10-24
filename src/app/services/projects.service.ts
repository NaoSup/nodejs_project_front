import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  mySubscription;

  constructor(private http: HttpClient, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
      };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  public getProjectsStats() {
    return this.http.get(`${environment.BASE_API}/projects/stats`);
  }

  public getSalesRevenue() {
    return this.http.get(`${environment.BASE_API}/projects/revenue`);
  }

  public getAllProjects() {
    return this.http.get(`${environment.BASE_API}/projects`);
  }

  public getDetailedProject(id) {
    return this.http.get(`${environment.BASE_API}/projects/find/${id}`);
  }

  public addProject(project) {
    let config = new HttpHeaders();
    config = config.append('Content-Type', 'application/json');
    config = config.append('Accept', 'application/json');
    return this.http.post(`${environment.BASE_API}/projects`, JSON.stringify(project), { headers: config });
  }

  public updateProject(id, project) {
    let config = new HttpHeaders();
    config = config.append('Content-Type', 'application/json');
    config = config.append('Accept', 'application/json');
    project['dateStart'] = new Date(project['dateStart']);
    project['dateEnd'] = new Date(project['dateEnd']);
    return this.http.put(`${environment.BASE_API}/projects/update/${id}`, JSON.stringify(project), { headers: config });
  }

  public deleteProject(id) {
    return this.http.delete(`${environment.BASE_API}/projects/delete/${id}`);
  }
}
