import {Page, Platform} from 'ionic-angular';
import {ApplicationRef} from '@angular/core';
declare const codePush: CodePushCordovaPlugin;

@Page({
  templateUrl: 'build/pages/page1/page1.html',
})
export class Page1 {

  isUpdateAvailable: boolean = false;
  status: string = '';
  isProcessing: boolean = false;
  deployment: string = '';
  currentPackage: ILocalPackage;
  
  constructor(private appRef: ApplicationRef,
    private platform: Platform

  ) { }

  ngOnInit() {
    this.platform.ready().then(()=>this.getCurrentPackage())
  }
  
  getCurrentPackage() {
    codePush.getCurrentPackage((result: ILocalPackage) => {
      this.currentPackage = result;  
      this.appRef.tick();
    })
  }
  checkForUpdate(key) {
    this.isProcessing = true;
    this.status = 'Checking ... '
    codePush.checkForUpdate((result) => {
      this.isUpdateAvailable = result !== null;
      this.status = result === null ? 'Up to Date' : 'Update Available'
      this.isProcessing = false;
      this.appRef.tick();
    },
      null,
    key);
  }

  sync(key) {
    codePush.sync(null, {
      updateDialog: true,
      installMode: InstallMode.IMMEDIATE,
      deploymentKey: key
    });
  }

}
