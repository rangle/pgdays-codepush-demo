import {Page} from 'ionic-angular';
import {ApplicationRef} from '@angular/core';
declare const codePush: CodePushCordovaPlugin;

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {

  isUpdateAvailable: boolean = false;

  constructor(private appRef: ApplicationRef) { }

  checkForUpdate() {
    codePush.checkForUpdate((result) => {
      this.isUpdateAvailable = result !== null;
      this.appRef.tick();
    });
  }

  sync() {
    codePush.sync(null, {
      updateDialog: true,
      installMode: InstallMode.IMMEDIATE
    });
  }

}
