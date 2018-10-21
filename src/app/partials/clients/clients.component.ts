import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { BUSINESS_SECTORS } from '../../../config/constants';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Array<Object>;
  businessSectorsList = BUSINESS_SECTORS;
  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.getAllClients().subscribe(res => {
      if(res && res['data']) {
        this.clients = res['data']
      }
    })
  }

  deleteClient(id) {
    this.clientsService.deleteClient(id)
  }

}
