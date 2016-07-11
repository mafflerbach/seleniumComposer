
var InstallerJava = class InstallerJava {

  constructor() {
    console.log(os);
    console.log(os.arch());
    console.log(os.platform());
  }
  
  getInstaller () {


    win = 'http://javadl.oracle.com/webapps/download/AutoDL?BundleId=210183';
    win64 ='http://javadl.oracle.com/webapps/download/AutoDL?BundleId=210185';
    rpm64 = 'http://javadl.oracle.com/webapps/download/AutoDL?BundleId=207764';
    rpm = 'http://javadl.oracle.com/webapps/download/AutoDL?BundleId=207765';
  }
  
  
}
