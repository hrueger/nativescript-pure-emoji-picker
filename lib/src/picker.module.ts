import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { PickerComponent } from './picker.component';
import { SearchComponent } from './search.component';
import { SkinComponent } from './skins.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';


@NgModule({
    imports: [
        CommonModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule
    ],
    exports: [
        PickerComponent,
        SearchComponent,
        SkinComponent,
    ],
    declarations: [
        PickerComponent,
        SearchComponent,
        SkinComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PickerModule { }
