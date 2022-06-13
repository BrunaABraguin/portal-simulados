import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../interfaces/user';
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

  constructor(
    private authService: SocialAuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.userGoogle = user;
      if (user) {
        localStorage.setItem('userGoogle', JSON.stringify(user));
        localStorage.removeItem('user');
      }
    });

    this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
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
}

@Component({
  selector: 'register-dialog',
  templateUrl: './user/register-dialog/register-dialog.html',
  styleUrls: ['./navbar.component.scss'],
})
export class RegisterDialog implements OnInit {
  public nome!: string;
  public email!: string;
  public senha!: string;

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RegisterDialog>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {}

  public loginWithGoogle(): void {
    localStorage.clear();
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        this.userService.google(user).subscribe((response) => {
          this._snackBar.open(
            'Entrada de usuário realizada com sucesso',
            'Fechar',
            {
              duration: 2000,
            }
          );

          localStorage.setItem('token', response.token);

          this.dialogRef.close(user);
        });
      });
  }

  public registerUser(): void {
    const user: User = {
      name: this.nome,
      email: this.email,
      password: this.senha,
    };

    if (user.name && user.email && user.password) {
      if (user.password.length < 6) {
        this._snackBar.open('Senha deve ter mínimo de 6 caracteres', 'Fechar', {
          duration: 2000,
        });
      } else {
        this.userService.register(user).subscribe(
          (response) => {
            this.data.user = response.token;
            this._snackBar.open('Usuário cadastrado com sucesso', 'Fechar', {
              duration: 2000,
            });
            localStorage.setItem('token', response.token);
            this.dialogRef.close(this.data.user);
          },
          (error) => {
            this._snackBar.open(error.error.message, 'Fechar', {
              duration: 2000,
            });
          }
        );
      }
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: './user/login-dialog/login-dialog.html',
  styleUrls: ['./navbar.component.scss'],
})
export class LoginDialog implements OnInit {
  public email!: string;
  public senha!: string;
  public helper: JwtHelperService = new JwtHelperService();

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {}

  public loginWithGoogle(): void {
    localStorage.clear();
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {

        this.userService.google(user).subscribe((response) => {
          this._snackBar.open(
            'Entrada de usuário realizada com sucesso',
            'Fechar',
            {
              duration: 2000,
            }
          );

          localStorage.setItem('token', response.token);

          this.dialogRef.close(user);
        });
      });
  }

  public loginUser(): void {
    const user: User = {
      email: this.email,
      password: this.senha,
    };

    if (user.email && user.password) {
      if (user.password.length < 6) {
        this._snackBar.open('Senha deve ter mínimo de 6 caracteres', 'Fechar', {
          duration: 2000,
        });
      } else {
        this.userService.login(user).subscribe(
          (response) => {
            this.data.user = response.user;
            this._snackBar.open(
              'Entrada de usuário realizada com sucesso',
              'Fechar',
              {
                duration: 2000,
              }
            );
            const decodedToken = this.helper.decodeToken(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(decodedToken));
            this.dialogRef.close(this.data.user);
          },
          (error) => {
            this._snackBar.open('Usuário não autorizado', 'Fechar', {
              duration: 2000,
            });
          }
        );
      }
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
