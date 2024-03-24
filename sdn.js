function e(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n]
    var i
    return (
      (t[n] = Object.assign({}, r)),
      o(r.value) &&
        ((i = r.value),
        '[object Function]' !== Object.prototype.toString.call(i)) &&
        !Array.isArray(r.value) &&
        (t[n].value = Object.assign({}, r.value)),
      Array.isArray(r.value) && (t[n].value = r.value.slice(0)),
      t
    )
  }, {})
}
function t(e) {
  if (e)
    try {
      return JSON.parse(e)
    } catch (t) {
      return e
    }
}
function n(e, t, n) {
  if (null == n || !1 === n) return e.removeAttribute(t)
  let o = JSON.stringify(n)
  ;(e.__updating[t] = !0),
    'true' === o && (o = ''),
    e.setAttribute(t, o),
    Promise.resolve().then(() => delete e.__updating[t])
}
function o(e) {
  return null != e && ('object' == typeof e || 'function' == typeof e)
}
let r
function i(o, i) {
  const s = Object.keys(i)
  return class extends o {
    static get observedAttributes() {
      return s.map((e) => i[e].attribute)
    }
    constructor() {
      super(),
        (this.__initialized = !1),
        (this.__released = !1),
        (this.__releaseCallbacks = []),
        (this.__propertyChangedCallbacks = []),
        (this.__updating = {}),
        (this.props = {})
    }
    connectedCallback() {
      if (this.__initialized) return
      ;(this.__releaseCallbacks = []),
        (this.__propertyChangedCallbacks = []),
        (this.__updating = {}),
        (this.props = (function (o, r) {
          const i = e(r)
          return (
            Object.keys(r).forEach((e) => {
              const r = i[e],
                s = o.getAttribute(r.attribute),
                a = o[e]
              s && (r.value = r.parse ? t(s) : s),
                null != a && (r.value = Array.isArray(a) ? a.slice(0) : a),
                r.reflect && n(o, r.attribute, r.value),
                Object.defineProperty(o, e, {
                  get: () => r.value,
                  set(t) {
                    const o = r.value
                    ;(r.value = t), r.reflect && n(this, r.attribute, r.value)
                    for (
                      let n = 0, r = this.__propertyChangedCallbacks.length;
                      n < r;
                      n++
                    )
                      this.__propertyChangedCallbacks[n](e, t, o)
                  },
                  enumerable: !0,
                  configurable: !0,
                })
            }),
            i
          )
        })(this, i))
      const o = (function (e) {
          return Object.keys(e).reduce((t, n) => ((t[n] = e[n].value), t), {})
        })(this.props),
        s = this.Component,
        a = r
      try {
        ;(r = this),
          (this.__initialized = !0),
          'function' == typeof (l = s) && 0 === l.toString().indexOf('class')
            ? new s(o, { element: this })
            : s(o, { element: this })
      } finally {
        r = a
      }
      var l
    }
    async disconnectedCallback() {
      if ((await Promise.resolve(), this.isConnected)) return
      this.__propertyChangedCallbacks.length = 0
      let e = null
      for (; (e = this.__releaseCallbacks.pop()); ) e(this)
      delete this.__initialized, (this.__released = !0)
    }
    attributeChangedCallback(e, n, o) {
      if (
        this.__initialized &&
        !this.__updating[e] &&
        (e = this.lookupProp(e)) in i
      ) {
        if (null == o && !this[e]) return
        this[e] = i[e].parse ? t(o) : o
      }
    }
    lookupProp(e) {
      if (i) return s.find((t) => e === t || e === i[t].attribute)
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({ mode: 'open' })
    }
    addReleaseCallback(e) {
      this.__releaseCallbacks.push(e)
    }
    addPropertyChangedCallback(e) {
      this.__propertyChangedCallbacks.push(e)
    }
  }
}
function s(e, t = {}, n = {}) {
  const { BaseElement: r = HTMLElement, extension: s } = n
  return (n) => {
    if (!e) throw new Error('tag is required to register a Component')
    let a = customElements.get(e)
    return a
      ? ((a.prototype.Component = n), a)
      : ((a = i(
          r,
          (function (e) {
            return e
              ? Object.keys(e).reduce((t, n) => {
                  const r = e[n]
                  return (
                    (t[n] = o(r) && 'value' in r ? r : { value: r }),
                    t[n].attribute ||
                      (t[n].attribute = n
                        .replace(
                          /\.?([A-Z]+)/g,
                          (e, t) => '-' + t.toLowerCase()
                        )
                        .replace('_', '-')
                        .replace(/^-/, '')),
                    (t[n].parse =
                      'parse' in t[n]
                        ? t[n].parse
                        : 'string' != typeof t[n].value),
                    t
                  )
                }, {})
              : {}
          })(t)
        )),
        (a.prototype.Component = n),
        (a.prototype.registeredTag = e),
        customElements.define(e, a, s),
        a)
  }
}
const a = { context: void 0, registry: void 0 },
  l = Symbol('solid-proxy'),
  c = Symbol('solid-track'),
  d = { equals: (e, t) => e === t }
let u = O
const p = 1,
  h = 2,
  g = { owned: null, cleanups: null, context: null, owner: null }
var f = null
let b = null,
  m = null,
  y = null,
  v = null,
  w = 0
function x(e, t) {
  const n = m,
    o = f,
    r = 0 === e.length,
    i = r
      ? g
      : {
          owned: null,
          cleanups: null,
          context: null,
          owner: void 0 === t ? o : t,
        },
    s = r ? e : () => e(() => C(() => j(i)))
  ;(f = i), (m = null)
  try {
    return N(s, !0)
  } finally {
    ;(m = n), (f = o)
  }
}
function k(e, t) {
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: (t = t ? Object.assign({}, d, t) : d).equals || void 0,
  }
  return [
    I.bind(n),
    (e) => ('function' == typeof e && (e = e(n.value)), P(n, e)),
  ]
}
function _(e, t, n) {
  R(L(e, t, !1, p))
}
function $(e, t, n) {
  u = B
  const o = L(e, t, !1, p)
  ;(n && n.render) || (o.user = !0), v ? v.push(o) : R(o)
}
function T(e, t, n) {
  n = n ? Object.assign({}, d, n) : d
  const o = L(e, t, !0, 0)
  return (
    (o.observers = null),
    (o.observerSlots = null),
    (o.comparator = n.equals || void 0),
    R(o),
    I.bind(o)
  )
}
function C(e) {
  if (null === m) return e()
  const t = m
  m = null
  try {
    return e()
  } finally {
    m = t
  }
}
function S(e) {
  $(() => C(e))
}
function E(e) {
  return (
    null === f ||
      (null === f.cleanups ? (f.cleanups = [e]) : f.cleanups.push(e)),
    e
  )
}
function A(e) {
  const t = T(e),
    n = T(() => U(t()))
  return (
    (n.toArray = () => {
      const e = n()
      return Array.isArray(e) ? e : null != e ? [e] : []
    }),
    n
  )
}
function I() {
  if (this.sources && this.state)
    if (this.state === p) R(this)
    else {
      const e = y
      ;(y = null), N(() => z(this), !1), (y = e)
    }
  if (m) {
    const e = this.observers ? this.observers.length : 0
    m.sources
      ? (m.sources.push(this), m.sourceSlots.push(e))
      : ((m.sources = [this]), (m.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(m),
          this.observerSlots.push(m.sources.length - 1))
        : ((this.observers = [m]),
          (this.observerSlots = [m.sources.length - 1]))
  }
  return this.value
}
function P(e, t, n) {
  let o = e.value
  return (
    (e.comparator && e.comparator(o, t)) ||
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        N(() => {
          for (let t = 0; t < e.observers.length; t += 1) {
            const n = e.observers[t],
              o = b && b.running
            o && b.disposed.has(n),
              (o ? n.tState : n.state) ||
                (n.pure ? y.push(n) : v.push(n), n.observers && D(n)),
              o || (n.state = p)
          }
          if (y.length > 1e6) throw ((y = []), new Error())
        }, !1)),
    t
  )
}
function R(e) {
  if (!e.fn) return
  j(e)
  const t = f,
    n = m,
    o = w
  ;(m = f = e),
    (function (e, t, n) {
      let o
      try {
        o = e.fn(t)
      } catch (t) {
        return (
          e.pure &&
            ((e.state = p), e.owned && e.owned.forEach(j), (e.owned = null)),
          (e.updatedAt = n + 1),
          F(t)
        )
      }
      ;(!e.updatedAt || e.updatedAt <= n) &&
        (null != e.updatedAt && 'observers' in e ? P(e, o) : (e.value = o),
        (e.updatedAt = n))
    })(e, e.value, o),
    (m = n),
    (f = t)
}
function L(e, t, n, o = p, r) {
  const i = {
    fn: e,
    state: o,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: f,
    context: null,
    pure: n,
  }
  return (
    null === f || (f !== g && (f.owned ? f.owned.push(i) : (f.owned = [i]))), i
  )
}
function M(e) {
  if (0 === e.state) return
  if (e.state === h) return z(e)
  if (e.suspense && C(e.suspense.inFallback)) return e.suspense.effects.push(e)
  const t = [e]
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < w); )
    e.state && t.push(e)
  for (let n = t.length - 1; n >= 0; n--)
    if ((e = t[n]).state === p) R(e)
    else if (e.state === h) {
      const n = y
      ;(y = null), N(() => z(e, t[0]), !1), (y = n)
    }
}
function N(e, t) {
  if (y) return e()
  let n = !1
  t || (y = []), v ? (n = !0) : (v = []), w++
  try {
    const t = e()
    return (
      (function (e) {
        y && (O(y), (y = null))
        if (e) return
        const t = v
        ;(v = null), t.length && N(() => u(t), !1)
      })(n),
      t
    )
  } catch (e) {
    n || (v = null), (y = null), F(e)
  }
}
function O(e) {
  for (let t = 0; t < e.length; t++) M(e[t])
}
function B(e) {
  let t,
    n = 0
  for (t = 0; t < e.length; t++) {
    const o = e[t]
    o.user ? (e[n++] = o) : M(o)
  }
  for (t = 0; t < n; t++) M(e[t])
}
function z(e, t) {
  e.state = 0
  for (let n = 0; n < e.sources.length; n += 1) {
    const o = e.sources[n]
    if (o.sources) {
      const e = o.state
      e === p
        ? o !== t && (!o.updatedAt || o.updatedAt < w) && M(o)
        : e === h && z(o, t)
    }
  }
}
function D(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t]
    n.state ||
      ((n.state = h), n.pure ? y.push(n) : v.push(n), n.observers && D(n))
  }
}
function j(e) {
  let t
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(),
        n = e.sourceSlots.pop(),
        o = t.observers
      if (o && o.length) {
        const e = o.pop(),
          r = t.observerSlots.pop()
        n < o.length &&
          ((e.sourceSlots[r] = n), (o[n] = e), (t.observerSlots[n] = r))
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) j(e.owned[t])
    e.owned = null
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]()
    e.cleanups = null
  }
  ;(e.state = 0), (e.context = null)
}
function F(e, t = f) {
  const n = (function (e) {
    return e instanceof Error
      ? e
      : new Error('string' == typeof e ? e : 'Unknown error', { cause: e })
  })(e)
  throw n
}
function U(e) {
  if ('function' == typeof e && !e.length) return U(e())
  if (Array.isArray(e)) {
    const t = []
    for (let n = 0; n < e.length; n++) {
      const o = U(e[n])
      Array.isArray(o) ? t.push.apply(t, o) : t.push(o)
    }
    return t
  }
  return e
}
const H = Symbol('fallback')
function q(e) {
  for (let t = 0; t < e.length; t++) e[t]()
}
function G(e, t) {
  return C(() => e(t || {}))
}
function V() {
  return !0
}
const W = {
  get: (e, t, n) => (t === l ? n : e.get(t)),
  has: (e, t) => t === l || e.has(t),
  set: V,
  deleteProperty: V,
  getOwnPropertyDescriptor: (e, t) => ({
    configurable: !0,
    enumerable: !0,
    get: () => e.get(t),
    set: V,
    deleteProperty: V,
  }),
  ownKeys: (e) => e.keys(),
}
function K(e) {
  return (e = 'function' == typeof e ? e() : e) ? e : {}
}
function Y() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const t = this[e]()
    if (void 0 !== t) return t
  }
}
function Z(...e) {
  let t = !1
  for (let n = 0; n < e.length; n++) {
    const o = e[n]
    ;(t = t || (!!o && l in o)),
      (e[n] = 'function' == typeof o ? ((t = !0), T(o)) : o)
  }
  if (t)
    return new Proxy(
      {
        get(t) {
          for (let n = e.length - 1; n >= 0; n--) {
            const o = K(e[n])[t]
            if (void 0 !== o) return o
          }
        },
        has(t) {
          for (let n = e.length - 1; n >= 0; n--) if (t in K(e[n])) return !0
          return !1
        },
        keys() {
          const t = []
          for (let n = 0; n < e.length; n++) t.push(...Object.keys(K(e[n])))
          return [...new Set(t)]
        },
      },
      W
    )
  const n = {},
    o = {},
    r = new Set()
  for (let t = e.length - 1; t >= 0; t--) {
    const i = e[t]
    if (!i) continue
    const s = Object.getOwnPropertyNames(i)
    for (let e = 0, t = s.length; e < t; e++) {
      const t = s[e]
      if ('__proto__' === t || 'constructor' === t) continue
      const a = Object.getOwnPropertyDescriptor(i, t)
      if (r.has(t)) {
        const e = o[t]
        e
          ? a.get
            ? e.push(a.get.bind(i))
            : void 0 !== a.value && e.push(() => a.value)
          : void 0 === n[t] && (n[t] = a.value)
      } else
        a.get
          ? (r.add(t),
            Object.defineProperty(n, t, {
              enumerable: !0,
              configurable: !0,
              get: Y.bind((o[t] = [a.get.bind(i)])),
            }))
          : (void 0 !== a.value && r.add(t), (n[t] = a.value))
    }
  }
  return n
}
function X(e, ...t) {
  if (l in e) {
    const n = new Set(t.length > 1 ? t.flat() : t[0]),
      o = t.map(
        (t) =>
          new Proxy(
            {
              get: (n) => (t.includes(n) ? e[n] : void 0),
              has: (n) => t.includes(n) && n in e,
              keys: () => t.filter((t) => t in e),
            },
            W
          )
      )
    return (
      o.push(
        new Proxy(
          {
            get: (t) => (n.has(t) ? void 0 : e[t]),
            has: (t) => !n.has(t) && t in e,
            keys: () => Object.keys(e).filter((e) => !n.has(e)),
          },
          W
        )
      ),
      o
    )
  }
  const n = {},
    o = t.map(() => ({}))
  for (const r of Object.getOwnPropertyNames(e)) {
    const i = Object.getOwnPropertyDescriptor(e, r),
      s = !i.get && !i.set && i.enumerable && i.writable && i.configurable
    let a = !1,
      l = 0
    for (const e of t)
      e.includes(r) &&
        ((a = !0), s ? (o[l][r] = i.value) : Object.defineProperty(o[l], r, i)),
        ++l
    a || (s ? (n[r] = i.value) : Object.defineProperty(n, r, i))
  }
  return [...o, n]
}
let J = 0
const Q = (e) => `Stale read from <${e}>.`
function ee(e) {
  const t = 'fallback' in e && { fallback: () => e.fallback }
  return T(
    (function (e, t, n = {}) {
      let o = [],
        r = [],
        i = [],
        s = 0,
        a = t.length > 1 ? [] : null
      return (
        E(() => q(i)),
        () => {
          let l,
            d,
            u = e() || []
          return (
            u[c],
            C(() => {
              let e,
                t,
                c,
                h,
                g,
                f,
                b,
                m,
                y,
                v = u.length
              if (0 === v)
                0 !== s &&
                  (q(i), (i = []), (o = []), (r = []), (s = 0), a && (a = [])),
                  n.fallback &&
                    ((o = [H]),
                    (r[0] = x((e) => ((i[0] = e), n.fallback()))),
                    (s = 1))
              else if (0 === s) {
                for (r = new Array(v), d = 0; d < v; d++)
                  (o[d] = u[d]), (r[d] = x(p))
                s = v
              } else {
                for (
                  c = new Array(v),
                    h = new Array(v),
                    a && (g = new Array(v)),
                    f = 0,
                    b = Math.min(s, v);
                  f < b && o[f] === u[f];
                  f++
                );
                for (
                  b = s - 1, m = v - 1;
                  b >= f && m >= f && o[b] === u[m];
                  b--, m--
                )
                  (c[m] = r[b]), (h[m] = i[b]), a && (g[m] = a[b])
                for (e = new Map(), t = new Array(m + 1), d = m; d >= f; d--)
                  (y = u[d]),
                    (l = e.get(y)),
                    (t[d] = void 0 === l ? -1 : l),
                    e.set(y, d)
                for (l = f; l <= b; l++)
                  (y = o[l]),
                    (d = e.get(y)),
                    void 0 !== d && -1 !== d
                      ? ((c[d] = r[l]),
                        (h[d] = i[l]),
                        a && (g[d] = a[l]),
                        (d = t[d]),
                        e.set(y, d))
                      : i[l]()
                for (d = f; d < v; d++)
                  d in c
                    ? ((r[d] = c[d]),
                      (i[d] = h[d]),
                      a && ((a[d] = g[d]), a[d](d)))
                    : (r[d] = x(p))
                ;(r = r.slice(0, (s = v))), (o = u.slice(0))
              }
              return r
            })
          )
          function p(e) {
            if (((i[d] = e), a)) {
              const [e, n] = k(d)
              return (a[d] = n), t(u[d], e)
            }
            return t(u[d])
          }
        }
      )
    })(() => e.each, e.children, t || void 0)
  )
}
function te(e) {
  const t = e.keyed,
    n = T(() => e.when, void 0, { equals: (e, n) => (t ? e === n : !e == !n) })
  return T(
    () => {
      const o = n()
      if (o) {
        const r = e.children
        return 'function' == typeof r && r.length > 0
          ? C(() =>
              r(
                t
                  ? o
                  : () => {
                      if (!C(n)) throw Q('Show')
                      return e.when
                    }
              )
            )
          : r
      }
      return e.fallback
    },
    void 0,
    void 0
  )
}
function ne(e) {
  let t = !1
  const n = A(() => e.children),
    o = T(
      () => {
        let e = n()
        Array.isArray(e) || (e = [e])
        for (let n = 0; n < e.length; n++) {
          const o = e[n].when
          if (o) return (t = !!e[n].keyed), [n, o, e[n]]
        }
        return [-1]
      },
      void 0,
      {
        equals: (e, n) =>
          e[0] === n[0] &&
          (t ? e[1] === n[1] : !e[1] == !n[1]) &&
          e[2] === n[2],
      }
    )
  return T(
    () => {
      const [n, r, i] = o()
      if (n < 0) return e.fallback
      const s = i.children
      return 'function' == typeof s && s.length > 0
        ? C(() =>
            s(
              t
                ? r
                : () => {
                    if (C(o)[0] !== n) throw Q('Match')
                    return i.when
                  }
            )
          )
        : s
    },
    void 0,
    void 0
  )
}
function oe(e) {
  return e
}
const re = new Set([
    'className',
    'value',
    'readOnly',
    'formNoValidate',
    'isMap',
    'noModule',
    'playsInline',
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected',
  ]),
  ie = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  se = Object.assign(Object.create(null), {
    className: 'class',
    htmlFor: 'for',
  }),
  ae = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 },
  })
const le = new Set([
    'beforeinput',
    'click',
    'dblclick',
    'contextmenu',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'pointerdown',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'touchend',
    'touchmove',
    'touchstart',
  ]),
  ce = {
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
  }
const de = '_$DX_DELEGATE'
function ue(e, t, n) {
  let o
  const r = () => {
      const t = document.createElement('template')
      return (
        (t.innerHTML = e),
        n ? t.content.firstChild.firstChild : t.content.firstChild
      )
    },
    i = t
      ? () => C(() => document.importNode(o || (o = r()), !0))
      : () => (o || (o = r())).cloneNode(!0)
  return (i.cloneNode = i), i
}
function pe(e, t = window.document) {
  const n = t[de] || (t[de] = new Set())
  for (let o = 0, r = e.length; o < r; o++) {
    const r = e[o]
    n.has(r) || (n.add(r), t.addEventListener(r, we))
  }
}
function he(e, t, n) {
  null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
}
function ge(e, t) {
  null == t ? e.removeAttribute('class') : (e.className = t)
}
function fe(e, t = {}, n, o) {
  const r = {}
  return (
    o || _(() => (r.children = xe(e, t.children, r.children))),
    _(() => t.ref && t.ref(e)),
    _(() =>
      (function (e, t, n, o, r = {}, i = !1) {
        t || (t = {})
        for (const o in r)
          if (!(o in t)) {
            if ('children' === o) continue
            r[o] = ve(e, o, null, r[o], n, i)
          }
        for (const s in t) {
          if ('children' === s) {
            o || xe(e, t.children)
            continue
          }
          const a = t[s]
          r[s] = ve(e, s, a, r[s], n, i)
        }
      })(e, t, n, !0, r, !0)
    ),
    r
  )
}
function be(e, t, n) {
  return C(() => e(t, n))
}
function me(e, t, n, o) {
  if ((void 0 === n || o || (o = []), 'function' != typeof t))
    return xe(e, t, o, n)
  _((o) => xe(e, t(), o, n), o)
}
function ye(e, t, n) {
  const o = t.trim().split(/\s+/)
  for (let t = 0, r = o.length; t < r; t++) e.classList.toggle(o[t], n)
}
function ve(e, t, n, o, r, i) {
  let s, a, l, c, d
  if ('style' === t)
    return (function (e, t, n) {
      if (!t) return n ? he(e, 'style') : t
      const o = e.style
      if ('string' == typeof t) return (o.cssText = t)
      let r, i
      for (i in ('string' == typeof n && (o.cssText = n = void 0),
      n || (n = {}),
      t || (t = {}),
      n))
        null == t[i] && o.removeProperty(i), delete n[i]
      for (i in t) (r = t[i]), r !== n[i] && (o.setProperty(i, r), (n[i] = r))
      return n
    })(e, n, o)
  if ('classList' === t)
    return (function (e, t, n = {}) {
      const o = Object.keys(t || {}),
        r = Object.keys(n)
      let i, s
      for (i = 0, s = r.length; i < s; i++) {
        const o = r[i]
        o && 'undefined' !== o && !t[o] && (ye(e, o, !1), delete n[o])
      }
      for (i = 0, s = o.length; i < s; i++) {
        const r = o[i],
          s = !!t[r]
        r && 'undefined' !== r && n[r] !== s && s && (ye(e, r, !0), (n[r] = s))
      }
      return n
    })(e, n, o)
  if (n === o) return o
  if ('ref' === t) i || n(e)
  else if ('on:' === t.slice(0, 3)) {
    const r = t.slice(3)
    o && e.removeEventListener(r, o), n && e.addEventListener(r, n)
  } else if ('oncapture:' === t.slice(0, 10)) {
    const r = t.slice(10)
    o && e.removeEventListener(r, o, !0), n && e.addEventListener(r, n, !0)
  } else if ('on' === t.slice(0, 2)) {
    const r = t.slice(2).toLowerCase(),
      i = le.has(r)
    if (!i && o) {
      const t = Array.isArray(o) ? o[0] : o
      e.removeEventListener(r, t)
    }
    ;(i || n) &&
      (!(function (e, t, n, o) {
        if (o)
          Array.isArray(n)
            ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
            : (e[`$$${t}`] = n)
        else if (Array.isArray(n)) {
          const o = n[0]
          e.addEventListener(t, (n[0] = (t) => o.call(e, n[1], t)))
        } else e.addEventListener(t, n)
      })(e, r, n, i),
      i && pe([r]))
  } else if ('attr:' === t.slice(0, 5)) he(e, t.slice(5), n)
  else if (
    (d = 'prop:' === t.slice(0, 5)) ||
    (l = ie.has(t)) ||
    (!r &&
      ((c = (function (e, t) {
        const n = ae[e]
        return 'object' == typeof n ? (n[t] ? n.$ : void 0) : n
      })(t, e.tagName)) ||
        (a = re.has(t)))) ||
    (s = e.nodeName.includes('-'))
  )
    d && ((t = t.slice(5)), (a = !0)),
      'class' === t || 'className' === t
        ? ge(e, n)
        : !s || a || l
        ? (e[c || t] = n)
        : (e[
            ((u = t),
            u.toLowerCase().replace(/-([a-z])/g, (e, t) => t.toUpperCase()))
          ] = n)
  else {
    const o = r && t.indexOf(':') > -1 && ce[t.split(':')[0]]
    o
      ? (function (e, t, n, o) {
          null == o ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, o)
        })(e, o, t, n)
      : he(e, se[t] || t, n)
  }
  var u
  return n
}
function we(e) {
  const t = `$$${e.type}`
  let n = (e.composedPath && e.composedPath()[0]) || e.target
  for (
    e.target !== n &&
      Object.defineProperty(e, 'target', { configurable: !0, value: n }),
      Object.defineProperty(e, 'currentTarget', {
        configurable: !0,
        get: () => n || document,
      });
    n;

  ) {
    const o = n[t]
    if (o && !n.disabled) {
      const r = n[`${t}Data`]
      if ((void 0 !== r ? o.call(n, r, e) : o.call(n, e), e.cancelBubble))
        return
    }
    n = n._$host || n.parentNode || n.host
  }
}
function xe(e, t, n, o, r) {
  for (; 'function' == typeof n; ) n = n()
  if (t === n) return n
  const i = typeof t,
    s = void 0 !== o
  if (
    ((e = (s && n[0] && n[0].parentNode) || e),
    'string' === i || 'number' === i)
  )
    if (('number' === i && (t = t.toString()), s)) {
      let r = n[0]
      r && 3 === r.nodeType ? (r.data = t) : (r = document.createTextNode(t)),
        (n = $e(e, n, o, r))
    } else
      n =
        '' !== n && 'string' == typeof n
          ? (e.firstChild.data = t)
          : (e.textContent = t)
  else if (null == t || 'boolean' === i) n = $e(e, n, o)
  else {
    if ('function' === i)
      return (
        _(() => {
          let r = t()
          for (; 'function' == typeof r; ) r = r()
          n = xe(e, r, n, o)
        }),
        () => n
      )
    if (Array.isArray(t)) {
      const i = [],
        a = n && Array.isArray(n)
      if (ke(i, t, n, r)) return _(() => (n = xe(e, i, n, o, !0))), () => n
      if (0 === i.length) {
        if (((n = $e(e, n, o)), s)) return n
      } else
        a
          ? 0 === n.length
            ? _e(e, i, o)
            : (function (e, t, n) {
                let o = n.length,
                  r = t.length,
                  i = o,
                  s = 0,
                  a = 0,
                  l = t[r - 1].nextSibling,
                  c = null
                for (; s < r || a < i; )
                  if (t[s] !== n[a]) {
                    for (; t[r - 1] === n[i - 1]; ) r--, i--
                    if (r === s) {
                      const t =
                        i < o ? (a ? n[a - 1].nextSibling : n[i - a]) : l
                      for (; a < i; ) e.insertBefore(n[a++], t)
                    } else if (i === a)
                      for (; s < r; ) (c && c.has(t[s])) || t[s].remove(), s++
                    else if (t[s] === n[i - 1] && n[a] === t[r - 1]) {
                      const o = t[--r].nextSibling
                      e.insertBefore(n[a++], t[s++].nextSibling),
                        e.insertBefore(n[--i], o),
                        (t[r] = n[i])
                    } else {
                      if (!c) {
                        c = new Map()
                        let e = a
                        for (; e < i; ) c.set(n[e], e++)
                      }
                      const o = c.get(t[s])
                      if (null != o)
                        if (a < o && o < i) {
                          let l,
                            d = s,
                            u = 1
                          for (
                            ;
                            ++d < r &&
                            d < i &&
                            null != (l = c.get(t[d])) &&
                            l === o + u;

                          )
                            u++
                          if (u > o - a) {
                            const r = t[s]
                            for (; a < o; ) e.insertBefore(n[a++], r)
                          } else e.replaceChild(n[a++], t[s++])
                        } else s++
                      else t[s++].remove()
                    }
                  } else s++, a++
              })(e, n, i)
          : (n && $e(e), _e(e, i))
      n = i
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (s) return (n = $e(e, n, o, t))
        $e(e, n, null, t)
      } else
        null != n && '' !== n && e.firstChild
          ? e.replaceChild(t, e.firstChild)
          : e.appendChild(t)
      n = t
    } else console.warn('Unrecognized value. Skipped inserting', t)
  }
  return n
}
function ke(e, t, n, o) {
  let r = !1
  for (let i = 0, s = t.length; i < s; i++) {
    let s,
      a = t[i],
      l = n && n[i]
    if (null == a || !0 === a || !1 === a);
    else if ('object' == (s = typeof a) && a.nodeType) e.push(a)
    else if (Array.isArray(a)) r = ke(e, a, l) || r
    else if ('function' === s)
      if (o) {
        for (; 'function' == typeof a; ) a = a()
        r = ke(e, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || r
      } else e.push(a), (r = !0)
    else {
      const t = String(a)
      l && 3 === l.nodeType && l.data === t
        ? e.push(l)
        : e.push(document.createTextNode(t))
    }
  }
  return r
}
function _e(e, t, n = null) {
  for (let o = 0, r = t.length; o < r; o++) e.insertBefore(t[o], n)
}
function $e(e, t, n, o) {
  if (void 0 === n) return (e.textContent = '')
  const r = o || document.createTextNode('')
  if (t.length) {
    let o = !1
    for (let i = t.length - 1; i >= 0; i--) {
      const s = t[i]
      if (r !== s) {
        const t = s.parentNode === e
        o || i
          ? t && s.remove()
          : t
          ? e.replaceChild(r, s)
          : e.insertBefore(r, n)
      } else o = !0
    }
  } else e.insertBefore(r, n)
  return [r]
}
function Te(e) {
  return (t, n) => {
    const { element: o } = n
    return x(
      (r) => {
        const i = (function (e) {
          const t = Object.keys(e),
            n = {}
          for (let o = 0; o < t.length; o++) {
            const [r, i] = k(e[t[o]])
            Object.defineProperty(n, t[o], {
              get: r,
              set(e) {
                i(() => e)
              },
            })
          }
          return n
        })(t)
        o.addPropertyChangedCallback((e, t) => (i[e] = t)),
          o.addReleaseCallback(() => {
            ;(o.renderRoot.textContent = ''), r()
          })
        const s = e(i, n)
        return me(o.renderRoot, s)
      },
      (function (e) {
        if (e.assignedSlot && e.assignedSlot._$owner)
          return e.assignedSlot._$owner
        let t = e.parentNode
        for (
          ;
          t && !t._$owner && (!t.assignedSlot || !t.assignedSlot._$owner);

        )
          t = t.parentNode
        return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner
      })(o)
    )
  }
}
function Ce(e, t, n) {
  return 2 === arguments.length && ((n = t), (t = {})), s(e, t)(Te(n))
}
const Se = {
    typebot: void 0,
    onNewInputBlock: void 0,
    onAnswer: void 0,
    onEnd: void 0,
    onInit: void 0,
    onNewLogs: void 0,
    isPreview: void 0,
    startFrom: void 0,
    prefilledVariables: void 0,
    apiHost: void 0,
    resultId: void 0,
  },
  Ee = {
    ...Se,
    onClose: void 0,
    onOpen: void 0,
    theme: void 0,
    autoShowDelay: void 0,
    isOpen: void 0,
    defaultOpen: void 0,
  },
  Ae = {
    ...Se,
    onClose: void 0,
    onOpen: void 0,
    theme: void 0,
    previewMessage: void 0,
    onPreviewMessageClick: void 0,
    autoShowDelay: void 0,
  }
var Ie =
  '/*! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-feature-settings:inherit;color:inherit;font-family:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (min-width:640px){.container{max-width:640px}}@media (min-width:768px){.container{max-width:768px}}@media (min-width:1024px){.container{max-width:1024px}}@media (min-width:1280px){.container{max-width:1280px}}@media (min-width:1536px){.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.-right-1{right:-4px}.-right-2{right:-8px}.-top-2{top:-8px}.bottom-5{bottom:20px}.left-0{left:0}.left-5{left:20px}.right-0{right:0}.right-5{right:20px}.top-0{top:0}.z-10{z-index:10}.z-20{z-index:20}.m-2{margin:8px}.m-auto{margin:auto}.mx-4{margin-left:16px;margin-right:16px}.my-2{margin-bottom:8px;margin-top:8px}.-mr-1{margin-right:-4px}.-mt-1{margin-top:-4px}.mb-3{margin-bottom:12px}.ml-2{margin-left:8px}.mt-1{margin-top:4px}.mt-4{margin-top:16px}.\\!block{display:block!important}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.h-10{height:40px}.h-2{height:8px}.h-2\\.5{height:10px}.h-3{height:12px}.h-32{height:128px}.h-4{height:16px}.h-5{height:20px}.h-6{height:24px}.h-8{height:32px}.h-9{height:36px}.h-\\[80vh\\]{height:80vh}.h-full{height:100%}.max-h-80{max-height:320px}.max-h-\\[464px\\]{max-height:464px}.min-h-full{min-height:100%}.w-10{width:40px}.w-2{width:8px}.w-3{width:12px}.w-4{width:16px}.w-5{width:20px}.w-6{width:24px}.w-8{width:32px}.w-\\[60\\%\\]{width:60%}.w-full{width:100%}.min-w-0{min-width:0}.max-w-\\[256px\\]{max-width:256px}.max-w-full{max-width:100%}.max-w-lg{max-width:512px}.max-w-xs{max-width:320px}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes ping{75%,to{opacity:0;transform:scale(2)}}.animate-ping{animation:ping 1s cubic-bezier(0,0,.2,1) infinite}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.gap-6{gap:24px}.overflow-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.text-ellipsis{text-overflow:ellipsis}.whitespace-pre-wrap{white-space:pre-wrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.rounded-md{border-radius:6px}.border{border-width:1px}.border-2{border-width:2px}.border-dashed{border-style:dashed}.border-gray-300{--tw-border-opacity:1;border-color:rgb(209 213 219/var(--tw-border-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgb(249 250 251/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-1{padding:4px}.p-2{padding:8px}.p-4{padding:16px}.px-1{padding-left:4px;padding-right:4px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-8{padding-left:32px;padding-right:32px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-4{padding-bottom:16px;padding-top:16px}.py-6{padding-bottom:24px;padding-top:24px}.pb-0{padding-bottom:0}.pl-2{padding-left:8px}.pl-4{padding-left:16px}.pr-1{padding-right:4px}.pr-2{padding-right:8px}.pr-4{padding-right:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.text-2xl{font-size:24px;line-height:32px}.text-4xl{font-size:36px;line-height:40px}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-normal{font-weight:400}.font-semibold{font-weight:600}.italic{font-style:italic}.text-gray-500{--tw-text-opacity:1;color:rgb(107 114 128/var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39/var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-md{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.brightness-150{--tw-brightness:brightness(1.5)}.brightness-150,.brightness-200{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.brightness-200{--tw-brightness:brightness(2)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-200{transition-duration:.2s}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--typebot-container-bg-image:none;--typebot-container-bg-color:transparent;--typebot-container-font-family:"Open Sans";--typebot-container-color:#303235;--typebot-button-bg-color:#0042da;--typebot-button-bg-color-rgb:0,66,218;--typebot-button-color:#fff;--typebot-checkbox-bg-color:#fff;--typebot-host-bubble-bg-color:#f7f8ff;--typebot-host-bubble-color:#303235;--typebot-guest-bubble-bg-color:#ff8e21;--typebot-guest-bubble-color:#fff;--typebot-input-bg-color:#fff;--typebot-input-color:#303235;--typebot-input-placeholder-color:#9095a0;--typebot-header-bg-color:#fff;--typebot-header-color:#303235;--selectable-base-alpha:0;--typebot-border-radius:6px;--typebot-progress-bar-position:fixed;--typebot-progress-bar-bg-color:#f7f8ff;--typebot-progress-bar-color:#0042da;--typebot-progress-bar-height:6px;--typebot-progress-bar-top:0;--typebot-progress-bar-bottom:auto;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--typebot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(2.5)}50%{transform:translateY(-2.5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}a{text-decoration:underline}ol,ul{margin-inline-end:0;margin-inline-start:0;padding-inline-start:40px}ol{list-style-type:decimal}ul{list-style-type:disc}li:not(:last-child){margin-bottom:8px}pre{word-wrap:break-word;max-height:100%;max-width:100%;overflow:auto;overflow-wrap:break-word;white-space:pre-wrap}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.text-input::placeholder{color:var(--typebot-input-placeholder-color)!important;opacity:1!important}.typebot-container{background-color:var(--typebot-container-bg-color);background-image:var(--typebot-container-bg-image);font-family:var(--typebot-container-font-family),-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"}.typebot-button{background-color:var(--typebot-button-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-button-color);transition:all .3s ease}.typebot-button.selectable{background-color:var(--typebot-host-bubble-bg-color);border:1px solid var(--typebot-button-bg-color);color:var(--typebot-host-bubble-color)}.typebot-selectable{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease}.typebot-selectable:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}.typebot-checkbox{background-color:var(--typebot-checkbox-bg-color);border:1px solid var(--typebot-button-bg-color);border-radius:var(--typebot-border-radius);border-radius:2px;color:var(--typebot-button-color);padding:1px;transition:all .3s ease}.typebot-checkbox.checked{background-color:var(--typebot-button-bg-color)}.typebot-host-bubble{color:var(--typebot-host-bubble-color)}.typebot-host-bubble>.bubble-typing{background-color:var(--typebot-host-bubble-bg-color);border:var(--typebot-host-bubble-border);border-radius:6px}.typebot-guest-bubble{background-color:var(--typebot-guest-bubble-bg-color);border-radius:6px;color:var(--typebot-guest-bubble-color)}.typebot-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1)}.typebot-input,.typebot-input-error-message{color:var(--typebot-input-color)}.typebot-button>.send-icon{fill:var(--typebot-button-color)}.typebot-chat-view{max-width:900px}.ping span{background-color:var(--typebot-button-bg-color)}.rating-icon-container svg{stroke:var(--typebot-button-bg-color);fill:var(--typebot-host-bubble-bg-color);height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:var(--typebot-button-bg-color)}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{border-radius:var(--typebot-border-radius)}.total-files-indicator,.upload-progress-bar{background-color:var(--typebot-button-bg-color)}.total-files-indicator{color:var(--typebot-button-color);font-size:10px}.typebot-upload-input{border-radius:var(--typebot-border-radius);transition:border-color .1s ease-out}.typebot-upload-input.dragging-over{border-color:var(--typebot-button-bg-color)}.secondary-button{background-color:var(--typebot-host-bubble-bg-color);border-radius:var(--typebot-border-radius);color:var(--typebot-host-bubble-color)}.typebot-country-select{color:var(--typebot-input-color)}.typebot-country-select,.typebot-date-input{background-color:var(--typebot-input-bg-color);border-radius:var(--typebot-border-radius)}.typebot-date-input{color:var(--typebot-input-color);color-scheme:light}.typebot-picture-button,.typebot-popup-blocked-toast{border-radius:var(--typebot-border-radius)}.typebot-picture-button{background-color:var(--typebot-button-bg-color);color:var(--typebot-button-color);transition:all .3s ease;width:236px}.typebot-picture-button>img,.typebot-selectable-picture>img{border-radius:var(--typebot-border-radius) var(--typebot-border-radius) 0 0;height:100%;max-height:200px;min-width:200px;-o-object-fit:cover;object-fit:cover;width:100%}.typebot-picture-button.has-svg>img,.typebot-selectable-picture.has-svg>img{max-height:128px;-o-object-fit:contain;object-fit:contain;padding:1rem}.typebot-selectable-picture{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .08));border:1px solid rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .25));border-radius:var(--typebot-border-radius);color:var(--typebot-container-color);transition:all .3s ease;width:236px}.typebot-selectable-picture:hover{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .3))}.typebot-selectable-picture.selected{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .18));border-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .35))}select option{background-color:var(--typebot-input-bg-color);color:var(--typebot-input-color)}.typebot-progress-bar-container{background-color:rgba(var(--typebot-button-bg-color-rgb),calc(var(--selectable-base-alpha) + .12));bottom:var(--typebot-progress-bar-bottom);height:var(--typebot-progress-bar-height);left:0;position:var(--typebot-progress-bar-position);top:var(--typebot-progress-bar-top);width:100%;z-index:42424242}.typebot-progress-bar-container>.typebot-progress-bar{background-color:var(--typebot-progress-bar-color);height:100%;position:absolute;transition:width .25s ease}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9)}.hover\\:brightness-90:hover,.hover\\:brightness-95:hover{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.hover\\:brightness-95:hover{--tw-brightness:brightness(.95)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75)}.active\\:brightness-75:active,.active\\:brightness-90:active{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.active\\:brightness-90:active{--tw-brightness:brightness(.9)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:p-0{padding:0}}'
let Pe = (function (e) {
  return (
    (e.TEXT = 'text'),
    (e.IMAGE = 'image'),
    (e.VIDEO = 'video'),
    (e.EMBED = 'embed'),
    (e.AUDIO = 'audio'),
    e
  )
})({})
const Re = 'Send'
let Le = (function (e) {
  return (
    (e.TEXT = 'text input'),
    (e.NUMBER = 'number input'),
    (e.EMAIL = 'email input'),
    (e.URL = 'url input'),
    (e.DATE = 'date input'),
    (e.PHONE = 'phone number input'),
    (e.CHOICE = 'choice input'),
    (e.PICTURE_CHOICE = 'picture choice input'),
    (e.PAYMENT = 'payment input'),
    (e.RATING = 'rating input'),
    (e.FILE = 'file input'),
    e
  )
})({})
const Me = Re,
  Ne = 'Filter the options...',
  Oe = async (e) => {
    let t
    try {
      const n = 'string' == typeof e ? e : e.url
      t = await fetch(n, {
        method: 'string' == typeof e ? 'GET' : e.method,
        mode: 'cors',
        headers:
          'string' != typeof e && Be(e.body)
            ? { 'Content-Type': 'application/json' }
            : void 0,
        body:
          'string' != typeof e && Be(e.body) ? JSON.stringify(e.body) : void 0,
      })
      const o = await t.json()
      if (!t.ok) throw 'error' in o ? o.error : o
      return { data: o, response: t }
    } catch (e) {
      return console.error(e), { error: e, response: t }
    }
  },
  Be = (e) => null != e,
  ze = (e) => null == e,
  De = (e) => null == e || '' === e,
  je = (e) => null != e && '' !== e,
  Fe = (e) => e?.startsWith('data:image/svg') || e?.endsWith('.svg'),
  Ue = (e) => {
    e = e.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (e, t, n, o) => t + t + n + n + o + o
    )
    const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
    return t
      ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
      : [0, 0, 0]
  },
  He = (e) => (([e, t, n]) => (299 * e + 587 * t + 114 * n) / 1e3 > 155)(Ue(e))
