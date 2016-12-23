function Clock() {
  this.currentTime = moment().format("HH:mm:ss");
  this.alarmTime = null;
  this.snoozeTime = null;
}

exports.clockModule = Clock;
