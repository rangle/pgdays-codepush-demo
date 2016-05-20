import {Page} from 'ionic-angular';
import {ApplicationRef} from '@angular/core';
declare const codePush: CodePushCordovaPlugin;

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {

  isUpdateAvailable: boolean = false;
  status: string = '';
  isProcessing: boolean = false;
  constructor(private appRef: ApplicationRef) { }

  checkForUpdate() {
    this.isProcessing = true;
    this.status = 'Checking ... '
    codePush.checkForUpdate((result) => {
    this.isUpdateAvailable = result !== null;
    this.status = result === null ? 'Up to Date' : 'Update Available'
    this.isProcessing = false;
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
