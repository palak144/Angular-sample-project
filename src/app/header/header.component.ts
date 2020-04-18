import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title = 'Pick My Solar';
  isAuthenticated: LoginModel;
  constructor( 
    private router: Router,
    private authenticationService: AuthService) {
      this.authenticationService.currentUser.subscribe(x => this.isAuthenticated = x);
     }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
