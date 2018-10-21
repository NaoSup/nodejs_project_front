import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  idClient:string; 
  client:Object;
  constructor(private clientsService: ClientsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idClient = params['id'];
      this.clientsService.getDetailsClient(this.idClient).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.client = res['data'][0]
        }
      })
   });
  }

  goBack() {
    this.location.back()
  }

  deleteClient(id) {
    this.clientsService.deleteClient(id)
  }
}
