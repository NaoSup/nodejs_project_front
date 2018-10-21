import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
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
  public getAllClients() {
    return this.http.get(`${environment.BASE_API}/clients`)
  }

  public getDetailsClient(id) {
    return this.http.get(`${environment.BASE_API}/clients/${id}`)
  }

  public addClient(user) {
    let config = new HttpHeaders()
    config = config.append('Content-Type', 'application/json')
    config = config.append('Accept', 'application/json')
    this.http.post(`${environment.BASE_API}/clients`, JSON.stringify(user), { headers: config }).subscribe(res => {
      this.router.navigateByUrl('/clients')
    },
    err => console.log(err))
  }

  public deleteClient(id) {
    this.http.delete(`${environment.BASE_API}/clients/${id}`).subscribe(() => {
      this.router.navigateByUrl('/clients')
    },
    err => console.log(err))
  }

  public updateClient(id, user) {
    let config = new HttpHeaders()
    config = config.append('Content-Type', 'application/json')
    config = config.append('Accept', 'application/json')
    this.http.put(`${environment.BASE_API}/clients/${id}`, JSON.stringify(user), { headers: config }).subscribe(res => {
      this.router.navigateByUrl(`/clients/${id}`)
    },
    err => console.log(err))
  }
}
