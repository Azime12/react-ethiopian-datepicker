import { jsxs as u, jsx as o, Fragment as V } from "react/jsx-runtime";
import { useState as M, useRef as _, useEffect as R, useCallback as U } from "react";
import { createPortal as de } from "react-dom";
import { ArrowLeftRight as ie, ChevronRight as pe, ChevronLeft as he, X as ue, Calendar as me } from "lucide-react";
function ye(e, t, r) {
  const n = Math.floor((14 - t) / 12), c = e + 4800 - n, l = t + 12 * n - 3;
  return r + Math.floor((153 * l + 2) / 5) + 365 * c + Math.floor(c / 4) - Math.floor(c / 100) + Math.floor(c / 400) - 32045;
}
function ee(e) {
  const t = e + 32044, r = Math.floor((4 * t + 3) / 146097), n = t - Math.floor(146097 * r / 4), c = Math.floor((4 * n + 3) / 1461), l = n - Math.floor(1461 * c / 4), m = Math.floor((5 * l + 2) / 153);
  return {
    day: l - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * r + c - 4800 + Math.floor(m / 10)
  };
}
const te = 1724221;
function re(e, t, r) {
  const n = Math.floor((e - 1) / 4), c = (e - 1) % 4, l = [0, 365, 730, 1096][c];
  return te + 1461 * n + l + 30 * (t - 1) + (r - 1);
}
function fe(e) {
  const t = e - te, r = Math.floor(t / 1461), n = t % 1461;
  let c, l;
  return n < 365 ? (c = 0, l = n) : n < 730 ? (c = 1, l = n - 365) : n < 1096 ? (c = 2, l = n - 730) : (c = 3, l = n - 1096), {
    year: 4 * r + c + 1,
    month: Math.floor(l / 30) + 1,
    day: l % 30 + 1
  };
}
const be = (e) => e % 4 === 3, oe = (e, t) => t < 13 ? 30 : be(e) ? 6 : 5, ge = (e, t) => new Date(e, t, 0).getDate(), xe = (e, t) => new Date(e, t - 1, 1).getDay(), ve = (e, t) => {
  const r = ee(re(e, t, 1));
  return new Date(r.year, r.month - 1, r.day).getDay();
}, A = (e) => fe(ye(e.getFullYear(), e.getMonth() + 1, e.getDate())), we = (e, t, r) => {
  const n = ee(re(e, t, r));
  return new Date(n.year, n.month - 1, n.day);
}, ne = ["መስከረም", "ጥቅምት", "ሕዳር", "ታሕሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ፓጉሜ"], Ne = ["እሑ", "ሰኞ", "ማክ", "ረቡ", "ሐሙ", "ዓር", "ቅዳ"], Ce = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ke = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], K = (e) => e ? `${ne[e.month - 1]} ${e.day}፣ ${e.year} ዓ.ም` : "", Q = (e) => e ? e.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "", Me = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 13 } : { year: e, month: t - 1 }, De = ({ year: e, month: t }) => t === 13 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, Se = ({ year: e, month: t }) => t === 1 ? { year: e - 1, month: 12 } : { year: e, month: t - 1 }, Ee = ({ year: e, month: t }) => t === 12 ? { year: e + 1, month: 1 } : { year: e, month: t + 1 }, b = (...e) => e.filter(Boolean).join(" ");
function L({ label: e, isToday: t, isSelected: r, isEmpty: n, onClick: c, customClasses: l = {} }) {
  return n ? /* @__PURE__ */ o("div", { className: "w-9 h-9" }) : /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: c,
      className: b(
        "w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-100 focus:outline-none select-none",
        r ? "shadow-md scale-105 font-bold" : "",
        l.base
      ),
      style: {
        backgroundColor: r ? "var(--dp-selected-bg)" : t ? "var(--dp-primary-alpha)" : "transparent",
        color: r ? "#fff" : t ? "var(--dp-accent)" : "var(--dp-text)",
        boxShadow: r ? "0 4px 12px var(--dp-selected-shadow)" : "none",
        border: t && !r ? "2px solid var(--dp-today-ring)" : "none"
      },
      children: e
    }
  );
}
function Z({
  onPrev: e,
  onNext: t,
  month: r,
  monthList: n = [],
  onMonthChange: c,
  badge: l,
  year: m,
  yearSuffix: g = "",
  yearRange: f = [],
  onYearChange: h,
  customClasses: i = {},
  Icons: d = {}
}) {
  const [p, x] = M(!1), [w, S] = M(!1), N = _(null), k = _(null);
  R(() => {
    if (!p || !N.current) return;
    const s = N.current.querySelector('[data-selected="true"]');
    s && s.scrollIntoView({ block: "center" });
  }, [p]), R(() => {
    if (!w || !k.current) return;
    const s = k.current.querySelector('[data-selected="true"]');
    s && s.scrollIntoView({ block: "center" });
  }, [w]);
  const C = () => {
    x((s) => !s), S(!1);
  }, T = () => {
    S((s) => !s), x(!1);
  }, G = (s) => ({
    backgroundColor: s ? "var(--dp-primary)" : "var(--dp-primary-alpha)",
    color: s ? "#fff" : "var(--dp-accent)"
  }), D = (s) => ({
    backgroundColor: s ? "var(--dp-primary)" : "transparent",
    color: s ? "#fff" : "var(--dp-text)"
  }), I = b("absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 overflow-y-auto rounded-xl border shadow-2xl", i.dropdown);
  return /* @__PURE__ */ u("div", { className: b("flex items-center justify-between mb-3", i.container), children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: e,
        className: b("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", i.navBtn),
        style: { color: "var(--dp-text-muted)" },
        children: /* @__PURE__ */ o(d.ChevronLeft, { size: 16 })
      }
    ),
    /* @__PURE__ */ u("div", { className: "flex items-center gap-1 select-none", children: [
      n.length > 0 && c ? /* @__PURE__ */ u("div", { className: "relative", children: [
        /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: C,
            style: G(p),
            className: b("text-xs font-bold px-2.5 py-1 rounded-lg transition-all", i.picker),
            children: [
              n[r - 1],
              " ",
              l && /* @__PURE__ */ o("span", { className: "ml-0.5", children: l }),
              "▾"
            ]
          }
        ),
        p && /* @__PURE__ */ o(
          "div",
          {
            ref: N,
            className: b(I, "w-32 max-h-44"),
            style: {
              scrollbarWidth: "thin",
              backgroundColor: "var(--dp-bg)",
              borderColor: "var(--dp-border)"
            },
            children: n.map((s, v) => /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                "data-selected": v + 1 === r ? "true" : "false",
                onClick: () => {
                  c(v + 1), x(!1);
                },
                className: b("w-full text-center text-xs py-2 transition-colors whitespace-nowrap px-3 hover:bg-[var(--dp-border)]"),
                style: D(v + 1 === r),
                children: s
              },
              v
            ))
          }
        )
      ] }) : null,
      f.length > 0 && h ? /* @__PURE__ */ u("div", { className: "relative", children: [
        /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: T,
            style: G(w),
            className: b("text-xs font-bold px-2.5 py-1 rounded-lg transition-all", i.picker),
            children: [
              m,
              g,
              " ▾"
            ]
          }
        ),
        w && /* @__PURE__ */ o(
          "div",
          {
            ref: k,
            className: b(I, "w-28 max-h-44"),
            style: {
              scrollbarWidth: "thin",
              backgroundColor: "var(--dp-bg)",
              borderColor: "var(--dp-border)"
            },
            children: f.map((s) => /* @__PURE__ */ u(
              "button",
              {
                type: "button",
                "data-selected": s === m ? "true" : "false",
                onClick: () => {
                  h(s), S(!1);
                },
                className: b("w-full text-center text-xs py-2 transition-colors whitespace-nowrap px-3 hover:bg-[var(--dp-border)]"),
                style: D(s === m),
                children: [
                  s,
                  g
                ]
              },
              s
            ))
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: t,
        className: b("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", i.navBtn),
        style: { color: "var(--dp-text-muted)" },
        children: /* @__PURE__ */ o(d.ChevronRight, { size: 16 })
      }
    )
  ] });
}
function Te({ year: e, month: t, selectedEth: r, todayEth: n, onSelect: c, labels: l = {}, customClasses: m = {} }) {
  const g = ve(e, t), f = oe(e, t), h = l.days || Ne, i = [];
  for (let d = 0; d < g; d++) i.push(null);
  for (let d = 1; d <= f; d++) i.push(d);
  return /* @__PURE__ */ u("div", { className: "grid grid-cols-7 gap-y-1 gap-x-0.5", children: [
    h.map((d) => /* @__PURE__ */ o(
      "div",
      {
        className: b("w-9 h-7 flex items-center justify-center font-bold", m.weekday),
        style: { color: "var(--dp-accent)", fontSize: "10.5px", opacity: 0.9 },
        children: d
      },
      d
    )),
    i.map(
      (d, p) => d === null ? /* @__PURE__ */ o(L, { isEmpty: !0 }, `b${p}`) : /* @__PURE__ */ o(
        L,
        {
          label: d,
          customClasses: m.dayCell,
          isToday: n && d === n.day && t === n.month && e === n.year,
          isSelected: r && d === r.day && t === r.month && e === r.year,
          onClick: () => c(e, t, d)
        },
        `d${d}`
      )
    )
  ] });
}
function Ge({ year: e, month: t, selectedDate: r, today: n, onSelect: c, labels: l = {}, customClasses: m = {} }) {
  const g = xe(e, t), f = ge(e, t), h = l.days || ke, i = [];
  for (let p = 0; p < g; p++) i.push(null);
  for (let p = 1; p <= f; p++) i.push(p);
  const d = (p, x) => x && p === x.getDate() && t === x.getMonth() + 1 && e === x.getFullYear();
  return /* @__PURE__ */ u("div", { className: "grid grid-cols-7 gap-y-1 gap-x-0.5", children: [
    h.map((p) => /* @__PURE__ */ o(
      "div",
      {
        className: b("w-9 h-7 flex items-center justify-center font-bold", m.weekday),
        style: { color: "var(--dp-accent)", fontSize: "10.5px", opacity: 0.8 },
        children: p
      },
      p
    )),
    i.map(
      (p, x) => p === null ? /* @__PURE__ */ o(L, { isEmpty: !0 }, `b${x}`) : /* @__PURE__ */ o(
        L,
        {
          label: p,
          customClasses: m.dayCell,
          isToday: d(p, n),
          isSelected: d(p, r),
          onClick: () => c(new Date(e, t - 1, p))
        },
        `d${p}`
      )
    )
  ] });
}
function Ie({ anchorRef: e, children: t, dropW: r = 316 }) {
  const [n, c] = M({});
  return R(() => {
    if (!e.current) return;
    const l = e.current.getBoundingClientRect();
    let m = l.left + window.scrollX;
    m + r > window.innerWidth - 8 && (m = window.innerWidth - r - 8), c({
      position: "absolute",
      top: l.bottom + window.scrollY + 6,
      left: m,
      width: r,
      zIndex: 99999
    });
  }, [e, r]), de(/* @__PURE__ */ o("div", { style: n, children: t }), document.body);
}
function Le({
  value: e = null,
  onChange: t,
  defaultCalendar: r = "ethiopian",
  label: n,
  placeholder: c = "ቀን ይምረጡ…",
  disabled: l = !1,
  customization: m = {}
}) {
  var $, H, B, J, X, W, q;
  const { labels: g = {}, classes: f = {}, config: h = {}, colors: i = {} } = m, d = {
    Calendar: (($ = h.icons) == null ? void 0 : $.Calendar) || me,
    X: ((H = h.icons) == null ? void 0 : H.X) || ue,
    ChevronLeft: ((B = h.icons) == null ? void 0 : B.ChevronLeft) || he,
    ChevronRight: ((J = h.icons) == null ? void 0 : J.ChevronRight) || pe,
    Switch: ((X = h.icons) == null ? void 0 : X.Switch) || ie
  }, p = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-2",
    md: "px-4 py-2.5 text-sm rounded-xl gap-3",
    lg: "px-5 py-3.5 text-base rounded-2xl gap-4"
  }[h.inputSize || "md"], x = {
    "--dp-primary": i.primary || "#7c3aed",
    "--dp-primary-alpha": i.primary ? `${i.primary}26` : "rgba(124, 58, 237, 0.15)",
    "--dp-bg": i.background || "#111827",
    "--dp-bg-alt": i.backgroundAlt || "rgba(0, 0, 0, 0.2)",
    "--dp-border": i.border || "rgba(255, 255, 255, 0.1)",
    "--dp-text": i.text || "#f3f4f6",
    "--dp-text-muted": i.textMuted || "#9ca3af",
    "--dp-accent": i.accent || "#a78bfa",
    "--dp-today-ring": i.todayRing || "#a78bfa",
    "--dp-selected-bg": i.selectedBg || "#7c3aed",
    "--dp-selected-shadow": i.selectedShadow || "rgba(109, 40, 217, 0.4)",
    fontSize: h.fontSize || "inherit",
    fontFamily: h.fontFamily || "inherit"
  }, w = /* @__PURE__ */ new Date(), S = A(w), [N, k] = M(!1), [C, T] = M(r), [G, D] = M(null), I = e ? A(e) : S, [s, v] = M({ year: I.year, month: I.month }), [Y, E] = M({
    year: e ? e.getFullYear() : w.getFullYear(),
    month: e ? e.getMonth() + 1 : w.getMonth() + 1
  }), F = _(null);
  R(() => {
    if (!N) return;
    const a = (y) => {
      var z;
      (z = F.current) != null && z.contains(y.target) || y.target.closest("[data-eth-dp]") || k(!1);
    };
    return document.addEventListener("mousedown", a, !0), () => document.removeEventListener("mousedown", a, !0);
  }, [N]), R(() => {
    if (!e) {
      D(null);
      return;
    }
    if (!G) {
      const a = A(e);
      v({ year: a.year, month: a.month });
    }
    E({ year: e.getFullYear(), month: e.getMonth() + 1 });
  }, [e]);
  const j = G ?? (e ? A(e) : null), ae = U((a, y, z) => {
    D({ year: a, month: y, day: z }), v({ year: a, month: y }), t == null || t(we(a, y, z)), k(!1);
  }, [t]), le = U((a) => {
    D(null), E({ year: a.getFullYear(), month: a.getMonth() + 1 }), t == null || t(a), k(!1);
  }, [t]), se = (a) => {
    a.stopPropagation(), D(null), t == null || t(null);
  }, ce = e ? C === "ethiopian" ? K(j) : Q(e) : "", O = C === "ethiopian" && s.month === 13, P = O ? oe(s.year, 13) : 0;
  return /* @__PURE__ */ u("div", { style: x, className: "eth-dp-theme-root", children: [
    /* @__PURE__ */ u("div", { ref: F, className: b("relative w-full", f.container), children: [
      n && /* @__PURE__ */ o("label", { className: "block text-xs font-semibold mb-1.5 uppercase tracking-wider", style: { color: "var(--dp-text-muted)" }, children: n }),
      /* @__PURE__ */ u(
        "button",
        {
          type: "button",
          disabled: l,
          onClick: () => {
            l || k((a) => !a);
          },
          className: b(
            "w-full flex items-center border text-left transition-all duration-200 focus:outline-none",
            p,
            l ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--dp-border)]",
            f.trigger
          ),
          style: {
            backgroundColor: "var(--dp-bg-alt)",
            borderColor: N ? "var(--dp-primary)" : "var(--dp-border)",
            boxShadow: N ? "0 0 0 4px var(--dp-primary-alpha)" : "none"
          },
          children: [
            /* @__PURE__ */ o(d.Calendar, { size: h.inputSize === "sm" ? 13 : 15, style: { color: "var(--dp-accent)" }, className: "shrink-0" }),
            /* @__PURE__ */ o("span", { className: "flex-1 truncate", style: { color: e ? "var(--dp-text)" : "var(--dp-text-muted)" }, children: ce || c }),
            e && !l && !h.hideClear && /* @__PURE__ */ o(
              "span",
              {
                role: "button",
                tabIndex: 0,
                onClick: se,
                className: "p-0.5 rounded hover:bg-white/10 transition-colors shrink-0",
                style: { color: "var(--dp-text-muted)" },
                children: /* @__PURE__ */ o(d.X, { size: h.inputSize === "sm" ? 12 : 14 })
              }
            )
          ]
        }
      )
    ] }),
    N && /* @__PURE__ */ o(Ie, { anchorRef: F, dropW: h.dropdownWidth || 316, children: /* @__PURE__ */ u(
      "div",
      {
        "data-eth-dp": "true",
        className: b("rounded-2xl border shadow-2xl overflow-hidden", f.dropdown),
        style: {
          ...x,
          backgroundColor: "var(--dp-bg)",
          borderColor: "var(--dp-border)",
          color: "var(--dp-text)",
          animation: "dpIn 0.16s cubic-bezier(.22,.68,0,1.2) both",
          zIndex: 999999
        },
        children: [
          /* @__PURE__ */ u("div", { className: "flex items-center justify-between px-4 py-2.5 border-b", style: { borderColor: "var(--dp-border)", backgroundColor: "var(--dp-bg-alt)" }, children: [
            /* @__PURE__ */ u("div", { className: "flex rounded-lg p-0.5 gap-0.5", style: { backgroundColor: "var(--dp-border)" }, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => T("ethiopian"),
                  className: "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                  style: {
                    backgroundColor: C === "ethiopian" ? "var(--dp-primary)" : "transparent",
                    color: C === "ethiopian" ? "#fff" : "var(--dp-text-muted)"
                  },
                  children: g.ethTab || "🇪🇹 ኢትዮጵያ"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => T("gregorian"),
                  className: "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                  style: {
                    backgroundColor: C === "gregorian" ? "var(--dp-primary)" : "transparent",
                    color: C === "gregorian" ? "#fff" : "var(--dp-text-muted)"
                  },
                  children: g.gregTab || "🌍 Gregorian"
                }
              )
            ] }),
            !h.hideSwitch && /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => T((a) => a === "ethiopian" ? "gregorian" : "ethiopian"),
                className: "w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10",
                style: { color: "var(--dp-text-muted)" },
                children: /* @__PURE__ */ o(d.Switch, { size: 13 })
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "p-4", children: C === "ethiopian" ? /* @__PURE__ */ u(V, { children: [
            /* @__PURE__ */ o(
              Z,
              {
                Icons: d,
                month: s.month,
                monthList: g.ethiopianMonths || ne,
                onMonthChange: (a) => v((y) => ({ ...y, month: a })),
                badge: O ? /* @__PURE__ */ u("span", { className: "text-[10px] bg-amber-400/10 border border-amber-400/20 px-1 py-0.5 rounded-full ml-0.5 text-amber-400", children: [
                  P,
                  g.pagumeSuffix || "ቀ"
                ] }) : null,
                year: s.year,
                yearSuffix: " ዓ.ም",
                yearRange: h.yearRangeEth || Array.from({ length: 201 }, (a, y) => 1950 + y),
                onYearChange: (a) => v((y) => ({ ...y, year: a })),
                onPrev: () => v((a) => Me(a)),
                onNext: () => v((a) => De(a)),
                customClasses: f.header
              }
            ),
            /* @__PURE__ */ o(
              Te,
              {
                year: s.year,
                month: s.month,
                selectedEth: j,
                todayEth: S,
                onSelect: ae,
                labels: { days: g.ethiopianDays },
                customClasses: { weekday: f.weekday, dayCell: f.dayCell }
              }
            ),
            O && /* @__PURE__ */ u("div", { className: "mt-3 rounded-lg border px-3 py-2 text-[11px] text-center leading-relaxed", style: { backgroundColor: "rgba(251, 191, 36, 0.1)", borderColor: "rgba(251, 191, 36, 0.2)", color: "#fcd34d" }, children: [
              "ፓጉሜ ",
              P,
              " ቀናት አሉት",
              P === 6 ? " · ዘመነ ዮሐንስ (የሐሙስ ዓመት)" : " · ዘመነ ማቴዎስ / ማርቆስ / ሉቃስ"
            ] })
          ] }) : /* @__PURE__ */ u(V, { children: [
            /* @__PURE__ */ o(
              Z,
              {
                Icons: d,
                month: Y.month,
                monthList: g.gregorianMonths || Ce,
                onMonthChange: (a) => E((y) => ({ ...y, month: a })),
                year: Y.year,
                yearSuffix: "",
                yearRange: h.yearRangeGreg || Array.from({ length: 201 }, (a, y) => 1957 + y),
                onYearChange: (a) => E((y) => ({ ...y, year: a })),
                onPrev: () => E((a) => Se(a)),
                onNext: () => E((a) => Ee(a)),
                customClasses: f.header
              }
            ),
            /* @__PURE__ */ o(
              Ge,
              {
                year: Y.year,
                month: Y.month,
                selectedDate: e,
                today: w,
                onSelect: le,
                labels: { days: g.gregorianDays },
                customClasses: { weekday: f.weekday, dayCell: f.dayCell }
              }
            )
          ] }) }),
          e && j && /* @__PURE__ */ o("div", { className: b("px-4 pb-4 pt-3 border-t", f.footer), style: { borderColor: "var(--dp-border)", backgroundColor: "var(--dp-bg-alt)" }, children: /* @__PURE__ */ u("div", { className: "rounded-xl border p-3 space-y-1.5", style: { backgroundColor: "var(--dp-primary-alpha)", borderColor: "var(--dp-primary-alpha)" }, children: [
            /* @__PURE__ */ u("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ o("span", { className: "text-[10px] uppercase tracking-wider", style: { color: "var(--dp-text-muted)" }, children: ((W = g.ethTab) == null ? void 0 : W.replace(/[^\w\s]/gi, "")) || "ኢትዮጵያ" }),
              /* @__PURE__ */ o("span", { className: "text-xs font-semibold", style: { color: "var(--dp-accent)" }, children: K(j) })
            ] }),
            /* @__PURE__ */ u("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ o("span", { className: "text-[10px] uppercase tracking-wider", style: { color: "var(--dp-text-muted)" }, children: ((q = g.gregTab) == null ? void 0 : q.replace(/[^\w\s]/gi, "")) || "Gregorian" }),
              /* @__PURE__ */ o("span", { className: "text-xs font-semibold", style: { color: "var(--dp-text)" }, children: Q(e) })
            ] })
          ] }) })
        ]
      }
    ) }),
    /* @__PURE__ */ o("style", { children: `
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
  Ne as ETHIOPIAN_DAYS_AM,
  ne as ETHIOPIAN_MONTHS_AM,
  Le as EthiopianDatePicker,
  ke as GREGORIAN_DAYS_EN,
  Ce as GREGORIAN_MONTHS_EN,
  A as dateToEth,
  Le as default,
  we as ethToDate,
  K as formatEthDate,
  Q as formatGregDate,
  oe as getDaysInEthMonth,
  ge as getDaysInGregorianMonth,
  be as isEthLeapYear
};
