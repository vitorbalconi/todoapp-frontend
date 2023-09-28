import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FowardIconComponent } from './foward-icon.component';

describe('FowardIconComponent', () => {
  let component: FowardIconComponent;
  let fixture: ComponentFixture<FowardIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FowardIconComponent]
    });
    fixture = TestBed.createComponent(FowardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
