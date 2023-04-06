import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkingService {

  constructor() { }
  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
