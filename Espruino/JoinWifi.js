/* 2016 Mark Becker,  No license restrictions on my part, do whatever you want */

/*

Platform : ESP

Status: beta 0.1

Start a webseserver on port 8080 to allow WIFI LOGIN

- webserver starts only if not connected as station

- entering the credential 

- connect, save, stop AP and reboot

require("https://raw.githubusercontent.com/MaBecker/esp8266/master/Espruino/JoinWifi.js");

*/
var http = require("http");
var Wifi = require("Wifi");

var C = {
  SSID : "" , 
  // based on https://github.com/tzapu/WiFiManager/blob/master/WiFiManager.h
  PAGE : "<!DOCTYPE html><html lang=\"en\"><head><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,user-scalable=no\"/>"
  +"<style>.c{text-align: center;}div,input{padding:5px;font-size:1em;}input{width:60%;} body{text-align: center;font-family:verdana;}button{border:0;border-radius:0.3rem;background-color:#1fa3ec;color:#fff;line-height:2.4rem;font-size:1.2rem;width:60%;}</style>"
  +"<script>function c(l){document.getElementById('s').value=l.innerText||l.textContent;document.getElementById('p').focus();}</script>"
  +"<body><div><H1>SETUP WIFI LOGIN</H1><br/>"
  +"<form method='get' action='save'>"
  +"<input id='s' name='s' length=32 placeholder='Name (SSID)'><br/>"
  +"<input id='p' name='p' length=64 type='password' placeholder='Password'><br/>"
  +"<br/><button type='submit'>connect</button>"
  +"</form>"
  +"</div></body></html>"
};

// pageHandler
// When a page is requested...
function pageHandler(req, res) {
  //console.log("req:"+JSON.stringify(req)+"\n");
  //console.log("res:"+JSON.stringify(res)+"\n");  
  //console.log(JSON.stringify(url.parse(req.url, true))+"\n");
  u = url.parse(req.url, true);

  if (req.method=="POST") {
    res.writeHead(200);
    res.end("Ok.");
  }
  if (req.method=="GET"){
    //console.log("GET "+req.url);
    if (u.pathname=="/") {
      res.writeHead(200);
      res.end(C.PAGE.replace("{esp}"));
    } 
    else if (u.pathname=="/save") {
      res.writeHead(200);
      Wifi.setHostname(C.SSID.replace('_','').toLowerCase());
      Wifi.connect(u.query.s, {password:u.query.p},
        function(err) {
          //console.log("["+err+"]");
          Wifi.save();
          Wifi.stopAP(function(){setTimeout(function(){require("ESP8266").reboot();},100);
        });
      });
    }
    else {
      res.writeHead(404);
      res.end("404: Not found");
    }
  }
}

// start http server if station is initial
function joinWifi() {
  if( Wifi.getIP().ip === "0.0.0.0" ) {
    Wifi.setConfig({powersave : "none"});
    setTimeout(function(){C.SSID = Wifi.getAPDetails().ssid;},100);
    // setTimeout(function(){_Wifi.startAP(C.SSID);},200);
    setTimeout(function(){http.createServer(pageHandler).listen(8080);},300);
  } else {
    Wifi.stopAP();
  }
}

exports.launch = function() {
  return new joinWifi();
};
