import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileconfirmationComponent } from './mobileconfirmation.component';

describe('MobileconfirmationComponent', () => {
  let component: MobileconfirmationComponent;
  let fixture: ComponentFixture<MobileconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileconfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
