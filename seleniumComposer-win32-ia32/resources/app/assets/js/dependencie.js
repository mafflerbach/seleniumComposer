const fs = require('fs');
const download = require('download');
const decompress = require('decompress');
const remote = require('electron').remote;
app = remote.require('electron');
const appPath = app.app.getAppPath();

const spawn = require('child_process').spawn;


$(document).ready(function () {

  $('button[data-driver]').click(function () {
    getallDriver($(this).data('driver'));
  });

})

function getallDriver() {

  var me = 'http://chromedriver.storage.googleapis.com';
  loadDriverlist(me, 'chromedriver', 4);

  var me = 'http://selenium-release.storage.googleapis.com';
  loadDriverlist(me, 'IEDriverServer', 2);

  url = 'http://selenium-release.storage.googleapis.com/2.53/selenium-server-standalone-2.53.1.jar';
  var filename = 'selenium-server.jar';
  getDownload(url, false, filename);


 var extract = false;
  var url = 'https://download.microsoft.com/download/C/0/7/C07EBF21-5305-4EC8-83B1-A6FCC8F93F45/MicrosoftWebDriver.msi';
  $('#terminal-content').append('get: '+url+'<br/>');
  download(url).then(data => {
    $('#terminal-content').append('done: '+url+'<br/>');
    fs.writeFileSync(appPath+'/thirdparty/MicrosoftWebDriver.msi', data);
    installEdgeWebdriver();
  });

}


function loadDriverlist(url, keyword, count) {
  download(url).then(data => {
    foo = $(data.toString()).find("Key:contains('"+keyword+"')").orderBy(function() {
    return $(this).parent().children('Generation').text();
  })

  for(var i = 0; i < count; i++) {
    var me = url+'/'+foo[i].innerHTML;
    var mu = foo[i].innerHTML.split(/\//);
    var filename = mu[1].replace(/\.zip/, '');
    $('#terminal-content').append('get: '+me+'<br/>');
    $('#terminal-window').scrollTop(1E10);
    driverDownload(me, mu);
  }
  })
}


function driverDownload(me, mu) {
  download(me, appPath+'/thirdparty', {'extract': false}).then(data => {
    $('#terminal-content').append('done: '+me+'<br/>');
  $('#terminal-window').scrollTop(1E10);
    var name = mu[1].split(/_/);
    newname = name[0]+'_'+name[1];
    fs.writeFileSync(appPath + '/thirdparty/' + mu[1], data);
      decompress(appPath+'/thirdparty/' + mu[1], appPath+'/thirdparty/' + newname.replace(/\.zip/, '').toLowerCase()).then(files => {
        $('#terminal-content').append('decompress: '+mu[1]+'<br/>');
        fs.unlinkSync(appPath+'/thirdparty/' + mu[1]);
  $('#terminal-window').scrollTop(1E10);
      });
    });
}


jQuery.fn.orderBy = function(keySelector)
{
  return this.sort(function(a,b)
  {
    a = keySelector.apply(a);
    b = keySelector.apply(b);
    if (a < b)
      return 1;
    if (a > b)
      return -1;
    return 0;
  });
};


function installEdgeWebdriver() {
  var parameter = new Array('/a', appPath+'\\thirdparty\\MicrosoftWebDriver.msi','/L*v', appPath+'\\install.log',  'TARGETDIR='+appPath+'\\thirdparty\\MicrosoftWebDriver',  '/quiet');
  var seleniumNode = spawn('msiexec', parameter);
  _output(seleniumNode);
  $('#terminal-content').append('install: Edge Driver <br/>');

  function _output(obj)
  {
    obj.stdout.on('data', (data)=> {
      var test = `${data}`;
    $('#terminal-content').append(test + '<br/>');
    $('#terminal-window').scrollTop(1E10);

  })
    ;

    obj.stderr.on('data', (data)=> {
      var test = `${data}`;
    $('#terminal-content').append(test + '<br/>');
    $('#terminal-window').scrollTop(1E10);

  })
    obj.stderr.on('message', (data)=> {
      var test = `${data}`;
    $('#terminal-content').append(test + '<br/>');
    $('#terminal-window').scrollTop(1E10);

  })
    ;

    obj.on('close', (code) => {
      var test = `${code}`;
    fs.unlinkSync(appPath+'/thirdparty/MicrosoftWebDriver.msi');
    fs.unlinkSync(appPath+'/thirdparty/MicrosoftWebDriver/MicrosoftWebDriver.msi');

    fs.renameSync(
        appPath+'/thirdparty/MicrosoftWebDriver/Microsoft Web Driver/MicrosoftWebDriver.exe',
        appPath+'/thirdparty/MicrosoftWebDriver/MicrosoftWebDriver.exe');
    fs.rmdirSync(appPath+'/thirdparty/MicrosoftWebDriver/Microsoft Web Driver');
    $('#terminal-content').append('finish <br/>');
    $('#terminal-window').scrollTop(1E10);
  })
    ;
  }
}


function getDownload(url, extract, filename) {
  if (filename != '') {
    download(url, '', {'extract': extract}).then(data => {
      $('#terminal-content').append('get: '+url+'<br/>');
    $('#terminal-window').scrollTop(1E10);
      fs.writeFileSync(appPath + '/thirdparty/' + filename, data);
  })
    ;
  } else {
    download(url, appPath + '/thirdparty', {'extract': extract}).then(() => {
      $('#terminal-content').append('get: '+url+'<br/>');
    $('#terminal-window').scrollTop(1E10);
  })
    ;
  }
}
