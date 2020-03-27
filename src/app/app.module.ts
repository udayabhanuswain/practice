import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';  
import { FormsModule } from '@angular/forms'; 
import {CommonService} from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule

  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
