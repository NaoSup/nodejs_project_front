import { ClientRoutingModule } from './client-routing.module';

describe('ClientRoutingModule', () => {
  let clientRoutingModule: ClientRoutingModule;

  beforeEach(() => {
    clientRoutingModule = new ClientRoutingModule();
  });

  it('should create an instance', () => {
    expect(clientRoutingModule).toBeTruthy();
  });
});
