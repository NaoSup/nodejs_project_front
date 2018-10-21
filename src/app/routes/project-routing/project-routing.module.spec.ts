import { ProjectRoutingModule } from './project-routing.module';

describe('ProjectRoutingModule', () => {
  let projectRoutingModule: ProjectRoutingModule;

  beforeEach(() => {
    projectRoutingModule = new ProjectRoutingModule();
  });

  it('should create an instance', () => {
    expect(projectRoutingModule).toBeTruthy();
  });
});
