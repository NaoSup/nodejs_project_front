import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { EmployeesService } from '../../services/employees.service';
import { ClientsService } from '../../services/clients.service';
import { PROJECT_STATUS, EMPLOYEE_POSITIONS } from '../../../config/constants';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css']
})
export class AddProjectFormComponent implements OnInit {
  @ViewChild('confirmAddProjectSwal') private confirmAddProjectSwal: SwalComponent;
  @ViewChild('errorOnSubmit') private errorOnSubmit: SwalComponent;
  employees = [];
  clients = [];
  project = {
    name: null,
    description: null,
    dateStart: null,
    dateEnd: null,
    client: {},
    employees: new Array<Object>(),
    price: null,
    status: null,
    comments: new Array<string>()
  };
  employeesPosition = EMPLOYEE_POSITIONS;
  projectStatusList = PROJECT_STATUS;
  projectStatusKeys = Object.keys(this.projectStatusList);

  projectId;
  doesProjectExists = false;
  constructor(
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.url['value'][1].path === 'edit' && this.route.params['value']['id']) {
      this.projectId = this.route.params['value']['id'];
      this.doesProjectExists = true;
      this.projectsService.getDetailedProject(this.projectId).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.project = res['data'][0];
          this.project['dateStart'] = moment(this.project['dateStart']).format('YYYY-MM-DD');
          this.project['dateEnd'] = moment(this.project['dateEnd']).format('YYYY-MM-DD');
        }
      });
    }
    this.employeesService.getListEmployees().subscribe(res => {
      if (res && res['data']) {
        this.employees = res['data'];
        if (this.project) {
          this.removeAssignedEmployees();
        }
      }
    });
    this.clientsService.getAllClients().subscribe(res => {
      if (res && res['data']) {
        this.clients = res['data'];
      }
    });
  }

  addToEmployeesList(employee) {
    this.project.employees.push(employee);
    const index = this.employees.indexOf(employee);
    this.employees.splice(index, 1);
  }

  deleteEmployees(employee) {
    this.employees.push(employee);
    const index = this.project.employees.indexOf(employee);
    this.project.employees.splice(index, 1);
  }

  onSubmit() {
    if (this.projectId) {
      this.projectsService.updateProject(this.projectId, this.project);
    } else {
      this.projectsService.addProject(this.project).subscribe(res => {
        this.confirmAddProjectSwal.show();
      },
      err => {
        this.errorOnSubmit.show();
      });
    }
  }

  redirectToList() {
    this.router.navigateByUrl('/projects');
  }

  removeAssignedEmployees() {
    this.project.employees.forEach(employee => {
      if (this.employees.filter(employee2 => employee2['_id'] === employee['_id']).length) {
        const index = this.employees.indexOf(employee);
        this.employees.splice(index, 1);
      }
    });
  }
}
