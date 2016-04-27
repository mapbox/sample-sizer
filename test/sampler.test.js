var test = require('tap').test;
var samples = require('./fixtures/samples.json');
var sufficientSample = require('../lib/index');

test('test confidence interval', function(t) {
  samples.forEach(function(sample) {
    var sample_size = sufficientSample(sample.record, sample.confidence, sample.speedRange);
    t.equal(sample_size, sample.expected_sample_size, 'expected sample size of ' + sample_size);
  });
  t.end();
});
