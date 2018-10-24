import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EMPLOYEE_POSITIONS, PROJECT_STATUS } from '../../../config/constants';
import { Location } from '@angular/common';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Object;
  idEmployee: string;
  projectStatusList = PROJECT_STATUS;
  employeePositionsList = EMPLOYEE_POSITIONS;
  projects = [];
  previousUrl;
  constructor(private employeesService: EmployeesService, 
    private route: ActivatedRoute, 
    private router: Router,
    private location: Location,
    private routesService: RoutesService) { }

  ngOnInit() {
    this.previousUrl = this.routesService.getPreviousUrl();
    this.route.params.subscribe(params => {
      this.idEmployee = params['id'];
      this.employeesService.getDetailedEmployee(this.idEmployee).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.employee = res['data'][0];
          this.employee['birthdate'] = moment(this.employee['birthdate']).format('DD/MM/YYYY');
          this.employeesService.getProjects(this.employee['_id']).subscribe(res => {
            if (res && res['data']) {
              this.projects = res['data']
            }
          });
        }
      });
   });
  }

  // if the previous url is a form, we redirect towards the general list
  goBack() {
    if (this.previousUrl && this.previousUrl.split('/')[2] !== 'edit') {
      this.location.back();
    } else {
      this.router.navigateByUrl('/projects');
    }
  }

}
