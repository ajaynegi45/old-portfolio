!(function () {
    "use strict";
    const t = "undefined" == typeof window;
    function e(t, e) {
      let n = 0;
      return function (...r) {
        const i = new Date().getTime();
        if (!(i - n < t)) return (n = i), e(...r);
      };
    }
    function n(t) {
      return Math.floor(t.reduce((t, e) => t + e, 0) / t.length);
    }
    const r = new (class {
      constructor() {
        t ||
          ((this.lastX = 0),
          (this.lastY = 0),
          (this.lastWidth = window.innerWidth),
          (this.lastHeight = window.innerHeight),
          (this.lastMouseX = 0),
          (this.lastMouseY = 0),
          (this.lastWindowX = window.screenX),
          (this.lastWindowY = window.screenY),
          (this.lastAlpha = 0),
          (this.lastBeta = 0),
          (this.lastGamma = 0),
          (this.currAlpha = 0),
          (this.currBeta = 0),
          (this.currGamma = 0),
          (this.scrollHeight = document.body.scrollHeight),
          (this.scrollChange = !1),
          (this.sizeChange = !1),
          (this.mouseChange = !1),
          (this.positionChange = !1),
          (this.orientationChange = !1),
          (this.devicePixelRatioChange = !1),
          (this.currX = 0),
          (this.currY = 0),
          (this.currWidth = window.innerWidth),
          (this.currHeight = window.innerHeight),
          (this.currMouseX = 0),
          (this.currMouseY = 0),
          (this.currWindowX = 0),
          (this.currDevicePixelRatio = this.lastDevicePixelRatio =
            Math.max(window.devicePixelRatio || 1, 1)),
          (this.mouseXVelocity = []),
          (this.mouseYVelocity = []),
          (this.lastMouseXVelocity = 0),
          (this.lastMouseYVelocity = 0),
          (this.windowXVelocity = []),
          (this.windowYVelocity = []),
          (this.lastWindowXVelocity = 0),
          (this.lastWindowYVelocity = 0),
          (this.updating = !1),
          (this.callbacks = []),
          (this.update = this.update.bind(this)),
          (this.handleResize = this.handleResize.bind(this)),
          (this.handleMouse = this.handleMouse.bind(this)),
          (this.handleOrientation = this.handleOrientation.bind(this)),
          (this.recalibrateOrientation = this.recalibrateOrientation.bind(this)),
          (this.formatData = this.formatData.bind(this)),
          (this.watch = this.watch.bind(this)),
          (this.unwatch = this.unwatch.bind(this)),
          (this.handleResize = e(110, this.handleResize)),
          (this.handleMouse = e(75, this.handleMouse)),
          window.addEventListener("resize", this.handleResize),
          window.addEventListener("mousemove", this.handleMouse),
          window.addEventListener("deviceorientation", this.handleOrientation),
          requestAnimationFrame(this.update));
      }
      handleResize(t) {
        (this.currWidth = window.innerWidth),
          (this.currHeight = window.innerHeight);
      }
      handleMouse(t) {
        (this.currMouseX = t.clientX), (this.currMouseY = t.clientY);
      }
      handleOrientation(t) {
        this.initialAlpha || (this.initialAlpha = t.alpha),
          this.initialBeta || (this.initialBeta = t.beta),
          this.initialGamma || (this.initialGamma = t.gamma),
          (this.currAlpha = t.alpha),
          (this.currBeta = t.beta),
          (this.currGamma = t.gamma);
      }
      recalibrateOrientation() {
        const t = {
          prev: {
            alpha: this.initialAlpha,
            beta: this.initialBeta,
            gamma: this.initialGamma,
          },
        };
        return (
          (this.initialAlpha = this.lastAlpha),
          (this.initialBeta = this.lastBeta),
          (this.initialGamma = this.lastGamma),
          (t.current = {
            alpha: this.initialAlpha,
            beta: this.initialBeta,
            gamma: this.initialGamma,
          }),
          t
        );
      }
      formatData() {
        return {
          scroll: {
            changed: this.scrollChange,
            left: Math.floor(this.lastX),
            right: Math.floor(this.lastX + this.lastWidth),
            top: Math.floor(this.lastY),
            bottom: Math.floor(this.lastY + this.lastHeight),
            velocity: {
              x: Math.floor(this.scrollXVelocity) || 0,
              y: Math.floor(this.scrollYVelocity) || 0,
            },
          },
          size: {
            changed: this.sizeChange,
            x: Math.floor(this.lastWidth),
            y: Math.floor(this.lastHeight),
            docY: Math.floor(this.scrollHeight),
          },
          mouse: {
            changed: this.mouseChange,
            x: Math.floor(this.lastMouseX),
            y: Math.floor(this.lastMouseY),
            velocity: {
              x: Math.floor(this.lastMouseXVelocity) || 0,
              y: Math.floor(this.lastMouseYVelocity) || 0,
            },
          },
          position: {
            changed: this.positionChange,
            left: Math.floor(this.lastWindowX),
            right: Math.floor(this.lastWindowX + this.lastWidth),
            top: Math.floor(this.lastWindowY),
            bottom: Math.floor(this.lastWindowY + this.lastHeight),
            velocity: {
              x: Math.floor(this.lastWindowXVelocity) || 0,
              y: Math.floor(this.lastWindowYVelocity) || 0,
            },
          },
          orientation: {
            changed: this.orientationChange,
            alpha: Math.floor(this.lastAlpha - this.initialAlpha) || 0,
            beta: Math.floor(this.lastBeta - this.initialBeta) || 0,
            gamma: Math.floor(this.lastGamma - this.initialGamma) || 0,
          },
          devicePixelRatio: {
            changed: this.devicePixelRatioChange,
            ratio: this.currDevicePixelRatio,
          },
        };
      }
      update() {
        const {
          currWidth: t,
          currHeight: e,
          currMouseX: r,
          currMouseY: i,
          currAlpha: o,
          currBeta: a,
          currGamma: s,
          currDevicePixelRatio: c,
        } = this;
        if (this.updating) return !1;
        (this.scrollChange =
          this.sizeChange =
          this.mouseChange =
          this.positionChange =
          this.orientationChange =
          this.devicePixelRatioChange =
            !1),
          this.windowXVelocity.length > 5 && this.windowXVelocity.shift(),
          this.windowXVelocity.push(window.screenX - this.lastWindowX),
          n(this.windowXVelocity) != this.lastWindowXVelocity &&
            ((this.lastWindowXVelocity = n(this.windowXVelocity)),
            (this.positionChange = !0)),
          window.screenX != this.lastWindowX &&
            ((this.positionChange = !0), (this.lastWindowX = window.screenX)),
          this.windowYVelocity.length > 5 && this.windowYVelocity.shift(),
          this.windowYVelocity.push(window.screenY - this.lastWindowY),
          n(this.windowYVelocity) != this.lastWindowYVelocity &&
            ((this.lastWindowYVelocity = n(this.windowYVelocity)),
            (this.positionChange = !0)),
          window.screenY != this.lastWindowY &&
            ((this.positionChange = !0), (this.lastWindowY = window.screenY)),
          window.pageXOffset == this.lastX &&
            0 != this.scrollXVelocity &&
            ((this.scrollXVelocity = 0), (this.scrollChange = !0)),
          window.pageYOffset == this.lastY &&
            0 != this.scrollYVelocity &&
            ((this.scrollYVelocity = 0), (this.scrollChange = !0)),
          window.pageXOffset != this.lastX &&
            ((this.scrollChange = !0),
            (this.scrollXVelocity = Math.floor(window.pageXOffset - this.lastX)),
            (this.lastX = window.pageXOffset)),
          window.pageYOffset != this.lastY &&
            ((this.scrollChange = !0),
            (this.scrollYVelocity = Math.floor(window.pageYOffset - this.lastY)),
            (this.lastY = window.pageYOffset)),
          t != this.lastWidth &&
            ((this.lastWidth = t),
            (this.scrollHeight = document.body.scrollHeight),
            (this.sizeChange = !0)),
          e != this.lastHeight && ((this.lastHeight = e), (this.sizeChange = !0)),
          this.mouseXVelocity.length > 5 && this.mouseXVelocity.shift(),
          this.mouseXVelocity.push(r - this.lastMouseX),
          n(this.mouseXVelocity) != this.lastMouseXVelocity &&
            ((this.lastMouseXVelocity = n(this.mouseXVelocity)),
            (this.mouseChange = !0)),
          r != this.lastMouseX &&
            ((this.lastMouseX = r), (this.mouseChange = !0)),
          this.mouseYVelocity.length > 5 && this.mouseYVelocity.shift(),
          this.mouseYVelocity.push(i - this.lastMouseY),
          n(this.mouseYVelocity) != this.lastMouseYVelocity &&
            ((this.lastMouseYVelocity = n(this.mouseYVelocity)),
            (this.mouseChange = !0)),
          (i == this.lastMouseY && 0 == n(this.mouseYVelocity)) ||
            ((this.lastMouseY = i), (this.mouseChange = !0)),
          o != this.lastAlpha &&
            ((this.lastAlpha = o), (this.orientationChange = !0)),
          a != this.lastBeta &&
            ((this.lastBeta = a), (this.orientationChange = !0)),
          s != this.lastGamma &&
            ((this.lastGamma = s), (this.orientationChange = !0)),
          (this.positionChange || this.sizeChange) &&
            ((this.currDevicePixelRatio = Math.max(
              window.devicePixelRatio || 1,
              1
            )),
            this.currDevicePixelRatio !== this.lastDevicePixelRatio &&
              ((this.devicePixelRatioChange = !0),
              (this.lastDevicePixelRatio = this.currDevicePixelRatio))),
          (this.scrollChange ||
            this.sizeChange ||
            this.mouseChange ||
            this.positionChange ||
            this.orientationChange ||
            this.devicePixelRatioChange) &&
            this.callbacks.forEach((t) => t(this.formatData())),
          (this.updating = !1),
          requestAnimationFrame(this.update);
      }
      watch(e, n = !0) {
        if ("function" != typeof e)
          throw new Error("Value passed to Watch is not a function");
        if (!t) {
          if (n) {
            const t = this.formatData();
            (t.scroll.changed = !0),
              (t.mouse.changed = !0),
              (t.size.changed = !0),
              (t.position.changed = !0),
              (t.orientation.changed = !0),
              (t.devicePixelRatio.changed = !0),
              e(t);
          }
          this.callbacks.push(e);
        }
      }
      unwatch(e) {
        if ("function" != typeof e)
          throw new Error("The value passed to unwatch is not a function");
        t || (this.callbacks = this.callbacks.filter((t) => t !== e));
      }
    })();
    t ||
      (window.__TORNIS = {
        watchViewport: r.watch,
        unwatchViewport: r.unwatch,
        getViewportState: r.formatData,
        recalibrateOrientation: r.recalibrateOrientation,
      });
    const i = r.watch,
      o = r.unwatch,
      a = (t) => ("/" == t ? t : t.replace(/\/$/g, "")),
      s = (t) => {
        if ("string" != typeof t || !t)
          throw new Error("Value passed must be a string");
        let e;
        e =
          "/" == t.substr(0, 1)
            ? t
            : "?" == t.substr(0, 1)
            ? `${window.location.pathname.replace(/\/$/, "")}/${t}`
            : "#" == t.substr(0, 1)
            ? window.location.pathname + window.location.search + t
            : `${window.location.pathname.replace(/\/$/, "")}/${t}`;
        let [n, r] = e.split("#"),
          [i, o] = n.split("?");
        const s = o
          ? o.split("&").reduce((t, e) => {
              const [n, r] = e.split("=");
              return { ...t, [n]: r };
            }, {})
          : {};
        return { path: a(i), hash: r ? `#${r}` : null, params: s };
      },
      c = (t) => {
        try {
          let e = "*" != t.substr(-1),
            n = t.replace(/(\*)|(\/)$/g, "");
          return e ? new RegExp(`^${n}(\\/)?$`) : new RegExp(`^${n}`);
        } catch (t) {
          throw new Error("Path is not in the correct format");
        }
      };
    var u = new (class {
      constructor(t) {
        const e = {
          initPathData: {},
          registeredPaths: [],
          scrollRestoration: "manual",
          ...t,
        };
        (history.scrollRestoration = e.scrollRestoration),
          (this._callbacks = []),
          (this._prevURL = {}),
          (this._currentURL = {}),
          (this._pathData = {}),
          (this._registeredPaths = []),
          (this.push = this.push.bind(this)),
          (this.registerPath = this.registerPath.bind(this)),
          (this.getCurrentState = this.getCurrentState.bind(this)),
          (this.watch = this.watch.bind(this)),
          (this.unwatch = this.unwatch.bind(this)),
          (this._handlePop = this._handlePop.bind(this)),
          (this._updatePathData = this._updatePathData.bind(this)),
          (this._updatePosition = this._updatePosition.bind(this)),
          (this._didHashChange = this._didHashChange.bind(this)),
          (this._mergeRegisteredData = this._mergeRegisteredData.bind(this)),
          e.registeredPaths.length &&
            e.registeredPaths.forEach((t) => {
              const { path: e, data: n } = t;
              this.registerPath(e, n);
            });
        const n = `${window.location.pathname}${window.location.hash}${window.location.search}`,
          { path: r, hash: i, params: o } = s(n);
        this._updatePosition(r, i, o),
          this._updatePathData(r, e.initPathData),
          window.addEventListener("popstate", this._handlePop);
      }
      _updatePosition(t, e, n) {
        if (
          ((this._prevURL = this._currentURL),
          (this._currentURL = { path: a(t), hash: e, params: n }),
          this._prevURL.path == this._currentURL.path)
        ) {
          if (this._didHashChange() && !this._didParamsChange()) return "HASH";
          if (!this._didHashChange() && this._didParamsChange()) return "PARAMS";
          if (this._didHashChange() && this._didParamsChange())
            return "HASHPARAMS";
          if (!this._didHashChange() && !this._didParamsChange())
            return "NOCHANGE";
        }
      }
      _updatePathData(t, e) {
        const n = a(t);
        return (this._pathData = { ...this._pathData, [n]: e }), this._pathData;
      }
      _mergeRegisteredData(t) {
        return {
          ...this._registeredPaths.reduce(
            (e, n) => (n.regex.test(t) ? { ...e, ...n.data } : e),
            {}
          ),
          ...this._pathData[t],
        };
      }
      push(t, e) {
        const { path: n, hash: r, params: i } = s(t);
        this._updatePathData(n, e || {});
        let o = this._updatePosition(n, r, i);
        (o = o || "PUSH"),
          history.pushState(null, null, t),
          this._callbacks.forEach((t) =>
            t({ ...this.getCurrentState(), action: o })
          );
      }
      _handlePop(t) {
        const e = `${window.location.pathname}${window.location.search}${window.location.hash}`,
          { path: n, hash: r, params: i } = s(e);
        let o = this._updatePosition(n, r, i);
        (o = o || "POP"),
          this._callbacks.forEach((t) =>
            t({ ...this.getCurrentState(), action: o })
          );
      }
      _didHashChange() {
        return (
          this._currentURL.path == this._prevURL.path &&
          this._currentURL.hash != this._prevURL.hash
        );
      }
      _didParamsChange() {
        return (
          this._currentURL.path == this._prevURL.path &&
          ((t = this._currentURL.params),
          (e = this._prevURL.params),
          !(
            Object.keys(t).every((n) => n in e && t[n] === e[n]) &&
            Object.keys(e).every((n) => n in t && t[n] === e[n])
          ))
        );
        var t, e;
      }
      getCurrentState() {
        return {
          incoming: {
            path: this._currentURL.path,
            hash: this._currentURL.hash,
            params: this._currentURL.params,
            data: this._mergeRegisteredData(this._currentURL.path),
          },
          outgoing: {
            path: this._prevURL.path,
            hash: this._prevURL.hash,
            params: this._prevURL.params,
            data: this._mergeRegisteredData(this._prevURL.path),
          },
        };
      }
      registerPath(t, e) {
        return (
          (this._registeredPaths = [
            ...this._registeredPaths,
            { path: t, regex: c(t), data: e },
          ]),
          this._registeredPaths
        );
      }
      watch(t) {
        if ("function" != typeof t)
          throw new Error("Value passed to Watch is not a function");
        this._callbacks.push(t);
      }
      unwatch(t) {
        if ("function" != typeof t)
          throw new Error("The value passed to unwatch is not a function");
        this._callbacks = this._callbacks.filter((e) => e !== t);
      }
    })();
    function l(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function h(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    function d(t, e, n) {
      return e && h(t.prototype, e), n && h(t, n), t;
    }
    function f(t, e, n) {
      return (
        e in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    function p(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function m(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t)))
            return;
          var n = [],
            r = !0,
            i = !1,
            o = void 0;
          try {
            for (
              var a, s = t[Symbol.iterator]();
              !(r = (a = s.next()).done) &&
              (n.push(a.value), !e || n.length !== e);
              r = !0
            );
          } catch (t) {
            (i = !0), (o = t);
          } finally {
            try {
              r || null == s.return || s.return();
            } finally {
              if (i) throw o;
            }
          }
          return n;
        })(t, e) ||
        v(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function g(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return y(t);
        })(t) ||
        (function (t) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
            return Array.from(t);
        })(t) ||
        v(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function v(t, e) {
      if (t) {
        if ("string" == typeof t) return y(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? y(t, e)
            : void 0
        );
      }
    }
    function y(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    var w = function () {
      g(document.querySelectorAll(".reveal-img")).forEach(function (t) {
        new IntersectionObserver(
          function (e, n) {
            e.forEach(function (e) {
              e.intersectionRatio > 0 &&
                (!(function (t) {
                  var e = t.querySelector("img");
                  t.classList.add("is-ready"),
                    (e.onload = function () {
                      return (function (t) {
                        t.classList.add("is-active"),
                          t.classList.remove("is-ready");
                      })(t);
                    }),
                    setTimeout(function () {
                      e.setAttribute("src", t.dataset.src);
                    }, 500);
                })(t),
                n.unobserve(e.target));
            });
          },
          { rootMargin: "-100px", threshold: 0.35 }
        ).observe(t);
      });
    };
    var b = "loading--in",
      x = new ((function () {
        function t() {
          l(this, t),
            (this.openLoader = this.openLoader.bind(this)),
            (this.closeLoader = this.closeLoader.bind(this)),
            this.openTimeout,
            this.closeTimeout,
            (this.loaderEl = document.querySelector(".loading")),
            this.loaderEl &&
              ((this.loaderMask = this.loaderEl.querySelector(".loading__mask")),
              document.querySelector("html").classList.add("is-loading"));
        }
        return (
          d(t, [
            {
              key: "openLoader",
              value: function (t) {
                this.loaderMask &&
                  (this.loaderEl.classList.remove("loading--out"),
                  this.loaderEl.classList.add(b),
                  document.querySelector("html").classList.remove("is-loading"),
                  clearTimeout(this.openTimeout),
                  clearTimeout(this.closeTimeout),
                  (this.openTimeout = setTimeout(function () {
                    "function" == typeof t && t();
                  }, 500)));
              },
            },
            {
              key: "closeLoader",
              value: function (t) {
                var e = this;
                this.loaderMask &&
                  this.loaderEl.classList.contains(b) &&
                  (this.loaderEl.classList.remove(b),
                  this.loaderEl.classList.add("loading--out"),
                  document.querySelector("html").classList.remove("is-loading"),
                  clearTimeout(this.openTimeout),
                  clearTimeout(this.closeTimeout),
                  (this.closeTimeout = setTimeout(function () {
                    "function" == typeof t && t(),
                      e.loaderEl.classList.remove("loading--out"),
                      e.loaderEl.classList.remove(b);
                  }, 500)));
              },
            },
          ]),
          t
        );
      })())(),
      M = x.openLoader,
      S = x.closeLoader,
      O = {
        skirrid:
          '\n    <div class="logo__skirrid">\n      <div class="shade" data-drift="-5 -10">\n        <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256">\n          <polygon class="filled-poly" points="156.2,91.5 112.7,146.5 89,116.5 33.2,187 80.7,187 144.8,187 231.8,187"/>\n        </svg>\n      </div>\n      <div class="logo">\n        <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256">\n          <polygon class="stroke-poly" points="84,106.5 28.2,177 139.8,177 " />\n          <polygon class="stroke-poly" points="151.2,81.5 75.7,177 226.8,177 "/>\n        </svg>\n      </div>\n    </div>',
        sugarloaf:
          '\n    <div class="logo__sugarloaf">\n      <div class="shade" data-drift="-5 -10">\n        <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256">\n          <polygon class="filled-poly" points="137.6,67.7 38.5,193 236.8,193 " />\n        </svg>\n      </div>\n      <div class="logo">\n        <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256">\n          <polygon class="stroke-poly" points="105.2,79.7 28.2,177 182.2,177 " />\n          <polygon class="stroke-poly" points="127.6,51.7 28.5,177 226.8,177 " />\n        </svg>\n      </div>\n    </div>',
        blorenge:
          '\n    <div class="logo__blorenge">\n      <div class="shade" data-drift="-10 -10">\n        <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256">\n          <polygon class="filled-poly" points="172,110 98,110 36.2,188 110.2,188 159.7,188 233.7,188 " />\n        </svg>\n      </div>\n      <div class="logo">\n        <svg version="1.1" x="0px" y="0px" viewBox="0 0 256 256">\n          <polygon class="stroke-poly" points="90,99 28.2,177 151.7,177 " />\n          <polygon class="stroke-poly" points="164,99 102.2,177 225.7,177 " />\n          <line class="stroke-poly" x1="90" y1="99" x2="163.8" y2="99" />\n        </svg>\n      </div>\n    </div>',
      },
      _ = function () {
        var t = document.querySelector(".js-logo");
        if (t) {
          for (; t.firstChild; ) t.removeChild(t.firstChild);
          t.innerHTML =
            O[
              ["skirrid", "sugarloaf", "blorenge"][Math.floor(3 * Math.random())]
            ];
        }
      },
      C = function (t, e) {
        return (C =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (t, e) {
              t.__proto__ = e;
            }) ||
          function (t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          })(t, e);
      };
    var A = function () {
      return (A =
        Object.assign ||
        function (t) {
          for (var e, n = 1, r = arguments.length; n < r; n++)
            for (var i in (e = arguments[n]))
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
          return t;
        }).apply(this, arguments);
    };
    function L(t, e) {
      var n = {};
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) &&
          e.indexOf(r) < 0 &&
          (n[r] = t[r]);
      if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
        var i = 0;
        for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
          e.indexOf(r[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
            (n[r[i]] = t[r[i]]);
      }
      return n;
    }
    function P() {
      for (var t = 0, e = 0, n = arguments.length; e < n; e++)
        t += arguments[e].length;
      var r = Array(t),
        i = 0;
      for (e = 0; e < n; e++)
        for (var o = arguments[e], a = 0, s = o.length; a < s; a++, i++)
          r[i] = o[a];
      return r;
    }
    var Y = function () {
        return (Y =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      R = function (t, e) {
        return function (n) {
          return Math.max(Math.min(n, e), t);
        };
      },
      E = function (t) {
        return t % 1 ? Number(t.toFixed(5)) : t;
      },
      X = /(-)?(\d[\d\.]*)/g,
      k =
        /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,
      q =
        /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))$/i,
      V = {
        test: function (t) {
          return "number" == typeof t;
        },
        parse: parseFloat,
        transform: function (t) {
          return t;
        },
      },
      T = Y(Y({}, V), { transform: R(0, 1) }),
      j = Y(Y({}, V), { default: 1 }),
      W = function (t) {
        return {
          test: function (e) {
            return (
              "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length
            );
          },
          parse: parseFloat,
          transform: function (e) {
            return "" + e + t;
          },
        };
      },
      D = W("deg"),
      H = W("%"),
      B = W("px"),
      z = W("vh"),
      U = W("vw"),
      $ = Y(Y({}, H), {
        parse: function (t) {
          return H.parse(t) / 100;
        },
        transform: function (t) {
          return H.transform(100 * t);
        },
      }),
      G = R(0, 255),
      F = function (t) {
        return void 0 !== t.red;
      },
      I = function (t) {
        return void 0 !== t.hue;
      },
      N = function (t) {
        return function (e) {
          if ("string" != typeof e) return e;
          for (
            var n,
              r = {},
              i = ((n = e),
              n.substring(n.indexOf("(") + 1, n.lastIndexOf(")"))).split(/,\s*/),
              o = 0;
            o < 4;
            o++
          )
            r[t[o]] = void 0 !== i[o] ? parseFloat(i[o]) : 1;
          return r;
        };
      },
      Z = Y(Y({}, V), {
        transform: function (t) {
          return Math.round(G(t));
        },
      });
    function K(t, e) {
      return t.startsWith(e) && q.test(t);
    }
    var J,
      Q = {
        test: function (t) {
          return "string" == typeof t ? K(t, "rgb") : F(t);
        },
        parse: N(["red", "green", "blue", "alpha"]),
        transform: function (t) {
          var e = t.red,
            n = t.green,
            r = t.blue,
            i = t.alpha,
            o = void 0 === i ? 1 : i;
          return (function (t) {
            var e = t.red,
              n = t.green,
              r = t.blue,
              i = t.alpha;
            return (
              "rgba(" +
              e +
              ", " +
              n +
              ", " +
              r +
              ", " +
              (void 0 === i ? 1 : i) +
              ")"
            );
          })({
            red: Z.transform(e),
            green: Z.transform(n),
            blue: Z.transform(r),
            alpha: E(T.transform(o)),
          });
        },
      },
      tt = {
        test: function (t) {
          return "string" == typeof t ? K(t, "hsl") : I(t);
        },
        parse: N(["hue", "saturation", "lightness", "alpha"]),
        transform: function (t) {
          var e = t.hue,
            n = t.saturation,
            r = t.lightness,
            i = t.alpha,
            o = void 0 === i ? 1 : i;
          return (function (t) {
            var e = t.hue,
              n = t.saturation,
              r = t.lightness,
              i = t.alpha;
            return (
              "hsla(" +
              e +
              ", " +
              n +
              ", " +
              r +
              ", " +
              (void 0 === i ? 1 : i) +
              ")"
            );
          })({
            hue: Math.round(e),
            saturation: H.transform(E(n)),
            lightness: H.transform(E(r)),
            alpha: E(T.transform(o)),
          });
        },
      },
      et = Y(Y({}, Q), {
        test: function (t) {
          return "string" == typeof t && K(t, "#");
        },
        parse: function (t) {
          var e = "",
            n = "",
            r = "";
          return (
            t.length > 4
              ? ((e = t.substr(1, 2)), (n = t.substr(3, 2)), (r = t.substr(5, 2)))
              : ((e = t.substr(1, 1)),
                (n = t.substr(2, 1)),
                (r = t.substr(3, 1)),
                (e += e),
                (n += n),
                (r += r)),
            {
              red: parseInt(e, 16),
              green: parseInt(n, 16),
              blue: parseInt(r, 16),
              alpha: 1,
            }
          );
        },
      }),
      nt = {
        test: function (t) {
          return ("string" == typeof t && q.test(t)) || F(t) || I(t);
        },
        parse: function (t) {
          return Q.test(t)
            ? Q.parse(t)
            : tt.test(t)
            ? tt.parse(t)
            : et.test(t)
            ? et.parse(t)
            : t;
        },
        transform: function (t) {
          return F(t) ? Q.transform(t) : I(t) ? tt.transform(t) : t;
        },
      },
      rt = function (t) {
        return "number" == typeof t ? 0 : t;
      },
      it = {
        test: function (t) {
          if ("string" != typeof t || !isNaN(t)) return !1;
          var e = 0,
            n = t.match(X),
            r = t.match(k);
          return n && (e += n.length), r && (e += r.length), e > 0;
        },
        parse: function (t) {
          var e = t,
            n = [],
            r = e.match(k);
          r && ((e = e.replace(k, "${c}")), n.push.apply(n, r.map(nt.parse)));
          var i = e.match(X);
          return i && n.push.apply(n, i.map(V.parse)), n;
        },
        createTransformer: function (t) {
          var e = t,
            n = 0,
            r = t.match(k),
            i = r ? r.length : 0;
          if (r) for (var o = 0; o < i; o++) (e = e.replace(r[o], "${c}")), n++;
          var a = e.match(X),
            s = a ? a.length : 0;
          if (a) for (o = 0; o < s; o++) (e = e.replace(a[o], "${n}")), n++;
          return function (t) {
            for (var r = e, o = 0; o < n; o++)
              r = r.replace(
                o < i ? "${c}" : "${n}",
                o < i ? nt.transform(t[o]) : E(t[o])
              );
            return r;
          };
        },
        getAnimatableNone: function (t) {
          var e = it.parse(t);
          return it.createTransformer(t)(e.map(rt));
        },
      },
      ot = 0,
      at =
        "undefined" != typeof window && void 0 !== window.requestAnimationFrame
          ? function (t) {
              return window.requestAnimationFrame(t);
            }
          : function (t) {
              var e = Date.now(),
                n = Math.max(0, 16.7 - (e - ot));
              (ot = e + n),
                setTimeout(function () {
                  return t(ot);
                }, n);
            };
    !(function (t) {
      (t.Read = "read"),
        (t.Update = "update"),
        (t.Render = "render"),
        (t.PostRender = "postRender"),
        (t.FixedUpdate = "fixedUpdate");
    })(J || (J = {}));
    var st,
      ct = (1 / 60) * 1e3,
      ut = !0,
      lt = !1,
      ht = !1,
      dt = { delta: 0, timestamp: 0 },
      ft = [J.Read, J.Update, J.Render, J.PostRender],
      pt = function (t) {
        return (lt = t);
      },
      mt = ft.reduce(
        function (t, e) {
          var n = (function (t) {
            var e = [],
              n = [],
              r = 0,
              i = !1,
              o = 0,
              a = new WeakSet(),
              s = new WeakSet(),
              c = {
                cancel: function (t) {
                  var e = n.indexOf(t);
                  a.add(t), -1 !== e && n.splice(e, 1);
                },
                process: function (u) {
                  var l, h;
                  if (
                    ((i = !0),
                    (e = (l = [n, e])[0]),
                    ((n = l[1]).length = 0),
                    (r = e.length))
                  )
                    for (o = 0; o < r; o++)
                      (h = e[o])(u),
                        !0 !== s.has(h) || a.has(h) || (c.schedule(h), t(!0));
                  i = !1;
                },
                schedule: function (t, o, c) {
                  void 0 === o && (o = !1), void 0 === c && (c = !1);
                  var u = c && i,
                    l = u ? e : n;
                  a.delete(t),
                    o && s.add(t),
                    -1 === l.indexOf(t) && (l.push(t), u && (r = e.length));
                },
              };
            return c;
          })(pt);
          return (
            (t.sync[e] = function (t, e, r) {
              return (
                void 0 === e && (e = !1),
                void 0 === r && (r = !1),
                lt || xt(),
                n.schedule(t, e, r),
                t
              );
            }),
            (t.cancelSync[e] = function (t) {
              return n.cancel(t);
            }),
            (t.steps[e] = n),
            t
          );
        },
        { steps: {}, sync: {}, cancelSync: {} }
      ),
      gt = mt.steps,
      vt = mt.sync,
      yt = mt.cancelSync,
      wt = function (t) {
        return gt[t].process(dt);
      },
      bt = function (t) {
        (lt = !1),
          (dt.delta = ut ? ct : Math.max(Math.min(t - dt.timestamp, 40), 1)),
          ut || (ct = dt.delta),
          (dt.timestamp = t),
          (ht = !0),
          ft.forEach(wt),
          (ht = !1),
          lt && ((ut = !1), at(bt));
      },
      xt = function () {
        (lt = !0), (ut = !0), ht || at(bt);
      },
      Mt = function (t) {
        return function (e) {
          return 1 - t(1 - e);
        };
      },
      St = Mt,
      Ot = function (t) {
        return t;
      },
      _t = Mt(
        (function (t) {
          return function (e) {
            return Math.pow(e, t);
          };
        })(2)
      ),
      Ct =
        ((st = function (t, e, n) {
          return Math.min(Math.max(n, t), e);
        }),
        function (t, e, n) {
          return void 0 !== n
            ? st(t, e, n)
            : function (n) {
                return st(t, e, n);
              };
        }),
      At = function (t, e, n) {
        return -n * t + n * e + t;
      },
      Lt = function () {
        return (Lt =
          Object.assign ||
          function (t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
              for (var i in (e = arguments[n]))
                Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }).apply(this, arguments);
      },
      Pt = function (t, e, n) {
        var r = t * t,
          i = e * e;
        return Math.sqrt(Math.max(0, n * (i - r) + r));
      },
      Yt = [et, Q, tt],
      Rt = function (t) {
        return Yt.find(function (e) {
          return e.test(t);
        });
      },
      Et = function (t, e) {
        var n = Rt(t),
          r = Rt(e);
        n.transform, r.transform;
        var i = n.parse(t),
          o = r.parse(e),
          a = Lt({}, i),
          s = n === tt ? At : Pt;
        return function (t) {
          for (var e in a) "alpha" !== e && (a[e] = s(i[e], o[e], t));
          return (a.alpha = At(i.alpha, o.alpha, t)), n.transform(a);
        };
      },
      Xt = function (t, e) {
        return function (n) {
          return e(t(n));
        };
      },
      kt = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return t.reduce(Xt);
      };
    var qt = function (t, e) {
      var n = t.slice(),
        r = n.length,
        i = t.map(function (t, n) {
          return (
            (r = t),
            (i = e[n]),
            "number" == typeof r
              ? function (t) {
                  return At(r, i, t);
                }
              : nt.test(r)
              ? Et(r, i)
              : jt(r, i)
          );
          var r, i;
        });
      return function (t) {
        for (var e = 0; e < r; e++) n[e] = i[e](t);
        return n;
      };
    };
    function Vt(t) {
      for (
        var e = it.parse(t), n = e.length, r = 0, i = 0, o = 0, a = 0;
        a < n;
        a++
      )
        r || "number" == typeof e[a] ? r++ : void 0 !== e[a].hue ? o++ : i++;
      return { parsed: e, numNumbers: r, numRGB: i, numHSL: o };
    }
    var Tt,
      jt = function (t, e) {
        var n = it.createTransformer(e),
          r = Vt(t),
          i = Vt(e);
        return kt(qt(r.parsed, i.parsed), n);
      },
      Wt =
        (Ct(0, 1),
        function (t) {
          var e = t.onRead,
            n = t.onRender,
            r = t.uncachedValues,
            i = void 0 === r ? new Set() : r,
            o = t.useCache,
            a = void 0 === o || o;
          return function (t) {
            void 0 === t && (t = {});
            var r = L(t, []),
              o = {},
              s = [],
              c = !1;
            function u(t, e) {
              t.startsWith("--") && (r.hasCSSVariable = !0);
              var n = o[t];
              (o[t] = e),
                o[t] !== n &&
                  (-1 === s.indexOf(t) && s.push(t),
                  c || ((c = !0), vt.render(l.render)));
            }
            var l = {
              get: function (t, n) {
                return (
                  void 0 === n && (n = !1),
                  !n && a && !i.has(t) && void 0 !== o[t] ? o[t] : e(t, r)
                );
              },
              set: function (t, e) {
                if ("string" == typeof t) u(t, e);
                else for (var n in t) u(n, t[n]);
                return this;
              },
              render: function (t) {
                return (
                  void 0 === t && (t = !1),
                  (c || !0 === t) && (n(o, r, s), (c = !1), (s.length = 0)),
                  this
                );
              },
            };
            return l;
          };
        }),
      Dt = /([a-z])([A-Z])/g,
      Ht = function (t) {
        return t.replace(Dt, "$1-$2").toLowerCase();
      },
      Bt = new Map(),
      zt = new Map(),
      Ut = ["Webkit", "Moz", "O", "ms", ""],
      $t = Ut.length,
      Gt = "undefined" != typeof document,
      Ft = function (t, e) {
        return zt.set(t, Ht(e));
      },
      It = function (t, e) {
        void 0 === e && (e = !1);
        var n = e ? zt : Bt;
        return (
          n.has(t) ||
            (Gt
              ? (function (t) {
                  Tt = Tt || document.createElement("div");
                  for (var e = 0; e < $t; e++) {
                    var n = Ut[e],
                      r = "" === n,
                      i = r ? t : n + t.charAt(0).toUpperCase() + t.slice(1);
                    if (i in Tt.style || r) {
                      if (r && "clipPath" === t && zt.has(t)) return;
                      Bt.set(t, i), Ft(t, (r ? "" : "-") + Ht(i));
                    }
                  }
                })(t)
              : (function (t) {
                  Ft(t, t);
                })(t)),
          n.get(t) || t
        );
      },
      Nt = ["", "X", "Y", "Z"],
      Zt = [
        "translate",
        "scale",
        "rotate",
        "skew",
        "transformPerspective",
      ].reduce(
        function (t, e) {
          return Nt.reduce(function (t, n) {
            return t.push(e + n), t;
          }, t);
        },
        ["x", "y", "z"]
      ),
      Kt = Zt.reduce(function (t, e) {
        return (t[e] = !0), t;
      }, {});
    function Jt(t) {
      return !0 === Kt[t];
    }
    function Qt(t, e) {
      return Zt.indexOf(t) - Zt.indexOf(e);
    }
    var te = new Set(["originX", "originY", "originZ"]);
    function ee(t) {
      return te.has(t);
    }
    var ne = A(A({}, V), { transform: Math.round }),
      re = {
        color: nt,
        backgroundColor: nt,
        outlineColor: nt,
        fill: nt,
        stroke: nt,
        borderColor: nt,
        borderTopColor: nt,
        borderRightColor: nt,
        borderBottomColor: nt,
        borderLeftColor: nt,
        borderWidth: B,
        borderTopWidth: B,
        borderRightWidth: B,
        borderBottomWidth: B,
        borderLeftWidth: B,
        borderRadius: B,
        radius: B,
        borderTopLeftRadius: B,
        borderTopRightRadius: B,
        borderBottomRightRadius: B,
        borderBottomLeftRadius: B,
        width: B,
        maxWidth: B,
        height: B,
        maxHeight: B,
        size: B,
        top: B,
        right: B,
        bottom: B,
        left: B,
        padding: B,
        paddingTop: B,
        paddingRight: B,
        paddingBottom: B,
        paddingLeft: B,
        margin: B,
        marginTop: B,
        marginRight: B,
        marginBottom: B,
        marginLeft: B,
        rotate: D,
        rotateX: D,
        rotateY: D,
        rotateZ: D,
        scale: j,
        scaleX: j,
        scaleY: j,
        scaleZ: j,
        skew: D,
        skewX: D,
        skewY: D,
        distance: B,
        translateX: B,
        translateY: B,
        translateZ: B,
        x: B,
        y: B,
        z: B,
        perspective: B,
        opacity: T,
        originX: $,
        originY: $,
        originZ: B,
        zIndex: ne,
        fillOpacity: T,
        strokeOpacity: T,
        numOctaves: ne,
      },
      ie = function (t) {
        return re[t];
      },
      oe = function (t, e) {
        return e && "number" == typeof t ? e.transform(t) : t;
      },
      ae = new Set(["scrollLeft", "scrollTop"]),
      se = new Set(["scrollLeft", "scrollTop", "transform"]),
      ce = { x: "translateX", y: "translateY", z: "translateZ" };
    function ue(t) {
      return "function" == typeof t;
    }
    function le(t, e, n, r, i, o, a, s) {
      void 0 === e && (e = !0),
        void 0 === n && (n = {}),
        void 0 === r && (r = {}),
        void 0 === i && (i = {}),
        void 0 === o && (o = []),
        void 0 === a && (a = !1),
        void 0 === s && (s = !0);
      var c = !0,
        u = !1,
        l = !1;
      for (var h in t) {
        var d = t[h],
          f = ie(h),
          p = oe(d, f);
        Jt(h)
          ? ((u = !0),
            (r[h] = p),
            o.push(h),
            c &&
              ((f.default && d !== f.default) || (!f.default && 0 !== d)) &&
              (c = !1))
          : ee(h)
          ? ((i[h] = p), (l = !0))
          : (se.has(h) && ue(p)) || (n[It(h, a)] = p);
      }
      return (
        (u || "function" == typeof t.transform) &&
          (n.transform = (function (t, e, n, r, i, o) {
            void 0 === o && (o = !0);
            var a = "",
              s = !1;
            n.sort(Qt);
            for (var c = n.length, u = 0; u < c; u++) {
              var l = n[u];
              (a += (ce[l] || l) + "(" + e[l] + ") "), (s = "z" === l || s);
            }
            return (
              !s && i ? (a += "translateZ(0)") : (a = a.trim()),
              ue(t.transform)
                ? (a = t.transform(e, r ? "" : a))
                : o && r && (a = "none"),
              a
            );
          })(t, r, o, c, e, s)),
        l &&
          (n.transformOrigin =
            (i.originX || "50%") +
            " " +
            (i.originY || "50%") +
            " " +
            (i.originZ || 0)),
        n
      );
    }
    function he(t) {
      var e = void 0 === t ? {} : t,
        n = e.enableHardwareAcceleration,
        r = void 0 === n || n,
        i = e.isDashCase,
        o = void 0 === i || i,
        a = e.allowTransformNone,
        s = void 0 === a || a,
        c = {},
        u = {},
        l = {},
        h = [];
      return function (t) {
        return (h.length = 0), le(t, r, c, u, l, h, o, s), c;
      };
    }
    var de = Wt({
      onRead: function (t, e) {
        var n = e.element,
          r = e.preparseOutput,
          i = ie(t);
        if (Jt(t)) return (i && i.default) || 0;
        if (ae.has(t)) return n[t];
        var o = window.getComputedStyle(n, null).getPropertyValue(It(t, !0)) || 0;
        return r && i && i.test(o) && i.parse ? i.parse(o) : o;
      },
      onRender: function (t, e, n) {
        var r = e.element,
          i = e.buildStyles,
          o = e.hasCSSVariable;
        if ((Object.assign(r.style, i(t)), o))
          for (var a = n.length, s = 0; s < a; s++) {
            var c = n[s];
            c.startsWith("--") && r.style.setProperty(c, t[c]);
          }
        -1 !== n.indexOf("scrollLeft") && (r.scrollLeft = t.scrollLeft),
          -1 !== n.indexOf("scrollTop") && (r.scrollTop = t.scrollTop);
      },
      uncachedValues: ae,
    });
    var fe = new Set([
        "baseFrequency",
        "diffuseConstant",
        "kernelMatrix",
        "kernelUnitLength",
        "keySplines",
        "keyTimes",
        "limitingConeAngle",
        "markerHeight",
        "markerWidth",
        "numOctaves",
        "targetX",
        "targetY",
        "surfaceScale",
        "specularConstant",
        "specularExponent",
        "stdDeviation",
        "tableValues",
      ]),
      pe = function (t, e) {
        return B.transform(t * e);
      },
      me = { x: 0, y: 0, width: 0, height: 0 };
    function ge(t, e, n) {
      return "string" == typeof t ? t : B.transform(e + n * t);
    }
    var ve = { enableHardwareAcceleration: !1, isDashCase: !1 };
    function ye(t, e, n, r, i, o) {
      void 0 === e && (e = me),
        void 0 === r && (r = he(ve)),
        void 0 === i && (i = { style: {} }),
        void 0 === o && (o = !0);
      var a = t.attrX,
        s = t.attrY,
        c = t.originX,
        u = t.originY,
        l = t.pathLength,
        h = t.pathSpacing,
        d = void 0 === h ? 1 : h,
        f = t.pathOffset,
        p = void 0 === f ? 0 : f,
        m = r(
          L(t, [
            "attrX",
            "attrY",
            "originX",
            "originY",
            "pathLength",
            "pathSpacing",
            "pathOffset",
          ])
        );
      for (var g in m) {
        if ("transform" === g) i.style.transform = m[g];
        else i[o && !fe.has(g) ? Ht(g) : g] = m[g];
      }
      return (
        (void 0 !== c || void 0 !== u || m.transform) &&
          (i.style.transformOrigin = (function (t, e, n) {
            return ge(e, t.x, t.width) + " " + ge(n, t.y, t.height);
          })(e, void 0 !== c ? c : 0.5, void 0 !== u ? u : 0.5)),
        void 0 !== a && (i.x = a),
        void 0 !== s && (i.y = s),
        void 0 !== n &&
          void 0 !== l &&
          ((i[o ? "stroke-dashoffset" : "strokeDashoffset"] = pe(-p, n)),
          (i[o ? "stroke-dasharray" : "strokeDasharray"] =
            pe(l, n) + " " + pe(d, n))),
        i
      );
    }
    function we(t, e, n) {
      void 0 === n && (n = !0);
      var r = { style: {} },
        i = he(ve);
      return function (o) {
        return ye(o, t, e, i, r, n);
      };
    }
    var be = Wt({
        onRead: function (t, e) {
          var n = e.element;
          if (Jt((t = fe.has(t) ? t : Ht(t)))) {
            var r = ie(t);
            return (r && r.default) || 0;
          }
          return n.getAttribute(t);
        },
        onRender: function (t, e) {
          var n = e.element,
            r = (0, e.buildAttrs)(t);
          for (var i in r)
            "style" === i
              ? Object.assign(n.style, r.style)
              : n.setAttribute(i, r[i]);
        },
      }),
      xe = Wt({
        useCache: !1,
        onRead: function (t) {
          return "scrollTop" === t ? window.pageYOffset : window.pageXOffset;
        },
        onRender: function (t) {
          var e = t.scrollTop,
            n = void 0 === e ? 0 : e,
            r = t.scrollLeft,
            i = void 0 === r ? 0 : r;
          return window.scrollTo(i, n);
        },
      }),
      Me = new WeakMap(),
      Se = function (t, e) {
        var n, r, i, o;
        return (
          t === window
            ? (n = xe(t))
            : !(function (t) {
                return t instanceof HTMLElement || "function" == typeof t.click;
              })(t)
            ? (function (t) {
                return t instanceof SVGElement || "ownerSVGElement" in t;
              })(t) &&
              ((i = (function (t) {
                try {
                  return (function (t) {
                    return "function" == typeof t.getBBox
                      ? t.getBBox()
                      : t.getBoundingClientRect();
                  })(t);
                } catch (t) {
                  return { x: 0, y: 0, width: 0, height: 0 };
                }
              })((r = t))),
              (o =
                (function (t) {
                  return "path" === t.tagName;
                })(r) && r.getTotalLength
                  ? r.getTotalLength()
                  : void 0),
              (n = be({ element: r, buildAttrs: we(i, o) })))
            : (n = (function (t, e) {
                void 0 === e && (e = {});
                var n = e.enableHardwareAcceleration,
                  r = e.allowTransformNone,
                  i = L(e, ["enableHardwareAcceleration", "allowTransformNone"]);
                return de(
                  A(
                    {
                      element: t,
                      buildStyles: he({
                        enableHardwareAcceleration: n,
                        allowTransformNone: r,
                      }),
                      preparseOutput: !0,
                    },
                    i
                  )
                );
              })(t, e)),
          Me.set(t, n),
          n
        );
      };
    function Oe(t, e) {
      return (function (t, e) {
        return Me.has(t) ? Me.get(t) : Se(t, e);
      })("string" == typeof t ? document.querySelector(t) : t, e);
    }
    var _e = (function () {
        function t(t) {
          void 0 === t && (t = {}), (this.props = t);
        }
        return (
          (t.prototype.applyMiddleware = function (t) {
            return this.create(
              A(A({}, this.props), {
                middleware: this.props.middleware
                  ? P([t], this.props.middleware)
                  : [t],
              })
            );
          }),
          (t.prototype.pipe = function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            var n = 1 === t.length ? t[0] : kt.apply(void 0, t);
            return this.applyMiddleware(function (t) {
              return function (e) {
                return t(n(e));
              };
            });
          }),
          (t.prototype.while = function (t) {
            return this.applyMiddleware(function (e, n) {
              return function (r) {
                return t(r) ? e(r) : n();
              };
            });
          }),
          (t.prototype.filter = function (t) {
            return this.applyMiddleware(function (e) {
              return function (n) {
                return t(n) && e(n);
              };
            });
          }),
          t
        );
      })(),
      Ce = (function () {
        return function (t, e) {
          var n = this,
            r = t.middleware,
            i = t.onComplete;
          (this.isActive = !0),
            (this.update = function (t) {
              n.observer.update && n.updateObserver(t);
            }),
            (this.complete = function () {
              n.observer.complete && n.isActive && n.observer.complete(),
                n.onComplete && n.onComplete(),
                (n.isActive = !1);
            }),
            (this.error = function (t) {
              n.observer.error && n.isActive && n.observer.error(t),
                (n.isActive = !1);
            }),
            (this.observer = e),
            (this.updateObserver = function (t) {
              return e.update(t);
            }),
            (this.onComplete = i),
            e.update &&
              r &&
              r.length &&
              r.forEach(function (t) {
                return (n.updateObserver = t(n.updateObserver, n.complete));
              });
        };
      })(),
      Ae = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          (function (t, e) {
            function n() {
              this.constructor = t;
            }
            C(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          })(e, t),
          (e.prototype.create = function (t) {
            return new e(t);
          }),
          (e.prototype.start = function (t) {
            void 0 === t && (t = {});
            var e = !1,
              n = { stop: function () {} },
              r = this.props,
              i = (0, r.init)(
                (function (t, e, n) {
                  var r = e.middleware;
                  return new Ce(
                    { middleware: r, onComplete: n },
                    "function" == typeof t ? { update: t } : t
                  );
                })(t, L(r, ["init"]), function () {
                  (e = !0), n.stop();
                })
              );
            return (
              (n = i ? A(A({}, n), i) : n),
              t.registerParent && t.registerParent(n),
              e && n.stop(),
              n
            );
          }),
          e
        );
      })(_e),
      Le = function (t) {
        return new Ae({ init: t });
      },
      Pe = function (t) {
        var e = t.getCount,
          n = t.getFirst,
          r = t.getOutput,
          i = t.mapApi,
          o = t.setProp,
          a = t.startActions;
        return function (t) {
          return Le(function (s) {
            var c = s.update,
              u = s.complete,
              l = s.error,
              h = e(t),
              d = r(),
              f = function () {
                return c(d);
              },
              p = 0,
              m = a(t, function (t, e) {
                var n = !1;
                return t.start({
                  complete: function () {
                    n || ((n = !0), ++p === h && vt.update(u));
                  },
                  error: l,
                  update: function (t) {
                    o(d, e, t), vt.update(f, !1, !0);
                  },
                });
              });
            return Object.keys(n(m)).reduce(function (t, e) {
              return (t[e] = i(m, e)), t;
            }, {});
          });
        };
      },
      Ye = Pe({
        getOutput: function () {
          return {};
        },
        getCount: function (t) {
          return Object.keys(t).length;
        },
        getFirst: function (t) {
          return t[Object.keys(t)[0]];
        },
        mapApi: function (t, e) {
          return function () {
            for (var n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            return Object.keys(t).reduce(function (r, i) {
              var o;
              return (
                t[i][e] &&
                  (n[0] && void 0 !== n[0][i]
                    ? (r[i] = t[i][e](n[0][i]))
                    : (r[i] = (o = t[i])[e].apply(o, n))),
                r
              );
            }, {});
          };
        },
        setProp: function (t, e, n) {
          return (t[e] = n);
        },
        startActions: function (t, e) {
          return Object.keys(t).reduce(function (n, r) {
            return (n[r] = e(t[r], r)), n;
          }, {});
        },
      }),
      Re = Pe({
        getOutput: function () {
          return [];
        },
        getCount: function (t) {
          return t.length;
        },
        getFirst: function (t) {
          return t[0];
        },
        mapApi: function (t, e) {
          return function () {
            for (var n = [], r = 0; r < arguments.length; r++)
              n[r] = arguments[r];
            return t.map(function (t, r) {
              if (t[e])
                return Array.isArray(n[0]) ? t[e](n[0][r]) : t[e].apply(t, n);
            });
          };
        },
        setProp: function (t, e, n) {
          return (t[e] = n);
        },
        startActions: function (t, e) {
          return t.map(function (t, n) {
            return e(t, n);
          });
        },
      }),
      Ee = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return Re(t);
      },
      Xe = [B, H, D, z, U],
      ke = function (t) {
        return Xe.find(function (e) {
          return e.test(t);
        });
      },
      qe = function (t, e) {
        return t(e);
      },
      Ve = function (t, e, n) {
        var r = n[0],
          i = e[r].map(function (r, i) {
            var o = n.reduce(
              (function (t) {
                return function (e, n) {
                  return (e[n] = e[n][t]), e;
                };
              })(i),
              A({}, e)
            );
            return ze(r)(t, o);
          });
        return Ee.apply(void 0, i);
      },
      Te = function (t, e, n) {
        var r = n[0],
          i = Object.keys(e[r]).reduce(function (i, o) {
            var a = n.reduce(
              (function (t) {
                return function (e, n) {
                  return (e[n] = e[n][t]), e;
                };
              })(o),
              A({}, e)
            );
            return (i[o] = ze(e[r][o])(t, a)), i;
          }, {});
        return Ye(i);
      },
      je = function (t, e) {
        var n = e.from,
          r = e.to,
          i = L(e, ["from", "to"]),
          o = ke(n) || ke(r),
          a = o.transform,
          s = o.parse;
        return t(
          A(A({}, i), {
            from: "string" == typeof n ? s(n) : n,
            to: "string" == typeof r ? s(r) : r,
          })
        ).pipe(a);
      },
      We = function (t) {
        return function (e, n) {
          var r = n.from,
            i = n.to,
            o = L(n, ["from", "to"]);
          return e(A(A({}, o), { from: 0, to: 1 })).pipe(t(r, i));
        };
      },
      De = We(Et),
      He = We(jt),
      Be = function (t, e) {
        var n = (function (t) {
            var e = Object.keys(t),
              n = function (e, n) {
                return void 0 !== e && !t[n](e);
              };
            return {
              getVectorKeys: function (t) {
                return e.reduce(function (e, r) {
                  return n(t[r], r) && e.push(r), e;
                }, []);
              },
              testVectorProps: function (t) {
                return (
                  t &&
                  e.some(function (e) {
                    return n(t[e], e);
                  })
                );
              },
            };
          })(e),
          r = n.testVectorProps,
          i = n.getVectorKeys;
        return function (e) {
          if (!r(e)) return t(e);
          var n = i(e),
            o = e[n[0]];
          return ze(o)(t, e, n);
        };
      },
      ze = function (t) {
        return "number" == typeof t
          ? qe
          : Array.isArray(t)
          ? Ve
          : (function (t) {
              return Boolean(ke(t));
            })(t)
          ? je
          : nt.test(t)
          ? De
          : it.test(t)
          ? He
          : "object" == typeof t
          ? Te
          : qe;
      },
      Ue = Be(
        function (t) {
          var e = t.from,
            n = void 0 === e ? 0 : e,
            r = t.to,
            i = void 0 === r ? 1 : r,
            o = t.ease,
            a = void 0 === o ? Ot : o,
            s = t.reverseEase;
          return (
            void 0 !== s && s && (a = St(a)),
            Le(function (t) {
              var e = t.update;
              return {
                seek: function (t) {
                  return e(t);
                },
              };
            }).pipe(a, function (t) {
              return At(n, i, t);
            })
          );
        },
        {
          ease: function (t) {
            return "function" == typeof t;
          },
          from: V.test,
          to: V.test,
        }
      ),
      $e = Ct(0, 1),
      Ge = function (t) {
        return (
          void 0 === t && (t = {}),
          Le(function (e) {
            var n,
              r = e.update,
              i = e.complete,
              o = t.duration,
              a = void 0 === o ? 300 : o,
              s = t.ease,
              c = void 0 === s ? _t : s,
              u = t.flip,
              l = void 0 === u ? 0 : u,
              h = t.loop,
              d = void 0 === h ? 0 : h,
              f = t.yoyo,
              p = void 0 === f ? 0 : f,
              m = t.repeatDelay,
              g = void 0 === m ? 0 : m,
              v = t.from,
              y = void 0 === v ? 0 : v,
              w = t.to,
              b = void 0 === w ? 1 : w,
              x = t.elapsed,
              M = void 0 === x ? 0 : x,
              S = t.flipCount,
              O = void 0 === S ? 0 : S,
              _ = t.yoyoCount,
              C = void 0 === _ ? 0 : _,
              A = t.loopCount,
              L = void 0 === A ? 0 : A,
              P = Ue({ from: y, to: b, ease: c }).start(r),
              Y = 0,
              R = !1,
              E = function (t) {
                var e;
                void 0 === t && (t = !1),
                  (P = Ue({
                    from: (y = (e = [b, y])[0]),
                    to: (b = e[1]),
                    ease: c,
                    reverseEase: t,
                  }).start(r));
              },
              X = function () {
                (Y = $e(
                  (function (t, e, n) {
                    var r = e - t;
                    return 0 === r ? 1 : (n - t) / r;
                  })(0, a, M)
                )),
                  P.seek(Y);
              },
              k = function () {
                (R = !0),
                  (n = vt.update(function (t) {
                    var e,
                      r = t.delta;
                    (M += r),
                      X(),
                      !(e = R && M > a + g) ||
                        ((!e || d || l || p) &&
                          ((M = a - (M - g)),
                          d && L < d
                            ? (L++, 1)
                            : l && O < l
                            ? (O++, E(), 1)
                            : p && C < p && (C++, E(C % 2 != 0), 1))) ||
                        (yt.update(n), i && vt.update(i, !1, !0));
                  }, !0));
              },
              q = function () {
                (R = !1), n && yt.update(n);
              };
            return (
              k(),
              {
                isActive: function () {
                  return R;
                },
                getElapsed: function () {
                  return Ct(0, a, M);
                },
                getProgress: function () {
                  return Y;
                },
                stop: function () {
                  q();
                },
                pause: function () {
                  return q(), this;
                },
                resume: function () {
                  return R || k(), this;
                },
                seek: function (t) {
                  return (M = At(0, a, t)), vt.update(X, !1, !0), this;
                },
                reverse: function () {
                  return E(), this;
                },
              }
            );
          })
        );
      },
      Fe = function (t, e, n) {
        return Le(function (r) {
          var i = r.update,
            o = e.split(" ").map(function (e) {
              return t.addEventListener(e, i, n), e;
            });
          return {
            stop: function () {
              return o.forEach(function (e) {
                return t.removeEventListener(e, i, n);
              });
            },
          };
        });
      },
      Ie = function () {
        return { clientX: 0, clientY: 0, pageX: 0, pageY: 0, x: 0, y: 0 };
      },
      Ne = function (t, e) {
        return (
          void 0 === e &&
            (e = { clientX: 0, clientY: 0, pageX: 0, pageY: 0, x: 0, y: 0 }),
          (e.clientX = e.x = t.clientX),
          (e.clientY = e.y = t.clientY),
          (e.pageX = t.pageX),
          (e.pageY = t.pageY),
          e
        );
      },
      Ze = [Ie()];
    if ("undefined" != typeof document) {
      Fe(document, "touchstart touchmove", { passive: !0, capture: !0 }).start(
        function (t) {
          var e = t.touches,
            n = e.length;
          Ze.length = 0;
          for (var r = 0; r < n; r++) {
            var i = e[r];
            Ze.push(Ne(i));
          }
        }
      );
    }
    var Ke = Ie();
    if ("undefined" != typeof document) {
      Fe(document, "mousedown mousemove", !0).start(function (t) {
        Ne(t, Ke);
      });
    }
    var Je = 0,
      Qe = 0,
      tn = {
        duration: 450,
        y: 0,
        d: "M299.3,461.3c28.3,15.2,81.2,15.2,102.4-0.4",
      },
      en = {
        duration: 450,
        y: 0,
        d: "M300.33,467.31c25.75,8.49,90,6.12,99.4-8.42",
      },
      nn = {
        duration: 450,
        d: "M300.7,467.2c26.6,8.8,84.6,6.2,102.7-0.7",
        y: -2,
      },
      rn = new ((function () {
        function t() {
          var e = this;
          l(this, t),
            (this.menuEl = document.querySelector(".js-menu")),
            (this.triggerEl = document.querySelector(".js-menu-trigger")),
            (this.openLabelEl = document.querySelector(".js-menu-label-open")),
            (this.closeLabelEl = document.querySelector(".js-menu-label-close")),
            (this.toggleMenu = this.toggleMenu.bind(this)),
            this.menuEl &&
              this.triggerEl.addEventListener("click", function (t) {
                t.preventDefault(), e.toggleMenu();
              });
        }
        return (
          d(t, [
            {
              key: "toggleMenu",
              value: function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : void 0;
                if (void 0 === t) {
                  this.triggerEl.classList.toggle("is-active"),
                    this.menuEl.classList.toggle("is-open"),
                    document
                      .querySelector("html")
                      .classList.toggle("lock-scroll");
                  var e = this.menuEl.classList.contains("is-open");
                  this.closeLabelEl.setAttribute("aria-hidden", !e),
                    this.openLabelEl.setAttribute("aria-hidden", e),
                    this.triggerEl.setAttribute("aria-expanded", e);
                }
                !0 === t &&
                  (this.triggerEl.classList.add("is-active"),
                  this.menuEl.classList.add("is-open"),
                  document.querySelector("html").classList.add("lock-scroll"),
                  this.triggerEl.setAttribute("aria-expanded", !0),
                  this.closeLabelEl.setAttribute("aria-hidden", !1),
                  this.openLabelEl.setAttribute("aria-hidden", !0)),
                  !1 === t &&
                    (this.triggerEl.classList.remove("is-active"),
                    this.menuEl.classList.remove("is-open"),
                    document
                      .querySelector("html")
                      .classList.remove("lock-scroll"),
                    this.triggerEl.setAttribute("aria-expanded", !1),
                    this.closeLabelEl.setAttribute("aria-hidden", !0),
                    this.openLabelEl.setAttribute("aria-hidden", !1));
              },
            },
          ]),
          t
        );
      })())().toggleMenu,
      on = function (t) {
        g(
          (t || document.querySelector("body")).querySelectorAll(
            'a[href^="/"], a[href^="#"]'
          )
        ).forEach(function (t) {
          t.addEventListener("click", function (e) {
            e.preventDefault();
            var n = t.getAttribute("href");
            if (
              window.location.pathname == n ||
              window.location.pathname == n + "/"
            )
              return rn(!1), !1;
            u.push(n);
          });
        });
      },
      an = function () {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      };
    an() && document.querySelector("html").classList.add("reduced-motion");
    var sn = function (t) {
        var e = t.scroll,
          n = t.size;
        if (an()) return !1;
        g(document.querySelectorAll("[data-reveal]")).forEach(function (t) {
          var r = t.dataset.reveal,
            i = t.classList.contains(r),
            o = t.dataset.offset
              ? parseInt(t.dataset.offset)
              : t.getBoundingClientRect().top + window.pageYOffset;
          n.changed &&
            (t.dataset.offset = Math.floor(
              t.getBoundingClientRect().top + window.pageYOffset
            )),
            e.changed &&
              e.bottom > o + n.y / 4 &&
              !i &&
              (t.classList.add(r),
              delete t.dataset.reveal,
              delete t.dataset.offset);
        });
      },
      cn = function (t) {
        if (t) {
          var e = document.querySelector(t);
          e
            ? window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY)
            : window.scrollTo(0, 0);
        } else window.scrollTo(0, 0);
      },
      un = function (t) {
        var e = t.path,
          n = t.hash;
        M(function () {
          var t;
          ((t = e),
          fetch(t).then(function (t) {
            if (!t.ok) throw new Error("Ajax page-load failed!");
            return t.text();
          }))
            .then(function (t) {
              if (
                window.location.pathname != e &&
                window.location.pathname != e + "/"
              )
                return rn(!1), !1;
              var r,
                a = new DOMParser().parseFromString(t, "text/html");
              (r = a).querySelectorAll(".reveal-img").length &&
                r.querySelectorAll(".reveal-img").forEach(function (t) {
                  t.querySelector("img").setAttribute("src", "");
                }),
                (function (t) {
                  var e = document.querySelector('meta[name="theme-color"]'),
                    n = t.querySelector('meta[name="theme-color"]');
                  e.setAttribute("content", n.getAttribute("content"));
                  var r = document.querySelector("title"),
                    i = t.querySelector("title");
                  r.innerText = i.innerText;
                  ["og:title", "og:url", "og:description"].forEach(function (e) {
                    var n = document.querySelector('[property="'.concat(e, '"]')),
                      r = t.querySelector('[property="'.concat(e, '"]'));
                    n.setAttribute("content", r.getAttribute("content"));
                  });
                  document.querySelector("#theme").remove();
                  document
                    .querySelector("head")
                    .appendChild(t.querySelector("#theme"));
                })(a),
                _(),
                rn(!1),
                document.querySelector(".page-body").remove(),
                document.querySelector("html").classList.remove("lock-scroll"),
                o(sn),
                setTimeout(function () {
                  return S(function () {
                    var t = a.querySelector(".page-body"),
                      e = document.querySelector(".main-menu");
                    e.parentElement.insertBefore(t, e.nextSibling),
                      cn(n),
                      on(t),
                      w(),
                      (function (t) {
                        g(document.querySelectorAll("script.custom-js")).forEach(
                          function (t) {
                            t.parentNode.removeChild(t);
                          }
                        ),
                          g(t.querySelectorAll("script.custom-js")).forEach(
                            function (t) {
                              var e = t.getAttribute("src"),
                                n = document.createElement("script");
                              (n.className = "custom-js"),
                                n.setAttribute("async", !0),
                                n.setAttribute("src", e),
                                document.querySelector("body").appendChild(n);
                            }
                          );
                      })(a),
                      i(sn);
                  });
                }, 200);
            })
            .catch(function (t) {
              console.log(t), S();
            });
        });
      };
    u.watch(function (t) {
      var e = t.incoming;
      t.outgoing;
      switch (t.action) {
        case "PUSH":
        case "POP":
          un(e);
          break;
        case "HASH":
          cn(e.hash);
      }
    }),
      _(),
      i(function (t) {
        var e = t.size,
          n = t.mouse,
          r = t.orientation;
        if (n.changed) {
          var i = n.x / e.x,
            o = n.y / e.y,
            a = document.querySelector(".pointer");
          a &&
            (a.style.transform = "translate("
              .concat(90 * i, "%, ")
              .concat(90 * o, "%"));
        }
        if (r.changed) {
          var s = Math.min(Math.max(r.gamma / 22.5, -1), 1),
            c = Math.min(Math.max(r.beta / 45, -1), 1),
            u = (e.x / 2 + (e.x / 2) * (0.66 * s)) / e.x,
            l = (e.y / 2 + (e.y / 2) * (0.66 * c)) / e.y,
            h = document.querySelector(".pointer");
          h &&
            (h.style.transform = "translate("
              .concat(90 * u, "%, ")
              .concat(90 * l, "%"));
        }
      }),
      i(sn),
      i(function (t) {
        var e = t.mouse,
          n = t.orientation,
          r = t.size;
        if (an()) return !1;
        g(document.querySelectorAll("[data-drift]")).forEach(function (t) {
          var i = m(
              t.dataset.drift.split(" ").map(function (t) {
                return parseInt(t);
              }),
              2
            ),
            o = i[0],
            a = i[1],
            s = [];
          if (
            (t.dataset.driftCenter &&
              (s = t.dataset.driftCenter.split(" ").filter(function (t) {
                return "x" == t || "y" == t;
              })),
            e.changed)
          ) {
            var c = (e.x - r.x / 2) / (r.x / 2),
              u = (e.y - r.y / 2) / (r.y / 2);
            t.style.transform = ""
              .concat(s.includes("x") ? "translateX(-50%)" : "")
              .concat(s.includes("y") ? "translateY(-50%)" : "", " translate(")
              .concat(o * c, "px, ")
              .concat(a * u, "px)");
          }
          if (n.changed) {
            var l = Math.min(Math.max(n.gamma / 22.5, -1), 1),
              h = Math.min(Math.max(n.beta / 45, -1), 1);
            t.style.transform = ""
              .concat(s.includes("x") ? "translateX(-50%)" : "")
              .concat(s.includes("y") ? "translateY(-50%)" : "", " translate(")
              .concat(o * l, "px, ")
              .concat(a * h, "px)");
          }
        });
      }),
      i(function (t) {
        var e = t.size,
          n = t.scroll;
        n.changed &&
          g(document.querySelectorAll("[data-prlx]")).forEach(function (t) {
            var r = m(
                t.dataset.prlx.split(" ").map(function (t) {
                  return parseFloat(t);
                }),
                2
              ),
              i = r[0],
              o = r[1];
            n.top, e.y;
            (t.style.position = "relative"),
              (t.style.transform = "translate3d("
                .concat(n.top * i, "px, ")
                .concat(n.top * o, "px, 0)"));
          });
      }),
      i(function (t) {
        var e = t.mouse,
          n = t.orientation,
          r = t.size;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          return !1;
        var i = document.querySelector(".avatar--ready");
        if (i) {
          var o,
            a = i.classList.contains("dizzy"),
            s = i.querySelector(".head__yaw"),
            c = g(i.querySelectorAll(".head__rotation")),
            u = g(i.querySelectorAll(".face-tilt")),
            l = i.querySelector(".eyes__x"),
            h = i.querySelector(".eyes__y"),
            d = i.querySelector(".eyebrows__left"),
            m = i.querySelector(".eyebrows__right"),
            v = i.querySelector(".ears__left"),
            y = i.querySelector(".ears__right"),
            w = i.querySelector(".beard"),
            b = i.querySelector(".mouth path"),
            x = b.getAttribute("d");
          if (
            (e.changed &&
              !a &&
              (o = (function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var n = null != arguments[e] ? arguments[e] : {};
                  e % 2
                    ? p(Object(n), !0).forEach(function (e) {
                        f(t, e, n[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(n)
                      )
                    : p(Object(n)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(n, e)
                        );
                      });
                }
                return t;
              })({}, e)),
            n.changed && !a)
          ) {
            var M = Math.min(Math.max(n.gamma / 22.5, -1), 1),
              S = Math.min(Math.max(n.beta / 45, -1), 1);
            o = {
              x: r.x / 2 + (r.x / 2) * (-0.66 * M),
              y: r.y / 2 + (r.y / 2) * (-0.66 * S),
            };
          }
          if ((a && (o = { x: r.x / 2, y: r.y / 2 }), e.changed || n.changed)) {
            var O = (o.x - r.x / 2) / (r.x / 2),
              _ = (o.y - r.y / 2) / (r.y / 2),
              C = (o.x - r.x / 2) / (r.x / 4);
            C = (C = C < -1 ? -1 : C) > 1 ? 1 : C;
            var A,
              L = (o.y - r.y / 2) / (r.y / 4);
            if (((L = (L = L < -1 ? -1 : L) > 1 ? 1 : L), !a))
              if (
                (L < 0 && C < 0 && (A = 1),
                L < 0 && C >= 0 && (A = 2),
                L >= 0 && C >= 0 && (A = 3),
                L >= 0 && C < 0 && (A = 4),
                A != Qe &&
                  ((Qe = A),
                  (Je += 1),
                  setTimeout(function () {
                    Je = Je <= 0 ? 0 : Je - 1;
                  }, 500)),
                Je >= 5)
              )
                return (
                  (function () {
                    var t = document.querySelector(".avatar");
                    t.classList.add("dizzy"),
                      (Je = 0),
                      setTimeout(function () {
                        t.classList.remove("dizzy");
                      }, 6e3);
                  })(),
                  !1
                );
            (l.style.transition = "all 100ms 10ms ease-out"),
              (l.style.transform = "translateX(".concat(
                Math.ceil(10 * O),
                "px)"
              )),
              (h.style.transition = "all 100ms 10ms ease-out"),
              (h.style.transform = "translateY(".concat(
                Math.ceil(10 * _) < -3 ? -3 : Math.ceil(10 * _),
                "px)"
              )),
              (s.style.transform = "translateY(".concat(
                L < 0 ? Math.ceil(1 * L) : Math.ceil(3 * L),
                "px)"
              )),
              c.forEach(function (t) {
                return (t.style.transform = "rotate(".concat(3 * C * L, "deg)"));
              }),
              u.forEach(function (t) {
                return (t.style.transform =
                  L < 0
                    ? "translateY("
                        .concat(Math.ceil(1 * L), "px) translateX(")
                        .concat(Math.ceil(1.25 * C), "px)")
                    : "translateY("
                        .concat(Math.ceil(3 * L), "px) translateX(")
                        .concat(Math.ceil(1.25 * C), "px)"));
              }),
              (v.style.transform = "translateX(".concat(
                C < 0 ? Math.ceil(1 * C) : Math.ceil(-1 * C),
                "px)"
              )),
              (y.style.transform = "translateX(".concat(
                C < 0 ? Math.ceil(-1 * C) : Math.ceil(1 * C),
                "px)"
              )),
              (d.style.transform = "translateY(".concat(
                C < 0 ? -5 + Math.ceil(2 * C) : -5 + Math.ceil(5 * C),
                "px)"
              )),
              (m.style.transform = "translateY(".concat(
                C < 0 ? -3 + Math.ceil(-5 * C) : -3 + Math.ceil(-3 * C),
                "px)"
              )),
              (w.style.transform =
                L < 0
                  ? "scaleY(".concat(1 + -1 * L * 0.025, ")")
                  : "scaleY(".concat(1 - 0.025 * L));
            var P = en.y,
              Y = en.duration,
              R = tn.d;
            if (
              ((C < -0.5 && L < -0.5) || (C > 0.5 && L < -0.5)
                ? ((P = en.y), (Y = en.duration), (R = en.d))
                : ((C < -0.5 && L > 0.5) || (C > 0.5 && L > 0.5) || L > 0.5) &&
                  ((P = nn.y), (Y = nn.duration), (R = nn.d)),
              x !== R && !a)
            ) {
              var E = Oe(b.parentElement),
                X = Oe(b),
                k = Ge({
                  from: { d: X.get("d") },
                  to: { d: R },
                  duration: Y,
                  ease: _t,
                }),
                q = Ge({
                  from: { y: E.get("y") },
                  to: { y: P },
                  duration: Y,
                  ease: _t,
                });
              k.start(X.set), q.start(E.set);
            }
          }
        }
      }),
      requestAnimationFrame(function t() {
        if (document.querySelector(".clock")) {
          var e = new Date(),
            n = (e.getMinutes() / 60) * 360,
            r = (e.getHours() / 12) * 360;
          (document.querySelector(
            ".clock-pivot__hand--minute"
          ).parentElement.style.transform = "rotate(".concat(n, "deg)")),
            (document.querySelector(
              ".clock-pivot__hand--hour"
            ).parentElement.style.transform = "rotate(".concat(r, "deg)"));
        }
        requestAnimationFrame(t);
      }),
      on(),
      window.addEventListener("load", function () {
        setTimeout(function () {
          S(function () {
            "undefined" != typeof window &&
              console.log(
                "%c  >>>|||<<<  ",
                "\n        font-family: monospace; \n        padding: 8px 10px; \n        background: #9d2d38; \n        color: #fff; \n        font-size: 18px;\n        font-weight: bold;\n      "
              ),
              w();
          });
        }, 1e3);
      });
  })();
  