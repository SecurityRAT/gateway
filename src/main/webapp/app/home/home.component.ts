import { Component, OnInit } from '@angular/core';

import { LoginService, AccountService, Account } from 'app/core';
import { faPlusCircle, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  faPlusCircle = faPlusCircle;
  faDownload = faDownload;

  constructor(private accountService: AccountService, private loginService: LoginService) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.loginService.login();
  }
}
