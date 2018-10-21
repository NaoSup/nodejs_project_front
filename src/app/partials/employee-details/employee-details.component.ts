import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EMPLOYEE_POSITIONS } from '../../../config/constants';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee:Object;
  idEmployee:string;
  employeePositionsList = EMPLOYEE_POSITIONS;
  constructor(private employeesService: EmployeesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idEmployee = params['id'];
      this.employeesService.getDetailedEmployee(this.idEmployee).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.employee = res['data'][0]
          this.employee['birthdate'] = moment(this.employee['birthdate']).format('MM/DD/YYYY')
        }
      })
   })
  }

  deleteEmployee(id) {
    this.employeesService.deleteEmployee(id)
  }

}
