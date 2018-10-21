import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { EmployeesService } from '../../services/employees.service';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  projectsStats:Object
  salesRevenue:Number
  totalClient:Number
  totalEmployees:Number
  constructor(
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private clientsService: ClientsService) { }
  
  ng
  ngOnInit() {
    this.projectsService.getProjectsStats().subscribe(res => { 
      if (res && res['data']) {
        this.projectsStats = res['data']
      }
    })
    this.projectsService.getSalesRevenue().subscribe(res => {
      if (res && res['data']) {
        this.salesRevenue = res['data']
      }
    })
    this.clientsService.getAllClients().subscribe(res => {
      if (res && res['data']) {
        this.totalClient = res['data'].length
      }
    })
    this.employeesService.getListEmployees().subscribe(res => {
      if (res && res['data']) {
        this.totalEmployees = res['data'].length
      }
    })
  }

}
