import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../service/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name!: String;
  email!: string;
  username!: String;
  password!: String;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }else{
      return true;
    }
  }

}
