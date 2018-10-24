import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { EMPLOYEE_POSITIONS } from '../../../config/constants';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

import * as moment from 'moment';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {
  @ViewChild('confirmAddEmployeeSwal') private confirmAddEmployeeSwal: SwalComponent;
  @ViewChild('errorOnSubmit') private errorOnSubmit: SwalComponent;
  @ViewChild('confirmEditEmployeeSwal') private confirmEditEmployeeSwal: SwalComponent;
  employeePositionsList = EMPLOYEE_POSITIONS;
  employeePositionKeys = Object.keys(this.employeePositionsList);
  // init employee
  employee = {
    firstName: null,
    lastName: null,
    username: null,
    birthdate: null,
    position: null,
    address: {
      street: null,
      zipCode: null,
      city: null
    },
    phone: null,
    email: null
  };

  employeeId: string;
  doesEmployeeExists = false;
  constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.url['value'][1].path === 'edit' && this.route.params['value']['id']) {
      this.employeeId = this.route.params['value']['id'];
      this.doesEmployeeExists = true;
      this.employeesService.getDetailedEmployee(this.employeeId).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.employee = res['data'][0];
          this.employee['birthdate'] = moment(this.employee['birthdate']).format('YYYY-MM-DD');
        }
      });
    }
  }

  onSubmit() {
    if (this.employeeId) {
      this.employeesService.updateEmployee(this.employeeId, this.employee).subscribe(res => {
        this.confirmEditEmployeeSwal.show();
      },
      err => {
        this.errorOnSubmit.show();
      });
    } else {
      this.employeesService.addEmployee(this.employee).subscribe(res => {
        this.confirmAddEmployeeSwal.show();
      },
      err => {
        this.errorOnSubmit.show();
      });
    }
  }

  redirectToList() {
    this.router.navigateByUrl('/employees');
  }
  redirectToEmployee() {
    this.router.navigateByUrl(`/employees/detailed/${this.employeeId}`)
  }


}
