import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "src/app/shared/interfaces/user";
import { DialogData, UserService } from "../service/user.service";

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['../../navbar.component.scss'],
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
          const decodedToken = this.helper.decodeToken(response.token);
          localStorage.setItem('userId', decodedToken.id);

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
            localStorage.setItem('userId', decodedToken.id);
            this.dialogRef.close(this.data.user);
          },
          (error: HttpErrorResponse) => {
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
