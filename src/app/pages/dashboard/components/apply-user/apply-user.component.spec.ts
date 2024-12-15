import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyUserComponent } from './apply-user.component';

describe('ApplyUserComponent', () => {
  let component: ApplyUserComponent;
  let fixture: ComponentFixture<ApplyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
