import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  projectsStats:Object
  constructor(private projectsService: ProjectsService) {
    this.projectsService.getProjectsStats().subscribe(res => 
      this.projectsStats = res
    )
  }

  ngOnInit() {
  }

}
