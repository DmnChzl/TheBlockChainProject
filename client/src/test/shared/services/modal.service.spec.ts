import { TestBed } from '@angular/core/testing';
import { ModalService } from '@shared/services/modal.service';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should create the service', () => {
    const service = TestBed.inject(ModalService);
    expect(service).toBeTruthy();
  });

  it('should open modal', () => {
    const service = TestBed.inject(ModalService);
    service.open();

    expect(service.isOpen()).toBe(true);
    expect(service.config()).toEqual({
      isCloseable: true,
    });
  });

  it('should open modal with config', () => {
    const service = TestBed.inject(ModalService);
    service.open({
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet',
      isCloseable: false,
    });

    expect(service.isOpen()).toBe(true);
    expect(service.config()).toEqual({
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet',
      isCloseable: false,
    });
  });

  it('should close modal', () => {
    const service = TestBed.inject(ModalService);

    service.open();
    service.close();

    expect(service.isOpen()).toBe(false);
  });
});
