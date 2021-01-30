import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../service/validate.service';
import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Router } from '@angular/router';

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

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    ) { }

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
    }else{

      // Validate Email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please use valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }else{

        // Register User
        this.authService.registerUser(user).subscribe(data => {
          if(data){
            this.flashMessage.show('You are now registered into the system', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['/login']);
          }else{
            this.flashMessage.show('Something went Wrong', {cssClass: 'alert-danger', timeout: 3000});
            this.router.navigate(['/register']);
          }
        });
      }
      return true;
    }

    // // Validate Email
    // if(!this.validateService.validateEmail(user.email)){
    //   this.flashMessage.show('Please use valid email', {cssClass: 'alert-danger', timeout: 3000});
    //   return false;
    // }else{
    //   return true;
    // }

    // // Register User
    // this.authService.registerUser(user).subscribe(data => {
    //   if(data){
    //     this.flashMessage.show('You are now registered into the system', {cssClass: 'alert-success', timeout: 3000});
    //     this.router.navigate(['/login']);
    //   }else{
    //     this.flashMessage.show('Something went Wrong', {cssClass: 'alert-danger', timeout: 3000});
    //     this.router.navigate(['/register']);
    //   }
    // });


  }

}
