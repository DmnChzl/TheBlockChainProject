import { TestBed } from '@angular/core/testing';
import { NotificationService } from '@shared/services/notification.service';

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should create the service', () => {
    const service = TestBed.inject(NotificationService);
    expect(service).toBeTruthy();
  });

  it('should show info notification', () => {
    const service = TestBed.inject(NotificationService);
    service.info('Lorem ipsum dolor sit amet');

    expect(service.notification()?.message).toEqual('Lorem ipsum dolor sit amet');
    expect(service.notification()?.type).toEqual('info');
  });

  it('should show success notification', () => {
    const service = TestBed.inject(NotificationService);
    service.success('Lorem ipsum dolor sit amet');

    expect(service.notification()?.message).toEqual('Lorem ipsum dolor sit amet');
    expect(service.notification()?.type).toEqual('success');
  });

  it('should show danger notification', () => {
    const service = TestBed.inject(NotificationService);
    service.danger('Lorem ipsum dolor sit amet');

    expect(service.notification()?.message).toEqual('Lorem ipsum dolor sit amet');
    expect(service.notification()?.type).toEqual('danger');
  });

  it('should show warning notification', () => {
    const service = TestBed.inject(NotificationService);
    service.warning('Lorem ipsum dolor sit amet');

    expect(service.notification()?.message).toEqual('Lorem ipsum dolor sit amet');
    expect(service.notification()?.type).toEqual('warning');
  });
});
