var ss = require('simple-statistics');
var incrementer = require('./incrementer');

module.exports = function(sample, confidence, errorTolerance) {
  var sizer = new incrementer();
  for (var i = 0; i < sample.length; i ++) {
    sizer.push(sample[i]);
  }
  return sizer.minimumSample(confidence, errorTolerance);
};
