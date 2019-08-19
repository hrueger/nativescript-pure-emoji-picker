import { CommonModule } from "@angular/common";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { PickerComponent } from "./picker.component";
import { SearchComponent } from "./search.component";
import { SkinComponent } from "./skins.component";

@NgModule({
    exports: [
        PickerComponent,
        SearchComponent,
        SkinComponent,
    ],
    imports: [
        CommonModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
    ],

    declarations: [
        PickerComponent,
        SearchComponent,
        SkinComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA,
    ],
})
export class PickerModule { }
