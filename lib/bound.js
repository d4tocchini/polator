module.exports = {
  extend: function(i1, i2, i, o1, o2, penner) {
    return penner(i, o1, o2 - o1, i2 - i1);
  },
  hold: function(i1, i2, i, o1, o2, penner) {
    var t;
    t = i - i1;
    if (i >= i2) {
      return o2;
    } else if (i <= i1) {
      return o1;
    }
    return penner(t, o1, o2 - o1, i2 - i1);
  },
  loop: function(i1, i2, i, o1, o2, penner) {
    var d, t;
    t = i - i1;
    d = i2 - i1;
    if (t === 0) {
      return o1;
    } else if (t === d) {
      return o2;
    } else if (t > d) {
      t = t % d;
    } else if (t < 0) {
      t = d + (t % d);
    }
    return penner(t, o1, o2 - o1, d);
  },
  silent: function(i1, i2, i, o1, o2, penner) {
    var d, t;
    t = i - i1;
    d = i2 - i1;
    if (t === 0) {
      return o1;
    } else if (t === d) {
      return o2;
    } else if (i > i2) {
      return void 0;
    } else if (i < i1) {
      return void 0;
    }
    return penner(t, o1, o2 - o1, d);
  },
  mirror: function(i1, i2, i, o1, o2, penner) {
    var d, phase, t;
    t = i - i1;
    d = i2 - i1;
    if (t === 0) {
      return o1;
    } else if (t === d) {
      return o2;
    } else if (t < 0) {
      t = d + t;
    }
    phase = Math.round(t / d) % 2;
    if (phase === 0) {
      t = t % d;
    } else {
      t = d - t % d;
    }
    return penner(t, o1, o2 - o1, d);
  }
};
