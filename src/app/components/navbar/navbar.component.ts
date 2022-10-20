import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  adminLogueado !: boolean;

  constructor() { }

  ngOnInit(): void {
    this.adminLogueado = this.isAdmin();
  }

  isAdmin(){
    let obj = JSON.parse(localStorage.getItem('administrador')!);
    return obj != null ? true : false;
  }


}
