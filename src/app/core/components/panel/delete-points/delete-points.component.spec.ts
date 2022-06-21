import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePointsComponent } from './delete-points.component';

describe('DeletePointsComponent', () => {
  let component: DeletePointsComponent;
  let fixture: ComponentFixture<DeletePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
