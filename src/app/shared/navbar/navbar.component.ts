import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { UserService } from './user/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user!: any;

  constructor(
    private authService: SocialAuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.idToken);
      }
    });
  }

  public logout(): void {
    this.authService.signOut().then(() =>
      this._snackBar.open('Sua sessão foi encerrada', 'Fechar', {
        duration: 2000,
      })
    );
    localStorage.clear();
  }

  public registerUser(): void {
    this.dialog.open(RegisterDialog, {
      width: '420px',
    });
  }

  public loginUser(): void {
    this.dialog.open(LoginDialog, {
      width: '420px',
    });
  }
}

@Component({
  selector: 'register-dialog',
  templateUrl: './user/register-dialog.html',
  styleUrls: ['./navbar.component.scss'],
})
export class RegisterDialog implements OnInit {
  public nome!: string;
  public email!: string;
  public senha!: string;
  public user!: any;

  constructor(
    private authService: SocialAuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() =>
      this._snackBar.open(
        'Entrada de usuário realizada com sucesso',
        'Fechar',
        {
          duration: 2000,
        }
      )
    );

    this.dialog.closeAll();
  }

  public registerUser(): void {
    const user: Usuario = {
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
            this.user = response.user;
            this._snackBar.open('Usuário cadastrado com sucesso', 'Fechar', {
              duration: 2000,
            });
            localStorage.setItem('token', response.token);
            this.dialog.closeAll();
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
}

@Component({
  selector: 'login-dialog',
  templateUrl: './user/login-dialog.html',
  styleUrls: ['./navbar.component.scss'],
})
export class LoginDialog implements OnInit {
  public email!: string;
  public senha!: string;
  public user!: any;

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.user = user;
      this._snackBar.open(
        'Entrada de usuário realizada com sucesso',
        'Fechar',
        {
          duration: 2000,
        }
      );
    });

    this.dialog.closeAll();
  }

  public loginUser(): void {
    const user: Usuario = {
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
            this.user = response.user;
            this._snackBar.open(
              'Entrada de usuário realizada com sucesso',
              'Fechar',
              {
                duration: 2000,
              }
            );
            localStorage.setItem('token', response.token);
            this.dialog.closeAll();
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
}
