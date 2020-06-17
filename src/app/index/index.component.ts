import { Component, OnInit } from '@angular/core';
import {CartServiceService} from '../service/cart-service.service';
import {HttpServiceService} from '../http-service.service';
import { BrowsecodesComponent } from '../browsecodes/browsecodes.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  categoryList :any;
  productsList:any;
  constructor(private cartService:CartServiceService,private http:HttpServiceService) { }


  ngOnInit() {
  }

}
