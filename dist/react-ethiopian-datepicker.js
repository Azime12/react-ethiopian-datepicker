import { jsxs as h, jsx as r, Fragment as K } from "react/jsx-runtime";
import { useState as D, useRef as _, useEffect as R, useCallback as W } from "react";
import { createPortal as ye } from "react-dom";
function me(e, t, n) {
  const a = Math.floor((14 - t) / 12), s = e + 4800 - a, l = t + 12 * a - 3;
  return n + Math.floor((153 * l + 2) / 5) + 365 * s + Math.floor(s / 4) - Math.floor(s / 100) + Math.floor(s / 400) - 32045;
}
function re(e) {
  const t = e + 32044, n = Math.floor((4 * t + 3) / 146097), a = t - Math.floor(146097 * n / 4), s = Math.floor((4 * a + 3) / 1461), l = a - Math.floor(1461 * s / 4), f = Math.floor((5 * l + 2) / 153);
  return {
    day: l - Math.floor((153 * f + 2) / 5) + 1,
    month: f + 3 - 12 * Math.floor(f / 10),
    year: 100 * n + s - 4800 + Math.floor(f / 10)
  };
}
const oe = 1724221;
function ne(e, t, n) {
  const a = Math.floor((e - 1) / 4), s = (e - 1) % 4, l = [0, 365, 730, 1096][s];
  return oe + 1461 * a + l + 30 * (t - 1) + (n - 1);
}
function fe(e) {
  const t = e - oe, n = Math.floor(t / 1461), a = t % 1461;
  let s, l;
  return a < 365 ? (s = 0, l = a) : a < 730 ? (s = 1, l = a - 365) : a < 1096 ? (s = 2, l = a - 730) : (s = 3, l = a - 1096), {
    year: 4 * n + s + 1,
    month: Math.floor(l / 30) + 1,
    day: l % 30 + 1
  };
}
const ge = (e) => e % 4 === 3, ae = (e, t) => t < 13 ? 30 : ge(e) ? 6 : 5, be = (e, t) => new Date(e, t, 0).getDate(), xe = (e, t) => new Date(e, t - 1, 1).getDay(), ve = (e, t) => {
  const n = re(ne(e, t, 1));
  return new Date(n.year, n.month - 1, n.day).getDay();
}, Y = (e) => fe(me(e.getFullYear(), e.getMonth() + 1, e.getDate())), we = (e, t, n) => {
  const a = re(ne(e, t, n));
  return new Date(a.year, a.month - 1, a.day);
}, le = ["መስከረም", "ጥቅምት", "ሕዳር", "ታሕሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ፓጉሜ"], ke = ["እሑ", "ሰኞ", "ማክ", "ረቡ", "ሐሙ", "ዓር", "ቅዳ"], Ne = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Ce = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Q = (e) => e ? `${le[e.month - 1]} ${e.day}፣ ${e.year} ዓ.ም` : "", Me = (e) => e ? e.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "", Se = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 13 } : { year: e, month: t - 1 }, De = ({ year: e, month: t }) => t === 13 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, Ee = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 12 } : { year: e, month: t - 1 }, Le = ({ year: e, month: t }) => t === 12 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, se = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m15 18-6-6 6-6" }) }), ce = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m9 18 6-6-6-6" }) }), B = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
  /* @__PURE__ */ r("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
  /* @__PURE__ */ r("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
  /* @__PURE__ */ r("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
] }), Z = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ r("path", { d: "m6 6 12 12" })
] }), ee = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("path", { d: "m3 16 4 4 4-4" }),
  /* @__PURE__ */ r("path", { d: "M7 20V4" }),
  /* @__PURE__ */ r("path", { d: "m21 8-4-4-4 4" }),
  /* @__PURE__ */ r("path", { d: "M17 4v16" })
] }), b = (...e) => e.filter(Boolean).join(" ");
function F({ label: e, isToday: t, isSelected: n, isEmpty: a, onClick: s, customClasses: l = {} }) {
  return a ? /* @__PURE__ */ r("div", { className: "w-9 h-9" }) : /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: s,
      className: b(
        "w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-100 focus:outline-none select-none",
        n ? "shadow-md scale-105 font-bold" : "",
        l.base
      ),
      style: {
        backgroundColor: n ? "var(--dp-selected-bg)" : t ? "var(--dp-primary-alpha)" : "transparent",
        color: n ? "#fff" : t ? "var(--dp-accent)" : "var(--dp-text)",
        boxShadow: n ? "0 4px 12px var(--dp-selected-shadow)" : "none",
        border: t && !n ? "2px solid var(--dp-today-ring)" : "none"
      },
      children: e
    }
  );
}
function te({
  onPrev: e,
  onNext: t,
  month: n,
  monthList: a = [],
  onMonthChange: s,
  badge: l,
  year: f,
  yearSuffix: m = "",
  yearRange: g = [],
  onYearChange: y,
  customClasses: d = {},
  Icons: c
}) {
  const [p, x] = D(!1), [k, L] = D(!1), N = _(null), M = _(null);
  R(() => {
    if (!p || !N.current) return;
    const i = N.current.querySelector('[data-selected="true"]');
    i && i.scrollIntoView({ block: "center" });
  }, [p]), R(() => {
    if (!k || !M.current) return;
    const i = M.current.querySelector('[data-selected="true"]');
    i && i.scrollIntoView({ block: "center" });
  }, [k]);
  const w = () => {
    x((i) => !i), L(!1);
  }, j = () => {
    L((i) => !i), x(!1);
  }, I = (i) => ({
    backgroundColor: i ? "var(--dp-primary)" : "var(--dp-primary-alpha)",
    color: i ? "#fff" : "var(--dp-accent)"
  }), E = (i) => ({
    backgroundColor: i ? "var(--dp-primary)" : "transparent",
    color: i ? "#fff" : "var(--dp-text)"
  }), G = b("absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 overflow-y-auto rounded-xl border shadow-2xl", d.dropdown), S = c.ChevronLeft || se, C = c.ChevronRight || ce;
  return /* @__PURE__ */ h("div", { className: b("flex items-center justify-between mb-3", d.container), children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: e,
        className: b("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", d.navBtn),
        style: { color: "var(--dp-text-muted)" },
        children: /* @__PURE__ */ r(S, { size: 16 })
      }
    ),
    /* @__PURE__ */ h("div", { className: "flex items-center gap-1 select-none", children: [
      a.length > 0 && s ? /* @__PURE__ */ h("div", { className: "relative", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: w,
            style: I(p),
            className: b("text-xs font-bold px-2.5 py-1 rounded-lg transition-all", d.picker),
            children: [
              a[n - 1],
              " ",
              l && /* @__PURE__ */ r("span", { className: "ml-0.5", children: l }),
              "▾"
            ]
          }
        ),
        p && /* @__PURE__ */ r(
          "div",
          {
            ref: N,
            className: b(G, "w-32 max-h-44"),
            style: {
              scrollbarWidth: "thin",
              backgroundColor: "var(--dp-bg)",
              borderColor: "var(--dp-border)"
            },
            children: a.map((i, v) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                "data-selected": v + 1 === n ? "true" : "false",
                onClick: () => {
                  s(v + 1), x(!1);
                },
                className: b("w-full text-center text-xs py-2 transition-colors whitespace-nowrap px-3 hover:bg-[var(--dp-border)]"),
                style: E(v + 1 === n),
                children: i
              },
              v
            ))
          }
        )
      ] }) : null,
      g.length > 0 && y ? /* @__PURE__ */ h("div", { className: "relative", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: j,
            style: I(k),
            className: b("text-xs font-bold px-2.5 py-1 rounded-lg transition-all", d.picker),
            children: [
              f,
              m,
              " ▾"
            ]
          }
        ),
        k && /* @__PURE__ */ r(
          "div",
          {
            ref: M,
            className: b(G, "w-28 max-h-44"),
            style: {
              scrollbarWidth: "thin",
              backgroundColor: "var(--dp-bg)",
              borderColor: "var(--dp-border)"
            },
            children: g.map((i) => /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                "data-selected": i === f ? "true" : "false",
                onClick: () => {
                  y(i), L(!1);
                },
                className: b("w-full text-center text-xs py-2 transition-colors whitespace-nowrap px-3 hover:bg-[var(--dp-border)]"),
                style: E(i === f),
                children: [
                  i,
                  m
                ]
              },
              i
            ))
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: t,
        className: b("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", d.navBtn),
        style: { color: "var(--dp-text-muted)" },
        children: /* @__PURE__ */ r(C, { size: 16 })
      }
    )
  ] });
}
function Ie({ year: e, month: t, selectedEth: n, todayEth: a, onSelect: s, labels: l = {}, customClasses: f = {} }) {
  const m = ve(e, t), g = ae(e, t), y = l.days || ke, d = [];
  for (let c = 0; c < m; c++) d.push(null);
  for (let c = 1; c <= g; c++) d.push(c);
  return /* @__PURE__ */ h("div", { className: "grid grid-cols-7 gap-y-1 gap-x-0.5", children: [
    y.map((c) => /* @__PURE__ */ r(
      "div",
      {
        className: b("w-9 h-7 flex items-center justify-center font-bold", f.weekday),
        style: { color: "var(--dp-accent)", fontSize: "10.5px", opacity: 0.9 },
        children: c
      },
      c
    )),
    d.map(
      (c, p) => c === null ? /* @__PURE__ */ r(F, { isEmpty: !0 }, `b${p}`) : /* @__PURE__ */ r(
        F,
        {
          label: c,
          customClasses: f.dayCell,
          isToday: !!(a && c === a.day && t === a.month && e === a.year),
          isSelected: !!(n && c === n.day && t === n.month && e === n.year),
          onClick: () => s(e, t, c)
        },
        `d${c}`
      )
    )
  ] });
}
function je({ year: e, month: t, selectedDate: n, today: a, onSelect: s, labels: l = {}, customClasses: f = {} }) {
  const m = xe(e, t), g = be(e, t), y = l.days || Ce, d = [];
  for (let p = 0; p < m; p++) d.push(null);
  for (let p = 1; p <= g; p++) d.push(p);
  const c = (p, x) => x && p === x.getDate() && t === x.getMonth() + 1 && e === x.getFullYear();
  return /* @__PURE__ */ h("div", { className: "grid grid-cols-7 gap-y-1 gap-x-0.5", children: [
    y.map((p) => /* @__PURE__ */ r(
      "div",
      {
        className: b("w-9 h-7 flex items-center justify-center font-bold", f.weekday),
        style: { color: "var(--dp-accent)", fontSize: "10.5px", opacity: 0.8 },
        children: p
      },
      p
    )),
    d.map(
      (p, x) => p === null ? /* @__PURE__ */ r(F, { isEmpty: !0 }, `b${x}`) : /* @__PURE__ */ r(
        F,
        {
          label: p,
          customClasses: f.dayCell,
          isToday: !!c(p, a),
          isSelected: !!c(p, n),
          onClick: () => s(new Date(e, t - 1, p))
        },
        `d${p}`
      )
    )
  ] });
}
function Ge({ anchorRef: e, children: t, dropW: n = 316 }) {
  const [a, s] = D({ opacity: 0 }), l = W(() => {
    if (!e.current) return;
    const f = e.current.getBoundingClientRect();
    let m = f.left + window.scrollX;
    m + n > window.innerWidth - 8 && (m = window.innerWidth - n - 8), m < 8 && (m = 8), s({
      position: "absolute",
      top: f.bottom + window.scrollY + 6,
      left: m,
      width: n,
      zIndex: 99999,
      opacity: 1,
      transition: "opacity 0.15s ease-out"
    });
  }, [e, n]);
  return R(() => (l(), window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
    window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
  }), [l]), ye(/* @__PURE__ */ r("div", { style: a, children: t }), document.body);
}
function Fe({
  value: e = null,
  onChange: t,
  defaultCalendar: n = "ethiopian",
  label: a,
  placeholder: s = "ቀን ይምረጡ…",
  disabled: l = !1,
  customization: f = {}
}) {
  var J, X, V, q, U;
  const { labels: m = {}, classes: g = {}, config: y = {}, colors: d = {} } = f, c = {
    Calendar: ((J = y.icons) == null ? void 0 : J.Calendar) || B,
    X: ((X = y.icons) == null ? void 0 : X.X) || Z,
    ChevronLeft: ((V = y.icons) == null ? void 0 : V.ChevronLeft) || se,
    ChevronRight: ((q = y.icons) == null ? void 0 : q.ChevronRight) || ce,
    Switch: ((U = y.icons) == null ? void 0 : U.Switch) || ee
  }, p = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-2",
    md: "px-4 py-2.5 text-sm rounded-xl gap-3",
    lg: "px-5 py-3.5 text-base rounded-2xl gap-4"
  }[y.inputSize || "md"], x = {
    "--dp-primary": d.primary || "#7c3aed",
    "--dp-primary-alpha": d.primary ? `${d.primary}26` : "rgba(124, 58, 237, 0.15)",
    "--dp-bg": d.background || "#111827",
    "--dp-bg-alt": d.backgroundAlt || "rgba(0, 0, 0, 0.2)",
    "--dp-border": d.border || "rgba(255, 255, 255, 0.1)",
    "--dp-text": d.text || "#f3f4f6",
    "--dp-text-muted": d.textMuted || "#9ca3af",
    "--dp-accent": d.accent || "#a78bfa",
    "--dp-today-ring": d.todayRing || "#a78bfa",
    "--dp-selected-bg": d.selectedBg || "#7c3aed",
    "--dp-selected-shadow": d.selectedShadow || "rgba(109, 40, 217, 0.4)",
    fontSize: y.fontSize || "inherit",
    fontFamily: y.fontFamily || "inherit"
  }, k = /* @__PURE__ */ new Date(), L = Y(k), [N, M] = D(!1), [w, j] = D(n), [I, E] = D(null), G = e ? Y(e) : L, [S, C] = D({ year: G.year, month: G.month }), [i, v] = D({
    year: e ? e.getFullYear() : k.getFullYear(),
    month: e ? e.getMonth() + 1 : k.getMonth() + 1
  }), A = _(null);
  R(() => {
    if (!N) return;
    const o = (u) => {
      var T;
      (T = A.current) != null && T.contains(u.target) || u.target.closest("[data-eth-dp]") || M(!1);
    };
    return document.addEventListener("mousedown", o, !0), () => document.removeEventListener("mousedown", o, !0);
  }, [N]), R(() => {
    if (!e) {
      E(null);
      return;
    }
    if (!I) {
      const o = Y(e);
      C({ year: o.year, month: o.month });
    }
    v({ year: e.getFullYear(), month: e.getMonth() + 1 });
  }, [e, I]);
  const z = I ?? (e ? Y(e) : null), $ = W((o, u, T) => {
    E({ year: o, month: u, day: T }), C({ year: o, month: u }), t == null || t(we(o, u, T)), M(!1);
  }, [t]), H = W((o) => {
    E(null), v({ year: o.getFullYear(), month: o.getMonth() + 1 }), t == null || t(o), M(!1);
  }, [t]), ie = (o) => {
    o.stopPropagation(), E(null), t == null || t(null);
  }, de = e ? w === "ethiopian" ? Q(z) : Me(e) : "", O = w === "ethiopian" && S.month === 13, P = O ? ae(S.year, 13) : 0, pe = c.Calendar || B, he = c.X || Z, ue = c.Switch || ee;
  return /* @__PURE__ */ h("div", { style: x, className: "eth-dp-theme-root", children: [
    /* @__PURE__ */ h("div", { ref: A, className: b("relative w-full", g.container), children: [
      a && /* @__PURE__ */ r("label", { className: "block text-xs font-semibold mb-1.5 uppercase tracking-wider", style: { color: "var(--dp-text-muted)" }, children: a }),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          disabled: l,
          onClick: () => {
            l || M((o) => !o);
          },
          className: b(
            "w-full flex items-center border text-left transition-all duration-200 focus:outline-none",
            p,
            l ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--dp-border)]",
            g.trigger
          ),
          style: {
            backgroundColor: "var(--dp-bg-alt)",
            borderColor: N ? "var(--dp-primary)" : "var(--dp-border)",
            boxShadow: N ? "0 0 0 4px var(--dp-primary-alpha)" : "none"
          },
          children: [
            /* @__PURE__ */ r(pe, { size: y.inputSize === "sm" ? 13 : 15, style: { color: "var(--dp-accent)" }, className: "shrink-0" }),
            /* @__PURE__ */ r("span", { className: "flex-1 truncate", style: { color: e ? "var(--dp-text)" : "var(--dp-text-muted)" }, children: de || s }),
            e && !l && !y.hideClear && /* @__PURE__ */ r(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: ie,
                className: "p-0.5 rounded hover:bg-white/10 transition-colors shrink-0",
                style: { color: "var(--dp-text-muted)" },
                children: /* @__PURE__ */ r(he, { size: y.inputSize === "sm" ? 12 : 14 })
              }
            )
          ]
        }
      )
    ] }),
    N && /* @__PURE__ */ r(Ge, { anchorRef: A, dropW: y.dropdownWidth || 316, children: /* @__PURE__ */ h(
      "div",
      {
        "data-eth-dp": "true",
        className: b("rounded-2xl border shadow-2xl overflow-hidden", g.dropdown),
        style: {
          ...x,
          backgroundColor: "var(--dp-bg)",
          borderColor: "var(--dp-border)",
          color: "var(--dp-text)",
          animation: "dpIn 0.16s cubic-bezier(.22,.68,0,1.2) both",
          zIndex: 999999
        },
        children: [
          /* @__PURE__ */ h("div", { className: "flex items-center justify-between px-4 py-2.5 border-b", style: { borderColor: "var(--dp-border)", backgroundColor: "var(--dp-bg-alt)" }, children: [
            /* @__PURE__ */ h("div", { className: "flex rounded-lg p-0.5 gap-0.5", style: { backgroundColor: "var(--dp-border)" }, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => j("ethiopian"),
                  className: "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                  style: {
                    backgroundColor: w === "ethiopian" ? "var(--dp-primary)" : "transparent",
                    color: w === "ethiopian" ? "#fff" : "var(--dp-text-muted)"
                  },
                  children: m.ethTab || "🇪🇹 ኢትዮጵያ"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => j("gregorian"),
                  className: "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                  style: {
                    backgroundColor: w === "gregorian" ? "var(--dp-primary)" : "transparent",
                    color: w === "gregorian" ? "#fff" : "var(--dp-text-muted)"
                  },
                  children: m.gregTab || "🌍 Gregorian"
                }
              )
            ] }),
            !y.hideSwitch && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => j((o) => o === "ethiopian" ? "gregorian" : "ethiopian"),
                className: "w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10",
                style: { color: "var(--dp-text-muted)" },
                children: /* @__PURE__ */ r(ue, { size: 13 })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "p-4", children: w === "ethiopian" ? /* @__PURE__ */ h(K, { children: [
            /* @__PURE__ */ r(
              te,
              {
                Icons: c,
                month: S.month,
                monthList: m.ethiopianMonths || le,
                onMonthChange: (o) => C((u) => ({ ...u, month: o })),
                badge: O ? /* @__PURE__ */ h("span", { className: "text-[10px] bg-amber-400/10 border border-amber-400/20 px-1 py-0.5 rounded-full ml-0.5 text-amber-400", children: [
                  P,
                  m.pagumeSuffix || "ቀ"
                ] }) : null,
                year: S.year,
                yearSuffix: " ዓ.ም",
                yearRange: y.yearRangeEth || Array.from({ length: 201 }, (o, u) => 1950 + u),
                onYearChange: (o) => C((u) => ({ ...u, year: o })),
                onPrev: () => C((o) => Se(o)),
                onNext: () => C((o) => De(o)),
                customClasses: g.header
              }
            ),
            /* @__PURE__ */ r(
              Ie,
              {
                year: S.year,
                month: S.month,
                selectedEth: z,
                todayEth: L,
                onSelect: $,
                labels: { days: m.ethiopianDays },
                customClasses: { weekday: g.weekday, dayCell: g.dayCell }
              }
            ),
            O && /* @__PURE__ */ h("div", { className: "mt-3 rounded-lg border px-3 py-2 text-[11px] text-center leading-relaxed", style: { backgroundColor: "rgba(251, 191, 36, 0.1)", borderColor: "rgba(251, 191, 36, 0.2)", color: "#fcd34d" }, children: [
              "ፓጉሜ ",
              P,
              " ቀናት አሉት",
              P === 6 ? " · ዘመነ ዮሐንስ (የሐሙስ ዓመት)" : " · ዘመነ ማቴዎስ / ማርቆስ / ሉቃስ"
            ] })
          ] }) : /* @__PURE__ */ h(K, { children: [
            /* @__PURE__ */ r(
              te,
              {
                Icons: c,
                month: i.month,
                monthList: m.gregorianMonths || Ne,
                onMonthChange: (o) => v((u) => ({ ...u, month: o })),
                year: i.year,
                yearSuffix: "",
                yearRange: y.yearRangeGreg || Array.from({ length: 201 }, (o, u) => 1957 + u),
                onYearChange: (o) => v((u) => ({ ...u, year: o })),
                onPrev: () => v((o) => Ee(o)),
                onNext: () => v((o) => Le(o)),
                customClasses: g.header
              }
            ),
            /* @__PURE__ */ r(
              je,
              {
                year: i.year,
                month: i.month,
                selectedDate: e,
                today: k,
                onSelect: H,
                labels: { days: m.gregorianDays },
                customClasses: { weekday: g.weekday, dayCell: g.dayCell }
              }
            )
          ] }) }),
          /* @__PURE__ */ h("div", { className: b("px-4 py-3 border-t flex items-center justify-between gap-3", g.footer), style: { borderColor: "var(--dp-border)", backgroundColor: "var(--dp-bg-alt)" }, children: [
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: () => {
                  const o = /* @__PURE__ */ new Date(), u = Y(o);
                  w === "ethiopian" ? (C({ year: u.year, month: u.month }), $(u.year, u.month, u.day)) : (v({ year: o.getFullYear(), month: o.getMonth() + 1 }), H(o));
                },
                className: "text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all hover:brightness-110 active:scale-95 flex items-center gap-1.5",
                style: {
                  backgroundColor: "var(--dp-primary-alpha)",
                  borderColor: "var(--dp-primary)",
                  color: "var(--dp-accent)"
                },
                children: [
                  /* @__PURE__ */ r(B, { size: 12 }),
                  m.today || "ዛሬ (Today)"
                ]
              }
            ),
            e && z && /* @__PURE__ */ h("div", { className: "flex-1 rounded-xl border p-2.5 space-y-1 max-w-[170px]", style: { backgroundColor: "var(--dp-bg)", borderColor: "var(--dp-border)" }, children: [
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-2 overflow-hidden", children: [
                /* @__PURE__ */ r("span", { className: "text-[9px] uppercase font-black opacity-30 shrink-0", children: "Eth" }),
                /* @__PURE__ */ r("span", { className: "text-[10px] font-bold truncate text-right", style: { color: "var(--dp-accent)" }, children: Q(z).split("፣")[0] })
              ] }),
              /* @__PURE__ */ h("div", { className: "flex items-center justify-between gap-2 overflow-hidden", children: [
                /* @__PURE__ */ r("span", { className: "text-[9px] uppercase font-black opacity-30 shrink-0", children: "Greg" }),
                /* @__PURE__ */ r("span", { className: "text-[10px] font-bold truncate text-right text-gray-300", children: e.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })
              ] })
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ r("style", { children: `
                .eth-dp-theme-root [type="button"]:hover {
                    background-color: var(--dp-border);
                }
                @keyframes dpIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            ` })
  ] });
}
export {
  ke as ETHIOPIAN_DAYS_AM,
  le as ETHIOPIAN_MONTHS_AM,
  Fe as EthiopianDatePicker,
  Ce as GREGORIAN_DAYS_EN,
  Ne as GREGORIAN_MONTHS_EN,
  Y as dateToEth,
  Fe as default,
  we as ethToDate,
  Q as formatEthDate,
  Me as formatGregDate,
  ae as getDaysInEthMonth,
  be as getDaysInGregorianMonth,
  ge as isEthLeapYear
};
