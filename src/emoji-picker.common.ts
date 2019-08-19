import { Observable } from 'tns-core-modules/data/observable';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export class Common extends Observable {
  constructor() {
    super();
    dialogs.alert("This Plugin is only working with NativeScript and Angular.\nFeel free to clone the repo and port it!");
  }
}

