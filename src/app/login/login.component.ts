import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log('token: ', this.tokenStorage.getToken());
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    } else {
      console.log('no obtuvo Token');
    }
  }
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        console.log('data del login: ' + data);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log('login failed' + this.errorMessage);
      }
    );
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['/profile']);
    console.log('redirect a Profile :v ');
  }
}
