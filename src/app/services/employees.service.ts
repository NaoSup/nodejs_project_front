import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  mySubscription;
  constructor(private http: HttpClient, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
      };
     
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
   }

  ngOnDestroy() {
    if (this.mySubscription)
      this.mySubscription.unsubscribe();
  }

  public getListEmployees() {
    return this.http.get(`${environment.BASE_API}/employees`)
  }

  public getDetailedEmployee(id) {
    return this.http.get(`${environment.BASE_API}/employees/find/${id}`)
  }

  public deleteEmployee(id) {
    this.http.delete(`${environment.BASE_API}/employees/delete/${id}`).subscribe(() => {
      this.router.navigateByUrl('/employees')
    },
    err => console.log(err))
  }

  public addEmployee(user) {
    let config = new HttpHeaders()
    config = config.append('Content-Type', 'application/json')
    config = config.append('Accept', 'application/json')
    this.http.post(`${environment.BASE_API}/employees`, JSON.stringify(user), { headers: config }).subscribe(res => {
      this.router.navigateByUrl('/employees')
    },
    err => console.log(err))
  }

  public updateEmployee(id, user) {
    let config = new HttpHeaders()
    config = config.append('Content-Type', 'application/json')
    config = config.append('Accept', 'application/json')
    this.http.put(`${environment.BASE_API}/employees/update/${id}`, JSON.stringify(user), { headers: config }).subscribe(res => {
      this.router.navigateByUrl(`/employees/detailed/${id}`)
    },
    err => console.log(err))
  }
}
