# nativescript-pure-emoji-picker😃

[![Build Status](https://travis-ci.org/hrueger/nativescript-pure-emoji-picker.svg?branch=master)](https://travis-ci.org/hrueger/nativescript-pure-emoji-picker) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/hrueger/nativescript-pure-emoji-picker/blob/master/LICENSE) [![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/hrueger/nativescript-pure-emoji-picker/graphs/commit-activity) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/hrueger/nativescript-pure-emoji-picker/) [![Greenkeeper badge](https://badges.greenkeeper.io/hrueger/nativescript-pure-emoji-picker.svg)](https://greenkeeper.io/)

This is an emoji picker - built out of pure nativescript components only!

## Limitations

- Angular needed: This plugin currently only works in an Angular NativeScript project. Feel free to clone this repo and port it to JavaScript!
- Search not implemented yet
- Skins not implemented yet

## Installation

- First copy the the folders in from [here](https://github.com/hrueger/nativescript-pure-emoji-picker/tree/master/app/assets/) to your assets folder (/app/assets/).
- Then install the plugin using `tns plugin add nativescript-pure-emoji-picker`

## Usage 

Include the `PickerModule` in your `app.module.ts` like so:
```javascript
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

**Important**: You **can't use** the  ***ngIf** directive on this element because of a bug with NativeScript's TabView. Just set the `showEmojiPicker` property to false and the picker will disappear.

To use different emojis then Apple's, you only have to change the .png files in your app's `assets/emoji-picker-emojis` folder. The emojis I'm using are downloaded from [https://github.com/iamcal/emoji-data](https://github.com/iamcal/emoji-data).
  Be sure to use the **64px** files, as the already more than 10 MB big.

## API

    
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `showEmojiPicker` | `boolean` | `false` | set the visibility of the picker |
| `perLine` | `number` | `10` | set the number of emojis displayed per line |
| `color` | `string` | `#2b669a` | set the color of the highlighted tab |
| `emojiClick` | `EventEmitter<string>` | `false` | is emitted when emoji is tapped, returns `string` |
| `backspaceClick` | `EventEmitter<any>` | `false` | is emitted when the builtin backspace button is tapped |

### Fully configured example:
```html
<emoji-picker
  showEmojiPicker="true"
  perLine="8"
  color="#fcba03"
  emojiClick="onEmojiClickedDoSth(emojiCode)"
  backspaceClick="onBackspaceClickedDoSth()"
>
</emoji-picker>
```

## License

MIT
