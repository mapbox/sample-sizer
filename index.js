var tvalue = require('./tvalue');
var ss = require('simple-statistics');

module.exports = function(sample, confidence, errorTolerance) {
  var degreesFreedom = sample.length - 1;
  var tval = tvalue(degreesFreedom, confidence);
  var stdev = ss.sampleStandardDeviation(sample);
  var minimumSample = ((tval * tval * stdev * stdev) / (errorTolerance * errorTolerance));
  return Math.ceil(minimumSample);
};
