import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {CartServiceService} from '../service/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email = "";
  password = "";

  constructor(private router:Router,private cartService:CartServiceService, private http:HttpServiceService) {
    let request = {}
   
    this.http.postRequest("api/status",{}).subscribe(data=>{
      console.log("test",data);
    },error=>{
    alert("Server connection error "+error)
    })
    if(this.http.isLogin()){
//      this.isLogin = true;
//      this.welcomeUserName = this.http.getLoginDataByKey("name");
    }
      // code to get the cart details if logged in
//      this.cartService.cartServiceEvent.subscribe(data=>{
//      this.cart_qty = this.cartService.getQty();
//    })
      this.http.loginServiceEvent.subscribe(data=>{
    })
   }

  ngOnInit(): void {
  }

  loginUserCheck(){
    if(this.email == ""){
      alert("Email should not be empty");
      return 
    }
    if(this.password == ""){
      alert("Password should not be empty");
      return 
    }
    let request = {
      "email" : this.email,
      "password" : this.password
    }
    this.http.postRequest('api/login/user',request).subscribe(data=>{
        if(data.hasOwnProperty("token")){
          console.log("login successful, user data "+ data);
          this.http.setLoginToken(data['token']);
          this.http.setLoginData(data);
//          this.welcomeUserName = this.http.getLoginDataByKey("name");
//          this.isLogin = true;
//          this.isOpenLoginDialog = false;
          // close login box
//          this.closeDialog();
          // calling getCart details for the user
          // maybe not needed currently
//          this.cartService.getCartDetailsByUser();
//            window.location.reload();
            this.http.loginServiceEvent.next({"status":"completed"});
            this.router.navigate([""]);
        }
    },error=>{
      alert("Error in login " +error);
    })

  }

}
