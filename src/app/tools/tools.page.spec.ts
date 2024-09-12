import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolsPage } from './tools.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('ToolsPage', () => {
  let component: ToolsPage;
  let fixture: ComponentFixture<ToolsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sould create', () => {
    expect(component).toBeTruthy();
  });
});
