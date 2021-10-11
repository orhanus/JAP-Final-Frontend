import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Screening } from 'src/app/core/models/Screening';
import { AccountService } from 'src/app/core/services/auth.service';
import { ShowsService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent implements OnInit {
  @Input() screening: Screening;
  constructor(private showService: ShowsService, private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  buyTicket(){
    this.showService
    .buyTicket({
      screeningId: this.screening.id,
      userId: this.accountService.currentUser$.pipe(take(1))
      .subscribe(res => {return res.id}),
      numberOfTickets: 1
    }).subscribe(res => {
      this.toastr.success("Successfully bought a ticket");
    }, err => {
      this.toastr.error("Could not buy ticket");
    })
    
  }

}
