var TTable = require('./ttable');

module.exports = function tcrit(df, confidence) {
  var tta = 1 - confidence;
  var ttbl = new TTable(200);
  var n = ttbl.length;
  var result;

  if (parseFloat(tta) > 0.1 || parseFloat(tta) < 0.001) {
    throw new Error('Two tailed probability value should be between 0.001 - 0.1, you provided ' + tta + '.');
  } else if (df >= 1) {
    if (df > 200) df = 200;
    for (var i = 1; i <= n; i++) {
      tta = parseFloat(tta);
      if (ttbl[i].df === df) {
        if (tta <= 0.1 && tta > 0.05) {
          result = ttbl[i].a10;
        } else if (tta <= 0.05 && tta > 0.02) {
          result = ttbl[i].a05;
        } else if (tta <= 0.02 && tta > 0.01) {
          result = ttbl[i].a02;
        } else if (tta <= 0.01 && tta > 0.005) {
          result = ttbl[i].a01;
        } else if (tta <= 0.005 && tta > 0.002) {
          result = ttbl[i].a005;
        } else if (tta <= 0.002 && tta > 0.001) {
          result = ttbl[i].a002;
        } else if (tta <= 0.001) {
          result = ttbl[i].a001;
        }
      }
    }
  } else {
    throw new Error('Degrees of freedom must be whole number between 1 and 200, you provided ' + df);
  }

  return result;
};
