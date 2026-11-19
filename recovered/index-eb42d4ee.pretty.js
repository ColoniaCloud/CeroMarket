var iy = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var q_ = iy((G_, Vu) => {
  function Qp(e, t) {
    for (var n = 0; n < t.length; n++) {
      const r = t[n];
      if (typeof r != "string" && !Array.isArray(r)) {
        for (const i in r)
          if (i !== "default" && !(i in e)) {
            const a = Object.getOwnPropertyDescriptor(r, i);
            a &&
              Object.defineProperty(
                e,
                i,
                a.get ? a : { enumerable: !0, get: () => r[i] },
              );
          }
      }
    }
    return Object.freeze(
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
    );
  }
  (function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
      r(i);
    new MutationObserver((i) => {
      for (const a of i)
        if (a.type === "childList")
          for (const o of a.addedNodes)
            o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
      const a = {};
      return (
        i.integrity && (a.integrity = i.integrity),
        i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
        i.crossOrigin === "use-credentials"
          ? (a.credentials = "include")
          : i.crossOrigin === "anonymous"
            ? (a.credentials = "omit")
            : (a.credentials = "same-origin"),
        a
      );
    }
    function r(i) {
      if (i.ep) return;
      i.ep = !0;
      const a = n(i);
      fetch(i.href, a);
    }
  })();
  function $p(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var qp = { exports: {} },
    Qo = {},
    Wp = { exports: {} },
    $ = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var oa = Symbol.for("react.element"),
    ay = Symbol.for("react.portal"),
    oy = Symbol.for("react.fragment"),
    sy = Symbol.for("react.strict_mode"),
    ly = Symbol.for("react.profiler"),
    uy = Symbol.for("react.provider"),
    cy = Symbol.for("react.context"),
    fy = Symbol.for("react.forward_ref"),
    dy = Symbol.for("react.suspense"),
    py = Symbol.for("react.memo"),
    hy = Symbol.for("react.lazy"),
    ff = Symbol.iterator;
  function my(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (ff && e[ff]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Hp = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Gp = Object.assign,
    Yp = {};
  function $r(e, t, n) {
    ((this.props = e),
      (this.context = t),
      (this.refs = Yp),
      (this.updater = n || Hp));
  }
  $r.prototype.isReactComponent = {};
  $r.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
      );
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  $r.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Xp() {}
  Xp.prototype = $r.prototype;
  function Bu(e, t, n) {
    ((this.props = e),
      (this.context = t),
      (this.refs = Yp),
      (this.updater = n || Hp));
  }
  var Uu = (Bu.prototype = new Xp());
  Uu.constructor = Bu;
  Gp(Uu, $r.prototype);
  Uu.isPureReactComponent = !0;
  var df = Array.isArray,
    Kp = Object.prototype.hasOwnProperty,
    Qu = { current: null },
    Jp = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Zp(e, t, n) {
    var r,
      i = {},
      a = null,
      o = null;
    if (t != null)
      for (r in (t.ref !== void 0 && (o = t.ref),
      t.key !== void 0 && (a = "" + t.key),
      t))
        Kp.call(t, r) && !Jp.hasOwnProperty(r) && (i[r] = t[r]);
    var s = arguments.length - 2;
    if (s === 1) i.children = n;
    else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      i.children = l;
    }
    if (e && e.defaultProps)
      for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
    return {
      $$typeof: oa,
      type: e,
      key: a,
      ref: o,
      props: i,
      _owner: Qu.current,
    };
  }
  function vy(e, t) {
    return {
      $$typeof: oa,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner,
    };
  }
  function $u(e) {
    return typeof e == "object" && e !== null && e.$$typeof === oa;
  }
  function gy(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (n) {
        return t[n];
      })
    );
  }
  var pf = /\/+/g;
  function Es(e, t) {
    return typeof e == "object" && e !== null && e.key != null
      ? gy("" + e.key)
      : t.toString(36);
  }
  function Va(e, t, n, r, i) {
    var a = typeof e;
    (a === "undefined" || a === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
      switch (a) {
        case "string":
        case "number":
          o = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case oa:
            case ay:
              o = !0;
          }
      }
    if (o)
      return (
        (o = e),
        (i = i(o)),
        (e = r === "" ? "." + Es(o, 0) : r),
        df(i)
          ? ((n = ""),
            e != null && (n = e.replace(pf, "$&/") + "/"),
            Va(i, t, n, "", function (u) {
              return u;
            }))
          : i != null &&
            ($u(i) &&
              (i = vy(
                i,
                n +
                  (!i.key || (o && o.key === i.key)
                    ? ""
                    : ("" + i.key).replace(pf, "$&/") + "/") +
                  e,
              )),
            t.push(i)),
        1
      );
    if (((o = 0), (r = r === "" ? "." : r + ":"), df(e)))
      for (var s = 0; s < e.length; s++) {
        a = e[s];
        var l = r + Es(a, s);
        o += Va(a, t, n, l, i);
      }
    else if (((l = my(e)), typeof l == "function"))
      for (e = l.call(e), s = 0; !(a = e.next()).done;)
        ((a = a.value), (l = r + Es(a, s++)), (o += Va(a, t, n, l, i)));
    else if (a === "object")
      throw (
        (t = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            (t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return o;
  }
  function ga(e, t, n) {
    if (e == null) return e;
    var r = [],
      i = 0;
    return (
      Va(e, r, "", "", function (a) {
        return t.call(n, a, i++);
      }),
      r
    );
  }
  function yy(e) {
    if (e._status === -1) {
      var t = e._result;
      ((t = t()),
        t.then(
          function (n) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 1), (e._result = n));
          },
          function (n) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 2), (e._result = n));
          },
        ),
        e._status === -1 && ((e._status = 0), (e._result = t)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var Ve = { current: null },
    Ba = { transition: null },
    wy = {
      ReactCurrentDispatcher: Ve,
      ReactCurrentBatchConfig: Ba,
      ReactCurrentOwner: Qu,
    };
  function eh() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  $.Children = {
    map: ga,
    forEach: function (e, t, n) {
      ga(
        e,
        function () {
          t.apply(this, arguments);
        },
        n,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        ga(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        ga(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!$u(e))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return e;
    },
  };
  $.Component = $r;
  $.Fragment = oy;
  $.Profiler = ly;
  $.PureComponent = Bu;
  $.StrictMode = sy;
  $.Suspense = dy;
  $.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wy;
  $.act = eh;
  $.cloneElement = function (e, t, n) {
    if (e == null)
      throw Error(
        "React.cloneElement(...): The argument must be a React element, but you passed " +
          e +
          ".",
      );
    var r = Gp({}, e.props),
      i = e.key,
      a = e.ref,
      o = e._owner;
    if (t != null) {
      if (
        (t.ref !== void 0 && ((a = t.ref), (o = Qu.current)),
        t.key !== void 0 && (i = "" + t.key),
        e.type && e.type.defaultProps)
      )
        var s = e.type.defaultProps;
      for (l in t)
        Kp.call(t, l) &&
          !Jp.hasOwnProperty(l) &&
          (r[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
    }
    var l = arguments.length - 2;
    if (l === 1) r.children = n;
    else if (1 < l) {
      s = Array(l);
      for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
      r.children = s;
    }
    return { $$typeof: oa, type: e.type, key: i, ref: a, props: r, _owner: o };
  };
  $.createContext = function (e) {
    return (
      (e = {
        $$typeof: cy,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }),
      (e.Provider = { $$typeof: uy, _context: e }),
      (e.Consumer = e)
    );
  };
  $.createElement = Zp;
  $.createFactory = function (e) {
    var t = Zp.bind(null, e);
    return ((t.type = e), t);
  };
  $.createRef = function () {
    return { current: null };
  };
  $.forwardRef = function (e) {
    return { $$typeof: fy, render: e };
  };
  $.isValidElement = $u;
  $.lazy = function (e) {
    return { $$typeof: hy, _payload: { _status: -1, _result: e }, _init: yy };
  };
  $.memo = function (e, t) {
    return { $$typeof: py, type: e, compare: t === void 0 ? null : t };
  };
  $.startTransition = function (e) {
    var t = Ba.transition;
    Ba.transition = {};
    try {
      e();
    } finally {
      Ba.transition = t;
    }
  };
  $.unstable_act = eh;
  $.useCallback = function (e, t) {
    return Ve.current.useCallback(e, t);
  };
  $.useContext = function (e) {
    return Ve.current.useContext(e);
  };
  $.useDebugValue = function () {};
  $.useDeferredValue = function (e) {
    return Ve.current.useDeferredValue(e);
  };
  $.useEffect = function (e, t) {
    return Ve.current.useEffect(e, t);
  };
  $.useId = function () {
    return Ve.current.useId();
  };
  $.useImperativeHandle = function (e, t, n) {
    return Ve.current.useImperativeHandle(e, t, n);
  };
  $.useInsertionEffect = function (e, t) {
    return Ve.current.useInsertionEffect(e, t);
  };
  $.useLayoutEffect = function (e, t) {
    return Ve.current.useLayoutEffect(e, t);
  };
  $.useMemo = function (e, t) {
    return Ve.current.useMemo(e, t);
  };
  $.useReducer = function (e, t, n) {
    return Ve.current.useReducer(e, t, n);
  };
  $.useRef = function (e) {
    return Ve.current.useRef(e);
  };
  $.useState = function (e) {
    return Ve.current.useState(e);
  };
  $.useSyncExternalStore = function (e, t, n) {
    return Ve.current.useSyncExternalStore(e, t, n);
  };
  $.useTransition = function () {
    return Ve.current.useTransition();
  };
  $.version = "18.3.1";
  Wp.exports = $;
  var N = Wp.exports;
  const H = $p(N),
    Sy = Qp({ __proto__: null, default: H }, [N]);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Ey = N,
    xy = Symbol.for("react.element"),
    by = Symbol.for("react.fragment"),
    _y = Object.prototype.hasOwnProperty,
    Ty =
      Ey.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    ky = { key: !0, ref: !0, __self: !0, __source: !0 };
  function th(e, t, n) {
    var r,
      i = {},
      a = null,
      o = null;
    (n !== void 0 && (a = "" + n),
      t.key !== void 0 && (a = "" + t.key),
      t.ref !== void 0 && (o = t.ref));
    for (r in t) _y.call(t, r) && !ky.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
      for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
      $$typeof: xy,
      type: e,
      key: a,
      ref: o,
      props: i,
      _owner: Ty.current,
    };
  }
  Qo.Fragment = by;
  Qo.jsx = th;
  Qo.jsxs = th;
  qp.exports = Qo;
  var qu = qp.exports;
  const $o = qu.Fragment,
    w = qu.jsx,
    C = qu.jsxs;
  var ml = {},
    nh = { exports: {} },
    Ze = {},
    rh = { exports: {} },
    ih = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ (function (e) {
    function t(D, L) {
      var U = D.length;
      D.push(L);
      e: for (; 0 < U;) {
        var Z = (U - 1) >>> 1,
          ee = D[Z];
        if (0 < i(ee, L)) ((D[Z] = L), (D[U] = ee), (U = Z));
        else break e;
      }
    }
    function n(D) {
      return D.length === 0 ? null : D[0];
    }
    function r(D) {
      if (D.length === 0) return null;
      var L = D[0],
        U = D.pop();
      if (U !== L) {
        D[0] = U;
        e: for (var Z = 0, ee = D.length, xt = ee >>> 1; Z < xt;) {
          var bt = 2 * (Z + 1) - 1,
            Ss = D[bt],
            In = bt + 1,
            va = D[In];
          if (0 > i(Ss, U))
            In < ee && 0 > i(va, Ss)
              ? ((D[Z] = va), (D[In] = U), (Z = In))
              : ((D[Z] = Ss), (D[bt] = U), (Z = bt));
          else if (In < ee && 0 > i(va, U))
            ((D[Z] = va), (D[In] = U), (Z = In));
          else break e;
        }
      }
      return L;
    }
    function i(D, L) {
      var U = D.sortIndex - L.sortIndex;
      return U !== 0 ? U : D.id - L.id;
    }
    if (
      typeof performance == "object" &&
      typeof performance.now == "function"
    ) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var l = [],
      u = [],
      c = 1,
      f = null,
      d = 3,
      h = !1,
      v = !1,
      y = !1,
      S = typeof setTimeout == "function" ? setTimeout : null,
      p = typeof clearTimeout == "function" ? clearTimeout : null,
      m = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function g(D) {
      for (var L = n(u); L !== null;) {
        if (L.callback === null) r(u);
        else if (L.startTime <= D)
          (r(u), (L.sortIndex = L.expirationTime), t(l, L));
        else break;
        L = n(u);
      }
    }
    function E(D) {
      if (((y = !1), g(D), !v))
        if (n(l) !== null) ((v = !0), Q(x));
        else {
          var L = n(u);
          L !== null && ye(E, L.startTime - D);
        }
    }
    function x(D, L) {
      ((v = !1), y && ((y = !1), p(T), (T = -1)), (h = !0));
      var U = d;
      try {
        for (
          g(L), f = n(l);
          f !== null && (!(f.expirationTime > L) || (D && !M()));
        ) {
          var Z = f.callback;
          if (typeof Z == "function") {
            ((f.callback = null), (d = f.priorityLevel));
            var ee = Z(f.expirationTime <= L);
            ((L = e.unstable_now()),
              typeof ee == "function" ? (f.callback = ee) : f === n(l) && r(l),
              g(L));
          } else r(l);
          f = n(l);
        }
        if (f !== null) var xt = !0;
        else {
          var bt = n(u);
          (bt !== null && ye(E, bt.startTime - L), (xt = !1));
        }
        return xt;
      } finally {
        ((f = null), (d = U), (h = !1));
      }
    }
    var b = !1,
      k = null,
      T = -1,
      R = 5,
      j = -1;
    function M() {
      return !(e.unstable_now() - j < R);
    }
    function A() {
      if (k !== null) {
        var D = e.unstable_now();
        j = D;
        var L = !0;
        try {
          L = k(!0, D);
        } finally {
          L ? B() : ((b = !1), (k = null));
        }
      } else b = !1;
    }
    var B;
    if (typeof m == "function")
      B = function () {
        m(A);
      };
    else if (typeof MessageChannel < "u") {
      var Y = new MessageChannel(),
        Ue = Y.port2;
      ((Y.port1.onmessage = A),
        (B = function () {
          Ue.postMessage(null);
        }));
    } else
      B = function () {
        S(A, 0);
      };
    function Q(D) {
      ((k = D), b || ((b = !0), B()));
    }
    function ye(D, L) {
      T = S(function () {
        D(e.unstable_now());
      }, L);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (D) {
        D.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        v || h || ((v = !0), Q(x));
      }),
      (e.unstable_forceFrameRate = function (D) {
        0 > D || 125 < D
          ? console.error(
              "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
            )
          : (R = 0 < D ? Math.floor(1e3 / D) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return d;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(l);
      }),
      (e.unstable_next = function (D) {
        switch (d) {
          case 1:
          case 2:
          case 3:
            var L = 3;
            break;
          default:
            L = d;
        }
        var U = d;
        d = L;
        try {
          return D();
        } finally {
          d = U;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (D, L) {
        switch (D) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            D = 3;
        }
        var U = d;
        d = D;
        try {
          return L();
        } finally {
          d = U;
        }
      }),
      (e.unstable_scheduleCallback = function (D, L, U) {
        var Z = e.unstable_now();
        switch (
          (typeof U == "object" && U !== null
            ? ((U = U.delay), (U = typeof U == "number" && 0 < U ? Z + U : Z))
            : (U = Z),
          D)
        ) {
          case 1:
            var ee = -1;
            break;
          case 2:
            ee = 250;
            break;
          case 5:
            ee = 1073741823;
            break;
          case 4:
            ee = 1e4;
            break;
          default:
            ee = 5e3;
        }
        return (
          (ee = U + ee),
          (D = {
            id: c++,
            callback: L,
            priorityLevel: D,
            startTime: U,
            expirationTime: ee,
            sortIndex: -1,
          }),
          U > Z
            ? ((D.sortIndex = U),
              t(u, D),
              n(l) === null &&
                D === n(u) &&
                (y ? (p(T), (T = -1)) : (y = !0), ye(E, U - Z)))
            : ((D.sortIndex = ee), t(l, D), v || h || ((v = !0), Q(x))),
          D
        );
      }),
      (e.unstable_shouldYield = M),
      (e.unstable_wrapCallback = function (D) {
        var L = d;
        return function () {
          var U = d;
          d = L;
          try {
            return D.apply(this, arguments);
          } finally {
            d = U;
          }
        };
      }));
  })(ih);
  rh.exports = ih;
  var Cy = rh.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Oy = N,
    Je = Cy;
  function P(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var ah = new Set(),
    Ri = {};
  function er(e, t) {
    (Mr(e, t), Mr(e + "Capture", t));
  }
  function Mr(e, t) {
    for (Ri[e] = t, e = 0; e < t.length; e++) ah.add(t[e]);
  }
  var Bt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    vl = Object.prototype.hasOwnProperty,
    Ny =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    hf = {},
    mf = {};
  function Py(e) {
    return vl.call(mf, e)
      ? !0
      : vl.call(hf, e)
        ? !1
        : Ny.test(e)
          ? (mf[e] = !0)
          : ((hf[e] = !0), !1);
  }
  function Iy(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r
          ? !1
          : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Dy(e, t, n, r) {
    if (t === null || typeof t > "u" || Iy(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
      switch (n.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function Be(e, t, n, r, i, a, o) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = r),
      (this.attributeNamespace = i),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = a),
      (this.removeEmptyString = o));
  }
  var De = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      De[e] = new Be(e, 0, !1, e, null, !1, !1);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (e) {
    var t = e[0];
    De[t] = new Be(t, 1, !1, e[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    De[e] = new Be(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (e) {
    De[e] = new Be(e, 2, !1, e, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
      De[e] = new Be(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    De[e] = new Be(e, 3, !0, e, null, !1, !1);
  });
  ["capture", "download"].forEach(function (e) {
    De[e] = new Be(e, 4, !1, e, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function (e) {
    De[e] = new Be(e, 6, !1, e, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function (e) {
    De[e] = new Be(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var Wu = /[\-:]([a-z])/g;
  function Hu(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(Wu, Hu);
      De[t] = new Be(t, 1, !1, e, null, !1, !1);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(Wu, Hu);
      De[t] = new Be(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
  ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(Wu, Hu);
    De[t] = new Be(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function (e) {
    De[e] = new Be(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  De.xlinkHref = new Be(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
  );
  ["src", "href", "action", "formAction"].forEach(function (e) {
    De[e] = new Be(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function Gu(e, t, n, r) {
    var i = De.hasOwnProperty(t) ? De[t] : null;
    (i !== null
      ? i.type !== 0
      : r ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (Dy(t, n, i, r) && (n = null),
      r || i === null
        ? Py(t) &&
          (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : i.mustUseProperty
          ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
          : ((t = i.attributeName),
            (r = i.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((i = i.type),
                (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Wt = Oy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ya = Symbol.for("react.element"),
    sr = Symbol.for("react.portal"),
    lr = Symbol.for("react.fragment"),
    Yu = Symbol.for("react.strict_mode"),
    gl = Symbol.for("react.profiler"),
    oh = Symbol.for("react.provider"),
    sh = Symbol.for("react.context"),
    Xu = Symbol.for("react.forward_ref"),
    yl = Symbol.for("react.suspense"),
    wl = Symbol.for("react.suspense_list"),
    Ku = Symbol.for("react.memo"),
    Xt = Symbol.for("react.lazy"),
    lh = Symbol.for("react.offscreen"),
    vf = Symbol.iterator;
  function Jr(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (vf && e[vf]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var le = Object.assign,
    xs;
  function di(e) {
    if (xs === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        xs = (t && t[1]) || "";
      }
    return (
      `
` +
      xs +
      e
    );
  }
  var bs = !1;
  function _s(e, t) {
    if (!e || bs) return "";
    bs = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (u) {
            var r = u;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (u) {
            r = u;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (u) {
          r = u;
        }
        e();
      }
    } catch (u) {
      if (u && r && typeof u.stack == "string") {
        for (
          var i = u.stack.split(`
`),
            a = r.stack.split(`
`),
            o = i.length - 1,
            s = a.length - 1;
          1 <= o && 0 <= s && i[o] !== a[s];
        )
          s--;
        for (; 1 <= o && 0 <= s; o--, s--)
          if (i[o] !== a[s]) {
            if (o !== 1 || s !== 1)
              do
                if ((o--, s--, 0 > s || i[o] !== a[s])) {
                  var l =
                    `
` + i[o].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      l.includes("<anonymous>") &&
                      (l = l.replace("<anonymous>", e.displayName)),
                    l
                  );
                }
              while (1 <= o && 0 <= s);
            break;
          }
      }
    } finally {
      ((bs = !1), (Error.prepareStackTrace = n));
    }
    return (e = e ? e.displayName || e.name : "") ? di(e) : "";
  }
  function My(e) {
    switch (e.tag) {
      case 5:
        return di(e.type);
      case 16:
        return di("Lazy");
      case 13:
        return di("Suspense");
      case 19:
        return di("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = _s(e.type, !1)), e);
      case 11:
        return ((e = _s(e.type.render, !1)), e);
      case 1:
        return ((e = _s(e.type, !0)), e);
      default:
        return "";
    }
  }
  function Sl(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case lr:
        return "Fragment";
      case sr:
        return "Portal";
      case gl:
        return "Profiler";
      case Yu:
        return "StrictMode";
      case yl:
        return "Suspense";
      case wl:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case sh:
          return (e.displayName || "Context") + ".Consumer";
        case oh:
          return (e._context.displayName || "Context") + ".Provider";
        case Xu:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Ku:
          return (
            (t = e.displayName || null),
            t !== null ? t : Sl(e.type) || "Memo"
          );
        case Xt:
          ((t = e._payload), (e = e._init));
          try {
            return Sl(e(t));
          } catch {}
      }
    return null;
  }
  function Ry(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Sl(t);
      case 8:
        return t === Yu ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function En(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function uh(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Ly(e) {
    var t = uh(e) ? "checked" : "value",
      n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      r = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var i = n.get,
        a = n.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (o) {
            ((r = "" + o), a.call(this, o));
          },
        }),
        Object.defineProperty(e, t, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return r;
          },
          setValue: function (o) {
            r = "" + o;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function wa(e) {
    e._valueTracker || (e._valueTracker = Ly(e));
  }
  function ch(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = uh(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function lo(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function El(e, t) {
    var n = t.checked;
    return le({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: n ?? e._wrapperState.initialChecked,
    });
  }
  function gf(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
      r = t.checked != null ? t.checked : t.defaultChecked;
    ((n = En(t.value != null ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function fh(e, t) {
    ((t = t.checked), t != null && Gu(e, "checked", t, !1));
  }
  function xl(e, t) {
    fh(e, t);
    var n = En(t.value),
      r = t.type;
    if (n != null)
      r === "number"
        ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    (t.hasOwnProperty("value")
      ? bl(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && bl(e, t.type, En(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function yf(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      ))
        return;
      ((t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((n = e.name),
      n !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      n !== "" && (e.name = n));
  }
  function bl(e, t, n) {
    (t !== "number" || lo(e.ownerDocument) !== e) &&
      (n == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var pi = Array.isArray;
  function _r(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        ((i = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== i && (e[n].selected = i),
          i && r && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + En(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function _l(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(P(91));
    return le({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function wf(e, t) {
    var n = t.value;
    if (n == null) {
      if (((n = t.children), (t = t.defaultValue), n != null)) {
        if (t != null) throw Error(P(92));
        if (pi(n)) {
          if (1 < n.length) throw Error(P(93));
          n = n[0];
        }
        t = n;
      }
      (t == null && (t = ""), (n = t));
    }
    e._wrapperState = { initialValue: En(n) };
  }
  function dh(e, t) {
    var n = En(t.value),
      r = En(t.defaultValue);
    (n != null &&
      ((n = "" + n),
      n !== e.value && (e.value = n),
      t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
      r != null && (e.defaultValue = "" + r));
  }
  function Sf(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function ph(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Tl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? ph(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Sa,
    hh = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, n, r, i) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, n, r, i);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          Sa = Sa || document.createElement("div"),
            Sa.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Sa.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild);
      }
    });
  function Li(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var wi = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    Fy = ["Webkit", "ms", "Moz", "O"];
  Object.keys(wi).forEach(function (e) {
    Fy.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (wi[t] = wi[e]));
    });
  });
  function mh(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : n || typeof t != "number" || t === 0 || (wi.hasOwnProperty(e) && wi[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function vh(e, t) {
    e = e.style;
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = n.indexOf("--") === 0,
          i = mh(n, t[n], r);
        (n === "float" && (n = "cssFloat"),
          r ? e.setProperty(n, i) : (e[n] = i));
      }
  }
  var Ay = le(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    },
  );
  function kl(e, t) {
    if (t) {
      if (Ay[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(P(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(P(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(P(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(P(62));
    }
  }
  function Cl(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Ol = null;
  function Ju(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Nl = null,
    Tr = null,
    kr = null;
  function Ef(e) {
    if ((e = ua(e))) {
      if (typeof Nl != "function") throw Error(P(280));
      var t = e.stateNode;
      t && ((t = Yo(t)), Nl(e.stateNode, e.type, t));
    }
  }
  function gh(e) {
    Tr ? (kr ? kr.push(e) : (kr = [e])) : (Tr = e);
  }
  function yh() {
    if (Tr) {
      var e = Tr,
        t = kr;
      if (((kr = Tr = null), Ef(e), t)) for (e = 0; e < t.length; e++) Ef(t[e]);
    }
  }
  function wh(e, t) {
    return e(t);
  }
  function Sh() {}
  var Ts = !1;
  function Eh(e, t, n) {
    if (Ts) return e(t, n);
    Ts = !0;
    try {
      return wh(e, t, n);
    } finally {
      ((Ts = !1), (Tr !== null || kr !== null) && (Sh(), yh()));
    }
  }
  function Fi(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Yo(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((r = !r.disabled) ||
          ((e = e.type),
          (r = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !r));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(P(231, t, typeof n));
    return n;
  }
  var Pl = !1;
  if (Bt)
    try {
      var Zr = {};
      (Object.defineProperty(Zr, "passive", {
        get: function () {
          Pl = !0;
        },
      }),
        window.addEventListener("test", Zr, Zr),
        window.removeEventListener("test", Zr, Zr));
    } catch {
      Pl = !1;
    }
  function zy(e, t, n, r, i, a, o, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (c) {
      this.onError(c);
    }
  }
  var Si = !1,
    uo = null,
    co = !1,
    Il = null,
    jy = {
      onError: function (e) {
        ((Si = !0), (uo = e));
      },
    };
  function Vy(e, t, n, r, i, a, o, s, l) {
    ((Si = !1), (uo = null), zy.apply(jy, arguments));
  }
  function By(e, t, n, r, i, a, o, s, l) {
    if ((Vy.apply(this, arguments), Si)) {
      if (Si) {
        var u = uo;
        ((Si = !1), (uo = null));
      } else throw Error(P(198));
      co || ((co = !0), (Il = u));
    }
  }
  function tr(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return;) t = t.return;
    else {
      e = t;
      do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function xh(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function xf(e) {
    if (tr(e) !== e) throw Error(P(188));
  }
  function Uy(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = tr(e)), t === null)) throw Error(P(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ;) {
      var i = n.return;
      if (i === null) break;
      var a = i.alternate;
      if (a === null) {
        if (((r = i.return), r !== null)) {
          n = r;
          continue;
        }
        break;
      }
      if (i.child === a.child) {
        for (a = i.child; a;) {
          if (a === n) return (xf(i), e);
          if (a === r) return (xf(i), t);
          a = a.sibling;
        }
        throw Error(P(188));
      }
      if (n.return !== r.return) ((n = i), (r = a));
      else {
        for (var o = !1, s = i.child; s;) {
          if (s === n) {
            ((o = !0), (n = i), (r = a));
            break;
          }
          if (s === r) {
            ((o = !0), (r = i), (n = a));
            break;
          }
          s = s.sibling;
        }
        if (!o) {
          for (s = a.child; s;) {
            if (s === n) {
              ((o = !0), (n = a), (r = i));
              break;
            }
            if (s === r) {
              ((o = !0), (r = a), (n = i));
              break;
            }
            s = s.sibling;
          }
          if (!o) throw Error(P(189));
        }
      }
      if (n.alternate !== r) throw Error(P(190));
    }
    if (n.tag !== 3) throw Error(P(188));
    return n.stateNode.current === n ? e : t;
  }
  function bh(e) {
    return ((e = Uy(e)), e !== null ? _h(e) : null);
  }
  function _h(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
      var t = _h(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var Th = Je.unstable_scheduleCallback,
    bf = Je.unstable_cancelCallback,
    Qy = Je.unstable_shouldYield,
    $y = Je.unstable_requestPaint,
    pe = Je.unstable_now,
    qy = Je.unstable_getCurrentPriorityLevel,
    Zu = Je.unstable_ImmediatePriority,
    kh = Je.unstable_UserBlockingPriority,
    fo = Je.unstable_NormalPriority,
    Wy = Je.unstable_LowPriority,
    Ch = Je.unstable_IdlePriority,
    qo = null,
    Ot = null;
  function Hy(e) {
    if (Ot && typeof Ot.onCommitFiberRoot == "function")
      try {
        Ot.onCommitFiberRoot(qo, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var gt = Math.clz32 ? Math.clz32 : Xy,
    Gy = Math.log,
    Yy = Math.LN2;
  function Xy(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Gy(e) / Yy) | 0)) | 0);
  }
  var Ea = 64,
    xa = 4194304;
  function hi(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function po(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
      i = e.suspendedLanes,
      a = e.pingedLanes,
      o = n & 268435455;
    if (o !== 0) {
      var s = o & ~i;
      s !== 0 ? (r = hi(s)) : ((a &= o), a !== 0 && (r = hi(a)));
    } else ((o = n & ~i), o !== 0 ? (r = hi(o)) : a !== 0 && (r = hi(a)));
    if (r === 0) return 0;
    if (
      t !== 0 &&
      t !== r &&
      !(t & i) &&
      ((i = r & -r), (a = t & -t), i >= a || (i === 16 && (a & 4194240) !== 0))
    )
      return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= r; 0 < t;)
        ((n = 31 - gt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
    return r;
  }
  function Ky(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Jy(e, t) {
    for (
      var n = e.suspendedLanes,
        r = e.pingedLanes,
        i = e.expirationTimes,
        a = e.pendingLanes;
      0 < a;
    ) {
      var o = 31 - gt(a),
        s = 1 << o,
        l = i[o];
      (l === -1
        ? (!(s & n) || s & r) && (i[o] = Ky(s, t))
        : l <= t && (e.expiredLanes |= s),
        (a &= ~s));
    }
  }
  function Dl(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function Oh() {
    var e = Ea;
    return ((Ea <<= 1), !(Ea & 4194240) && (Ea = 64), e);
  }
  function ks(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function sa(e, t, n) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - gt(t)),
      (e[t] = n));
  }
  function Zy(e, t) {
    var n = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
      var i = 31 - gt(n),
        a = 1 << i;
      ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a));
    }
  }
  function ec(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n;) {
      var r = 31 - gt(n),
        i = 1 << r;
      ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
    }
  }
  var J = 0;
  function Nh(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
  }
  var Ph,
    tc,
    Ih,
    Dh,
    Mh,
    Ml = !1,
    ba = [],
    cn = null,
    fn = null,
    dn = null,
    Ai = new Map(),
    zi = new Map(),
    tn = [],
    e0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " ",
      );
  function _f(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        cn = null;
        break;
      case "dragenter":
      case "dragleave":
        fn = null;
        break;
      case "mouseover":
      case "mouseout":
        dn = null;
        break;
      case "pointerover":
      case "pointerout":
        Ai.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zi.delete(t.pointerId);
    }
  }
  function ei(e, t, n, r, i, a) {
    return e === null || e.nativeEvent !== a
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: r,
          nativeEvent: a,
          targetContainers: [i],
        }),
        t !== null && ((t = ua(t)), t !== null && tc(t)),
        e)
      : ((e.eventSystemFlags |= r),
        (t = e.targetContainers),
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e);
  }
  function t0(e, t, n, r, i) {
    switch (t) {
      case "focusin":
        return ((cn = ei(cn, e, t, n, r, i)), !0);
      case "dragenter":
        return ((fn = ei(fn, e, t, n, r, i)), !0);
      case "mouseover":
        return ((dn = ei(dn, e, t, n, r, i)), !0);
      case "pointerover":
        var a = i.pointerId;
        return (Ai.set(a, ei(Ai.get(a) || null, e, t, n, r, i)), !0);
      case "gotpointercapture":
        return (
          (a = i.pointerId),
          zi.set(a, ei(zi.get(a) || null, e, t, n, r, i)),
          !0
        );
    }
    return !1;
  }
  function Rh(e) {
    var t = Fn(e.target);
    if (t !== null) {
      var n = tr(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = xh(n)), t !== null)) {
            ((e.blockedOn = t),
              Mh(e.priority, function () {
                Ih(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ua(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
      var n = Rl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        ((Ol = r), n.target.dispatchEvent(r), (Ol = null));
      } else return ((t = ua(n)), t !== null && tc(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Tf(e, t, n) {
    Ua(e) && n.delete(t);
  }
  function n0() {
    ((Ml = !1),
      cn !== null && Ua(cn) && (cn = null),
      fn !== null && Ua(fn) && (fn = null),
      dn !== null && Ua(dn) && (dn = null),
      Ai.forEach(Tf),
      zi.forEach(Tf));
  }
  function ti(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ml ||
        ((Ml = !0),
        Je.unstable_scheduleCallback(Je.unstable_NormalPriority, n0)));
  }
  function ji(e) {
    function t(i) {
      return ti(i, e);
    }
    if (0 < ba.length) {
      ti(ba[0], e);
      for (var n = 1; n < ba.length; n++) {
        var r = ba[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      cn !== null && ti(cn, e),
        fn !== null && ti(fn, e),
        dn !== null && ti(dn, e),
        Ai.forEach(t),
        zi.forEach(t),
        n = 0;
      n < tn.length;
      n++
    )
      ((r = tn[n]), r.blockedOn === e && (r.blockedOn = null));
    for (; 0 < tn.length && ((n = tn[0]), n.blockedOn === null);)
      (Rh(n), n.blockedOn === null && tn.shift());
  }
  var Cr = Wt.ReactCurrentBatchConfig,
    ho = !0;
  function r0(e, t, n, r) {
    var i = J,
      a = Cr.transition;
    Cr.transition = null;
    try {
      ((J = 1), nc(e, t, n, r));
    } finally {
      ((J = i), (Cr.transition = a));
    }
  }
  function i0(e, t, n, r) {
    var i = J,
      a = Cr.transition;
    Cr.transition = null;
    try {
      ((J = 4), nc(e, t, n, r));
    } finally {
      ((J = i), (Cr.transition = a));
    }
  }
  function nc(e, t, n, r) {
    if (ho) {
      var i = Rl(e, t, n, r);
      if (i === null) (Fs(e, t, r, mo, n), _f(e, r));
      else if (t0(i, e, t, n, r)) r.stopPropagation();
      else if ((_f(e, r), t & 4 && -1 < e0.indexOf(e))) {
        for (; i !== null;) {
          var a = ua(i);
          if (
            (a !== null && Ph(a),
            (a = Rl(e, t, n, r)),
            a === null && Fs(e, t, r, mo, n),
            a === i)
          )
            break;
          i = a;
        }
        i !== null && r.stopPropagation();
      } else Fs(e, t, r, null, n);
    }
  }
  var mo = null;
  function Rl(e, t, n, r) {
    if (((mo = null), (e = Ju(r)), (e = Fn(e)), e !== null))
      if (((t = tr(e)), t === null)) e = null;
      else if (((n = t.tag), n === 13)) {
        if (((e = xh(t)), e !== null)) return e;
        e = null;
      } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((mo = e), null);
  }
  function Lh(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (qy()) {
          case Zu:
            return 1;
          case kh:
            return 4;
          case fo:
          case Wy:
            return 16;
          case Ch:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var an = null,
    rc = null,
    Qa = null;
  function Fh() {
    if (Qa) return Qa;
    var e,
      t = rc,
      n = t.length,
      r,
      i = "value" in an ? an.value : an.textContent,
      a = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
    return (Qa = i.slice(e, 1 < r ? 1 - r : void 0));
  }
  function $a(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function _a() {
    return !0;
  }
  function kf() {
    return !1;
  }
  function et(e) {
    function t(n, r, i, a, o) {
      ((this._reactName = n),
        (this._targetInst = i),
        (this.type = r),
        (this.nativeEvent = a),
        (this.target = o),
        (this.currentTarget = null));
      for (var s in e)
        e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(a) : a[s]));
      return (
        (this.isDefaultPrevented = (
          a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1
        )
          ? _a
          : kf),
        (this.isPropagationStopped = kf),
        this
      );
    }
    return (
      le(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = _a));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = _a));
        },
        persist: function () {},
        isPersistent: _a,
      }),
      t
    );
  }
  var qr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ic = et(qr),
    la = le({}, qr, { view: 0, detail: 0 }),
    a0 = et(la),
    Cs,
    Os,
    ni,
    Wo = le({}, la, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ac,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== ni &&
              (ni && e.type === "mousemove"
                ? ((Cs = e.screenX - ni.screenX), (Os = e.screenY - ni.screenY))
                : (Os = Cs = 0),
              (ni = e)),
            Cs);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Os;
      },
    }),
    Cf = et(Wo),
    o0 = le({}, Wo, { dataTransfer: 0 }),
    s0 = et(o0),
    l0 = le({}, la, { relatedTarget: 0 }),
    Ns = et(l0),
    u0 = le({}, qr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    c0 = et(u0),
    f0 = le({}, qr, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    d0 = et(f0),
    p0 = le({}, qr, { data: 0 }),
    Of = et(p0),
    h0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    m0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    v0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function g0(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = v0[e])
        ? !!t[e]
        : !1;
  }
  function ac() {
    return g0;
  }
  var y0 = le({}, la, {
      key: function (e) {
        if (e.key) {
          var t = h0[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = $a(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? m0[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ac,
      charCode: function (e) {
        return e.type === "keypress" ? $a(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? $a(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    w0 = et(y0),
    S0 = le({}, Wo, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Nf = et(S0),
    E0 = le({}, la, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ac,
    }),
    x0 = et(E0),
    b0 = le({}, qr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    _0 = et(b0),
    T0 = le({}, Wo, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    k0 = et(T0),
    C0 = [9, 13, 27, 32],
    oc = Bt && "CompositionEvent" in window,
    Ei = null;
  Bt && "documentMode" in document && (Ei = document.documentMode);
  var O0 = Bt && "TextEvent" in window && !Ei,
    Ah = Bt && (!oc || (Ei && 8 < Ei && 11 >= Ei)),
    Pf = String.fromCharCode(32),
    If = !1;
  function zh(e, t) {
    switch (e) {
      case "keyup":
        return C0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function jh(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var ur = !1;
  function N0(e, t) {
    switch (e) {
      case "compositionend":
        return jh(t);
      case "keypress":
        return t.which !== 32 ? null : ((If = !0), Pf);
      case "textInput":
        return ((e = t.data), e === Pf && If ? null : e);
      default:
        return null;
    }
  }
  function P0(e, t) {
    if (ur)
      return e === "compositionend" || (!oc && zh(e, t))
        ? ((e = Fh()), (Qa = rc = an = null), (ur = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ah && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var I0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Df(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!I0[e.type] : t === "textarea";
  }
  function Vh(e, t, n, r) {
    (gh(r),
      (t = vo(t, "onChange")),
      0 < t.length &&
        ((n = new ic("onChange", "change", null, n, r)),
        e.push({ event: n, listeners: t })));
  }
  var xi = null,
    Vi = null;
  function D0(e) {
    Kh(e, 0);
  }
  function Ho(e) {
    var t = dr(e);
    if (ch(t)) return e;
  }
  function M0(e, t) {
    if (e === "change") return t;
  }
  var Bh = !1;
  if (Bt) {
    var Ps;
    if (Bt) {
      var Is = "oninput" in document;
      if (!Is) {
        var Mf = document.createElement("div");
        (Mf.setAttribute("oninput", "return;"),
          (Is = typeof Mf.oninput == "function"));
      }
      Ps = Is;
    } else Ps = !1;
    Bh = Ps && (!document.documentMode || 9 < document.documentMode);
  }
  function Rf() {
    xi && (xi.detachEvent("onpropertychange", Uh), (Vi = xi = null));
  }
  function Uh(e) {
    if (e.propertyName === "value" && Ho(Vi)) {
      var t = [];
      (Vh(t, Vi, e, Ju(e)), Eh(D0, t));
    }
  }
  function R0(e, t, n) {
    e === "focusin"
      ? (Rf(), (xi = t), (Vi = n), xi.attachEvent("onpropertychange", Uh))
      : e === "focusout" && Rf();
  }
  function L0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ho(Vi);
  }
  function F0(e, t) {
    if (e === "click") return Ho(t);
  }
  function A0(e, t) {
    if (e === "input" || e === "change") return Ho(t);
  }
  function z0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var St = typeof Object.is == "function" ? Object.is : z0;
  function Bi(e, t) {
    if (St(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var i = n[r];
      if (!vl.call(t, i) || !St(e[i], t[i])) return !1;
    }
    return !0;
  }
  function Lf(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function Ff(e, t) {
    var n = Lf(e);
    e = 0;
    for (var r; n;) {
      if (n.nodeType === 3) {
        if (((r = e + n.textContent.length), e <= t && r >= t))
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n;) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Lf(n);
    }
  }
  function Qh(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Qh(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function $h() {
    for (var e = window, t = lo(); t instanceof e.HTMLIFrameElement;) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = lo(e.document);
    }
    return t;
  }
  function sc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function j0(e) {
    var t = $h(),
      n = e.focusedElem,
      r = e.selectionRange;
    if (
      t !== n &&
      n &&
      n.ownerDocument &&
      Qh(n.ownerDocument.documentElement, n)
    ) {
      if (r !== null && sc(n)) {
        if (
          ((t = r.start),
          (e = r.end),
          e === void 0 && (e = t),
          "selectionStart" in n)
        )
          ((n.selectionStart = t),
            (n.selectionEnd = Math.min(e, n.value.length)));
        else if (
          ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var i = n.textContent.length,
            a = Math.min(r.start, i);
          ((r = r.end === void 0 ? a : Math.min(r.end, i)),
            !e.extend && a > r && ((i = r), (r = a), (a = i)),
            (i = Ff(n, a)));
          var o = Ff(n, r);
          i &&
            o &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== i.node ||
              e.anchorOffset !== i.offset ||
              e.focusNode !== o.node ||
              e.focusOffset !== o.offset) &&
            ((t = t.createRange()),
            t.setStart(i.node, i.offset),
            e.removeAllRanges(),
            a > r
              ? (e.addRange(t), e.extend(o.node, o.offset))
              : (t.setEnd(o.node, o.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; (e = e.parentNode);)
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
        ((e = t[n]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var V0 = Bt && "documentMode" in document && 11 >= document.documentMode,
    cr = null,
    Ll = null,
    bi = null,
    Fl = !1;
  function Af(e, t, n) {
    var r =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Fl ||
      cr == null ||
      cr !== lo(r) ||
      ((r = cr),
      "selectionStart" in r && sc(r)
        ? (r = { start: r.selectionStart, end: r.selectionEnd })
        : ((r = (
            (r.ownerDocument && r.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset,
          })),
      (bi && Bi(bi, r)) ||
        ((bi = r),
        (r = vo(Ll, "onSelect")),
        0 < r.length &&
          ((t = new ic("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: r }),
          (t.target = cr))));
  }
  function Ta(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var fr = {
      animationend: Ta("Animation", "AnimationEnd"),
      animationiteration: Ta("Animation", "AnimationIteration"),
      animationstart: Ta("Animation", "AnimationStart"),
      transitionend: Ta("Transition", "TransitionEnd"),
    },
    Ds = {},
    qh = {};
  Bt &&
    ((qh = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete fr.animationend.animation,
      delete fr.animationiteration.animation,
      delete fr.animationstart.animation),
    "TransitionEvent" in window || delete fr.transitionend.transition);
  function Go(e) {
    if (Ds[e]) return Ds[e];
    if (!fr[e]) return e;
    var t = fr[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in qh) return (Ds[e] = t[n]);
    return e;
  }
  var Wh = Go("animationend"),
    Hh = Go("animationiteration"),
    Gh = Go("animationstart"),
    Yh = Go("transitionend"),
    Xh = new Map(),
    zf =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  function Cn(e, t) {
    (Xh.set(e, t), er(t, [e]));
  }
  for (var Ms = 0; Ms < zf.length; Ms++) {
    var Rs = zf[Ms],
      B0 = Rs.toLowerCase(),
      U0 = Rs[0].toUpperCase() + Rs.slice(1);
    Cn(B0, "on" + U0);
  }
  Cn(Wh, "onAnimationEnd");
  Cn(Hh, "onAnimationIteration");
  Cn(Gh, "onAnimationStart");
  Cn("dblclick", "onDoubleClick");
  Cn("focusin", "onFocus");
  Cn("focusout", "onBlur");
  Cn(Yh, "onTransitionEnd");
  Mr("onMouseEnter", ["mouseout", "mouseover"]);
  Mr("onMouseLeave", ["mouseout", "mouseover"]);
  Mr("onPointerEnter", ["pointerout", "pointerover"]);
  Mr("onPointerLeave", ["pointerout", "pointerover"]);
  er(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
      " ",
    ),
  );
  er(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " ",
    ),
  );
  er("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  er(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" "),
  );
  er(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" "),
  );
  er(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
  );
  var mi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Q0 = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(mi),
    );
  function jf(e, t, n) {
    var r = e.type || "unknown-event";
    ((e.currentTarget = n), By(r, t, void 0, e), (e.currentTarget = null));
  }
  function Kh(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n],
        i = r.event;
      r = r.listeners;
      e: {
        var a = void 0;
        if (t)
          for (var o = r.length - 1; 0 <= o; o--) {
            var s = r[o],
              l = s.instance,
              u = s.currentTarget;
            if (((s = s.listener), l !== a && i.isPropagationStopped()))
              break e;
            (jf(i, s, u), (a = l));
          }
        else
          for (o = 0; o < r.length; o++) {
            if (
              ((s = r[o]),
              (l = s.instance),
              (u = s.currentTarget),
              (s = s.listener),
              l !== a && i.isPropagationStopped())
            )
              break e;
            (jf(i, s, u), (a = l));
          }
      }
    }
    if (co) throw ((e = Il), (co = !1), (Il = null), e);
  }
  function re(e, t) {
    var n = t[Bl];
    n === void 0 && (n = t[Bl] = new Set());
    var r = e + "__bubble";
    n.has(r) || (Jh(t, e, 2, !1), n.add(r));
  }
  function Ls(e, t, n) {
    var r = 0;
    (t && (r |= 4), Jh(n, e, r, t));
  }
  var ka = "_reactListening" + Math.random().toString(36).slice(2);
  function Ui(e) {
    if (!e[ka]) {
      ((e[ka] = !0),
        ah.forEach(function (n) {
          n !== "selectionchange" && (Q0.has(n) || Ls(n, !1, e), Ls(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ka] || ((t[ka] = !0), Ls("selectionchange", !1, t));
    }
  }
  function Jh(e, t, n, r) {
    switch (Lh(t)) {
      case 1:
        var i = r0;
        break;
      case 4:
        i = i0;
        break;
      default:
        i = nc;
    }
    ((n = i.bind(null, t, n, e)),
      (i = void 0),
      !Pl ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (i = !0),
      r
        ? i !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: i })
          : e.addEventListener(t, n, !0)
        : i !== void 0
          ? e.addEventListener(t, n, { passive: i })
          : e.addEventListener(t, n, !1));
  }
  function Fs(e, t, n, r, i) {
    var a = r;
    if (!(t & 1) && !(t & 2) && r !== null)
      e: for (;;) {
        if (r === null) return;
        var o = r.tag;
        if (o === 3 || o === 4) {
          var s = r.stateNode.containerInfo;
          if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
          if (o === 4)
            for (o = r.return; o !== null;) {
              var l = o.tag;
              if (
                (l === 3 || l === 4) &&
                ((l = o.stateNode.containerInfo),
                l === i || (l.nodeType === 8 && l.parentNode === i))
              )
                return;
              o = o.return;
            }
          for (; s !== null;) {
            if (((o = Fn(s)), o === null)) return;
            if (((l = o.tag), l === 5 || l === 6)) {
              r = a = o;
              continue e;
            }
            s = s.parentNode;
          }
        }
        r = r.return;
      }
    Eh(function () {
      var u = a,
        c = Ju(n),
        f = [];
      e: {
        var d = Xh.get(e);
        if (d !== void 0) {
          var h = ic,
            v = e;
          switch (e) {
            case "keypress":
              if ($a(n) === 0) break e;
            case "keydown":
            case "keyup":
              h = w0;
              break;
            case "focusin":
              ((v = "focus"), (h = Ns));
              break;
            case "focusout":
              ((v = "blur"), (h = Ns));
              break;
            case "beforeblur":
            case "afterblur":
              h = Ns;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              h = Cf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              h = s0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              h = x0;
              break;
            case Wh:
            case Hh:
            case Gh:
              h = c0;
              break;
            case Yh:
              h = _0;
              break;
            case "scroll":
              h = a0;
              break;
            case "wheel":
              h = k0;
              break;
            case "copy":
            case "cut":
            case "paste":
              h = d0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              h = Nf;
          }
          var y = (t & 4) !== 0,
            S = !y && e === "scroll",
            p = y ? (d !== null ? d + "Capture" : null) : d;
          y = [];
          for (var m = u, g; m !== null;) {
            g = m;
            var E = g.stateNode;
            if (
              (g.tag === 5 &&
                E !== null &&
                ((g = E),
                p !== null &&
                  ((E = Fi(m, p)), E != null && y.push(Qi(m, E, g)))),
              S)
            )
              break;
            m = m.return;
          }
          0 < y.length &&
            ((d = new h(d, v, null, n, c)), f.push({ event: d, listeners: y }));
        }
      }
      if (!(t & 7)) {
        e: {
          if (
            ((d = e === "mouseover" || e === "pointerover"),
            (h = e === "mouseout" || e === "pointerout"),
            d &&
              n !== Ol &&
              (v = n.relatedTarget || n.fromElement) &&
              (Fn(v) || v[Ut]))
          )
            break e;
          if (
            (h || d) &&
            ((d =
              c.window === c
                ? c
                : (d = c.ownerDocument)
                  ? d.defaultView || d.parentWindow
                  : window),
            h
              ? ((v = n.relatedTarget || n.toElement),
                (h = u),
                (v = v ? Fn(v) : null),
                v !== null &&
                  ((S = tr(v)), v !== S || (v.tag !== 5 && v.tag !== 6)) &&
                  (v = null))
              : ((h = null), (v = u)),
            h !== v)
          ) {
            if (
              ((y = Cf),
              (E = "onMouseLeave"),
              (p = "onMouseEnter"),
              (m = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((y = Nf),
                (E = "onPointerLeave"),
                (p = "onPointerEnter"),
                (m = "pointer")),
              (S = h == null ? d : dr(h)),
              (g = v == null ? d : dr(v)),
              (d = new y(E, m + "leave", h, n, c)),
              (d.target = S),
              (d.relatedTarget = g),
              (E = null),
              Fn(c) === u &&
                ((y = new y(p, m + "enter", v, n, c)),
                (y.target = g),
                (y.relatedTarget = S),
                (E = y)),
              (S = E),
              h && v)
            )
              t: {
                for (y = h, p = v, m = 0, g = y; g; g = ir(g)) m++;
                for (g = 0, E = p; E; E = ir(E)) g++;
                for (; 0 < m - g;) ((y = ir(y)), m--);
                for (; 0 < g - m;) ((p = ir(p)), g--);
                for (; m--;) {
                  if (y === p || (p !== null && y === p.alternate)) break t;
                  ((y = ir(y)), (p = ir(p)));
                }
                y = null;
              }
            else y = null;
            (h !== null && Vf(f, d, h, y, !1),
              v !== null && S !== null && Vf(f, S, v, y, !0));
          }
        }
        e: {
          if (
            ((d = u ? dr(u) : window),
            (h = d.nodeName && d.nodeName.toLowerCase()),
            h === "select" || (h === "input" && d.type === "file"))
          )
            var x = M0;
          else if (Df(d))
            if (Bh) x = A0;
            else {
              x = L0;
              var b = R0;
            }
          else
            (h = d.nodeName) &&
              h.toLowerCase() === "input" &&
              (d.type === "checkbox" || d.type === "radio") &&
              (x = F0);
          if (x && (x = x(e, u))) {
            Vh(f, x, n, c);
            break e;
          }
          (b && b(e, d, u),
            e === "focusout" &&
              (b = d._wrapperState) &&
              b.controlled &&
              d.type === "number" &&
              bl(d, "number", d.value));
        }
        switch (((b = u ? dr(u) : window), e)) {
          case "focusin":
            (Df(b) || b.contentEditable === "true") &&
              ((cr = b), (Ll = u), (bi = null));
            break;
          case "focusout":
            bi = Ll = cr = null;
            break;
          case "mousedown":
            Fl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Fl = !1), Af(f, n, c));
            break;
          case "selectionchange":
            if (V0) break;
          case "keydown":
          case "keyup":
            Af(f, n, c);
        }
        var k;
        if (oc)
          e: {
            switch (e) {
              case "compositionstart":
                var T = "onCompositionStart";
                break e;
              case "compositionend":
                T = "onCompositionEnd";
                break e;
              case "compositionupdate":
                T = "onCompositionUpdate";
                break e;
            }
            T = void 0;
          }
        else
          ur
            ? zh(e, n) && (T = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (T = "onCompositionStart");
        (T &&
          (Ah &&
            n.locale !== "ko" &&
            (ur || T !== "onCompositionStart"
              ? T === "onCompositionEnd" && ur && (k = Fh())
              : ((an = c),
                (rc = "value" in an ? an.value : an.textContent),
                (ur = !0))),
          (b = vo(u, T)),
          0 < b.length &&
            ((T = new Of(T, e, null, n, c)),
            f.push({ event: T, listeners: b }),
            k ? (T.data = k) : ((k = jh(n)), k !== null && (T.data = k)))),
          (k = O0 ? N0(e, n) : P0(e, n)) &&
            ((u = vo(u, "onBeforeInput")),
            0 < u.length &&
              ((c = new Of("onBeforeInput", "beforeinput", null, n, c)),
              f.push({ event: c, listeners: u }),
              (c.data = k))));
      }
      Kh(f, t);
    });
  }
  function Qi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function vo(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
      var i = e,
        a = i.stateNode;
      (i.tag === 5 &&
        a !== null &&
        ((i = a),
        (a = Fi(e, n)),
        a != null && r.unshift(Qi(e, a, i)),
        (a = Fi(e, t)),
        a != null && r.push(Qi(e, a, i))),
        (e = e.return));
    }
    return r;
  }
  function ir(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Vf(e, t, n, r, i) {
    for (var a = t._reactName, o = []; n !== null && n !== r;) {
      var s = n,
        l = s.alternate,
        u = s.stateNode;
      if (l !== null && l === r) break;
      (s.tag === 5 &&
        u !== null &&
        ((s = u),
        i
          ? ((l = Fi(n, a)), l != null && o.unshift(Qi(n, l, s)))
          : i || ((l = Fi(n, a)), l != null && o.push(Qi(n, l, s)))),
        (n = n.return));
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
  }
  var $0 = /\r\n?/g,
    q0 = /\u0000|\uFFFD/g;
  function Bf(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        $0,
        `
`,
      )
      .replace(q0, "");
  }
  function Ca(e, t, n) {
    if (((t = Bf(t)), Bf(e) !== t && n)) throw Error(P(425));
  }
  function go() {}
  var Al = null,
    zl = null;
  function jl(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Vl = typeof setTimeout == "function" ? setTimeout : void 0,
    W0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Uf = typeof Promise == "function" ? Promise : void 0,
    H0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Uf < "u"
          ? function (e) {
              return Uf.resolve(null).then(e).catch(G0);
            }
          : Vl;
  function G0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function As(e, t) {
    var n = t,
      r = 0;
    do {
      var i = n.nextSibling;
      if ((e.removeChild(n), i && i.nodeType === 8))
        if (((n = i.data), n === "/$")) {
          if (r === 0) {
            (e.removeChild(i), ji(t));
            return;
          }
          r--;
        } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
      n = i;
    } while (n);
    ji(t);
  }
  function pn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Qf(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var Wr = Math.random().toString(36).slice(2),
    kt = "__reactFiber$" + Wr,
    $i = "__reactProps$" + Wr,
    Ut = "__reactContainer$" + Wr,
    Bl = "__reactEvents$" + Wr,
    Y0 = "__reactListeners$" + Wr,
    X0 = "__reactHandles$" + Wr;
  function Fn(e) {
    var t = e[kt];
    if (t) return t;
    for (var n = e.parentNode; n;) {
      if ((t = n[Ut] || n[kt])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Qf(e); e !== null;) {
            if ((n = e[kt])) return n;
            e = Qf(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function ua(e) {
    return (
      (e = e[kt] || e[Ut]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function dr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(P(33));
  }
  function Yo(e) {
    return e[$i] || null;
  }
  var Ul = [],
    pr = -1;
  function On(e) {
    return { current: e };
  }
  function ie(e) {
    0 > pr || ((e.current = Ul[pr]), (Ul[pr] = null), pr--);
  }
  function ne(e, t) {
    (pr++, (Ul[pr] = e.current), (e.current = t));
  }
  var xn = {},
    Fe = On(xn),
    qe = On(!1),
    Qn = xn;
  function Rr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return xn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
      a;
    for (a in n) i[a] = t[a];
    return (
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      i
    );
  }
  function We(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function yo() {
    (ie(qe), ie(Fe));
  }
  function $f(e, t, n) {
    if (Fe.current !== xn) throw Error(P(168));
    (ne(Fe, t), ne(qe, n));
  }
  function Zh(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
      return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(P(108, Ry(e) || "Unknown", i));
    return le({}, n, r);
  }
  function wo(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        xn),
      (Qn = Fe.current),
      ne(Fe, e),
      ne(qe, qe.current),
      !0
    );
  }
  function qf(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(P(169));
    (n
      ? ((e = Zh(e, t, Qn)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        ie(qe),
        ie(Fe),
        ne(Fe, e))
      : ie(qe),
      ne(qe, n));
  }
  var Lt = null,
    Xo = !1,
    zs = !1;
  function em(e) {
    Lt === null ? (Lt = [e]) : Lt.push(e);
  }
  function K0(e) {
    ((Xo = !0), em(e));
  }
  function Nn() {
    if (!zs && Lt !== null) {
      zs = !0;
      var e = 0,
        t = J;
      try {
        var n = Lt;
        for (J = 1; e < n.length; e++) {
          var r = n[e];
          do r = r(!0);
          while (r !== null);
        }
        ((Lt = null), (Xo = !1));
      } catch (i) {
        throw (Lt !== null && (Lt = Lt.slice(e + 1)), Th(Zu, Nn), i);
      } finally {
        ((J = t), (zs = !1));
      }
    }
    return null;
  }
  var hr = [],
    mr = 0,
    So = null,
    Eo = 0,
    nt = [],
    rt = 0,
    $n = null,
    At = 1,
    zt = "";
  function Dn(e, t) {
    ((hr[mr++] = Eo), (hr[mr++] = So), (So = e), (Eo = t));
  }
  function tm(e, t, n) {
    ((nt[rt++] = At), (nt[rt++] = zt), (nt[rt++] = $n), ($n = e));
    var r = At;
    e = zt;
    var i = 32 - gt(r) - 1;
    ((r &= ~(1 << i)), (n += 1));
    var a = 32 - gt(t) + i;
    if (30 < a) {
      var o = i - (i % 5);
      ((a = (r & ((1 << o) - 1)).toString(32)),
        (r >>= o),
        (i -= o),
        (At = (1 << (32 - gt(t) + i)) | (n << i) | r),
        (zt = a + e));
    } else ((At = (1 << a) | (n << i) | r), (zt = e));
  }
  function lc(e) {
    e.return !== null && (Dn(e, 1), tm(e, 1, 0));
  }
  function uc(e) {
    for (; e === So;)
      ((So = hr[--mr]), (hr[mr] = null), (Eo = hr[--mr]), (hr[mr] = null));
    for (; e === $n;)
      (($n = nt[--rt]),
        (nt[rt] = null),
        (zt = nt[--rt]),
        (nt[rt] = null),
        (At = nt[--rt]),
        (nt[rt] = null));
  }
  var Ke = null,
    Xe = null,
    ae = !1,
    mt = null;
  function nm(e, t) {
    var n = it(5, null, null, 0);
    ((n.elementType = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
  }
  function Wf(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          (t =
            t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (Ke = e), (Xe = pn(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (Ke = e), (Xe = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((n = $n !== null ? { id: At, overflow: zt } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = it(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (Ke = e),
              (Xe = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function Ql(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function $l(e) {
    if (ae) {
      var t = Xe;
      if (t) {
        var n = t;
        if (!Wf(e, t)) {
          if (Ql(e)) throw Error(P(418));
          t = pn(n.nextSibling);
          var r = Ke;
          t && Wf(e, t)
            ? nm(r, n)
            : ((e.flags = (e.flags & -4097) | 2), (ae = !1), (Ke = e));
        }
      } else {
        if (Ql(e)) throw Error(P(418));
        ((e.flags = (e.flags & -4097) | 2), (ae = !1), (Ke = e));
      }
    }
  }
  function Hf(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
    )
      e = e.return;
    Ke = e;
  }
  function Oa(e) {
    if (e !== Ke) return !1;
    if (!ae) return (Hf(e), (ae = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !jl(e.type, e.memoizedProps))),
      t && (t = Xe))
    ) {
      if (Ql(e)) throw (rm(), Error(P(418)));
      for (; t;) (nm(e, t), (t = pn(t.nextSibling)));
    }
    if ((Hf(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(P(317));
      e: {
        for (e = e.nextSibling, t = 0; e;) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Xe = pn(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        Xe = null;
      }
    } else Xe = Ke ? pn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function rm() {
    for (var e = Xe; e;) e = pn(e.nextSibling);
  }
  function Lr() {
    ((Xe = Ke = null), (ae = !1));
  }
  function cc(e) {
    mt === null ? (mt = [e]) : mt.push(e);
  }
  var J0 = Wt.ReactCurrentBatchConfig;
  function ri(e, t, n) {
    if (
      ((e = n.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (n._owner) {
        if (((n = n._owner), n)) {
          if (n.tag !== 1) throw Error(P(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(P(147, e));
        var i = r,
          a = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === a
          ? t.ref
          : ((t = function (o) {
              var s = i.refs;
              o === null ? delete s[a] : (s[a] = o);
            }),
            (t._stringRef = a),
            t);
      }
      if (typeof e != "string") throw Error(P(284));
      if (!n._owner) throw Error(P(290, e));
    }
    return e;
  }
  function Na(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        P(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e,
        ),
      )
    );
  }
  function Gf(e) {
    var t = e._init;
    return t(e._payload);
  }
  function im(e) {
    function t(p, m) {
      if (e) {
        var g = p.deletions;
        g === null ? ((p.deletions = [m]), (p.flags |= 16)) : g.push(m);
      }
    }
    function n(p, m) {
      if (!e) return null;
      for (; m !== null;) (t(p, m), (m = m.sibling));
      return null;
    }
    function r(p, m) {
      for (p = new Map(); m !== null;)
        (m.key !== null ? p.set(m.key, m) : p.set(m.index, m), (m = m.sibling));
      return p;
    }
    function i(p, m) {
      return ((p = gn(p, m)), (p.index = 0), (p.sibling = null), p);
    }
    function a(p, m, g) {
      return (
        (p.index = g),
        e
          ? ((g = p.alternate),
            g !== null
              ? ((g = g.index), g < m ? ((p.flags |= 2), m) : g)
              : ((p.flags |= 2), m))
          : ((p.flags |= 1048576), m)
      );
    }
    function o(p) {
      return (e && p.alternate === null && (p.flags |= 2), p);
    }
    function s(p, m, g, E) {
      return m === null || m.tag !== 6
        ? ((m = qs(g, p.mode, E)), (m.return = p), m)
        : ((m = i(m, g)), (m.return = p), m);
    }
    function l(p, m, g, E) {
      var x = g.type;
      return x === lr
        ? c(p, m, g.props.children, E, g.key)
        : m !== null &&
            (m.elementType === x ||
              (typeof x == "object" &&
                x !== null &&
                x.$$typeof === Xt &&
                Gf(x) === m.type))
          ? ((E = i(m, g.props)), (E.ref = ri(p, m, g)), (E.return = p), E)
          : ((E = Ka(g.type, g.key, g.props, null, p.mode, E)),
            (E.ref = ri(p, m, g)),
            (E.return = p),
            E);
    }
    function u(p, m, g, E) {
      return m === null ||
        m.tag !== 4 ||
        m.stateNode.containerInfo !== g.containerInfo ||
        m.stateNode.implementation !== g.implementation
        ? ((m = Ws(g, p.mode, E)), (m.return = p), m)
        : ((m = i(m, g.children || [])), (m.return = p), m);
    }
    function c(p, m, g, E, x) {
      return m === null || m.tag !== 7
        ? ((m = Un(g, p.mode, E, x)), (m.return = p), m)
        : ((m = i(m, g)), (m.return = p), m);
    }
    function f(p, m, g) {
      if ((typeof m == "string" && m !== "") || typeof m == "number")
        return ((m = qs("" + m, p.mode, g)), (m.return = p), m);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case ya:
            return (
              (g = Ka(m.type, m.key, m.props, null, p.mode, g)),
              (g.ref = ri(p, null, m)),
              (g.return = p),
              g
            );
          case sr:
            return ((m = Ws(m, p.mode, g)), (m.return = p), m);
          case Xt:
            var E = m._init;
            return f(p, E(m._payload), g);
        }
        if (pi(m) || Jr(m))
          return ((m = Un(m, p.mode, g, null)), (m.return = p), m);
        Na(p, m);
      }
      return null;
    }
    function d(p, m, g, E) {
      var x = m !== null ? m.key : null;
      if ((typeof g == "string" && g !== "") || typeof g == "number")
        return x !== null ? null : s(p, m, "" + g, E);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case ya:
            return g.key === x ? l(p, m, g, E) : null;
          case sr:
            return g.key === x ? u(p, m, g, E) : null;
          case Xt:
            return ((x = g._init), d(p, m, x(g._payload), E));
        }
        if (pi(g) || Jr(g)) return x !== null ? null : c(p, m, g, E, null);
        Na(p, g);
      }
      return null;
    }
    function h(p, m, g, E, x) {
      if ((typeof E == "string" && E !== "") || typeof E == "number")
        return ((p = p.get(g) || null), s(m, p, "" + E, x));
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case ya:
            return (
              (p = p.get(E.key === null ? g : E.key) || null),
              l(m, p, E, x)
            );
          case sr:
            return (
              (p = p.get(E.key === null ? g : E.key) || null),
              u(m, p, E, x)
            );
          case Xt:
            var b = E._init;
            return h(p, m, g, b(E._payload), x);
        }
        if (pi(E) || Jr(E))
          return ((p = p.get(g) || null), c(m, p, E, x, null));
        Na(m, E);
      }
      return null;
    }
    function v(p, m, g, E) {
      for (
        var x = null, b = null, k = m, T = (m = 0), R = null;
        k !== null && T < g.length;
        T++
      ) {
        k.index > T ? ((R = k), (k = null)) : (R = k.sibling);
        var j = d(p, k, g[T], E);
        if (j === null) {
          k === null && (k = R);
          break;
        }
        (e && k && j.alternate === null && t(p, k),
          (m = a(j, m, T)),
          b === null ? (x = j) : (b.sibling = j),
          (b = j),
          (k = R));
      }
      if (T === g.length) return (n(p, k), ae && Dn(p, T), x);
      if (k === null) {
        for (; T < g.length; T++)
          ((k = f(p, g[T], E)),
            k !== null &&
              ((m = a(k, m, T)),
              b === null ? (x = k) : (b.sibling = k),
              (b = k)));
        return (ae && Dn(p, T), x);
      }
      for (k = r(p, k); T < g.length; T++)
        ((R = h(k, p, T, g[T], E)),
          R !== null &&
            (e && R.alternate !== null && k.delete(R.key === null ? T : R.key),
            (m = a(R, m, T)),
            b === null ? (x = R) : (b.sibling = R),
            (b = R)));
      return (
        e &&
          k.forEach(function (M) {
            return t(p, M);
          }),
        ae && Dn(p, T),
        x
      );
    }
    function y(p, m, g, E) {
      var x = Jr(g);
      if (typeof x != "function") throw Error(P(150));
      if (((g = x.call(g)), g == null)) throw Error(P(151));
      for (
        var b = (x = null), k = m, T = (m = 0), R = null, j = g.next();
        k !== null && !j.done;
        T++, j = g.next()
      ) {
        k.index > T ? ((R = k), (k = null)) : (R = k.sibling);
        var M = d(p, k, j.value, E);
        if (M === null) {
          k === null && (k = R);
          break;
        }
        (e && k && M.alternate === null && t(p, k),
          (m = a(M, m, T)),
          b === null ? (x = M) : (b.sibling = M),
          (b = M),
          (k = R));
      }
      if (j.done) return (n(p, k), ae && Dn(p, T), x);
      if (k === null) {
        for (; !j.done; T++, j = g.next())
          ((j = f(p, j.value, E)),
            j !== null &&
              ((m = a(j, m, T)),
              b === null ? (x = j) : (b.sibling = j),
              (b = j)));
        return (ae && Dn(p, T), x);
      }
      for (k = r(p, k); !j.done; T++, j = g.next())
        ((j = h(k, p, T, j.value, E)),
          j !== null &&
            (e && j.alternate !== null && k.delete(j.key === null ? T : j.key),
            (m = a(j, m, T)),
            b === null ? (x = j) : (b.sibling = j),
            (b = j)));
      return (
        e &&
          k.forEach(function (A) {
            return t(p, A);
          }),
        ae && Dn(p, T),
        x
      );
    }
    function S(p, m, g, E) {
      if (
        (typeof g == "object" &&
          g !== null &&
          g.type === lr &&
          g.key === null &&
          (g = g.props.children),
        typeof g == "object" && g !== null)
      ) {
        switch (g.$$typeof) {
          case ya:
            e: {
              for (var x = g.key, b = m; b !== null;) {
                if (b.key === x) {
                  if (((x = g.type), x === lr)) {
                    if (b.tag === 7) {
                      (n(p, b.sibling),
                        (m = i(b, g.props.children)),
                        (m.return = p),
                        (p = m));
                      break e;
                    }
                  } else if (
                    b.elementType === x ||
                    (typeof x == "object" &&
                      x !== null &&
                      x.$$typeof === Xt &&
                      Gf(x) === b.type)
                  ) {
                    (n(p, b.sibling),
                      (m = i(b, g.props)),
                      (m.ref = ri(p, b, g)),
                      (m.return = p),
                      (p = m));
                    break e;
                  }
                  n(p, b);
                  break;
                } else t(p, b);
                b = b.sibling;
              }
              g.type === lr
                ? ((m = Un(g.props.children, p.mode, E, g.key)),
                  (m.return = p),
                  (p = m))
                : ((E = Ka(g.type, g.key, g.props, null, p.mode, E)),
                  (E.ref = ri(p, m, g)),
                  (E.return = p),
                  (p = E));
            }
            return o(p);
          case sr:
            e: {
              for (b = g.key; m !== null;) {
                if (m.key === b)
                  if (
                    m.tag === 4 &&
                    m.stateNode.containerInfo === g.containerInfo &&
                    m.stateNode.implementation === g.implementation
                  ) {
                    (n(p, m.sibling),
                      (m = i(m, g.children || [])),
                      (m.return = p),
                      (p = m));
                    break e;
                  } else {
                    n(p, m);
                    break;
                  }
                else t(p, m);
                m = m.sibling;
              }
              ((m = Ws(g, p.mode, E)), (m.return = p), (p = m));
            }
            return o(p);
          case Xt:
            return ((b = g._init), S(p, m, b(g._payload), E));
        }
        if (pi(g)) return v(p, m, g, E);
        if (Jr(g)) return y(p, m, g, E);
        Na(p, g);
      }
      return (typeof g == "string" && g !== "") || typeof g == "number"
        ? ((g = "" + g),
          m !== null && m.tag === 6
            ? (n(p, m.sibling), (m = i(m, g)), (m.return = p), (p = m))
            : (n(p, m), (m = qs(g, p.mode, E)), (m.return = p), (p = m)),
          o(p))
        : n(p, m);
    }
    return S;
  }
  var Fr = im(!0),
    am = im(!1),
    xo = On(null),
    bo = null,
    vr = null,
    fc = null;
  function dc() {
    fc = vr = bo = null;
  }
  function pc(e) {
    var t = xo.current;
    (ie(xo), (e._currentValue = t));
  }
  function ql(e, t, n) {
    for (; e !== null;) {
      var r = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
          : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function Or(e, t) {
    ((bo = e),
      (fc = vr = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        (e.lanes & t && ($e = !0), (e.firstContext = null)));
  }
  function ot(e) {
    var t = e._currentValue;
    if (fc !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), vr === null)) {
        if (bo === null) throw Error(P(308));
        ((vr = e), (bo.dependencies = { lanes: 0, firstContext: e }));
      } else vr = vr.next = e;
    return t;
  }
  var An = null;
  function hc(e) {
    An === null ? (An = [e]) : An.push(e);
  }
  function om(e, t, n, r) {
    var i = t.interleaved;
    return (
      i === null ? ((n.next = n), hc(t)) : ((n.next = i.next), (i.next = n)),
      (t.interleaved = n),
      Qt(e, r)
    );
  }
  function Qt(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
      ((e.childLanes |= t),
        (n = e.alternate),
        n !== null && (n.childLanes |= t),
        (n = e),
        (e = e.return));
    return n.tag === 3 ? n.stateNode : null;
  }
  var Kt = !1;
  function mc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function sm(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function jt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function hn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), G & 2)) {
      var i = r.pending;
      return (
        i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
        (r.pending = t),
        Qt(e, n)
      );
    }
    return (
      (i = r.interleaved),
      i === null ? ((t.next = t), hc(r)) : ((t.next = i.next), (i.next = t)),
      (r.interleaved = t),
      Qt(e, n)
    );
  }
  function qa(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ec(e, n));
    }
  }
  function Yf(e, t) {
    var n = e.updateQueue,
      r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
      var i = null,
        a = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var o = {
            eventTime: n.eventTime,
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null,
          };
          (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
        } while (n !== null);
        a === null ? (i = a = t) : (a = a.next = t);
      } else i = a = t;
      ((n = {
        baseState: r.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: a,
        shared: r.shared,
        effects: r.effects,
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  function _o(e, t, n, r) {
    var i = e.updateQueue;
    Kt = !1;
    var a = i.firstBaseUpdate,
      o = i.lastBaseUpdate,
      s = i.shared.pending;
    if (s !== null) {
      i.shared.pending = null;
      var l = s,
        u = l.next;
      ((l.next = null), o === null ? (a = u) : (o.next = u), (o = l));
      var c = e.alternate;
      c !== null &&
        ((c = c.updateQueue),
        (s = c.lastBaseUpdate),
        s !== o &&
          (s === null ? (c.firstBaseUpdate = u) : (s.next = u),
          (c.lastBaseUpdate = l)));
    }
    if (a !== null) {
      var f = i.baseState;
      ((o = 0), (c = u = l = null), (s = a));
      do {
        var d = s.lane,
          h = s.eventTime;
        if ((r & d) === d) {
          c !== null &&
            (c = c.next =
              {
                eventTime: h,
                lane: 0,
                tag: s.tag,
                payload: s.payload,
                callback: s.callback,
                next: null,
              });
          e: {
            var v = e,
              y = s;
            switch (((d = t), (h = n), y.tag)) {
              case 1:
                if (((v = y.payload), typeof v == "function")) {
                  f = v.call(h, f, d);
                  break e;
                }
                f = v;
                break e;
              case 3:
                v.flags = (v.flags & -65537) | 128;
              case 0:
                if (
                  ((v = y.payload),
                  (d = typeof v == "function" ? v.call(h, f, d) : v),
                  d == null)
                )
                  break e;
                f = le({}, f, d);
                break e;
              case 2:
                Kt = !0;
            }
          }
          s.callback !== null &&
            s.lane !== 0 &&
            ((e.flags |= 64),
            (d = i.effects),
            d === null ? (i.effects = [s]) : d.push(s));
        } else
          ((h = {
            eventTime: h,
            lane: d,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          }),
            c === null ? ((u = c = h), (l = f)) : (c = c.next = h),
            (o |= d));
        if (((s = s.next), s === null)) {
          if (((s = i.shared.pending), s === null)) break;
          ((d = s),
            (s = d.next),
            (d.next = null),
            (i.lastBaseUpdate = d),
            (i.shared.pending = null));
        }
      } while (1);
      if (
        (c === null && (l = f),
        (i.baseState = l),
        (i.firstBaseUpdate = u),
        (i.lastBaseUpdate = c),
        (t = i.shared.interleaved),
        t !== null)
      ) {
        i = t;
        do ((o |= i.lane), (i = i.next));
        while (i !== t);
      } else a === null && (i.shared.lanes = 0);
      ((Wn |= o), (e.lanes = o), (e.memoizedState = f));
    }
  }
  function Xf(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          i = r.callback;
        if (i !== null) {
          if (((r.callback = null), (r = n), typeof i != "function"))
            throw Error(P(191, i));
          i.call(r);
        }
      }
  }
  var ca = {},
    Nt = On(ca),
    qi = On(ca),
    Wi = On(ca);
  function zn(e) {
    if (e === ca) throw Error(P(174));
    return e;
  }
  function vc(e, t) {
    switch ((ne(Wi, t), ne(qi, e), ne(Nt, ca), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Tl(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = Tl(t, e)));
    }
    (ie(Nt), ne(Nt, t));
  }
  function Ar() {
    (ie(Nt), ie(qi), ie(Wi));
  }
  function lm(e) {
    zn(Wi.current);
    var t = zn(Nt.current),
      n = Tl(t, e.type);
    t !== n && (ne(qi, e), ne(Nt, n));
  }
  function gc(e) {
    qi.current === e && (ie(Nt), ie(qi));
  }
  var oe = On(0);
  function To(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (
          n !== null &&
          ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if (t.flags & 128) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var js = [];
  function yc() {
    for (var e = 0; e < js.length; e++)
      js[e]._workInProgressVersionPrimary = null;
    js.length = 0;
  }
  var Wa = Wt.ReactCurrentDispatcher,
    Vs = Wt.ReactCurrentBatchConfig,
    qn = 0,
    se = null,
    we = null,
    be = null,
    ko = !1,
    _i = !1,
    Hi = 0,
    Z0 = 0;
  function Me() {
    throw Error(P(321));
  }
  function wc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!St(e[n], t[n])) return !1;
    return !0;
  }
  function Sc(e, t, n, r, i, a) {
    if (
      ((qn = a),
      (se = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (Wa.current = e === null || e.memoizedState === null ? r1 : i1),
      (e = n(r, i)),
      _i)
    ) {
      a = 0;
      do {
        if (((_i = !1), (Hi = 0), 25 <= a)) throw Error(P(301));
        ((a += 1),
          (be = we = null),
          (t.updateQueue = null),
          (Wa.current = a1),
          (e = n(r, i)));
      } while (_i);
    }
    if (
      ((Wa.current = Co),
      (t = we !== null && we.next !== null),
      (qn = 0),
      (be = we = se = null),
      (ko = !1),
      t)
    )
      throw Error(P(300));
    return e;
  }
  function Ec() {
    var e = Hi !== 0;
    return ((Hi = 0), e);
  }
  function Tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (be === null ? (se.memoizedState = be = e) : (be = be.next = e), be);
  }
  function st() {
    if (we === null) {
      var e = se.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = we.next;
    var t = be === null ? se.memoizedState : be.next;
    if (t !== null) ((be = t), (we = e));
    else {
      if (e === null) throw Error(P(310));
      ((we = e),
        (e = {
          memoizedState: we.memoizedState,
          baseState: we.baseState,
          baseQueue: we.baseQueue,
          queue: we.queue,
          next: null,
        }),
        be === null ? (se.memoizedState = be = e) : (be = be.next = e));
    }
    return be;
  }
  function Gi(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Bs(e) {
    var t = st(),
      n = t.queue;
    if (n === null) throw Error(P(311));
    n.lastRenderedReducer = e;
    var r = we,
      i = r.baseQueue,
      a = n.pending;
    if (a !== null) {
      if (i !== null) {
        var o = i.next;
        ((i.next = a.next), (a.next = o));
      }
      ((r.baseQueue = i = a), (n.pending = null));
    }
    if (i !== null) {
      ((a = i.next), (r = r.baseState));
      var s = (o = null),
        l = null,
        u = a;
      do {
        var c = u.lane;
        if ((qn & c) === c)
          (l !== null &&
            (l = l.next =
              {
                lane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
            (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
        else {
          var f = {
            lane: c,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          };
          (l === null ? ((s = l = f), (o = r)) : (l = l.next = f),
            (se.lanes |= c),
            (Wn |= c));
        }
        u = u.next;
      } while (u !== null && u !== a);
      (l === null ? (o = r) : (l.next = s),
        St(r, t.memoizedState) || ($e = !0),
        (t.memoizedState = r),
        (t.baseState = o),
        (t.baseQueue = l),
        (n.lastRenderedState = r));
    }
    if (((e = n.interleaved), e !== null)) {
      i = e;
      do ((a = i.lane), (se.lanes |= a), (Wn |= a), (i = i.next));
      while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function Us(e) {
    var t = st(),
      n = t.queue;
    if (n === null) throw Error(P(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      i = n.pending,
      a = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var o = (i = i.next);
      do ((a = e(a, o.action)), (o = o.next));
      while (o !== i);
      (St(a, t.memoizedState) || ($e = !0),
        (t.memoizedState = a),
        t.baseQueue === null && (t.baseState = a),
        (n.lastRenderedState = a));
    }
    return [a, r];
  }
  function um() {}
  function cm(e, t) {
    var n = se,
      r = st(),
      i = t(),
      a = !St(r.memoizedState, i);
    if (
      (a && ((r.memoizedState = i), ($e = !0)),
      (r = r.queue),
      xc(pm.bind(null, n, r, e), [e]),
      r.getSnapshot !== t || a || (be !== null && be.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Yi(9, dm.bind(null, n, r, i, t), void 0, null),
        Ce === null)
      )
        throw Error(P(349));
      qn & 30 || fm(n, t, i);
    }
    return i;
  }
  function fm(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = se.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (se.updateQueue = t),
          (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function dm(e, t, n, r) {
    ((t.value = n), (t.getSnapshot = r), hm(t) && mm(e));
  }
  function pm(e, t, n) {
    return n(function () {
      hm(t) && mm(e);
    });
  }
  function hm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !St(e, n);
    } catch {
      return !0;
    }
  }
  function mm(e) {
    var t = Qt(e, 1);
    t !== null && yt(t, e, 1, -1);
  }
  function Kf(e) {
    var t = Tt();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Gi,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = n1.bind(null, se, e)),
      [t.memoizedState, e]
    );
  }
  function Yi(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      (t = se.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (se.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((n = t.lastEffect),
          n === null
            ? (t.lastEffect = e.next = e)
            : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
      e
    );
  }
  function vm() {
    return st().memoizedState;
  }
  function Ha(e, t, n, r) {
    var i = Tt();
    ((se.flags |= e),
      (i.memoizedState = Yi(1 | t, n, void 0, r === void 0 ? null : r)));
  }
  function Ko(e, t, n, r) {
    var i = st();
    r = r === void 0 ? null : r;
    var a = void 0;
    if (we !== null) {
      var o = we.memoizedState;
      if (((a = o.destroy), r !== null && wc(r, o.deps))) {
        i.memoizedState = Yi(t, n, a, r);
        return;
      }
    }
    ((se.flags |= e), (i.memoizedState = Yi(1 | t, n, a, r)));
  }
  function Jf(e, t) {
    return Ha(8390656, 8, e, t);
  }
  function xc(e, t) {
    return Ko(2048, 8, e, t);
  }
  function gm(e, t) {
    return Ko(4, 2, e, t);
  }
  function ym(e, t) {
    return Ko(4, 4, e, t);
  }
  function wm(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Sm(e, t, n) {
    return (
      (n = n != null ? n.concat([e]) : null),
      Ko(4, 4, wm.bind(null, t, e), n)
    );
  }
  function bc() {}
  function Em(e, t) {
    var n = st();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wc(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function xm(e, t) {
    var n = st();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wc(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function bm(e, t, n) {
    return qn & 21
      ? (St(n, t) ||
          ((n = Oh()), (se.lanes |= n), (Wn |= n), (e.baseState = !0)),
        t)
      : (e.baseState && ((e.baseState = !1), ($e = !0)), (e.memoizedState = n));
  }
  function e1(e, t) {
    var n = J;
    ((J = n !== 0 && 4 > n ? n : 4), e(!0));
    var r = Vs.transition;
    Vs.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((J = n), (Vs.transition = r));
    }
  }
  function _m() {
    return st().memoizedState;
  }
  function t1(e, t, n) {
    var r = vn(e);
    if (
      ((n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Tm(e))
    )
      km(t, n);
    else if (((n = om(e, t, n, r)), n !== null)) {
      var i = ze();
      (yt(n, e, r, i), Cm(n, t, r));
    }
  }
  function n1(e, t, n) {
    var r = vn(e),
      i = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Tm(e)) km(t, i);
    else {
      var a = e.alternate;
      if (
        e.lanes === 0 &&
        (a === null || a.lanes === 0) &&
        ((a = t.lastRenderedReducer), a !== null)
      )
        try {
          var o = t.lastRenderedState,
            s = a(o, n);
          if (((i.hasEagerState = !0), (i.eagerState = s), St(s, o))) {
            var l = t.interleaved;
            (l === null
              ? ((i.next = i), hc(t))
              : ((i.next = l.next), (l.next = i)),
              (t.interleaved = i));
            return;
          }
        } catch {
        } finally {
        }
      ((n = om(e, t, i, r)),
        n !== null && ((i = ze()), yt(n, e, r, i), Cm(n, t, r)));
    }
  }
  function Tm(e) {
    var t = e.alternate;
    return e === se || (t !== null && t === se);
  }
  function km(e, t) {
    _i = ko = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function Cm(e, t, n) {
    if (n & 4194240) {
      var r = t.lanes;
      ((r &= e.pendingLanes), (n |= r), (t.lanes = n), ec(e, n));
    }
  }
  var Co = {
      readContext: ot,
      useCallback: Me,
      useContext: Me,
      useEffect: Me,
      useImperativeHandle: Me,
      useInsertionEffect: Me,
      useLayoutEffect: Me,
      useMemo: Me,
      useReducer: Me,
      useRef: Me,
      useState: Me,
      useDebugValue: Me,
      useDeferredValue: Me,
      useTransition: Me,
      useMutableSource: Me,
      useSyncExternalStore: Me,
      useId: Me,
      unstable_isNewReconciler: !1,
    },
    r1 = {
      readContext: ot,
      useCallback: function (e, t) {
        return ((Tt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ot,
      useEffect: Jf,
      useImperativeHandle: function (e, t, n) {
        return (
          (n = n != null ? n.concat([e]) : null),
          Ha(4194308, 4, wm.bind(null, t, e), n)
        );
      },
      useLayoutEffect: function (e, t) {
        return Ha(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return Ha(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Tt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (n.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, n) {
        var r = Tt();
        return (
          (t = n !== void 0 ? n(t) : t),
          (r.memoizedState = r.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (r.queue = e),
          (e = e.dispatch = t1.bind(null, se, e)),
          [r.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Tt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: Kf,
      useDebugValue: bc,
      useDeferredValue: function (e) {
        return (Tt().memoizedState = e);
      },
      useTransition: function () {
        var e = Kf(!1),
          t = e[0];
        return ((e = e1.bind(null, e[1])), (Tt().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, n) {
        var r = se,
          i = Tt();
        if (ae) {
          if (n === void 0) throw Error(P(407));
          n = n();
        } else {
          if (((n = t()), Ce === null)) throw Error(P(349));
          qn & 30 || fm(r, t, n);
        }
        i.memoizedState = n;
        var a = { value: n, getSnapshot: t };
        return (
          (i.queue = a),
          Jf(pm.bind(null, r, a, e), [e]),
          (r.flags |= 2048),
          Yi(9, dm.bind(null, r, a, n, t), void 0, null),
          n
        );
      },
      useId: function () {
        var e = Tt(),
          t = Ce.identifierPrefix;
        if (ae) {
          var n = zt,
            r = At;
          ((n = (r & ~(1 << (32 - gt(r) - 1))).toString(32) + n),
            (t = ":" + t + "R" + n),
            (n = Hi++),
            0 < n && (t += "H" + n.toString(32)),
            (t += ":"));
        } else ((n = Z0++), (t = ":" + t + "r" + n.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    i1 = {
      readContext: ot,
      useCallback: Em,
      useContext: ot,
      useEffect: xc,
      useImperativeHandle: Sm,
      useInsertionEffect: gm,
      useLayoutEffect: ym,
      useMemo: xm,
      useReducer: Bs,
      useRef: vm,
      useState: function () {
        return Bs(Gi);
      },
      useDebugValue: bc,
      useDeferredValue: function (e) {
        var t = st();
        return bm(t, we.memoizedState, e);
      },
      useTransition: function () {
        var e = Bs(Gi)[0],
          t = st().memoizedState;
        return [e, t];
      },
      useMutableSource: um,
      useSyncExternalStore: cm,
      useId: _m,
      unstable_isNewReconciler: !1,
    },
    a1 = {
      readContext: ot,
      useCallback: Em,
      useContext: ot,
      useEffect: xc,
      useImperativeHandle: Sm,
      useInsertionEffect: gm,
      useLayoutEffect: ym,
      useMemo: xm,
      useReducer: Us,
      useRef: vm,
      useState: function () {
        return Us(Gi);
      },
      useDebugValue: bc,
      useDeferredValue: function (e) {
        var t = st();
        return we === null ? (t.memoizedState = e) : bm(t, we.memoizedState, e);
      },
      useTransition: function () {
        var e = Us(Gi)[0],
          t = st().memoizedState;
        return [e, t];
      },
      useMutableSource: um,
      useSyncExternalStore: cm,
      useId: _m,
      unstable_isNewReconciler: !1,
    };
  function pt(e, t) {
    if (e && e.defaultProps) {
      ((t = le({}, t)), (e = e.defaultProps));
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function Wl(e, t, n, r) {
    ((t = e.memoizedState),
      (n = n(r, t)),
      (n = n == null ? t : le({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Jo = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? tr(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var r = ze(),
        i = vn(e),
        a = jt(r, i);
      ((a.payload = t),
        n != null && (a.callback = n),
        (t = hn(e, a, i)),
        t !== null && (yt(t, e, i, r), qa(t, e, i)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var r = ze(),
        i = vn(e),
        a = jt(r, i);
      ((a.tag = 1),
        (a.payload = t),
        n != null && (a.callback = n),
        (t = hn(e, a, i)),
        t !== null && (yt(t, e, i, r), qa(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = ze(),
        r = vn(e),
        i = jt(n, r);
      ((i.tag = 2),
        t != null && (i.callback = t),
        (t = hn(e, i, r)),
        t !== null && (yt(t, e, r, n), qa(t, e, r)));
    },
  };
  function Zf(e, t, n, r, i, a, o) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(r, a, o)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Bi(n, r) || !Bi(i, a)
          : !0
    );
  }
  function Om(e, t, n) {
    var r = !1,
      i = xn,
      a = t.contextType;
    return (
      typeof a == "object" && a !== null
        ? (a = ot(a))
        : ((i = We(t) ? Qn : Fe.current),
          (r = t.contextTypes),
          (a = (r = r != null) ? Rr(e, i) : xn)),
      (t = new t(n, a)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = Jo),
      (e.stateNode = t),
      (t._reactInternals = e),
      r &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = i),
        (e.__reactInternalMemoizedMaskedChildContext = a)),
      t
    );
  }
  function ed(e, t, n, r) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, r),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Jo.enqueueReplaceState(t, t.state, null));
  }
  function Hl(e, t, n, r) {
    var i = e.stateNode;
    ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), mc(e));
    var a = t.contextType;
    (typeof a == "object" && a !== null
      ? (i.context = ot(a))
      : ((a = We(t) ? Qn : Fe.current), (i.context = Rr(e, a))),
      (i.state = e.memoizedState),
      (a = t.getDerivedStateFromProps),
      typeof a == "function" && (Wl(e, t, a, n), (i.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function" ||
        (typeof i.UNSAFE_componentWillMount != "function" &&
          typeof i.componentWillMount != "function") ||
        ((t = i.state),
        typeof i.componentWillMount == "function" && i.componentWillMount(),
        typeof i.UNSAFE_componentWillMount == "function" &&
          i.UNSAFE_componentWillMount(),
        t !== i.state && Jo.enqueueReplaceState(i, i.state, null),
        _o(e, n, i, r),
        (i.state = e.memoizedState)),
      typeof i.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function zr(e, t) {
    try {
      var n = "",
        r = t;
      do ((n += My(r)), (r = r.return));
      while (r);
      var i = n;
    } catch (a) {
      i =
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
  }
  function Qs(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function Gl(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  var o1 = typeof WeakMap == "function" ? WeakMap : Map;
  function Nm(e, t, n) {
    ((n = jt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
    var r = t.value;
    return (
      (n.callback = function () {
        (No || ((No = !0), (iu = r)), Gl(e, t));
      }),
      n
    );
  }
  function Pm(e, t, n) {
    ((n = jt(-1, n)), (n.tag = 3));
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      ((n.payload = function () {
        return r(i);
      }),
        (n.callback = function () {
          Gl(e, t);
        }));
    }
    var a = e.stateNode;
    return (
      a !== null &&
        typeof a.componentDidCatch == "function" &&
        (n.callback = function () {
          (Gl(e, t),
            typeof r != "function" &&
              (mn === null ? (mn = new Set([this])) : mn.add(this)));
          var o = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : "",
          });
        }),
      n
    );
  }
  function td(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new o1();
      var i = new Set();
      r.set(t, i);
    } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
    i.has(n) || (i.add(n), (e = S1.bind(null, e, t, n)), t.then(e, e));
  }
  function nd(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function rd(e, t, n, r, i) {
    return e.mode & 1
      ? ((e.flags |= 65536), (e.lanes = i), e)
      : (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (n.flags |= 131072),
            (n.flags &= -52805),
            n.tag === 1 &&
              (n.alternate === null
                ? (n.tag = 17)
                : ((t = jt(-1, 1)), (t.tag = 2), hn(n, t, 1))),
            (n.lanes |= 1)),
        e);
  }
  var s1 = Wt.ReactCurrentOwner,
    $e = !1;
  function Ae(e, t, n, r) {
    t.child = e === null ? am(t, null, n, r) : Fr(t, e.child, n, r);
  }
  function id(e, t, n, r, i) {
    n = n.render;
    var a = t.ref;
    return (
      Or(t, i),
      (r = Sc(e, t, n, r, a, i)),
      (n = Ec()),
      e !== null && !$e
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~i),
          $t(e, t, i))
        : (ae && n && lc(t), (t.flags |= 1), Ae(e, t, r, i), t.child)
    );
  }
  function ad(e, t, n, r, i) {
    if (e === null) {
      var a = n.type;
      return typeof a == "function" &&
        !Ic(a) &&
        a.defaultProps === void 0 &&
        n.compare === null &&
        n.defaultProps === void 0
        ? ((t.tag = 15), (t.type = a), Im(e, t, a, r, i))
        : ((e = Ka(n.type, null, r, t, t.mode, i)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((a = e.child), !(e.lanes & i))) {
      var o = a.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Bi), n(o, r) && e.ref === t.ref)
      )
        return $t(e, t, i);
    }
    return (
      (t.flags |= 1),
      (e = gn(a, r)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Im(e, t, n, r, i) {
    if (e !== null) {
      var a = e.memoizedProps;
      if (Bi(a, r) && e.ref === t.ref)
        if ((($e = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
          e.flags & 131072 && ($e = !0);
        else return ((t.lanes = e.lanes), $t(e, t, i));
    }
    return Yl(e, t, n, r, i);
  }
  function Dm(e, t, n) {
    var r = t.pendingProps,
      i = r.children,
      a = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
      if (!(t.mode & 1))
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          ne(yr, Ge),
          (Ge |= n));
      else {
        if (!(n & 1073741824))
          return (
            (e = a !== null ? a.baseLanes | n : n),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            ne(yr, Ge),
            (Ge |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (r = a !== null ? a.baseLanes : n),
          ne(yr, Ge),
          (Ge |= r));
      }
    else
      (a !== null ? ((r = a.baseLanes | n), (t.memoizedState = null)) : (r = n),
        ne(yr, Ge),
        (Ge |= r));
    return (Ae(e, t, i, n), t.child);
  }
  function Mm(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Yl(e, t, n, r, i) {
    var a = We(n) ? Qn : Fe.current;
    return (
      (a = Rr(t, a)),
      Or(t, i),
      (n = Sc(e, t, n, r, a, i)),
      (r = Ec()),
      e !== null && !$e
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~i),
          $t(e, t, i))
        : (ae && r && lc(t), (t.flags |= 1), Ae(e, t, n, i), t.child)
    );
  }
  function od(e, t, n, r, i) {
    if (We(n)) {
      var a = !0;
      wo(t);
    } else a = !1;
    if ((Or(t, i), t.stateNode === null))
      (Ga(e, t), Om(t, n, r), Hl(t, n, r, i), (r = !0));
    else if (e === null) {
      var o = t.stateNode,
        s = t.memoizedProps;
      o.props = s;
      var l = o.context,
        u = n.contextType;
      typeof u == "object" && u !== null
        ? (u = ot(u))
        : ((u = We(n) ? Qn : Fe.current), (u = Rr(t, u)));
      var c = n.getDerivedStateFromProps,
        f =
          typeof c == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function";
      (f ||
        (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
          typeof o.componentWillReceiveProps != "function") ||
        ((s !== r || l !== u) && ed(t, o, r, u)),
        (Kt = !1));
      var d = t.memoizedState;
      ((o.state = d),
        _o(t, r, o, i),
        (l = t.memoizedState),
        s !== r || d !== l || qe.current || Kt
          ? (typeof c == "function" && (Wl(t, n, c, r), (l = t.memoizedState)),
            (s = Kt || Zf(t, n, s, r, d, l, u))
              ? (f ||
                  (typeof o.UNSAFE_componentWillMount != "function" &&
                    typeof o.componentWillMount != "function") ||
                  (typeof o.componentWillMount == "function" &&
                    o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == "function" &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = r),
                (t.memoizedState = l)),
            (o.props = r),
            (o.state = l),
            (o.context = u),
            (r = s))
          : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            (r = !1)));
    } else {
      ((o = t.stateNode),
        sm(e, t),
        (s = t.memoizedProps),
        (u = t.type === t.elementType ? s : pt(t.type, s)),
        (o.props = u),
        (f = t.pendingProps),
        (d = o.context),
        (l = n.contextType),
        typeof l == "object" && l !== null
          ? (l = ot(l))
          : ((l = We(n) ? Qn : Fe.current), (l = Rr(t, l))));
      var h = n.getDerivedStateFromProps;
      ((c =
        typeof h == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function") ||
        (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
          typeof o.componentWillReceiveProps != "function") ||
        ((s !== f || d !== l) && ed(t, o, r, l)),
        (Kt = !1),
        (d = t.memoizedState),
        (o.state = d),
        _o(t, r, o, i));
      var v = t.memoizedState;
      s !== f || d !== v || qe.current || Kt
        ? (typeof h == "function" && (Wl(t, n, h, r), (v = t.memoizedState)),
          (u = Kt || Zf(t, n, u, r, d, v, l) || !1)
            ? (c ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(r, v, l),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(r, v, l)),
              typeof o.componentDidUpdate == "function" && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof o.componentDidUpdate != "function" ||
                (s === e.memoizedProps && d === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                (s === e.memoizedProps && d === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = r),
              (t.memoizedState = v)),
          (o.props = r),
          (o.state = v),
          (o.context = l),
          (r = u))
        : (typeof o.componentDidUpdate != "function" ||
            (s === e.memoizedProps && d === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != "function" ||
            (s === e.memoizedProps && d === e.memoizedState) ||
            (t.flags |= 1024),
          (r = !1));
    }
    return Xl(e, t, n, r, a, i);
  }
  function Xl(e, t, n, r, i, a) {
    Mm(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o) return (i && qf(t, n, !1), $t(e, t, a));
    ((r = t.stateNode), (s1.current = t));
    var s =
      o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return (
      (t.flags |= 1),
      e !== null && o
        ? ((t.child = Fr(t, e.child, null, a)), (t.child = Fr(t, null, s, a)))
        : Ae(e, t, s, a),
      (t.memoizedState = r.state),
      i && qf(t, n, !0),
      t.child
    );
  }
  function Rm(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? $f(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && $f(e, t.context, !1),
      vc(e, t.containerInfo));
  }
  function sd(e, t, n, r, i) {
    return (Lr(), cc(i), (t.flags |= 256), Ae(e, t, n, r), t.child);
  }
  var Kl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Jl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Lm(e, t, n) {
    var r = t.pendingProps,
      i = oe.current,
      a = !1,
      o = (t.flags & 128) !== 0,
      s;
    if (
      ((s = o) ||
        (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
      s
        ? ((a = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (i |= 1),
      ne(oe, i & 1),
      e === null)
    )
      return (
        $l(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? (t.mode & 1
              ? e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824)
              : (t.lanes = 1),
            null)
          : ((o = r.children),
            (e = r.fallback),
            a
              ? ((r = t.mode),
                (a = t.child),
                (o = { mode: "hidden", children: o }),
                !(r & 1) && a !== null
                  ? ((a.childLanes = 0), (a.pendingProps = o))
                  : (a = ts(o, r, 0, null)),
                (e = Un(e, r, n, null)),
                (a.return = t),
                (e.return = t),
                (a.sibling = e),
                (t.child = a),
                (t.child.memoizedState = Jl(n)),
                (t.memoizedState = Kl),
                e)
              : _c(t, o))
      );
    if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
      return l1(e, t, o, r, s, i, n);
    if (a) {
      ((a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling));
      var l = { mode: "hidden", children: r.children };
      return (
        !(o & 1) && t.child !== i
          ? ((r = t.child),
            (r.childLanes = 0),
            (r.pendingProps = l),
            (t.deletions = null))
          : ((r = gn(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
        s !== null ? (a = gn(s, a)) : ((a = Un(a, o, n, null)), (a.flags |= 2)),
        (a.return = t),
        (r.return = t),
        (r.sibling = a),
        (t.child = r),
        (r = a),
        (a = t.child),
        (o = e.child.memoizedState),
        (o =
          o === null
            ? Jl(n)
            : {
                baseLanes: o.baseLanes | n,
                cachePool: null,
                transitions: o.transitions,
              }),
        (a.memoizedState = o),
        (a.childLanes = e.childLanes & ~n),
        (t.memoizedState = Kl),
        r
      );
    }
    return (
      (a = e.child),
      (e = a.sibling),
      (r = gn(a, { mode: "visible", children: r.children })),
      !(t.mode & 1) && (r.lanes = n),
      (r.return = t),
      (r.sibling = null),
      e !== null &&
        ((n = t.deletions),
        n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
      (t.child = r),
      (t.memoizedState = null),
      r
    );
  }
  function _c(e, t) {
    return (
      (t = ts({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Pa(e, t, n, r) {
    return (
      r !== null && cc(r),
      Fr(t, e.child, null, n),
      (e = _c(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function l1(e, t, n, r, i, a, o) {
    if (n)
      return t.flags & 256
        ? ((t.flags &= -257), (r = Qs(Error(P(422)))), Pa(e, t, o, r))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((a = r.fallback),
            (i = t.mode),
            (r = ts({ mode: "visible", children: r.children }, i, 0, null)),
            (a = Un(a, i, o, null)),
            (a.flags |= 2),
            (r.return = t),
            (a.return = t),
            (r.sibling = a),
            (t.child = r),
            t.mode & 1 && Fr(t, e.child, null, o),
            (t.child.memoizedState = Jl(o)),
            (t.memoizedState = Kl),
            a);
    if (!(t.mode & 1)) return Pa(e, t, o, null);
    if (i.data === "$!") {
      if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
      return (
        (r = s),
        (a = Error(P(419))),
        (r = Qs(a, r, void 0)),
        Pa(e, t, o, r)
      );
    }
    if (((s = (o & e.childLanes) !== 0), $e || s)) {
      if (((r = Ce), r !== null)) {
        switch (o & -o) {
          case 4:
            i = 2;
            break;
          case 16:
            i = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            i = 32;
            break;
          case 536870912:
            i = 268435456;
            break;
          default:
            i = 0;
        }
        ((i = i & (r.suspendedLanes | o) ? 0 : i),
          i !== 0 &&
            i !== a.retryLane &&
            ((a.retryLane = i), Qt(e, i), yt(r, e, i, -1)));
      }
      return (Pc(), (r = Qs(Error(P(421)))), Pa(e, t, o, r));
    }
    return i.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = E1.bind(null, e)),
        (i._reactRetry = t),
        null)
      : ((e = a.treeContext),
        (Xe = pn(i.nextSibling)),
        (Ke = t),
        (ae = !0),
        (mt = null),
        e !== null &&
          ((nt[rt++] = At),
          (nt[rt++] = zt),
          (nt[rt++] = $n),
          (At = e.id),
          (zt = e.overflow),
          ($n = t)),
        (t = _c(t, r.children)),
        (t.flags |= 4096),
        t);
  }
  function ld(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    (r !== null && (r.lanes |= t), ql(e.return, t, n));
  }
  function $s(e, t, n, r, i) {
    var a = e.memoizedState;
    a === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailMode: i,
        })
      : ((a.isBackwards = t),
        (a.rendering = null),
        (a.renderingStartTime = 0),
        (a.last = r),
        (a.tail = n),
        (a.tailMode = i));
  }
  function Fm(e, t, n) {
    var r = t.pendingProps,
      i = r.revealOrder,
      a = r.tail;
    if ((Ae(e, t, r.children, n), (r = oe.current), r & 2))
      ((r = (r & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && e.flags & 128)
        e: for (e = t.child; e !== null;) {
          if (e.tag === 13) e.memoizedState !== null && ld(e, n, t);
          else if (e.tag === 19) ld(e, n, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null;) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      r &= 1;
    }
    if ((ne(oe, r), !(t.mode & 1))) t.memoizedState = null;
    else
      switch (i) {
        case "forwards":
          for (n = t.child, i = null; n !== null;)
            ((e = n.alternate),
              e !== null && To(e) === null && (i = n),
              (n = n.sibling));
          ((n = i),
            n === null
              ? ((i = t.child), (t.child = null))
              : ((i = n.sibling), (n.sibling = null)),
            $s(t, !1, i, n, a));
          break;
        case "backwards":
          for (n = null, i = t.child, t.child = null; i !== null;) {
            if (((e = i.alternate), e !== null && To(e) === null)) {
              t.child = i;
              break;
            }
            ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
          }
          $s(t, !0, n, null, a);
          break;
        case "together":
          $s(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Ga(e, t) {
    !(t.mode & 1) &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function $t(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Wn |= t.lanes),
      !(n & t.childLanes))
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(P(153));
    if (t.child !== null) {
      for (
        e = t.child, n = gn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = gn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function u1(e, t, n) {
    switch (t.tag) {
      case 3:
        (Rm(t), Lr());
        break;
      case 5:
        lm(t);
        break;
      case 1:
        We(t.type) && wo(t);
        break;
      case 4:
        vc(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context,
          i = t.memoizedProps.value;
        (ne(xo, r._currentValue), (r._currentValue = i));
        break;
      case 13:
        if (((r = t.memoizedState), r !== null))
          return r.dehydrated !== null
            ? (ne(oe, oe.current & 1), (t.flags |= 128), null)
            : n & t.child.childLanes
              ? Lm(e, t, n)
              : (ne(oe, oe.current & 1),
                (e = $t(e, t, n)),
                e !== null ? e.sibling : null);
        ne(oe, oe.current & 1);
        break;
      case 19:
        if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
          if (r) return Fm(e, t, n);
          t.flags |= 128;
        }
        if (
          ((i = t.memoizedState),
          i !== null &&
            ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          ne(oe, oe.current),
          r)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Dm(e, t, n));
    }
    return $t(e, t, n);
  }
  var Am, Zl, zm, jm;
  Am = function (e, t) {
    for (var n = t.child; n !== null;) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null;) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
  };
  Zl = function () {};
  zm = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
      ((e = t.stateNode), zn(Nt.current));
      var a = null;
      switch (n) {
        case "input":
          ((i = El(e, i)), (r = El(e, r)), (a = []));
          break;
        case "select":
          ((i = le({}, i, { value: void 0 })),
            (r = le({}, r, { value: void 0 })),
            (a = []));
          break;
        case "textarea":
          ((i = _l(e, i)), (r = _l(e, r)), (a = []));
          break;
        default:
          typeof i.onClick != "function" &&
            typeof r.onClick == "function" &&
            (e.onclick = go);
      }
      kl(n, r);
      var o;
      n = null;
      for (u in i)
        if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
          if (u === "style") {
            var s = i[u];
            for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
          } else
            u !== "dangerouslySetInnerHTML" &&
              u !== "children" &&
              u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              u !== "autoFocus" &&
              (Ri.hasOwnProperty(u)
                ? a || (a = [])
                : (a = a || []).push(u, null));
      for (u in r) {
        var l = r[u];
        if (
          ((s = i != null ? i[u] : void 0),
          r.hasOwnProperty(u) && l !== s && (l != null || s != null))
        )
          if (u === "style")
            if (s) {
              for (o in s)
                !s.hasOwnProperty(o) ||
                  (l && l.hasOwnProperty(o)) ||
                  (n || (n = {}), (n[o] = ""));
              for (o in l)
                l.hasOwnProperty(o) &&
                  s[o] !== l[o] &&
                  (n || (n = {}), (n[o] = l[o]));
            } else (n || (a || (a = []), a.push(u, n)), (n = l));
          else
            u === "dangerouslySetInnerHTML"
              ? ((l = l ? l.__html : void 0),
                (s = s ? s.__html : void 0),
                l != null && s !== l && (a = a || []).push(u, l))
              : u === "children"
                ? (typeof l != "string" && typeof l != "number") ||
                  (a = a || []).push(u, "" + l)
                : u !== "suppressContentEditableWarning" &&
                  u !== "suppressHydrationWarning" &&
                  (Ri.hasOwnProperty(u)
                    ? (l != null && u === "onScroll" && re("scroll", e),
                      a || s === l || (a = []))
                    : (a = a || []).push(u, l));
      }
      n && (a = a || []).push("style", n);
      var u = a;
      (t.updateQueue = u) && (t.flags |= 4);
    }
  };
  jm = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function ii(e, t) {
    if (!ae)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null;)
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null;)
            (n.alternate !== null && (r = n), (n = n.sibling));
          r === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
  }
  function Re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      r = 0;
    if (t)
      for (var i = e.child; i !== null;)
        ((n |= i.lanes | i.childLanes),
          (r |= i.subtreeFlags & 14680064),
          (r |= i.flags & 14680064),
          (i.return = e),
          (i = i.sibling));
    else
      for (i = e.child; i !== null;)
        ((n |= i.lanes | i.childLanes),
          (r |= i.subtreeFlags),
          (r |= i.flags),
          (i.return = e),
          (i = i.sibling));
    return ((e.subtreeFlags |= r), (e.childLanes = n), t);
  }
  function c1(e, t, n) {
    var r = t.pendingProps;
    switch ((uc(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Re(t), null);
      case 1:
        return (We(t.type) && yo(), Re(t), null);
      case 3:
        return (
          (r = t.stateNode),
          Ar(),
          ie(qe),
          ie(Fe),
          yc(),
          r.pendingContext &&
            ((r.context = r.pendingContext), (r.pendingContext = null)),
          (e === null || e.child === null) &&
            (Oa(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                ((t.flags |= 1024), mt !== null && (su(mt), (mt = null)))),
          Zl(e, t),
          Re(t),
          null
        );
      case 5:
        gc(t);
        var i = zn(Wi.current);
        if (((n = t.type), e !== null && t.stateNode != null))
          (zm(e, t, n, r, i),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(P(166));
            return (Re(t), null);
          }
          if (((e = zn(Nt.current)), Oa(t))) {
            ((r = t.stateNode), (n = t.type));
            var a = t.memoizedProps;
            switch (((r[kt] = t), (r[$i] = a), (e = (t.mode & 1) !== 0), n)) {
              case "dialog":
                (re("cancel", r), re("close", r));
                break;
              case "iframe":
              case "object":
              case "embed":
                re("load", r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < mi.length; i++) re(mi[i], r);
                break;
              case "source":
                re("error", r);
                break;
              case "img":
              case "image":
              case "link":
                (re("error", r), re("load", r));
                break;
              case "details":
                re("toggle", r);
                break;
              case "input":
                (gf(r, a), re("invalid", r));
                break;
              case "select":
                ((r._wrapperState = { wasMultiple: !!a.multiple }),
                  re("invalid", r));
                break;
              case "textarea":
                (wf(r, a), re("invalid", r));
            }
            (kl(n, a), (i = null));
            for (var o in a)
              if (a.hasOwnProperty(o)) {
                var s = a[o];
                o === "children"
                  ? typeof s == "string"
                    ? r.textContent !== s &&
                      (a.suppressHydrationWarning !== !0 &&
                        Ca(r.textContent, s, e),
                      (i = ["children", s]))
                    : typeof s == "number" &&
                      r.textContent !== "" + s &&
                      (a.suppressHydrationWarning !== !0 &&
                        Ca(r.textContent, s, e),
                      (i = ["children", "" + s]))
                  : Ri.hasOwnProperty(o) &&
                    s != null &&
                    o === "onScroll" &&
                    re("scroll", r);
              }
            switch (n) {
              case "input":
                (wa(r), yf(r, a, !0));
                break;
              case "textarea":
                (wa(r), Sf(r));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof a.onClick == "function" && (r.onclick = go);
            }
            ((r = i), (t.updateQueue = r), r !== null && (t.flags |= 4));
          } else {
            ((o = i.nodeType === 9 ? i : i.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = ph(n)),
              e === "http://www.w3.org/1999/xhtml"
                ? n === "script"
                  ? ((e = o.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof r.is == "string"
                    ? (e = o.createElement(n, { is: r.is }))
                    : ((e = o.createElement(n)),
                      n === "select" &&
                        ((o = e),
                        r.multiple
                          ? (o.multiple = !0)
                          : r.size && (o.size = r.size)))
                : (e = o.createElementNS(e, n)),
              (e[kt] = t),
              (e[$i] = r),
              Am(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((o = Cl(n, r)), n)) {
                case "dialog":
                  (re("cancel", e), re("close", e), (i = r));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (re("load", e), (i = r));
                  break;
                case "video":
                case "audio":
                  for (i = 0; i < mi.length; i++) re(mi[i], e);
                  i = r;
                  break;
                case "source":
                  (re("error", e), (i = r));
                  break;
                case "img":
                case "image":
                case "link":
                  (re("error", e), re("load", e), (i = r));
                  break;
                case "details":
                  (re("toggle", e), (i = r));
                  break;
                case "input":
                  (gf(e, r), (i = El(e, r)), re("invalid", e));
                  break;
                case "option":
                  i = r;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!r.multiple }),
                    (i = le({}, r, { value: void 0 })),
                    re("invalid", e));
                  break;
                case "textarea":
                  (wf(e, r), (i = _l(e, r)), re("invalid", e));
                  break;
                default:
                  i = r;
              }
              (kl(n, i), (s = i));
              for (a in s)
                if (s.hasOwnProperty(a)) {
                  var l = s[a];
                  a === "style"
                    ? vh(e, l)
                    : a === "dangerouslySetInnerHTML"
                      ? ((l = l ? l.__html : void 0), l != null && hh(e, l))
                      : a === "children"
                        ? typeof l == "string"
                          ? (n !== "textarea" || l !== "") && Li(e, l)
                          : typeof l == "number" && Li(e, "" + l)
                        : a !== "suppressContentEditableWarning" &&
                          a !== "suppressHydrationWarning" &&
                          a !== "autoFocus" &&
                          (Ri.hasOwnProperty(a)
                            ? l != null && a === "onScroll" && re("scroll", e)
                            : l != null && Gu(e, a, l, o));
                }
              switch (n) {
                case "input":
                  (wa(e), yf(e, r, !1));
                  break;
                case "textarea":
                  (wa(e), Sf(e));
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + En(r.value));
                  break;
                case "select":
                  ((e.multiple = !!r.multiple),
                    (a = r.value),
                    a != null
                      ? _r(e, !!r.multiple, a, !1)
                      : r.defaultValue != null &&
                        _r(e, !!r.multiple, r.defaultValue, !0));
                  break;
                default:
                  typeof i.onClick == "function" && (e.onclick = go);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (Re(t), null);
      case 6:
        if (e && t.stateNode != null) jm(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(P(166));
          if (((n = zn(Wi.current)), zn(Nt.current), Oa(t))) {
            if (
              ((r = t.stateNode),
              (n = t.memoizedProps),
              (r[kt] = t),
              (a = r.nodeValue !== n) && ((e = Ke), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Ca(r.nodeValue, n, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Ca(r.nodeValue, n, (e.mode & 1) !== 0);
              }
            a && (t.flags |= 4);
          } else
            ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
              (r[kt] = t),
              (t.stateNode = r));
        }
        return (Re(t), null);
      case 13:
        if (
          (ie(oe),
          (r = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (ae && Xe !== null && t.mode & 1 && !(t.flags & 128))
            (rm(), Lr(), (t.flags |= 98560), (a = !1));
          else if (((a = Oa(t)), r !== null && r.dehydrated !== null)) {
            if (e === null) {
              if (!a) throw Error(P(318));
              if (
                ((a = t.memoizedState),
                (a = a !== null ? a.dehydrated : null),
                !a)
              )
                throw Error(P(317));
              a[kt] = t;
            } else
              (Lr(),
                !(t.flags & 128) && (t.memoizedState = null),
                (t.flags |= 4));
            (Re(t), (a = !1));
          } else (mt !== null && (su(mt), (mt = null)), (a = !0));
          if (!a) return t.flags & 65536 ? t : null;
        }
        return t.flags & 128
          ? ((t.lanes = n), t)
          : ((r = r !== null),
            r !== (e !== null && e.memoizedState !== null) &&
              r &&
              ((t.child.flags |= 8192),
              t.mode & 1 &&
                (e === null || oe.current & 1 ? Se === 0 && (Se = 3) : Pc())),
            t.updateQueue !== null && (t.flags |= 4),
            Re(t),
            null);
      case 4:
        return (
          Ar(),
          Zl(e, t),
          e === null && Ui(t.stateNode.containerInfo),
          Re(t),
          null
        );
      case 10:
        return (pc(t.type._context), Re(t), null);
      case 17:
        return (We(t.type) && yo(), Re(t), null);
      case 19:
        if ((ie(oe), (a = t.memoizedState), a === null)) return (Re(t), null);
        if (((r = (t.flags & 128) !== 0), (o = a.rendering), o === null))
          if (r) ii(a, !1);
          else {
            if (Se !== 0 || (e !== null && e.flags & 128))
              for (e = t.child; e !== null;) {
                if (((o = To(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      ii(a, !1),
                      r = o.updateQueue,
                      r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      r = n,
                      n = t.child;
                    n !== null;
                  )
                    ((a = n),
                      (e = r),
                      (a.flags &= 14680066),
                      (o = a.alternate),
                      o === null
                        ? ((a.childLanes = 0),
                          (a.lanes = e),
                          (a.child = null),
                          (a.subtreeFlags = 0),
                          (a.memoizedProps = null),
                          (a.memoizedState = null),
                          (a.updateQueue = null),
                          (a.dependencies = null),
                          (a.stateNode = null))
                        : ((a.childLanes = o.childLanes),
                          (a.lanes = o.lanes),
                          (a.child = o.child),
                          (a.subtreeFlags = 0),
                          (a.deletions = null),
                          (a.memoizedProps = o.memoizedProps),
                          (a.memoizedState = o.memoizedState),
                          (a.updateQueue = o.updateQueue),
                          (a.type = o.type),
                          (e = o.dependencies),
                          (a.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (n = n.sibling));
                  return (ne(oe, (oe.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            a.tail !== null &&
              pe() > jr &&
              ((t.flags |= 128), (r = !0), ii(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!r)
            if (((e = To(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (r = !0),
                (n = e.updateQueue),
                n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                ii(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !o.alternate &&
                  !ae)
              )
                return (Re(t), null);
            } else
              2 * pe() - a.renderingStartTime > jr &&
                n !== 1073741824 &&
                ((t.flags |= 128), (r = !0), ii(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((n = a.last),
              n !== null ? (n.sibling = o) : (t.child = o),
              (a.last = o));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = pe()),
            (t.sibling = null),
            (n = oe.current),
            ne(oe, r ? (n & 1) | 2 : n & 1),
            t)
          : (Re(t), null);
      case 22:
      case 23:
        return (
          Nc(),
          (r = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
          r && t.mode & 1
            ? Ge & 1073741824 &&
              (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Re(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(P(156, t.tag));
  }
  function f1(e, t) {
    switch ((uc(t), t.tag)) {
      case 1:
        return (
          We(t.type) && yo(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Ar(),
          ie(qe),
          ie(Fe),
          yc(),
          (e = t.flags),
          e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 5:
        return (gc(t), null);
      case 13:
        if (
          (ie(oe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(P(340));
          Lr();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (ie(oe), null);
      case 4:
        return (Ar(), null);
      case 10:
        return (pc(t.type._context), null);
      case 22:
      case 23:
        return (Nc(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ia = !1,
    Le = !1,
    d1 = typeof WeakSet == "function" ? WeakSet : Set,
    z = null;
  function gr(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          ue(e, t, r);
        }
      else n.current = null;
  }
  function eu(e, t, n) {
    try {
      n();
    } catch (r) {
      ue(e, t, r);
    }
  }
  var ud = !1;
  function p1(e, t) {
    if (((Al = ho), (e = $h()), sc(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var i = r.anchorOffset,
              a = r.focusNode;
            r = r.focusOffset;
            try {
              (n.nodeType, a.nodeType);
            } catch {
              n = null;
              break e;
            }
            var o = 0,
              s = -1,
              l = -1,
              u = 0,
              c = 0,
              f = e,
              d = null;
            t: for (;;) {
              for (
                var h;
                f !== n || (i !== 0 && f.nodeType !== 3) || (s = o + i),
                  f !== a || (r !== 0 && f.nodeType !== 3) || (l = o + r),
                  f.nodeType === 3 && (o += f.nodeValue.length),
                  (h = f.firstChild) !== null;
              )
                ((d = f), (f = h));
              for (;;) {
                if (f === e) break t;
                if (
                  (d === n && ++u === i && (s = o),
                  d === a && ++c === r && (l = o),
                  (h = f.nextSibling) !== null)
                )
                  break;
                ((f = d), (d = f.parentNode));
              }
              f = h;
            }
            n = s === -1 || l === -1 ? null : { start: s, end: l };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      zl = { focusedElem: e, selectionRange: n }, ho = !1, z = t;
      z !== null;
    )
      if (((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (z = e));
      else
        for (; z !== null;) {
          t = z;
          try {
            var v = t.alternate;
            if (t.flags & 1024)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (v !== null) {
                    var y = v.memoizedProps,
                      S = v.memoizedState,
                      p = t.stateNode,
                      m = p.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? y : pt(t.type, y),
                        S,
                      );
                    p.__reactInternalSnapshotBeforeUpdate = m;
                  }
                  break;
                case 3:
                  var g = t.stateNode.containerInfo;
                  g.nodeType === 1
                    ? (g.textContent = "")
                    : g.nodeType === 9 &&
                      g.documentElement &&
                      g.removeChild(g.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(P(163));
              }
          } catch (E) {
            ue(t, t.return, E);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (z = e));
            break;
          }
          z = t.return;
        }
    return ((v = ud), (ud = !1), v);
  }
  function Ti(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
      var i = (r = r.next);
      do {
        if ((i.tag & e) === e) {
          var a = i.destroy;
          ((i.destroy = void 0), a !== void 0 && eu(t, n, a));
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function Zo(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function tu(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : (t.current = e);
    }
  }
  function Vm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Vm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[kt],
          delete t[$i],
          delete t[Bl],
          delete t[Y0],
          delete t[X0])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function Bm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function cd(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || Bm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function nu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode),
        t
          ? n.nodeType === 8
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (n.nodeType === 8
              ? ((t = n.parentNode), t.insertBefore(e, n))
              : ((t = n), t.appendChild(e)),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = go)));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (nu(e, t, n), e = e.sibling; e !== null;)
        (nu(e, t, n), (e = e.sibling));
  }
  function ru(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (r !== 4 && ((e = e.child), e !== null))
      for (ru(e, t, n), e = e.sibling; e !== null;)
        (ru(e, t, n), (e = e.sibling));
  }
  var Ne = null,
    ht = !1;
  function Gt(e, t, n) {
    for (n = n.child; n !== null;) (Um(e, t, n), (n = n.sibling));
  }
  function Um(e, t, n) {
    if (Ot && typeof Ot.onCommitFiberUnmount == "function")
      try {
        Ot.onCommitFiberUnmount(qo, n);
      } catch {}
    switch (n.tag) {
      case 5:
        Le || gr(n, t);
      case 6:
        var r = Ne,
          i = ht;
        ((Ne = null),
          Gt(e, t, n),
          (Ne = r),
          (ht = i),
          Ne !== null &&
            (ht
              ? ((e = Ne),
                (n = n.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(n)
                  : e.removeChild(n))
              : Ne.removeChild(n.stateNode)));
        break;
      case 18:
        Ne !== null &&
          (ht
            ? ((e = Ne),
              (n = n.stateNode),
              e.nodeType === 8
                ? As(e.parentNode, n)
                : e.nodeType === 1 && As(e, n),
              ji(e))
            : As(Ne, n.stateNode));
        break;
      case 4:
        ((r = Ne),
          (i = ht),
          (Ne = n.stateNode.containerInfo),
          (ht = !0),
          Gt(e, t, n),
          (Ne = r),
          (ht = i));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Le &&
          ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
        ) {
          i = r = r.next;
          do {
            var a = i,
              o = a.destroy;
            ((a = a.tag),
              o !== void 0 && (a & 2 || a & 4) && eu(n, t, o),
              (i = i.next));
          } while (i !== r);
        }
        Gt(e, t, n);
        break;
      case 1:
        if (
          !Le &&
          (gr(n, t),
          (r = n.stateNode),
          typeof r.componentWillUnmount == "function")
        )
          try {
            ((r.props = n.memoizedProps),
              (r.state = n.memoizedState),
              r.componentWillUnmount());
          } catch (s) {
            ue(n, t, s);
          }
        Gt(e, t, n);
        break;
      case 21:
        Gt(e, t, n);
        break;
      case 22:
        n.mode & 1
          ? ((Le = (r = Le) || n.memoizedState !== null), Gt(e, t, n), (Le = r))
          : Gt(e, t, n);
        break;
      default:
        Gt(e, t, n);
    }
  }
  function fd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      (n === null && (n = e.stateNode = new d1()),
        t.forEach(function (r) {
          var i = x1.bind(null, e, r);
          n.has(r) || (n.add(r), r.then(i, i));
        }));
    }
  }
  function ct(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var i = n[r];
        try {
          var a = e,
            o = t,
            s = o;
          e: for (; s !== null;) {
            switch (s.tag) {
              case 5:
                ((Ne = s.stateNode), (ht = !1));
                break e;
              case 3:
                ((Ne = s.stateNode.containerInfo), (ht = !0));
                break e;
              case 4:
                ((Ne = s.stateNode.containerInfo), (ht = !0));
                break e;
            }
            s = s.return;
          }
          if (Ne === null) throw Error(P(160));
          (Um(a, o, i), (Ne = null), (ht = !1));
          var l = i.alternate;
          (l !== null && (l.return = null), (i.return = null));
        } catch (u) {
          ue(i, t, u);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null;) (Qm(t, e), (t = t.sibling));
  }
  function Qm(e, t) {
    var n = e.alternate,
      r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((ct(t, e), _t(e), r & 4)) {
          try {
            (Ti(3, e, e.return), Zo(3, e));
          } catch (y) {
            ue(e, e.return, y);
          }
          try {
            Ti(5, e, e.return);
          } catch (y) {
            ue(e, e.return, y);
          }
        }
        break;
      case 1:
        (ct(t, e), _t(e), r & 512 && n !== null && gr(n, n.return));
        break;
      case 5:
        if (
          (ct(t, e),
          _t(e),
          r & 512 && n !== null && gr(n, n.return),
          e.flags & 32)
        ) {
          var i = e.stateNode;
          try {
            Li(i, "");
          } catch (y) {
            ue(e, e.return, y);
          }
        }
        if (r & 4 && ((i = e.stateNode), i != null)) {
          var a = e.memoizedProps,
            o = n !== null ? n.memoizedProps : a,
            s = e.type,
            l = e.updateQueue;
          if (((e.updateQueue = null), l !== null))
            try {
              (s === "input" &&
                a.type === "radio" &&
                a.name != null &&
                fh(i, a),
                Cl(s, o));
              var u = Cl(s, a);
              for (o = 0; o < l.length; o += 2) {
                var c = l[o],
                  f = l[o + 1];
                c === "style"
                  ? vh(i, f)
                  : c === "dangerouslySetInnerHTML"
                    ? hh(i, f)
                    : c === "children"
                      ? Li(i, f)
                      : Gu(i, c, f, u);
              }
              switch (s) {
                case "input":
                  xl(i, a);
                  break;
                case "textarea":
                  dh(i, a);
                  break;
                case "select":
                  var d = i._wrapperState.wasMultiple;
                  i._wrapperState.wasMultiple = !!a.multiple;
                  var h = a.value;
                  h != null
                    ? _r(i, !!a.multiple, h, !1)
                    : d !== !!a.multiple &&
                      (a.defaultValue != null
                        ? _r(i, !!a.multiple, a.defaultValue, !0)
                        : _r(i, !!a.multiple, a.multiple ? [] : "", !1));
              }
              i[$i] = a;
            } catch (y) {
              ue(e, e.return, y);
            }
        }
        break;
      case 6:
        if ((ct(t, e), _t(e), r & 4)) {
          if (e.stateNode === null) throw Error(P(162));
          ((i = e.stateNode), (a = e.memoizedProps));
          try {
            i.nodeValue = a;
          } catch (y) {
            ue(e, e.return, y);
          }
        }
        break;
      case 3:
        if (
          (ct(t, e), _t(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            ji(t.containerInfo);
          } catch (y) {
            ue(e, e.return, y);
          }
        break;
      case 4:
        (ct(t, e), _t(e));
        break;
      case 13:
        (ct(t, e),
          _t(e),
          (i = e.child),
          i.flags & 8192 &&
            ((a = i.memoizedState !== null),
            (i.stateNode.isHidden = a),
            !a ||
              (i.alternate !== null && i.alternate.memoizedState !== null) ||
              (Cc = pe())),
          r & 4 && fd(e));
        break;
      case 22:
        if (
          ((c = n !== null && n.memoizedState !== null),
          e.mode & 1 ? ((Le = (u = Le) || c), ct(t, e), (Le = u)) : ct(t, e),
          _t(e),
          r & 8192)
        ) {
          if (
            ((u = e.memoizedState !== null),
            (e.stateNode.isHidden = u) && !c && e.mode & 1)
          )
            for (z = e, c = e.child; c !== null;) {
              for (f = z = c; z !== null;) {
                switch (((d = z), (h = d.child), d.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Ti(4, d, d.return);
                    break;
                  case 1:
                    gr(d, d.return);
                    var v = d.stateNode;
                    if (typeof v.componentWillUnmount == "function") {
                      ((r = d), (n = d.return));
                      try {
                        ((t = r),
                          (v.props = t.memoizedProps),
                          (v.state = t.memoizedState),
                          v.componentWillUnmount());
                      } catch (y) {
                        ue(r, n, y);
                      }
                    }
                    break;
                  case 5:
                    gr(d, d.return);
                    break;
                  case 22:
                    if (d.memoizedState !== null) {
                      pd(f);
                      continue;
                    }
                }
                h !== null ? ((h.return = d), (z = h)) : pd(f);
              }
              c = c.sibling;
            }
          e: for (c = null, f = e; ;) {
            if (f.tag === 5) {
              if (c === null) {
                c = f;
                try {
                  ((i = f.stateNode),
                    u
                      ? ((a = i.style),
                        typeof a.setProperty == "function"
                          ? a.setProperty("display", "none", "important")
                          : (a.display = "none"))
                      : ((s = f.stateNode),
                        (l = f.memoizedProps.style),
                        (o =
                          l != null && l.hasOwnProperty("display")
                            ? l.display
                            : null),
                        (s.style.display = mh("display", o))));
                } catch (y) {
                  ue(e, e.return, y);
                }
              }
            } else if (f.tag === 6) {
              if (c === null)
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (y) {
                  ue(e, e.return, y);
                }
            } else if (
              ((f.tag !== 22 && f.tag !== 23) ||
                f.memoizedState === null ||
                f === e) &&
              f.child !== null
            ) {
              ((f.child.return = f), (f = f.child));
              continue;
            }
            if (f === e) break e;
            for (; f.sibling === null;) {
              if (f.return === null || f.return === e) break e;
              (c === f && (c = null), (f = f.return));
            }
            (c === f && (c = null),
              (f.sibling.return = f.return),
              (f = f.sibling));
          }
        }
        break;
      case 19:
        (ct(t, e), _t(e), r & 4 && fd(e));
        break;
      case 21:
        break;
      default:
        (ct(t, e), _t(e));
    }
  }
  function _t(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null;) {
            if (Bm(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(P(160));
        }
        switch (r.tag) {
          case 5:
            var i = r.stateNode;
            r.flags & 32 && (Li(i, ""), (r.flags &= -33));
            var a = cd(e);
            ru(e, a, i);
            break;
          case 3:
          case 4:
            var o = r.stateNode.containerInfo,
              s = cd(e);
            nu(e, s, o);
            break;
          default:
            throw Error(P(161));
        }
      } catch (l) {
        ue(e, e.return, l);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function h1(e, t, n) {
    ((z = e), $m(e));
  }
  function $m(e, t, n) {
    for (var r = (e.mode & 1) !== 0; z !== null;) {
      var i = z,
        a = i.child;
      if (i.tag === 22 && r) {
        var o = i.memoizedState !== null || Ia;
        if (!o) {
          var s = i.alternate,
            l = (s !== null && s.memoizedState !== null) || Le;
          s = Ia;
          var u = Le;
          if (((Ia = o), (Le = l) && !u))
            for (z = i; z !== null;)
              ((o = z),
                (l = o.child),
                o.tag === 22 && o.memoizedState !== null
                  ? hd(i)
                  : l !== null
                    ? ((l.return = o), (z = l))
                    : hd(i));
          for (; a !== null;) ((z = a), $m(a), (a = a.sibling));
          ((z = i), (Ia = s), (Le = u));
        }
        dd(e);
      } else
        i.subtreeFlags & 8772 && a !== null ? ((a.return = i), (z = a)) : dd(e);
    }
  }
  function dd(e) {
    for (; z !== null;) {
      var t = z;
      if (t.flags & 8772) {
        var n = t.alternate;
        try {
          if (t.flags & 8772)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Le || Zo(5, t);
                break;
              case 1:
                var r = t.stateNode;
                if (t.flags & 4 && !Le)
                  if (n === null) r.componentDidMount();
                  else {
                    var i =
                      t.elementType === t.type
                        ? n.memoizedProps
                        : pt(t.type, n.memoizedProps);
                    r.componentDidUpdate(
                      i,
                      n.memoizedState,
                      r.__reactInternalSnapshotBeforeUpdate,
                    );
                  }
                var a = t.updateQueue;
                a !== null && Xf(t, a, r);
                break;
              case 3:
                var o = t.updateQueue;
                if (o !== null) {
                  if (((n = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        n = t.child.stateNode;
                        break;
                      case 1:
                        n = t.child.stateNode;
                    }
                  Xf(t, o, n);
                }
                break;
              case 5:
                var s = t.stateNode;
                if (n === null && t.flags & 4) {
                  n = s;
                  var l = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      l.autoFocus && n.focus();
                      break;
                    case "img":
                      l.src && (n.src = l.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var u = t.alternate;
                  if (u !== null) {
                    var c = u.memoizedState;
                    if (c !== null) {
                      var f = c.dehydrated;
                      f !== null && ji(f);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(P(163));
            }
          Le || (t.flags & 512 && tu(t));
        } catch (d) {
          ue(t, t.return, d);
        }
      }
      if (t === e) {
        z = null;
        break;
      }
      if (((n = t.sibling), n !== null)) {
        ((n.return = t.return), (z = n));
        break;
      }
      z = t.return;
    }
  }
  function pd(e) {
    for (; z !== null;) {
      var t = z;
      if (t === e) {
        z = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        ((n.return = t.return), (z = n));
        break;
      }
      z = t.return;
    }
  }
  function hd(e) {
    for (; z !== null;) {
      var t = z;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              Zo(4, t);
            } catch (l) {
              ue(t, n, l);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var i = t.return;
              try {
                r.componentDidMount();
              } catch (l) {
                ue(t, i, l);
              }
            }
            var a = t.return;
            try {
              tu(t);
            } catch (l) {
              ue(t, a, l);
            }
            break;
          case 5:
            var o = t.return;
            try {
              tu(t);
            } catch (l) {
              ue(t, o, l);
            }
        }
      } catch (l) {
        ue(t, t.return, l);
      }
      if (t === e) {
        z = null;
        break;
      }
      var s = t.sibling;
      if (s !== null) {
        ((s.return = t.return), (z = s));
        break;
      }
      z = t.return;
    }
  }
  var m1 = Math.ceil,
    Oo = Wt.ReactCurrentDispatcher,
    Tc = Wt.ReactCurrentOwner,
    at = Wt.ReactCurrentBatchConfig,
    G = 0,
    Ce = null,
    ve = null,
    Pe = 0,
    Ge = 0,
    yr = On(0),
    Se = 0,
    Xi = null,
    Wn = 0,
    es = 0,
    kc = 0,
    ki = null,
    Qe = null,
    Cc = 0,
    jr = 1 / 0,
    Rt = null,
    No = !1,
    iu = null,
    mn = null,
    Da = !1,
    on = null,
    Po = 0,
    Ci = 0,
    au = null,
    Ya = -1,
    Xa = 0;
  function ze() {
    return G & 6 ? pe() : Ya !== -1 ? Ya : (Ya = pe());
  }
  function vn(e) {
    return e.mode & 1
      ? G & 2 && Pe !== 0
        ? Pe & -Pe
        : J0.transition !== null
          ? (Xa === 0 && (Xa = Oh()), Xa)
          : ((e = J),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Lh(e.type))),
            e)
      : 1;
  }
  function yt(e, t, n, r) {
    if (50 < Ci) throw ((Ci = 0), (au = null), Error(P(185)));
    (sa(e, n, r),
      (!(G & 2) || e !== Ce) &&
        (e === Ce && (!(G & 2) && (es |= n), Se === 4 && nn(e, Pe)),
        He(e, r),
        n === 1 &&
          G === 0 &&
          !(t.mode & 1) &&
          ((jr = pe() + 500), Xo && Nn())));
  }
  function He(e, t) {
    var n = e.callbackNode;
    Jy(e, t);
    var r = po(e, e === Ce ? Pe : 0);
    if (r === 0)
      (n !== null && bf(n), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = r & -r), e.callbackPriority !== t)) {
      if ((n != null && bf(n), t === 1))
        (e.tag === 0 ? K0(md.bind(null, e)) : em(md.bind(null, e)),
          H0(function () {
            !(G & 6) && Nn();
          }),
          (n = null));
      else {
        switch (Nh(r)) {
          case 1:
            n = Zu;
            break;
          case 4:
            n = kh;
            break;
          case 16:
            n = fo;
            break;
          case 536870912:
            n = Ch;
            break;
          default:
            n = fo;
        }
        n = Jm(n, qm.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = n));
    }
  }
  function qm(e, t) {
    if (((Ya = -1), (Xa = 0), G & 6)) throw Error(P(327));
    var n = e.callbackNode;
    if (Nr() && e.callbackNode !== n) return null;
    var r = po(e, e === Ce ? Pe : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Io(e, r);
    else {
      t = r;
      var i = G;
      G |= 2;
      var a = Hm();
      (Ce !== e || Pe !== t) && ((Rt = null), (jr = pe() + 500), Bn(e, t));
      do
        try {
          y1();
          break;
        } catch (s) {
          Wm(e, s);
        }
      while (1);
      (dc(),
        (Oo.current = a),
        (G = i),
        ve !== null ? (t = 0) : ((Ce = null), (Pe = 0), (t = Se)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((i = Dl(e)), i !== 0 && ((r = i), (t = ou(e, i)))),
        t === 1)
      )
        throw ((n = Xi), Bn(e, 0), nn(e, r), He(e, pe()), n);
      if (t === 6) nn(e, r);
      else {
        if (
          ((i = e.current.alternate),
          !(r & 30) &&
            !v1(i) &&
            ((t = Io(e, r)),
            t === 2 && ((a = Dl(e)), a !== 0 && ((r = a), (t = ou(e, a)))),
            t === 1))
        )
          throw ((n = Xi), Bn(e, 0), nn(e, r), He(e, pe()), n);
        switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
          case 0:
          case 1:
            throw Error(P(345));
          case 2:
            Mn(e, Qe, Rt);
            break;
          case 3:
            if (
              (nn(e, r),
              (r & 130023424) === r && ((t = Cc + 500 - pe()), 10 < t))
            ) {
              if (po(e, 0) !== 0) break;
              if (((i = e.suspendedLanes), (i & r) !== r)) {
                (ze(), (e.pingedLanes |= e.suspendedLanes & i));
                break;
              }
              e.timeoutHandle = Vl(Mn.bind(null, e, Qe, Rt), t);
              break;
            }
            Mn(e, Qe, Rt);
            break;
          case 4:
            if ((nn(e, r), (r & 4194240) === r)) break;
            for (t = e.eventTimes, i = -1; 0 < r;) {
              var o = 31 - gt(r);
              ((a = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~a));
            }
            if (
              ((r = i),
              (r = pe() - r),
              (r =
                (120 > r
                  ? 120
                  : 480 > r
                    ? 480
                    : 1080 > r
                      ? 1080
                      : 1920 > r
                        ? 1920
                        : 3e3 > r
                          ? 3e3
                          : 4320 > r
                            ? 4320
                            : 1960 * m1(r / 1960)) - r),
              10 < r)
            ) {
              e.timeoutHandle = Vl(Mn.bind(null, e, Qe, Rt), r);
              break;
            }
            Mn(e, Qe, Rt);
            break;
          case 5:
            Mn(e, Qe, Rt);
            break;
          default:
            throw Error(P(329));
        }
      }
    }
    return (He(e, pe()), e.callbackNode === n ? qm.bind(null, e) : null);
  }
  function ou(e, t) {
    var n = ki;
    return (
      e.current.memoizedState.isDehydrated && (Bn(e, t).flags |= 256),
      (e = Io(e, t)),
      e !== 2 && ((t = Qe), (Qe = n), t !== null && su(t)),
      e
    );
  }
  function su(e) {
    Qe === null ? (Qe = e) : Qe.push.apply(Qe, e);
  }
  function v1(e) {
    for (var t = e; ;) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && ((n = n.stores), n !== null))
          for (var r = 0; r < n.length; r++) {
            var i = n[r],
              a = i.getSnapshot;
            i = i.value;
            try {
              if (!St(a(), i)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function nn(e, t) {
    for (
      t &= ~kc,
        t &= ~es,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;
    ) {
      var n = 31 - gt(t),
        r = 1 << n;
      ((e[n] = -1), (t &= ~r));
    }
  }
  function md(e) {
    if (G & 6) throw Error(P(327));
    Nr();
    var t = po(e, 0);
    if (!(t & 1)) return (He(e, pe()), null);
    var n = Io(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = Dl(e);
      r !== 0 && ((t = r), (n = ou(e, r)));
    }
    if (n === 1) throw ((n = Xi), Bn(e, 0), nn(e, t), He(e, pe()), n);
    if (n === 6) throw Error(P(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      Mn(e, Qe, Rt),
      He(e, pe()),
      null
    );
  }
  function Oc(e, t) {
    var n = G;
    G |= 1;
    try {
      return e(t);
    } finally {
      ((G = n), G === 0 && ((jr = pe() + 500), Xo && Nn()));
    }
  }
  function Hn(e) {
    on !== null && on.tag === 0 && !(G & 6) && Nr();
    var t = G;
    G |= 1;
    var n = at.transition,
      r = J;
    try {
      if (((at.transition = null), (J = 1), e)) return e();
    } finally {
      ((J = r), (at.transition = n), (G = t), !(G & 6) && Nn());
    }
  }
  function Nc() {
    ((Ge = yr.current), ie(yr));
  }
  function Bn(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), W0(n)), ve !== null))
      for (n = ve.return; n !== null;) {
        var r = n;
        switch ((uc(r), r.tag)) {
          case 1:
            ((r = r.type.childContextTypes), r != null && yo());
            break;
          case 3:
            (Ar(), ie(qe), ie(Fe), yc());
            break;
          case 5:
            gc(r);
            break;
          case 4:
            Ar();
            break;
          case 13:
            ie(oe);
            break;
          case 19:
            ie(oe);
            break;
          case 10:
            pc(r.type._context);
            break;
          case 22:
          case 23:
            Nc();
        }
        n = n.return;
      }
    if (
      ((Ce = e),
      (ve = e = gn(e.current, null)),
      (Pe = Ge = t),
      (Se = 0),
      (Xi = null),
      (kc = es = Wn = 0),
      (Qe = ki = null),
      An !== null)
    ) {
      for (t = 0; t < An.length; t++)
        if (((n = An[t]), (r = n.interleaved), r !== null)) {
          n.interleaved = null;
          var i = r.next,
            a = n.pending;
          if (a !== null) {
            var o = a.next;
            ((a.next = i), (r.next = o));
          }
          n.pending = r;
        }
      An = null;
    }
    return e;
  }
  function Wm(e, t) {
    do {
      var n = ve;
      try {
        if ((dc(), (Wa.current = Co), ko)) {
          for (var r = se.memoizedState; r !== null;) {
            var i = r.queue;
            (i !== null && (i.pending = null), (r = r.next));
          }
          ko = !1;
        }
        if (
          ((qn = 0),
          (be = we = se = null),
          (_i = !1),
          (Hi = 0),
          (Tc.current = null),
          n === null || n.return === null)
        ) {
          ((Se = 1), (Xi = t), (ve = null));
          break;
        }
        e: {
          var a = e,
            o = n.return,
            s = n,
            l = t;
          if (
            ((t = Pe),
            (s.flags |= 32768),
            l !== null && typeof l == "object" && typeof l.then == "function")
          ) {
            var u = l,
              c = s,
              f = c.tag;
            if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
              var d = c.alternate;
              d
                ? ((c.updateQueue = d.updateQueue),
                  (c.memoizedState = d.memoizedState),
                  (c.lanes = d.lanes))
                : ((c.updateQueue = null), (c.memoizedState = null));
            }
            var h = nd(o);
            if (h !== null) {
              ((h.flags &= -257),
                rd(h, o, s, a, t),
                h.mode & 1 && td(a, u, t),
                (t = h),
                (l = u));
              var v = t.updateQueue;
              if (v === null) {
                var y = new Set();
                (y.add(l), (t.updateQueue = y));
              } else v.add(l);
              break e;
            } else {
              if (!(t & 1)) {
                (td(a, u, t), Pc());
                break e;
              }
              l = Error(P(426));
            }
          } else if (ae && s.mode & 1) {
            var S = nd(o);
            if (S !== null) {
              (!(S.flags & 65536) && (S.flags |= 256),
                rd(S, o, s, a, t),
                cc(zr(l, s)));
              break e;
            }
          }
          ((a = l = zr(l, s)),
            Se !== 4 && (Se = 2),
            ki === null ? (ki = [a]) : ki.push(a),
            (a = o));
          do {
            switch (a.tag) {
              case 3:
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var p = Nm(a, l, t);
                Yf(a, p);
                break e;
              case 1:
                s = l;
                var m = a.type,
                  g = a.stateNode;
                if (
                  !(a.flags & 128) &&
                  (typeof m.getDerivedStateFromError == "function" ||
                    (g !== null &&
                      typeof g.componentDidCatch == "function" &&
                      (mn === null || !mn.has(g))))
                ) {
                  ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                  var E = Pm(a, s, t);
                  Yf(a, E);
                  break e;
                }
            }
            a = a.return;
          } while (a !== null);
        }
        Ym(n);
      } catch (x) {
        ((t = x), ve === n && n !== null && (ve = n = n.return));
        continue;
      }
      break;
    } while (1);
  }
  function Hm() {
    var e = Oo.current;
    return ((Oo.current = Co), e === null ? Co : e);
  }
  function Pc() {
    ((Se === 0 || Se === 3 || Se === 2) && (Se = 4),
      Ce === null || (!(Wn & 268435455) && !(es & 268435455)) || nn(Ce, Pe));
  }
  function Io(e, t) {
    var n = G;
    G |= 2;
    var r = Hm();
    (Ce !== e || Pe !== t) && ((Rt = null), Bn(e, t));
    do
      try {
        g1();
        break;
      } catch (i) {
        Wm(e, i);
      }
    while (1);
    if ((dc(), (G = n), (Oo.current = r), ve !== null)) throw Error(P(261));
    return ((Ce = null), (Pe = 0), Se);
  }
  function g1() {
    for (; ve !== null;) Gm(ve);
  }
  function y1() {
    for (; ve !== null && !Qy();) Gm(ve);
  }
  function Gm(e) {
    var t = Km(e.alternate, e, Ge);
    ((e.memoizedProps = e.pendingProps),
      t === null ? Ym(e) : (ve = t),
      (Tc.current = null));
  }
  function Ym(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (((e = t.return), t.flags & 32768)) {
        if (((n = f1(n, t)), n !== null)) {
          ((n.flags &= 32767), (ve = n));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((Se = 6), (ve = null));
          return;
        }
      } else if (((n = c1(n, t, Ge)), n !== null)) {
        ve = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ve = t;
        return;
      }
      ve = t = e;
    } while (t !== null);
    Se === 0 && (Se = 5);
  }
  function Mn(e, t, n) {
    var r = J,
      i = at.transition;
    try {
      ((at.transition = null), (J = 1), w1(e, t, n, r));
    } finally {
      ((at.transition = i), (J = r));
    }
    return null;
  }
  function w1(e, t, n, r) {
    do Nr();
    while (on !== null);
    if (G & 6) throw Error(P(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
      throw Error(P(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var a = n.lanes | n.childLanes;
    if (
      (Zy(e, a),
      e === Ce && ((ve = Ce = null), (Pe = 0)),
      (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
        Da ||
        ((Da = !0),
        Jm(fo, function () {
          return (Nr(), null);
        })),
      (a = (n.flags & 15990) !== 0),
      n.subtreeFlags & 15990 || a)
    ) {
      ((a = at.transition), (at.transition = null));
      var o = J;
      J = 1;
      var s = G;
      ((G |= 4),
        (Tc.current = null),
        p1(e, n),
        Qm(n, e),
        j0(zl),
        (ho = !!Al),
        (zl = Al = null),
        (e.current = n),
        h1(n),
        $y(),
        (G = s),
        (J = o),
        (at.transition = a));
    } else e.current = n;
    if (
      (Da && ((Da = !1), (on = e), (Po = i)),
      (a = e.pendingLanes),
      a === 0 && (mn = null),
      Hy(n.stateNode),
      He(e, pe()),
      t !== null)
    )
      for (r = e.onRecoverableError, n = 0; n < t.length; n++)
        ((i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest }));
    if (No) throw ((No = !1), (e = iu), (iu = null), e);
    return (
      Po & 1 && e.tag !== 0 && Nr(),
      (a = e.pendingLanes),
      a & 1 ? (e === au ? Ci++ : ((Ci = 0), (au = e))) : (Ci = 0),
      Nn(),
      null
    );
  }
  function Nr() {
    if (on !== null) {
      var e = Nh(Po),
        t = at.transition,
        n = J;
      try {
        if (((at.transition = null), (J = 16 > e ? 16 : e), on === null))
          var r = !1;
        else {
          if (((e = on), (on = null), (Po = 0), G & 6)) throw Error(P(331));
          var i = G;
          for (G |= 4, z = e.current; z !== null;) {
            var a = z,
              o = a.child;
            if (z.flags & 16) {
              var s = a.deletions;
              if (s !== null) {
                for (var l = 0; l < s.length; l++) {
                  var u = s[l];
                  for (z = u; z !== null;) {
                    var c = z;
                    switch (c.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ti(8, c, a);
                    }
                    var f = c.child;
                    if (f !== null) ((f.return = c), (z = f));
                    else
                      for (; z !== null;) {
                        c = z;
                        var d = c.sibling,
                          h = c.return;
                        if ((Vm(c), c === u)) {
                          z = null;
                          break;
                        }
                        if (d !== null) {
                          ((d.return = h), (z = d));
                          break;
                        }
                        z = h;
                      }
                  }
                }
                var v = a.alternate;
                if (v !== null) {
                  var y = v.child;
                  if (y !== null) {
                    v.child = null;
                    do {
                      var S = y.sibling;
                      ((y.sibling = null), (y = S));
                    } while (y !== null);
                  }
                }
                z = a;
              }
            }
            if (a.subtreeFlags & 2064 && o !== null) ((o.return = a), (z = o));
            else
              e: for (; z !== null;) {
                if (((a = z), a.flags & 2048))
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ti(9, a, a.return);
                  }
                var p = a.sibling;
                if (p !== null) {
                  ((p.return = a.return), (z = p));
                  break e;
                }
                z = a.return;
              }
          }
          var m = e.current;
          for (z = m; z !== null;) {
            o = z;
            var g = o.child;
            if (o.subtreeFlags & 2064 && g !== null) ((g.return = o), (z = g));
            else
              e: for (o = m; z !== null;) {
                if (((s = z), s.flags & 2048))
                  try {
                    switch (s.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Zo(9, s);
                    }
                  } catch (x) {
                    ue(s, s.return, x);
                  }
                if (s === o) {
                  z = null;
                  break e;
                }
                var E = s.sibling;
                if (E !== null) {
                  ((E.return = s.return), (z = E));
                  break e;
                }
                z = s.return;
              }
          }
          if (
            ((G = i), Nn(), Ot && typeof Ot.onPostCommitFiberRoot == "function")
          )
            try {
              Ot.onPostCommitFiberRoot(qo, e);
            } catch {}
          r = !0;
        }
        return r;
      } finally {
        ((J = n), (at.transition = t));
      }
    }
    return !1;
  }
  function vd(e, t, n) {
    ((t = zr(n, t)),
      (t = Nm(e, t, 1)),
      (e = hn(e, t, 1)),
      (t = ze()),
      e !== null && (sa(e, 1, t), He(e, t)));
  }
  function ue(e, t, n) {
    if (e.tag === 3) vd(e, e, n);
    else
      for (; t !== null;) {
        if (t.tag === 3) {
          vd(t, e, n);
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof r.componentDidCatch == "function" &&
              (mn === null || !mn.has(r)))
          ) {
            ((e = zr(n, e)),
              (e = Pm(t, e, 1)),
              (t = hn(t, e, 1)),
              (e = ze()),
              t !== null && (sa(t, 1, e), He(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function S1(e, t, n) {
    var r = e.pingCache;
    (r !== null && r.delete(t),
      (t = ze()),
      (e.pingedLanes |= e.suspendedLanes & n),
      Ce === e &&
        (Pe & n) === n &&
        (Se === 4 || (Se === 3 && (Pe & 130023424) === Pe && 500 > pe() - Cc)
          ? Bn(e, 0)
          : (kc |= n)),
      He(e, t));
  }
  function Xm(e, t) {
    t === 0 &&
      (e.mode & 1
        ? ((t = xa), (xa <<= 1), !(xa & 130023424) && (xa = 4194304))
        : (t = 1));
    var n = ze();
    ((e = Qt(e, t)), e !== null && (sa(e, t, n), He(e, n)));
  }
  function E1(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), Xm(e, n));
  }
  function x1(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode,
          i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(P(314));
    }
    (r !== null && r.delete(t), Xm(e, n));
  }
  var Km;
  Km = function (e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || qe.current) $e = !0;
      else {
        if (!(e.lanes & n) && !(t.flags & 128)) return (($e = !1), u1(e, t, n));
        $e = !!(e.flags & 131072);
      }
    else (($e = !1), ae && t.flags & 1048576 && tm(t, Eo, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var r = t.type;
        (Ga(e, t), (e = t.pendingProps));
        var i = Rr(t, Fe.current);
        (Or(t, n), (i = Sc(null, t, r, e, i, n)));
        var a = Ec();
        return (
          (t.flags |= 1),
          typeof i == "object" &&
          i !== null &&
          typeof i.render == "function" &&
          i.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              We(r) ? ((a = !0), wo(t)) : (a = !1),
              (t.memoizedState =
                i.state !== null && i.state !== void 0 ? i.state : null),
              mc(t),
              (i.updater = Jo),
              (t.stateNode = i),
              (i._reactInternals = t),
              Hl(t, r, e, n),
              (t = Xl(null, t, r, !0, a, n)))
            : ((t.tag = 0), ae && a && lc(t), Ae(null, t, i, n), (t = t.child)),
          t
        );
      case 16:
        r = t.elementType;
        e: {
          switch (
            (Ga(e, t),
            (e = t.pendingProps),
            (i = r._init),
            (r = i(r._payload)),
            (t.type = r),
            (i = t.tag = _1(r)),
            (e = pt(r, e)),
            i)
          ) {
            case 0:
              t = Yl(null, t, r, e, n);
              break e;
            case 1:
              t = od(null, t, r, e, n);
              break e;
            case 11:
              t = id(null, t, r, e, n);
              break e;
            case 14:
              t = ad(null, t, r, pt(r.type, e), n);
              break e;
          }
          throw Error(P(306, r, ""));
        }
        return t;
      case 0:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : pt(r, i)),
          Yl(e, t, r, i, n)
        );
      case 1:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : pt(r, i)),
          od(e, t, r, i, n)
        );
      case 3:
        e: {
          if ((Rm(t), e === null)) throw Error(P(387));
          ((r = t.pendingProps),
            (a = t.memoizedState),
            (i = a.element),
            sm(e, t),
            _o(t, r, null, n));
          var o = t.memoizedState;
          if (((r = o.element), a.isDehydrated))
            if (
              ((a = {
                element: r,
                isDehydrated: !1,
                cache: o.cache,
                pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                transitions: o.transitions,
              }),
              (t.updateQueue.baseState = a),
              (t.memoizedState = a),
              t.flags & 256)
            ) {
              ((i = zr(Error(P(423)), t)), (t = sd(e, t, r, n, i)));
              break e;
            } else if (r !== i) {
              ((i = zr(Error(P(424)), t)), (t = sd(e, t, r, n, i)));
              break e;
            } else
              for (
                Xe = pn(t.stateNode.containerInfo.firstChild),
                  Ke = t,
                  ae = !0,
                  mt = null,
                  n = am(t, null, r, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((Lr(), r === i)) {
              t = $t(e, t, n);
              break e;
            }
            Ae(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          lm(t),
          e === null && $l(t),
          (r = t.type),
          (i = t.pendingProps),
          (a = e !== null ? e.memoizedProps : null),
          (o = i.children),
          jl(r, i) ? (o = null) : a !== null && jl(r, a) && (t.flags |= 32),
          Mm(e, t),
          Ae(e, t, o, n),
          t.child
        );
      case 6:
        return (e === null && $l(t), null);
      case 13:
        return Lm(e, t, n);
      case 4:
        return (
          vc(t, t.stateNode.containerInfo),
          (r = t.pendingProps),
          e === null ? (t.child = Fr(t, null, r, n)) : Ae(e, t, r, n),
          t.child
        );
      case 11:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : pt(r, i)),
          id(e, t, r, i, n)
        );
      case 7:
        return (Ae(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Ae(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Ae(e, t, t.pendingProps.children, n), t.child);
      case 10:
        e: {
          if (
            ((r = t.type._context),
            (i = t.pendingProps),
            (a = t.memoizedProps),
            (o = i.value),
            ne(xo, r._currentValue),
            (r._currentValue = o),
            a !== null)
          )
            if (St(a.value, o)) {
              if (a.children === i.children && !qe.current) {
                t = $t(e, t, n);
                break e;
              }
            } else
              for (a = t.child, a !== null && (a.return = t); a !== null;) {
                var s = a.dependencies;
                if (s !== null) {
                  o = a.child;
                  for (var l = s.firstContext; l !== null;) {
                    if (l.context === r) {
                      if (a.tag === 1) {
                        ((l = jt(-1, n & -n)), (l.tag = 2));
                        var u = a.updateQueue;
                        if (u !== null) {
                          u = u.shared;
                          var c = u.pending;
                          (c === null
                            ? (l.next = l)
                            : ((l.next = c.next), (c.next = l)),
                            (u.pending = l));
                        }
                      }
                      ((a.lanes |= n),
                        (l = a.alternate),
                        l !== null && (l.lanes |= n),
                        ql(a.return, n, t),
                        (s.lanes |= n));
                      break;
                    }
                    l = l.next;
                  }
                } else if (a.tag === 10) o = a.type === t.type ? null : a.child;
                else if (a.tag === 18) {
                  if (((o = a.return), o === null)) throw Error(P(341));
                  ((o.lanes |= n),
                    (s = o.alternate),
                    s !== null && (s.lanes |= n),
                    ql(o, n, t),
                    (o = a.sibling));
                } else o = a.child;
                if (o !== null) o.return = a;
                else
                  for (o = a; o !== null;) {
                    if (o === t) {
                      o = null;
                      break;
                    }
                    if (((a = o.sibling), a !== null)) {
                      ((a.return = o.return), (o = a));
                      break;
                    }
                    o = o.return;
                  }
                a = o;
              }
          (Ae(e, t, i.children, n), (t = t.child));
        }
        return t;
      case 9:
        return (
          (i = t.type),
          (r = t.pendingProps.children),
          Or(t, n),
          (i = ot(i)),
          (r = r(i)),
          (t.flags |= 1),
          Ae(e, t, r, n),
          t.child
        );
      case 14:
        return (
          (r = t.type),
          (i = pt(r, t.pendingProps)),
          (i = pt(r.type, i)),
          ad(e, t, r, i, n)
        );
      case 15:
        return Im(e, t, t.type, t.pendingProps, n);
      case 17:
        return (
          (r = t.type),
          (i = t.pendingProps),
          (i = t.elementType === r ? i : pt(r, i)),
          Ga(e, t),
          (t.tag = 1),
          We(r) ? ((e = !0), wo(t)) : (e = !1),
          Or(t, n),
          Om(t, r, i),
          Hl(t, r, i, n),
          Xl(null, t, r, !0, e, n)
        );
      case 19:
        return Fm(e, t, n);
      case 22:
        return Dm(e, t, n);
    }
    throw Error(P(156, t.tag));
  };
  function Jm(e, t) {
    return Th(e, t);
  }
  function b1(e, t, n, r) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function it(e, t, n, r) {
    return new b1(e, t, n, r);
  }
  function Ic(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function _1(e) {
    if (typeof e == "function") return Ic(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === Xu)) return 11;
      if (e === Ku) return 14;
    }
    return 2;
  }
  function gn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = it(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 14680064),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function Ka(e, t, n, r, i, a) {
    var o = 2;
    if (((r = e), typeof e == "function")) Ic(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else
      e: switch (e) {
        case lr:
          return Un(n.children, i, a, t);
        case Yu:
          ((o = 8), (i |= 8));
          break;
        case gl:
          return (
            (e = it(12, n, t, i | 2)),
            (e.elementType = gl),
            (e.lanes = a),
            e
          );
        case yl:
          return (
            (e = it(13, n, t, i)),
            (e.elementType = yl),
            (e.lanes = a),
            e
          );
        case wl:
          return (
            (e = it(19, n, t, i)),
            (e.elementType = wl),
            (e.lanes = a),
            e
          );
        case lh:
          return ts(n, i, a, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case oh:
                o = 10;
                break e;
              case sh:
                o = 9;
                break e;
              case Xu:
                o = 11;
                break e;
              case Ku:
                o = 14;
                break e;
              case Xt:
                ((o = 16), (r = null));
                break e;
            }
          throw Error(P(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = it(o, n, t, i)),
      (t.elementType = e),
      (t.type = r),
      (t.lanes = a),
      t
    );
  }
  function Un(e, t, n, r) {
    return ((e = it(7, e, r, t)), (e.lanes = n), e);
  }
  function ts(e, t, n, r) {
    return (
      (e = it(22, e, r, t)),
      (e.elementType = lh),
      (e.lanes = n),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function qs(e, t, n) {
    return ((e = it(6, e, null, t)), (e.lanes = n), e);
  }
  function Ws(e, t, n) {
    return (
      (t = it(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function T1(e, t, n, r, i) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = ks(0)),
      (this.expirationTimes = ks(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ks(0)),
      (this.identifierPrefix = r),
      (this.onRecoverableError = i),
      (this.mutableSourceEagerHydrationData = null));
  }
  function Dc(e, t, n, r, i, a, o, s, l) {
    return (
      (e = new T1(e, t, n, s, l)),
      t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
      (a = it(3, null, null, t)),
      (e.current = a),
      (a.stateNode = e),
      (a.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      mc(a),
      e
    );
  }
  function k1(e, t, n) {
    var r =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: sr,
      key: r == null ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Zm(e) {
    if (!e) return xn;
    e = e._reactInternals;
    e: {
      if (tr(e) !== e || e.tag !== 1) throw Error(P(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (We(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(P(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (We(n)) return Zh(e, n, t);
    }
    return t;
  }
  function ev(e, t, n, r, i, a, o, s, l) {
    return (
      (e = Dc(n, r, !0, e, i, a, o, s, l)),
      (e.context = Zm(null)),
      (n = e.current),
      (r = ze()),
      (i = vn(n)),
      (a = jt(r, i)),
      (a.callback = t ?? null),
      hn(n, a, i),
      (e.current.lanes = i),
      sa(e, i, r),
      He(e, r),
      e
    );
  }
  function ns(e, t, n, r) {
    var i = t.current,
      a = ze(),
      o = vn(i);
    return (
      (n = Zm(n)),
      t.context === null ? (t.context = n) : (t.pendingContext = n),
      (t = jt(a, o)),
      (t.payload = { element: e }),
      (r = r === void 0 ? null : r),
      r !== null && (t.callback = r),
      (e = hn(i, t, o)),
      e !== null && (yt(e, i, o, a), qa(e, i, o)),
      o
    );
  }
  function Do(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function gd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Mc(e, t) {
    (gd(e, t), (e = e.alternate) && gd(e, t));
  }
  function C1() {
    return null;
  }
  var tv =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function Rc(e) {
    this._internalRoot = e;
  }
  rs.prototype.render = Rc.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(P(409));
    ns(e, t, null, null);
  };
  rs.prototype.unmount = Rc.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      (Hn(function () {
        ns(null, e, null, null);
      }),
        (t[Ut] = null));
    }
  };
  function rs(e) {
    this._internalRoot = e;
  }
  rs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Dh();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < tn.length && t !== 0 && t < tn[n].priority; n++);
      (tn.splice(n, 0, e), n === 0 && Rh(e));
    }
  };
  function Lc(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function is(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function yd() {}
  function O1(e, t, n, r, i) {
    if (i) {
      if (typeof r == "function") {
        var a = r;
        r = function () {
          var u = Do(o);
          a.call(u);
        };
      }
      var o = ev(t, r, e, 0, null, !1, !1, "", yd);
      return (
        (e._reactRootContainer = o),
        (e[Ut] = o.current),
        Ui(e.nodeType === 8 ? e.parentNode : e),
        Hn(),
        o
      );
    }
    for (; (i = e.lastChild);) e.removeChild(i);
    if (typeof r == "function") {
      var s = r;
      r = function () {
        var u = Do(l);
        s.call(u);
      };
    }
    var l = Dc(e, 0, !1, null, null, !1, !1, "", yd);
    return (
      (e._reactRootContainer = l),
      (e[Ut] = l.current),
      Ui(e.nodeType === 8 ? e.parentNode : e),
      Hn(function () {
        ns(t, l, n, r);
      }),
      l
    );
  }
  function as(e, t, n, r, i) {
    var a = n._reactRootContainer;
    if (a) {
      var o = a;
      if (typeof i == "function") {
        var s = i;
        i = function () {
          var l = Do(o);
          s.call(l);
        };
      }
      ns(t, o, e, i);
    } else o = O1(n, t, e, i, r);
    return Do(o);
  }
  Ph = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = hi(t.pendingLanes);
          n !== 0 &&
            (ec(t, n | 1), He(t, pe()), !(G & 6) && ((jr = pe() + 500), Nn()));
        }
        break;
      case 13:
        (Hn(function () {
          var r = Qt(e, 1);
          if (r !== null) {
            var i = ze();
            yt(r, e, 1, i);
          }
        }),
          Mc(e, 1));
    }
  };
  tc = function (e) {
    if (e.tag === 13) {
      var t = Qt(e, 134217728);
      if (t !== null) {
        var n = ze();
        yt(t, e, 134217728, n);
      }
      Mc(e, 134217728);
    }
  };
  Ih = function (e) {
    if (e.tag === 13) {
      var t = vn(e),
        n = Qt(e, t);
      if (n !== null) {
        var r = ze();
        yt(n, e, t, r);
      }
      Mc(e, t);
    }
  };
  Dh = function () {
    return J;
  };
  Mh = function (e, t) {
    var n = J;
    try {
      return ((J = e), t());
    } finally {
      J = n;
    }
  };
  Nl = function (e, t, n) {
    switch (t) {
      case "input":
        if ((xl(e, n), (t = n.name), n.type === "radio" && t != null)) {
          for (n = e; n.parentNode;) n = n.parentNode;
          for (
            n = n.querySelectorAll(
              "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
            ),
              t = 0;
            t < n.length;
            t++
          ) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var i = Yo(r);
              if (!i) throw Error(P(90));
              (ch(r), xl(r, i));
            }
          }
        }
        break;
      case "textarea":
        dh(e, n);
        break;
      case "select":
        ((t = n.value), t != null && _r(e, !!n.multiple, t, !1));
    }
  };
  wh = Oc;
  Sh = Hn;
  var N1 = { usingClientEntryPoint: !1, Events: [ua, dr, Yo, gh, yh, Oc] },
    ai = {
      findFiberByHostInstance: Fn,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    P1 = {
      bundleType: ai.bundleType,
      version: ai.version,
      rendererPackageName: ai.rendererPackageName,
      rendererConfig: ai.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Wt.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = bh(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: ai.findFiberByHostInstance || C1,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ma = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ma.isDisabled && Ma.supportsFiber)
      try {
        ((qo = Ma.inject(P1)), (Ot = Ma));
      } catch {}
  }
  Ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = N1;
  Ze.createPortal = function (e, t) {
    var n =
      2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Lc(t)) throw Error(P(200));
    return k1(e, t, null, n);
  };
  Ze.createRoot = function (e, t) {
    if (!Lc(e)) throw Error(P(299));
    var n = !1,
      r = "",
      i = tv;
    return (
      t != null &&
        (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
        t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
      (t = Dc(e, 1, !1, null, null, n, !1, r, i)),
      (e[Ut] = t.current),
      Ui(e.nodeType === 8 ? e.parentNode : e),
      new Rc(t)
    );
  };
  Ze.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(P(188))
        : ((e = Object.keys(e).join(",")), Error(P(268, e)));
    return ((e = bh(t)), (e = e === null ? null : e.stateNode), e);
  };
  Ze.flushSync = function (e) {
    return Hn(e);
  };
  Ze.hydrate = function (e, t, n) {
    if (!is(t)) throw Error(P(200));
    return as(null, e, t, !0, n);
  };
  Ze.hydrateRoot = function (e, t, n) {
    if (!Lc(e)) throw Error(P(405));
    var r = (n != null && n.hydratedSources) || null,
      i = !1,
      a = "",
      o = tv;
    if (
      (n != null &&
        (n.unstable_strictMode === !0 && (i = !0),
        n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
        n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
      (t = ev(t, null, e, 1, n ?? null, i, !1, a, o)),
      (e[Ut] = t.current),
      Ui(e),
      r)
    )
      for (e = 0; e < r.length; e++)
        ((n = r[e]),
          (i = n._getVersion),
          (i = i(n._source)),
          t.mutableSourceEagerHydrationData == null
            ? (t.mutableSourceEagerHydrationData = [n, i])
            : t.mutableSourceEagerHydrationData.push(n, i));
    return new rs(t);
  };
  Ze.render = function (e, t, n) {
    if (!is(t)) throw Error(P(200));
    return as(null, e, t, !1, n);
  };
  Ze.unmountComponentAtNode = function (e) {
    if (!is(e)) throw Error(P(40));
    return e._reactRootContainer
      ? (Hn(function () {
          as(null, null, e, !1, function () {
            ((e._reactRootContainer = null), (e[Ut] = null));
          });
        }),
        !0)
      : !1;
  };
  Ze.unstable_batchedUpdates = Oc;
  Ze.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!is(n)) throw Error(P(200));
    if (e == null || e._reactInternals === void 0) throw Error(P(38));
    return as(e, t, n, !1, r);
  };
  Ze.version = "18.3.1-next-f1338f8080-20240426";
  function nv() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nv);
      } catch (e) {
        console.error(e);
      }
  }
  (nv(), (nh.exports = Ze));
  var I1 = nh.exports,
    wd = I1;
  ((ml.createRoot = wd.createRoot), (ml.hydrateRoot = wd.hydrateRoot));
  /**
   * @remix-run/router v1.23.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */ function Ki() {
    return (
      (Ki = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      Ki.apply(this, arguments)
    );
  }
  var sn;
  (function (e) {
    ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
  })(sn || (sn = {}));
  const Sd = "popstate";
  function D1(e) {
    e === void 0 && (e = {});
    function t(r, i) {
      let { pathname: a, search: o, hash: s } = r.location;
      return lu(
        "",
        { pathname: a, search: o, hash: s },
        (i.state && i.state.usr) || null,
        (i.state && i.state.key) || "default",
      );
    }
    function n(r, i) {
      return typeof i == "string" ? i : Mo(i);
    }
    return R1(t, n, null, e);
  }
  function ge(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
  }
  function rv(e, t) {
    if (!e) {
      typeof console < "u" && console.warn(t);
      try {
        throw new Error(t);
      } catch {}
    }
  }
  function M1() {
    return Math.random().toString(36).substr(2, 8);
  }
  function Ed(e, t) {
    return { usr: e.state, key: e.key, idx: t };
  }
  function lu(e, t, n, r) {
    return (
      n === void 0 && (n = null),
      Ki(
        {
          pathname: typeof e == "string" ? e : e.pathname,
          search: "",
          hash: "",
        },
        typeof t == "string" ? Hr(t) : t,
        { state: n, key: (t && t.key) || r || M1() },
      )
    );
  }
  function Mo(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return (
      n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
      r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
      t
    );
  }
  function Hr(e) {
    let t = {};
    if (e) {
      let n = e.indexOf("#");
      n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
      let r = e.indexOf("?");
      (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
        e && (t.pathname = e));
    }
    return t;
  }
  function R1(e, t, n, r) {
    r === void 0 && (r = {});
    let { window: i = document.defaultView, v5Compat: a = !1 } = r,
      o = i.history,
      s = sn.Pop,
      l = null,
      u = c();
    u == null && ((u = 0), o.replaceState(Ki({}, o.state, { idx: u }), ""));
    function c() {
      return (o.state || { idx: null }).idx;
    }
    function f() {
      s = sn.Pop;
      let S = c(),
        p = S == null ? null : S - u;
      ((u = S), l && l({ action: s, location: y.location, delta: p }));
    }
    function d(S, p) {
      s = sn.Push;
      let m = lu(y.location, S, p);
      (n && n(m, S), (u = c() + 1));
      let g = Ed(m, u),
        E = y.createHref(m);
      try {
        o.pushState(g, "", E);
      } catch (x) {
        if (x instanceof DOMException && x.name === "DataCloneError") throw x;
        i.location.assign(E);
      }
      a && l && l({ action: s, location: y.location, delta: 1 });
    }
    function h(S, p) {
      s = sn.Replace;
      let m = lu(y.location, S, p);
      (n && n(m, S), (u = c()));
      let g = Ed(m, u),
        E = y.createHref(m);
      (o.replaceState(g, "", E),
        a && l && l({ action: s, location: y.location, delta: 0 }));
    }
    function v(S) {
      let p =
          i.location.origin !== "null" ? i.location.origin : i.location.href,
        m = typeof S == "string" ? S : Mo(S);
      return (
        (m = m.replace(/ $/, "%20")),
        ge(
          p,
          "No window.location.(origin|href) available to create URL for href: " +
            m,
        ),
        new URL(m, p)
      );
    }
    let y = {
      get action() {
        return s;
      },
      get location() {
        return e(i, o);
      },
      listen(S) {
        if (l) throw new Error("A history only accepts one active listener");
        return (
          i.addEventListener(Sd, f),
          (l = S),
          () => {
            (i.removeEventListener(Sd, f), (l = null));
          }
        );
      },
      createHref(S) {
        return t(i, S);
      },
      createURL: v,
      encodeLocation(S) {
        let p = v(S);
        return { pathname: p.pathname, search: p.search, hash: p.hash };
      },
      push: d,
      replace: h,
      go(S) {
        return o.go(S);
      },
    };
    return y;
  }
  var xd;
  (function (e) {
    ((e.data = "data"),
      (e.deferred = "deferred"),
      (e.redirect = "redirect"),
      (e.error = "error"));
  })(xd || (xd = {}));
  function L1(e, t, n) {
    return (n === void 0 && (n = "/"), F1(e, t, n, !1));
  }
  function F1(e, t, n, r) {
    let i = typeof t == "string" ? Hr(t) : t,
      a = Fc(i.pathname || "/", n);
    if (a == null) return null;
    let o = iv(e);
    A1(o);
    let s = null;
    for (let l = 0; s == null && l < o.length; ++l) {
      let u = G1(a);
      s = W1(o[l], u, r);
    }
    return s;
  }
  function iv(e, t, n, r) {
    (t === void 0 && (t = []),
      n === void 0 && (n = []),
      r === void 0 && (r = ""));
    let i = (a, o, s) => {
      let l = {
        relativePath: s === void 0 ? a.path || "" : s,
        caseSensitive: a.caseSensitive === !0,
        childrenIndex: o,
        route: a,
      };
      l.relativePath.startsWith("/") &&
        (ge(
          l.relativePath.startsWith(r),
          'Absolute route path "' +
            l.relativePath +
            '" nested under path ' +
            ('"' + r + '" is not valid. An absolute child route path ') +
            "must start with the combined path of all its parent routes.",
        ),
        (l.relativePath = l.relativePath.slice(r.length)));
      let u = yn([r, l.relativePath]),
        c = n.concat(l);
      (a.children &&
        a.children.length > 0 &&
        (ge(
          a.index !== !0,
          "Index routes must not have child routes. Please remove " +
            ('all child routes from route path "' + u + '".'),
        ),
        iv(a.children, t, c, u)),
        !(a.path == null && !a.index) &&
          t.push({ path: u, score: $1(u, a.index), routesMeta: c }));
    };
    return (
      e.forEach((a, o) => {
        var s;
        if (a.path === "" || !((s = a.path) != null && s.includes("?")))
          i(a, o);
        else for (let l of av(a.path)) i(a, o, l);
      }),
      t
    );
  }
  function av(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t,
      i = n.endsWith("?"),
      a = n.replace(/\?$/, "");
    if (r.length === 0) return i ? [a, ""] : [a];
    let o = av(r.join("/")),
      s = [];
    return (
      s.push(...o.map((l) => (l === "" ? a : [a, l].join("/")))),
      i && s.push(...o),
      s.map((l) => (e.startsWith("/") && l === "" ? "/" : l))
    );
  }
  function A1(e) {
    e.sort((t, n) =>
      t.score !== n.score
        ? n.score - t.score
        : q1(
            t.routesMeta.map((r) => r.childrenIndex),
            n.routesMeta.map((r) => r.childrenIndex),
          ),
    );
  }
  const z1 = /^:[\w-]+$/,
    j1 = 3,
    V1 = 2,
    B1 = 1,
    U1 = 10,
    Q1 = -2,
    bd = (e) => e === "*";
  function $1(e, t) {
    let n = e.split("/"),
      r = n.length;
    return (
      n.some(bd) && (r += Q1),
      t && (r += V1),
      n
        .filter((i) => !bd(i))
        .reduce((i, a) => i + (z1.test(a) ? j1 : a === "" ? B1 : U1), r)
    );
  }
  function q1(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
      ? e[e.length - 1] - t[t.length - 1]
      : 0;
  }
  function W1(e, t, n) {
    n === void 0 && (n = !1);
    let { routesMeta: r } = e,
      i = {},
      a = "/",
      o = [];
    for (let s = 0; s < r.length; ++s) {
      let l = r[s],
        u = s === r.length - 1,
        c = a === "/" ? t : t.slice(a.length) || "/",
        f = _d(
          { path: l.relativePath, caseSensitive: l.caseSensitive, end: u },
          c,
        ),
        d = l.route;
      if (
        (!f &&
          u &&
          n &&
          !r[r.length - 1].route.index &&
          (f = _d(
            { path: l.relativePath, caseSensitive: l.caseSensitive, end: !1 },
            c,
          )),
        !f)
      )
        return null;
      (Object.assign(i, f.params),
        o.push({
          params: i,
          pathname: yn([a, f.pathname]),
          pathnameBase: J1(yn([a, f.pathnameBase])),
          route: d,
        }),
        f.pathnameBase !== "/" && (a = yn([a, f.pathnameBase])));
    }
    return o;
  }
  function _d(e, t) {
    typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = H1(e.path, e.caseSensitive, e.end),
      i = t.match(n);
    if (!i) return null;
    let a = i[0],
      o = a.replace(/(.)\/+$/, "$1"),
      s = i.slice(1);
    return {
      params: r.reduce((u, c, f) => {
        let { paramName: d, isOptional: h } = c;
        if (d === "*") {
          let y = s[f] || "";
          o = a.slice(0, a.length - y.length).replace(/(.)\/+$/, "$1");
        }
        const v = s[f];
        return (
          h && !v ? (u[d] = void 0) : (u[d] = (v || "").replace(/%2F/g, "/")),
          u
        );
      }, {}),
      pathname: a,
      pathnameBase: o,
      pattern: e,
    };
  }
  function H1(e, t, n) {
    (t === void 0 && (t = !1),
      n === void 0 && (n = !0),
      rv(
        e === "*" || !e.endsWith("*") || e.endsWith("/*"),
        'Route path "' +
          e +
          '" will be treated as if it were ' +
          ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
          "always follow a `/` in the pattern. To get rid of this warning, " +
          ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
      ));
    let r = [],
      i =
        "^" +
        e
          .replace(/\/*\*?$/, "")
          .replace(/^\/*/, "/")
          .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
          .replace(
            /\/:([\w-]+)(\?)?/g,
            (o, s, l) => (
              r.push({ paramName: s, isOptional: l != null }),
              l ? "/?([^\\/]+)?" : "/([^\\/]+)"
            ),
          );
    return (
      e.endsWith("*")
        ? (r.push({ paramName: "*" }),
          (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
        : n
          ? (i += "\\/*$")
          : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
      [new RegExp(i, t ? void 0 : "i"), r]
    );
  }
  function G1(e) {
    try {
      return e
        .split("/")
        .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
        .join("/");
    } catch (t) {
      return (
        rv(
          !1,
          'The URL path "' +
            e +
            '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
            ("encoding (" + t + ")."),
        ),
        e
      );
    }
  }
  function Fc(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
      r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/";
  }
  function Y1(e, t) {
    t === void 0 && (t = "/");
    let {
      pathname: n,
      search: r = "",
      hash: i = "",
    } = typeof e == "string" ? Hr(e) : e;
    return {
      pathname: n ? (n.startsWith("/") ? n : X1(n, t)) : t,
      search: Z1(r),
      hash: ew(i),
    };
  }
  function X1(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return (
      e.split("/").forEach((i) => {
        i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
      }),
      n.length > 1 ? n.join("/") : "/"
    );
  }
  function Hs(e, t, n, r) {
    return (
      "Cannot include a '" +
      e +
      "' character in a manually specified " +
      ("`to." +
        t +
        "` field [" +
        JSON.stringify(r) +
        "].  Please separate it out to the ") +
      ("`to." +
        n +
        "` field. Alternatively you may provide the full path as ") +
      'a string in <Link to="..."> and the router will parse it for you.'
    );
  }
  function K1(e) {
    return e.filter(
      (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
    );
  }
  function ov(e, t) {
    let n = K1(e);
    return t
      ? n.map((r, i) => (i === n.length - 1 ? r.pathname : r.pathnameBase))
      : n.map((r) => r.pathnameBase);
  }
  function sv(e, t, n, r) {
    r === void 0 && (r = !1);
    let i;
    typeof e == "string"
      ? (i = Hr(e))
      : ((i = Ki({}, e)),
        ge(
          !i.pathname || !i.pathname.includes("?"),
          Hs("?", "pathname", "search", i),
        ),
        ge(
          !i.pathname || !i.pathname.includes("#"),
          Hs("#", "pathname", "hash", i),
        ),
        ge(!i.search || !i.search.includes("#"), Hs("#", "search", "hash", i)));
    let a = e === "" || i.pathname === "",
      o = a ? "/" : i.pathname,
      s;
    if (o == null) s = n;
    else {
      let f = t.length - 1;
      if (!r && o.startsWith("..")) {
        let d = o.split("/");
        for (; d[0] === "..";) (d.shift(), (f -= 1));
        i.pathname = d.join("/");
      }
      s = f >= 0 ? t[f] : "/";
    }
    let l = Y1(i, s),
      u = o && o !== "/" && o.endsWith("/"),
      c = (a || o === ".") && n.endsWith("/");
    return (!l.pathname.endsWith("/") && (u || c) && (l.pathname += "/"), l);
  }
  const yn = (e) => e.join("/").replace(/\/\/+/g, "/"),
    J1 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Z1 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
    ew = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
  function tw(e) {
    return (
      e != null &&
      typeof e.status == "number" &&
      typeof e.statusText == "string" &&
      typeof e.internal == "boolean" &&
      "data" in e
    );
  }
  const lv = ["post", "put", "patch", "delete"];
  new Set(lv);
  const nw = ["get", ...lv];
  new Set(nw);
  /**
   * React Router v6.30.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */ function Ji() {
    return (
      (Ji = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      Ji.apply(this, arguments)
    );
  }
  const Ac = N.createContext(null),
    rw = N.createContext(null),
    nr = N.createContext(null),
    os = N.createContext(null),
    Pn = N.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
    uv = N.createContext(null);
  function iw(e, t) {
    let { relative: n } = t === void 0 ? {} : t;
    fa() || ge(!1);
    let { basename: r, navigator: i } = N.useContext(nr),
      { hash: a, pathname: o, search: s } = dv(e, { relative: n }),
      l = o;
    return (
      r !== "/" && (l = o === "/" ? r : yn([r, o])),
      i.createHref({ pathname: l, search: s, hash: a })
    );
  }
  function fa() {
    return N.useContext(os) != null;
  }
  function ss() {
    return (fa() || ge(!1), N.useContext(os).location);
  }
  function cv(e) {
    N.useContext(nr).static || N.useLayoutEffect(e);
  }
  function aw() {
    let { isDataRoute: e } = N.useContext(Pn);
    return e ? yw() : ow();
  }
  function ow() {
    fa() || ge(!1);
    let e = N.useContext(Ac),
      { basename: t, future: n, navigator: r } = N.useContext(nr),
      { matches: i } = N.useContext(Pn),
      { pathname: a } = ss(),
      o = JSON.stringify(ov(i, n.v7_relativeSplatPath)),
      s = N.useRef(!1);
    return (
      cv(() => {
        s.current = !0;
      }),
      N.useCallback(
        function (u, c) {
          if ((c === void 0 && (c = {}), !s.current)) return;
          if (typeof u == "number") {
            r.go(u);
            return;
          }
          let f = sv(u, JSON.parse(o), a, c.relative === "path");
          (e == null &&
            t !== "/" &&
            (f.pathname = f.pathname === "/" ? t : yn([t, f.pathname])),
            (c.replace ? r.replace : r.push)(f, c.state, c));
        },
        [t, r, o, a, e],
      )
    );
  }
  function fv() {
    let { matches: e } = N.useContext(Pn),
      t = e[e.length - 1];
    return t ? t.params : {};
  }
  function dv(e, t) {
    let { relative: n } = t === void 0 ? {} : t,
      { future: r } = N.useContext(nr),
      { matches: i } = N.useContext(Pn),
      { pathname: a } = ss(),
      o = JSON.stringify(ov(i, r.v7_relativeSplatPath));
    return N.useMemo(() => sv(e, JSON.parse(o), a, n === "path"), [e, o, a, n]);
  }
  function sw(e, t) {
    return lw(e, t);
  }
  function lw(e, t, n, r) {
    fa() || ge(!1);
    let { navigator: i } = N.useContext(nr),
      { matches: a } = N.useContext(Pn),
      o = a[a.length - 1],
      s = o ? o.params : {};
    o && o.pathname;
    let l = o ? o.pathnameBase : "/";
    o && o.route;
    let u = ss(),
      c;
    if (t) {
      var f;
      let S = typeof t == "string" ? Hr(t) : t;
      (l === "/" || ((f = S.pathname) != null && f.startsWith(l)) || ge(!1),
        (c = S));
    } else c = u;
    let d = c.pathname || "/",
      h = d;
    if (l !== "/") {
      let S = l.replace(/^\//, "").split("/");
      h = "/" + d.replace(/^\//, "").split("/").slice(S.length).join("/");
    }
    let v = L1(e, { pathname: h }),
      y = pw(
        v &&
          v.map((S) =>
            Object.assign({}, S, {
              params: Object.assign({}, s, S.params),
              pathname: yn([
                l,
                i.encodeLocation
                  ? i.encodeLocation(S.pathname).pathname
                  : S.pathname,
              ]),
              pathnameBase:
                S.pathnameBase === "/"
                  ? l
                  : yn([
                      l,
                      i.encodeLocation
                        ? i.encodeLocation(S.pathnameBase).pathname
                        : S.pathnameBase,
                    ]),
            }),
          ),
        a,
        n,
        r,
      );
    return t && y
      ? N.createElement(
          os.Provider,
          {
            value: {
              location: Ji(
                {
                  pathname: "/",
                  search: "",
                  hash: "",
                  state: null,
                  key: "default",
                },
                c,
              ),
              navigationType: sn.Pop,
            },
          },
          y,
        )
      : y;
  }
  function uw() {
    let e = gw(),
      t = tw(e)
        ? e.status + " " + e.statusText
        : e instanceof Error
          ? e.message
          : JSON.stringify(e),
      n = e instanceof Error ? e.stack : null,
      i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
      a = null;
    return N.createElement(
      N.Fragment,
      null,
      N.createElement("h2", null, "Unexpected Application Error!"),
      N.createElement("h3", { style: { fontStyle: "italic" } }, t),
      n ? N.createElement("pre", { style: i }, n) : null,
      a,
    );
  }
  const cw = N.createElement(uw, null);
  class fw extends N.Component {
    constructor(t) {
      (super(t),
        (this.state = {
          location: t.location,
          revalidation: t.revalidation,
          error: t.error,
        }));
    }
    static getDerivedStateFromError(t) {
      return { error: t };
    }
    static getDerivedStateFromProps(t, n) {
      return n.location !== t.location ||
        (n.revalidation !== "idle" && t.revalidation === "idle")
        ? { error: t.error, location: t.location, revalidation: t.revalidation }
        : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation,
          };
    }
    componentDidCatch(t, n) {
      console.error(
        "React Router caught the following error during render",
        t,
        n,
      );
    }
    render() {
      return this.state.error !== void 0
        ? N.createElement(
            Pn.Provider,
            { value: this.props.routeContext },
            N.createElement(uv.Provider, {
              value: this.state.error,
              children: this.props.component,
            }),
          )
        : this.props.children;
    }
  }
  function dw(e) {
    let { routeContext: t, match: n, children: r } = e,
      i = N.useContext(Ac);
    return (
      i &&
        i.static &&
        i.staticContext &&
        (n.route.errorElement || n.route.ErrorBoundary) &&
        (i.staticContext._deepestRenderedBoundaryId = n.route.id),
      N.createElement(Pn.Provider, { value: t }, r)
    );
  }
  function pw(e, t, n, r) {
    var i;
    if (
      (t === void 0 && (t = []),
      n === void 0 && (n = null),
      r === void 0 && (r = null),
      e == null)
    ) {
      var a;
      if (!n) return null;
      if (n.errors) e = n.matches;
      else if (
        (a = r) != null &&
        a.v7_partialHydration &&
        t.length === 0 &&
        !n.initialized &&
        n.matches.length > 0
      )
        e = n.matches;
      else return null;
    }
    let o = e,
      s = (i = n) == null ? void 0 : i.errors;
    if (s != null) {
      let c = o.findIndex(
        (f) => f.route.id && (s == null ? void 0 : s[f.route.id]) !== void 0,
      );
      (c >= 0 || ge(!1), (o = o.slice(0, Math.min(o.length, c + 1))));
    }
    let l = !1,
      u = -1;
    if (n && r && r.v7_partialHydration)
      for (let c = 0; c < o.length; c++) {
        let f = o[c];
        if (
          ((f.route.HydrateFallback || f.route.hydrateFallbackElement) &&
            (u = c),
          f.route.id)
        ) {
          let { loaderData: d, errors: h } = n,
            v =
              f.route.loader &&
              d[f.route.id] === void 0 &&
              (!h || h[f.route.id] === void 0);
          if (f.route.lazy || v) {
            ((l = !0), u >= 0 ? (o = o.slice(0, u + 1)) : (o = [o[0]]));
            break;
          }
        }
      }
    return o.reduceRight((c, f, d) => {
      let h,
        v = !1,
        y = null,
        S = null;
      n &&
        ((h = s && f.route.id ? s[f.route.id] : void 0),
        (y = f.route.errorElement || cw),
        l &&
          (u < 0 && d === 0
            ? (ww("route-fallback", !1), (v = !0), (S = null))
            : u === d &&
              ((v = !0), (S = f.route.hydrateFallbackElement || null))));
      let p = t.concat(o.slice(0, d + 1)),
        m = () => {
          let g;
          return (
            h
              ? (g = y)
              : v
                ? (g = S)
                : f.route.Component
                  ? (g = N.createElement(f.route.Component, null))
                  : f.route.element
                    ? (g = f.route.element)
                    : (g = c),
            N.createElement(dw, {
              match: f,
              routeContext: { outlet: c, matches: p, isDataRoute: n != null },
              children: g,
            })
          );
        };
      return n && (f.route.ErrorBoundary || f.route.errorElement || d === 0)
        ? N.createElement(fw, {
            location: n.location,
            revalidation: n.revalidation,
            component: y,
            error: h,
            children: m(),
            routeContext: { outlet: null, matches: p, isDataRoute: !0 },
          })
        : m();
    }, null);
  }
  var pv = (function (e) {
      return (
        (e.UseBlocker = "useBlocker"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate"),
        e
      );
    })(pv || {}),
    Ro = (function (e) {
      return (
        (e.UseBlocker = "useBlocker"),
        (e.UseLoaderData = "useLoaderData"),
        (e.UseActionData = "useActionData"),
        (e.UseRouteError = "useRouteError"),
        (e.UseNavigation = "useNavigation"),
        (e.UseRouteLoaderData = "useRouteLoaderData"),
        (e.UseMatches = "useMatches"),
        (e.UseRevalidator = "useRevalidator"),
        (e.UseNavigateStable = "useNavigate"),
        (e.UseRouteId = "useRouteId"),
        e
      );
    })(Ro || {});
  function hw(e) {
    let t = N.useContext(Ac);
    return (t || ge(!1), t);
  }
  function mw(e) {
    let t = N.useContext(rw);
    return (t || ge(!1), t);
  }
  function vw(e) {
    let t = N.useContext(Pn);
    return (t || ge(!1), t);
  }
  function hv(e) {
    let t = vw(),
      n = t.matches[t.matches.length - 1];
    return (n.route.id || ge(!1), n.route.id);
  }
  function gw() {
    var e;
    let t = N.useContext(uv),
      n = mw(Ro.UseRouteError),
      r = hv(Ro.UseRouteError);
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
  }
  function yw() {
    let { router: e } = hw(pv.UseNavigateStable),
      t = hv(Ro.UseNavigateStable),
      n = N.useRef(!1);
    return (
      cv(() => {
        n.current = !0;
      }),
      N.useCallback(
        function (i, a) {
          (a === void 0 && (a = {}),
            n.current &&
              (typeof i == "number"
                ? e.navigate(i)
                : e.navigate(i, Ji({ fromRouteId: t }, a))));
        },
        [e, t],
      )
    );
  }
  const Td = {};
  function ww(e, t, n) {
    !t && !Td[e] && (Td[e] = !0);
  }
  function Sw(e, t) {
    (e == null || e.v7_startTransition,
      (e == null ? void 0 : e.v7_relativeSplatPath) === void 0 &&
        (!t || t.v7_relativeSplatPath),
      t &&
        (t.v7_fetcherPersist,
        t.v7_normalizeFormMethod,
        t.v7_partialHydration,
        t.v7_skipActionErrorRevalidation));
  }
  function dt(e) {
    ge(!1);
  }
  function Ew(e) {
    let {
      basename: t = "/",
      children: n = null,
      location: r,
      navigationType: i = sn.Pop,
      navigator: a,
      static: o = !1,
      future: s,
    } = e;
    fa() && ge(!1);
    let l = t.replace(/^\/*/, "/"),
      u = N.useMemo(
        () => ({
          basename: l,
          navigator: a,
          static: o,
          future: Ji({ v7_relativeSplatPath: !1 }, s),
        }),
        [l, s, a, o],
      );
    typeof r == "string" && (r = Hr(r));
    let {
        pathname: c = "/",
        search: f = "",
        hash: d = "",
        state: h = null,
        key: v = "default",
      } = r,
      y = N.useMemo(() => {
        let S = Fc(c, l);
        return S == null
          ? null
          : {
              location: { pathname: S, search: f, hash: d, state: h, key: v },
              navigationType: i,
            };
      }, [l, c, f, d, h, v, i]);
    return y == null
      ? null
      : N.createElement(
          nr.Provider,
          { value: u },
          N.createElement(os.Provider, { children: n, value: y }),
        );
  }
  function xw(e) {
    let { children: t, location: n } = e;
    return sw(uu(t), n);
  }
  new Promise(() => {});
  function uu(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return (
      N.Children.forEach(e, (r, i) => {
        if (!N.isValidElement(r)) return;
        let a = [...t, i];
        if (r.type === N.Fragment) {
          n.push.apply(n, uu(r.props.children, a));
          return;
        }
        (r.type !== dt && ge(!1),
          !r.props.index || !r.props.children || ge(!1));
        let o = {
          id: r.props.id || a.join("-"),
          caseSensitive: r.props.caseSensitive,
          element: r.props.element,
          Component: r.props.Component,
          index: r.props.index,
          path: r.props.path,
          loader: r.props.loader,
          action: r.props.action,
          errorElement: r.props.errorElement,
          ErrorBoundary: r.props.ErrorBoundary,
          hasErrorBoundary:
            r.props.ErrorBoundary != null || r.props.errorElement != null,
          shouldRevalidate: r.props.shouldRevalidate,
          handle: r.props.handle,
          lazy: r.props.lazy,
        };
        (r.props.children && (o.children = uu(r.props.children, a)), n.push(o));
      }),
      n
    );
  }
  /**
   * React Router DOM v6.30.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */ function cu() {
    return (
      (cu = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      cu.apply(this, arguments)
    );
  }
  function bw(e, t) {
    if (e == null) return {};
    var n = {},
      r = Object.keys(e),
      i,
      a;
    for (a = 0; a < r.length; a++)
      ((i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]));
    return n;
  }
  function _w(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
  }
  function Tw(e, t) {
    return e.button === 0 && (!t || t === "_self") && !_w(e);
  }
  const kw = [
      "onClick",
      "relative",
      "reloadDocument",
      "replace",
      "state",
      "target",
      "to",
      "preventScrollReset",
      "viewTransition",
    ],
    Cw = "6";
  try {
    window.__reactRouterVersion = Cw;
  } catch {}
  const Ow = "startTransition",
    kd = Sy[Ow];
  function Nw(e) {
    let { basename: t, children: n, future: r, window: i } = e,
      a = N.useRef();
    a.current == null && (a.current = D1({ window: i, v5Compat: !0 }));
    let o = a.current,
      [s, l] = N.useState({ action: o.action, location: o.location }),
      { v7_startTransition: u } = r || {},
      c = N.useCallback(
        (f) => {
          u && kd ? kd(() => l(f)) : l(f);
        },
        [l, u],
      );
    return (
      N.useLayoutEffect(() => o.listen(c), [o, c]),
      N.useEffect(() => Sw(r), [r]),
      N.createElement(Ew, {
        basename: t,
        children: n,
        location: s.location,
        navigationType: s.action,
        navigator: o,
        future: r,
      })
    );
  }
  const Pw =
      typeof window < "u" &&
      typeof window.document < "u" &&
      typeof window.document.createElement < "u",
    Iw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    _e = N.forwardRef(function (t, n) {
      let {
          onClick: r,
          relative: i,
          reloadDocument: a,
          replace: o,
          state: s,
          target: l,
          to: u,
          preventScrollReset: c,
          viewTransition: f,
        } = t,
        d = bw(t, kw),
        { basename: h } = N.useContext(nr),
        v,
        y = !1;
      if (typeof u == "string" && Iw.test(u) && ((v = u), Pw))
        try {
          let g = new URL(window.location.href),
            E = u.startsWith("//") ? new URL(g.protocol + u) : new URL(u),
            x = Fc(E.pathname, h);
          E.origin === g.origin && x != null
            ? (u = x + E.search + E.hash)
            : (y = !0);
        } catch {}
      let S = iw(u, { relative: i }),
        p = Dw(u, {
          replace: o,
          state: s,
          target: l,
          preventScrollReset: c,
          relative: i,
          viewTransition: f,
        });
      function m(g) {
        (r && r(g), g.defaultPrevented || p(g));
      }
      return N.createElement(
        "a",
        cu({}, d, { href: v || S, onClick: y || a ? r : m, ref: n, target: l }),
      );
    });
  var Cd;
  (function (e) {
    ((e.UseScrollRestoration = "useScrollRestoration"),
      (e.UseSubmit = "useSubmit"),
      (e.UseSubmitFetcher = "useSubmitFetcher"),
      (e.UseFetcher = "useFetcher"),
      (e.useViewTransitionState = "useViewTransitionState"));
  })(Cd || (Cd = {}));
  var Od;
  (function (e) {
    ((e.UseFetcher = "useFetcher"),
      (e.UseFetchers = "useFetchers"),
      (e.UseScrollRestoration = "useScrollRestoration"));
  })(Od || (Od = {}));
  function Dw(e, t) {
    let {
        target: n,
        replace: r,
        state: i,
        preventScrollReset: a,
        relative: o,
        viewTransition: s,
      } = t === void 0 ? {} : t,
      l = aw(),
      u = ss(),
      c = dv(e, { relative: o });
    return N.useCallback(
      (f) => {
        if (Tw(f, n)) {
          f.preventDefault();
          let d = r !== void 0 ? r : Mo(u) === Mo(c);
          l(e, {
            replace: d,
            state: i,
            preventScrollReset: a,
            relative: o,
            viewTransition: s,
          });
        }
      },
      [u, l, c, r, i, n, e, a, o, s],
    );
  }
  var fu = function (e, t) {
    return (
      (fu =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (n, r) {
            n.__proto__ = r;
          }) ||
        function (n, r) {
          for (var i in r)
            Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
        }),
      fu(e, t)
    );
  };
  function Dt(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null",
      );
    fu(e, t);
    function n() {
      this.constructor = e;
    }
    e.prototype =
      t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
  }
  var _ = function () {
    return (
      (_ =
        Object.assign ||
        function (t) {
          for (var n, r = 1, i = arguments.length; r < i; r++) {
            n = arguments[r];
            for (var a in n)
              Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
          }
          return t;
        }),
      _.apply(this, arguments)
    );
  };
  function wt(e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function")
      for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
        t.indexOf(r[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
          (n[r[i]] = e[r[i]]);
    return n;
  }
  function Jt(e, t, n, r) {
    function i(a) {
      return a instanceof n
        ? a
        : new n(function (o) {
            o(a);
          });
    }
    return new (n || (n = Promise))(function (a, o) {
      function s(c) {
        try {
          u(r.next(c));
        } catch (f) {
          o(f);
        }
      }
      function l(c) {
        try {
          u(r.throw(c));
        } catch (f) {
          o(f);
        }
      }
      function u(c) {
        c.done ? a(c.value) : i(c.value).then(s, l);
      }
      u((r = r.apply(e, t || [])).next());
    });
  }
  function Zt(e, t) {
    var n = {
        label: 0,
        sent: function () {
          if (a[0] & 1) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      },
      r,
      i,
      a,
      o = Object.create(
        (typeof Iterator == "function" ? Iterator : Object).prototype,
      );
    return (
      (o.next = s(0)),
      (o.throw = s(1)),
      (o.return = s(2)),
      typeof Symbol == "function" &&
        (o[Symbol.iterator] = function () {
          return this;
        }),
      o
    );
    function s(u) {
      return function (c) {
        return l([u, c]);
      };
    }
    function l(u) {
      if (r) throw new TypeError("Generator is already executing.");
      for (; o && ((o = 0), u[0] && (n = 0)), n;)
        try {
          if (
            ((r = 1),
            i &&
              (a =
                u[0] & 2
                  ? i.return
                  : u[0]
                    ? i.throw || ((a = i.return) && a.call(i), 0)
                    : i.next) &&
              !(a = a.call(i, u[1])).done)
          )
            return a;
          switch (((i = 0), a && (u = [u[0] & 2, a.value]), u[0])) {
            case 0:
            case 1:
              a = u;
              break;
            case 4:
              return (n.label++, { value: u[1], done: !1 });
            case 5:
              (n.label++, (i = u[1]), (u = [0]));
              continue;
            case 7:
              ((u = n.ops.pop()), n.trys.pop());
              continue;
            default:
              if (
                ((a = n.trys),
                !(a = a.length > 0 && a[a.length - 1]) &&
                  (u[0] === 6 || u[0] === 2))
              ) {
                n = 0;
                continue;
              }
              if (u[0] === 3 && (!a || (u[1] > a[0] && u[1] < a[3]))) {
                n.label = u[1];
                break;
              }
              if (u[0] === 6 && n.label < a[1]) {
                ((n.label = a[1]), (a = u));
                break;
              }
              if (a && n.label < a[2]) {
                ((n.label = a[2]), n.ops.push(u));
                break;
              }
              (a[2] && n.ops.pop(), n.trys.pop());
              continue;
          }
          u = t.call(e, n);
        } catch (c) {
          ((u = [6, c]), (i = 0));
        } finally {
          r = a = 0;
        }
      if (u[0] & 5) throw u[1];
      return { value: u[0] ? u[1] : void 0, done: !0 };
    }
  }
  function Ie(e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, i = t.length, a; r < i; r++)
        (a || !(r in t)) &&
          (a || (a = Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
    return e.concat(a || Array.prototype.slice.call(t));
  }
  var Gs = "Invariant Violation",
    Nd = Object.setPrototypeOf,
    Mw =
      Nd === void 0
        ? function (e, t) {
            return ((e.__proto__ = t), e);
          }
        : Nd,
    mv = (function (e) {
      Dt(t, e);
      function t(n) {
        n === void 0 && (n = Gs);
        var r =
          e.call(
            this,
            typeof n == "number"
              ? Gs +
                  ": " +
                  n +
                  " (see https://github.com/apollographql/invariant-packages)"
              : n,
          ) || this;
        return ((r.framesToPop = 1), (r.name = Gs), Mw(r, t.prototype), r);
      }
      return t;
    })(Error);
  function Ln(e, t) {
    if (!e) throw new mv(t);
  }
  var vv = ["debug", "log", "warn", "error", "silent"],
    Rw = vv.indexOf("log");
  function Ra(e) {
    return function () {
      if (vv.indexOf(e) >= Rw) {
        var t = console[e] || console.log;
        return t.apply(console, arguments);
      }
    };
  }
  (function (e) {
    ((e.debug = Ra("debug")),
      (e.log = Ra("log")),
      (e.warn = Ra("warn")),
      (e.error = Ra("error")));
  })(Ln || (Ln = {}));
  var zc = "3.14.0";
  function vt(e) {
    try {
      return e();
    } catch {}
  }
  const Lo =
    vt(function () {
      return globalThis;
    }) ||
    vt(function () {
      return window;
    }) ||
    vt(function () {
      return self;
    }) ||
    vt(function () {
      return global;
    }) ||
    vt(function () {
      return vt.constructor("return this")();
    });
  var Pd = new Map();
  function du(e) {
    var t = Pd.get(e) || 1;
    return (
      Pd.set(e, t + 1),
      ""
        .concat(e, ":")
        .concat(t, ":")
        .concat(Math.random().toString(36).slice(2))
    );
  }
  function gv(e, t) {
    t === void 0 && (t = 0);
    var n = du("stringifyForDisplay");
    return JSON.stringify(
      e,
      function (r, i) {
        return i === void 0 ? n : i;
      },
      t,
    )
      .split(JSON.stringify(n))
      .join("<undefined>");
  }
  function La(e) {
    return function (t) {
      for (var n = [], r = 1; r < arguments.length; r++)
        n[r - 1] = arguments[r];
      if (typeof t == "number") {
        var i = t;
        ((t = jc(i)), t || ((t = Vc(i, n)), (n = [])));
      }
      e.apply(void 0, [t].concat(n));
    };
  }
  var I = Object.assign(
    function (t, n) {
      for (var r = [], i = 2; i < arguments.length; i++)
        r[i - 2] = arguments[i];
      t || Ln(t, jc(n, r) || Vc(n, r));
    },
    {
      debug: La(Ln.debug),
      log: La(Ln.log),
      warn: La(Ln.warn),
      error: La(Ln.error),
    },
  );
  function je(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return new mv(jc(e, t) || Vc(e, t));
  }
  var Id = Symbol.for("ApolloErrorMessageHandler_" + zc);
  function yv(e) {
    if (typeof e == "string") return e;
    try {
      return gv(e, 2).slice(0, 1e3);
    } catch {
      return "<non-serializable>";
    }
  }
  function jc(e, t) {
    if ((t === void 0 && (t = []), !!e)) return Lo[Id] && Lo[Id](e, t.map(yv));
  }
  function Vc(e, t) {
    if ((t === void 0 && (t = []), !!e))
      return "An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#".concat(
        encodeURIComponent(
          JSON.stringify({ version: zc, message: e, args: t.map(yv) }),
        ),
      );
  }
  function Ja(e, t) {
    if (!!!e) throw new Error(t);
  }
  function Lw(e) {
    return typeof e == "object" && e !== null;
  }
  function Fw(e, t) {
    if (!!!e) throw new Error(t ?? "Unexpected invariant triggered.");
  }
  const Aw = /\r\n|[\n\r]/g;
  function pu(e, t) {
    let n = 0,
      r = 1;
    for (const i of e.body.matchAll(Aw)) {
      if ((typeof i.index == "number" || Fw(!1), i.index >= t)) break;
      ((n = i.index + i[0].length), (r += 1));
    }
    return { line: r, column: t + 1 - n };
  }
  function zw(e) {
    return wv(e.source, pu(e.source, e.start));
  }
  function wv(e, t) {
    const n = e.locationOffset.column - 1,
      r = "".padStart(n) + e.body,
      i = t.line - 1,
      a = e.locationOffset.line - 1,
      o = t.line + a,
      s = t.line === 1 ? n : 0,
      l = t.column + s,
      u = `${e.name}:${o}:${l}
`,
      c = r.split(/\r\n|[\n\r]/g),
      f = c[i];
    if (f.length > 120) {
      const d = Math.floor(l / 80),
        h = l % 80,
        v = [];
      for (let y = 0; y < f.length; y += 80) v.push(f.slice(y, y + 80));
      return (
        u +
        Dd([
          [`${o} |`, v[0]],
          ...v.slice(1, d + 1).map((y) => ["|", y]),
          ["|", "^".padStart(h)],
          ["|", v[d + 1]],
        ])
      );
    }
    return (
      u +
      Dd([
        [`${o - 1} |`, c[i - 1]],
        [`${o} |`, f],
        ["|", "^".padStart(l)],
        [`${o + 1} |`, c[i + 1]],
      ])
    );
  }
  function Dd(e) {
    const t = e.filter(([r, i]) => i !== void 0),
      n = Math.max(...t.map(([r]) => r.length));
    return t.map(([r, i]) => r.padStart(n) + (i ? " " + i : "")).join(`
`);
  }
  function jw(e) {
    const t = e[0];
    return t == null || "kind" in t || "length" in t
      ? {
          nodes: t,
          source: e[1],
          positions: e[2],
          path: e[3],
          originalError: e[4],
          extensions: e[5],
        }
      : t;
  }
  class Bc extends Error {
    constructor(t, ...n) {
      var r, i, a;
      const {
        nodes: o,
        source: s,
        positions: l,
        path: u,
        originalError: c,
        extensions: f,
      } = jw(n);
      (super(t),
        (this.name = "GraphQLError"),
        (this.path = u ?? void 0),
        (this.originalError = c ?? void 0),
        (this.nodes = Md(Array.isArray(o) ? o : o ? [o] : void 0)));
      const d = Md(
        (r = this.nodes) === null || r === void 0
          ? void 0
          : r.map((v) => v.loc).filter((v) => v != null),
      );
      ((this.source =
        s ??
        (d == null || (i = d[0]) === null || i === void 0 ? void 0 : i.source)),
        (this.positions = l ?? (d == null ? void 0 : d.map((v) => v.start))),
        (this.locations =
          l && s
            ? l.map((v) => pu(s, v))
            : d == null
              ? void 0
              : d.map((v) => pu(v.source, v.start))));
      const h = Lw(c == null ? void 0 : c.extensions)
        ? c == null
          ? void 0
          : c.extensions
        : void 0;
      ((this.extensions =
        (a = f ?? h) !== null && a !== void 0 ? a : Object.create(null)),
        Object.defineProperties(this, {
          message: { writable: !0, enumerable: !0 },
          name: { enumerable: !1 },
          nodes: { enumerable: !1 },
          source: { enumerable: !1 },
          positions: { enumerable: !1 },
          originalError: { enumerable: !1 },
        }),
        c != null && c.stack
          ? Object.defineProperty(this, "stack", {
              value: c.stack,
              writable: !0,
              configurable: !0,
            })
          : Error.captureStackTrace
            ? Error.captureStackTrace(this, Bc)
            : Object.defineProperty(this, "stack", {
                value: Error().stack,
                writable: !0,
                configurable: !0,
              }));
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
    toString() {
      let t = this.message;
      if (this.nodes)
        for (const n of this.nodes)
          n.loc &&
            (t +=
              `

` + zw(n.loc));
      else if (this.source && this.locations)
        for (const n of this.locations)
          t +=
            `

` + wv(this.source, n);
      return t;
    }
    toJSON() {
      const t = { message: this.message };
      return (
        this.locations != null && (t.locations = this.locations),
        this.path != null && (t.path = this.path),
        this.extensions != null &&
          Object.keys(this.extensions).length > 0 &&
          (t.extensions = this.extensions),
        t
      );
    }
  }
  function Md(e) {
    return e === void 0 || e.length === 0 ? void 0 : e;
  }
  function Te(e, t, n) {
    return new Bc(`Syntax Error: ${n}`, { source: e, positions: [t] });
  }
  class Vw {
    constructor(t, n, r) {
      ((this.start = t.start),
        (this.end = n.end),
        (this.startToken = t),
        (this.endToken = n),
        (this.source = r));
    }
    get [Symbol.toStringTag]() {
      return "Location";
    }
    toJSON() {
      return { start: this.start, end: this.end };
    }
  }
  class Sv {
    constructor(t, n, r, i, a, o) {
      ((this.kind = t),
        (this.start = n),
        (this.end = r),
        (this.line = i),
        (this.column = a),
        (this.value = o),
        (this.prev = null),
        (this.next = null));
    }
    get [Symbol.toStringTag]() {
      return "Token";
    }
    toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column,
      };
    }
  }
  const Ev = {
      Name: [],
      Document: ["definitions"],
      OperationDefinition: [
        "name",
        "variableDefinitions",
        "directives",
        "selectionSet",
      ],
      VariableDefinition: ["variable", "type", "defaultValue", "directives"],
      Variable: ["name"],
      SelectionSet: ["selections"],
      Field: ["alias", "name", "arguments", "directives", "selectionSet"],
      Argument: ["name", "value"],
      FragmentSpread: ["name", "directives"],
      InlineFragment: ["typeCondition", "directives", "selectionSet"],
      FragmentDefinition: [
        "name",
        "variableDefinitions",
        "typeCondition",
        "directives",
        "selectionSet",
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ["values"],
      ObjectValue: ["fields"],
      ObjectField: ["name", "value"],
      Directive: ["name", "arguments"],
      NamedType: ["name"],
      ListType: ["type"],
      NonNullType: ["type"],
      SchemaDefinition: ["description", "directives", "operationTypes"],
      OperationTypeDefinition: ["type"],
      ScalarTypeDefinition: ["description", "name", "directives"],
      ObjectTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields",
      ],
      FieldDefinition: [
        "description",
        "name",
        "arguments",
        "type",
        "directives",
      ],
      InputValueDefinition: [
        "description",
        "name",
        "type",
        "defaultValue",
        "directives",
      ],
      InterfaceTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields",
      ],
      UnionTypeDefinition: ["description", "name", "directives", "types"],
      EnumTypeDefinition: ["description", "name", "directives", "values"],
      EnumValueDefinition: ["description", "name", "directives"],
      InputObjectTypeDefinition: [
        "description",
        "name",
        "directives",
        "fields",
      ],
      DirectiveDefinition: ["description", "name", "arguments", "locations"],
      SchemaExtension: ["directives", "operationTypes"],
      ScalarTypeExtension: ["name", "directives"],
      ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
      InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
      UnionTypeExtension: ["name", "directives", "types"],
      EnumTypeExtension: ["name", "directives", "values"],
      InputObjectTypeExtension: ["name", "directives", "fields"],
    },
    Bw = new Set(Object.keys(Ev));
  function Rd(e) {
    const t = e == null ? void 0 : e.kind;
    return typeof t == "string" && Bw.has(t);
  }
  var wr;
  (function (e) {
    ((e.QUERY = "query"),
      (e.MUTATION = "mutation"),
      (e.SUBSCRIPTION = "subscription"));
  })(wr || (wr = {}));
  var hu;
  (function (e) {
    ((e.QUERY = "QUERY"),
      (e.MUTATION = "MUTATION"),
      (e.SUBSCRIPTION = "SUBSCRIPTION"),
      (e.FIELD = "FIELD"),
      (e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION"),
      (e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD"),
      (e.INLINE_FRAGMENT = "INLINE_FRAGMENT"),
      (e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION"),
      (e.SCHEMA = "SCHEMA"),
      (e.SCALAR = "SCALAR"),
      (e.OBJECT = "OBJECT"),
      (e.FIELD_DEFINITION = "FIELD_DEFINITION"),
      (e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION"),
      (e.INTERFACE = "INTERFACE"),
      (e.UNION = "UNION"),
      (e.ENUM = "ENUM"),
      (e.ENUM_VALUE = "ENUM_VALUE"),
      (e.INPUT_OBJECT = "INPUT_OBJECT"),
      (e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION"));
  })(hu || (hu = {}));
  var F;
  (function (e) {
    ((e.NAME = "Name"),
      (e.DOCUMENT = "Document"),
      (e.OPERATION_DEFINITION = "OperationDefinition"),
      (e.VARIABLE_DEFINITION = "VariableDefinition"),
      (e.SELECTION_SET = "SelectionSet"),
      (e.FIELD = "Field"),
      (e.ARGUMENT = "Argument"),
      (e.FRAGMENT_SPREAD = "FragmentSpread"),
      (e.INLINE_FRAGMENT = "InlineFragment"),
      (e.FRAGMENT_DEFINITION = "FragmentDefinition"),
      (e.VARIABLE = "Variable"),
      (e.INT = "IntValue"),
      (e.FLOAT = "FloatValue"),
      (e.STRING = "StringValue"),
      (e.BOOLEAN = "BooleanValue"),
      (e.NULL = "NullValue"),
      (e.ENUM = "EnumValue"),
      (e.LIST = "ListValue"),
      (e.OBJECT = "ObjectValue"),
      (e.OBJECT_FIELD = "ObjectField"),
      (e.DIRECTIVE = "Directive"),
      (e.NAMED_TYPE = "NamedType"),
      (e.LIST_TYPE = "ListType"),
      (e.NON_NULL_TYPE = "NonNullType"),
      (e.SCHEMA_DEFINITION = "SchemaDefinition"),
      (e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition"),
      (e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition"),
      (e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition"),
      (e.FIELD_DEFINITION = "FieldDefinition"),
      (e.INPUT_VALUE_DEFINITION = "InputValueDefinition"),
      (e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition"),
      (e.UNION_TYPE_DEFINITION = "UnionTypeDefinition"),
      (e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition"),
      (e.ENUM_VALUE_DEFINITION = "EnumValueDefinition"),
      (e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition"),
      (e.DIRECTIVE_DEFINITION = "DirectiveDefinition"),
      (e.SCHEMA_EXTENSION = "SchemaExtension"),
      (e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension"),
      (e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension"),
      (e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension"),
      (e.UNION_TYPE_EXTENSION = "UnionTypeExtension"),
      (e.ENUM_TYPE_EXTENSION = "EnumTypeExtension"),
      (e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension"));
  })(F || (F = {}));
  function mu(e) {
    return e === 9 || e === 32;
  }
  function Zi(e) {
    return e >= 48 && e <= 57;
  }
  function xv(e) {
    return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
  }
  function bv(e) {
    return xv(e) || e === 95;
  }
  function Uw(e) {
    return xv(e) || Zi(e) || e === 95;
  }
  function Qw(e) {
    var t;
    let n = Number.MAX_SAFE_INTEGER,
      r = null,
      i = -1;
    for (let o = 0; o < e.length; ++o) {
      var a;
      const s = e[o],
        l = $w(s);
      l !== s.length &&
        ((r = (a = r) !== null && a !== void 0 ? a : o),
        (i = o),
        o !== 0 && l < n && (n = l));
    }
    return e
      .map((o, s) => (s === 0 ? o : o.slice(n)))
      .slice((t = r) !== null && t !== void 0 ? t : 0, i + 1);
  }
  function $w(e) {
    let t = 0;
    for (; t < e.length && mu(e.charCodeAt(t));) ++t;
    return t;
  }
  function qw(e, t) {
    const n = e.replace(/"""/g, '\\"""'),
      r = n.split(/\r\n|[\n\r]/g),
      i = r.length === 1,
      a =
        r.length > 1 &&
        r.slice(1).every((h) => h.length === 0 || mu(h.charCodeAt(0))),
      o = n.endsWith('\\"""'),
      s = e.endsWith('"') && !o,
      l = e.endsWith("\\"),
      u = s || l,
      c = !(t != null && t.minimize) && (!i || e.length > 70 || u || a || o);
    let f = "";
    const d = i && mu(e.charCodeAt(0));
    return (
      ((c && !d) || a) &&
        (f += `
`),
      (f += n),
      (c || u) &&
        (f += `
`),
      '"""' + f + '"""'
    );
  }
  var O;
  (function (e) {
    ((e.SOF = "<SOF>"),
      (e.EOF = "<EOF>"),
      (e.BANG = "!"),
      (e.DOLLAR = "$"),
      (e.AMP = "&"),
      (e.PAREN_L = "("),
      (e.PAREN_R = ")"),
      (e.SPREAD = "..."),
      (e.COLON = ":"),
      (e.EQUALS = "="),
      (e.AT = "@"),
      (e.BRACKET_L = "["),
      (e.BRACKET_R = "]"),
      (e.BRACE_L = "{"),
      (e.PIPE = "|"),
      (e.BRACE_R = "}"),
      (e.NAME = "Name"),
      (e.INT = "Int"),
      (e.FLOAT = "Float"),
      (e.STRING = "String"),
      (e.BLOCK_STRING = "BlockString"),
      (e.COMMENT = "Comment"));
  })(O || (O = {}));
  class Ww {
    constructor(t) {
      const n = new Sv(O.SOF, 0, 0, 0, 0);
      ((this.source = t),
        (this.lastToken = n),
        (this.token = n),
        (this.line = 1),
        (this.lineStart = 0));
    }
    get [Symbol.toStringTag]() {
      return "Lexer";
    }
    advance() {
      return ((this.lastToken = this.token), (this.token = this.lookahead()));
    }
    lookahead() {
      let t = this.token;
      if (t.kind !== O.EOF)
        do
          if (t.next) t = t.next;
          else {
            const n = Gw(this, t.end);
            ((t.next = n), (n.prev = t), (t = n));
          }
        while (t.kind === O.COMMENT);
      return t;
    }
  }
  function Hw(e) {
    return (
      e === O.BANG ||
      e === O.DOLLAR ||
      e === O.AMP ||
      e === O.PAREN_L ||
      e === O.PAREN_R ||
      e === O.SPREAD ||
      e === O.COLON ||
      e === O.EQUALS ||
      e === O.AT ||
      e === O.BRACKET_L ||
      e === O.BRACKET_R ||
      e === O.BRACE_L ||
      e === O.PIPE ||
      e === O.BRACE_R
    );
  }
  function Gr(e) {
    return (e >= 0 && e <= 55295) || (e >= 57344 && e <= 1114111);
  }
  function ls(e, t) {
    return _v(e.charCodeAt(t)) && Tv(e.charCodeAt(t + 1));
  }
  function _v(e) {
    return e >= 55296 && e <= 56319;
  }
  function Tv(e) {
    return e >= 56320 && e <= 57343;
  }
  function Gn(e, t) {
    const n = e.source.body.codePointAt(t);
    if (n === void 0) return O.EOF;
    if (n >= 32 && n <= 126) {
      const r = String.fromCodePoint(n);
      return r === '"' ? `'"'` : `"${r}"`;
    }
    return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
  }
  function me(e, t, n, r, i) {
    const a = e.line,
      o = 1 + n - e.lineStart;
    return new Sv(t, n, r, a, o, i);
  }
  function Gw(e, t) {
    const n = e.source.body,
      r = n.length;
    let i = t;
    for (; i < r;) {
      const a = n.charCodeAt(i);
      switch (a) {
        case 65279:
        case 9:
        case 32:
        case 44:
          ++i;
          continue;
        case 10:
          (++i, ++e.line, (e.lineStart = i));
          continue;
        case 13:
          (n.charCodeAt(i + 1) === 10 ? (i += 2) : ++i,
            ++e.line,
            (e.lineStart = i));
          continue;
        case 35:
          return Yw(e, i);
        case 33:
          return me(e, O.BANG, i, i + 1);
        case 36:
          return me(e, O.DOLLAR, i, i + 1);
        case 38:
          return me(e, O.AMP, i, i + 1);
        case 40:
          return me(e, O.PAREN_L, i, i + 1);
        case 41:
          return me(e, O.PAREN_R, i, i + 1);
        case 46:
          if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46)
            return me(e, O.SPREAD, i, i + 3);
          break;
        case 58:
          return me(e, O.COLON, i, i + 1);
        case 61:
          return me(e, O.EQUALS, i, i + 1);
        case 64:
          return me(e, O.AT, i, i + 1);
        case 91:
          return me(e, O.BRACKET_L, i, i + 1);
        case 93:
          return me(e, O.BRACKET_R, i, i + 1);
        case 123:
          return me(e, O.BRACE_L, i, i + 1);
        case 124:
          return me(e, O.PIPE, i, i + 1);
        case 125:
          return me(e, O.BRACE_R, i, i + 1);
        case 34:
          return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34
            ? tS(e, i)
            : Kw(e, i);
      }
      if (Zi(a) || a === 45) return Xw(e, i, a);
      if (bv(a)) return nS(e, i);
      throw Te(
        e.source,
        i,
        a === 39
          ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
          : Gr(a) || ls(n, i)
            ? `Unexpected character: ${Gn(e, i)}.`
            : `Invalid character: ${Gn(e, i)}.`,
      );
    }
    return me(e, O.EOF, r, r);
  }
  function Yw(e, t) {
    const n = e.source.body,
      r = n.length;
    let i = t + 1;
    for (; i < r;) {
      const a = n.charCodeAt(i);
      if (a === 10 || a === 13) break;
      if (Gr(a)) ++i;
      else if (ls(n, i)) i += 2;
      else break;
    }
    return me(e, O.COMMENT, t, i, n.slice(t + 1, i));
  }
  function Xw(e, t, n) {
    const r = e.source.body;
    let i = t,
      a = n,
      o = !1;
    if ((a === 45 && (a = r.charCodeAt(++i)), a === 48)) {
      if (((a = r.charCodeAt(++i)), Zi(a)))
        throw Te(
          e.source,
          i,
          `Invalid number, unexpected digit after 0: ${Gn(e, i)}.`,
        );
    } else ((i = Ys(e, i, a)), (a = r.charCodeAt(i)));
    if (
      (a === 46 &&
        ((o = !0),
        (a = r.charCodeAt(++i)),
        (i = Ys(e, i, a)),
        (a = r.charCodeAt(i))),
      (a === 69 || a === 101) &&
        ((o = !0),
        (a = r.charCodeAt(++i)),
        (a === 43 || a === 45) && (a = r.charCodeAt(++i)),
        (i = Ys(e, i, a)),
        (a = r.charCodeAt(i))),
      a === 46 || bv(a))
    )
      throw Te(
        e.source,
        i,
        `Invalid number, expected digit but got: ${Gn(e, i)}.`,
      );
    return me(e, o ? O.FLOAT : O.INT, t, i, r.slice(t, i));
  }
  function Ys(e, t, n) {
    if (!Zi(n))
      throw Te(
        e.source,
        t,
        `Invalid number, expected digit but got: ${Gn(e, t)}.`,
      );
    const r = e.source.body;
    let i = t + 1;
    for (; Zi(r.charCodeAt(i));) ++i;
    return i;
  }
  function Kw(e, t) {
    const n = e.source.body,
      r = n.length;
    let i = t + 1,
      a = i,
      o = "";
    for (; i < r;) {
      const s = n.charCodeAt(i);
      if (s === 34) return ((o += n.slice(a, i)), me(e, O.STRING, t, i + 1, o));
      if (s === 92) {
        o += n.slice(a, i);
        const l =
          n.charCodeAt(i + 1) === 117
            ? n.charCodeAt(i + 2) === 123
              ? Jw(e, i)
              : Zw(e, i)
            : eS(e, i);
        ((o += l.value), (i += l.size), (a = i));
        continue;
      }
      if (s === 10 || s === 13) break;
      if (Gr(s)) ++i;
      else if (ls(n, i)) i += 2;
      else
        throw Te(e.source, i, `Invalid character within String: ${Gn(e, i)}.`);
    }
    throw Te(e.source, i, "Unterminated string.");
  }
  function Jw(e, t) {
    const n = e.source.body;
    let r = 0,
      i = 3;
    for (; i < 12;) {
      const a = n.charCodeAt(t + i++);
      if (a === 125) {
        if (i < 5 || !Gr(r)) break;
        return { value: String.fromCodePoint(r), size: i };
      }
      if (((r = (r << 4) | vi(a)), r < 0)) break;
    }
    throw Te(
      e.source,
      t,
      `Invalid Unicode escape sequence: "${n.slice(t, t + i)}".`,
    );
  }
  function Zw(e, t) {
    const n = e.source.body,
      r = Ld(n, t + 2);
    if (Gr(r)) return { value: String.fromCodePoint(r), size: 6 };
    if (_v(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
      const i = Ld(n, t + 8);
      if (Tv(i)) return { value: String.fromCodePoint(r, i), size: 12 };
    }
    throw Te(
      e.source,
      t,
      `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`,
    );
  }
  function Ld(e, t) {
    return (
      (vi(e.charCodeAt(t)) << 12) |
      (vi(e.charCodeAt(t + 1)) << 8) |
      (vi(e.charCodeAt(t + 2)) << 4) |
      vi(e.charCodeAt(t + 3))
    );
  }
  function vi(e) {
    return e >= 48 && e <= 57
      ? e - 48
      : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
          ? e - 87
          : -1;
  }
  function eS(e, t) {
    const n = e.source.body;
    switch (n.charCodeAt(t + 1)) {
      case 34:
        return { value: '"', size: 2 };
      case 92:
        return { value: "\\", size: 2 };
      case 47:
        return { value: "/", size: 2 };
      case 98:
        return { value: "\b", size: 2 };
      case 102:
        return { value: "\f", size: 2 };
      case 110:
        return {
          value: `
`,
          size: 2,
        };
      case 114:
        return { value: "\r", size: 2 };
      case 116:
        return { value: "	", size: 2 };
    }
    throw Te(
      e.source,
      t,
      `Invalid character escape sequence: "${n.slice(t, t + 2)}".`,
    );
  }
  function tS(e, t) {
    const n = e.source.body,
      r = n.length;
    let i = e.lineStart,
      a = t + 3,
      o = a,
      s = "";
    const l = [];
    for (; a < r;) {
      const u = n.charCodeAt(a);
      if (
        u === 34 &&
        n.charCodeAt(a + 1) === 34 &&
        n.charCodeAt(a + 2) === 34
      ) {
        ((s += n.slice(o, a)), l.push(s));
        const c = me(
          e,
          O.BLOCK_STRING,
          t,
          a + 3,
          Qw(l).join(`
`),
        );
        return ((e.line += l.length - 1), (e.lineStart = i), c);
      }
      if (
        u === 92 &&
        n.charCodeAt(a + 1) === 34 &&
        n.charCodeAt(a + 2) === 34 &&
        n.charCodeAt(a + 3) === 34
      ) {
        ((s += n.slice(o, a)), (o = a + 1), (a += 4));
        continue;
      }
      if (u === 10 || u === 13) {
        ((s += n.slice(o, a)),
          l.push(s),
          u === 13 && n.charCodeAt(a + 1) === 10 ? (a += 2) : ++a,
          (s = ""),
          (o = a),
          (i = a));
        continue;
      }
      if (Gr(u)) ++a;
      else if (ls(n, a)) a += 2;
      else
        throw Te(e.source, a, `Invalid character within String: ${Gn(e, a)}.`);
    }
    throw Te(e.source, a, "Unterminated string.");
  }
  function nS(e, t) {
    const n = e.source.body,
      r = n.length;
    let i = t + 1;
    for (; i < r;) {
      const a = n.charCodeAt(i);
      if (Uw(a)) ++i;
      else break;
    }
    return me(e, O.NAME, t, i, n.slice(t, i));
  }
  const rS = 10,
    kv = 2;
  function Uc(e) {
    return us(e, []);
  }
  function us(e, t) {
    switch (typeof e) {
      case "string":
        return JSON.stringify(e);
      case "function":
        return e.name ? `[function ${e.name}]` : "[function]";
      case "object":
        return iS(e, t);
      default:
        return String(e);
    }
  }
  function iS(e, t) {
    if (e === null) return "null";
    if (t.includes(e)) return "[Circular]";
    const n = [...t, e];
    if (aS(e)) {
      const r = e.toJSON();
      if (r !== e) return typeof r == "string" ? r : us(r, n);
    } else if (Array.isArray(e)) return sS(e, n);
    return oS(e, n);
  }
  function aS(e) {
    return typeof e.toJSON == "function";
  }
  function oS(e, t) {
    const n = Object.entries(e);
    return n.length === 0
      ? "{}"
      : t.length > kv
        ? "[" + lS(e) + "]"
        : "{ " + n.map(([i, a]) => i + ": " + us(a, t)).join(", ") + " }";
  }
  function sS(e, t) {
    if (e.length === 0) return "[]";
    if (t.length > kv) return "[Array]";
    const n = Math.min(rS, e.length),
      r = e.length - n,
      i = [];
    for (let a = 0; a < n; ++a) i.push(us(e[a], t));
    return (
      r === 1
        ? i.push("... 1 more item")
        : r > 1 && i.push(`... ${r} more items`),
      "[" + i.join(", ") + "]"
    );
  }
  function lS(e) {
    const t = Object.prototype.toString
      .call(e)
      .replace(/^\[object /, "")
      .replace(/]$/, "");
    if (t === "Object" && typeof e.constructor == "function") {
      const n = e.constructor.name;
      if (typeof n == "string" && n !== "") return n;
    }
    return t;
  }
  const uS = globalThis.process && !0,
    cS = uS
      ? function (t, n) {
          return t instanceof n;
        }
      : function (t, n) {
          if (t instanceof n) return !0;
          if (typeof t == "object" && t !== null) {
            var r;
            const i = n.prototype[Symbol.toStringTag],
              a =
                Symbol.toStringTag in t
                  ? t[Symbol.toStringTag]
                  : (r = t.constructor) === null || r === void 0
                    ? void 0
                    : r.name;
            if (i === a) {
              const o = Uc(t);
              throw new Error(`Cannot use ${i} "${o}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
            }
          }
          return !1;
        };
  class Cv {
    constructor(t, n = "GraphQL request", r = { line: 1, column: 1 }) {
      (typeof t == "string" ||
        Ja(!1, `Body must be a string. Received: ${Uc(t)}.`),
        (this.body = t),
        (this.name = n),
        (this.locationOffset = r),
        this.locationOffset.line > 0 ||
          Ja(!1, "line in locationOffset is 1-indexed and must be positive."),
        this.locationOffset.column > 0 ||
          Ja(
            !1,
            "column in locationOffset is 1-indexed and must be positive.",
          ));
    }
    get [Symbol.toStringTag]() {
      return "Source";
    }
  }
  function fS(e) {
    return cS(e, Cv);
  }
  function dS(e, t) {
    const n = new pS(e, t),
      r = n.parseDocument();
    return (
      Object.defineProperty(r, "tokenCount", {
        enumerable: !1,
        value: n.tokenCount,
      }),
      r
    );
  }
  class pS {
    constructor(t, n = {}) {
      const r = fS(t) ? t : new Cv(t);
      ((this._lexer = new Ww(r)),
        (this._options = n),
        (this._tokenCounter = 0));
    }
    get tokenCount() {
      return this._tokenCounter;
    }
    parseName() {
      const t = this.expectToken(O.NAME);
      return this.node(t, { kind: F.NAME, value: t.value });
    }
    parseDocument() {
      return this.node(this._lexer.token, {
        kind: F.DOCUMENT,
        definitions: this.many(O.SOF, this.parseDefinition, O.EOF),
      });
    }
    parseDefinition() {
      if (this.peek(O.BRACE_L)) return this.parseOperationDefinition();
      const t = this.peekDescription(),
        n = t ? this._lexer.lookahead() : this._lexer.token;
      if (n.kind === O.NAME) {
        switch (n.value) {
          case "schema":
            return this.parseSchemaDefinition();
          case "scalar":
            return this.parseScalarTypeDefinition();
          case "type":
            return this.parseObjectTypeDefinition();
          case "interface":
            return this.parseInterfaceTypeDefinition();
          case "union":
            return this.parseUnionTypeDefinition();
          case "enum":
            return this.parseEnumTypeDefinition();
          case "input":
            return this.parseInputObjectTypeDefinition();
          case "directive":
            return this.parseDirectiveDefinition();
        }
        if (t)
          throw Te(
            this._lexer.source,
            this._lexer.token.start,
            "Unexpected description, descriptions are supported only on type definitions.",
          );
        switch (n.value) {
          case "query":
          case "mutation":
          case "subscription":
            return this.parseOperationDefinition();
          case "fragment":
            return this.parseFragmentDefinition();
          case "extend":
            return this.parseTypeSystemExtension();
        }
      }
      throw this.unexpected(n);
    }
    parseOperationDefinition() {
      const t = this._lexer.token;
      if (this.peek(O.BRACE_L))
        return this.node(t, {
          kind: F.OPERATION_DEFINITION,
          operation: wr.QUERY,
          name: void 0,
          variableDefinitions: [],
          directives: [],
          selectionSet: this.parseSelectionSet(),
        });
      const n = this.parseOperationType();
      let r;
      return (
        this.peek(O.NAME) && (r = this.parseName()),
        this.node(t, {
          kind: F.OPERATION_DEFINITION,
          operation: n,
          name: r,
          variableDefinitions: this.parseVariableDefinitions(),
          directives: this.parseDirectives(!1),
          selectionSet: this.parseSelectionSet(),
        })
      );
    }
    parseOperationType() {
      const t = this.expectToken(O.NAME);
      switch (t.value) {
        case "query":
          return wr.QUERY;
        case "mutation":
          return wr.MUTATION;
        case "subscription":
          return wr.SUBSCRIPTION;
      }
      throw this.unexpected(t);
    }
    parseVariableDefinitions() {
      return this.optionalMany(
        O.PAREN_L,
        this.parseVariableDefinition,
        O.PAREN_R,
      );
    }
    parseVariableDefinition() {
      return this.node(this._lexer.token, {
        kind: F.VARIABLE_DEFINITION,
        variable: this.parseVariable(),
        type: (this.expectToken(O.COLON), this.parseTypeReference()),
        defaultValue: this.expectOptionalToken(O.EQUALS)
          ? this.parseConstValueLiteral()
          : void 0,
        directives: this.parseConstDirectives(),
      });
    }
    parseVariable() {
      const t = this._lexer.token;
      return (
        this.expectToken(O.DOLLAR),
        this.node(t, { kind: F.VARIABLE, name: this.parseName() })
      );
    }
    parseSelectionSet() {
      return this.node(this._lexer.token, {
        kind: F.SELECTION_SET,
        selections: this.many(O.BRACE_L, this.parseSelection, O.BRACE_R),
      });
    }
    parseSelection() {
      return this.peek(O.SPREAD) ? this.parseFragment() : this.parseField();
    }
    parseField() {
      const t = this._lexer.token,
        n = this.parseName();
      let r, i;
      return (
        this.expectOptionalToken(O.COLON)
          ? ((r = n), (i = this.parseName()))
          : (i = n),
        this.node(t, {
          kind: F.FIELD,
          alias: r,
          name: i,
          arguments: this.parseArguments(!1),
          directives: this.parseDirectives(!1),
          selectionSet: this.peek(O.BRACE_L)
            ? this.parseSelectionSet()
            : void 0,
        })
      );
    }
    parseArguments(t) {
      const n = t ? this.parseConstArgument : this.parseArgument;
      return this.optionalMany(O.PAREN_L, n, O.PAREN_R);
    }
    parseArgument(t = !1) {
      const n = this._lexer.token,
        r = this.parseName();
      return (
        this.expectToken(O.COLON),
        this.node(n, {
          kind: F.ARGUMENT,
          name: r,
          value: this.parseValueLiteral(t),
        })
      );
    }
    parseConstArgument() {
      return this.parseArgument(!0);
    }
    parseFragment() {
      const t = this._lexer.token;
      this.expectToken(O.SPREAD);
      const n = this.expectOptionalKeyword("on");
      return !n && this.peek(O.NAME)
        ? this.node(t, {
            kind: F.FRAGMENT_SPREAD,
            name: this.parseFragmentName(),
            directives: this.parseDirectives(!1),
          })
        : this.node(t, {
            kind: F.INLINE_FRAGMENT,
            typeCondition: n ? this.parseNamedType() : void 0,
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet(),
          });
    }
    parseFragmentDefinition() {
      const t = this._lexer.token;
      return (
        this.expectKeyword("fragment"),
        this._options.allowLegacyFragmentVariables === !0
          ? this.node(t, {
              kind: F.FRAGMENT_DEFINITION,
              name: this.parseFragmentName(),
              variableDefinitions: this.parseVariableDefinitions(),
              typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
              directives: this.parseDirectives(!1),
              selectionSet: this.parseSelectionSet(),
            })
          : this.node(t, {
              kind: F.FRAGMENT_DEFINITION,
              name: this.parseFragmentName(),
              typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
              directives: this.parseDirectives(!1),
              selectionSet: this.parseSelectionSet(),
            })
      );
    }
    parseFragmentName() {
      if (this._lexer.token.value === "on") throw this.unexpected();
      return this.parseName();
    }
    parseValueLiteral(t) {
      const n = this._lexer.token;
      switch (n.kind) {
        case O.BRACKET_L:
          return this.parseList(t);
        case O.BRACE_L:
          return this.parseObject(t);
        case O.INT:
          return (
            this.advanceLexer(),
            this.node(n, { kind: F.INT, value: n.value })
          );
        case O.FLOAT:
          return (
            this.advanceLexer(),
            this.node(n, { kind: F.FLOAT, value: n.value })
          );
        case O.STRING:
        case O.BLOCK_STRING:
          return this.parseStringLiteral();
        case O.NAME:
          switch ((this.advanceLexer(), n.value)) {
            case "true":
              return this.node(n, { kind: F.BOOLEAN, value: !0 });
            case "false":
              return this.node(n, { kind: F.BOOLEAN, value: !1 });
            case "null":
              return this.node(n, { kind: F.NULL });
            default:
              return this.node(n, { kind: F.ENUM, value: n.value });
          }
        case O.DOLLAR:
          if (t)
            if (
              (this.expectToken(O.DOLLAR), this._lexer.token.kind === O.NAME)
            ) {
              const r = this._lexer.token.value;
              throw Te(
                this._lexer.source,
                n.start,
                `Unexpected variable "$${r}" in constant value.`,
              );
            } else throw this.unexpected(n);
          return this.parseVariable();
        default:
          throw this.unexpected();
      }
    }
    parseConstValueLiteral() {
      return this.parseValueLiteral(!0);
    }
    parseStringLiteral() {
      const t = this._lexer.token;
      return (
        this.advanceLexer(),
        this.node(t, {
          kind: F.STRING,
          value: t.value,
          block: t.kind === O.BLOCK_STRING,
        })
      );
    }
    parseList(t) {
      const n = () => this.parseValueLiteral(t);
      return this.node(this._lexer.token, {
        kind: F.LIST,
        values: this.any(O.BRACKET_L, n, O.BRACKET_R),
      });
    }
    parseObject(t) {
      const n = () => this.parseObjectField(t);
      return this.node(this._lexer.token, {
        kind: F.OBJECT,
        fields: this.any(O.BRACE_L, n, O.BRACE_R),
      });
    }
    parseObjectField(t) {
      const n = this._lexer.token,
        r = this.parseName();
      return (
        this.expectToken(O.COLON),
        this.node(n, {
          kind: F.OBJECT_FIELD,
          name: r,
          value: this.parseValueLiteral(t),
        })
      );
    }
    parseDirectives(t) {
      const n = [];
      for (; this.peek(O.AT);) n.push(this.parseDirective(t));
      return n;
    }
    parseConstDirectives() {
      return this.parseDirectives(!0);
    }
    parseDirective(t) {
      const n = this._lexer.token;
      return (
        this.expectToken(O.AT),
        this.node(n, {
          kind: F.DIRECTIVE,
          name: this.parseName(),
          arguments: this.parseArguments(t),
        })
      );
    }
    parseTypeReference() {
      const t = this._lexer.token;
      let n;
      if (this.expectOptionalToken(O.BRACKET_L)) {
        const r = this.parseTypeReference();
        (this.expectToken(O.BRACKET_R),
          (n = this.node(t, { kind: F.LIST_TYPE, type: r })));
      } else n = this.parseNamedType();
      return this.expectOptionalToken(O.BANG)
        ? this.node(t, { kind: F.NON_NULL_TYPE, type: n })
        : n;
    }
    parseNamedType() {
      return this.node(this._lexer.token, {
        kind: F.NAMED_TYPE,
        name: this.parseName(),
      });
    }
    peekDescription() {
      return this.peek(O.STRING) || this.peek(O.BLOCK_STRING);
    }
    parseDescription() {
      if (this.peekDescription()) return this.parseStringLiteral();
    }
    parseSchemaDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("schema");
      const r = this.parseConstDirectives(),
        i = this.many(O.BRACE_L, this.parseOperationTypeDefinition, O.BRACE_R);
      return this.node(t, {
        kind: F.SCHEMA_DEFINITION,
        description: n,
        directives: r,
        operationTypes: i,
      });
    }
    parseOperationTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseOperationType();
      this.expectToken(O.COLON);
      const r = this.parseNamedType();
      return this.node(t, {
        kind: F.OPERATION_TYPE_DEFINITION,
        operation: n,
        type: r,
      });
    }
    parseScalarTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("scalar");
      const r = this.parseName(),
        i = this.parseConstDirectives();
      return this.node(t, {
        kind: F.SCALAR_TYPE_DEFINITION,
        description: n,
        name: r,
        directives: i,
      });
    }
    parseObjectTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("type");
      const r = this.parseName(),
        i = this.parseImplementsInterfaces(),
        a = this.parseConstDirectives(),
        o = this.parseFieldsDefinition();
      return this.node(t, {
        kind: F.OBJECT_TYPE_DEFINITION,
        description: n,
        name: r,
        interfaces: i,
        directives: a,
        fields: o,
      });
    }
    parseImplementsInterfaces() {
      return this.expectOptionalKeyword("implements")
        ? this.delimitedMany(O.AMP, this.parseNamedType)
        : [];
    }
    parseFieldsDefinition() {
      return this.optionalMany(O.BRACE_L, this.parseFieldDefinition, O.BRACE_R);
    }
    parseFieldDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription(),
        r = this.parseName(),
        i = this.parseArgumentDefs();
      this.expectToken(O.COLON);
      const a = this.parseTypeReference(),
        o = this.parseConstDirectives();
      return this.node(t, {
        kind: F.FIELD_DEFINITION,
        description: n,
        name: r,
        arguments: i,
        type: a,
        directives: o,
      });
    }
    parseArgumentDefs() {
      return this.optionalMany(O.PAREN_L, this.parseInputValueDef, O.PAREN_R);
    }
    parseInputValueDef() {
      const t = this._lexer.token,
        n = this.parseDescription(),
        r = this.parseName();
      this.expectToken(O.COLON);
      const i = this.parseTypeReference();
      let a;
      this.expectOptionalToken(O.EQUALS) && (a = this.parseConstValueLiteral());
      const o = this.parseConstDirectives();
      return this.node(t, {
        kind: F.INPUT_VALUE_DEFINITION,
        description: n,
        name: r,
        type: i,
        defaultValue: a,
        directives: o,
      });
    }
    parseInterfaceTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("interface");
      const r = this.parseName(),
        i = this.parseImplementsInterfaces(),
        a = this.parseConstDirectives(),
        o = this.parseFieldsDefinition();
      return this.node(t, {
        kind: F.INTERFACE_TYPE_DEFINITION,
        description: n,
        name: r,
        interfaces: i,
        directives: a,
        fields: o,
      });
    }
    parseUnionTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("union");
      const r = this.parseName(),
        i = this.parseConstDirectives(),
        a = this.parseUnionMemberTypes();
      return this.node(t, {
        kind: F.UNION_TYPE_DEFINITION,
        description: n,
        name: r,
        directives: i,
        types: a,
      });
    }
    parseUnionMemberTypes() {
      return this.expectOptionalToken(O.EQUALS)
        ? this.delimitedMany(O.PIPE, this.parseNamedType)
        : [];
    }
    parseEnumTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("enum");
      const r = this.parseName(),
        i = this.parseConstDirectives(),
        a = this.parseEnumValuesDefinition();
      return this.node(t, {
        kind: F.ENUM_TYPE_DEFINITION,
        description: n,
        name: r,
        directives: i,
        values: a,
      });
    }
    parseEnumValuesDefinition() {
      return this.optionalMany(
        O.BRACE_L,
        this.parseEnumValueDefinition,
        O.BRACE_R,
      );
    }
    parseEnumValueDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription(),
        r = this.parseEnumValueName(),
        i = this.parseConstDirectives();
      return this.node(t, {
        kind: F.ENUM_VALUE_DEFINITION,
        description: n,
        name: r,
        directives: i,
      });
    }
    parseEnumValueName() {
      if (
        this._lexer.token.value === "true" ||
        this._lexer.token.value === "false" ||
        this._lexer.token.value === "null"
      )
        throw Te(
          this._lexer.source,
          this._lexer.token.start,
          `${Fa(this._lexer.token)} is reserved and cannot be used for an enum value.`,
        );
      return this.parseName();
    }
    parseInputObjectTypeDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      this.expectKeyword("input");
      const r = this.parseName(),
        i = this.parseConstDirectives(),
        a = this.parseInputFieldsDefinition();
      return this.node(t, {
        kind: F.INPUT_OBJECT_TYPE_DEFINITION,
        description: n,
        name: r,
        directives: i,
        fields: a,
      });
    }
    parseInputFieldsDefinition() {
      return this.optionalMany(O.BRACE_L, this.parseInputValueDef, O.BRACE_R);
    }
    parseTypeSystemExtension() {
      const t = this._lexer.lookahead();
      if (t.kind === O.NAME)
        switch (t.value) {
          case "schema":
            return this.parseSchemaExtension();
          case "scalar":
            return this.parseScalarTypeExtension();
          case "type":
            return this.parseObjectTypeExtension();
          case "interface":
            return this.parseInterfaceTypeExtension();
          case "union":
            return this.parseUnionTypeExtension();
          case "enum":
            return this.parseEnumTypeExtension();
          case "input":
            return this.parseInputObjectTypeExtension();
        }
      throw this.unexpected(t);
    }
    parseSchemaExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("schema"));
      const n = this.parseConstDirectives(),
        r = this.optionalMany(
          O.BRACE_L,
          this.parseOperationTypeDefinition,
          O.BRACE_R,
        );
      if (n.length === 0 && r.length === 0) throw this.unexpected();
      return this.node(t, {
        kind: F.SCHEMA_EXTENSION,
        directives: n,
        operationTypes: r,
      });
    }
    parseScalarTypeExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("scalar"));
      const n = this.parseName(),
        r = this.parseConstDirectives();
      if (r.length === 0) throw this.unexpected();
      return this.node(t, {
        kind: F.SCALAR_TYPE_EXTENSION,
        name: n,
        directives: r,
      });
    }
    parseObjectTypeExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("type"));
      const n = this.parseName(),
        r = this.parseImplementsInterfaces(),
        i = this.parseConstDirectives(),
        a = this.parseFieldsDefinition();
      if (r.length === 0 && i.length === 0 && a.length === 0)
        throw this.unexpected();
      return this.node(t, {
        kind: F.OBJECT_TYPE_EXTENSION,
        name: n,
        interfaces: r,
        directives: i,
        fields: a,
      });
    }
    parseInterfaceTypeExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("interface"));
      const n = this.parseName(),
        r = this.parseImplementsInterfaces(),
        i = this.parseConstDirectives(),
        a = this.parseFieldsDefinition();
      if (r.length === 0 && i.length === 0 && a.length === 0)
        throw this.unexpected();
      return this.node(t, {
        kind: F.INTERFACE_TYPE_EXTENSION,
        name: n,
        interfaces: r,
        directives: i,
        fields: a,
      });
    }
    parseUnionTypeExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("union"));
      const n = this.parseName(),
        r = this.parseConstDirectives(),
        i = this.parseUnionMemberTypes();
      if (r.length === 0 && i.length === 0) throw this.unexpected();
      return this.node(t, {
        kind: F.UNION_TYPE_EXTENSION,
        name: n,
        directives: r,
        types: i,
      });
    }
    parseEnumTypeExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("enum"));
      const n = this.parseName(),
        r = this.parseConstDirectives(),
        i = this.parseEnumValuesDefinition();
      if (r.length === 0 && i.length === 0) throw this.unexpected();
      return this.node(t, {
        kind: F.ENUM_TYPE_EXTENSION,
        name: n,
        directives: r,
        values: i,
      });
    }
    parseInputObjectTypeExtension() {
      const t = this._lexer.token;
      (this.expectKeyword("extend"), this.expectKeyword("input"));
      const n = this.parseName(),
        r = this.parseConstDirectives(),
        i = this.parseInputFieldsDefinition();
      if (r.length === 0 && i.length === 0) throw this.unexpected();
      return this.node(t, {
        kind: F.INPUT_OBJECT_TYPE_EXTENSION,
        name: n,
        directives: r,
        fields: i,
      });
    }
    parseDirectiveDefinition() {
      const t = this._lexer.token,
        n = this.parseDescription();
      (this.expectKeyword("directive"), this.expectToken(O.AT));
      const r = this.parseName(),
        i = this.parseArgumentDefs(),
        a = this.expectOptionalKeyword("repeatable");
      this.expectKeyword("on");
      const o = this.parseDirectiveLocations();
      return this.node(t, {
        kind: F.DIRECTIVE_DEFINITION,
        description: n,
        name: r,
        arguments: i,
        repeatable: a,
        locations: o,
      });
    }
    parseDirectiveLocations() {
      return this.delimitedMany(O.PIPE, this.parseDirectiveLocation);
    }
    parseDirectiveLocation() {
      const t = this._lexer.token,
        n = this.parseName();
      if (Object.prototype.hasOwnProperty.call(hu, n.value)) return n;
      throw this.unexpected(t);
    }
    node(t, n) {
      return (
        this._options.noLocation !== !0 &&
          (n.loc = new Vw(t, this._lexer.lastToken, this._lexer.source)),
        n
      );
    }
    peek(t) {
      return this._lexer.token.kind === t;
    }
    expectToken(t) {
      const n = this._lexer.token;
      if (n.kind === t) return (this.advanceLexer(), n);
      throw Te(
        this._lexer.source,
        n.start,
        `Expected ${Ov(t)}, found ${Fa(n)}.`,
      );
    }
    expectOptionalToken(t) {
      return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
    }
    expectKeyword(t) {
      const n = this._lexer.token;
      if (n.kind === O.NAME && n.value === t) this.advanceLexer();
      else
        throw Te(
          this._lexer.source,
          n.start,
          `Expected "${t}", found ${Fa(n)}.`,
        );
    }
    expectOptionalKeyword(t) {
      const n = this._lexer.token;
      return n.kind === O.NAME && n.value === t
        ? (this.advanceLexer(), !0)
        : !1;
    }
    unexpected(t) {
      const n = t ?? this._lexer.token;
      return Te(this._lexer.source, n.start, `Unexpected ${Fa(n)}.`);
    }
    any(t, n, r) {
      this.expectToken(t);
      const i = [];
      for (; !this.expectOptionalToken(r);) i.push(n.call(this));
      return i;
    }
    optionalMany(t, n, r) {
      if (this.expectOptionalToken(t)) {
        const i = [];
        do i.push(n.call(this));
        while (!this.expectOptionalToken(r));
        return i;
      }
      return [];
    }
    many(t, n, r) {
      this.expectToken(t);
      const i = [];
      do i.push(n.call(this));
      while (!this.expectOptionalToken(r));
      return i;
    }
    delimitedMany(t, n) {
      this.expectOptionalToken(t);
      const r = [];
      do r.push(n.call(this));
      while (this.expectOptionalToken(t));
      return r;
    }
    advanceLexer() {
      const { maxTokens: t } = this._options,
        n = this._lexer.advance();
      if (
        n.kind !== O.EOF &&
        (++this._tokenCounter, t !== void 0 && this._tokenCounter > t)
      )
        throw Te(
          this._lexer.source,
          n.start,
          `Document contains more that ${t} tokens. Parsing aborted.`,
        );
    }
  }
  function Fa(e) {
    const t = e.value;
    return Ov(e.kind) + (t != null ? ` "${t}"` : "");
  }
  function Ov(e) {
    return Hw(e) ? `"${e}"` : e;
  }
  function hS(e) {
    return `"${e.replace(mS, vS)}"`;
  }
  const mS = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
  function vS(e) {
    return gS[e.charCodeAt(0)];
  }
  const gS = [
      "\\u0000",
      "\\u0001",
      "\\u0002",
      "\\u0003",
      "\\u0004",
      "\\u0005",
      "\\u0006",
      "\\u0007",
      "\\b",
      "\\t",
      "\\n",
      "\\u000B",
      "\\f",
      "\\r",
      "\\u000E",
      "\\u000F",
      "\\u0010",
      "\\u0011",
      "\\u0012",
      "\\u0013",
      "\\u0014",
      "\\u0015",
      "\\u0016",
      "\\u0017",
      "\\u0018",
      "\\u0019",
      "\\u001A",
      "\\u001B",
      "\\u001C",
      "\\u001D",
      "\\u001E",
      "\\u001F",
      "",
      "",
      '\\"',
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\\\",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\u007F",
      "\\u0080",
      "\\u0081",
      "\\u0082",
      "\\u0083",
      "\\u0084",
      "\\u0085",
      "\\u0086",
      "\\u0087",
      "\\u0088",
      "\\u0089",
      "\\u008A",
      "\\u008B",
      "\\u008C",
      "\\u008D",
      "\\u008E",
      "\\u008F",
      "\\u0090",
      "\\u0091",
      "\\u0092",
      "\\u0093",
      "\\u0094",
      "\\u0095",
      "\\u0096",
      "\\u0097",
      "\\u0098",
      "\\u0099",
      "\\u009A",
      "\\u009B",
      "\\u009C",
      "\\u009D",
      "\\u009E",
      "\\u009F",
    ],
    cs = Object.freeze({});
  function Et(e, t, n = Ev) {
    const r = new Map();
    for (const p of Object.values(F)) r.set(p, yS(t, p));
    let i,
      a = Array.isArray(e),
      o = [e],
      s = -1,
      l = [],
      u = e,
      c,
      f;
    const d = [],
      h = [];
    do {
      s++;
      const p = s === o.length,
        m = p && l.length !== 0;
      if (p) {
        if (
          ((c = h.length === 0 ? void 0 : d[d.length - 1]),
          (u = f),
          (f = h.pop()),
          m)
        )
          if (a) {
            u = u.slice();
            let E = 0;
            for (const [x, b] of l) {
              const k = x - E;
              b === null ? (u.splice(k, 1), E++) : (u[k] = b);
            }
          } else {
            u = { ...u };
            for (const [E, x] of l) u[E] = x;
          }
        ((s = i.index),
          (o = i.keys),
          (l = i.edits),
          (a = i.inArray),
          (i = i.prev));
      } else if (f) {
        if (((c = a ? s : o[s]), (u = f[c]), u == null)) continue;
        d.push(c);
      }
      let g;
      if (!Array.isArray(u)) {
        var v, y;
        Rd(u) || Ja(!1, `Invalid AST Node: ${Uc(u)}.`);
        const E = p
          ? (v = r.get(u.kind)) === null || v === void 0
            ? void 0
            : v.leave
          : (y = r.get(u.kind)) === null || y === void 0
            ? void 0
            : y.enter;
        if (((g = E == null ? void 0 : E.call(t, u, c, f, d, h)), g === cs))
          break;
        if (g === !1) {
          if (!p) {
            d.pop();
            continue;
          }
        } else if (g !== void 0 && (l.push([c, g]), !p))
          if (Rd(g)) u = g;
          else {
            d.pop();
            continue;
          }
      }
      if ((g === void 0 && m && l.push([c, u]), p)) d.pop();
      else {
        var S;
        ((i = { inArray: a, index: s, keys: o, edits: l, prev: i }),
          (a = Array.isArray(u)),
          (o = a ? u : (S = n[u.kind]) !== null && S !== void 0 ? S : []),
          (s = -1),
          (l = []),
          f && h.push(f),
          (f = u));
      }
    } while (i !== void 0);
    return l.length !== 0 ? l[l.length - 1][1] : e;
  }
  function yS(e, t) {
    const n = e[t];
    return typeof n == "object"
      ? n
      : typeof n == "function"
        ? { enter: n, leave: void 0 }
        : { enter: e.enter, leave: e.leave };
  }
  function wS(e) {
    return Et(e, ES);
  }
  const SS = 80,
    ES = {
      Name: { leave: (e) => e.value },
      Variable: { leave: (e) => "$" + e.name },
      Document: {
        leave: (e) =>
          V(
            e.definitions,
            `

`,
          ),
      },
      OperationDefinition: {
        leave(e) {
          const t = q("(", V(e.variableDefinitions, ", "), ")"),
            n = V([e.operation, V([e.name, t]), V(e.directives, " ")], " ");
          return (n === "query" ? "" : n + " ") + e.selectionSet;
        },
      },
      VariableDefinition: {
        leave: ({ variable: e, type: t, defaultValue: n, directives: r }) =>
          e + ": " + t + q(" = ", n) + q(" ", V(r, " ")),
      },
      SelectionSet: { leave: ({ selections: e }) => ft(e) },
      Field: {
        leave({
          alias: e,
          name: t,
          arguments: n,
          directives: r,
          selectionSet: i,
        }) {
          const a = q("", e, ": ") + t;
          let o = a + q("(", V(n, ", "), ")");
          return (
            o.length > SS &&
              (o =
                a +
                q(
                  `(
`,
                  Za(
                    V(
                      n,
                      `
`,
                    ),
                  ),
                  `
)`,
                )),
            V([o, V(r, " "), i], " ")
          );
        },
      },
      Argument: { leave: ({ name: e, value: t }) => e + ": " + t },
      FragmentSpread: {
        leave: ({ name: e, directives: t }) => "..." + e + q(" ", V(t, " ")),
      },
      InlineFragment: {
        leave: ({ typeCondition: e, directives: t, selectionSet: n }) =>
          V(["...", q("on ", e), V(t, " "), n], " "),
      },
      FragmentDefinition: {
        leave: ({
          name: e,
          typeCondition: t,
          variableDefinitions: n,
          directives: r,
          selectionSet: i,
        }) =>
          `fragment ${e}${q("(", V(n, ", "), ")")} on ${t} ${q("", V(r, " "), " ")}` +
          i,
      },
      IntValue: { leave: ({ value: e }) => e },
      FloatValue: { leave: ({ value: e }) => e },
      StringValue: { leave: ({ value: e, block: t }) => (t ? qw(e) : hS(e)) },
      BooleanValue: { leave: ({ value: e }) => (e ? "true" : "false") },
      NullValue: { leave: () => "null" },
      EnumValue: { leave: ({ value: e }) => e },
      ListValue: { leave: ({ values: e }) => "[" + V(e, ", ") + "]" },
      ObjectValue: { leave: ({ fields: e }) => "{" + V(e, ", ") + "}" },
      ObjectField: { leave: ({ name: e, value: t }) => e + ": " + t },
      Directive: {
        leave: ({ name: e, arguments: t }) => "@" + e + q("(", V(t, ", "), ")"),
      },
      NamedType: { leave: ({ name: e }) => e },
      ListType: { leave: ({ type: e }) => "[" + e + "]" },
      NonNullType: { leave: ({ type: e }) => e + "!" },
      SchemaDefinition: {
        leave: ({ description: e, directives: t, operationTypes: n }) =>
          q(
            "",
            e,
            `
`,
          ) + V(["schema", V(t, " "), ft(n)], " "),
      },
      OperationTypeDefinition: {
        leave: ({ operation: e, type: t }) => e + ": " + t,
      },
      ScalarTypeDefinition: {
        leave: ({ description: e, name: t, directives: n }) =>
          q(
            "",
            e,
            `
`,
          ) + V(["scalar", t, V(n, " ")], " "),
      },
      ObjectTypeDefinition: {
        leave: ({
          description: e,
          name: t,
          interfaces: n,
          directives: r,
          fields: i,
        }) =>
          q(
            "",
            e,
            `
`,
          ) +
          V(["type", t, q("implements ", V(n, " & ")), V(r, " "), ft(i)], " "),
      },
      FieldDefinition: {
        leave: ({
          description: e,
          name: t,
          arguments: n,
          type: r,
          directives: i,
        }) =>
          q(
            "",
            e,
            `
`,
          ) +
          t +
          (Fd(n)
            ? q(
                `(
`,
                Za(
                  V(
                    n,
                    `
`,
                  ),
                ),
                `
)`,
              )
            : q("(", V(n, ", "), ")")) +
          ": " +
          r +
          q(" ", V(i, " ")),
      },
      InputValueDefinition: {
        leave: ({
          description: e,
          name: t,
          type: n,
          defaultValue: r,
          directives: i,
        }) =>
          q(
            "",
            e,
            `
`,
          ) + V([t + ": " + n, q("= ", r), V(i, " ")], " "),
      },
      InterfaceTypeDefinition: {
        leave: ({
          description: e,
          name: t,
          interfaces: n,
          directives: r,
          fields: i,
        }) =>
          q(
            "",
            e,
            `
`,
          ) +
          V(
            ["interface", t, q("implements ", V(n, " & ")), V(r, " "), ft(i)],
            " ",
          ),
      },
      UnionTypeDefinition: {
        leave: ({ description: e, name: t, directives: n, types: r }) =>
          q(
            "",
            e,
            `
`,
          ) + V(["union", t, V(n, " "), q("= ", V(r, " | "))], " "),
      },
      EnumTypeDefinition: {
        leave: ({ description: e, name: t, directives: n, values: r }) =>
          q(
            "",
            e,
            `
`,
          ) + V(["enum", t, V(n, " "), ft(r)], " "),
      },
      EnumValueDefinition: {
        leave: ({ description: e, name: t, directives: n }) =>
          q(
            "",
            e,
            `
`,
          ) + V([t, V(n, " ")], " "),
      },
      InputObjectTypeDefinition: {
        leave: ({ description: e, name: t, directives: n, fields: r }) =>
          q(
            "",
            e,
            `
`,
          ) + V(["input", t, V(n, " "), ft(r)], " "),
      },
      DirectiveDefinition: {
        leave: ({
          description: e,
          name: t,
          arguments: n,
          repeatable: r,
          locations: i,
        }) =>
          q(
            "",
            e,
            `
`,
          ) +
          "directive @" +
          t +
          (Fd(n)
            ? q(
                `(
`,
                Za(
                  V(
                    n,
                    `
`,
                  ),
                ),
                `
)`,
              )
            : q("(", V(n, ", "), ")")) +
          (r ? " repeatable" : "") +
          " on " +
          V(i, " | "),
      },
      SchemaExtension: {
        leave: ({ directives: e, operationTypes: t }) =>
          V(["extend schema", V(e, " "), ft(t)], " "),
      },
      ScalarTypeExtension: {
        leave: ({ name: e, directives: t }) =>
          V(["extend scalar", e, V(t, " ")], " "),
      },
      ObjectTypeExtension: {
        leave: ({ name: e, interfaces: t, directives: n, fields: r }) =>
          V(
            ["extend type", e, q("implements ", V(t, " & ")), V(n, " "), ft(r)],
            " ",
          ),
      },
      InterfaceTypeExtension: {
        leave: ({ name: e, interfaces: t, directives: n, fields: r }) =>
          V(
            [
              "extend interface",
              e,
              q("implements ", V(t, " & ")),
              V(n, " "),
              ft(r),
            ],
            " ",
          ),
      },
      UnionTypeExtension: {
        leave: ({ name: e, directives: t, types: n }) =>
          V(["extend union", e, V(t, " "), q("= ", V(n, " | "))], " "),
      },
      EnumTypeExtension: {
        leave: ({ name: e, directives: t, values: n }) =>
          V(["extend enum", e, V(t, " "), ft(n)], " "),
      },
      InputObjectTypeExtension: {
        leave: ({ name: e, directives: t, fields: n }) =>
          V(["extend input", e, V(t, " "), ft(n)], " "),
      },
    };
  function V(e, t = "") {
    var n;
    return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null &&
      n !== void 0
      ? n
      : "";
  }
  function ft(e) {
    return q(
      `{
`,
      Za(
        V(
          e,
          `
`,
        ),
      ),
      `
}`,
    );
  }
  function q(e, t, n = "") {
    return t != null && t !== "" ? e + t + n : "";
  }
  function Za(e) {
    return q(
      "  ",
      e.replace(
        /\n/g,
        `
  `,
      ),
    );
  }
  function Fd(e) {
    var t;
    return (t =
      e == null
        ? void 0
        : e.some((n) =>
            n.includes(`
`),
          )) !== null && t !== void 0
      ? t
      : !1;
  }
  function Ad(e) {
    return (
      e.kind === F.FIELD ||
      e.kind === F.FRAGMENT_SPREAD ||
      e.kind === F.INLINE_FRAGMENT
    );
  }
  function da(e, t) {
    var n = e.directives;
    return !n || !n.length
      ? !0
      : _S(n).every(function (r) {
          var i = r.directive,
            a = r.ifArgument,
            o = !1;
          return (
            a.value.kind === "Variable"
              ? ((o = t && t[a.value.name.value]),
                I(o !== void 0, 106, i.name.value))
              : (o = a.value.value),
            i.name.value === "skip" ? !o : o
          );
        });
  }
  function ea(e, t, n) {
    var r = new Set(e),
      i = r.size;
    return (
      Et(t, {
        Directive: function (a) {
          if (r.delete(a.name.value) && (!n || !r.size)) return cs;
        },
      }),
      n ? !r.size : r.size < i
    );
  }
  function xS(e) {
    return e && ea(["client", "export"], e, !0);
  }
  function bS(e) {
    var t = e.name.value;
    return t === "skip" || t === "include";
  }
  function _S(e) {
    var t = [];
    return (
      e &&
        e.length &&
        e.forEach(function (n) {
          if (bS(n)) {
            var r = n.arguments,
              i = n.name.value;
            I(r && r.length === 1, 107, i);
            var a = r[0];
            I(a.name && a.name.value === "if", 108, i);
            var o = a.value;
            (I(
              o && (o.kind === "Variable" || o.kind === "BooleanValue"),
              109,
              i,
            ),
              t.push({ directive: n, ifArgument: a }));
          }
        }),
      t
    );
  }
  function TS(e) {
    var t,
      n,
      r =
        (t = e.directives) === null || t === void 0
          ? void 0
          : t.find(function (a) {
              var o = a.name;
              return o.value === "unmask";
            });
    if (!r) return "mask";
    var i =
      (n = r.arguments) === null || n === void 0
        ? void 0
        : n.find(function (a) {
            var o = a.name;
            return o.value === "mode";
          });
    return (
      globalThis.__DEV__ !== !1 &&
        i &&
        (i.value.kind === F.VARIABLE
          ? globalThis.__DEV__ !== !1 && I.warn(110)
          : i.value.kind !== F.STRING
            ? globalThis.__DEV__ !== !1 && I.warn(111)
            : i.value.value !== "migrate" &&
              globalThis.__DEV__ !== !1 &&
              I.warn(112, i.value.value)),
      i && "value" in i.value && i.value.value === "migrate"
        ? "migrate"
        : "unmask"
    );
  }
  const kS = () => Object.create(null),
    { forEach: CS, slice: zd } = Array.prototype,
    { hasOwnProperty: OS } = Object.prototype;
  class Ht {
    constructor(t = !0, n = kS) {
      ((this.weakness = t), (this.makeData = n));
    }
    lookup() {
      return this.lookupArray(arguments);
    }
    lookupArray(t) {
      let n = this;
      return (
        CS.call(t, (r) => (n = n.getChildTrie(r))),
        OS.call(n, "data") ? n.data : (n.data = this.makeData(zd.call(t)))
      );
    }
    peek() {
      return this.peekArray(arguments);
    }
    peekArray(t) {
      let n = this;
      for (let r = 0, i = t.length; n && r < i; ++r) {
        const a = n.mapFor(t[r], !1);
        n = a && a.get(t[r]);
      }
      return n && n.data;
    }
    remove() {
      return this.removeArray(arguments);
    }
    removeArray(t) {
      let n;
      if (t.length) {
        const r = t[0],
          i = this.mapFor(r, !1),
          a = i && i.get(r);
        a &&
          ((n = a.removeArray(zd.call(t, 1))),
          !a.data && !a.weak && !(a.strong && a.strong.size) && i.delete(r));
      } else ((n = this.data), delete this.data);
      return n;
    }
    getChildTrie(t) {
      const n = this.mapFor(t, !0);
      let r = n.get(t);
      return (r || n.set(t, (r = new Ht(this.weakness, this.makeData))), r);
    }
    mapFor(t, n) {
      return this.weakness && NS(t)
        ? this.weak || (n ? (this.weak = new WeakMap()) : void 0)
        : this.strong || (n ? (this.strong = new Map()) : void 0);
    }
  }
  function NS(e) {
    switch (typeof e) {
      case "object":
        if (e === null) break;
      case "function":
        return !0;
    }
    return !1;
  }
  var Nv =
      vt(function () {
        return navigator.product;
      }) == "ReactNative",
    rr = typeof WeakMap == "function" && !(Nv && !global.HermesInternal),
    Qc = typeof WeakSet == "function",
    $c = typeof Symbol == "function" && typeof Symbol.for == "function",
    fs = $c && Symbol.asyncIterator,
    PS =
      typeof vt(function () {
        return window.document.createElement;
      }) == "function",
    IS =
      vt(function () {
        return navigator.userAgent.indexOf("jsdom") >= 0;
      }) || !1,
    DS = (PS || Nv) && !IS;
  function ce(e) {
    return e !== null && typeof e == "object";
  }
  function MS(e, t) {
    var n = t,
      r = [];
    (e.definitions.forEach(function (a) {
      if (a.kind === "OperationDefinition")
        throw je(
          113,
          a.operation,
          a.name ? " named '".concat(a.name.value, "'") : "",
        );
      a.kind === "FragmentDefinition" && r.push(a);
    }),
      typeof n > "u" &&
        (I(r.length === 1, 114, r.length), (n = r[0].name.value)));
    var i = _(_({}, e), {
      definitions: Ie(
        [
          {
            kind: "OperationDefinition",
            operation: "query",
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: n } },
              ],
            },
          },
        ],
        e.definitions,
        !0,
      ),
    });
    return i;
  }
  function Yr(e) {
    e === void 0 && (e = []);
    var t = {};
    return (
      e.forEach(function (n) {
        t[n.name.value] = n;
      }),
      t
    );
  }
  function ds(e, t) {
    switch (e.kind) {
      case "InlineFragment":
        return e;
      case "FragmentSpread": {
        var n = e.name.value;
        if (typeof t == "function") return t(n);
        var r = t && t[n];
        return (I(r, 115, n), r || null);
      }
      default:
        return null;
    }
  }
  function RS(e) {
    var t = !0;
    return (
      Et(e, {
        FragmentSpread: function (n) {
          if (
            ((t =
              !!n.directives &&
              n.directives.some(function (r) {
                return r.name.value === "unmask";
              })),
            !t)
          )
            return cs;
        },
      }),
      t
    );
  }
  function LS() {}
  class vu {
    constructor(t = 1 / 0, n = LS) {
      ((this.max = t),
        (this.dispose = n),
        (this.map = new Map()),
        (this.newest = null),
        (this.oldest = null));
    }
    has(t) {
      return this.map.has(t);
    }
    get(t) {
      const n = this.getNode(t);
      return n && n.value;
    }
    get size() {
      return this.map.size;
    }
    getNode(t) {
      const n = this.map.get(t);
      if (n && n !== this.newest) {
        const { older: r, newer: i } = n;
        (i && (i.older = r),
          r && (r.newer = i),
          (n.older = this.newest),
          (n.older.newer = n),
          (n.newer = null),
          (this.newest = n),
          n === this.oldest && (this.oldest = i));
      }
      return n;
    }
    set(t, n) {
      let r = this.getNode(t);
      return r
        ? (r.value = n)
        : ((r = { key: t, value: n, newer: null, older: this.newest }),
          this.newest && (this.newest.newer = r),
          (this.newest = r),
          (this.oldest = this.oldest || r),
          this.map.set(t, r),
          r.value);
    }
    clean() {
      for (; this.oldest && this.map.size > this.max;)
        this.delete(this.oldest.key);
    }
    delete(t) {
      const n = this.map.get(t);
      return n
        ? (n === this.newest && (this.newest = n.older),
          n === this.oldest && (this.oldest = n.newer),
          n.newer && (n.newer.older = n.older),
          n.older && (n.older.newer = n.newer),
          this.map.delete(t),
          this.dispose(n.value, t),
          !0)
        : !1;
    }
  }
  function gu() {}
  const FS = gu,
    AS =
      typeof WeakRef < "u"
        ? WeakRef
        : function (e) {
            return { deref: () => e };
          },
    zS = typeof WeakMap < "u" ? WeakMap : Map,
    jS =
      typeof FinalizationRegistry < "u"
        ? FinalizationRegistry
        : function () {
            return { register: gu, unregister: gu };
          },
    VS = 10024;
  class Fo {
    constructor(t = 1 / 0, n = FS) {
      ((this.max = t),
        (this.dispose = n),
        (this.map = new zS()),
        (this.newest = null),
        (this.oldest = null),
        (this.unfinalizedNodes = new Set()),
        (this.finalizationScheduled = !1),
        (this.size = 0),
        (this.finalize = () => {
          const r = this.unfinalizedNodes.values();
          for (let i = 0; i < VS; i++) {
            const a = r.next().value;
            if (!a) break;
            this.unfinalizedNodes.delete(a);
            const o = a.key;
            (delete a.key,
              (a.keyRef = new AS(o)),
              this.registry.register(o, a, a));
          }
          this.unfinalizedNodes.size > 0
            ? queueMicrotask(this.finalize)
            : (this.finalizationScheduled = !1);
        }),
        (this.registry = new jS(this.deleteNode.bind(this))));
    }
    has(t) {
      return this.map.has(t);
    }
    get(t) {
      const n = this.getNode(t);
      return n && n.value;
    }
    getNode(t) {
      const n = this.map.get(t);
      if (n && n !== this.newest) {
        const { older: r, newer: i } = n;
        (i && (i.older = r),
          r && (r.newer = i),
          (n.older = this.newest),
          (n.older.newer = n),
          (n.newer = null),
          (this.newest = n),
          n === this.oldest && (this.oldest = i));
      }
      return n;
    }
    set(t, n) {
      let r = this.getNode(t);
      return r
        ? (r.value = n)
        : ((r = { key: t, value: n, newer: null, older: this.newest }),
          this.newest && (this.newest.newer = r),
          (this.newest = r),
          (this.oldest = this.oldest || r),
          this.scheduleFinalization(r),
          this.map.set(t, r),
          this.size++,
          r.value);
    }
    clean() {
      for (; this.oldest && this.size > this.max;) this.deleteNode(this.oldest);
    }
    deleteNode(t) {
      (t === this.newest && (this.newest = t.older),
        t === this.oldest && (this.oldest = t.newer),
        t.newer && (t.newer.older = t.older),
        t.older && (t.older.newer = t.newer),
        this.size--);
      const n = t.key || (t.keyRef && t.keyRef.deref());
      (this.dispose(t.value, n),
        t.keyRef
          ? this.registry.unregister(t)
          : this.unfinalizedNodes.delete(t),
        n && this.map.delete(n));
    }
    delete(t) {
      const n = this.map.get(t);
      return n ? (this.deleteNode(n), !0) : !1;
    }
    scheduleFinalization(t) {
      (this.unfinalizedNodes.add(t),
        this.finalizationScheduled ||
          ((this.finalizationScheduled = !0), queueMicrotask(this.finalize)));
    }
  }
  var Xs = new WeakSet();
  function Pv(e) {
    e.size <= (e.max || -1) ||
      Xs.has(e) ||
      (Xs.add(e),
      setTimeout(function () {
        (e.clean(), Xs.delete(e));
      }, 100));
  }
  var qc = function (e, t) {
      var n = new Fo(e, t);
      return (
        (n.set = function (r, i) {
          var a = Fo.prototype.set.call(this, r, i);
          return (Pv(this), a);
        }),
        n
      );
    },
    BS = function (e, t) {
      var n = new vu(e, t);
      return (
        (n.set = function (r, i) {
          var a = vu.prototype.set.call(this, r, i);
          return (Pv(this), a);
        }),
        n
      );
    },
    US = Symbol.for("apollo.cacheSize"),
    It = _({}, Lo[US]),
    Rn = {};
  function Wc(e, t) {
    Rn[e] = t;
  }
  var QS = globalThis.__DEV__ !== !1 ? HS : void 0,
    $S = globalThis.__DEV__ !== !1 ? GS : void 0,
    qS = globalThis.__DEV__ !== !1 ? Iv : void 0;
  function WS() {
    var e = {
      parser: 1e3,
      canonicalStringify: 1e3,
      print: 2e3,
      "documentTransform.cache": 2e3,
      "queryManager.getDocumentInfo": 2e3,
      "PersistedQueryLink.persistedQueryHashes": 2e3,
      "fragmentRegistry.transform": 2e3,
      "fragmentRegistry.lookup": 1e3,
      "fragmentRegistry.findFragmentSpreads": 4e3,
      "cache.fragmentQueryDocuments": 1e3,
      "removeTypenameFromVariables.getVariableDefinitions": 2e3,
      "inMemoryCache.maybeBroadcastWatch": 5e3,
      "inMemoryCache.executeSelectionSet": 5e4,
      "inMemoryCache.executeSubSelectedArray": 1e4,
    };
    return Object.fromEntries(
      Object.entries(e).map(function (t) {
        var n = t[0],
          r = t[1];
        return [n, It[n] || r];
      }),
    );
  }
  function HS() {
    var e, t, n, r, i;
    if (globalThis.__DEV__ === !1)
      throw new Error("only supported in development mode");
    return {
      limits: WS(),
      sizes: _(
        {
          print: (e = Rn.print) === null || e === void 0 ? void 0 : e.call(Rn),
          parser:
            (t = Rn.parser) === null || t === void 0 ? void 0 : t.call(Rn),
          canonicalStringify:
            (n = Rn.canonicalStringify) === null || n === void 0
              ? void 0
              : n.call(Rn),
          links: wu(this.link),
          queryManager: {
            getDocumentInfo: this.queryManager.transformCache.size,
            documentTransforms: Mv(this.queryManager.documentTransform),
          },
        },
        (i = (r = this.cache).getMemoryInternals) === null || i === void 0
          ? void 0
          : i.call(r),
      ),
    };
  }
  function Iv() {
    return { cache: { fragmentQueryDocuments: en(this.getFragmentDoc) } };
  }
  function GS() {
    var e = this.config.fragments;
    return _(_({}, Iv.apply(this)), {
      addTypenameDocumentTransform: Mv(this.addTypenameTransform),
      inMemoryCache: {
        executeSelectionSet: en(this.storeReader.executeSelectionSet),
        executeSubSelectedArray: en(this.storeReader.executeSubSelectedArray),
        maybeBroadcastWatch: en(this.maybeBroadcastWatch),
      },
      fragmentRegistry: {
        findFragmentSpreads: en(e == null ? void 0 : e.findFragmentSpreads),
        lookup: en(e == null ? void 0 : e.lookup),
        transform: en(e == null ? void 0 : e.transform),
      },
    });
  }
  function YS(e) {
    return !!e && "dirtyKey" in e;
  }
  function en(e) {
    return YS(e) ? e.size : void 0;
  }
  function Dv(e) {
    return e != null;
  }
  function Mv(e) {
    return yu(e).map(function (t) {
      return { cache: t };
    });
  }
  function yu(e) {
    return e
      ? Ie(
          Ie(
            [en(e == null ? void 0 : e.performWork)],
            yu(e == null ? void 0 : e.left),
            !0,
          ),
          yu(e == null ? void 0 : e.right),
          !0,
        ).filter(Dv)
      : [];
  }
  function wu(e) {
    var t;
    return e
      ? Ie(
          Ie(
            [
              (t = e == null ? void 0 : e.getMemoryInternals) === null ||
              t === void 0
                ? void 0
                : t.call(e),
            ],
            wu(e == null ? void 0 : e.left),
            !0,
          ),
          wu(e == null ? void 0 : e.right),
          !0,
        ).filter(Dv)
      : [];
  }
  var wn = Object.assign(
    function (t) {
      return JSON.stringify(t, XS);
    },
    {
      reset: function () {
        Sr = new BS(It.canonicalStringify || 1e3);
      },
    },
  );
  globalThis.__DEV__ !== !1 &&
    Wc("canonicalStringify", function () {
      return Sr.size;
    });
  var Sr;
  wn.reset();
  function XS(e, t) {
    if (t && typeof t == "object") {
      var n = Object.getPrototypeOf(t);
      if (n === Object.prototype || n === null) {
        var r = Object.keys(t);
        if (r.every(KS)) return t;
        var i = JSON.stringify(r),
          a = Sr.get(i);
        if (!a) {
          r.sort();
          var o = JSON.stringify(r);
          ((a = Sr.get(o) || r), Sr.set(i, a), Sr.set(o, a));
        }
        var s = Object.create(n);
        return (
          a.forEach(function (l) {
            s[l] = t[l];
          }),
          s
        );
      }
    }
    return t;
  }
  function KS(e, t, n) {
    return t === 0 || n[t - 1] <= e;
  }
  function Pr(e) {
    return { __ref: String(e) };
  }
  function X(e) {
    return !!(e && typeof e == "object" && typeof e.__ref == "string");
  }
  function JS(e) {
    return ce(e) && e.kind === "Document" && Array.isArray(e.definitions);
  }
  function ZS(e) {
    return e.kind === "StringValue";
  }
  function eE(e) {
    return e.kind === "BooleanValue";
  }
  function tE(e) {
    return e.kind === "IntValue";
  }
  function nE(e) {
    return e.kind === "FloatValue";
  }
  function rE(e) {
    return e.kind === "Variable";
  }
  function iE(e) {
    return e.kind === "ObjectValue";
  }
  function aE(e) {
    return e.kind === "ListValue";
  }
  function oE(e) {
    return e.kind === "EnumValue";
  }
  function sE(e) {
    return e.kind === "NullValue";
  }
  function Vr(e, t, n, r) {
    if (tE(n) || nE(n)) e[t.value] = Number(n.value);
    else if (eE(n) || ZS(n)) e[t.value] = n.value;
    else if (iE(n)) {
      var i = {};
      (n.fields.map(function (o) {
        return Vr(i, o.name, o.value, r);
      }),
        (e[t.value] = i));
    } else if (rE(n)) {
      var a = (r || {})[n.name.value];
      e[t.value] = a;
    } else if (aE(n))
      e[t.value] = n.values.map(function (o) {
        var s = {};
        return (Vr(s, t, o, r), s[t.value]);
      });
    else if (oE(n)) e[t.value] = n.value;
    else if (sE(n)) e[t.value] = null;
    else throw je(124, t.value, n.kind);
  }
  function lE(e, t) {
    var n = null;
    e.directives &&
      ((n = {}),
      e.directives.forEach(function (i) {
        ((n[i.name.value] = {}),
          i.arguments &&
            i.arguments.forEach(function (a) {
              var o = a.name,
                s = a.value;
              return Vr(n[i.name.value], o, s, t);
            }));
      }));
    var r = null;
    return (
      e.arguments &&
        e.arguments.length &&
        ((r = {}),
        e.arguments.forEach(function (i) {
          var a = i.name,
            o = i.value;
          return Vr(r, a, o, t);
        })),
      Rv(e.name.value, r, n)
    );
  }
  var uE = [
      "connection",
      "include",
      "skip",
      "client",
      "rest",
      "export",
      "nonreactive",
    ],
    oi = wn,
    Rv = Object.assign(
      function (e, t, n) {
        if (t && n && n.connection && n.connection.key)
          if (n.connection.filter && n.connection.filter.length > 0) {
            var r = n.connection.filter ? n.connection.filter : [];
            r.sort();
            var i = {};
            return (
              r.forEach(function (s) {
                i[s] = t[s];
              }),
              "".concat(n.connection.key, "(").concat(oi(i), ")")
            );
          } else return n.connection.key;
        var a = e;
        if (t) {
          var o = oi(t);
          a += "(".concat(o, ")");
        }
        return (
          n &&
            Object.keys(n).forEach(function (s) {
              uE.indexOf(s) === -1 &&
                (n[s] && Object.keys(n[s]).length
                  ? (a += "@".concat(s, "(").concat(oi(n[s]), ")"))
                  : (a += "@".concat(s)));
            }),
          a
        );
      },
      {
        setStringify: function (e) {
          var t = oi;
          return ((oi = e), t);
        },
      },
    );
  function ps(e, t) {
    if (e.arguments && e.arguments.length) {
      var n = {};
      return (
        e.arguments.forEach(function (r) {
          var i = r.name,
            a = r.value;
          return Vr(n, i, a, t);
        }),
        n
      );
    }
    return null;
  }
  function qt(e) {
    return e.alias ? e.alias.value : e.name.value;
  }
  function Su(e, t, n) {
    for (var r, i = 0, a = t.selections; i < a.length; i++) {
      var o = a[i];
      if (bn(o)) {
        if (o.name.value === "__typename") return e[qt(o)];
      } else r ? r.push(o) : (r = [o]);
    }
    if (typeof e.__typename == "string") return e.__typename;
    if (r)
      for (var s = 0, l = r; s < l.length; s++) {
        var o = l[s],
          u = Su(e, ds(o, n).selectionSet, n);
        if (typeof u == "string") return u;
      }
  }
  function bn(e) {
    return e.kind === "Field";
  }
  function cE(e) {
    return e.kind === "InlineFragment";
  }
  function Xr(e) {
    I(e && e.kind === "Document", 116);
    var t = e.definitions
      .filter(function (n) {
        return n.kind !== "FragmentDefinition";
      })
      .map(function (n) {
        if (n.kind !== "OperationDefinition") throw je(117, n.kind);
        return n;
      });
    return (I(t.length <= 1, 118, t.length), e);
  }
  function Yn(e) {
    return (
      Xr(e),
      e.definitions.filter(function (t) {
        return t.kind === "OperationDefinition";
      })[0]
    );
  }
  function gi(e) {
    return (
      e.definitions
        .filter(function (t) {
          return t.kind === "OperationDefinition" && !!t.name;
        })
        .map(function (t) {
          return t.name.value;
        })[0] || null
    );
  }
  function Kr(e) {
    return e.definitions.filter(function (t) {
      return t.kind === "FragmentDefinition";
    });
  }
  function Lv(e) {
    var t = Yn(e);
    return (I(t && t.operation === "query", 119), t);
  }
  function Fv(e) {
    (I(e.kind === "Document", 120), I(e.definitions.length <= 1, 121));
    var t = e.definitions[0];
    return (I(t.kind === "FragmentDefinition", 122), t);
  }
  function pa(e) {
    Xr(e);
    for (var t, n = 0, r = e.definitions; n < r.length; n++) {
      var i = r[n];
      if (i.kind === "OperationDefinition") {
        var a = i.operation;
        if (a === "query" || a === "mutation" || a === "subscription") return i;
      }
      i.kind === "FragmentDefinition" && !t && (t = i);
    }
    if (t) return t;
    throw je(123);
  }
  function Hc(e) {
    var t = Object.create(null),
      n = e && e.variableDefinitions;
    return (
      n &&
        n.length &&
        n.forEach(function (r) {
          r.defaultValue && Vr(t, r.variable.name, r.defaultValue);
        }),
      t
    );
  }
  let Oe = null;
  const jd = {};
  let fE = 1;
  const dE = () =>
    class {
      constructor() {
        this.id = [
          "slot",
          fE++,
          Date.now(),
          Math.random().toString(36).slice(2),
        ].join(":");
      }
      hasValue() {
        for (let t = Oe; t; t = t.parent)
          if (this.id in t.slots) {
            const n = t.slots[this.id];
            if (n === jd) break;
            return (t !== Oe && (Oe.slots[this.id] = n), !0);
          }
        return (Oe && (Oe.slots[this.id] = jd), !1);
      }
      getValue() {
        if (this.hasValue()) return Oe.slots[this.id];
      }
      withValue(t, n, r, i) {
        const a = { __proto__: null, [this.id]: t },
          o = Oe;
        Oe = { parent: o, slots: a };
        try {
          return n.apply(i, r);
        } finally {
          Oe = o;
        }
      }
      static bind(t) {
        const n = Oe;
        return function () {
          const r = Oe;
          try {
            return ((Oe = n), t.apply(this, arguments));
          } finally {
            Oe = r;
          }
        };
      }
      static noContext(t, n, r) {
        if (Oe) {
          const i = Oe;
          try {
            return ((Oe = null), t.apply(r, n));
          } finally {
            Oe = i;
          }
        } else return t.apply(r, n);
      }
    };
  function Vd(e) {
    try {
      return e();
    } catch {}
  }
  const Ks = "@wry/context:Slot",
    pE = Vd(() => globalThis) || Vd(() => global) || Object.create(null),
    Bd = pE,
    ha =
      Bd[Ks] ||
      Array[Ks] ||
      (function (e) {
        try {
          Object.defineProperty(Bd, Ks, {
            value: e,
            enumerable: !1,
            writable: !1,
            configurable: !0,
          });
        } finally {
          return e;
        }
      })(dE()),
    hs = new ha(),
    { hasOwnProperty: hE } = Object.prototype,
    Gc =
      Array.from ||
      function (e) {
        const t = [];
        return (e.forEach((n) => t.push(n)), t);
      };
  function Ao(e) {
    const { unsubscribe: t } = e;
    typeof t == "function" && ((e.unsubscribe = void 0), t());
  }
  const ta = [],
    mE = 100;
  function Br(e, t) {
    if (!e) throw new Error(t || "assertion failure");
  }
  function Av(e, t) {
    const n = e.length;
    return n > 0 && n === t.length && e[n - 1] === t[n - 1];
  }
  function zv(e) {
    switch (e.length) {
      case 0:
        throw new Error("unknown value");
      case 1:
        return e[0];
      case 2:
        throw e[1];
    }
  }
  function jv(e) {
    return e.slice(0);
  }
  class ms {
    constructor(t) {
      ((this.fn = t),
        (this.parents = new Set()),
        (this.childValues = new Map()),
        (this.dirtyChildren = null),
        (this.dirty = !0),
        (this.recomputing = !1),
        (this.value = []),
        (this.deps = null),
        ++ms.count);
    }
    peek() {
      if (this.value.length === 1 && !_n(this))
        return (Ud(this), this.value[0]);
    }
    recompute(t) {
      return (
        Br(!this.recomputing, "already recomputing"),
        Ud(this),
        _n(this) ? vE(this, t) : zv(this.value)
      );
    }
    setDirty() {
      this.dirty || ((this.dirty = !0), Vv(this), Ao(this));
    }
    dispose() {
      (this.setDirty(),
        qv(this),
        Yc(this, (t, n) => {
          (t.setDirty(), Wv(t, this));
        }));
    }
    forget() {
      this.dispose();
    }
    dependOn(t) {
      (t.add(this),
        this.deps || (this.deps = ta.pop() || new Set()),
        this.deps.add(t));
    }
    forgetDeps() {
      this.deps &&
        (Gc(this.deps).forEach((t) => t.delete(this)),
        this.deps.clear(),
        ta.push(this.deps),
        (this.deps = null));
    }
  }
  ms.count = 0;
  function Ud(e) {
    const t = hs.getValue();
    if (t)
      return (
        e.parents.add(t),
        t.childValues.has(e) || t.childValues.set(e, []),
        _n(e) ? Uv(t, e) : Qv(t, e),
        t
      );
  }
  function vE(e, t) {
    return (qv(e), hs.withValue(e, gE, [e, t]), wE(e, t) && yE(e), zv(e.value));
  }
  function gE(e, t) {
    e.recomputing = !0;
    const { normalizeResult: n } = e;
    let r;
    (n && e.value.length === 1 && (r = jv(e.value)), (e.value.length = 0));
    try {
      if (((e.value[0] = e.fn.apply(null, t)), n && r && !Av(r, e.value)))
        try {
          e.value[0] = n(e.value[0], r[0]);
        } catch {}
    } catch (i) {
      e.value[1] = i;
    }
    e.recomputing = !1;
  }
  function _n(e) {
    return e.dirty || !!(e.dirtyChildren && e.dirtyChildren.size);
  }
  function yE(e) {
    ((e.dirty = !1), !_n(e) && Bv(e));
  }
  function Vv(e) {
    Yc(e, Uv);
  }
  function Bv(e) {
    Yc(e, Qv);
  }
  function Yc(e, t) {
    const n = e.parents.size;
    if (n) {
      const r = Gc(e.parents);
      for (let i = 0; i < n; ++i) t(r[i], e);
    }
  }
  function Uv(e, t) {
    (Br(e.childValues.has(t)), Br(_n(t)));
    const n = !_n(e);
    if (!e.dirtyChildren) e.dirtyChildren = ta.pop() || new Set();
    else if (e.dirtyChildren.has(t)) return;
    (e.dirtyChildren.add(t), n && Vv(e));
  }
  function Qv(e, t) {
    (Br(e.childValues.has(t)), Br(!_n(t)));
    const n = e.childValues.get(t);
    (n.length === 0
      ? e.childValues.set(t, jv(t.value))
      : Av(n, t.value) || e.setDirty(),
      $v(e, t),
      !_n(e) && Bv(e));
  }
  function $v(e, t) {
    const n = e.dirtyChildren;
    n &&
      (n.delete(t),
      n.size === 0 && (ta.length < mE && ta.push(n), (e.dirtyChildren = null)));
  }
  function qv(e) {
    (e.childValues.size > 0 &&
      e.childValues.forEach((t, n) => {
        Wv(e, n);
      }),
      e.forgetDeps(),
      Br(e.dirtyChildren === null));
  }
  function Wv(e, t) {
    (t.parents.delete(e), e.childValues.delete(t), $v(e, t));
  }
  function wE(e, t) {
    if (typeof e.subscribe == "function")
      try {
        (Ao(e), (e.unsubscribe = e.subscribe.apply(null, t)));
      } catch {
        return (e.setDirty(), !1);
      }
    return !0;
  }
  const SE = { setDirty: !0, dispose: !0, forget: !0 };
  function Hv(e) {
    const t = new Map(),
      n = e && e.subscribe;
    function r(i) {
      const a = hs.getValue();
      if (a) {
        let o = t.get(i);
        (o || t.set(i, (o = new Set())),
          a.dependOn(o),
          typeof n == "function" && (Ao(o), (o.unsubscribe = n(i))));
      }
    }
    return (
      (r.dirty = function (a, o) {
        const s = t.get(a);
        if (s) {
          const l = o && hE.call(SE, o) ? o : "setDirty";
          (Gc(s).forEach((u) => u[l]()), t.delete(a), Ao(s));
        }
      }),
      r
    );
  }
  let Qd;
  function EE(...e) {
    return (Qd || (Qd = new Ht(typeof WeakMap == "function"))).lookupArray(e);
  }
  const Js = new Set();
  function na(
    e,
    {
      max: t = Math.pow(2, 16),
      keyArgs: n,
      makeCacheKey: r = EE,
      normalizeResult: i,
      subscribe: a,
      cache: o = vu,
    } = Object.create(null),
  ) {
    const s = typeof o == "function" ? new o(t, (d) => d.dispose()) : o,
      l = function () {
        const d = r.apply(null, n ? n.apply(null, arguments) : arguments);
        if (d === void 0) return e.apply(null, arguments);
        let h = s.get(d);
        h ||
          (s.set(d, (h = new ms(e))),
          (h.normalizeResult = i),
          (h.subscribe = a),
          (h.forget = () => s.delete(d)));
        const v = h.recompute(Array.prototype.slice.call(arguments));
        return (
          s.set(d, h),
          Js.add(s),
          hs.hasValue() || (Js.forEach((y) => y.clean()), Js.clear()),
          v
        );
      };
    (Object.defineProperty(l, "size", {
      get: () => s.size,
      configurable: !1,
      enumerable: !1,
    }),
      Object.freeze(
        (l.options = {
          max: t,
          keyArgs: n,
          makeCacheKey: r,
          normalizeResult: i,
          subscribe: a,
          cache: s,
        }),
      ));
    function u(d) {
      const h = d && s.get(d);
      h && h.setDirty();
    }
    ((l.dirtyKey = u),
      (l.dirty = function () {
        u(r.apply(null, arguments));
      }));
    function c(d) {
      const h = d && s.get(d);
      if (h) return h.peek();
    }
    ((l.peekKey = c),
      (l.peek = function () {
        return c(r.apply(null, arguments));
      }));
    function f(d) {
      return d ? s.delete(d) : !1;
    }
    return (
      (l.forgetKey = f),
      (l.forget = function () {
        return f(r.apply(null, arguments));
      }),
      (l.makeCacheKey = r),
      (l.getKey = n
        ? function () {
            return r.apply(null, n.apply(null, arguments));
          }
        : r),
      Object.freeze(l)
    );
  }
  function xE(e) {
    return e;
  }
  var Gv = (function () {
      function e(t, n) {
        (n === void 0 && (n = Object.create(null)),
          (this.resultCache = Qc ? new WeakSet() : new Set()),
          (this.transform = t),
          n.getCacheKey && (this.getCacheKey = n.getCacheKey),
          (this.cached = n.cache !== !1),
          this.resetCache());
      }
      return (
        (e.prototype.getCacheKey = function (t) {
          return [t];
        }),
        (e.identity = function () {
          return new e(xE, { cache: !1 });
        }),
        (e.split = function (t, n, r) {
          return (
            r === void 0 && (r = e.identity()),
            Object.assign(
              new e(
                function (i) {
                  var a = t(i) ? n : r;
                  return a.transformDocument(i);
                },
                { cache: !1 },
              ),
              { left: n, right: r },
            )
          );
        }),
        (e.prototype.resetCache = function () {
          var t = this;
          if (this.cached) {
            var n = new Ht(rr);
            this.performWork = na(e.prototype.performWork.bind(this), {
              makeCacheKey: function (r) {
                var i = t.getCacheKey(r);
                if (i) return (I(Array.isArray(i), 105), n.lookupArray(i));
              },
              max: It["documentTransform.cache"],
              cache: Fo,
            });
          }
        }),
        (e.prototype.performWork = function (t) {
          return (Xr(t), this.transform(t));
        }),
        (e.prototype.transformDocument = function (t) {
          if (this.resultCache.has(t)) return t;
          var n = this.performWork(t);
          return (this.resultCache.add(n), n);
        }),
        (e.prototype.concat = function (t) {
          var n = this;
          return Object.assign(
            new e(
              function (r) {
                return t.transformDocument(n.transformDocument(r));
              },
              { cache: !1 },
            ),
            { left: this, right: t },
          );
        }),
        e
      );
    })(),
    Oi,
    jn = Object.assign(
      function (e) {
        var t = Oi.get(e);
        return (t || ((t = wS(e)), Oi.set(e, t)), t);
      },
      {
        reset: function () {
          Oi = new qc(It.print || 2e3);
        },
      },
    );
  jn.reset();
  globalThis.__DEV__ !== !1 &&
    Wc("print", function () {
      return Oi ? Oi.size : 0;
    });
  var fe = Array.isArray;
  function lt(e) {
    return Array.isArray(e) && e.length > 0;
  }
  var $d = { kind: F.FIELD, name: { kind: F.NAME, value: "__typename" } };
  function Yv(e, t) {
    return (
      !e ||
      e.selectionSet.selections.every(function (n) {
        return n.kind === F.FRAGMENT_SPREAD && Yv(t[n.name.value], t);
      })
    );
  }
  function bE(e) {
    return Yv(Yn(e) || Fv(e), Yr(Kr(e))) ? null : e;
  }
  function _E(e) {
    var t = new Map(),
      n = new Map();
    return (
      e.forEach(function (r) {
        r && (r.name ? t.set(r.name, r) : r.test && n.set(r.test, r));
      }),
      function (r) {
        var i = t.get(r.name.value);
        return (
          !i &&
            n.size &&
            n.forEach(function (a, o) {
              o(r) && (i = a);
            }),
          i
        );
      }
    );
  }
  function qd(e) {
    var t = new Map();
    return function (r) {
      r === void 0 && (r = e);
      var i = t.get(r);
      return (
        i ||
          t.set(r, (i = { variables: new Set(), fragmentSpreads: new Set() })),
        i
      );
    };
  }
  function Xv(e, t) {
    Xr(t);
    for (
      var n = qd(""),
        r = qd(""),
        i = function (p) {
          for (var m = 0, g = void 0; m < p.length && (g = p[m]); ++m)
            if (!fe(g)) {
              if (g.kind === F.OPERATION_DEFINITION)
                return n(g.name && g.name.value);
              if (g.kind === F.FRAGMENT_DEFINITION) return r(g.name.value);
            }
          return (globalThis.__DEV__ !== !1 && I.error(125), null);
        },
        a = 0,
        o = t.definitions.length - 1;
      o >= 0;
      --o
    )
      t.definitions[o].kind === F.OPERATION_DEFINITION && ++a;
    var s = _E(e),
      l = function (p) {
        return (
          lt(p) &&
          p.map(s).some(function (m) {
            return m && m.remove;
          })
        );
      },
      u = new Map(),
      c = !1,
      f = {
        enter: function (p) {
          if (l(p.directives)) return ((c = !0), null);
        },
      },
      d = Et(t, {
        Field: f,
        InlineFragment: f,
        VariableDefinition: {
          enter: function () {
            return !1;
          },
        },
        Variable: {
          enter: function (p, m, g, E, x) {
            var b = i(x);
            b && b.variables.add(p.name.value);
          },
        },
        FragmentSpread: {
          enter: function (p, m, g, E, x) {
            if (l(p.directives)) return ((c = !0), null);
            var b = i(x);
            b && b.fragmentSpreads.add(p.name.value);
          },
        },
        FragmentDefinition: {
          enter: function (p, m, g, E) {
            u.set(JSON.stringify(E), p);
          },
          leave: function (p, m, g, E) {
            var x = u.get(JSON.stringify(E));
            if (p === x) return p;
            if (
              a > 0 &&
              p.selectionSet.selections.every(function (b) {
                return b.kind === F.FIELD && b.name.value === "__typename";
              })
            )
              return ((r(p.name.value).removed = !0), (c = !0), null);
          },
        },
        Directive: {
          leave: function (p) {
            if (s(p)) return ((c = !0), null);
          },
        },
      });
    if (!c) return t;
    var h = function (p) {
        return (
          p.transitiveVars ||
            ((p.transitiveVars = new Set(p.variables)),
            p.removed ||
              p.fragmentSpreads.forEach(function (m) {
                h(r(m)).transitiveVars.forEach(function (g) {
                  p.transitiveVars.add(g);
                });
              })),
          p
        );
      },
      v = new Set();
    (d.definitions.forEach(function (p) {
      p.kind === F.OPERATION_DEFINITION
        ? h(n(p.name && p.name.value)).fragmentSpreads.forEach(function (m) {
            v.add(m);
          })
        : p.kind === F.FRAGMENT_DEFINITION &&
          a === 0 &&
          !r(p.name.value).removed &&
          v.add(p.name.value);
    }),
      v.forEach(function (p) {
        h(r(p)).fragmentSpreads.forEach(function (m) {
          v.add(m);
        });
      }));
    var y = function (p) {
        return !!(!v.has(p) || r(p).removed);
      },
      S = {
        enter: function (p) {
          if (y(p.name.value)) return null;
        },
      };
    return bE(
      Et(d, {
        FragmentSpread: S,
        FragmentDefinition: S,
        OperationDefinition: {
          leave: function (p) {
            if (p.variableDefinitions) {
              var m = h(n(p.name && p.name.value)).transitiveVars;
              if (m.size < p.variableDefinitions.length)
                return _(_({}, p), {
                  variableDefinitions: p.variableDefinitions.filter(
                    function (g) {
                      return m.has(g.variable.name.value);
                    },
                  ),
                });
            }
          },
        },
      }),
    );
  }
  var Xc = Object.assign(
    function (e) {
      return Et(e, {
        SelectionSet: {
          enter: function (t, n, r) {
            if (!(r && r.kind === F.OPERATION_DEFINITION)) {
              var i = t.selections;
              if (i) {
                var a = i.some(function (s) {
                  return (
                    bn(s) &&
                    (s.name.value === "__typename" ||
                      s.name.value.lastIndexOf("__", 0) === 0)
                  );
                });
                if (!a) {
                  var o = r;
                  if (!(
                    bn(o) &&
                    o.directives &&
                    o.directives.some(function (s) {
                      return s.name.value === "export";
                    })
                  ))
                    return _(_({}, t), {
                      selections: Ie(Ie([], i, !0), [$d], !1),
                    });
                }
              }
            }
          },
        },
      });
    },
    {
      added: function (e) {
        return e === $d;
      },
    },
  );
  function TE(e) {
    var t = pa(e),
      n = t.operation;
    if (n === "query") return e;
    var r = Et(e, {
      OperationDefinition: {
        enter: function (i) {
          return _(_({}, i), { operation: "query" });
        },
      },
    });
    return r;
  }
  function Kv(e) {
    Xr(e);
    var t = Xv(
      [
        {
          test: function (n) {
            return n.name.value === "client";
          },
          remove: !0,
        },
      ],
      e,
    );
    return t;
  }
  function kE(e) {
    return (
      Xr(e),
      Et(e, {
        FragmentSpread: function (t) {
          var n;
          if (!(
            !((n = t.directives) === null || n === void 0) &&
            n.some(function (r) {
              return r.name.value === "unmask";
            })
          ))
            return _(_({}, t), {
              directives: Ie(
                Ie([], t.directives || [], !0),
                [
                  {
                    kind: F.DIRECTIVE,
                    name: { kind: F.NAME, value: "nonreactive" },
                  },
                ],
                !1,
              ),
            });
        },
      })
    );
  }
  var CE = Object.prototype.hasOwnProperty;
  function Wd() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    return vs(e);
  }
  function vs(e) {
    var t = e[0] || {},
      n = e.length;
    if (n > 1) for (var r = new Tn(), i = 1; i < n; ++i) t = r.merge(t, e[i]);
    return t;
  }
  var OE = function (e, t, n) {
      return this.merge(e[n], t[n]);
    },
    Tn = (function () {
      function e(t) {
        (t === void 0 && (t = OE),
          (this.reconciler = t),
          (this.isObject = ce),
          (this.pastCopies = new Set()));
      }
      return (
        (e.prototype.merge = function (t, n) {
          for (var r = this, i = [], a = 2; a < arguments.length; a++)
            i[a - 2] = arguments[a];
          return ce(n) && ce(t)
            ? (Object.keys(n).forEach(function (o) {
                if (CE.call(t, o)) {
                  var s = t[o];
                  if (n[o] !== s) {
                    var l = r.reconciler.apply(r, Ie([t, n, o], i, !1));
                    l !== s && ((t = r.shallowCopyForMerge(t)), (t[o] = l));
                  }
                } else ((t = r.shallowCopyForMerge(t)), (t[o] = n[o]));
              }),
              t)
            : n;
        }),
        (e.prototype.shallowCopyForMerge = function (t) {
          return (
            ce(t) &&
              (this.pastCopies.has(t) ||
                (Array.isArray(t)
                  ? (t = t.slice(0))
                  : (t = _({ __proto__: Object.getPrototypeOf(t) }, t)),
                this.pastCopies.add(t))),
            t
          );
        }),
        e
      );
    })();
  function NE(e, t) {
    var n = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
    if (n) return (n = n.call(e)).next.bind(n);
    if (
      Array.isArray(e) ||
      (n = PE(e)) ||
      (t && e && typeof e.length == "number")
    ) {
      n && (e = n);
      var r = 0;
      return function () {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function PE(e, t) {
    if (e) {
      if (typeof e == "string") return Hd(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      if (
        (n === "Object" && e.constructor && (n = e.constructor.name),
        n === "Map" || n === "Set")
      )
        return Array.from(e);
      if (
        n === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return Hd(e, t);
    }
  }
  function Hd(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
  }
  function Gd(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      ((r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r));
    }
  }
  function Kc(e, t, n) {
    return (
      t && Gd(e.prototype, t),
      n && Gd(e, n),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
  }
  var Jc = function () {
      return typeof Symbol == "function";
    },
    Zc = function (e) {
      return Jc() && !!Symbol[e];
    },
    ef = function (e) {
      return Zc(e) ? Symbol[e] : "@@" + e;
    };
  Jc() && !Zc("observable") && (Symbol.observable = Symbol("observable"));
  var IE = ef("iterator"),
    Eu = ef("observable"),
    Jv = ef("species");
  function zo(e, t) {
    var n = e[t];
    if (n != null) {
      if (typeof n != "function") throw new TypeError(n + " is not a function");
      return n;
    }
  }
  function si(e) {
    var t = e.constructor;
    return (
      t !== void 0 && ((t = t[Jv]), t === null && (t = void 0)),
      t !== void 0 ? t : te
    );
  }
  function DE(e) {
    return e instanceof te;
  }
  function Ur(e) {
    Ur.log
      ? Ur.log(e)
      : setTimeout(function () {
          throw e;
        });
  }
  function eo(e) {
    Promise.resolve().then(function () {
      try {
        e();
      } catch (t) {
        Ur(t);
      }
    });
  }
  function Zv(e) {
    var t = e._cleanup;
    if (t !== void 0 && ((e._cleanup = void 0), !!t))
      try {
        if (typeof t == "function") t();
        else {
          var n = zo(t, "unsubscribe");
          n && n.call(t);
        }
      } catch (r) {
        Ur(r);
      }
  }
  function xu(e) {
    ((e._observer = void 0), (e._queue = void 0), (e._state = "closed"));
  }
  function ME(e) {
    var t = e._queue;
    if (t) {
      ((e._queue = void 0), (e._state = "ready"));
      for (
        var n = 0;
        n < t.length && (eg(e, t[n].type, t[n].value), e._state !== "closed");
        ++n
      );
    }
  }
  function eg(e, t, n) {
    e._state = "running";
    var r = e._observer;
    try {
      var i = zo(r, t);
      switch (t) {
        case "next":
          i && i.call(r, n);
          break;
        case "error":
          if ((xu(e), i)) i.call(r, n);
          else throw n;
          break;
        case "complete":
          (xu(e), i && i.call(r));
          break;
      }
    } catch (a) {
      Ur(a);
    }
    e._state === "closed"
      ? Zv(e)
      : e._state === "running" && (e._state = "ready");
  }
  function Zs(e, t, n) {
    if (e._state !== "closed") {
      if (e._state === "buffering") {
        e._queue.push({ type: t, value: n });
        return;
      }
      if (e._state !== "ready") {
        ((e._state = "buffering"),
          (e._queue = [{ type: t, value: n }]),
          eo(function () {
            return ME(e);
          }));
        return;
      }
      eg(e, t, n);
    }
  }
  var RE = (function () {
      function e(n, r) {
        ((this._cleanup = void 0),
          (this._observer = n),
          (this._queue = void 0),
          (this._state = "initializing"));
        var i = new LE(this);
        try {
          this._cleanup = r.call(void 0, i);
        } catch (a) {
          i.error(a);
        }
        this._state === "initializing" && (this._state = "ready");
      }
      var t = e.prototype;
      return (
        (t.unsubscribe = function () {
          this._state !== "closed" && (xu(this), Zv(this));
        }),
        Kc(e, [
          {
            key: "closed",
            get: function () {
              return this._state === "closed";
            },
          },
        ]),
        e
      );
    })(),
    LE = (function () {
      function e(n) {
        this._subscription = n;
      }
      var t = e.prototype;
      return (
        (t.next = function (r) {
          Zs(this._subscription, "next", r);
        }),
        (t.error = function (r) {
          Zs(this._subscription, "error", r);
        }),
        (t.complete = function () {
          Zs(this._subscription, "complete");
        }),
        Kc(e, [
          {
            key: "closed",
            get: function () {
              return this._subscription._state === "closed";
            },
          },
        ]),
        e
      );
    })(),
    te = (function () {
      function e(n) {
        if (!(this instanceof e))
          throw new TypeError("Observable cannot be called as a function");
        if (typeof n != "function")
          throw new TypeError("Observable initializer must be a function");
        this._subscriber = n;
      }
      var t = e.prototype;
      return (
        (t.subscribe = function (r) {
          return (
            (typeof r != "object" || r === null) &&
              (r = { next: r, error: arguments[1], complete: arguments[2] }),
            new RE(r, this._subscriber)
          );
        }),
        (t.forEach = function (r) {
          var i = this;
          return new Promise(function (a, o) {
            if (typeof r != "function") {
              o(new TypeError(r + " is not a function"));
              return;
            }
            function s() {
              (l.unsubscribe(), a());
            }
            var l = i.subscribe({
              next: function (u) {
                try {
                  r(u, s);
                } catch (c) {
                  (o(c), l.unsubscribe());
                }
              },
              error: o,
              complete: a,
            });
          });
        }),
        (t.map = function (r) {
          var i = this;
          if (typeof r != "function")
            throw new TypeError(r + " is not a function");
          var a = si(this);
          return new a(function (o) {
            return i.subscribe({
              next: function (s) {
                try {
                  s = r(s);
                } catch (l) {
                  return o.error(l);
                }
                o.next(s);
              },
              error: function (s) {
                o.error(s);
              },
              complete: function () {
                o.complete();
              },
            });
          });
        }),
        (t.filter = function (r) {
          var i = this;
          if (typeof r != "function")
            throw new TypeError(r + " is not a function");
          var a = si(this);
          return new a(function (o) {
            return i.subscribe({
              next: function (s) {
                try {
                  if (!r(s)) return;
                } catch (l) {
                  return o.error(l);
                }
                o.next(s);
              },
              error: function (s) {
                o.error(s);
              },
              complete: function () {
                o.complete();
              },
            });
          });
        }),
        (t.reduce = function (r) {
          var i = this;
          if (typeof r != "function")
            throw new TypeError(r + " is not a function");
          var a = si(this),
            o = arguments.length > 1,
            s = !1,
            l = arguments[1],
            u = l;
          return new a(function (c) {
            return i.subscribe({
              next: function (f) {
                var d = !s;
                if (((s = !0), !d || o))
                  try {
                    u = r(u, f);
                  } catch (h) {
                    return c.error(h);
                  }
                else u = f;
              },
              error: function (f) {
                c.error(f);
              },
              complete: function () {
                if (!s && !o)
                  return c.error(
                    new TypeError("Cannot reduce an empty sequence"),
                  );
                (c.next(u), c.complete());
              },
            });
          });
        }),
        (t.concat = function () {
          for (
            var r = this, i = arguments.length, a = new Array(i), o = 0;
            o < i;
            o++
          )
            a[o] = arguments[o];
          var s = si(this);
          return new s(function (l) {
            var u,
              c = 0;
            function f(d) {
              u = d.subscribe({
                next: function (h) {
                  l.next(h);
                },
                error: function (h) {
                  l.error(h);
                },
                complete: function () {
                  c === a.length
                    ? ((u = void 0), l.complete())
                    : f(s.from(a[c++]));
                },
              });
            }
            return (
              f(r),
              function () {
                u && (u.unsubscribe(), (u = void 0));
              }
            );
          });
        }),
        (t.flatMap = function (r) {
          var i = this;
          if (typeof r != "function")
            throw new TypeError(r + " is not a function");
          var a = si(this);
          return new a(function (o) {
            var s = [],
              l = i.subscribe({
                next: function (c) {
                  if (r)
                    try {
                      c = r(c);
                    } catch (d) {
                      return o.error(d);
                    }
                  var f = a.from(c).subscribe({
                    next: function (d) {
                      o.next(d);
                    },
                    error: function (d) {
                      o.error(d);
                    },
                    complete: function () {
                      var d = s.indexOf(f);
                      (d >= 0 && s.splice(d, 1), u());
                    },
                  });
                  s.push(f);
                },
                error: function (c) {
                  o.error(c);
                },
                complete: function () {
                  u();
                },
              });
            function u() {
              l.closed && s.length === 0 && o.complete();
            }
            return function () {
              (s.forEach(function (c) {
                return c.unsubscribe();
              }),
                l.unsubscribe());
            };
          });
        }),
        (t[Eu] = function () {
          return this;
        }),
        (e.from = function (r) {
          var i = typeof this == "function" ? this : e;
          if (r == null) throw new TypeError(r + " is not an object");
          var a = zo(r, Eu);
          if (a) {
            var o = a.call(r);
            if (Object(o) !== o) throw new TypeError(o + " is not an object");
            return DE(o) && o.constructor === i
              ? o
              : new i(function (s) {
                  return o.subscribe(s);
                });
          }
          if (Zc("iterator") && ((a = zo(r, IE)), a))
            return new i(function (s) {
              eo(function () {
                if (!s.closed) {
                  for (var l = NE(a.call(r)), u; !(u = l()).done;) {
                    var c = u.value;
                    if ((s.next(c), s.closed)) return;
                  }
                  s.complete();
                }
              });
            });
          if (Array.isArray(r))
            return new i(function (s) {
              eo(function () {
                if (!s.closed) {
                  for (var l = 0; l < r.length; ++l)
                    if ((s.next(r[l]), s.closed)) return;
                  s.complete();
                }
              });
            });
          throw new TypeError(r + " is not observable");
        }),
        (e.of = function () {
          for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
            i[a] = arguments[a];
          var o = typeof this == "function" ? this : e;
          return new o(function (s) {
            eo(function () {
              if (!s.closed) {
                for (var l = 0; l < i.length; ++l)
                  if ((s.next(i[l]), s.closed)) return;
                s.complete();
              }
            });
          });
        }),
        Kc(e, null, [
          {
            key: Jv,
            get: function () {
              return this;
            },
          },
        ]),
        e
      );
    })();
  Jc() &&
    Object.defineProperty(te, Symbol("extensions"), {
      value: { symbol: Eu, hostReportError: Ur },
      configurable: !0,
    });
  function FE(e) {
    var t,
      n = e.Symbol;
    if (typeof n == "function")
      if (n.observable) t = n.observable;
      else {
        typeof n.for == "function"
          ? (t = n.for("https://github.com/benlesh/symbol-observable"))
          : (t = n("https://github.com/benlesh/symbol-observable"));
        try {
          n.observable = t;
        } catch {}
      }
    else t = "@@observable";
    return t;
  }
  var ar;
  typeof self < "u"
    ? (ar = self)
    : typeof window < "u"
      ? (ar = window)
      : typeof global < "u"
        ? (ar = global)
        : typeof Vu < "u"
          ? (ar = Vu)
          : (ar = Function("return this")());
  FE(ar);
  var Yd = te.prototype,
    Xd = "@@observable";
  Yd[Xd] ||
    (Yd[Xd] = function () {
      return this;
    });
  function AE(e) {
    return (e.catch(function () {}), e);
  }
  var zE = Object.prototype.toString;
  function tg(e) {
    return bu(e);
  }
  function bu(e, t) {
    switch (zE.call(e)) {
      case "[object Array]": {
        if (((t = t || new Map()), t.has(e))) return t.get(e);
        var n = e.slice(0);
        return (
          t.set(e, n),
          n.forEach(function (i, a) {
            n[a] = bu(i, t);
          }),
          n
        );
      }
      case "[object Object]": {
        if (((t = t || new Map()), t.has(e))) return t.get(e);
        var r = Object.create(Object.getPrototypeOf(e));
        return (
          t.set(e, r),
          Object.keys(e).forEach(function (i) {
            r[i] = bu(e[i], t);
          }),
          r
        );
      }
      default:
        return e;
    }
  }
  function jE(e) {
    var t = new Set([e]);
    return (
      t.forEach(function (n) {
        ce(n) &&
          VE(n) === n &&
          Object.getOwnPropertyNames(n).forEach(function (r) {
            ce(n[r]) && t.add(n[r]);
          });
      }),
      e
    );
  }
  function VE(e) {
    if (globalThis.__DEV__ !== !1 && !Object.isFrozen(e))
      try {
        Object.freeze(e);
      } catch (t) {
        if (t instanceof TypeError) return null;
        throw t;
      }
    return e;
  }
  function Qr(e) {
    return (globalThis.__DEV__ !== !1 && jE(e), e);
  }
  function Ni(e, t, n) {
    var r = [];
    (e.forEach(function (i) {
      return i[t] && r.push(i);
    }),
      r.forEach(function (i) {
        return i[t](n);
      }));
  }
  function el(e, t, n) {
    return new te(function (r) {
      var i = {
        then: function (l) {
          return new Promise(function (u) {
            return u(l());
          });
        },
      };
      function a(l, u) {
        return function (c) {
          if (l) {
            var f = function () {
              return r.closed ? 0 : l(c);
            };
            i = i.then(f, f).then(
              function (d) {
                return r.next(d);
              },
              function (d) {
                return r.error(d);
              },
            );
          } else r[u](c);
        };
      }
      var o = {
          next: a(t, "next"),
          error: a(n, "error"),
          complete: function () {
            i.then(function () {
              return r.complete();
            });
          },
        },
        s = e.subscribe(o);
      return function () {
        return s.unsubscribe();
      };
    });
  }
  function ng(e) {
    function t(n) {
      Object.defineProperty(e, n, { value: te });
    }
    return ($c && Symbol.species && t(Symbol.species), t("@@species"), e);
  }
  function Kd(e) {
    return e && typeof e.then == "function";
  }
  var or = (function (e) {
    Dt(t, e);
    function t(n) {
      var r =
        e.call(this, function (i) {
          return (
            r.addObserver(i),
            function () {
              return r.removeObserver(i);
            }
          );
        }) || this;
      return (
        (r.observers = new Set()),
        (r.promise = new Promise(function (i, a) {
          ((r.resolve = i), (r.reject = a));
        })),
        (r.handlers = {
          next: function (i) {
            r.sub !== null &&
              ((r.latest = ["next", i]),
              r.notify("next", i),
              Ni(r.observers, "next", i));
          },
          error: function (i) {
            var a = r.sub;
            a !== null &&
              (a &&
                setTimeout(function () {
                  return a.unsubscribe();
                }),
              (r.sub = null),
              (r.latest = ["error", i]),
              r.reject(i),
              r.notify("error", i),
              Ni(r.observers, "error", i));
          },
          complete: function () {
            var i = r,
              a = i.sub,
              o = i.sources,
              s = o === void 0 ? [] : o;
            if (a !== null) {
              var l = s.shift();
              l
                ? Kd(l)
                  ? l.then(function (u) {
                      return (r.sub = u.subscribe(r.handlers));
                    }, r.handlers.error)
                  : (r.sub = l.subscribe(r.handlers))
                : (a &&
                    setTimeout(function () {
                      return a.unsubscribe();
                    }),
                  (r.sub = null),
                  r.latest && r.latest[0] === "next"
                    ? r.resolve(r.latest[1])
                    : r.resolve(),
                  r.notify("complete"),
                  Ni(r.observers, "complete"));
            }
          },
        }),
        (r.nextResultListeners = new Set()),
        (r.cancel = function (i) {
          (r.reject(i), (r.sources = []), r.handlers.error(i));
        }),
        r.promise.catch(function (i) {}),
        typeof n == "function" && (n = [new te(n)]),
        Kd(n)
          ? n.then(function (i) {
              return r.start(i);
            }, r.handlers.error)
          : r.start(n),
        r
      );
    }
    return (
      (t.prototype.start = function (n) {
        this.sub === void 0 &&
          ((this.sources = Array.from(n)), this.handlers.complete());
      }),
      (t.prototype.deliverLastMessage = function (n) {
        if (this.latest) {
          var r = this.latest[0],
            i = n[r];
          (i && i.call(n, this.latest[1]),
            this.sub === null && r === "next" && n.complete && n.complete());
        }
      }),
      (t.prototype.addObserver = function (n) {
        this.observers.has(n) ||
          (this.deliverLastMessage(n), this.observers.add(n));
      }),
      (t.prototype.removeObserver = function (n) {
        this.observers.delete(n) &&
          this.observers.size < 1 &&
          this.handlers.complete();
      }),
      (t.prototype.notify = function (n, r) {
        var i = this.nextResultListeners;
        i.size &&
          ((this.nextResultListeners = new Set()),
          i.forEach(function (a) {
            return a(n, r);
          }));
      }),
      (t.prototype.beforeNext = function (n) {
        var r = !1;
        this.nextResultListeners.add(function (i, a) {
          r || ((r = !0), n(i, a));
        });
      }),
      t
    );
  })(te);
  ng(or);
  function Ir(e) {
    return "incremental" in e;
  }
  function BE(e) {
    return "hasNext" in e && "data" in e;
  }
  function UE(e) {
    return Ir(e) || BE(e);
  }
  function QE(e) {
    return ce(e) && "payload" in e;
  }
  function rg(e, t) {
    var n = e,
      r = new Tn();
    return (
      Ir(t) &&
        lt(t.incremental) &&
        t.incremental.forEach(function (i) {
          for (var a = i.data, o = i.path, s = o.length - 1; s >= 0; --s) {
            var l = o[s],
              u = !isNaN(+l),
              c = u ? [] : {};
            ((c[l] = a), (a = c));
          }
          n = r.merge(n, a);
        }),
      n
    );
  }
  function to(e) {
    var t = _u(e);
    return lt(t);
  }
  function _u(e) {
    var t = lt(e.errors) ? e.errors.slice(0) : [];
    return (
      Ir(e) &&
        lt(e.incremental) &&
        e.incremental.forEach(function (n) {
          n.errors && t.push.apply(t, n.errors);
        }),
      t
    );
  }
  function Xn() {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    var n = Object.create(null);
    return (
      e.forEach(function (r) {
        r &&
          Object.keys(r).forEach(function (i) {
            var a = r[i];
            a !== void 0 && (n[i] = a);
          });
      }),
      n
    );
  }
  function no(e, t) {
    return Xn(
      e,
      t,
      t.variables && { variables: Xn(_(_({}, e && e.variables), t.variables)) },
    );
  }
  function tl(e) {
    return new te(function (t) {
      t.error(e);
    });
  }
  var ig = function (e, t, n) {
    var r = new Error(n);
    throw (
      (r.name = "ServerError"),
      (r.response = e),
      (r.statusCode = e.status),
      (r.result = t),
      r
    );
  };
  function $E(e) {
    for (
      var t = ["query", "operationName", "variables", "extensions", "context"],
        n = 0,
        r = Object.keys(e);
      n < r.length;
      n++
    ) {
      var i = r[n];
      if (t.indexOf(i) < 0) throw je(58, i);
    }
    return e;
  }
  function qE(e, t) {
    var n = _({}, e),
      r = function (a) {
        typeof a == "function" ? (n = _(_({}, n), a(n))) : (n = _(_({}, n), a));
      },
      i = function () {
        return _({}, n);
      };
    return (
      Object.defineProperty(t, "setContext", { enumerable: !1, value: r }),
      Object.defineProperty(t, "getContext", { enumerable: !1, value: i }),
      t
    );
  }
  function WE(e) {
    var t = {
      variables: e.variables || {},
      extensions: e.extensions || {},
      operationName: e.operationName,
      query: e.query,
    };
    return (
      t.operationName ||
        (t.operationName =
          typeof t.query != "string" ? gi(t.query) || void 0 : ""),
      t
    );
  }
  function HE(e, t) {
    var n = _({}, e),
      r = new Set(Object.keys(e));
    return (
      Et(t, {
        Variable: function (i, a, o) {
          o && o.kind !== "VariableDefinition" && r.delete(i.name.value);
        },
      }),
      r.forEach(function (i) {
        delete n[i];
      }),
      n
    );
  }
  var GE = Symbol.for("apollo.deprecations"),
    YE = Lo,
    Tu = new ha();
  function XE(e) {
    return YE[GE] || (Tu.getValue() || []).includes(e);
  }
  function ke(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return Tu.withValue.apply(Tu, Ie([Array.isArray(e) ? e : [e]], t, !1));
  }
  function de(e, t, n, r) {
    (r === void 0 && (r = "Please remove this option."),
      rn(t, function () {
        t in e && globalThis.__DEV__ !== !1 && I.warn(104, n, t, r);
      }));
  }
  function rn(e, t) {
    XE(e) || t();
  }
  function Jd(e, t) {
    return t ? t(e) : te.of();
  }
  function li(e) {
    return typeof e == "function" ? new ma(e) : e;
  }
  function Aa(e) {
    return e.request.length <= 1;
  }
  var ma = (function () {
      function e(t) {
        t && (this.request = t);
      }
      return (
        (e.empty = function () {
          return new e(function () {
            return te.of();
          });
        }),
        (e.from = function (t) {
          return t.length === 0
            ? e.empty()
            : t.map(li).reduce(function (n, r) {
                return n.concat(r);
              });
        }),
        (e.split = function (t, n, r) {
          var i = li(n),
            a = li(r || new e(Jd)),
            o;
          return (
            Aa(i) && Aa(a)
              ? (o = new e(function (s) {
                  return t(s)
                    ? i.request(s) || te.of()
                    : a.request(s) || te.of();
                }))
              : (o = new e(function (s, l) {
                  return t(s)
                    ? i.request(s, l) || te.of()
                    : a.request(s, l) || te.of();
                })),
            Object.assign(o, { left: i, right: a })
          );
        }),
        (e.execute = function (t, n) {
          return t.request(qE(n.context, WE($E(n)))) || te.of();
        }),
        (e.concat = function (t, n) {
          var r = li(t);
          if (Aa(r)) return (globalThis.__DEV__ !== !1 && I.warn(47, r), r);
          var i = li(n),
            a;
          return (
            Aa(i)
              ? (a = new e(function (o) {
                  return (
                    r.request(o, function (s) {
                      return i.request(s) || te.of();
                    }) || te.of()
                  );
                }))
              : (a = new e(function (o, s) {
                  return (
                    r.request(o, function (l) {
                      return i.request(l, s) || te.of();
                    }) || te.of()
                  );
                })),
            Object.assign(a, { left: r, right: i })
          );
        }),
        (e.prototype.split = function (t, n, r) {
          return this.concat(e.split(t, n, r || new e(Jd)));
        }),
        (e.prototype.concat = function (t) {
          return e.concat(this, t);
        }),
        (e.prototype.request = function (t, n) {
          throw je(48);
        }),
        (e.prototype.onError = function (t, n) {
          if (
            (globalThis.__DEV__ !== !1 &&
              rn("onError", function () {
                globalThis.__DEV__ !== !1 && I.warn(49);
              }),
            n && n.error)
          )
            return (n.error(t), !1);
          throw t;
        }),
        (e.prototype.setOnError = function (t) {
          return (
            globalThis.__DEV__ !== !1 &&
              globalThis.__DEV__ !== !1 &&
              I.warn(50),
            (this.onError = t),
            this
          );
        }),
        e
      );
    })(),
    ku = ma.execute;
  function KE(e) {
    var t,
      n = e[Symbol.asyncIterator]();
    return (
      (t = {
        next: function () {
          return n.next();
        },
      }),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t
    );
  }
  function JE(e) {
    var t = null,
      n = null,
      r = !1,
      i = [],
      a = [];
    function o(f) {
      if (!n) {
        if (a.length) {
          var d = a.shift();
          if (Array.isArray(d) && d[0]) return d[0]({ value: f, done: !1 });
        }
        i.push(f);
      }
    }
    function s(f) {
      n = f;
      var d = a.slice();
      (d.forEach(function (h) {
        h[1](f);
      }),
        !t || t());
    }
    function l() {
      r = !0;
      var f = a.slice();
      (f.forEach(function (d) {
        d[0]({ value: void 0, done: !0 });
      }),
        !t || t());
    }
    ((t = function () {
      ((t = null),
        e.removeListener("data", o),
        e.removeListener("error", s),
        e.removeListener("end", l),
        e.removeListener("finish", l),
        e.removeListener("close", l));
    }),
      e.on("data", o),
      e.on("error", s),
      e.on("end", l),
      e.on("finish", l),
      e.on("close", l));
    function u() {
      return new Promise(function (f, d) {
        if (n) return d(n);
        if (i.length) return f({ value: i.shift(), done: !1 });
        if (r) return f({ value: void 0, done: !0 });
        a.push([f, d]);
      });
    }
    var c = {
      next: function () {
        return u();
      },
    };
    return (
      fs &&
        (c[Symbol.asyncIterator] = function () {
          return this;
        }),
      c
    );
  }
  function ZE(e) {
    var t = !1,
      n = {
        next: function () {
          return t
            ? Promise.resolve({ value: void 0, done: !0 })
            : ((t = !0),
              new Promise(function (r, i) {
                e.then(function (a) {
                  r({ value: a, done: !1 });
                }).catch(i);
              }));
        },
      };
    return (
      fs &&
        (n[Symbol.asyncIterator] = function () {
          return this;
        }),
      n
    );
  }
  function Zd(e) {
    var t = {
      next: function () {
        return e.read();
      },
    };
    return (
      fs &&
        (t[Symbol.asyncIterator] = function () {
          return this;
        }),
      t
    );
  }
  function e2(e) {
    return !!e.body;
  }
  function t2(e) {
    return !!e.getReader;
  }
  function n2(e) {
    return !!(fs && e[Symbol.asyncIterator]);
  }
  function r2(e) {
    return !!e.stream;
  }
  function i2(e) {
    return !!e.arrayBuffer;
  }
  function a2(e) {
    return !!e.pipe;
  }
  function o2(e) {
    var t = e;
    if ((e2(e) && (t = e.body), n2(t))) return KE(t);
    if (t2(t)) return Zd(t.getReader());
    if (r2(t)) return Zd(t.stream().getReader());
    if (i2(t)) return ZE(t.arrayBuffer());
    if (a2(t)) return JE(t);
    throw new Error(
      "Unknown body type for responseIterator. Please pass a streamable response.",
    );
  }
  var tf = Symbol();
  function s2(e) {
    return e.extensions ? Array.isArray(e.extensions[tf]) : !1;
  }
  function ag(e) {
    return e.hasOwnProperty("graphQLErrors");
  }
  var l2 = function (e) {
      var t = Ie(
        Ie(Ie([], e.graphQLErrors, !0), e.clientErrors, !0),
        e.protocolErrors,
        !0,
      );
      return (
        e.networkError && t.push(e.networkError),
        t.map(function (n) {
          return (ce(n) && n.message) || "Error message not found.";
        }).join(`
`)
      );
    },
    Ft = (function (e) {
      Dt(t, e);
      function t(n) {
        var r = n.graphQLErrors,
          i = n.protocolErrors,
          a = n.clientErrors,
          o = n.networkError,
          s = n.errorMessage,
          l = n.extraInfo,
          u = e.call(this, s) || this;
        return (
          (u.name = "ApolloError"),
          (u.graphQLErrors = r || []),
          (u.protocolErrors = i || []),
          (u.clientErrors = a || []),
          (u.networkError = o || null),
          (u.message = s || l2(u)),
          (u.extraInfo = l),
          (u.cause =
            Ie(Ie(Ie([o], r || [], !0), i || [], !0), a || [], !0).find(
              function (c) {
                return !!c;
              },
            ) || null),
          (u.__proto__ = t.prototype),
          u
        );
      }
      return t;
    })(Error),
    ep = Object.prototype.hasOwnProperty;
  function u2(e, t) {
    return Jt(this, void 0, void 0, function () {
      var n,
        r,
        i,
        a,
        o,
        s,
        l,
        u,
        c,
        f,
        d,
        h,
        v,
        y,
        S,
        p,
        m,
        g,
        E,
        x,
        b,
        k,
        T,
        R;
      return Zt(this, function (j) {
        switch (j.label) {
          case 0:
            if (TextDecoder === void 0)
              throw new Error(
                "TextDecoder must be defined in the environment: please import a polyfill.",
              );
            ((n = new TextDecoder("utf-8")),
              (r =
                (R = e.headers) === null || R === void 0
                  ? void 0
                  : R.get("content-type")),
              (i = "boundary="),
              (a =
                r != null && r.includes(i)
                  ? r == null
                    ? void 0
                    : r
                        .substring(
                          (r == null ? void 0 : r.indexOf(i)) + i.length,
                        )
                        .replace(/['"]/g, "")
                        .replace(/\;(.*)/gm, "")
                        .trim()
                  : "-"),
              (o = `\r
--`.concat(a)),
              (s = ""),
              (l = o2(e)),
              (u = !0),
              (j.label = 1));
          case 1:
            return u ? [4, l.next()] : [3, 3];
          case 2:
            for (
              c = j.sent(),
                f = c.value,
                d = c.done,
                h = typeof f == "string" ? f : n.decode(f),
                v = s.length - o.length + 1,
                u = !d,
                s += h,
                y = s.indexOf(o, v);
              y > -1;
            ) {
              if (
                ((S = void 0),
                (k = [s.slice(0, y), s.slice(y + o.length)]),
                (S = k[0]),
                (s = k[1]),
                (p = S.indexOf(`\r
\r
`)),
                (m = c2(S.slice(0, p))),
                (g = m["content-type"]),
                g && g.toLowerCase().indexOf("application/json") === -1)
              )
                throw new Error(
                  "Unsupported patch content type: application/json is required.",
                );
              if (((E = S.slice(p)), E)) {
                if (
                  ((x = og(e, E)),
                  Object.keys(x).length > 1 ||
                    "data" in x ||
                    "incremental" in x ||
                    "errors" in x ||
                    "payload" in x)
                )
                  if (QE(x)) {
                    if (((b = {}), "payload" in x)) {
                      if (Object.keys(x).length === 1 && x.payload === null)
                        return [2];
                      b = _({}, x.payload);
                    }
                    ("errors" in x &&
                      (b = _(_({}, b), {
                        extensions: _(
                          _({}, "extensions" in b ? b.extensions : null),
                          ((T = {}), (T[tf] = x.errors), T),
                        ),
                      })),
                      t(b));
                  } else t(x);
                else if (
                  Object.keys(x).length === 1 &&
                  "hasNext" in x &&
                  !x.hasNext
                )
                  return [2];
              }
              y = s.indexOf(o);
            }
            return [3, 1];
          case 3:
            return [2];
        }
      });
    });
  }
  function c2(e) {
    var t = {};
    return (
      e
        .split(
          `
`,
        )
        .forEach(function (n) {
          var r = n.indexOf(":");
          if (r > -1) {
            var i = n.slice(0, r).trim().toLowerCase(),
              a = n.slice(r + 1).trim();
            t[i] = a;
          }
        }),
      t
    );
  }
  function og(e, t) {
    if (e.status >= 300) {
      var n = function () {
        try {
          return JSON.parse(t);
        } catch {
          return t;
        }
      };
      ig(
        e,
        n(),
        "Response not successful: Received status code ".concat(e.status),
      );
    }
    try {
      return JSON.parse(t);
    } catch (i) {
      var r = i;
      throw (
        (r.name = "ServerParseError"),
        (r.response = e),
        (r.statusCode = e.status),
        (r.bodyText = t),
        r
      );
    }
  }
  function f2(e, t) {
    (e.result && e.result.errors && e.result.data && t.next(e.result),
      t.error(e));
  }
  function d2(e) {
    return function (t) {
      return t
        .text()
        .then(function (n) {
          return og(t, n);
        })
        .then(function (n) {
          return (
            !Array.isArray(n) &&
              !ep.call(n, "data") &&
              !ep.call(n, "errors") &&
              ig(
                t,
                n,
                "Server response was missing for query '".concat(
                  Array.isArray(e)
                    ? e.map(function (r) {
                        return r.operationName;
                      })
                    : e.operationName,
                  "'.",
                ),
              ),
            n
          );
        });
    };
  }
  var Cu = function (e, t) {
      var n;
      try {
        n = JSON.stringify(e);
      } catch (i) {
        var r = je(54, t, i.message);
        throw ((r.parseError = i), r);
      }
      return n;
    },
    p2 = { includeQuery: !0, includeExtensions: !1, preserveHeaderCase: !1 },
    h2 = { accept: "*/*", "content-type": "application/json" },
    m2 = { method: "POST" },
    v2 = { http: p2, headers: h2, options: m2 },
    g2 = function (e, t) {
      return t(e);
    };
  function y2(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
    var i = {},
      a = {};
    (n.forEach(function (f) {
      ((i = _(_(_({}, i), f.options), {
        headers: _(_({}, i.headers), f.headers),
      })),
        f.credentials && (i.credentials = f.credentials),
        (a = _(_({}, a), f.http)));
    }),
      i.headers && (i.headers = w2(i.headers, a.preserveHeaderCase)));
    var o = e.operationName,
      s = e.extensions,
      l = e.variables,
      u = e.query,
      c = { operationName: o, variables: l };
    return (
      a.includeExtensions && (c.extensions = s),
      a.includeQuery && (c.query = t(u, jn)),
      { options: i, body: c }
    );
  }
  function w2(e, t) {
    if (!t) {
      var n = {};
      return (
        Object.keys(Object(e)).forEach(function (a) {
          n[a.toLowerCase()] = e[a];
        }),
        n
      );
    }
    var r = {};
    Object.keys(Object(e)).forEach(function (a) {
      r[a.toLowerCase()] = { originalName: a, value: e[a] };
    });
    var i = {};
    return (
      Object.keys(r).forEach(function (a) {
        i[r[a].originalName] = r[a].value;
      }),
      i
    );
  }
  var S2 = function (e) {
      if (!e && typeof fetch > "u") throw je(51);
    },
    E2 = function (e, t) {
      var n = e.getContext(),
        r = n.uri;
      return r || (typeof t == "function" ? t(e) : t || "/graphql");
    };
  function x2(e, t) {
    var n = [],
      r = function (f, d) {
        n.push("".concat(f, "=").concat(encodeURIComponent(d)));
      };
    if (
      ("query" in t && r("query", t.query),
      t.operationName && r("operationName", t.operationName),
      t.variables)
    ) {
      var i = void 0;
      try {
        i = Cu(t.variables, "Variables map");
      } catch (f) {
        return { parseError: f };
      }
      r("variables", i);
    }
    if (t.extensions) {
      var a = void 0;
      try {
        a = Cu(t.extensions, "Extensions map");
      } catch (f) {
        return { parseError: f };
      }
      r("extensions", a);
    }
    var o = "",
      s = e,
      l = e.indexOf("#");
    l !== -1 && ((o = e.substr(l)), (s = e.substr(0, l)));
    var u = s.indexOf("?") === -1 ? "?" : "&",
      c = s + u + n.join("&") + o;
    return { newURI: c };
  }
  var tp = vt(function () {
      return fetch;
    }),
    b2 = function (e) {
      e === void 0 && (e = {});
      var t = e.uri,
        n = t === void 0 ? "/graphql" : t,
        r = e.fetch,
        i = e.print,
        a = i === void 0 ? g2 : i,
        o = e.includeExtensions,
        s = e.preserveHeaderCase,
        l = e.useGETForQueries,
        u = e.includeUnusedVariables,
        c = u === void 0 ? !1 : u,
        f = wt(e, [
          "uri",
          "fetch",
          "print",
          "includeExtensions",
          "preserveHeaderCase",
          "useGETForQueries",
          "includeUnusedVariables",
        ]);
      globalThis.__DEV__ !== !1 && S2(r || tp);
      var d = {
        http: { includeExtensions: o, preserveHeaderCase: s },
        options: f.fetchOptions,
        credentials: f.credentials,
        headers: f.headers,
      };
      return new ma(function (h) {
        var v = E2(h, n),
          y = h.getContext(),
          S = {};
        if (y.clientAwareness) {
          var p = y.clientAwareness,
            m = p.name,
            g = p.version;
          (m && (S["apollographql-client-name"] = m),
            g && (S["apollographql-client-version"] = g));
        }
        var E = _(_({}, S), y.headers),
          x = {
            http: y.http,
            options: y.fetchOptions,
            credentials: y.credentials,
            headers: E,
          };
        if (ea(["client"], h.query)) {
          globalThis.__DEV__ !== !1 && globalThis.__DEV__ !== !1 && I.warn(52);
          var b = Kv(h.query);
          if (!b)
            return tl(
              new Error(
                "HttpLink: Trying to send a client-only query to the server. To send to the server, ensure a non-client field is added to the query or set the `transformOptions.removeClientFields` option to `true`.",
              ),
            );
          h.query = b;
        }
        var k = y2(h, a, v2, d, x),
          T = k.options,
          R = k.body;
        R.variables && !c && (R.variables = HE(R.variables, h.query));
        var j;
        !T.signal &&
          typeof AbortController < "u" &&
          ((j = new AbortController()), (T.signal = j.signal));
        var M = function (L) {
            return (
              L.kind === "OperationDefinition" && L.operation === "mutation"
            );
          },
          A = function (L) {
            return (
              L.kind === "OperationDefinition" && L.operation === "subscription"
            );
          },
          B = A(pa(h.query)),
          Y = ea(["defer"], h.query);
        if ((l && !h.query.definitions.some(M) && (T.method = "GET"), Y || B)) {
          T.headers = T.headers || {};
          var Ue = "multipart/mixed;";
          (B && Y && globalThis.__DEV__ !== !1 && I.warn(53),
            B
              ? (Ue += "boundary=graphql;subscriptionSpec=1.0,application/json")
              : Y && (Ue += "deferSpec=20220824,application/json"),
            (T.headers.accept = Ue));
        }
        if (T.method === "GET") {
          var Q = x2(v, R),
            ye = Q.newURI,
            D = Q.parseError;
          if (D) return tl(D);
          v = ye;
        } else
          try {
            T.body = Cu(R, "Payload");
          } catch (L) {
            return tl(L);
          }
        return new te(function (L) {
          var U =
              r ||
              vt(function () {
                return fetch;
              }) ||
              tp,
            Z = L.next.bind(L);
          return (
            U(v, T)
              .then(function (ee) {
                var xt;
                h.setContext({ response: ee });
                var bt =
                  (xt = ee.headers) === null || xt === void 0
                    ? void 0
                    : xt.get("content-type");
                return bt !== null && /^multipart\/mixed/i.test(bt)
                  ? u2(ee, Z)
                  : d2(h)(ee).then(Z);
              })
              .then(function () {
                ((j = void 0), L.complete());
              })
              .catch(function (ee) {
                ((j = void 0), f2(ee, L));
              }),
            function () {
              j && j.abort();
            }
          );
        });
      });
    },
    _2 = (function (e) {
      Dt(t, e);
      function t(n) {
        n === void 0 && (n = {});
        var r = e.call(this, b2(n).request) || this;
        return ((r.options = n), r);
      }
      return t;
    })(ma);
  const { toString: np, hasOwnProperty: T2 } = Object.prototype,
    rp = Function.prototype.toString,
    Ou = new Map();
  function K(e, t) {
    try {
      return Nu(e, t);
    } finally {
      Ou.clear();
    }
  }
  function Nu(e, t) {
    if (e === t) return !0;
    const n = np.call(e),
      r = np.call(t);
    if (n !== r) return !1;
    switch (n) {
      case "[object Array]":
        if (e.length !== t.length) return !1;
      case "[object Object]": {
        if (ap(e, t)) return !0;
        const i = ip(e),
          a = ip(t),
          o = i.length;
        if (o !== a.length) return !1;
        for (let s = 0; s < o; ++s) if (!T2.call(t, i[s])) return !1;
        for (let s = 0; s < o; ++s) {
          const l = i[s];
          if (!Nu(e[l], t[l])) return !1;
        }
        return !0;
      }
      case "[object Error]":
        return e.name === t.name && e.message === t.message;
      case "[object Number]":
        if (e !== e) return t !== t;
      case "[object Boolean]":
      case "[object Date]":
        return +e == +t;
      case "[object RegExp]":
      case "[object String]":
        return e == `${t}`;
      case "[object Map]":
      case "[object Set]": {
        if (e.size !== t.size) return !1;
        if (ap(e, t)) return !0;
        const i = e.entries(),
          a = n === "[object Map]";
        for (;;) {
          const o = i.next();
          if (o.done) break;
          const [s, l] = o.value;
          if (!t.has(s) || (a && !Nu(l, t.get(s)))) return !1;
        }
        return !0;
      }
      case "[object Uint16Array]":
      case "[object Uint8Array]":
      case "[object Uint32Array]":
      case "[object Int32Array]":
      case "[object Int8Array]":
      case "[object Int16Array]":
      case "[object ArrayBuffer]":
        ((e = new Uint8Array(e)), (t = new Uint8Array(t)));
      case "[object DataView]": {
        let i = e.byteLength;
        if (i === t.byteLength) for (; i-- && e[i] === t[i];);
        return i === -1;
      }
      case "[object AsyncFunction]":
      case "[object GeneratorFunction]":
      case "[object AsyncGeneratorFunction]":
      case "[object Function]": {
        const i = rp.call(e);
        return i !== rp.call(t) ? !1 : !O2(i, C2);
      }
    }
    return !1;
  }
  function ip(e) {
    return Object.keys(e).filter(k2, e);
  }
  function k2(e) {
    return this[e] !== void 0;
  }
  const C2 = "{ [native code] }";
  function O2(e, t) {
    const n = e.length - t.length;
    return n >= 0 && e.indexOf(t, n) === n;
  }
  function ap(e, t) {
    let n = Ou.get(e);
    if (n) {
      if (n.has(t)) return !0;
    } else Ou.set(e, (n = new Set()));
    return (n.add(t), !1);
  }
  function sg(e, t, n, r) {
    var i = t.data,
      a = wt(t, ["data"]),
      o = n.data,
      s = wt(n, ["data"]);
    return (
      K(a, s) &&
      ro(pa(e).selectionSet, i, o, { fragmentMap: Yr(Kr(e)), variables: r })
    );
  }
  function ro(e, t, n, r) {
    if (t === n) return !0;
    var i = new Set();
    return e.selections.every(function (a) {
      if (i.has(a) || (i.add(a), !da(a, r.variables)) || op(a)) return !0;
      if (bn(a)) {
        var o = qt(a),
          s = t && t[o],
          l = n && n[o],
          u = a.selectionSet;
        if (!u) return K(s, l);
        var c = Array.isArray(s),
          f = Array.isArray(l);
        if (c !== f) return !1;
        if (c && f) {
          var d = s.length;
          if (l.length !== d) return !1;
          for (var h = 0; h < d; ++h) if (!ro(u, s[h], l[h], r)) return !1;
          return !0;
        }
        return ro(u, s, l, r);
      } else {
        var v = ds(a, r.fragmentMap);
        if (v) return op(v) ? !0 : ro(v.selectionSet, t, n, r);
      }
    });
  }
  function op(e) {
    return !!e.directives && e.directives.some(N2);
  }
  function N2(e) {
    return e.name.value === "nonreactive";
  }
  var lg = rr ? WeakMap : Map,
    ug = Qc ? WeakSet : Set,
    nf = new ha(),
    sp = !1;
  function cg() {
    sp || ((sp = !0), globalThis.__DEV__ !== !1 && I.warn(64));
  }
  function fg(e, t, n) {
    return nf.withValue(!0, function () {
      var r = yi(e, t, n, !1);
      return (Object.isFrozen(e) && Qr(r), r);
    });
  }
  function P2(e, t) {
    if (t.has(e)) return t.get(e);
    var n = Array.isArray(e) ? [] : Object.create(null);
    return (t.set(e, n), n);
  }
  function yi(e, t, n, r, i) {
    var a,
      o = n.knownChanged,
      s = P2(e, n.mutableTargets);
    if (Array.isArray(e)) {
      for (var l = 0, u = Array.from(e.entries()); l < u.length; l++) {
        var c = u[l],
          f = c[0],
          d = c[1];
        if (d === null) {
          s[f] = null;
          continue;
        }
        var h = yi(
          d,
          t,
          n,
          r,
          globalThis.__DEV__ !== !1
            ? "".concat(i || "", "[").concat(f, "]")
            : void 0,
        );
        (o.has(h) && o.add(s), (s[f] = h));
      }
      return o.has(s) ? s : e;
    }
    for (var v = 0, y = t.selections; v < y.length; v++) {
      var S = y[v],
        p = void 0;
      if ((r && o.add(s), S.kind === F.FIELD)) {
        var m = qt(S),
          g = S.selectionSet;
        if (((p = s[m] || e[m]), p === void 0)) continue;
        if (g && p !== null) {
          var h = yi(
            e[m],
            g,
            n,
            r,
            globalThis.__DEV__ !== !1
              ? "".concat(i || "", ".").concat(m)
              : void 0,
          );
          o.has(h) && (p = h);
        }
        (globalThis.__DEV__ === !1 && (s[m] = p),
          globalThis.__DEV__ !== !1 &&
            (r &&
            m !== "__typename" &&
            !(
              !(
                (a = Object.getOwnPropertyDescriptor(s, m)) === null ||
                a === void 0
              ) && a.value
            )
              ? Object.defineProperty(
                  s,
                  m,
                  I2(m, p, i || "", n.operationName, n.operationType),
                )
              : (delete s[m], (s[m] = p))));
      }
      if (
        (S.kind === F.INLINE_FRAGMENT &&
          (!S.typeCondition || n.cache.fragmentMatches(S, e.__typename)) &&
          (p = yi(e, S.selectionSet, n, r, i)),
        S.kind === F.FRAGMENT_SPREAD)
      ) {
        var E = S.name.value,
          x =
            n.fragmentMap[E] || (n.fragmentMap[E] = n.cache.lookupFragment(E));
        I(x, 59, E);
        var b = TS(S);
        b !== "mask" && (p = yi(e, x.selectionSet, n, b === "migrate", i));
      }
      o.has(p) && o.add(s);
    }
    return (
      "__typename" in e &&
        !("__typename" in s) &&
        (s.__typename = e.__typename),
      Object.keys(s).length !== Object.keys(e).length && o.add(s),
      o.has(s) ? s : e
    );
  }
  function I2(e, t, n, r, i) {
    var a = function () {
      return (
        nf.getValue() ||
          (globalThis.__DEV__ !== !1 &&
            I.warn(
              60,
              r ? "".concat(i, " '").concat(r, "'") : "anonymous ".concat(i),
              "".concat(n, ".").concat(e).replace(/^\./, ""),
            ),
          (a = function () {
            return t;
          })),
        t
      );
    };
    return {
      get: function () {
        return a();
      },
      set: function (o) {
        a = function () {
          return o;
        };
      },
      enumerable: !0,
      configurable: !0,
    };
  }
  function dg(e, t, n, r) {
    if (!n.fragmentMatches) return (globalThis.__DEV__ !== !1 && cg(), e);
    var i = t.definitions.filter(function (o) {
      return o.kind === F.FRAGMENT_DEFINITION;
    });
    typeof r > "u" && (I(i.length === 1, 61, i.length), (r = i[0].name.value));
    var a = i.find(function (o) {
      return o.name.value === r;
    });
    return (
      I(!!a, 62, r),
      e == null || K(e, {})
        ? e
        : fg(e, a.selectionSet, {
            operationType: "fragment",
            operationName: a.name.value,
            fragmentMap: Yr(Kr(t)),
            cache: n,
            mutableTargets: new lg(),
            knownChanged: new ug(),
          })
    );
  }
  function D2(e, t, n) {
    var r;
    if (!n.fragmentMatches) return (globalThis.__DEV__ !== !1 && cg(), e);
    var i = Yn(t);
    return (
      I(i, 63),
      e == null
        ? e
        : fg(e, i.selectionSet, {
            operationType: i.operation,
            operationName:
              (r = i.name) === null || r === void 0 ? void 0 : r.value,
            fragmentMap: Yr(Kr(t)),
            cache: n,
            mutableTargets: new lg(),
            knownChanged: new ug(),
          })
    );
  }
  var pg = (function () {
    function e() {
      ((this.assumeImmutableResults = !1),
        (this.getFragmentDoc = na(MS, {
          max: It["cache.fragmentQueryDocuments"] || 1e3,
          cache: Fo,
        })));
    }
    return (
      (e.prototype.lookupFragment = function (t) {
        return null;
      }),
      (e.prototype.batch = function (t) {
        var n = this,
          r =
            typeof t.optimistic == "string"
              ? t.optimistic
              : t.optimistic === !1
                ? null
                : void 0,
          i;
        return (
          this.performTransaction(function () {
            return (i = t.update(n));
          }, r),
          i
        );
      }),
      (e.prototype.recordOptimisticTransaction = function (t, n) {
        this.performTransaction(t, n);
      }),
      (e.prototype.transformDocument = function (t) {
        return t;
      }),
      (e.prototype.transformForLink = function (t) {
        return t;
      }),
      (e.prototype.identify = function (t) {}),
      (e.prototype.gc = function () {
        return [];
      }),
      (e.prototype.modify = function (t) {
        return !1;
      }),
      (e.prototype.readQuery = function (t, n) {
        var r = this;
        return (
          n === void 0 && (n = !!t.optimistic),
          globalThis.__DEV__ !== !1 &&
            de(t, "canonizeResults", "cache.readQuery"),
          ke("canonizeResults", function () {
            return r.read(
              _(_({}, t), { rootId: t.id || "ROOT_QUERY", optimistic: n }),
            );
          })
        );
      }),
      (e.prototype.watchFragment = function (t) {
        var n = this,
          r = t.fragment,
          i = t.fragmentName,
          a = t.from,
          o = t.optimistic,
          s = o === void 0 ? !0 : o,
          l = wt(t, ["fragment", "fragmentName", "from", "optimistic"]),
          u = this.getFragmentDoc(r, i),
          c = typeof a > "u" || typeof a == "string" ? a : this.identify(a),
          f = !!t[Symbol.for("apollo.dataMasking")];
        if (globalThis.__DEV__ !== !1) {
          var d = i || Fv(r).name.value;
          c || (globalThis.__DEV__ !== !1 && I.warn(1, d));
        }
        var h = _(_({}, l), {
            returnPartialData: !0,
            id: c,
            query: u,
            optimistic: s,
          }),
          v;
        return new te(function (y) {
          return n.watch(
            _(_({}, h), {
              immediate: !0,
              callback: function (S) {
                var p = f ? dg(S.result, r, n, i) : S.result;
                if (!(
                  v && sg(u, { data: v.result }, { data: p }, t.variables)
                )) {
                  var m = { data: p, complete: !!S.complete };
                  (S.missing &&
                    (m.missing = vs(
                      S.missing.map(function (g) {
                        return g.missing;
                      }),
                    )),
                    (v = _(_({}, S), { result: p })),
                    y.next(m));
                }
              },
            }),
          );
        });
      }),
      (e.prototype.readFragment = function (t, n) {
        var r = this;
        return (
          n === void 0 && (n = !!t.optimistic),
          globalThis.__DEV__ !== !1 &&
            de(t, "canonizeResults", "cache.readFragment"),
          ke("canonizeResults", function () {
            return r.read(
              _(_({}, t), {
                query: r.getFragmentDoc(t.fragment, t.fragmentName),
                rootId: t.id,
                optimistic: n,
              }),
            );
          })
        );
      }),
      (e.prototype.writeQuery = function (t) {
        var n = t.id,
          r = t.data,
          i = wt(t, ["id", "data"]);
        return this.write(
          Object.assign(i, { dataId: n || "ROOT_QUERY", result: r }),
        );
      }),
      (e.prototype.writeFragment = function (t) {
        var n = t.id,
          r = t.data,
          i = t.fragment,
          a = t.fragmentName,
          o = wt(t, ["id", "data", "fragment", "fragmentName"]);
        return this.write(
          Object.assign(o, {
            query: this.getFragmentDoc(i, a),
            dataId: n,
            result: r,
          }),
        );
      }),
      (e.prototype.updateQuery = function (t, n) {
        return (
          globalThis.__DEV__ !== !1 &&
            de(t, "canonizeResults", "cache.updateQuery"),
          this.batch({
            update: function (r) {
              var i = ke("canonizeResults", function () {
                  return r.readQuery(t);
                }),
                a = n(i);
              return a == null
                ? i
                : (r.writeQuery(_(_({}, t), { data: a })), a);
            },
          })
        );
      }),
      (e.prototype.updateFragment = function (t, n) {
        return (
          globalThis.__DEV__ !== !1 &&
            de(t, "canonizeResults", "cache.updateFragment"),
          this.batch({
            update: function (r) {
              var i = ke("canonizeResults", function () {
                  return r.readFragment(t);
                }),
                a = n(i);
              return a == null
                ? i
                : (r.writeFragment(_(_({}, t), { data: a })), a);
            },
          })
        );
      }),
      e
    );
  })();
  globalThis.__DEV__ !== !1 && (pg.prototype.getMemoryInternals = qS);
  var hg = (function (e) {
      Dt(t, e);
      function t(n, r, i, a) {
        var o,
          s = e.call(this, n) || this;
        if (
          ((s.message = n),
          (s.path = r),
          (s.query = i),
          (s.variables = a),
          Array.isArray(s.path))
        ) {
          s.missing = s.message;
          for (var l = s.path.length - 1; l >= 0; --l)
            s.missing = ((o = {}), (o[s.path[l]] = s.missing), o);
        } else s.missing = s.path;
        return ((s.__proto__ = t.prototype), s);
      }
      return t;
    })(Error),
    xe = Object.prototype.hasOwnProperty;
  function ui(e) {
    return e == null;
  }
  function mg(e, t) {
    var n = e.__typename,
      r = e.id,
      i = e._id;
    if (
      typeof n == "string" &&
      (t && (t.keyObject = ui(r) ? (ui(i) ? void 0 : { _id: i }) : { id: r }),
      ui(r) && !ui(i) && (r = i),
      !ui(r))
    )
      return ""
        .concat(n, ":")
        .concat(
          typeof r == "number" || typeof r == "string" ? r : JSON.stringify(r),
        );
  }
  var vg = {
    dataIdFromObject: mg,
    addTypename: !0,
    resultCaching: !0,
    canonizeResults: !1,
  };
  function M2(e) {
    return Xn(vg, e);
  }
  function gg(e) {
    var t = e.canonizeResults;
    return t === void 0 ? vg.canonizeResults : t;
  }
  function R2(e, t) {
    return X(t) ? e.get(t.__ref, "__typename") : t && t.__typename;
  }
  var yg = /^[_a-z][_0-9a-z]*/i;
  function kn(e) {
    var t = e.match(yg);
    return t ? t[0] : e;
  }
  function Pu(e, t, n) {
    return ce(t)
      ? fe(t)
        ? t.every(function (r) {
            return Pu(e, r, n);
          })
        : e.selections.every(function (r) {
            if (bn(r) && da(r, n)) {
              var i = qt(r);
              return (
                xe.call(t, i) &&
                (!r.selectionSet || Pu(r.selectionSet, t[i], n))
              );
            }
            return !0;
          })
      : !1;
  }
  function Er(e) {
    return ce(e) && !X(e) && !fe(e);
  }
  function L2() {
    return new Tn();
  }
  function wg(e, t) {
    var n = Yr(Kr(e));
    return {
      fragmentMap: n,
      lookupFragment: function (r) {
        var i = n[r];
        return (!i && t && (i = t.lookup(r)), i || null);
      },
    };
  }
  var io = Object.create(null),
    nl = function () {
      return io;
    },
    lp = Object.create(null),
    ra = (function () {
      function e(t, n) {
        var r = this;
        ((this.policies = t),
          (this.group = n),
          (this.data = Object.create(null)),
          (this.rootIds = Object.create(null)),
          (this.refs = Object.create(null)),
          (this.getFieldValue = function (i, a) {
            return Qr(X(i) ? r.get(i.__ref, a) : i && i[a]);
          }),
          (this.canRead = function (i) {
            return X(i) ? r.has(i.__ref) : typeof i == "object";
          }),
          (this.toReference = function (i, a) {
            if (typeof i == "string") return Pr(i);
            if (X(i)) return i;
            var o = r.policies.identify(i)[0];
            if (o) {
              var s = Pr(o);
              return (a && r.merge(o, i), s);
            }
          }));
      }
      return (
        (e.prototype.toObject = function () {
          return _({}, this.data);
        }),
        (e.prototype.has = function (t) {
          return this.lookup(t, !0) !== void 0;
        }),
        (e.prototype.get = function (t, n) {
          if ((this.group.depend(t, n), xe.call(this.data, t))) {
            var r = this.data[t];
            if (r && xe.call(r, n)) return r[n];
          }
          if (n === "__typename" && xe.call(this.policies.rootTypenamesById, t))
            return this.policies.rootTypenamesById[t];
          if (this instanceof Yt) return this.parent.get(t, n);
        }),
        (e.prototype.lookup = function (t, n) {
          if ((n && this.group.depend(t, "__exists"), xe.call(this.data, t)))
            return this.data[t];
          if (this instanceof Yt) return this.parent.lookup(t, n);
          if (this.policies.rootTypenamesById[t]) return Object.create(null);
        }),
        (e.prototype.merge = function (t, n) {
          var r = this,
            i;
          (X(t) && (t = t.__ref), X(n) && (n = n.__ref));
          var a = typeof t == "string" ? this.lookup((i = t)) : t,
            o = typeof n == "string" ? this.lookup((i = n)) : n;
          if (o) {
            I(typeof i == "string", 2);
            var s = new Tn(A2).merge(a, o);
            if (
              ((this.data[i] = s),
              s !== a && (delete this.refs[i], this.group.caching))
            ) {
              var l = Object.create(null);
              (a || (l.__exists = 1),
                Object.keys(o).forEach(function (u) {
                  if (!a || a[u] !== s[u]) {
                    l[u] = 1;
                    var c = kn(u);
                    (c !== u &&
                      !r.policies.hasKeyArgs(s.__typename, c) &&
                      (l[c] = 1),
                      s[u] === void 0 && !(r instanceof Yt) && delete s[u]);
                  }
                }),
                l.__typename &&
                  !(a && a.__typename) &&
                  this.policies.rootTypenamesById[i] === s.__typename &&
                  delete l.__typename,
                Object.keys(l).forEach(function (u) {
                  return r.group.dirty(i, u);
                }));
            }
          }
        }),
        (e.prototype.modify = function (t, n) {
          var r = this,
            i = this.lookup(t);
          if (i) {
            var a = Object.create(null),
              o = !1,
              s = !0,
              l = {
                DELETE: io,
                INVALIDATE: lp,
                isReference: X,
                toReference: this.toReference,
                canRead: this.canRead,
                readField: function (u, c) {
                  return r.policies.readField(
                    typeof u == "string"
                      ? { fieldName: u, from: c || Pr(t) }
                      : u,
                    { store: r },
                  );
                },
              };
            if (
              (Object.keys(i).forEach(function (u) {
                var c = kn(u),
                  f = i[u];
                if (f !== void 0) {
                  var d = typeof n == "function" ? n : n[u] || n[c];
                  if (d) {
                    var h =
                      d === nl
                        ? io
                        : d(
                            Qr(f),
                            _(_({}, l), {
                              fieldName: c,
                              storeFieldName: u,
                              storage: r.getStorage(t, u),
                            }),
                          );
                    if (h === lp) r.group.dirty(t, u);
                    else if (
                      (h === io && (h = void 0),
                      h !== f &&
                        ((a[u] = h),
                        (o = !0),
                        (f = h),
                        globalThis.__DEV__ !== !1))
                    ) {
                      var v = function (x) {
                        if (r.lookup(x.__ref) === void 0)
                          return (
                            globalThis.__DEV__ !== !1 && I.warn(3, x),
                            !0
                          );
                      };
                      if (X(h)) v(h);
                      else if (Array.isArray(h))
                        for (
                          var y = !1, S = void 0, p = 0, m = h;
                          p < m.length;
                          p++
                        ) {
                          var g = m[p];
                          if (X(g)) {
                            if (((y = !0), v(g))) break;
                          } else if (typeof g == "object" && g) {
                            var E = r.policies.identify(g)[0];
                            E && (S = g);
                          }
                          if (y && S !== void 0) {
                            globalThis.__DEV__ !== !1 && I.warn(4, S);
                            break;
                          }
                        }
                    }
                  }
                  f !== void 0 && (s = !1);
                }
              }),
              o)
            )
              return (
                this.merge(t, a),
                s &&
                  (this instanceof Yt
                    ? (this.data[t] = void 0)
                    : delete this.data[t],
                  this.group.dirty(t, "__exists")),
                !0
              );
          }
          return !1;
        }),
        (e.prototype.delete = function (t, n, r) {
          var i,
            a = this.lookup(t);
          if (a) {
            var o = this.getFieldValue(a, "__typename"),
              s =
                n && r
                  ? this.policies.getStoreFieldName({
                      typename: o,
                      fieldName: n,
                      args: r,
                    })
                  : n;
            return this.modify(t, s ? ((i = {}), (i[s] = nl), i) : nl);
          }
          return !1;
        }),
        (e.prototype.evict = function (t, n) {
          var r = !1;
          return (
            t.id &&
              (xe.call(this.data, t.id) &&
                (r = this.delete(t.id, t.fieldName, t.args)),
              this instanceof Yt &&
                this !== n &&
                (r = this.parent.evict(t, n) || r),
              (t.fieldName || r) &&
                this.group.dirty(t.id, t.fieldName || "__exists")),
            r
          );
        }),
        (e.prototype.clear = function () {
          this.replace(null);
        }),
        (e.prototype.extract = function () {
          var t = this,
            n = this.toObject(),
            r = [];
          return (
            this.getRootIdSet().forEach(function (i) {
              xe.call(t.policies.rootTypenamesById, i) || r.push(i);
            }),
            r.length && (n.__META = { extraRootIds: r.sort() }),
            n
          );
        }),
        (e.prototype.replace = function (t) {
          var n = this;
          if (
            (Object.keys(this.data).forEach(function (a) {
              (t && xe.call(t, a)) || n.delete(a);
            }),
            t)
          ) {
            var r = t.__META,
              i = wt(t, ["__META"]);
            (Object.keys(i).forEach(function (a) {
              n.merge(a, i[a]);
            }),
              r && r.extraRootIds.forEach(this.retain, this));
          }
        }),
        (e.prototype.retain = function (t) {
          return (this.rootIds[t] = (this.rootIds[t] || 0) + 1);
        }),
        (e.prototype.release = function (t) {
          if (this.rootIds[t] > 0) {
            var n = --this.rootIds[t];
            return (n || delete this.rootIds[t], n);
          }
          return 0;
        }),
        (e.prototype.getRootIdSet = function (t) {
          return (
            t === void 0 && (t = new Set()),
            Object.keys(this.rootIds).forEach(t.add, t),
            this instanceof Yt
              ? this.parent.getRootIdSet(t)
              : Object.keys(this.policies.rootTypenamesById).forEach(t.add, t),
            t
          );
        }),
        (e.prototype.gc = function () {
          var t = this,
            n = this.getRootIdSet(),
            r = this.toObject();
          n.forEach(function (o) {
            xe.call(r, o) &&
              (Object.keys(t.findChildRefIds(o)).forEach(n.add, n),
              delete r[o]);
          });
          var i = Object.keys(r);
          if (i.length) {
            for (var a = this; a instanceof Yt;) a = a.parent;
            i.forEach(function (o) {
              return a.delete(o);
            });
          }
          return i;
        }),
        (e.prototype.findChildRefIds = function (t) {
          if (!xe.call(this.refs, t)) {
            var n = (this.refs[t] = Object.create(null)),
              r = this.data[t];
            if (!r) return n;
            var i = new Set([r]);
            i.forEach(function (a) {
              (X(a) && (n[a.__ref] = !0),
                ce(a) &&
                  Object.keys(a).forEach(function (o) {
                    var s = a[o];
                    ce(s) && i.add(s);
                  }));
            });
          }
          return this.refs[t];
        }),
        (e.prototype.makeCacheKey = function () {
          return this.group.keyMaker.lookupArray(arguments);
        }),
        e
      );
    })(),
    Sg = (function () {
      function e(t, n) {
        (n === void 0 && (n = null),
          (this.caching = t),
          (this.parent = n),
          (this.d = null),
          this.resetCaching());
      }
      return (
        (e.prototype.resetCaching = function () {
          ((this.d = this.caching ? Hv() : null), (this.keyMaker = new Ht(rr)));
        }),
        (e.prototype.depend = function (t, n) {
          if (this.d) {
            this.d(rl(t, n));
            var r = kn(n);
            (r !== n && this.d(rl(t, r)),
              this.parent && this.parent.depend(t, n));
          }
        }),
        (e.prototype.dirty = function (t, n) {
          this.d &&
            this.d.dirty(rl(t, n), n === "__exists" ? "forget" : "setDirty");
        }),
        e
      );
    })();
  function rl(e, t) {
    return t + "#" + e;
  }
  function up(e, t) {
    Pi(e) && e.group.depend(t, "__exists");
  }
  (function (e) {
    var t = (function (n) {
      Dt(r, n);
      function r(i) {
        var a = i.policies,
          o = i.resultCaching,
          s = o === void 0 ? !0 : o,
          l = i.seed,
          u = n.call(this, a, new Sg(s)) || this;
        return (
          (u.stump = new F2(u)),
          (u.storageTrie = new Ht(rr)),
          l && u.replace(l),
          u
        );
      }
      return (
        (r.prototype.addLayer = function (i, a) {
          return this.stump.addLayer(i, a);
        }),
        (r.prototype.removeLayer = function () {
          return this;
        }),
        (r.prototype.getStorage = function () {
          return this.storageTrie.lookupArray(arguments);
        }),
        r
      );
    })(e);
    e.Root = t;
  })(ra || (ra = {}));
  var Yt = (function (e) {
      Dt(t, e);
      function t(n, r, i, a) {
        var o = e.call(this, r.policies, a) || this;
        return (
          (o.id = n),
          (o.parent = r),
          (o.replay = i),
          (o.group = a),
          i(o),
          o
        );
      }
      return (
        (t.prototype.addLayer = function (n, r) {
          return new t(n, this, r, this.group);
        }),
        (t.prototype.removeLayer = function (n) {
          var r = this,
            i = this.parent.removeLayer(n);
          return n === this.id
            ? (this.group.caching &&
                Object.keys(this.data).forEach(function (a) {
                  var o = r.data[a],
                    s = i.lookup(a);
                  s
                    ? o
                      ? o !== s &&
                        Object.keys(o).forEach(function (l) {
                          K(o[l], s[l]) || r.group.dirty(a, l);
                        })
                      : (r.group.dirty(a, "__exists"),
                        Object.keys(s).forEach(function (l) {
                          r.group.dirty(a, l);
                        }))
                    : r.delete(a);
                }),
              i)
            : i === this.parent
              ? this
              : i.addLayer(this.id, this.replay);
        }),
        (t.prototype.toObject = function () {
          return _(_({}, this.parent.toObject()), this.data);
        }),
        (t.prototype.findChildRefIds = function (n) {
          var r = this.parent.findChildRefIds(n);
          return xe.call(this.data, n)
            ? _(_({}, r), e.prototype.findChildRefIds.call(this, n))
            : r;
        }),
        (t.prototype.getStorage = function () {
          for (var n = this.parent; n.parent;) n = n.parent;
          return n.getStorage.apply(n, arguments);
        }),
        t
      );
    })(ra),
    F2 = (function (e) {
      Dt(t, e);
      function t(n) {
        return (
          e.call(
            this,
            "EntityStore.Stump",
            n,
            function () {},
            new Sg(n.group.caching, n.group),
          ) || this
        );
      }
      return (
        (t.prototype.removeLayer = function () {
          return this;
        }),
        (t.prototype.merge = function (n, r) {
          return this.parent.merge(n, r);
        }),
        t
      );
    })(Yt);
  function A2(e, t, n) {
    var r = e[n],
      i = t[n];
    return K(r, i) ? r : i;
  }
  function Pi(e) {
    return !!(e instanceof ra && e.group.caching);
  }
  function z2(e) {
    return ce(e)
      ? fe(e)
        ? e.slice(0)
        : _({ __proto__: Object.getPrototypeOf(e) }, e)
      : e;
  }
  var cp = (function () {
    function e() {
      ((this.known = new (Qc ? WeakSet : Set)()),
        (this.pool = new Ht(rr)),
        (this.passes = new WeakMap()),
        (this.keysByJSON = new Map()),
        (this.empty = this.admit({})));
    }
    return (
      (e.prototype.isKnown = function (t) {
        return ce(t) && this.known.has(t);
      }),
      (e.prototype.pass = function (t) {
        if (ce(t)) {
          var n = z2(t);
          return (this.passes.set(n, t), n);
        }
        return t;
      }),
      (e.prototype.admit = function (t) {
        var n = this;
        if (ce(t)) {
          var r = this.passes.get(t);
          if (r) return r;
          var i = Object.getPrototypeOf(t);
          switch (i) {
            case Array.prototype: {
              if (this.known.has(t)) return t;
              var a = t.map(this.admit, this),
                o = this.pool.lookupArray(a);
              return (
                o.array ||
                  (this.known.add((o.array = a)),
                  globalThis.__DEV__ !== !1 && Object.freeze(a)),
                o.array
              );
            }
            case null:
            case Object.prototype: {
              if (this.known.has(t)) return t;
              var s = Object.getPrototypeOf(t),
                l = [s],
                u = this.sortedKeys(t);
              l.push(u.json);
              var c = l.length;
              u.sorted.forEach(function (h) {
                l.push(n.admit(t[h]));
              });
              var o = this.pool.lookupArray(l);
              if (!o.object) {
                var f = (o.object = Object.create(s));
                (this.known.add(f),
                  u.sorted.forEach(function (h, v) {
                    f[h] = l[c + v];
                  }),
                  globalThis.__DEV__ !== !1 && Object.freeze(f));
              }
              return o.object;
            }
          }
        }
        return t;
      }),
      (e.prototype.sortedKeys = function (t) {
        var n = Object.keys(t),
          r = this.pool.lookupArray(n);
        if (!r.keys) {
          n.sort();
          var i = JSON.stringify(n);
          (r.keys = this.keysByJSON.get(i)) ||
            this.keysByJSON.set(i, (r.keys = { sorted: n, json: i }));
        }
        return r.keys;
      }),
      e
    );
  })();
  function fp(e) {
    return [
      e.selectionSet,
      e.objectOrReference,
      e.context,
      e.context.canonizeResults,
    ];
  }
  var j2 = (function () {
    function e(t) {
      var n = this;
      ((this.knownResults = new (rr ? WeakMap : Map)()),
        (this.config = Xn(t, {
          addTypename: t.addTypename !== !1,
          canonizeResults: gg(t),
        })),
        (this.canon = t.canon || new cp()),
        (this.executeSelectionSet = na(
          function (r) {
            var i,
              a = r.context.canonizeResults,
              o = fp(r);
            o[3] = !a;
            var s = (i = n.executeSelectionSet).peek.apply(i, o);
            return s
              ? a
                ? _(_({}, s), { result: n.canon.admit(s.result) })
                : s
              : (up(r.context.store, r.enclosingRef.__ref),
                n.execSelectionSetImpl(r));
          },
          {
            max:
              this.config.resultCacheMaxSize ||
              It["inMemoryCache.executeSelectionSet"] ||
              5e4,
            keyArgs: fp,
            makeCacheKey: function (r, i, a, o) {
              if (Pi(a.store))
                return a.store.makeCacheKey(
                  r,
                  X(i) ? i.__ref : i,
                  a.varString,
                  o,
                );
            },
          },
        )),
        (this.executeSubSelectedArray = na(
          function (r) {
            return (
              up(r.context.store, r.enclosingRef.__ref),
              n.execSubSelectedArrayImpl(r)
            );
          },
          {
            max:
              this.config.resultCacheMaxSize ||
              It["inMemoryCache.executeSubSelectedArray"] ||
              1e4,
            makeCacheKey: function (r) {
              var i = r.field,
                a = r.array,
                o = r.context;
              if (Pi(o.store)) return o.store.makeCacheKey(i, a, o.varString);
            },
          },
        )));
    }
    return (
      (e.prototype.resetCanon = function () {
        this.canon = new cp();
      }),
      (e.prototype.diffQueryAgainstStore = function (t) {
        var n = t.store,
          r = t.query,
          i = t.rootId,
          a = i === void 0 ? "ROOT_QUERY" : i,
          o = t.variables,
          s = t.returnPartialData,
          l = s === void 0 ? !0 : s,
          u = t.canonizeResults,
          c = u === void 0 ? this.config.canonizeResults : u,
          f = this.config.cache.policies;
        o = _(_({}, Hc(Lv(r))), o);
        var d = Pr(a),
          h = this.executeSelectionSet({
            selectionSet: pa(r).selectionSet,
            objectOrReference: d,
            enclosingRef: d,
            context: _(
              {
                store: n,
                query: r,
                policies: f,
                variables: o,
                varString: wn(o),
                canonizeResults: c,
              },
              wg(r, this.config.fragments),
            ),
          }),
          v;
        if (h.missing && ((v = [new hg(V2(h.missing), h.missing, r, o)]), !l))
          throw v[0];
        return { result: h.result, complete: !v, missing: v };
      }),
      (e.prototype.isFresh = function (t, n, r, i) {
        if (Pi(i.store) && this.knownResults.get(t) === r) {
          var a = this.executeSelectionSet.peek(r, n, i, this.canon.isKnown(t));
          if (a && t === a.result) return !0;
        }
        return !1;
      }),
      (e.prototype.execSelectionSetImpl = function (t) {
        var n = this,
          r = t.selectionSet,
          i = t.objectOrReference,
          a = t.enclosingRef,
          o = t.context;
        if (
          X(i) &&
          !o.policies.rootTypenamesById[i.__ref] &&
          !o.store.has(i.__ref)
        )
          return {
            result: this.canon.empty,
            missing: "Dangling reference to missing ".concat(
              i.__ref,
              " object",
            ),
          };
        var s = o.variables,
          l = o.policies,
          u = o.store,
          c = u.getFieldValue(i, "__typename"),
          f = [],
          d,
          h = new Tn();
        this.config.addTypename &&
          typeof c == "string" &&
          !l.rootIdsByTypename[c] &&
          f.push({ __typename: c });
        function v(g, E) {
          var x;
          return (
            g.missing && (d = h.merge(d, ((x = {}), (x[E] = g.missing), x))),
            g.result
          );
        }
        var y = new Set(r.selections);
        y.forEach(function (g) {
          var E, x;
          if (da(g, s))
            if (bn(g)) {
              var b = l.readField(
                  {
                    fieldName: g.name.value,
                    field: g,
                    variables: o.variables,
                    from: i,
                  },
                  o,
                ),
                k = qt(g);
              (b === void 0
                ? Xc.added(g) ||
                  (d = h.merge(
                    d,
                    ((E = {}),
                    (E[k] = "Can't find field '"
                      .concat(g.name.value, "' on ")
                      .concat(
                        X(i)
                          ? i.__ref + " object"
                          : "object " + JSON.stringify(i, null, 2),
                      )),
                    E),
                  ))
                : fe(b)
                  ? b.length > 0 &&
                    (b = v(
                      n.executeSubSelectedArray({
                        field: g,
                        array: b,
                        enclosingRef: a,
                        context: o,
                      }),
                      k,
                    ))
                  : g.selectionSet
                    ? b != null &&
                      (b = v(
                        n.executeSelectionSet({
                          selectionSet: g.selectionSet,
                          objectOrReference: b,
                          enclosingRef: X(b) ? b : a,
                          context: o,
                        }),
                        k,
                      ))
                    : o.canonizeResults && (b = n.canon.pass(b)),
                b !== void 0 && f.push(((x = {}), (x[k] = b), x)));
            } else {
              var T = ds(g, o.lookupFragment);
              if (!T && g.kind === F.FRAGMENT_SPREAD)
                throw je(10, g.name.value);
              T &&
                l.fragmentMatches(T, c) &&
                T.selectionSet.selections.forEach(y.add, y);
            }
        });
        var S = vs(f),
          p = { result: S, missing: d },
          m = o.canonizeResults ? this.canon.admit(p) : Qr(p);
        return (m.result && this.knownResults.set(m.result, r), m);
      }),
      (e.prototype.execSubSelectedArrayImpl = function (t) {
        var n = this,
          r = t.field,
          i = t.array,
          a = t.enclosingRef,
          o = t.context,
          s,
          l = new Tn();
        function u(c, f) {
          var d;
          return (
            c.missing && (s = l.merge(s, ((d = {}), (d[f] = c.missing), d))),
            c.result
          );
        }
        return (
          r.selectionSet && (i = i.filter(o.store.canRead)),
          (i = i.map(function (c, f) {
            return c === null
              ? null
              : fe(c)
                ? u(
                    n.executeSubSelectedArray({
                      field: r,
                      array: c,
                      enclosingRef: a,
                      context: o,
                    }),
                    f,
                  )
                : r.selectionSet
                  ? u(
                      n.executeSelectionSet({
                        selectionSet: r.selectionSet,
                        objectOrReference: c,
                        enclosingRef: X(c) ? c : a,
                        context: o,
                      }),
                      f,
                    )
                  : (globalThis.__DEV__ !== !1 && B2(o.store, r, c), c);
          })),
          { result: o.canonizeResults ? this.canon.admit(i) : i, missing: s }
        );
      }),
      e
    );
  })();
  function V2(e) {
    try {
      JSON.stringify(e, function (t, n) {
        if (typeof n == "string") throw n;
        return n;
      });
    } catch (t) {
      return t;
    }
  }
  function B2(e, t, n) {
    if (!t.selectionSet) {
      var r = new Set([n]);
      r.forEach(function (i) {
        ce(i) &&
          (I(!X(i), 11, R2(e, i), t.name.value),
          Object.values(i).forEach(r.add, r));
      });
    }
  }
  var rf = new ha(),
    dp = new WeakMap();
  function Ii(e) {
    var t = dp.get(e);
    return (t || dp.set(e, (t = { vars: new Set(), dep: Hv() })), t);
  }
  function pp(e) {
    Ii(e).vars.forEach(function (t) {
      return t.forgetCache(e);
    });
  }
  function U2(e) {
    Ii(e).vars.forEach(function (t) {
      return t.attachCache(e);
    });
  }
  function Q2(e) {
    var t = new Set(),
      n = new Set(),
      r = function (a) {
        if (arguments.length > 0) {
          if (e !== a) {
            ((e = a),
              t.forEach(function (l) {
                (Ii(l).dep.dirty(r), $2(l));
              }));
            var o = Array.from(n);
            (n.clear(),
              o.forEach(function (l) {
                return l(e);
              }));
          }
        } else {
          var s = rf.getValue();
          s && (i(s), Ii(s).dep(r));
        }
        return e;
      };
    r.onNextChange = function (a) {
      return (
        n.add(a),
        function () {
          n.delete(a);
        }
      );
    };
    var i = (r.attachCache = function (a) {
      return (t.add(a), Ii(a).vars.add(r), r);
    });
    return (
      (r.forgetCache = function (a) {
        return t.delete(a);
      }),
      r
    );
  }
  function $2(e) {
    e.broadcastWatches && e.broadcastWatches();
  }
  var hp = Object.create(null);
  function af(e) {
    var t = JSON.stringify(e);
    return hp[t] || (hp[t] = Object.create(null));
  }
  function mp(e) {
    var t = af(e);
    return (
      t.keyFieldsFn ||
      (t.keyFieldsFn = function (n, r) {
        var i = function (o, s) {
            return r.readField(s, o);
          },
          a = (r.keyObject = of(e, function (o) {
            var s = Dr(r.storeObject, o, i);
            return (
              s === void 0 &&
                n !== r.storeObject &&
                xe.call(n, o[0]) &&
                (s = Dr(n, o, xg)),
              I(s !== void 0, 5, o.join("."), n),
              s
            );
          }));
        return "".concat(r.typename, ":").concat(JSON.stringify(a));
      })
    );
  }
  function vp(e) {
    var t = af(e);
    return (
      t.keyArgsFn ||
      (t.keyArgsFn = function (n, r) {
        var i = r.field,
          a = r.variables,
          o = r.fieldName,
          s = of(e, function (u) {
            var c = u[0],
              f = c.charAt(0);
            if (f === "@") {
              if (i && lt(i.directives)) {
                var d = c.slice(1),
                  h = i.directives.find(function (p) {
                    return p.name.value === d;
                  }),
                  v = h && ps(h, a);
                return v && Dr(v, u.slice(1));
              }
              return;
            }
            if (f === "$") {
              var y = c.slice(1);
              if (a && xe.call(a, y)) {
                var S = u.slice(0);
                return ((S[0] = y), Dr(a, S));
              }
              return;
            }
            if (n) return Dr(n, u);
          }),
          l = JSON.stringify(s);
        return ((n || l !== "{}") && (o += ":" + l), o);
      })
    );
  }
  function of(e, t) {
    var n = new Tn();
    return Eg(e).reduce(function (r, i) {
      var a,
        o = t(i);
      if (o !== void 0) {
        for (var s = i.length - 1; s >= 0; --s)
          o = ((a = {}), (a[i[s]] = o), a);
        r = n.merge(r, o);
      }
      return r;
    }, Object.create(null));
  }
  function Eg(e) {
    var t = af(e);
    if (!t.paths) {
      var n = (t.paths = []),
        r = [];
      e.forEach(function (i, a) {
        fe(i)
          ? (Eg(i).forEach(function (o) {
              return n.push(r.concat(o));
            }),
            (r.length = 0))
          : (r.push(i), fe(e[a + 1]) || (n.push(r.slice(0)), (r.length = 0)));
      });
    }
    return t.paths;
  }
  function xg(e, t) {
    return e[t];
  }
  function Dr(e, t, n) {
    return (
      (n = n || xg),
      bg(
        t.reduce(function r(i, a) {
          return fe(i)
            ? i.map(function (o) {
                return r(o, a);
              })
            : i && n(i, a);
        }, e),
      )
    );
  }
  function bg(e) {
    return ce(e)
      ? fe(e)
        ? e.map(bg)
        : of(Object.keys(e).sort(), function (t) {
            return Dr(e, t);
          })
      : e;
  }
  function Iu(e) {
    return e.args !== void 0
      ? e.args
      : e.field
        ? ps(e.field, e.variables)
        : null;
  }
  var q2 = function () {},
    gp = function (e, t) {
      return t.fieldName;
    },
    yp = function (e, t, n) {
      var r = n.mergeObjects;
      return r(e, t);
    },
    wp = function (e, t) {
      return t;
    },
    W2 = (function () {
      function e(t) {
        ((this.config = t),
          (this.typePolicies = Object.create(null)),
          (this.toBeAdded = Object.create(null)),
          (this.supertypeMap = new Map()),
          (this.fuzzySubtypes = new Map()),
          (this.rootIdsByTypename = Object.create(null)),
          (this.rootTypenamesById = Object.create(null)),
          (this.usingPossibleTypes = !1),
          (this.config = _({ dataIdFromObject: mg }, t)),
          (this.cache = this.config.cache),
          this.setRootTypename("Query"),
          this.setRootTypename("Mutation"),
          this.setRootTypename("Subscription"),
          t.possibleTypes && this.addPossibleTypes(t.possibleTypes),
          t.typePolicies && this.addTypePolicies(t.typePolicies));
      }
      return (
        (e.prototype.identify = function (t, n) {
          var r,
            i = this,
            a =
              (n &&
                (n.typename ||
                  ((r = n.storeObject) === null || r === void 0
                    ? void 0
                    : r.__typename))) ||
              t.__typename;
          if (a === this.rootTypenamesById.ROOT_QUERY) return ["ROOT_QUERY"];
          var o = (n && n.storeObject) || t,
            s = _(_({}, n), {
              typename: a,
              storeObject: o,
              readField:
                (n && n.readField) ||
                function () {
                  var f = sf(arguments, o);
                  return i.readField(f, {
                    store: i.cache.data,
                    variables: f.variables,
                  });
                },
            }),
            l,
            u = a && this.getTypePolicy(a),
            c = (u && u.keyFn) || this.config.dataIdFromObject;
          return (
            nf.withValue(!0, function () {
              for (; c;) {
                var f = c(_(_({}, t), o), s);
                if (fe(f)) c = mp(f);
                else {
                  l = f;
                  break;
                }
              }
            }),
            (l = l ? String(l) : void 0),
            s.keyObject ? [l, s.keyObject] : [l]
          );
        }),
        (e.prototype.addTypePolicies = function (t) {
          var n = this;
          Object.keys(t).forEach(function (r) {
            var i = t[r],
              a = i.queryType,
              o = i.mutationType,
              s = i.subscriptionType,
              l = wt(i, ["queryType", "mutationType", "subscriptionType"]);
            (a && n.setRootTypename("Query", r),
              o && n.setRootTypename("Mutation", r),
              s && n.setRootTypename("Subscription", r),
              xe.call(n.toBeAdded, r)
                ? n.toBeAdded[r].push(l)
                : (n.toBeAdded[r] = [l]));
          });
        }),
        (e.prototype.updateTypePolicy = function (t, n, r) {
          var i = this.getTypePolicy(t),
            a = n.keyFields,
            o = n.fields;
          function s(l, u) {
            l.merge =
              typeof u == "function"
                ? u
                : u === !0
                  ? yp
                  : u === !1
                    ? wp
                    : l.merge;
          }
          (s(i, n.merge),
            (i.keyFn =
              a === !1
                ? q2
                : fe(a)
                  ? mp(a)
                  : typeof a == "function"
                    ? a
                    : i.keyFn),
            o &&
              Object.keys(o).forEach(function (l) {
                var u = r[l];
                (!u || (u == null ? void 0 : u.typename) !== t) &&
                  (u = r[l] = { typename: t });
                var c = o[l];
                if (typeof c == "function") u.read = c;
                else {
                  var f = c.keyArgs,
                    d = c.read,
                    h = c.merge;
                  ((u.keyFn =
                    f === !1
                      ? gp
                      : fe(f)
                        ? vp(f)
                        : typeof f == "function"
                          ? f
                          : u.keyFn),
                    typeof d == "function" && (u.read = d),
                    s(u, h));
                }
                u.read && u.merge && (u.keyFn = u.keyFn || gp);
              }));
        }),
        (e.prototype.setRootTypename = function (t, n) {
          n === void 0 && (n = t);
          var r = "ROOT_" + t.toUpperCase(),
            i = this.rootTypenamesById[r];
          n !== i &&
            (I(!i || i === t, 6, t),
            i && delete this.rootIdsByTypename[i],
            (this.rootIdsByTypename[n] = r),
            (this.rootTypenamesById[r] = n));
        }),
        (e.prototype.addPossibleTypes = function (t) {
          var n = this;
          ((this.usingPossibleTypes = !0),
            Object.keys(t).forEach(function (r) {
              (n.getSupertypeSet(r, !0),
                t[r].forEach(function (i) {
                  n.getSupertypeSet(i, !0).add(r);
                  var a = i.match(yg);
                  (!a || a[0] !== i) && n.fuzzySubtypes.set(i, new RegExp(i));
                }));
            }));
        }),
        (e.prototype.getTypePolicy = function (t) {
          var n = this;
          if (!xe.call(this.typePolicies, t)) {
            var r = (this.typePolicies[t] = Object.create(null));
            r.fields = Object.create(null);
            var i = this.supertypeMap.get(t);
            (!i &&
              this.fuzzySubtypes.size &&
              ((i = this.getSupertypeSet(t, !0)),
              this.fuzzySubtypes.forEach(function (o, s) {
                if (o.test(t)) {
                  var l = n.supertypeMap.get(s);
                  l &&
                    l.forEach(function (u) {
                      return i.add(u);
                    });
                }
              })),
              i &&
                i.size &&
                i.forEach(function (o) {
                  var s = n.getTypePolicy(o),
                    l = s.fields,
                    u = wt(s, ["fields"]);
                  (Object.assign(r, u), Object.assign(r.fields, l));
                }));
          }
          var a = this.toBeAdded[t];
          return (
            a &&
              a.length &&
              a.splice(0).forEach(function (o) {
                n.updateTypePolicy(t, o, n.typePolicies[t].fields);
              }),
            this.typePolicies[t]
          );
        }),
        (e.prototype.getFieldPolicy = function (t, n) {
          if (t) return this.getTypePolicy(t).fields[n];
        }),
        (e.prototype.getSupertypeSet = function (t, n) {
          var r = this.supertypeMap.get(t);
          return (!r && n && this.supertypeMap.set(t, (r = new Set())), r);
        }),
        (e.prototype.fragmentMatches = function (t, n, r, i) {
          var a = this;
          if (!t.typeCondition) return !0;
          if (!n) return !1;
          var o = t.typeCondition.name.value;
          if (n === o) return !0;
          if (this.usingPossibleTypes && this.supertypeMap.has(o))
            for (
              var s = this.getSupertypeSet(n, !0),
                l = [s],
                u = function (v) {
                  var y = a.getSupertypeSet(v, !1);
                  y && y.size && l.indexOf(y) < 0 && l.push(y);
                },
                c = !!(r && this.fuzzySubtypes.size),
                f = !1,
                d = 0;
              d < l.length;
              ++d
            ) {
              var h = l[d];
              if (h.has(o))
                return (
                  s.has(o) ||
                    (f && globalThis.__DEV__ !== !1 && I.warn(7, n, o),
                    s.add(o)),
                  !0
                );
              (h.forEach(u),
                c &&
                  d === l.length - 1 &&
                  Pu(t.selectionSet, r, i) &&
                  ((c = !1),
                  (f = !0),
                  this.fuzzySubtypes.forEach(function (v, y) {
                    var S = n.match(v);
                    S && S[0] === n && u(y);
                  })));
            }
          return !1;
        }),
        (e.prototype.hasKeyArgs = function (t, n) {
          var r = this.getFieldPolicy(t, n);
          return !!(r && r.keyFn);
        }),
        (e.prototype.getStoreFieldName = function (t) {
          var n = t.typename,
            r = t.fieldName,
            i = this.getFieldPolicy(n, r),
            a,
            o = i && i.keyFn;
          if (o && n)
            for (
              var s = {
                  typename: n,
                  fieldName: r,
                  field: t.field || null,
                  variables: t.variables,
                },
                l = Iu(t);
              o;
            ) {
              var u = o(l, s);
              if (fe(u)) o = vp(u);
              else {
                a = u || r;
                break;
              }
            }
          return (
            a === void 0 &&
              (a = t.field ? lE(t.field, t.variables) : Rv(r, Iu(t))),
            a === !1 ? r : r === kn(a) ? a : r + ":" + a
          );
        }),
        (e.prototype.readField = function (t, n) {
          var r = t.from;
          if (r) {
            var i = t.field || t.fieldName;
            if (i) {
              if (t.typename === void 0) {
                var a = n.store.getFieldValue(r, "__typename");
                a && (t.typename = a);
              }
              var o = this.getStoreFieldName(t),
                s = kn(o),
                l = n.store.getFieldValue(r, o),
                u = this.getFieldPolicy(t.typename, s),
                c = u && u.read;
              if (c) {
                var f = Sp(
                  this,
                  r,
                  t,
                  n,
                  n.store.getStorage(X(r) ? r.__ref : r, o),
                );
                return rf.withValue(this.cache, c, [l, f]);
              }
              return l;
            }
          }
        }),
        (e.prototype.getReadFunction = function (t, n) {
          var r = this.getFieldPolicy(t, n);
          return r && r.read;
        }),
        (e.prototype.getMergeFunction = function (t, n, r) {
          var i = this.getFieldPolicy(t, n),
            a = i && i.merge;
          return (
            !a && r && ((i = this.getTypePolicy(r)), (a = i && i.merge)),
            a
          );
        }),
        (e.prototype.runMergeFunction = function (t, n, r, i, a) {
          var o = r.field,
            s = r.typename,
            l = r.merge;
          return l === yp
            ? _g(i.store)(t, n)
            : l === wp
              ? n
              : (i.overwrite && (t = void 0),
                l(
                  t,
                  n,
                  Sp(
                    this,
                    void 0,
                    {
                      typename: s,
                      fieldName: o.name.value,
                      field: o,
                      variables: i.variables,
                    },
                    i,
                    a || Object.create(null),
                  ),
                ));
        }),
        e
      );
    })();
  function Sp(e, t, n, r, i) {
    var a = e.getStoreFieldName(n),
      o = kn(a),
      s = n.variables || r.variables,
      l = r.store,
      u = l.toReference,
      c = l.canRead;
    return {
      args: Iu(n),
      field: n.field || null,
      fieldName: o,
      storeFieldName: a,
      variables: s,
      isReference: X,
      toReference: u,
      storage: i,
      cache: e.cache,
      canRead: c,
      readField: function () {
        return e.readField(sf(arguments, t, s), r);
      },
      mergeObjects: _g(r.store),
    };
  }
  function sf(e, t, n) {
    var r = e[0],
      i = e[1],
      a = e.length,
      o;
    return (
      typeof r == "string"
        ? (o = { fieldName: r, from: a > 1 ? i : t })
        : ((o = _({}, r)), xe.call(o, "from") || (o.from = t)),
      globalThis.__DEV__ !== !1 &&
        o.from === void 0 &&
        globalThis.__DEV__ !== !1 &&
        I.warn(8, gv(Array.from(e))),
      o.variables === void 0 && (o.variables = n),
      o
    );
  }
  function _g(e) {
    return function (n, r) {
      if (fe(n) || fe(r)) throw je(9);
      if (ce(n) && ce(r)) {
        var i = e.getFieldValue(n, "__typename"),
          a = e.getFieldValue(r, "__typename"),
          o = i && a && i !== a;
        if (o) return r;
        if (X(n) && Er(r)) return (e.merge(n.__ref, r), n);
        if (Er(n) && X(r)) return (e.merge(n, r.__ref), r);
        if (Er(n) && Er(r)) return _(_({}, n), r);
      }
      return r;
    };
  }
  function il(e, t, n) {
    var r = "".concat(t).concat(n),
      i = e.flavors.get(r);
    return (
      i ||
        e.flavors.set(
          r,
          (i =
            e.clientOnly === t && e.deferred === n
              ? e
              : _(_({}, e), { clientOnly: t, deferred: n })),
        ),
      i
    );
  }
  var H2 = (function () {
      function e(t, n, r) {
        ((this.cache = t), (this.reader = n), (this.fragments = r));
      }
      return (
        (e.prototype.writeToStore = function (t, n) {
          var r = this,
            i = n.query,
            a = n.result,
            o = n.dataId,
            s = n.variables,
            l = n.overwrite,
            u = Yn(i),
            c = L2();
          s = _(_({}, Hc(u)), s);
          var f = _(
              _(
                {
                  store: t,
                  written: Object.create(null),
                  merge: function (h, v) {
                    return c.merge(h, v);
                  },
                  variables: s,
                  varString: wn(s),
                },
                wg(i, this.fragments),
              ),
              {
                overwrite: !!l,
                incomingById: new Map(),
                clientOnly: !1,
                deferred: !1,
                flavors: new Map(),
              },
            ),
            d = this.processSelectionSet({
              result: a || Object.create(null),
              dataId: o,
              selectionSet: u.selectionSet,
              mergeTree: { map: new Map() },
              context: f,
            });
          if (!X(d)) throw je(12, a);
          return (
            f.incomingById.forEach(function (h, v) {
              var y = h.storeObject,
                S = h.mergeTree,
                p = h.fieldNodeSet,
                m = Pr(v);
              if (S && S.map.size) {
                var g = r.applyMerges(S, m, y, f);
                if (X(g)) return;
                y = g;
              }
              if (globalThis.__DEV__ !== !1 && !f.overwrite) {
                var E = Object.create(null);
                p.forEach(function (k) {
                  k.selectionSet && (E[k.name.value] = !0);
                });
                var x = function (k) {
                    return E[kn(k)] === !0;
                  },
                  b = function (k) {
                    var T = S && S.map.get(k);
                    return !!(T && T.info && T.info.merge);
                  };
                Object.keys(y).forEach(function (k) {
                  x(k) && !b(k) && G2(m, y, k, f.store);
                });
              }
              t.merge(v, y);
            }),
            t.retain(d.__ref),
            d
          );
        }),
        (e.prototype.processSelectionSet = function (t) {
          var n = this,
            r = t.dataId,
            i = t.result,
            a = t.selectionSet,
            o = t.context,
            s = t.mergeTree,
            l = this.cache.policies,
            u = Object.create(null),
            c =
              (r && l.rootTypenamesById[r]) ||
              Su(i, a, o.fragmentMap) ||
              (r && o.store.get(r, "__typename"));
          typeof c == "string" && (u.__typename = c);
          var f = function () {
              var g = sf(arguments, u, o.variables);
              if (X(g.from)) {
                var E = o.incomingById.get(g.from.__ref);
                if (E) {
                  var x = l.readField(_(_({}, g), { from: E.storeObject }), o);
                  if (x !== void 0) return x;
                }
              }
              return l.readField(g, o);
            },
            d = new Set();
          this.flattenFields(a, i, o, c).forEach(function (g, E) {
            var x,
              b = qt(E),
              k = i[b];
            if ((d.add(E), k !== void 0)) {
              var T = l.getStoreFieldName({
                  typename: c,
                  fieldName: E.name.value,
                  field: E,
                  variables: g.variables,
                }),
                R = Ep(s, T),
                j = n.processFieldValue(
                  k,
                  E,
                  E.selectionSet ? il(g, !1, !1) : g,
                  R,
                ),
                M = void 0;
              E.selectionSet && (X(j) || Er(j)) && (M = f("__typename", j));
              var A = l.getMergeFunction(c, E.name.value, M);
              (A ? (R.info = { field: E, typename: c, merge: A }) : xp(s, T),
                (u = g.merge(u, ((x = {}), (x[T] = j), x))));
            } else
              globalThis.__DEV__ !== !1 &&
                !g.clientOnly &&
                !g.deferred &&
                !Xc.added(E) &&
                !l.getReadFunction(c, E.name.value) &&
                globalThis.__DEV__ !== !1 &&
                I.error(13, qt(E), i);
          });
          try {
            var h = l.identify(i, {
                typename: c,
                selectionSet: a,
                fragmentMap: o.fragmentMap,
                storeObject: u,
                readField: f,
              }),
              v = h[0],
              y = h[1];
            ((r = r || v), y && (u = o.merge(u, y)));
          } catch (g) {
            if (!r) throw g;
          }
          if (typeof r == "string") {
            var S = Pr(r),
              p = o.written[r] || (o.written[r] = []);
            if (
              p.indexOf(a) >= 0 ||
              (p.push(a), this.reader && this.reader.isFresh(i, S, a, o))
            )
              return S;
            var m = o.incomingById.get(r);
            return (
              m
                ? ((m.storeObject = o.merge(m.storeObject, u)),
                  (m.mergeTree = Du(m.mergeTree, s)),
                  d.forEach(function (g) {
                    return m.fieldNodeSet.add(g);
                  }))
                : o.incomingById.set(r, {
                    storeObject: u,
                    mergeTree: jo(s) ? void 0 : s,
                    fieldNodeSet: d,
                  }),
              S
            );
          }
          return u;
        }),
        (e.prototype.processFieldValue = function (t, n, r, i) {
          var a = this;
          return !n.selectionSet || t === null
            ? globalThis.__DEV__ !== !1
              ? tg(t)
              : t
            : fe(t)
              ? t.map(function (o, s) {
                  var l = a.processFieldValue(o, n, r, Ep(i, s));
                  return (xp(i, s), l);
                })
              : this.processSelectionSet({
                  result: t,
                  selectionSet: n.selectionSet,
                  context: r,
                  mergeTree: i,
                });
        }),
        (e.prototype.flattenFields = function (t, n, r, i) {
          i === void 0 && (i = Su(n, t, r.fragmentMap));
          var a = new Map(),
            o = this.cache.policies,
            s = new Ht(!1);
          return (
            (function l(u, c) {
              var f = s.lookup(u, c.clientOnly, c.deferred);
              f.visited ||
                ((f.visited = !0),
                u.selections.forEach(function (d) {
                  if (da(d, r.variables)) {
                    var h = c.clientOnly,
                      v = c.deferred;
                    if (
                      (!(h && v) &&
                        lt(d.directives) &&
                        d.directives.forEach(function (p) {
                          var m = p.name.value;
                          if ((m === "client" && (h = !0), m === "defer")) {
                            var g = ps(p, r.variables);
                            (!g || g.if !== !1) && (v = !0);
                          }
                        }),
                      bn(d))
                    ) {
                      var y = a.get(d);
                      (y && ((h = h && y.clientOnly), (v = v && y.deferred)),
                        a.set(d, il(r, h, v)));
                    } else {
                      var S = ds(d, r.lookupFragment);
                      if (!S && d.kind === F.FRAGMENT_SPREAD)
                        throw je(14, d.name.value);
                      S &&
                        o.fragmentMatches(S, i, n, r.variables) &&
                        l(S.selectionSet, il(r, h, v));
                    }
                  }
                }));
            })(t, r),
            a
          );
        }),
        (e.prototype.applyMerges = function (t, n, r, i, a) {
          var o,
            s = this;
          if (t.map.size && !X(r)) {
            var l = !fe(r) && (X(n) || Er(n)) ? n : void 0,
              u = r;
            l && !a && (a = [X(l) ? l.__ref : l]);
            var c,
              f = function (d, h) {
                return fe(d)
                  ? typeof h == "number"
                    ? d[h]
                    : void 0
                  : i.store.getFieldValue(d, String(h));
              };
            (t.map.forEach(function (d, h) {
              var v = f(l, h),
                y = f(u, h);
              if (y !== void 0) {
                a && a.push(h);
                var S = s.applyMerges(d, v, y, i, a);
                (S !== y && ((c = c || new Map()), c.set(h, S)),
                  a && I(a.pop() === h));
              }
            }),
              c &&
                ((r = fe(u) ? u.slice(0) : _({}, u)),
                c.forEach(function (d, h) {
                  r[h] = d;
                })));
          }
          return t.info
            ? this.cache.policies.runMergeFunction(
                n,
                r,
                t.info,
                i,
                a && (o = i.store).getStorage.apply(o, a),
              )
            : r;
        }),
        e
      );
    })(),
    Tg = [];
  function Ep(e, t) {
    var n = e.map;
    return (n.has(t) || n.set(t, Tg.pop() || { map: new Map() }), n.get(t));
  }
  function Du(e, t) {
    if (e === t || !t || jo(t)) return e;
    if (!e || jo(e)) return t;
    var n = e.info && t.info ? _(_({}, e.info), t.info) : e.info || t.info,
      r = e.map.size && t.map.size,
      i = r ? new Map() : e.map.size ? e.map : t.map,
      a = { info: n, map: i };
    if (r) {
      var o = new Set(t.map.keys());
      (e.map.forEach(function (s, l) {
        (a.map.set(l, Du(s, t.map.get(l))), o.delete(l));
      }),
        o.forEach(function (s) {
          a.map.set(s, Du(t.map.get(s), e.map.get(s)));
        }));
    }
    return a;
  }
  function jo(e) {
    return !e || !(e.info || e.map.size);
  }
  function xp(e, t) {
    var n = e.map,
      r = n.get(t);
    r && jo(r) && (Tg.push(r), n.delete(t));
  }
  var bp = new Set();
  function G2(e, t, n, r) {
    var i = function (f) {
        var d = r.getFieldValue(f, n);
        return typeof d == "object" && d;
      },
      a = i(e);
    if (a) {
      var o = i(t);
      if (
        o &&
        !X(a) &&
        !K(a, o) &&
        !Object.keys(a).every(function (f) {
          return r.getFieldValue(o, f) !== void 0;
        })
      ) {
        var s =
            r.getFieldValue(e, "__typename") ||
            r.getFieldValue(t, "__typename"),
          l = kn(n),
          u = "".concat(s, ".").concat(l);
        if (!bp.has(u)) {
          bp.add(u);
          var c = [];
          (!fe(a) &&
            !fe(o) &&
            [a, o].forEach(function (f) {
              var d = r.getFieldValue(f, "__typename");
              typeof d == "string" && !c.includes(d) && c.push(d);
            }),
            globalThis.__DEV__ !== !1 &&
              I.warn(
                15,
                l,
                s,
                c.length
                  ? "either ensure all objects of type " +
                      c.join(" and ") +
                      " have an ID or a custom merge function, or "
                  : "",
                u,
                _({}, a),
                _({}, o),
              ));
        }
      }
    }
  }
  var kg = (function (e) {
    Dt(t, e);
    function t(n) {
      n === void 0 && (n = {});
      var r = e.call(this) || this;
      return (
        (r.watches = new Set()),
        (r.addTypenameTransform = new Gv(Xc)),
        (r.assumeImmutableResults = !0),
        (r.makeVar = Q2),
        (r.txCount = 0),
        globalThis.__DEV__ !== !1 &&
          (de(
            n,
            "addTypename",
            "InMemoryCache",
            "Please remove the `addTypename` option when initializing `InMemoryCache`.",
          ),
          de(
            n,
            "canonizeResults",
            "InMemoryCache",
            "Please remove the `canonizeResults` option when initializing `InMemoryCache`.",
          )),
        (r.config = M2(n)),
        (r.addTypename = !!r.config.addTypename),
        (r.policies = new W2({
          cache: r,
          dataIdFromObject: r.config.dataIdFromObject,
          possibleTypes: r.config.possibleTypes,
          typePolicies: r.config.typePolicies,
        })),
        r.init(),
        r
      );
    }
    return (
      (t.prototype.init = function () {
        var n = (this.data = new ra.Root({
          policies: this.policies,
          resultCaching: this.config.resultCaching,
        }));
        ((this.optimisticData = n.stump), this.resetResultCache());
      }),
      (t.prototype.resetResultCache = function (n) {
        var r = this,
          i = this.storeReader,
          a = this.config.fragments;
        (this.addTypenameTransform.resetCache(),
          a == null || a.resetCaches(),
          (this.storeWriter = new H2(
            this,
            (this.storeReader = new j2({
              cache: this,
              addTypename: this.addTypename,
              resultCacheMaxSize: this.config.resultCacheMaxSize,
              canonizeResults: gg(this.config),
              canon: n ? void 0 : i && i.canon,
              fragments: a,
            })),
            a,
          )),
          (this.maybeBroadcastWatch = na(
            function (o, s) {
              return r.broadcastWatch(o, s);
            },
            {
              max:
                this.config.resultCacheMaxSize ||
                It["inMemoryCache.maybeBroadcastWatch"] ||
                5e3,
              makeCacheKey: function (o) {
                var s = o.optimistic ? r.optimisticData : r.data;
                if (Pi(s)) {
                  var l = o.optimistic,
                    u = o.id,
                    c = o.variables;
                  return s.makeCacheKey(
                    o.query,
                    o.callback,
                    wn({ optimistic: l, id: u, variables: c }),
                  );
                }
              },
            },
          )),
          new Set([this.data.group, this.optimisticData.group]).forEach(
            function (o) {
              return o.resetCaching();
            },
          ));
      }),
      (t.prototype.restore = function (n) {
        return (this.init(), n && this.data.replace(n), this);
      }),
      (t.prototype.extract = function (n) {
        return (
          n === void 0 && (n = !1),
          (n ? this.optimisticData : this.data).extract()
        );
      }),
      (t.prototype.read = function (n) {
        globalThis.__DEV__ !== !1 && de(n, "canonizeResults", "cache.read");
        var r = n.returnPartialData,
          i = r === void 0 ? !1 : r;
        try {
          return (
            this.storeReader.diffQueryAgainstStore(
              _(_({}, n), {
                store: n.optimistic ? this.optimisticData : this.data,
                config: this.config,
                returnPartialData: i,
              }),
            ).result || null
          );
        } catch (a) {
          if (a instanceof hg) return null;
          throw a;
        }
      }),
      (t.prototype.write = function (n) {
        try {
          return (++this.txCount, this.storeWriter.writeToStore(this.data, n));
        } finally {
          !--this.txCount && n.broadcast !== !1 && this.broadcastWatches();
        }
      }),
      (t.prototype.modify = function (n) {
        if (xe.call(n, "id") && !n.id) return !1;
        var r = n.optimistic ? this.optimisticData : this.data;
        try {
          return (++this.txCount, r.modify(n.id || "ROOT_QUERY", n.fields));
        } finally {
          !--this.txCount && n.broadcast !== !1 && this.broadcastWatches();
        }
      }),
      (t.prototype.diff = function (n) {
        return (
          globalThis.__DEV__ !== !1 && de(n, "canonizeResults", "cache.diff"),
          this.storeReader.diffQueryAgainstStore(
            _(_({}, n), {
              store: n.optimistic ? this.optimisticData : this.data,
              rootId: n.id || "ROOT_QUERY",
              config: this.config,
            }),
          )
        );
      }),
      (t.prototype.watch = function (n) {
        var r = this;
        return (
          this.watches.size || U2(this),
          this.watches.add(n),
          n.immediate && this.maybeBroadcastWatch(n),
          function () {
            (r.watches.delete(n) && !r.watches.size && pp(r),
              r.maybeBroadcastWatch.forget(n));
          }
        );
      }),
      (t.prototype.gc = function (n) {
        (globalThis.__DEV__ !== !1 &&
          de(
            n || {},
            "resetResultIdentities",
            "cache.gc",
            "First ensure all usages of `canonizeResults` are removed, then remove this option.",
          ),
          wn.reset(),
          jn.reset());
        var r = this.optimisticData.gc();
        return (
          n &&
            !this.txCount &&
            (n.resetResultCache
              ? this.resetResultCache(n.resetResultIdentities)
              : n.resetResultIdentities && this.storeReader.resetCanon()),
          r
        );
      }),
      (t.prototype.retain = function (n, r) {
        return (r ? this.optimisticData : this.data).retain(n);
      }),
      (t.prototype.release = function (n, r) {
        return (r ? this.optimisticData : this.data).release(n);
      }),
      (t.prototype.identify = function (n) {
        if (X(n)) return n.__ref;
        try {
          return this.policies.identify(n)[0];
        } catch (r) {
          globalThis.__DEV__ !== !1 && I.warn(r);
        }
      }),
      (t.prototype.evict = function (n) {
        if (!n.id) {
          if (xe.call(n, "id")) return !1;
          n = _(_({}, n), { id: "ROOT_QUERY" });
        }
        try {
          return (++this.txCount, this.optimisticData.evict(n, this.data));
        } finally {
          !--this.txCount && n.broadcast !== !1 && this.broadcastWatches();
        }
      }),
      (t.prototype.reset = function (n) {
        var r = this;
        return (
          this.init(),
          wn.reset(),
          n && n.discardWatches
            ? (this.watches.forEach(function (i) {
                return r.maybeBroadcastWatch.forget(i);
              }),
              this.watches.clear(),
              pp(this))
            : this.broadcastWatches(),
          Promise.resolve()
        );
      }),
      (t.prototype.removeOptimistic = function (n) {
        var r = this.optimisticData.removeLayer(n);
        r !== this.optimisticData &&
          ((this.optimisticData = r), this.broadcastWatches());
      }),
      (t.prototype.batch = function (n) {
        var r = this,
          i = n.update,
          a = n.optimistic,
          o = a === void 0 ? !0 : a,
          s = n.removeOptimistic,
          l = n.onWatchUpdated,
          u,
          c = function (d) {
            var h = r,
              v = h.data,
              y = h.optimisticData;
            (++r.txCount, d && (r.data = r.optimisticData = d));
            try {
              return (u = i(r));
            } finally {
              (--r.txCount, (r.data = v), (r.optimisticData = y));
            }
          },
          f = new Set();
        return (
          l &&
            !this.txCount &&
            this.broadcastWatches(
              _(_({}, n), {
                onWatchUpdated: function (d) {
                  return (f.add(d), !1);
                },
              }),
            ),
          typeof o == "string"
            ? (this.optimisticData = this.optimisticData.addLayer(o, c))
            : o === !1
              ? c(this.data)
              : c(),
          typeof s == "string" &&
            (this.optimisticData = this.optimisticData.removeLayer(s)),
          l && f.size
            ? (this.broadcastWatches(
                _(_({}, n), {
                  onWatchUpdated: function (d, h) {
                    var v = l.call(this, d, h);
                    return (v !== !1 && f.delete(d), v);
                  },
                }),
              ),
              f.size &&
                f.forEach(function (d) {
                  return r.maybeBroadcastWatch.dirty(d);
                }))
            : this.broadcastWatches(n),
          u
        );
      }),
      (t.prototype.performTransaction = function (n, r) {
        return this.batch({ update: n, optimistic: r || r !== null });
      }),
      (t.prototype.transformDocument = function (n) {
        return this.addTypenameToDocument(this.addFragmentsToDocument(n));
      }),
      (t.prototype.fragmentMatches = function (n, r) {
        return this.policies.fragmentMatches(n, r);
      }),
      (t.prototype.lookupFragment = function (n) {
        var r;
        return (
          ((r = this.config.fragments) === null || r === void 0
            ? void 0
            : r.lookup(n)) || null
        );
      }),
      (t.prototype.broadcastWatches = function (n) {
        var r = this;
        this.txCount ||
          this.watches.forEach(function (i) {
            return r.maybeBroadcastWatch(i, n);
          });
      }),
      (t.prototype.addFragmentsToDocument = function (n) {
        var r = this.config.fragments;
        return r ? r.transform(n) : n;
      }),
      (t.prototype.addTypenameToDocument = function (n) {
        return this.addTypename
          ? this.addTypenameTransform.transformDocument(n)
          : n;
      }),
      (t.prototype.broadcastWatch = function (n, r) {
        var i = this,
          a = n.lastDiff,
          o = ke("canonizeResults", function () {
            return i.diff(n);
          });
        (r &&
          (n.optimistic &&
            typeof r.optimistic == "string" &&
            (o.fromOptimisticTransaction = !0),
          r.onWatchUpdated && r.onWatchUpdated.call(this, n, o, a) === !1)) ||
          ((!a || !K(a.result, o.result)) && n.callback((n.lastDiff = o), a));
      }),
      t
    );
  })(pg);
  globalThis.__DEV__ !== !1 && (kg.prototype.getMemoryInternals = $S);
  var W;
  (function (e) {
    ((e[(e.loading = 1)] = "loading"),
      (e[(e.setVariables = 2)] = "setVariables"),
      (e[(e.fetchMore = 3)] = "fetchMore"),
      (e[(e.refetch = 4)] = "refetch"),
      (e[(e.poll = 6)] = "poll"),
      (e[(e.ready = 7)] = "ready"),
      (e[(e.error = 8)] = "error"));
  })(W || (W = {}));
  function xr(e) {
    return e ? e < 7 : !1;
  }
  var _p = Object.assign,
    Y2 = Object.hasOwnProperty,
    Di = (function (e) {
      Dt(t, e);
      function t(n) {
        var r = n.queryManager,
          i = n.queryInfo,
          a = n.options,
          o = this,
          s = t.inactiveOnCreation.getValue();
        ((o =
          e.call(this, function (p) {
            o._getOrCreateQuery();
            try {
              var m = p._subscription._observer;
              m && !m.error && (m.error = X2);
            } catch {}
            var g = !o.observers.size;
            o.observers.add(p);
            var E = o.last;
            return (
              E && E.error
                ? p.error && p.error(E.error)
                : E && E.result && p.next && p.next(o.maskResult(E.result)),
              g && o.reobserve().catch(function () {}),
              function () {
                o.observers.delete(p) && !o.observers.size && o.tearDownQuery();
              }
            );
          }) || this),
          (o.observers = new Set()),
          (o.subscriptions = new Set()),
          (o.dirty = !1),
          (o._getOrCreateQuery = function () {
            return (
              s && (r.queries.set(o.queryId, i), (s = !1)),
              o.queryManager.getOrCreateQuery(o.queryId)
            );
          }),
          (o.queryInfo = i),
          (o.queryManager = r),
          (o.waitForOwnResult = al(a.fetchPolicy)),
          (o.isTornDown = !1),
          (o.subscribeToMore = o.subscribeToMore.bind(o)),
          (o.maskResult = o.maskResult.bind(o)));
        var l = r.defaultOptions.watchQuery,
          u = l === void 0 ? {} : l,
          c = u.fetchPolicy,
          f = c === void 0 ? "cache-first" : c,
          d = a.fetchPolicy,
          h = d === void 0 ? f : d,
          v = a.initialFetchPolicy,
          y = v === void 0 ? (h === "standby" ? f : h) : v;
        ((o.options = _(_({}, a), { initialFetchPolicy: y, fetchPolicy: h })),
          (o.queryId = i.queryId || r.generateQueryId()));
        var S = Yn(o.query);
        return ((o.queryName = S && S.name && S.name.value), o);
      }
      return (
        Object.defineProperty(t.prototype, "query", {
          get: function () {
            return this.lastQuery || this.options.query;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "variables", {
          get: function () {
            return this.options.variables;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.result = function () {
          var n = this;
          return (
            globalThis.__DEV__ !== !1 &&
              rn("observableQuery.result", function () {
                globalThis.__DEV__ !== !1 && I.warn(23);
              }),
            new Promise(function (r, i) {
              var a = {
                  next: function (s) {
                    (r(s),
                      n.observers.delete(a),
                      n.observers.size || n.queryManager.removeQuery(n.queryId),
                      setTimeout(function () {
                        o.unsubscribe();
                      }, 0));
                  },
                  error: i,
                },
                o = n.subscribe(a);
            })
          );
        }),
        (t.prototype.resetDiff = function () {
          this.queryInfo.resetDiff();
        }),
        (t.prototype.getCurrentFullResult = function (n) {
          var r = this;
          n === void 0 && (n = !0);
          var i = ke("getLastResult", function () {
              return r.getLastResult(!0);
            }),
            a =
              this.queryInfo.networkStatus || (i && i.networkStatus) || W.ready,
            o = _(_({}, i), { loading: xr(a), networkStatus: a }),
            s = this.options.fetchPolicy,
            l = s === void 0 ? "cache-first" : s;
          if (!(
            al(l) ||
            this.queryManager.getDocumentInfo(this.query).hasForcedResolvers
          ))
            if (this.waitForOwnResult) this.queryInfo.updateWatch();
            else {
              var u = this.queryInfo.getDiff();
              ((u.complete || this.options.returnPartialData) &&
                (o.data = u.result),
                K(o.data, {}) && (o.data = void 0),
                u.complete
                  ? (delete o.partial,
                    u.complete &&
                      o.networkStatus === W.loading &&
                      (l === "cache-first" || l === "cache-only") &&
                      ((o.networkStatus = W.ready), (o.loading = !1)))
                  : (o.partial = !0),
                o.networkStatus === W.ready &&
                  (o.error || o.errors) &&
                  (o.networkStatus = W.error),
                globalThis.__DEV__ !== !1 &&
                  !u.complete &&
                  !this.options.partialRefetch &&
                  !o.loading &&
                  !o.data &&
                  !o.error &&
                  Cg(u.missing));
            }
          return (n && this.updateLastResult(o), o);
        }),
        (t.prototype.getCurrentResult = function (n) {
          return (
            n === void 0 && (n = !0),
            this.maskResult(this.getCurrentFullResult(n))
          );
        }),
        (t.prototype.isDifferentFromLastResult = function (n, r) {
          if (!this.last) return !0;
          var i = this.queryManager.getDocumentInfo(this.query),
            a = this.queryManager.dataMasking,
            o = a ? i.nonReactiveQuery : this.query,
            s =
              a || i.hasNonreactiveDirective
                ? !sg(o, this.last.result, n, this.variables)
                : !K(this.last.result, n);
          return s || (r && !K(this.last.variables, r));
        }),
        (t.prototype.getLast = function (n, r) {
          var i = this.last;
          if (i && i[n] && (!r || K(i.variables, this.variables))) return i[n];
        }),
        (t.prototype.getLastResult = function (n) {
          return (
            globalThis.__DEV__ !== !1 &&
              rn("getLastResult", function () {
                globalThis.__DEV__ !== !1 && I.warn(24);
              }),
            this.getLast("result", n)
          );
        }),
        (t.prototype.getLastError = function (n) {
          return (
            globalThis.__DEV__ !== !1 &&
              rn("getLastError", function () {
                globalThis.__DEV__ !== !1 && I.warn(25);
              }),
            this.getLast("error", n)
          );
        }),
        (t.prototype.resetLastResults = function () {
          (globalThis.__DEV__ !== !1 &&
            rn("resetLastResults", function () {
              globalThis.__DEV__ !== !1 && I.warn(26);
            }),
            delete this.last,
            (this.isTornDown = !1));
        }),
        (t.prototype.resetQueryStoreErrors = function () {
          (globalThis.__DEV__ !== !1 && globalThis.__DEV__ !== !1 && I.warn(27),
            this.queryManager.resetErrors(this.queryId));
        }),
        (t.prototype.refetch = function (n) {
          var r,
            i = { pollInterval: 0 },
            a = this.options.fetchPolicy;
          if (
            (a === "no-cache"
              ? (i.fetchPolicy = "no-cache")
              : (i.fetchPolicy = "network-only"),
            globalThis.__DEV__ !== !1 && n && Y2.call(n, "variables"))
          ) {
            var o = Lv(this.query),
              s = o.variableDefinitions;
            (!s ||
              !s.some(function (l) {
                return l.variable.name.value === "variables";
              })) &&
              globalThis.__DEV__ !== !1 &&
              I.warn(
                28,
                n,
                ((r = o.name) === null || r === void 0 ? void 0 : r.value) || o,
              );
          }
          return (
            n &&
              !K(this.options.variables, n) &&
              (i.variables = this.options.variables =
                _(_({}, this.options.variables), n)),
            this.queryInfo.resetLastWrite(),
            this.reobserve(i, W.refetch)
          );
        }),
        (t.prototype.fetchMore = function (n) {
          var r = this,
            i = _(
              _(
                {},
                n.query
                  ? n
                  : _(
                      _(
                        _(_({}, this.options), { query: this.options.query }),
                        n,
                      ),
                      {
                        variables: _(
                          _({}, this.options.variables),
                          n.variables,
                        ),
                      },
                    ),
              ),
              { fetchPolicy: "no-cache" },
            );
          i.query = this.transformDocument(i.query);
          var a = this.queryManager.generateQueryId();
          this.lastQuery = n.query
            ? this.transformDocument(this.options.query)
            : i.query;
          var o = this.queryInfo,
            s = o.networkStatus;
          ((o.networkStatus = W.fetchMore),
            i.notifyOnNetworkStatusChange && this.observe());
          var l = new Set(),
            u = n == null ? void 0 : n.updateQuery,
            c = this.options.fetchPolicy !== "no-cache";
          return (
            c || I(u, 29),
            this.queryManager
              .fetchQuery(a, i, W.fetchMore)
              .then(function (f) {
                if (
                  (r.queryManager.removeQuery(a),
                  o.networkStatus === W.fetchMore && (o.networkStatus = s),
                  c)
                )
                  r.queryManager.cache.batch({
                    update: function (v) {
                      var y = n.updateQuery;
                      y
                        ? v.updateQuery(
                            {
                              query: r.query,
                              variables: r.variables,
                              returnPartialData: !0,
                              optimistic: !1,
                            },
                            function (S) {
                              return y(S, {
                                fetchMoreResult: f.data,
                                variables: i.variables,
                              });
                            },
                          )
                        : v.writeQuery({
                            query: i.query,
                            variables: i.variables,
                            data: f.data,
                          });
                    },
                    onWatchUpdated: function (v) {
                      l.add(v.query);
                    },
                  });
                else {
                  var d = r.getLast("result"),
                    h = u(d.data, {
                      fetchMoreResult: f.data,
                      variables: i.variables,
                    });
                  r.reportResult(
                    _(_({}, d), { networkStatus: s, loading: xr(s), data: h }),
                    r.variables,
                  );
                }
                return r.maskResult(f);
              })
              .finally(function () {
                c && !l.has(r.query) && r.reobserveCacheFirst();
              })
          );
        }),
        (t.prototype.subscribeToMore = function (n) {
          var r = this,
            i = this.queryManager
              .startGraphQLSubscription({
                query: n.document,
                variables: n.variables,
                context: n.context,
              })
              .subscribe({
                next: function (a) {
                  var o = n.updateQuery;
                  o &&
                    r.updateQuery(function (s, l) {
                      return o(s, _({ subscriptionData: a }, l));
                    });
                },
                error: function (a) {
                  if (n.onError) {
                    n.onError(a);
                    return;
                  }
                  globalThis.__DEV__ !== !1 && I.error(30, a);
                },
              });
          return (
            this.subscriptions.add(i),
            function () {
              r.subscriptions.delete(i) && i.unsubscribe();
            }
          );
        }),
        (t.prototype.setOptions = function (n) {
          return (
            globalThis.__DEV__ !== !1 &&
              (de(n, "canonizeResults", "setOptions"),
              rn("setOptions", function () {
                globalThis.__DEV__ !== !1 && I.warn(31);
              })),
            this.reobserve(n)
          );
        }),
        (t.prototype.silentSetOptions = function (n) {
          var r = Xn(this.options, n || {});
          _p(this.options, r);
        }),
        (t.prototype.setVariables = function (n) {
          var r = this;
          return K(this.variables, n)
            ? this.observers.size
              ? ke("observableQuery.result", function () {
                  return r.result();
                })
              : Promise.resolve()
            : ((this.options.variables = n),
              this.observers.size
                ? this.reobserve(
                    {
                      fetchPolicy: this.options.initialFetchPolicy,
                      variables: n,
                    },
                    W.setVariables,
                  )
                : Promise.resolve());
        }),
        (t.prototype.updateQuery = function (n) {
          var r = this.queryManager,
            i = r.cache.diff({
              query: this.options.query,
              variables: this.variables,
              returnPartialData: !0,
              optimistic: !1,
            }),
            a = i.result,
            o = i.complete,
            s = n(a, {
              variables: this.variables,
              complete: !!o,
              previousData: a,
            });
          s &&
            (r.cache.writeQuery({
              query: this.options.query,
              data: s,
              variables: this.variables,
            }),
            r.broadcastQueries());
        }),
        (t.prototype.startPolling = function (n) {
          ((this.options.pollInterval = n), this.updatePolling());
        }),
        (t.prototype.stopPolling = function () {
          ((this.options.pollInterval = 0), this.updatePolling());
        }),
        (t.prototype.applyNextFetchPolicy = function (n, r) {
          if (r.nextFetchPolicy) {
            var i = r.fetchPolicy,
              a = i === void 0 ? "cache-first" : i,
              o = r.initialFetchPolicy,
              s = o === void 0 ? a : o;
            a === "standby" ||
              (typeof r.nextFetchPolicy == "function"
                ? (r.fetchPolicy = r.nextFetchPolicy(a, {
                    reason: n,
                    options: r,
                    observable: this,
                    initialFetchPolicy: s,
                  }))
                : n === "variables-changed"
                  ? (r.fetchPolicy = s)
                  : (r.fetchPolicy = r.nextFetchPolicy));
          }
          return r.fetchPolicy;
        }),
        (t.prototype.fetch = function (n, r, i) {
          var a = this._getOrCreateQuery();
          return (
            a.setObservableQuery(this),
            this.queryManager.fetchConcastWithInfo(a, n, r, i)
          );
        }),
        (t.prototype.updatePolling = function () {
          var n = this;
          if (!this.queryManager.ssrMode) {
            var r = this,
              i = r.pollingInfo,
              a = r.options.pollInterval;
            if (!a || !this.hasObservers()) {
              i && (clearTimeout(i.timeout), delete this.pollingInfo);
              return;
            }
            if (!(i && i.interval === a)) {
              I(a, 32);
              var o = i || (this.pollingInfo = {});
              o.interval = a;
              var s = function () {
                  var u, c;
                  n.pollingInfo &&
                    (!xr(n.queryInfo.networkStatus) &&
                    !(
                      !(
                        (c = (u = n.options).skipPollAttempt) === null ||
                        c === void 0
                      ) && c.call(u)
                    )
                      ? n
                          .reobserve(
                            {
                              fetchPolicy:
                                n.options.initialFetchPolicy === "no-cache"
                                  ? "no-cache"
                                  : "network-only",
                            },
                            W.poll,
                          )
                          .then(l, l)
                      : l());
                },
                l = function () {
                  var u = n.pollingInfo;
                  u &&
                    (clearTimeout(u.timeout),
                    (u.timeout = setTimeout(s, u.interval)));
                };
              l();
            }
          }
        }),
        (t.prototype.updateLastResult = function (n, r) {
          var i = this;
          r === void 0 && (r = this.variables);
          var a = ke("getLastError", function () {
            return i.getLastError();
          });
          return (
            a && this.last && !K(r, this.last.variables) && (a = void 0),
            (this.last = _(
              {
                result: this.queryManager.assumeImmutableResults ? n : tg(n),
                variables: r,
              },
              a ? { error: a } : null,
            ))
          );
        }),
        (t.prototype.reobserveAsConcast = function (n, r) {
          var i = this;
          this.isTornDown = !1;
          var a = r === W.refetch || r === W.fetchMore || r === W.poll,
            o = this.options.variables,
            s = this.options.fetchPolicy,
            l = Xn(this.options, n || {}),
            u = a ? l : _p(this.options, l),
            c = this.transformDocument(u.query);
          ((this.lastQuery = c),
            a ||
              (this.updatePolling(),
              n &&
                n.variables &&
                !K(n.variables, o) &&
                u.fetchPolicy !== "standby" &&
                (u.fetchPolicy === s ||
                  typeof u.nextFetchPolicy == "function") &&
                (this.applyNextFetchPolicy("variables-changed", u),
                r === void 0 && (r = W.setVariables))),
            this.waitForOwnResult &&
              (this.waitForOwnResult = al(u.fetchPolicy)));
          var f = function () {
              i.concast === v && (i.waitForOwnResult = !1);
            },
            d = u.variables && _({}, u.variables),
            h = this.fetch(u, r, c),
            v = h.concast,
            y = h.fromLink,
            S = {
              next: function (p) {
                K(i.variables, d) && (f(), i.reportResult(p, d));
              },
              error: function (p) {
                K(i.variables, d) &&
                  (ag(p) || (p = new Ft({ networkError: p })),
                  f(),
                  i.reportError(p, d));
              },
            };
          return (
            !a &&
              (y || !this.concast) &&
              (this.concast &&
                this.observer &&
                this.concast.removeObserver(this.observer),
              (this.concast = v),
              (this.observer = S)),
            v.addObserver(S),
            v
          );
        }),
        (t.prototype.reobserve = function (n, r) {
          return AE(
            this.reobserveAsConcast(n, r).promise.then(this.maskResult),
          );
        }),
        (t.prototype.resubscribeAfterError = function () {
          for (var n = this, r = [], i = 0; i < arguments.length; i++)
            r[i] = arguments[i];
          var a = this.last;
          ke("resetLastResults", function () {
            return n.resetLastResults();
          });
          var o = this.subscribe.apply(this, r);
          return ((this.last = a), o);
        }),
        (t.prototype.observe = function () {
          this.reportResult(this.getCurrentFullResult(!1), this.variables);
        }),
        (t.prototype.reportResult = function (n, r) {
          var i = this,
            a = ke("getLastError", function () {
              return i.getLastError();
            }),
            o = this.isDifferentFromLastResult(n, r);
          ((a || !n.partial || this.options.returnPartialData) &&
            this.updateLastResult(n, r),
            (a || o) && Ni(this.observers, "next", this.maskResult(n)));
        }),
        (t.prototype.reportError = function (n, r) {
          var i = this,
            a = _(
              _(
                {},
                ke("getLastResult", function () {
                  return i.getLastResult();
                }),
              ),
              {
                error: n,
                errors: n.graphQLErrors,
                networkStatus: W.error,
                loading: !1,
              },
            );
          (this.updateLastResult(a, r),
            Ni(this.observers, "error", (this.last.error = n)));
        }),
        (t.prototype.hasObservers = function () {
          return this.observers.size > 0;
        }),
        (t.prototype.tearDownQuery = function () {
          this.isTornDown ||
            (this.concast &&
              this.observer &&
              (this.concast.removeObserver(this.observer),
              delete this.concast,
              delete this.observer),
            this.stopPolling(),
            this.subscriptions.forEach(function (n) {
              return n.unsubscribe();
            }),
            this.subscriptions.clear(),
            this.queryManager.stopQuery(this.queryId),
            this.observers.clear(),
            (this.isTornDown = !0));
        }),
        (t.prototype.transformDocument = function (n) {
          return this.queryManager.transform(n);
        }),
        (t.prototype.maskResult = function (n) {
          return n && "data" in n
            ? _(_({}, n), {
                data: this.queryManager.maskOperation({
                  document: this.query,
                  data: n.data,
                  fetchPolicy: this.options.fetchPolicy,
                  id: this.queryId,
                }),
              })
            : n;
        }),
        (t.prototype.resetNotifications = function () {
          (this.cancelNotifyTimeout(), (this.dirty = !1));
        }),
        (t.prototype.cancelNotifyTimeout = function () {
          this.notifyTimeout &&
            (clearTimeout(this.notifyTimeout), (this.notifyTimeout = void 0));
        }),
        (t.prototype.scheduleNotify = function () {
          var n = this;
          this.dirty ||
            ((this.dirty = !0),
            this.notifyTimeout ||
              (this.notifyTimeout = setTimeout(function () {
                return n.notify();
              }, 0)));
        }),
        (t.prototype.notify = function () {
          if (
            (this.cancelNotifyTimeout(),
            this.dirty &&
              (this.options.fetchPolicy == "cache-only" ||
                this.options.fetchPolicy == "cache-and-network" ||
                !xr(this.queryInfo.networkStatus)))
          ) {
            var n = this.queryInfo.getDiff();
            n.fromOptimisticTransaction
              ? this.observe()
              : this.reobserveCacheFirst();
          }
          this.dirty = !1;
        }),
        (t.prototype.reobserveCacheFirst = function () {
          var n = this.options,
            r = n.fetchPolicy,
            i = n.nextFetchPolicy;
          return r === "cache-and-network" || r === "network-only"
            ? this.reobserve({
                fetchPolicy: "cache-first",
                nextFetchPolicy: function (a, o) {
                  return (
                    (this.nextFetchPolicy = i),
                    typeof this.nextFetchPolicy == "function"
                      ? this.nextFetchPolicy(a, o)
                      : r
                  );
                },
              })
            : this.reobserve();
        }),
        (t.inactiveOnCreation = new ha()),
        t
      );
    })(te);
  ng(Di);
  function X2(e) {
    globalThis.__DEV__ !== !1 && I.error(33, e.message, e.stack);
  }
  function Cg(e) {
    globalThis.__DEV__ !== !1 &&
      e &&
      globalThis.__DEV__ !== !1 &&
      I.debug(34, e);
  }
  function al(e) {
    return e === "network-only" || e === "no-cache" || e === "standby";
  }
  var br = new (rr ? WeakMap : Map)();
  function ol(e, t) {
    var n = e[t];
    typeof n == "function" &&
      (e[t] = function () {
        return (br.set(e, (br.get(e) + 1) % 1e15), n.apply(this, arguments));
      });
  }
  var sl = (function () {
    function e(t, n) {
      (n === void 0 && (n = t.generateQueryId()),
        (this.queryId = n),
        (this.document = null),
        (this.lastRequestId = 1),
        (this.stopped = !1),
        (this.observableQuery = null));
      var r = (this.cache = t.cache);
      br.has(r) ||
        (br.set(r, 0), ol(r, "evict"), ol(r, "modify"), ol(r, "reset"));
    }
    return (
      (e.prototype.init = function (t) {
        var n = t.networkStatus || W.loading;
        return (
          this.variables &&
            this.networkStatus !== W.loading &&
            !K(this.variables, t.variables) &&
            (n = W.setVariables),
          K(t.variables, this.variables) ||
            ((this.lastDiff = void 0), this.cancel()),
          Object.assign(this, {
            document: t.document,
            variables: t.variables,
            networkError: null,
            graphQLErrors: this.graphQLErrors || [],
            networkStatus: n,
          }),
          t.observableQuery && this.setObservableQuery(t.observableQuery),
          t.lastRequestId && (this.lastRequestId = t.lastRequestId),
          this
        );
      }),
      (e.prototype.resetDiff = function () {
        this.lastDiff = void 0;
      }),
      (e.prototype.getDiff = function () {
        var t = this,
          n = this.getDiffOptions();
        if (this.lastDiff && K(n, this.lastDiff.options))
          return this.lastDiff.diff;
        this.updateWatch(this.variables);
        var r = this.observableQuery;
        if (r && r.options.fetchPolicy === "no-cache") return { complete: !1 };
        var i = ke("canonizeResults", function () {
          return t.cache.diff(n);
        });
        return (this.updateLastDiff(i, n), i);
      }),
      (e.prototype.updateLastDiff = function (t, n) {
        this.lastDiff = t
          ? { diff: t, options: n || this.getDiffOptions() }
          : void 0;
      }),
      (e.prototype.getDiffOptions = function (t) {
        var n;
        return (
          t === void 0 && (t = this.variables),
          {
            query: this.document,
            variables: t,
            returnPartialData: !0,
            optimistic: !0,
            canonizeResults:
              (n = this.observableQuery) === null || n === void 0
                ? void 0
                : n.options.canonizeResults,
          }
        );
      }),
      (e.prototype.setDiff = function (t) {
        var n = this,
          r,
          i = this.lastDiff && this.lastDiff.diff;
        (t &&
          !t.complete &&
          ke("getLastError", function () {
            var a;
            return (a = n.observableQuery) === null || a === void 0
              ? void 0
              : a.getLastError();
          })) ||
          (this.updateLastDiff(t),
          K(i && i.result, t && t.result) ||
            (r = this.observableQuery) === null ||
            r === void 0 ||
            r.scheduleNotify());
      }),
      (e.prototype.setObservableQuery = function (t) {
        t !== this.observableQuery &&
          ((this.observableQuery = t), t && (t.queryInfo = this));
      }),
      (e.prototype.stop = function () {
        var t;
        if (!this.stopped) {
          ((this.stopped = !0),
            (t = this.observableQuery) === null ||
              t === void 0 ||
              t.resetNotifications(),
            this.cancel());
          var n = this.observableQuery;
          n && n.stopPolling();
        }
      }),
      (e.prototype.cancel = function () {
        var t;
        ((t = this.cancelWatch) === null || t === void 0 || t.call(this),
          (this.cancelWatch = void 0));
      }),
      (e.prototype.updateWatch = function (t) {
        var n = this;
        t === void 0 && (t = this.variables);
        var r = this.observableQuery;
        if (!(r && r.options.fetchPolicy === "no-cache")) {
          var i = _(_({}, this.getDiffOptions(t)), {
            watcher: this,
            callback: function (a) {
              return n.setDiff(a);
            },
          });
          (!this.lastWatch || !K(i, this.lastWatch)) &&
            (this.cancel(),
            (this.cancelWatch = this.cache.watch((this.lastWatch = i))));
        }
      }),
      (e.prototype.resetLastWrite = function () {
        this.lastWrite = void 0;
      }),
      (e.prototype.shouldWrite = function (t, n) {
        var r = this.lastWrite;
        return !(
          r &&
          r.dmCount === br.get(this.cache) &&
          K(n, r.variables) &&
          K(t.data, r.result.data)
        );
      }),
      (e.prototype.markResult = function (t, n, r, i) {
        var a = this,
          o,
          s = new Tn(),
          l = lt(t.errors) ? t.errors.slice(0) : [];
        if (
          ((o = this.observableQuery) === null ||
            o === void 0 ||
            o.resetNotifications(),
          "incremental" in t && lt(t.incremental))
        ) {
          var u = rg(this.getDiff().result, t);
          t.data = u;
        } else if ("hasNext" in t && t.hasNext) {
          var c = this.getDiff();
          t.data = s.merge(c.result, t.data);
        }
        ((this.graphQLErrors = l),
          r.fetchPolicy === "no-cache"
            ? this.updateLastDiff(
                { result: t.data, complete: !0 },
                this.getDiffOptions(r.variables),
              )
            : i !== 0 &&
              (Mu(t, r.errorPolicy)
                ? this.cache.performTransaction(function (f) {
                    if (a.shouldWrite(t, r.variables))
                      (f.writeQuery({
                        query: n,
                        data: t.data,
                        variables: r.variables,
                        overwrite: i === 1,
                      }),
                        (a.lastWrite = {
                          result: t,
                          variables: r.variables,
                          dmCount: br.get(a.cache),
                        }));
                    else if (a.lastDiff && a.lastDiff.diff.complete) {
                      t.data = a.lastDiff.diff.result;
                      return;
                    }
                    var d = a.getDiffOptions(r.variables),
                      h = ke("canonizeResults", function () {
                        return f.diff(d);
                      });
                    (!a.stopped &&
                      K(a.variables, r.variables) &&
                      a.updateWatch(r.variables),
                      a.updateLastDiff(h, d),
                      h.complete && (t.data = h.result));
                  })
                : (this.lastWrite = void 0)));
      }),
      (e.prototype.markReady = function () {
        return ((this.networkError = null), (this.networkStatus = W.ready));
      }),
      (e.prototype.markError = function (t) {
        var n;
        return (
          (this.networkStatus = W.error),
          (this.lastWrite = void 0),
          (n = this.observableQuery) === null ||
            n === void 0 ||
            n.resetNotifications(),
          t.graphQLErrors && (this.graphQLErrors = t.graphQLErrors),
          t.networkError && (this.networkError = t.networkError),
          t
        );
      }),
      e
    );
  })();
  function Mu(e, t) {
    t === void 0 && (t = "none");
    var n = t === "ignore" || t === "all",
      r = !to(e);
    return (!r && n && e.data && (r = !0), r);
  }
  var K2 = Object.prototype.hasOwnProperty,
    Tp = Object.create(null),
    J2 = (function () {
      function e(t) {
        var n = this;
        ((this.clientAwareness = {}),
          (this.queries = new Map()),
          (this.fetchCancelFns = new Map()),
          (this.transformCache = new qc(
            It["queryManager.getDocumentInfo"] || 2e3,
          )),
          (this.queryIdCounter = 1),
          (this.requestIdCounter = 1),
          (this.mutationIdCounter = 1),
          (this.inFlightLinkObservables = new Ht(!1)),
          (this.noCacheWarningsByQueryId = new Set()));
        var r = new Gv(
          function (a) {
            return n.cache.transformDocument(a);
          },
          { cache: !1 },
        );
        ((this.cache = t.cache),
          (this.link = t.link),
          (this.defaultOptions = t.defaultOptions),
          (this.queryDeduplication = t.queryDeduplication),
          (this.clientAwareness = t.clientAwareness),
          (this.localState = t.localState),
          (this.ssrMode = t.ssrMode),
          (this.assumeImmutableResults = t.assumeImmutableResults),
          (this.dataMasking = t.dataMasking));
        var i = t.documentTransform;
        ((this.documentTransform = i ? r.concat(i).concat(r) : r),
          (this.defaultContext = t.defaultContext || Object.create(null)),
          (this.onBroadcast = t.onBroadcast) &&
            (this.mutationStore = Object.create(null)));
      }
      return (
        (e.prototype.stop = function () {
          var t = this;
          (this.queries.forEach(function (n, r) {
            t.stopQueryNoBroadcast(r);
          }),
            this.cancelPendingFetches(je(35)));
        }),
        (e.prototype.cancelPendingFetches = function (t) {
          (this.fetchCancelFns.forEach(function (n) {
            return n(t);
          }),
            this.fetchCancelFns.clear());
        }),
        (e.prototype.mutate = function (t) {
          return Jt(this, arguments, void 0, function (n) {
            var r,
              i,
              a,
              o,
              s,
              l,
              u,
              c = n.mutation,
              f = n.variables,
              d = n.optimisticResponse,
              h = n.updateQueries,
              v = n.refetchQueries,
              y = v === void 0 ? [] : v,
              S = n.awaitRefetchQueries,
              p = S === void 0 ? !1 : S,
              m = n.update,
              g = n.onQueryUpdated,
              E = n.fetchPolicy,
              x =
                E === void 0
                  ? ((l = this.defaultOptions.mutate) === null || l === void 0
                      ? void 0
                      : l.fetchPolicy) || "network-only"
                  : E,
              b = n.errorPolicy,
              k =
                b === void 0
                  ? ((u = this.defaultOptions.mutate) === null || u === void 0
                      ? void 0
                      : u.errorPolicy) || "none"
                  : b,
              T = n.keepRootFields,
              R = n.context;
            return Zt(this, function (j) {
              switch (j.label) {
                case 0:
                  return (
                    I(c, 36),
                    I(x === "network-only" || x === "no-cache", 37),
                    (r = this.generateMutationId()),
                    (c = this.cache.transformForLink(this.transform(c))),
                    (i = this.getDocumentInfo(c).hasClientExports),
                    (f = this.getVariables(c, f)),
                    i
                      ? [4, this.localState.addExportedVariables(c, f, R)]
                      : [3, 2]
                  );
                case 1:
                  ((f = j.sent()), (j.label = 2));
                case 2:
                  return (
                    (a =
                      this.mutationStore &&
                      (this.mutationStore[r] = {
                        mutation: c,
                        variables: f,
                        loading: !0,
                        error: null,
                      })),
                    (o =
                      d &&
                      this.markMutationOptimistic(d, {
                        mutationId: r,
                        document: c,
                        variables: f,
                        fetchPolicy: x,
                        errorPolicy: k,
                        context: R,
                        updateQueries: h,
                        update: m,
                        keepRootFields: T,
                      })),
                    this.broadcastQueries(),
                    (s = this),
                    [
                      2,
                      new Promise(function (M, A) {
                        return el(
                          s.getObservableFromLink(
                            c,
                            _(_({}, R), { optimisticResponse: o ? d : void 0 }),
                            f,
                            {},
                            !1,
                          ),
                          function (B) {
                            if (to(B) && k === "none")
                              throw new Ft({ graphQLErrors: _u(B) });
                            a && ((a.loading = !1), (a.error = null));
                            var Y = _({}, B);
                            return (
                              typeof y == "function" && (y = y(Y)),
                              k === "ignore" && to(Y) && delete Y.errors,
                              s.markMutationResult({
                                mutationId: r,
                                result: Y,
                                document: c,
                                variables: f,
                                fetchPolicy: x,
                                errorPolicy: k,
                                context: R,
                                update: m,
                                updateQueries: h,
                                awaitRefetchQueries: p,
                                refetchQueries: y,
                                removeOptimistic: o ? r : void 0,
                                onQueryUpdated: g,
                                keepRootFields: T,
                              })
                            );
                          },
                        ).subscribe({
                          next: function (B) {
                            (s.broadcastQueries(),
                              (!("hasNext" in B) || B.hasNext === !1) &&
                                M(
                                  _(_({}, B), {
                                    data: s.maskOperation({
                                      document: c,
                                      data: B.data,
                                      fetchPolicy: x,
                                      id: r,
                                    }),
                                  }),
                                ));
                          },
                          error: function (B) {
                            (a && ((a.loading = !1), (a.error = B)),
                              o && s.cache.removeOptimistic(r),
                              s.broadcastQueries(),
                              A(
                                B instanceof Ft
                                  ? B
                                  : new Ft({ networkError: B }),
                              ));
                          },
                        });
                      }),
                    ]
                  );
              }
            });
          });
        }),
        (e.prototype.markMutationResult = function (t, n) {
          var r = this;
          n === void 0 && (n = this.cache);
          var i = t.result,
            a = [],
            o = t.fetchPolicy === "no-cache";
          if (!o && Mu(i, t.errorPolicy)) {
            if (
              (Ir(i) ||
                a.push({
                  result: i.data,
                  dataId: "ROOT_MUTATION",
                  query: t.document,
                  variables: t.variables,
                }),
              Ir(i) && lt(i.incremental))
            ) {
              var s = n.diff({
                  id: "ROOT_MUTATION",
                  query: this.getDocumentInfo(t.document).asQuery,
                  variables: t.variables,
                  optimistic: !1,
                  returnPartialData: !0,
                }),
                l = void 0;
              (s.result && (l = rg(s.result, i)),
                typeof l < "u" &&
                  ((i.data = l),
                  a.push({
                    result: l,
                    dataId: "ROOT_MUTATION",
                    query: t.document,
                    variables: t.variables,
                  })));
            }
            var u = t.updateQueries;
            u &&
              this.queries.forEach(function (f, d) {
                var h = f.observableQuery,
                  v = h && h.queryName;
                if (!(!v || !K2.call(u, v))) {
                  var y = u[v],
                    S = r.queries.get(d),
                    p = S.document,
                    m = S.variables,
                    g = n.diff({
                      query: p,
                      variables: m,
                      returnPartialData: !0,
                      optimistic: !1,
                    }),
                    E = g.result,
                    x = g.complete;
                  if (x && E) {
                    var b = y(E, {
                      mutationResult: i,
                      queryName: (p && gi(p)) || void 0,
                      queryVariables: m,
                    });
                    b &&
                      a.push({
                        result: b,
                        dataId: "ROOT_QUERY",
                        query: p,
                        variables: m,
                      });
                  }
                }
              });
          }
          if (
            a.length > 0 ||
            (t.refetchQueries || "").length > 0 ||
            t.update ||
            t.onQueryUpdated ||
            t.removeOptimistic
          ) {
            var c = [];
            if (
              (this.refetchQueries({
                updateCache: function (f) {
                  o ||
                    a.forEach(function (y) {
                      return f.write(y);
                    });
                  var d = t.update,
                    h = !UE(i) || (Ir(i) && !i.hasNext);
                  if (d) {
                    if (!o) {
                      var v = f.diff({
                        id: "ROOT_MUTATION",
                        query: r.getDocumentInfo(t.document).asQuery,
                        variables: t.variables,
                        optimistic: !1,
                        returnPartialData: !0,
                      });
                      v.complete &&
                        ((i = _(_({}, i), { data: v.result })),
                        "incremental" in i && delete i.incremental,
                        "hasNext" in i && delete i.hasNext);
                    }
                    h &&
                      d(f, i, { context: t.context, variables: t.variables });
                  }
                  !o &&
                    !t.keepRootFields &&
                    h &&
                    f.modify({
                      id: "ROOT_MUTATION",
                      fields: function (y, S) {
                        var p = S.fieldName,
                          m = S.DELETE;
                        return p === "__typename" ? y : m;
                      },
                    });
                },
                include: t.refetchQueries,
                optimistic: !1,
                removeOptimistic: t.removeOptimistic,
                onQueryUpdated: t.onQueryUpdated || null,
              }).forEach(function (f) {
                return c.push(f);
              }),
              t.awaitRefetchQueries || t.onQueryUpdated)
            )
              return Promise.all(c).then(function () {
                return i;
              });
          }
          return Promise.resolve(i);
        }),
        (e.prototype.markMutationOptimistic = function (t, n) {
          var r = this,
            i = typeof t == "function" ? t(n.variables, { IGNORE: Tp }) : t;
          return i === Tp
            ? !1
            : (this.cache.recordOptimisticTransaction(function (a) {
                try {
                  r.markMutationResult(_(_({}, n), { result: { data: i } }), a);
                } catch (o) {
                  globalThis.__DEV__ !== !1 && I.error(o);
                }
              }, n.mutationId),
              !0);
        }),
        (e.prototype.fetchQuery = function (t, n, r) {
          return this.fetchConcastWithInfo(this.getOrCreateQuery(t), n, r)
            .concast.promise;
        }),
        (e.prototype.getQueryStore = function () {
          var t = Object.create(null);
          return (
            this.queries.forEach(function (n, r) {
              t[r] = {
                variables: n.variables,
                networkStatus: n.networkStatus,
                networkError: n.networkError,
                graphQLErrors: n.graphQLErrors,
              };
            }),
            t
          );
        }),
        (e.prototype.resetErrors = function (t) {
          var n = this.queries.get(t);
          n && ((n.networkError = void 0), (n.graphQLErrors = []));
        }),
        (e.prototype.transform = function (t) {
          return this.documentTransform.transformDocument(t);
        }),
        (e.prototype.getDocumentInfo = function (t) {
          var n = this.transformCache;
          if (!n.has(t)) {
            var r = {
              hasClientExports: xS(t),
              hasForcedResolvers: this.localState.shouldForceResolvers(t),
              hasNonreactiveDirective: ea(["nonreactive"], t),
              nonReactiveQuery: kE(t),
              clientQuery: this.localState.clientQuery(t),
              serverQuery: Xv(
                [
                  { name: "client", remove: !0 },
                  { name: "connection" },
                  { name: "nonreactive" },
                  { name: "unmask" },
                ],
                t,
              ),
              defaultVars: Hc(Yn(t)),
              asQuery: _(_({}, t), {
                definitions: t.definitions.map(function (i) {
                  return i.kind === "OperationDefinition" &&
                    i.operation !== "query"
                    ? _(_({}, i), { operation: "query" })
                    : i;
                }),
              }),
            };
            n.set(t, r);
          }
          return n.get(t);
        }),
        (e.prototype.getVariables = function (t, n) {
          return _(_({}, this.getDocumentInfo(t).defaultVars), n);
        }),
        (e.prototype.watchQuery = function (t) {
          var n = this.transform(t.query);
          ((t = _(_({}, t), { variables: this.getVariables(n, t.variables) })),
            typeof t.notifyOnNetworkStatusChange > "u" &&
              (t.notifyOnNetworkStatusChange = !1));
          var r = new sl(this),
            i = new Di({ queryManager: this, queryInfo: r, options: t });
          return (
            (i.lastQuery = n),
            Di.inactiveOnCreation.getValue() || this.queries.set(i.queryId, r),
            r.init({ document: n, observableQuery: i, variables: i.variables }),
            i
          );
        }),
        (e.prototype.query = function (t, n) {
          var r = this;
          (n === void 0 && (n = this.generateQueryId()),
            I(t.query, 38),
            I(t.query.kind === "Document", 39),
            I(!t.returnPartialData, 40),
            I(!t.pollInterval, 41));
          var i = this.transform(t.query);
          return this.fetchQuery(n, _(_({}, t), { query: i }))
            .then(function (a) {
              return (
                a &&
                _(_({}, a), {
                  data: r.maskOperation({
                    document: i,
                    data: a.data,
                    fetchPolicy: t.fetchPolicy,
                    id: n,
                  }),
                })
              );
            })
            .finally(function () {
              return r.stopQuery(n);
            });
        }),
        (e.prototype.generateQueryId = function () {
          return String(this.queryIdCounter++);
        }),
        (e.prototype.generateRequestId = function () {
          return this.requestIdCounter++;
        }),
        (e.prototype.generateMutationId = function () {
          return String(this.mutationIdCounter++);
        }),
        (e.prototype.stopQueryInStore = function (t) {
          (this.stopQueryInStoreNoBroadcast(t), this.broadcastQueries());
        }),
        (e.prototype.stopQueryInStoreNoBroadcast = function (t) {
          var n = this.queries.get(t);
          n && n.stop();
        }),
        (e.prototype.clearStore = function (t) {
          return (
            t === void 0 && (t = { discardWatches: !0 }),
            this.cancelPendingFetches(je(42)),
            this.queries.forEach(function (n) {
              n.observableQuery ? (n.networkStatus = W.loading) : n.stop();
            }),
            this.mutationStore && (this.mutationStore = Object.create(null)),
            this.cache.reset(t)
          );
        }),
        (e.prototype.getObservableQueries = function (t) {
          var n = this;
          t === void 0 && (t = "active");
          var r = new Map(),
            i = new Map(),
            a = new Map(),
            o = new Set();
          return (
            Array.isArray(t) &&
              t.forEach(function (s) {
                if (typeof s == "string") (i.set(s, s), a.set(s, !1));
                else if (JS(s)) {
                  var l = jn(n.transform(s));
                  (i.set(l, gi(s)), a.set(l, !1));
                } else ce(s) && s.query && o.add(s);
              }),
            this.queries.forEach(function (s, l) {
              var u = s.observableQuery,
                c = s.document;
              if (u) {
                if (t === "all") {
                  r.set(l, u);
                  return;
                }
                var f = u.queryName,
                  d = u.options.fetchPolicy;
                if (d === "standby" || (t === "active" && !u.hasObservers()))
                  return;
                (t === "active" || (f && a.has(f)) || (c && a.has(jn(c)))) &&
                  (r.set(l, u), f && a.set(f, !0), c && a.set(jn(c), !0));
              }
            }),
            o.size &&
              o.forEach(function (s) {
                var l = du("legacyOneTimeQuery"),
                  u = n
                    .getOrCreateQuery(l)
                    .init({ document: s.query, variables: s.variables }),
                  c = new Di({
                    queryManager: n,
                    queryInfo: u,
                    options: _(_({}, s), { fetchPolicy: "network-only" }),
                  });
                (I(c.queryId === l), u.setObservableQuery(c), r.set(l, c));
              }),
            globalThis.__DEV__ !== !1 &&
              a.size &&
              a.forEach(function (s, l) {
                if (!s) {
                  var u = i.get(l);
                  u
                    ? globalThis.__DEV__ !== !1 && I.warn(43, u)
                    : globalThis.__DEV__ !== !1 && I.warn(44);
                }
              }),
            r
          );
        }),
        (e.prototype.reFetchObservableQueries = function (t) {
          var n = this;
          t === void 0 && (t = !1);
          var r = [];
          return (
            this.getObservableQueries(t ? "all" : "active").forEach(
              function (i, a) {
                var o = i.options.fetchPolicy;
                (ke("resetLastResults", function () {
                  return i.resetLastResults();
                }),
                  (t || (o !== "standby" && o !== "cache-only")) &&
                    r.push(i.refetch()),
                  (n.queries.get(a) || i.queryInfo).setDiff(null));
              },
            ),
            this.broadcastQueries(),
            Promise.all(r)
          );
        }),
        (e.prototype.startGraphQLSubscription = function (t) {
          var n = this,
            r = t.query,
            i = t.variables,
            a = t.fetchPolicy,
            o = t.errorPolicy,
            s = o === void 0 ? "none" : o,
            l = t.context,
            u = l === void 0 ? {} : l,
            c = t.extensions,
            f = c === void 0 ? {} : c;
          ((r = this.transform(r)), (i = this.getVariables(r, i)));
          var d = function (v) {
            return n.getObservableFromLink(r, u, v, f).map(function (y) {
              a !== "no-cache" &&
                (Mu(y, s) &&
                  n.cache.write({
                    query: r,
                    result: y.data,
                    dataId: "ROOT_SUBSCRIPTION",
                    variables: v,
                  }),
                n.broadcastQueries());
              var S = to(y),
                p = s2(y);
              if (S || p) {
                var m = {};
                if (
                  (S && (m.graphQLErrors = y.errors),
                  p && (m.protocolErrors = y.extensions[tf]),
                  s === "none" || p)
                )
                  throw new Ft(m);
              }
              return (s === "ignore" && delete y.errors, y);
            });
          };
          if (this.getDocumentInfo(r).hasClientExports) {
            var h = this.localState.addExportedVariables(r, i, u).then(d);
            return new te(function (v) {
              var y = null;
              return (
                h.then(function (S) {
                  return (y = S.subscribe(v));
                }, v.error),
                function () {
                  return y && y.unsubscribe();
                }
              );
            });
          }
          return d(i);
        }),
        (e.prototype.stopQuery = function (t) {
          (this.stopQueryNoBroadcast(t), this.broadcastQueries());
        }),
        (e.prototype.stopQueryNoBroadcast = function (t) {
          (this.stopQueryInStoreNoBroadcast(t), this.removeQuery(t));
        }),
        (e.prototype.removeQuery = function (t) {
          var n;
          (this.fetchCancelFns.delete(t),
            this.queries.has(t) &&
              ((n = this.queries.get(t)) === null || n === void 0 || n.stop(),
              this.queries.delete(t)));
        }),
        (e.prototype.broadcastQueries = function () {
          (this.onBroadcast && this.onBroadcast(),
            this.queries.forEach(function (t) {
              var n;
              return (n = t.observableQuery) === null || n === void 0
                ? void 0
                : n.notify();
            }));
        }),
        (e.prototype.getLocalState = function () {
          return this.localState;
        }),
        (e.prototype.getObservableFromLink = function (t, n, r, i, a) {
          var o = this,
            s;
          a === void 0 &&
            (a =
              (s = n == null ? void 0 : n.queryDeduplication) !== null &&
              s !== void 0
                ? s
                : this.queryDeduplication);
          var l,
            u = this.getDocumentInfo(t),
            c = u.serverQuery,
            f = u.clientQuery;
          if (c) {
            var d = this,
              h = d.inFlightLinkObservables,
              v = d.link,
              y = {
                query: c,
                variables: r,
                operationName: gi(c) || void 0,
                context: this.prepareContext(_(_({}, n), { forceFetch: !a })),
                extensions: i,
              };
            if (((n = y.context), a)) {
              var S = jn(c),
                p = wn(r),
                m = h.lookup(S, p);
              if (((l = m.observable), !l)) {
                var g = new or([ku(v, y)]);
                ((l = m.observable = g),
                  g.beforeNext(function E(x, b) {
                    x === "next" && "hasNext" in b && b.hasNext
                      ? g.beforeNext(E)
                      : h.remove(S, p);
                  }));
              }
            } else l = new or([ku(v, y)]);
          } else
            ((l = new or([te.of({ data: {} })])), (n = this.prepareContext(n)));
          return (
            f &&
              (l = el(l, function (E) {
                return o.localState.runResolvers({
                  document: f,
                  remoteResult: E,
                  context: n,
                  variables: r,
                });
              })),
            l
          );
        }),
        (e.prototype.getResultsFromLink = function (t, n, r) {
          var i = (t.lastRequestId = this.generateRequestId()),
            a = this.cache.transformForLink(r.query);
          return el(
            this.getObservableFromLink(a, r.context, r.variables),
            function (o) {
              var s = _u(o),
                l = s.length > 0,
                u = r.errorPolicy;
              if (i >= t.lastRequestId) {
                if (l && u === "none")
                  throw t.markError(new Ft({ graphQLErrors: s }));
                (t.markResult(o, a, r, n), t.markReady());
              }
              var c = { data: o.data, loading: !1, networkStatus: W.ready };
              return (
                l && u === "none" && (c.data = void 0),
                l &&
                  u !== "ignore" &&
                  ((c.errors = s), (c.networkStatus = W.error)),
                c
              );
            },
            function (o) {
              var s = ag(o) ? o : new Ft({ networkError: o });
              throw (i >= t.lastRequestId && t.markError(s), s);
            },
          );
        }),
        (e.prototype.fetchConcastWithInfo = function (t, n, r, i) {
          var a = this;
          (r === void 0 && (r = W.loading), i === void 0 && (i = n.query));
          var o = this.getVariables(i, n.variables),
            s = this.defaultOptions.watchQuery,
            l = n.fetchPolicy,
            u = l === void 0 ? (s && s.fetchPolicy) || "cache-first" : l,
            c = n.errorPolicy,
            f = c === void 0 ? (s && s.errorPolicy) || "none" : c,
            d = n.returnPartialData,
            h = d === void 0 ? !1 : d,
            v = n.notifyOnNetworkStatusChange,
            y = v === void 0 ? !1 : v,
            S = n.context,
            p = S === void 0 ? {} : S,
            m = Object.assign({}, n, {
              query: i,
              variables: o,
              fetchPolicy: u,
              errorPolicy: f,
              returnPartialData: h,
              notifyOnNetworkStatusChange: y,
              context: p,
            }),
            g = function (T) {
              m.variables = T;
              var R = a.fetchQueryByPolicy(t, m, r);
              return (
                m.fetchPolicy !== "standby" &&
                  R.sources.length > 0 &&
                  t.observableQuery &&
                  t.observableQuery.applyNextFetchPolicy("after-fetch", n),
                R
              );
            },
            E = function () {
              return a.fetchCancelFns.delete(t.queryId);
            };
          this.fetchCancelFns.set(t.queryId, function (T) {
            (E(),
              setTimeout(function () {
                return x.cancel(T);
              }));
          });
          var x, b;
          if (this.getDocumentInfo(m.query).hasClientExports)
            ((x = new or(
              this.localState
                .addExportedVariables(m.query, m.variables, m.context)
                .then(g)
                .then(function (T) {
                  return T.sources;
                }),
            )),
              (b = !0));
          else {
            var k = g(m.variables);
            ((b = k.fromLink), (x = new or(k.sources)));
          }
          return (x.promise.then(E, E), { concast: x, fromLink: b });
        }),
        (e.prototype.refetchQueries = function (t) {
          var n = this,
            r = t.updateCache,
            i = t.include,
            a = t.optimistic,
            o = a === void 0 ? !1 : a,
            s = t.removeOptimistic,
            l = s === void 0 ? (o ? du("refetchQueries") : void 0) : s,
            u = t.onQueryUpdated,
            c = new Map();
          i &&
            this.getObservableQueries(i).forEach(function (d, h) {
              c.set(h, {
                oq: d,
                lastDiff: (n.queries.get(h) || d.queryInfo).getDiff(),
              });
            });
          var f = new Map();
          return (
            r &&
              this.cache.batch({
                update: r,
                optimistic: (o && l) || !1,
                removeOptimistic: l,
                onWatchUpdated: function (d, h, v) {
                  var y = d.watcher instanceof sl && d.watcher.observableQuery;
                  if (y) {
                    if (u) {
                      c.delete(y.queryId);
                      var S = u(y, h, v);
                      return (
                        S === !0 && (S = y.refetch()),
                        S !== !1 && f.set(y, S),
                        S
                      );
                    }
                    u !== null &&
                      c.set(y.queryId, { oq: y, lastDiff: v, diff: h });
                  }
                },
              }),
            c.size &&
              c.forEach(function (d, h) {
                var v = d.oq,
                  y = d.lastDiff,
                  S = d.diff,
                  p;
                (u &&
                  (S ||
                    (S = ke("canonizeResults", function () {
                      return n.cache.diff(v.queryInfo.getDiffOptions());
                    })),
                  (p = u(v, S, y))),
                  (!u || p === !0) && (p = v.refetch()),
                  p !== !1 && f.set(v, p),
                  h.indexOf("legacyOneTimeQuery") >= 0 &&
                    n.stopQueryNoBroadcast(h));
              }),
            l && this.cache.removeOptimistic(l),
            f
          );
        }),
        (e.prototype.maskOperation = function (t) {
          var n,
            r,
            i,
            a = t.document,
            o = t.data;
          if (globalThis.__DEV__ !== !1) {
            var s = t.fetchPolicy,
              l = t.id,
              u = (n = Yn(a)) === null || n === void 0 ? void 0 : n.operation,
              c =
                ((r = u == null ? void 0 : u[0]) !== null && r !== void 0
                  ? r
                  : "o") + l;
            this.dataMasking &&
              s === "no-cache" &&
              !RS(a) &&
              !this.noCacheWarningsByQueryId.has(c) &&
              (this.noCacheWarningsByQueryId.add(c),
              globalThis.__DEV__ !== !1 &&
                I.warn(
                  45,
                  (i = gi(a)) !== null && i !== void 0
                    ? i
                    : "Unnamed ".concat(u ?? "operation"),
                ));
          }
          return this.dataMasking ? D2(o, a, this.cache) : o;
        }),
        (e.prototype.maskFragment = function (t) {
          var n = t.data,
            r = t.fragment,
            i = t.fragmentName;
          return this.dataMasking ? dg(n, r, this.cache, i) : n;
        }),
        (e.prototype.fetchQueryByPolicy = function (t, n, r) {
          var i = this,
            a = n.query,
            o = n.variables,
            s = n.fetchPolicy,
            l = n.refetchWritePolicy,
            u = n.errorPolicy,
            c = n.returnPartialData,
            f = n.context,
            d = n.notifyOnNetworkStatusChange,
            h = t.networkStatus;
          t.init({ document: a, variables: o, networkStatus: r });
          var v = function () {
              return t.getDiff();
            },
            y = function (E, x) {
              x === void 0 && (x = t.networkStatus || W.loading);
              var b = E.result;
              globalThis.__DEV__ !== !1 && !c && !K(b, {}) && Cg(E.missing);
              var k = function (T) {
                return te.of(
                  _(
                    { data: T, loading: xr(x), networkStatus: x },
                    E.complete ? null : { partial: !0 },
                  ),
                );
              };
              return b && i.getDocumentInfo(a).hasForcedResolvers
                ? i.localState
                    .runResolvers({
                      document: a,
                      remoteResult: { data: b },
                      context: f,
                      variables: o,
                      onlyRunForcedResolvers: !0,
                    })
                    .then(function (T) {
                      return k(T.data || void 0);
                    })
                : u === "none" && x === W.refetch && Array.isArray(E.missing)
                  ? k(void 0)
                  : k(b);
            },
            S = s === "no-cache" ? 0 : r === W.refetch && l !== "merge" ? 1 : 2,
            p = function () {
              return i.getResultsFromLink(t, S, {
                query: a,
                variables: o,
                context: f,
                fetchPolicy: s,
                errorPolicy: u,
              });
            },
            m = d && typeof h == "number" && h !== r && xr(r);
          switch (s) {
            default:
            case "cache-first": {
              var g = v();
              return g.complete
                ? { fromLink: !1, sources: [y(g, t.markReady())] }
                : c || m
                  ? { fromLink: !0, sources: [y(g), p()] }
                  : { fromLink: !0, sources: [p()] };
            }
            case "cache-and-network": {
              var g = v();
              return g.complete || c || m
                ? { fromLink: !0, sources: [y(g), p()] }
                : { fromLink: !0, sources: [p()] };
            }
            case "cache-only":
              return { fromLink: !1, sources: [y(v(), t.markReady())] };
            case "network-only":
              return m
                ? { fromLink: !0, sources: [y(v()), p()] }
                : { fromLink: !0, sources: [p()] };
            case "no-cache":
              return m
                ? { fromLink: !0, sources: [y(t.getDiff()), p()] }
                : { fromLink: !0, sources: [p()] };
            case "standby":
              return { fromLink: !1, sources: [] };
          }
        }),
        (e.prototype.getOrCreateQuery = function (t) {
          return (
            t && !this.queries.has(t) && this.queries.set(t, new sl(this, t)),
            this.queries.get(t)
          );
        }),
        (e.prototype.prepareContext = function (t) {
          t === void 0 && (t = {});
          var n = this.localState.prepareContext(t);
          return _(_(_({}, this.defaultContext), n), {
            clientAwareness: this.clientAwareness,
          });
        }),
        e
      );
    })(),
    Z2 = (function () {
      function e(t) {
        var n = t.cache,
          r = t.client,
          i = t.resolvers,
          a = t.fragmentMatcher;
        ((this.selectionsToResolveCache = new WeakMap()),
          (this.cache = n),
          r && (this.client = r),
          i && this.addResolvers(i),
          a && this.setFragmentMatcher(a));
      }
      return (
        (e.prototype.addResolvers = function (t) {
          var n = this;
          ((this.resolvers = this.resolvers || {}),
            Array.isArray(t)
              ? t.forEach(function (r) {
                  n.resolvers = Wd(n.resolvers, r);
                })
              : (this.resolvers = Wd(this.resolvers, t)));
        }),
        (e.prototype.setResolvers = function (t) {
          ((this.resolvers = {}), this.addResolvers(t));
        }),
        (e.prototype.getResolvers = function () {
          return this.resolvers || {};
        }),
        (e.prototype.runResolvers = function (t) {
          return Jt(this, arguments, void 0, function (n) {
            var r = n.document,
              i = n.remoteResult,
              a = n.context,
              o = n.variables,
              s = n.onlyRunForcedResolvers,
              l = s === void 0 ? !1 : s;
            return Zt(this, function (u) {
              return r
                ? [
                    2,
                    this.resolveDocument(
                      r,
                      i.data,
                      a,
                      o,
                      this.fragmentMatcher,
                      l,
                    ).then(function (c) {
                      return _(_({}, i), { data: c.result });
                    }),
                  ]
                : [2, i];
            });
          });
        }),
        (e.prototype.setFragmentMatcher = function (t) {
          this.fragmentMatcher = t;
        }),
        (e.prototype.getFragmentMatcher = function () {
          return this.fragmentMatcher;
        }),
        (e.prototype.clientQuery = function (t) {
          return ea(["client"], t) && this.resolvers ? t : null;
        }),
        (e.prototype.serverQuery = function (t) {
          return Kv(t);
        }),
        (e.prototype.prepareContext = function (t) {
          var n = this.cache;
          return _(_({}, t), {
            cache: n,
            getCacheKey: function (r) {
              return n.identify(r);
            },
          });
        }),
        (e.prototype.addExportedVariables = function (t) {
          return Jt(this, arguments, void 0, function (n, r, i) {
            return (
              r === void 0 && (r = {}),
              i === void 0 && (i = {}),
              Zt(this, function (a) {
                return n
                  ? [
                      2,
                      this.resolveDocument(
                        n,
                        this.buildRootValueFromCache(n, r) || {},
                        this.prepareContext(i),
                        r,
                      ).then(function (o) {
                        return _(_({}, r), o.exportedVariables);
                      }),
                    ]
                  : [2, _({}, r)];
              })
            );
          });
        }),
        (e.prototype.shouldForceResolvers = function (t) {
          var n = !1;
          return (
            Et(t, {
              Directive: {
                enter: function (r) {
                  if (
                    r.name.value === "client" &&
                    r.arguments &&
                    ((n = r.arguments.some(function (i) {
                      return (
                        i.name.value === "always" &&
                        i.value.kind === "BooleanValue" &&
                        i.value.value === !0
                      );
                    })),
                    n)
                  )
                    return cs;
                },
              },
            }),
            n
          );
        }),
        (e.prototype.buildRootValueFromCache = function (t, n) {
          return this.cache.diff({
            query: TE(t),
            variables: n,
            returnPartialData: !0,
            optimistic: !1,
          }).result;
        }),
        (e.prototype.resolveDocument = function (t, n) {
          return Jt(this, arguments, void 0, function (r, i, a, o, s, l) {
            var u, c, f, d, h, v, y, S, p, m, g;
            return (
              a === void 0 && (a = {}),
              o === void 0 && (o = {}),
              s === void 0 &&
                (s = function () {
                  return !0;
                }),
              l === void 0 && (l = !1),
              Zt(this, function (E) {
                return (
                  (u = pa(r)),
                  (c = Kr(r)),
                  (f = Yr(c)),
                  (d = this.collectSelectionsToResolve(u, f)),
                  (h = u.operation),
                  (v = h ? h.charAt(0).toUpperCase() + h.slice(1) : "Query"),
                  (y = this),
                  (S = y.cache),
                  (p = y.client),
                  (m = {
                    fragmentMap: f,
                    context: _(_({}, a), { cache: S, client: p }),
                    variables: o,
                    fragmentMatcher: s,
                    defaultOperationType: v,
                    exportedVariables: {},
                    selectionsToResolve: d,
                    onlyRunForcedResolvers: l,
                  }),
                  (g = !1),
                  [
                    2,
                    this.resolveSelectionSet(u.selectionSet, g, i, m).then(
                      function (x) {
                        return {
                          result: x,
                          exportedVariables: m.exportedVariables,
                        };
                      },
                    ),
                  ]
                );
              })
            );
          });
        }),
        (e.prototype.resolveSelectionSet = function (t, n, r, i) {
          return Jt(this, void 0, void 0, function () {
            var a,
              o,
              s,
              l,
              u,
              c = this;
            return Zt(this, function (f) {
              return (
                (a = i.fragmentMap),
                (o = i.context),
                (s = i.variables),
                (l = [r]),
                (u = function (d) {
                  return Jt(c, void 0, void 0, function () {
                    var h, v;
                    return Zt(this, function (y) {
                      return !n && !i.selectionsToResolve.has(d)
                        ? [2]
                        : da(d, s)
                          ? bn(d)
                            ? [
                                2,
                                this.resolveField(d, n, r, i).then(
                                  function (S) {
                                    var p;
                                    typeof S < "u" &&
                                      l.push(((p = {}), (p[qt(d)] = S), p));
                                  },
                                ),
                              ]
                            : (cE(d)
                                ? (h = d)
                                : ((h = a[d.name.value]),
                                  I(h, 21, d.name.value)),
                              h &&
                              h.typeCondition &&
                              ((v = h.typeCondition.name.value),
                              i.fragmentMatcher(r, v, o))
                                ? [
                                    2,
                                    this.resolveSelectionSet(
                                      h.selectionSet,
                                      n,
                                      r,
                                      i,
                                    ).then(function (S) {
                                      l.push(S);
                                    }),
                                  ]
                                : [2])
                          : [2];
                    });
                  });
                }),
                [
                  2,
                  Promise.all(t.selections.map(u)).then(function () {
                    return vs(l);
                  }),
                ]
              );
            });
          });
        }),
        (e.prototype.resolveField = function (t, n, r, i) {
          return Jt(this, void 0, void 0, function () {
            var a,
              o,
              s,
              l,
              u,
              c,
              f,
              d,
              h,
              v = this;
            return Zt(this, function (y) {
              return r
                ? ((a = i.variables),
                  (o = t.name.value),
                  (s = qt(t)),
                  (l = o !== s),
                  (u = r[s] || r[o]),
                  (c = Promise.resolve(u)),
                  (!i.onlyRunForcedResolvers || this.shouldForceResolvers(t)) &&
                    ((f = r.__typename || i.defaultOperationType),
                    (d = this.resolvers && this.resolvers[f]),
                    d &&
                      ((h = d[l ? o : s]),
                      h &&
                        (c = Promise.resolve(
                          rf.withValue(this.cache, h, [
                            r,
                            ps(t, a),
                            i.context,
                            { field: t, fragmentMap: i.fragmentMap },
                          ]),
                        )))),
                  [
                    2,
                    c.then(function (S) {
                      var p, m;
                      if (
                        (S === void 0 && (S = u),
                        t.directives &&
                          t.directives.forEach(function (E) {
                            E.name.value === "export" &&
                              E.arguments &&
                              E.arguments.forEach(function (x) {
                                x.name.value === "as" &&
                                  x.value.kind === "StringValue" &&
                                  (i.exportedVariables[x.value.value] = S);
                              });
                          }),
                        !t.selectionSet || S == null)
                      )
                        return S;
                      var g =
                        (m =
                          (p = t.directives) === null || p === void 0
                            ? void 0
                            : p.some(function (E) {
                                return E.name.value === "client";
                              })) !== null && m !== void 0
                          ? m
                          : !1;
                      if (Array.isArray(S))
                        return v.resolveSubSelectedArray(t, n || g, S, i);
                      if (t.selectionSet)
                        return v.resolveSelectionSet(
                          t.selectionSet,
                          n || g,
                          S,
                          i,
                        );
                    }),
                  ])
                : [2, null];
            });
          });
        }),
        (e.prototype.resolveSubSelectedArray = function (t, n, r, i) {
          var a = this;
          return Promise.all(
            r.map(function (o) {
              if (o === null) return null;
              if (Array.isArray(o))
                return a.resolveSubSelectedArray(t, n, o, i);
              if (t.selectionSet)
                return a.resolveSelectionSet(t.selectionSet, n, o, i);
            }),
          );
        }),
        (e.prototype.collectSelectionsToResolve = function (t, n) {
          var r = function (o) {
              return !Array.isArray(o);
            },
            i = this.selectionsToResolveCache;
          function a(o) {
            if (!i.has(o)) {
              var s = new Set();
              (i.set(o, s),
                Et(o, {
                  Directive: function (l, u, c, f, d) {
                    l.name.value === "client" &&
                      d.forEach(function (h) {
                        r(h) && Ad(h) && s.add(h);
                      });
                  },
                  FragmentSpread: function (l, u, c, f, d) {
                    var h = n[l.name.value];
                    I(h, 22, l.name.value);
                    var v = a(h);
                    v.size > 0 &&
                      (d.forEach(function (y) {
                        r(y) && Ad(y) && s.add(y);
                      }),
                      s.add(l),
                      v.forEach(function (y) {
                        s.add(y);
                      }));
                  },
                }));
            }
            return i.get(o);
          }
          return a(t);
        }),
        e
      );
    })(),
    kp = !1,
    Og = (function () {
      function e(t) {
        var n = this,
          r,
          i,
          a;
        if (
          ((this.resetStoreCallbacks = []),
          (this.clearStoreCallbacks = []),
          !t.cache)
        )
          throw je(16);
        var o = t.uri,
          s = t.credentials,
          l = t.headers,
          u = t.cache,
          c = t.documentTransform,
          f = t.ssrMode,
          d = f === void 0 ? !1 : f,
          h = t.ssrForceFetchDelay,
          v = h === void 0 ? 0 : h,
          y = t.connectToDevTools,
          S = t.queryDeduplication,
          p = S === void 0 ? !0 : S,
          m = t.defaultOptions,
          g = t.defaultContext,
          E = t.assumeImmutableResults,
          x = E === void 0 ? u.assumeImmutableResults : E,
          b = t.resolvers,
          k = t.typeDefs,
          T = t.fragmentMatcher,
          R = t.clientAwareness,
          j = t.name,
          M = t.version,
          A = t.devtools,
          B = t.dataMasking;
        globalThis.__DEV__ !== !1 &&
          (de(
            t,
            "connectToDevTools",
            "ApolloClient",
            "Please use `devtools.enabled` instead.",
          ),
          de(
            t,
            "uri",
            "ApolloClient",
            "Please initialize an instance of `HttpLink` with `uri` instead.",
          ),
          de(
            t,
            "credentials",
            "ApolloClient",
            "Please initialize an instance of `HttpLink` with `credentials` instead.",
          ),
          de(
            t,
            "headers",
            "ApolloClient",
            "Please initialize an instance of `HttpLink` with `headers` instead.",
          ),
          de(
            t,
            "name",
            "ApolloClient",
            "Please use the `clientAwareness.name` option instead.",
          ),
          de(
            t,
            "version",
            "ApolloClient",
            "Please use the `clientAwareness.version` option instead.",
          ),
          de(t, "typeDefs", "ApolloClient"),
          t.link || (globalThis.__DEV__ !== !1 && I.warn(17)));
        var Y = t.link;
        (Y ||
          (Y = o ? new _2({ uri: o, credentials: s, headers: l }) : ma.empty()),
          (this.link = Y),
          (this.cache = u),
          (this.disableNetworkFetches = d || v > 0),
          (this.queryDeduplication = p),
          (this.defaultOptions = m || Object.create(null)),
          (this.typeDefs = k),
          (this.devtoolsConfig = _(_({}, A), {
            enabled:
              (r = A == null ? void 0 : A.enabled) !== null && r !== void 0
                ? r
                : y,
          })),
          this.devtoolsConfig.enabled === void 0 &&
            (this.devtoolsConfig.enabled = globalThis.__DEV__ !== !1),
          v &&
            setTimeout(function () {
              return (n.disableNetworkFetches = !1);
            }, v),
          (this.watchQuery = this.watchQuery.bind(this)),
          (this.query = this.query.bind(this)),
          (this.mutate = this.mutate.bind(this)),
          (this.watchFragment = this.watchFragment.bind(this)),
          (this.resetStore = this.resetStore.bind(this)),
          (this.reFetchObservableQueries =
            this.reFetchObservableQueries.bind(this)),
          (this.version = zc),
          (this.localState = new Z2({
            cache: u,
            client: this,
            resolvers: b,
            fragmentMatcher: T,
          })),
          (this.queryManager = new J2({
            cache: this.cache,
            link: this.link,
            defaultOptions: this.defaultOptions,
            defaultContext: g,
            documentTransform: c,
            queryDeduplication: p,
            ssrMode: d,
            dataMasking: !!B,
            clientAwareness: {
              name:
                (i = R == null ? void 0 : R.name) !== null && i !== void 0
                  ? i
                  : j,
              version:
                (a = R == null ? void 0 : R.version) !== null && a !== void 0
                  ? a
                  : M,
            },
            localState: this.localState,
            assumeImmutableResults: x,
            onBroadcast: this.devtoolsConfig.enabled
              ? function () {
                  n.devToolsHookCb &&
                    n.devToolsHookCb({
                      action: {},
                      state: {
                        queries: n.queryManager.getQueryStore(),
                        mutations: n.queryManager.mutationStore || {},
                      },
                      dataWithOptimisticResults: n.cache.extract(!0),
                    });
                }
              : void 0,
          })),
          this.devtoolsConfig.enabled && this.connectToDevTools());
      }
      return (
        Object.defineProperty(e.prototype, "prioritizeCacheValues", {
          get: function () {
            return this.disableNetworkFetches;
          },
          set: function (t) {
            this.disableNetworkFetches = t;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.connectToDevTools = function () {
          if (!(typeof window > "u")) {
            var t = window,
              n = Symbol.for("apollo.devtools");
            ((t[n] = t[n] || []).push(this),
              (t.__APOLLO_CLIENT__ = this),
              !kp &&
                globalThis.__DEV__ !== !1 &&
                ((kp = !0),
                window.document &&
                  window.top === window.self &&
                  /^(https?|file):$/.test(window.location.protocol) &&
                  setTimeout(function () {
                    if (!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
                      var r = window.navigator,
                        i = r && r.userAgent,
                        a = void 0;
                      (typeof i == "string" &&
                        (i.indexOf("Chrome/") > -1
                          ? (a =
                              "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm")
                          : i.indexOf("Firefox/") > -1 &&
                            (a =
                              "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/")),
                        a &&
                          globalThis.__DEV__ !== !1 &&
                          I.log(
                            "Download the Apollo DevTools for a better development experience: %s",
                            a,
                          ));
                    }
                  }, 1e4)));
          }
        }),
        Object.defineProperty(e.prototype, "documentTransform", {
          get: function () {
            return this.queryManager.documentTransform;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.stop = function () {
          this.queryManager.stop();
        }),
        (e.prototype.watchQuery = function (t) {
          return (
            this.defaultOptions.watchQuery &&
              (t = no(this.defaultOptions.watchQuery, t)),
            this.disableNetworkFetches &&
              (t.fetchPolicy === "network-only" ||
                t.fetchPolicy === "cache-and-network") &&
              (t = _(_({}, t), { fetchPolicy: "cache-first" })),
            globalThis.__DEV__ !== !1 &&
              (de(t, "canonizeResults", "client.watchQuery"),
              de(t, "partialRefetch", "client.watchQuery")),
            this.queryManager.watchQuery(t)
          );
        }),
        (e.prototype.query = function (t) {
          return (
            this.defaultOptions.query && (t = no(this.defaultOptions.query, t)),
            I(t.fetchPolicy !== "cache-and-network", 18),
            this.disableNetworkFetches &&
              t.fetchPolicy === "network-only" &&
              (t = _(_({}, t), { fetchPolicy: "cache-first" })),
            globalThis.__DEV__ !== !1 &&
              (de(t, "canonizeResults", "client.query"),
              de(
                t,
                "notifyOnNetworkStatusChange",
                "client.query",
                "This option does not affect `client.query` and can be safely removed.",
              ),
              t.fetchPolicy === "standby" &&
                globalThis.__DEV__ !== !1 &&
                I.warn(19)),
            this.queryManager.query(t)
          );
        }),
        (e.prototype.mutate = function (t) {
          return (
            this.defaultOptions.mutate &&
              (t = no(this.defaultOptions.mutate, t)),
            this.queryManager.mutate(t)
          );
        }),
        (e.prototype.subscribe = function (t) {
          var n = this,
            r = this.queryManager.generateQueryId();
          return this.queryManager
            .startGraphQLSubscription(t)
            .map(function (i) {
              return _(_({}, i), {
                data: n.queryManager.maskOperation({
                  document: t.query,
                  data: i.data,
                  fetchPolicy: t.fetchPolicy,
                  id: r,
                }),
              });
            });
        }),
        (e.prototype.readQuery = function (t, n) {
          return (n === void 0 && (n = !1), this.cache.readQuery(t, n));
        }),
        (e.prototype.watchFragment = function (t) {
          var n;
          return this.cache.watchFragment(
            _(
              _({}, t),
              ((n = {}),
              (n[Symbol.for("apollo.dataMasking")] =
                this.queryManager.dataMasking),
              n),
            ),
          );
        }),
        (e.prototype.readFragment = function (t, n) {
          return (n === void 0 && (n = !1), this.cache.readFragment(t, n));
        }),
        (e.prototype.writeQuery = function (t) {
          var n = this.cache.writeQuery(t);
          return (
            t.broadcast !== !1 && this.queryManager.broadcastQueries(),
            n
          );
        }),
        (e.prototype.writeFragment = function (t) {
          var n = this.cache.writeFragment(t);
          return (
            t.broadcast !== !1 && this.queryManager.broadcastQueries(),
            n
          );
        }),
        (e.prototype.__actionHookForDevTools = function (t) {
          this.devToolsHookCb = t;
        }),
        (e.prototype.__requestRaw = function (t) {
          return ku(this.link, t);
        }),
        (e.prototype.resetStore = function () {
          var t = this;
          return Promise.resolve()
            .then(function () {
              return t.queryManager.clearStore({ discardWatches: !1 });
            })
            .then(function () {
              return Promise.all(
                t.resetStoreCallbacks.map(function (n) {
                  return n();
                }),
              );
            })
            .then(function () {
              return t.reFetchObservableQueries();
            });
        }),
        (e.prototype.clearStore = function () {
          var t = this;
          return Promise.resolve()
            .then(function () {
              return t.queryManager.clearStore({ discardWatches: !0 });
            })
            .then(function () {
              return Promise.all(
                t.clearStoreCallbacks.map(function (n) {
                  return n();
                }),
              );
            });
        }),
        (e.prototype.onResetStore = function (t) {
          var n = this;
          return (
            this.resetStoreCallbacks.push(t),
            function () {
              n.resetStoreCallbacks = n.resetStoreCallbacks.filter(
                function (r) {
                  return r !== t;
                },
              );
            }
          );
        }),
        (e.prototype.onClearStore = function (t) {
          var n = this;
          return (
            this.clearStoreCallbacks.push(t),
            function () {
              n.clearStoreCallbacks = n.clearStoreCallbacks.filter(
                function (r) {
                  return r !== t;
                },
              );
            }
          );
        }),
        (e.prototype.reFetchObservableQueries = function (t) {
          return this.queryManager.reFetchObservableQueries(t);
        }),
        (e.prototype.refetchQueries = function (t) {
          var n = this.queryManager.refetchQueries(t),
            r = [],
            i = [];
          n.forEach(function (o, s) {
            (r.push(s), i.push(o));
          });
          var a = Promise.all(i);
          return (
            (a.queries = r),
            (a.results = i),
            a.catch(function (o) {
              globalThis.__DEV__ !== !1 && I.debug(20, o);
            }),
            a
          );
        }),
        (e.prototype.getObservableQueries = function (t) {
          return (
            t === void 0 && (t = "active"),
            this.queryManager.getObservableQueries(t)
          );
        }),
        (e.prototype.extract = function (t) {
          return this.cache.extract(t);
        }),
        (e.prototype.restore = function (t) {
          return this.cache.restore(t);
        }),
        (e.prototype.addResolvers = function (t) {
          this.localState.addResolvers(t);
        }),
        (e.prototype.setResolvers = function (t) {
          this.localState.setResolvers(t);
        }),
        (e.prototype.getResolvers = function () {
          return this.localState.getResolvers();
        }),
        (e.prototype.setLocalStateFragmentMatcher = function (t) {
          this.localState.setFragmentMatcher(t);
        }),
        (e.prototype.setLink = function (t) {
          this.link = this.queryManager.link = t;
        }),
        Object.defineProperty(e.prototype, "defaultContext", {
          get: function () {
            return this.queryManager.defaultContext;
          },
          enumerable: !1,
          configurable: !0,
        }),
        e
      );
    })();
  globalThis.__DEV__ !== !1 && (Og.prototype.getMemoryInternals = QS);
  var ao = new Map(),
    Ru = new Map(),
    Ng = !0,
    Vo = !1;
  function Pg(e) {
    return e.replace(/[\s,]+/g, " ").trim();
  }
  function ex(e) {
    return Pg(e.source.body.substring(e.start, e.end));
  }
  function tx(e) {
    var t = new Set(),
      n = [];
    return (
      e.definitions.forEach(function (r) {
        if (r.kind === "FragmentDefinition") {
          var i = r.name.value,
            a = ex(r.loc),
            o = Ru.get(i);
          (o && !o.has(a)
            ? Ng &&
              console.warn(
                "Warning: fragment with name " +
                  i +
                  ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`,
              )
            : o || Ru.set(i, (o = new Set())),
            o.add(a),
            t.has(a) || (t.add(a), n.push(r)));
        } else n.push(r);
      }),
      _(_({}, e), { definitions: n })
    );
  }
  function nx(e) {
    var t = new Set(e.definitions);
    t.forEach(function (r) {
      (r.loc && delete r.loc,
        Object.keys(r).forEach(function (i) {
          var a = r[i];
          a && typeof a == "object" && t.add(a);
        }));
    });
    var n = e.loc;
    return (n && (delete n.startToken, delete n.endToken), e);
  }
  function rx(e) {
    var t = Pg(e);
    if (!ao.has(t)) {
      var n = dS(e, {
        experimentalFragmentVariables: Vo,
        allowLegacyFragmentVariables: Vo,
      });
      if (!n || n.kind !== "Document")
        throw new Error("Not a valid GraphQL document.");
      ao.set(t, nx(tx(n)));
    }
    return ao.get(t);
  }
  function ut(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    typeof e == "string" && (e = [e]);
    var r = e[0];
    return (
      t.forEach(function (i, a) {
        (i && i.kind === "Document" ? (r += i.loc.source.body) : (r += i),
          (r += e[a + 1]));
      }),
      rx(r)
    );
  }
  function ix() {
    (ao.clear(), Ru.clear());
  }
  function ax() {
    Ng = !1;
  }
  function ox() {
    Vo = !0;
  }
  function sx() {
    Vo = !1;
  }
  var ci = {
    gql: ut,
    resetCaches: ix,
    disableFragmentWarnings: ax,
    enableExperimentalFragmentVariables: ox,
    disableExperimentalFragmentVariables: sx,
  };
  (function (e) {
    ((e.gql = ci.gql),
      (e.resetCaches = ci.resetCaches),
      (e.disableFragmentWarnings = ci.disableFragmentWarnings),
      (e.enableExperimentalFragmentVariables =
        ci.enableExperimentalFragmentVariables),
      (e.disableExperimentalFragmentVariables =
        ci.disableExperimentalFragmentVariables));
  })(ut || (ut = {}));
  ut.default = ut;
  var Ig = { exports: {} };
  (function (e) {
    ((e.exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = void 0),
      (e.exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
        void 0),
      (e.exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
        void 0),
      Object.assign(e.exports, N));
  })(Ig);
  var he = Ig.exports;
  const lx = $p(he),
    Dg = Qp({ __proto__: null, default: lx }, [he]);
  var Cp = $c ? Symbol.for("__APOLLO_CONTEXT__") : "__APOLLO_CONTEXT__";
  function lf() {
    I("createContext" in Dg, 69);
    var e = he.createContext[Cp];
    return (
      e ||
        (Object.defineProperty(he.createContext, Cp, {
          value: (e = he.createContext({})),
          enumerable: !1,
          writable: !1,
          configurable: !0,
        }),
        (e.displayName = "ApolloContext")),
      e
    );
  }
  var ux = function (e) {
    var t = e.client,
      n = e.children,
      r = lf(),
      i = he.useContext(r),
      a = he.useMemo(
        function () {
          return _(_({}, i), { client: t || i.client });
        },
        [i, t],
      );
    return (I(a.client, 71), he.createElement(r.Provider, { value: a }, n));
  };
  function Mg(e) {
    var t = he.useContext(lf()),
      n = e || t.client;
    return (I(!!n, 79), n);
  }
  var Op = !1,
    cx = "useSyncExternalStore",
    fx = Dg[cx],
    dx =
      fx ||
      function (e, t, n) {
        var r = t();
        globalThis.__DEV__ !== !1 &&
          !Op &&
          r !== t() &&
          ((Op = !0), globalThis.__DEV__ !== !1 && I.error(92));
        var i = he.useState({ inst: { value: r, getSnapshot: t } }),
          a = i[0].inst,
          o = i[1];
        return (
          DS
            ? he.useLayoutEffect(
                function () {
                  (Object.assign(a, { value: r, getSnapshot: t }),
                    ll(a) && o({ inst: a }));
                },
                [e, r, t],
              )
            : Object.assign(a, { value: r, getSnapshot: t }),
          he.useEffect(
            function () {
              return (
                ll(a) && o({ inst: a }),
                e(function () {
                  ll(a) && o({ inst: a });
                })
              );
            },
            [e],
          ),
          r
        );
      };
  function ll(e) {
    var t = e.value,
      n = e.getSnapshot;
    try {
      return t !== n();
    } catch {
      return !0;
    }
  }
  var Vt;
  (function (e) {
    ((e[(e.Query = 0)] = "Query"),
      (e[(e.Mutation = 1)] = "Mutation"),
      (e[(e.Subscription = 2)] = "Subscription"));
  })(Vt || (Vt = {}));
  var Vn;
  function Np(e) {
    var t;
    switch (e) {
      case Vt.Query:
        t = "Query";
        break;
      case Vt.Mutation:
        t = "Mutation";
        break;
      case Vt.Subscription:
        t = "Subscription";
        break;
    }
    return t;
  }
  function Rg(e) {
    (rn("parser", function () {
      globalThis.__DEV__ !== !1 && I.warn(94);
    }),
      Vn || (Vn = new qc(It.parser || 1e3)));
    var t = Vn.get(e);
    if (t) return t;
    var n, r, i;
    I(!!e && !!e.kind, 95, e);
    for (
      var a = [], o = [], s = [], l = [], u = 0, c = e.definitions;
      u < c.length;
      u++
    ) {
      var f = c[u];
      if (f.kind === "FragmentDefinition") {
        a.push(f);
        continue;
      }
      if (f.kind === "OperationDefinition")
        switch (f.operation) {
          case "query":
            o.push(f);
            break;
          case "mutation":
            s.push(f);
            break;
          case "subscription":
            l.push(f);
            break;
        }
    }
    (I(!a.length || o.length || s.length || l.length, 96),
      I(
        o.length + s.length + l.length <= 1,
        97,
        e,
        o.length,
        l.length,
        s.length,
      ),
      (r = o.length ? Vt.Query : Vt.Mutation),
      !o.length && !s.length && (r = Vt.Subscription));
    var d = o.length ? o : s.length ? s : l;
    I(d.length === 1, 98, e, d.length);
    var h = d[0];
    ((n = h.variableDefinitions || []),
      h.name && h.name.kind === "Name" ? (i = h.name.value) : (i = "data"));
    var v = { name: i, type: r, variables: n };
    return (Vn.set(e, v), v);
  }
  Rg.resetCache = function () {
    Vn = void 0;
  };
  globalThis.__DEV__ !== !1 &&
    Wc("parser", function () {
      return Vn ? Vn.size : 0;
    });
  function px(e, t) {
    var n = ke("parser", Rg, [e]),
      r = Np(t),
      i = Np(n.type);
    I(n.type === t, 99, r, r, i);
  }
  function fi(e, t, n, r) {
    "use no memo";
    r === void 0 && (r = "Please remove this option.");
    var i = he.useRef(!1);
    t in e &&
      !i.current &&
      (globalThis.__DEV__ !== !1 && I.warn(78, n, t, r), (i.current = !0));
  }
  var hx = Symbol.for("apollo.hook.wrappers");
  function mx(e, t, n) {
    var r = n.queryManager,
      i = r && r[hx],
      a = i && i[e];
    return a ? a(t) : t;
  }
  var vx = Object.prototype.hasOwnProperty;
  function Pp() {}
  var oo = Symbol();
  function Kn(e, t) {
    return (
      t === void 0 && (t = Object.create(null)),
      mx("useQuery", gx, Mg(t && t.client))(e, t)
    );
  }
  function gx(e, t) {
    globalThis.__DEV__ !== !1 &&
      (fi(t, "canonizeResults", "useQuery"),
      fi(t, "partialRefetch", "useQuery"),
      fi(
        t,
        "defaultOptions",
        "useQuery",
        "Pass the options directly to the hook instead.",
      ),
      fi(
        t,
        "onCompleted",
        "useQuery",
        "If your `onCompleted` callback sets local state, switch to use derived state using `data` returned from the hook instead. Use `useEffect` to perform side-effects as a result of updates to `data`.",
      ),
      fi(
        t,
        "onError",
        "useQuery",
        "If your `onError` callback sets local state, switch to use derived state using `data`, `error` or `errors` returned from the hook instead. Use `useEffect` if you need to perform side-effects as a result of updates to `data`, `error` or `errors`.",
      ));
    var n = wx(e, t),
      r = n.result,
      i = n.obsQueryFields;
    return he.useMemo(
      function () {
        return _(_({}, r), i);
      },
      [r, i],
    );
  }
  function yx(e, t, n, r, i) {
    function a(f) {
      var d;
      px(t, Vt.Query);
      var h = {
        client: e,
        query: t,
        observable:
          (r && r.getSSRObservable(i())) ||
          Di.inactiveOnCreation.withValue(!r, function () {
            return ke("canonizeResults", function () {
              return e.watchQuery(Lg(void 0, e, n, i()));
            });
          }),
        resultData: {
          previousData:
            (d = f == null ? void 0 : f.resultData.current) === null ||
            d === void 0
              ? void 0
              : d.data,
        },
      };
      return h;
    }
    var o = he.useState(a),
      s = o[0],
      l = o[1];
    function u(f) {
      var d, h;
      Object.assign(s.observable, ((d = {}), (d[oo] = f), d));
      var v = s.resultData;
      l(
        _(_({}, s), {
          query: f.query,
          resultData: Object.assign(v, {
            previousData:
              ((h = v.current) === null || h === void 0 ? void 0 : h.data) ||
              v.previousData,
            current: void 0,
          }),
        }),
      );
    }
    if (e !== s.client || t !== s.query) {
      var c = a(s);
      return (l(c), [c, u]);
    }
    return [s, u];
  }
  function wx(e, t) {
    var n = Mg(t.client),
      r = he.useContext(lf()).renderPromises,
      i = !!r,
      a = n.disableNetworkFetches,
      o = t.ssr !== !1 && !t.skip,
      s = t.partialRefetch,
      l = bx(n, e, t, i),
      u = yx(n, e, t, r, l),
      c = u[0],
      f = c.observable,
      d = c.resultData,
      h = u[1],
      v = l(f);
    xx(d, f, n, t, v);
    var y = he.useMemo(
      function () {
        return Cx(f);
      },
      [f],
    );
    Ex(f, r, o);
    var S = Sx(d, f, n, t, v, a, s, i, {
      onCompleted: t.onCompleted || Pp,
      onError: t.onError || Pp,
    });
    return {
      result: S,
      obsQueryFields: y,
      observable: f,
      resultData: d,
      client: n,
      onQueryExecuted: h,
    };
  }
  function Sx(e, t, n, r, i, a, o, s, l) {
    var u = he.useRef(l);
    he.useEffect(function () {
      u.current = l;
    });
    var c =
        (s || a) && r.ssr === !1 && !r.skip
          ? Ag
          : r.skip || i.fetchPolicy === "standby"
            ? zg
            : void 0,
      f = e.previousData,
      d = he.useMemo(
        function () {
          return c && Fg(c, f, t, n);
        },
        [n, t, c, f],
      );
    return dx(
      he.useCallback(
        function (h) {
          if (s) return function () {};
          var v = function () {
              var p = e.current,
                m = t.getCurrentResult();
              (p &&
                p.loading === m.loading &&
                p.networkStatus === m.networkStatus &&
                K(p.data, m.data)) ||
                Lu(m, e, t, n, o, h, u.current);
            },
            y = function (p) {
              if (
                (S.current.unsubscribe(),
                (S.current = t.resubscribeAfterError(v, y)),
                !vx.call(p, "graphQLErrors"))
              )
                throw p;
              var m = e.current;
              (!m || (m && m.loading) || !K(p, m.error)) &&
                Lu(
                  {
                    data: m && m.data,
                    error: p,
                    loading: !1,
                    networkStatus: W.error,
                  },
                  e,
                  t,
                  n,
                  o,
                  h,
                  u.current,
                );
            },
            S = { current: t.subscribe(v, y) };
          return function () {
            setTimeout(function () {
              return S.current.unsubscribe();
            });
          };
        },
        [a, s, t, e, o, n],
      ),
      function () {
        return d || Ip(e, t, u.current, o, n);
      },
      function () {
        return d || Ip(e, t, u.current, o, n);
      },
    );
  }
  function Ex(e, t, n) {
    t &&
      n &&
      (t.registerSSRObservable(e),
      e.getCurrentResult().loading && t.addObservableQueryPromise(e));
  }
  function xx(e, t, n, r, i) {
    var a;
    (t[oo] &&
      !K(t[oo], i) &&
      (t.reobserve(Lg(t, n, r, i)),
      (e.previousData =
        ((a = e.current) === null || a === void 0 ? void 0 : a.data) ||
        e.previousData),
      (e.current = void 0)),
      (t[oo] = i));
  }
  function bx(e, t, n, r) {
    n === void 0 && (n = {});
    var i = n.skip;
    (n.ssr, n.onCompleted, n.onError);
    var a = n.defaultOptions,
      o = wt(n, ["skip", "ssr", "onCompleted", "onError", "defaultOptions"]);
    return function (s) {
      var l = Object.assign(o, { query: t });
      return (
        r &&
          (l.fetchPolicy === "network-only" ||
            l.fetchPolicy === "cache-and-network") &&
          (l.fetchPolicy = "cache-first"),
        l.variables || (l.variables = {}),
        i
          ? ((l.initialFetchPolicy =
              l.initialFetchPolicy || l.fetchPolicy || Dp(a, e.defaultOptions)),
            (l.fetchPolicy = "standby"))
          : l.fetchPolicy ||
            (l.fetchPolicy =
              (s == null ? void 0 : s.options.initialFetchPolicy) ||
              Dp(a, e.defaultOptions)),
        l
      );
    };
  }
  function Lg(e, t, n, r) {
    var i = [],
      a = t.defaultOptions.watchQuery;
    return (
      a && i.push(a),
      n.defaultOptions && i.push(n.defaultOptions),
      i.push(Xn(e && e.options, r)),
      i.reduce(no)
    );
  }
  function Lu(e, t, n, r, i, a, o) {
    var s = t.current;
    (s && s.data && (t.previousData = s.data),
      !e.error &&
        lt(e.errors) &&
        (e.error = new Ft({ graphQLErrors: e.errors })),
      (t.current = Fg(kx(e, n, i), t.previousData, n, r)),
      a(),
      _x(e, s == null ? void 0 : s.networkStatus, o));
  }
  function _x(e, t, n) {
    if (!e.loading) {
      var r = Tx(e);
      Promise.resolve()
        .then(function () {
          r
            ? n.onError(r)
            : e.data &&
              t !== e.networkStatus &&
              e.networkStatus === W.ready &&
              n.onCompleted(e.data);
        })
        .catch(function (i) {
          globalThis.__DEV__ !== !1 && I.warn(i);
        });
    }
  }
  function Ip(e, t, n, r, i) {
    return (
      e.current || Lu(t.getCurrentResult(), e, t, i, r, function () {}, n),
      e.current
    );
  }
  function Dp(e, t) {
    var n;
    return (
      (e == null ? void 0 : e.fetchPolicy) ||
      ((n = t == null ? void 0 : t.watchQuery) === null || n === void 0
        ? void 0
        : n.fetchPolicy) ||
      "cache-first"
    );
  }
  function Tx(e) {
    return lt(e.errors) ? new Ft({ graphQLErrors: e.errors }) : e.error;
  }
  function Fg(e, t, n, r) {
    var i = e.data;
    e.partial;
    var a = wt(e, ["data", "partial"]),
      o = _(_({ data: i }, a), {
        client: r,
        observable: n,
        variables: n.variables,
        called: e !== Ag && e !== zg,
        previousData: t,
      });
    return o;
  }
  function kx(e, t, n) {
    return e.partial &&
      n &&
      !e.loading &&
      (!e.data || Object.keys(e.data).length === 0) &&
      t.options.fetchPolicy !== "cache-only"
      ? (t.refetch(), _(_({}, e), { loading: !0, networkStatus: W.refetch }))
      : e;
  }
  var Ag = Qr({
      loading: !0,
      data: void 0,
      error: void 0,
      networkStatus: W.loading,
    }),
    zg = Qr({
      loading: !1,
      data: void 0,
      error: void 0,
      networkStatus: W.ready,
    });
  function Cx(e) {
    return {
      refetch: e.refetch.bind(e),
      reobserve: function () {
        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        return (
          globalThis.__DEV__ !== !1 && globalThis.__DEV__ !== !1 && I.warn(84),
          e.reobserve.apply(e, t)
        );
      },
      fetchMore: e.fetchMore.bind(e),
      updateQuery: e.updateQuery.bind(e),
      startPolling: e.startPolling.bind(e),
      stopPolling: e.stopPolling.bind(e),
      subscribeToMore: e.subscribeToMore.bind(e),
    };
  }
  var jg = {
      color: void 0,
      size: void 0,
      className: void 0,
      style: void 0,
      attr: void 0,
    },
    Mp = H.createContext && H.createContext(jg),
    Sn =
      (globalThis && globalThis.__assign) ||
      function () {
        return (
          (Sn =
            Object.assign ||
            function (e) {
              for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n];
                for (var i in t)
                  Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
              }
              return e;
            }),
          Sn.apply(this, arguments)
        );
      },
    Ox =
      (globalThis && globalThis.__rest) ||
      function (e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
        if (e != null && typeof Object.getOwnPropertySymbols == "function")
          for (
            var i = 0, r = Object.getOwnPropertySymbols(e);
            i < r.length;
            i++
          )
            t.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
              (n[r[i]] = e[r[i]]);
        return n;
      };
  function Vg(e) {
    return (
      e &&
      e.map(function (t, n) {
        return H.createElement(t.tag, Sn({ key: n }, t.attr), Vg(t.child));
      })
    );
  }
  function Ee(e) {
    return function (t) {
      return H.createElement(Nx, Sn({ attr: Sn({}, e.attr) }, t), Vg(e.child));
    };
  }
  function Nx(e) {
    var t = function (n) {
      var r = e.attr,
        i = e.size,
        a = e.title,
        o = Ox(e, ["attr", "size", "title"]),
        s = i || n.size || "1em",
        l;
      return (
        n.className && (l = n.className),
        e.className && (l = (l ? l + " " : "") + e.className),
        H.createElement(
          "svg",
          Sn(
            { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
            n.attr,
            r,
            o,
            {
              className: l,
              style: Sn(Sn({ color: e.color || n.color }, n.style), e.style),
              height: s,
              width: s,
              xmlns: "http://www.w3.org/2000/svg",
            },
          ),
          a && H.createElement("title", null, a),
          e.children,
        )
      );
    };
    return Mp !== void 0
      ? H.createElement(Mp.Consumer, null, function (n) {
          return t(n);
        })
      : t(jg);
  }
  function gs(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 512 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
          },
        },
      ],
    })(e);
  }
  function ia(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 448 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
          },
        },
      ],
    })(e);
  }
  function Bg(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 512 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z",
          },
        },
      ],
    })(e);
  }
  function Jn(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 448 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z",
          },
        },
      ],
    })(e);
  }
  function Px(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 448 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z",
          },
        },
      ],
    })(e);
  }
  function Ix(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 640 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z",
          },
        },
      ],
    })(e);
  }
  function Dx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 512 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z",
          },
        },
      ],
    })(e);
  }
  function Mx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 512 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z",
          },
        },
      ],
    })(e);
  }
  function Rx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 512 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z",
          },
        },
      ],
    })(e);
  }
  function Bo(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 512 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z",
          },
        },
      ],
    })(e);
  }
  function Lx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 576 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M271.06,144.3l54.27,14.3a8.59,8.59,0,0,1,6.63,8.1c0,4.6-4.09,8.4-9.12,8.4h-35.6a30,30,0,0,1-11.19-2.2c-5.24-2.2-11.28-1.7-15.3,2l-19,17.5a11.68,11.68,0,0,0-2.25,2.66,11.42,11.42,0,0,0,3.88,15.74,83.77,83.77,0,0,0,34.51,11.5V240c0,8.8,7.83,16,17.37,16h17.37c9.55,0,17.38-7.2,17.38-16V222.4c32.93-3.6,57.84-31,53.5-63-3.15-23-22.46-41.3-46.56-47.7L282.68,97.4a8.59,8.59,0,0,1-6.63-8.1c0-4.6,4.09-8.4,9.12-8.4h35.6A30,30,0,0,1,332,83.1c5.23,2.2,11.28,1.7,15.3-2l19-17.5A11.31,11.31,0,0,0,368.47,61a11.43,11.43,0,0,0-3.84-15.78,83.82,83.82,0,0,0-34.52-11.5V16c0-8.8-7.82-16-17.37-16H295.37C285.82,0,278,7.2,278,16V33.6c-32.89,3.6-57.85,31-53.51,63C227.63,119.6,247,137.9,271.06,144.3ZM565.27,328.1c-11.8-10.7-30.2-10-42.6,0L430.27,402a63.64,63.64,0,0,1-40,14H272a16,16,0,0,1,0-32h78.29c15.9,0,30.71-10.9,33.25-26.6a31.2,31.2,0,0,0,.46-5.46A32,32,0,0,0,352,320H192a117.66,117.66,0,0,0-74.1,26.29L71.4,384H16A16,16,0,0,0,0,400v96a16,16,0,0,0,16,16H372.77a64,64,0,0,0,40-14L564,377a32,32,0,0,0,1.28-48.9Z",
          },
        },
      ],
    })(e);
  }
  function Fx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 576 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z",
          },
        },
      ],
    })(e);
  }
  function Ax(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 384 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
          },
        },
      ],
    })(e);
  }
  function zx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 576 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z",
          },
        },
      ],
    })(e);
  }
  function jx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 640 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z",
          },
        },
      ],
    })(e);
  }
  function Vx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 448 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z",
          },
        },
      ],
    })(e);
  }
  function Rp(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 352 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z",
          },
        },
      ],
    })(e);
  }
  function Bx(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 640 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z",
          },
        },
      ],
    })(e);
  }
  function Ux(e) {
    return Ee({
      tag: "svg",
      attr: { viewBox: "0 0 416 512" },
      child: [
        {
          tag: "path",
          attr: {
            d: "M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z",
          },
        },
      ],
    })(e);
  }
  const Qx = () => {
      const [e, t] = N.useState(!1),
        [n, r] = N.useState(!1),
        [i, a] = N.useState("");
      H.useEffect(() => {
        const s = (l) => {
          var u;
          (t(!0),
            (u = l == null ? void 0 : l.detail) != null &&
              u.message &&
              a(l.detail.message));
        };
        return (
          window.addEventListener("openWhatsappModal", s),
          () => window.removeEventListener("openWhatsappModal", s)
        );
      }, []);
      const o = () => {
        if (!i) return;
        const s = `https://wa.me/59896238315?text=${encodeURIComponent(i)}`;
        (window.open(s, "_blank"), t(!1), a(""));
      };
      return C("header", {
        className:
          "fixed top-0 left-0 w-full z-50 bg-dark text-white h-16 overflow-hidden",
        children: [
          w("div", {
            className: "absolute inset-y-0 left-0 w-1/3 pointer-events-none",
            style: {
              background:
                "radial-gradient(circle at 20% 50%, rgba(121,202,189,0.3), transparent 70%)",
            },
          }),
          w("div", {
            className: "absolute inset-y-0 right-0 w-1/3 pointer-events-none",
            style: {
              background:
                "radial-gradient(circle at 80% 50%, rgba(121,202,189,0.3), transparent 70%)",
            },
          }),
          C("div", {
            className:
              "relative z-10 container mx-auto flex items-center justify-between px-4 h-full",
            children: [
              w(_e, {
                to: "/",
                className: "flex items-center gap-2",
                children: w("img", {
                  src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo-cero-market-2-1.png",
                  alt: "CeroMarket logo",
                  className: "h-8 w-auto",
                }),
              }),
              C("div", {
                className: "flex items-center gap-4",
                children: [
                  w("a", {
                    href: "https://www.instagram.com/ceromarketuruguay/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-xl hover:opacity-75 transition-opacity",
                    children: w(ia, {}),
                  }),
                  C("button", {
                    onClick: () => t(!0),
                    className: "btn-glass flex items-center gap-2 text-sm",
                    children: [w(Jn, {}), w("span", { children: "Hablemos" })],
                  }),
                  w("button", {
                    onClick: () => r(!0),
                    className: "btn-glass p-2 text-lg",
                    "aria-label": "Abrir menú",
                    children: w(Px, {}),
                  }),
                ],
              }),
            ],
          }),
          e &&
            C("div", {
              className: "fixed inset-0 z-50 flex",
              children: [
                w("div", {
                  className: "absolute inset-0 bg-black/20 backdrop-blur",
                  onClick: () => t(!1),
                }),
                C("div", {
                  className: `relative bg-[#0b141a] text-white w-full max-w-md h-full shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${e ? "translate-x-0" : "-translate-x-full"}`,
                  children: [
                    C("div", {
                      className:
                        "bg-[#202c33] p-3 flex items-center justify-between",
                      children: [
                        C("div", {
                          className: "flex items-center gap-3",
                          children: [
                            w("img", {
                              src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/favicon-2-150x150-1.png",
                              alt: "CeroMarket",
                              className:
                                "h-10 w-10 rounded-full object-cover bg-white p-1",
                            }),
                            C("div", {
                              children: [
                                w("h3", {
                                  className: "font-semibold",
                                  children: "CERO Market",
                                }),
                                w("p", {
                                  className: "text-xs text-gray-400",
                                  children: "en línea",
                                }),
                              ],
                            }),
                          ],
                        }),
                        w("button", {
                          onClick: () => t(!1),
                          className: "text-xl text-gray-400 hover:text-white",
                          children: w(Rp, {}),
                        }),
                      ],
                    }),
                    w("div", {
                      className:
                        "flex-1 p-4 flex flex-col items-start overflow-y-auto",
                      style: {
                        backgroundImage:
                          "url('https://i.pinimg.com/originals/85/70/f6/8570f6958a137b13d75518c55b3451a3.jpg')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        opacity: 0.1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                      },
                    }),
                    w("div", {
                      className: "flex-1 p-4 flex flex-col items-start z-10",
                      children: w("div", {
                        className:
                          "bg-[#202c33] p-2 rounded-lg shadow-md self-start max-w-xs mb-4",
                        children: w("p", {
                          className: "text-sm",
                          children:
                            "¡Hola! 👋 ¿Cómo podemos ayudarte? Escribe tu consulta y te responderemos a la brevedad.",
                        }),
                      }),
                    }),
                    C("div", {
                      className: "bg-[#202c33] p-2 flex items-center gap-2",
                      children: [
                        w("textarea", {
                          value: i,
                          onChange: (s) => a(s.target.value),
                          className:
                            "flex-1 p-2 border-none rounded-full resize-none focus:ring-0 bg-[#2a3942] text-white placeholder-gray-400",
                          placeholder: "Escribe un mensaje aquí",
                          rows: 1,
                          onKeyDown: (s) => {
                            s.key === "Enter" &&
                              !s.shiftKey &&
                              (s.preventDefault(), o());
                          },
                        }),
                        w("button", {
                          onClick: o,
                          className:
                            "bg-[#00a884] text-white rounded-full w-11 h-11 flex items-center justify-center transition-transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed",
                          disabled: !i,
                          children: C("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: [
                              w("line", {
                                x1: "22",
                                y1: "2",
                                x2: "11",
                                y2: "13",
                              }),
                              w("polygon", {
                                points: "22 2 15 22 11 13 2 9 22 2",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          n &&
            C("div", {
              className: "fixed inset-0 z-50 flex",
              children: [
                w("div", {
                  className: "absolute inset-0 bg-black/40 backdrop-blur",
                  onClick: () => r(!1),
                }),
                C("div", {
                  className:
                    "relative bg-dark text-white w-3/4 md:w-1/4 h-full shadow-xl ml-auto transform transition-transform duration-300 overflow-hidden flex flex-col",
                  style: {
                    transform: n ? "translateX(0%)" : "translateX(100%)",
                  },
                  children: [
                    w("div", {
                      className:
                        "absolute inset-x-0 top-0 h-1/3 pointer-events-none",
                      style: {
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(121,202,189,0.21), transparent 70%)",
                      },
                    }),
                    w("div", {
                      className:
                        "absolute inset-x-0 bottom-0 h-1/3 pointer-events-none",
                      style: {
                        background:
                          "radial-gradient(circle at 50% 100%, rgba(121,202,189,0.21), transparent 70%)",
                      },
                    }),
                    C("div", {
                      className:
                        "relative z-10 p-4 flex justify-between items-center border-b border-white/10",
                      children: [
                        w("img", {
                          src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo.png",
                          alt: "CeroMarket logo",
                          className: "h-8",
                        }),
                        w("button", {
                          onClick: () => r(!1),
                          className: "text-2xl",
                          children: w(Rp, {}),
                        }),
                      ],
                    }),
                    C("nav", {
                      className:
                        "relative z-10 p-4 flex-1 overflow-y-auto flex flex-col gap-2",
                      children: [
                        C(_e, {
                          to: "/sobre-nosotros",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(Bx, {}),
                            " ",
                            w("span", { children: "Sobre nosotros" }),
                          ],
                        }),
                        C(_e, {
                          to: "/mision-zero-waste",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(Fx, {}),
                            " ",
                            w("span", { children: "Misión CERO" }),
                          ],
                        }),
                        w("hr", { className: "border-white/10 my-2" }),
                        C(_e, {
                          to: "/productos",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(Dx, {}),
                            " ",
                            w("span", { children: "Nuestros productos" }),
                          ],
                        }),
                        C(_e, {
                          to: "/blog",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(zx, {}),
                            " ",
                            w("span", { children: "Blog" }),
                          ],
                        }),
                        C(_e, {
                          to: "/recetas",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(Ux, {}),
                            " ",
                            w("span", { children: "Recetas saludables" }),
                          ],
                        }),
                        w("hr", { className: "border-white/10 my-2" }),
                        C(_e, {
                          to: "/contacto",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(Bo, {}),
                            " ",
                            w("span", { children: "Contacto" }),
                          ],
                        }),
                        C(_e, {
                          to: "/trabaja-con-nosotros",
                          onClick: () => r(!1),
                          className:
                            "flex items-center gap-2 rounded-md px-2 py-2 transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/20",
                          children: [
                            w(Mx, {}),
                            " ",
                            w("span", { children: "Trabaja con nosotros" }),
                          ],
                        }),
                      ],
                    }),
                    w("div", {
                      className: "relative z-10 p-4 border-t border-white/10",
                      children: C("div", {
                        className: "flex items-center gap-4 text-xl",
                        children: [
                          w("a", {
                            href: "https://www.instagram.com/ceromarketuruguay/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:text-primary",
                            children: w(ia, {}),
                          }),
                          w("a", {
                            href: "https://www.facebook.com/ceromarketuruguay/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:text-primary",
                            children: w(gs, {}),
                          }),
                          w("a", {
                            href: "https://wa.me/59896238315",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "hover:text-primary",
                            children: w(Jn, {}),
                          }),
                          w("a", {
                            href: "mailto:hola@ceromarket.com.uy",
                            className: "hover:text-primary",
                            children: w(Bo, {}),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            }),
        ],
      });
    },
    $x = () =>
      C("footer", {
        className:
          "bg-dark text-white relative mt-12 overflow-visible md:overflow-hidden",
        children: [
          w("div", {
            className:
              "absolute inset-y-0 left-0 w-1/3 pointer-events-none hidden md:block",
            style: {
              background:
                "radial-gradient(circle at 20% 50%, rgba(121,202,189,0.3), transparent 70%)",
            },
          }),
          w("div", {
            className:
              "absolute inset-y-0 right-0 w-1/3 pointer-events-none hidden md:block",
            style: {
              background:
                "radial-gradient(circle at 80% 50%, rgba(121,202,189,0.3), transparent 70%)",
            },
          }),
          w("div", {
            className:
              "absolute inset-y-0 right-0 w-1/3 pointer-events-none md:hidden",
            style: {
              background:
                "radial-gradient(circle at 92% 50%, rgba(121,202,189,0.18), transparent 40%)",
            },
          }),
          C("div", {
            className:
              "relative z-10 container mx-auto px-4 py-[4.4rem] md:py-[3.3rem] grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left",
            children: [
              C("div", {
                className:
                  "md:order-1 flex flex-col items-center md:items-start",
                children: [
                  w("img", {
                    src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo.png",
                    alt: "CeroMarket logo",
                    className: "h-8 mb-4",
                  }),
                  w("p", {
                    className: "text-sm leading-relaxed mb-4 max-w-md",
                    children:
                      "Somos un supermercado sustentable enfocado en reducir el uso de plásticos y ofrecer productos naturales a granel. Buscamos fomentar una vida más sana y consciente, conectando a nuestra comunidad con alimentos de calidad y hábitos respetuosos con el planeta.",
                  }),
                  C("a", {
                    href: "https://maps.app.goo.gl/8MRDmZoYJKFR5Zbv6",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "flex items-center gap-2 text-sm hover:text-primary mb-2",
                    children: [
                      w(Ax, {}),
                      w("span", {
                        className: "font-bold",
                        children: "José Martí 3441, Pocitos, Montevideo",
                      }),
                    ],
                  }),
                  C("div", {
                    className: "flex items-center gap-2 text-sm",
                    children: [
                      w(Rx, {}),
                      w("span", {
                        className: "font-bold",
                        children: "De 9AM a 21PM",
                      }),
                    ],
                  }),
                ],
              }),
              w("div", {
                className: "md:order-2 flex items-start justify-center",
                children: C("div", {
                  children: [
                    w("h4", {
                      className: "text-lg font-semibold mb-2",
                      children: "Enlaces rápidos",
                    }),
                    C("ul", {
                      className: "space-y-1 text-sm text-center",
                      children: [
                        w("li", {
                          children: w(_e, {
                            to: "/",
                            className: "hover:text-primary",
                            children: "Inicio",
                          }),
                        }),
                        w("li", {
                          children: w(_e, {
                            to: "/productos",
                            className: "hover:text-primary",
                            children: "Productos",
                          }),
                        }),
                        w("li", {
                          children: w(_e, {
                            to: "/blog",
                            className: "hover:text-primary",
                            children: "Blog",
                          }),
                        }),
                        w("li", {
                          children: w(_e, {
                            to: "/contacto",
                            className: "hover:text-primary",
                            children: "Contacto",
                          }),
                        }),
                        w("li", {
                          children: w(_e, {
                            to: "/trabaja-con-nosotros",
                            className: "hover:text-primary",
                            children: "Trabaja con nosotros",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              C("div", {
                className: "md:order-3 flex flex-col items-center md:items-end",
                children: [
                  C("div", {
                    className: "flex gap-3 mt-0 text-xl",
                    children: [
                      w("a", {
                        href: "https://www.instagram.com/ceromarketuruguay/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "hover:text-primary",
                        children: w(ia, {}),
                      }),
                      w("a", {
                        href: "https://www.facebook.com/ceromarketuruguay/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "hover:text-primary",
                        children: w(gs, {}),
                      }),
                      w("a", {
                        href: "https://wa.me/59896238315",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "hover:text-primary",
                        children: w(Jn, {}),
                      }),
                      w("a", {
                        href: "mailto:hola@ceromarket.com.uy",
                        className: "hover:text-primary",
                        children: w(Bo, {}),
                      }),
                    ],
                  }),
                  C("div", {
                    className: "mt-4 text-sm",
                    children: [
                      w("a", {
                        href: "/politica-de-privacidad",
                        className: "hover:text-primary",
                        children: "Política de privacidad",
                      }),
                      w("span", { className: "mx-2", children: "|" }),
                      w("a", {
                        href: "/terminos-y-condiciones",
                        className: "hover:text-primary",
                        children: "Términos y condiciones",
                      }),
                    ],
                  }),
                  C("p", {
                    className: "text-sm mt-4 font-bold",
                    children: [
                      "© ",
                      new Date().getFullYear(),
                      " CERO Market. Todos los derechos reservados.",
                    ],
                  }),
                  C("div", {
                    className: "mt-3 flex items-center gap-2",
                    children: [
                      w("span", {
                        className: "text-[10px]",
                        children: "Developed by",
                      }),
                      w("a", {
                        href: "https://wpuruguay.com/",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className:
                          "transition-opacity duration-200 hover:opacity-100",
                        children: w("img", {
                          src: "https://wpuruguay.com/wp-content/uploads/2025/08/Logo.png",
                          alt: "WP Uruguay",
                          className: "h-[20px] opacity-50",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
  function Lp(e) {
    return (
      e !== null &&
      typeof e == "object" &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function uf(e = {}, t = {}) {
    Object.keys(t).forEach((n) => {
      typeof e[n] > "u"
        ? (e[n] = t[n])
        : Lp(t[n]) &&
          Lp(e[n]) &&
          Object.keys(t[n]).length > 0 &&
          uf(e[n], t[n]);
    });
  }
  const Ug = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return { initEvent() {} };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName() {
          return [];
        },
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function Pt() {
    const e = typeof document < "u" ? document : {};
    return (uf(e, Ug), e);
  }
  const qx = {
    document: Ug,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        },
      };
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
      return {};
    },
    requestAnimationFrame(e) {
      return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
    },
    cancelAnimationFrame(e) {
      typeof setTimeout > "u" || clearTimeout(e);
    },
  };
  function tt() {
    const e = typeof window < "u" ? window : {};
    return (uf(e, qx), e);
  }
  function Wx(e) {
    const t = e;
    Object.keys(t).forEach((n) => {
      try {
        t[n] = null;
      } catch {}
      try {
        delete t[n];
      } catch {}
    });
  }
  function Fu(e, t = 0) {
    return setTimeout(e, t);
  }
  function Uo() {
    return Date.now();
  }
  function Hx(e) {
    const t = tt();
    let n;
    return (
      t.getComputedStyle && (n = t.getComputedStyle(e, null)),
      !n && e.currentStyle && (n = e.currentStyle),
      n || (n = e.style),
      n
    );
  }
  function Gx(e, t = "x") {
    const n = tt();
    let r, i, a;
    const o = Hx(e);
    return (
      n.WebKitCSSMatrix
        ? ((i = o.transform || o.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((s) => s.replace(",", "."))
              .join(", ")),
          (a = new n.WebKitCSSMatrix(i === "none" ? "" : i)))
        : ((a =
            o.MozTransform ||
            o.OTransform ||
            o.MsTransform ||
            o.msTransform ||
            o.transform ||
            o
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (r = a.toString().split(","))),
      t === "x" &&
        (n.WebKitCSSMatrix
          ? (i = a.m41)
          : r.length === 16
            ? (i = parseFloat(r[12]))
            : (i = parseFloat(r[4]))),
      t === "y" &&
        (n.WebKitCSSMatrix
          ? (i = a.m42)
          : r.length === 16
            ? (i = parseFloat(r[13]))
            : (i = parseFloat(r[5]))),
      i || 0
    );
  }
  function za(e) {
    return (
      typeof e == "object" &&
      e !== null &&
      e.constructor &&
      Object.prototype.toString.call(e).slice(8, -1) === "Object"
    );
  }
  function Yx(e) {
    return typeof window < "u" && typeof window.HTMLElement < "u"
      ? e instanceof HTMLElement
      : e && (e.nodeType === 1 || e.nodeType === 11);
  }
  function Ye(...e) {
    const t = Object(e[0]),
      n = ["__proto__", "constructor", "prototype"];
    for (let r = 1; r < e.length; r += 1) {
      const i = e[r];
      if (i != null && !Yx(i)) {
        const a = Object.keys(Object(i)).filter((o) => n.indexOf(o) < 0);
        for (let o = 0, s = a.length; o < s; o += 1) {
          const l = a[o],
            u = Object.getOwnPropertyDescriptor(i, l);
          u !== void 0 &&
            u.enumerable &&
            (za(t[l]) && za(i[l])
              ? i[l].__swiper__
                ? (t[l] = i[l])
                : Ye(t[l], i[l])
              : !za(t[l]) && za(i[l])
                ? ((t[l] = {}),
                  i[l].__swiper__ ? (t[l] = i[l]) : Ye(t[l], i[l]))
                : (t[l] = i[l]));
        }
      }
    }
    return t;
  }
  function ja(e, t, n) {
    e.style.setProperty(t, n);
  }
  function Qg({ swiper: e, targetPosition: t, side: n }) {
    const r = tt(),
      i = -e.translate;
    let a = null,
      o;
    const s = e.params.speed;
    ((e.wrapperEl.style.scrollSnapType = "none"),
      r.cancelAnimationFrame(e.cssModeFrameID));
    const l = t > i ? "next" : "prev",
      u = (f, d) => (l === "next" && f >= d) || (l === "prev" && f <= d),
      c = () => {
        ((o = new Date().getTime()), a === null && (a = o));
        const f = Math.max(Math.min((o - a) / s, 1), 0),
          d = 0.5 - Math.cos(f * Math.PI) / 2;
        let h = i + d * (t - i);
        if ((u(h, t) && (h = t), e.wrapperEl.scrollTo({ [n]: h }), u(h, t))) {
          ((e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              ((e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [n]: h }));
            }),
            r.cancelAnimationFrame(e.cssModeFrameID));
          return;
        }
        e.cssModeFrameID = r.requestAnimationFrame(c);
      };
    c();
  }
  function Ct(e, t = "") {
    return [...e.children].filter((n) => n.matches(t));
  }
  function $g(e, t = []) {
    const n = document.createElement(e);
    return (n.classList.add(...(Array.isArray(t) ? t : [t])), n);
  }
  function Xx(e, t) {
    const n = [];
    for (; e.previousElementSibling;) {
      const r = e.previousElementSibling;
      (t ? r.matches(t) && n.push(r) : n.push(r), (e = r));
    }
    return n;
  }
  function Kx(e, t) {
    const n = [];
    for (; e.nextElementSibling;) {
      const r = e.nextElementSibling;
      (t ? r.matches(t) && n.push(r) : n.push(r), (e = r));
    }
    return n;
  }
  function ln(e, t) {
    return tt().getComputedStyle(e, null).getPropertyValue(t);
  }
  function Fp(e) {
    let t = e,
      n;
    if (t) {
      for (n = 0; (t = t.previousSibling) !== null;)
        t.nodeType === 1 && (n += 1);
      return n;
    }
  }
  function Jx(e, t) {
    const n = [];
    let r = e.parentElement;
    for (; r;)
      (t ? r.matches(t) && n.push(r) : n.push(r), (r = r.parentElement));
    return n;
  }
  function Ap(e, t, n) {
    const r = tt();
    return n
      ? e[t === "width" ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            r
              .getComputedStyle(e, null)
              .getPropertyValue(t === "width" ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            r
              .getComputedStyle(e, null)
              .getPropertyValue(
                t === "width" ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let ul;
  function Zx() {
    const e = tt(),
      t = Pt();
    return {
      smoothScroll:
        t.documentElement &&
        t.documentElement.style &&
        "scrollBehavior" in t.documentElement.style,
      touch: !!(
        "ontouchstart" in e ||
        (e.DocumentTouch && t instanceof e.DocumentTouch)
      ),
    };
  }
  function qg() {
    return (ul || (ul = Zx()), ul);
  }
  let cl;
  function eb({ userAgent: e } = {}) {
    const t = qg(),
      n = tt(),
      r = n.navigator.platform,
      i = e || n.navigator.userAgent,
      a = { ios: !1, android: !1 },
      o = n.screen.width,
      s = n.screen.height,
      l = i.match(/(Android);?[\s\/]+([\d.]+)?/);
    let u = i.match(/(iPad).*OS\s([\d_]+)/);
    const c = i.match(/(iPod)(.*OS\s([\d_]+))?/),
      f = !u && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
      d = r === "Win32";
    let h = r === "MacIntel";
    const v = [
      "1024x1366",
      "1366x1024",
      "834x1194",
      "1194x834",
      "834x1112",
      "1112x834",
      "768x1024",
      "1024x768",
      "820x1180",
      "1180x820",
      "810x1080",
      "1080x810",
    ];
    return (
      !u &&
        h &&
        t.touch &&
        v.indexOf(`${o}x${s}`) >= 0 &&
        ((u = i.match(/(Version)\/([\d.]+)/)),
        u || (u = [0, 1, "13_0_0"]),
        (h = !1)),
      l && !d && ((a.os = "android"), (a.android = !0)),
      (u || f || c) && ((a.os = "ios"), (a.ios = !0)),
      a
    );
  }
  function tb(e = {}) {
    return (cl || (cl = eb(e)), cl);
  }
  let fl;
  function nb() {
    const e = tt();
    let t = !1;
    function n() {
      const r = e.navigator.userAgent.toLowerCase();
      return (
        r.indexOf("safari") >= 0 &&
        r.indexOf("chrome") < 0 &&
        r.indexOf("android") < 0
      );
    }
    if (n()) {
      const r = String(e.navigator.userAgent);
      if (r.includes("Version/")) {
        const [i, a] = r
          .split("Version/")[1]
          .split(" ")[0]
          .split(".")
          .map((o) => Number(o));
        t = i < 16 || (i === 16 && a < 2);
      }
    }
    return {
      isSafari: t || n(),
      needPerspectiveFix: t,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        e.navigator.userAgent,
      ),
    };
  }
  function rb() {
    return (fl || (fl = nb()), fl);
  }
  function ib({ swiper: e, on: t, emit: n }) {
    const r = tt();
    let i = null,
      a = null;
    const o = () => {
        !e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
      },
      s = () => {
        !e ||
          e.destroyed ||
          !e.initialized ||
          ((i = new ResizeObserver((c) => {
            a = r.requestAnimationFrame(() => {
              const { width: f, height: d } = e;
              let h = f,
                v = d;
              (c.forEach(({ contentBoxSize: y, contentRect: S, target: p }) => {
                (p && p !== e.el) ||
                  ((h = S ? S.width : (y[0] || y).inlineSize),
                  (v = S ? S.height : (y[0] || y).blockSize));
              }),
                (h !== f || v !== d) && o());
            });
          })),
          i.observe(e.el));
      },
      l = () => {
        (a && r.cancelAnimationFrame(a),
          i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)));
      },
      u = () => {
        !e || e.destroyed || !e.initialized || n("orientationchange");
      };
    (t("init", () => {
      if (e.params.resizeObserver && typeof r.ResizeObserver < "u") {
        s();
        return;
      }
      (r.addEventListener("resize", o),
        r.addEventListener("orientationchange", u));
    }),
      t("destroy", () => {
        (l(),
          r.removeEventListener("resize", o),
          r.removeEventListener("orientationchange", u));
      }));
  }
  function ab({ swiper: e, extendParams: t, on: n, emit: r }) {
    const i = [],
      a = tt(),
      o = (u, c = {}) => {
        const f = a.MutationObserver || a.WebkitMutationObserver,
          d = new f((h) => {
            if (e.__preventObserver__) return;
            if (h.length === 1) {
              r("observerUpdate", h[0]);
              return;
            }
            const v = function () {
              r("observerUpdate", h[0]);
            };
            a.requestAnimationFrame
              ? a.requestAnimationFrame(v)
              : a.setTimeout(v, 0);
          });
        (d.observe(u, {
          attributes: typeof c.attributes > "u" ? !0 : c.attributes,
          childList: typeof c.childList > "u" ? !0 : c.childList,
          characterData: typeof c.characterData > "u" ? !0 : c.characterData,
        }),
          i.push(d));
      },
      s = () => {
        if (e.params.observer) {
          if (e.params.observeParents) {
            const u = Jx(e.el);
            for (let c = 0; c < u.length; c += 1) o(u[c]);
          }
          (o(e.el, { childList: e.params.observeSlideChildren }),
            o(e.wrapperEl, { attributes: !1 }));
        }
      },
      l = () => {
        (i.forEach((u) => {
          u.disconnect();
        }),
          i.splice(0, i.length));
      };
    (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
      n("init", s),
      n("destroy", l));
  }
  const ob = {
    on(e, t, n) {
      const r = this;
      if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
      const i = n ? "unshift" : "push";
      return (
        e.split(" ").forEach((a) => {
          (r.eventsListeners[a] || (r.eventsListeners[a] = []),
            r.eventsListeners[a][i](t));
        }),
        r
      );
    },
    once(e, t, n) {
      const r = this;
      if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
      function i(...a) {
        (r.off(e, i),
          i.__emitterProxy && delete i.__emitterProxy,
          t.apply(r, a));
      }
      return ((i.__emitterProxy = t), r.on(e, i, n));
    },
    onAny(e, t) {
      const n = this;
      if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
      const r = t ? "unshift" : "push";
      return (
        n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[r](e),
        n
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
      const n = t.eventsAnyListeners.indexOf(e);
      return (n >= 0 && t.eventsAnyListeners.splice(n, 1), t);
    },
    off(e, t) {
      const n = this;
      return (
        !n.eventsListeners ||
          n.destroyed ||
          !n.eventsListeners ||
          e.split(" ").forEach((r) => {
            typeof t > "u"
              ? (n.eventsListeners[r] = [])
              : n.eventsListeners[r] &&
                n.eventsListeners[r].forEach((i, a) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    n.eventsListeners[r].splice(a, 1);
                });
          }),
        n
      );
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
      let n, r, i;
      return (
        typeof e[0] == "string" || Array.isArray(e[0])
          ? ((n = e[0]), (r = e.slice(1, e.length)), (i = t))
          : ((n = e[0].events), (r = e[0].data), (i = e[0].context || t)),
        r.unshift(i),
        (Array.isArray(n) ? n : n.split(" ")).forEach((o) => {
          (t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((s) => {
              s.apply(i, [o, ...r]);
            }),
            t.eventsListeners &&
              t.eventsListeners[o] &&
              t.eventsListeners[o].forEach((s) => {
                s.apply(i, r);
              }));
        }),
        t
      );
    },
  };
  function sb() {
    const e = this;
    let t, n;
    const r = e.el;
    (typeof e.params.width < "u" && e.params.width !== null
      ? (t = e.params.width)
      : (t = r.clientWidth),
      typeof e.params.height < "u" && e.params.height !== null
        ? (n = e.params.height)
        : (n = r.clientHeight),
      !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
        ((t =
          t -
          parseInt(ln(r, "padding-left") || 0, 10) -
          parseInt(ln(r, "padding-right") || 0, 10)),
        (n =
          n -
          parseInt(ln(r, "padding-top") || 0, 10) -
          parseInt(ln(r, "padding-bottom") || 0, 10)),
        Number.isNaN(t) && (t = 0),
        Number.isNaN(n) && (n = 0),
        Object.assign(e, {
          width: t,
          height: n,
          size: e.isHorizontal() ? t : n,
        })));
  }
  function lb() {
    const e = this;
    function t(M) {
      return e.isHorizontal()
        ? M
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[M];
    }
    function n(M, A) {
      return parseFloat(M.getPropertyValue(t(A)) || 0);
    }
    const r = e.params,
      { wrapperEl: i, slidesEl: a, size: o, rtlTranslate: s, wrongRTL: l } = e,
      u = e.virtual && r.virtual.enabled,
      c = u ? e.virtual.slides.length : e.slides.length,
      f = Ct(a, `.${e.params.slideClass}, swiper-slide`),
      d = u ? e.virtual.slides.length : f.length;
    let h = [];
    const v = [],
      y = [];
    let S = r.slidesOffsetBefore;
    typeof S == "function" && (S = r.slidesOffsetBefore.call(e));
    let p = r.slidesOffsetAfter;
    typeof p == "function" && (p = r.slidesOffsetAfter.call(e));
    const m = e.snapGrid.length,
      g = e.slidesGrid.length;
    let E = r.spaceBetween,
      x = -S,
      b = 0,
      k = 0;
    if (typeof o > "u") return;
    (typeof E == "string" && E.indexOf("%") >= 0
      ? (E = (parseFloat(E.replace("%", "")) / 100) * o)
      : typeof E == "string" && (E = parseFloat(E)),
      (e.virtualSize = -E),
      f.forEach((M) => {
        (s ? (M.style.marginLeft = "") : (M.style.marginRight = ""),
          (M.style.marginBottom = ""),
          (M.style.marginTop = ""));
      }),
      r.centeredSlides &&
        r.cssMode &&
        (ja(i, "--swiper-centered-offset-before", ""),
        ja(i, "--swiper-centered-offset-after", "")));
    const T = r.grid && r.grid.rows > 1 && e.grid;
    T && e.grid.initSlides(d);
    let R;
    const j =
      r.slidesPerView === "auto" &&
      r.breakpoints &&
      Object.keys(r.breakpoints).filter(
        (M) => typeof r.breakpoints[M].slidesPerView < "u",
      ).length > 0;
    for (let M = 0; M < d; M += 1) {
      R = 0;
      let A;
      if (
        (f[M] && (A = f[M]),
        T && e.grid.updateSlide(M, A, d, t),
        !(f[M] && ln(A, "display") === "none"))
      ) {
        if (r.slidesPerView === "auto") {
          j && (f[M].style[t("width")] = "");
          const B = getComputedStyle(A),
            Y = A.style.transform,
            Ue = A.style.webkitTransform;
          if (
            (Y && (A.style.transform = "none"),
            Ue && (A.style.webkitTransform = "none"),
            r.roundLengths)
          )
            R = e.isHorizontal() ? Ap(A, "width", !0) : Ap(A, "height", !0);
          else {
            const Q = n(B, "width"),
              ye = n(B, "padding-left"),
              D = n(B, "padding-right"),
              L = n(B, "margin-left"),
              U = n(B, "margin-right"),
              Z = B.getPropertyValue("box-sizing");
            if (Z && Z === "border-box") R = Q + L + U;
            else {
              const { clientWidth: ee, offsetWidth: xt } = A;
              R = Q + ye + D + L + U + (xt - ee);
            }
          }
          (Y && (A.style.transform = Y),
            Ue && (A.style.webkitTransform = Ue),
            r.roundLengths && (R = Math.floor(R)));
        } else
          ((R = (o - (r.slidesPerView - 1) * E) / r.slidesPerView),
            r.roundLengths && (R = Math.floor(R)),
            f[M] && (f[M].style[t("width")] = `${R}px`));
        (f[M] && (f[M].swiperSlideSize = R),
          y.push(R),
          r.centeredSlides
            ? ((x = x + R / 2 + b / 2 + E),
              b === 0 && M !== 0 && (x = x - o / 2 - E),
              M === 0 && (x = x - o / 2 - E),
              Math.abs(x) < 1 / 1e3 && (x = 0),
              r.roundLengths && (x = Math.floor(x)),
              k % r.slidesPerGroup === 0 && h.push(x),
              v.push(x))
            : (r.roundLengths && (x = Math.floor(x)),
              (k - Math.min(e.params.slidesPerGroupSkip, k)) %
                e.params.slidesPerGroup ===
                0 && h.push(x),
              v.push(x),
              (x = x + R + E)),
          (e.virtualSize += R + E),
          (b = R),
          (k += 1));
      }
    }
    if (
      ((e.virtualSize = Math.max(e.virtualSize, o) + p),
      s &&
        l &&
        (r.effect === "slide" || r.effect === "coverflow") &&
        (i.style.width = `${e.virtualSize + E}px`),
      r.setWrapperSize && (i.style[t("width")] = `${e.virtualSize + E}px`),
      T && e.grid.updateWrapperSize(R, h, t),
      !r.centeredSlides)
    ) {
      const M = [];
      for (let A = 0; A < h.length; A += 1) {
        let B = h[A];
        (r.roundLengths && (B = Math.floor(B)),
          h[A] <= e.virtualSize - o && M.push(B));
      }
      ((h = M),
        Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
          h.push(e.virtualSize - o));
    }
    if (u && r.loop) {
      const M = y[0] + E;
      if (r.slidesPerGroup > 1) {
        const A = Math.ceil(
            (e.virtual.slidesBefore + e.virtual.slidesAfter) / r.slidesPerGroup,
          ),
          B = M * r.slidesPerGroup;
        for (let Y = 0; Y < A; Y += 1) h.push(h[h.length - 1] + B);
      }
      for (
        let A = 0;
        A < e.virtual.slidesBefore + e.virtual.slidesAfter;
        A += 1
      )
        (r.slidesPerGroup === 1 && h.push(h[h.length - 1] + M),
          v.push(v[v.length - 1] + M),
          (e.virtualSize += M));
    }
    if ((h.length === 0 && (h = [0]), E !== 0)) {
      const M = e.isHorizontal() && s ? "marginLeft" : t("marginRight");
      f.filter((A, B) =>
        !r.cssMode || r.loop ? !0 : B !== f.length - 1,
      ).forEach((A) => {
        A.style[M] = `${E}px`;
      });
    }
    if (r.centeredSlides && r.centeredSlidesBounds) {
      let M = 0;
      (y.forEach((B) => {
        M += B + (E || 0);
      }),
        (M -= E));
      const A = M - o;
      h = h.map((B) => (B <= 0 ? -S : B > A ? A + p : B));
    }
    if (r.centerInsufficientSlides) {
      let M = 0;
      if (
        (y.forEach((A) => {
          M += A + (E || 0);
        }),
        (M -= E),
        M < o)
      ) {
        const A = (o - M) / 2;
        (h.forEach((B, Y) => {
          h[Y] = B - A;
        }),
          v.forEach((B, Y) => {
            v[Y] = B + A;
          }));
      }
    }
    if (
      (Object.assign(e, {
        slides: f,
        snapGrid: h,
        slidesGrid: v,
        slidesSizesGrid: y,
      }),
      r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
    ) {
      (ja(i, "--swiper-centered-offset-before", `${-h[0]}px`),
        ja(
          i,
          "--swiper-centered-offset-after",
          `${e.size / 2 - y[y.length - 1] / 2}px`,
        ));
      const M = -e.snapGrid[0],
        A = -e.slidesGrid[0];
      ((e.snapGrid = e.snapGrid.map((B) => B + M)),
        (e.slidesGrid = e.slidesGrid.map((B) => B + A)));
    }
    if (
      (d !== c && e.emit("slidesLengthChange"),
      h.length !== m &&
        (e.params.watchOverflow && e.checkOverflow(),
        e.emit("snapGridLengthChange")),
      v.length !== g && e.emit("slidesGridLengthChange"),
      r.watchSlidesProgress && e.updateSlidesOffset(),
      !u && !r.cssMode && (r.effect === "slide" || r.effect === "fade"))
    ) {
      const M = `${r.containerModifierClass}backface-hidden`,
        A = e.el.classList.contains(M);
      d <= r.maxBackfaceHiddenSlides
        ? A || e.el.classList.add(M)
        : A && e.el.classList.remove(M);
    }
  }
  function ub(e) {
    const t = this,
      n = [],
      r = t.virtual && t.params.virtual.enabled;
    let i = 0,
      a;
    typeof e == "number"
      ? t.setTransition(e)
      : e === !0 && t.setTransition(t.params.speed);
    const o = (s) => (r ? t.slides[t.getSlideIndexByData(s)] : t.slides[s]);
    if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
      if (t.params.centeredSlides)
        (t.visibleSlides || []).forEach((s) => {
          n.push(s);
        });
      else
        for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
          const s = t.activeIndex + a;
          if (s > t.slides.length && !r) break;
          n.push(o(s));
        }
    else n.push(o(t.activeIndex));
    for (a = 0; a < n.length; a += 1)
      if (typeof n[a] < "u") {
        const s = n[a].offsetHeight;
        i = s > i ? s : i;
      }
    (i || i === 0) && (t.wrapperEl.style.height = `${i}px`);
  }
  function cb() {
    const e = this,
      t = e.slides,
      n = e.isElement
        ? e.isHorizontal()
          ? e.wrapperEl.offsetLeft
          : e.wrapperEl.offsetTop
        : 0;
    for (let r = 0; r < t.length; r += 1)
      t[r].swiperSlideOffset =
        (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) -
        n -
        e.cssOverflowAdjustment();
  }
  function fb(e = (this && this.translate) || 0) {
    const t = this,
      n = t.params,
      { slides: r, rtlTranslate: i, snapGrid: a } = t;
    if (r.length === 0) return;
    typeof r[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
    let o = -e;
    (i && (o = e),
      r.forEach((l) => {
        l.classList.remove(n.slideVisibleClass);
      }),
      (t.visibleSlidesIndexes = []),
      (t.visibleSlides = []));
    let s = n.spaceBetween;
    typeof s == "string" && s.indexOf("%") >= 0
      ? (s = (parseFloat(s.replace("%", "")) / 100) * t.size)
      : typeof s == "string" && (s = parseFloat(s));
    for (let l = 0; l < r.length; l += 1) {
      const u = r[l];
      let c = u.swiperSlideOffset;
      n.cssMode && n.centeredSlides && (c -= r[0].swiperSlideOffset);
      const f =
          (o + (n.centeredSlides ? t.minTranslate() : 0) - c) /
          (u.swiperSlideSize + s),
        d =
          (o - a[0] + (n.centeredSlides ? t.minTranslate() : 0) - c) /
          (u.swiperSlideSize + s),
        h = -(o - c),
        v = h + t.slidesSizesGrid[l];
      (((h >= 0 && h < t.size - 1) ||
        (v > 1 && v <= t.size) ||
        (h <= 0 && v >= t.size)) &&
        (t.visibleSlides.push(u),
        t.visibleSlidesIndexes.push(l),
        r[l].classList.add(n.slideVisibleClass)),
        (u.progress = i ? -f : f),
        (u.originalProgress = i ? -d : d));
    }
  }
  function db(e) {
    const t = this;
    if (typeof e > "u") {
      const c = t.rtlTranslate ? -1 : 1;
      e = (t && t.translate && t.translate * c) || 0;
    }
    const n = t.params,
      r = t.maxTranslate() - t.minTranslate();
    let { progress: i, isBeginning: a, isEnd: o, progressLoop: s } = t;
    const l = a,
      u = o;
    if (r === 0) ((i = 0), (a = !0), (o = !0));
    else {
      i = (e - t.minTranslate()) / r;
      const c = Math.abs(e - t.minTranslate()) < 1,
        f = Math.abs(e - t.maxTranslate()) < 1;
      ((a = c || i <= 0), (o = f || i >= 1), c && (i = 0), f && (i = 1));
    }
    if (n.loop) {
      const c = t.getSlideIndexByData(0),
        f = t.getSlideIndexByData(t.slides.length - 1),
        d = t.slidesGrid[c],
        h = t.slidesGrid[f],
        v = t.slidesGrid[t.slidesGrid.length - 1],
        y = Math.abs(e);
      (y >= d ? (s = (y - d) / v) : (s = (y + v - h) / v), s > 1 && (s -= 1));
    }
    (Object.assign(t, {
      progress: i,
      progressLoop: s,
      isBeginning: a,
      isEnd: o,
    }),
      (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
        t.updateSlidesProgress(e),
      a && !l && t.emit("reachBeginning toEdge"),
      o && !u && t.emit("reachEnd toEdge"),
      ((l && !a) || (u && !o)) && t.emit("fromEdge"),
      t.emit("progress", i));
  }
  function pb() {
    const e = this,
      { slides: t, params: n, slidesEl: r, activeIndex: i } = e,
      a = e.virtual && n.virtual.enabled,
      o = (l) => Ct(r, `.${n.slideClass}${l}, swiper-slide${l}`)[0];
    t.forEach((l) => {
      l.classList.remove(
        n.slideActiveClass,
        n.slideNextClass,
        n.slidePrevClass,
      );
    });
    let s;
    if (a)
      if (n.loop) {
        let l = i - e.virtual.slidesBefore;
        (l < 0 && (l = e.virtual.slides.length + l),
          l >= e.virtual.slides.length && (l -= e.virtual.slides.length),
          (s = o(`[data-swiper-slide-index="${l}"]`)));
      } else s = o(`[data-swiper-slide-index="${i}"]`);
    else s = t[i];
    if (s) {
      s.classList.add(n.slideActiveClass);
      let l = Kx(s, `.${n.slideClass}, swiper-slide`)[0];
      (n.loop && !l && (l = t[0]), l && l.classList.add(n.slideNextClass));
      let u = Xx(s, `.${n.slideClass}, swiper-slide`)[0];
      (n.loop && !u === 0 && (u = t[t.length - 1]),
        u && u.classList.add(n.slidePrevClass));
    }
    e.emitSlidesClasses();
  }
  const so = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const n = () =>
          e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
        r = t.closest(n());
      if (r) {
        const i = r.querySelector(`.${e.params.lazyPreloaderClass}`);
        i && i.remove();
      }
    },
    dl = (e, t) => {
      if (!e.slides[t]) return;
      const n = e.slides[t].querySelector('[loading="lazy"]');
      n && n.removeAttribute("loading");
    },
    Au = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const n = e.slides.length;
      if (!n || !t || t < 0) return;
      t = Math.min(t, n);
      const r =
          e.params.slidesPerView === "auto"
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        i = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const o = i,
          s = [o - t];
        (s.push(...Array.from({ length: t }).map((l, u) => o + r + u)),
          e.slides.forEach((l, u) => {
            s.includes(l.column) && dl(e, u);
          }));
        return;
      }
      const a = i + r - 1;
      if (e.params.rewind || e.params.loop)
        for (let o = i - t; o <= a + t; o += 1) {
          const s = ((o % n) + n) % n;
          (s < i || s > a) && dl(e, s);
        }
      else
        for (let o = Math.max(i - t, 0); o <= Math.min(a + t, n - 1); o += 1)
          o !== i && (o > a || o < i) && dl(e, o);
    };
  function hb(e) {
    const { slidesGrid: t, params: n } = e,
      r = e.rtlTranslate ? e.translate : -e.translate;
    let i;
    for (let a = 0; a < t.length; a += 1)
      typeof t[a + 1] < "u"
        ? r >= t[a] && r < t[a + 1] - (t[a + 1] - t[a]) / 2
          ? (i = a)
          : r >= t[a] && r < t[a + 1] && (i = a + 1)
        : r >= t[a] && (i = a);
    return (n.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i);
  }
  function mb(e) {
    const t = this,
      n = t.rtlTranslate ? t.translate : -t.translate,
      {
        snapGrid: r,
        params: i,
        activeIndex: a,
        realIndex: o,
        snapIndex: s,
      } = t;
    let l = e,
      u;
    const c = (d) => {
      let h = d - t.virtual.slidesBefore;
      return (
        h < 0 && (h = t.virtual.slides.length + h),
        h >= t.virtual.slides.length && (h -= t.virtual.slides.length),
        h
      );
    };
    if ((typeof l > "u" && (l = hb(t)), r.indexOf(n) >= 0)) u = r.indexOf(n);
    else {
      const d = Math.min(i.slidesPerGroupSkip, l);
      u = d + Math.floor((l - d) / i.slidesPerGroup);
    }
    if ((u >= r.length && (u = r.length - 1), l === a)) {
      (u !== s && ((t.snapIndex = u), t.emit("snapIndexChange")),
        t.params.loop &&
          t.virtual &&
          t.params.virtual.enabled &&
          (t.realIndex = c(l)));
      return;
    }
    let f;
    (t.virtual && i.virtual.enabled && i.loop
      ? (f = c(l))
      : t.slides[l]
        ? (f = parseInt(
            t.slides[l].getAttribute("data-swiper-slide-index") || l,
            10,
          ))
        : (f = l),
      Object.assign(t, {
        previousSnapIndex: s,
        snapIndex: u,
        previousRealIndex: o,
        realIndex: f,
        previousIndex: a,
        activeIndex: l,
      }),
      t.initialized && Au(t),
      t.emit("activeIndexChange"),
      t.emit("snapIndexChange"),
      o !== f && t.emit("realIndexChange"),
      (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange"));
  }
  function vb(e) {
    const t = this,
      n = t.params,
      r = e.closest(`.${n.slideClass}, swiper-slide`);
    let i = !1,
      a;
    if (r) {
      for (let o = 0; o < t.slides.length; o += 1)
        if (t.slides[o] === r) {
          ((i = !0), (a = o));
          break;
        }
    }
    if (r && i)
      ((t.clickedSlide = r),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              r.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (t.clickedIndex = a));
    else {
      ((t.clickedSlide = void 0), (t.clickedIndex = void 0));
      return;
    }
    n.slideToClickedSlide &&
      t.clickedIndex !== void 0 &&
      t.clickedIndex !== t.activeIndex &&
      t.slideToClickedSlide();
  }
  const gb = {
    updateSize: sb,
    updateSlides: lb,
    updateAutoHeight: ub,
    updateSlidesOffset: cb,
    updateSlidesProgress: fb,
    updateProgress: db,
    updateSlidesClasses: pb,
    updateActiveIndex: mb,
    updateClickedSlide: vb,
  };
  function yb(e = this.isHorizontal() ? "x" : "y") {
    const t = this,
      { params: n, rtlTranslate: r, translate: i, wrapperEl: a } = t;
    if (n.virtualTranslate) return r ? -i : i;
    if (n.cssMode) return i;
    let o = Gx(a, e);
    return ((o += t.cssOverflowAdjustment()), r && (o = -o), o || 0);
  }
  function wb(e, t) {
    const n = this,
      { rtlTranslate: r, params: i, wrapperEl: a, progress: o } = n;
    let s = 0,
      l = 0;
    const u = 0;
    (n.isHorizontal() ? (s = r ? -e : e) : (l = e),
      i.roundLengths && ((s = Math.floor(s)), (l = Math.floor(l))),
      (n.previousTranslate = n.translate),
      (n.translate = n.isHorizontal() ? s : l),
      i.cssMode
        ? (a[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
            ? -s
            : -l)
        : i.virtualTranslate ||
          (n.isHorizontal()
            ? (s -= n.cssOverflowAdjustment())
            : (l -= n.cssOverflowAdjustment()),
          (a.style.transform = `translate3d(${s}px, ${l}px, ${u}px)`)));
    let c;
    const f = n.maxTranslate() - n.minTranslate();
    (f === 0 ? (c = 0) : (c = (e - n.minTranslate()) / f),
      c !== o && n.updateProgress(e),
      n.emit("setTranslate", n.translate, t));
  }
  function Sb() {
    return -this.snapGrid[0];
  }
  function Eb() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function xb(e = 0, t = this.params.speed, n = !0, r = !0, i) {
    const a = this,
      { params: o, wrapperEl: s } = a;
    if (a.animating && o.preventInteractionOnTransition) return !1;
    const l = a.minTranslate(),
      u = a.maxTranslate();
    let c;
    if (
      (r && e > l ? (c = l) : r && e < u ? (c = u) : (c = e),
      a.updateProgress(c),
      o.cssMode)
    ) {
      const f = a.isHorizontal();
      if (t === 0) s[f ? "scrollLeft" : "scrollTop"] = -c;
      else {
        if (!a.support.smoothScroll)
          return (
            Qg({ swiper: a, targetPosition: -c, side: f ? "left" : "top" }),
            !0
          );
        s.scrollTo({ [f ? "left" : "top"]: -c, behavior: "smooth" });
      }
      return !0;
    }
    return (
      t === 0
        ? (a.setTransition(0),
          a.setTranslate(c),
          n && (a.emit("beforeTransitionStart", t, i), a.emit("transitionEnd")))
        : (a.setTransition(t),
          a.setTranslate(c),
          n &&
            (a.emit("beforeTransitionStart", t, i), a.emit("transitionStart")),
          a.animating ||
            ((a.animating = !0),
            a.onTranslateToWrapperTransitionEnd ||
              (a.onTranslateToWrapperTransitionEnd = function (d) {
                !a ||
                  a.destroyed ||
                  (d.target === this &&
                    (a.wrapperEl.removeEventListener(
                      "transitionend",
                      a.onTranslateToWrapperTransitionEnd,
                    ),
                    (a.onTranslateToWrapperTransitionEnd = null),
                    delete a.onTranslateToWrapperTransitionEnd,
                    n && a.emit("transitionEnd")));
              }),
            a.wrapperEl.addEventListener(
              "transitionend",
              a.onTranslateToWrapperTransitionEnd,
            ))),
      !0
    );
  }
  const bb = {
    getTranslate: yb,
    setTranslate: wb,
    minTranslate: Sb,
    maxTranslate: Eb,
    translateTo: xb,
  };
  function _b(e, t) {
    const n = this;
    (n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`),
      n.emit("setTransition", e, t));
  }
  function Wg({ swiper: e, runCallbacks: t, direction: n, step: r }) {
    const { activeIndex: i, previousIndex: a } = e;
    let o = n;
    if (
      (o || (i > a ? (o = "next") : i < a ? (o = "prev") : (o = "reset")),
      e.emit(`transition${r}`),
      t && i !== a)
    ) {
      if (o === "reset") {
        e.emit(`slideResetTransition${r}`);
        return;
      }
      (e.emit(`slideChangeTransition${r}`),
        o === "next"
          ? e.emit(`slideNextTransition${r}`)
          : e.emit(`slidePrevTransition${r}`));
    }
  }
  function Tb(e = !0, t) {
    const n = this,
      { params: r } = n;
    r.cssMode ||
      (r.autoHeight && n.updateAutoHeight(),
      Wg({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
  }
  function kb(e = !0, t) {
    const n = this,
      { params: r } = n;
    ((n.animating = !1),
      !r.cssMode &&
        (n.setTransition(0),
        Wg({ swiper: n, runCallbacks: e, direction: t, step: "End" })));
  }
  const Cb = { setTransition: _b, transitionStart: Tb, transitionEnd: kb };
  function Ob(e = 0, t = this.params.speed, n = !0, r, i) {
    typeof e == "string" && (e = parseInt(e, 10));
    const a = this;
    let o = e;
    o < 0 && (o = 0);
    const {
      params: s,
      snapGrid: l,
      slidesGrid: u,
      previousIndex: c,
      activeIndex: f,
      rtlTranslate: d,
      wrapperEl: h,
      enabled: v,
    } = a;
    if ((a.animating && s.preventInteractionOnTransition) || (!v && !r && !i))
      return !1;
    const y = Math.min(a.params.slidesPerGroupSkip, o);
    let S = y + Math.floor((o - y) / a.params.slidesPerGroup);
    S >= l.length && (S = l.length - 1);
    const p = -l[S];
    if (s.normalizeSlideIndex)
      for (let g = 0; g < u.length; g += 1) {
        const E = -Math.floor(p * 100),
          x = Math.floor(u[g] * 100),
          b = Math.floor(u[g + 1] * 100);
        typeof u[g + 1] < "u"
          ? E >= x && E < b - (b - x) / 2
            ? (o = g)
            : E >= x && E < b && (o = g + 1)
          : E >= x && (o = g);
      }
    if (
      a.initialized &&
      o !== f &&
      ((!a.allowSlideNext &&
        (d
          ? p > a.translate && p > a.minTranslate()
          : p < a.translate && p < a.minTranslate())) ||
        (!a.allowSlidePrev &&
          p > a.translate &&
          p > a.maxTranslate() &&
          (f || 0) !== o))
    )
      return !1;
    (o !== (c || 0) && n && a.emit("beforeSlideChangeStart"),
      a.updateProgress(p));
    let m;
    if (
      (o > f ? (m = "next") : o < f ? (m = "prev") : (m = "reset"),
      (d && -p === a.translate) || (!d && p === a.translate))
    )
      return (
        a.updateActiveIndex(o),
        s.autoHeight && a.updateAutoHeight(),
        a.updateSlidesClasses(),
        s.effect !== "slide" && a.setTranslate(p),
        m !== "reset" && (a.transitionStart(n, m), a.transitionEnd(n, m)),
        !1
      );
    if (s.cssMode) {
      const g = a.isHorizontal(),
        E = d ? p : -p;
      if (t === 0) {
        const x = a.virtual && a.params.virtual.enabled;
        (x &&
          ((a.wrapperEl.style.scrollSnapType = "none"),
          (a._immediateVirtual = !0)),
          x && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0
            ? ((a._cssModeVirtualInitialSet = !0),
              requestAnimationFrame(() => {
                h[g ? "scrollLeft" : "scrollTop"] = E;
              }))
            : (h[g ? "scrollLeft" : "scrollTop"] = E),
          x &&
            requestAnimationFrame(() => {
              ((a.wrapperEl.style.scrollSnapType = ""),
                (a._immediateVirtual = !1));
            }));
      } else {
        if (!a.support.smoothScroll)
          return (
            Qg({ swiper: a, targetPosition: E, side: g ? "left" : "top" }),
            !0
          );
        h.scrollTo({ [g ? "left" : "top"]: E, behavior: "smooth" });
      }
      return !0;
    }
    return (
      a.setTransition(t),
      a.setTranslate(p),
      a.updateActiveIndex(o),
      a.updateSlidesClasses(),
      a.emit("beforeTransitionStart", t, r),
      a.transitionStart(n, m),
      t === 0
        ? a.transitionEnd(n, m)
        : a.animating ||
          ((a.animating = !0),
          a.onSlideToWrapperTransitionEnd ||
            (a.onSlideToWrapperTransitionEnd = function (E) {
              !a ||
                a.destroyed ||
                (E.target === this &&
                  (a.wrapperEl.removeEventListener(
                    "transitionend",
                    a.onSlideToWrapperTransitionEnd,
                  ),
                  (a.onSlideToWrapperTransitionEnd = null),
                  delete a.onSlideToWrapperTransitionEnd,
                  a.transitionEnd(n, m)));
            }),
          a.wrapperEl.addEventListener(
            "transitionend",
            a.onSlideToWrapperTransitionEnd,
          )),
      !0
    );
  }
  function Nb(e = 0, t = this.params.speed, n = !0, r) {
    typeof e == "string" && (e = parseInt(e, 10));
    const i = this;
    let a = e;
    return (
      i.params.loop &&
        (i.virtual && i.params.virtual.enabled
          ? (a = a + i.virtual.slidesBefore)
          : (a = i.getSlideIndexByData(a))),
      i.slideTo(a, t, n, r)
    );
  }
  function Pb(e = this.params.speed, t = !0, n) {
    const r = this,
      { enabled: i, params: a, animating: o } = r;
    if (!i) return r;
    let s = a.slidesPerGroup;
    a.slidesPerView === "auto" &&
      a.slidesPerGroup === 1 &&
      a.slidesPerGroupAuto &&
      (s = Math.max(r.slidesPerViewDynamic("current", !0), 1));
    const l = r.activeIndex < a.slidesPerGroupSkip ? 1 : s,
      u = r.virtual && a.virtual.enabled;
    if (a.loop) {
      if (o && !u && a.loopPreventsSliding) return !1;
      (r.loopFix({ direction: "next" }),
        (r._clientLeft = r.wrapperEl.clientLeft));
    }
    return a.rewind && r.isEnd
      ? r.slideTo(0, e, t, n)
      : r.slideTo(r.activeIndex + l, e, t, n);
  }
  function Ib(e = this.params.speed, t = !0, n) {
    const r = this,
      {
        params: i,
        snapGrid: a,
        slidesGrid: o,
        rtlTranslate: s,
        enabled: l,
        animating: u,
      } = r;
    if (!l) return r;
    const c = r.virtual && i.virtual.enabled;
    if (i.loop) {
      if (u && !c && i.loopPreventsSliding) return !1;
      (r.loopFix({ direction: "prev" }),
        (r._clientLeft = r.wrapperEl.clientLeft));
    }
    const f = s ? r.translate : -r.translate;
    function d(p) {
      return p < 0 ? -Math.floor(Math.abs(p)) : Math.floor(p);
    }
    const h = d(f),
      v = a.map((p) => d(p));
    let y = a[v.indexOf(h) - 1];
    if (typeof y > "u" && i.cssMode) {
      let p;
      (a.forEach((m, g) => {
        h >= m && (p = g);
      }),
        typeof p < "u" && (y = a[p > 0 ? p - 1 : p]));
    }
    let S = 0;
    if (
      (typeof y < "u" &&
        ((S = o.indexOf(y)),
        S < 0 && (S = r.activeIndex - 1),
        i.slidesPerView === "auto" &&
          i.slidesPerGroup === 1 &&
          i.slidesPerGroupAuto &&
          ((S = S - r.slidesPerViewDynamic("previous", !0) + 1),
          (S = Math.max(S, 0)))),
      i.rewind && r.isBeginning)
    ) {
      const p =
        r.params.virtual && r.params.virtual.enabled && r.virtual
          ? r.virtual.slides.length - 1
          : r.slides.length - 1;
      return r.slideTo(p, e, t, n);
    }
    return r.slideTo(S, e, t, n);
  }
  function Db(e = this.params.speed, t = !0, n) {
    const r = this;
    return r.slideTo(r.activeIndex, e, t, n);
  }
  function Mb(e = this.params.speed, t = !0, n, r = 0.5) {
    const i = this;
    let a = i.activeIndex;
    const o = Math.min(i.params.slidesPerGroupSkip, a),
      s = o + Math.floor((a - o) / i.params.slidesPerGroup),
      l = i.rtlTranslate ? i.translate : -i.translate;
    if (l >= i.snapGrid[s]) {
      const u = i.snapGrid[s],
        c = i.snapGrid[s + 1];
      l - u > (c - u) * r && (a += i.params.slidesPerGroup);
    } else {
      const u = i.snapGrid[s - 1],
        c = i.snapGrid[s];
      l - u <= (c - u) * r && (a -= i.params.slidesPerGroup);
    }
    return (
      (a = Math.max(a, 0)),
      (a = Math.min(a, i.slidesGrid.length - 1)),
      i.slideTo(a, e, t, n)
    );
  }
  function Rb() {
    const e = this,
      { params: t, slidesEl: n } = e,
      r =
        t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
    let i = e.clickedIndex,
      a;
    const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
    if (t.loop) {
      if (e.animating) return;
      ((a = parseInt(
        e.clickedSlide.getAttribute("data-swiper-slide-index"),
        10,
      )),
        t.centeredSlides
          ? i < e.loopedSlides - r / 2 ||
            i > e.slides.length - e.loopedSlides + r / 2
            ? (e.loopFix(),
              (i = e.getSlideIndex(
                Ct(n, `${o}[data-swiper-slide-index="${a}"]`)[0],
              )),
              Fu(() => {
                e.slideTo(i);
              }))
            : e.slideTo(i)
          : i > e.slides.length - r
            ? (e.loopFix(),
              (i = e.getSlideIndex(
                Ct(n, `${o}[data-swiper-slide-index="${a}"]`)[0],
              )),
              Fu(() => {
                e.slideTo(i);
              }))
            : e.slideTo(i));
    } else e.slideTo(i);
  }
  const Lb = {
    slideTo: Ob,
    slideToLoop: Nb,
    slideNext: Pb,
    slidePrev: Ib,
    slideReset: Db,
    slideToClosest: Mb,
    slideToClickedSlide: Rb,
  };
  function Fb(e) {
    const t = this,
      { params: n, slidesEl: r } = t;
    if (!n.loop || (t.virtual && t.params.virtual.enabled)) return;
    (Ct(r, `.${n.slideClass}, swiper-slide`).forEach((a, o) => {
      a.setAttribute("data-swiper-slide-index", o);
    }),
      t.loopFix({
        slideRealIndex: e,
        direction: n.centeredSlides ? void 0 : "next",
      }));
  }
  function Ab({
    slideRealIndex: e,
    slideTo: t = !0,
    direction: n,
    setTranslate: r,
    activeSlideIndex: i,
    byController: a,
    byMousewheel: o,
  } = {}) {
    const s = this;
    if (!s.params.loop) return;
    s.emit("beforeLoopFix");
    const {
      slides: l,
      allowSlidePrev: u,
      allowSlideNext: c,
      slidesEl: f,
      params: d,
    } = s;
    if (
      ((s.allowSlidePrev = !0),
      (s.allowSlideNext = !0),
      s.virtual && d.virtual.enabled)
    ) {
      (t &&
        (!d.centeredSlides && s.snapIndex === 0
          ? s.slideTo(s.virtual.slides.length, 0, !1, !0)
          : d.centeredSlides && s.snapIndex < d.slidesPerView
            ? s.slideTo(s.virtual.slides.length + s.snapIndex, 0, !1, !0)
            : s.snapIndex === s.snapGrid.length - 1 &&
              s.slideTo(s.virtual.slidesBefore, 0, !1, !0)),
        (s.allowSlidePrev = u),
        (s.allowSlideNext = c),
        s.emit("loopFix"));
      return;
    }
    const h =
      d.slidesPerView === "auto"
        ? s.slidesPerViewDynamic()
        : Math.ceil(parseFloat(d.slidesPerView, 10));
    let v = d.loopedSlides || h;
    (v % d.slidesPerGroup !== 0 &&
      (v += d.slidesPerGroup - (v % d.slidesPerGroup)),
      (s.loopedSlides = v));
    const y = [],
      S = [];
    let p = s.activeIndex;
    typeof i > "u"
      ? (i = s.getSlideIndex(
          s.slides.filter((b) => b.classList.contains(d.slideActiveClass))[0],
        ))
      : (p = i);
    const m = n === "next" || !n,
      g = n === "prev" || !n;
    let E = 0,
      x = 0;
    if (i < v) {
      E = Math.max(v - i, d.slidesPerGroup);
      for (let b = 0; b < v - i; b += 1) {
        const k = b - Math.floor(b / l.length) * l.length;
        y.push(l.length - k - 1);
      }
    } else if (i > s.slides.length - v * 2) {
      x = Math.max(i - (s.slides.length - v * 2), d.slidesPerGroup);
      for (let b = 0; b < x; b += 1) {
        const k = b - Math.floor(b / l.length) * l.length;
        S.push(k);
      }
    }
    if (
      (g &&
        y.forEach((b) => {
          ((s.slides[b].swiperLoopMoveDOM = !0),
            f.prepend(s.slides[b]),
            (s.slides[b].swiperLoopMoveDOM = !1));
        }),
      m &&
        S.forEach((b) => {
          ((s.slides[b].swiperLoopMoveDOM = !0),
            f.append(s.slides[b]),
            (s.slides[b].swiperLoopMoveDOM = !1));
        }),
      s.recalcSlides(),
      d.slidesPerView === "auto" && s.updateSlides(),
      d.watchSlidesProgress && s.updateSlidesOffset(),
      t)
    ) {
      if (y.length > 0 && g)
        if (typeof e > "u") {
          const b = s.slidesGrid[p],
            T = s.slidesGrid[p + E] - b;
          o
            ? s.setTranslate(s.translate - T)
            : (s.slideTo(p + E, 0, !1, !0),
              r && (s.touches[s.isHorizontal() ? "startX" : "startY"] += T));
        } else r && s.slideToLoop(e, 0, !1, !0);
      else if (S.length > 0 && m)
        if (typeof e > "u") {
          const b = s.slidesGrid[p],
            T = s.slidesGrid[p - x] - b;
          o
            ? s.setTranslate(s.translate - T)
            : (s.slideTo(p - x, 0, !1, !0),
              r && (s.touches[s.isHorizontal() ? "startX" : "startY"] += T));
        } else s.slideToLoop(e, 0, !1, !0);
    }
    if (
      ((s.allowSlidePrev = u),
      (s.allowSlideNext = c),
      s.controller && s.controller.control && !a)
    ) {
      const b = {
        slideRealIndex: e,
        slideTo: !1,
        direction: n,
        setTranslate: r,
        activeSlideIndex: i,
        byController: !0,
      };
      Array.isArray(s.controller.control)
        ? s.controller.control.forEach((k) => {
            !k.destroyed && k.params.loop && k.loopFix(b);
          })
        : s.controller.control instanceof s.constructor &&
          s.controller.control.params.loop &&
          s.controller.control.loopFix(b);
    }
    s.emit("loopFix");
  }
  function zb() {
    const e = this,
      { params: t, slidesEl: n } = e;
    if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
    e.recalcSlides();
    const r = [];
    (e.slides.forEach((i) => {
      const a =
        typeof i.swiperSlideIndex > "u"
          ? i.getAttribute("data-swiper-slide-index") * 1
          : i.swiperSlideIndex;
      r[a] = i;
    }),
      e.slides.forEach((i) => {
        i.removeAttribute("data-swiper-slide-index");
      }),
      r.forEach((i) => {
        n.append(i);
      }),
      e.recalcSlides(),
      e.slideTo(e.realIndex, 0));
  }
  const jb = { loopCreate: Fb, loopFix: Ab, loopDestroy: zb };
  function Vb(e) {
    const t = this;
    if (
      !t.params.simulateTouch ||
      (t.params.watchOverflow && t.isLocked) ||
      t.params.cssMode
    )
      return;
    const n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
    (t.isElement && (t.__preventObserver__ = !0),
      (n.style.cursor = "move"),
      (n.style.cursor = e ? "grabbing" : "grab"),
      t.isElement &&
        requestAnimationFrame(() => {
          t.__preventObserver__ = !1;
        }));
  }
  function Bb() {
    const e = this;
    (e.params.watchOverflow && e.isLocked) ||
      e.params.cssMode ||
      (e.isElement && (e.__preventObserver__ = !0),
      (e[
        e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
      ].style.cursor = ""),
      e.isElement &&
        requestAnimationFrame(() => {
          e.__preventObserver__ = !1;
        }));
  }
  const Ub = { setGrabCursor: Vb, unsetGrabCursor: Bb };
  function Qb(e, t = this) {
    function n(r) {
      if (!r || r === Pt() || r === tt()) return null;
      r.assignedSlot && (r = r.assignedSlot);
      const i = r.closest(e);
      return !i && !r.getRootNode ? null : i || n(r.getRootNode().host);
    }
    return n(t);
  }
  function $b(e) {
    const t = this,
      n = Pt(),
      r = tt(),
      i = t.touchEventsData;
    i.evCache.push(e);
    const { params: a, touches: o, enabled: s } = t;
    if (
      !s ||
      (!a.simulateTouch && e.pointerType === "mouse") ||
      (t.animating && a.preventInteractionOnTransition)
    )
      return;
    !t.animating && a.cssMode && a.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let u = l.target;
    if (
      (a.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(u)) ||
      ("which" in l && l.which === 3) ||
      ("button" in l && l.button > 0) ||
      (i.isTouched && i.isMoved)
    )
      return;
    const c = !!a.noSwipingClass && a.noSwipingClass !== "",
      f = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && f && (u = f[0]);
    const d = a.noSwipingSelector
        ? a.noSwipingSelector
        : `.${a.noSwipingClass}`,
      h = !!(l.target && l.target.shadowRoot);
    if (a.noSwiping && (h ? Qb(d, u) : u.closest(d))) {
      t.allowClick = !0;
      return;
    }
    if (a.swipeHandler && !u.closest(a.swipeHandler)) return;
    ((o.currentX = l.pageX), (o.currentY = l.pageY));
    const v = o.currentX,
      y = o.currentY,
      S = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
      p = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
    if (S && (v <= p || v >= r.innerWidth - p))
      if (S === "prevent") e.preventDefault();
      else return;
    (Object.assign(i, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (o.startX = v),
      (o.startY = y),
      (i.touchStartTime = Uo()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      a.threshold > 0 && (i.allowThresholdMove = !1));
    let m = !0;
    (u.matches(i.focusableElements) &&
      ((m = !1), u.nodeName === "SELECT" && (i.isTouched = !1)),
      n.activeElement &&
        n.activeElement.matches(i.focusableElements) &&
        n.activeElement !== u &&
        n.activeElement.blur());
    const g = m && t.allowTouchMove && a.touchStartPreventDefault;
    ((a.touchStartForcePreventDefault || g) &&
      !u.isContentEditable &&
      l.preventDefault(),
      a.freeMode &&
        a.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !a.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l));
  }
  function qb(e) {
    const t = Pt(),
      n = this,
      r = n.touchEventsData,
      { params: i, touches: a, rtlTranslate: o, enabled: s } = n;
    if (!s || (!i.simulateTouch && e.pointerType === "mouse")) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !r.isTouched)) {
      r.startMoving && r.isScrolling && n.emit("touchMoveOpposite", l);
      return;
    }
    const u = r.evCache.findIndex((b) => b.pointerId === l.pointerId);
    u >= 0 && (r.evCache[u] = l);
    const c = r.evCache.length > 1 ? r.evCache[0] : l,
      f = c.pageX,
      d = c.pageY;
    if (l.preventedByNestedSwiper) {
      ((a.startX = f), (a.startY = d));
      return;
    }
    if (!n.allowTouchMove) {
      (l.target.matches(r.focusableElements) || (n.allowClick = !1),
        r.isTouched &&
          (Object.assign(a, {
            startX: f,
            startY: d,
            prevX: n.touches.currentX,
            prevY: n.touches.currentY,
            currentX: f,
            currentY: d,
          }),
          (r.touchStartTime = Uo())));
      return;
    }
    if (i.touchReleaseOnEdges && !i.loop) {
      if (n.isVertical()) {
        if (
          (d < a.startY && n.translate <= n.maxTranslate()) ||
          (d > a.startY && n.translate >= n.minTranslate())
        ) {
          ((r.isTouched = !1), (r.isMoved = !1));
          return;
        }
      } else if (
        (f < a.startX && n.translate <= n.maxTranslate()) ||
        (f > a.startX && n.translate >= n.minTranslate())
      )
        return;
    }
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(r.focusableElements)
    ) {
      ((r.isMoved = !0), (n.allowClick = !1));
      return;
    }
    if (
      (r.allowTouchCallbacks && n.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    ((a.currentX = f), (a.currentY = d));
    const h = a.currentX - a.startX,
      v = a.currentY - a.startY;
    if (n.params.threshold && Math.sqrt(h ** 2 + v ** 2) < n.params.threshold)
      return;
    if (typeof r.isScrolling > "u") {
      let b;
      (n.isHorizontal() && a.currentY === a.startY) ||
      (n.isVertical() && a.currentX === a.startX)
        ? (r.isScrolling = !1)
        : h * h + v * v >= 25 &&
          ((b = (Math.atan2(Math.abs(v), Math.abs(h)) * 180) / Math.PI),
          (r.isScrolling = n.isHorizontal()
            ? b > i.touchAngle
            : 90 - b > i.touchAngle));
    }
    if (
      (r.isScrolling && n.emit("touchMoveOpposite", l),
      typeof r.startMoving > "u" &&
        (a.currentX !== a.startX || a.currentY !== a.startY) &&
        (r.startMoving = !0),
      r.isScrolling ||
        (n.zoom &&
          n.params.zoom &&
          n.params.zoom.enabled &&
          r.evCache.length > 1))
    ) {
      r.isTouched = !1;
      return;
    }
    if (!r.startMoving) return;
    ((n.allowClick = !1),
      !i.cssMode && l.cancelable && l.preventDefault(),
      i.touchMoveStopPropagation && !i.nested && l.stopPropagation());
    let y = n.isHorizontal() ? h : v,
      S = n.isHorizontal()
        ? a.currentX - a.previousX
        : a.currentY - a.previousY;
    (i.oneWayMovement &&
      ((y = Math.abs(y) * (o ? 1 : -1)), (S = Math.abs(S) * (o ? 1 : -1))),
      (a.diff = y),
      (y *= i.touchRatio),
      o && ((y = -y), (S = -S)));
    const p = n.touchesDirection;
    ((n.swipeDirection = y > 0 ? "prev" : "next"),
      (n.touchesDirection = S > 0 ? "prev" : "next"));
    const m = n.params.loop && !i.cssMode;
    if (!r.isMoved) {
      if (
        (m && n.loopFix({ direction: n.swipeDirection }),
        (r.startTranslate = n.getTranslate()),
        n.setTransition(0),
        n.animating)
      ) {
        const b = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        n.wrapperEl.dispatchEvent(b);
      }
      ((r.allowMomentumBounce = !1),
        i.grabCursor &&
          (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
          n.setGrabCursor(!0),
        n.emit("sliderFirstMove", l));
    }
    let g;
    (r.isMoved &&
      p !== n.touchesDirection &&
      m &&
      Math.abs(y) >= 1 &&
      (n.loopFix({ direction: n.swipeDirection, setTranslate: !0 }), (g = !0)),
      n.emit("sliderMove", l),
      (r.isMoved = !0),
      (r.currentTranslate = y + r.startTranslate));
    let E = !0,
      x = i.resistanceRatio;
    if (
      (i.touchReleaseOnEdges && (x = 0),
      y > 0
        ? (m &&
            !g &&
            r.currentTranslate >
              (i.centeredSlides
                ? n.minTranslate() - n.size / 2
                : n.minTranslate()) &&
            n.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          r.currentTranslate > n.minTranslate() &&
            ((E = !1),
            i.resistance &&
              (r.currentTranslate =
                n.minTranslate() -
                1 +
                (-n.minTranslate() + r.startTranslate + y) ** x)))
        : y < 0 &&
          (m &&
            !g &&
            r.currentTranslate <
              (i.centeredSlides
                ? n.maxTranslate() + n.size / 2
                : n.maxTranslate()) &&
            n.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                n.slides.length -
                (i.slidesPerView === "auto"
                  ? n.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(i.slidesPerView, 10))),
            }),
          r.currentTranslate < n.maxTranslate() &&
            ((E = !1),
            i.resistance &&
              (r.currentTranslate =
                n.maxTranslate() +
                1 -
                (n.maxTranslate() - r.startTranslate - y) ** x))),
      E && (l.preventedByNestedSwiper = !0),
      !n.allowSlideNext &&
        n.swipeDirection === "next" &&
        r.currentTranslate < r.startTranslate &&
        (r.currentTranslate = r.startTranslate),
      !n.allowSlidePrev &&
        n.swipeDirection === "prev" &&
        r.currentTranslate > r.startTranslate &&
        (r.currentTranslate = r.startTranslate),
      !n.allowSlidePrev &&
        !n.allowSlideNext &&
        (r.currentTranslate = r.startTranslate),
      i.threshold > 0)
    )
      if (Math.abs(y) > i.threshold || r.allowThresholdMove) {
        if (!r.allowThresholdMove) {
          ((r.allowThresholdMove = !0),
            (a.startX = a.currentX),
            (a.startY = a.currentY),
            (r.currentTranslate = r.startTranslate),
            (a.diff = n.isHorizontal()
              ? a.currentX - a.startX
              : a.currentY - a.startY));
          return;
        }
      } else {
        r.currentTranslate = r.startTranslate;
        return;
      }
    !i.followFinger ||
      i.cssMode ||
      (((i.freeMode && i.freeMode.enabled && n.freeMode) ||
        i.watchSlidesProgress) &&
        (n.updateActiveIndex(), n.updateSlidesClasses()),
      i.freeMode &&
        i.freeMode.enabled &&
        n.freeMode &&
        n.freeMode.onTouchMove(),
      n.updateProgress(r.currentTranslate),
      n.setTranslate(r.currentTranslate));
  }
  function Wb(e) {
    const t = this,
      n = t.touchEventsData,
      r = n.evCache.findIndex((g) => g.pointerId === e.pointerId);
    if (
      (r >= 0 && n.evCache.splice(r, 1),
      ["pointercancel", "pointerout", "pointerleave"].includes(e.type) &&
        !(
          e.type === "pointercancel" &&
          (t.browser.isSafari || t.browser.isWebView)
        ))
    )
      return;
    const {
      params: i,
      touches: a,
      rtlTranslate: o,
      slidesGrid: s,
      enabled: l,
    } = t;
    if (!l || (!i.simulateTouch && e.pointerType === "mouse")) return;
    let u = e;
    if (
      (u.originalEvent && (u = u.originalEvent),
      n.allowTouchCallbacks && t.emit("touchEnd", u),
      (n.allowTouchCallbacks = !1),
      !n.isTouched)
    ) {
      (n.isMoved && i.grabCursor && t.setGrabCursor(!1),
        (n.isMoved = !1),
        (n.startMoving = !1));
      return;
    }
    i.grabCursor &&
      n.isMoved &&
      n.isTouched &&
      (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
      t.setGrabCursor(!1);
    const c = Uo(),
      f = c - n.touchStartTime;
    if (t.allowClick) {
      const g = u.path || (u.composedPath && u.composedPath());
      (t.updateClickedSlide((g && g[0]) || u.target),
        t.emit("tap click", u),
        f < 300 &&
          c - n.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", u));
    }
    if (
      ((n.lastClickTime = Uo()),
      Fu(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !n.isTouched ||
        !n.isMoved ||
        !t.swipeDirection ||
        a.diff === 0 ||
        n.currentTranslate === n.startTranslate)
    ) {
      ((n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1));
      return;
    }
    ((n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1));
    let d;
    if (
      (i.followFinger
        ? (d = o ? t.translate : -t.translate)
        : (d = -n.currentTranslate),
      i.cssMode)
    )
      return;
    if (i.freeMode && i.freeMode.enabled) {
      t.freeMode.onTouchEnd({ currentPos: d });
      return;
    }
    let h = 0,
      v = t.slidesSizesGrid[0];
    for (
      let g = 0;
      g < s.length;
      g += g < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
    ) {
      const E = g < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
      typeof s[g + E] < "u"
        ? d >= s[g] && d < s[g + E] && ((h = g), (v = s[g + E] - s[g]))
        : d >= s[g] && ((h = g), (v = s[s.length - 1] - s[s.length - 2]));
    }
    let y = null,
      S = null;
    i.rewind &&
      (t.isBeginning
        ? (S =
            i.virtual && i.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (y = 0));
    const p = (d - s[h]) / v,
      m = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (f > i.longSwipesMs) {
      if (!i.longSwipes) {
        t.slideTo(t.activeIndex);
        return;
      }
      (t.swipeDirection === "next" &&
        (p >= i.longSwipesRatio
          ? t.slideTo(i.rewind && t.isEnd ? y : h + m)
          : t.slideTo(h)),
        t.swipeDirection === "prev" &&
          (p > 1 - i.longSwipesRatio
            ? t.slideTo(h + m)
            : S !== null && p < 0 && Math.abs(p) > i.longSwipesRatio
              ? t.slideTo(S)
              : t.slideTo(h)));
    } else {
      if (!i.shortSwipes) {
        t.slideTo(t.activeIndex);
        return;
      }
      t.navigation &&
      (u.target === t.navigation.nextEl || u.target === t.navigation.prevEl)
        ? u.target === t.navigation.nextEl
          ? t.slideTo(h + m)
          : t.slideTo(h)
        : (t.swipeDirection === "next" && t.slideTo(y !== null ? y : h + m),
          t.swipeDirection === "prev" && t.slideTo(S !== null ? S : h));
    }
  }
  function zp() {
    const e = this,
      { params: t, el: n } = e;
    if (n && n.offsetWidth === 0) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: r, allowSlidePrev: i, snapGrid: a } = e,
      o = e.virtual && e.params.virtual.enabled;
    ((e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses());
    const s = o && t.loop;
    ((t.slidesPerView === "auto" || t.slidesPerView > 1) &&
    e.isEnd &&
    !e.isBeginning &&
    !e.params.centeredSlides &&
    !s
      ? e.slideTo(e.slides.length - 1, 0, !1, !0)
      : e.params.loop && !o
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = r),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow());
  }
  function Hb(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function Gb() {
    const e = this,
      { wrapperEl: t, rtlTranslate: n, enabled: r } = e;
    if (!r) return;
    ((e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      e.translate === 0 && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
    let i;
    const a = e.maxTranslate() - e.minTranslate();
    (a === 0 ? (i = 0) : (i = (e.translate - e.minTranslate()) / a),
      i !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1));
  }
  function Yb(e) {
    const t = this;
    (so(t, e.target),
      !(
        t.params.cssMode ||
        (t.params.slidesPerView !== "auto" && !t.params.autoHeight)
      ) && t.update());
  }
  let jp = !1;
  function Xb() {}
  const Hg = (e, t) => {
    const n = Pt(),
      { params: r, el: i, wrapperEl: a, device: o } = e,
      s = !!r.nested,
      l = t === "on" ? "addEventListener" : "removeEventListener",
      u = t;
    (i[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      n[l]("pointermove", e.onTouchMove, { passive: !1, capture: s }),
      n[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      n[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      n[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      n[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      (r.preventClicks || r.preventClicksPropagation) &&
        i[l]("click", e.onClick, !0),
      r.cssMode && a[l]("scroll", e.onScroll),
      r.updateOnWindowResize
        ? e[u](
            o.ios || o.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            zp,
            !0,
          )
        : e[u]("observerUpdate", zp, !0),
      i[l]("load", e.onLoad, { capture: !0 }));
  };
  function Kb() {
    const e = this,
      t = Pt(),
      { params: n } = e;
    ((e.onTouchStart = $b.bind(e)),
      (e.onTouchMove = qb.bind(e)),
      (e.onTouchEnd = Wb.bind(e)),
      n.cssMode && (e.onScroll = Gb.bind(e)),
      (e.onClick = Hb.bind(e)),
      (e.onLoad = Yb.bind(e)),
      jp || (t.addEventListener("touchstart", Xb), (jp = !0)),
      Hg(e, "on"));
  }
  function Jb() {
    Hg(this, "off");
  }
  const Zb = { attachEvents: Kb, detachEvents: Jb },
    Vp = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  function e_() {
    const e = this,
      { realIndex: t, initialized: n, params: r, el: i } = e,
      a = r.breakpoints;
    if (!a || (a && Object.keys(a).length === 0)) return;
    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
    if (!o || e.currentBreakpoint === o) return;
    const l = (o in a ? a[o] : void 0) || e.originalParams,
      u = Vp(e, r),
      c = Vp(e, l),
      f = r.enabled;
    (u && !c
      ? (i.classList.remove(
          `${r.containerModifierClass}grid`,
          `${r.containerModifierClass}grid-column`,
        ),
        e.emitContainerClasses())
      : !u &&
        c &&
        (i.classList.add(`${r.containerModifierClass}grid`),
        ((l.grid.fill && l.grid.fill === "column") ||
          (!l.grid.fill && r.grid.fill === "column")) &&
          i.classList.add(`${r.containerModifierClass}grid-column`),
        e.emitContainerClasses()),
      ["navigation", "pagination", "scrollbar"].forEach((y) => {
        if (typeof l[y] > "u") return;
        const S = r[y] && r[y].enabled,
          p = l[y] && l[y].enabled;
        (S && !p && e[y].disable(), !S && p && e[y].enable());
      }));
    const d = l.direction && l.direction !== r.direction,
      h = r.loop && (l.slidesPerView !== r.slidesPerView || d);
    (d && n && e.changeDirection(), Ye(e.params, l));
    const v = e.params.enabled;
    (Object.assign(e, {
      allowTouchMove: e.params.allowTouchMove,
      allowSlideNext: e.params.allowSlideNext,
      allowSlidePrev: e.params.allowSlidePrev,
    }),
      f && !v ? e.disable() : !f && v && e.enable(),
      (e.currentBreakpoint = o),
      e.emit("_beforeBreakpoint", l),
      h && n && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
      e.emit("breakpoint", l));
  }
  function t_(e, t = "window", n) {
    if (!e || (t === "container" && !n)) return;
    let r = !1;
    const i = tt(),
      a = t === "window" ? i.innerHeight : n.clientHeight,
      o = Object.keys(e).map((s) => {
        if (typeof s == "string" && s.indexOf("@") === 0) {
          const l = parseFloat(s.substr(1));
          return { value: a * l, point: s };
        }
        return { value: s, point: s };
      });
    o.sort((s, l) => parseInt(s.value, 10) - parseInt(l.value, 10));
    for (let s = 0; s < o.length; s += 1) {
      const { point: l, value: u } = o[s];
      t === "window"
        ? i.matchMedia(`(min-width: ${u}px)`).matches && (r = l)
        : u <= n.clientWidth && (r = l);
    }
    return r || "max";
  }
  const n_ = { setBreakpoint: e_, getBreakpoint: t_ };
  function r_(e, t) {
    const n = [];
    return (
      e.forEach((r) => {
        typeof r == "object"
          ? Object.keys(r).forEach((i) => {
              r[i] && n.push(t + i);
            })
          : typeof r == "string" && n.push(t + r);
      }),
      n
    );
  }
  function i_() {
    const e = this,
      { classNames: t, params: n, rtl: r, el: i, device: a } = e,
      o = r_(
        [
          "initialized",
          n.direction,
          { "free-mode": e.params.freeMode && n.freeMode.enabled },
          { autoheight: n.autoHeight },
          { rtl: r },
          { grid: n.grid && n.grid.rows > 1 },
          {
            "grid-column":
              n.grid && n.grid.rows > 1 && n.grid.fill === "column",
          },
          { android: a.android },
          { ios: a.ios },
          { "css-mode": n.cssMode },
          { centered: n.cssMode && n.centeredSlides },
          { "watch-progress": n.watchSlidesProgress },
        ],
        n.containerModifierClass,
      );
    (t.push(...o), i.classList.add(...t), e.emitContainerClasses());
  }
  function a_() {
    const e = this,
      { el: t, classNames: n } = e;
    (t.classList.remove(...n), e.emitContainerClasses());
  }
  const o_ = { addClasses: i_, removeClasses: a_ };
  function s_() {
    const e = this,
      { isLocked: t, params: n } = e,
      { slidesOffsetBefore: r } = n;
    if (r) {
      const i = e.slides.length - 1,
        a = e.slidesGrid[i] + e.slidesSizesGrid[i] + r * 2;
      e.isLocked = e.size > a;
    } else e.isLocked = e.snapGrid.length === 1;
    (n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
      n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
      t && t !== e.isLocked && (e.isEnd = !1),
      t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"));
  }
  const l_ = { checkOverflow: s_ },
    Bp = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopedSlides: null,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
  function u_(e, t) {
    return function (r = {}) {
      const i = Object.keys(r)[0],
        a = r[i];
      if (typeof a != "object" || a === null) {
        Ye(t, r);
        return;
      }
      if (
        (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
          e[i] === !0 &&
          (e[i] = { auto: !0 }),
        !(i in e && "enabled" in a))
      ) {
        Ye(t, r);
        return;
      }
      (e[i] === !0 && (e[i] = { enabled: !0 }),
        typeof e[i] == "object" && !("enabled" in e[i]) && (e[i].enabled = !0),
        e[i] || (e[i] = { enabled: !1 }),
        Ye(t, r));
    };
  }
  const pl = {
      eventsEmitter: ob,
      update: gb,
      translate: bb,
      transition: Cb,
      slide: Lb,
      loop: jb,
      grabCursor: Ub,
      events: Zb,
      breakpoints: n_,
      checkOverflow: l_,
      classes: o_,
    },
    hl = {};
  let aa = class Mt {
    constructor(...t) {
      let n, r;
      (t.length === 1 &&
      t[0].constructor &&
      Object.prototype.toString.call(t[0]).slice(8, -1) === "Object"
        ? (r = t[0])
        : ([n, r] = t),
        r || (r = {}),
        (r = Ye({}, r)),
        n && !r.el && (r.el = n));
      const i = Pt();
      if (
        r.el &&
        typeof r.el == "string" &&
        i.querySelectorAll(r.el).length > 1
      ) {
        const l = [];
        return (
          i.querySelectorAll(r.el).forEach((u) => {
            const c = Ye({}, r, { el: u });
            l.push(new Mt(c));
          }),
          l
        );
      }
      const a = this;
      ((a.__swiper__ = !0),
        (a.support = qg()),
        (a.device = tb({ userAgent: r.userAgent })),
        (a.browser = rb()),
        (a.eventsListeners = {}),
        (a.eventsAnyListeners = []),
        (a.modules = [...a.__modules__]),
        r.modules && Array.isArray(r.modules) && a.modules.push(...r.modules));
      const o = {};
      a.modules.forEach((l) => {
        l({
          params: r,
          swiper: a,
          extendParams: u_(r, o),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a),
        });
      });
      const s = Ye({}, Bp, o);
      return (
        (a.params = Ye({}, s, hl, r)),
        (a.originalParams = Ye({}, a.params)),
        (a.passedParams = Ye({}, r)),
        a.params &&
          a.params.on &&
          Object.keys(a.params.on).forEach((l) => {
            a.on(l, a.params.on[l]);
          }),
        a.params && a.params.onAny && a.onAny(a.params.onAny),
        Object.assign(a, {
          enabled: a.params.enabled,
          el: n,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal() {
            return a.params.direction === "horizontal";
          },
          isVertical() {
            return a.params.direction === "vertical";
          },
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: a.params.allowSlideNext,
          allowSlidePrev: a.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: a.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: a.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        a.emit("_swiper"),
        a.params.init && a.init(),
        a
      );
    }
    getSlideIndex(t) {
      const { slidesEl: n, params: r } = this,
        i = Ct(n, `.${r.slideClass}, swiper-slide`),
        a = Fp(i[0]);
      return Fp(t) - a;
    }
    getSlideIndexByData(t) {
      return this.getSlideIndex(
        this.slides.filter(
          (n) => n.getAttribute("data-swiper-slide-index") * 1 === t,
        )[0],
      );
    }
    recalcSlides() {
      const t = this,
        { slidesEl: n, params: r } = t;
      t.slides = Ct(n, `.${r.slideClass}, swiper-slide`);
    }
    enable() {
      const t = this;
      t.enabled ||
        ((t.enabled = !0),
        t.params.grabCursor && t.setGrabCursor(),
        t.emit("enable"));
    }
    disable() {
      const t = this;
      t.enabled &&
        ((t.enabled = !1),
        t.params.grabCursor && t.unsetGrabCursor(),
        t.emit("disable"));
    }
    setProgress(t, n) {
      const r = this;
      t = Math.min(Math.max(t, 0), 1);
      const i = r.minTranslate(),
        o = (r.maxTranslate() - i) * t + i;
      (r.translateTo(o, typeof n > "u" ? 0 : n),
        r.updateActiveIndex(),
        r.updateSlidesClasses());
    }
    emitContainerClasses() {
      const t = this;
      if (!t.params._emitClasses || !t.el) return;
      const n = t.el.className
        .split(" ")
        .filter(
          (r) =>
            r.indexOf("swiper") === 0 ||
            r.indexOf(t.params.containerModifierClass) === 0,
        );
      t.emit("_containerClasses", n.join(" "));
    }
    getSlideClasses(t) {
      const n = this;
      return n.destroyed
        ? ""
        : t.className
            .split(" ")
            .filter(
              (r) =>
                r.indexOf("swiper-slide") === 0 ||
                r.indexOf(n.params.slideClass) === 0,
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const t = this;
      if (!t.params._emitClasses || !t.el) return;
      const n = [];
      (t.slides.forEach((r) => {
        const i = t.getSlideClasses(r);
        (n.push({ slideEl: r, classNames: i }), t.emit("_slideClass", r, i));
      }),
        t.emit("_slideClasses", n));
    }
    slidesPerViewDynamic(t = "current", n = !1) {
      const r = this,
        {
          params: i,
          slides: a,
          slidesGrid: o,
          slidesSizesGrid: s,
          size: l,
          activeIndex: u,
        } = r;
      let c = 1;
      if (i.centeredSlides) {
        let f = a[u] ? a[u].swiperSlideSize : 0,
          d;
        for (let h = u + 1; h < a.length; h += 1)
          a[h] &&
            !d &&
            ((f += a[h].swiperSlideSize), (c += 1), f > l && (d = !0));
        for (let h = u - 1; h >= 0; h -= 1)
          a[h] &&
            !d &&
            ((f += a[h].swiperSlideSize), (c += 1), f > l && (d = !0));
      } else if (t === "current")
        for (let f = u + 1; f < a.length; f += 1)
          (n ? o[f] + s[f] - o[u] < l : o[f] - o[u] < l) && (c += 1);
      else for (let f = u - 1; f >= 0; f -= 1) o[u] - o[f] < l && (c += 1);
      return c;
    }
    update() {
      const t = this;
      if (!t || t.destroyed) return;
      const { snapGrid: n, params: r } = t;
      (r.breakpoints && t.setBreakpoint(),
        [...t.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
          o.complete && so(t, o);
        }),
        t.updateSize(),
        t.updateSlides(),
        t.updateProgress(),
        t.updateSlidesClasses());
      function i() {
        const o = t.rtlTranslate ? t.translate * -1 : t.translate,
          s = Math.min(Math.max(o, t.maxTranslate()), t.minTranslate());
        (t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses());
      }
      let a;
      if (r.freeMode && r.freeMode.enabled && !r.cssMode)
        (i(), r.autoHeight && t.updateAutoHeight());
      else {
        if (
          (r.slidesPerView === "auto" || r.slidesPerView > 1) &&
          t.isEnd &&
          !r.centeredSlides
        ) {
          const o =
            t.virtual && r.virtual.enabled ? t.virtual.slides : t.slides;
          a = t.slideTo(o.length - 1, 0, !1, !0);
        } else a = t.slideTo(t.activeIndex, 0, !1, !0);
        a || i();
      }
      (r.watchOverflow && n !== t.snapGrid && t.checkOverflow(),
        t.emit("update"));
    }
    changeDirection(t, n = !0) {
      const r = this,
        i = r.params.direction;
      return (
        t || (t = i === "horizontal" ? "vertical" : "horizontal"),
        t === i ||
          (t !== "horizontal" && t !== "vertical") ||
          (r.el.classList.remove(`${r.params.containerModifierClass}${i}`),
          r.el.classList.add(`${r.params.containerModifierClass}${t}`),
          r.emitContainerClasses(),
          (r.params.direction = t),
          r.slides.forEach((a) => {
            t === "vertical" ? (a.style.width = "") : (a.style.height = "");
          }),
          r.emit("changeDirection"),
          n && r.update()),
        r
      );
    }
    changeLanguageDirection(t) {
      const n = this;
      (n.rtl && t === "rtl") ||
        (!n.rtl && t === "ltr") ||
        ((n.rtl = t === "rtl"),
        (n.rtlTranslate = n.params.direction === "horizontal" && n.rtl),
        n.rtl
          ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
            (n.el.dir = "rtl"))
          : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
            (n.el.dir = "ltr")),
        n.update());
    }
    mount(t) {
      const n = this;
      if (n.mounted) return !0;
      let r = t || n.params.el;
      if ((typeof r == "string" && (r = document.querySelector(r)), !r))
        return !1;
      ((r.swiper = n), r.shadowEl && (n.isElement = !0));
      const i = () =>
        `.${(n.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let o = (() =>
        r && r.shadowRoot && r.shadowRoot.querySelector
          ? r.shadowRoot.querySelector(i())
          : Ct(r, i())[0])();
      return (
        !o &&
          n.params.createElements &&
          ((o = $g("div", n.params.wrapperClass)),
          r.append(o),
          Ct(r, `.${n.params.slideClass}`).forEach((s) => {
            o.append(s);
          })),
        Object.assign(n, {
          el: r,
          wrapperEl: o,
          slidesEl: n.isElement ? r : o,
          mounted: !0,
          rtl: r.dir.toLowerCase() === "rtl" || ln(r, "direction") === "rtl",
          rtlTranslate:
            n.params.direction === "horizontal" &&
            (r.dir.toLowerCase() === "rtl" || ln(r, "direction") === "rtl"),
          wrongRTL: ln(o, "display") === "-webkit-box",
        }),
        !0
      );
    }
    init(t) {
      const n = this;
      return (
        n.initialized ||
          n.mount(t) === !1 ||
          (n.emit("beforeInit"),
          n.params.breakpoints && n.setBreakpoint(),
          n.addClasses(),
          n.updateSize(),
          n.updateSlides(),
          n.params.watchOverflow && n.checkOverflow(),
          n.params.grabCursor && n.enabled && n.setGrabCursor(),
          n.params.loop && n.virtual && n.params.virtual.enabled
            ? n.slideTo(
                n.params.initialSlide + n.virtual.slidesBefore,
                0,
                n.params.runCallbacksOnInit,
                !1,
                !0,
              )
            : n.slideTo(
                n.params.initialSlide,
                0,
                n.params.runCallbacksOnInit,
                !1,
                !0,
              ),
          n.params.loop && n.loopCreate(),
          n.attachEvents(),
          [...n.el.querySelectorAll('[loading="lazy"]')].forEach((i) => {
            i.complete
              ? so(n, i)
              : i.addEventListener("load", (a) => {
                  so(n, a.target);
                });
          }),
          Au(n),
          (n.initialized = !0),
          Au(n),
          n.emit("init"),
          n.emit("afterInit")),
        n
      );
    }
    destroy(t = !0, n = !0) {
      const r = this,
        { params: i, el: a, wrapperEl: o, slides: s } = r;
      return (
        typeof r.params > "u" ||
          r.destroyed ||
          (r.emit("beforeDestroy"),
          (r.initialized = !1),
          r.detachEvents(),
          i.loop && r.loopDestroy(),
          n &&
            (r.removeClasses(),
            a.removeAttribute("style"),
            o.removeAttribute("style"),
            s &&
              s.length &&
              s.forEach((l) => {
                (l.classList.remove(
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  l.removeAttribute("style"),
                  l.removeAttribute("data-swiper-slide-index"));
              })),
          r.emit("destroy"),
          Object.keys(r.eventsListeners).forEach((l) => {
            r.off(l);
          }),
          t !== !1 && ((r.el.swiper = null), Wx(r)),
          (r.destroyed = !0)),
        null
      );
    }
    static extendDefaults(t) {
      Ye(hl, t);
    }
    static get extendedDefaults() {
      return hl;
    }
    static get defaults() {
      return Bp;
    }
    static installModule(t) {
      Mt.prototype.__modules__ || (Mt.prototype.__modules__ = []);
      const n = Mt.prototype.__modules__;
      typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
    }
    static use(t) {
      return Array.isArray(t)
        ? (t.forEach((n) => Mt.installModule(n)), Mt)
        : (Mt.installModule(t), Mt);
    }
  };
  Object.keys(pl).forEach((e) => {
    Object.keys(pl[e]).forEach((t) => {
      aa.prototype[t] = pl[e][t];
    });
  });
  aa.use([ib, ab]);
  function c_(e, t, n, r) {
    return (
      e.params.createElements &&
        Object.keys(r).forEach((i) => {
          if (!n[i] && n.auto === !0) {
            let a = Ct(e.el, `.${r[i]}`)[0];
            (a || ((a = $g("div", r[i])), (a.className = r[i]), e.el.append(a)),
              (n[i] = a),
              (t[i] = a));
          }
        }),
      n
    );
  }
  function cf({ swiper: e, extendParams: t, on: n, emit: r }) {
    (t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (e.navigation = { nextEl: null, prevEl: null }));
    const i = (v) => (Array.isArray(v) || (v = [v].filter((y) => !!y)), v);
    function a(v) {
      let y;
      return v &&
        typeof v == "string" &&
        e.isElement &&
        ((y = e.el.shadowRoot.querySelector(v)), y)
        ? y
        : (v &&
            (typeof v == "string" && (y = [...document.querySelectorAll(v)]),
            e.params.uniqueNavElements &&
              typeof v == "string" &&
              y.length > 1 &&
              e.el.querySelectorAll(v).length === 1 &&
              (y = e.el.querySelector(v))),
          v && !y ? v : y);
    }
    function o(v, y) {
      const S = e.params.navigation;
      ((v = i(v)),
        v.forEach((p) => {
          p &&
            (p.classList[y ? "add" : "remove"](...S.disabledClass.split(" ")),
            p.tagName === "BUTTON" && (p.disabled = y),
            e.params.watchOverflow &&
              e.enabled &&
              p.classList[e.isLocked ? "add" : "remove"](S.lockClass));
        }));
    }
    function s() {
      const { nextEl: v, prevEl: y } = e.navigation;
      if (e.params.loop) {
        (o(y, !1), o(v, !1));
        return;
      }
      (o(y, e.isBeginning && !e.params.rewind),
        o(v, e.isEnd && !e.params.rewind));
    }
    function l(v) {
      (v.preventDefault(),
        !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
          (e.slidePrev(), r("navigationPrev")));
    }
    function u(v) {
      (v.preventDefault(),
        !(e.isEnd && !e.params.loop && !e.params.rewind) &&
          (e.slideNext(), r("navigationNext")));
    }
    function c() {
      const v = e.params.navigation;
      if (
        ((e.params.navigation = c_(
          e,
          e.originalParams.navigation,
          e.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
        )),
        !(v.nextEl || v.prevEl))
      )
        return;
      let y = a(v.nextEl),
        S = a(v.prevEl);
      (Object.assign(e.navigation, { nextEl: y, prevEl: S }),
        (y = i(y)),
        (S = i(S)));
      const p = (m, g) => {
        (m && m.addEventListener("click", g === "next" ? u : l),
          !e.enabled && m && m.classList.add(...v.lockClass.split(" ")));
      };
      (y.forEach((m) => p(m, "next")), S.forEach((m) => p(m, "prev")));
    }
    function f() {
      let { nextEl: v, prevEl: y } = e.navigation;
      ((v = i(v)), (y = i(y)));
      const S = (p, m) => {
        (p.removeEventListener("click", m === "next" ? u : l),
          p.classList.remove(...e.params.navigation.disabledClass.split(" ")));
      };
      (v.forEach((p) => S(p, "next")), y.forEach((p) => S(p, "prev")));
    }
    (n("init", () => {
      e.params.navigation.enabled === !1 ? h() : (c(), s());
    }),
      n("toEdge fromEdge lock unlock", () => {
        s();
      }),
      n("destroy", () => {
        f();
      }),
      n("enable disable", () => {
        let { nextEl: v, prevEl: y } = e.navigation;
        ((v = i(v)),
          (y = i(y)),
          [...v, ...y]
            .filter((S) => !!S)
            .forEach((S) =>
              S.classList[e.enabled ? "remove" : "add"](
                e.params.navigation.lockClass,
              ),
            ));
      }),
      n("click", (v, y) => {
        let { nextEl: S, prevEl: p } = e.navigation;
        ((S = i(S)), (p = i(p)));
        const m = y.target;
        if (
          e.params.navigation.hideOnClick &&
          !p.includes(m) &&
          !S.includes(m)
        ) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === m || e.pagination.el.contains(m))
          )
            return;
          let g;
          (S.length
            ? (g = S[0].classList.contains(e.params.navigation.hiddenClass))
            : p.length &&
              (g = p[0].classList.contains(e.params.navigation.hiddenClass)),
            r(g === !0 ? "navigationShow" : "navigationHide"),
            [...S, ...p]
              .filter((E) => !!E)
              .forEach((E) =>
                E.classList.toggle(e.params.navigation.hiddenClass),
              ));
        }
      }));
    const d = () => {
        (e.el.classList.remove(
          ...e.params.navigation.navigationDisabledClass.split(" "),
        ),
          c(),
          s());
      },
      h = () => {
        (e.el.classList.add(
          ...e.params.navigation.navigationDisabledClass.split(" "),
        ),
          f());
      };
    Object.assign(e.navigation, {
      enable: d,
      disable: h,
      update: s,
      init: c,
      destroy: f,
    });
  }
  function f_({ swiper: e, extendParams: t, on: n, emit: r, params: i }) {
    ((e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      t({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      }));
    let a,
      o,
      s = i && i.autoplay ? i.autoplay.delay : 3e3,
      l = i && i.autoplay ? i.autoplay.delay : 3e3,
      u,
      c = new Date().getTime,
      f,
      d,
      h,
      v,
      y,
      S;
    function p(Q) {
      !e ||
        e.destroyed ||
        !e.wrapperEl ||
        (Q.target === e.wrapperEl &&
          (e.wrapperEl.removeEventListener("transitionend", p), T()));
    }
    const m = () => {
        if (e.destroyed || !e.autoplay.running) return;
        e.autoplay.paused ? (f = !0) : f && ((l = u), (f = !1));
        const Q = e.autoplay.paused ? u : c + l - new Date().getTime();
        ((e.autoplay.timeLeft = Q),
          r("autoplayTimeLeft", Q, Q / s),
          (o = requestAnimationFrame(() => {
            m();
          })));
      },
      g = () => {
        let Q;
        return (
          e.virtual && e.params.virtual.enabled
            ? (Q = e.slides.filter((D) =>
                D.classList.contains("swiper-slide-active"),
              )[0])
            : (Q = e.slides[e.activeIndex]),
          Q ? parseInt(Q.getAttribute("data-swiper-autoplay"), 10) : void 0
        );
      },
      E = (Q) => {
        if (e.destroyed || !e.autoplay.running) return;
        (cancelAnimationFrame(o), m());
        let ye = typeof Q > "u" ? e.params.autoplay.delay : Q;
        ((s = e.params.autoplay.delay), (l = e.params.autoplay.delay));
        const D = g();
        (!Number.isNaN(D) &&
          D > 0 &&
          typeof Q > "u" &&
          ((ye = D), (s = D), (l = D)),
          (u = ye));
        const L = e.params.speed,
          U = () => {
            !e ||
              e.destroyed ||
              (e.params.autoplay.reverseDirection
                ? !e.isBeginning || e.params.loop || e.params.rewind
                  ? (e.slidePrev(L, !0, !0), r("autoplay"))
                  : e.params.autoplay.stopOnLastSlide ||
                    (e.slideTo(e.slides.length - 1, L, !0, !0), r("autoplay"))
                : !e.isEnd || e.params.loop || e.params.rewind
                  ? (e.slideNext(L, !0, !0), r("autoplay"))
                  : e.params.autoplay.stopOnLastSlide ||
                    (e.slideTo(0, L, !0, !0), r("autoplay")),
              e.params.cssMode &&
                ((c = new Date().getTime()),
                requestAnimationFrame(() => {
                  E();
                })));
          };
        return (
          ye > 0
            ? (clearTimeout(a),
              (a = setTimeout(() => {
                U();
              }, ye)))
            : requestAnimationFrame(() => {
                U();
              }),
          ye
        );
      },
      x = () => {
        ((e.autoplay.running = !0), E(), r("autoplayStart"));
      },
      b = () => {
        ((e.autoplay.running = !1),
          clearTimeout(a),
          cancelAnimationFrame(o),
          r("autoplayStop"));
      },
      k = (Q, ye) => {
        if (e.destroyed || !e.autoplay.running) return;
        (clearTimeout(a), Q || (S = !0));
        const D = () => {
          (r("autoplayPause"),
            e.params.autoplay.waitForTransition
              ? e.wrapperEl.addEventListener("transitionend", p)
              : T());
        };
        if (((e.autoplay.paused = !0), ye)) {
          (y && (u = e.params.autoplay.delay), (y = !1), D());
          return;
        }
        ((u = (u || e.params.autoplay.delay) - (new Date().getTime() - c)),
          !(e.isEnd && u < 0 && !e.params.loop) && (u < 0 && (u = 0), D()));
      },
      T = () => {
        (e.isEnd && u < 0 && !e.params.loop) ||
          e.destroyed ||
          !e.autoplay.running ||
          ((c = new Date().getTime()),
          S ? ((S = !1), E(u)) : E(),
          (e.autoplay.paused = !1),
          r("autoplayResume"));
      },
      R = () => {
        if (e.destroyed || !e.autoplay.running) return;
        const Q = Pt();
        (Q.visibilityState === "hidden" && ((S = !0), k(!0)),
          Q.visibilityState === "visible" && T());
      },
      j = (Q) => {
        Q.pointerType === "mouse" && ((S = !0), k(!0));
      },
      M = (Q) => {
        Q.pointerType === "mouse" && e.autoplay.paused && T();
      },
      A = () => {
        e.params.autoplay.pauseOnMouseEnter &&
          (e.el.addEventListener("pointerenter", j),
          e.el.addEventListener("pointerleave", M));
      },
      B = () => {
        (e.el.removeEventListener("pointerenter", j),
          e.el.removeEventListener("pointerleave", M));
      },
      Y = () => {
        Pt().addEventListener("visibilitychange", R);
      },
      Ue = () => {
        Pt().removeEventListener("visibilitychange", R);
      };
    (n("init", () => {
      e.params.autoplay.enabled && (A(), Y(), (c = new Date().getTime()), x());
    }),
      n("destroy", () => {
        (B(), Ue(), e.autoplay.running && b());
      }),
      n("beforeTransitionStart", (Q, ye, D) => {
        e.destroyed ||
          !e.autoplay.running ||
          (D || !e.params.autoplay.disableOnInteraction ? k(!0, !0) : b());
      }),
      n("sliderFirstMove", () => {
        if (!(e.destroyed || !e.autoplay.running)) {
          if (e.params.autoplay.disableOnInteraction) {
            b();
            return;
          }
          ((d = !0),
            (h = !1),
            (S = !1),
            (v = setTimeout(() => {
              ((S = !0), (h = !0), k(!0));
            }, 200)));
        }
      }),
      n("touchEnd", () => {
        if (!(e.destroyed || !e.autoplay.running || !d)) {
          if (
            (clearTimeout(v),
            clearTimeout(a),
            e.params.autoplay.disableOnInteraction)
          ) {
            ((h = !1), (d = !1));
            return;
          }
          (h && e.params.cssMode && T(), (h = !1), (d = !1));
        }
      }),
      n("slideChange", () => {
        e.destroyed || !e.autoplay.running || (y = !0);
      }),
      Object.assign(e.autoplay, { start: x, stop: b, pause: k, resume: T }));
  }
  function Zn(e) {
    return (
      typeof e == "object" &&
      e !== null &&
      e.constructor &&
      Object.prototype.toString.call(e).slice(8, -1) === "Object"
    );
  }
  function un(e, t) {
    const n = ["__proto__", "constructor", "prototype"];
    Object.keys(t)
      .filter((r) => n.indexOf(r) < 0)
      .forEach((r) => {
        typeof e[r] > "u"
          ? (e[r] = t[r])
          : Zn(t[r]) && Zn(e[r]) && Object.keys(t[r]).length > 0
            ? t[r].__swiper__
              ? (e[r] = t[r])
              : un(e[r], t[r])
            : (e[r] = t[r]);
      });
  }
  function Gg(e = {}) {
    return (
      e.navigation &&
      typeof e.navigation.nextEl > "u" &&
      typeof e.navigation.prevEl > "u"
    );
  }
  function Yg(e = {}) {
    return e.pagination && typeof e.pagination.el > "u";
  }
  function Xg(e = {}) {
    return e.scrollbar && typeof e.scrollbar.el > "u";
  }
  function Kg(e = "") {
    const t = e
        .split(" ")
        .map((r) => r.trim())
        .filter((r) => !!r),
      n = [];
    return (
      t.forEach((r) => {
        n.indexOf(r) < 0 && n.push(r);
      }),
      n.join(" ")
    );
  }
  function d_(e = "") {
    return e
      ? e.includes("swiper-wrapper")
        ? e
        : `swiper-wrapper ${e}`
      : "swiper-wrapper";
  }
  const Jg = [
    "eventsPrefix",
    "injectStyles",
    "injectStylesUrls",
    "modules",
    "init",
    "_direction",
    "oneWayMovement",
    "touchEventsTarget",
    "initialSlide",
    "_speed",
    "cssMode",
    "updateOnWindowResize",
    "resizeObserver",
    "nested",
    "focusableElements",
    "_enabled",
    "_width",
    "_height",
    "preventInteractionOnTransition",
    "userAgent",
    "url",
    "_edgeSwipeDetection",
    "_edgeSwipeThreshold",
    "_freeMode",
    "_autoHeight",
    "setWrapperSize",
    "virtualTranslate",
    "_effect",
    "breakpoints",
    "_spaceBetween",
    "_slidesPerView",
    "maxBackfaceHiddenSlides",
    "_grid",
    "_slidesPerGroup",
    "_slidesPerGroupSkip",
    "_slidesPerGroupAuto",
    "_centeredSlides",
    "_centeredSlidesBounds",
    "_slidesOffsetBefore",
    "_slidesOffsetAfter",
    "normalizeSlideIndex",
    "_centerInsufficientSlides",
    "_watchOverflow",
    "roundLengths",
    "touchRatio",
    "touchAngle",
    "simulateTouch",
    "_shortSwipes",
    "_longSwipes",
    "longSwipesRatio",
    "longSwipesMs",
    "_followFinger",
    "allowTouchMove",
    "_threshold",
    "touchMoveStopPropagation",
    "touchStartPreventDefault",
    "touchStartForcePreventDefault",
    "touchReleaseOnEdges",
    "uniqueNavElements",
    "_resistance",
    "_resistanceRatio",
    "_watchSlidesProgress",
    "_grabCursor",
    "preventClicks",
    "preventClicksPropagation",
    "_slideToClickedSlide",
    "_loop",
    "loopedSlides",
    "loopPreventsSliding",
    "_rewind",
    "_allowSlidePrev",
    "_allowSlideNext",
    "_swipeHandler",
    "_noSwiping",
    "noSwipingClass",
    "noSwipingSelector",
    "passiveListeners",
    "containerModifierClass",
    "slideClass",
    "slideActiveClass",
    "slideVisibleClass",
    "slideNextClass",
    "slidePrevClass",
    "wrapperClass",
    "lazyPreloaderClass",
    "lazyPreloadPrevNext",
    "runCallbacksOnInit",
    "observer",
    "observeParents",
    "observeSlideChildren",
    "a11y",
    "_autoplay",
    "_controller",
    "coverflowEffect",
    "cubeEffect",
    "fadeEffect",
    "flipEffect",
    "creativeEffect",
    "cardsEffect",
    "hashNavigation",
    "history",
    "keyboard",
    "mousewheel",
    "_navigation",
    "_pagination",
    "parallax",
    "_scrollbar",
    "_thumbs",
    "virtual",
    "zoom",
    "control",
  ];
  function p_(e = {}, t = !0) {
    const n = { on: {} },
      r = {},
      i = {};
    (un(n, aa.defaults),
      un(n, aa.extendedDefaults),
      (n._emitClasses = !0),
      (n.init = !1));
    const a = {},
      o = Jg.map((l) => l.replace(/_/, "")),
      s = Object.assign({}, e);
    return (
      Object.keys(s).forEach((l) => {
        typeof e[l] > "u" ||
          (o.indexOf(l) >= 0
            ? Zn(e[l])
              ? ((n[l] = {}), (i[l] = {}), un(n[l], e[l]), un(i[l], e[l]))
              : ((n[l] = e[l]), (i[l] = e[l]))
            : l.search(/on[A-Z]/) === 0 && typeof e[l] == "function"
              ? t
                ? (r[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
                : (n.on[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
              : (a[l] = e[l]));
      }),
      ["navigation", "pagination", "scrollbar"].forEach((l) => {
        (n[l] === !0 && (n[l] = {}), n[l] === !1 && delete n[l]);
      }),
      { params: n, passedParams: i, rest: a, events: r }
    );
  }
  function h_(
    { el: e, nextEl: t, prevEl: n, paginationEl: r, scrollbarEl: i, swiper: a },
    o,
  ) {
    (Gg(o) &&
      t &&
      n &&
      ((a.params.navigation.nextEl = t),
      (a.originalParams.navigation.nextEl = t),
      (a.params.navigation.prevEl = n),
      (a.originalParams.navigation.prevEl = n)),
      Yg(o) &&
        r &&
        ((a.params.pagination.el = r), (a.originalParams.pagination.el = r)),
      Xg(o) &&
        i &&
        ((a.params.scrollbar.el = i), (a.originalParams.scrollbar.el = i)),
      a.init(e));
  }
  function m_(e, t, n, r, i) {
    const a = [];
    if (!t) return a;
    const o = (l) => {
      a.indexOf(l) < 0 && a.push(l);
    };
    if (n && r) {
      const l = r.map(i),
        u = n.map(i);
      (l.join("") !== u.join("") && o("children"),
        r.length !== n.length && o("children"));
    }
    return (
      Jg.filter((l) => l[0] === "_")
        .map((l) => l.replace(/_/, ""))
        .forEach((l) => {
          if (l in e && l in t)
            if (Zn(e[l]) && Zn(t[l])) {
              const u = Object.keys(e[l]),
                c = Object.keys(t[l]);
              u.length !== c.length
                ? o(l)
                : (u.forEach((f) => {
                    e[l][f] !== t[l][f] && o(l);
                  }),
                  c.forEach((f) => {
                    e[l][f] !== t[l][f] && o(l);
                  }));
            } else e[l] !== t[l] && o(l);
        }),
      a
    );
  }
  function Zg(e) {
    return (
      e.type && e.type.displayName && e.type.displayName.includes("SwiperSlide")
    );
  }
  function ey(e) {
    const t = [];
    return (
      H.Children.toArray(e).forEach((n) => {
        Zg(n)
          ? t.push(n)
          : n.props &&
            n.props.children &&
            ey(n.props.children).forEach((r) => t.push(r));
      }),
      t
    );
  }
  function v_(e) {
    const t = [],
      n = {
        "container-start": [],
        "container-end": [],
        "wrapper-start": [],
        "wrapper-end": [],
      };
    return (
      H.Children.toArray(e).forEach((r) => {
        if (Zg(r)) t.push(r);
        else if (r.props && r.props.slot && n[r.props.slot])
          n[r.props.slot].push(r);
        else if (r.props && r.props.children) {
          const i = ey(r.props.children);
          i.length > 0
            ? i.forEach((a) => t.push(a))
            : n["container-end"].push(r);
        } else n["container-end"].push(r);
      }),
      { slides: t, slots: n }
    );
  }
  function g_({
    swiper: e,
    slides: t,
    passedParams: n,
    changedParams: r,
    nextEl: i,
    prevEl: a,
    scrollbarEl: o,
    paginationEl: s,
  }) {
    const l = r.filter(
        (T) => T !== "children" && T !== "direction" && T !== "wrapperClass",
      ),
      {
        params: u,
        pagination: c,
        navigation: f,
        scrollbar: d,
        virtual: h,
        thumbs: v,
      } = e;
    let y, S, p, m, g, E, x, b;
    (r.includes("thumbs") &&
      n.thumbs &&
      n.thumbs.swiper &&
      u.thumbs &&
      !u.thumbs.swiper &&
      (y = !0),
      r.includes("controller") &&
        n.controller &&
        n.controller.control &&
        u.controller &&
        !u.controller.control &&
        (S = !0),
      r.includes("pagination") &&
        n.pagination &&
        (n.pagination.el || s) &&
        (u.pagination || u.pagination === !1) &&
        c &&
        !c.el &&
        (p = !0),
      r.includes("scrollbar") &&
        n.scrollbar &&
        (n.scrollbar.el || o) &&
        (u.scrollbar || u.scrollbar === !1) &&
        d &&
        !d.el &&
        (m = !0),
      r.includes("navigation") &&
        n.navigation &&
        (n.navigation.prevEl || a) &&
        (n.navigation.nextEl || i) &&
        (u.navigation || u.navigation === !1) &&
        f &&
        !f.prevEl &&
        !f.nextEl &&
        (g = !0));
    const k = (T) => {
      e[T] &&
        (e[T].destroy(),
        T === "navigation"
          ? (e.isElement && (e[T].prevEl.remove(), e[T].nextEl.remove()),
            (u[T].prevEl = void 0),
            (u[T].nextEl = void 0),
            (e[T].prevEl = void 0),
            (e[T].nextEl = void 0))
          : (e.isElement && e[T].el.remove(),
            (u[T].el = void 0),
            (e[T].el = void 0)));
    };
    (r.includes("loop") &&
      e.isElement &&
      (u.loop && !n.loop ? (E = !0) : !u.loop && n.loop ? (x = !0) : (b = !0)),
      l.forEach((T) => {
        if (Zn(u[T]) && Zn(n[T]))
          (un(u[T], n[T]),
            (T === "navigation" || T === "pagination" || T === "scrollbar") &&
              "enabled" in n[T] &&
              !n[T].enabled &&
              k(T));
        else {
          const R = n[T];
          (R === !0 || R === !1) &&
          (T === "navigation" || T === "pagination" || T === "scrollbar")
            ? R === !1 && k(T)
            : (u[T] = n[T]);
        }
      }),
      l.includes("controller") &&
        !S &&
        e.controller &&
        e.controller.control &&
        u.controller &&
        u.controller.control &&
        (e.controller.control = u.controller.control),
      r.includes("children") &&
        t &&
        h &&
        u.virtual.enabled &&
        ((h.slides = t), h.update(!0)),
      r.includes("children") && t && u.loop && (b = !0),
      y && v.init() && v.update(!0),
      S && (e.controller.control = u.controller.control),
      p &&
        (e.isElement &&
          (!s || typeof s == "string") &&
          ((s = document.createElement("div")),
          s.classList.add("swiper-pagination"),
          e.el.shadowEl.appendChild(s)),
        s && (u.pagination.el = s),
        c.init(),
        c.render(),
        c.update()),
      m &&
        (e.isElement &&
          (!o || typeof o == "string") &&
          ((o = document.createElement("div")),
          o.classList.add("swiper-scrollbar"),
          e.el.shadowEl.appendChild(o)),
        o && (u.scrollbar.el = o),
        d.init(),
        d.updateSize(),
        d.setTranslate()),
      g &&
        (e.isElement &&
          ((!i || typeof i == "string") &&
            ((i = document.createElement("div")),
            i.classList.add("swiper-button-next"),
            e.el.shadowEl.appendChild(i)),
          (!a || typeof a == "string") &&
            ((a = document.createElement("div")),
            a.classList.add("swiper-button-prev"),
            e.el.shadowEl.appendChild(a))),
        i && (u.navigation.nextEl = i),
        a && (u.navigation.prevEl = a),
        f.init(),
        f.update()),
      r.includes("allowSlideNext") && (e.allowSlideNext = n.allowSlideNext),
      r.includes("allowSlidePrev") && (e.allowSlidePrev = n.allowSlidePrev),
      r.includes("direction") && e.changeDirection(n.direction, !1),
      (E || b) && e.loopDestroy(),
      (x || b) && e.loopCreate(),
      e.update());
  }
  function y_(e, t, n) {
    if (!n) return null;
    const r = (c) => {
        let f = c;
        return (
          c < 0 ? (f = t.length + c) : f >= t.length && (f = f - t.length),
          f
        );
      },
      i = e.isHorizontal()
        ? { [e.rtlTranslate ? "right" : "left"]: `${n.offset}px` }
        : { top: `${n.offset}px` },
      { from: a, to: o } = n,
      s = e.params.loop ? -t.length : 0,
      l = e.params.loop ? t.length * 2 : t.length,
      u = [];
    for (let c = s; c < l; c += 1) c >= a && c <= o && u.push(t[r(c)]);
    return u.map((c, f) =>
      H.cloneElement(c, { swiper: e, style: i, key: `slide-${f}` }),
    );
  }
  const w_ = (e) => {
    !e ||
      e.destroyed ||
      !e.params.virtual ||
      (e.params.virtual && !e.params.virtual.enabled) ||
      (e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.parallax &&
        e.params.parallax &&
        e.params.parallax.enabled &&
        e.parallax.setTranslate());
  };
  function Mi(e, t) {
    return typeof window > "u" ? N.useEffect(e, t) : N.useLayoutEffect(e, t);
  }
  const Up = N.createContext(null),
    S_ = N.createContext(null);
  function zu() {
    return (
      (zu = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      zu.apply(this, arguments)
    );
  }
  const ys = N.forwardRef(function (e, t) {
    let {
        className: n,
        tag: r = "div",
        wrapperTag: i = "div",
        children: a,
        onSwiper: o,
        ...s
      } = e === void 0 ? {} : e,
      l = !1;
    const [u, c] = N.useState("swiper"),
      [f, d] = N.useState(null),
      [h, v] = N.useState(!1),
      y = N.useRef(!1),
      S = N.useRef(null),
      p = N.useRef(null),
      m = N.useRef(null),
      g = N.useRef(null),
      E = N.useRef(null),
      x = N.useRef(null),
      b = N.useRef(null),
      k = N.useRef(null),
      { params: T, passedParams: R, rest: j, events: M } = p_(s),
      { slides: A, slots: B } = v_(a),
      Y = () => {
        v(!h);
      };
    Object.assign(T.on, {
      _containerClasses(L, U) {
        c(U);
      },
    });
    const Ue = () => {
      (Object.assign(T.on, M), (l = !0));
      const L = { ...T };
      if (
        (delete L.wrapperClass,
        (p.current = new aa(L)),
        p.current.virtual && p.current.params.virtual.enabled)
      ) {
        p.current.virtual.slides = A;
        const U = {
          cache: !1,
          slides: A,
          renderExternal: d,
          renderExternalUpdate: !1,
        };
        (un(p.current.params.virtual, U),
          un(p.current.originalParams.virtual, U));
      }
    };
    (S.current || Ue(), p.current && p.current.on("_beforeBreakpoint", Y));
    const Q = () => {
        l ||
          !M ||
          !p.current ||
          Object.keys(M).forEach((L) => {
            p.current.on(L, M[L]);
          });
      },
      ye = () => {
        !M ||
          !p.current ||
          Object.keys(M).forEach((L) => {
            p.current.off(L, M[L]);
          });
      };
    (N.useEffect(() => () => {
      p.current && p.current.off("_beforeBreakpoint", Y);
    }),
      N.useEffect(() => {
        !y.current &&
          p.current &&
          (p.current.emitSlidesClasses(), (y.current = !0));
      }),
      Mi(() => {
        if ((t && (t.current = S.current), !!S.current))
          return (
            p.current.destroyed && Ue(),
            h_(
              {
                el: S.current,
                nextEl: E.current,
                prevEl: x.current,
                paginationEl: b.current,
                scrollbarEl: k.current,
                swiper: p.current,
              },
              T,
            ),
            o && o(p.current),
            () => {
              p.current && !p.current.destroyed && p.current.destroy(!0, !1);
            }
          );
      }, []),
      Mi(() => {
        Q();
        const L = m_(R, m.current, A, g.current, (U) => U.key);
        return (
          (m.current = R),
          (g.current = A),
          L.length &&
            p.current &&
            !p.current.destroyed &&
            g_({
              swiper: p.current,
              slides: A,
              passedParams: R,
              changedParams: L,
              nextEl: E.current,
              prevEl: x.current,
              scrollbarEl: k.current,
              paginationEl: b.current,
            }),
          () => {
            ye();
          }
        );
      }),
      Mi(() => {
        w_(p.current);
      }, [f]));
    function D() {
      return T.virtual
        ? y_(p.current, A, f)
        : A.map((L, U) =>
            H.cloneElement(L, { swiper: p.current, swiperSlideIndex: U }),
          );
    }
    return H.createElement(
      r,
      zu({ ref: S, className: Kg(`${u}${n ? ` ${n}` : ""}`) }, j),
      H.createElement(
        S_.Provider,
        { value: p.current },
        B["container-start"],
        H.createElement(
          i,
          { className: d_(T.wrapperClass) },
          B["wrapper-start"],
          D(),
          B["wrapper-end"],
        ),
        Gg(T) &&
          H.createElement(
            H.Fragment,
            null,
            H.createElement("div", { ref: x, className: "swiper-button-prev" }),
            H.createElement("div", { ref: E, className: "swiper-button-next" }),
          ),
        Xg(T) &&
          H.createElement("div", { ref: k, className: "swiper-scrollbar" }),
        Yg(T) &&
          H.createElement("div", { ref: b, className: "swiper-pagination" }),
        B["container-end"],
      ),
    );
  });
  ys.displayName = "Swiper";
  function ju() {
    return (
      (ju = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      ju.apply(this, arguments)
    );
  }
  const ws = N.forwardRef(function (e, t) {
    let {
      tag: n = "div",
      children: r,
      className: i = "",
      swiper: a,
      zoom: o,
      lazy: s,
      virtualIndex: l,
      swiperSlideIndex: u,
      ...c
    } = e === void 0 ? {} : e;
    const f = N.useRef(null),
      [d, h] = N.useState("swiper-slide"),
      [v, y] = N.useState(!1);
    function S(E, x, b) {
      x === f.current && h(b);
    }
    (Mi(() => {
      if (
        (typeof u < "u" && (f.current.swiperSlideIndex = u),
        t && (t.current = f.current),
        !(!f.current || !a))
      ) {
        if (a.destroyed) {
          d !== "swiper-slide" && h("swiper-slide");
          return;
        }
        return (
          a.on("_slideClass", S),
          () => {
            a && a.off("_slideClass", S);
          }
        );
      }
    }),
      Mi(() => {
        a && f.current && !a.destroyed && h(a.getSlideClasses(f.current));
      }, [a]));
    const p = {
        isActive: d.indexOf("swiper-slide-active") >= 0,
        isVisible: d.indexOf("swiper-slide-visible") >= 0,
        isPrev: d.indexOf("swiper-slide-prev") >= 0,
        isNext: d.indexOf("swiper-slide-next") >= 0,
      },
      m = () => (typeof r == "function" ? r(p) : r),
      g = () => {
        y(!0);
      };
    return H.createElement(
      n,
      ju(
        {
          ref: f,
          className: Kg(`${d}${i ? ` ${i}` : ""}`),
          "data-swiper-slide-index": l,
          onLoad: g,
        },
        c,
      ),
      o &&
        H.createElement(
          Up.Provider,
          { value: p },
          H.createElement(
            "div",
            {
              className: "swiper-zoom-container",
              "data-swiper-zoom": typeof o == "number" ? o : void 0,
            },
            m(),
            s &&
              !v &&
              H.createElement("div", { className: "swiper-lazy-preloader" }),
          ),
        ),
      !o &&
        H.createElement(
          Up.Provider,
          { value: p },
          m(),
          s &&
            !v &&
            H.createElement("div", { className: "swiper-lazy-preloader" }),
        ),
    );
  });
  ws.displayName = "SwiperSlide";
  const E_ = [
      {
        image:
          "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/IMG_20231020_130104-scaled-1.jpg",
        logo: !0,
        heading: "CERO plásticos, CERO limites, CERO Market",
        centered: !0,
      },
      {
        image:
          "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/pexels-igor-haritanovich-814387-1695052.jpg",
        logo: !1,
        heading: "CAFÉ CAFÉ",
        subheading:
          "En CERO Market encontras todo lo que necesites para armar tus desayunos ricos, sanos y nutritivos.",
      },
      {
        image:
          "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/IMG_20231020_130419-scaled-1.jpg",
        logo: !1,
        heading: "SUPERMERCADO A GRANEL",
        subheading:
          "Comprá solo lo que necesites, sin desperdicios ni packaging excesivo.",
      },
    ],
    x_ = () =>
      w("div", {
        className: "relative w-full",
        children: w(ys, {
          modules: [cf, f_],
          navigation: !0,
          speed: 420,
          autoplay: { delay: 5e3, disableOnInteraction: !1 },
          loop: !0,
          className: "w-full h-[48vh] md:h-[56vh]",
          children: E_.map((e, t) =>
            w(
              ws,
              {
                children: C("div", {
                  className: "w-full h-full bg-cover bg-center relative",
                  style: { backgroundImage: `url(${e.image})` },
                  children: [
                    w("div", { className: "absolute inset-0 bg-black/40" }),
                    e.centered
                      ? C("div", {
                          className:
                            "absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8",
                          children: [
                            w("img", {
                              src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo-cero-market-2-1.png",
                              alt: "CeroMarket",
                              className: "h-20 mb-4 animate-fadeInDown",
                            }),
                            w("h2", {
                              className:
                                "text-2xl md:text-4xl font-bold animate-fadeInUp",
                              children: e.heading,
                            }),
                          ],
                        })
                      : C("div", {
                          className:
                            "absolute inset-0 flex flex-col items-start justify-center text-left text-white space-y-3 pl-20 pr-8 py-8 md:pl-36 md:pr-16 md:py-16",
                          children: [
                            w("h2", {
                              className:
                                "text-4xl md:text-6xl font-bold animate-fadeInUp",
                              children: e.heading,
                            }),
                            w("p", {
                              className:
                                "text-lg md:text-xl max-w-xl animate-fadeInUp",
                              children: e.subheading,
                            }),
                            e.button &&
                              w(_e, {
                                to: e.button.href,
                                className: "btn-glass mt-4 inline-block",
                                children: e.button.label,
                              }),
                          ],
                        }),
                  ],
                }),
              },
              t,
            ),
          ),
        }),
      }),
    b_ = () => {
      const e = N.useRef(null);
      return (
        N.useEffect(() => {
          const t = e.current;
          if (!t) return;
          const n = new IntersectionObserver(
            (r) => {
              r.forEach((i) => {
                i.isIntersecting &&
                  (t.classList.add("in-view"), n.unobserve(t));
              });
            },
            { threshold: 0.2 },
          );
          return (n.observe(t), () => n.disconnect());
        }, []),
        w("section", {
          className: "py-16 bg-white",
          children: C("div", {
            className:
              "container mx-auto px-4 flex flex-col md:flex-row items-center gap-8",
            children: [
              C("div", {
                className: "md:w-1/2 order-2 md:order-1",
                children: [
                  w("h3", {
                    className: "text-4xl md:text-6xl font-extrabold mb-4",
                    children: "Una propuesta sustentable",
                  }),
                  C("p", {
                    className: "text-lg leading-relaxed",
                    children: [
                      "Proponemos opciones alternativas, con el propósito de inspirar y ayudar a reducir el consumo de plástico de un solo uso, y de esta manera, volver a conectar con la Tierra. Más que un supermercado sustentable, somos una comunidad de personas que cuida el planeta.",
                      w("br", {}),
                      w("br", {}),
                      "¡Viví tu experiencia CERO Market!",
                    ],
                  }),
                ],
              }),
              w("div", {
                className: "md:w-1/2 order-1 md:order-2 flex justify-center",
                children: w("img", {
                  ref: e,
                  src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/Group-15-1.png",
                  alt: "Ilustración sustentable",
                  className:
                    "w-[70%] md:w-[70%] h-auto object-contain transform transition-all duration-700 ease-out opacity-0 translate-y-6",
                }),
              }),
            ],
          }),
        })
      );
    },
    ty = ({ product: e }) => {
      var n, r, i, a, o, s;
      const t =
        ((r =
          (n = e == null ? void 0 : e.featuredImage) == null
            ? void 0
            : n.node) == null
          ? void 0
          : r.sourceUrl) ||
        ((i = e == null ? void 0 : e.image) == null ? void 0 : i.sourceUrl) ||
        ((s =
          (o =
            (a = e == null ? void 0 : e.images) == null ? void 0 : a.nodes) ==
          null
            ? void 0
            : o[0]) == null
          ? void 0
          : s.sourceUrl) ||
        "";
      return C("div", {
        className: "group",
        children: [
          C("div", {
            className:
              "relative w-full h-64 bg-gray-100 rounded-[5px] overflow-hidden",
            children: [
              t
                ? w("img", {
                    src: t,
                    alt: e.name,
                    className: "w-full h-full object-cover",
                  })
                : w("div", {
                    className: "w-full h-full flex items-center justify-center",
                    children: w("img", {
                      src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo-oscuro.png",
                      alt: "CeroMarket placeholder",
                      className: "object-contain max-h-28 opacity-40",
                    }),
                  }),
              w("div", {
                className:
                  "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/30",
                children: w(_e, {
                  to: `/producto/${e.slug}`,
                  className:
                    "btn-glass bg-white/10 text-white font-bold px-4 py-2 rounded",
                  children: "Ver producto",
                }),
              }),
            ],
          }),
          w("h4", {
            className: "mt-[10px] text-center text-[0.95rem] font-medium",
            children: e.name,
          }),
        ],
      });
    },
    __ = ut`
  query GetProductsForCarousel {
    products(first: 12) {
      nodes {
        id
        slug
        name
        ... on SimpleProduct {
          image {
            sourceUrl
            altText
          }
        }
        ... on VariableProduct {
          image {
            sourceUrl
            altText
          }
        }
        ... on ExternalProduct {
          image {
            sourceUrl
            altText
          }
        }
        ... on GroupProduct {
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`,
    ny = () => {
      var e;
      try {
        const { data: t, loading: n, error: r } = Kn(__),
          i =
            ((e = t == null ? void 0 : t.products) == null
              ? void 0
              : e.nodes) || [];
        return w("section", {
          className: "py-16 bg-gray-50",
          children: C("div", {
            className: "container mx-auto px-4",
            children: [
              C("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                  w("div", {
                    className: "flex-1 text-center",
                    children: w("h3", {
                      className: "text-3xl font-extrabold",
                      children: "Explora nuestros productos",
                    }),
                  }),
                  w("div", {
                    className: "ml-4",
                    children: w("a", {
                      href: "/productos",
                      className: "btn-glass",
                      children: "Ver más",
                    }),
                  }),
                ],
              }),
              n && w("p", { children: "Cargando productos..." }),
              r && w("p", { children: "Error al cargar productos." }),
              !n &&
                !r &&
                w(ys, {
                  modules: [cf],
                  navigation: !0,
                  slidesPerView: 1,
                  spaceBetween: 16,
                  breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  },
                  children: i.map((a) =>
                    w(ws, { children: w(ty, { product: a }) }, a.id),
                  ),
                }),
            ],
          }),
        });
      } catch (t) {
        return (
          console.error("ProductCarousel render error:", t),
          w("section", {
            className: "py-12 bg-red-50",
            children: C("div", {
              className: "container mx-auto px-4",
              children: [
                w("h3", {
                  className: "text-lg font-semibold text-red-700",
                  children: "Error en ProductCarousel",
                }),
                w("pre", {
                  className:
                    "text-sm text-left text-red-600 overflow-auto max-h-48",
                  children: String(t && (t.stack || t.message)),
                }),
              ],
            }),
          })
        );
      }
    },
    ry = ({ post: e }) => {
      var a, o;
      const t =
          (o =
            (a = e == null ? void 0 : e.featuredImage) == null
              ? void 0
              : a.node) == null
            ? void 0
            : o.sourceUrl,
        i = (e.excerpt ? e.excerpt.replace(/<[^>]+>/g, "") : "")
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 6)
          .join(" ");
      return C(_e, {
        to: `/blog/${e.slug}`,
        className:
          "group block overflow-hidden border rounded-lg shadow-sm bg-white",
        children: [
          t &&
            w("div", {
              className: "overflow-hidden",
              children: w("img", {
                src: t,
                alt: e.title,
                className:
                  "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105",
              }),
            }),
          C("div", {
            className: "p-4",
            children: [
              C("p", {
                className: "text-sm text-gray-500 mb-2",
                children: [i, "..."],
              }),
              w("h4", {
                className: "font-semibold text-lg",
                children: e.title,
              }),
            ],
          }),
        ],
      });
    },
    T_ = ut`
  query GetPostsForCarousel {
    posts(first: 12) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`,
    k_ = () => {
      var i;
      const { data: e, loading: t, error: n } = Kn(T_),
        r =
          ((i = e == null ? void 0 : e.posts) == null ? void 0 : i.nodes) || [];
      return w("section", {
        className: "py-16 bg-white",
        children: C("div", {
          className: "container mx-auto px-4",
          children: [
            C("div", {
              className: "flex items-center justify-between mb-6",
              children: [
                w("div", {
                  className: "flex-1 text-center",
                  children: w("h3", {
                    className: "text-3xl font-extrabold",
                    children: "Explora nuestro blog",
                  }),
                }),
                w("div", {
                  className: "ml-4",
                  children: w("a", {
                    href: "/blog",
                    className: "btn-glass",
                    children: "Ver Blog",
                  }),
                }),
              ],
            }),
            t && w("p", { children: "Cargando artículos..." }),
            n && w("p", { children: "Error al cargar artículos." }),
            !t &&
              !n &&
              w(ys, {
                modules: [cf],
                navigation: !0,
                slidesPerView: 1,
                spaceBetween: 16,
                breakpoints: {
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                },
                children: r.map((a) =>
                  w(ws, { children: w(ry, { post: a }) }, a.id),
                ),
              }),
          ],
        }),
      });
    },
    C_ = () =>
      C($o, { children: [w(x_, {}), w(b_, {}), w(ny, {}), w(k_, {})] }),
    O_ = () =>
      w("section", {
        className: "container mx-auto px-4 py-12 min-h-[80vh]",
        children: C("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
          children: [
            w("div", {
              children: w("img", {
                src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/IMG_20220820_133737-scaled-1.jpg",
                alt: "Nuestro equipo",
                className:
                  "w-full h-80 md:h-[28rem] object-cover rounded-lg shadow",
              }),
            }),
            C("div", {
              className:
                "flex flex-col items-center md:items-start text-center md:text-left justify-center",
              children: [
                w("h1", {
                  className: "text-3xl md:text-4xl font-extrabold mb-4",
                  children: "Sobre nosotros",
                }),
                w("p", {
                  className: "text-lg leading-relaxed mb-6",
                  children:
                    "CERO Market es un supermercado sustentable que promueve un consumo más responsable y consciente. Nos enfocamos en ofrecer productos naturales y a granel para reducir el uso de envases y plásticos de un solo uso. Somos una comunidad comprometida con la salud, la sostenibilidad y el amor por nuestro planeta.",
                }),
                C("button", {
                  className:
                    "inline-flex items-center gap-3 bg-[#25D366] text-white px-4 py-2 rounded-full hover:brightness-95",
                  onClick: () => {
                    const e = new CustomEvent("openWhatsappModal", {
                      detail: {
                        message: "Hola, quiero saber más sobre CERO Market.",
                      },
                    });
                    window.dispatchEvent(e);
                  },
                  children: [
                    w(Jn, { className: "text-white" }),
                    w("span", { children: "Hablemos" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    N_ = () => {
      const e = H.useRef(null);
      H.useEffect(() => {
        const n = e.current;
        if (!n) return;
        const r = new IntersectionObserver(
          (i) => {
            i.forEach((a) => {
              a.isIntersecting && (n.classList.add("in-view"), r.unobserve(n));
            });
          },
          { threshold: 0.2 },
        );
        return (r.observe(n), () => r.disconnect());
      }, []);
      const t = H.useRef(null);
      return (
        H.useEffect(() => {
          const n = () => {
            if (!t.current) return;
            const r = t.current.getBoundingClientRect(),
              i = window.innerHeight,
              a = Math.min(Math.max((i - r.top) / i, 0), 1);
            t.current.style.transform = `rotate(${a * 360}deg)`;
          };
          return (
            window.addEventListener("scroll", n),
            n(),
            () => window.removeEventListener("scroll", n)
          );
        }, []),
        C("section", {
          className: "container mx-auto px-4 py-12",
          children: [
            C("div", {
              className:
                "grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-6 items-center mb-10",
              children: [
                C("div", {
                  className: "h-40 md:h-40 flex flex-col justify-center",
                  children: [
                    w("h1", {
                      className: "text-4xl font-extrabold mb-4",
                      children: "Misión CERO",
                    }),
                    w("p", {
                      className: "text-lg leading-relaxed",
                      children:
                        "En CERO Market nos comprometemos a reducir residuos y fomentar prácticas de consumo responsables. Nuestra Misión CERO busca inspirar cambios diarios que reduzcan el uso de plásticos y promuevan una economía circular.",
                    }),
                  ],
                }),
                w("div", {
                  className: "flex items-center justify-center",
                  children: w("img", {
                    ref: t,
                    src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/favicon-2-150x150-1.png",
                    alt: "icono misión",
                    className:
                      "w-20 h-20 opacity-0 transition-all duration-700 transform",
                    onLoad: () =>
                      t.current && t.current.classList.add("in-view"),
                  }),
                }),
              ],
            }),
            C("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-start",
              children: [
                C("div", {
                  className: "grid gap-6",
                  children: [
                    w("div", {
                      className:
                        "bg-gray-50 p-6 rounded-lg shadow transition-transform transform hover:scale-105",
                      children: C("div", {
                        className: "flex items-start gap-4",
                        children: [
                          w("div", {
                            className: "text-2xl text-primary mt-1",
                            children: w(Vx, {}),
                          }),
                          C("div", {
                            children: [
                              w("h3", {
                                className: "font-extrabold mb-1",
                                children: "1. Elegí tus productos",
                              }),
                              w("p", {
                                className: "text-sm",
                                children:
                                  "Seleccioná productos a granel según tus necesidades.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    w("div", {
                      className:
                        "bg-gray-50 p-6 rounded-lg shadow transition-transform transform hover:scale-105",
                      children: C("div", {
                        className: "flex items-start gap-4",
                        children: [
                          w("div", {
                            className: "text-2xl text-primary mt-1",
                            children: w(Ix, {}),
                          }),
                          C("div", {
                            children: [
                              w("h3", {
                                className: "font-extrabold mb-1",
                                children: "2. Traé tus envases",
                              }),
                              w("p", {
                                className: "text-sm",
                                children:
                                  "Usá envases reutilizables y pesalos antes de llenarlos.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    w("div", {
                      className:
                        "bg-gray-50 p-6 rounded-lg shadow transition-transform transform hover:scale-105",
                      children: C("div", {
                        className: "flex items-start gap-4",
                        children: [
                          w("div", {
                            className: "text-2xl text-primary mt-1",
                            children: w(Lx, {}),
                          }),
                          C("div", {
                            children: [
                              w("h3", {
                                className: "font-extrabold mb-1",
                                children: "3. Pagá y seguí",
                              }),
                              w("p", {
                                className: "text-sm",
                                children:
                                  "Pesá, pagá y llevate solo lo necesario.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                w("div", {
                  children: w("img", {
                    ref: e,
                    src: "https://api.ceromarket.com.uy/wp-content/uploads/2025/08/89158741_GIU-AMA-211-07-scaled.jpg",
                    alt: "Experiencia Cero Market",
                    className:
                      "w-full rounded shadow opacity-0 transform translate-y-6 transition-all duration-700",
                    onLoad: () =>
                      e.current && e.current.classList.add("in-view"),
                  }),
                }),
              ],
            }),
          ],
        })
      );
    },
    P_ = ut`
  query GetProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        slug
        name
      }
    }
  }
`,
    I_ = ut`
  query GetAllProductsForGrid($first: Int!) {
    products(first: $first) {
      nodes {
        id
        slug
        name
        ... on SimpleProduct {
          productCategories { nodes { id slug name } }
          image { sourceUrl altText }
        }
        ... on VariableProduct {
          productCategories { nodes { id slug name } }
          image { sourceUrl altText }
        }
        ... on ExternalProduct {
          productCategories { nodes { id slug name } }
          image { sourceUrl altText }
        }
        ... on GroupProduct {
          productCategories { nodes { id slug name } }
          image { sourceUrl altText }
        }
      }
    }
  }
`,
    D_ = () => {
      var m, g;
      const [e, t] = N.useState(""),
        [n, r] = N.useState(!1),
        [i, a] = N.useState(12),
        { data: o, loading: s, error: l } = Kn(P_),
        {
          data: u,
          loading: c,
          error: f,
          refetch: d,
        } = Kn(I_, { variables: { first: i } }),
        h =
          ((m = o == null ? void 0 : o.productCategories) == null
            ? void 0
            : m.nodes) || [],
        v =
          ((g = u == null ? void 0 : u.products) == null ? void 0 : g.nodes) ||
          [],
        y = N.useMemo(
          () =>
            e
              ? v.filter((E) => {
                  var x, b;
                  return (b =
                    (x = E.productCategories) == null ? void 0 : x.nodes) ==
                    null
                    ? void 0
                    : b.some((k) => k.slug === e);
                })
              : v,
          [v, e],
        ),
        S = (E) => {
          t(E || "");
        },
        p = ({ inline: E = !1 }) =>
          C("div", {
            className: E ? "" : "p-4",
            children: [
              C("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  w("h3", {
                    className: "text-base font-semibold",
                    children: "Categorías",
                  }),
                  !E &&
                    w("button", {
                      onClick: () => r(!1),
                      className: "text-sm opacity-70",
                      children: "Cerrar",
                    }),
                ],
              }),
              C("div", {
                className: "flex flex-col gap-2",
                children: [
                  C("label", {
                    className: "flex items-center gap-3 cursor-pointer group",
                    children: [
                      w("input", {
                        type: "radio",
                        name: "category",
                        value: "",
                        checked: e === "",
                        onChange: () => S(""),
                        className: "form-radio h-4 w-4 accent-primary",
                      }),
                      w("span", {
                        className: "transition-font group-hover:font-extrabold",
                        children: "Todos",
                      }),
                    ],
                  }),
                  h.map((x) =>
                    C(
                      "label",
                      {
                        className:
                          "flex items-center gap-3 cursor-pointer group",
                        children: [
                          w("input", {
                            type: "radio",
                            name: "category",
                            value: x.slug,
                            checked: e === x.slug,
                            onChange: () => S(x.slug),
                            className: "form-radio h-4 w-4 accent-primary",
                          }),
                          w("span", {
                            className:
                              "transition-font group-hover:font-extrabold",
                            children: x.name,
                          }),
                        ],
                      },
                      x.id,
                    ),
                  ),
                ],
              }),
            ],
          });
      return C("section", {
        className: "container mx-auto px-4 py-12",
        children: [
          w("div", {
            className: "flex items-center justify-between mb-6",
            children: w("h1", {
              className: "text-3xl md:text-4xl font-semibold",
              children: "Nuestros productos",
            }),
          }),
          w("div", {
            className: "mb-4 md:hidden",
            children: w("button", {
              onClick: () => r(!0),
              className: "w-full btn-glass text-center",
              children: "Filtrar",
            }),
          }),
          C("div", {
            className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
            children: [
              w("aside", {
                className: "hidden lg:block lg:col-span-1 order-1",
                children: C("div", {
                  className: "sticky top-24",
                  children: [
                    s &&
                      w("p", {
                        className: "p-4",
                        children: "Cargando categorías...",
                      }),
                    l &&
                      C("div", {
                        className:
                          "p-4 bg-red-50 text-red-700 border border-red-200 rounded mb-4",
                        children: ["Error al cargar categorías: ", l.message],
                      }),
                    !s && !l && w(p, { inline: !0 }),
                  ],
                }),
              }),
              C("div", {
                className: "lg:col-span-3 order-2",
                children: [
                  c && w("p", { children: "Cargando productos..." }),
                  f &&
                    C("div", {
                      className:
                        "p-4 bg-red-50 text-red-700 border border-red-200 rounded mb-4",
                      children: ["Error al cargar productos: ", f.message],
                    }),
                  !c &&
                    !f &&
                    C($o, {
                      children: [
                        w("div", {
                          className: "grid gap-6 grid-cols-2 md:grid-cols-3",
                          children: y.map((E) => w(ty, { product: E }, E.id)),
                        }),
                        w("div", {
                          className: "mt-8 text-center",
                          children: w("button", {
                            className:
                              "px-6 py-3 rounded bg-teal-400 hover:bg-teal-500 text-white font-semibold",
                            onClick: () => a((E) => E + 12),
                            children: "Cargar más productos",
                          }),
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
          n &&
            C("div", {
              className: "fixed inset-0 z-50",
              children: [
                w("div", {
                  className: "absolute inset-0 bg-black/50",
                  onClick: () => r(!1),
                }),
                C("div", {
                  className:
                    "absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl max-h-[70vh] overflow-y-auto",
                  children: [
                    s &&
                      w("p", {
                        className: "p-4",
                        children: "Cargando categorías...",
                      }),
                    l &&
                      w("p", {
                        className: "p-4",
                        children: "Error al cargar categorías.",
                      }),
                    !s && !l && w(p, {}),
                  ],
                }),
              ],
            }),
        ],
      });
    },
    M_ = ut`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      description
      ... on SimpleProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on VariableProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on ExternalProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      ... on GroupProduct {
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`,
    R_ = () => {
      var l, u;
      const { slug: e } = fv(),
        { data: t, loading: n, error: r } = Kn(M_, { variables: { slug: e } }),
        i = t == null ? void 0 : t.product,
        a = [];
      (i != null && i.image && a.push(i.image),
        (u =
          (l = i == null ? void 0 : i.galleryImages) == null
            ? void 0
            : l.nodes) != null &&
          u.length &&
          a.push(...i.galleryImages.nodes));
      const o = typeof window < "u" ? window.location.href : "",
        s =
          i != null && i.name
            ? `Mirá este producto: ${i.name}`
            : "Mirá este producto";
      return C("div", {
        children: [
          C("section", {
            className: "container mx-auto px-4 py-6",
            children: [
              n && w("p", { children: "Cargando producto..." }),
              r && w("p", { children: "Error al cargar el producto." }),
              !n &&
                !r &&
                i &&
                C($o, {
                  children: [
                    C("nav", {
                      className: "text-sm text-gray-500 mb-4",
                      children: [
                        w(_e, {
                          to: "/",
                          className: "hover:underline",
                          children: "Inicio",
                        }),
                        w("span", { className: "mx-2", children: "/" }),
                        w(_e, {
                          to: "/productos",
                          className: "hover:underline",
                          children: "Productos",
                        }),
                        w("span", { className: "mx-2", children: "/" }),
                        w("span", {
                          className: "text-gray-700",
                          children: i.name,
                        }),
                      ],
                    }),
                    C("section", {
                      className:
                        "grid grid-cols-1 md:grid-cols-2 gap-6 items-start",
                      children: [
                        w("div", {
                          children: a[0]
                            ? w("img", {
                                src: a[0].sourceUrl,
                                alt: a[0].altText || i.name,
                                className:
                                  "w-full h-80 md:h-[28rem] object-cover rounded",
                              })
                            : w("div", {
                                className:
                                  "w-full h-80 md:h-[28rem] bg-gray-100 rounded",
                              }),
                        }),
                        C("div", {
                          children: [
                            w("h1", {
                              className:
                                "text-3xl md:text-4xl font-semibold mb-3",
                              children: i.name,
                            }),
                            i.description &&
                              w("div", {
                                className: "mb-6",
                                dangerouslySetInnerHTML: {
                                  __html: i.description,
                                },
                              }),
                            C("div", {
                              className: "flex flex-col gap-3 mb-4",
                              children: [
                                C("button", {
                                  onClick: () =>
                                    window.open(
                                      `https://wa.me/59896238315?text=${encodeURIComponent(`Hola, quiero comprar ${i.name}`)}`,
                                      "_blank",
                                    ),
                                  "aria-label": `Comprar por Whatsapp: ${i.name}`,
                                  className:
                                    "inline-flex items-center gap-3 text-lg md:text-xl bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-3 rounded-md",
                                  children: [
                                    w(Jn, {
                                      className: "text-2xl md:text-3xl",
                                    }),
                                    w("span", {
                                      children: "Comprar por Whatsapp",
                                    }),
                                  ],
                                }),
                                C("div", {
                                  className:
                                    "flex items-center gap-2 text-sm text-gray-700",
                                  children: [
                                    w(jx, { className: "text-lg" }),
                                    w("span", {
                                      children:
                                        "Envíos en el día a todo montevideo y 24Hs al interior del país",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            C("div", {
                              className: "mt-6 bg-gray-100 p-4 rounded",
                              children: [
                                w("div", {
                                  className: "font-semibold mb-2",
                                  children: "Compartelo con tus amigos",
                                }),
                                C("div", {
                                  className: "flex items-center gap-3 text-xl",
                                  children: [
                                    w("a", {
                                      href: `https://www.instagram.com/?url=${encodeURIComponent(o)}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "hover:opacity-80",
                                      "aria-label": "Compartir en Instagram",
                                      children: w(ia, {}),
                                    }),
                                    w("a", {
                                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(o)}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "hover:opacity-80",
                                      "aria-label": "Compartir en Facebook",
                                      children: w(gs, {}),
                                    }),
                                    w("a", {
                                      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(o)}&text=${encodeURIComponent(s)}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "hover:opacity-80",
                                      "aria-label": "Compartir en X",
                                      children: w(Bg, {}),
                                    }),
                                    w("a", {
                                      href: `mailto:?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(o)}`,
                                      className: "hover:opacity-80",
                                      "aria-label": "Compartir por email",
                                      children: w(Bo, {}),
                                    }),
                                    w("a", {
                                      href: `https://wa.me/?text=${encodeURIComponent(s + " " + o)}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "hover:opacity-80",
                                      "aria-label": "Compartir por WhatsApp",
                                      children: w(Jn, {}),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          }),
          w("section", { children: w(ny, {}) }),
        ],
      });
    },
    L_ = ut`
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`,
    F_ = () => {
      var i;
      const { data: e, loading: t, error: n } = Kn(L_),
        r =
          ((i = e == null ? void 0 : e.posts) == null ? void 0 : i.nodes) || [];
      return C("section", {
        className: "container mx-auto px-4 py-12",
        children: [
          w("h1", {
            className: "text-3xl md:text-4xl font-semibold mb-6",
            children: "Blog",
          }),
          t && w("p", { children: "Cargando artículos..." }),
          n && w("p", { children: "Error al cargar artículos." }),
          !t &&
            !n &&
            w("div", {
              className:
                "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
              children: r.map((a) => w(ry, { post: a }, a.id)),
            }),
        ],
      });
    },
    A_ = ut`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`,
    z_ = () => {
      var a, o;
      const { slug: e } = fv(),
        { data: t, loading: n, error: r } = Kn(A_, { variables: { slug: e } }),
        i = t == null ? void 0 : t.post;
      return C("div", {
        className: "w-full",
        children: [
          n &&
            w("p", {
              className: "container mx-auto px-4 py-12",
              children: "Cargando artículo...",
            }),
          r &&
            w("p", {
              className: "container mx-auto px-4 py-12",
              children: "Error al cargar el artículo.",
            }),
          !n &&
            !r &&
            i &&
            C($o, {
              children: [
                C("header", {
                  className: "w-full relative",
                  children: [
                    C("div", {
                      className:
                        "w-full h-[25vh] bg-center bg-cover flex items-end relative overflow-hidden isolate",
                      style: {
                        backgroundImage: `url('${((o = (a = i.featuredImage) == null ? void 0 : a.node) == null ? void 0 : o.sourceUrl) || ""}')`,
                      },
                      children: [
                        w("div", {
                          className:
                            "absolute inset-0 bg-black/40 backdrop-blur-sm",
                          style: { backdropFilter: "blur(4px)" },
                        }),
                        w("div", {
                          className:
                            "relative z-10 container mx-auto px-4 pb-4",
                          children: w("h1", {
                            className:
                              "text-2xl md:text-4xl font-bold text-white",
                            children: i.title,
                          }),
                        }),
                      ],
                    }),
                    w("div", {
                      className: "container mx-auto px-4 mt-5",
                      children: C("div", {
                        className:
                          "max-w-3xl mx-auto p-2 flex items-center justify-between",
                        children: [
                          w("div", {
                            className: "font-semibold",
                            children: "Compartelo con tus amigos",
                          }),
                          C("div", {
                            className:
                              "flex items-center gap-4 text-2xl text-gray-800",
                            children: [
                              w("a", {
                                href: `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "hover:text-primary",
                                children: w(ia, {}),
                              }),
                              w("a", {
                                href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "hover:text-primary",
                                children: w(gs, {}),
                              }),
                              w("a", {
                                href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "hover:text-primary",
                                children: w(Bg, {}),
                              }),
                              w("a", {
                                href: `https://wa.me/?text=${encodeURIComponent(i.title + " " + window.location.href)}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "hover:text-primary",
                                children: w(Jn, {}),
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                w("main", {
                  className: "container mx-auto px-4 mt-5",
                  style: { minHeight: "70vh" },
                  children: w("div", {
                    className:
                      "max-w-3xl mx-auto flex flex-col justify-start h-auto pt-5 pb-[15%]",
                    children: C("div", {
                      className: "prose prose-lg max-w-none",
                      children: [
                        w("div", {
                          className: "text-sm text-gray-500 mb-4",
                          children: new Date(i.date).toLocaleDateString(
                            "es-ES",
                            { day: "2-digit", month: "short", year: "numeric" },
                          ),
                        }),
                        w("div", {
                          dangerouslySetInnerHTML: { __html: i.content },
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
        ],
      });
    },
    j_ = () =>
      C("section", {
        className: "container mx-auto px-4 py-12 text-center",
        children: [
          w("h1", {
            className: "text-3xl md:text-4xl font-semibold mb-4",
            children: "Recetas saludables",
          }),
          w("p", {
            className: "text-lg",
            children:
              "Esta sección está en construcción. ¡Vuelve pronto para ver nuestras recetas saludables!",
          }),
        ],
      }),
    V_ = () => {
      const [e, t] = N.useState(""),
        [n, r] = N.useState(""),
        [i, a] = N.useState(""),
        [o, s] = N.useState("");
      return C("section", {
        className: "container mx-auto px-4 py-12",
        children: [
          w("h1", {
            className: "text-3xl md:text-4xl font-semibold mb-6",
            children: "Contacto",
          }),
          C("form", {
            onSubmit: (u) => {
              u.preventDefault();
              const c = `Hola, soy ${e}. Mi correo es ${n} y mi teléfono es ${i}. ${o}`,
                f = `https://wa.me/59896238315?text=${encodeURIComponent(c)}`;
              (window.open(f, "_blank"), t(""), r(""), a(""), s(""));
            },
            className: "max-w-xl mx-auto space-y-4",
            children: [
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "name",
                    className: "mb-1 font-medium",
                    children: "Nombre",
                  }),
                  w("input", {
                    id: "name",
                    type: "text",
                    value: e,
                    onChange: (u) => t(u.target.value),
                    required: !0,
                    className: "p-2 border rounded",
                  }),
                ],
              }),
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "email",
                    className: "mb-1 font-medium",
                    children: "Email",
                  }),
                  w("input", {
                    id: "email",
                    type: "email",
                    value: n,
                    onChange: (u) => r(u.target.value),
                    required: !0,
                    className: "p-2 border rounded",
                  }),
                ],
              }),
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "phone",
                    className: "mb-1 font-medium",
                    children: "Teléfono",
                  }),
                  w("input", {
                    id: "phone",
                    type: "tel",
                    value: i,
                    onChange: (u) => a(u.target.value),
                    className: "p-2 border rounded",
                  }),
                ],
              }),
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "message",
                    className: "mb-1 font-medium",
                    children: "Mensaje",
                  }),
                  w("textarea", {
                    id: "message",
                    value: o,
                    onChange: (u) => s(u.target.value),
                    required: !0,
                    className: "p-2 border rounded resize-none",
                    rows: 4,
                  }),
                ],
              }),
              w("button", {
                type: "submit",
                className:
                  "btn-glass inline-flex items-center justify-center gap-2",
                children: "Enviar por WhatsApp",
              }),
            ],
          }),
        ],
      });
    },
    B_ = () => {
      const [e, t] = N.useState(""),
        [n, r] = N.useState(""),
        [i, a] = N.useState(""),
        [o, s] = N.useState("");
      return C("section", {
        className: "container mx-auto px-4 py-12",
        children: [
          w("h1", {
            className: "text-3xl md:text-4xl font-semibold mb-6",
            children: "Trabaja con nosotros",
          }),
          w("p", {
            className: "mb-4 text-lg",
            children:
              "Estamos construyendo esta sección, pero podés enviarnos tus datos para contactarte cuando abramos nuevas oportunidades.",
          }),
          C("form", {
            onSubmit: (u) => {
              u.preventDefault();
              const c = `Hola, me gustaría trabajar con CERO Market. Mi nombre es ${e}, correo: ${n}, teléfono: ${i}. ${o}`,
                f = `https://wa.me/59896238315?text=${encodeURIComponent(c)}`;
              (window.open(f, "_blank"), t(""), r(""), a(""), s(""));
            },
            className: "max-w-xl mx-auto space-y-4",
            children: [
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "name",
                    className: "mb-1 font-medium",
                    children: "Nombre",
                  }),
                  w("input", {
                    id: "name",
                    type: "text",
                    value: e,
                    onChange: (u) => t(u.target.value),
                    required: !0,
                    className: "p-2 border rounded",
                  }),
                ],
              }),
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "email",
                    className: "mb-1 font-medium",
                    children: "Email",
                  }),
                  w("input", {
                    id: "email",
                    type: "email",
                    value: n,
                    onChange: (u) => r(u.target.value),
                    required: !0,
                    className: "p-2 border rounded",
                  }),
                ],
              }),
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "phone",
                    className: "mb-1 font-medium",
                    children: "Teléfono",
                  }),
                  w("input", {
                    id: "phone",
                    type: "tel",
                    value: i,
                    onChange: (u) => a(u.target.value),
                    className: "p-2 border rounded",
                  }),
                ],
              }),
              C("div", {
                className: "flex flex-col",
                children: [
                  w("label", {
                    htmlFor: "message",
                    className: "mb-1 font-medium",
                    children: "Mensaje",
                  }),
                  w("textarea", {
                    id: "message",
                    value: o,
                    onChange: (u) => s(u.target.value),
                    required: !0,
                    className: "p-2 border rounded resize-none",
                    rows: 4,
                  }),
                ],
              }),
              w("button", {
                type: "submit",
                className:
                  "btn-glass inline-flex items-center justify-center gap-2",
                children: "Enviar por WhatsApp",
              }),
            ],
          }),
        ],
      });
    },
    U_ = () =>
      C("div", {
        className: "flex flex-col min-h-screen",
        children: [
          w(Qx, {}),
          w("main", {
            className: "flex-1 pt-16",
            children: C(xw, {
              children: [
                w(dt, { path: "/", element: w(C_, {}) }),
                w(dt, { path: "/sobre-nosotros", element: w(O_, {}) }),
                w(dt, { path: "/mision-zero-waste", element: w(N_, {}) }),
                w(dt, { path: "/productos", element: w(D_, {}) }),
                w(dt, { path: "/producto/:slug", element: w(R_, {}) }),
                w(dt, { path: "/blog", element: w(F_, {}) }),
                w(dt, { path: "/blog/:slug", element: w(z_, {}) }),
                w(dt, { path: "/recetas", element: w(j_, {}) }),
                w(dt, { path: "/contacto", element: w(V_, {}) }),
                w(dt, { path: "/trabaja-con-nosotros", element: w(B_, {}) }),
              ],
            }),
          }),
          w($x, {}),
        ],
      });
  class Q_ extends H.Component {
    constructor(t) {
      (super(t), (this.state = { hasError: !1, error: null }));
    }
    static getDerivedStateFromError(t) {
      return { hasError: !0, error: t };
    }
    componentDidCatch(t, n) {
      console.error("ErrorBoundary caught:", t, n);
    }
    render() {
      return this.state.hasError
        ? w("div", {
            className: "min-h-screen flex items-center justify-center p-6",
            children: C("div", {
              className: "max-w-xl text-center bg-white p-6 rounded shadow",
              children: [
                w("h2", {
                  className: "text-xl font-semibold mb-2",
                  children: "Ha ocurrido un error en la aplicación",
                }),
                w("pre", {
                  className:
                    "text-sm text-left overflow-auto max-h-48 bg-gray-50 p-2 rounded",
                  children: String(
                    this.state.error &&
                      (this.state.error.stack || this.state.error.message),
                  ),
                }),
                w("p", {
                  className: "mt-4 text-sm text-gray-600",
                  children: "Revisa la consola para más detalles.",
                }),
              ],
            }),
          })
        : this.props.children;
    }
  }
  const $_ = new Og({
    uri: "https://api.ceromarket.com.uy/graphql",
    cache: new kg(),
  });
  ml.createRoot(document.getElementById("root")).render(
    w(H.StrictMode, {
      children: w(ux, {
        client: $_,
        children: w(Nw, { children: w(Q_, { children: w(U_, {}) }) }),
      }),
    }),
  );
});
export default q_();
