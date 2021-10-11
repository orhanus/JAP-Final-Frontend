import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigateByUrl('login');
  }
  logout(){
    this.accountService.logout();
  }

}
