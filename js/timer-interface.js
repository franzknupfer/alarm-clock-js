var Clock = require('./../js/timer.js').clockModule;

// Use bind to pass 'this', which is an instance of the clock object, into other methods. These methods call 'updateTime' and 'alarm' every second.

Clock.prototype.checkTime = function() {
  setInterval(this.updateTime.bind(this), 1000);
};

Clock.prototype.checkAlarm = function() {
  setInterval(this.alarm.bind(this), 1000);
};

// Updates current time.

Clock.prototype.updateTime = function() {
  this.currentTime = moment().format("hh:mm:ss a");
  $("#clock").html(this.currentTime);
};

// Shows alarm if currentTime is equal to alarmTime.

Clock.prototype.alarm = function() {
  console.log(this.currentTime, this.alarmTime);
  if (this.currentTime === this.alarmTime) {
    showAlert();
  }
};

// Snooze method uses setTimeout to show alarm again after snoozeTime has elapsed.

Clock.prototype.snooze = function() {
  hideAlert();
  var timeoutInterval = this.snoozeTime * 60 * 1000;
  setTimeout(showAlert, timeoutInterval);
};

// Extracted out following method for use with setTimeout. Created hideAlert as well for consistency.

var showAlert = function() {
  $("#alert").show();
};

var hideAlert = function() {
  $("#alert").hide();
};

$(document).ready(function() {

  var clock = new Clock();
  clock.checkTime();
  clock.checkAlarm();

  $("form#clock-settings").submit(function(event) {
    event.preventDefault();
    var alarm = $("input#alarm").val();
    var alarm_array = alarm.split(":");
    var alarmTime = moment().set({'hour': alarm_array[0], 'minute': alarm_array[1], 'second': 0}).format("hh:mm:ss a");
    var snoozeTime = parseInt($("input#snooze").val());
    clock.alarmTime = alarmTime;
    clock.snoozeTime = snoozeTime;
  });

  $("button#snooze").click(function() {
    clock.snooze();
  });

});
