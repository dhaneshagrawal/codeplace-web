import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {CartServiceService} from '../service/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register = {
    "name":"",
    "email" : "",
    "mobile":"",
    "password":"",
    //"re_password":"",
  };
  constructor(private router:Router,private cartService:CartServiceService, private http:HttpServiceService) {
    let request = {}
   
    this.http.postRequest("api/status",{}).subscribe(data=>{
      console.log("test",data);
    },error=>{
    alert("Server connection error "+error)
    })
    if(this.http.isLogin()){
    }
      // code to get the cart details if logged in
    //  this.cartService.cartServiceEvent.subscribe(data=>{
    //  this.cart_qty = this.cartService.getQty();
    //})
   }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.register.name == ""){
      alert("Name should not be empty");
      return 
    }
    if(this.register.email == ""){
      alert("Email should not be empty");
      return 
    }
    if(this.register.mobile == ""){
      alert("Mobile should not be empty");
      return 
    }
    if(this.register.password == ""){
      alert("Password should not be empty");
      return 
    }
    // if(this.register.password != this.register.re_password){
    //   alert("Password and re passord should be same");
    //   return
    // }
    let request =   {
      "name" : this.register.name,
      "email" : this.register.email,
      "mobile" : this.register.mobile,
      "password" : this.register.password,
    }
    this.http.postRequest('api/signup/user',request).subscribe(data =>{
          alert("Register successfully...");
    },error=>{
      alert("Error in login " +error);
    })
  }

}
