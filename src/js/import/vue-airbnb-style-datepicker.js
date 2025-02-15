! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.vueAirbnbStyleDatepicker = e()
}(this, function() {
    "use strict";
    "undefined" == typeof Element || Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(t) {
        for (var e = (this.document || this.ownerDocument).querySelectorAll(t), s = e.length; --s >= 0 && e.item(s) !== this;);
        return s > -1
    }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(t, e) {
            var s = arguments;
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(t), i = 1; i < arguments.length; i++) {
                var r = s[i];
                if (null != r)
                    for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a])
            }
            return n
        },
        writable: !0,
        configurable: !0
    }), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(t) {
            if (null == this) throw new TypeError('"this" is null or not defined');
            var e = Object(this),
                s = e.length >>> 0;
            if ("function" != typeof t) throw new TypeError("predicate must be a function");
            for (var n = arguments[1], i = 0; i < s;) {
                var r = e[i];
                if (t.call(n, r, i, e)) return i;
                i++
            }
            return -1
        }
    });
    var t = function(t) {
            return t instanceof Date
        },
        e = 36e5,
        s = 6e4,
        n = 2,
        i = /[T ]/,
        r = /:/,
        a = /^(\d{2})$/,
        o = [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/],
        h = /^(\d{4})/,
        u = [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/],
        l = /^-(\d{2})$/,
        c = /^-?(\d{3})$/,
        d = /^-?(\d{2})-?(\d{2})$/,
        f = /^-?W(\d{2})$/,
        p = /^-?W(\d{2})-?(\d{1})$/,
        m = /^(\d{2}([.,]\d*)?)$/,
        v = /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
        g = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
        D = /([Z+-].*)$/,
        y = /^(Z)$/,
        b = /^([+-])(\d{2})$/,
        w = /^([+-])(\d{2}):?(\d{2})$/;

    function M(t, e, s) {
        e = e || 0, s = s || 0;
        var n = new Date(0);
        n.setUTCFullYear(t, 0, 4);
        var i = 7 * e + s + 1 - (n.getUTCDay() || 7);
        return n.setUTCDate(n.getUTCDate() + i), n
    }
    var _ = function(_, S) {
        if (t(_)) return new Date(_.getTime());
        if ("string" != typeof _) return new Date(_);
        var k = (S || {}).additionalDigits;
        k = null == k ? n : Number(k);
        var x = function(t) {
                var e, s = {},
                    n = t.split(i);
                if (r.test(n[0]) ? (s.date = null, e = n[0]) : (s.date = n[0], e = n[1]), e) {
                    var a = D.exec(e);
                    a ? (s.time = e.replace(a[1], ""), s.timezone = a[1]) : s.time = e
                }
                return s
            }(_),
            T = function(t, e) {
                var s, n = o[e],
                    i = u[e];
                if (s = h.exec(t) || i.exec(t)) {
                    var r = s[1];
                    return {
                        year: parseInt(r, 10),
                        restDateString: t.slice(r.length)
                    }
                }
                if (s = a.exec(t) || n.exec(t)) {
                    var l = s[1];
                    return {
                        year: 100 * parseInt(l, 10),
                        restDateString: t.slice(l.length)
                    }
                }
                return {
                    year: null
                }
            }(x.date, k),
            F = T.year,
            E = function(t, e) {
                if (null === e) return null;
                var s, n, i, r;
                if (0 === t.length) return (n = new Date(0)).setUTCFullYear(e), n;
                if (s = l.exec(t)) return n = new Date(0), i = parseInt(s[1], 10) - 1, n.setUTCFullYear(e, i), n;
                if (s = c.exec(t)) {
                    n = new Date(0);
                    var a = parseInt(s[1], 10);
                    return n.setUTCFullYear(e, 0, a), n
                }
                if (s = d.exec(t)) {
                    n = new Date(0), i = parseInt(s[1], 10) - 1;
                    var o = parseInt(s[2], 10);
                    return n.setUTCFullYear(e, i, o), n
                }
                if (s = f.exec(t)) return r = parseInt(s[1], 10) - 1, M(e, r);
                if (s = p.exec(t)) {
                    r = parseInt(s[1], 10) - 1;
                    var h = parseInt(s[2], 10) - 1;
                    return M(e, r, h)
                }
                return null
            }(T.restDateString, F);
        if (E) {
            var Y, C = E.getTime(),
                I = 0;
            return x.time && (I = function(t) {
                var n, i, r;
                if (n = m.exec(t)) return (i = parseFloat(n[1].replace(",", "."))) % 24 * e;
                if (n = v.exec(t)) return i = parseInt(n[1], 10), r = parseFloat(n[2].replace(",", ".")), i % 24 * e + r * s;
                if (n = g.exec(t)) {
                    i = parseInt(n[1], 10), r = parseInt(n[2], 10);
                    var a = parseFloat(n[3].replace(",", "."));
                    return i % 24 * e + r * s + 1e3 * a
                }
                return null
            }(x.time)), x.timezone ? ($ = x.timezone, Y = (H = y.exec($)) ? 0 : (H = b.exec($)) ? (O = 60 * parseInt(H[2], 10), "+" === H[1] ? -O : O) : (H = w.exec($)) ? (O = 60 * parseInt(H[2], 10) + parseInt(H[3], 10), "+" === H[1] ? -O : O) : 0) : (Y = new Date(C + I).getTimezoneOffset(), Y = new Date(C + I + Y * s).getTimezoneOffset()), new Date(C + I + Y * s)
        }
        var $, H, O;
        return new Date(_)
    };
    var S = function(t) {
        var e = _(t),
            s = new Date(0);
        return s.setFullYear(e.getFullYear(), 0, 1), s.setHours(0, 0, 0, 0), s
    };
    var k = function(t) {
            var e = _(t);
            return e.setHours(0, 0, 0, 0), e
        },
        x = 6e4,
        T = 864e5;
    var F = function(t, e) {
        var s = k(t),
            n = k(e),
            i = s.getTime() - s.getTimezoneOffset() * x,
            r = n.getTime() - n.getTimezoneOffset() * x;
        return Math.round((i - r) / T)
    };
    var E = function(t) {
        var e = _(t);
        return F(e, S(e)) + 1
    };
    var Y = function(t, e) {
        var s = e && Number(e.weekStartsOn) || 0,
            n = _(t),
            i = n.getDay(),
            r = (i < s ? 7 : 0) + i - s;
        return n.setDate(n.getDate() - r), n.setHours(0, 0, 0, 0), n
    };
    var C = function(t) {
        return Y(t, {
            weekStartsOn: 1
        })
    };
    var I = function(t) {
        var e = _(t),
            s = e.getFullYear(),
            n = new Date(0);
        n.setFullYear(s + 1, 0, 4), n.setHours(0, 0, 0, 0);
        var i = C(n),
            r = new Date(0);
        r.setFullYear(s, 0, 4), r.setHours(0, 0, 0, 0);
        var a = C(r);
        return e.getTime() >= i.getTime() ? s + 1 : e.getTime() >= a.getTime() ? s : s - 1
    };
    var $ = function(t) {
            var e = I(t),
                s = new Date(0);
            return s.setFullYear(e, 0, 4), s.setHours(0, 0, 0, 0), C(s)
        },
        H = 6048e5;
    var O = function(t) {
        var e = _(t),
            s = C(e).getTime() - $(e).getTime();
        return Math.round(s / H) + 1
    };
    var N = function(e) {
        if (t(e)) return !isNaN(e);
        throw new TypeError(toString.call(e) + " is not an instance of Date")
    };
    var W = ["M", "MM", "Q", "D", "DD", "DDD", "DDDD", "d", "E", "W", "WW", "YY", "YYYY", "GG", "GGGG", "H", "HH", "h", "hh", "m", "mm", "s", "ss", "S", "SS", "SSS", "Z", "ZZ", "X", "x"];
    var L = function(t) {
        var e = [];
        for (var s in t) t.hasOwnProperty(s) && e.push(s);
        var n = W.concat(e).sort().reverse();
        return new RegExp("(\\[[^\\[]*\\])|(\\\\)?(" + n.join("|") + "|.)", "g")
    };
    var R = function() {
            var t = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                e = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                s = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                n = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                i = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                r = ["AM", "PM"],
                a = ["am", "pm"],
                o = ["a.m.", "p.m."],
                h = {
                    MMM: function(e) {
                        return t[e.getMonth()]
                    },
                    MMMM: function(t) {
                        return e[t.getMonth()]
                    },
                    dd: function(t) {
                        return s[t.getDay()]
                    },
                    ddd: function(t) {
                        return n[t.getDay()]
                    },
                    dddd: function(t) {
                        return i[t.getDay()]
                    },
                    A: function(t) {
                        return t.getHours() / 12 >= 1 ? r[1] : r[0]
                    },
                    a: function(t) {
                        return t.getHours() / 12 >= 1 ? a[1] : a[0]
                    },
                    aa: function(t) {
                        return t.getHours() / 12 >= 1 ? o[1] : o[0]
                    }
                };
            return ["M", "D", "DDD", "d", "Q", "W"].forEach(function(t) {
                h[t + "o"] = function(e, s) {
                    return function(t) {
                        var e = t % 100;
                        if (e > 20 || e < 10) switch (e % 10) {
                            case 1:
                                return t + "st";
                            case 2:
                                return t + "nd";
                            case 3:
                                return t + "rd"
                        }
                        return t + "th"
                    }(s[t](e))
                }
            }), {
                formatters: h,
                formattingTokensRegExp: L(h)
            }
        },
        A = {
            distanceInWords: function() {
                var t = {
                    lessThanXSeconds: {
                        one: "less than a second",
                        other: "less than {{count}} seconds"
                    },
                    xSeconds: {
                        one: "1 second",
                        other: "{{count}} seconds"
                    },
                    halfAMinute: "half a minute",
                    lessThanXMinutes: {
                        one: "less than a minute",
                        other: "less than {{count}} minutes"
                    },
                    xMinutes: {
                        one: "1 minute",
                        other: "{{count}} minutes"
                    },
                    aboutXHours: {
                        one: "about 1 hour",
                        other: "about {{count}} hours"
                    },
                    xHours: {
                        one: "1 hour",
                        other: "{{count}} hours"
                    },
                    xDays: {
                        one: "1 day",
                        other: "{{count}} days"
                    },
                    aboutXMonths: {
                        one: "about 1 month",
                        other: "about {{count}} months"
                    },
                    xMonths: {
                        one: "1 month",
                        other: "{{count}} months"
                    },
                    aboutXYears: {
                        one: "about 1 year",
                        other: "about {{count}} years"
                    },
                    xYears: {
                        one: "1 year",
                        other: "{{count}} years"
                    },
                    overXYears: {
                        one: "over 1 year",
                        other: "over {{count}} years"
                    },
                    almostXYears: {
                        one: "almost 1 year",
                        other: "almost {{count}} years"
                    }
                };
                return {
                    localize: function(e, s, n) {
                        var i;
                        return n = n || {}, i = "string" == typeof t[e] ? t[e] : 1 === s ? t[e].one : t[e].other.replace("{{count}}", s), n.addSuffix ? n.comparison > 0 ? "in " + i : i + " ago" : i
                    }
                }
            }(),
            format: R()
        };
    var B = {
        M: function(t) {
            return t.getMonth() + 1
        },
        MM: function(t) {
            return K(t.getMonth() + 1, 2)
        },
        Q: function(t) {
            return Math.ceil((t.getMonth() + 1) / 3)
        },
        D: function(t) {
            return t.getDate()
        },
        DD: function(t) {
            return K(t.getDate(), 2)
        },
        DDD: function(t) {
            return E(t)
        },
        DDDD: function(t) {
            return K(E(t), 3)
        },
        d: function(t) {
            return t.getDay()
        },
        E: function(t) {
            return t.getDay() || 7
        },
        W: function(t) {
            return O(t)
        },
        WW: function(t) {
            return K(O(t), 2)
        },
        YY: function(t) {
            return K(t.getFullYear(), 4).substr(2)
        },
        YYYY: function(t) {
            return K(t.getFullYear(), 4)
        },
        GG: function(t) {
            return String(I(t)).substr(2)
        },
        GGGG: function(t) {
            return I(t)
        },
        H: function(t) {
            return t.getHours()
        },
        HH: function(t) {
            return K(t.getHours(), 2)
        },
        h: function(t) {
            var e = t.getHours();
            return 0 === e ? 12 : e > 12 ? e % 12 : e
        },
        hh: function(t) {
            return K(B.h(t), 2)
        },
        m: function(t) {
            return t.getMinutes()
        },
        mm: function(t) {
            return K(t.getMinutes(), 2)
        },
        s: function(t) {
            return t.getSeconds()
        },
        ss: function(t) {
            return K(t.getSeconds(), 2)
        },
        S: function(t) {
            return Math.floor(t.getMilliseconds() / 100)
        },
        SS: function(t) {
            return K(Math.floor(t.getMilliseconds() / 10), 2)
        },
        SSS: function(t) {
            return K(t.getMilliseconds(), 3)
        },
        Z: function(t) {
            return z(t.getTimezoneOffset(), ":")
        },
        ZZ: function(t) {
            return z(t.getTimezoneOffset())
        },
        X: function(t) {
            return Math.floor(t.getTime() / 1e3)
        },
        x: function(t) {
            return t.getTime()
        }
    };

    function z(t, e) {
        e = e || "";
        var s = t > 0 ? "-" : "+",
            n = Math.abs(t),
            i = n % 60;
        return s + K(Math.floor(n / 60), 2) + e + K(i, 2)
    }

    function K(t, e) {
        for (var s = Math.abs(t).toString(); s.length < e;) s = "0" + s;
        return s
    }
    var P = function(t, e, s) {
        var n = e ? String(e) : "YYYY-MM-DDTHH:mm:ss.SSSZ",
            i = (s || {}).locale,
            r = A.format.formatters,
            a = A.format.formattingTokensRegExp;
        i && i.format && i.format.formatters && (r = i.format.formatters, i.format.formattingTokensRegExp && (a = i.format.formattingTokensRegExp));
        var o = _(t);
        return N(o) ? function(t, e, s) {
            var n, i, r, a = t.match(s),
                o = a.length;
            for (n = 0; n < o; n++) i = e[a[n]] || B[a[n]], a[n] = i || ((r = a[n]).match(/\[[\s\S]/) ? r.replace(/^\[|]$/g, "") : r.replace(/\\/g, ""));
            return function(t) {
                for (var e = "", s = 0; s < o; s++) a[s] instanceof Function ? e += a[s](t, B) : e += a[s];
                return e
            }
        }(n, r, a)(o) : "Invalid Date"
    };
    var U = function(t) {
        var e = _(t),
            s = e.getFullYear(),
            n = e.getMonth(),
            i = new Date(0);
        return i.setFullYear(s, n + 1, 0), i.setHours(0, 0, 0, 0), i.getDate()
    };
    var j = function(t, e) {
        var s = _(t),
            n = Number(e),
            i = s.getMonth() + n,
            r = new Date(0);
        r.setFullYear(s.getFullYear(), i, 1), r.setHours(0, 0, 0, 0);
        var a = U(r);
        return s.setMonth(i, Math.min(a, s.getDate())), s
    };
    var X = function(t, e) {
        var s = Number(e);
        return j(t, -s)
    };
    var G = function(t) {
        var e = _(t),
            s = e.getMonth();
        return e.setFullYear(e.getFullYear(), s + 1, 0), e.setHours(0, 0, 0, 0), e
    };
    var J = function(t) {
        return _(t).getMonth()
    };
    var Z = function(t, e) {
        var s = _(t),
            n = Number(e),
            i = s.getFullYear(),
            r = s.getDate(),
            a = new Date(0);
        a.setFullYear(i, n, 15), a.setHours(0, 0, 0, 0);
        var o = U(a);
        return s.setMonth(n, Math.min(r, o)), s
    };
    var V = function(t) {
        return _(t).getFullYear()
    };
    var Q = function(t, e) {
        var s = _(t),
            n = Number(e);
        return s.setFullYear(n), s
    };
    var q = function(t, e) {
        var s = _(t),
            n = _(e);
        return s.getFullYear() === n.getFullYear() && s.getMonth() === n.getMonth()
    };
    var tt = function(t, e) {
        var s = k(t),
            n = k(e);
        return s.getTime() === n.getTime()
    };
    var et = function(t, e) {
        var s = _(t),
            n = Number(e);
        return s.setDate(s.getDate() + n), s
    };
    var st = function(t, e) {
        var s = Number(e);
        return et(t, -s)
    };
    var nt = function(t, e) {
        var s = Number(e);
        return et(t, 7 * s)
    };
    var it = function(t, e) {
        var s = Number(e);
        return nt(t, -s)
    };
    var rt = function(t) {
        var e = _(t);
        return e.setDate(1), e.setHours(0, 0, 0, 0), e
    };
    var at = function(t, e) {
        var s = e && Number(e.weekStartsOn) || 0,
            n = _(t),
            i = n.getDay(),
            r = 6 + (i < s ? -7 : 0) - (i - s);
        return n.setDate(n.getDate() + r), n.setHours(23, 59, 59, 999), n
    };
    var ot = function(t, e) {
        var s = _(t),
            n = _(e);
        return s.getTime() < n.getTime()
    };
    var ht = function(t, e) {
            var s = _(t),
                n = _(e);
            return s.getTime() > n.getTime()
        },
        ut = function(t) {
            return JSON.parse(JSON.stringify(t))
        };
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var lt, ct = {
        componentUpdated: dt,
        inserted: dt
    };

    function dt(t, e, s) {
        var n = document.createElement("select");
        n.className = t.className;
        var i = document.createElement("option");
        i.textContent = t.value, n.appendChild(i), t.parentNode.appendChild(n), t.style.width = n.offsetWidth + "px", n.parentNode.removeChild(n)
    }
    var ft = {
            render: function() {
                var t = this,
                    e = t.$createElement,
                    s = t._self._c || e;
                return s("transition", {
                    attrs: {
                        name: "asd__fade"
                    }
                }, [s("div", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.showDatepicker,
                        expression: "showDatepicker"
                    }, {
                        name: "click-outside",
                        rawName: "v-click-outside",
                        value: t.handleClickOutside,
                        expression: "handleClickOutside"
                    }],
                    staticClass: "asd__wrapper",
                    class: t.wrapperClasses,
                    style: t.showFullscreen ? void 0 : t.wrapperStyles,
                    attrs: {
                        id: t.wrapperId
                    }
                }, [t.showFullscreen ? s("div", {
                    staticClass: "asd__mobile-header asd__mobile-only"
                }, [s("button", {
                    staticClass: "asd__mobile-close",
                    attrs: {
                        type: "button",
                        "aria-label": t.ariaLabels.closeDatepicker
                    },
                    on: {
                        click: t.closeDatepicker
                    }
                }, [t.$slots["close-icon"] ? t._t("close-icon") : s("div", {
                    staticClass: "asd__mobile-close-icon",
                    attrs: {
                        "aria-hidden": "true"
                    }
                }, [t._v("X")])], 2), t._v(" "), s("h3", [t._v(t._s(t.mobileHeader || t.mobileHeaderFallback))])]) : t._e(), t._v(" "), s("div", {
                    staticClass: "asd__datepicker-header"
                }, [s("div", {
                    staticClass: "asd__change-month-button asd__change-month-button--previous"
                }, [s("button", {
                    attrs: {
                        type: "button",
                        "aria-label": t.ariaLabels.previousMonth
                    },
                    on: {
                        click: t.previousMonth
                    }
                }, [t.$slots["previous-month-icon"] ? t._t("previous-month-icon") : s("svg", {
                    attrs: {
                        viewBox: "0 0 1000 1000"
                    }
                }, [s("path", {
                    attrs: {
                        d: "M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"
                    }
                })])], 2)]), t._v(" "), s("div", {
                    staticClass: "asd__change-month-button asd__change-month-button--next"
                }, [s("button", {
                    attrs: {
                        type: "button",
                        "aria-label": t.ariaLabels.nextMonth
                    },
                    on: {
                        click: t.nextMonth
                    }
                }, [t.$slots["next-month-icon"] ? t._t("next-month-icon") : s("svg", {
                    attrs: {
                        viewBox: "0 0 1000 1000"
                    }
                }, [s("path", {
                    attrs: {
                        d: "M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"
                    }
                })])], 2)]), t._v(" "), t._l(t.showMonths, function(e, n) {
                    return s("div", {
                        key: e,
                        staticClass: "asd__days-legend",
                        style: [t.monthWidthStyles, {
                            left: t.width * n + "px"
                        }]
                    }, t._l(t.daysShort, function(e, n) {
                        return s("div", {
                            key: n,
                            staticClass: "asd__day-title"
                        }, [t._v(t._s(e))])
                    }))
                })], 2), t._v(" "), s("div", {
                    staticClass: "asd__inner-wrapper",
                    style: t.innerStyles
                }, [s("transition-group", {
                    attrs: {
                        name: "asd__list-complete",
                        tag: "div"
                    }
                }, t._l(t.months, function(e, n) {
                    return s("div", {
                        key: e.firstDateOfMonth,
                        staticClass: "asd__month",
                        class: {
                            "asd__month--hidden": 0 === n || n > t.showMonths
                        },
                        style: t.monthWidthStyles
                    }, [s("div", {
                        staticClass: "asd__month-name"
                    }, [t.showMonthYearSelect ? s("select", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.monthName,
                            expression: "month.monthName"
                        }, {
                            name: "resize-select",
                            rawName: "v-resize-select"
                        }],
                        staticClass: "asd__month-year-select",
                        attrs: {
                            tabindex: 0 === n || n > t.showMonths ? -1 : 0
                        },
                        on: {
                            change: [function(s) {
                                var n = Array.prototype.filter.call(s.target.options, function(t) {
                                    return t.selected
                                }).map(function(t) {
                                    return "_value" in t ? t._value : t.value
                                });
                                t.$set(e, "monthName", s.target.multiple ? n : n[0])
                            }, function(s) {
                                t.updateMonth(n, e.year, s)
                            }]
                        }
                    }, t._l(t.monthNames, function(i, r) {
                        return s("option", {
                            key: "month-" + n + "-" + i,
                            attrs: {
                                disabled: t.isMonthDisabled(e.year, r)
                            },
                            domProps: {
                                value: i
                            }
                        }, [t._v(t._s(i))])
                    })) : s("span", [t._v(t._s(e.monthName))]), t._v(" "), t.showMonthYearSelect ? s("select", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.year,
                            expression: "month.year"
                        }],
                        staticClass: "asd__month-year-select",
                        attrs: {
                            tabindex: 0 === n || n > t.showMonths ? -1 : 0
                        },
                        on: {
                            change: [function(s) {
                                var n = Array.prototype.filter.call(s.target.options, function(t) {
                                    return t.selected
                                }).map(function(t) {
                                    return "_value" in t ? t._value : t.value
                                });
                                t.$set(e, "year", s.target.multiple ? n : n[0])
                            }, function(s) {
                                t.updateYear(n, e.monthNumber - 1, s)
                            }]
                        }
                    }, [-1 === t.years.indexOf(e.year) ? s("option", {
                        key: "month-" + n + "-" + t.year,
                        attrs: {
                            disabled: !0
                        },
                        domProps: {
                            value: e.year
                        }
                    }, [t._v(t._s(e.year))]) : t._e(), t._v(" "), t._l(t.years, function(e) {
                        return s("option", {
                            key: "month-" + n + "-" + e,
                            domProps: {
                                value: e
                            }
                        }, [t._v(t._s(e))])
                    })], 2) : s("span", [t._v(t._s(e.year))])]), t._v(" "), s("table", {
                        staticClass: "asd__month-table",
                        attrs: {
                            role: "presentation"
                        }
                    }, [s("tbody", t._l(e.weeks, function(e, n) {
                        return s("tr", {
                            key: n,
                            staticClass: "asd__week"
                        }, t._l(e, function(e, n) {
                            var i = e.fullDate,
                                r = e.dayNumber;
                            return s("td", {
                                key: n + "_" + r,
                                ref: "date-" + i,
                                refInFor: !0,
                                staticClass: "asd__day",
                                class: [{
                                    "asd__day--enabled": 0 !== r,
                                    "asd__day--empty": 0 === r,
                                    "asd__day--disabled": t.isDisabled(i),
                                    "asd__day--selected": i && (t.selectedDate1 === i || t.selectedDate2 === i),
                                    "asd__day--in-range": t.isInRange(i),
                                    "asd__day--today": i && t.isToday(i),
                                    "asd__day--hovered": t.isHoveredInRange(i),
                                    "asd__selected-date-one": i && i === t.selectedDate1,
                                    "asd__selected-date-two": i && i === t.selectedDate2
                                }, t.customizedDateClass(i)],
                                style: t.getDayStyles(i),
                                attrs: {
                                    "data-date": i,
                                    tabindex: t.isDateVisible(i) && t.isSameDate(t.focusedDate, i) ? 0 : -1,
                                    "aria-label": !!t.isDateVisible(i) && t.getAriaLabelForDate(i)
                                },
                                on: {
                                    mouseover: function() {
                                        t.setHoverDate(i)
                                    }
                                }
                            }, [r ? s("button", {
                                staticClass: "asd__day-button",
                                attrs: {
                                    type: "button",
                                    tabindex: "-1",
                                    date: i,
                                    disabled: t.isDisabled(i)
                                },
                                on: {
                                    click: function() {
                                        t.selectDate(i)
                                    }
                                }
                            }, [t._v(t._s(r))]) : t._e()])
                        }))
                    }))])])
                })), t._v(" "), t.showShortcutsMenuTrigger ? s("div", {
                    class: {
                        "asd__keyboard-shortcuts-menu": !0, "asd__keyboard-shortcuts-show": t.showKeyboardShortcutsMenu
                    },
                    style: t.keyboardShortcutsMenuStyles
                }, [s("div", {
                    staticClass: "asd__keyboard-shortcuts-title"
                }, [t._v(t._s(t.texts.keyboardShortcuts))]), t._v(" "), s("button", {
                    ref: "keyboard-shortcus-menu-close",
                    staticClass: "asd__keyboard-shortcuts-close",
                    attrs: {
                        tabindex: "0",
                        "aria-label": t.ariaLabels.closeKeyboardShortcutsMenu
                    },
                    on: {
                        click: t.closeKeyboardShortcutsMenu
                    }
                }, [t.$slots["close-shortcuts-icon"] ? t._t("close-shortcuts-icon") : s("div", {
                    staticClass: "asd__mobile-close-icon",
                    attrs: {
                        "aria-hidden": "true"
                    }
                }, [t._v("X")])], 2), t._v(" "), s("ul", {
                    staticClass: "asd__keyboard-shortcuts-list"
                }, t._l(t.keyboardShortcuts, function(e, n) {
                    return s("li", {
                        key: n
                    }, [s("span", {
                        staticClass: "asd__keyboard-shortcuts-symbol",
                        attrs: {
                            "aria-label": e.symbolDescription
                        }
                    }, [t._v(t._s(e.symbol))]), t._v(" " + t._s(e.label) + " ")])
                }))]) : t._e()], 1), t._v(" "), "single" !== t.mode && t.showActionButtons ? s("div", {
                    staticClass: "asd__action-buttons"
                }, [s("button", {
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.closeDatepickerCancel
                    }
                }, [t._v(t._s(t.texts.cancel))]), t._v(" "), s("button", {
                    ref: "apply-button",
                    style: {
                        color: t.colors.selected
                    },
                    attrs: {
                        type: "button"
                    },
                    on: {
                        click: t.apply
                    }
                }, [t._v(t._s(t.texts.apply))])]) : t._e(), t._v(" "), t.showShortcutsMenuTrigger ? s("div", {
                    staticClass: "asd__keyboard-shortcuts-trigger-wrapper"
                }, [s("button", {
                    staticClass: "asd__keyboard-shortcuts-trigger",
                    attrs: {
                        "aria-label": t.ariaLabels.openKeyboardShortcutsMenu,
                        tabindex: "0"
                    },
                    on: {
                        click: t.openKeyboardShortcutsMenu
                    }
                }, [s("span", [t._v("?")])])]) : t._e()])])
            },
            staticRenderFns: [],
            name: "AirbnbStyleDatepicker",
            directives: {
                clickOutside: (function(t, e) {
                    t.exports = function() {
                        var t = "ontouchstart" in window || navigator.msMaxTouchPoints > 0 ? ["touchstart", "click"] : ["click"],
                            e = [];

                        function s(e) {
                            var s = "function" == typeof e;
                            if (!s && "object" != typeof e) throw new Error("v-click-outside: Binding value must be a function or an object");
                            return {
                                handler: s ? e : e.handler,
                                middleware: e.middleware || function(t) {
                                    return t
                                },
                                events: e.events || t
                            }
                        }

                        function n(t) {
                            var e = t.el,
                                s = t.event,
                                n = t.handler,
                                i = t.middleware;
                            s.target !== e && !e.contains(s.target) && i(s, e) && n(s, e)
                        }
                        var i = "undefined" != typeof window ? {
                            bind: function(t, i) {
                                var r = s(i.value),
                                    a = r.handler,
                                    o = r.middleware,
                                    h = {
                                        el: t,
                                        eventHandlers: r.events.map(function(e) {
                                            return {
                                                event: e,
                                                handler: function(e) {
                                                    return n({
                                                        event: e,
                                                        el: t,
                                                        handler: a,
                                                        middleware: o
                                                    })
                                                }
                                            }
                                        })
                                    };
                                h.eventHandlers.forEach(function(t) {
                                    return document.addEventListener(t.event, t.handler)
                                }), e.push(h)
                            },
                            update: function(t, i) {
                                var r = s(i.value),
                                    a = r.handler,
                                    o = r.middleware,
                                    h = r.events,
                                    u = e.find(function(e) {
                                        return e.el === t
                                    });
                                u.eventHandlers.forEach(function(t) {
                                    return document.removeEventListener(t.event, t.handler)
                                }), u.eventHandlers = h.map(function(e) {
                                    return {
                                        event: e,
                                        handler: function(e) {
                                            return n({
                                                event: e,
                                                el: t,
                                                handler: a,
                                                middleware: o
                                            })
                                        }
                                    }
                                }), u.eventHandlers.forEach(function(t) {
                                    return document.addEventListener(t.event, t.handler)
                                })
                            },
                            unbind: function(t) {
                                e.find(function(e) {
                                    return e.el === t
                                }).eventHandlers.forEach(function(t) {
                                    return document.removeEventListener(t.event, t.handler)
                                })
                            },
                            instances: e
                        } : {};
                        return {
                            install: function(t) {
                                t.directive("click-outside", i)
                            },
                            directive: i
                        }
                    }()
                }(lt = {
                    exports: {}
                }, lt.exports), lt.exports).directive,
                resizeSelect: ct
            },
            props: {
                triggerElementId: {
                    type: String
                },
                dateOne: {
                    type: [String, Date]
                },
                dateTwo: {
                    type: [String, Date]
                },
                minDate: {
                    type: [String, Date]
                },
                endDate: {
                    type: [String, Date]
                },
                mode: {
                    type: String,
                    default: "range"
                },
                offsetY: {
                    type: Number,
                    default: 0
                },
                offsetX: {
                    type: Number,
                    default: 0
                },
                monthsToShow: {
                    type: Number,
                    default: 2
                },
                startOpen: {
                    type: Boolean
                },
                fullscreenMobile: {
                    type: Boolean
                },
                inline: {
                    type: Boolean
                },
                mobileHeader: {
                    type: String
                },
                disabledDates: {
                    type: Array,
                    default: function() {
                        return []
                    }
                },
                enabledDates: {
                    type: Array,
                    default: function() {
                        return []
                    }
                },
                customizedDates: {
                    type: Array,
                    default: function() {
                        return []
                    }
                },
                showActionButtons: {
                    type: Boolean,
                    default: !0
                },
                showShortcutsMenuTrigger: {
                    type: Boolean,
                    default: !0
                },
                showMonthYearSelect: {
                    type: Boolean,
                    default: !1
                },
                yearsForSelect: {
                    type: Number,
                    default: 10
                },
                isTest: {
                    type: Boolean,
                    default: function() {
                        return !1
                    }
                },
                trigger: {
                    type: Boolean,
                    default: !1
                },
                closeAfterSelect: {
                    type: Boolean,
                    default: !1
                }
            },
            data: function() {
                return {
                    wrapperId: "airbnb-style-datepicker-wrapper-" + function(t) {
                        for (var e = "", s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = 0; n < t; n++) e += s.charAt(Math.floor(Math.random() * s.length));
                        return e
                    }(5),
                    dateFormat: "YYYY-MM-DD",
                    dateLabelFormat: "dddd, MMMM D, YYYY",
                    showDatepicker: !1,
                    showKeyboardShortcutsMenu: !1,
                    showMonths: 2,
                    colors: {
                        selected: "#00a699",
                        inRange: "#66e2da",
                        selectedText: "#fff",
                        text: "#565a5c",
                        inRangeBorder: "#33dacd",
                        disabled: "#fff",
                        hoveredInRange: "#67f6ee"
                    },
                    sundayFirst: !1,
                    ariaLabels: {
                        chooseDate: function(t) {
                            return t
                        },
                        chooseStartDate: function(t) {
                            return "Choose " + t + " as your start date."
                        },
                        chooseEndDate: function(t) {
                            return "Choose " + t + " as your end date."
                        },
                        selectedDate: function(t) {
                            return "Selected. " + t
                        },
                        unavailableDate: function(t) {
                            return "Not available. " + t
                        },
                        previousMonth: "Move backward to switch to the previous month.",
                        nextMonth: "Move forward to switch to the next month.",
                        closeDatepicker: "Close calendar",
                        openKeyboardShortcutsMenu: "Open keyboard shortcuts menu.",
                        closeKeyboardShortcutsMenu: "Close keyboard shortcuts menu"
                    },
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    daysShort: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
                    texts: {
                        apply: "Apply",
                        cancel: "Cancel",
                        keyboardShortcuts: "Keyboard Shortcuts"
                    },
                    keyboardShortcuts: [{
                        symbol: "↵",
                        label: "Select the date in focus",
                        symbolDescription: "Enter key"
                    }, {
                        symbol: "←/→",
                        label: "Move backward (left) and forward (right) by one day.",
                        symbolDescription: "Left or right arrow keys"
                    }, {
                        symbol: "↑/↓",
                        label: "Move backward (up) and forward (down) by one week.",
                        symbolDescription: "Up or down arrow keys"
                    }, {
                        symbol: "PgUp/PgDn",
                        label: "Switch months.",
                        symbolDescription: "PageUp and PageDown keys"
                    }, {
                        symbol: "Home/End",
                        label: "Go to the first or last day of a week.",
                        symbolDescription: "Home or End keys"
                    }, {
                        symbol: "Esc",
                        label: "Close this panel",
                        symbolDescription: "Escape key"
                    }, {
                        symbol: "?",
                        label: "Open this panel",
                        symbolDescription: "Question mark"
                    }],
                    keys: {
                        arrowDown: 40,
                        arrowUp: 38,
                        arrowRight: 39,
                        arrowLeft: 37,
                        enter: 13,
                        pgUp: 33,
                        pgDn: 34,
                        end: 35,
                        home: 36,
                        questionMark: 191,
                        esc: 27
                    },
                    startingDate: "",
                    months: [],
                    years: [],
                    width: 300,
                    selectedDate1: "",
                    selectedDate2: "",
                    isSelectingDate1: !0,
                    hoverDate: "",
                    focusedDate: "",
                    alignRight: !1,
                    triggerPosition: {},
                    triggerWrapperPosition: {},
                    viewportWidth: void 0,
                    isMobile: void 0,
                    isTablet: void 0,
                    triggerElement: void 0
                }
            },
            computed: {
                wrapperClasses: function() {
                    return {
                        "asd__wrapper--datepicker-open": this.showDatepicker,
                        "asd__wrapper--full-screen": this.showFullscreen,
                        "asd__wrapper--inline": this.inline
                    }
                },
                wrapperStyles: function() {
                    return {
                        position: this.inline ? "static" : "absolute",
                        top: this.inline ? "0" : this.triggerPosition.height + this.offsetY + "px",
                        left: this.alignRight ? "" : this.triggerPosition.left - this.triggerWrapperPosition.left + this.offsetX + "px",
                        right: this.alignRight ? this.triggerWrapperPosition.right - this.triggerPosition.right + this.offsetX + "px" : "",
                        width: this.width * this.showMonths + "px",
                        zIndex: this.inline ? "0" : "100"
                    }
                },
                innerStyles: function() {
                    return {
                        "margin-left": this.showFullscreen ? "-" + this.viewportWidth : "-" + this.width + "px"
                    }
                },
                keyboardShortcutsMenuStyles: function() {
                    return {
                        left: this.showFullscreen ? this.viewportWidth : this.width + "px"
                    }
                },
                monthWidthStyles: function() {
                    return {
                        width: this.showFullscreen ? this.viewportWidth : this.width + "px"
                    }
                },
                mobileHeaderFallback: function() {
                    return "range" === this.mode ? "Select dates" : "Select date"
                },
                showFullscreen: function() {
                    return this.isMobile && this.fullscreenMobile
                },
                datesSelected: function() {
                    return !!(this.selectedDate1 && "" !== this.selectedDate1 || this.selectedDate2 && "" !== this.selectedDate2)
                },
                allDatesSelected: function() {
                    return !(!this.selectedDate1 || "" === this.selectedDate1 || !this.selectedDate2 || "" === this.selectedDate2)
                },
                hasMinDate: function() {
                    return !(!this.minDate || "" === this.minDate)
                },
                isRangeMode: function() {
                    return "range" === this.mode
                },
                isSingleMode: function() {
                    return "single" === this.mode
                },
                datepickerWidth: function() {
                    return this.width * this.showMonths
                },
                datePropsCompound: function() {
                    return this.dateOne + this.dateTwo
                },
                isDateTwoBeforeDateOne: function() {
                    return !!this.dateTwo && ot(this.dateTwo, this.dateOne)
                },
                visibleMonths: function() {
                    for (var t = this.months.filter(function(t, e) {
                            return e > 0
                        }), e = [], s = 0; s < this.showMonths; s++) e.push(s);
                    return e.map(function(e, s) {
                        return t[s].firstDateOfMonth
                    })
                }
            },
            watch: {
                selectedDate1: function(t, e) {
                    var s = t && "" !== t ? P(t, this.dateFormat) : "";
                    this.$emit("date-one-selected", s)
                },
                selectedDate2: function(t, e) {
                    var s = t && "" !== t ? P(t, this.dateFormat) : "";
                    this.$emit("date-two-selected", s)
                },
                mode: function(t, e) {
                    this.setStartDates()
                },
                minDate: function() {
                    this.setStartDates(), this.generateMonths(), this.generateYears()
                },
                endDate: function() {
                    this.generateYears()
                },
                datePropsCompound: function(t) {
                    this.dateOne !== this.selectedDate1 && (this.startingDate = this.dateOne, this.setStartDates(), this.generateMonths(), this.generateYears()), this.isDateTwoBeforeDateOne && (this.selectedDate2 = "", this.$emit("date-two-selected", ""))
                },
                trigger: function(t, e) {
                    var s = this;
                    t && setTimeout(function() {
                        s.openDatepicker()
                    }, 0)
                }
            },
            created: function() {
                this.setupDatepicker(), this.sundayFirst && this.setSundayToFirstDayInWeek()
            },
            mounted: function() {
                var t, e, s, n, i = this;
                this.viewportWidth = window.innerWidth + "px", this.isMobile = window.innerWidth < 768, this.isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024, this._handleWindowResizeEvent = (t = function() {
                    i.positionDatepicker(), i.setStartDates()
                }, e = 200, function() {
                    var i = this,
                        r = arguments,
                        a = s && !n;
                    clearTimeout(n), n = setTimeout(function() {
                        n = null, s || t.apply(i, r)
                    }, e), a && t.apply(i, r)
                }), this._handleWindowClickEvent = function(t) {
                    t.target.id === i.triggerElementId && (t.stopPropagation(), t.preventDefault(), i.toggleDatepicker())
                }, window.addEventListener("resize", this._handleWindowResizeEvent), this.triggerElement = this.isTest ? document.createElement("input") : document.getElementById(this.triggerElementId), this.setStartDates(), this.generateMonths(), this.generateYears(), (this.startOpen || this.inline) && this.openDatepicker(), this.$el.addEventListener("keyup", this.handleKeyboardInput), this.$el.addEventListener("keydown", this.trapKeyboardInput), this.triggerElement.addEventListener("keyup", this.handleTriggerInput), this.triggerElement.addEventListener("click", this._handleWindowClickEvent)
            },
            destroyed: function() {
                window.removeEventListener("resize", this._handleWindowResizeEvent), window.removeEventListener("click", this._handleWindowClickEvent), this.$el.removeEventListener("keyup", this.handleKeyboardInput), this.$el.removeEventListener("keydown", this.trapKeyboardInput), this.triggerElement.removeEventListener("keyup", this.handleTriggerInput), this.triggerElement.removeEventListener("click", this._handleWindowClickEvent)
            },
            methods: {
                getDayStyles: function(t) {
                    var e = this.isSelected(t),
                        s = this.isInRange(t),
                        n = this.isDisabled(t),
                        i = this.isHoveredInRange(t),
                        r = {
                            width: (this.width - 30) / 7 + "px",
                            background: e ? this.colors.selected : i ? this.colors.hoveredInRange : s ? this.colors.inRange : "",
                            color: e ? this.colors.selectedText : s || i ? this.colors.selectedText : this.colors.text,
                            border: e ? "1px double " + this.colors.selected : s && this.allDatesSelected || i ? "1px double " + this.colors.inRangeBorder : ""
                        };
                    return n && (r.background = this.colors.disabled), r
                },
                getAriaLabelForDate: function(t) {
                    var e = P(t, this.dateLabelFormat);
                    return this.isDisabled(t) ? this.ariaLabels.unavailableDate(e) : this.isSelected(t) ? this.ariaLabels.selectedDate(e) : this.isRangeMode ? this.isSelectingDate1 ? this.ariaLabels.chooseStartDate(e) : this.ariaLabels.chooseEndDate(e) : this.ariaLabels.chooseDate(e)
                },
                handleClickOutside: function(t) {
                    t.target.id !== this.triggerElementId && this.showDatepicker && !this.inline && this.closeDatepicker()
                },
                shouldHandleInput: function(t, e) {
                    return t.keyCode === e && (!t.shiftKey || 191 === t.keyCode) && this.showDatepicker
                },
                handleTriggerInput: function(t) {
                    "single" === this.mode && this.setDateFromText(t.target.value)
                },
                trapKeyboardInput: function(t) {
                    var e = this,
                        s = Object.keys(this.keys).map(function(t) {
                            return e.keys[t]
                        });
                    s.splice(s.indexOf(13), 1), s.indexOf(t.keyCode) > -1 && t.preventDefault()
                },
                handleKeyboardInput: function(t) {
                    if (this.shouldHandleInput(t, this.keys.esc)) this.showKeyboardShortcutsMenu ? this.closeKeyboardShortcutsMenu() : this.closeDatepicker();
                    else if (this.showKeyboardShortcutsMenu);
                    else if (this.shouldHandleInput(t, this.keys.arrowDown)) {
                        var e = nt(this.focusedDate, 1),
                            s = !q(e, this.focusedDate);
                        this.setFocusedDate(e), s && this.nextMonth()
                    } else if (this.shouldHandleInput(t, this.keys.arrowUp)) {
                        var n = it(this.focusedDate, 1),
                            i = !q(n, this.focusedDate);
                        this.setFocusedDate(n), i && this.previousMonth()
                    } else if (this.shouldHandleInput(t, this.keys.arrowRight)) {
                        var r = et(this.focusedDate, 1),
                            a = !q(r, this.focusedDate);
                        this.setFocusedDate(r), a && this.nextMonth()
                    } else if (this.shouldHandleInput(t, this.keys.arrowLeft)) {
                        var o = st(this.focusedDate, 1),
                            h = !q(o, this.focusedDate);
                        this.setFocusedDate(o), h && this.previousMonth()
                    } else if (this.shouldHandleInput(t, this.keys.enter)) {
                        var u = t.target;
                        !this.showKeyboardShortcutsMenu && u && "TD" === u.tagName && this.selectDate(this.focusedDate)
                    } else if (this.shouldHandleInput(t, this.keys.pgUp)) this.setFocusedDate(X(this.focusedDate, 1)), this.previousMonth();
                    else if (this.shouldHandleInput(t, this.keys.pgDn)) this.setFocusedDate(j(this.focusedDate, 1)), this.nextMonth();
                    else if (this.shouldHandleInput(t, this.keys.home)) {
                        var l = Y(this.focusedDate, {
                                weekStartsOn: this.sundayFirst ? 0 : 1
                            }),
                            c = !q(l, this.focusedDate);
                        this.setFocusedDate(l), c && this.previousMonth()
                    } else if (this.shouldHandleInput(t, this.keys.end)) {
                        var d = at(this.focusedDate, {
                                weekStartsOn: this.sundayFirst ? 0 : 1
                            }),
                            f = !q(d, this.focusedDate);
                        this.setFocusedDate(d), f && this.nextMonth()
                    } else this.shouldHandleInput(t, this.keys.questionMark) && this.openKeyboardShortcutsMenu()
                },
                setDateFromText: function(t) {
                    if (t && !(t.length < 10)) {
                        var e = t.match(/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/),
                            s = t.match(/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])[.](0[1-9]|1[0-2])[.](\d{4})$/);
                        if (e || s) {
                            s && (t = t.substring(6, 10) + "-" + t.substring(3, 5) + "-" + t.substring(0, 2));
                            var n = new Date(t);
                            if (N(n)) {
                                var i = P(n, this.dateFormat);
                                this.isDateDisabled(i) || this.isBeforeMinDate(i) || this.isAfterEndDate(i) || (this.startingDate = X(i, 1), this.generateMonths(), this.generateYears(), this.selectDate(i))
                            }
                        }
                    }
                },
                isMonthDisabled: function(t, e) {
                    var s = new Date(t, e);
                    return !(!this.hasMinDate || !ot(s, rt(this.minDate))) || this.isAfterEndDate(s)
                },
                generateMonths: function() {
                    this.months = [];
                    for (var t = this.startingDate, e = 0; e < this.showMonths + 2; e++) this.months.push(this.getMonth(t)), t = this.addMonths(t)
                },
                generateYears: function() {
                    if (this.showMonthYearSelect) {
                        this.years = [];
                        for (var t = V(this.startingDate), e = this.minDate ? V(this.minDate) : t - this.yearsForSelect, s = this.endDate ? V(this.endDate) : t + this.yearsForSelect, n = e; n <= s; n++) this.years.push(n.toString())
                    }
                },
                setupDatepicker: function() {
                    if (this.$options.ariaLabels && (this.ariaLabels = ut(this.$options.ariaLabels)), this.$options.keyboardShortcuts && (this.keyboardShortcuts = ut(this.$options.keyboardShortcuts)), this.$options.dateLabelFormat && (this.dateLabelFormat = ut(this.$options.dateLabelFormat)), this.$options.sundayFirst && (this.sundayFirst = ut(this.$options.sundayFirst)), this.$options.colors) {
                        var t = ut(this.$options.colors);
                        this.colors.selected = t.selected || this.colors.selected, this.colors.inRange = t.inRange || this.colors.inRange, this.colors.hoveredInRange = t.hoveredInRange || this.colors.hoveredInRange, this.colors.selectedText = t.selectedText || this.colors.selectedText, this.colors.text = t.text || this.colors.text, this.colors.inRangeBorder = t.inRangeBorder || this.colors.inRangeBorder, this.colors.disabled = t.disabled || this.colors.disabled
                    }
                    if (this.$options.monthNames && 12 === this.$options.monthNames.length && (this.monthNames = ut(this.$options.monthNames)), this.$options.days && 7 === this.$options.days.length && (this.days = ut(this.$options.days)), this.$options.daysShort && 7 === this.$options.daysShort.length && (this.daysShort = ut(this.$options.daysShort)), this.$options.texts) {
                        var e = ut(this.$options.texts);
                        this.texts.apply = e.apply || this.texts.apply, this.texts.cancel = e.cancel || this.texts.cancel
                    }
                },
                setStartDates: function() {
                    var t = this.dateOne || new Date;
                    this.hasMinDate && ot(t, this.minDate) && (t = this.minDate), this.startingDate = this.subtractMonths(t), this.selectedDate1 = this.dateOne, this.selectedDate2 = this.dateTwo, this.focusedDate = t
                },
                setSundayToFirstDayInWeek: function() {
                    var t = this.days.pop();
                    this.days.unshift(t);
                    var e = this.daysShort.pop();
                    this.daysShort.unshift(e)
                },
                getMonth: function(t) {
                    var e = P(t, "YYYY-MM-01"),
                        s = P(t, "YYYY"),
                        n = parseInt(P(t, "M"));
                    return {
                        year: s,
                        firstDateOfMonth: e,
                        monthName: this.monthNames[n - 1],
                        monthNumber: n,
                        weeks: this.getWeeks(e)
                    }
                },
                getWeeks: function(t) {
                    var e = {
                            dayNumber: 0
                        },
                        s = U(t),
                        n = P(t, "YYYY"),
                        i = P(t, "MM"),
                        r = parseInt(P(t, this.sundayFirst ? "d" : "E"));
                    this.sundayFirst && r++;
                    for (var a = [], o = [], h = 1; h < r; h++) o.push(e);
                    for (var u = 0; u < s; u++) {
                        var l = u >= s - 1,
                            c = u + 1,
                            d = c < 10 ? "0" + c : c;
                        if (o.push({
                                dayNumber: c,
                                dayNumberFull: d,
                                fullDate: n + "-" + i + "-" + d
                            }), 7 === o.length) a.push(o), o = [];
                        else if (l) {
                            for (var f = 0; f < 7 - o.length; f++) o.push(e);
                            a.push(o), o = []
                        }
                    }
                    return a
                },
                selectDate: function(t) {
                    if (!(this.isBeforeMinDate(t) || this.isAfterEndDate(t) || this.isDateDisabled(t))) return "single" === this.mode ? (this.selectedDate1 = t, void this.closeDatepicker()) : void(this.isSelectingDate1 || ot(t, this.selectedDate1) ? (this.selectedDate1 = t, this.isSelectingDate1 = !1, ot(this.selectedDate2, t) && (this.selectedDate2 = "")) : (this.selectedDate2 = t, this.isSelectingDate1 = !0, ht(this.selectedDate1, t) ? this.selectedDate1 = "" : this.showActionButtons && this.$refs["apply-button"].focus(), this.allDatesSelected && this.closeAfterSelect && this.closeDatepicker()))
                },
                setHoverDate: function(t) {
                    this.hoverDate = t
                },
                setFocusedDate: function(t) {
                    var e = P(t, this.dateFormat);
                    this.focusedDate = e;
                    var s = this.$refs["date-" + e];
                    s && s.length && setTimeout(function() {
                        s[0].focus()
                    }, 10)
                },
                resetFocusedDate: function(t) {
                    if (this.focusedDate && !this.isDateVisible(this.focusedDate)) {
                        var e = t ? 0 : this.visibleMonths.length - 1,
                            s = this.visibleMonths[e],
                            n = J(s),
                            i = V(s),
                            r = Q(Z(this.focusedDate, n), i);
                        this.focusedDate = P(r, this.dateFormat)
                    }
                },
                isToday: function(t) {
                    return P(new Date, this.dateFormat) === t
                },
                isSameDate: function(t, e) {
                    return tt(t, e)
                },
                isSelected: function(t) {
                    if (t) return this.selectedDate1 === t || this.selectedDate2 === t
                },
                isInRange: function(t) {
                    return !(!this.allDatesSelected || this.isSingleMode) && (ht(t, this.selectedDate1) && ot(t, this.selectedDate2) || ht(t, this.selectedDate1) && ot(t, this.hoverDate) && !this.allDatesSelected)
                },
                isHoveredInRange: function(t) {
                    return !this.isSingleMode && !this.allDatesSelected && (ht(t, this.selectedDate1) && ot(t, this.hoverDate) || ht(t, this.hoverDate) && ot(t, this.selectedDate1))
                },
                isBeforeMinDate: function(t) {
                    return !!this.minDate && ot(t, this.minDate)
                },
                isAfterEndDate: function(t) {
                    return !!this.endDate && ht(t, this.endDate)
                },
                isDateVisible: function(t) {
                    if (!t) return !1;
                    var e = st(this.visibleMonths[0], 1),
                        s = et(G(this.visibleMonths[this.monthsToShow - 1]), 1);
                    return ht(t, e) && ot(t, s)
                },
                isDateDisabled: function(t) {
                    return this.enabledDates.length > 0 ? -1 === this.enabledDates.indexOf(t) : this.disabledDates.indexOf(t) > -1
                },
                customizedDateClass: function(t) {
                    var e = "";
                    if (this.customizedDates.length > 0)
                        for (var s = 0; s < this.customizedDates.length; s++) this.customizedDates[s].dates.indexOf(t) > -1 && (e += " asd__day--" + this.customizedDates[s].cssClass);
                    return e
                },
                isDisabled: function(t) {
                    return this.isDateDisabled(t) || this.isBeforeMinDate(t) || this.isAfterEndDate(t)
                },
                previousMonth: function() {
                    this.startingDate = this.subtractMonths(this.months[0].firstDateOfMonth), this.months.unshift(this.getMonth(this.startingDate)), this.months.splice(this.months.length - 1, 1), this.$emit("previous-month", this.visibleMonths), this.resetFocusedDate(!1)
                },
                nextMonth: function() {
                    this.startingDate = this.addMonths(this.months[this.months.length - 1].firstDateOfMonth), this.months.push(this.getMonth(this.startingDate)), this.months.splice(0, 1), this.$emit("next-month", this.visibleMonths), this.resetFocusedDate(!0)
                },
                subtractMonths: function(t) {
                    return P(X(t, 1), this.dateFormat)
                },
                addMonths: function(t) {
                    return P(j(t, 1), this.dateFormat)
                },
                toggleDatepicker: function() {
                    this.showDatepicker ? this.closeDatepicker() : this.openDatepicker()
                },
                updateMonth: function(t, e, s) {
                    var n = s.target.value,
                        i = this.monthNames.indexOf(n),
                        r = Q(Z(this.startingDate, i), e);
                    this.startingDate = X(r, t), this.generateMonths()
                },
                updateYear: function(t, e, s) {
                    var n = s.target.value,
                        i = Q(Z(this.startingDate, e), n);
                    this.startingDate = X(i, t), this.generateMonths()
                },
                openDatepicker: function() {
                    var t = this;
                    this.positionDatepicker(), this.setStartDates(), this.triggerElement.classList.add("datepicker-open"), this.showDatepicker = !0, this.initialDate1 = this.dateOne, this.initialDate2 = this.dateTwo, this.$emit("opened"), this.$nextTick(function() {
                        t.inline || t.setFocusedDate(t.focusedDate)
                    })
                },
                closeDatepickerCancel: function() {
                    this.showDatepicker && (this.selectedDate1 = this.initialDate1, this.selectedDate2 = this.initialDate2, this.$emit("cancelled"), this.closeDatepicker())
                },
                closeDatepicker: function() {
                    this.inline || (this.showDatepicker = !1, this.showKeyboardShortcutsMenu = !1, this.triggerElement.classList.remove("datepicker-open"), this.$emit("closed"))
                },
                openKeyboardShortcutsMenu: function() {
                    this.showKeyboardShortcutsMenu = !0;
                    var t = this.$refs["keyboard-shortcus-menu-close"];
                    this.$nextTick(function() {
                        return t.focus()
                    })
                },
                closeKeyboardShortcutsMenu: function() {
                    var t = this;
                    this.showKeyboardShortcutsMenu = !1, this.$nextTick(function() {
                        return t.setFocusedDate(t.focusedDate)
                    })
                },
                apply: function() {
                    this.$emit("apply"), this.closeDatepicker()
                },
                positionDatepicker: function() {
                    var t = function(t, e) {
                        if (!t) return null;
                        if ("function" == typeof t.closest) return t.closest(e) || null;
                        for (; t;) {
                            if (t.matches(e)) return t;
                            t = t.parentElement
                        }
                        return null
                    }(this.triggerElement, ".datepicker-trigger");
                    this.triggerPosition = this.triggerElement.getBoundingClientRect(), this.triggerWrapperPosition = t ? t.getBoundingClientRect() : {
                        left: 0,
                        right: 0
                    };
                    var e = document.documentElement.clientWidth || window.innerWidth;
                    this.viewportWidth = e + "px", this.isMobile = e < 768, this.isTablet = e >= 768 && e <= 1024, this.showMonths = this.isMobile ? 1 : this.isTablet && this.monthsToShow > 2 ? 2 : this.monthsToShow, this.$nextTick(function() {
                        var t = document.getElementById(this.wrapperId);
                        if (this.triggerElement && t) {
                            var s = this.triggerElement.getBoundingClientRect().left + t.getBoundingClientRect().width;
                            this.alignRight = s > e
                        }
                    })
                }
            }
        },
        pt = {
            install: function(t, e) {
                t.component(ft.name, Object.assign({}, e, ft))
            }
        };
    return "undefined" != typeof window && window.Vue && (window.AirbnbStyleDatepicker = pt), pt
});
//# sourceMappingURL=vue-airbnb-style-datepicker.min.js.map