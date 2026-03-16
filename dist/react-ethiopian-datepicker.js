import { jsxs as h, jsx as r, Fragment as K } from "react/jsx-runtime";
import { useState as D, useRef as _, useEffect as T, useCallback as $ } from "react";
import { createPortal as ue } from "react-dom";
function ye(e, t, n) {
  const a = Math.floor((14 - t) / 12), l = e + 4800 - a, d = t + 12 * a - 3;
  return n + Math.floor((153 * d + 2) / 5) + 365 * l + Math.floor(l / 4) - Math.floor(l / 100) + Math.floor(l / 400) - 32045;
}
function re(e) {
  const t = e + 32044, n = Math.floor((4 * t + 3) / 146097), a = t - Math.floor(146097 * n / 4), l = Math.floor((4 * a + 3) / 1461), d = a - Math.floor(1461 * l / 4), b = Math.floor((5 * d + 2) / 153);
  return {
    day: d - Math.floor((153 * b + 2) / 5) + 1,
    month: b + 3 - 12 * Math.floor(b / 10),
    year: 100 * n + l - 4800 + Math.floor(b / 10)
  };
}
const oe = 1724221;
function ne(e, t, n) {
  const a = Math.floor((e - 1) / 4), l = (e - 1) % 4, d = [0, 365, 730, 1096][l];
  return oe + 1461 * a + d + 30 * (t - 1) + (n - 1);
}
function be(e) {
  const t = e - oe, n = Math.floor(t / 1461), a = t % 1461;
  let l, d;
  return a < 365 ? (l = 0, d = a) : a < 730 ? (l = 1, d = a - 365) : a < 1096 ? (l = 2, d = a - 730) : (l = 3, d = a - 1096), {
    year: 4 * n + l + 1,
    month: Math.floor(d / 30) + 1,
    day: d % 30 + 1
  };
}
const me = (e) => e % 4 === 3, ae = (e, t) => t < 13 ? 30 : me(e) ? 6 : 5, fe = (e, t) => new Date(e, t, 0).getDate(), xe = (e, t) => new Date(e, t - 1, 1).getDay(), ve = (e, t) => {
  const n = re(ne(e, t, 1));
  return new Date(n.year, n.month - 1, n.day).getDay();
}, G = (e) => be(ye(e.getFullYear(), e.getMonth() + 1, e.getDate())), we = (e, t, n) => {
  const a = re(ne(e, t, n));
  return new Date(a.year, a.month - 1, a.day);
}, de = ["መስከረም", "ጥቅምት", "ሕዳር", "ታሕሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ፓጉሜ"], ke = ["እሑ", "ሰኞ", "ማክ", "ረቡ", "ሐሙ", "ዓር", "ቅዳ"], Ne = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Ce = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Q = (e) => e ? `${de[e.month - 1]} ${e.day}፣ ${e.year} ዓ.ም` : "", Me = (e) => e ? e.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "", De = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 13 } : { year: e, month: t - 1 }, Se = ({ year: e, month: t }) => t === 13 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, ze = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 12 } : { year: e, month: t - 1 }, Ee = ({ year: e, month: t }) => t === 12 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, ie = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m15 18-6-6 6-6" }) }), le = ({ size: e = 16 }) => /* @__PURE__ */ r("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ r("path", { d: "m9 18 6-6-6-6" }) }), B = ({ size: e = 16 }) => /* @__PURE__ */ h("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
] }), f = (...e) => e.filter(Boolean).join(" ");
function F({ label: e, isToday: t, isSelected: n, isEmpty: a, onClick: l, customClasses: d = {} }) {
  return a ? /* @__PURE__ */ r("div", { className: "eth-dp-day-empty" }) : /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      onClick: l,
      className: f(
        "eth-dp-day",
        n ? "eth-dp-day-selected" : "",
        d.base
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
  onMonthChange: l,
  badge: d,
  year: b,
  yearSuffix: y = "",
  yearRange: m = [],
  onYearChange: u,
  customClasses: s = {},
  Icons: p
}) {
  const [c, x] = D(!1), [w, E] = D(!1), k = _(null), C = _(null);
  T(() => {
    if (!c || !k.current) return;
    const i = k.current.querySelector('[data-selected="true"]');
    i && i.scrollIntoView({ block: "center" });
  }, [c]), T(() => {
    if (!w || !C.current) return;
    const i = C.current.querySelector('[data-selected="true"]');
    i && i.scrollIntoView({ block: "center" });
  }, [w]);
  const v = () => {
    x((i) => !i), E(!1);
  }, I = () => {
    E((i) => !i), x(!1);
  }, L = (i) => ({
    backgroundColor: i ? "var(--dp-primary)" : "var(--dp-primary-alpha)",
    color: i ? "#fff" : "var(--dp-accent)"
  }), S = (i) => ({
    backgroundColor: i ? "var(--dp-primary)" : "transparent",
    color: i ? "#fff" : "var(--dp-text)"
  }), Y = p.ChevronLeft || ie, M = p.ChevronRight || le;
  return /* @__PURE__ */ h("div", { className: f("eth-dp-header", s.container), children: [
    /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: e,
        className: f("eth-dp-nav-btn", s.navBtn),
        style: { color: "var(--dp-text-muted)" },
        children: /* @__PURE__ */ r(Y, { size: 16 })
      }
    ),
    /* @__PURE__ */ h("div", { className: "eth-dp-picker-group", children: [
      a.length > 0 && l ? /* @__PURE__ */ h("div", { className: "eth-dp-rel", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: v,
            style: L(c),
            className: f("eth-dp-picker-btn", s.picker),
            children: [
              a[n - 1],
              " ",
              d && /* @__PURE__ */ r("span", { className: "eth-dp-badge-wrapper", children: d }),
              " ▾"
            ]
          }
        ),
        c && /* @__PURE__ */ r(
          "div",
          {
            ref: k,
            className: f("eth-dp-list-dropdown eth-dp-month-list", s.dropdown),
            style: {
              backgroundColor: "var(--dp-bg)",
              borderColor: "var(--dp-border)"
            },
            children: a.map((i, N) => /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                "data-selected": N + 1 === n ? "true" : "false",
                onClick: () => {
                  l(N + 1), x(!1);
                },
                className: "eth-dp-list-item",
                style: S(N + 1 === n),
                children: i
              },
              N
            ))
          }
        )
      ] }) : null,
      m.length > 0 && u ? /* @__PURE__ */ h("div", { className: "eth-dp-rel", children: [
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: I,
            style: L(w),
            className: f("eth-dp-picker-btn", s.picker),
            children: [
              b,
              y,
              " ▾"
            ]
          }
        ),
        w && /* @__PURE__ */ r(
          "div",
          {
            ref: C,
            className: f("eth-dp-list-dropdown eth-dp-year-list", s.dropdown),
            style: {
              backgroundColor: "var(--dp-bg)",
              borderColor: "var(--dp-border)"
            },
            children: m.map((i) => /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                "data-selected": i === b ? "true" : "false",
                onClick: () => {
                  u(i), E(!1);
                },
                className: "eth-dp-list-item",
                style: S(i === b),
                children: [
                  i,
                  y
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
        className: f("eth-dp-nav-btn", s.navBtn),
        style: { color: "var(--dp-text-muted)" },
        children: /* @__PURE__ */ r(M, { size: 16 })
      }
    )
  ] });
}
function Le({ year: e, month: t, selectedEth: n, todayEth: a, onSelect: l, labels: d = {}, customClasses: b = {} }) {
  const y = ve(e, t), m = ae(e, t), u = d.days || ke, s = [];
  for (let p = 0; p < y; p++) s.push(null);
  for (let p = 1; p <= m; p++) s.push(p);
  return /* @__PURE__ */ h("div", { className: "eth-dp-grid", children: [
    u.map((p) => /* @__PURE__ */ r(
      "div",
      {
        className: f("eth-dp-weekday", b.weekday),
        style: { color: "var(--dp-accent)" },
        children: p
      },
      p
    )),
    s.map(
      (p, c) => p === null ? /* @__PURE__ */ r(F, { isEmpty: !0 }, `b${c}`) : /* @__PURE__ */ r(
        F,
        {
          label: p,
          customClasses: b.dayCell,
          isToday: !!(a && p === a.day && t === a.month && e === a.year),
          isSelected: !!(n && p === n.day && t === n.month && e === n.year),
          onClick: () => l(e, t, p)
        },
        `d${p}`
      )
    )
  ] });
}
function Ie({ year: e, month: t, selectedDate: n, today: a, onSelect: l, labels: d = {}, customClasses: b = {} }) {
  const y = xe(e, t), m = fe(e, t), u = d.days || Ce, s = [];
  for (let c = 0; c < y; c++) s.push(null);
  for (let c = 1; c <= m; c++) s.push(c);
  const p = (c, x) => x && c === x.getDate() && t === x.getMonth() + 1 && e === x.getFullYear();
  return /* @__PURE__ */ h("div", { className: "eth-dp-grid", children: [
    u.map((c) => /* @__PURE__ */ r(
      "div",
      {
        className: f("eth-dp-weekday", b.weekday),
        style: { color: "var(--dp-accent)" },
        children: c
      },
      c
    )),
    s.map(
      (c, x) => c === null ? /* @__PURE__ */ r(F, { isEmpty: !0 }, `b${x}`) : /* @__PURE__ */ r(
        F,
        {
          label: c,
          customClasses: b.dayCell,
          isToday: !!p(c, a),
          isSelected: !!p(c, n),
          onClick: () => l(new Date(e, t - 1, c))
        },
        `d${c}`
      )
    )
  ] });
}
function je({ anchorRef: e, children: t, dropW: n = 316 }) {
  const [a, l] = D({ opacity: 0 }), d = $(() => {
    if (!e.current) return;
    const b = e.current.getBoundingClientRect();
    let y = b.left + window.scrollX;
    y + n > window.innerWidth - 8 && (y = window.innerWidth - n - 8), y < 8 && (y = 8), l({
      position: "absolute",
      top: b.bottom + window.scrollY + 6,
      left: y,
      width: n,
      zIndex: 99999,
      opacity: 1,
      transition: "opacity 0.15s ease-out"
    });
  }, [e, n]);
  return T(() => (d(), window.addEventListener("resize", d), window.addEventListener("scroll", d, !0), () => {
    window.removeEventListener("resize", d), window.removeEventListener("scroll", d, !0);
  }), [d]), ue(/* @__PURE__ */ r("div", { style: a, children: t }), document.body);
}
function Fe({
  value: e = null,
  onChange: t,
  defaultCalendar: n = "ethiopian",
  label: a,
  placeholder: l = "ቀን ይምረጡ…",
  disabled: d = !1,
  customization: b = {}
}) {
  var X, J, V, q, U;
  const { labels: y = {}, classes: m = {}, config: u = {}, colors: s = {} } = b, p = {
    Calendar: ((X = u.icons) == null ? void 0 : X.Calendar) || B,
    X: ((J = u.icons) == null ? void 0 : J.X) || Z,
    ChevronLeft: ((V = u.icons) == null ? void 0 : V.ChevronLeft) || ie,
    ChevronRight: ((q = u.icons) == null ? void 0 : q.ChevronRight) || le,
    Switch: ((U = u.icons) == null ? void 0 : U.Switch) || ee
  }, c = `eth-dp-size-${u.inputSize || "md"}`, x = {
    "--dp-primary": s.primary || "#7c3aed",
    "--dp-primary-alpha": s.primary ? `${s.primary}26` : "rgba(124, 58, 237, 0.15)",
    "--dp-bg": s.background || "#111827",
    "--dp-bg-alt": s.backgroundAlt || "rgba(0, 0, 0, 0.2)",
    "--dp-border": s.border || "rgba(255, 255, 255, 0.1)",
    "--dp-text": s.text || "#f3f4f6",
    "--dp-text-muted": s.textMuted || "#9ca3af",
    "--dp-accent": s.accent || "#a78bfa",
    "--dp-today-ring": s.todayRing || "#a78bfa",
    "--dp-selected-bg": s.selectedBg || "#7c3aed",
    "--dp-selected-shadow": s.selectedShadow || "rgba(109, 40, 217, 0.4)",
    fontSize: u.fontSize || "inherit",
    fontFamily: u.fontFamily || "inherit"
  }, w = /* @__PURE__ */ new Date(), E = G(w), [k, C] = D(!1), [v, I] = D(n), [L, S] = D(null), Y = e ? G(e) : E, [M, i] = D({ year: Y.year, month: Y.month }), [N, z] = D({
    year: e ? e.getFullYear() : w.getFullYear(),
    month: e ? e.getMonth() + 1 : w.getMonth() + 1
  }), A = _(null);
  T(() => {
    if (!k) return;
    const o = (g) => {
      var j;
      (j = A.current) != null && j.contains(g.target) || g.target.closest("[data-eth-dp]") || C(!1);
    };
    return document.addEventListener("mousedown", o, !0), () => document.removeEventListener("mousedown", o, !0);
  }, [k]), T(() => {
    if (!e) {
      S(null);
      return;
    }
    if (!L) {
      const o = G(e);
      i({ year: o.year, month: o.month });
    }
    z({ year: e.getFullYear(), month: e.getMonth() + 1 });
  }, [e, L]);
  const R = L ?? (e ? G(e) : null), H = $((o, g, j) => {
    S({ year: o, month: g, day: j }), i({ year: o, month: g }), t == null || t(we(o, g, j)), C(!1);
  }, [t]), W = $((o) => {
    S(null), z({ year: o.getFullYear(), month: o.getMonth() + 1 }), t == null || t(o), C(!1);
  }, [t]), se = (o) => {
    o.stopPropagation(), S(null), t == null || t(null);
  }, pe = e ? v === "ethiopian" ? Q(R) : Me(e) : "", O = v === "ethiopian" && M.month === 13, P = O ? ae(M.year, 13) : 0, ce = p.Calendar || B, he = p.X || Z, ge = p.Switch || ee;
  return /* @__PURE__ */ h("div", { style: x, className: "eth-dp-theme-root", children: [
    /* @__PURE__ */ h("div", { ref: A, className: f("eth-dp-trigger-container", m.container), children: [
      a && /* @__PURE__ */ r("label", { className: "eth-dp-label", children: a }),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          disabled: d,
          onClick: () => {
            d || C((o) => !o);
          },
          className: f(
            "eth-dp-trigger",
            c,
            d ? "eth-dp-disabled" : "",
            m.trigger
          ),
          style: {
            backgroundColor: "var(--dp-bg-alt)",
            borderColor: k ? "var(--dp-primary)" : "var(--dp-border)",
            boxShadow: k ? "0 0 0 4px var(--dp-primary-alpha)" : "none"
          },
          children: [
            /* @__PURE__ */ r(ce, { size: u.inputSize === "sm" ? 13 : 15, style: { color: "var(--dp-accent)" } }),
            /* @__PURE__ */ r("span", { className: "eth-dp-trigger-text", style: { color: e ? "var(--dp-text)" : "var(--dp-text-muted)" }, children: pe || l }),
            e && !d && !u.hideClear && /* @__PURE__ */ r(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: se,
                className: "eth-dp-clear-btn",
                style: { color: "var(--dp-text-muted)" },
                children: /* @__PURE__ */ r(he, { size: u.inputSize === "sm" ? 12 : 14 })
              }
            )
          ]
        }
      )
    ] }),
    k && /* @__PURE__ */ r(je, { anchorRef: A, dropW: u.dropdownWidth || 316, children: /* @__PURE__ */ h(
      "div",
      {
        "data-eth-dp": "true",
        className: f("eth-dp-dropdown", m.dropdown),
        style: {
          ...x,
          backgroundColor: "var(--dp-bg)",
          borderColor: "var(--dp-border)",
          color: "var(--dp-text)",
          animation: "dpIn 0.16s cubic-bezier(.22,.68,0,1.2) both"
        },
        children: [
          /* @__PURE__ */ h("div", { className: "eth-dp-tabs", style: { borderColor: "var(--dp-border)", backgroundColor: "var(--dp-bg-alt)" }, children: [
            /* @__PURE__ */ h("div", { className: "eth-dp-tabs-group", style: { backgroundColor: "var(--dp-border)" }, children: [
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => I("ethiopian"),
                  className: "eth-dp-tab",
                  style: {
                    backgroundColor: v === "ethiopian" ? "var(--dp-primary)" : "transparent",
                    color: v === "ethiopian" ? "#fff" : "var(--dp-text-muted)"
                  },
                  children: y.ethTab || "🇪🇹 ኢትዮጵያ"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => I("gregorian"),
                  className: "eth-dp-tab",
                  style: {
                    backgroundColor: v === "gregorian" ? "var(--dp-primary)" : "transparent",
                    color: v === "gregorian" ? "#fff" : "var(--dp-text-muted)"
                  },
                  children: y.gregTab || "🌍 Gregorian"
                }
              )
            ] }),
            !u.hideSwitch && /* @__PURE__ */ r(
              "button",
              {
                type: "button",
                onClick: () => I((o) => o === "ethiopian" ? "gregorian" : "ethiopian"),
                className: "eth-dp-tab-switch",
                style: { color: "var(--dp-text-muted)" },
                children: /* @__PURE__ */ r(ge, { size: 13 })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "eth-dp-cal-body", children: v === "ethiopian" ? /* @__PURE__ */ h(K, { children: [
            /* @__PURE__ */ r(
              te,
              {
                Icons: p,
                month: M.month,
                monthList: y.ethiopianMonths || de,
                onMonthChange: (o) => i((g) => ({ ...g, month: o })),
                badge: O ? /* @__PURE__ */ h("span", { className: "eth-dp-pagume-badge", children: [
                  P,
                  y.pagumeSuffix || "ቀ"
                ] }) : null,
                year: M.year,
                yearSuffix: " ዓ.ም",
                yearRange: u.yearRangeEth || Array.from({ length: 201 }, (o, g) => 1950 + g),
                onYearChange: (o) => i((g) => ({ ...g, year: o })),
                onPrev: () => i((o) => De(o)),
                onNext: () => i((o) => Se(o)),
                customClasses: m.header
              }
            ),
            /* @__PURE__ */ r(
              Le,
              {
                year: M.year,
                month: M.month,
                selectedEth: R,
                todayEth: E,
                onSelect: H,
                labels: { days: y.ethiopianDays },
                customClasses: { weekday: m.weekday, dayCell: m.dayCell }
              }
            ),
            O && /* @__PURE__ */ h("div", { className: "eth-dp-pagume-info", children: [
              "ፓጉሜ ",
              P,
              " ቀናት አሉት",
              P === 6 ? " · ዘመነ ዮሐንስ" : " · ዘመነ ማቴዎስ / ማርቆስ / ሉቃስ"
            ] })
          ] }) : /* @__PURE__ */ h(K, { children: [
            /* @__PURE__ */ r(
              te,
              {
                Icons: p,
                month: N.month,
                monthList: y.gregorianMonths || Ne,
                onMonthChange: (o) => z((g) => ({ ...g, month: o })),
                year: N.year,
                yearSuffix: "",
                yearRange: u.yearRangeGreg || Array.from({ length: 201 }, (o, g) => 1957 + g),
                onYearChange: (o) => z((g) => ({ ...g, year: o })),
                onPrev: () => z((o) => ze(o)),
                onNext: () => z((o) => Ee(o)),
                customClasses: m.header
              }
            ),
            /* @__PURE__ */ r(
              Ie,
              {
                year: N.year,
                month: N.month,
                selectedDate: e,
                today: w,
                onSelect: W,
                labels: { days: y.gregorianDays },
                customClasses: { weekday: m.weekday, dayCell: m.dayCell }
              }
            )
          ] }) }),
          /* @__PURE__ */ h("div", { className: f("eth-dp-footer", m.footer), style: { borderColor: "var(--dp-border)", backgroundColor: "var(--dp-bg-alt)" }, children: [
            /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                onClick: () => {
                  const o = /* @__PURE__ */ new Date(), g = G(o);
                  v === "ethiopian" ? (i({ year: g.year, month: g.month }), H(g.year, g.month, g.day)) : (z({ year: o.getFullYear(), month: o.getMonth() + 1 }), W(o));
                },
                className: "eth-dp-today-btn",
                style: {
                  backgroundColor: "var(--dp-primary-alpha)",
                  borderColor: "var(--dp-primary)",
                  color: "var(--dp-accent)"
                },
                children: [
                  /* @__PURE__ */ r(B, { size: 12 }),
                  y.today || "ዛሬ (Today)"
                ]
              }
            ),
            e && R && /* @__PURE__ */ h("div", { className: "eth-dp-values-compact", style: { backgroundColor: "var(--dp-bg)", borderColor: "var(--dp-border)" }, children: [
              /* @__PURE__ */ h("div", { className: "eth-dp-val-row", children: [
                /* @__PURE__ */ r("span", { className: "eth-dp-val-label", children: "Eth" }),
                /* @__PURE__ */ r("span", { className: "eth-dp-val-text", style: { color: "var(--dp-accent)" }, children: Q(R).split("፣")[0] })
              ] }),
              /* @__PURE__ */ h("div", { className: "eth-dp-val-row", children: [
                /* @__PURE__ */ r("span", { className: "eth-dp-val-label", children: "Greg" }),
                /* @__PURE__ */ r("span", { className: "eth-dp-val-text eth-dp-muted", children: e.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) })
              ] })
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ r("style", { children: `
                .eth-dp-theme-root [type="button"] { cursor: pointer; transition: all 0.15s; font-family: inherit; }
                .eth-dp-theme-root [type="button"]:hover { filter: brightness(1.1); }
                .eth-dp-theme-root [type="button"]:active { scale: 0.97; }
                
                .eth-dp-trigger-container { position: relative; width: 100%; display: flex; flex-direction: column; }
                .eth-dp-label { display: block; text-size: 11px; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dp-text-muted); }
                
                .eth-dp-trigger { display: flex; align-items: center; border: 1px solid; text-align: left; transition: all 0.2s; outline: none; width: 100%; gap: 10px; }
                .eth-dp-trigger-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .eth-dp-disabled { opacity: 0.5; cursor: not-allowed !important; }
                .eth-dp-size-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }
                .eth-dp-size-md { padding: 10px 16px; font-size: 14px; border-radius: 12px; }
                .eth-dp-size-lg { padding: 14px 20px; font-size: 16px; border-radius: 16px; }
                
                .eth-dp-clear-btn { padding: 2px; border-radius: 4px; display: flex; align-items: center; }
                .eth-dp-clear-btn:hover { background: rgba(255,255,255,0.1); }
                
                .eth-dp-dropdown { border-radius: 16px; border: 1px solid; box-shadow: 0 10px 40px rgba(0,0,0,0.4); overflow: hidden; display: flex; flex-direction: column; }
                
                .eth-dp-tabs { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid; }
                .eth-dp-tabs-group { display: flex; border-radius: 8px; padding: 2px; gap: 2px; }
                .eth-dp-tab { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; border: none; }
                .eth-dp-tab-switch { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: none; }
                
                .eth-dp-cal-body { padding: 16px; }
                
                .eth-dp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
                .eth-dp-nav-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: none; }
                .eth-dp-nav-btn:hover { background: rgba(255,255,255,0.1); }
                .eth-dp-picker-group { display: flex; align-items: center; gap: 4px; }
                .eth-dp-rel { position: relative; }
                .eth-dp-picker-btn { font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 8px; border: none; display: flex; align-items: center; gap: 4px; }
                .eth-dp-badge-wrapper { display: inline-flex; }
                
                .eth-dp-list-dropdown { position: absolute; z-index: 50; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; overflow-y: auto; border-radius: 12px; border: 1px solid; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-height: 180px; scrollbar-width: thin; }
                .eth-dp-month-list { width: 120px; }
                .eth-dp-year-list { width: 100px; }
                .eth-dp-list-item { width: 100%; padding: 8px; font-size: 12px; text-align: center; border: none; background: transparent; }
                .eth-dp-list-item:hover { background: rgba(255,255,255,0.1); }
                
                .eth-dp-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
                .eth-dp-weekday { text-align: center; font-weight: 700; font-size: 10px; height: 24px; display: flex; align-items: center; justify-content: center; opacity: 0.8; }
                .eth-dp-day { height: 36px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; display: flex; align-items: center; justify-content: center; }
                .eth-dp-day-selected { font-weight: 700; scale: 1.05; }
                .eth-dp-day-empty { height: 36px; }
                
                .eth-dp-pagume-badge { font-size: 10px; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); padding: 2px 4px; border-radius: 99px; color: #fbbf24; }
                .eth-dp-pagume-info { margin-top: 12px; border-radius: 8px; border: 1px solid rgba(251, 191, 36, 0.2); padding: 8px 12px; font-size: 11px; text-align: center; background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
                
                .eth-dp-footer { padding: 12px 16px; border-top: 1px solid; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
                .eth-dp-today-btn { font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; gap: 6px; }
                .eth-dp-values-compact { border-radius: 12px; border: 1px solid; padding: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 140px; }
                .eth-dp-val-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; overflow: hidden; }
                .eth-dp-val-label { font-size: 9px; font-weight: 900; text-transform: uppercase; opacity: 0.3; }
                .eth-dp-val-text { font-size: 10px; font-weight: 700; white-space: nowrap; }
                .eth-dp-muted { color: #9ca3af; }
                
                @keyframes dpIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            ` })
  ] });
}
export {
  ke as ETHIOPIAN_DAYS_AM,
  de as ETHIOPIAN_MONTHS_AM,
  Fe as EthiopianDatePicker,
  Ce as GREGORIAN_DAYS_EN,
  Ne as GREGORIAN_MONTHS_EN,
  G as dateToEth,
  Fe as default,
  we as ethToDate,
  Q as formatEthDate,
  Me as formatGregDate,
  ae as getDaysInEthMonth,
  fe as getDaysInGregorianMonth,
  me as isEthLeapYear
};
