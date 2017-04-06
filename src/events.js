chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'glpi'){
  	show();
  }
});

function show(){

  var x = new XMLHttpRequest();
  x.open('GET',localStorage["wsServiceAddress"]);
  x.onload = function() {
    var response = JSON.parse(x.response);
    if (response.length === 0){
      return;
    }
    else{
      var text = "";
      response.forEach(function (each){
        text = text + each.id + ' - ' + each.name + '\n';        
      })
      var not = chrome.notifications.create('reminder', {
              type: 'basic',
              iconUrl: 'img/exclamation.png',
              title: response.length + ' new tickets!',
              message: text
      });      
    }
  };
  x.onerror = function() {
      var not = chrome.notifications.create('reminder', {
              type: 'basic',
              iconUrl: 'img/exclamation.png',
              title: 'Error conecting to WebService!',
              message: 'Check if the provided WebService URL is valid and/or the backend service is started! ' + '\n' +
              'Provided webservice address: ' + localStorage["wsServiceAddress"] + '.'
      });        
  };
  x.send();  
}