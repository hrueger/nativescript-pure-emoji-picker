import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { PickerModule } from "nativescript-emoji-picker";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [NativeScriptCommonModule, HomeRoutingModule, PickerModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule { }
