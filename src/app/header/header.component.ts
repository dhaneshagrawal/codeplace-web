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
  cartObj = [];
  cart_qty = 0;
  cartTotalPrice = 0;
  categoryList : any;
  welcomeUserName = "";


  constructor(private router:Router,private cartService:CartServiceService, private http:HttpServiceService) { 
    let request = {}
   
    this.http.postRequest("api/status",{}).subscribe(data=>{
      console.log("test",data);
    },error=>{
    alert("Server connection error "+error)
    })
    // if(this.http.isLogin()){
    //   console.log("login status header");
    //   this.isLogin = true;
    //   this.welcomeUserName = this.http.getLoginDataByKey("name");
    // }
      // code to get the cart details if logged in
      this.cartService.cartServiceEvent.subscribe(data=>{
      this.cart_qty = this.cartService.getQty();
    })
    // code to update header and put user name if logged in from sign in component
    this.http.loginServiceEvent.subscribe(data=>{
      if(this.http.isLogin()){
        console.log("login status header");
        this.isLogin = true;
        this.welcomeUserName = this.http.getLoginDataByKey("name");
      }
    })
  }

  logout(){
    this.http.logout();
    this.isLogin= false;
  }

  ngOnInit(): void {
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
