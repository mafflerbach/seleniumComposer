
var InstallerChrome = class InstallerChrome {

  constructor() {
    console.log(os);
    console.log(os.arch());
    console.log(os.platform());
  }

  getChrome (revision) {

    var dwlink = '//https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F'+revision+'%2Fchrome-linux.zip?alt=media';
    if (os.platform().indexOf('win') == 0) {
      dwlink = 'https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2F'+revision+'%2Fchrome-win32.zip?alt=media';
    }

    var terminal2 = new Terminal('get Chromium Browser');
    terminal2.updateTerminal();
    download(dwlink , appPath+'/thirdparty', {'extract': true}).then(data => {
        fs.unlinkSync(appPath+'/thirdparty/chromerelease.txt');
        terminal2.clearInterval('<br/>Done');
    });
  }


  getInstaller() {
    var terminal = new Terminal('get Revision');
    var that = this;

    var link ="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2FLAST_CHANGE?alt=media";
    if (os.platform().indexOf('win') == 0) {
      link ="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2FLAST_CHANGE?alt=media";
    }

    download(link ).then(data => {
      fs.writeFileSync(appPath + '/thirdparty/chromerelease.txt', data);
      fs.readFile(appPath + '/thirdparty/chromerelease.txt', 'utf8', function (err,revision) {
        if (err) {
          return console.log(err);
        }
        that.getChrome(revision);
      });
      terminal.clearInterval('done: ' + link );
    })

  }

}
  //https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2F405713%2Fchrome-win32.zip&alt=media
  //https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2F405719%2Fchrome-linux.zip?alt=media