import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVentaComponent } from './show-venta.component';

describe('ShowVentaComponent', () => {
  let component: ShowVentaComponent;
  let fixture: ComponentFixture<ShowVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
