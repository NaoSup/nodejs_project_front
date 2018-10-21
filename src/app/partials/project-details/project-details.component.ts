import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PROJECT_STATUS, EMPLOYEE_POSITIONS } from '../../../config/constants';
import { ProjectsService } from '../../services/projects.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project:Object;
  idProject:string;
  projectStatusList = PROJECT_STATUS;
  employeePositionsList = EMPLOYEE_POSITIONS;
  classStatus:string;
  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idProject = params['id'];
      this.projectsService.getDetailedProject(this.idProject).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.project = res['data'][0]
          this.project['dateStart'] = moment(this.project['dateStart']).format('DD/MM/YYYY')
          this.project['dateEnd'] = moment(this.project['dateEnd']).format('DD/MM/YYYY')
          switch (this.project['status']) {
            case this.projectStatusList.canceled: {
              this.classStatus = 'text-danger'
              break
            }
            case this.projectStatusList.finished: {
              this.classStatus = 'text-success'
              break
            }
            case this.projectStatusList.prospect: {
              this.classStatus = 'text-secondary'
              break
            }
            default: {
              this.classStatus = 'text-info'
              break
            }
          }
        }
      })
   })
  }

  goBack() {
    this.location.back()
  }
  goToEmployeePage(id) {
    this.router.navigateByUrl(`/employees/detailed/${id}`)
  }
}
