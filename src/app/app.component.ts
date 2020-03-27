import { Component, OnInit } from '@angular/core';

import { CommonService } from './data.service';
import { FormGroup, FormControl, Validators, FormsModule, } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Repdata;
  Repdata2;
  Repdata3;
  ok;
  constructor(private newService: CommonService) { }

  onSave = function () {
    this.newService.Get_test().subscribe(data => this.Repdata = data);

  }

  onSaves = function (what_data) {
    //console.log("This data" + JSON.stringify(what_data));
    this.newService.Gettest2(what_data).subscribe(data => this.Repdata2 = data);

  }

  onSaves2 = function (what_data) {
    //console.log("This data" + JSON.stringify(what_data));
    this.newService.Gettest3(what_data).subscribe(data => this.Repdata3 = data);

  }


}





