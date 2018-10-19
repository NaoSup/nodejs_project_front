import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  public getAllClients() {
    return this.http.get(`${environment.BASE_API}/clients`)
  }

  public getDetailsClient(id) {
    return this.http.get(`${environment.BASE_API}/clients/${id}`)
  }

  public addClient() {

  }

  public deleteClient(id) {

  }

  public updateClient(id) {

  }
}
