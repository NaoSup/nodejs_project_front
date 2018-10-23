import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { PROJECT_STATUS } from '../../../config/constants';
import * as moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects;
  projectStatusList = PROJECT_STATUS;
  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe(res => {
      if (res && res['data']) {
        this.projects = res['data'];
        this.projects.forEach(project => {
          project['dateStart'] = moment(project['dateStart']).format('DD/MM/YYYY');
          project['dateEnd'] = moment(project['dateEnd']).format('DD/MM/YYYY');
        });
      }
    });
  }

  deleteProject(id) {
    this.projectsService.deleteProject(id);
  }

}
