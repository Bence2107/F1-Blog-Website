import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryNewsListComponent } from './primary-news-list.component';

describe('PrimaryNewsListComponent', () => {
  let component: PrimaryNewsListComponent;
  let fixture: ComponentFixture<PrimaryNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryNewsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
