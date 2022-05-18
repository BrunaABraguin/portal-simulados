import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: any;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  public logout(): void {
    this.authService.signOut().then(() => this.router.navigate(['']));
    localStorage.clear();
  }

  public registerUser(): void {
    this.dialog.open(RegisterDialog, {
      width: '420px',
    });
  }

  public loginUser(): void {
    this.dialog.open(LoginDialog, {
      width: '420px'
    });
  }
}

@Component({
  selector: 'register-dialog',
  templateUrl: 'register-dialog.html',
  styleUrls: ['./navbar.component.scss'],
})
export class RegisterDialog implements OnInit {

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  public loginWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['']));

    this.dialog.closeAll();
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
  styleUrls: ['./navbar.component.scss'],
})
export class LoginDialog implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public loginWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['']));

    this.dialog.closeAll();
  }
}
