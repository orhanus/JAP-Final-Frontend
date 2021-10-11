import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService,
     private router: Router) { }

  ngOnInit(): void {
  }

  

  register(){
    
    if(!this.validatePassword()){
      this.toastr.error("Passwords must contain uppercase and lowercase letters and at least one number");
      return;
    }

    if(this.model?.password !== this.model?.confirmPassword){
      this.toastr.error("Passwords do not match");
      return;
    }

    
    this.accountService.register({username: this.model.username, password: this.model.password})
      .subscribe((response) => {
        if(response.status == 200){
          this.toastr.success("You have successfuly registered.");
          this.router.navigateByUrl('login')
        }
      },
      (error) => {
        this.toastr.error("Username is taken");
      })
  }

  validatePassword(): boolean{
    if(this.model?.password == null || this.model?.confirmPassword == null)
      return false;

    var password = this.model.password as string;
    let res = password.match(/[A-Z]/g);
    if(res == null || res?.length === 0)
      return false;

    res = password.match(/[a-z]/g);
    if(res == null || res?.length === 0)
      return false;

    res = password.match(/[0-9]/g);
    if(res == null || res?.length === 0)
      return false;

    return true;
  }

}
