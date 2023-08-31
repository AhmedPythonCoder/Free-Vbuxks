import * as subprocess from 'subprocess';

var _pj;

function _pj_snippets(container) {
  function in_es6(left, right) {
    if (right instanceof Array || typeof right === "string") {
      return right.indexOf(left) > -1;
    } else {
      if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
        return right.has(left);
      } else {
        return left in right;
      }
    }
  }

  container["in_es6"] = in_es6;
  return container;
}

_pj = {};

_pj_snippets(_pj);

function hack() {
  var data, profiles, results;
  data = subprocess.check_output(["netsh", "wlan", "show", "profiles"]).decode("utf-8", {
    "errors": "backslashreplace"
  }).split("\n");

  profiles = function () {
    var _pj_a = [],
        _pj_b = data;

    for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
      var i = _pj_b[_pj_c];

      if (_pj.in_es6("All User Profile", i)) {
        _pj_a.push(i.split(":")[1].slice(1, -1));
      }
    }

    return _pj_a;
  }.call(this);

  for (var i, _pj_c = 0, _pj_a = profiles, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];

    try {
      results = subprocess.check_output(["netsh", "wlan", "show", "profile", i, "key=clear"]).decode("utf-8", {
        "errors": "backslashreplace"
      }).split("\n");

      results = function () {
        var _pj_d = [],
            _pj_e = results;

        for (var _pj_f = 0, _pj_g = _pj_e.length; _pj_f < _pj_g; _pj_f += 1) {
          var b = _pj_e[_pj_f];

          if (_pj.in_es6("Key Content", b)) {
            _pj_d.push(b.split(":")[1].slice(1, -1));
          }
        }

        return _pj_d;
      }.call(this);

      try {
        console.log("{:<30}|  {:<}".format(i, results[0]));
      } catch (e) {
        if (e instanceof IndexError) {
          console.log("{:<30}|  {:<}".format(i, ""));
        } else {
          throw e;
        }
      }
    } catch (e) {
      if (e instanceof subprocess.CalledProcessError) {
        console.log("{:<30}|  {:<}".format(i, "ENCODING ERROR"));
      } else {
        throw e;
      }
    }
  }

  input("");
}

hack();
