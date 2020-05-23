import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
import {CartServiceService} from '../service/cart-service.service';
import { timingSafeEqual } from 'crypto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpenLoginDialog = false;
  currentDropDownMenu = "";
  dialogType = "login";
  mainDialogType = "";
  isLogin = false;
  email = "";
  password = "";
  cartObj = [];
  cart_qty = 0;
  cartTotalPrice = 0;
  categoryList : any;
  welcomeUserName = "";
  register = {
    "name":"",
    "email" : "",
    "mobile":"",
    "password":"",
    "re_password":"",
  };

  constructor(private router:Router,private cartService:CartServiceService, private http:HttpServiceService) { 
    let request = {}
   
    this.http.postRequest("api/status",{}).subscribe(data=>{
      console.log("test",data);
    },error=>{
    alert("Server connection error "+error)
    })
    if(this.http.isLogin()){
      this.isLogin = true;
      this.welcomeUserName = this.http.getLoginDataByKey("name");
    }
      // code to get the cart details if logged in
      this.cartService.cartServiceEvent.subscribe(data=>{
      this.cart_qty = this.cartService.getQty();
    })
  }

  logout(){
    this.http.logout();
    this.isLogin= false;
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
          this.welcomeUserName = this.http.getLoginDataByKey("name");
          this.isLogin = true;
          this.isOpenLoginDialog = false;
          // close login box
          this.closeDialog();
          // calling getCart details for the user
          this.cartService.getCartDetailsByUser();
        }
    },error=>{
      alert("Error in login " +error);
    })

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
    if(this.register.password != this.register.re_password){
      alert("Password and re passord should be same");
      return
    }
    let request =   {
      "name" : this.register.name,
      "email" : this.register.email,
      "mobile" : this.register.mobile,
      "password" : this.register.password,
    }
    this.http.postRequest('api/signup/user',request).subscribe(data =>{
          alert("Register successfully...");
          this.dialogType = "login";
    },error=>{
      alert("Error in login " +error);
    })

  }
  checkout_btn(){
    this.router.navigate(['checkout']);
   }
  openCheckoutModel(){
    this.cartObj =  this.cartService.getCartOBj();
    this.cartTotalPrice  = this.cartService.cartTotalPrice;
    this.mainDialogType = "checkout";
  }
  openDialog(){
    this.mainDialogType = "login";
  }
  closeDialog(){
    this.mainDialogType = "";
 }
  dialogTypeInside(type){
    if(this.dialogType != type) {
      this.dialogType = type;
    }
  }
  currentDropDown(currentDropDownMenuName){
    if(this.currentDropDownMenu == currentDropDownMenuName){
      this.currentDropDownMenu = "";
    } else {
      this.currentDropDownMenu = currentDropDownMenuName;
    }
  }
}
