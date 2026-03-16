import { jsxs as h, jsx as r, Fragment as U } from "react/jsx-runtime";
import { useState as D, useRef as A, useEffect as G, useCallback as P } from "react";
import { createPortal as ge } from "react-dom";
function ue(e, t, a) {
  const n = Math.floor((14 - t) / 12), i = e + 4800 - n, d = t + 12 * n - 3;
  return a + Math.floor((153 * d + 2) / 5) + 365 * i + Math.floor(i / 4) - Math.floor(i / 100) + Math.floor(i / 400) - 32045;
}
function ee(e) {
  const t = e + 32044, a = Math.floor((4 * t + 3) / 146097), n = t - Math.floor(146097 * a / 4), i = Math.floor((4 * n + 3) / 1461), d = n - Math.floor(1461 * i / 4), f = Math.floor((5 * d + 2) / 153);
  return {
    day: d - Math.floor((153 * f + 2) / 5) + 1,
    month: f + 3 - 12 * Math.floor(f / 10),
    year: 100 * a + i - 4800 + Math.floor(f / 10)
  };
}
const te = 1724221;
function re(e, t, a) {
  const n = Math.floor((e - 1) / 4), i = (e - 1) % 4, d = [0, 365, 730, 1096][i];
  return te + 1461 * n + d + 30 * (t - 1) + (a - 1);
}
function be(e) {
  const t = e - te, a = Math.floor(t / 1461), n = t % 1461;
  let i, d;
  return n < 365 ? (i = 0, d = n) : n < 730 ? (i = 1, d = n - 365) : n < 1096 ? (i = 2, d = n - 730) : (i = 3, d = n - 1096), {
    year: 4 * a + i + 1,
    month: Math.floor(d / 30) + 1,
    day: d % 30 + 1
  };
}
const fe = (e) => e % 4 === 3, oe = (e, t) => t < 13 ? 30 : fe(e) ? 6 : 5, me = (e, t) => new Date(e, t, 0).getDate(), ye = (e, t) => new Date(e, t - 1, 1).getDay(), xe = (e, t) => {
  const a = ee(re(e, t, 1));
  return new Date(a.year, a.month - 1, a.day).getDay();
}, j = (e) => be(ue(e.getFullYear(), e.getMonth() + 1, e.getDate())), ve = (e, t, a) => {
  const n = ee(re(e, t, a));
  return new Date(n.year, n.month - 1, n.day);
}, ne = ["መስከረም", "ጥቅምት", "ሕዳር", "ታሕሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ፓጉሜ"], we = ["እሑ", "ሰኞ", "ማክ", "ረቡ", "ሐሙ", "ዓር", "ቅዳ"], ke = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Ne = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Me = (e) => e ? `${ne[e.month - 1]} ${e.day}፣ ${e.year} ዓ.ም` : "", De = (e) => e ? e.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "", Ce = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 13 } : { year: e, month: t - 1 }, Se = ({ year: e, month: t }) => t === 13 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, Ee = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 12 } : { year: e, month: t - 1 }, Le = ({ year: e, month: t }) => t === 12 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, ae = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m15 18-6-6 6-6" }) }), de = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m9 18 6-6-6-6" }) }), O = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
  /* @__PURE__ */ r("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
  /* @__PURE__ */ r("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
  /* @__PURE__ */ r("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
] }), K = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ r("path", { d: "m6 6 12 12" })
] }), Q = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("path", { d: "m3 16 4 4 4-4" }),
  /* @__PURE__ */ r("path", { d: "M7 20V4" }),
  /* @__PURE__ */ r("path", { d: "m21 8-4-4-4 4" }),
  /* @__PURE__ */ r("path", { d: "M17 4v16" })
] }), m = (...e) => e.filter(Boolean).join(" ");
function R({ label: e, isToday: t, isSelected: a, isEmpty: n, onClick: i, customClasses: d = {} }) {
  return n ? /* @__PURE__ */ r("div", { className: "eth-dp-day-empty" }) : /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: i,
      className: m(
        "eth-dp-day",
        a ? "eth-dp-day-selected" : "",
        d.base
      ),
      children: e
    }
  );
}
function Z({
  onPrev: e,
  onNext: t,
  month: a,
  monthList: n = [],
  onMonthChange: i,
  badge: d,
  year: f,
  yearSuffix: g = "",
  yearRange: y = [],
  onYearChange: u,
  customClasses: s = {},
  Icons: p
}) {
  const [l, x] = D(!1), [w, E] = D(!1), k = A(null), N = A(null);
  G(() => {
    if (!l || !k.current) return;
    const b = k.current.querySelector('[data-selected="true"]');
    b && b.scrollIntoView({ block: "center" });
  }, [l]), G(() => {
    if (!w || !N.current) return;
    const b = N.current.querySelector('[data-selected="true"]');
    b && b.scrollIntoView({ block: "center" });
  }, [w]);
  const M = () => {
    x((b) => !b), E(!1);
  }, z = () => {
    E((b) => !b), x(!1);
  }, I = p.ChevronLeft || ae, L = p.ChevronRight || de;
  return /* @__PURE__ */ h("div", { className: m("eth-dp-header", s.container), children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: e,
        className: m("eth-dp-nav-btn", s.navBtn),
        children: /* @__PURE__ */ r(I, { size: 16 })
      }
    ),
    /* @__PURE__ */ h("div", { className: "eth-dp-picker-group", children: [
      n.length > 0 && i ? /* @__PURE__ */ h("div", { className: "eth-dp-rel", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: M,
            className: m("eth-dp-picker-btn", s.picker, l ? "is-active" : ""),
            children: [
              n[a - 1],
              " ",
              d && /* @__PURE__ */ r("span", { className: "eth-dp-badge-wrapper", children: d }),
              " ▾"
            ]
          }
        ),
        l && /* @__PURE__ */ r(
          "div",
          {
            ref: k,
            className: m("eth-dp-list-dropdown eth-dp-month-list", s.dropdown),
            children: n.map((b, v) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                "data-selected": v + 1 === a ? "true" : "false",
                onClick: () => {
                  i(v + 1), x(!1);
                },
                className: m("eth-dp-list-item", v + 1 === a ? "is-active" : ""),
                children: b
              },
              v
            ))
          }
        )
      ] }) : null,
      y.length > 0 && u ? /* @__PURE__ */ h("div", { className: "eth-dp-rel", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: z,
            className: m("eth-dp-picker-btn", s.picker, w ? "is-active" : ""),
            children: [
              f,
              g,
              " ▾"
            ]
          }
        ),
        w && /* @__PURE__ */ r(
          "div",
          {
            ref: N,
            className: m("eth-dp-list-dropdown eth-dp-year-list", s.dropdown),
            children: y.map((b) => /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                "data-selected": b === f ? "true" : "false",
                onClick: () => {
                  u(b), E(!1);
                },
                className: m("eth-dp-list-item", b === f ? "is-active" : ""),
                children: [
                  b,
                  g
                ]
              },
              b
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
        className: m("eth-dp-nav-btn", s.navBtn),
        children: /* @__PURE__ */ r(L, { size: 16 })
      }
    )
  ] });
}
function ze({ year: e, month: t, selectedEth: a, todayEth: n, onSelect: i, labels: d = {}, customClasses: f = {} }) {
  const g = xe(e, t), y = oe(e, t), u = d.days || we, s = [];
  for (let p = 0; p < g; p++) s.push(null);
  for (let p = 1; p <= y; p++) s.push(p);
  return /* @__PURE__ */ h("div", { className: "eth-dp-grid", children: [
    u.map((p) => /* @__PURE__ */ r("div", { className: m("eth-dp-weekday", f.weekday), children: p }, p)),
    s.map(
      (p, l) => p === null ? /* @__PURE__ */ r(R, { isEmpty: !0 }, `b${l}`) : /* @__PURE__ */ r(
        R,
        {
          label: p,
          customClasses: f.dayCell,
          isToday: !!(n && p === n.day && t === n.month && e === n.year),
          isSelected: !!(a && p === a.day && t === a.month && e === a.year),
          onClick: () => i(e, t, p)
        },
        `d${p}`
      )
    )
  ] });
}
function Ie({ year: e, month: t, selectedDate: a, today: n, onSelect: i, labels: d = {}, customClasses: f = {} }) {
  const g = ye(e, t), y = me(e, t), u = d.days || Ne, s = [];
  for (let l = 0; l < g; l++) s.push(null);
  for (let l = 1; l <= y; l++) s.push(l);
  const p = (l, x) => x && l === x.getDate() && t === x.getMonth() + 1 && e === x.getFullYear();
  return /* @__PURE__ */ h("div", { className: "eth-dp-grid", children: [
    u.map((l) => /* @__PURE__ */ r("div", { className: m("eth-dp-weekday", f.weekday), children: l }, l)),
    s.map(
      (l, x) => l === null ? /* @__PURE__ */ r(R, { isEmpty: !0 }, `b${x}`) : /* @__PURE__ */ r(
        R,
        {
          label: l,
          customClasses: f.dayCell,
          isToday: !!p(l, n),
          isSelected: !!p(l, a),
          onClick: () => i(new Date(e, t - 1, l))
        },
        `d${l}`
      )
    )
  ] });
}
function Te({ anchorRef: e, children: t, dropW: a = 316 }) {
  const [n, i] = D({ opacity: 0 }), d = P(() => {
    if (!e.current) return;
    const f = e.current.getBoundingClientRect();
    let g = f.left + window.scrollX;
    g + a > window.innerWidth - 8 && (g = window.innerWidth - a - 8), g < 8 && (g = 8), i({
      position: "absolute",
      top: f.bottom + window.scrollY + 6,
      left: g,
      width: a,
      zIndex: 99999,
      opacity: 1,
      transition: "opacity 0.15s ease-out"
    });
  }, [e, a]);
  return G(() => (d(), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), () => {
    window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0);
  }), [d]), ge(/* @__PURE__ */ r("div", { style: n, children: t }), document.body);
}
function Fe({
  value: e = null,
  onChange: t,
  defaultCalendar: a = "ethiopian",
  label: n,
  placeholder: i = "ቀን ይምረጡ…",
  disabled: d = !1,
  customization: f = {}
}) {
  var W, X, J, V, q;
  const { labels: g = {}, classes: y = {}, config: u = {}, colors: s = {} } = f, p = {
    Calendar: ((W = u.icons) == null ? void 0 : W.Calendar) || O,
    X: ((X = u.icons) == null ? void 0 : X.X) || K,
    ChevronLeft: ((J = u.icons) == null ? void 0 : J.ChevronLeft) || ae,
    ChevronRight: ((V = u.icons) == null ? void 0 : V.ChevronRight) || de,
    Switch: ((q = u.icons) == null ? void 0 : q.Switch) || Q
  }, l = `eth-dp-size-${u.inputSize || "md"}`, x = {
    "--dp-primary": s.primary || "#7c3aed",
    "--dp-primary-alpha": s.primary ? `${s.primary}26` : "rgba(124, 58, 237, 0.15)",
    "--dp-bg": s.background || "#ffffff",
    "--dp-bg-alt": s.backgroundAlt || "#f8fafc",
    "--dp-border": s.border || "#e5e7eb",
    "--dp-text": s.text || "#111827",
    "--dp-text-muted": s.textMuted || "#6b7280",
    "--dp-accent": s.accent || "#7c3aed",
    "--dp-today-ring": s.todayRing || "#7c3aed",
    "--dp-selected-bg": s.selectedBg || "#7c3aed",
    "--dp-selected-shadow": s.selectedShadow || "rgba(124, 58, 237, 0.4)",
    fontSize: u.fontSize || "inherit",
    fontFamily: u.fontFamily || "inherit"
  }, w = /* @__PURE__ */ new Date(), E = j(w), [k, N] = D(!1), [M, z] = D(a), [I, L] = D(null), b = e ? j(e) : E, [v, C] = D({ year: b.year, month: b.month }), [Y, S] = D({
    year: e ? e.getFullYear() : w.getFullYear(),
    month: e ? e.getMonth() + 1 : w.getMonth() + 1
  }), F = A(null);
  G(() => {
    if (!k) return;
    const o = (c) => {
      var T;
      (T = F.current) != null && T.contains(c.target) || c.target.closest("[data-eth-dp]") || N(!1);
    };
    return document.addEventListener("mousedown", o, !0), () => document.removeEventListener("mousedown", o, !0);
  }, [k]), G(() => {
    if (!e) {
      L(null);
      return;
    }
    if (!I) {
      const o = j(e);
      C({ year: o.year, month: o.month });
    }
    S({ year: e.getFullYear(), month: e.getMonth() + 1 });
  }, [e, I]);
  const _ = I ?? (e ? j(e) : null), B = P((o, c, T) => {
    L({ year: o, month: c, day: T }), C({ year: o, month: c }), t == null || t(ve(o, c, T)), N(!1);
  }, [t]), $ = P((o) => {
    L(null), S({ year: o.getFullYear(), month: o.getMonth() + 1 }), t == null || t(o), N(!1);
  }, [t]), ie = (o) => {
    o.stopPropagation(), L(null), t == null || t(null);
  }, se = e ? M === "ethiopian" ? Me(_) : De(e) : "", H = M === "ethiopian" && v.month === 13, pe = H ? oe(v.year, 13) : 0, le = p.Calendar || O, ce = p.X || K, he = p.Switch || Q;
  return /* @__PURE__ */ h("div", { style: x, className: "eth-dp-theme-root", children: [
    /* @__PURE__ */ h("div", { ref: F, className: m("eth-dp-trigger-container", y.container), children: [
      n && /* @__PURE__ */ r("label", { className: "eth-dp-label", children: n }),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          disabled: d,
          onClick: () => {
            d || N((o) => !o);
          },
          className: m(
            "eth-dp-trigger",
            l,
            d ? "eth-dp-disabled" : "",
            y.trigger,
            k ? "is-open" : ""
          ),
          children: [
            /* @__PURE__ */ r(le, { size: 18, className: "eth-dp-trigger-icon" }),
            /* @__PURE__ */ r("span", { className: "eth-dp-trigger-text", children: se || i }),
            e && !d && !u.hideClear && /* @__PURE__ */ r(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: ie,
                className: "eth-dp-clear-btn",
                children: /* @__PURE__ */ r(ce, { size: 16 })
              }
            )
          ]
        }
      )
    ] }),
    k && /* @__PURE__ */ r(Te, { anchorRef: F, dropW: u.dropdownWidth || 316, children: /* @__PURE__ */ h(
      "div",
      {
        "data-eth-dp": "true",
        className: m("eth-dp-theme-root eth-dp-dropdown", y.dropdown),
        style: { ...x, animation: "dpIn 0.15s ease-out both" },
        children: [
          /* @__PURE__ */ h("div", { className: "eth-dp-tabs", children: [
            /* @__PURE__ */ h("div", { className: "eth-dp-tabs-group", children: [
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => z("ethiopian"),
                  className: m("eth-dp-tab", M === "ethiopian" ? "is-active" : ""),
                  children: g.ethTab || "🇪🇹 ኢትዮጵያ"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => z("gregorian"),
                  className: m("eth-dp-tab", M === "gregorian" ? "is-active" : ""),
                  children: g.gregTab || "🌍 Gregorian"
                }
              )
            ] }),
            !u.hideSwitch && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => z((o) => o === "ethiopian" ? "gregorian" : "ethiopian"),
                className: "eth-dp-tab-switch",
                children: /* @__PURE__ */ r(he, { size: 14 })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "eth-dp-cal-body", children: M === "ethiopian" ? /* @__PURE__ */ h(U, { children: [
            /* @__PURE__ */ r(
              Z,
              {
                Icons: p,
                month: v.month,
                monthList: g.ethiopianMonths || ne,
                onMonthChange: (o) => C((c) => ({ ...c, month: o })),
                badge: H ? /* @__PURE__ */ h("span", { className: "eth-dp-pagume-badge", children: [
                  pe,
                  g.pagumeSuffix || "ቀ"
                ] }) : null,
                year: v.year,
                yearSuffix: " ዓ.ም",
                yearRange: u.yearRangeEth || Array.from({ length: 201 }, (o, c) => 1950 + c),
                onYearChange: (o) => C((c) => ({ ...c, year: o })),
                onPrev: () => C((o) => Ce(o)),
                onNext: () => C((o) => Se(o)),
                customClasses: y.header
              }
            ),
            /* @__PURE__ */ r(
              ze,
              {
                year: v.year,
                month: v.month,
                selectedEth: _,
                todayEth: E,
                onSelect: B,
                labels: { days: g.ethiopianDays },
                customClasses: { weekday: y.weekday, dayCell: y.dayCell }
              }
            )
          ] }) : /* @__PURE__ */ h(U, { children: [
            /* @__PURE__ */ r(
              Z,
              {
                Icons: p,
                month: Y.month,
                monthList: g.gregorianMonths || ke,
                onMonthChange: (o) => S((c) => ({ ...c, month: o })),
                year: Y.year,
                yearSuffix: "",
                yearRange: u.yearRangeGreg || Array.from({ length: 201 }, (o, c) => 1957 + c),
                onYearChange: (o) => S((c) => ({ ...c, year: o })),
                onPrev: () => S((o) => Ee(o)),
                onNext: () => S((o) => Le(o)),
                customClasses: y.header
              }
            ),
            /* @__PURE__ */ r(
              Ie,
              {
                year: Y.year,
                month: Y.month,
                selectedDate: e,
                today: w,
                onSelect: $,
                labels: { days: g.gregorianDays },
                customClasses: { weekday: y.weekday, dayCell: y.dayCell }
              }
            )
          ] }) }),
          /* @__PURE__ */ r("div", { className: m("eth-dp-footer", y.footer), children: /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => {
                const o = /* @__PURE__ */ new Date(), c = j(o);
                M === "ethiopian" ? (C({ year: c.year, month: c.month }), B(c.year, c.month, c.day)) : (S({ year: o.getFullYear(), month: o.getMonth() + 1 }), $(o));
              },
              className: "eth-dp-today-btn",
              children: [
                /* @__PURE__ */ r(O, { size: 14 }),
                g.today || "ዛሬ (Today)"
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ r("style", { children: `
                .eth-dp-theme-root {
                    --dp-p: var(--dp-primary);
                    --dp-pa: var(--dp-primary-alpha);
                    --dp-b: var(--dp-bg);
                    --dp-ba: var(--dp-bg-alt);
                    --dp-br: var(--dp-border);
                    --dp-t: var(--dp-text);
                    --dp-tm: var(--dp-text-muted);
                    --dp-ac: var(--dp-accent);
                    --dp-tr: var(--dp-today-ring);
                    --dp-sb: var(--dp-selected-bg);
                    --dp-ss: var(--dp-selected-shadow);
                }
                .eth-dp-theme-root * { box-sizing: border-box; }
                .eth-dp-theme-root [type="button"] { cursor: pointer; transition: all 0.15s; font-family: inherit; border: none; background: transparent; }
                
                .eth-dp-trigger-container { position: relative; width: 100%; display: flex; flex-direction: column; }
                .eth-dp-label { display: block; font-size: 11px; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dp-tm); }
                
                .eth-dp-trigger { display: flex; align-items: center; border: 1px solid var(--dp-br); text-align: left; transition: all 0.2s; outline: none; width: 100%; gap: 10px; background: var(--dp-b); color: var(--dp-t); }
                .eth-dp-trigger.is-open { border-color: var(--dp-p); box-shadow: 0 0 0 3px var(--dp-pa); }
                .eth-dp-trigger-icon { color: var(--dp-tm); }
                .eth-dp-trigger-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .eth-dp-disabled { opacity: 0.5; cursor: not-allowed !important; }
                .eth-dp-size-sm { padding: 6px 10px; font-size: 13px; border-radius: 6px; }
                .eth-dp-size-md { padding: 10px 14px; font-size: 14px; border-radius: 8px; }
                .eth-dp-size-lg { padding: 14px 18px; font-size: 16px; border-radius: 12px; }
                
                .eth-dp-clear-btn { padding: 4px; border-radius: 4px; display: flex; align-items: center; color: var(--dp-tm); }
                .eth-dp-clear-btn:hover { background: var(--dp-ba); color: var(--dp-t); }
                
                .eth-dp-dropdown { border-radius: 12px; border: 1px solid var(--dp-br); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); background: var(--dp-b); color: var(--dp-t); overflow: hidden; display: flex; flex-direction: column; }
                
                .eth-dp-tabs { display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--dp-br); background: var(--dp-ba); }
                .eth-dp-tabs-group { display: flex; background: var(--dp-br); border-radius: 6px; padding: 2px; gap: 2px; }
                .eth-dp-tab { padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; color: var(--dp-tm); }
                .eth-dp-tab.is-active { background: var(--dp-b); color: var(--dp-p); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
                .eth-dp-tab-switch { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 6px; color: var(--dp-tm); }
                .eth-dp-tab-switch:hover { background: var(--dp-br); color: var(--dp-t); }
                
                .eth-dp-cal-body { padding: 14px; }
                
                .eth-dp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
                .eth-dp-nav-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; color: var(--dp-tm); }
                .eth-dp-nav-btn:hover { background: var(--dp-ba); color: var(--dp-t); }
                .eth-dp-picker-group { display: flex; align-items: center; gap: 4px; }
                .eth-dp-rel { position: relative; }
                .eth-dp-picker-btn { font-size: 13px; font-weight: 700; padding: 4px 8px; border-radius: 6px; color: var(--dp-t); }
                .eth-dp-picker-btn.is-active { background: var(--dp-pa); color: var(--dp-p); }
                
                .eth-dp-list-dropdown { position: absolute; z-index: 50; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; overflow-y: auto; border-radius: 8px; border: 1px solid var(--dp-br); background: var(--dp-b); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); max-height: 200px; }
                .eth-dp-month-list { width: 130px; }
                .eth-dp-year-list { width: 100px; }
                .eth-dp-list-item { width: 100%; padding: 8px; font-size: 13px; text-align: center; color: var(--dp-t); }
                .eth-dp-list-item:hover { background: var(--dp-ba); }
                .eth-dp-list-item.is-active { background: var(--dp-p); color: #fff; }
                
                .eth-dp-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
                .eth-dp-weekday { text-align: center; font-weight: 700; font-size: 11px; height: 30px; display: flex; align-items: center; justify-content: center; color: var(--dp-tm); }
                .eth-dp-day { height: 38px; border-radius: 6px; font-size: 14px; font-weight: 500; color: var(--dp-t); display: flex; align-items: center; justify-content: center; position: relative; }
                .eth-dp-day:hover:not(.eth-dp-day-empty) { background: var(--dp-ba); }
                .eth-dp-day-selected { background: var(--dp-sb) !important; color: #fff !important; font-weight: 700; box-shadow: 0 4px 10px var(--dp-ss); }
                .eth-dp-day-empty { height: 38px; }
                
                .eth-dp-pagume-badge { font-size: 10px; background: #fef3c7; color: #b45309; padding: 1px 4px; border-radius: 4px; margin-left: 4px; font-weight: 800; }
                
                .eth-dp-footer { padding: 10px; border-top: 1px solid var(--dp-br); display: flex; align-items: center; justify-content: center; background: var(--dp-ba); }
                .eth-dp-today-btn { font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 6px; border: 1px solid var(--dp-br); background: var(--dp-b); color: var(--dp-ac); display: flex; align-items: center; gap: 8px; }
                .eth-dp-today-btn:hover { border-color: var(--dp-ac); background: var(--dp-ba); }
                
                @keyframes dpIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            ` })
  ] });
}
export {
  we as ETHIOPIAN_DAYS_AM,
  ne as ETHIOPIAN_MONTHS_AM,
  Fe as EthiopianDatePicker,
  Ne as GREGORIAN_DAYS_EN,
  ke as GREGORIAN_MONTHS_EN,
  j as dateToEth,
  Fe as default,
  ve as ethToDate,
  Me as formatEthDate,
  De as formatGregDate,
  oe as getDaysInEthMonth,
  me as getDaysInGregorianMonth,
  fe as isEthLeapYear
};
