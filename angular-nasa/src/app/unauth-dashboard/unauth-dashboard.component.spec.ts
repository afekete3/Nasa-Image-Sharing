import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthDashboardComponent } from './unauth-dashboard.component';

describe('UnauthDashboardComponent', () => {
  let component: UnauthDashboardComponent;
  let fixture: ComponentFixture<UnauthDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
