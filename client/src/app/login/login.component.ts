import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( private router: Router, private fb:FormBuilder, private authService: AuthService, private translateService:TranslateService) {
  }

  loginForm!:FormGroup;

  createLoginForm() {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser(){
    if(this.loginForm.valid){
      const userData = this.loginForm.value;
      this.authService.logInUser(userData).subscribe({
        next:(response: any) => {
          console.log('Logged In Successfully: ', response);
          const jwtToken = response;
          localStorage.setItem('token', jwtToken);

          const decodedToken= this.decodeToken(jwtToken);
          const role= decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

          this.router.navigate(['/books']);

        },
        error:(error) =>{
          console.log('Login Failed: ', error);
        }
      })
    }
  }

  private decodeToken(token: string): any{
    try{
      return JSON.parse(atob(token.split('.')[1]));
    }catch(e){
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;

    localStorage.setItem('lang',selectedLanguage);

    this.translateService.use(selectedLanguage);

  }

}
