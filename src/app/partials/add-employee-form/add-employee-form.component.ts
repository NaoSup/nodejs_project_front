import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { EMPLOYEE_POSITIONS } from '../../../config/constants';
import * as moment from 'moment';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {
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
  }

  employeeId:string;
  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.url['value'][1].path === 'edit' && this.route.params['value']['id']) {
      this.employeeId = this.route.params['value']['id']
      this.employeesService.getDetailedEmployee(this.employeeId).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.employee = res['data'][0]
          this.employee['birthdate'] = moment(this.employee['birthdate']).format('YYYY-MM-DD')
        }
      })
    }
  }

  onSubmit() {
    if (this.employeeId) {
      this.employeesService.updateEmployee(this.employeeId, this.employee)
    } else {
      this.employeesService.addEmployee(this.employee)
    }
  }


}
