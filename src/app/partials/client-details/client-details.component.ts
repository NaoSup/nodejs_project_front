import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PROJECT_STATUS } from '../../../config/constants';
import { RoutesService } from '../../services/routes.service';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  idClient: string;
  client: Object;
  projects = [];
  projectStatusList = PROJECT_STATUS;
  previousUrl: string;

  constructor(private clientsService: ClientsService,
    private route: ActivatedRoute,
    private location: Location, 
    private routesService: RoutesService,
    private router: Router) { }

  ngOnInit() {
    this.previousUrl = this.routesService.getPreviousUrl();
    this.route.params.subscribe(params => {
      this.idClient = params['id'];
      this.clientsService.getDetailsClient(this.idClient).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.client = res['data'][0];
          this.clientsService.getProjects(this.client['_id']).subscribe(res => {
            if (res && res['data']) {
              this.projects = res['data']
              console.log(this.projects)
            }
          });
        }
      });
   });
  }

  // 
  goBack() {
    if (this.previousUrl && this.previousUrl.split('/')[2] !== 'edit') {
      this.location.back();
    } else {
      this.router.navigateByUrl('/projects');
    }
  }

  deleteClient(id) {
    this.clientsService.deleteClient(id);
  }
}
