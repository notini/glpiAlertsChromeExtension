window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("save").addEventListener('click', function(){
      saveOptions();
    });
    document.getElementById("restore").addEventListener("click",function(){
      restoreDefaultOptions();
    });
});

function saveOptions() {
  if (document.getElementById("ws").value.trim().length > 0){
    localStorage["wsServiceAddress"] = document.getElementById("ws").value;  
  }
  else
    alert('Invalid WebService Addres. Field is empty!');
  
  if (document.getElementById("timer").value.trim().length > 0 && !isNaN(document.getElementById("timer").value)){
    localStorage["timer"] = document.getElementById("timer").value;
    chrome.alarms.clear('glpi', function(alarm){
    });
    chrome.alarms.create('glpi', {delayInMinutes: parseInt(localStorage["timer"]), periodInMinutes: parseInt(localStorage["timer"])});
  }
  else
    alert('Invalid timer value! Only numbers allowed!');
}

function restoreDefaultOptions() {
  localStorage.removeItem("wsServiceAddress");
  localStorage.removeItem("timer");
  location.reload();
}