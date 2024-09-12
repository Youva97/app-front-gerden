import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyspacePage } from './myspace.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('MyspacePage', () => {
  let component: MyspacePage;
  let fixture: ComponentFixture<MyspacePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyspacePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyspacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
