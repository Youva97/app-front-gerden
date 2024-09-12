import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  currentUrl: string;
  routerSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthentificationService
  ) {}
  ngOnInit() {
    this.updateCurrentUrl();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentUrl();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateCurrentUrl() {
    this.currentUrl = this.router.url;
  }

  includesString(string: string): boolean {
    return this.currentUrl.includes(string);
  }

  navigateToMySpace() {
    if (this.authenticationService.token) {
      this.router.navigateByUrl('/tabs/account');
    } else {
      this.router.navigateByUrl('/tabs/login');
    }
  }
}
