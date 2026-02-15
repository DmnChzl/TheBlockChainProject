import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should emit clicked output', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;

    vi.spyOn(component.clicked, 'emit');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
