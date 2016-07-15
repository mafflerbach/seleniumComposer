var getos = require('getos');
const osName = require('os-name');

var InstallerFirefox = class InstallerFirefox {

  constructor() {
    console.log(os);
    console.log(os.arch());
    console.log(os.platform());
    console.log(os.type());
  }

  _output(obj) {
    obj.stdout.on('data', (data) => {
      var test = `${data}`;
    $('#terminal-content').append(test + '<br/>');
    $('#terminal-window').scrollTop(1E10);
  })
    ;

    obj.stderr.on('data', (data) => {
      var test = `${data}`;
    $('#terminal-content').append(test + '<br/>');
    $('#terminal-window').scrollTop(1E10);

  })
    obj.stderr.on('message', (data) => {
      var test = `${data}`;
    $('#terminal-content').append(test + '<br/>');
    $('#terminal-window').scrollTop(1E10);
  })
    ;

    obj.on('close', (code) => {
      var test = `${code}`;
    $('#terminal-content').append('finish install firefox <br/>');
    $('#terminal-window').scrollTop(1E10);
  })
    ;
  }

  install() {
    if (this.getInstaller()) {

    } else {

    }

  }

  getInstaller() {
    var version = getos(function (e, os) {
      if (e) return console.log(e)
      console.log("Your OS is:" + JSON.stringify(os))
    })

    var link = '';

    switch (os.platform()) {
      case 'win32':
        link = 'https://download.mozilla.org/?product=firefox-latest&os=win&lang=en-US';
        break;
      case 'win64':
        link = 'https://download.mozilla.org/?product=firefox-latest&os=win64&lang=en-US';
        break
      default :
        if (os.arch() == 'x64') {
          link = 'https://download.mozilla.org/?product=firefox-latest&os=linux64&lang=de';
        } else {
          link = 'https://download.mozilla.org/?product=firefox-latest&os=linux&lang=de';
        }
        break;
    }

    var terminal = new Terminal('get: ' + link);
    var that = this;
    terminal.updateTerminal();

    if (os.platform().indexOf('win') >= 0) {

      download(link).then(data => {
        fs.writeFileSync(appPath + '/thirdparty/firefox.exe', data);
        var parameter = new Array('-ms');
        var seleniumNode = spawn(appPath + '/thirdparty/firefox.exe', parameter);
        that._output(seleniumNode);
        terminal.clearInterval('done: ' + link);
      });

    } else {

      download(link, appPath+'/thirdparty', {'extract': true}).then(data => {
        $('#terminal-content').append('done: '+link+'<br/>');
        $('#terminal-window').scrollTop(1E10);
        terminal.clearInterval('done: ' + link);
      });
    }

    return true;
  }



  getRevision () {
    var terminal = new Terminal('get Revision');
    var winLink ="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Linux_x64%2FLAST_CHANGE?alt=media";
    var linux ="https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2FLAST_CHANGE?alt=media";

    download(winLink).then(data => {
      fs.writeFileSync(appPath + '/thirdparty/chromerelease.txt', data);

    fs.readFile(appPath + '/thirdparty/chromerelease.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });

    terminal.clearInterval('done: ' + link);
  })

  }


  command(type) {
    switch (type) {
      case 'linux':

        break;
      case 'win':

        break;
    }
  }

}
