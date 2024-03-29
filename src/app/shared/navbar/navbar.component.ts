import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginDialog } from './user/login-dialog/login-dialog.component';
import { RegisterDialog } from './user/register-dialog/register-dialog.component';
import { UserService } from './user/service/user.service';

export interface DialogData {
  user: any;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: any;
  public userGoogle!: SocialUser;
  public userProfile!: any;
  public helper: JwtHelperService = new JwtHelperService();
  public isUserAuthenticated: boolean = this.userService.isUserAuthenticated();

  constructor(
    private authService: SocialAuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.userGoogle = user;
      if (user) {
        localStorage.setItem('userGoogle', JSON.stringify(user));
        localStorage.removeItem('user');

        this.userService.google(user).subscribe((response) => {
          localStorage.setItem('token', response.token);
          const decodedToken = this.helper.decodeToken(response.token);
          localStorage.setItem('userId', decodedToken.id);
        });
      }
    });
    this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.isUserAuthenticated) this.chooseLoginOrRegister();
  }

  public logout(): void {
    if (this.userGoogle) {
      this.authService.signOut();
    }

    this._snackBar.open('Sua sessão foi encerrada', 'Fechar', {
      duration: 2000,
    });

    localStorage.clear();
    this.reloadCurrentRoute();
  }

  public registerUser(): void {
    const dialogRef = this.dialog.open(RegisterDialog, {
      width: '420px',
      disableClose: true,
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
      this.reloadCurrentRoute();
    });
  }

  public loginUser(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '420px',
      disableClose: true,
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
      this.reloadCurrentRoute();
    });
  }

  public reloadCurrentRoute() {
    window.location.reload();
  }

  public chooseLoginOrRegister(): void {
    const dialogRef = this.dialog.open(UserDialog, {
      width: '420px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'login') {
        this.loginUser();
      }

      if (result === 'register') {
        this.registerUser();
      }
    });
  }
}

@Component({
  selector: 'user-dialog',
  templateUrl: './user/service/user.dialog.html',
})
export class UserDialog {
  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public loginUser() {
    this.dialogRef.close('login');
  }

  public registerUser() {
    this.dialogRef.close('register');
  }
}
