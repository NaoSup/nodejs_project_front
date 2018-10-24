import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { BUSINESS_SECTORS } from '../../../config/constants';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {
  @ViewChild('confirmAddClientSwal') private confirmAddClientSwal: SwalComponent;
  @ViewChild('errorOnSubmit') private errorOnSubmit: SwalComponent;
  @ViewChild('confirmEditClientSwal') private confirmEditClientSwal: SwalComponent;
  client = {
    companyName: null,
    address: {
      street: null,
      zipCode: null,
      city: null
    },
    contactPerson: {
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    },
    businessSector: null
  };

  businessSectorsList = BUSINESS_SECTORS;
  businessSectorsKeys = Object.keys(this.businessSectorsList);

  clientId;
  doesClientExists = false;
  constructor(private route: ActivatedRoute, private clientsService: ClientsService, private router: Router) { }

  ngOnInit() {
    if (this.route.url['value'][1].path === 'edit' && this.route.params['value']['id']) {
      this.clientId = this.route.params['value']['id'];
      this.doesClientExists = true;
      this.clientsService.getDetailsClient(this.clientId).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.client = res['data'][0];
        }
      });
    }
  }

  onSubmit() {
    if (this.clientId) {
      this.clientsService.updateClient(this.clientId, this.client).subscribe(res => {
        this.confirmEditClientSwal.show();
      },
      err => {
        this.errorOnSubmit.show();
      });
    } else {
      this.clientsService.addClient(this.client).subscribe(res => {
        this.confirmAddClientSwal.show();
      },
      err => {
        this.errorOnSubmit.show();
      });
    }
  }

  redirectToList() {
    this.router.navigateByUrl('/clients');
  }
  redirectToClient() {
    this.router.navigateByUrl(`/clients/detailed/${this.clientId}`)
  }
}
