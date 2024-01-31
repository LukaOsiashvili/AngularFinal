import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ){}

    ngOnInit(): void{
      this.createFormForRegistration();
    }

    registrationForm!:FormGroup;

    createFormForRegistration(): void{
      this.registrationForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      })
    }

    registerUser(): void{
      if(this.registrationForm.valid){
        const{...userData} = this.registrationForm.value;

        this.authService.registerUser({...userData}).subscribe({
          next: (response) =>{
            console.log("User Registered Succesfully: ", response);
            this.router.navigate(['/login']);
          },

          error: (error) => {
            console.log('Could Not Register User: ', error);
          }
        });
      }      
    }

    goToLogin(): void{
      this.router.navigate(['/login']);
    }

}
