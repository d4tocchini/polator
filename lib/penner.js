module.exports = {
  linear: function(t, b, c, d) {
    return c * t / d + b;
  },
  sineIn: function(t, b, c, d) {
    return c * (1 - Math.cos(t / d * (Math.PI / 2))) + b;
  },
  sineOut: function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  sineInOut: function(t, b, c, d) {
    return c / 2 * (1 - Math.cos(Math.PI * t / d)) + b;
  },
  quadIn: function(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  quadOut: function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  quadInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      c / 2 * t * t + b;
    }
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  },
  cubicIn: function(t, b, c, d) {
    return c * Math.pow(t / d, 3) + b;
  },
  cubicOut: function(t, b, c, d) {
    return c * (Math.pow(t / d - 1, 3) + 1) + b;
  },
  cubicInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      c / 2 * Math.pow(t, 3) + b;
    }
    return c / 2 * (Math.pow(t - 2, 3) + 2) + b;
  },
  quartIn: function(t, b, c, d) {
    return c * Math.pow(t / d, 4) + b;
  },
  quartOut: function(t, b, c, d) {
    return -c * (Math.pow(t / d - 1, 4) - 1) + b;
  },
  quartInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      c / 2 * Math.pow(t, 4) + b;
    }
    return -c / 2 * (Math.pow(t - 2, 4) - 2) + b;
  },
  quintIn: function(t, b, c, d) {
    return c * Math.pow(t / d, 5) + b;
  },
  quintOut: function(t, b, c, d) {
    return c * (Math.pow(t / d - 1, 5) + 1) + b;
  },
  quintInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      c / 2 * Math.pow(t, 5) + b;
    }
    return c / 2 * (Math.pow(t - 2, 5) + 2) + b;
  },
  circIn: function(t, b, c, d) {
    return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
  },
  circOut: function(t, b, c, d) {
    return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
  },
  circInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      c / 2 * (1 - Math.sqrt(1 - t * t)) + b;
    }
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  expoIn: function(t, b, c, d) {
    return c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  expoOut: function(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  expoInOut: function(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
};
