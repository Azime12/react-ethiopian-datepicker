import { jsxs as u, jsx as r, Fragment as U } from "react/jsx-runtime";
import { useState as D, useRef as O, useEffect as j, useCallback as P } from "react";
import { createPortal as ge } from "react-dom";
function ue(e, t, a) {
  const n = Math.floor((14 - t) / 12), p = e + 4800 - n, d = t + 12 * n - 3;
  return a + Math.floor((153 * d + 2) / 5) + 365 * p + Math.floor(p / 4) - Math.floor(p / 100) + Math.floor(p / 400) - 32045;
}
function ee(e) {
  const t = e + 32044, a = Math.floor((4 * t + 3) / 146097), n = t - Math.floor(146097 * a / 4), p = Math.floor((4 * n + 3) / 1461), d = n - Math.floor(1461 * p / 4), h = Math.floor((5 * d + 2) / 153);
  return {
    day: d - Math.floor((153 * h + 2) / 5) + 1,
    month: h + 3 - 12 * Math.floor(h / 10),
    year: 100 * a + p - 4800 + Math.floor(h / 10)
  };
}
const te = 1724221;
function re(e, t, a) {
  const n = Math.floor((e - 1) / 4), p = (e - 1) % 4, d = [0, 365, 730, 1096][p];
  return te + 1461 * n + d + 30 * (t - 1) + (a - 1);
}
function be(e) {
  const t = e - te, a = Math.floor(t / 1461), n = t % 1461;
  let p, d;
  return n < 365 ? (p = 0, d = n) : n < 730 ? (p = 1, d = n - 365) : n < 1096 ? (p = 2, d = n - 730) : (p = 3, d = n - 1096), {
    year: 4 * a + p + 1,
    month: Math.floor(d / 30) + 1,
    day: d % 30 + 1
  };
}
const fe = (e) => e % 4 === 3, oe = (e, t) => t < 13 ? 30 : fe(e) ? 6 : 5, me = (e, t) => new Date(e, t, 0).getDate(), ye = (e, t) => new Date(e, t - 1, 1).getDay(), xe = (e, t) => {
  const a = ee(re(e, t, 1));
  return new Date(a.year, a.month - 1, a.day).getDay();
}, Y = (e) => be(ue(e.getFullYear(), e.getMonth() + 1, e.getDate())), ve = (e, t, a) => {
  const n = ee(re(e, t, a));
  return new Date(n.year, n.month - 1, n.day);
}, ne = ["መስከረም", "ጥቅምት", "ሕዳር", "ታሕሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ፓጉሜ"], we = ["እሑ", "ሰኞ", "ማክ", "ረቡ", "ሐሙ", "ዓር", "ቅዳ"], ke = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Ne = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Me = (e) => e ? `${ne[e.month - 1]} ${e.day}፣ ${e.year} ዓ.ም` : "", De = (e) => e ? e.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "", Ce = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 13 } : { year: e, month: t - 1 }, Se = ({ year: e, month: t }) => t === 13 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, Ee = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 12 } : { year: e, month: t - 1 }, Le = ({ year: e, month: t }) => t === 12 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, ae = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m15 18-6-6 6-6" }) }), de = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m9 18 6-6-6-6" }) }), F = ({ size: e = 16 }) => /* @__PURE__ */ u("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", ry: "2" }),
  /* @__PURE__ */ r("line", { x1: "16", x2: "16", y1: "2", y2: "6" }),
  /* @__PURE__ */ r("line", { x1: "8", x2: "8", y1: "2", y2: "6" }),
  /* @__PURE__ */ r("line", { x1: "3", x2: "21", y1: "10", y2: "10" })
] }), K = ({ size: e = 16 }) => /* @__PURE__ */ u("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("path", { d: "M18 6 6 18" }),
  /* @__PURE__ */ r("path", { d: "m6 6 12 12" })
] }), Q = ({ size: e = 16 }) => /* @__PURE__ */ u("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ r("path", { d: "m3 16 4 4 4-4" }),
  /* @__PURE__ */ r("path", { d: "M7 20V4" }),
  /* @__PURE__ */ r("path", { d: "m21 8-4-4-4 4" }),
  /* @__PURE__ */ r("path", { d: "M17 4v16" })
] }), y = (...e) => e.filter(Boolean).join(" "), R = ({ label: e, isToday: t, isSelected: a, isEmpty: n, onClick: p, customClasses: d = {} }) => n ? /* @__PURE__ */ r("div", { className: "eth-dp-day-empty" }) : /* @__PURE__ */ r(
  "button",
  {
    type: "button",
    onClick: p,
    className: y(
      "eth-dp-day",
      a ? "eth-dp-day-selected" : "",
      d.base
    ),
    children: e
  }
);
function Z({
  onPrev: e,
  onNext: t,
  month: a,
  monthList: n = [],
  onMonthChange: p,
  badge: d,
  year: h,
  yearSuffix: b = "",
  yearRange: f = [],
  onYearChange: g,
  customClasses: s = {},
  Icons: i
}) {
  const [l, x] = D(!1), [w, E] = D(!1), k = O(null), N = O(null);
  j(() => {
    if (!l || !k.current) return;
    const m = k.current.querySelector('[data-selected="true"]');
    m && m.scrollIntoView({ block: "center" });
  }, [l]), j(() => {
    if (!w || !N.current) return;
    const m = N.current.querySelector('[data-selected="true"]');
    m && m.scrollIntoView({ block: "center" });
  }, [w]);
  const M = () => {
    x((m) => !m), E(!1);
  }, z = () => {
    E((m) => !m), x(!1);
  }, I = i.ChevronLeft || ae, L = i.ChevronRight || de;
  return /* @__PURE__ */ u("div", { className: y("eth-dp-header", s.container), children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: e,
        className: y("eth-dp-nav-btn", s.navBtn),
        children: /* @__PURE__ */ r(I, { size: 16 })
      }
    ),
    /* @__PURE__ */ u("div", { className: "eth-dp-picker-group", children: [
      n.length > 0 && p ? /* @__PURE__ */ u("div", { className: "eth-dp-rel", children: [
        /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: M,
            className: y("eth-dp-picker-btn", s.picker, l ? "is-active" : ""),
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
            className: y("eth-dp-list-dropdown eth-dp-month-list", s.dropdown),
            children: n.map((m, v) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                "data-selected": v + 1 === a ? "true" : "false",
                onClick: () => {
                  p(v + 1), x(!1);
                },
                className: y("eth-dp-list-item", v + 1 === a ? "is-active" : ""),
                children: m
              },
              v
            ))
          }
        )
      ] }) : null,
      f.length > 0 && g ? /* @__PURE__ */ u("div", { className: "eth-dp-rel", children: [
        /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: z,
            className: y("eth-dp-picker-btn", s.picker, w ? "is-active" : ""),
            children: [
              h,
              b,
              " ▾"
            ]
          }
        ),
        w && /* @__PURE__ */ r(
          "div",
          {
            ref: N,
            className: y("eth-dp-list-dropdown eth-dp-year-list", s.dropdown),
            children: f.map((m) => /* @__PURE__ */ u(
              "button",
              {
                type: "button",
                "data-selected": m === h ? "true" : "false",
                onClick: () => {
                  g(m), E(!1);
                },
                className: y("eth-dp-list-item", m === h ? "is-active" : ""),
                children: [
                  m,
                  b
                ]
              },
              m
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
        className: y("eth-dp-nav-btn", s.navBtn),
        children: /* @__PURE__ */ r(L, { size: 16 })
      }
    )
  ] });
}
function ze({ year: e, month: t, selectedEth: a, todayEth: n, onSelect: p, labels: d = {}, customClasses: h = {} }) {
  const b = xe(e, t), f = oe(e, t), g = d.days || we, s = [];
  for (let i = 0; i < b; i++) s.push(null);
  for (let i = 1; i <= f; i++) s.push(i);
  return /* @__PURE__ */ u("div", { className: "eth-dp-grid", children: [
    g.map((i) => /* @__PURE__ */ r("div", { className: y("eth-dp-weekday", h.weekday), children: i }, i)),
    s.map(
      (i, l) => i === null ? /* @__PURE__ */ r(R, { isEmpty: !0 }, `b${l}`) : /* @__PURE__ */ r(
        R,
        {
          label: i,
          customClasses: h.dayCell,
          isToday: !!(n && i === n.day && t === n.month && e === n.year),
          isSelected: !!(a && i === a.day && t === a.month && e === a.year),
          onClick: () => p(e, t, i)
        },
        `d${i}`
      )
    )
  ] });
}
function Ie({ year: e, month: t, selectedDate: a, today: n, onSelect: p, labels: d = {}, customClasses: h = {} }) {
  const b = ye(e, t), f = me(e, t), g = d.days || Ne, s = [];
  for (let l = 0; l < b; l++) s.push(null);
  for (let l = 1; l <= f; l++) s.push(l);
  const i = (l, x) => x && l === x.getDate() && t === x.getMonth() + 1 && e === x.getFullYear();
  return /* @__PURE__ */ u("div", { className: "eth-dp-grid", children: [
    g.map((l) => /* @__PURE__ */ r("div", { className: y("eth-dp-weekday", h.weekday), children: l }, l)),
    s.map(
      (l, x) => l === null ? /* @__PURE__ */ r(R, { isEmpty: !0 }, `b${x}`) : /* @__PURE__ */ r(
        R,
        {
          label: l,
          customClasses: h.dayCell,
          isToday: !!i(l, n),
          isSelected: !!i(l, a),
          onClick: () => p(new Date(e, t - 1, l))
        },
        `d${l}`
      )
    )
  ] });
}
function Te({ anchorRef: e, children: t, dropW: a = 316 }) {
  const [n, p] = D({ opacity: 0 }), d = P(() => {
    if (!e.current) return;
    const h = e.current.getBoundingClientRect();
    let b = h.left + window.scrollX;
    b + a > window.innerWidth - 8 && (b = window.innerWidth - a - 8), b < 8 && (b = 8);
    const f = window.innerHeight - h.bottom, g = h.top, s = 380;
    let i = h.bottom + window.scrollY + 6;
    f < s && g > f && (i = h.top + window.scrollY - s - 6, i < window.scrollY + 6 && (i = window.scrollY + 6)), p({
      position: "absolute",
      top: i,
      left: b,
      width: a,
      zIndex: 99999,
      opacity: 1,
      transition: "opacity 0.15s ease-out"
    });
  }, [e, a]);
  return j(() => (d(), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), () => {
    window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0);
  }), [d]), ge(/* @__PURE__ */ r("div", { style: n, children: t }), document.body);
}
function Ae({
  value: e = null,
  onChange: t,
  defaultCalendar: a = "ethiopian",
  label: n,
  placeholder: p = "ቀን ይምረጡ…",
  disabled: d = !1,
  customization: h = {}
}) {
  var W, X, J, V, q;
  const { labels: b = {}, classes: f = {}, config: g = {}, colors: s = {} } = h, i = {
    Calendar: ((W = g.icons) == null ? void 0 : W.Calendar) || F,
    X: ((X = g.icons) == null ? void 0 : X.X) || K,
    ChevronLeft: ((J = g.icons) == null ? void 0 : J.ChevronLeft) || ae,
    ChevronRight: ((V = g.icons) == null ? void 0 : V.ChevronRight) || de,
    Switch: ((q = g.icons) == null ? void 0 : q.Switch) || Q
  }, l = `eth-dp-size-${g.inputSize || "md"}`, x = {
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
    fontSize: g.fontSize || "inherit",
    fontFamily: g.fontFamily || "inherit"
  }, w = /* @__PURE__ */ new Date(), E = Y(w), [k, N] = D(!1), [M, z] = D(a), [I, L] = D(null), m = e ? Y(e) : E, [v, C] = D({ year: m.year, month: m.month }), [G, S] = D({
    year: e ? e.getFullYear() : w.getFullYear(),
    month: e ? e.getMonth() + 1 : w.getMonth() + 1
  }), A = O(null);
  j(() => {
    if (!k) return;
    const o = (c) => {
      var T;
      (T = A.current) != null && T.contains(c.target) || c.target.closest("[data-eth-dp]") || N(!1);
    };
    return document.addEventListener("mousedown", o, !0), () => document.removeEventListener("mousedown", o, !0);
  }, [k]), j(() => {
    if (!e) {
      L(null);
      return;
    }
    if (!I) {
      const o = Y(e);
      C({ year: o.year, month: o.month });
    }
    S({ year: e.getFullYear(), month: e.getMonth() + 1 });
  }, [e, I]);
  const B = I ?? (e ? Y(e) : null), _ = P((o, c, T) => {
    L({ year: o, month: c, day: T }), C({ year: o, month: c }), t == null || t(ve(o, c, T)), N(!1);
  }, [t]), H = P((o) => {
    L(null), S({ year: o.getFullYear(), month: o.getMonth() + 1 }), t == null || t(o), N(!1);
  }, [t]), ie = (o) => {
    o.stopPropagation(), L(null), t == null || t(null);
  }, se = e ? M === "ethiopian" ? Me(B) : De(e) : "", $ = M === "ethiopian" && v.month === 13, pe = $ ? oe(v.year, 13) : 0, le = i.Calendar || F, ce = i.X || K, he = i.Switch || Q;
  return /* @__PURE__ */ u("div", { style: x, className: "eth-dp-theme-root", children: [
    /* @__PURE__ */ u("div", { ref: A, className: y("eth-dp-trigger-container", f.container), children: [
      n && /* @__PURE__ */ r("label", { className: "eth-dp-label", children: n }),
      /* @__PURE__ */ u(
        "button",
        {
          type: "button",
          disabled: d,
          onClick: () => {
            d || N((o) => !o);
          },
          className: y(
            "eth-dp-trigger",
            l,
            d ? "eth-dp-disabled" : "",
            f.trigger,
            k ? "is-open" : ""
          ),
          children: [
            /* @__PURE__ */ r(le, { size: 18, className: "eth-dp-trigger-icon" }),
            /* @__PURE__ */ r("span", { className: "eth-dp-trigger-text", children: se || p }),
            e && !d && !g.hideClear && /* @__PURE__ */ r(
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
    k && /* @__PURE__ */ r(Te, { anchorRef: A, dropW: g.dropdownWidth || 316, children: /* @__PURE__ */ u(
      "div",
      {
        "data-eth-dp": "true",
        className: y("eth-dp-theme-root eth-dp-dropdown", f.dropdown),
        style: { ...x, animation: "dpIn 0.15s ease-out both" },
        children: [
          /* @__PURE__ */ u("div", { className: "eth-dp-tabs", children: [
            /* @__PURE__ */ u("div", { className: "eth-dp-tabs-group", children: [
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => z("ethiopian"),
                  className: y("eth-dp-tab", M === "ethiopian" ? "is-active" : ""),
                  children: b.ethTab || "🇪🇹 ኢትዮጵያ"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => z("gregorian"),
                  className: y("eth-dp-tab", M === "gregorian" ? "is-active" : ""),
                  children: b.gregTab || "🌍 Gregorian"
                }
              )
            ] }),
            !g.hideSwitch && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => z((o) => o === "ethiopian" ? "gregorian" : "ethiopian"),
                className: "eth-dp-tab-switch",
                children: /* @__PURE__ */ r(he, { size: 14 })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "eth-dp-cal-body", children: M === "ethiopian" ? /* @__PURE__ */ u(U, { children: [
            /* @__PURE__ */ r(
              Z,
              {
                Icons: i,
                month: v.month,
                monthList: b.ethiopianMonths || ne,
                onMonthChange: (o) => C((c) => ({ ...c, month: o })),
                badge: $ ? /* @__PURE__ */ u("span", { className: "eth-dp-pagume-badge", children: [
                  pe,
                  b.pagumeSuffix || "ቀ"
                ] }) : null,
                year: v.year,
                yearSuffix: " ዓ.ም",
                yearRange: g.yearRangeEth || Array.from({ length: 201 }, (o, c) => 1950 + c),
                onYearChange: (o) => C((c) => ({ ...c, year: o })),
                onPrev: () => C((o) => Ce(o)),
                onNext: () => C((o) => Se(o)),
                customClasses: f.header
              }
            ),
            /* @__PURE__ */ r(
              ze,
              {
                year: v.year,
                month: v.month,
                selectedEth: B,
                todayEth: E,
                onSelect: _,
                labels: { days: b.ethiopianDays },
                customClasses: { weekday: f.weekday, dayCell: f.dayCell }
              }
            )
          ] }) : /* @__PURE__ */ u(U, { children: [
            /* @__PURE__ */ r(
              Z,
              {
                Icons: i,
                month: G.month,
                monthList: b.gregorianMonths || ke,
                onMonthChange: (o) => S((c) => ({ ...c, month: o })),
                year: G.year,
                yearSuffix: "",
                yearRange: g.yearRangeGreg || Array.from({ length: 201 }, (o, c) => 1957 + c),
                onYearChange: (o) => S((c) => ({ ...c, year: o })),
                onPrev: () => S((o) => Ee(o)),
                onNext: () => S((o) => Le(o)),
                customClasses: f.header
              }
            ),
            /* @__PURE__ */ r(
              Ie,
              {
                year: G.year,
                month: G.month,
                selectedDate: e,
                today: w,
                onSelect: H,
                labels: { days: b.gregorianDays },
                customClasses: { weekday: f.weekday, dayCell: f.dayCell }
              }
            )
          ] }) }),
          /* @__PURE__ */ r("div", { className: y("eth-dp-footer", f.footer), children: /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => {
                const o = /* @__PURE__ */ new Date(), c = Y(o);
                M === "ethiopian" ? (C({ year: c.year, month: c.month }), _(c.year, c.month, c.day)) : (S({ year: o.getFullYear(), month: o.getMonth() + 1 }), H(o));
              },
              className: "eth-dp-today-btn",
              children: [
                /* @__PURE__ */ r(F, { size: 14 }),
                b.today || "ዛሬ (Today)"
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
  Ae as EthiopianDatePicker,
  Ne as GREGORIAN_DAYS_EN,
  ke as GREGORIAN_MONTHS_EN,
  Y as dateToEth,
  Ae as default,
  ve as ethToDate,
  Me as formatEthDate,
  De as formatGregDate,
  oe as getDaysInEthMonth,
  me as getDaysInGregorianMonth,
  fe as isEthLeapYear
};
