/*
	Communication with IOT service fencer.io


apiKey       = 'b66bd93d-6cf7-5982-bf07-84ab8d2bb4a6';
geoKeySample = '7e8e578a-fb5b-4775-b078-d12037b0c831';

fencer = require('FencerIO').setup(apiKey);


fencer.apiCall( {
  geoKey  : geoKeySample,
  apiCall : '/position/status',
  latPos  : 49.41005946278315,
  lngPos  : 8.714930000000095 },
  function(data){
    console.log('result:'+data);
  });

fencer.apiCall({ 
  geoKey  : geoKeySample, 
  apiCall : '/geofence' },
  function(data){
    console.log('result:'+data);
  });

*/

var http = require('http');

var apiKey = '';

function FencerIO(_apiKey) {
	apiKey = _apiKey;
}

var buildOptions = function(_options) {

	var options = {
      host: 'httptohttps.xyz',
      path: '/https://api.fencer.io/v1.0' + _options.apiCall + '/' + _options.geoKey,
      method: 'GET',
      headers: { 'Authorization' : apiKey }
  };

  if ( _options.latPos ) {
      options.headers['Lat-Pos'] = _options.latPos;
  }

  if (_options.lngPos) {
      options.headers['Lng-Pos'] = _options.lngPos;
  }


  console.log(options);

	return options;
};

FencerIO.prototype.apiCall = function(options, callBack) {
	http.get(buildOptions(options), function(res) {
      var content = '';
      res.on('data', function(data) {
        content += data;
      });
      res.on('close', function(data) {
        if (callBack) {
          callBack(content);
        }
        console.log('Connection closed');
      });
	});
};

exports.setup = function (_apiKey) {
  return new FencerIO(_apiKey);
};
