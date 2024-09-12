import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AccountHomePage } from './account.page';

describe('HomePage', () => {
  let component: AccountHomePage;
  let fixture: ComponentFixture<AccountHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountHomePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
