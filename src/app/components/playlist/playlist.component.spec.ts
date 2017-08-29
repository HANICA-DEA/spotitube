import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistComponent} from './playlist.component';
import {SpotitubeAngularModule} from '../../modules/angular.module';
import {SpotitubeMaterialModule} from '../../modules/material.module';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistComponent],
      imports: [
        SpotitubeAngularModule,
        SpotitubeMaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
