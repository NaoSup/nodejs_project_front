import { EmployeeRoutingModule } from './employee-routing.module';

describe('EmployeeRoutingModule', () => {
  let employeeRoutingModule: EmployeeRoutingModule;

  beforeEach(() => {
    employeeRoutingModule = new EmployeeRoutingModule();
  });

  it('should create an instance', () => {
    expect(employeeRoutingModule).toBeTruthy();
  });
});
