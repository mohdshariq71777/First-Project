import { Component, OnInit } from '@angular/core';
import { WorkingService } from 'src/app/services/working-service/working.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private wrSrvc: WorkingService) { }

  ngOnInit(): void {
  }
  scroll() {
    this.wrSrvc.scrollTop()
  }

}
