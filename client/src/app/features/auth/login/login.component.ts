import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() { 
    this.accountService.login(this.model).subscribe(response => {
      this.toastr.success("You have logged in");
      console.log(this.accountService.getUserRole());
      this.router.navigateByUrl('');
    });

  }

  logout() {
    this.accountService.logout();
  }

}
