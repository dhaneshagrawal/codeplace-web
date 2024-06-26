import { Component, OnInit } from '@angular/core';
import {CartServiceService} from '../service/cart-service.service';
import {HttpServiceService} from '../http-service.service';
@Component({
  selector: 'app-allcodes',
  templateUrl: './allcodes.component.html',
  styleUrls: ['./allcodes.component.css']
})
export class AllcodesComponent implements OnInit {



  categoryList :any;
  productsList:any;
  constructor(private cartService:CartServiceService,private http:HttpServiceService) { }

  ngOnInit() {
    // this.http.postRequestWithToken("api/product/getAllCategory",{}).subscribe(data=>{
    //   this.categoryList = data;
    //   if(this.categoryList.length > 1)
    //     this.getProductsByCateogy(data[0])
    // },error=>{
    //   alert("Server connection error "+error)
    // })

    this.http.postRequest("product/getAllCategory",{}).subscribe(data=>{
      console.log("getAllCategory",data);
      this.categoryList = data;
      if(this.categoryList.length > 1)
      this.getProductsByCateogy(data[0])
    },error=>{
    alert("Server connection error "+error)
    })

  }



  addCart(cartProductObj){
    if(this.http.isLogin())
    {
      var cartObj = {
        "productId":cartProductObj.id,
        "qty":"1",
        "price":cartProductObj.price
      }
      this.cartService.addCart(cartObj);
    }
    else {
      alert("Please Sign in first");
    }
  }
  getProductsByCateogy(obj){
    let request ={
      "cat_id":obj.id
    }
  //  this.http.postRequestWithToken('/product/getProductsByCategory',request).subscribe(data=>{
  //     this.productsList = data
  //     if(this.productsList.length == 0){
  //       alert("No Product is found..");
  //     }
  //  },error=>{
  //    alert("Error in login "+error);
  //  })
   this.http.postRequest("product/getProductsByCategory",request).subscribe(data=>{
    console.log("getProductsByCategory",data);
    this.productsList = data
    if(this.productsList.length == 0){
      alert("No Product is found..");
    }
  },error=>{
  alert("Server connection error "+error)
  })

  }

}
