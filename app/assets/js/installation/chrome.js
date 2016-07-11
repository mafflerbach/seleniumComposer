
var InstallerChrome = class InstallerChrome {

  constructor(){
    console.log(os);
    console.log(os.arch());
    console.log(os.platform());
  }

  getInstaller () {
    var rpm = 'https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm';
    var deb = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb';

    var link = '';

    switch (os.platform()) {
      case 'win32':
        link = 'https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B88BA3A99-EA99-A20C-AD5D-F921C3BB5FCE%7D%26lang%3Dde%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dtrue%26ap%3Dx64-stable%26installdataindex%3Ddefaultbrowser/update2/installers/ChromeStandaloneSetup.exe';
        break;
      case 'win64':
        link = 'https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7B88BA3A99-EA99-A20C-AD5D-F921C3BB5FCE%7D%26lang%3Dde%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dtrue%26ap%3Dx64-stable%26installdataindex%3Ddefaultbrowser/update2/installers/ChromeStandaloneSetup64.exe';
        break;
      case 'linux' :
        link = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb';
        break;
      case 'linux' :
        link = 'https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm';
        break;
    }
  }
}
