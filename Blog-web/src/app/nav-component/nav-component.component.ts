import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrl: './nav-component.component.scss'
})
export class NavComponentComponent implements OnInit{
  username : any

  ngOnInit(): void {
   this.username = localStorage.getItem('username');
  }

}
