var tvalue = require('./tvalue');


/**
 *  Use:
 *  var i = new Incrementer();
 *  i.push(3.14159)
 *  i.push(1.618)
 *  i.push(2.718)
 *  i.standardDeviation();
 *  // => 0.7864217460752213
 *  i.variance();
 *  // => 0.6184591626999999
 *  i.minimumSample(0.99, 2);
 *  // => 8
 */ 
function Incrementer() {
  this.m_n = 0;
}


/**
 * Clear the incremental average
 */
Incrementer.prototype.clear = function () {
  this.m_n = 0;
};

/**
 *  Add value to running average calculation
 *
 *  @param {number} value - the value to add
 */
Incrementer.prototype.push = function (x) {
  this.m_n++;

  // See Knuth TAOCP vol 2, 3rd edition, page 232
  if (this.m_n === 1) {
    this.m_oldM = this.m_newM = x;
    this.m_oldS = 0.0;
  } else {
    this.m_newM = this.m_oldM + (x - this.m_oldM) / this.m_n;
    this.m_newS = this.m_oldS + (x - this.m_oldM) * (x - this.m_newM);

    // set up for next iteration
    this.m_oldM = this.m_newM;
    this.m_oldS = this.m_newS;
  }
};

/**
 *  Return the number of incremental steps made so far
 */
Incrementer.prototype.numDataValues = function () {
  return this.m_n;
};

/**
 *  Return the current mean
 */
Incrementer.prototype.mean = function () {
  return (this.m_n > 0) ? this.m_newM : 0.0;
};

/**
 *  Return the current variance
 */
Incrementer.prototype.variance = function () {
  return ((this.m_n > 1) ? this.m_newS / (this.m_n - 1) : 0.0);
};

/**
 *  Return the current standard deviation
 */
Incrementer.prototype.standardDeviation = function () {
  return Math.sqrt(this.variance());
};

/**
 *  Return the current degrees of freedom
 */
Incrementer.prototype.degreesFreedom = function () {
  return this.m_n - 1;
};

/**
 *  Calculates and returns the t-critical value for the degrees
 *  of freedom and desired confidence interval.
 *
 *  @param {number} confidence - the desired level of confidence
 */
Incrementer.prototype.tval = function (confidence) {
  return tvalue(this.degreesFreedom(), confidence);
};

/**
 *  Calculates and returns the minimum sample size required to
 *  achieve an mean estimate given <confidence> and <errorTolerance>
 *
 *  @param {number} confidence - the desired level (percentage) of confidence for the estimate
 *  @param {number} errorTolerance - the error tolerance of the mean estimate
 */
Incrementer.prototype.minimumSample = function (confidence, errorTolerance) {
  var minimumSampleSize = ((this.tval(confidence) * this.tval(confidence) * this.standardDeviation() * this.standardDeviation()) / (errorTolerance * errorTolerance));
  return Math.ceil(minimumSampleSize);
};

module.exports = Incrementer;
