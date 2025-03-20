import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrl: './nav-component.component.scss'
})
export class NavComponentComponent implements OnInit{

  @Input()  username : any
  // constructor(private router : ActivatedRouteSnapshot){}

  ngOnInit(): void {
   this.username = localStorage.getItem('username');
  }

}
