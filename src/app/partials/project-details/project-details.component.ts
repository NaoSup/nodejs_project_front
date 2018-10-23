import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PROJECT_STATUS, EMPLOYEE_POSITIONS } from '../../../config/constants';
import { ProjectsService } from '../../services/projects.service';
import { Location } from '@angular/common';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Object;
  mutableProject: Object;
  idProject: string;
  projectStatusList = PROJECT_STATUS;
  employeePositionsList = EMPLOYEE_POSITIONS;
  classStatus: string;
  pendingComment: string;
  previousUrl: string;
  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private routesService: RoutesService) { }

  ngOnInit() {
    this.previousUrl = this.routesService.getPreviousUrl();
    this.route.params.subscribe(params => {
      this.idProject = params['id'];
      this.projectsService.getDetailedProject(this.idProject).subscribe(res => {
        if (res && res['data'] && res['data'].length) {
          this.project = res['data'][0];
          this.mutableProject = this.project;
          this.project['dateStart'] = moment(this.project['dateStart']).format('DD/MM/YYYY');
          this.project['dateEnd'] = moment(this.project['dateEnd']).format('DD/MM/YYYY');
          switch (this.project['status']) {
            case 'canceled': {
              this.classStatus = 'text-danger';
              break;
            }
            case 'finished': {
              this.classStatus = 'text-success';
              break;
            }
            case 'prospect': {
              this.classStatus = 'text-secondary';
              break;
            }
            default: {
              this.classStatus = 'text-info';
              break;
            }
          }
        }
      });
   });
  }

  goBack() {
    if (this.previousUrl.split('/')[2] === 'edit') {
      this.router.navigateByUrl('/projects');
    } else {
      this.location.back();
    }
  }
  goToEmployeePage(id) {
    this.router.navigateByUrl(`/employees/detailed/${id}`);
  }
  addComment(id) {
    this.project['comments'].push(this.pendingComment);
    this.mutableProject = this.project;
    this.mutableProject['dateStart'] = moment(this.mutableProject['dateStart']).format('YYYY-MM-DD');
    this.mutableProject['dateEnd'] = moment(this.mutableProject['dateEnd']).format('YYYY-MM-DD');
    this.projectsService.updateProject(id, this.mutableProject);
  }

  removeComment(idProject, idComment) {
    this.project['comments'].splice(idComment, 1);
    this.mutableProject = this.project;
    this.mutableProject['dateStart'] = moment(this.mutableProject['dateStart']).format('YYYY-MM-DD');
    this.mutableProject['dateEnd'] = moment(this.mutableProject['dateEnd']).format('YYYY-MM-DD');
    this.projectsService.updateProject(idProject, this.mutableProject);
  }

  deleteProject(id) {
    this.projectsService.deleteProject(id);
  }
}
