

const cookie = require('cookie');


var InstallerJava = class InstallerJava {

  constructor() {
    console.log(os);
    console.log(os.arch());
    console.log(os.platform());
  }

  runInstaller () {
    console.log(appPath+ '/thirdparty/java.exe');
    var parameter = new Array('/s');
    var seleniumNode = spawn(appPath + '/thirdparty/jdk-8u91-windows-i586.exe', parameter);
    console.log(seleniumNode)
    this._output(seleniumNode);

  }

  getInstaller () {
// Fucking JAVA, fucking oracle page,
    var link = '';
    switch (os.platform()) {
      case 'win32':
        link = 'http://download.oracle.com/otn-pub/java/jdk/8u91-b15/jre-8u91-windows-i586.tar.gz';
        break;
      case 'win64':
        link = 'http://download.oracle.com/otn-pub/java/jdk/8u91-b15/jre-8u91-windows-x64.tar.gz';
        break
      default :
        if (os.arch() == 'x64') {
          link = 'http://download.oracle.com/otn-pub/java/jdk/8u92-b14/jre-8u92-linux-x64.tar.gz';
        } else {
          link = 'http://download.oracle.com/otn-pub/java/jdk/8u92-b14/jre-8u92-linux-i586.tar.gz';
        }
        break;
    }

    var terminal = new Terminal('get: ' + link);
    var that = this;
    terminal.updateTerminal();

    if (os.platform().indexOf('win') >= 0) {


      var output = appPath+'/thirdparty/java.tar.gz';

      var request = require("request");
      var jar = request.jar();

      jar.setCookie("oraclelicense=accept-securebackup-cookie", '.oracle.com/');
      jar.setCookie("gpw_e24=http%3A%2F%2Fwww.oracle.com%2F", '.oracle.com/');

      console.log(jar)
      request({
        uri: link,
        method: "GET",
        jar: jar
      }, function(error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body);
      }).pipe(fs.createWriteStream(output));
      

/*


      download(link,appPath+'/thirdparty',
          {
            'extract': true,
            cookie: cookie.serialize('gpw_e24', 'http%3A%2F%2Fwww.oracle.com%2F', 'oraclelicense', 'accept-securebackup-cookie')

          })
          .then(data => {
            terminal.clearInterval('done: ' + link);
      });
 */
    } else {

      download(link, appPath+'/thirdparty', {'extract': true}).then(data => {
        terminal.clearInterval('done: ' + link);
      });
    }
  }


  _output(obj) {

    console.log(obj);

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


}
