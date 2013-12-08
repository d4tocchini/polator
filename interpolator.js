;(function(){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("interpolator/lib/penner.js", function(exports, require, module){
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

});
require.register("interpolator/lib/bound.js", function(exports, require, module){
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

});
require.register("interpolator/index.js", function(exports, require, module){
exports.penner = require('./lib/penner');
exports.bound = require('./lib/bound');
});if (typeof exports == "object") {
  module.exports = require("interpolator");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("interpolator"); });
} else {
  this["interpolator"] = require("interpolator");
}})();