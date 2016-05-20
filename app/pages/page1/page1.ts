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

  syncHandler(status: SyncStatus) {
    switch (status) {
      case SyncStatus.UP_TO_DATE:
        this.status = 'Up-to-date';
        break;
      case SyncStatus.UPDATE_INSTALLED:
        this.status = 'Update Installed';
        break;
      case SyncStatus.UPDATE_IGNORED:
        this.status = 'Update Ignored';
        break;
      case SyncStatus.ERROR:
        this.status = 'Error';
        break;
      case SyncStatus.IN_PROGRESS:
        this.status = 'In Progress';
        break;
      case SyncStatus.CHECKING_FOR_UPDATE:
        this.status = 'Checking for Update';
        break;
      case SyncStatus.AWAITING_USER_ACTION:
        this.status = 'Awaiting User Action';
        break;
      case SyncStatus.DOWNLOADING_PACKAGE:
        this.status = 'Downloading Package';
        break;
      case SyncStatus.INSTALLING_UPDATE:
        this.status = 'Installing Update';
        break;
    }
    this.appRef.tick();
  }
  sync(key) {
     codePush.sync((status) => this.syncHandler(status), {
      updateDialog: true,
      installMode: InstallMode.IMMEDIATE,
      deploymentKey: key
    });
  }

}
