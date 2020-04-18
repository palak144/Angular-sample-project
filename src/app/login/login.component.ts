import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: LoginModel = new LoginModel();
  loginForm: FormGroup;
  hide = true;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService) { 
       // redirect to home if already logged in
       if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username': [this.user.username, [
        Validators.required,
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoginSubmit() {
    alert(this.user.username + ' ' + this.user.password);
     // reset alerts on submit
     this.alertService.clear();

     this.loading = true;
     this.authenticationService.login(this.user.username, this.user.password)
     
         .pipe(first())
         .subscribe(
             data => {
                 this.router.navigate([this.returnUrl]);
             },
             error => {
                 this.alertService.error(error);
                 this.loading = false;
             });
 }
  

}
