import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from '@shared/components/button';

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
