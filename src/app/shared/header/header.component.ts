import { Component, OnInit } from '@angular/core';
import { WorkingService } from 'src/app/services/working-service/working.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private wrkSrvc: WorkingService) { }

  ngOnInit(): void {
  }
  scroll() {
    this.wrkSrvc.scrollTop()
  }
}
