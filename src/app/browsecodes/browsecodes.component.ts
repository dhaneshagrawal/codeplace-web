import { Component, OnInit } from '@angular/core';
import {CartServiceService} from '../service/cart-service.service';
import {HttpServiceService} from '../http-service.service';
@Component({
  selector: 'app-browsecodes',
  templateUrl: './browsecodes.component.html',
  styleUrls: ['./browsecodes.component.css']
})
export class BrowsecodesComponent implements OnInit {

  constructor(private cartService:CartServiceService,private http:HttpServiceService) { }

  ngOnInit() {
  }

}
