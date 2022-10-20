import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.css']
})
export class FloatingButtonComponent implements OnInit {

  constructor(private service : AuthService) { }

  ngOnInit(): void {
  }

  accesoPaciente(){
    this.service.login('franco.spineti@gmail.com','1234567');
  }

  accesoEspecialista(){
    this.service.login('','1234567');
  }

  accesoAdmin(){
    this.service.login('admin@admin.com','1234567');
  }

}
