window.addEventListener('DOMContentLoaded', function() {

  chrome.alarms.create('glpi', {delayInMinutes: parseInt(localStorage["timer"]), periodInMinutes: parseInt(localStorage["timer"])});  

});


