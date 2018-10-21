import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { BUSINESS_SECTORS } from '../../../config/constants';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {
  client = {
    companyName: '',
    address: {
      street: '',
      zipCode: '',
      city: ''
    },
    contactPerson: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    businessSector: ''
  }

  businessSectorsList = BUSINESS_SECTORS;
  businessSectorsKeys = Object.keys(this.businessSectorsList);

  clientId;

  constructor(private route: ActivatedRoute, private clientsService: ClientsService) { }

  ngOnInit() {
    if (this.route.url['value'][0].path === 'updateClient' && this.route.params['value']['id']) {
      this.clientId = this.route.params['value']['id']
      this.clientsService.getDetailsClient(this.clientId).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.client = res['data'][0]
        }
      })
    }
  }

  onSubmit() {
    if (this.clientId) {
      this.clientsService.updateClient(this.clientId, this.client)
    } else {
      this.clientsService.addClient(this.client)
    }
  }

}
