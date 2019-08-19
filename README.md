# nativescript-emoji-picker

[![Build Status](https://travis-ci.com/hrueger/nativescript-emoji-picker.svg?branch=master)](https://travis-ci.com/hrueger/nativescript-emoji-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

There are many emoji pickers for angular and the web, but no one for NativeScript?! Let's change this!

As this plugin is currently in developement screenshots will be added later this year.

## Prerequisites / Requirements

ToDo

## Installation

First copy the assets from here and here to your assets folder (/app/assets/). Then install the plugin using

```javascript
tns plugin add <nativescript-emoji-picker>
```

## Usage 

Include the `PickerModule` in your `app.module.ts` like so:
```tyescript
import { PickerModule } from "nativescript-emoji-picker";

...

@NgModule({
  declarations: [HomeComponent, otherComponents,],
  imports: [NativeScriptCommonModule, PickerModule, otherModules,],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }

```
and use it in your Template like this:

```html
<emoji-picker showEmojiPicker="true"></emoji-picker>
```

Note: You can't use the  *ngIf directive on this element because of a bug with NativeScript's TabView. Just set the `showEmojiPicker` property to false and the picker will disappear.

To use different emojis then Apple's ones, you only have to change the .png files in your app's `assets/emoji-picker-emojis` folder. The emojis I'm using are downloaded from [https://github.com/iamcal/emoji-data](https://github.com/iamcal/emoji-data)
Be sure to use the 64px files, as the already more than 10 MB big.

## API

    
| Property | Default | Description |
| --- | --- | --- |
| some property | property default value | property description, default values, etc.. |
| another property | property default value | property description, default values, etc.. |
    
## License

MIT
