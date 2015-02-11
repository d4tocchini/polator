var bound, penner;

penner = require('./penner');

bound = require('./bound');

module.exports = function(i, i1, i2, o1, o2, pennerName, boundName) {
  var boundMethod, pennerMethod;
  if (pennerName == null) {
    pennerName = 'linear';
  }
  if (boundName == null) {
    boundName = 'extend';
  }
  boundMethod = bound[boundName];
  pennerMethod = penner[pennerName];
  if (!boundMethod) {
    throw new Error("Polator: bound method " + boundName + " not found");
  }
  if (!pennerMethod) {
    throw new Error("Polator: penner method " + pennerName + " not found");
  }
  return boundMethod(i, i1, i2, o1, o2, pennerMethod);
};