function qe(e) {
  var t,
    n,
    o = ''
  if ('string' == typeof e || 'number' == typeof e) o += e
  else if ('object' == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = qe(e[t])) && (o && (o += ' '), (o += n))
    else for (t in e) e[t] && (o && (o += ' '), (o += t))
  return o
}
function Ge() {
  for (var e, t, n = 0, o = ''; n < arguments.length; )
    (e = arguments[n++]) && (t = qe(e)) && (o && (o += ' '), (o += t))
  return o
}
const Ve = ue(
    '<svg part="button-icon" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'
  ),
  We = ue('<img part="button-icon" alt="Bubble button icon">'),
  Ke = ue('<span part="button-icon">'),
  Ye = ue(
    '<svg part="button-icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'
  ),
  Ze = ue('<img part="button-icon" alt="Bubble button close icon">'),
  Xe = ue('<button part="button" aria-label="Open chatbot">'),
  Je = '#0042DA',
  Qe = '#27272A',
  et = '#fff',
  tt = (e) => e.startsWith('http') || e.startsWith('data:image/svg+xml'),
  nt = (e) =>
    (() => {
      const t = Xe()
      return (
        (t.$$click = () => e.toggleBot()),
        t.style.setProperty('z-index', '42424242'),
        me(
          t,
          G(te, {
            get when() {
              return ze(e.customIconSrc)
            },
            keyed: !0,
            get children() {
              const t = Ve()
              return (
                _(
                  (n) => {
                    const o =
                        e.iconColor ?? (He(e.backgroundColor ?? Je) ? Qe : et),
                      r = Ge(
                        'stroke-2 fill-transparent absolute duration-200 transition w-[60%]',
                        e.isBotOpened
                          ? 'scale-0 opacity-0'
                          : 'scale-100 opacity-100'
                      )
                    return (
                      o !== n._v$ &&
                        (null != (n._v$ = o)
                          ? t.style.setProperty('stroke', o)
                          : t.style.removeProperty('stroke')),
                      r !== n._v$2 && he(t, 'class', (n._v$2 = r)),
                      n
                    )
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          t,
          G(te, {
            get when() {
              return T(() => !!e.customIconSrc)() && tt(e.customIconSrc)
            },
            get children() {
              const t = We()
              return (
                _(
                  (n) => {
                    const o = e.customIconSrc,
                      r = Ge(
                        'duration-200 transition',
                        e.isBotOpened
                          ? 'scale-0 opacity-0'
                          : 'scale-100 opacity-100',
                        Fe(e.customIconSrc) ? 'w-[60%]' : 'w-full h-full',
                        Fe(e.customIconSrc) ? '' : 'object-cover rounded-full'
                      )
                    return (
                      o !== n._v$3 && he(t, 'src', (n._v$3 = o)),
                      r !== n._v$4 && ge(t, (n._v$4 = r)),
                      n
                    )
                  },
                  { _v$3: void 0, _v$4: void 0 }
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          t,
          G(te, {
            get when() {
              return T(() => !!e.customIconSrc)() && !tt(e.customIconSrc)
            },
            get children() {
              const t = Ke()
              return (
                t.style.setProperty(
                  'font-family',
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                ),
                me(t, () => e.customIconSrc),
                _(() =>
                  ge(
                    t,
                    Ge(
                      'text-4xl duration-200 transition',
                      e.isBotOpened
                        ? 'scale-0 opacity-0'
                        : 'scale-100 opacity-100'
                    )
                  )
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          t,
          G(te, {
            get when() {
              return ze(e.customCloseIconSrc)
            },
            get children() {
              const t = Ye()
              return (
                _(
                  (n) => {
                    const o =
                        e.iconColor ?? (He(e.backgroundColor ?? Je) ? Qe : et),
                      r = Ge(
                        'absolute duration-200 transition w-[60%]',
                        e.isBotOpened
                          ? 'scale-100 rotate-0 opacity-100'
                          : 'scale-0 -rotate-180 opacity-0'
                      )
                    return (
                      o !== n._v$5 &&
                        (null != (n._v$5 = o)
                          ? t.style.setProperty('fill', o)
                          : t.style.removeProperty('fill')),
                      r !== n._v$6 && he(t, 'class', (n._v$6 = r)),
                      n
                    )
                  },
                  { _v$5: void 0, _v$6: void 0 }
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          t,
          G(te, {
            get when() {
              return (
                T(() => !!e.customCloseIconSrc)() && tt(e.customCloseIconSrc)
              )
            },
            get children() {
              const t = Ze()
              return (
                _(
                  (n) => {
                    const o = e.customCloseIconSrc,
                      r = Ge(
                        'absolute duration-200 transition',
                        e.isBotOpened
                          ? 'scale-100 rotate-0 opacity-100'
                          : 'scale-0 -rotate-180 opacity-0',
                        Fe(e.customCloseIconSrc) ? 'w-[60%]' : 'w-full h-full',
                        Fe(e.customCloseIconSrc)
                          ? ''
                          : 'object-cover rounded-full'
                      )
                    return (
                      o !== n._v$7 && he(t, 'src', (n._v$7 = o)),
                      r !== n._v$8 && ge(t, (n._v$8 = r)),
                      n
                    )
                  },
                  { _v$7: void 0, _v$8: void 0 }
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          t,
          G(te, {
            get when() {
              return (
                T(() => !!e.customCloseIconSrc)() && !tt(e.customCloseIconSrc)
              )
            },
            get children() {
              const t = Ke()
              return (
                t.style.setProperty(
                  'font-family',
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                ),
                me(t, () => e.customCloseIconSrc),
                _(() =>
                  ge(
                    t,
                    Ge(
                      'absolute text-4xl duration-200 transition',
                      e.isBotOpened
                        ? 'scale-100 rotate-0 opacity-100'
                        : 'scale-0 -rotate-180 opacity-0'
                    )
                  )
                ),
                t
              )
            },
          }),
          null
        ),
        _(
          (n) => {
            const o = Ge(
                'fixed bottom-5 shadow-md  rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in',
                'left' === e.placement ? ' left-5' : ' right-5'
              ),
              r = e.backgroundColor ?? Je,
              i = e.buttonSize,
              s = e.buttonSize
            return (
              o !== n._v$9 && ge(t, (n._v$9 = o)),
              r !== n._v$10 &&
                (null != (n._v$10 = r)
                  ? t.style.setProperty('background-color', r)
                  : t.style.removeProperty('background-color')),
              i !== n._v$11 &&
                (null != (n._v$11 = i)
                  ? t.style.setProperty('width', i)
                  : t.style.removeProperty('width')),
              s !== n._v$12 &&
                (null != (n._v$12 = s)
                  ? t.style.setProperty('height', s)
                  : t.style.removeProperty('height')),
              n
            )
          },
          { _v$9: void 0, _v$10: void 0, _v$11: void 0, _v$12: void 0 }
        ),
        t
      )
    })()
pe(['click'])
const ot = ue('<div part="preview-message"><p>'),
  rt = ue(
    '<img class="rounded-full w-8 h-8 object-cover" alt="Bot avatar" elementtiming="Bot avatar" fetchpriority="high">'
  ),
  it = ue(
    '<button part="preview-message-close-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">'
  ),
  st = '#F7F8FF',
  at = '#303235',
  lt = (e) => {
    const [t, n] = k(!1)
    return (() => {
      const o = ot(),
        r = o.firstChild
      return (
        o.addEventListener('mouseleave', () => n(!1)),
        o.addEventListener('mouseenter', () => n(!0)),
        (o.$$click = () => e.onClick()),
        o.style.setProperty('z-index', '42424242'),
        me(
          o,
          G(ct, {
            get isHovered() {
              return t()
            },
            get previewMessageTheme() {
              return e.previewMessageTheme
            },
            get onClick() {
              return e.onCloseClick
            },
          }),
          r
        ),
        me(
          o,
          G(te, {
            get when() {
              return e.avatarUrl
            },
            keyed: !0,
            children: (e) =>
              (() => {
                const t = rt()
                return he(t, 'src', e), t
              })(),
          }),
          r
        ),
        me(r, () => e.message),
        _(
          (t) => {
            const n =
                'fixed max-w-[256px] rounded-md duration-200 flex items-center gap-4 shadow-md animate-fade-in cursor-pointer hover:shadow-lg p-4' +
                ('left' === e.placement ? ' left-5' : ' right-5'),
              r = e.previewMessageTheme?.backgroundColor ?? st,
              i = e.previewMessageTheme?.textColor ?? at,
              s = `calc(${e.buttonSize} + 32px)`
            return (
              n !== t._v$ && ge(o, (t._v$ = n)),
              r !== t._v$2 &&
                (null != (t._v$2 = r)
                  ? o.style.setProperty('background-color', r)
                  : o.style.removeProperty('background-color')),
              i !== t._v$3 &&
                (null != (t._v$3 = i)
                  ? o.style.setProperty('color', i)
                  : o.style.removeProperty('color')),
              s !== t._v$4 &&
                (null != (t._v$4 = s)
                  ? o.style.setProperty('bottom', s)
                  : o.style.removeProperty('bottom')),
              t
            )
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        o
      )
    })()
  },
  ct = (e) =>
    (() => {
      const t = it()
      return (
        (t.$$click = (t) => (t.stopPropagation(), e.onClick())),
        _(
          (n) => {
            const o =
                'absolute -top-2 -right-2 rounded-full w-6 h-6 p-1 hover:brightness-95 active:brightness-90 transition-all border ' +
                (e.isHovered ? 'opacity-100' : 'opacity-0'),
              r = e.previewMessageTheme?.closeButtonBackgroundColor ?? st,
              i = e.previewMessageTheme?.closeButtonIconColor ?? at
            return (
              o !== n._v$5 && ge(t, (n._v$5 = o)),
              r !== n._v$6 &&
                (null != (n._v$6 = r)
                  ? t.style.setProperty('background-color', r)
                  : t.style.removeProperty('background-color')),
              i !== n._v$7 &&
                (null != (n._v$7 = i)
                  ? t.style.setProperty('color', i)
                  : t.style.removeProperty('color')),
              n
            )
          },
          { _v$5: void 0, _v$6: void 0, _v$7: void 0 }
        ),
        t
      )
    })()
pe(['click'])
const dt = ue(
    '<svg viewBox="0 0 800 800" width="16"><rect width="800" height="800" rx="80" fill="#0042DA"></rect><rect x="650" y="293" width="85.4704" height="384.617" rx="20" transform="rotate(90 650 293)" fill="#FF8E20"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M192.735 378.47C216.337 378.47 235.47 359.337 235.47 335.735C235.47 312.133 216.337 293 192.735 293C169.133 293 150 312.133 150 335.735C150 359.337 169.133 378.47 192.735 378.47Z" fill="#FF8E20"></path><rect x="150" y="506.677" width="85.4704" height="384.617" rx="20" transform="rotate(-90 150 506.677)" fill="white"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M607.265 421.206C583.663 421.206 564.53 440.34 564.53 463.942C564.53 487.544 583.663 506.677 607.265 506.677C630.867 506.677 650 487.544 650 463.942C650 440.34 630.867 421.206 607.265 421.206Z" fill="white">'
  ),
  ut = () => dt(),
  pt = ue(
    '<a href="https://envichat.envidoxsolutions.com/" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span>Made with Envichat'
  ),
  ht = (e) => {
    let t, n
    const o = (n) => {
      n.forEach((n) => {
        n.removedNodes.forEach((n) => {
          'id' in n &&
            t &&
            'lite-badge' == n.id &&
            (console.log("Sorry, you can't remove the brand 😅"),
            e.botContainer?.append(t))
        })
      })
    }
    return (
      S(() => {
        document &&
          e.botContainer &&
          ((n = new MutationObserver(o)),
          n.observe(e.botContainer, { subtree: !1, childList: !0 }))
      }),
      E(() => {
        n && n.disconnect()
      }),
      (() => {
        const e = pt(),
          n = e.firstChild
        return (
          'function' == typeof t ? be(t, e) : (t = e), me(e, G(ut, {}), n), e
        )
      })()
    )
  },
  gt = (e, t) =>
    'undefined' != typeof window
      ? window.__ENV
        ? window.__ENV[e] ?? t
        : void 0
      : 'undefined' != typeof process
      ? process.env[e] ?? t
      : void 0,
  ft = () =>
    gt('NEXT_PUBLIC_VIEWER_URL')?.split(',')[0] ?? 'https://typebot.io',
  bt = () => sessionStorage.getItem('typebotPaymentInProgress'),
  mt = () => {
    sessionStorage.removeItem('typebotPaymentInProgress')
  }
class yt extends Error {
  constructor(e, t, n) {
    const o = `${e.status || 0 === e.status ? e.status : ''} ${
      e.statusText || ''
    }`.trim()
    super(`Request failed with ${o ? `status code ${o}` : 'an unknown error'}`),
      Object.defineProperty(this, 'response', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, 'request', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, 'options', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.name = 'HTTPError'),
      (this.response = e),
      (this.request = t),
      (this.options = n)
  }
}
class vt extends Error {
  constructor(e) {
    super('Request timed out'),
      Object.defineProperty(this, 'request', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.name = 'TimeoutError'),
      (this.request = e)
  }
}
const wt = (e) => null !== e && 'object' == typeof e,
  xt = (...e) => {
    for (const t of e)
      if ((!wt(t) || Array.isArray(t)) && void 0 !== t)
        throw new TypeError('The `options` argument must be an object')
    return _t({}, ...e)
  },
  kt = (e = {}, t = {}) => {
    const n = new globalThis.Headers(e),
      o = t instanceof globalThis.Headers,
      r = new globalThis.Headers(t)
    for (const [e, t] of r.entries())
      (o && 'undefined' === t) || void 0 === t ? n.delete(e) : n.set(e, t)
    return n
  },
  _t = (...e) => {
    let t = {},
      n = {}
    for (const o of e)
      if (Array.isArray(o)) Array.isArray(t) || (t = []), (t = [...t, ...o])
      else if (wt(o)) {
        for (let [e, n] of Object.entries(o))
          wt(n) && e in t && (n = _t(t[e], n)), (t = { ...t, [e]: n })
        wt(o.headers) && ((n = kt(n, o.headers)), (t.headers = n))
      }
    return t
  },
  $t = (() => {
    let e = !1,
      t = !1
    const n = 'function' == typeof globalThis.ReadableStream,
      o = 'function' == typeof globalThis.Request
    return (
      n &&
        o &&
        (t = new globalThis.Request('https://empty.invalid', {
          body: new globalThis.ReadableStream(),
          method: 'POST',
          get duplex() {
            return (e = !0), 'half'
          },
        }).headers.has('Content-Type')),
      e && !t
    )
  })(),
  Tt = 'function' == typeof globalThis.AbortController,
  Ct = 'function' == typeof globalThis.ReadableStream,
  St = 'function' == typeof globalThis.FormData,
  Et = ['get', 'post', 'put', 'patch', 'head', 'delete'],
  At = {
    json: 'application/json',
    text: 'text/*',
    formData: 'multipart/form-data',
    arrayBuffer: '*/*',
    blob: '*/*',
  },
  It = 2147483647,
  Pt = Symbol('stop'),
  Rt = {
    json: !0,
    parseJson: !0,
    searchParams: !0,
    prefixUrl: !0,
    retry: !0,
    timeout: !0,
    hooks: !0,
    throwHttpErrors: !0,
    onDownloadProgress: !0,
    fetch: !0,
  },
  Lt = {
    method: !0,
    headers: !0,
    body: !0,
    mode: !0,
    credentials: !0,
    cache: !0,
    redirect: !0,
    referrer: !0,
    referrerPolicy: !0,
    integrity: !0,
    keepalive: !0,
    signal: !0,
    window: !0,
    dispatcher: !0,
    duplex: !0,
  },
  Mt = (e) => (Et.includes(e) ? e.toUpperCase() : e),
  Nt = [413, 429, 503],
  Ot = {
    limit: 2,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    afterStatusCodes: Nt,
    maxRetryAfter: Number.POSITIVE_INFINITY,
    backoffLimit: Number.POSITIVE_INFINITY,
    delay: (e) => 0.3 * 2 ** (e - 1) * 1e3,
  },
  Bt = (e = {}) => {
    if ('number' == typeof e) return { ...Ot, limit: e }
    if (e.methods && !Array.isArray(e.methods))
      throw new Error('retry.methods must be an array')
    if (e.statusCodes && !Array.isArray(e.statusCodes))
      throw new Error('retry.statusCodes must be an array')
    return { ...Ot, ...e, afterStatusCodes: Nt }
  }
class zt {
  static create(e, t) {
    const n = new zt(e, t),
      o = async () => {
        if ('number' == typeof n._options.timeout && n._options.timeout > It)
          throw new RangeError(
            'The `timeout` option cannot be greater than 2147483647'
          )
        await Promise.resolve()
        let e = await n._fetch()
        for (const t of n._options.hooks.afterResponse) {
          const o = await t(
            n.request,
            n._options,
            n._decorateResponse(e.clone())
          )
          o instanceof globalThis.Response && (e = o)
        }
        if ((n._decorateResponse(e), !e.ok && n._options.throwHttpErrors)) {
          let t = new yt(e, n.request, n._options)
          for (const e of n._options.hooks.beforeError) t = await e(t)
          throw t
        }
        if (n._options.onDownloadProgress) {
          if ('function' != typeof n._options.onDownloadProgress)
            throw new TypeError(
              'The `onDownloadProgress` option must be a function'
            )
          if (!Ct)
            throw new Error(
              'Streams are not supported in your environment. `ReadableStream` is missing.'
            )
          return n._stream(e.clone(), n._options.onDownloadProgress)
        }
        return e
      },
      r = n._options.retry.methods.includes(n.request.method.toLowerCase())
        ? n._retry(o)
        : o()
    for (const [e, o] of Object.entries(At))
      r[e] = async () => {
        n.request.headers.set('accept', n.request.headers.get('accept') || o)
        const i = (await r).clone()
        if ('json' === e) {
          if (204 === i.status) return ''
          if (0 === (await i.clone().arrayBuffer()).byteLength) return ''
          if (t.parseJson) return t.parseJson(await i.text())
        }
        return i[e]()
      }
    return r
  }
  constructor(e, t = {}) {
    if (
      (Object.defineProperty(this, 'request', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, 'abortController', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, '_retryCount', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0,
      }),
      Object.defineProperty(this, '_input', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, '_options', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this._input = e),
      (this._options = {
        credentials: this._input.credentials || 'same-origin',
        ...t,
        headers: kt(this._input.headers, t.headers),
        hooks: _t(
          {
            beforeRequest: [],
            beforeRetry: [],
            beforeError: [],
            afterResponse: [],
          },
          t.hooks
        ),
        method: Mt(t.method ?? this._input.method),
        prefixUrl: String(t.prefixUrl || ''),
        retry: Bt(t.retry),
        throwHttpErrors: !1 !== t.throwHttpErrors,
        timeout: t.timeout ?? 1e4,
        fetch: t.fetch ?? globalThis.fetch.bind(globalThis),
      }),
      'string' != typeof this._input &&
        !(
          this._input instanceof URL ||
          this._input instanceof globalThis.Request
        ))
    )
      throw new TypeError('`input` must be a string, URL, or Request')
    if (this._options.prefixUrl && 'string' == typeof this._input) {
      if (this._input.startsWith('/'))
        throw new Error(
          '`input` must not begin with a slash when using `prefixUrl`'
        )
      this._options.prefixUrl.endsWith('/') || (this._options.prefixUrl += '/'),
        (this._input = this._options.prefixUrl + this._input)
    }
    if (Tt) {
      if (
        ((this.abortController = new globalThis.AbortController()),
        this._options.signal)
      ) {
        const e = this._options.signal
        this._options.signal.addEventListener('abort', () => {
          this.abortController.abort(e.reason)
        })
      }
      this._options.signal = this.abortController.signal
    }
    if (
      ($t && (this._options.duplex = 'half'),
      (this.request = new globalThis.Request(this._input, this._options)),
      this._options.searchParams)
    ) {
      const e =
          '?' +
          ('string' == typeof this._options.searchParams
            ? this._options.searchParams.replace(/^\?/, '')
            : new URLSearchParams(this._options.searchParams).toString()),
        t = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, e)
      !(
        (St && this._options.body instanceof globalThis.FormData) ||
        this._options.body instanceof URLSearchParams
      ) ||
        (this._options.headers && this._options.headers['content-type']) ||
        this.request.headers.delete('content-type'),
        (this.request = new globalThis.Request(
          new globalThis.Request(t, { ...this.request }),
          this._options
        ))
    }
    void 0 !== this._options.json &&
      ((this._options.body = JSON.stringify(this._options.json)),
      this.request.headers.set(
        'content-type',
        this._options.headers.get('content-type') ?? 'application/json'
      ),
      (this.request = new globalThis.Request(this.request, {
        body: this._options.body,
      })))
  }
  _calculateRetryDelay(e) {
    if (
      (this._retryCount++,
      this._retryCount < this._options.retry.limit && !(e instanceof vt))
    ) {
      if (e instanceof yt) {
        if (!this._options.retry.statusCodes.includes(e.response.status))
          return 0
        const t = e.response.headers.get('Retry-After')
        if (
          t &&
          this._options.retry.afterStatusCodes.includes(e.response.status)
        ) {
          let e = Number(t)
          return (
            Number.isNaN(e) ? (e = Date.parse(t) - Date.now()) : (e *= 1e3),
            void 0 !== this._options.retry.maxRetryAfter &&
            e > this._options.retry.maxRetryAfter
              ? 0
              : e
          )
        }
        if (413 === e.response.status) return 0
      }
      const t = this._options.retry.delay(this._retryCount)
      return Math.min(this._options.retry.backoffLimit, t)
    }
    return 0
  }
  _decorateResponse(e) {
    return (
      this._options.parseJson &&
        (e.json = async () => this._options.parseJson(await e.text())),
      e
    )
  }
  async _retry(e) {
    try {
      return await e()
    } catch (t) {
      const n = Math.min(this._calculateRetryDelay(t), It)
      if (0 !== n && this._retryCount > 0) {
        await (async function (e, { signal: t }) {
          return new Promise((n, o) => {
            function r() {
              clearTimeout(i), o(t.reason)
            }
            t &&
              (t.throwIfAborted(), t.addEventListener('abort', r, { once: !0 }))
            const i = setTimeout(() => {
              t?.removeEventListener('abort', r), n()
            }, e)
          })
        })(n, { signal: this._options.signal })
        for (const e of this._options.hooks.beforeRetry) {
          if (
            (await e({
              request: this.request,
              options: this._options,
              error: t,
              retryCount: this._retryCount,
            })) === Pt
          )
            return
        }
        return this._retry(e)
      }
      throw t
    }
  }
  async _fetch() {
    for (const e of this._options.hooks.beforeRequest) {
      const t = await e(this.request, this._options)
      if (t instanceof Request) {
        this.request = t
        break
      }
      if (t instanceof Response) return t
    }
    const e = ((e, t) => {
      const n = {}
      for (const o in t) o in Lt || o in Rt || o in e || (n[o] = t[o])
      return n
    })(this.request, this._options)
    return !1 === this._options.timeout
      ? this._options.fetch(this.request.clone(), e)
      : (async function (e, t, n, o) {
          return new Promise((r, i) => {
            const s = setTimeout(() => {
              n && n.abort(), i(new vt(e))
            }, o.timeout)
            o.fetch(e, t)
              .then(r)
              .catch(i)
              .then(() => {
                clearTimeout(s)
              })
          })
        })(this.request.clone(), e, this.abortController, this._options)
  }
  _stream(e, t) {
    const n = Number(e.headers.get('content-length')) || 0
    let o = 0
    return 204 === e.status
      ? (t &&
          t(
            { percent: 1, totalBytes: n, transferredBytes: o },
            new Uint8Array()
          ),
        new globalThis.Response(null, {
          status: e.status,
          statusText: e.statusText,
          headers: e.headers,
        }))
      : new globalThis.Response(
          new globalThis.ReadableStream({
            async start(r) {
              const i = e.body.getReader()
              t &&
                t(
                  { percent: 0, transferredBytes: 0, totalBytes: n },
                  new Uint8Array()
                ),
                await (async function e() {
                  const { done: s, value: a } = await i.read()
                  if (s) r.close()
                  else {
                    if (t) {
                      o += a.byteLength
                      t(
                        {
                          percent: 0 === n ? 0 : o / n,
                          transferredBytes: o,
                          totalBytes: n,
                        },
                        a
                      )
                    }
                    r.enqueue(a), await e()
                  }
                })()
            },
          }),
          { status: e.status, statusText: e.statusText, headers: e.headers }
        )
  }
}
const Dt = (e) => {
  const t = (t, n) => zt.create(t, xt(e, n))
  for (const n of Et) t[n] = (t, o) => zt.create(t, xt(e, o, { method: n }))
  return (
    (t.create = (e) => Dt(xt(e))),
    (t.extend = (t) => Dt(xt(e, t))),
    (t.stop = Pt),
    t
  )
}
var jt = Dt()
const [Ft, Ut] = k(),
  Ht = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px" color="white"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'
  ),
  qt = (e) =>
    (() => {
      const t = Ht()
      return fe(t, e, !0, !0), t
    })(),
  Gt = ue(
    '<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'
  ),
  Vt = (e) =>
    (() => {
      const t = Gt()
      return (
        fe(
          t,
          Z(e, {
            get class() {
              return 'animate-spin h-6 w-6 ' + e.class
            },
            xmlns: 'http://www.w3.org/2000/svg',
            fill: 'none',
            viewBox: '0 0 24 24',
            'data-testid': 'loading-spinner',
          }),
          !0,
          !0
        ),
        t
      )
    })(),
  Wt = ue('<button>'),
  Kt = (e) => {
    const t = A(() => e.children),
      [n, o] = X(e, ['disabled', 'class'])
    return (() => {
      const r = Wt()
      return (
        fe(
          r,
          Z(o, {
            get disabled() {
              return e.isDisabled || e.isLoading
            },
            get class() {
              return (
                'py-2 px-4 font-semibold focus:outline-none filter hover:brightness-90 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 flex justify-center' +
                ('secondary' === e.variant
                  ? ' secondary-button'
                  : ' typebot-button') +
                ' ' +
                n.class
              )
            },
          }),
          !1,
          !0
        ),
        me(
          r,
          G(te, {
            get when() {
              return !e.isLoading
            },
            get fallback() {
              return G(Vt, {})
            },
            get children() {
              return t()
            },
          })
        ),
        r
      )
    })()
  },
  Yt = (e) => {
    const [t, n] = X(e, ['disableIcon'])
    return G(
      Kt,
      Z({ type: 'submit' }, n, {
        get children() {
          return T(
            () =>
              !!(
                (Ft() && !t.disableIcon) ||
                ('string' == typeof e.children && De(e.children))
              )
          )()
            ? G(qt, {
                get class() {
                  return 'send-icon flex ' + (t.disableIcon ? 'hidden' : '')
                },
              })
            : e.children
        },
      })
    )
  },
  Zt = ue(
    '<div class="flex items-center gap-1"><div class="w-2 h-2 rounded-full bubble1"></div><div class="w-2 h-2 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'
  ),
  Xt = () => Zt(),
  Jt = ue(
    '<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'
  ),
  Qt = (e) => {
    const [t, n] = X(e, ['ref', 'onInput'])
    return (() => {
      const o = Jt()
      o.$$input = (e) => t.onInput(e.currentTarget.value)
      const r = e.ref
      return (
        'function' == typeof r ? be(r, o) : (e.ref = o),
        o.style.setProperty('font-size', '16px'),
        fe(o, n, !1, !1),
        o
      )
    })()
  }
pe(['input'])
const en = ue(
    '<textarea class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" rows="6" data-testid="textarea" required>'
  ),
  tn = (e) => {
    const [t, n] = X(e, ['ref', 'onInput'])
    return (() => {
      const e = en()
      e.$$input = (e) => t.onInput(e.currentTarget.value)
      const o = t.ref
      return (
        'function' == typeof o ? be(o, e) : (t.ref = e),
        e.style.setProperty('font-size', '16px'),
        fe(
          e,
          Z(
            {
              get autofocus() {
                return !Ft()
              },
            },
            n
          ),
          !1,
          !1
        ),
        e
      )
    })()
  }
pe(['input'])
const nn = !0,
  on = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><audio controls>'
  )
let rn
const sn = (e) => {
    let t,
      n,
      o = !1
    const [r, i] = k(!0)
    return (
      S(() => {
        rn = setTimeout(() => {
          o ||
            ((o = !0),
            i(!1),
            setTimeout(() => e.onTransitionEnd(t?.offsetTop), 400))
        }, 100)
      }),
      E(() => {
        rn && clearTimeout(rn)
      }),
      (() => {
        const o = on(),
          i = o.firstChild.firstChild.firstChild,
          s = i.nextSibling
        'function' == typeof t ? be(t, o) : (t = o),
          me(
            i,
            (() => {
              const e = T(() => !!r())
              return () => e() && G(Xt, {})
            })()
          )
        return (
          'function' == typeof n ? be(n, s) : (n = s),
          _(
            (t) => {
              const n = r() ? '64px' : '100%',
                o = r() ? '32px' : '100%',
                a = e.content?.url,
                l = e.content?.isAutoplayEnabled ?? nn,
                c =
                  'z-10 text-fade-in ' +
                  (r() ? 'opacity-0' : 'opacity-100 m-2'),
                d = r() ? (Ft() ? '32px' : '36px') : 'revert'
              return (
                n !== t._v$ &&
                  (null != (t._v$ = n)
                    ? i.style.setProperty('width', n)
                    : i.style.removeProperty('width')),
                o !== t._v$2 &&
                  (null != (t._v$2 = o)
                    ? i.style.setProperty('height', o)
                    : i.style.removeProperty('height')),
                a !== t._v$3 && he(s, 'src', (t._v$3 = a)),
                l !== t._v$4 && (s.autoplay = t._v$4 = l),
                c !== t._v$5 && ge(s, (t._v$5 = c)),
                d !== t._v$6 &&
                  (null != (t._v$6 = d)
                    ? s.style.setProperty('height', d)
                    : s.style.removeProperty('height')),
                t
              )
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
              _v$6: void 0,
            }
          ),
          o
        )
      })()
    )
  },
  an = 400,
  ln = ue(
    '<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><div><iframe id="embed-bubble-content" class="w-full h-full ">'
  )
let cn
const dn = (e) => {
    let t
    const [n, o] = k(!0)
    return (
      S(() => {
        cn = setTimeout(() => {
          o(!1),
            setTimeout(() => {
              e.onTransitionEnd(t?.offsetTop)
            }, 400)
        }, 2e3)
      }),
      E(() => {
        cn && clearTimeout(cn)
      }),
      (() => {
        const o = ln(),
          r = o.firstChild.firstChild.firstChild,
          i = r.nextSibling,
          s = i.firstChild
        return (
          'function' == typeof t ? be(t, o) : (t = o),
          me(
            r,
            (() => {
              const e = T(() => !!n())
              return () => e() && G(Xt, {})
            })()
          ),
          _(
            (t) => {
              const o = n() ? '64px' : '100%',
                a = n() ? '32px' : '100%',
                l = Ge(
                  'p-4 z-20 text-fade-in w-full',
                  n() ? 'opacity-0' : 'opacity-100 p-4'
                ),
                c = n()
                  ? Ft()
                    ? '32px'
                    : '36px'
                  : `${e.content?.height ?? an}px`,
                d = e.content?.url
              return (
                o !== t._v$ &&
                  (null != (t._v$ = o)
                    ? r.style.setProperty('width', o)
                    : r.style.removeProperty('width')),
                a !== t._v$2 &&
                  (null != (t._v$2 = a)
                    ? r.style.setProperty('height', a)
                    : r.style.removeProperty('height')),
                l !== t._v$3 && ge(i, (t._v$3 = l)),
                c !== t._v$4 &&
                  (null != (t._v$4 = c)
                    ? i.style.setProperty('height', c)
                    : i.style.removeProperty('height')),
                d !== t._v$5 && he(s, 'src', (t._v$5 = d)),
                t
              )
            },
            {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
            }
          ),
          o
        )
      })()
    )
  },
  un = Object.getPrototypeOf(async function () {}).constructor,
  pn = async ({ content: e, args: t }) => {
    try {
      const n = un(...t.map((e) => e.id), hn(e))
      await n(...t.map((e) => e.value))
    } catch (e) {
      console.warn('Script threw an error:', e)
    }
  },
  hn = (e) => e.replace(/<script>/g, '').replace(/<\/script>/g, ''),
  gn = async ({ args: e, content: t }) => {
    try {
      const n = un(...Object.keys(e), t)
      await n(...Object.keys(e).map((t) => e[t]))
    } catch (e) {
      console.warn('Script threw an error:', e)
    }
  },
  fn = ue(
    '<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 "></div><div><div class="w-full h-full overflow-scroll">'
  )
let bn
const mn = (e) => {
    let t
    const [n, o] = k(!0)
    let r
    return (
      S(() => {
        gn({
          args: { ...e.content.initFunction.args, typebotElement: r },
          content: e.content.initFunction.content,
        }),
          e.content.waitForEventFunction &&
            gn({
              args: {
                ...e.content.waitForEventFunction.args,
                continueFlow: e.onCompleted,
              },
              content: e.content.waitForEventFunction.content,
            }),
          (bn = setTimeout(() => {
            o(!1), setTimeout(() => e.onTransitionEnd(t?.offsetTop), 400)
          }, 2e3))
      }),
      E(() => {
        bn && clearTimeout(bn)
      }),
      (() => {
        const e = fn(),
          o = e.firstChild.firstChild.firstChild,
          i = o.nextSibling,
          s = i.firstChild
        'function' == typeof t ? be(t, e) : (t = e),
          me(
            o,
            (() => {
              const e = T(() => !!n())
              return () => e() && G(Xt, {})
            })()
          )
        return (
          'function' == typeof r ? be(r, s) : (r = s),
          _(
            (e) => {
              const t = n() ? '64px' : '100%',
                r = n() ? '32px' : '100%',
                s = Ge(
                  'p-2 z-20 text-fade-in w-full',
                  n() ? 'opacity-0' : 'opacity-100'
                ),
                a = n() ? (Ft() ? '32px' : '36px') : void 0
              return (
                t !== e._v$ &&
                  (null != (e._v$ = t)
                    ? o.style.setProperty('width', t)
                    : o.style.removeProperty('width')),
                r !== e._v$2 &&
                  (null != (e._v$2 = r)
                    ? o.style.setProperty('height', r)
                    : o.style.removeProperty('height')),
                s !== e._v$3 && ge(i, (e._v$3 = s)),
                a !== e._v$4 &&
                  (null != (e._v$4 = a)
                    ? i.style.setProperty('height', a)
                    : i.style.removeProperty('height')),
                e
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
          ),
          e
        )
      })()
    )
  },
  yn = { alt: 'Bubble image' },
  vn = ue('<img elementtiming="Bubble image" fetchpriority="high">'),
  wn = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">'
  ),
  xn = ue('<a target="_blank">'),
  kn = ue('<figure>')
let _n
const $n = (e) => {
    let t, n
    const [o, r] = k(!0),
      i = () => {
        o() &&
          (r(!1),
          setTimeout(() => {
            e.onTransitionEnd(t?.offsetTop)
          }, 400))
      }
    S(() => {
      n &&
        ((_n = setTimeout(i, 5e3)),
        (n.onload = () => {
          clearTimeout(_n), i()
        }))
    }),
      E(() => {
        _n && clearTimeout(_n)
      })
    const s = (() => {
      const t = vn()
      return (
        'function' == typeof n ? be(n, t) : (n = t),
        t.style.setProperty('max-height', '512px'),
        _(
          (n) => {
            const r = e.content?.url,
              i = e.content?.clickLink?.alt ?? yn.alt,
              s = 'text-fade-in w-full ' + (o() ? 'opacity-0' : 'opacity-100'),
              a = o() ? '32px' : 'auto'
            return (
              r !== n._v$ && he(t, 'src', (n._v$ = r)),
              i !== n._v$2 && he(t, 'alt', (n._v$2 = i)),
              s !== n._v$3 && ge(t, (n._v$3 = s)),
              a !== n._v$4 &&
                (null != (n._v$4 = a)
                  ? t.style.setProperty('height', a)
                  : t.style.removeProperty('height')),
              n
            )
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        t
      )
    })()
    return (() => {
      const n = wn(),
        r = n.firstChild.firstChild,
        i = r.firstChild
      return (
        'function' == typeof t ? be(t, n) : (t = n),
        me(
          i,
          (() => {
            const e = T(() => !!o())
            return () => (e() ? G(Xt, {}) : null)
          })()
        ),
        me(
          r,
          (() => {
            const t = T(() => !!e.content?.clickLink)
            return () =>
              t()
                ? (() => {
                    const t = xn()
                    return (
                      me(t, s),
                      _(
                        (n) => {
                          const r = e.content.clickLink.url,
                            i = Ge('z-10', o() ? 'h-8' : 'p-4')
                          return (
                            r !== n._v$7 && he(t, 'href', (n._v$7 = r)),
                            i !== n._v$8 && ge(t, (n._v$8 = i)),
                            n
                          )
                        },
                        { _v$7: void 0, _v$8: void 0 }
                      ),
                      t
                    )
                  })()
                : (() => {
                    const e = kn()
                    return (
                      me(e, s),
                      _(() =>
                        ge(
                          e,
                          Ge(
                            'z-10',
                            !o() && 'p-4',
                            o() ? (Ft() ? 'h-8' : 'h-9') : ''
                          )
                        )
                      ),
                      e
                    )
                  })()
          })(),
          null
        ),
        _(
          (e) => {
            const t = o() ? '64px' : '100%',
              n = o() ? '32px' : '100%'
            return (
              t !== e._v$5 &&
                (null != (e._v$5 = t)
                  ? i.style.setProperty('width', t)
                  : i.style.removeProperty('width')),
              n !== e._v$6 &&
                (null != (e._v$6 = n)
                  ? i.style.setProperty('height', n)
                  : i.style.removeProperty('height')),
              e
            )
          },
          { _v$5: void 0, _v$6: void 0 }
        ),
        n
      )
    })()
  },
  Tn = ue('<br>'),
  Cn = ue('<span>'),
  Sn = (e) =>
    (() => {
      const t = Cn()
      return (
        me(t, () => e.text, null),
        me(
          t,
          G(te, {
            get when() {
              return T(() => !!e.isUniqueChild)() && De(e.text)
            },
            get children() {
              return Tn()
            },
          }),
          null
        ),
        _(() =>
          ge(
            t,
            ((e, t, n) => {
              let o = ''
              return (
                e && (o += 'slate-bold'),
                t && (o += ' slate-italic'),
                n && (o += ' slate-underline'),
                o
              )
            })(e.bold, e.italic, e.underline)
          )
        ),
        t
      )
    })(),
  En = ue('<a target="_blank" rel="noopener noreferrer">'),
  An = ue('<ol>'),
  In = ue('<ul>'),
  Pn = ue('<li>'),
  Rn = ue('<span>'),
  Ln = ue('<div>'),
  Mn = (e) =>
    G(ne, {
      get children() {
        return [
          G(oe, {
            get when() {
              return Be(e.element.text)
            },
            get children() {
              return G(
                Sn,
                Z(() => e.element, {
                  get isUniqueChild() {
                    return e.isUniqueChild ?? !1
                  },
                })
              )
            },
          }),
          G(oe, {
            when: !0,
            get children() {
              return G(ne, {
                get children() {
                  return [
                    G(oe, {
                      get when() {
                        return 'a' === e.element.type
                      },
                      get children() {
                        const t = En()
                        return (
                          me(
                            t,
                            G(ee, {
                              get each() {
                                return e.element.children
                              },
                              children: (t) =>
                                G(Mn, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length
                                  },
                                }),
                            })
                          ),
                          _(() => he(t, 'href', e.element.url)),
                          t
                        )
                      },
                    }),
                    G(oe, {
                      get when() {
                        return 'ol' === e.element.type
                      },
                      get children() {
                        const t = An()
                        return (
                          me(
                            t,
                            G(ee, {
                              get each() {
                                return e.element.children
                              },
                              children: (t) =>
                                G(Mn, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length
                                  },
                                }),
                            })
                          ),
                          t
                        )
                      },
                    }),
                    G(oe, {
                      get when() {
                        return 'ul' === e.element.type
                      },
                      get children() {
                        const t = In()
                        return (
                          me(
                            t,
                            G(ee, {
                              get each() {
                                return e.element.children
                              },
                              children: (t) =>
                                G(Mn, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length
                                  },
                                }),
                            })
                          ),
                          t
                        )
                      },
                    }),
                    G(oe, {
                      get when() {
                        return 'li' === e.element.type
                      },
                      get children() {
                        const t = Pn()
                        return (
                          me(
                            t,
                            G(ee, {
                              get each() {
                                return e.element.children
                              },
                              children: (t) =>
                                G(Mn, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length
                                  },
                                }),
                            })
                          ),
                          t
                        )
                      },
                    }),
                    G(oe, {
                      when: !0,
                      get children() {
                        return G(Nn, {
                          get element() {
                            return e.element
                          },
                          get insideInlineVariable() {
                            return e.insideInlineVariable ?? !1
                          },
                          get children() {
                            return G(ee, {
                              get each() {
                                return e.element.children
                              },
                              children: (t) =>
                                G(Mn, {
                                  element: t,
                                  get isUniqueChild() {
                                    return 1 === e.element.children?.length
                                  },
                                  get insideInlineVariable() {
                                    return 'inline-variable' === e.element.type
                                  },
                                }),
                            })
                          },
                        })
                      },
                    }),
                  ]
                },
              })
            },
          }),
        ]
      },
    }),
  Nn = (e) =>
    G(ne, {
      get children() {
        return [
          G(oe, {
            get when() {
              return (
                'inline-variable' === e.element.type || e.insideInlineVariable
              )
            },
            get children() {
              const t = Rn()
              return (
                me(t, () => e.children),
                _(() => he(t, 'data-element-type', e.element.type)),
                t
              )
            },
          }),
          G(oe, {
            when: !0,
            get children() {
              const t = Ln()
              return (
                me(t, () => e.children),
                _(() => he(t, 'data-element-type', e.element.type)),
                t
              )
            },
          }),
        ]
      },
    }),
  On = (e) => e.map((e) => e.text ?? On(e.children)).join(''),
  Bn = {
    isInputPrefillEnabled: !1,
    isHideQueryParamsEnabled: !0,
    isNewResultOnRefreshEnabled: !0,
    rememberUser: { isEnabled: !1, storage: 'session' },
    isBrandingEnabled: !1,
    isTypingEmulationEnabled: !0,
  },
  zn = {
    enabled: !0,
    speed: 400,
    maxDelay: 3,
    delayBetweenBubbles: 0,
    isDisabledOnFirstMessage: !0,
  },
  Dn = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div>'
  )
let jn
const Fn = (e) => {
  let t
  const [n, o] = k(!0),
    r = () => {
      n() &&
        (o(!1),
        setTimeout(() => {
          e.onTransitionEnd(t?.offsetTop)
        }, 400))
    }
  return (
    S(() => {
      if (!n) return
      const t = e.content?.richText ? On(e.content.richText) : '',
        o =
          !1 === e.typingEmulation?.enabled || e.isTypingSkipped
            ? 0
            : (({ bubbleContent: e, typingSettings: t }) => {
                let n = e.match(/(\w+)/g)?.length ?? 0
                0 === n && (n = e.length)
                const {
                  enabled: o,
                  speed: r,
                  maxDelay: i,
                } = {
                  enabled: t?.enabled ?? zn.enabled,
                  speed: t?.speed ?? zn.speed,
                  maxDelay: t?.maxDelay ?? zn.maxDelay,
                }
                let s = o ? (n / r) * 6e4 : 0
                return s > 1e3 * i && (s = 1e3 * i), s
              })({ bubbleContent: t, typingSettings: e.typingEmulation })
      jn = setTimeout(r, o)
    }),
    E(() => {
      jn && clearTimeout(jn)
    }),
    (() => {
      const o = Dn(),
        r = o.firstChild.firstChild.firstChild,
        i = r.nextSibling
      return (
        'function' == typeof t ? be(t, o) : (t = o),
        me(
          r,
          (() => {
            const e = T(() => !!n())
            return () => e() && G(Xt, {})
          })()
        ),
        me(
          i,
          G(ee, {
            get each() {
              return e.content?.richText
            },
            children: (e) => G(Mn, { element: e }),
          })
        ),
        _(
          (e) => {
            const t = n() ? '64px' : '100%',
              o = n() ? '32px' : '100%',
              s = Ge(
                'overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative text-ellipsis',
                n() ? 'opacity-0' : 'opacity-100'
              ),
              a = n() ? (Ft() ? '16px' : '20px') : '100%'
            return (
              t !== e._v$ &&
                (null != (e._v$ = t)
                  ? r.style.setProperty('width', t)
                  : r.style.removeProperty('width')),
              o !== e._v$2 &&
                (null != (e._v$2 = o)
                  ? r.style.setProperty('height', o)
                  : r.style.removeProperty('height')),
              s !== e._v$3 && ge(i, (e._v$3 = s)),
              a !== e._v$4 &&
                (null != (e._v$4 = a)
                  ? i.style.setProperty('height', a)
                  : i.style.removeProperty('height')),
              e
            )
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        o
      )
    })()
  )
}
let Un = (function (e) {
  return (
    (e.URL = 'url'),
    (e.YOUTUBE = 'youtube'),
    (e.VIMEO = 'vimeo'),
    (e.TIKTOK = 'tiktok'),
    (e.GUMLET = 'gumlet'),
    e
  )
})({})
const Hn = [Un.YOUTUBE, Un.VIMEO, Un.TIKTOK, Un.GUMLET],
  qn = 400,
  Gn = '100%',
  Vn = {
    [Un.VIMEO]: 'https://player.vimeo.com/video',
    [Un.YOUTUBE]: 'https://www.youtube.com/embed',
    [Un.TIKTOK]: 'https://www.tiktok.com/embed/v2',
    [Un.GUMLET]: 'https://play.gumlet.io/embed',
  },
  Wn = ue('<video autoplay controls>'),
  Kn = ue(
    '<div><iframe class="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'
  ),
  Yn = ue(
    '<div class="flex flex-col w-full animate-fade-in"><div class="flex w-full items-center"><div class="flex relative z-10 items-start typebot-host-bubble overflow-hidden w-full max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing z-10 ">'
  )
let Zn
const Xn = (e) => {
    let t
    const [n, o] = k(!0)
    return (
      S(() => {
        const r = e.content?.type && Hn.includes(e.content?.type) ? 2e3 : 100
        Zn = setTimeout(() => {
          n() &&
            (o(!1),
            setTimeout(() => {
              e.onTransitionEnd(t?.offsetTop)
            }, 400))
        }, r)
      }),
      E(() => {
        Zn && clearTimeout(Zn)
      }),
      (() => {
        const o = Yn(),
          r = o.firstChild.firstChild,
          i = r.firstChild
        return (
          'function' == typeof t ? be(t, o) : (t = o),
          me(
            i,
            (() => {
              const e = T(() => !!n())
              return () => e() && G(Xt, {})
            })()
          ),
          me(
            r,
            G(ne, {
              get children() {
                return [
                  G(oe, {
                    get when() {
                      return e.content?.type && e.content.type === Un.URL
                    },
                    get children() {
                      const t = Wn()
                      return (
                        _(
                          (o) => {
                            const r = e.content?.url,
                              i =
                                'p-4 focus:outline-none w-full z-10 text-fade-in rounded-md ' +
                                (n() ? 'opacity-0' : 'opacity-100'),
                              s = n() ? (Ft() ? '32px' : '36px') : 'auto',
                              a = e.content?.aspectRatio,
                              l = e.content?.maxWidth ?? Gn
                            return (
                              r !== o._v$ && he(t, 'src', (o._v$ = r)),
                              i !== o._v$2 && ge(t, (o._v$2 = i)),
                              s !== o._v$3 &&
                                (null != (o._v$3 = s)
                                  ? t.style.setProperty('height', s)
                                  : t.style.removeProperty('height')),
                              a !== o._v$4 &&
                                (null != (o._v$4 = a)
                                  ? t.style.setProperty('aspect-ratio', a)
                                  : t.style.removeProperty('aspect-ratio')),
                              l !== o._v$5 &&
                                (null != (o._v$5 = l)
                                  ? t.style.setProperty('max-width', l)
                                  : t.style.removeProperty('max-width')),
                              o
                            )
                          },
                          {
                            _v$: void 0,
                            _v$2: void 0,
                            _v$3: void 0,
                            _v$4: void 0,
                            _v$5: void 0,
                          }
                        ),
                        t
                      )
                    },
                  }),
                  G(oe, {
                    get when() {
                      return (
                        T(() => !!e.content?.type)() &&
                        Hn.includes(e.content.type)
                      )
                    },
                    get children() {
                      const t = Kn(),
                        o = t.firstChild
                      return (
                        _(
                          (r) => {
                            const i = Ge(
                                'p-4 z-10 text-fade-in w-full',
                                n() ? 'opacity-0' : 'opacity-100 p-4'
                              ),
                              s = n()
                                ? Ft()
                                  ? '32px'
                                  : '36px'
                                : e.content?.aspectRatio
                                ? void 0
                                : `${e.content?.height ?? qn}px`,
                              a = e.content?.aspectRatio,
                              l = e.content?.maxWidth ?? Gn,
                              c = `${Vn[e.content?.type]}/${e.content?.id}`
                            return (
                              i !== r._v$6 && ge(t, (r._v$6 = i)),
                              s !== r._v$7 &&
                                (null != (r._v$7 = s)
                                  ? t.style.setProperty('height', s)
                                  : t.style.removeProperty('height')),
                              a !== r._v$8 &&
                                (null != (r._v$8 = a)
                                  ? t.style.setProperty('aspect-ratio', a)
                                  : t.style.removeProperty('aspect-ratio')),
                              l !== r._v$9 &&
                                (null != (r._v$9 = l)
                                  ? t.style.setProperty('max-width', l)
                                  : t.style.removeProperty('max-width')),
                              c !== r._v$10 && he(o, 'src', (r._v$10 = c)),
                              r
                            )
                          },
                          {
                            _v$6: void 0,
                            _v$7: void 0,
                            _v$8: void 0,
                            _v$9: void 0,
                            _v$10: void 0,
                          }
                        ),
                        t
                      )
                    },
                  }),
                ]
              },
            }),
            null
          ),
          _(
            (t) => {
              const o = n() ? '64px' : '100%',
                r = n() ? '32px' : '100%',
                s = e.content?.maxWidth ?? Gn
              return (
                o !== t._v$11 &&
                  (null != (t._v$11 = o)
                    ? i.style.setProperty('width', o)
                    : i.style.removeProperty('width')),
                r !== t._v$12 &&
                  (null != (t._v$12 = r)
                    ? i.style.setProperty('height', r)
                    : i.style.removeProperty('height')),
                s !== t._v$13 &&
                  (null != (t._v$13 = s)
                    ? i.style.setProperty('max-width', s)
                    : i.style.removeProperty('max-width')),
                t
              )
            },
            { _v$11: void 0, _v$12: void 0, _v$13: void 0 }
          ),
          o
        )
      })()
    )
  },
  Jn = (e) => {
    const t = (t) => {
        e.onTransitionEnd(t)
      },
      n = (t) => {
        e.onCompleted(t)
      }
    return G(ne, {
      get children() {
        return [
          G(oe, {
            get when() {
              return e.message.type === Pe.TEXT
            },
            get children() {
              return G(Fn, {
                get content() {
                  return e.message.content
                },
                get isTypingSkipped() {
                  return e.isTypingSkipped
                },
                get typingEmulation() {
                  return e.typingEmulation
                },
                onTransitionEnd: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.message.type === Pe.IMAGE
            },
            get children() {
              return G($n, {
                get content() {
                  return e.message.content
                },
                onTransitionEnd: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.message.type === Pe.VIDEO
            },
            get children() {
              return G(Xn, {
                get content() {
                  return e.message.content
                },
                onTransitionEnd: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.message.type === Pe.EMBED
            },
            get children() {
              return G(dn, {
                get content() {
                  return e.message.content
                },
                onTransitionEnd: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return 'custom-embed' === e.message.type
            },
            get children() {
              return G(mn, {
                get content() {
                  return e.message.content
                },
                onTransitionEnd: t,
                onCompleted: n,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.message.type === Pe.AUDIO
            },
            get children() {
              return G(sn, {
                get content() {
                  return e.message.content
                },
                onTransitionEnd: t,
              })
            },
          }),
        ]
      },
    })
  },
  Qn = ue(
    '<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">'
  ),
  eo = () =>
    (() => {
      const e = Qn(),
        t = e.firstChild
      return (
        _(
          (n) => {
            const o =
                'flex justify-center items-center rounded-full text-white relative ' +
                (Ft() ? 'w-6 h-6 text-sm' : 'w-10 h-10 text-xl'),
              r =
                'absolute top-0 left-0 ' +
                (Ft() ? ' w-6 h-6 text-sm' : 'w-full h-full text-xl')
            return (
              o !== n._v$ && ge(e, (n._v$ = o)),
              r !== n._v$2 && he(t, 'class', (n._v$2 = r)),
              n
            )
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        e
      )
    })(),
  to = ue(
    '<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full" elementtiming="Bot avatar" fetchpriority="high">'
  ),
  no = (e) => {
    const [t, n] = k(e.initialAvatarSrc)
    return (
      $(() => {
        ;(!t()?.startsWith('{{') && t()) ||
          !e.initialAvatarSrc?.startsWith('http') ||
          n(e.initialAvatarSrc)
      }),
      G(te, {
        get when() {
          return je(t())
        },
        keyed: !0,
        get fallback() {
          return G(eo, {})
        },
        get children() {
          const e = to(),
            n = e.firstChild
          return (
            _(
              (o) => {
                const r =
                    'flex justify-center items-center rounded-full text-white relative animate-fade-in flex-shrink-0 ' +
                    (Ft() ? 'w-6 h-6 text-sm' : 'w-10 h-10 text-xl'),
                  i = t()
                return (
                  r !== o._v$ && ge(e, (o._v$ = r)),
                  i !== o._v$2 && he(n, 'src', (o._v$2 = i)),
                  o
                )
              },
              { _v$: void 0, _v$2: void 0 }
            ),
            e
          )
        },
      })
    )
  },
  oo = ue(
    '<div class="flex justify-end items-end animate-fade-in gap-2 guest-container"><span class="px-4 py-2 whitespace-pre-wrap max-w-full typebot-guest-bubble" data-testid="guest-bubble">'
  ),
  ro = (e) =>
    (() => {
      const t = oo(),
        n = t.firstChild
      return (
        t.style.setProperty('margin-left', '50px'),
        me(n, () => e.message),
        me(
          t,
          G(te, {
            get when() {
              return e.showAvatar
            },
            get children() {
              return G(no, {
                get initialAvatarSrc() {
                  return e.avatarSrc
                },
              })
            },
          }),
          null
        ),
        t
      )
    })(),
  io = { button: Re, placeholder: 'Type your answer...' },
  so = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'
  ),
  ao = (e) => {
    const [t, n] = k(e.defaultValue ?? '')
    let o
    const r = (e) => n(e),
      i = () => {
        '' !== t() && o?.reportValidity()
          ? e.onSubmit({ value: t() })
          : o?.focus()
      },
      s = (t) => {
        e.block.options?.isLong || ('Enter' === t.key && i())
      },
      a = (t) => {
        e.block.options?.isLong &&
          'Enter' === t.key &&
          (t.metaKey || t.ctrlKey) &&
          i()
      }
    S(() => {
      !Ft() && o && o.focus(), window.addEventListener('message', l)
    }),
      E(() => {
        window.removeEventListener('message', l)
      })
    const l = (e) => {
      const { data: t } = e
      t.isFromTypebot && 'setInputValue' === t.command && n(t.value)
    }
    return (() => {
      const n = so()
      return (
        (n.$$keydown = s),
        me(
          n,
          (() => {
            const n = T(() => !!e.block.options?.isLong)
            return () =>
              n()
                ? G(tn, {
                    ref(e) {
                      'function' == typeof o ? o(e) : (o = e)
                    },
                    onInput: r,
                    onKeyDown: a,
                    get value() {
                      return t()
                    },
                    get placeholder() {
                      return (
                        e.block.options?.labels?.placeholder ?? io.placeholder
                      )
                    },
                  })
                : G(Qt, {
                    ref(e) {
                      'function' == typeof o ? o(e) : (o = e)
                    },
                    onInput: r,
                    get value() {
                      return t()
                    },
                    get placeholder() {
                      return (
                        e.block.options?.labels?.placeholder ?? io.placeholder
                      )
                    },
                  })
          })(),
          null
        ),
        me(
          n,
          G(Yt, {
            type: 'button',
            class: 'my-2 ml-2',
            'on:click': i,
            get children() {
              return e.block.options?.labels?.button ?? io.button
            },
          }),
          null
        ),
        _(() =>
          null != (e.block.options?.isLong ? void 0 : '350px')
            ? n.style.setProperty(
                'max-width',
                e.block.options?.isLong ? void 0 : '350px'
              )
            : n.style.removeProperty('max-width')
        ),
        n
      )
    })()
  }
pe(['keydown'])
const lo = { button: Re, placeholder: 'Type a number...' },
  co = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="number">'
  ),
  uo = (e) => {
    const [t, n] = k(e.defaultValue ?? ''),
      [o, r, i] = [
        C((s = () => t())),
        function (e) {
          $(function () {
            const t = s()
            if (null == t) return void (e.value = t)
            const n = e.value
            ;((0 === t && '' === n) || t != n) && (e.value = t + '')
          })
        },
        function (e) {
          return e.validity.badInput
            ? s()
            : '' != e.value
            ? e.valueAsNumber
            : void 0
        },
      ]
    var s
    let a
    const l = () => {
        '' !== t() && a?.reportValidity()
          ? e.onSubmit({ value: t().toString() })
          : a?.focus()
      },
      c = (e) => {
        'Enter' === e.key && l()
      }
    S(() => {
      !Ft() && a && a.focus(), window.addEventListener('message', d)
    }),
      E(() => {
        window.removeEventListener('message', d)
      })
    const d = (e) => {
      const { data: t } = e
      t.isFromTypebot && 'setInputValue' === t.command && n(t.value)
    }
    return (() => {
      const t = co(),
        s = t.firstChild
      ;(t.$$keydown = c),
        t.style.setProperty('max-width', '350px'),
        (s.$$input = (e) => {
          n(i(e.currentTarget))
        }),
        be(r, s, () => !0)
      return (
        'function' == typeof a ? be(a, s) : (a = s),
        s.style.setProperty('font-size', '16px'),
        s.style.setProperty('appearance', 'auto'),
        (s.value = o),
        me(
          t,
          G(Yt, {
            type: 'button',
            class: 'my-2 ml-2',
            'on:click': l,
            get children() {
              return e.block.options?.labels?.button ?? lo.button
            },
          }),
          null
        ),
        _(
          (t) => {
            const n = e.block.options?.labels?.placeholder ?? lo.placeholder,
              o = e.block.options?.min,
              r = e.block.options?.max,
              i = e.block.options?.step ?? 'any'
            return (
              n !== t._v$ && he(s, 'placeholder', (t._v$ = n)),
              o !== t._v$2 && he(s, 'min', (t._v$2 = o)),
              r !== t._v$3 && he(s, 'max', (t._v$3 = r)),
              i !== t._v$4 && he(s, 'step', (t._v$4 = i)),
              t
            )
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        t
      )
    })()
  }
pe(['keydown', 'input'])
const po = { button: Re, placeholder: 'Type your email...' },
  ho = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'
  ),
  go = (e) => {
    const [t, n] = k(e.defaultValue ?? '')
    let o
    const r = (e) => n(e),
      i = () => {
        '' !== t() && o?.reportValidity()
          ? e.onSubmit({ value: t() })
          : o?.focus()
      },
      s = (e) => {
        'Enter' === e.key && i()
      }
    S(() => {
      !Ft() && o && o.focus(), window.addEventListener('message', a)
    }),
      E(() => {
        window.removeEventListener('message', a)
      })
    const a = (e) => {
      const { data: t } = e
      t.isFromTypebot && 'setInputValue' === t.command && n(t.value)
    }
    return (() => {
      const n = ho()
      return (
        (n.$$keydown = s),
        n.style.setProperty('max-width', '350px'),
        me(
          n,
          G(Qt, {
            ref(e) {
              'function' == typeof o ? o(e) : (o = e)
            },
            get value() {
              return t()
            },
            get placeholder() {
              return e.block.options?.labels?.placeholder ?? po.placeholder
            },
            onInput: r,
            type: 'email',
            autocomplete: 'email',
          }),
          null
        ),
        me(
          n,
          G(Yt, {
            type: 'button',
            class: 'my-2 ml-2',
            'on:click': i,
            get children() {
              return e.block.options?.labels?.button ?? po.button
            },
          }),
          null
        ),
        n
      )
    })()
  }
pe(['keydown'])
const fo = { button: Re, placeholder: 'Type a URL...' },
  bo = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input w-full" data-testid="input">'
  ),
  mo = (e) => {
    const [t, n] = k(e.defaultValue ?? '')
    let o
    const r = (e) => {
        if (!e.startsWith('https://'))
          return 'https:/' === e ? void 0 : n(`https://${e}`)
        n(e)
      },
      i = () => {
        '' !== t() && o?.reportValidity()
          ? e.onSubmit({ value: t() })
          : o?.focus()
      },
      s = (e) => {
        'Enter' === e.key && i()
      }
    S(() => {
      !Ft() && o && o.focus(), window.addEventListener('message', a)
    }),
      E(() => {
        window.removeEventListener('message', a)
      })
    const a = (e) => {
      const { data: t } = e
      t.isFromTypebot && 'setInputValue' === t.command && n(t.value)
    }
    return (() => {
      const n = bo()
      return (
        (n.$$keydown = s),
        n.style.setProperty('max-width', '350px'),
        me(
          n,
          G(Qt, {
            ref(e) {
              'function' == typeof o ? o(e) : (o = e)
            },
            get value() {
              return t()
            },
            get placeholder() {
              return e.block.options?.labels?.placeholder ?? fo.placeholder
            },
            onInput: r,
            type: 'url',
            autocomplete: 'url',
          }),
          null
        ),
        me(
          n,
          G(Yt, {
            type: 'button',
            class: 'my-2 ml-2',
            'on:click': i,
            get children() {
              return e.block.options?.labels?.button ?? fo.button
            },
          }),
          null
        ),
        n
      )
    })()
  }
pe(['keydown'])
const yo = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9">'
  ),
  vo = (e) =>
    (() => {
      const t = yo()
      return fe(t, e, !0, !0), t
    })(),
  wo = [
    { name: 'International', flag: '🌐', code: 'INT', dial_code: null },
    { name: 'Afghanistan', flag: '🇦🇫', code: 'AF', dial_code: '+93' },
    { name: 'Åland Islands', flag: '🇦🇽', code: 'AX', dial_code: '+358' },
    { name: 'Albania', flag: '🇦🇱', code: 'AL', dial_code: '+355' },
    { name: 'Algeria', flag: '🇩🇿', code: 'DZ', dial_code: '+213' },
    { name: 'American Samoa', flag: '🇦🇸', code: 'AS', dial_code: '+1684' },
    { name: 'Andorra', flag: '🇦🇩', code: 'AD', dial_code: '+376' },
    { name: 'Angola', flag: '🇦🇴', code: 'AO', dial_code: '+244' },
    { name: 'Anguilla', flag: '🇦🇮', code: 'AI', dial_code: '+1264' },
    { name: 'Antarctica', flag: '🇦🇶', code: 'AQ', dial_code: '+672' },
    { name: 'Antigua and Barbuda', flag: '🇦🇬', code: 'AG', dial_code: '+1268' },
    { name: 'Argentina', flag: '🇦🇷', code: 'AR', dial_code: '+54' },
    { name: 'Armenia', flag: '🇦🇲', code: 'AM', dial_code: '+374' },
    { name: 'Aruba', flag: '🇦🇼', code: 'AW', dial_code: '+297' },
    { name: 'Australia', flag: '🇦🇺', code: 'AU', dial_code: '+61' },
    { name: 'Austria', flag: '🇦🇹', code: 'AT', dial_code: '+43' },
    { name: 'Azerbaijan', flag: '🇦🇿', code: 'AZ', dial_code: '+994' },
    { name: 'Bahamas', flag: '🇧🇸', code: 'BS', dial_code: '+1242' },
    { name: 'Bahrain', flag: '🇧🇭', code: 'BH', dial_code: '+973' },
    { name: 'Bangladesh', flag: '🇧🇩', code: 'BD', dial_code: '+880' },
    { name: 'Barbados', flag: '🇧🇧', code: 'BB', dial_code: '+1246' },
    { name: 'Belarus', flag: '🇧🇾', code: 'BY', dial_code: '+375' },
    { name: 'Belgium', flag: '🇧🇪', code: 'BE', dial_code: '+32' },
    { name: 'Belize', flag: '🇧🇿', code: 'BZ', dial_code: '+501' },
    { name: 'Benin', flag: '🇧🇯', code: 'BJ', dial_code: '+229' },
    { name: 'Bermuda', flag: '🇧🇲', code: 'BM', dial_code: '+1441' },
    { name: 'Bhutan', flag: '🇧🇹', code: 'BT', dial_code: '+975' },
    {
      name: 'Bolivia, Plurinational State of bolivia',
      flag: '🇧🇴',
      code: 'BO',
      dial_code: '+591',
    },
    {
      name: 'Bosnia and Herzegovina',
      flag: '🇧🇦',
      code: 'BA',
      dial_code: '+387',
    },
    { name: 'Botswana', flag: '🇧🇼', code: 'BW', dial_code: '+267' },
    { name: 'Bouvet Island', flag: '🇧🇻', code: 'BV', dial_code: '+47' },
    { name: 'Brazil', flag: '🇧🇷', code: 'BR', dial_code: '+55' },
    {
      name: 'British Indian Ocean Territory',
      flag: '🇮🇴',
      code: 'IO',
      dial_code: '+246',
    },
    { name: 'Brunei Darussalam', flag: '🇧🇳', code: 'BN', dial_code: '+673' },
    { name: 'Bulgaria', flag: '🇧🇬', code: 'BG', dial_code: '+359' },
    { name: 'Burkina Faso', flag: '🇧🇫', code: 'BF', dial_code: '+226' },
    { name: 'Burundi', flag: '🇧🇮', code: 'BI', dial_code: '+257' },
    { name: 'Cambodia', flag: '🇰🇭', code: 'KH', dial_code: '+855' },
    { name: 'Cameroon', flag: '🇨🇲', code: 'CM', dial_code: '+237' },
    { name: 'Canada', flag: '🇨🇦', code: 'CA', dial_code: '+1' },
    { name: 'Cape Verde', flag: '🇨🇻', code: 'CV', dial_code: '+238' },
    { name: 'Cayman Islands', flag: '🇰🇾', code: 'KY', dial_code: '+345' },
    {
      name: 'Central African Republic',
      flag: '🇨🇫',
      code: 'CF',
      dial_code: '+236',
    },
    { name: 'Chad', flag: '🇹🇩', code: 'TD', dial_code: '+235' },
    { name: 'Chile', flag: '🇨🇱', code: 'CL', dial_code: '+56' },
    { name: 'China', flag: '🇨🇳', code: 'CN', dial_code: '+86' },
    { name: 'Christmas Island', flag: '🇨🇽', code: 'CX', dial_code: '+61' },
    {
      name: 'Cocos (Keeling) Islands',
      flag: '🇨🇨',
      code: 'CC',
      dial_code: '+61',
    },
    { name: 'Colombia', flag: '🇨🇴', code: 'CO', dial_code: '+57' },
    { name: 'Comoros', flag: '🇰🇲', code: 'KM', dial_code: '+269' },
    { name: 'Congo', flag: '🇨🇬', code: 'CG', dial_code: '+242' },
    {
      name: 'Congo, The Democratic Republic of the Congo',
      flag: '🇨🇩',
      code: 'CD',
      dial_code: '+243',
    },
    { name: 'Cook Islands', flag: '🇨🇰', code: 'CK', dial_code: '+682' },
    { name: 'Costa Rica', flag: '🇨🇷', code: 'CR', dial_code: '+506' },
    { name: "Cote d'Ivoire", flag: '🇨🇮', code: 'CI', dial_code: '+225' },
    { name: 'Croatia', flag: '🇭🇷', code: 'HR', dial_code: '+385' },
    { name: 'Cuba', flag: '🇨🇺', code: 'CU', dial_code: '+53' },
    { name: 'Cyprus', flag: '🇨🇾', code: 'CY', dial_code: '+357' },
    { name: 'Czech Republic', flag: '🇨🇿', code: 'CZ', dial_code: '+420' },
    { name: 'Denmark', flag: '🇩🇰', code: 'DK', dial_code: '+45' },
    { name: 'Djibouti', flag: '🇩🇯', code: 'DJ', dial_code: '+253' },
    { name: 'Dominica', flag: '🇩🇲', code: 'DM', dial_code: '+1767' },
    { name: 'Dominican Republic', flag: '🇩🇴', code: 'DO', dial_code: '+1849' },
    { name: 'Ecuador', flag: '🇪🇨', code: 'EC', dial_code: '+593' },
    { name: 'Egypt', flag: '🇪🇬', code: 'EG', dial_code: '+20' },
    { name: 'El Salvador', flag: '🇸🇻', code: 'SV', dial_code: '+503' },
    { name: 'Equatorial Guinea', flag: '🇬🇶', code: 'GQ', dial_code: '+240' },
    { name: 'Eritrea', flag: '🇪🇷', code: 'ER', dial_code: '+291' },
    { name: 'Estonia', flag: '🇪🇪', code: 'EE', dial_code: '+372' },
    { name: 'Ethiopia', flag: '🇪🇹', code: 'ET', dial_code: '+251' },
    {
      name: 'Falkland Islands (Malvinas)',
      flag: '🇫🇰',
      code: 'FK',
      dial_code: '+500',
    },
    { name: 'Faroe Islands', flag: '🇫🇴', code: 'FO', dial_code: '+298' },
    { name: 'Fiji', flag: '🇫🇯', code: 'FJ', dial_code: '+679' },
    { name: 'Finland', flag: '🇫🇮', code: 'FI', dial_code: '+358' },
    { name: 'France', flag: '🇫🇷', code: 'FR', dial_code: '+33' },
    { name: 'French Guiana', flag: '🇬🇫', code: 'GF', dial_code: '+594' },
    { name: 'French Polynesia', flag: '🇵🇫', code: 'PF', dial_code: '+689' },
    {
      name: 'French Southern Territories',
      flag: '🇹🇫',
      code: 'TF',
      dial_code: '+262',
    },
    { name: 'Gabon', flag: '🇬🇦', code: 'GA', dial_code: '+241' },
    { name: 'Gambia', flag: '🇬🇲', code: 'GM', dial_code: '+220' },
    { name: 'Georgia', flag: '🇬🇪', code: 'GE', dial_code: '+995' },
    { name: 'Germany', flag: '🇩🇪', code: 'DE', dial_code: '+49' },
    { name: 'Ghana', flag: '🇬🇭', code: 'GH', dial_code: '+233' },
    { name: 'Gibraltar', flag: '🇬🇮', code: 'GI', dial_code: '+350' },
    { name: 'Greece', flag: '🇬🇷', code: 'GR', dial_code: '+30' },
    { name: 'Greenland', flag: '🇬🇱', code: 'GL', dial_code: '+299' },
    { name: 'Grenada', flag: '🇬🇩', code: 'GD', dial_code: '+1473' },
    { name: 'Guadeloupe', flag: '🇬🇵', code: 'GP', dial_code: '+590' },
    { name: 'Guam', flag: '🇬🇺', code: 'GU', dial_code: '+1671' },
    { name: 'Guatemala', flag: '🇬🇹', code: 'GT', dial_code: '+502' },
    { name: 'Guernsey', flag: '🇬🇬', code: 'GG', dial_code: '+44' },
    { name: 'Guinea', flag: '🇬🇳', code: 'GN', dial_code: '+224' },
    { name: 'Guinea-Bissau', flag: '🇬🇼', code: 'GW', dial_code: '+245' },
    { name: 'Guyana', flag: '🇬🇾', code: 'GY', dial_code: '+592' },
    { name: 'Haiti', flag: '🇭🇹', code: 'HT', dial_code: '+509' },
    {
      name: 'Heard Island and Mcdonald Islands',
      flag: '🇭🇲',
      code: 'HM',
      dial_code: '+672',
    },
    {
      name: 'Holy See (Vatican City State)',
      flag: '🇻🇦',
      code: 'VA',
      dial_code: '+379',
    },
    { name: 'Honduras', flag: '🇭🇳', code: 'HN', dial_code: '+504' },
    { name: 'Hong Kong', flag: '🇭🇰', code: 'HK', dial_code: '+852' },
    { name: 'Hungary', flag: '🇭🇺', code: 'HU', dial_code: '+36' },
    { name: 'Iceland', flag: '🇮🇸', code: 'IS', dial_code: '+354' },
    { name: 'India', flag: '🇮🇳', code: 'IN', dial_code: '+91' },
    { name: 'Indonesia', flag: '🇮🇩', code: 'ID', dial_code: '+62' },
    {
      name: 'Iran, Islamic Republic of Persian Gulf',
      flag: '🇮🇷',
      code: 'IR',
      dial_code: '+98',
    },
    { name: 'Iraq', flag: '🇮🇶', code: 'IQ', dial_code: '+964' },
    { name: 'Ireland', flag: '🇮🇪', code: 'IE', dial_code: '+353' },
    { name: 'Isle of Man', flag: '🇮🇲', code: 'IM', dial_code: '+44' },
    { name: 'Israel', flag: '🇮🇱', code: 'IL', dial_code: '+972' },
    { name: 'Italy', flag: '🇮🇹', code: 'IT', dial_code: '+39' },
    { name: 'Jamaica', flag: '🇯🇲', code: 'JM', dial_code: '+1876' },
    { name: 'Japan', flag: '🇯🇵', code: 'JP', dial_code: '+81' },
    { name: 'Jersey', flag: '🇯🇪', code: 'JE', dial_code: '+44' },
    { name: 'Jordan', flag: '🇯🇴', code: 'JO', dial_code: '+962' },
    { name: 'Kazakhstan', flag: '🇰🇿', code: 'KZ', dial_code: '+7' },
    { name: 'Kenya', flag: '🇰🇪', code: 'KE', dial_code: '+254' },
    { name: 'Kiribati', flag: '🇰🇮', code: 'KI', dial_code: '+686' },
    {
      name: "Korea, Democratic People's Republic of Korea",
      flag: '🇰🇵',
      code: 'KP',
      dial_code: '+850',
    },
    {
      name: 'Korea, Republic of South Korea',
      flag: '🇰🇷',
      code: 'KR',
      dial_code: '+82',
    },
    { name: 'Kosovo', flag: '🇽🇰', code: 'XK', dial_code: '+383' },
    { name: 'Kuwait', flag: '🇰🇼', code: 'KW', dial_code: '+965' },
    { name: 'Kyrgyzstan', flag: '🇰🇬', code: 'KG', dial_code: '+996' },
    { name: 'Laos', flag: '🇱🇦', code: 'LA', dial_code: '+856' },
    { name: 'Latvia', flag: '🇱🇻', code: 'LV', dial_code: '+371' },
    { name: 'Lebanon', flag: '🇱🇧', code: 'LB', dial_code: '+961' },
    { name: 'Lesotho', flag: '🇱🇸', code: 'LS', dial_code: '+266' },
    { name: 'Liberia', flag: '🇱🇷', code: 'LR', dial_code: '+231' },
    {
      name: 'Libyan Arab Jamahiriya',
      flag: '🇱🇾',
      code: 'LY',
      dial_code: '+218',
    },
    { name: 'Liechtenstein', flag: '🇱🇮', code: 'LI', dial_code: '+423' },
    { name: 'Lithuania', flag: '🇱🇹', code: 'LT', dial_code: '+370' },
    { name: 'Luxembourg', flag: '🇱🇺', code: 'LU', dial_code: '+352' },
    { name: 'Macao', flag: '🇲🇴', code: 'MO', dial_code: '+853' },
    { name: 'Macedonia', flag: '🇲🇰', code: 'MK', dial_code: '+389' },
    { name: 'Madagascar', flag: '🇲🇬', code: 'MG', dial_code: '+261' },
    { name: 'Malawi', flag: '🇲🇼', code: 'MW', dial_code: '+265' },
    { name: 'Malaysia', flag: '🇲🇾', code: 'MY', dial_code: '+60' },
    { name: 'Maldives', flag: '🇲🇻', code: 'MV', dial_code: '+960' },
    { name: 'Mali', flag: '🇲🇱', code: 'ML', dial_code: '+223' },
    { name: 'Malta', flag: '🇲🇹', code: 'MT', dial_code: '+356' },
    { name: 'Marshall Islands', flag: '🇲🇭', code: 'MH', dial_code: '+692' },
    { name: 'Martinique', flag: '🇲🇶', code: 'MQ', dial_code: '+596' },
    { name: 'Mauritania', flag: '🇲🇷', code: 'MR', dial_code: '+222' },
    { name: 'Mauritius', flag: '🇲🇺', code: 'MU', dial_code: '+230' },
    { name: 'Mayotte', flag: '🇾🇹', code: 'YT', dial_code: '+262' },
    { name: 'Mexico', flag: '🇲🇽', code: 'MX', dial_code: '+52' },
    {
      name: 'Micronesia, Federated States of Micronesia',
      flag: '🇫🇲',
      code: 'FM',
      dial_code: '+691',
    },
    { name: 'Moldova', flag: '🇲🇩', code: 'MD', dial_code: '+373' },
    { name: 'Monaco', flag: '🇲🇨', code: 'MC', dial_code: '+377' },
    { name: 'Mongolia', flag: '🇲🇳', code: 'MN', dial_code: '+976' },
    { name: 'Montenegro', flag: '🇲🇪', code: 'ME', dial_code: '+382' },
    { name: 'Montserrat', flag: '🇲🇸', code: 'MS', dial_code: '+1664' },
    { name: 'Morocco', flag: '🇲🇦', code: 'MA', dial_code: '+212' },
    { name: 'Mozambique', flag: '🇲🇿', code: 'MZ', dial_code: '+258' },
    { name: 'Myanmar', flag: '🇲🇲', code: 'MM', dial_code: '+95' },
    { name: 'Namibia', flag: '🇳🇦', code: 'NA', dial_code: '+264' },
    { name: 'Nauru', flag: '🇳🇷', code: 'NR', dial_code: '+674' },
    { name: 'Nepal', flag: '🇳🇵', code: 'NP', dial_code: '+977' },
    { name: 'Netherlands', flag: '🇳🇱', code: 'NL', dial_code: '+31' },
    { name: 'Netherlands Antilles', flag: '', code: 'AN', dial_code: '+599' },
    { name: 'New Caledonia', flag: '🇳🇨', code: 'NC', dial_code: '+687' },
    { name: 'New Zealand', flag: '🇳🇿', code: 'NZ', dial_code: '+64' },
    { name: 'Nicaragua', flag: '🇳🇮', code: 'NI', dial_code: '+505' },
    { name: 'Niger', flag: '🇳🇪', code: 'NE', dial_code: '+227' },
    { name: 'Nigeria', flag: '🇳🇬', code: 'NG', dial_code: '+234' },
    { name: 'Niue', flag: '🇳🇺', code: 'NU', dial_code: '+683' },
    { name: 'Norfolk Island', flag: '🇳🇫', code: 'NF', dial_code: '+672' },
    {
      name: 'Northern Mariana Islands',
      flag: '🇲🇵',
      code: 'MP',
      dial_code: '+1670',
    },
    { name: 'Norway', flag: '🇳🇴', code: 'NO', dial_code: '+47' },
    { name: 'Oman', flag: '🇴🇲', code: 'OM', dial_code: '+968' },
    { name: 'Pakistan', flag: '🇵🇰', code: 'PK', dial_code: '+92' },
    { name: 'Palau', flag: '🇵🇼', code: 'PW', dial_code: '+680' },
    {
      name: 'Palestinian Territory, Occupied',
      flag: '🇵🇸',
      code: 'PS',
      dial_code: '+970',
    },
    { name: 'Panama', flag: '🇵🇦', code: 'PA', dial_code: '+507' },
    { name: 'Papua New Guinea', flag: '🇵🇬', code: 'PG', dial_code: '+675' },
    { name: 'Paraguay', flag: '🇵🇾', code: 'PY', dial_code: '+595' },
    { name: 'Peru', flag: '🇵🇪', code: 'PE', dial_code: '+51' },
    { name: 'Philippines', flag: '🇵🇭', code: 'PH', dial_code: '+63' },
    { name: 'Pitcairn', flag: '🇵🇳', code: 'PN', dial_code: '+64' },
    { name: 'Poland', flag: '🇵🇱', code: 'PL', dial_code: '+48' },
    { name: 'Portugal', flag: '🇵🇹', code: 'PT', dial_code: '+351' },
    { name: 'Puerto Rico', flag: '🇵🇷', code: 'PR', dial_code: '+1939' },
    { name: 'Qatar', flag: '🇶🇦', code: 'QA', dial_code: '+974' },
    { name: 'Romania', flag: '🇷🇴', code: 'RO', dial_code: '+40' },
    { name: 'Russia', flag: '🇷🇺', code: 'RU', dial_code: '+7' },
    { name: 'Rwanda', flag: '🇷🇼', code: 'RW', dial_code: '+250' },
    { name: 'Reunion', flag: '🇷🇪', code: 'RE', dial_code: '+262' },
    { name: 'Saint Barthelemy', flag: '🇧🇱', code: 'BL', dial_code: '+590' },
    {
      name: 'Saint Helena, Ascension and Tristan Da Cunha',
      flag: '🇸🇭',
      code: 'SH',
      dial_code: '+290',
    },
    {
      name: 'Saint Kitts and Nevis',
      flag: '🇰🇳',
      code: 'KN',
      dial_code: '+1869',
    },
    { name: 'Saint Lucia', flag: '🇱🇨', code: 'LC', dial_code: '+1758' },
    { name: 'Saint Martin', flag: '🇲🇫', code: 'MF', dial_code: '+590' },
    {
      name: 'Saint Pierre and Miquelon',
      flag: '🇵🇲',
      code: 'PM',
      dial_code: '+508',
    },
    {
      name: 'Saint Vincent and the Grenadines',
      flag: '🇻🇨',
      code: 'VC',
      dial_code: '+1784',
    },
    { name: 'Samoa', flag: '🇼🇸', code: 'WS', dial_code: '+685' },
    { name: 'San Marino', flag: '🇸🇲', code: 'SM', dial_code: '+378' },
    {
      name: 'Sao Tome and Principe',
      flag: '🇸🇹',
      code: 'ST',
      dial_code: '+239',
    },
    { name: 'Saudi Arabia', flag: '🇸🇦', code: 'SA', dial_code: '+966' },
    { name: 'Senegal', flag: '🇸🇳', code: 'SN', dial_code: '+221' },
    { name: 'Serbia', flag: '🇷🇸', code: 'RS', dial_code: '+381' },
    { name: 'Seychelles', flag: '🇸🇨', code: 'SC', dial_code: '+248' },
    { name: 'Sierra Leone', flag: '🇸🇱', code: 'SL', dial_code: '+232' },
    { name: 'Singapore', flag: '🇸🇬', code: 'SG', dial_code: '+65' },
    { name: 'Slovakia', flag: '🇸🇰', code: 'SK', dial_code: '+421' },
    { name: 'Slovenia', flag: '🇸🇮', code: 'SI', dial_code: '+386' },
    { name: 'Solomon Islands', flag: '🇸🇧', code: 'SB', dial_code: '+677' },
    { name: 'Somalia', flag: '🇸🇴', code: 'SO', dial_code: '+252' },
    { name: 'South Africa', flag: '🇿🇦', code: 'ZA', dial_code: '+27' },
    { name: 'South Sudan', flag: '🇸🇸', code: 'SS', dial_code: '+211' },
    {
      name: 'South Georgia and the South Sandwich Islands',
      flag: '🇬🇸',
      code: 'GS',
      dial_code: '+500',
    },
    { name: 'Spain', flag: '🇪🇸', code: 'ES', dial_code: '+34' },
    { name: 'Sri Lanka', flag: '🇱🇰', code: 'LK', dial_code: '+94' },
    { name: 'Sudan', flag: '🇸🇩', code: 'SD', dial_code: '+249' },
    { name: 'Suriname', flag: '🇸🇷', code: 'SR', dial_code: '+597' },
    {
      name: 'Svalbard and Jan Mayen',
      flag: '🇸🇯',
      code: 'SJ',
      dial_code: '+47',
    },
    { name: 'Swaziland', flag: '🇸🇿', code: 'SZ', dial_code: '+268' },
    { name: 'Sweden', flag: '🇸🇪', code: 'SE', dial_code: '+46' },
    { name: 'Switzerland', flag: '🇨🇭', code: 'CH', dial_code: '+41' },
    { name: 'Syrian Arab Republic', flag: '🇸🇾', code: 'SY', dial_code: '+963' },
    { name: 'Taiwan', flag: '🇹🇼', code: 'TW', dial_code: '+886' },
    { name: 'Tajikistan', flag: '🇹🇯', code: 'TJ', dial_code: '+992' },
    {
      name: 'Tanzania, United Republic of Tanzania',
      flag: '🇹🇿',
      code: 'TZ',
      dial_code: '+255',
    },
    { name: 'Thailand', flag: '🇹🇭', code: 'TH', dial_code: '+66' },
    { name: 'Timor-Leste', flag: '🇹🇱', code: 'TL', dial_code: '+670' },
    { name: 'Togo', flag: '🇹🇬', code: 'TG', dial_code: '+228' },
    { name: 'Tokelau', flag: '🇹🇰', code: 'TK', dial_code: '+690' },
    { name: 'Tonga', flag: '🇹🇴', code: 'TO', dial_code: '+676' },
    { name: 'Trinidad and Tobago', flag: '🇹🇹', code: 'TT', dial_code: '+1868' },
    { name: 'Tunisia', flag: '🇹🇳', code: 'TN', dial_code: '+216' },
    { name: 'Turkey', flag: '🇹🇷', code: 'TR', dial_code: '+90' },
    { name: 'Turkmenistan', flag: '🇹🇲', code: 'TM', dial_code: '+993' },
    {
      name: 'Turks and Caicos Islands',
      flag: '🇹🇨',
      code: 'TC',
      dial_code: '+1649',
    },
    { name: 'Tuvalu', flag: '🇹🇻', code: 'TV', dial_code: '+688' },
    { name: 'Uganda', flag: '🇺🇬', code: 'UG', dial_code: '+256' },
    { name: 'Ukraine', flag: '🇺🇦', code: 'UA', dial_code: '+380' },
    { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', dial_code: '+971' },
    { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dial_code: '+44' },
    { name: 'United States', flag: '🇺🇸', code: 'US', dial_code: '+1' },
    { name: 'Uruguay', flag: '🇺🇾', code: 'UY', dial_code: '+598' },
    { name: 'Uzbekistan', flag: '🇺🇿', code: 'UZ', dial_code: '+998' },
    { name: 'Vanuatu', flag: '🇻🇺', code: 'VU', dial_code: '+678' },
    {
      name: 'Venezuela, Bolivarian Republic of Venezuela',
      flag: '🇻🇪',
      code: 'VE',
      dial_code: '+58',
    },
    { name: 'Vietnam', flag: '🇻🇳', code: 'VN', dial_code: '+84' },
    {
      name: 'Virgin Islands, British',
      flag: '🇻🇬',
      code: 'VG',
      dial_code: '+1284',
    },
    {
      name: 'Virgin Islands, U.S.',
      flag: '🇻🇮',
      code: 'VI',
      dial_code: '+1340',
    },
    { name: 'Wallis and Futuna', flag: '🇼🇫', code: 'WF', dial_code: '+681' },
    { name: 'Yemen', flag: '🇾🇪', code: 'YE', dial_code: '+967' },
    { name: 'Zambia', flag: '🇿🇲', code: 'ZM', dial_code: '+260' },
    { name: 'Zimbabwe', flag: '🇿🇼', code: 'ZW', dial_code: '+263' },
  ],
  xo = { button: Re, placeholder: 'Type your phone number...' },
  ko = ue(
    '<div class="flex items-end justify-between pr-2 typebot-input" data-testid="input"><div class="flex"><div class="relative typebot-country-select flex justify-center items-center"><div class="pl-2 pr-1 flex items-center gap-2"><span></span></div><select class="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0">'
  ),
  _o = ue('<option> '),
  $o = (e) => {
    const [t, n] = k(De(e.defaultCountryCode) ? 'INT' : e.defaultCountryCode),
      [o, r] = k(e.defaultValue ?? '')
    let i
    const s = (e) => {
        r(e), ('' !== e && '+' !== e) || 'INT' === t() || n('INT')
        const o =
          e?.startsWith('+') &&
          e.length > 2 &&
          wo.reduce(
            (t, n) =>
              !n?.dial_code || (null !== t && !t.dial_code)
                ? t
                : e?.startsWith(n.dial_code) &&
                  n.dial_code.length > (t?.dial_code.length ?? 0)
                ? n
                : t,
            null
          )
        o && n(o.code)
      },
      a = () => {
        const n = wo.find((e) => e.code === t())?.dial_code
        '' !== o() && i?.reportValidity()
          ? e.onSubmit({
              value: o().startsWith('+') ? o() : `${n ?? ''}${o()}`,
            })
          : i?.focus()
      },
      l = (e) => {
        'Enter' === e.key && a()
      },
      c = (e) => {
        const t = e.currentTarget.value
        n(t)
        const s = wo.find((e) => e.code === t)?.dial_code
        '' === o() && s && r(s), i?.focus()
      }
    S(() => {
      !Ft() && i && i.focus(), window.addEventListener('message', d)
    }),
      E(() => {
        window.removeEventListener('message', d)
      })
    const d = (e) => {
      const { data: t } = e
      t.isFromTypebot && 'setInputValue' === t.command && r(t.value)
    }
    return (() => {
      const n = ko(),
        r = n.firstChild,
        d = r.firstChild.firstChild,
        u = d.firstChild,
        p = d.nextSibling
      return (
        (n.$$keydown = l),
        n.style.setProperty('max-width', '400px'),
        me(u, () => wo.find((e) => t() === e.code)?.flag),
        me(d, G(vo, { class: 'w-3' }), null),
        p.addEventListener('change', c),
        me(
          p,
          G(ee, {
            each: wo,
            children: (e) =>
              (() => {
                const n = _o(),
                  o = n.firstChild
                return (
                  me(n, () => e.name, o),
                  me(n, () => (e.dial_code ? `(${e.dial_code})` : ''), null),
                  _(() => (n.selected = e.code === t())),
                  _(() => (n.value = e.code)),
                  n
                )
              })(),
          })
        ),
        me(
          r,
          G(Qt, {
            type: 'tel',
            ref(e) {
              'function' == typeof i ? i(e) : (i = e)
            },
            get value() {
              return o()
            },
            onInput: s,
            get placeholder() {
              return e.labels?.placeholder ?? xo.placeholder
            },
            get autofocus() {
              return !Ft()
            },
          }),
          null
        ),
        me(
          n,
          G(Yt, {
            type: 'button',
            class: 'my-2 ml-2',
            'on:click': a,
            get children() {
              return e.labels?.button ?? xo.button
            },
          }),
          null
        ),
        n
      )
    })()
  }
pe(['keydown'])
const To = { button: Re, from: 'From:', to: 'To:' },
  Co = ue(
    '<div class="flex flex-col"><div class="flex items-center"><form class="flex justify-between typebot-input pr-2 items-end"><div class="flex flex-col"><div><input class="focus:outline-none flex-1 w-full text-input typebot-date-input" data-testid="from-date">'
  ),
  So = ue('<p class="font-semibold">'),
  Eo = ue(
    '<div class="flex items-center p-4"><input class="focus:outline-none flex-1 w-full text-input ml-2 typebot-date-input" data-testid="to-date">'
  ),
  Ao = (e) => {
    const [t, n] = k(Io(e.defaultValue ?? ''))
    return (() => {
      const o = Co(),
        r = o.firstChild.firstChild,
        i = r.firstChild,
        s = i.firstChild,
        a = s.firstChild
      return (
        r.addEventListener('submit', (n) => {
          ;('' === t().from && '' === t().to) ||
            (n.preventDefault(),
            e.onSubmit({
              value: `${t().from}${e.options?.isRange ? ` to ${t().to}` : ''}`,
            }))
        }),
        me(
          s,
          (() => {
            const t = T(() => !!e.options?.isRange)
            return () =>
              t() &&
              (() => {
                const t = So()
                return me(t, () => e.options.labels?.from ?? To.from), t
              })()
          })(),
          a
        ),
        a.addEventListener('change', (e) =>
          n({ ...t(), from: e.currentTarget.value })
        ),
        a.style.setProperty('min-height', '32px'),
        a.style.setProperty('min-width', '100px'),
        a.style.setProperty('font-size', '16px'),
        me(
          i,
          (() => {
            const o = T(() => !!e.options?.isRange)
            return () =>
              o() &&
              (() => {
                const o = Eo(),
                  r = o.firstChild
                return (
                  me(
                    o,
                    (() => {
                      const t = T(() => !!e.options.isRange)
                      return () =>
                        t() &&
                        (() => {
                          const t = So()
                          return me(t, () => e.options.labels?.to ?? To.to), t
                        })()
                    })(),
                    r
                  ),
                  r.addEventListener('change', (e) =>
                    n({ ...t(), to: e.currentTarget.value })
                  ),
                  r.style.setProperty('min-height', '32px'),
                  r.style.setProperty('min-width', '100px'),
                  r.style.setProperty('font-size', '16px'),
                  _(
                    (t) => {
                      const n = e.options.hasTime ? 'datetime-local' : 'date',
                        o = e.options?.min,
                        i = e.options?.max
                      return (
                        n !== t._v$5 && he(r, 'type', (t._v$5 = n)),
                        o !== t._v$6 && he(r, 'min', (t._v$6 = o)),
                        i !== t._v$7 && he(r, 'max', (t._v$7 = i)),
                        t
                      )
                    },
                    { _v$5: void 0, _v$6: void 0, _v$7: void 0 }
                  ),
                  _(() => (r.value = t().to)),
                  o
                )
              })()
          })(),
          null
        ),
        me(
          r,
          G(Yt, {
            class: 'my-2 ml-2',
            get children() {
              return e.options?.labels?.button ?? To.button
            },
          }),
          null
        ),
        _(
          (t) => {
            const n =
                'flex items-center p-4 ' +
                (e.options?.isRange ? 'pb-0 gap-2' : ''),
              o = e.options?.hasTime ? 'datetime-local' : 'date',
              r = e.options?.min,
              i = e.options?.max
            return (
              n !== t._v$ && ge(s, (t._v$ = n)),
              o !== t._v$2 && he(a, 'type', (t._v$2 = o)),
              r !== t._v$3 && he(a, 'min', (t._v$3 = r)),
              i !== t._v$4 && he(a, 'max', (t._v$4 = i)),
              t
            )
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
        ),
        _(() => (a.value = t().from)),
        o
      )
    })()
  },
  Io = (e) => {
    if (!e.includes('to')) return { from: e, to: '' }
    const [t, n] = e.split(' to ')
    return { from: t, to: n }
  },
  Po = 'Numbers',
  Ro = 10,
  Lo = { button: Re },
  Mo = 0,
  No = ue(
    '<form class="flex flex-col gap-2"><div class="flex flex-wrap justify-center gap-2"></div><div class="flex justify-end">'
  ),
  Oo = ue('<span class="text-sm w-full rating-label">'),
  Bo = ue('<span class="text-sm w-full text-right pr-2 rating-label">'),
  zo = ue('<div>'),
  Do = (e) => {
    const [t, n] = k(e.defaultValue ? Number(e.defaultValue) : void 0),
      o = (n) => {
        n.preventDefault()
        const o = t()
        ze(o) || e.onSubmit({ value: o.toString() })
      },
      r = (t) => {
        e.block.options?.isOneClickSubmitEnabled &&
          e.onSubmit({ value: t.toString() }),
          n(t)
      }
    return (() => {
      const n = No(),
        i = n.firstChild,
        s = i.nextSibling
      return (
        n.addEventListener('submit', o),
        me(
          n,
          (() => {
            const t = T(() => !!e.block.options?.labels?.left)
            return () =>
              t() &&
              (() => {
                const t = Oo()
                return me(t, () => e.block.options.labels.left), t
              })()
          })(),
          i
        ),
        me(
          i,
          G(ee, {
            get each() {
              return Array.from(
                Array(
                  (e.block.options?.length ?? Ro) +
                    ('Numbers' === (e.block.options?.buttonType ?? Po)
                      ? -((e.block.options?.startsAt ?? Mo) - 1)
                      : 0)
                )
              )
            },
            children: (n, o) =>
              G(
                jo,
                Z(() => e.block.options, {
                  get rating() {
                    return t()
                  },
                  get idx() {
                    return (
                      o() +
                      ('Numbers' === (e.block.options?.buttonType ?? Po)
                        ? e.block.options?.startsAt ?? Mo
                        : 1)
                    )
                  },
                  onClick: r,
                })
              ),
          })
        ),
        me(
          n,
          (() => {
            const t = T(() => !!e.block.options?.labels?.right)
            return () =>
              t() &&
              (() => {
                const t = Bo()
                return me(t, () => e.block.options.labels.right), t
              })()
          })(),
          s
        ),
        me(
          s,
          (() => {
            const n = T(() => !!Be(t()))
            return () =>
              n() &&
              G(Yt, {
                disableIcon: !0,
                get children() {
                  return e.block.options?.labels?.button ?? Lo.button
                },
              })
          })()
        ),
        n
      )
    })()
  },
  jo = (e) => {
    const t = (t) => {
      t.preventDefault(), e.onClick(e.idx)
    }
    return G(ne, {
      get children() {
        return [
          G(oe, {
            get when() {
              return 'Numbers' === (e.buttonType ?? Po)
            },
            get children() {
              return G(Kt, {
                'on:click': t,
                get class() {
                  return e.isOneClickSubmitEnabled ||
                    (Be(e.rating) && e.idx <= e.rating)
                    ? ''
                    : 'selectable'
                },
                get children() {
                  return e.idx
                },
              })
            },
          }),
          G(oe, {
            get when() {
              return 'Numbers' !== (e.buttonType ?? Po)
            },
            get children() {
              const t = zo()
              return (
                t.addEventListener('click', () => e.onClick(e.idx)),
                _(
                  (n) => {
                    const o =
                        'flex justify-center items-center rating-icon-container cursor-pointer ' +
                        (Be(e.rating) && e.idx <= e.rating ? 'selected' : ''),
                      r =
                        e.customIcon?.isEnabled && !De(e.customIcon.svg)
                          ? e.customIcon.svg
                          : Fo
                    return (
                      o !== n._v$ && ge(t, (n._v$ = o)),
                      r !== n._v$2 && (t.innerHTML = n._v$2 = r),
                      n
                    )
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              )
            },
          }),
        ]
      },
    })
  },
  Fo =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  Uo = async ({ apiHost: e, files: t, onUploadProgress: n }) => {
    const o = []
    let r = 0
    for (const { input: i, file: s } of t) {
      n && n((r / t.length) * 100), (r += 1)
      const { data: a } = await Oe({
        method: 'POST',
        url: `${e}/api/v1/generate-upload-url`,
        body: { filePathProps: i, fileType: s.type },
      })
      if (a?.presignedUrl) {
        const e = new FormData()
        Object.entries(a.formData).forEach(([t, n]) => {
          e.append(t, n)
        }),
          e.append('file', s)
        if (!(await fetch(a.presignedUrl, { method: 'POST', body: e })).ok)
          continue
        o.push(a.fileUrl)
      }
    }
    return o
  },
  Ho = {
    isRequired: !0,
    isMultipleAllowed: !1,
    visibility: 'Auto',
    labels: {
      placeholder:
        '<strong>\n      Click to upload\n    </strong> or drag and drop<br>\n    (size limit: 10MB)',
      button: 'Upload',
      clear: 'Clear',
      skip: 'Skip',
      success: { single: 'File uploaded', multiple: '{total} files uploaded' },
    },
  },
  qo = ue(
    '<div class="w-full bg-gray-200 rounded-full h-2.5"><div class="upload-progress-bar h-2.5 rounded-full">'
  ),
  Go = ue(
    '<span class="relative"><div class="total-files-indicator flex items-center justify-center absolute -right-1 rounded-full px-1 w-4 h-4">'
  ),
  Vo = ue(
    '<div class="flex flex-col justify-center items-center"><p class="text-sm text-gray-500 text-center">'
  ),
  Wo = ue('<input id="dropzone-file" type="file" class="hidden">'),
  Ko = ue('<div class="flex justify-end">'),
  Yo = ue('<div class="flex justify-end"><div class="flex gap-2">'),
  Zo = ue('<p class="text-red-500 text-sm">'),
  Xo = ue(
    '<form class="flex flex-col w-full gap-2"><label for="dropzone-file">'
  ),
  Jo = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16">'
  ),
  Qo = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-500"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9">'
  ),
  er = (e) => {
    const [t, n] = k([]),
      [o, r] = k(!1),
      [i, s] = k(0),
      [a, l] = k(!1),
      [c, d] = k(),
      u = (o) => {
        d(void 0)
        const r = Array.from(o),
          i =
            e.block.options && 'sizeLimit' in e.block.options
              ? e.block.options?.sizeLimit ??
                gt('NEXT_PUBLIC_BOT_FILE_UPLOAD_MAX_SIZE')
              : void 0
        return i && r.some((e) => e.size > 1024 * i * 1024)
          ? d(`A file is larger than ${i}MB`)
          : !e.block.options?.isMultipleAllowed && o
          ? h(r[0])
          : void n([...t(), ...r])
      },
      p = async (e) => {
        e.preventDefault(), 0 !== t().length && g(t())
      },
      h = async (t) => {
        if (e.context.isPreview || !e.context.resultId)
          return e.onSubmit({
            label:
              e.block.options?.labels?.success?.single ??
              Ho.labels.success.single,
            value: 'http://fake-upload-url.com',
          })
        r(!0)
        const n = await Uo({
          apiHost: e.context.apiHost ?? ft(),
          files: [
            {
              file: t,
              input: { sessionId: e.context.sessionId, fileName: t.name },
            },
          ],
        })
        if ((r(!1), n.length))
          return e.onSubmit({
            label:
              e.block.options?.labels?.success?.single ??
              Ho.labels.success.single,
            value: n[0] ? or(n[0]) : '',
          })
        d('An error occured while uploading the file')
      },
      g = async (t) => {
        const n = e.context.resultId
        if (e.context.isPreview || !n)
          return e.onSubmit({
            label:
              t.length > 1
                ? (
                    e.block.options?.labels?.success?.multiple ??
                    Ho.labels.success.multiple
                  ).replaceAll('{total}', t.length.toString())
                : e.block.options?.labels?.success?.single ??
                  Ho.labels.success.single,
            value: t
              .map((e, t) => `http://fake-upload-url.com/${t}`)
              .join(', '),
          })
        r(!0)
        const o = await Uo({
          apiHost: e.context.apiHost ?? ft(),
          files: t.map((t) => ({
            file: t,
            input: { sessionId: e.context.sessionId, fileName: t.name },
          })),
          onUploadProgress: s,
        })
        if ((r(!1), s(0), o.length !== t.length))
          return d('An error occured while uploading the files')
        e.onSubmit({
          label:
            o.length > 1
              ? (
                  e.block.options?.labels?.success?.multiple ??
                  Ho.labels.success.multiple
                ).replaceAll('{total}', o.length.toString())
              : e.block.options?.labels?.success?.single ??
                Ho.labels.success.single,
          value: o.filter(Be).map(or).join(', '),
        })
      },
      f = (e) => {
        e.preventDefault(), l(!0)
      },
      b = () => l(!1),
      m = (e) => {
        e.preventDefault(),
          e.stopPropagation(),
          e.dataTransfer?.files && u(e.dataTransfer.files)
      },
      y = () => n([]),
      v = () => e.onSkip(e.block.options?.labels?.skip ?? Ho.labels.skip)
    return (() => {
      const n = Xo(),
        r = n.firstChild
      return (
        n.addEventListener('submit', p),
        r.addEventListener('drop', m),
        r.addEventListener('dragleave', b),
        r.addEventListener('dragover', f),
        me(
          r,
          G(ne, {
            get children() {
              return [
                G(oe, {
                  get when() {
                    return o()
                  },
                  get children() {
                    return G(te, {
                      get when() {
                        return t().length > 1
                      },
                      get fallback() {
                        return G(Vt, {})
                      },
                      get children() {
                        const e = qo(),
                          t = e.firstChild
                        return (
                          t.style.setProperty(
                            'transition',
                            'width 150ms cubic-bezier(0.4, 0, 0.2, 1)'
                          ),
                          _(() =>
                            null != `${i() > 0 ? i : 10}%`
                              ? t.style.setProperty(
                                  'width',
                                  `${i() > 0 ? i : 10}%`
                                )
                              : t.style.removeProperty('width')
                          ),
                          e
                        )
                      },
                    })
                  },
                }),
                G(oe, {
                  get when() {
                    return !o()
                  },
                  get children() {
                    return [
                      (() => {
                        const n = Vo(),
                          o = n.firstChild
                        return (
                          me(
                            n,
                            G(te, {
                              get when() {
                                return t().length
                              },
                              get fallback() {
                                return G(tr, {})
                              },
                              get children() {
                                const e = Go(),
                                  n = e.firstChild
                                return (
                                  me(e, G(nr, {}), n),
                                  n.style.setProperty('bottom', '5px'),
                                  me(n, () => t().length),
                                  e
                                )
                              },
                            }),
                            o
                          ),
                          _(
                            () =>
                              (o.innerHTML =
                                e.block.options?.labels?.placeholder ??
                                Ho.labels.placeholder)
                          ),
                          n
                        )
                      })(),
                      (() => {
                        const t = Wo()
                        return (
                          t.addEventListener('change', (e) => {
                            e.currentTarget.files && u(e.currentTarget.files)
                          }),
                          _(
                            () =>
                              (t.multiple =
                                e.block.options?.isMultipleAllowed ??
                                Ho.isMultipleAllowed)
                          ),
                          t
                        )
                      })(),
                    ]
                  },
                }),
              ]
            },
          })
        ),
        me(
          n,
          G(te, {
            get when() {
              return 0 === t().length && !1 === e.block.options?.isRequired
            },
            get children() {
              const t = Ko()
              return (
                me(
                  t,
                  G(Kt, {
                    'on:click': v,
                    get children() {
                      return e.block.options?.labels?.skip ?? Ho.labels.skip
                    },
                  })
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          n,
          G(te, {
            get when() {
              return (
                T(
                  () => !!(e.block.options?.isMultipleAllowed && t().length > 0)
                )() && !o()
              )
            },
            get children() {
              const n = Yo(),
                o = n.firstChild
              return (
                me(
                  o,
                  G(te, {
                    get when() {
                      return t().length
                    },
                    get children() {
                      return G(Kt, {
                        variant: 'secondary',
                        'on:click': y,
                        get children() {
                          return (
                            e.block.options?.labels?.clear ?? Ho.labels.clear
                          )
                        },
                      })
                    },
                  }),
                  null
                ),
                me(
                  o,
                  G(Yt, {
                    type: 'submit',
                    disableIcon: !0,
                    get children() {
                      return T(
                        () =>
                          (e.block.options?.labels?.button ??
                            Ho.labels.button) === Ho.labels.button
                      )()
                        ? `Upload ${t().length} file${
                            t().length > 1 ? 's' : ''
                          }`
                        : e.block.options?.labels?.button
                    },
                  }),
                  null
                ),
                n
              )
            },
          }),
          null
        ),
        me(
          n,
          G(te, {
            get when() {
              return c()
            },
            get children() {
              const e = Zo()
              return me(e, c), e
            },
          }),
          null
        ),
        _(() =>
          ge(
            r,
            'typebot-upload-input py-6 flex flex-col justify-center items-center w-full bg-gray-50 border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 px-8 ' +
              (a() ? 'dragging-over' : '')
          )
        ),
        n
      )
    })()
  },
  tr = () => Jo(),
  nr = () => Qo(),
  or = (e) => {
    const t = e.split('/').pop()
    if (!t) return e
    const n = encodeURIComponent(t)
    return e.replace(t, n)
  }
;(function (e) {
  return (e.STRIPE = 'Stripe'), e
})({}).STRIPE
const rr = { button: 'Pay', success: 'Success' },
  ir = ue(
    '<div class="typebot-input-error-message mt-4 text-center animate-fade-in">'
  ),
  sr = ue(
    '<form id="payment-form" class="flex flex-col p-4 typebot-input w-full items-center"><slot name="stripe-payment-form">'
  )
let ar,
  lr = null,
  cr = null
const dr = (e) => {
    const [t, n] = k(),
      [o, r] = k(!1),
      [i, s] = k(!1)
    S(async () => {
      if ((ur(ar), !e.options?.publicKey)) return n('Missing Stripe public key')
      var t
      if (
        ((lr = await ((t = e.options?.publicKey),
        new Promise((e) => {
          if (window.Stripe) return e(window.Stripe(t))
          const n = document.createElement('script')
          ;(n.src = 'https://js.stripe.com/v3'),
            document.body.appendChild(n),
            (n.onload = () => {
              if (!window.Stripe) throw new Error('Stripe.js failed to load.')
              e(window.Stripe(t))
            })
        }))),
        !lr)
      )
        return
      cr = lr.elements({
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: getComputedStyle(ar).getPropertyValue(
              '--typebot-button-bg-color'
            ),
          },
        },
        clientSecret: e.options.paymentIntentSecret,
      })
      cr.create('payment', { layout: 'tabs' }).mount('#payment-element'),
        setTimeout(() => {
          r(!0), e.onTransitionEnd()
        }, 1e3)
    })
    const a = async (t) => {
      if ((t.preventDefault(), !lr || !cr)) return
      var o
      s(!0),
        (o = { sessionId: e.context.sessionId, typebot: e.context.typebot }),
        sessionStorage.setItem('typebotPaymentInProgress', JSON.stringify(o))
      const { postalCode: r, ...i } =
          e.options?.additionalInformation?.address ?? {},
        { error: a, paymentIntent: l } = await lr.confirmPayment({
          elements: cr,
          confirmParams: {
            return_url: window.location.href,
            payment_method_data: {
              billing_details: {
                name: e.options?.additionalInformation?.name,
                email: e.options?.additionalInformation?.email,
                phone: e.options?.additionalInformation?.phoneNumber,
                address: { ...i, postal_code: r },
              },
            },
          },
          redirect: 'if_required',
        })
      return (
        mt(),
        s(!1),
        'validation_error' !== a?.type
          ? 'card_error' === a?.type
            ? n(a.message)
            : a || 'succeeded' !== l.status
            ? void 0
            : e.onSuccess()
          : void 0
      )
    }
    return (() => {
      const n = sr(),
        r = n.firstChild
      n.addEventListener('submit', a)
      return (
        'function' == typeof ar ? be(ar, r) : (ar = r),
        (r._$owner = f),
        me(
          n,
          G(te, {
            get when() {
              return o()
            },
            get children() {
              return G(Yt, {
                get isLoading() {
                  return i()
                },
                class: 'mt-4 w-full max-w-lg animate-fade-in',
                disableIcon: !0,
                get children() {
                  return [
                    T(() => e.options?.labels?.button ?? rr.button),
                    ' ',
                    T(() => e.options?.amountLabel),
                  ]
                },
              })
            },
          }),
          null
        ),
        me(
          n,
          G(te, {
            get when() {
              return t()
            },
            get children() {
              const e = ir()
              return me(e, t), e
            },
          }),
          null
        ),
        n
      )
    })()
  },
  ur = (e) => {
    const t = e.getRootNode().host,
      n = document.createElement('div')
    ;(n.style.width = '100%'),
      (n.slot = 'stripe-payment-form'),
      t.appendChild(n)
    const o = document.createElement('div')
    ;(o.id = 'payment-element'), n.appendChild(o)
  },
  pr = (e) =>
    G(dr, {
      get onSuccess() {
        return e.onSuccess
      },
      get options() {
        return e.options
      },
      get context() {
        return e.context
      },
      get onTransitionEnd() {
        return e.onTransitionEnd
      },
    }),
  hr = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12">'
  ),
  gr = (e) =>
    (() => {
      const t = hr()
      return fe(t, e, !0, !0), t
    })(),
  fr = ue('<div>'),
  br = (e) =>
    (() => {
      const t = fr()
      return (
        me(
          t,
          G(te, {
            get when() {
              return e.isChecked
            },
            get children() {
              return G(gr, {})
            },
          })
        ),
        _(() =>
          ge(
            t,
            'w-4 h-4 typebot-checkbox' +
              (e.isChecked ? ' checked' : '') +
              (e.class ? ` ${e.class}` : '')
          )
        ),
        t
      )
    })(),
  mr = ue(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18">'
  ),
  yr = (e) =>
    (() => {
      const t = mr()
      return fe(t, e, !0, !0), t
    })(),
  vr = ue('<button class="w-5 h-5">'),
  wr = ue(
    '<div class="flex justify-between items-center gap-2 w-full pr-4"><input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'
  ),
  xr = (e) => {
    const [t, n] = k(''),
      [o, r] = X(e, ['onInput', 'ref']),
      i = () => {
        n(''), e.onClear()
      }
    return (() => {
      const s = wr(),
        a = s.firstChild
      a.$$input = (e) =>
        ((e) => {
          n(e), o.onInput(e)
        })(e.currentTarget.value)
      const l = e.ref
      return (
        'function' == typeof l ? be(l, a) : (e.ref = a),
        a.style.setProperty('font-size', '16px'),
        fe(
          a,
          Z(
            {
              get value() {
                return t()
              },
            },
            r
          ),
          !1,
          !1
        ),
        me(
          s,
          G(te, {
            get when() {
              return t().length > 0
            },
            get children() {
              const e = vr()
              return e.addEventListener('click', i), me(e, G(yr, {})), e
            },
          }),
          null
        ),
        s
      )
    })()
  }
pe(['input'])
const kr = ue('<div class="flex items-end typebot-input w-full">'),
  _r = ue('<form class="flex flex-col items-end gap-2 w-full"><div>'),
  $r = ue(
    '<span><div role="checkbox"><div class="flex items-center gap-2"><span>'
  ),
  Tr = ue(
    '<span><div role="checkbox" aria-checked class="w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable selected"><div class="flex items-center gap-2"><span>'
  ),
  Cr = (e) => {
    let t
    const [n, o] = k(e.defaultItems),
      [r, i] = k([])
    S(() => {
      !Ft() && t && t.focus()
    })
    const s = (e) => {
        a(e)
      },
      a = (e) => {
        const t = r().indexOf(e)
        i(-1 !== t ? (t) => t.filter((t) => t !== e) : (t) => [...t, e])
      },
      l = () =>
        e.onSubmit({
          value: r()
            .map((t) => e.defaultItems.find((e) => e.id === t)?.content)
            .join(', '),
        }),
      c = (t) => {
        o(
          e.defaultItems.filter((e) =>
            e.content?.toLowerCase().includes((t ?? '').toLowerCase())
          )
        )
      }
    return (() => {
      const i = _r(),
        a = i.firstChild
      return (
        i.addEventListener('submit', l),
        me(
          i,
          G(te, {
            get when() {
              return e.options?.isSearchable
            },
            get children() {
              const n = kr()
              return (
                me(
                  n,
                  G(xr, {
                    ref(e) {
                      'function' == typeof t ? t(e) : (t = e)
                    },
                    onInput: c,
                    get placeholder() {
                      return e.options?.searchInputPlaceholder ?? Ne
                    },
                    onClear: () => o(e.defaultItems),
                  })
                ),
                n
              )
            },
          }),
          a
        ),
        me(
          a,
          G(ee, {
            get each() {
              return n()
            },
            children: (e) =>
              (() => {
                const t = $r(),
                  n = t.firstChild,
                  o = n.firstChild,
                  i = o.firstChild
                return (
                  n.addEventListener('click', () => s(e.id)),
                  me(
                    o,
                    G(br, {
                      get isChecked() {
                        return r().some((t) => t === e.id)
                      },
                      class: 'flex-shrink-0',
                    }),
                    i
                  ),
                  me(i, () => e.content),
                  _(
                    (o) => {
                      const i = 'relative' + (Ft() ? ' w-full' : ''),
                        s = r().some((t) => t === e.id),
                        a =
                          'w-full py-2 px-4 font-semibold focus:outline-none cursor-pointer select-none typebot-selectable' +
                          (r().some((t) => t === e.id) ? ' selected' : ''),
                        l = e.id
                      return (
                        i !== o._v$ && ge(t, (o._v$ = i)),
                        s !== o._v$2 && he(n, 'aria-checked', (o._v$2 = s)),
                        a !== o._v$3 && ge(n, (o._v$3 = a)),
                        l !== o._v$4 && he(n, 'data-itemid', (o._v$4 = l)),
                        o
                      )
                    },
                    { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
                  ),
                  t
                )
              })(),
          }),
          null
        ),
        me(
          a,
          G(ee, {
            get each() {
              return r().filter((e) => n().every((t) => t.id !== e))
            },
            children: (t) =>
              (() => {
                const n = Tr(),
                  o = n.firstChild,
                  r = o.firstChild,
                  i = r.firstChild
                return (
                  o.addEventListener('click', () => s(t)),
                  he(o, 'data-itemid', t),
                  me(r, G(br, { isChecked: !0 }), i),
                  me(i, () => e.defaultItems.find((e) => e.id === t)?.content),
                  _(() => ge(n, 'relative' + (Ft() ? ' w-full' : ''))),
                  n
                )
              })(),
          }),
          null
        ),
        me(
          i,
          (() => {
            const t = T(() => r().length > 0)
            return () =>
              t() &&
              G(Yt, {
                disableIcon: !0,
                get children() {
                  return e.options?.buttonLabel ?? Me
                },
              })
          })(),
          null
        ),
        _(() =>
          ge(
            a,
            'flex flex-wrap justify-end gap-2' +
              (e.options?.isSearchable
                ? ' overflow-y-scroll max-h-80 rounded-md'
                : '')
          )
        ),
        i
      )
    })()
  },
  Sr = ue('<div class="flex items-end typebot-input w-full">'),
  Er = ue('<div class="flex flex-col gap-2 w-full"><div>'),
  Ar = ue('<span>'),
  Ir = ue(
    '<span class="flex h-3 w-3 absolute top-0 right-0 -mt-1 -mr-1 ping"><span class="animate-ping absolute inline-flex h-full w-full rounded-full brightness-200 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 brightness-150">'
  ),
  Pr = (e) => {
    let t
    const [n, o] = k(e.defaultItems)
    S(() => {
      !Ft() && t && t.focus()
    })
    const r = (t) => {
      o(
        e.defaultItems.filter((e) =>
          e.content?.toLowerCase().includes((t ?? '').toLowerCase())
        )
      )
    }
    return (() => {
      const i = Er(),
        s = i.firstChild
      return (
        me(
          i,
          G(te, {
            get when() {
              return e.options?.isSearchable
            },
            get children() {
              const n = Sr()
              return (
                me(
                  n,
                  G(xr, {
                    ref(e) {
                      'function' == typeof t ? t(e) : (t = e)
                    },
                    onInput: r,
                    get placeholder() {
                      return e.options?.searchInputPlaceholder ?? Ne
                    },
                    onClear: () => o(e.defaultItems),
                  })
                ),
                n
              )
            },
          }),
          s
        ),
        me(
          s,
          G(ee, {
            get each() {
              return n()
            },
            children: (t, o) =>
              (() => {
                const r = Ar()
                return (
                  me(
                    r,
                    G(Kt, {
                      'on:click': () => {
                        return (
                          (t = o()), e.onSubmit({ value: n()[t].content ?? '' })
                        )
                        var t
                      },
                      get 'data-itemid'() {
                        return t.id
                      },
                      class: 'w-full',
                      get children() {
                        return t.content
                      },
                    }),
                    null
                  ),
                  me(
                    r,
                    (() => {
                      const t = T(
                        () =>
                          !(0 !== e.inputIndex || 1 !== e.defaultItems.length)
                      )
                      return () => t() && Ir()
                    })(),
                    null
                  ),
                  _(() => ge(r, 'relative' + (Ft() ? ' w-full' : ''))),
                  r
                )
              })(),
          })
        ),
        _(() =>
          ge(
            s,
            'flex flex-wrap justify-end gap-2' +
              (e.options?.isSearchable
                ? ' overflow-y-scroll max-h-80 rounded-md'
                : '')
          )
        ),
        i
      )
    })()
  },
  Rr = ue('<div class="flex items-end typebot-input w-full">'),
  Lr = ue('<div class="flex flex-col gap-2 w-full"><div>'),
  Mr = ue(
    '<button><img fetchpriority="high" class="m-auto"><div><span class="font-semibold"></span><span class="text-sm whitespace-pre-wrap text-left">'
  ),
  Nr = (e) => {
    let t
    const [n, o] = k(e.defaultItems),
      [r, i] = k(0)
    S(() => {
      !Ft() && t && t.focus()
    })
    const s = (t) => {
      o(
        e.defaultItems.filter(
          (e) =>
            e.title?.toLowerCase().includes((t ?? '').toLowerCase()) ||
            e.description?.toLowerCase().includes((t ?? '').toLowerCase())
        )
      )
    }
    $(() => {
      r() === e.defaultItems.filter((e) => Be(e.pictureSrc)).length &&
        e.onTransitionEnd()
    })
    const a = () => {
      i((e) => e + 1)
    }
    return (() => {
      const r = Lr(),
        i = r.firstChild
      return (
        me(
          r,
          G(te, {
            get when() {
              return e.options?.isSearchable
            },
            get children() {
              const n = Rr()
              return (
                me(
                  n,
                  G(xr, {
                    ref(e) {
                      'function' == typeof t ? t(e) : (t = e)
                    },
                    onInput: s,
                    get placeholder() {
                      return e.options?.searchInputPlaceholder ?? ''
                    },
                    onClear: () => o(e.defaultItems),
                  })
                ),
                n
              )
            },
          }),
          i
        ),
        me(
          i,
          G(ee, {
            get each() {
              return n()
            },
            children: (t, o) =>
              (() => {
                const r = Mr(),
                  i = r.firstChild,
                  s = i.nextSibling,
                  l = s.firstChild,
                  c = l.nextSibling
                return (
                  r.addEventListener('click', () =>
                    ((t) => {
                      const o = n()[t]
                      return e.onSubmit({
                        label: o.title ?? o.pictureSrc ?? o.id,
                        value: o.id,
                      })
                    })(o())
                  ),
                  i.addEventListener('load', a),
                  me(l, () => t.title),
                  me(c, () => t.description),
                  _(
                    (e) => {
                      const n = t.id,
                        a =
                          'flex flex-col typebot-picture-button focus:outline-none filter hover:brightness-90 active:brightness-75 justify-between  ' +
                          (Fe(t.pictureSrc) ? 'has-svg' : ''),
                        l = t.pictureSrc,
                        c = t.title ?? `Picture ${o() + 1}`,
                        d = `Picture choice ${o() + 1}`,
                        u =
                          'flex flex-col gap-1 py-2 flex-shrink-0 px-4 w-full' +
                          (t.description ? ' items-start' : '')
                      return (
                        n !== e._v$ && he(r, 'data-itemid', (e._v$ = n)),
                        a !== e._v$2 && ge(r, (e._v$2 = a)),
                        l !== e._v$3 && he(i, 'src', (e._v$3 = l)),
                        c !== e._v$4 && he(i, 'alt', (e._v$4 = c)),
                        d !== e._v$5 && he(i, 'elementtiming', (e._v$5 = d)),
                        u !== e._v$6 && ge(s, (e._v$6 = u)),
                        e
                      )
                    },
                    {
                      _v$: void 0,
                      _v$2: void 0,
                      _v$3: void 0,
                      _v$4: void 0,
                      _v$5: void 0,
                      _v$6: void 0,
                    }
                  ),
                  r
                )
              })(),
          })
        ),
        _(() =>
          ge(
            i,
            'gap-2 flex flex-wrap justify-end' +
              (e.options?.isSearchable
                ? ' overflow-y-scroll max-h-[464px] rounded-md'
                : '')
          )
        ),
        r
      )
    })()
  },
  Or = Re,
  Br = 'Filter the options...',
  zr = ue('<div class="flex items-end typebot-input w-full">'),
  Dr = ue('<form class="flex flex-col gap-2 w-full items-end"><div>'),
  jr = ue('<span class="font-semibold">'),
  Fr = ue('<span class="text-sm whitespace-pre-wrap text-left">'),
  Ur = ue('<div class="flex flex-col gap-1 ">'),
  Hr = ue(
    '<div role="checkbox"><img fetchpriority="high" class="m-auto"><div>'
  ),
  qr = ue(
    '<div role="checkbox" aria-checked class="flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture selected"><img fetchpriority="high"><div>'
  ),
  Gr = (e) => {
    let t
    const [n, o] = k(e.defaultItems),
      [r, i] = k([]),
      [s, a] = k(0)
    S(() => {
      !Ft() && t && t.focus()
    })
    const l = (e) => {
        c(e)
      },
      c = (e) => {
        const t = r().indexOf(e)
        i(-1 !== t ? (t) => t.filter((t) => t !== e) : (t) => [...t, e])
      },
      d = () =>
        e.onSubmit({
          value: r()
            .map((t) => {
              const n = e.defaultItems.find((e) => e.id === t)
              return n?.title ?? n?.pictureSrc
            })
            .join(', '),
        }),
      u = (t) => {
        o(
          e.defaultItems.filter(
            (e) =>
              e.title?.toLowerCase().includes((t ?? '').toLowerCase()) ||
              e.description?.toLowerCase().includes((t ?? '').toLowerCase())
          )
        )
      }
    $(() => {
      s() === e.defaultItems.filter((e) => Be(e.pictureSrc)).length &&
        e.onTransitionEnd()
    })
    const p = () => {
      a((e) => e + 1)
    }
    return (() => {
      const i = Dr(),
        s = i.firstChild
      return (
        i.addEventListener('submit', d),
        me(
          i,
          G(te, {
            get when() {
              return e.options?.isSearchable
            },
            get children() {
              const n = zr()
              return (
                me(
                  n,
                  G(xr, {
                    ref(e) {
                      'function' == typeof t ? t(e) : (t = e)
                    },
                    onInput: u,
                    get placeholder() {
                      return e.options?.searchInputPlaceholder ?? Br
                    },
                    onClear: () => o(e.defaultItems),
                  })
                ),
                n
              )
            },
          }),
          s
        ),
        me(
          s,
          G(ee, {
            get each() {
              return n()
            },
            children: (e, t) =>
              (() => {
                const n = Hr(),
                  o = n.firstChild,
                  i = o.nextSibling
                return (
                  n.addEventListener('click', () => l(e.id)),
                  o.addEventListener('load', p),
                  me(
                    i,
                    G(br, {
                      get isChecked() {
                        return r().some((t) => t === e.id)
                      },
                      get class() {
                        return (
                          'flex-shrink-0' +
                          (e.title || e.description ? ' mt-1' : void 0)
                        )
                      },
                    }),
                    null
                  ),
                  me(
                    i,
                    G(te, {
                      get when() {
                        return e.title || e.description
                      },
                      get children() {
                        const t = Ur()
                        return (
                          me(
                            t,
                            G(te, {
                              get when() {
                                return e.title
                              },
                              get children() {
                                const t = jr()
                                return me(t, () => e.title), t
                              },
                            }),
                            null
                          ),
                          me(
                            t,
                            G(te, {
                              get when() {
                                return e.description
                              },
                              get children() {
                                const t = Fr()
                                return me(t, () => e.description), t
                              },
                            }),
                            null
                          ),
                          t
                        )
                      },
                    }),
                    null
                  ),
                  _(
                    (s) => {
                      const a = r().some((t) => t === e.id),
                        l =
                          'flex flex-col focus:outline-none cursor-pointer select-none typebot-selectable-picture' +
                          (r().some((t) => t === e.id) ? ' selected' : '') +
                          (Fe(e.pictureSrc) ? ' has-svg' : ''),
                        c = e.id,
                        d = e.pictureSrc,
                        u = e.title ?? `Picture ${t() + 1}`,
                        p = `Picture choice ${t() + 1}`,
                        h =
                          'flex gap-3 py-2 flex-shrink-0' +
                          (De(e.title) && De(e.description)
                            ? ' justify-center'
                            : ' px-3')
                      return (
                        a !== s._v$ && he(n, 'aria-checked', (s._v$ = a)),
                        l !== s._v$2 && ge(n, (s._v$2 = l)),
                        c !== s._v$3 && he(n, 'data-itemid', (s._v$3 = c)),
                        d !== s._v$4 && he(o, 'src', (s._v$4 = d)),
                        u !== s._v$5 && he(o, 'alt', (s._v$5 = u)),
                        p !== s._v$6 && he(o, 'elementtiming', (s._v$6 = p)),
                        h !== s._v$7 && ge(i, (s._v$7 = h)),
                        s
                      )
                    },
                    {
                      _v$: void 0,
                      _v$2: void 0,
                      _v$3: void 0,
                      _v$4: void 0,
                      _v$5: void 0,
                      _v$6: void 0,
                      _v$7: void 0,
                    }
                  ),
                  n
                )
              })(),
          }),
          null
        ),
        me(
          s,
          G(ee, {
            get each() {
              return r()
                .filter((e) => n().every((t) => t.id !== e))
                .map((t) => e.defaultItems.find((e) => e.id === t))
                .filter(Be)
            },
            children: (t, n) =>
              (() => {
                const o = qr(),
                  i = o.firstChild,
                  s = i.nextSibling
                return (
                  o.addEventListener('click', () => l(t.id)),
                  me(
                    s,
                    G(br, {
                      get isChecked() {
                        return r().some((e) => e === t.id)
                      },
                      get class() {
                        return (
                          'flex-shrink-0' +
                          (t.title || t.description ? ' mt-1' : void 0)
                        )
                      },
                    }),
                    null
                  ),
                  me(
                    s,
                    G(te, {
                      get when() {
                        return t.title || t.description
                      },
                      get children() {
                        const e = Ur()
                        return (
                          me(
                            e,
                            G(te, {
                              get when() {
                                return t.title
                              },
                              get children() {
                                const e = jr()
                                return me(e, () => t.title), e
                              },
                            }),
                            null
                          ),
                          me(
                            e,
                            G(te, {
                              get when() {
                                return t.description
                              },
                              get children() {
                                const e = Fr()
                                return me(e, () => t.description), e
                              },
                            }),
                            null
                          ),
                          e
                        )
                      },
                    }),
                    null
                  ),
                  _(
                    (r) => {
                      const a = t.id,
                        l = e.defaultItems.find(
                          (e) => e.id === t.id
                        )?.pictureSrc,
                        c = t.title ?? `Selected picture ${n() + 1}`,
                        d = `Selected picture choice ${n() + 1}`,
                        u =
                          'flex gap-3 py-2 flex-shrink-0' +
                          (De(t.title) && De(t.description)
                            ? ' justify-center'
                            : ' pl-4')
                      return (
                        a !== r._v$8 && he(o, 'data-itemid', (r._v$8 = a)),
                        l !== r._v$9 && he(i, 'src', (r._v$9 = l)),
                        c !== r._v$10 && he(i, 'alt', (r._v$10 = c)),
                        d !== r._v$11 && he(i, 'elementtiming', (r._v$11 = d)),
                        u !== r._v$12 && ge(s, (r._v$12 = u)),
                        r
                      )
                    },
                    {
                      _v$8: void 0,
                      _v$9: void 0,
                      _v$10: void 0,
                      _v$11: void 0,
                      _v$12: void 0,
                    }
                  ),
                  o
                )
              })(),
          }),
          null
        ),
        me(
          i,
          (() => {
            const t = T(() => r().length > 0)
            return () =>
              t() &&
              G(Yt, {
                disableIcon: !0,
                get children() {
                  return e.options?.buttonLabel ?? Or
                },
              })
          })(),
          null
        ),
        _(() =>
          ge(
            s,
            'flex flex-wrap justify-end gap-2' +
              (e.options?.isSearchable
                ? ' overflow-y-scroll max-h-[464px] rounded-md'
                : '')
          )
        ),
        i
      )
    })()
  },
  [Vr, Wr] = k([])
let Kr = (function (e) {
  return (e.COLOR = 'Color'), (e.IMAGE = 'Image'), (e.NONE = 'None'), e
})({})
const Yr = {
    chat: {
      roundness: 'medium',
      hostBubbles: { backgroundColor: '#F7F8FF', color: '#303235' },
      guestBubbles: { backgroundColor: '#FF8E21', color: '#FFFFFF' },
      buttons: { backgroundColor: '#0042DA', color: '#FFFFFF' },
      inputs: {
        backgroundColor: '#FFFFFF',
        color: '#303235',
        placeholderColor: '#9095A0',
      },
      hostAvatar: { isEnabled: !0 },
      guestAvatar: { isEnabled: !1 },
    },
    general: {
      font: { type: 'Google', family: 'Open Sans' },
      background: { type: Kr.COLOR, content: '#ffffff' },
      progressBar: {
        isEnabled: !1,
        color: '#0042DA',
        backgroundColor: '#e0edff',
        thickness: 4,
        position: 'fixed',
        placement: 'Top',
      },
    },
  },
  Zr = ue('<div class="flex justify-end animate-fade-in gap-2">'),
  Xr = ue('<div>'),
  Jr = (e) => {
    const [t, n] = k(),
      [o, r] = k(),
      i = async ({ label: t, value: o }) => {
        n(t ?? o), e.onSubmit(o ?? t)
      },
      s = (t) => {
        n(t), e.onSkip()
      }
    return (
      $(() => {
        const t = Vr().findLast(
          (t) => e.inputIndex === t.inputIndex
        )?.formattedMessage
        t && r(t)
      }),
      G(ne, {
        get children() {
          return [
            G(oe, {
              get when() {
                return t() && !e.hasError
              },
              get children() {
                return G(ro, {
                  get message() {
                    return o() ?? t()
                  },
                  get showAvatar() {
                    return (
                      e.guestAvatar?.isEnabled ?? Yr.chat.guestAvatar.isEnabled
                    )
                  },
                  get avatarSrc() {
                    return e.guestAvatar?.url && e.guestAvatar.url
                  },
                })
              },
            }),
            G(oe, {
              get when() {
                return ze(t()) || e.hasError
              },
              get children() {
                const n = Zr(),
                  o = e.ref
                return (
                  'function' == typeof o ? be(o, n) : (e.ref = n),
                  me(
                    n,
                    (() => {
                      const t = T(() => !!e.hasHostAvatar)
                      return () =>
                        t() &&
                        (() => {
                          const e = Xr()
                          return (
                            _(() =>
                              ge(
                                e,
                                'flex flex-shrink-0 items-center ' +
                                  (Ft() ? 'w-6 h-6' : 'w-10 h-10')
                              )
                            ),
                            e
                          )
                        })()
                    })(),
                    null
                  ),
                  me(
                    n,
                    G(Qr, {
                      get context() {
                        return e.context
                      },
                      get block() {
                        return e.block
                      },
                      get inputIndex() {
                        return e.inputIndex
                      },
                      get isInputPrefillEnabled() {
                        return e.isInputPrefillEnabled
                      },
                      get existingAnswer() {
                        return T(() => !!e.hasError)() ? t() : void 0
                      },
                      get onTransitionEnd() {
                        return e.onTransitionEnd
                      },
                      onSubmit: i,
                      onSkip: s,
                    }),
                    null
                  ),
                  _(() => he(n, 'data-blockid', e.block.id)),
                  n
                )
              },
            }),
          ]
        },
      })
    )
  },
  Qr = (e) => {
    const t = (t) => e.onSubmit(t),
      n = () =>
        e.existingAnswer ??
        (e.isInputPrefillEnabled ? e.block.prefilledValue : void 0),
      o = () =>
        e.onSubmit({ value: e.block.options?.labels?.success ?? rr.success })
    return G(ne, {
      get children() {
        return [
          G(oe, {
            get when() {
              return e.block.type === Le.TEXT
            },
            get children() {
              return G(ao, {
                get block() {
                  return e.block
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.NUMBER
            },
            get children() {
              return G(uo, {
                get block() {
                  return e.block
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.EMAIL
            },
            get children() {
              return G(go, {
                get block() {
                  return e.block
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.URL
            },
            get children() {
              return G(mo, {
                get block() {
                  return e.block
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.PHONE
            },
            get children() {
              return G($o, {
                get labels() {
                  return e.block.options?.labels
                },
                get defaultCountryCode() {
                  return e.block.options?.defaultCountryCode
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.DATE
            },
            get children() {
              return G(Ao, {
                get options() {
                  return e.block.options
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return ei(e.block)
            },
            keyed: !0,
            children: (n) =>
              G(ne, {
                get children() {
                  return [
                    G(oe, {
                      get when() {
                        return !n.options?.isMultipleChoice
                      },
                      get children() {
                        return G(Pr, {
                          get inputIndex() {
                            return e.inputIndex
                          },
                          get defaultItems() {
                            return n.items
                          },
                          get options() {
                            return n.options
                          },
                          onSubmit: t,
                        })
                      },
                    }),
                    G(oe, {
                      get when() {
                        return n.options?.isMultipleChoice
                      },
                      get children() {
                        return G(Cr, {
                          get inputIndex() {
                            return e.inputIndex
                          },
                          get defaultItems() {
                            return n.items
                          },
                          get options() {
                            return n.options
                          },
                          onSubmit: t,
                        })
                      },
                    }),
                  ]
                },
              }),
          }),
          G(oe, {
            get when() {
              return ti(e.block)
            },
            keyed: !0,
            children: (n) =>
              G(ne, {
                get children() {
                  return [
                    G(oe, {
                      get when() {
                        return !n.options?.isMultipleChoice
                      },
                      get children() {
                        return G(Nr, {
                          get defaultItems() {
                            return n.items
                          },
                          get options() {
                            return n.options
                          },
                          onSubmit: t,
                          get onTransitionEnd() {
                            return e.onTransitionEnd
                          },
                        })
                      },
                    }),
                    G(oe, {
                      get when() {
                        return n.options?.isMultipleChoice
                      },
                      get children() {
                        return G(Gr, {
                          get defaultItems() {
                            return n.items
                          },
                          get options() {
                            return n.options
                          },
                          onSubmit: t,
                          get onTransitionEnd() {
                            return e.onTransitionEnd
                          },
                        })
                      },
                    }),
                  ]
                },
              }),
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.RATING
            },
            get children() {
              return G(Do, {
                get block() {
                  return e.block
                },
                get defaultValue() {
                  return n()
                },
                onSubmit: t,
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.FILE
            },
            get children() {
              return G(er, {
                get context() {
                  return e.context
                },
                get block() {
                  return e.block
                },
                onSubmit: t,
                get onSkip() {
                  return e.onSkip
                },
              })
            },
          }),
          G(oe, {
            get when() {
              return e.block.type === Le.PAYMENT
            },
            get children() {
              return G(pr, {
                get context() {
                  return e.context
                },
                get options() {
                  return { ...e.block.options, ...e.block.runtimeOptions }
                },
                onSuccess: o,
                get onTransitionEnd() {
                  return e.onTransitionEnd
                },
              })
            },
          }),
        ]
      },
    })
  },
  ei = (e) => (e?.type === Le.CHOICE ? e : void 0),
  ti = (e) => (e?.type === Le.PICTURE_CHOICE ? e : void 0),
  ni = ue('<div><div>'),
  oi = (e) => {
    let t
    const [n, o] = k(0),
      r = new ResizeObserver((e) =>
        o(e[0].target.clientHeight - (Ft() ? 24 : 40))
      )
    return (
      S(() => {
        t && r.observe(t)
      }),
      E(() => {
        t && r.unobserve(t)
      }),
      (() => {
        const o = ni(),
          r = o.firstChild
        return (
          'function' == typeof t ? be(t, o) : (t = o),
          r.style.setProperty(
            'transition',
            'top 350ms ease-out, opacity 250ms ease-out'
          ),
          me(
            r,
            G(no, {
              get initialAvatarSrc() {
                return e.hostAvatarSrc
              },
            })
          ),
          _(
            (t) => {
              const i =
                  'flex flex-shrink-0 items-center relative typebot-avatar-container ' +
                  (Ft() ? 'w-6' : 'w-10'),
                s =
                  'absolute flex items-center top-0' +
                  (Ft() ? ' w-6 h-6' : ' w-10 h-10') +
                  (e.hideAvatar ? ' opacity-0' : ' opacity-100'),
                a = `${n()}px`
              return (
                i !== t._v$ && ge(o, (t._v$ = i)),
                s !== t._v$2 && ge(r, (t._v$2 = s)),
                a !== t._v$3 &&
                  (null != (t._v$3 = a)
                    ? r.style.setProperty('top', a)
                    : r.style.removeProperty('top')),
                t
              )
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0 }
          ),
          o
        )
      })()
    )
  },
  [ri, ii] = k()
function si() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  }
}
let ai = {
  async: !1,
  breaks: !1,
  extensions: null,
  gfm: !0,
  hooks: null,
  pedantic: !1,
  renderer: null,
  silent: !1,
  tokenizer: null,
  walkTokens: null,
}
function li(e) {
  ai = e
}
const ci = /[&<>"']/,
  di = new RegExp(ci.source, 'g'),
  ui = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  pi = new RegExp(ui.source, 'g'),
  hi = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
  gi = (e) => hi[e]
function fi(e, t) {
  if (t) {
    if (ci.test(e)) return e.replace(di, gi)
  } else if (ui.test(e)) return e.replace(pi, gi)
  return e
}
const bi = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
function mi(e) {
  return e.replace(bi, (e, t) =>
    'colon' === (t = t.toLowerCase())
      ? ':'
      : '#' === t.charAt(0)
      ? 'x' === t.charAt(1)
        ? String.fromCharCode(parseInt(t.substring(2), 16))
        : String.fromCharCode(+t.substring(1))
      : ''
  )
}
const yi = /(^|[^\[])\^/g
function vi(e, t) {
  ;(e = 'string' == typeof e ? e : e.source), (t = t || '')
  const n = {
    replace: (t, o) => (
      (o = (o = 'object' == typeof o && 'source' in o ? o.source : o).replace(
        yi,
        '$1'
      )),
      (e = e.replace(t, o)),
      n
    ),
    getRegex: () => new RegExp(e, t),
  }
  return n
}
function wi(e) {
  try {
    e = encodeURI(e).replace(/%25/g, '%')
  } catch (e) {
    return null
  }
  return e
}
const xi = { exec: () => null }
function ki(e, t) {
  const n = e
    .replace(/\|/g, (e, t, n) => {
      let o = !1,
        r = t
      for (; --r >= 0 && '\\' === n[r]; ) o = !o
      return o ? '|' : ' |'
    })
    .split(/ \|/)
  let o = 0
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !n[n.length - 1].trim() && n.pop(),
    t)
  )
    if (n.length > t) n.splice(t)
    else for (; n.length < t; ) n.push('')
  for (; o < n.length; o++) n[o] = n[o].trim().replace(/\\\|/g, '|')
  return n
}
function _i(e, t, n) {
  const o = e.length
  if (0 === o) return ''
  let r = 0
  for (; r < o; ) {
    const i = e.charAt(o - r - 1)
    if (i !== t || n) {
      if (i === t || !n) break
      r++
    } else r++
  }
  return e.slice(0, o - r)
}
function $i(e, t, n, o) {
  const r = t.href,
    i = t.title ? fi(t.title) : null,
    s = e[1].replace(/\\([\[\]])/g, '$1')
  if ('!' !== e[0].charAt(0)) {
    o.state.inLink = !0
    const e = {
      type: 'link',
      raw: n,
      href: r,
      title: i,
      text: s,
      tokens: o.inlineTokens(s),
    }
    return (o.state.inLink = !1), e
  }
  return { type: 'image', raw: n, href: r, title: i, text: fi(s) }
}
class Ti {
  options
  rules
  lexer
  constructor(e) {
    this.options = e || ai
  }
  space(e) {
    const t = this.rules.block.newline.exec(e)
    if (t && t[0].length > 0) return { type: 'space', raw: t[0] }
  }
  code(e) {
    const t = this.rules.block.code.exec(e)
    if (t) {
      const e = t[0].replace(/^ {1,4}/gm, '')
      return {
        type: 'code',
        raw: t[0],
        codeBlockStyle: 'indented',
        text: this.options.pedantic ? e : _i(e, '\n'),
      }
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e)
    if (t) {
      const e = t[0],
        n = (function (e, t) {
          const n = e.match(/^(\s+)(?:```)/)
          if (null === n) return t
          const o = n[1]
          return t
            .split('\n')
            .map((e) => {
              const t = e.match(/^\s+/)
              if (null === t) return e
              const [n] = t
              return n.length >= o.length ? e.slice(o.length) : e
            })
            .join('\n')
        })(e, t[3] || '')
      return {
        type: 'code',
        raw: e,
        lang: t[2]
          ? t[2].trim().replace(this.rules.inline._escapes, '$1')
          : t[2],
        text: n,
      }
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e)
    if (t) {
      let e = t[2].trim()
      if (/#$/.test(e)) {
        const t = _i(e, '#')
        this.options.pedantic
          ? (e = t.trim())
          : (t && !/ $/.test(t)) || (e = t.trim())
      }
      return {
        type: 'heading',
        raw: t[0],
        depth: t[1].length,
        text: e,
        tokens: this.lexer.inline(e),
      }
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e)
    if (t) return { type: 'hr', raw: t[0] }
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e)
    if (t) {
      const e = t[0].replace(/^ *>[ \t]?/gm, ''),
        n = this.lexer.state.top
      this.lexer.state.top = !0
      const o = this.lexer.blockTokens(e)
      return (
        (this.lexer.state.top = n),
        { type: 'blockquote', raw: t[0], tokens: o, text: e }
      )
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e)
    if (t) {
      let n = t[1].trim()
      const o = n.length > 1,
        r = {
          type: 'list',
          raw: '',
          ordered: o,
          start: o ? +n.slice(0, -1) : '',
          loose: !1,
          items: [],
        }
      ;(n = o ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
        this.options.pedantic && (n = o ? n : '[*+-]')
      const i = new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`)
      let s = '',
        a = '',
        l = !1
      for (; e; ) {
        let n = !1
        if (!(t = i.exec(e))) break
        if (this.rules.block.hr.test(e)) break
        ;(s = t[0]), (e = e.substring(s.length))
        let o = t[2]
            .split('\n', 1)[0]
            .replace(/^\t+/, (e) => ' '.repeat(3 * e.length)),
          c = e.split('\n', 1)[0],
          d = 0
        this.options.pedantic
          ? ((d = 2), (a = o.trimStart()))
          : ((d = t[2].search(/[^ ]/)),
            (d = d > 4 ? 1 : d),
            (a = o.slice(d)),
            (d += t[1].length))
        let u = !1
        if (
          (!o &&
            /^ *$/.test(c) &&
            ((s += c + '\n'), (e = e.substring(c.length + 1)), (n = !0)),
          !n)
        ) {
          const t = new RegExp(
              `^ {0,${Math.min(
                3,
                d - 1
              )}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`
            ),
            n = new RegExp(
              `^ {0,${Math.min(
                3,
                d - 1
              )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
            ),
            r = new RegExp(`^ {0,${Math.min(3, d - 1)}}(?:\`\`\`|~~~)`),
            i = new RegExp(`^ {0,${Math.min(3, d - 1)}}#`)
          for (; e; ) {
            const l = e.split('\n', 1)[0]
            if (
              ((c = l),
              this.options.pedantic &&
                (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')),
              r.test(c))
            )
              break
            if (i.test(c)) break
            if (t.test(c)) break
            if (n.test(e)) break
            if (c.search(/[^ ]/) >= d || !c.trim()) a += '\n' + c.slice(d)
            else {
              if (u) break
              if (o.search(/[^ ]/) >= 4) break
              if (r.test(o)) break
              if (i.test(o)) break
              if (n.test(o)) break
              a += '\n' + c
            }
            u || c.trim() || (u = !0),
              (s += l + '\n'),
              (e = e.substring(l.length + 1)),
              (o = c.slice(d))
          }
        }
        r.loose || (l ? (r.loose = !0) : /\n *\n *$/.test(s) && (l = !0))
        let p,
          h = null
        this.options.gfm &&
          ((h = /^\[[ xX]\] /.exec(a)),
          h && ((p = '[ ] ' !== h[0]), (a = a.replace(/^\[[ xX]\] +/, '')))),
          r.items.push({
            type: 'list_item',
            raw: s,
            task: !!h,
            checked: p,
            loose: !1,
            text: a,
            tokens: [],
          }),
          (r.raw += s)
      }
      ;(r.items[r.items.length - 1].raw = s.trimEnd()),
        (r.items[r.items.length - 1].text = a.trimEnd()),
        (r.raw = r.raw.trimEnd())
      for (let e = 0; e < r.items.length; e++)
        if (
          ((this.lexer.state.top = !1),
          (r.items[e].tokens = this.lexer.blockTokens(r.items[e].text, [])),
          !r.loose)
        ) {
          const t = r.items[e].tokens.filter((e) => 'space' === e.type),
            n = t.length > 0 && t.some((e) => /\n.*\n/.test(e.raw))
          r.loose = n
        }
      if (r.loose)
        for (let e = 0; e < r.items.length; e++) r.items[e].loose = !0
      return r
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e)
    if (t) {
      return {
        type: 'html',
        block: !0,
        raw: t[0],
        pre: 'pre' === t[1] || 'script' === t[1] || 'style' === t[1],
        text: t[0],
      }
    }
  }
  def(e) {
    const t = this.rules.block.def.exec(e)
    if (t) {
      const e = t[1].toLowerCase().replace(/\s+/g, ' '),
        n = t[2]
          ? t[2]
              .replace(/^<(.*)>$/, '$1')
              .replace(this.rules.inline._escapes, '$1')
          : '',
        o = t[3]
          ? t[3]
              .substring(1, t[3].length - 1)
              .replace(this.rules.inline._escapes, '$1')
          : t[3]
      return { type: 'def', tag: e, raw: t[0], href: n, title: o }
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e)
    if (t) {
      if (!/[:|]/.test(t[2])) return
      const e = {
        type: 'table',
        raw: t[0],
        header: ki(t[1]).map((e) => ({ text: e, tokens: [] })),
        align: t[2].replace(/^\||\| *$/g, '').split('|'),
        rows:
          t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, '').split('\n') : [],
      }
      if (e.header.length === e.align.length) {
        let t,
          n,
          o,
          r,
          i = e.align.length
        for (t = 0; t < i; t++) {
          const n = e.align[t]
          n &&
            (/^ *-+: *$/.test(n)
              ? (e.align[t] = 'right')
              : /^ *:-+: *$/.test(n)
              ? (e.align[t] = 'center')
              : /^ *:-+ *$/.test(n)
              ? (e.align[t] = 'left')
              : (e.align[t] = null))
        }
        for (i = e.rows.length, t = 0; t < i; t++)
          e.rows[t] = ki(e.rows[t], e.header.length).map((e) => ({
            text: e,
            tokens: [],
          }))
        for (i = e.header.length, n = 0; n < i; n++)
          e.header[n].tokens = this.lexer.inline(e.header[n].text)
        for (i = e.rows.length, n = 0; n < i; n++)
          for (r = e.rows[n], o = 0; o < r.length; o++)
            r[o].tokens = this.lexer.inline(r[o].text)
        return e
      }
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e)
    if (t)
      return {
        type: 'heading',
        raw: t[0],
        depth: '=' === t[2].charAt(0) ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1]),
      }
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e)
    if (t) {
      const e = '\n' === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1]
      return {
        type: 'paragraph',
        raw: t[0],
        text: e,
        tokens: this.lexer.inline(e),
      }
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e)
    if (t)
      return {
        type: 'text',
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0]),
      }
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e)
    if (t) return { type: 'escape', raw: t[0], text: fi(t[1]) }
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e)
    if (t)
      return (
        !this.lexer.state.inLink && /^<a /i.test(t[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(t[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: 'html',
          raw: t[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: t[0],
        }
      )
  }
  link(e) {
    const t = this.rules.inline.link.exec(e)
    if (t) {
      const e = t[2].trim()
      if (!this.options.pedantic && /^</.test(e)) {
        if (!/>$/.test(e)) return
        const t = _i(e.slice(0, -1), '\\')
        if ((e.length - t.length) % 2 == 0) return
      } else {
        const e = (function (e, t) {
          if (-1 === e.indexOf(t[1])) return -1
          let n = 0
          for (let o = 0; o < e.length; o++)
            if ('\\' === e[o]) o++
            else if (e[o] === t[0]) n++
            else if (e[o] === t[1] && (n--, n < 0)) return o
          return -1
        })(t[2], '()')
        if (e > -1) {
          const n = (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + e
          ;(t[2] = t[2].substring(0, e)),
            (t[0] = t[0].substring(0, n).trim()),
            (t[3] = '')
        }
      }
      let n = t[2],
        o = ''
      if (this.options.pedantic) {
        const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n)
        e && ((n = e[1]), (o = e[3]))
      } else o = t[3] ? t[3].slice(1, -1) : ''
      return (
        (n = n.trim()),
        /^</.test(n) &&
          (n =
            this.options.pedantic && !/>$/.test(e)
              ? n.slice(1)
              : n.slice(1, -1)),
        $i(
          t,
          {
            href: n ? n.replace(this.rules.inline._escapes, '$1') : n,
            title: o ? o.replace(this.rules.inline._escapes, '$1') : o,
          },
          t[0],
          this.lexer
        )
      )
    }
  }
  reflink(e, t) {
    let n
    if (
      (n = this.rules.inline.reflink.exec(e)) ||
      (n = this.rules.inline.nolink.exec(e))
    ) {
      let e = (n[2] || n[1]).replace(/\s+/g, ' ')
      if (((e = t[e.toLowerCase()]), !e)) {
        const e = n[0].charAt(0)
        return { type: 'text', raw: e, text: e }
      }
      return $i(n, e, n[0], this.lexer)
    }
  }
  emStrong(e, t, n = '') {
    let o = this.rules.inline.emStrong.lDelim.exec(e)
    if (!o) return
    if (o[3] && n.match(/[\p{L}\p{N}]/u)) return
    if (!(o[1] || o[2] || '') || !n || this.rules.inline.punctuation.exec(n)) {
      const n = [...o[0]].length - 1
      let r,
        i,
        s = n,
        a = 0
      const l =
        '*' === o[0][0]
          ? this.rules.inline.emStrong.rDelimAst
          : this.rules.inline.emStrong.rDelimUnd
      for (
        l.lastIndex = 0, t = t.slice(-1 * e.length + o[0].length - 1);
        null != (o = l.exec(t));

      ) {
        if (((r = o[1] || o[2] || o[3] || o[4] || o[5] || o[6]), !r)) continue
        if (((i = [...r].length), o[3] || o[4])) {
          s += i
          continue
        }
        if ((o[5] || o[6]) && n % 3 && !((n + i) % 3)) {
          a += i
          continue
        }
        if (((s -= i), s > 0)) continue
        i = Math.min(i, i + s + a)
        const t = [...e].slice(0, n + o.index + i + 1).join('')
        if (Math.min(n, i) % 2) {
          const e = t.slice(1, -1)
          return {
            type: 'em',
            raw: t,
            text: e,
            tokens: this.lexer.inlineTokens(e),
          }
        }
        const l = t.slice(2, -2)
        return {
          type: 'strong',
          raw: t,
          text: l,
          tokens: this.lexer.inlineTokens(l),
        }
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e)
    if (t) {
      let e = t[2].replace(/\n/g, ' ')
      const n = /[^ ]/.test(e),
        o = /^ /.test(e) && / $/.test(e)
      return (
        n && o && (e = e.substring(1, e.length - 1)),
        (e = fi(e, !0)),
        { type: 'codespan', raw: t[0], text: e }
      )
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e)
    if (t) return { type: 'br', raw: t[0] }
  }
  del(e) {
    const t = this.rules.inline.del.exec(e)
    if (t)
      return {
        type: 'del',
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2]),
      }
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e)
    if (t) {
      let e, n
      return (
        '@' === t[2]
          ? ((e = fi(t[1])), (n = 'mailto:' + e))
          : ((e = fi(t[1])), (n = e)),
        {
          type: 'link',
          raw: t[0],
          text: e,
          href: n,
          tokens: [{ type: 'text', raw: e, text: e }],
        }
      )
    }
  }
  url(e) {
    let t
    if ((t = this.rules.inline.url.exec(e))) {
      let e, n
      if ('@' === t[2]) (e = fi(t[0])), (n = 'mailto:' + e)
      else {
        let o
        do {
          ;(o = t[0]), (t[0] = this.rules.inline._backpedal.exec(t[0])[0])
        } while (o !== t[0])
        ;(e = fi(t[0])), (n = 'www.' === t[1] ? 'http://' + t[0] : t[0])
      }
      return {
        type: 'link',
        raw: t[0],
        text: e,
        href: n,
        tokens: [{ type: 'text', raw: e, text: e }],
      }
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e)
    if (t) {
      let e
      return (
        (e = this.lexer.state.inRawBlock ? t[0] : fi(t[0])),
        { type: 'text', raw: t[0], text: e }
      )
    }
  }
}
const Ci = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences:
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: xi,
  lheading: /^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph:
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/,
  _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
}
;(Ci.def = vi(Ci.def)
  .replace('label', Ci._label)
  .replace('title', Ci._title)
  .getRegex()),
  (Ci.bullet = /(?:[*+-]|\d{1,9}[.)])/),
  (Ci.listItemStart = vi(/^( *)(bull) */)
    .replace('bull', Ci.bullet)
    .getRegex()),
  (Ci.list = vi(Ci.list)
    .replace(/bull/g, Ci.bullet)
    .replace(
      'hr',
      '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
    )
    .replace('def', '\\n+(?=' + Ci.def.source + ')')
    .getRegex()),
  (Ci._tag =
    'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
  (Ci._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
  (Ci.html = vi(Ci.html, 'i')
    .replace('comment', Ci._comment)
    .replace('tag', Ci._tag)
    .replace(
      'attribute',
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex()),
  (Ci.lheading = vi(Ci.lheading).replace(/bull/g, Ci.bullet).getRegex()),
  (Ci.paragraph = vi(Ci._paragraph)
    .replace('hr', Ci.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('|lheading', '')
    .replace('|table', '')
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', Ci._tag)
    .getRegex()),
  (Ci.blockquote = vi(Ci.blockquote)
    .replace('paragraph', Ci.paragraph)
    .getRegex()),
  (Ci.normal = { ...Ci }),
  (Ci.gfm = {
    ...Ci.normal,
    table:
      '^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
  }),
  (Ci.gfm.table = vi(Ci.gfm.table)
    .replace('hr', Ci.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', Ci._tag)
    .getRegex()),
  (Ci.gfm.paragraph = vi(Ci._paragraph)
    .replace('hr', Ci.hr)
    .replace('heading', ' {0,3}#{1,6} ')
    .replace('|lheading', '')
    .replace('table', Ci.gfm.table)
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace(
      'html',
      '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)'
    )
    .replace('tag', Ci._tag)
    .getRegex()),
  (Ci.pedantic = {
    ...Ci.normal,
    html: vi(
      '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
    )
      .replace('comment', Ci._comment)
      .replace(
        /tag/g,
        '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: xi,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: vi(Ci.normal._paragraph)
      .replace('hr', Ci.hr)
      .replace('heading', ' *#{1,6} *[^\n]')
      .replace('lheading', Ci.lheading)
      .replace('blockquote', ' {0,3}>')
      .replace('|fences', '')
      .replace('|list', '')
      .replace('|html', '')
      .getRegex(),
  })
const Si = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: xi,
  tag: '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: 'reflink|nolink(?!\\()',
  emStrong: {
    lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    rDelimAst:
      /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
    rDelimUnd:
      /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/,
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: xi,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^((?![*_])[\spunctuation])/,
  _punctuation: '\\p{P}$+<=>`^|~',
}
;(Si.punctuation = vi(Si.punctuation, 'u')
  .replace(/punctuation/g, Si._punctuation)
  .getRegex()),
  (Si.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g),
  (Si.anyPunctuation = /\\[punct]/g),
  (Si._escapes = /\\([punct])/g),
  (Si._comment = vi(Ci._comment).replace('(?:--\x3e|$)', '--\x3e').getRegex()),
  (Si.emStrong.lDelim = vi(Si.emStrong.lDelim, 'u')
    .replace(/punct/g, Si._punctuation)
    .getRegex()),
  (Si.emStrong.rDelimAst = vi(Si.emStrong.rDelimAst, 'gu')
    .replace(/punct/g, Si._punctuation)
    .getRegex()),
  (Si.emStrong.rDelimUnd = vi(Si.emStrong.rDelimUnd, 'gu')
    .replace(/punct/g, Si._punctuation)
    .getRegex()),
  (Si.anyPunctuation = vi(Si.anyPunctuation, 'gu')
    .replace(/punct/g, Si._punctuation)
    .getRegex()),
  (Si._escapes = vi(Si._escapes, 'gu')
    .replace(/punct/g, Si._punctuation)
    .getRegex()),
  (Si._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
  (Si._email =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
  (Si.autolink = vi(Si.autolink)
    .replace('scheme', Si._scheme)
    .replace('email', Si._email)
    .getRegex()),
  (Si._attribute =
    /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
  (Si.tag = vi(Si.tag)
    .replace('comment', Si._comment)
    .replace('attribute', Si._attribute)
    .getRegex()),
  (Si._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
  (Si._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
  (Si._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
  (Si.link = vi(Si.link)
    .replace('label', Si._label)
    .replace('href', Si._href)
    .replace('title', Si._title)
    .getRegex()),
  (Si.reflink = vi(Si.reflink)
    .replace('label', Si._label)
    .replace('ref', Ci._label)
    .getRegex()),
  (Si.nolink = vi(Si.nolink).replace('ref', Ci._label).getRegex()),
  (Si.reflinkSearch = vi(Si.reflinkSearch, 'g')
    .replace('reflink', Si.reflink)
    .replace('nolink', Si.nolink)
    .getRegex()),
  (Si.normal = { ...Si }),
  (Si.pedantic = {
    ...Si.normal,
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g,
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g,
    },
    link: vi(/^!?\[(label)\]\((.*?)\)/)
      .replace('label', Si._label)
      .getRegex(),
    reflink: vi(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace('label', Si._label)
      .getRegex(),
  }),
  (Si.gfm = {
    ...Si.normal,
    escape: vi(Si.escape).replace('])', '~|])').getRegex(),
    _extended_email:
      /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  }),
  (Si.gfm.url = vi(Si.gfm.url, 'i')
    .replace('email', Si.gfm._extended_email)
    .getRegex()),
  (Si.breaks = {
    ...Si.gfm,
    br: vi(Si.br).replace('{2,}', '*').getRegex(),
    text: vi(Si.gfm.text)
      .replace('\\b_', '\\b_| {2,}\\n')
      .replace(/\{2,\}/g, '*')
      .getRegex(),
  })
class Ei {
  tokens
  options
  state
  tokenizer
  inlineQueue
  constructor(e) {
    ;(this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || ai),
      (this.options.tokenizer = this.options.tokenizer || new Ti()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 })
    const t = { block: Ci.normal, inline: Si.normal }
    this.options.pedantic
      ? ((t.block = Ci.pedantic), (t.inline = Si.pedantic))
      : this.options.gfm &&
        ((t.block = Ci.gfm),
        this.options.breaks ? (t.inline = Si.breaks) : (t.inline = Si.gfm)),
      (this.tokenizer.rules = t)
  }
  static get rules() {
    return { block: Ci, inline: Si }
  }
  static lex(e, t) {
    return new Ei(t).lex(e)
  }
  static lexInline(e, t) {
    return new Ei(t).inlineTokens(e)
  }
  lex(e) {
    let t
    for (
      e = e.replace(/\r\n|\r/g, '\n'), this.blockTokens(e, this.tokens);
      (t = this.inlineQueue.shift());

    )
      this.inlineTokens(t.src, t.tokens)
    return this.tokens
  }
  blockTokens(e, t = []) {
    let n, o, r, i
    for (
      e = this.options.pedantic
        ? e.replace(/\t/g, '    ').replace(/^ +$/gm, '')
        : e.replace(/^( *)(\t+)/gm, (e, t, n) => t + '    '.repeat(n.length));
      e;

    )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some(
            (o) =>
              !!(n = o.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        )
      )
        if ((n = this.tokenizer.space(e)))
          (e = e.substring(n.raw.length)),
            1 === n.raw.length && t.length > 0
              ? (t[t.length - 1].raw += '\n')
              : t.push(n)
        else if ((n = this.tokenizer.code(e)))
          (e = e.substring(n.raw.length)),
            (o = t[t.length - 1]),
            !o || ('paragraph' !== o.type && 'text' !== o.type)
              ? t.push(n)
              : ((o.raw += '\n' + n.raw),
                (o.text += '\n' + n.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
        else if ((n = this.tokenizer.fences(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.heading(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.hr(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.blockquote(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.list(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.html(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.def(e)))
          (e = e.substring(n.raw.length)),
            (o = t[t.length - 1]),
            !o || ('paragraph' !== o.type && 'text' !== o.type)
              ? this.tokens.links[n.tag] ||
                (this.tokens.links[n.tag] = { href: n.href, title: n.title })
              : ((o.raw += '\n' + n.raw),
                (o.text += '\n' + n.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
        else if ((n = this.tokenizer.table(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.lheading(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else {
          if (
            ((r = e),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let t = 1 / 0
            const n = e.slice(1)
            let o
            this.options.extensions.startBlock.forEach((e) => {
              ;(o = e.call({ lexer: this }, n)),
                'number' == typeof o && o >= 0 && (t = Math.min(t, o))
            }),
              t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1))
          }
          if (this.state.top && (n = this.tokenizer.paragraph(r)))
            (o = t[t.length - 1]),
              i && 'paragraph' === o.type
                ? ((o.raw += '\n' + n.raw),
                  (o.text += '\n' + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
                : t.push(n),
              (i = r.length !== e.length),
              (e = e.substring(n.raw.length))
          else if ((n = this.tokenizer.text(e)))
            (e = e.substring(n.raw.length)),
              (o = t[t.length - 1]),
              o && 'text' === o.type
                ? ((o.raw += '\n' + n.raw),
                  (o.text += '\n' + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = o.text))
                : t.push(n)
          else if (e) {
            const t = 'Infinite loop on byte: ' + e.charCodeAt(0)
            if (this.options.silent) {
              console.error(t)
              break
            }
            throw new Error(t)
          }
        }
    return (this.state.top = !0), t
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t
  }
  inlineTokens(e, t = []) {
    let n,
      o,
      r,
      i,
      s,
      a,
      l = e
    if (this.tokens.links) {
      const e = Object.keys(this.tokens.links)
      if (e.length > 0)
        for (
          ;
          null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(l));

        )
          e.includes(i[0].slice(i[0].lastIndexOf('[') + 1, -1)) &&
            (l =
              l.slice(0, i.index) +
              '[' +
              'a'.repeat(i[0].length - 2) +
              ']' +
              l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
    }
    for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(l)); )
      l =
        l.slice(0, i.index) +
        '[' +
        'a'.repeat(i[0].length - 2) +
        ']' +
        l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)
    for (; null != (i = this.tokenizer.rules.inline.anyPunctuation.exec(l)); )
      l =
        l.slice(0, i.index) +
        '++' +
        l.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex)
    for (; e; )
      if (
        (s || (a = ''),
        (s = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some(
            (o) =>
              !!(n = o.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        ))
      )
        if ((n = this.tokenizer.escape(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.tag(e)))
          (e = e.substring(n.raw.length)),
            (o = t[t.length - 1]),
            o && 'text' === n.type && 'text' === o.type
              ? ((o.raw += n.raw), (o.text += n.text))
              : t.push(n)
        else if ((n = this.tokenizer.link(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.reflink(e, this.tokens.links)))
          (e = e.substring(n.raw.length)),
            (o = t[t.length - 1]),
            o && 'text' === n.type && 'text' === o.type
              ? ((o.raw += n.raw), (o.text += n.text))
              : t.push(n)
        else if ((n = this.tokenizer.emStrong(e, l, a)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.codespan(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.br(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.del(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if ((n = this.tokenizer.autolink(e)))
          (e = e.substring(n.raw.length)), t.push(n)
        else if (this.state.inLink || !(n = this.tokenizer.url(e))) {
          if (
            ((r = e),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let t = 1 / 0
            const n = e.slice(1)
            let o
            this.options.extensions.startInline.forEach((e) => {
              ;(o = e.call({ lexer: this }, n)),
                'number' == typeof o && o >= 0 && (t = Math.min(t, o))
            }),
              t < 1 / 0 && t >= 0 && (r = e.substring(0, t + 1))
          }
          if ((n = this.tokenizer.inlineText(r)))
            (e = e.substring(n.raw.length)),
              '_' !== n.raw.slice(-1) && (a = n.raw.slice(-1)),
              (s = !0),
              (o = t[t.length - 1]),
              o && 'text' === o.type
                ? ((o.raw += n.raw), (o.text += n.text))
                : t.push(n)
          else if (e) {
            const t = 'Infinite loop on byte: ' + e.charCodeAt(0)
            if (this.options.silent) {
              console.error(t)
              break
            }
            throw new Error(t)
          }
        } else (e = e.substring(n.raw.length)), t.push(n)
    return t
  }
}
class Ai {
  options
  constructor(e) {
    this.options = e || ai
  }
  code(e, t, n) {
    const o = (t || '').match(/^\S*/)?.[0]
    return (
      (e = e.replace(/\n$/, '') + '\n'),
      o
        ? '<pre><code class="language-' +
          fi(o) +
          '">' +
          (n ? e : fi(e, !0)) +
          '</code></pre>\n'
        : '<pre><code>' + (n ? e : fi(e, !0)) + '</code></pre>\n'
    )
  }
  blockquote(e) {
    return `<blockquote>\n${e}</blockquote>\n`
  }
  html(e, t) {
    return e
  }
  heading(e, t, n) {
    return `<h${t}>${e}</h${t}>\n`
  }
  hr() {
    return '<hr>\n'
  }
  list(e, t, n) {
    const o = t ? 'ol' : 'ul'
    return (
      '<' +
      o +
      (t && 1 !== n ? ' start="' + n + '"' : '') +
      '>\n' +
      e +
      '</' +
      o +
      '>\n'
    )
  }
  listitem(e, t, n) {
    return `<li>${e}</li>\n`
  }
  checkbox(e) {
    return '<input ' + (e ? 'checked="" ' : '') + 'disabled="" type="checkbox">'
  }
  paragraph(e) {
    return `<p>${e}</p>\n`
  }
  table(e, t) {
    return (
      t && (t = `<tbody>${t}</tbody>`),
      '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
    )
  }
  tablerow(e) {
    return `<tr>\n${e}</tr>\n`
  }
  tablecell(e, t) {
    const n = t.header ? 'th' : 'td'
    return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>\n`
  }
  strong(e) {
    return `<strong>${e}</strong>`
  }
  em(e) {
    return `<em>${e}</em>`
  }
  codespan(e) {
    return `<code>${e}</code>`
  }
  br() {
    return '<br>'
  }
  del(e) {
    return `<del>${e}</del>`
  }
  link(e, t, n) {
    const o = wi(e)
    if (null === o) return n
    let r = '<a href="' + (e = o) + '"'
    return t && (r += ' title="' + t + '"'), (r += '>' + n + '</a>'), r
  }
  image(e, t, n) {
    const o = wi(e)
    if (null === o) return n
    let r = `<img src="${(e = o)}" alt="${n}"`
    return t && (r += ` title="${t}"`), (r += '>'), r
  }
  text(e) {
    return e
  }
}
class Ii {
  strong(e) {
    return e
  }
  em(e) {
    return e
  }
  codespan(e) {
    return e
  }
  del(e) {
    return e
  }
  html(e) {
    return e
  }
  text(e) {
    return e
  }
  link(e, t, n) {
    return '' + n
  }
  image(e, t, n) {
    return '' + n
  }
  br() {
    return ''
  }
}
class Pi {
  options
  renderer
  textRenderer
  constructor(e) {
    ;(this.options = e || ai),
      (this.options.renderer = this.options.renderer || new Ai()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new Ii())
  }
  static parse(e, t) {
    return new Pi(t).parse(e)
  }
  static parseInline(e, t) {
    return new Pi(t).parseInline(e)
  }
  parse(e, t = !0) {
    let n = ''
    for (let o = 0; o < e.length; o++) {
      const r = e[o]
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[r.type]
      ) {
        const e = r,
          t = this.options.extensions.renderers[e.type].call(
            { parser: this },
            e
          )
        if (
          !1 !== t ||
          ![
            'space',
            'hr',
            'heading',
            'code',
            'table',
            'blockquote',
            'list',
            'html',
            'paragraph',
            'text',
          ].includes(e.type)
        ) {
          n += t || ''
          continue
        }
      }
      switch (r.type) {
        case 'space':
          continue
        case 'hr':
          n += this.renderer.hr()
          continue
        case 'heading': {
          const e = r
          n += this.renderer.heading(
            this.parseInline(e.tokens),
            e.depth,
            mi(this.parseInline(e.tokens, this.textRenderer))
          )
          continue
        }
        case 'code': {
          const e = r
          n += this.renderer.code(e.text, e.lang, !!e.escaped)
          continue
        }
        case 'table': {
          const e = r
          let t = '',
            o = ''
          for (let t = 0; t < e.header.length; t++)
            o += this.renderer.tablecell(this.parseInline(e.header[t].tokens), {
              header: !0,
              align: e.align[t],
            })
          t += this.renderer.tablerow(o)
          let i = ''
          for (let t = 0; t < e.rows.length; t++) {
            const n = e.rows[t]
            o = ''
            for (let t = 0; t < n.length; t++)
              o += this.renderer.tablecell(this.parseInline(n[t].tokens), {
                header: !1,
                align: e.align[t],
              })
            i += this.renderer.tablerow(o)
          }
          n += this.renderer.table(t, i)
          continue
        }
        case 'blockquote': {
          const e = r,
            t = this.parse(e.tokens)
          n += this.renderer.blockquote(t)
          continue
        }
        case 'list': {
          const e = r,
            t = e.ordered,
            o = e.start,
            i = e.loose
          let s = ''
          for (let t = 0; t < e.items.length; t++) {
            const n = e.items[t],
              o = n.checked,
              r = n.task
            let a = ''
            if (n.task) {
              const e = this.renderer.checkbox(!!o)
              i
                ? n.tokens.length > 0 && 'paragraph' === n.tokens[0].type
                  ? ((n.tokens[0].text = e + ' ' + n.tokens[0].text),
                    n.tokens[0].tokens &&
                      n.tokens[0].tokens.length > 0 &&
                      'text' === n.tokens[0].tokens[0].type &&
                      (n.tokens[0].tokens[0].text =
                        e + ' ' + n.tokens[0].tokens[0].text))
                  : n.tokens.unshift({ type: 'text', text: e + ' ' })
                : (a += e + ' ')
            }
            ;(a += this.parse(n.tokens, i)),
              (s += this.renderer.listitem(a, r, !!o))
          }
          n += this.renderer.list(s, t, o)
          continue
        }
        case 'html': {
          const e = r
          n += this.renderer.html(e.text, e.block)
          continue
        }
        case 'paragraph': {
          const e = r
          n += this.renderer.paragraph(this.parseInline(e.tokens))
          continue
        }
        case 'text': {
          let i = r,
            s = i.tokens ? this.parseInline(i.tokens) : i.text
          for (; o + 1 < e.length && 'text' === e[o + 1].type; )
            (i = e[++o]),
              (s += '\n' + (i.tokens ? this.parseInline(i.tokens) : i.text))
          n += t ? this.renderer.paragraph(s) : s
          continue
        }
        default: {
          const e = 'Token with "' + r.type + '" type was not found.'
          if (this.options.silent) return console.error(e), ''
          throw new Error(e)
        }
      }
    }
    return n
  }
  parseInline(e, t) {
    t = t || this.renderer
    let n = ''
    for (let o = 0; o < e.length; o++) {
      const r = e[o]
      if (
        this.options.extensions &&
        this.options.extensions.renderers &&
        this.options.extensions.renderers[r.type]
      ) {
        const e = this.options.extensions.renderers[r.type].call(
          { parser: this },
          r
        )
        if (
          !1 !== e ||
          ![
            'escape',
            'html',
            'link',
            'image',
            'strong',
            'em',
            'codespan',
            'br',
            'del',
            'text',
          ].includes(r.type)
        ) {
          n += e || ''
          continue
        }
      }
      switch (r.type) {
        case 'escape': {
          const e = r
          n += t.text(e.text)
          break
        }
        case 'html': {
          const e = r
          n += t.html(e.text)
          break
        }
        case 'link': {
          const e = r
          n += t.link(e.href, e.title, this.parseInline(e.tokens, t))
          break
        }
        case 'image': {
          const e = r
          n += t.image(e.href, e.title, e.text)
          break
        }
        case 'strong': {
          const e = r
          n += t.strong(this.parseInline(e.tokens, t))
          break
        }
        case 'em': {
          const e = r
          n += t.em(this.parseInline(e.tokens, t))
          break
        }
        case 'codespan': {
          const e = r
          n += t.codespan(e.text)
          break
        }
        case 'br':
          n += t.br()
          break
        case 'del': {
          const e = r
          n += t.del(this.parseInline(e.tokens, t))
          break
        }
        case 'text': {
          const e = r
          n += t.text(e.text)
          break
        }
        default: {
          const e = 'Token with "' + r.type + '" type was not found.'
          if (this.options.silent) return console.error(e), ''
          throw new Error(e)
        }
      }
    }
    return n
  }
}
class Ri {
  options
  constructor(e) {
    this.options = e || ai
  }
  static passThroughHooks = new Set(['preprocess', 'postprocess'])
  preprocess(e) {
    return e
  }
  postprocess(e) {
    return e
  }
}
const Li = new (class {
  defaults = {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  }
  options = this.setOptions
  parse = this.#e(Ei.lex, Pi.parse)
  parseInline = this.#e(Ei.lexInline, Pi.parseInline)
  Parser = Pi
  parser = Pi.parse
  Renderer = Ai
  TextRenderer = Ii
  Lexer = Ei
  lexer = Ei.lex
  Tokenizer = Ti
  Hooks = Ri
  constructor(...e) {
    this.use(...e)
  }
  walkTokens(e, t) {
    let n = []
    for (const o of e)
      switch (((n = n.concat(t.call(this, o))), o.type)) {
        case 'table': {
          const e = o
          for (const o of e.header) n = n.concat(this.walkTokens(o.tokens, t))
          for (const o of e.rows)
            for (const e of o) n = n.concat(this.walkTokens(e.tokens, t))
          break
        }
        case 'list': {
          const e = o
          n = n.concat(this.walkTokens(e.items, t))
          break
        }
        default: {
          const e = o
          this.defaults.extensions?.childTokens?.[e.type]
            ? this.defaults.extensions.childTokens[e.type].forEach((o) => {
                n = n.concat(this.walkTokens(e[o], t))
              })
            : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)))
        }
      }
    return n
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} }
    return (
      e.forEach((e) => {
        const n = { ...e }
        if (
          ((n.async = this.defaults.async || n.async || !1),
          e.extensions &&
            (e.extensions.forEach((e) => {
              if (!e.name) throw new Error('extension name required')
              if ('renderer' in e) {
                const n = t.renderers[e.name]
                t.renderers[e.name] = n
                  ? function (...t) {
                      let o = e.renderer.apply(this, t)
                      return !1 === o && (o = n.apply(this, t)), o
                    }
                  : e.renderer
              }
              if ('tokenizer' in e) {
                if (!e.level || ('block' !== e.level && 'inline' !== e.level))
                  throw new Error("extension level must be 'block' or 'inline'")
                const n = t[e.level]
                n ? n.unshift(e.tokenizer) : (t[e.level] = [e.tokenizer]),
                  e.start &&
                    ('block' === e.level
                      ? t.startBlock
                        ? t.startBlock.push(e.start)
                        : (t.startBlock = [e.start])
                      : 'inline' === e.level &&
                        (t.startInline
                          ? t.startInline.push(e.start)
                          : (t.startInline = [e.start])))
              }
              'childTokens' in e &&
                e.childTokens &&
                (t.childTokens[e.name] = e.childTokens)
            }),
            (n.extensions = t)),
          e.renderer)
        ) {
          const t = this.defaults.renderer || new Ai(this.defaults)
          for (const n in e.renderer) {
            const o = e.renderer[n],
              r = n,
              i = t[r]
            t[r] = (...e) => {
              let n = o.apply(t, e)
              return !1 === n && (n = i.apply(t, e)), n || ''
            }
          }
          n.renderer = t
        }
        if (e.tokenizer) {
          const t = this.defaults.tokenizer || new Ti(this.defaults)
          for (const n in e.tokenizer) {
            const o = e.tokenizer[n],
              r = n,
              i = t[r]
            t[r] = (...e) => {
              let n = o.apply(t, e)
              return !1 === n && (n = i.apply(t, e)), n
            }
          }
          n.tokenizer = t
        }
        if (e.hooks) {
          const t = this.defaults.hooks || new Ri()
          for (const n in e.hooks) {
            const o = e.hooks[n],
              r = n,
              i = t[r]
            Ri.passThroughHooks.has(n)
              ? (t[r] = (e) => {
                  if (this.defaults.async)
                    return Promise.resolve(o.call(t, e)).then((e) =>
                      i.call(t, e)
                    )
                  const n = o.call(t, e)
                  return i.call(t, n)
                })
              : (t[r] = (...e) => {
                  let n = o.apply(t, e)
                  return !1 === n && (n = i.apply(t, e)), n
                })
          }
          n.hooks = t
        }
        if (e.walkTokens) {
          const t = this.defaults.walkTokens,
            o = e.walkTokens
          n.walkTokens = function (e) {
            let n = []
            return (
              n.push(o.call(this, e)), t && (n = n.concat(t.call(this, e))), n
            )
          }
        }
        this.defaults = { ...this.defaults, ...n }
      }),
      this
    )
  }
  setOptions(e) {
    return (this.defaults = { ...this.defaults, ...e }), this
  }
  #e(e, t) {
    return (n, o) => {
      const r = { ...o },
        i = { ...this.defaults, ...r }
      !0 === this.defaults.async &&
        !1 === r.async &&
        (i.silent ||
          console.warn(
            'marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.'
          ),
        (i.async = !0))
      const s = this.#t(!!i.silent, !!i.async)
      if (null == n)
        return s(new Error('marked(): input parameter is undefined or null'))
      if ('string' != typeof n)
        return s(
          new Error(
            'marked(): input parameter is of type ' +
              Object.prototype.toString.call(n) +
              ', string expected'
          )
        )
      if ((i.hooks && (i.hooks.options = i), i.async))
        return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n)
          .then((t) => e(t, i))
          .then((e) =>
            i.walkTokens
              ? Promise.all(this.walkTokens(e, i.walkTokens)).then(() => e)
              : e
          )
          .then((e) => t(e, i))
          .then((e) => (i.hooks ? i.hooks.postprocess(e) : e))
          .catch(s)
      try {
        i.hooks && (n = i.hooks.preprocess(n))
        const o = e(n, i)
        i.walkTokens && this.walkTokens(o, i.walkTokens)
        let r = t(o, i)
        return i.hooks && (r = i.hooks.postprocess(r)), r
      } catch (e) {
        return s(e)
      }
    }
  }
  #t(e, t) {
    return (n) => {
      if (
        ((n.message +=
          '\nPlease report this to https://github.com/markedjs/marked.'),
        e)
      ) {
        const e =
          '<p>An error occurred:</p><pre>' + fi(n.message + '', !0) + '</pre>'
        return t ? Promise.resolve(e) : e
      }
      if (t) return Promise.reject(n)
      throw n
    }
  }
})()
function Mi(e, t) {
  return Li.parse(e, t)
}
;(Mi.options = Mi.setOptions =
  function (e) {
    return Li.setOptions(e), (Mi.defaults = Li.defaults), li(Mi.defaults), Mi
  }),
  (Mi.getDefaults = si),
  (Mi.defaults = ai),
  (Mi.use = function (...e) {
    return Li.use(...e), (Mi.defaults = Li.defaults), li(Mi.defaults), Mi
  }),
  (Mi.walkTokens = function (e, t) {
    return Li.walkTokens(e, t)
  }),
  (Mi.parseInline = Li.parseInline),
  (Mi.Parser = Pi),
  (Mi.parser = Pi.parse),
  (Mi.Renderer = Ai),
  (Mi.TextRenderer = Ii),
  (Mi.Lexer = Ei),
  (Mi.lexer = Ei.lex),
  (Mi.Tokenizer = Ti),
  (Mi.Hooks = Ri),
  (Mi.parse = Mi),
  Mi.options,
  Mi.setOptions,
  Mi.use,
  Mi.walkTokens,
  Mi.parseInline
const {
  entries: Ni,
  setPrototypeOf: Oi,
  isFrozen: Bi,
  getPrototypeOf: zi,
  getOwnPropertyDescriptor: Di,
} = Object
let { freeze: ji, seal: Fi, create: Ui } = Object,
  { apply: Hi, construct: qi } = 'undefined' != typeof Reflect && Reflect
ji ||
  (ji = function (e) {
    return e
  }),
  Fi ||
    (Fi = function (e) {
      return e
    }),
  Hi ||
    (Hi = function (e, t, n) {
      return e.apply(t, n)
    }),
  qi ||
    (qi = function (e, t) {
      return new e(...t)
    })
const Gi = os(Array.prototype.forEach),
  Vi = os(Array.prototype.pop),
  Wi = os(Array.prototype.push),
  Ki = os(String.prototype.toLowerCase),
  Yi = os(String.prototype.toString),
  Zi = os(String.prototype.match),
  Xi = os(String.prototype.replace),
  Ji = os(String.prototype.indexOf),
  Qi = os(String.prototype.trim),
  es = os(RegExp.prototype.test),
  ts =
    ((ns = TypeError),
    function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n]
      return qi(ns, t)
    })
var ns
function os(e) {
  return function (t) {
    for (
      var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      o[r - 1] = arguments[r]
    return Hi(e, t, o)
  }
}
function rs(e, t) {
  let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Ki
  Oi && Oi(e, null)
  let o = t.length
  for (; o--; ) {
    let r = t[o]
    if ('string' == typeof r) {
      const e = n(r)
      e !== r && (Bi(t) || (t[o] = e), (r = e))
    }
    e[r] = !0
  }
  return e
}
function is(e) {
  const t = Ui(null)
  for (const [n, o] of Ni(e)) void 0 !== Di(e, n) && (t[n] = o)
  return t
}
function ss(e, t) {
  for (; null !== e; ) {
    const n = Di(e, t)
    if (n) {
      if (n.get) return os(n.get)
      if ('function' == typeof n.value) return os(n.value)
    }
    e = zi(e)
  }
  return function (e) {
    return console.warn('fallback value for', e), null
  }
}
const as = ji([
    'a',
    'abbr',
    'acronym',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'content',
    'data',
    'datalist',
    'dd',
    'decorator',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'nobr',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'shadow',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
  ]),
  ls = ji([
    'svg',
    'a',
    'altglyph',
    'altglyphdef',
    'altglyphitem',
    'animatecolor',
    'animatemotion',
    'animatetransform',
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'filter',
    'font',
    'g',
    'glyph',
    'glyphref',
    'hkern',
    'image',
    'line',
    'lineargradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'style',
    'switch',
    'symbol',
    'text',
    'textpath',
    'title',
    'tref',
    'tspan',
    'view',
    'vkern',
  ]),
  cs = ji([
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
  ]),
  ds = ji([
    'animate',
    'color-profile',
    'cursor',
    'discard',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignobject',
    'hatch',
    'hatchpath',
    'mesh',
    'meshgradient',
    'meshpatch',
    'meshrow',
    'missing-glyph',
    'script',
    'set',
    'solidcolor',
    'unknown',
    'use',
  ]),
  us = ji([
    'math',
    'menclose',
    'merror',
    'mfenced',
    'mfrac',
    'mglyph',
    'mi',
    'mlabeledtr',
    'mmultiscripts',
    'mn',
    'mo',
    'mover',
    'mpadded',
    'mphantom',
    'mroot',
    'mrow',
    'ms',
    'mspace',
    'msqrt',
    'mstyle',
    'msub',
    'msup',
    'msubsup',
    'mtable',
    'mtd',
    'mtext',
    'mtr',
    'munder',
    'munderover',
    'mprescripts',
  ]),
  ps = ji([
    'maction',
    'maligngroup',
    'malignmark',
    'mlongdiv',
    'mscarries',
    'mscarry',
    'msgroup',
    'mstack',
    'msline',
    'msrow',
    'semantics',
    'annotation',
    'annotation-xml',
    'mprescripts',
    'none',
  ]),
  hs = ji(['#text']),
  gs = ji([
    'accept',
    'action',
    'align',
    'alt',
    'autocapitalize',
    'autocomplete',
    'autopictureinpicture',
    'autoplay',
    'background',
    'bgcolor',
    'border',
    'capture',
    'cellpadding',
    'cellspacing',
    'checked',
    'cite',
    'class',
    'clear',
    'color',
    'cols',
    'colspan',
    'controls',
    'controlslist',
    'coords',
    'crossorigin',
    'datetime',
    'decoding',
    'default',
    'dir',
    'disabled',
    'disablepictureinpicture',
    'disableremoteplayback',
    'download',
    'draggable',
    'enctype',
    'enterkeyhint',
    'face',
    'for',
    'headers',
    'height',
    'hidden',
    'high',
    'href',
    'hreflang',
    'id',
    'inputmode',
    'integrity',
    'ismap',
    'kind',
    'label',
    'lang',
    'list',
    'loading',
    'loop',
    'low',
    'max',
    'maxlength',
    'media',
    'method',
    'min',
    'minlength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noshade',
    'novalidate',
    'nowrap',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsinline',
    'poster',
    'preload',
    'pubdate',
    'radiogroup',
    'readonly',
    'rel',
    'required',
    'rev',
    'reversed',
    'role',
    'rows',
    'rowspan',
    'spellcheck',
    'scope',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'srclang',
    'start',
    'src',
    'srcset',
    'step',
    'style',
    'summary',
    'tabindex',
    'title',
    'translate',
    'type',
    'usemap',
    'valign',
    'value',
    'width',
    'xmlns',
    'slot',
  ]),
  fs = ji([
    'accent-height',
    'accumulate',
    'additive',
    'alignment-baseline',
    'ascent',
    'attributename',
    'attributetype',
    'azimuth',
    'basefrequency',
    'baseline-shift',
    'begin',
    'bias',
    'by',
    'class',
    'clip',
    'clippathunits',
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'cx',
    'cy',
    'd',
    'dx',
    'dy',
    'diffuseconstant',
    'direction',
    'display',
    'divisor',
    'dur',
    'edgemode',
    'elevation',
    'end',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'filterunits',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyph-name',
    'glyphref',
    'gradientunits',
    'gradienttransform',
    'height',
    'href',
    'id',
    'image-rendering',
    'in',
    'in2',
    'k',
    'k1',
    'k2',
    'k3',
    'k4',
    'kerning',
    'keypoints',
    'keysplines',
    'keytimes',
    'lang',
    'lengthadjust',
    'letter-spacing',
    'kernelmatrix',
    'kernelunitlength',
    'lighting-color',
    'local',
    'marker-end',
    'marker-mid',
    'marker-start',
    'markerheight',
    'markerunits',
    'markerwidth',
    'maskcontentunits',
    'maskunits',
    'max',
    'mask',
    'media',
    'method',
    'mode',
    'min',
    'name',
    'numoctaves',
    'offset',
    'operator',
    'opacity',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'paint-order',
    'path',
    'pathlength',
    'patterncontentunits',
    'patterntransform',
    'patternunits',
    'points',
    'preservealpha',
    'preserveaspectratio',
    'primitiveunits',
    'r',
    'rx',
    'ry',
    'radius',
    'refx',
    'refy',
    'repeatcount',
    'repeatdur',
    'restart',
    'result',
    'rotate',
    'scale',
    'seed',
    'shape-rendering',
    'specularconstant',
    'specularexponent',
    'spreadmethod',
    'startoffset',
    'stddeviation',
    'stitchtiles',
    'stop-color',
    'stop-opacity',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke',
    'stroke-width',
    'style',
    'surfacescale',
    'systemlanguage',
    'tabindex',
    'targetx',
    'targety',
    'transform',
    'transform-origin',
    'text-anchor',
    'text-decoration',
    'text-rendering',
    'textlength',
    'type',
    'u1',
    'u2',
    'unicode',
    'values',
    'viewbox',
    'visibility',
    'version',
    'vert-adv-y',
    'vert-origin-x',
    'vert-origin-y',
    'width',
    'word-spacing',
    'wrap',
    'writing-mode',
    'xchannelselector',
    'ychannelselector',
    'x',
    'x1',
    'x2',
    'xmlns',
    'y',
    'y1',
    'y2',
    'z',
    'zoomandpan',
  ]),
  bs = ji([
    'accent',
    'accentunder',
    'align',
    'bevelled',
    'close',
    'columnsalign',
    'columnlines',
    'columnspan',
    'denomalign',
    'depth',
    'dir',
    'display',
    'displaystyle',
    'encoding',
    'fence',
    'frame',
    'height',
    'href',
    'id',
    'largeop',
    'length',
    'linethickness',
    'lspace',
    'lquote',
    'mathbackground',
    'mathcolor',
    'mathsize',
    'mathvariant',
    'maxsize',
    'minsize',
    'movablelimits',
    'notation',
    'numalign',
    'open',
    'rowalign',
    'rowlines',
    'rowspacing',
    'rowspan',
    'rspace',
    'rquote',
    'scriptlevel',
    'scriptminsize',
    'scriptsizemultiplier',
    'selection',
    'separator',
    'separators',
    'stretchy',
    'subscriptshift',
    'supscriptshift',
    'symmetric',
    'voffset',
    'width',
    'xmlns',
  ]),
  ms = ji(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']),
  ys = Fi(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
  vs = Fi(/<%[\w\W]*|[\w\W]*%>/gm),
  ws = Fi(/\${[\w\W]*}/gm),
  xs = Fi(/^data-[\-\w.\u00B7-\uFFFF]/),
  ks = Fi(/^aria-[\-\w]+$/),
  _s = Fi(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  ),
  $s = Fi(/^(?:\w+script|data):/i),
  Ts = Fi(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  Cs = Fi(/^html$/i)
var Ss = Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: ys,
  ERB_EXPR: vs,
  TMPLIT_EXPR: ws,
  DATA_ATTR: xs,
  ARIA_ATTR: ks,
  IS_ALLOWED_URI: _s,
  IS_SCRIPT_OR_DATA: $s,
  ATTR_WHITESPACE: Ts,
  DOCTYPE_NAME: Cs,
})
const Es = function () {
  return 'undefined' == typeof window ? null : window
}
var As = (function e() {
  let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Es()
  const n = (t) => e(t)
  if (
    ((n.version = '3.0.6'),
    (n.removed = []),
    !t || !t.document || 9 !== t.document.nodeType)
  )
    return (n.isSupported = !1), n
  let { document: o } = t
  const r = o,
    i = r.currentScript,
    {
      DocumentFragment: s,
      HTMLTemplateElement: a,
      Node: l,
      Element: c,
      NodeFilter: d,
      NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
      HTMLFormElement: p,
      DOMParser: h,
      trustedTypes: g,
    } = t,
    f = c.prototype,
    b = ss(f, 'cloneNode'),
    m = ss(f, 'nextSibling'),
    y = ss(f, 'childNodes'),
    v = ss(f, 'parentNode')
  if ('function' == typeof a) {
    const e = o.createElement('template')
    e.content && e.content.ownerDocument && (o = e.content.ownerDocument)
  }
  let w,
    x = ''
  const {
      implementation: k,
      createNodeIterator: _,
      createDocumentFragment: $,
      getElementsByTagName: T,
    } = o,
    { importNode: C } = r
  let S = {}
  n.isSupported =
    'function' == typeof Ni &&
    'function' == typeof v &&
    k &&
    void 0 !== k.createHTMLDocument
  const {
    MUSTACHE_EXPR: E,
    ERB_EXPR: A,
    TMPLIT_EXPR: I,
    DATA_ATTR: P,
    ARIA_ATTR: R,
    IS_SCRIPT_OR_DATA: L,
    ATTR_WHITESPACE: M,
  } = Ss
  let { IS_ALLOWED_URI: N } = Ss,
    O = null
  const B = rs({}, [...as, ...ls, ...cs, ...us, ...hs])
  let z = null
  const D = rs({}, [...gs, ...fs, ...bs, ...ms])
  let j = Object.seal(
      Ui(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1,
        },
      })
    ),
    F = null,
    U = null,
    H = !0,
    q = !0,
    G = !1,
    V = !0,
    W = !1,
    K = !1,
    Y = !1,
    Z = !1,
    X = !1,
    J = !1,
    Q = !1,
    ee = !0,
    te = !1,
    ne = !0,
    oe = !1,
    re = {},
    ie = null
  const se = rs({}, [
    'annotation-xml',
    'audio',
    'colgroup',
    'desc',
    'foreignobject',
    'head',
    'iframe',
    'math',
    'mi',
    'mn',
    'mo',
    'ms',
    'mtext',
    'noembed',
    'noframes',
    'noscript',
    'plaintext',
    'script',
    'style',
    'svg',
    'template',
    'thead',
    'title',
    'video',
    'xmp',
  ])
  let ae = null
  const le = rs({}, ['audio', 'video', 'img', 'source', 'image', 'track'])
  let ce = null
  const de = rs({}, [
      'alt',
      'class',
      'for',
      'id',
      'label',
      'name',
      'pattern',
      'placeholder',
      'role',
      'summary',
      'title',
      'value',
      'style',
      'xmlns',
    ]),
    ue = 'http://www.w3.org/1998/Math/MathML',
    pe = 'http://www.w3.org/2000/svg',
    he = 'http://www.w3.org/1999/xhtml'
  let ge = he,
    fe = !1,
    be = null
  const me = rs({}, [ue, pe, he], Yi)
  let ye = null
  const ve = ['application/xhtml+xml', 'text/html']
  let we = null,
    xe = null
  const ke = o.createElement('form'),
    _e = function (e) {
      return e instanceof RegExp || e instanceof Function
    },
    $e = function () {
      let e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
      if (!xe || xe !== e) {
        if (
          ((e && 'object' == typeof e) || (e = {}),
          (e = is(e)),
          (ye = ye =
            -1 === ve.indexOf(e.PARSER_MEDIA_TYPE)
              ? 'text/html'
              : e.PARSER_MEDIA_TYPE),
          (we = 'application/xhtml+xml' === ye ? Yi : Ki),
          (O = 'ALLOWED_TAGS' in e ? rs({}, e.ALLOWED_TAGS, we) : B),
          (z = 'ALLOWED_ATTR' in e ? rs({}, e.ALLOWED_ATTR, we) : D),
          (be =
            'ALLOWED_NAMESPACES' in e ? rs({}, e.ALLOWED_NAMESPACES, Yi) : me),
          (ce =
            'ADD_URI_SAFE_ATTR' in e
              ? rs(is(de), e.ADD_URI_SAFE_ATTR, we)
              : de),
          (ae =
            'ADD_DATA_URI_TAGS' in e
              ? rs(is(le), e.ADD_DATA_URI_TAGS, we)
              : le),
          (ie = 'FORBID_CONTENTS' in e ? rs({}, e.FORBID_CONTENTS, we) : se),
          (F = 'FORBID_TAGS' in e ? rs({}, e.FORBID_TAGS, we) : {}),
          (U = 'FORBID_ATTR' in e ? rs({}, e.FORBID_ATTR, we) : {}),
          (re = 'USE_PROFILES' in e && e.USE_PROFILES),
          (H = !1 !== e.ALLOW_ARIA_ATTR),
          (q = !1 !== e.ALLOW_DATA_ATTR),
          (G = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
          (V = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR),
          (W = e.SAFE_FOR_TEMPLATES || !1),
          (K = e.WHOLE_DOCUMENT || !1),
          (X = e.RETURN_DOM || !1),
          (J = e.RETURN_DOM_FRAGMENT || !1),
          (Q = e.RETURN_TRUSTED_TYPE || !1),
          (Z = e.FORCE_BODY || !1),
          (ee = !1 !== e.SANITIZE_DOM),
          (te = e.SANITIZE_NAMED_PROPS || !1),
          (ne = !1 !== e.KEEP_CONTENT),
          (oe = e.IN_PLACE || !1),
          (N = e.ALLOWED_URI_REGEXP || _s),
          (ge = e.NAMESPACE || he),
          (j = e.CUSTOM_ELEMENT_HANDLING || {}),
          e.CUSTOM_ELEMENT_HANDLING &&
            _e(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
            (j.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
          e.CUSTOM_ELEMENT_HANDLING &&
            _e(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
            (j.attributeNameCheck =
              e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
          e.CUSTOM_ELEMENT_HANDLING &&
            'boolean' ==
              typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements &&
            (j.allowCustomizedBuiltInElements =
              e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
          W && (q = !1),
          J && (X = !0),
          re &&
            ((O = rs({}, [...hs])),
            (z = []),
            !0 === re.html && (rs(O, as), rs(z, gs)),
            !0 === re.svg && (rs(O, ls), rs(z, fs), rs(z, ms)),
            !0 === re.svgFilters && (rs(O, cs), rs(z, fs), rs(z, ms)),
            !0 === re.mathMl && (rs(O, us), rs(z, bs), rs(z, ms))),
          e.ADD_TAGS && (O === B && (O = is(O)), rs(O, e.ADD_TAGS, we)),
          e.ADD_ATTR && (z === D && (z = is(z)), rs(z, e.ADD_ATTR, we)),
          e.ADD_URI_SAFE_ATTR && rs(ce, e.ADD_URI_SAFE_ATTR, we),
          e.FORBID_CONTENTS &&
            (ie === se && (ie = is(ie)), rs(ie, e.FORBID_CONTENTS, we)),
          ne && (O['#text'] = !0),
          K && rs(O, ['html', 'head', 'body']),
          O.table && (rs(O, ['tbody']), delete F.tbody),
          e.TRUSTED_TYPES_POLICY)
        ) {
          if ('function' != typeof e.TRUSTED_TYPES_POLICY.createHTML)
            throw ts(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
            )
          if ('function' != typeof e.TRUSTED_TYPES_POLICY.createScriptURL)
            throw ts(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
            )
          ;(w = e.TRUSTED_TYPES_POLICY), (x = w.createHTML(''))
        } else
          void 0 === w &&
            (w = (function (e, t) {
              if ('object' != typeof e || 'function' != typeof e.createPolicy)
                return null
              let n = null
              const o = 'data-tt-policy-suffix'
              t && t.hasAttribute(o) && (n = t.getAttribute(o))
              const r = 'dompurify' + (n ? '#' + n : '')
              try {
                return e.createPolicy(r, {
                  createHTML: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch (e) {
                return (
                  console.warn(
                    'TrustedTypes policy ' + r + ' could not be created.'
                  ),
                  null
                )
              }
            })(g, i)),
            null !== w && 'string' == typeof x && (x = w.createHTML(''))
        ji && ji(e), (xe = e)
      }
    },
    Te = rs({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
    Ce = rs({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
    Se = rs({}, ['title', 'style', 'font', 'a', 'script']),
    Ee = rs({}, ls)
  rs(Ee, cs), rs(Ee, ds)
  const Ae = rs({}, us)
  rs(Ae, ps)
  const Ie = function (e) {
      Wi(n.removed, { element: e })
      try {
        e.parentNode.removeChild(e)
      } catch (t) {
        e.remove()
      }
    },
    Pe = function (e, t) {
      try {
        Wi(n.removed, { attribute: t.getAttributeNode(e), from: t })
      } catch (e) {
        Wi(n.removed, { attribute: null, from: t })
      }
      if ((t.removeAttribute(e), 'is' === e && !z[e]))
        if (X || J)
          try {
            Ie(t)
          } catch (e) {}
        else
          try {
            t.setAttribute(e, '')
          } catch (e) {}
    },
    Re = function (e) {
      let t = null,
        n = null
      if (Z) e = '<remove></remove>' + e
      else {
        const t = Zi(e, /^[\r\n\t ]+/)
        n = t && t[0]
      }
      'application/xhtml+xml' === ye &&
        ge === he &&
        (e =
          '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
          e +
          '</body></html>')
      const r = w ? w.createHTML(e) : e
      if (ge === he)
        try {
          t = new h().parseFromString(r, ye)
        } catch (e) {}
      if (!t || !t.documentElement) {
        t = k.createDocument(ge, 'template', null)
        try {
          t.documentElement.innerHTML = fe ? x : r
        } catch (e) {}
      }
      const i = t.body || t.documentElement
      return (
        e && n && i.insertBefore(o.createTextNode(n), i.childNodes[0] || null),
        ge === he
          ? T.call(t, K ? 'html' : 'body')[0]
          : K
          ? t.documentElement
          : i
      )
    },
    Le = function (e) {
      return _.call(
        e.ownerDocument || e,
        e,
        d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT,
        null
      )
    },
    Me = function (e) {
      return 'function' == typeof l && e instanceof l
    },
    Ne = function (e, t, o) {
      S[e] &&
        Gi(S[e], (e) => {
          e.call(n, t, o, xe)
        })
    },
    Oe = function (e) {
      let t = null
      if (
        (Ne('beforeSanitizeElements', e, null),
        (o = e) instanceof p &&
          ('string' != typeof o.nodeName ||
            'string' != typeof o.textContent ||
            'function' != typeof o.removeChild ||
            !(o.attributes instanceof u) ||
            'function' != typeof o.removeAttribute ||
            'function' != typeof o.setAttribute ||
            'string' != typeof o.namespaceURI ||
            'function' != typeof o.insertBefore ||
            'function' != typeof o.hasChildNodes))
      )
        return Ie(e), !0
      var o
      const r = we(e.nodeName)
      if (
        (Ne('uponSanitizeElement', e, { tagName: r, allowedTags: O }),
        e.hasChildNodes() &&
          !Me(e.firstElementChild) &&
          es(/<[/\w]/g, e.innerHTML) &&
          es(/<[/\w]/g, e.textContent))
      )
        return Ie(e), !0
      if (!O[r] || F[r]) {
        if (!F[r] && ze(r)) {
          if (j.tagNameCheck instanceof RegExp && es(j.tagNameCheck, r))
            return !1
          if (j.tagNameCheck instanceof Function && j.tagNameCheck(r)) return !1
        }
        if (ne && !ie[r]) {
          const t = v(e) || e.parentNode,
            n = y(e) || e.childNodes
          if (n && t) {
            for (let o = n.length - 1; o >= 0; --o)
              t.insertBefore(b(n[o], !0), m(e))
          }
        }
        return Ie(e), !0
      }
      return e instanceof c &&
        !(function (e) {
          let t = v(e)
          ;(t && t.tagName) || (t = { namespaceURI: ge, tagName: 'template' })
          const n = Ki(e.tagName),
            o = Ki(t.tagName)
          return (
            !!be[e.namespaceURI] &&
            (e.namespaceURI === pe
              ? t.namespaceURI === he
                ? 'svg' === n
                : t.namespaceURI === ue
                ? 'svg' === n && ('annotation-xml' === o || Te[o])
                : Boolean(Ee[n])
              : e.namespaceURI === ue
              ? t.namespaceURI === he
                ? 'math' === n
                : t.namespaceURI === pe
                ? 'math' === n && Ce[o]
                : Boolean(Ae[n])
              : e.namespaceURI === he
              ? !(t.namespaceURI === pe && !Ce[o]) &&
                !(t.namespaceURI === ue && !Te[o]) &&
                !Ae[n] &&
                (Se[n] || !Ee[n])
              : !('application/xhtml+xml' !== ye || !be[e.namespaceURI]))
          )
        })(e)
        ? (Ie(e), !0)
        : ('noscript' !== r && 'noembed' !== r && 'noframes' !== r) ||
          !es(/<\/no(script|embed|frames)/i, e.innerHTML)
        ? (W &&
            3 === e.nodeType &&
            ((t = e.textContent),
            Gi([E, A, I], (e) => {
              t = Xi(t, e, ' ')
            }),
            e.textContent !== t &&
              (Wi(n.removed, { element: e.cloneNode() }), (e.textContent = t))),
          Ne('afterSanitizeElements', e, null),
          !1)
        : (Ie(e), !0)
    },
    Be = function (e, t, n) {
      if (ee && ('id' === t || 'name' === t) && (n in o || n in ke)) return !1
      if (q && !U[t] && es(P, t));
      else if (H && es(R, t));
      else if (!z[t] || U[t]) {
        if (
          !(
            (ze(e) &&
              ((j.tagNameCheck instanceof RegExp && es(j.tagNameCheck, e)) ||
                (j.tagNameCheck instanceof Function && j.tagNameCheck(e))) &&
              ((j.attributeNameCheck instanceof RegExp &&
                es(j.attributeNameCheck, t)) ||
                (j.attributeNameCheck instanceof Function &&
                  j.attributeNameCheck(t)))) ||
            ('is' === t &&
              j.allowCustomizedBuiltInElements &&
              ((j.tagNameCheck instanceof RegExp && es(j.tagNameCheck, n)) ||
                (j.tagNameCheck instanceof Function && j.tagNameCheck(n))))
          )
        )
          return !1
      } else if (ce[t]);
      else if (es(N, Xi(n, M, '')));
      else if (
        ('src' !== t && 'xlink:href' !== t && 'href' !== t) ||
        'script' === e ||
        0 !== Ji(n, 'data:') ||
        !ae[e]
      ) {
        if (G && !es(L, Xi(n, M, '')));
        else if (n) return !1
      } else;
      return !0
    },
    ze = function (e) {
      return e.indexOf('-') > 0
    },
    De = function (e) {
      Ne('beforeSanitizeAttributes', e, null)
      const { attributes: t } = e
      if (!t) return
      const o = {
        attrName: '',
        attrValue: '',
        keepAttr: !0,
        allowedAttributes: z,
      }
      let r = t.length
      for (; r--; ) {
        const i = t[r],
          { name: s, namespaceURI: a, value: l } = i,
          c = we(s)
        let d = 'value' === s ? l : Qi(l)
        if (
          ((o.attrName = c),
          (o.attrValue = d),
          (o.keepAttr = !0),
          (o.forceKeepAttr = void 0),
          Ne('uponSanitizeAttribute', e, o),
          (d = o.attrValue),
          o.forceKeepAttr)
        )
          continue
        if ((Pe(s, e), !o.keepAttr)) continue
        if (!V && es(/\/>/i, d)) {
          Pe(s, e)
          continue
        }
        W &&
          Gi([E, A, I], (e) => {
            d = Xi(d, e, ' ')
          })
        const u = we(e.nodeName)
        if (Be(u, c, d)) {
          if (
            (!te ||
              ('id' !== c && 'name' !== c) ||
              (Pe(s, e), (d = 'user-content-' + d)),
            w &&
              'object' == typeof g &&
              'function' == typeof g.getAttributeType)
          )
            if (a);
            else
              switch (g.getAttributeType(u, c)) {
                case 'TrustedHTML':
                  d = w.createHTML(d)
                  break
                case 'TrustedScriptURL':
                  d = w.createScriptURL(d)
              }
          try {
            a ? e.setAttributeNS(a, s, d) : e.setAttribute(s, d), Vi(n.removed)
          } catch (e) {}
        }
      }
      Ne('afterSanitizeAttributes', e, null)
    },
    je = function e(t) {
      let n = null
      const o = Le(t)
      for (Ne('beforeSanitizeShadowDOM', t, null); (n = o.nextNode()); )
        Ne('uponSanitizeShadowNode', n, null),
          Oe(n) || (n.content instanceof s && e(n.content), De(n))
      Ne('afterSanitizeShadowDOM', t, null)
    }
  return (
    (n.sanitize = function (e) {
      let t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        o = null,
        i = null,
        a = null,
        c = null
      if (
        ((fe = !e), fe && (e = '\x3c!--\x3e'), 'string' != typeof e && !Me(e))
      ) {
        if ('function' != typeof e.toString)
          throw ts('toString is not a function')
        if ('string' != typeof (e = e.toString()))
          throw ts('dirty is not a string, aborting')
      }
      if (!n.isSupported) return e
      if (
        (Y || $e(t), (n.removed = []), 'string' == typeof e && (oe = !1), oe)
      ) {
        if (e.nodeName) {
          const t = we(e.nodeName)
          if (!O[t] || F[t])
            throw ts('root node is forbidden and cannot be sanitized in-place')
        }
      } else if (e instanceof l)
        (o = Re('\x3c!----\x3e')),
          (i = o.ownerDocument.importNode(e, !0)),
          (1 === i.nodeType && 'BODY' === i.nodeName) || 'HTML' === i.nodeName
            ? (o = i)
            : o.appendChild(i)
      else {
        if (!X && !W && !K && -1 === e.indexOf('<'))
          return w && Q ? w.createHTML(e) : e
        if (((o = Re(e)), !o)) return X ? null : Q ? x : ''
      }
      o && Z && Ie(o.firstChild)
      const d = Le(oe ? e : o)
      for (; (a = d.nextNode()); )
        Oe(a) || (a.content instanceof s && je(a.content), De(a))
      if (oe) return e
      if (X) {
        if (J)
          for (c = $.call(o.ownerDocument); o.firstChild; )
            c.appendChild(o.firstChild)
        else c = o
        return (z.shadowroot || z.shadowrootmode) && (c = C.call(r, c, !0)), c
      }
      let u = K ? o.outerHTML : o.innerHTML
      return (
        K &&
          O['!doctype'] &&
          o.ownerDocument &&
          o.ownerDocument.doctype &&
          o.ownerDocument.doctype.name &&
          es(Cs, o.ownerDocument.doctype.name) &&
          (u = '<!DOCTYPE ' + o.ownerDocument.doctype.name + '>\n' + u),
        W &&
          Gi([E, A, I], (e) => {
            u = Xi(u, e, ' ')
          }),
        w && Q ? w.createHTML(u) : u
      )
    }),
    (n.setConfig = function () {
      $e(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}),
        (Y = !0)
    }),
    (n.clearConfig = function () {
      ;(xe = null), (Y = !1)
    }),
    (n.isValidAttribute = function (e, t, n) {
      xe || $e({})
      const o = we(e),
        r = we(t)
      return Be(o, r, n)
    }),
    (n.addHook = function (e, t) {
      'function' == typeof t && ((S[e] = S[e] || []), Wi(S[e], t))
    }),
    (n.removeHook = function (e) {
      if (S[e]) return Vi(S[e])
    }),
    (n.removeHooks = function (e) {
      S[e] && (S[e] = [])
    }),
    (n.removeAllHooks = function () {
      S = {}
    }),
    n
  )
})()
const Is = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble max-w-full"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><div class="flex flex-col overflow-hidden text-fade-in mx-4 my-2 relative text-ellipsis h-full gap-6">'
  ),
  Ps = (e) => {
    const [t, n] = k('')
    return (
      Mi.use({
        renderer: {
          link: (e, t, n) =>
            `<a href="${e}" target="_blank" rel="noopener noreferrer">${n}</a>`,
        },
      }),
      $(() => {
        ri()?.id === e.streamingMessageId &&
          n(
            As.sanitize(Mi.parse(ri()?.content ?? ''), { ADD_ATTR: ['target'] })
          )
      }),
      (() => {
        const e = Is(),
          n = e.firstChild.firstChild.firstChild,
          o = n.nextSibling
        return (
          n.style.setProperty('width', '100%'),
          n.style.setProperty('height', '100%'),
          _(() => (o.innerHTML = t())),
          e
        )
      })()
    )
  },
  Rs = ue('<div><div class="flex flex-col flex-1 gap-2">'),
  Ls = ue('<div class="flex flex-col w-full min-w-0 gap-2">'),
  Ms = (e) => {
    let t
    const [n, o] = k(0),
      [r, i] = k()
    S(() => {
      e.streamingMessageId ||
        (0 === e.messages.length && e.onAllBubblesDisplayed(),
        e.onScrollToBottom(t?.offsetTop ? t?.offsetTop - 50 : void 0))
    })
    const s = async (t) => {
      ;(e.settings.typingEmulation?.delayBetweenBubbles ??
        zn.delayBetweenBubbles) > 0 &&
        n() < e.messages.length - 1 &&
        (await new Promise((t) =>
          setTimeout(
            t,
            1e3 *
              (e.settings.typingEmulation?.delayBetweenBubbles ??
                zn.delayBetweenBubbles)
          )
        ))
      const r = e.messages[n()].id
      await e.onNewBubbleDisplayed(r),
        o(n() === e.messages.length ? n() : n() + 1),
        e.onScrollToBottom(t),
        n() === e.messages.length && (i(t), e.onAllBubblesDisplayed())
    }
    return (() => {
      const o = Ls()
      return (
        me(
          o,
          G(te, {
            get when() {
              return e.messages.length > 0
            },
            get children() {
              const t = Rs(),
                o = t.firstChild
              return (
                me(
                  t,
                  G(te, {
                    get when() {
                      return (
                        (e.theme.chat?.hostAvatar?.isEnabled ??
                          Yr.chat.hostAvatar.isEnabled) &&
                        e.messages.length > 0
                      )
                    },
                    get children() {
                      return G(oi, {
                        get hostAvatarSrc() {
                          return e.theme.chat?.hostAvatar?.url
                        },
                        get hideAvatar() {
                          return e.hideAvatar
                        },
                      })
                    },
                  }),
                  o
                ),
                me(
                  o,
                  G(ee, {
                    get each() {
                      return e.messages.slice(0, n() + 1)
                    },
                    children: (t, n) =>
                      G(Jn, {
                        message: t,
                        get typingEmulation() {
                          return e.settings.typingEmulation
                        },
                        get isTypingSkipped() {
                          return (
                            T(
                              () =>
                                !(
                                  !(
                                    e.settings.typingEmulation
                                      ?.isDisabledOnFirstMessage ??
                                    zn.isDisabledOnFirstMessage
                                  ) || 0 !== e.inputIndex
                                )
                            )() && 0 === n()
                          )
                        },
                        onTransitionEnd: s,
                        get onCompleted() {
                          return e.onSubmit
                        },
                      }),
                  })
                ),
                _(
                  (n) => {
                    const r = 'flex' + (Ft() ? ' gap-1' : ' gap-2'),
                      i =
                        e.theme.chat?.guestAvatar?.isEnabled ??
                        Yr.chat.guestAvatar.isEnabled
                          ? Ft()
                            ? 'calc(100% - 32px - 32px)'
                            : 'calc(100% - 48px - 48px)'
                          : Ft()
                          ? 'calc(100% - 32px)'
                          : 'calc(100% - 48px)'
                    return (
                      r !== n._v$ && ge(t, (n._v$ = r)),
                      i !== n._v$2 &&
                        (null != (n._v$2 = i)
                          ? o.style.setProperty('max-width', i)
                          : o.style.removeProperty('max-width')),
                      n
                    )
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                t
              )
            },
          }),
          null
        ),
        me(
          o,
          (() => {
            const o = T(() => !(!e.input || n() !== e.messages.length))
            return () =>
              o() &&
              G(Jr, {
                ref(e) {
                  'function' == typeof t ? t(e) : (t = e)
                },
                get block() {
                  return e.input
                },
                get inputIndex() {
                  return e.inputIndex
                },
                get hasHostAvatar() {
                  return (
                    e.theme.chat?.hostAvatar?.isEnabled ??
                    Yr.chat.hostAvatar.isEnabled
                  )
                },
                get guestAvatar() {
                  return e.theme.chat?.guestAvatar
                },
                get context() {
                  return e.context
                },
                get isInputPrefillEnabled() {
                  return (
                    e.settings.general?.isInputPrefillEnabled ??
                    Bn.isInputPrefillEnabled
                  )
                },
                get hasError() {
                  return e.hasError
                },
                onTransitionEnd: () => e.onScrollToBottom(r()),
                get onSubmit() {
                  return e.onSubmit
                },
                get onSkip() {
                  return e.onSkip
                },
              })
          })(),
          null
        ),
        me(
          o,
          G(te, {
            get when() {
              return e.streamingMessageId
            },
            keyed: !0,
            children: (t) =>
              (() => {
                const n = Rs(),
                  o = n.firstChild
                return (
                  me(
                    n,
                    G(te, {
                      get when() {
                        return (
                          e.theme.chat?.hostAvatar?.isEnabled ??
                          Yr.chat.hostAvatar.isEnabled
                        )
                      },
                      get children() {
                        return G(oi, {
                          get hostAvatarSrc() {
                            return e.theme.chat?.hostAvatar?.url
                          },
                          get hideAvatar() {
                            return e.hideAvatar
                          },
                        })
                      },
                    }),
                    o
                  ),
                  me(o, G(Ps, { streamingMessageId: t })),
                  _(
                    (t) => {
                      const r = 'flex' + (Ft() ? ' gap-1' : ' gap-2'),
                        i =
                          e.theme.chat?.hostAvatar?.isEnabled ??
                          Yr.chat.hostAvatar.isEnabled
                            ? Ft()
                              ? 'calc(100% - 32px - 32px)'
                              : 'calc(100% - 48px - 48px)'
                            : Ft()
                            ? 'calc(100% - 32px)'
                            : 'calc(100% - 48px)'
                      return (
                        r !== t._v$3 && ge(n, (t._v$3 = r)),
                        i !== t._v$4 &&
                          (null != (t._v$4 = i)
                            ? o.style.setProperty('max-width', i)
                            : o.style.removeProperty('max-width')),
                        t
                      )
                    },
                    { _v$3: void 0, _v$4: void 0 }
                  ),
                  n
                )
              })(),
          }),
          null
        ),
        o
      )
    })()
  },
  Ns = async (e) => {
    e?.trackingId &&
      ((e) => {
        e &&
          (window.gtag
            ? window.gtag('event', e.action, {
                event_category: De(e.category) ? void 0 : e.category,
                event_label: De(e.label) ? void 0 : e.label,
                value: e.value,
                send_to: De(e.sendTo) ? void 0 : e.sendTo,
              })
            : console.error('Google Analytics was not properly initialized'))
      })(e)
  }
let Os = null
const Bs =
    (e) =>
    async ({ messages: t, onMessageStream: n }) => {
      try {
        Os = new AbortController()
        const o = e.apiHost,
          r = await fetch(
            `${je(o) ? o : ft()}/api/integrations/openai/streamer`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId: e.sessionId, messages: t }),
              signal: Os.signal,
            }
          )
        if (!r.ok)
          return (e.retryAttempt ?? 0) < 3 &&
            (403 === r.status || 500 === r.status || 503 === r.status)
            ? (await new Promise((e) => setTimeout(e, 3e3)),
              Bs({ ...e, retryAttempt: (e.retryAttempt ?? 0) + 1 })({
                messages: t,
                onMessageStream: n,
              }))
            : {
                error: (await r.json()) || 'Failed to fetch the chat response.',
              }
        if (!r.body) throw new Error('The response body is empty.')
        let i = ''
        const s = r.body.getReader(),
          l = new TextDecoder(),
          c = (function () {
            const e = a.context
            return e ? `${e.id}${e.count++}` : 'cl-' + J++
          })()
        for (;;) {
          const { done: e, value: t } = await s.read()
          if (e) break
          if (
            ((i += l.decode(t)), n && n({ id: c, message: i }), null === Os)
          ) {
            s.cancel()
            break
          }
        }
        return (Os = null), { message: i }
      } catch (e) {
        return (
          console.error(e),
          'AbortError' === e.name
            ? ((Os = null), { error: { message: 'Request aborted' } })
            : e instanceof Error
            ? { error: { message: e.message } }
            : { error: { message: 'Failed to fetch the chat response.' } }
        )
      }
    },
  zs = (e) => {
    if (ze(e)) return null
    if ('string' == typeof e) return e
    try {
      return JSON.stringify(e)
    } catch {
      return console.warn('Failed to safely stringify variable value', e), null
    }
  },
  Ds = Object.getPrototypeOf(async function () {}).constructor,
  js = async (e) => {
    De(e?.pixelId) ||
      ((e) => {
        if (!e?.eventType || !e.pixelId) return
        if (!window.fbq)
          return void console.error(
            'Facebook Pixel was not properly initialized'
          )
        const t = e.params?.length
          ? e.params.reduce(
              (e, t) => (t.key && t.value ? { ...e, [t.key]: t.value } : e),
              {}
            )
          : void 0
        if ('Custom' === e.eventType) {
          if (!e.name) return
          window.fbq('trackSingleCustom', e.pixelId, e.name, t)
        }
        window.fbq('trackSingle', e.pixelId, e.eventType, t)
      })(e)
  },
  Fs = async (e) => {
    const t = e.customHeadCode
    je(t) &&
      ((e) => {
        e.split('</noscript>').forEach((e) => {
          const [t, n] = e.split('<noscript>'),
            o = document.createRange().createContextualFragment(t)
          if ((document.head.append(o), ze(n))) return
          const r = document.createElement('noscript'),
            i = document.createRange().createContextualFragment(n)
          r.append(i), document.head.append(r)
        })
      })(t)
    const n = e.gtmId
    je(n) &&
      document.body.prepend(
        ((e) => {
          if (document.getElementById('gtm-noscript')) return ''
          const t = document.createElement('noscript')
          t.id = 'gtm-noscript'
          const n = document.createElement('iframe')
          return (
            (n.src = `https://www.googletagmanager.com/ns.html?id=${e}`),
            (n.height = '0'),
            (n.width = '0'),
            (n.style.display = 'none'),
            (n.style.visibility = 'hidden'),
            t.appendChild(n),
            t
          )
        })(n)
      )
    const o = e.googleAnalyticsId
    var r
    je(o) &&
      (await ((r = o),
      Be(window.gtag)
        ? Promise.resolve()
        : new Promise((e) => {
            const t = document.getElementById('gtag')
            if (!t) {
              const t = document.createElement('script')
              ;(t.src = `https://www.googletagmanager.com/gtag/js?id=${r}`),
                (t.id = 'gtag')
              const n = document.createElement('script')
              ;(n.innerHTML = `window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n    \n      gtag('config', '${r}');\n      `),
                document.body.appendChild(t),
                document.body.appendChild(n),
                (t.onload = () => {
                  e()
                })
            }
            t && e()
          })))
    const i = e.pixelIds
    Be(i) &&
      ((e) => {
        const t = document.createElement('script')
        ;(t.innerHTML = `!function(f,b,e,v,n,t,s)\n  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n  n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n  n.queue=[];t=b.createElement(e);t.async=!0;\n  t.src=v;s=b.getElementsByTagName(e)[0];\n  s.parentNode.insertBefore(t,s)}(window, document,'script',\n  'https://connect.facebook.net/en_US/fbevents.js');\n  ${e
          .map((e) => `fbq('init', '${e}');`)
          .join('\n')}\n  fbq('track', 'PageView');`),
          document.head.appendChild(t)
      })(i)
  },
  Us = async ({ clientSideAction: e, context: t, onMessageStream: n }) => {
    if ('chatwoot' in e) return (o = e.chatwoot), void pn(o.scriptToExecute)
    var o
    if ('googleAnalytics' in e) return Ns(e.googleAnalytics)
    if ('scriptToExecute' in e) return pn(e.scriptToExecute)
    if ('redirect' in e)
      return (({ url: e, isNewTab: t } = {}) => {
        if (!e) return
        return window.open(e, t ? '_blank' : '_top')
          ? void 0
          : { blockedPopupUrl: e }
      })(e.redirect)
    if ('wait' in e)
      return (
        await (async ({ secondsToWaitFor: e }) => {
          await new Promise((t) => setTimeout(t, 1e3 * e))
        })(e.wait),
        e.expectsDedicatedReply ? { replyToSend: void 0 } : void 0
      )
    if ('setVariable' in e)
      return (async ({ content: e, args: t }) => {
        try {
          if (!isNaN(e) && /0[^.].+/.test(e)) return { replyToSend: e }
          const n = Ds(
              ...t.map((e) => e.id),
              e.includes('return ') ? e : `return ${e}`
            ),
            o = await n(...t.map((e) => e.value))
          return { replyToSend: zs(o) ?? void 0 }
        } catch (t) {
          return console.error(t), { replyToSend: zs(e) ?? void 0 }
        }
      })(e.setVariable.scriptToExecute)
    if ('streamOpenAiChatCompletion' in e || 'stream' in e) {
      const { error: o, message: r } = await Bs(t)({
        messages:
          'streamOpenAiChatCompletion' in e
            ? e.streamOpenAiChatCompletion?.messages
            : void 0,
        onMessageStream: n,
      })
      return o
        ? {
            replyToSend: void 0,
            logs: [
              {
                status: 'error',
                description: 'Message streaming returned an error',
                details: JSON.stringify(o, null, 2),
              },
            ],
          }
        : { replyToSend: r }
    }
    if ('webhookToExecute' in e) {
      return {
        replyToSend: await (async (e) => {
          const { url: t, method: n, body: o, headers: r } = e
          try {
            const e = await fetch(t, {
                method: n,
                body: 'GET' !== n && o ? JSON.stringify(o) : void 0,
                headers: r,
              }),
              i = e.status,
              s = await e.json()
            return JSON.stringify({ statusCode: i, data: s })
          } catch (e) {
            return (
              console.error(e),
              JSON.stringify({
                statusCode: 500,
                data: 'An error occured while executing the webhook on the client',
              })
            )
          }
        })(e.webhookToExecute),
      }
    }
    return 'startPropsToInject' in e
      ? Fs(e.startPropsToInject)
      : 'pixel' in e
      ? js(e.pixel)
      : 'codeToExecute' in e
      ? gn(e.codeToExecute)
      : void 0
  },
  Hs = ue(
    '<div class="flex flex-col animate-fade-in"><div class="flex w-full items-center"><div class="flex relative items-start typebot-host-bubble"><div class="flex items-center absolute px-4 py-2 bubble-typing " data-testid="host-bubble"></div><p class="overflow-hidden text-fade-in mx-4 my-2 whitespace-pre-wrap slate-html-container relative opacity-0 h-6 text-ellipsis">'
  ),
  qs = () =>
    (() => {
      const e = Hs(),
        t = e.firstChild.firstChild.firstChild
      return (
        t.style.setProperty('width', '64px'),
        t.style.setProperty('height', '32px'),
        me(t, G(Xt, {})),
        e
      )
    })(),
  Gs = ue(
    '<div class="flex w-full"><div class="flex flex-col w-full min-w-0"><div class="flex gap-2">'
  ),
  Vs = (e) =>
    (() => {
      const t = Gs(),
        n = t.firstChild.firstChild
      return (
        me(
          n,
          G(te, {
            get when() {
              return (
                e.theme.chat?.hostAvatar?.isEnabled ??
                Yr.chat.hostAvatar.isEnabled
              )
            },
            get children() {
              return G(oi, {
                get hostAvatarSrc() {
                  return e.theme.chat?.hostAvatar?.url
                },
              })
            },
          }),
          null
        ),
        me(n, G(qs, {}), null),
        t
      )
    })(),
  Ws = ue(
    '<div class="w-full max-w-xs p-4 text-gray-500 bg-white shadow flex flex-col gap-2 typebot-popup-blocked-toast" role="alert"><div class="flex flex-col gap-1"><span class=" text-sm font-semibold text-gray-900">Popup blocked</span><div class="text-sm font-normal">The bot wants to open a new tab but it was blocked by your browser. It needs a manual approval.</div></div><a target="_blank" class="py-1 px-4 justify-center text-sm font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 filter hover:brightness-90 active:brightness-75 typebot-button" rel="noreferrer">Continue in new tab'
  ),
  Ks = (e) =>
    (() => {
      const t = Ws(),
        n = t.firstChild.nextSibling
      return (
        (n.$$click = () => e.onLinkClick()), _(() => he(n, 'href', e.url)), t
      )
    })()
pe(['click'])
const Ys = async ({ apiHost: e, sessionId: t, clientLogs: n }) => {
    try {
      await jt.post(`${je(e) ? e : ft()}/api/v1/sessions/${t}/clientLogs`, {
        json: { clientLogs: n },
      })
    } catch (e) {
      console.log(e)
    }
  },
  Zs = ue(
    '<div class="flex flex-col overflow-y-auto w-full min-h-full px-3 pt-10 relative scrollable-container typebot-chat-view scroll-smooth gap-2">'
  ),
  Xs = ue('<div class="flex justify-end">'),
  Js = ue('<div class="w-full h-32 flex-shrink-0">'),
  Qs = (e) => {
    let t
    const [n, o] = k([
        {
          input: e.initialChatReply.input,
          messages: e.initialChatReply.messages,
          clientSideActions: e.initialChatReply.clientSideActions,
        },
      ]),
      [r, i] = k(e.initialChatReply.dynamicTheme),
      [s, a] = k(e.initialChatReply.typebot.theme),
      [l, c] = k(!1),
      [d, u] = k(),
      [p, h] = k(!1)
    S(() => {
      ;(async () => {
        const e = n()[0]
        if (!e.clientSideActions) return
        const t = e.clientSideActions.filter((e) => ze(e.lastBubbleBlockId))
        v(t)
      })()
    })
    const g = ({ id: e, message: t }) => {
      c(!1)
      const r = [...n()].pop()
      r &&
        (r.streamingMessageId !== e &&
          o((t) => [...t, { messages: [], streamingMessageId: e }]),
        ii({ id: e, content: t }))
    }
    $(() => {
      a(
        ((e, t) => ({
          ...e,
          chat: {
            ...e.chat,
            hostAvatar:
              e.chat?.hostAvatar && t?.hostAvatarUrl
                ? { ...e.chat.hostAvatar, url: t.hostAvatarUrl }
                : e.chat?.hostAvatar,
            guestAvatar:
              e.chat?.guestAvatar && t?.guestAvatarUrl
                ? { ...e.chat.guestAvatar, url: t?.guestAvatarUrl }
                : e.chat?.guestAvatar,
          },
        }))(e.initialChatReply.typebot.theme, r())
      )
    })
    const f = async (t, r) => {
        r &&
          (e.onNewLogs?.(r),
          await Ys({
            apiHost: e.context.apiHost,
            sessionId: e.initialChatReply.sessionId,
            clientLogs: r,
          })),
          h(!1)
        const s = [...n()].pop()?.input
        s?.id && e.onAnswer && t && e.onAnswer({ message: t, blockId: s.id }),
          s?.type === Le.FILE &&
            e.onNewLogs?.([
              {
                description: 'Files are not uploaded in preview mode',
                status: 'info',
              },
            ])
        const a = setTimeout(() => {
            c(!0)
          }, 1e3),
          { data: l, error: d } = await (async ({
            apiHost: e,
            message: t,
            sessionId: n,
          }) => {
            try {
              return {
                data: await jt
                  .post(
                    `${je(e) ? e : ft()}/api/v1/sessions/${n}/continueChat`,
                    { json: { message: t }, timeout: !1 }
                  )
                  .json(),
              }
            } catch (e) {
              return { error: e }
            }
          })({
            apiHost: e.context.apiHost,
            sessionId: e.initialChatReply.sessionId,
            message: t,
          })
        if ((clearTimeout(a), c(!1), d)) {
          h(!0)
          const t = [
            {
              description: 'Failed to send the reply',
              details:
                d instanceof yt
                  ? { status: d.response.status, body: await d.response.json() }
                  : d,
              status: 'error',
            },
          ]
          return (
            await Ys({
              apiHost: e.context.apiHost,
              sessionId: e.initialChatReply.sessionId,
              clientLogs: t,
            }),
            void e.onNewLogs?.(t)
          )
        }
        if (l) {
          if (
            (l.progress && e.onProgressUpdate?.(l.progress),
            l.lastMessageNewFormat &&
              Wr([
                ...Vr(),
                {
                  inputIndex: [...n()].length - 1,
                  formattedMessage: l.lastMessageNewFormat,
                },
              ]),
            l.logs && e.onNewLogs?.(l.logs),
            l.dynamicTheme && i(l.dynamicTheme),
            l.input && e.onNewInputBlock && e.onNewInputBlock(l.input),
            l.clientSideActions)
          ) {
            const e = l.clientSideActions.filter((e) => ze(e.lastBubbleBlockId))
            v(e)
          }
          o((e) => [
            ...e,
            {
              input: l.input,
              messages: l.messages,
              clientSideActions: l.clientSideActions,
            },
          ])
        }
      },
      b = (e) => {
        const o = n()
        ;(o.length >= 2 && o[o.length - 2].streamingMessageId) ||
          setTimeout(() => {
            t?.scrollTo(0, e ?? t.scrollHeight)
          }, 50)
      },
      m = async () => {
        const t = [...n()].pop()
        t && ze(t.input) && e.onEnd?.()
      },
      y = async (e) => {
        const t = [...n()].pop()
        if (t && t.clientSideActions) {
          const n = t.clientSideActions.filter((t) => t.lastBubbleBlockId === e)
          await v(n)
        }
      },
      v = async (t) => {
        for (const n of t) {
          ;('streamOpenAiChatCompletion' in n ||
            'webhookToExecute' in n ||
            'stream' in n) &&
            c(!0)
          const t = await Us({
            clientSideAction: n,
            context: {
              apiHost: e.context.apiHost,
              sessionId: e.initialChatReply.sessionId,
            },
            onMessageStream: g,
          })
          if (t && 'replyToSend' in t)
            return c(!1), void f(t.replyToSend, t.logs)
          t && 'blockedPopupUrl' in t && u(t.blockedPopupUrl)
        }
      }
    E(() => {
      ii(void 0), Wr([])
    })
    const w = () => f(void 0)
    return (() => {
      const o = Zs()
      return (
        'function' == typeof t ? be(t, o) : (t = o),
        me(
          o,
          G(ee, {
            get each() {
              return n()
            },
            children: (t, o) =>
              G(Ms, {
                get inputIndex() {
                  return o()
                },
                get messages() {
                  return t.messages
                },
                get input() {
                  return t.input
                },
                get theme() {
                  return s()
                },
                get settings() {
                  return e.initialChatReply.typebot.settings
                },
                get streamingMessageId() {
                  return t.streamingMessageId
                },
                get context() {
                  return e.context
                },
                get hideAvatar() {
                  return (
                    T(() => !t.input)() &&
                    ((n()[o() + 1]?.messages ?? 0).length > 0 ||
                      void 0 !== n()[o() + 1]?.streamingMessageId ||
                      (t.messages.length > 0 && l()))
                  )
                },
                get hasError() {
                  return T(() => !!p())() && o() === n().length - 1
                },
                onNewBubbleDisplayed: y,
                onAllBubblesDisplayed: m,
                onSubmit: f,
                onScrollToBottom: b,
                onSkip: w,
              }),
          }),
          null
        ),
        me(
          o,
          G(te, {
            get when() {
              return l()
            },
            get children() {
              return G(Vs, {
                get theme() {
                  return s()
                },
              })
            },
          }),
          null
        ),
        me(
          o,
          G(te, {
            get when() {
              return d()
            },
            keyed: !0,
            children: (e) =>
              (() => {
                const t = Xs()
                return me(t, G(Ks, { url: e, onLinkClick: () => u(void 0) })), t
              })(),
          }),
          null
        ),
        me(o, G(ea, {}), null),
        o
      )
    })()
  },
  ea = () => Js(),
  ta = ue(
    '<div class="h-full flex justify-center items-center flex-col"><p class="text-2xl text-center"></p><pre>'
  ),
  na = (e) =>
    (() => {
      const t = ta(),
        n = t.firstChild,
        o = n.nextSibling
      return (
        me(n, () => e.error.message),
        me(o, () => JSON.stringify(e.error.cause, null, 2)),
        t
      )
    })(),
  oa = 'resultId',
  ra = (e) => {
    if (e)
      try {
        return (
          sessionStorage.getItem(`${oa}-${e}`) ??
          localStorage.getItem(`${oa}-${e}`) ??
          void 0
        )
      } catch {}
  },
  ia = {
    bgImage: '--typebot-container-bg-image',
    bgColor: '--typebot-container-bg-color',
    fontFamily: '--typebot-container-font-family',
    color: '--typebot-container-color',
    progressBar: {
      position: '--typebot-progress-bar-position',
      color: '--typebot-progress-bar-color',
      colorRgb: '--typebot-progress-bar-color-rgb',
      height: '--typebot-progress-bar-height',
      top: '--typebot-progress-bar-top',
      bottom: '--typebot-progress-bar-bottom',
    },
  },
  sa = {
    hostBubbles: {
      bgColor: '--typebot-host-bubble-bg-color',
      color: '--typebot-host-bubble-color',
    },
    guestBubbles: {
      bgColor: '--typebot-guest-bubble-bg-color',
      color: '--typebot-guest-bubble-color',
    },
    inputs: {
      bgColor: '--typebot-input-bg-color',
      color: '--typebot-input-color',
      placeholderColor: '--typebot-input-placeholder-color',
    },
    buttons: {
      bgColor: '--typebot-button-bg-color',
      bgColorRgb: '--typebot-button-bg-color-rgb',
      color: '--typebot-button-color',
    },
    checkbox: {
      bgColor: '--typebot-checkbox-bg-color',
      color: '--typebot-checkbox-color',
      baseAlpha: '--selectable-base-alpha',
    },
  },
  aa = (e, t, n) => {
    ga(e.background ?? Yr.general.background, t),
      t.setProperty(
        ia.fontFamily,
        ('string' == typeof e.font ? e.font : e.font?.family) ??
          Yr.general.font.family
      ),
      la(e.progressBar ?? Yr.general.progressBar, t, n)
  },
  la = (e, t, n) => {
    const o = e.position ?? Yr.general.progressBar.position
    t.setProperty(
      ia.progressBar.position,
      'fixed' === o ? (n ? 'absolute' : 'fixed') : o
    ),
      t.setProperty(
        ia.progressBar.color,
        e.color ?? Yr.general.progressBar.color
      ),
      t.setProperty(
        ia.progressBar.colorRgb,
        Ue(e.backgroundColor ?? Yr.general.progressBar.backgroundColor).join(
          ', '
        )
      ),
      t.setProperty(
        ia.progressBar.height,
        `${e.thickness ?? Yr.general.progressBar.thickness}px`
      )
    const r = e.placement ?? Yr.general.progressBar.placement
    t.setProperty(ia.progressBar.top, 'Top' === r ? '0' : 'auto'),
      t.setProperty(ia.progressBar.bottom, 'Bottom' === r ? '0' : 'auto')
  },
  ca = (e, t) => {
    da(e.hostBubbles ?? Yr.chat.hostBubbles, t),
      ua(e.guestBubbles ?? Yr.chat.guestBubbles, t),
      pa(e.buttons ?? Yr.chat.buttons, t),
      ha(e.inputs ?? Yr.chat.inputs, t),
      ba(e.roundness ?? Yr.chat.roundness, t)
  },
  da = (e, t) => {
    t.setProperty(
      sa.hostBubbles.bgColor,
      e.backgroundColor ?? Yr.chat.hostBubbles.backgroundColor
    ),
      t.setProperty(sa.hostBubbles.color, e.color ?? Yr.chat.hostBubbles.color)
  },
  ua = (e, t) => {
    t.setProperty(
      sa.guestBubbles.bgColor,
      e.backgroundColor ?? Yr.chat.guestBubbles.backgroundColor
    ),
      t.setProperty(
        sa.guestBubbles.color,
        e.color ?? Yr.chat.guestBubbles.color
      )
  },
  pa = (e, t) => {
    const n = e.backgroundColor ?? Yr.chat.buttons.backgroundColor
    t.setProperty(sa.buttons.bgColor, n),
      t.setProperty(sa.buttons.bgColorRgb, Ue(n).join(', ')),
      t.setProperty(sa.buttons.color, e.color ?? Yr.chat.buttons.color)
  },
  ha = (e, t) => {
    t.setProperty(
      sa.inputs.bgColor,
      e.backgroundColor ?? Yr.chat.inputs.backgroundColor
    ),
      t.setProperty(sa.inputs.color, e.color ?? Yr.chat.inputs.color),
      t.setProperty(
        sa.inputs.placeholderColor,
        e.placeholderColor ?? Yr.chat.inputs.placeholderColor
      )
  },
  ga = (e, t) => {
    t.setProperty(ia.bgImage, null),
      t.setProperty(ia.bgColor, null),
      t.setProperty(e?.type === Kr.IMAGE ? ia.bgImage : ia.bgColor, fa(e)),
      t.setProperty(
        sa.checkbox.bgColor,
        e?.type === Kr.IMAGE
          ? 'rgba(255, 255, 255, 0.75)'
          : (e?.type === Kr.COLOR ? e.content : '#ffffff') ?? '#ffffff'
      )
    const n =
      e.type === Kr.IMAGE
        ? '#000000'
        : e?.type === Kr.COLOR && je(e.content)
        ? e.content
        : '#ffffff'
    t.setProperty(ia.color, He(n) ? '#303235' : '#ffffff'),
      e.type === Kr.IMAGE
        ? t.setProperty(sa.checkbox.baseAlpha, '0.40')
        : t.setProperty(sa.checkbox.baseAlpha, '0')
  },
  fa = ({ type: e, content: t } = {}) => {
    switch (e) {
      case Kr.NONE:
        return 'transparent'
      case void 0:
      case Kr.COLOR:
        return t ?? Yr.general.background.content
      case Kr.IMAGE:
        return `url(${t})`
    }
  },
  ba = (e, t) => {
    switch (e) {
      case 'none':
        t.setProperty('--typebot-border-radius', '0')
        break
      case 'medium':
        t.setProperty('--typebot-border-radius', '6px')
        break
      case 'large':
        t.setProperty('--typebot-border-radius', '20px')
    }
  }
const ma = 'typebot-font',
  ya = (e) => {
    const t = document.getElementById(ma)
    if ('string' == typeof e || 'Google' === e.type) {
      const n = ('string' == typeof e ? e : e.family) ?? Yr.general.font.family
      if (t?.getAttribute('href')?.includes(n)) return
      t?.remove()
      const o = document.createElement('link')
      return (
        (o.href = `https://fonts.bunny.net/css2?family=${n}:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap`),
        (o.rel = 'stylesheet'),
        (o.id = ma),
        void document.head.appendChild(o)
      )
    }
    if ('Custom' === e.type) {
      if (je(e.css)) {
        if (t?.innerHTML === e.css) return
        t?.remove()
        const n = document.createElement('style')
        ;(n.innerHTML = e.css), (n.id = ma), document.head.appendChild(n)
      }
      if (je(e.url)) {
        if (t?.getAttribute('href') === e.url) return
        t?.remove()
        const n = document.createElement('link')
        ;(n.href = e.url),
          (n.rel = 'stylesheet'),
          (n.id = ma),
          document.head.appendChild(n)
      }
    }
  },
  va = ue(
    '<div class="typebot-progress-bar-container"><div class="typebot-progress-bar">'
  ),
  wa = (e) =>
    (() => {
      const t = va(),
        n = t.firstChild
      return (
        _(() =>
          null != `${e.value}%`
            ? n.style.setProperty('width', `${e.value}%`)
            : n.style.removeProperty('width')
        ),
        t
      )
    })(),
  xa = ue('<style>'),
  ka = ue('<div><div class="flex w-full h-full justify-center">'),
  _a = (e) => {
    const [t, n] = k(),
      [o, r] = k(''),
      [i, s] = k(!1),
      [a, l] = k(),
      c = async () => {
        e.font && ya(e.font), s(!0)
        const t = new URLSearchParams(location.search)
        e.onInit?.()
        const o = {}
        t.forEach((e, t) => {
          o[t] = e
        })
        const i = 'string' == typeof e.typebot ? e.typebot : void 0,
          a = 'string' != typeof e.typebot || (e.isPreview ?? !1),
          { data: c, error: d } = await (async function ({
            typebot: e,
            isPreview: t,
            apiHost: n,
            prefilledVariables: o,
            resultId: r,
            stripeRedirectStatus: i,
            startFrom: s,
          }) {
            if (ze(e))
              throw new Error('Typebot ID is required to get initial messages')
            const a = bt() ?? void 0,
              l = a ? JSON.parse(a) : void 0
            if (l) {
              mt()
              try {
                return {
                  data: await jt
                    .post(
                      `${je(n) ? n : ft()}/api/v1/sessions/${
                        l.sessionId
                      }/continueChat`,
                      {
                        json: {
                          message: l
                            ? 'failed' === i
                              ? 'fail'
                              : 'Success'
                            : void 0,
                        },
                        timeout: !1,
                      }
                    )
                    .json(),
                }
              } catch (e) {
                return { error: e }
              }
            }
            const c = 'string' == typeof e ? e : e.id
            if (t)
              try {
                return {
                  data: await jt
                    .post(
                      `${
                        je(n) ? n : ft()
                      }/api/v1/typebots/${c}/preview/startChat`,
                      {
                        json: {
                          isStreamEnabled: !0,
                          startFrom: s,
                          typebot: e,
                          prefilledVariables: o,
                        },
                        timeout: !1,
                      }
                    )
                    .json(),
                }
              } catch (e) {
                return { error: e }
              }
            try {
              return {
                data: await jt
                  .post(`${je(n) ? n : ft()}/api/v1/typebots/${c}/startChat`, {
                    json: {
                      isStreamEnabled: !0,
                      prefilledVariables: o,
                      resultId: r,
                      isOnlyRegistering: !1,
                    },
                    timeout: !1,
                  })
                  .json(),
              }
            } catch (e) {
              return { error: e }
            }
          })({
            stripeRedirectStatus: t.get('redirect_status') ?? void 0,
            typebot: e.typebot,
            apiHost: e.apiHost,
            isPreview: a,
            resultId: je(e.resultId) ? e.resultId : ra(i),
            prefilledVariables: { ...o, ...e.prefilledVariables },
            startFrom: e.startFrom,
          })
        return d instanceof yt
          ? a
            ? l(
                new Error('An error occurred while loading the bot.', {
                  cause: {
                    status: d.response.status,
                    body: await d.response.json(),
                  },
                })
              )
            : 400 === d.response.status || 403 === d.response.status
            ? l(new Error('This bot is now closed.'))
            : 404 === d.response.status
            ? l(new Error("The bot you're looking for doesn't exist."))
            : l(
                new Error(
                  `Error! Couldn't initiate the chat. (${d.response.statusText})`
                )
              )
          : c
          ? (c.resultId &&
              i &&
              (
                (e = 'session') =>
                (t, n) => {
                  try {
                    return (
                      ('session' === e
                        ? localStorage
                        : sessionStorage
                      ).removeItem(`${oa}-${t}`),
                      ('session' === e ? sessionStorage : localStorage).setItem(
                        `${oa}-${t}`,
                        n
                      )
                    )
                  } catch {}
                }
              )(c.typebot.settings.general?.rememberUser?.storage)(
                i,
                c.resultId
              ),
            n(c),
            r(c.typebot.theme.customCss ?? ''),
            c.input?.id && e.onNewInputBlock && e.onNewInputBlock(c.input),
            void (c.logs && e.onNewLogs?.(c.logs)))
          : d && (console.error(d), a)
          ? l(
              new Error(
                'Error! Could not reach server. Check your connection.',
                { cause: d }
              )
            )
          : l(
              new Error('Error! Could not reach server. Check your connection.')
            )
      }
    return (
      $(() => {
        ze(e.typebot) || i() || c().then()
      }),
      $(() => {
        ze(e.typebot) ||
          'string' == typeof e.typebot ||
          (r(e.typebot.theme.customCss ?? ''),
          e.typebot.theme.general?.progressBar?.isEnabled &&
            t() &&
            !t()?.typebot.theme.general?.progressBar?.isEnabled &&
            (s(!1), c().then()))
      }),
      E(() => {
        s(!1)
      }),
      [
        (() => {
          const e = xa()
          return me(e, o), e
        })(),
        (() => {
          const e = xa()
          return (
            me(
              e,
              '#lite-badge{background-color:#fff!important;border-radius:4px!important;border-width:1px!important;bottom:20px!important;color:#111827!important;display:flex!important;font-size:14px!important;font-weight:600!important;gap:8px!important;left:auto!important;line-height:20px!important;opacity:1!important;padding:4px 8px!important;position:absolute!important;right:auto!important;text-decoration:none!important;top:auto!important;transition:background-color .2s ease-in-out!important;visibility:visible!important;z-index:50!important}#lite-badge:hover{background-color:#f7f8ff!important}'
            ),
            e
          )
        })(),
        G(te, {
          get when() {
            return a()
          },
          keyed: !0,
          children: (e) => G(na, { error: e }),
        }),
        G(te, {
          get when() {
            return t()
          },
          keyed: !0,
          children: (t) =>
            G($a, {
              get class() {
                return e.class
              },
              get initialChatReply() {
                return {
                  ...t,
                  typebot: {
                    ...t.typebot,
                    settings:
                      'string' == typeof e.typebot
                        ? t.typebot?.settings
                        : e.typebot?.settings,
                    theme:
                      'string' == typeof e.typebot
                        ? t.typebot?.theme
                        : e.typebot?.theme,
                  },
                }
              },
              get context() {
                return {
                  apiHost: e.apiHost,
                  isPreview:
                    'string' != typeof e.typebot || (e.isPreview ?? !1),
                  resultId: t.resultId,
                  sessionId: t.sessionId,
                  typebot: t.typebot,
                }
              },
              get onNewInputBlock() {
                return e.onNewInputBlock
              },
              get onNewLogs() {
                return e.onNewLogs
              },
              get onAnswer() {
                return e.onAnswer
              },
              get onEnd() {
                return e.onEnd
              },
            }),
        }),
      ]
    )
  },
  $a = (e) => {
    const [t, n] = k(e.initialChatReply.progress)
    let o
    const r = new ResizeObserver((e) => Ut(e[0].target.clientWidth < 400))
    return (
      S(() => {
        o && r.observe(o)
      }),
      $(() => {
        ya(e.initialChatReply.typebot.theme.general?.font ?? Yr.general.font),
          o &&
            ((e, t, n) => {
              if (!e) return
              const o = t?.style
              o && (aa(e.general ?? Yr.general, o, n), ca(e.chat ?? Yr.chat, o))
            })(e.initialChatReply.typebot.theme, o, e.context.isPreview)
      }),
      E(() => {
        o && r.unobserve(o)
      }),
      (() => {
        const r = ka(),
          i = r.firstChild
        return (
          'function' == typeof o ? be(o, r) : (o = r),
          me(
            r,
            G(te, {
              get when() {
                return (
                  Be(t()) &&
                  e.initialChatReply.typebot.theme.general?.progressBar
                    ?.isEnabled
                )
              },
              get children() {
                return G(wa, {
                  get value() {
                    return t()
                  },
                })
              },
            }),
            i
          ),
          me(
            i,
            G(Qs, {
              get context() {
                return e.context
              },
              get initialChatReply() {
                return e.initialChatReply
              },
              get onNewInputBlock() {
                return e.onNewInputBlock
              },
              get onAnswer() {
                return e.onAnswer
              },
              get onEnd() {
                return e.onEnd
              },
              get onNewLogs() {
                return e.onNewLogs
              },
              onProgressUpdate: n,
            })
          ),
          me(
            r,
            G(te, {
              get when() {
                return e.initialChatReply.typebot.settings.general
                  ?.isBrandingEnabled
              },
              get children() {
                return G(ht, { botContainer: o })
              },
            }),
            null
          ),
          _(() =>
            ge(
              r,
              Ge(
                'relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center typebot-container @container',
                e.class
              )
            )
          ),
          r
        )
      })()
    )
  },
  Ta = ue('<style>'),
  Ca = ue('<div part="bot">'),
  Sa = (e) => {
    const [t, n] = X(e, [
        'onOpen',
        'onClose',
        'previewMessage',
        'onPreviewMessageClick',
        'theme',
        'autoShowDelay',
      ]),
      [o, r] = k(!0),
      [i, s] = k(n.prefilledVariables),
      [a, l] = k(!1),
      [c, d] = k({
        message: t.previewMessage?.message ?? '',
        avatarUrl: t.previewMessage?.avatarUrl,
      }),
      [u, p] = k(!1),
      [h, g] = k(!1),
      [f, b] = k(Ea(t.theme?.button?.size ?? 'medium'))
    $(() => {
      b(Ea(t.theme?.button?.size ?? 'medium'))
    }),
      S(() => {
        window.addEventListener('message', m)
        const e = t.autoShowDelay,
          n = t.previewMessage?.autoShowDelay
        bt() && y(),
          Be(e) &&
            setTimeout(() => {
              y()
            }, e),
          Be(n) &&
            setTimeout(() => {
              T()
            }, n)
      }),
      E(() => {
        window.removeEventListener('message', m)
      }),
      $(() => {
        e.prefilledVariables && s((t) => ({ ...t, ...e.prefilledVariables }))
      })
    const m = (e) => {
        const { data: t } = e
        t.isFromTypebot &&
          ('open' === t.command && y(),
          'close' === t.command && v(),
          'toggle' === t.command && w(),
          'showPreviewMessage' === t.command && T(t.message),
          'hidePreviewMessage' === t.command && C(),
          'setPrefilledVariables' === t.command &&
            s((e) => ({ ...e, ...t.variables })),
          'unmount' === t.command && A())
      },
      y = () => {
        h() || g(!0), C(), p(!0), u() && t.onOpen?.()
      },
      v = () => {
        p(!1), u() && t.onClose?.()
      },
      w = () => {
        u() ? v() : y()
      },
      x = () => {
        t.onPreviewMessageClick?.(), y()
      },
      T = (e) => {
        e && d(e), u() || l(!0)
      },
      C = () => {
        l(!1)
      },
      A = () => {
        u()
          ? (v(),
            setTimeout(() => {
              r(!1)
            }, 200))
          : r(!1)
      }
    return G(te, {
      get when() {
        return o()
      },
      get children() {
        return [
          (() => {
            const e = Ta()
            return me(e, Ie), e
          })(),
          G(te, {
            get when() {
              return a()
            },
            get children() {
              return G(
                lt,
                Z(c, {
                  get placement() {
                    return t.theme?.placement
                  },
                  get previewMessageTheme() {
                    return t.theme?.previewMessage
                  },
                  get buttonSize() {
                    return f()
                  },
                  onClick: x,
                  onCloseClick: C,
                })
              )
            },
          }),
          G(
            nt,
            Z(() => t.theme?.button, {
              get placement() {
                return t.theme?.placement
              },
              toggleBot: w,
              get isBotOpened() {
                return u()
              },
              get buttonSize() {
                return f()
              },
            })
          ),
          (() => {
            const o = Ca()
            return (
              o.style.setProperty(
                'transition',
                'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out'
              ),
              o.style.setProperty(
                'box-shadow',
                'rgb(0 0 0 / 16%) 0px 5px 40px'
              ),
              o.style.setProperty('z-index', '42424242'),
              me(
                o,
                G(te, {
                  get when() {
                    return h()
                  },
                  get children() {
                    return G(
                      _a,
                      Z(n, {
                        get prefilledVariables() {
                          return i()
                        },
                        class: 'rounded-lg',
                      })
                    )
                  },
                })
              ),
              _(
                (n) => {
                  const r =
                      'large' === e.theme?.button?.size
                        ? 'calc(100% - 95px)'
                        : 'calc(100% - 80px)',
                    i = e.theme?.chatWindow?.maxHeight ?? '704px',
                    s = e.theme?.chatWindow?.maxWidth ?? '400px',
                    a =
                      'left' === e.theme?.placement
                        ? 'bottom left'
                        : 'bottom right',
                    l = u() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
                    c = t.theme?.chatWindow?.backgroundColor,
                    d = `calc(${f()} + 32px)`,
                    p =
                      'fixed rounded-lg w-full' +
                      (u() ? ' opacity-1' : ' opacity-0 pointer-events-none') +
                      ('left' === e.theme?.placement ? ' left-5' : ' right-5')
                  return (
                    r !== n._v$ &&
                      (null != (n._v$ = r)
                        ? o.style.setProperty('height', r)
                        : o.style.removeProperty('height')),
                    i !== n._v$2 &&
                      (null != (n._v$2 = i)
                        ? o.style.setProperty('max-height', i)
                        : o.style.removeProperty('max-height')),
                    s !== n._v$3 &&
                      (null != (n._v$3 = s)
                        ? o.style.setProperty('max-width', s)
                        : o.style.removeProperty('max-width')),
                    a !== n._v$4 &&
                      (null != (n._v$4 = a)
                        ? o.style.setProperty('transform-origin', a)
                        : o.style.removeProperty('transform-origin')),
                    l !== n._v$5 &&
                      (null != (n._v$5 = l)
                        ? o.style.setProperty('transform', l)
                        : o.style.removeProperty('transform')),
                    c !== n._v$6 &&
                      (null != (n._v$6 = c)
                        ? o.style.setProperty('background-color', c)
                        : o.style.removeProperty('background-color')),
                    d !== n._v$7 &&
                      (null != (n._v$7 = d)
                        ? o.style.setProperty('bottom', d)
                        : o.style.removeProperty('bottom')),
                    p !== n._v$8 && ge(o, (n._v$8 = p)),
                    n
                  )
                },
                {
                  _v$: void 0,
                  _v$2: void 0,
                  _v$3: void 0,
                  _v$4: void 0,
                  _v$5: void 0,
                  _v$6: void 0,
                  _v$7: void 0,
                  _v$8: void 0,
                }
              ),
              o
            )
          })(),
        ]
      },
    })
  },
  Ea = (e) => ('medium' === e ? '48px' : 'large' === e ? '64px' : e || '48px'),
  Aa = ue('<style>'),
  Ia = ue(
    '<div class="relative" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in" part="overlay"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div>'
  ),
  Pa = (e) => {
    const [t, n] = X(e, [
        'onOpen',
        'onClose',
        'autoShowDelay',
        'theme',
        'isOpen',
        'defaultOpen',
      ]),
      [o, r] = k(n.prefilledVariables),
      [i, s] = k(t.isOpen ?? !1)
    S(() => {
      const e = bt()
      ;(t.defaultOpen || e) && c(), window.addEventListener('message', l)
      const n = t.autoShowDelay
      Be(n) &&
        setTimeout(() => {
          c()
        }, n)
    }),
      E(() => {
        window.removeEventListener('message', l)
      }),
      $(() => {
        ze(e.isOpen) || e.isOpen === i() || u()
      }),
      $(() => {
        e.prefilledVariables && r((t) => ({ ...t, ...e.prefilledVariables }))
      })
    const a = (e) => {
        e.stopPropagation()
      },
      l = (e) => {
        const { data: t } = e
        t.isFromTypebot &&
          ('open' === t.command && c(),
          'close' === t.command && d(),
          'toggle' === t.command && u(),
          'setPrefilledVariables' === t.command &&
            r((e) => ({ ...e, ...t.variables })))
      },
      c = () => {
        s(!0),
          t.onOpen?.(),
          document.body.style.setProperty('overflow', 'hidden', 'important'),
          document.addEventListener('pointerdown', d)
      },
      d = () => {
        s(!1),
          t.onClose?.(),
          (document.body.style.overflow = 'auto'),
          document.removeEventListener('pointerdown', d)
      },
      u = () => {
        i() ? d() : c()
      }
    return G(te, {
      get when() {
        return i()
      },
      get children() {
        return [
          (() => {
            const e = Aa()
            return me(e, Ie), e
          })(),
          (() => {
            const t = Ia(),
              r = t.firstChild,
              i = r.nextSibling.nextSibling.firstChild.firstChild
            return (
              me(r, Ie),
              i.addEventListener('pointerdown', a),
              me(
                i,
                G(
                  _a,
                  Z(n, {
                    get prefilledVariables() {
                      return o()
                    },
                  })
                )
              ),
              _(
                (n) => {
                  const o = e.theme?.zIndex ?? 42424242,
                    r =
                      'relative h-[80vh] transform overflow-hidden rounded-lg text-left transition-all sm:my-8 w-full max-w-lg' +
                      (e.theme?.backgroundColor ? ' shadow-xl' : ''),
                    s = e.theme?.backgroundColor ?? 'transparent',
                    a = e.theme?.width ?? '512px'
                  return (
                    o !== n._v$ &&
                      (null != (n._v$ = o)
                        ? t.style.setProperty('z-index', o)
                        : t.style.removeProperty('z-index')),
                    r !== n._v$2 && ge(i, (n._v$2 = r)),
                    s !== n._v$3 &&
                      (null != (n._v$3 = s)
                        ? i.style.setProperty('background-color', s)
                        : i.style.removeProperty('background-color')),
                    a !== n._v$4 &&
                      (null != (n._v$4 = a)
                        ? i.style.setProperty('max-width', a)
                        : i.style.removeProperty('max-width')),
                    n
                  )
                },
                { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
              ),
              t
            )
          })(),
        ]
      },
    })
  },
  Ra = ue(
    '<style>\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow-y: hidden;\n}\n'
  ),
  La = (e, { element: t }) => {
    const [n, o] = k(!1),
      r = new IntersectionObserver((e) => {
        e.some((e) => e.isIntersecting) && o(!0)
      })
    S(() => {
      window.addEventListener('message', i), r.observe(t)
    })
    const i = (e) => {
      const { data: t } = e
      t.isFromTypebot
    }
    return (
      E(() => {
        r.disconnect()
      }),
      [
        (() => {
          const e = Ra(),
            t = e.firstChild
          return me(e, Ie, t), e
        })(),
        G(te, {
          get when() {
            return n()
          },
          get children() {
            return G(_a, e)
          },
        }),
      ]
    )
  },
  Ma = () => {
    window.postMessage({ isFromTypebot: !0, command: 'close' })
  },
  Na = () => {
    window.postMessage({ isFromTypebot: !0, command: 'hidePreviewMessage' })
  },
  Oa = () => {
    window.postMessage({ isFromTypebot: !0, command: 'open' })
  },
  Ba = (e) => {
    const t = {
      isFromTypebot: !0,
      command: 'setPrefilledVariables',
      variables: e,
    }
    window.postMessage(t)
  },
  za = (e) => {
    const t = { isFromTypebot: !0, command: 'showPreviewMessage', message: e }
    window.postMessage(t)
  },
  Da = () => {
    window.postMessage({ isFromTypebot: !0, command: 'toggle' })
  },
  ja = (e) => {
    const t = { isFromTypebot: !0, command: 'setInputValue', value: e }
    window.postMessage(t)
  },
  Fa = () => {
    window.postMessage({ isFromTypebot: !0, command: 'unmount' })
  },
  Ua = (e) => {
    const t = e.id
      ? document.getElementById(e.id)
      : document.querySelector('typebot-standard')
    if (!t) throw new Error('<typebot-standard> element not found.')
    Object.assign(t, e)
  },
  Ha = (e) => {
    const t = document.createElement('typebot-popup')
    Object.assign(t, e), document.body.prepend(t)
  },
  qa = (e) => {
    const t = document.createElement('typebot-bubble')
    Object.assign(t, e), document.body.prepend(t)
  }
'undefined' != typeof window &&
  (Ce('typebot-standard', Se, La),
  Ce('typebot-bubble', Ae, Sa),
  Ce('typebot-popup', Ee, Pa))
const Ga = {
  initStandard: Ua,
  initPopup: Ha,
  initBubble: qa,
  close: Ma,
  hidePreviewMessage: Na,
  open: Oa,
  setPrefilledVariables: Ba,
  showPreviewMessage: za,
  toggle: Da,
  setInputValue: ja,
  unmount: Fa,
}
;((e) => {
  'undefined' != typeof window && (window.Typebot = { ...e })
})(Ga)
export { Ga as default }
