#!/usr/bin/env node
(() => {
  var t = {
      530: (t, e, r) => {
        "use strict";
        var n = r(61),
          i = r.n(n),
          s = r(461),
          o = r(147),
          a = r.n(o);
        r(17), r(884), r(890), r(984);
        const c = { regex: /versionCode (\d+)/, preffix: "versionCode " },
          l = { regex: /versionName ('.*'|".*")/, preffix: "versionName " },
          h = { regex: /APP_BUILD = (\d+)/g, preffix: "APP_BUILD = " },
          u = { regex: /APP_VERSION = (.*)/g, preffix: "APP_VERSION = " },
          p = class {
            constructor(t = "android", e = null) {
              (this.nameProject = e),
                (this.platform = t),
                (this.isAndroid = "android" === t),
                (this.isIos = "ios" === t),
                (this.content = null);
            }
            async init() {
              var t, e, r, n;
              (this.path = this.isAndroid
                ? "android/app/build.gradle"
                : PATH_IOSPATH_ANDROID.replace(
                    "<projectname>",
                    this.nameProject
                  )),
                (this.paramaters = this.isAndroid
                  ? { code: c, name: l }
                  : { code: h, name: u }),
                await this.read(),
                (this.version = {
                  code: this.matchFirst(
                    null === (t = this.paramaters) ||
                      void 0 === t ||
                      null === (e = t.code) ||
                      void 0 === e
                      ? void 0
                      : e.regex
                  ),
                  name: this.matchFirst(
                    null === (r = this.paramaters) ||
                      void 0 === r ||
                      null === (n = r.name) ||
                      void 0 === n
                      ? void 0
                      : n.regex
                  ),
                }),
                (this.bumpVersion = { code: null, name: null });
            }
            matchFirst(t = null) {
              var e;
              return (
                (null === (e = this.content.match(t)) || void 0 === e
                  ? void 0
                  : e[0]) || null
              );
            }
            async read() {
              return (
                this.content ||
                  (this.content = await ((t = this.path),
                  new Promise((e, r) => {
                    a().readFile(t, "utf8", (t, n) => (t ? r(t) : e(n)));
                  }))),
                this.content
              );
              var t;
            }
            async bump(t = "name", e = 0) {
              var r, n, i, s;
              (this.content = this.content.replace(
                null === (r = this.paramaters) ||
                  void 0 === r ||
                  null === (n = r[`${t}`]) ||
                  void 0 === n
                  ? void 0
                  : n.regex,
                `${
                  null === (i = this.paramaters) ||
                  void 0 === i ||
                  null === (s = i[t]) ||
                  void 0 === s
                    ? void 0
                    : s.preffix
                }${this.isAndroid && "code" !== t ? `"${e}"` : e}`
              )),
                await this.write();
            }
            async extractBump() {
              var t, e, r, n;
              this.bumpVersion = {
                code: this.matchFirst(
                  null === (t = this.paramaters) ||
                    void 0 === t ||
                    null === (e = t.code) ||
                    void 0 === e
                    ? void 0
                    : e.regex
                ),
                name: this.matchFirst(
                  null === (r = this.paramaters) ||
                    void 0 === r ||
                    null === (n = r.name) ||
                    void 0 === n
                    ? void 0
                    : n.regex
                ),
              };
            }
            async showBump() {
              await this.extractBump(),
                console.log(i().bold.red("==========SHOW BUMP==========")),
                console.log(i().bold.green(this.isAndroid ? "Android" : "IOS")),
                console.log(i().bold.blue("*********************************")),
                console.log(
                  `${i().blue(this.version.code)}${i().green(
                    `  ~>  ${this.bumpVersion.code}`
                  )}`
                ),
                console.log(
                  `${i().blue(this.version.name)}${i().green(
                    `  ~>  ${this.bumpVersion.name}`
                  )}`
                ),
                console.log(i().blue("*********************************"));
            }
            async write() {
              var t, e;
              this.content &&
                ((t = this.path),
                (e = this.content),
                new Promise((r, n) => {
                  a().writeFile(t, e, "utf8", (t) => (t ? n(t) : r()));
                }));
            }
          },
          d = new s.Command();
        (async () => {
          var t;
          d
            .option("-n, --change:versionname <name>", "Change versionName")
            .option("-c, --change:versioncode <code>", "Change versionCode")
            .option("-p, --project <project>", "Input Project Name")
            .option("-s, --debug", "Input Project Name"),
            d.version("0.0.1"),
            d.parse(process.argv);
          const e = d.opts();
          null !== (t = Object.keys(e)) && void 0 !== t && t.length
            ? e.debug
              ? (async (t = null) => {
                  const e = new p("android", t);
                  await e.init(), await e.showBump();
                  const r = new p("ios", t);
                  await r.init(), await r.showBump();
                })(e.project)
              : (async (t = null, e = null, r = null) => {
                  try {
                    const n = new p("android", r);
                    await n.init(),
                      t && (await n.bump("name", t)),
                      e && (await n.bump("code", e)),
                      await n.showBump();
                    const i = new p("ios", r);
                    await i.init(),
                      t && (await i.bump("name", t)),
                      e && (await i.bump("code", e)),
                      await i.showBump();
                  } catch (t) {
                    console.log(i().bold.red("ERROR")), console.log(t);
                  }
                })(e["change:versionname"], e["change:versioncode"], e.project)
            : console.log(i().bold.red("-- Parameter not informed --"));
        })();
      },
      623: (t) => {
        "use strict";
        function e(t, e, i) {
          t instanceof RegExp && (t = r(t, i)),
            e instanceof RegExp && (e = r(e, i));
          var s = n(t, e, i);
          return (
            s && {
              start: s[0],
              end: s[1],
              pre: i.slice(0, s[0]),
              body: i.slice(s[0] + t.length, s[1]),
              post: i.slice(s[1] + e.length),
            }
          );
        }
        function r(t, e) {
          var r = e.match(t);
          return r ? r[0] : null;
        }
        function n(t, e, r) {
          var n,
            i,
            s,
            o,
            a,
            c = r.indexOf(t),
            l = r.indexOf(e, c + 1),
            h = c;
          if (c >= 0 && l > 0) {
            if (t === e) return [c, l];
            for (n = [], s = r.length; h >= 0 && !a; )
              h == c
                ? (n.push(h), (c = r.indexOf(t, h + 1)))
                : 1 == n.length
                ? (a = [n.pop(), l])
                : ((i = n.pop()) < s && ((s = i), (o = l)),
                  (l = r.indexOf(e, h + 1))),
                (h = c < l && c >= 0 ? c : l);
            n.length && (a = [s, o]);
          }
          return a;
        }
        (t.exports = e), (e.range = n);
      },
      644: (t, e, r) => {
        var n = r(48),
          i = r(623);
        t.exports = function (t) {
          return t
            ? ("{}" === t.substr(0, 2) && (t = "\\{\\}" + t.substr(2)),
              b(
                (function (t) {
                  return t
                    .split("\\\\")
                    .join(s)
                    .split("\\{")
                    .join(o)
                    .split("\\}")
                    .join(a)
                    .split("\\,")
                    .join(c)
                    .split("\\.")
                    .join(l);
                })(t),
                !0
              ).map(u))
            : [];
        };
        var s = "\0SLASH" + Math.random() + "\0",
          o = "\0OPEN" + Math.random() + "\0",
          a = "\0CLOSE" + Math.random() + "\0",
          c = "\0COMMA" + Math.random() + "\0",
          l = "\0PERIOD" + Math.random() + "\0";
        function h(t) {
          return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0);
        }
        function u(t) {
          return t
            .split(s)
            .join("\\")
            .split(o)
            .join("{")
            .split(a)
            .join("}")
            .split(c)
            .join(",")
            .split(l)
            .join(".");
        }
        function p(t) {
          if (!t) return [""];
          var e = [],
            r = i("{", "}", t);
          if (!r) return t.split(",");
          var n = r.pre,
            s = r.body,
            o = r.post,
            a = n.split(",");
          a[a.length - 1] += "{" + s + "}";
          var c = p(o);
          return (
            o.length && ((a[a.length - 1] += c.shift()), a.push.apply(a, c)),
            e.push.apply(e, a),
            e
          );
        }
        function d(t) {
          return "{" + t + "}";
        }
        function f(t) {
          return /^-?0\d/.test(t);
        }
        function m(t, e) {
          return t <= e;
        }
        function g(t, e) {
          return t >= e;
        }
        function b(t, e) {
          var r = [],
            s = i("{", "}", t);
          if (!s || /\$$/.test(s.pre)) return [t];
          var o,
            c = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),
            l = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),
            u = c || l,
            y = s.body.indexOf(",") >= 0;
          if (!u && !y)
            return s.post.match(/,.*\}/)
              ? b((t = s.pre + "{" + s.body + a + s.post))
              : [t];
          if (u) o = s.body.split(/\.\./);
          else if (
            1 === (o = p(s.body)).length &&
            1 === (o = b(o[0], !1).map(d)).length
          )
            return (w = s.post.length ? b(s.post, !1) : [""]).map(function (t) {
              return s.pre + o[0] + t;
            });
          var v,
            _ = s.pre,
            w = s.post.length ? b(s.post, !1) : [""];
          if (u) {
            var O = h(o[0]),
              E = h(o[1]),
              k = Math.max(o[0].length, o[1].length),
              x = 3 == o.length ? Math.abs(h(o[2])) : 1,
              A = m;
            E < O && ((x *= -1), (A = g));
            var C = o.some(f);
            v = [];
            for (var S = O; A(S, E); S += x) {
              var j;
              if (l) "\\" === (j = String.fromCharCode(S)) && (j = "");
              else if (((j = String(S)), C)) {
                var M = k - j.length;
                if (M > 0) {
                  var N = new Array(M + 1).join("0");
                  j = S < 0 ? "-" + N + j.slice(1) : N + j;
                }
              }
              v.push(j);
            }
          } else
            v = n(o, function (t) {
              return b(t, !1);
            });
          for (var I = 0; I < v.length; I++)
            for (var T = 0; T < w.length; T++) {
              var R = _ + v[I] + w[T];
              (!e || u || R) && r.push(R);
            }
          return r;
        }
      },
      64: (t, e, r) => {
        "use strict";
        t = r.nmd(t);
        const n =
            (t, e) =>
            (...r) =>
              `[${t(...r) + e}m`,
          i =
            (t, e) =>
            (...r) => {
              const n = t(...r);
              return `[${38 + e};5;${n}m`;
            },
          s =
            (t, e) =>
            (...r) => {
              const n = t(...r);
              return `[${38 + e};2;${n[0]};${n[1]};${n[2]}m`;
            },
          o = (t) => t,
          a = (t, e, r) => [t, e, r],
          c = (t, e, r) => {
            Object.defineProperty(t, e, {
              get: () => {
                const n = r();
                return (
                  Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                  }),
                  n
                );
              },
              enumerable: !0,
              configurable: !0,
            });
          };
        let l;
        const h = (t, e, n, i) => {
          void 0 === l && (l = r(621));
          const s = i ? 10 : 0,
            o = {};
          for (const [r, i] of Object.entries(l)) {
            const a = "ansi16" === r ? "ansi" : r;
            r === e
              ? (o[a] = t(n, s))
              : "object" == typeof i && (o[a] = t(i[e], s));
          }
          return o;
        };
        Object.defineProperty(t, "exports", {
          enumerable: !0,
          get: function () {
            const t = new Map(),
              e = {
                modifier: {
                  reset: [0, 0],
                  bold: [1, 22],
                  dim: [2, 22],
                  italic: [3, 23],
                  underline: [4, 24],
                  inverse: [7, 27],
                  hidden: [8, 28],
                  strikethrough: [9, 29],
                },
                color: {
                  black: [30, 39],
                  red: [31, 39],
                  green: [32, 39],
                  yellow: [33, 39],
                  blue: [34, 39],
                  magenta: [35, 39],
                  cyan: [36, 39],
                  white: [37, 39],
                  blackBright: [90, 39],
                  redBright: [91, 39],
                  greenBright: [92, 39],
                  yellowBright: [93, 39],
                  blueBright: [94, 39],
                  magentaBright: [95, 39],
                  cyanBright: [96, 39],
                  whiteBright: [97, 39],
                },
                bgColor: {
                  bgBlack: [40, 49],
                  bgRed: [41, 49],
                  bgGreen: [42, 49],
                  bgYellow: [43, 49],
                  bgBlue: [44, 49],
                  bgMagenta: [45, 49],
                  bgCyan: [46, 49],
                  bgWhite: [47, 49],
                  bgBlackBright: [100, 49],
                  bgRedBright: [101, 49],
                  bgGreenBright: [102, 49],
                  bgYellowBright: [103, 49],
                  bgBlueBright: [104, 49],
                  bgMagentaBright: [105, 49],
                  bgCyanBright: [106, 49],
                  bgWhiteBright: [107, 49],
                },
              };
            (e.color.gray = e.color.blackBright),
              (e.bgColor.bgGray = e.bgColor.bgBlackBright),
              (e.color.grey = e.color.blackBright),
              (e.bgColor.bgGrey = e.bgColor.bgBlackBright);
            for (const [r, n] of Object.entries(e)) {
              for (const [r, i] of Object.entries(n))
                (e[r] = { open: `[${i[0]}m`, close: `[${i[1]}m` }),
                  (n[r] = e[r]),
                  t.set(i[0], i[1]);
              Object.defineProperty(e, r, { value: n, enumerable: !1 });
            }
            return (
              Object.defineProperty(e, "codes", { value: t, enumerable: !1 }),
              (e.color.close = "[39m"),
              (e.bgColor.close = "[49m"),
              c(e.color, "ansi", () => h(n, "ansi16", o, !1)),
              c(e.color, "ansi256", () => h(i, "ansi256", o, !1)),
              c(e.color, "ansi16m", () => h(s, "rgb", a, !1)),
              c(e.bgColor, "ansi", () => h(n, "ansi16", o, !0)),
              c(e.bgColor, "ansi256", () => h(i, "ansi256", o, !0)),
              c(e.bgColor, "ansi16m", () => h(s, "rgb", a, !0)),
              e
            );
          },
        });
      },
      583: (t, e, r) => {
        const n = r(771),
          i = {};
        for (const t of Object.keys(n)) i[n[t]] = t;
        const s = {
          rgb: { channels: 3, labels: "rgb" },
          hsl: { channels: 3, labels: "hsl" },
          hsv: { channels: 3, labels: "hsv" },
          hwb: { channels: 3, labels: "hwb" },
          cmyk: { channels: 4, labels: "cmyk" },
          xyz: { channels: 3, labels: "xyz" },
          lab: { channels: 3, labels: "lab" },
          lch: { channels: 3, labels: "lch" },
          hex: { channels: 1, labels: ["hex"] },
          keyword: { channels: 1, labels: ["keyword"] },
          ansi16: { channels: 1, labels: ["ansi16"] },
          ansi256: { channels: 1, labels: ["ansi256"] },
          hcg: { channels: 3, labels: ["h", "c", "g"] },
          apple: { channels: 3, labels: ["r16", "g16", "b16"] },
          gray: { channels: 1, labels: ["gray"] },
        };
        t.exports = s;
        for (const t of Object.keys(s)) {
          if (!("channels" in s[t]))
            throw new Error("missing channels property: " + t);
          if (!("labels" in s[t]))
            throw new Error("missing channel labels property: " + t);
          if (s[t].labels.length !== s[t].channels)
            throw new Error("channel and label counts mismatch: " + t);
          const { channels: e, labels: r } = s[t];
          delete s[t].channels,
            delete s[t].labels,
            Object.defineProperty(s[t], "channels", { value: e }),
            Object.defineProperty(s[t], "labels", { value: r });
        }
        (s.rgb.hsl = function (t) {
          const e = t[0] / 255,
            r = t[1] / 255,
            n = t[2] / 255,
            i = Math.min(e, r, n),
            s = Math.max(e, r, n),
            o = s - i;
          let a, c;
          s === i
            ? (a = 0)
            : e === s
            ? (a = (r - n) / o)
            : r === s
            ? (a = 2 + (n - e) / o)
            : n === s && (a = 4 + (e - r) / o),
            (a = Math.min(60 * a, 360)),
            a < 0 && (a += 360);
          const l = (i + s) / 2;
          return (
            (c = s === i ? 0 : l <= 0.5 ? o / (s + i) : o / (2 - s - i)),
            [a, 100 * c, 100 * l]
          );
        }),
          (s.rgb.hsv = function (t) {
            let e, r, n, i, s;
            const o = t[0] / 255,
              a = t[1] / 255,
              c = t[2] / 255,
              l = Math.max(o, a, c),
              h = l - Math.min(o, a, c),
              u = function (t) {
                return (l - t) / 6 / h + 0.5;
              };
            return (
              0 === h
                ? ((i = 0), (s = 0))
                : ((s = h / l),
                  (e = u(o)),
                  (r = u(a)),
                  (n = u(c)),
                  o === l
                    ? (i = n - r)
                    : a === l
                    ? (i = 1 / 3 + e - n)
                    : c === l && (i = 2 / 3 + r - e),
                  i < 0 ? (i += 1) : i > 1 && (i -= 1)),
              [360 * i, 100 * s, 100 * l]
            );
          }),
          (s.rgb.hwb = function (t) {
            const e = t[0],
              r = t[1];
            let n = t[2];
            const i = s.rgb.hsl(t)[0],
              o = (1 / 255) * Math.min(e, Math.min(r, n));
            return (
              (n = 1 - (1 / 255) * Math.max(e, Math.max(r, n))),
              [i, 100 * o, 100 * n]
            );
          }),
          (s.rgb.cmyk = function (t) {
            const e = t[0] / 255,
              r = t[1] / 255,
              n = t[2] / 255,
              i = Math.min(1 - e, 1 - r, 1 - n);
            return [
              100 * ((1 - e - i) / (1 - i) || 0),
              100 * ((1 - r - i) / (1 - i) || 0),
              100 * ((1 - n - i) / (1 - i) || 0),
              100 * i,
            ];
          }),
          (s.rgb.keyword = function (t) {
            const e = i[t];
            if (e) return e;
            let r,
              s = 1 / 0;
            for (const e of Object.keys(n)) {
              const i =
                ((a = n[e]),
                ((o = t)[0] - a[0]) ** 2 +
                  (o[1] - a[1]) ** 2 +
                  (o[2] - a[2]) ** 2);
              i < s && ((s = i), (r = e));
            }
            var o, a;
            return r;
          }),
          (s.keyword.rgb = function (t) {
            return n[t];
          }),
          (s.rgb.xyz = function (t) {
            let e = t[0] / 255,
              r = t[1] / 255,
              n = t[2] / 255;
            return (
              (e = e > 0.04045 ? ((e + 0.055) / 1.055) ** 2.4 : e / 12.92),
              (r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92),
              (n = n > 0.04045 ? ((n + 0.055) / 1.055) ** 2.4 : n / 12.92),
              [
                100 * (0.4124 * e + 0.3576 * r + 0.1805 * n),
                100 * (0.2126 * e + 0.7152 * r + 0.0722 * n),
                100 * (0.0193 * e + 0.1192 * r + 0.9505 * n),
              ]
            );
          }),
          (s.rgb.lab = function (t) {
            const e = s.rgb.xyz(t);
            let r = e[0],
              n = e[1],
              i = e[2];
            return (
              (r /= 95.047),
              (n /= 100),
              (i /= 108.883),
              (r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116),
              (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116),
              (i = i > 0.008856 ? i ** (1 / 3) : 7.787 * i + 16 / 116),
              [116 * n - 16, 500 * (r - n), 200 * (n - i)]
            );
          }),
          (s.hsl.rgb = function (t) {
            const e = t[0] / 360,
              r = t[1] / 100,
              n = t[2] / 100;
            let i, s, o;
            if (0 === r) return (o = 255 * n), [o, o, o];
            i = n < 0.5 ? n * (1 + r) : n + r - n * r;
            const a = 2 * n - i,
              c = [0, 0, 0];
            for (let t = 0; t < 3; t++)
              (s = e + (1 / 3) * -(t - 1)),
                s < 0 && s++,
                s > 1 && s--,
                (o =
                  6 * s < 1
                    ? a + 6 * (i - a) * s
                    : 2 * s < 1
                    ? i
                    : 3 * s < 2
                    ? a + (i - a) * (2 / 3 - s) * 6
                    : a),
                (c[t] = 255 * o);
            return c;
          }),
          (s.hsl.hsv = function (t) {
            const e = t[0];
            let r = t[1] / 100,
              n = t[2] / 100,
              i = r;
            const s = Math.max(n, 0.01);
            return (
              (n *= 2),
              (r *= n <= 1 ? n : 2 - n),
              (i *= s <= 1 ? s : 2 - s),
              [
                e,
                100 * (0 === n ? (2 * i) / (s + i) : (2 * r) / (n + r)),
                ((n + r) / 2) * 100,
              ]
            );
          }),
          (s.hsv.rgb = function (t) {
            const e = t[0] / 60,
              r = t[1] / 100;
            let n = t[2] / 100;
            const i = Math.floor(e) % 6,
              s = e - Math.floor(e),
              o = 255 * n * (1 - r),
              a = 255 * n * (1 - r * s),
              c = 255 * n * (1 - r * (1 - s));
            switch (((n *= 255), i)) {
              case 0:
                return [n, c, o];
              case 1:
                return [a, n, o];
              case 2:
                return [o, n, c];
              case 3:
                return [o, a, n];
              case 4:
                return [c, o, n];
              case 5:
                return [n, o, a];
            }
          }),
          (s.hsv.hsl = function (t) {
            const e = t[0],
              r = t[1] / 100,
              n = t[2] / 100,
              i = Math.max(n, 0.01);
            let s, o;
            o = (2 - r) * n;
            const a = (2 - r) * i;
            return (
              (s = r * i),
              (s /= a <= 1 ? a : 2 - a),
              (s = s || 0),
              (o /= 2),
              [e, 100 * s, 100 * o]
            );
          }),
          (s.hwb.rgb = function (t) {
            const e = t[0] / 360;
            let r = t[1] / 100,
              n = t[2] / 100;
            const i = r + n;
            let s;
            i > 1 && ((r /= i), (n /= i));
            const o = Math.floor(6 * e),
              a = 1 - n;
            (s = 6 * e - o), 0 != (1 & o) && (s = 1 - s);
            const c = r + s * (a - r);
            let l, h, u;
            switch (o) {
              default:
              case 6:
              case 0:
                (l = a), (h = c), (u = r);
                break;
              case 1:
                (l = c), (h = a), (u = r);
                break;
              case 2:
                (l = r), (h = a), (u = c);
                break;
              case 3:
                (l = r), (h = c), (u = a);
                break;
              case 4:
                (l = c), (h = r), (u = a);
                break;
              case 5:
                (l = a), (h = r), (u = c);
            }
            return [255 * l, 255 * h, 255 * u];
          }),
          (s.cmyk.rgb = function (t) {
            const e = t[0] / 100,
              r = t[1] / 100,
              n = t[2] / 100,
              i = t[3] / 100;
            return [
              255 * (1 - Math.min(1, e * (1 - i) + i)),
              255 * (1 - Math.min(1, r * (1 - i) + i)),
              255 * (1 - Math.min(1, n * (1 - i) + i)),
            ];
          }),
          (s.xyz.rgb = function (t) {
            const e = t[0] / 100,
              r = t[1] / 100,
              n = t[2] / 100;
            let i, s, o;
            return (
              (i = 3.2406 * e + -1.5372 * r + -0.4986 * n),
              (s = -0.9689 * e + 1.8758 * r + 0.0415 * n),
              (o = 0.0557 * e + -0.204 * r + 1.057 * n),
              (i = i > 0.0031308 ? 1.055 * i ** (1 / 2.4) - 0.055 : 12.92 * i),
              (s = s > 0.0031308 ? 1.055 * s ** (1 / 2.4) - 0.055 : 12.92 * s),
              (o = o > 0.0031308 ? 1.055 * o ** (1 / 2.4) - 0.055 : 12.92 * o),
              (i = Math.min(Math.max(0, i), 1)),
              (s = Math.min(Math.max(0, s), 1)),
              (o = Math.min(Math.max(0, o), 1)),
              [255 * i, 255 * s, 255 * o]
            );
          }),
          (s.xyz.lab = function (t) {
            let e = t[0],
              r = t[1],
              n = t[2];
            return (
              (e /= 95.047),
              (r /= 100),
              (n /= 108.883),
              (e = e > 0.008856 ? e ** (1 / 3) : 7.787 * e + 16 / 116),
              (r = r > 0.008856 ? r ** (1 / 3) : 7.787 * r + 16 / 116),
              (n = n > 0.008856 ? n ** (1 / 3) : 7.787 * n + 16 / 116),
              [116 * r - 16, 500 * (e - r), 200 * (r - n)]
            );
          }),
          (s.lab.xyz = function (t) {
            let e, r, n;
            (r = (t[0] + 16) / 116), (e = t[1] / 500 + r), (n = r - t[2] / 200);
            const i = r ** 3,
              s = e ** 3,
              o = n ** 3;
            return (
              (r = i > 0.008856 ? i : (r - 16 / 116) / 7.787),
              (e = s > 0.008856 ? s : (e - 16 / 116) / 7.787),
              (n = o > 0.008856 ? o : (n - 16 / 116) / 7.787),
              (e *= 95.047),
              (r *= 100),
              (n *= 108.883),
              [e, r, n]
            );
          }),
          (s.lab.lch = function (t) {
            const e = t[0],
              r = t[1],
              n = t[2];
            let i;
            return (
              (i = (360 * Math.atan2(n, r)) / 2 / Math.PI),
              i < 0 && (i += 360),
              [e, Math.sqrt(r * r + n * n), i]
            );
          }),
          (s.lch.lab = function (t) {
            const e = t[0],
              r = t[1],
              n = (t[2] / 360) * 2 * Math.PI;
            return [e, r * Math.cos(n), r * Math.sin(n)];
          }),
          (s.rgb.ansi16 = function (t, e = null) {
            const [r, n, i] = t;
            let o = null === e ? s.rgb.hsv(t)[2] : e;
            if (((o = Math.round(o / 50)), 0 === o)) return 30;
            let a =
              30 +
              ((Math.round(i / 255) << 2) |
                (Math.round(n / 255) << 1) |
                Math.round(r / 255));
            return 2 === o && (a += 60), a;
          }),
          (s.hsv.ansi16 = function (t) {
            return s.rgb.ansi16(s.hsv.rgb(t), t[2]);
          }),
          (s.rgb.ansi256 = function (t) {
            const e = t[0],
              r = t[1],
              n = t[2];
            return e === r && r === n
              ? e < 8
                ? 16
                : e > 248
                ? 231
                : Math.round(((e - 8) / 247) * 24) + 232
              : 16 +
                  36 * Math.round((e / 255) * 5) +
                  6 * Math.round((r / 255) * 5) +
                  Math.round((n / 255) * 5);
          }),
          (s.ansi16.rgb = function (t) {
            let e = t % 10;
            if (0 === e || 7 === e)
              return t > 50 && (e += 3.5), (e = (e / 10.5) * 255), [e, e, e];
            const r = 0.5 * (1 + ~~(t > 50));
            return [
              (1 & e) * r * 255,
              ((e >> 1) & 1) * r * 255,
              ((e >> 2) & 1) * r * 255,
            ];
          }),
          (s.ansi256.rgb = function (t) {
            if (t >= 232) {
              const e = 10 * (t - 232) + 8;
              return [e, e, e];
            }
            let e;
            return (
              (t -= 16),
              [
                (Math.floor(t / 36) / 5) * 255,
                (Math.floor((e = t % 36) / 6) / 5) * 255,
                ((e % 6) / 5) * 255,
              ]
            );
          }),
          (s.rgb.hex = function (t) {
            const e = (
              ((255 & Math.round(t[0])) << 16) +
              ((255 & Math.round(t[1])) << 8) +
              (255 & Math.round(t[2]))
            )
              .toString(16)
              .toUpperCase();
            return "000000".substring(e.length) + e;
          }),
          (s.hex.rgb = function (t) {
            const e = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
            if (!e) return [0, 0, 0];
            let r = e[0];
            3 === e[0].length &&
              (r = r
                .split("")
                .map((t) => t + t)
                .join(""));
            const n = parseInt(r, 16);
            return [(n >> 16) & 255, (n >> 8) & 255, 255 & n];
          }),
          (s.rgb.hcg = function (t) {
            const e = t[0] / 255,
              r = t[1] / 255,
              n = t[2] / 255,
              i = Math.max(Math.max(e, r), n),
              s = Math.min(Math.min(e, r), n),
              o = i - s;
            let a, c;
            return (
              (a = o < 1 ? s / (1 - o) : 0),
              (c =
                o <= 0
                  ? 0
                  : i === e
                  ? ((r - n) / o) % 6
                  : i === r
                  ? 2 + (n - e) / o
                  : 4 + (e - r) / o),
              (c /= 6),
              (c %= 1),
              [360 * c, 100 * o, 100 * a]
            );
          }),
          (s.hsl.hcg = function (t) {
            const e = t[1] / 100,
              r = t[2] / 100,
              n = r < 0.5 ? 2 * e * r : 2 * e * (1 - r);
            let i = 0;
            return (
              n < 1 && (i = (r - 0.5 * n) / (1 - n)), [t[0], 100 * n, 100 * i]
            );
          }),
          (s.hsv.hcg = function (t) {
            const e = t[1] / 100,
              r = t[2] / 100,
              n = e * r;
            let i = 0;
            return n < 1 && (i = (r - n) / (1 - n)), [t[0], 100 * n, 100 * i];
          }),
          (s.hcg.rgb = function (t) {
            const e = t[0] / 360,
              r = t[1] / 100,
              n = t[2] / 100;
            if (0 === r) return [255 * n, 255 * n, 255 * n];
            const i = [0, 0, 0],
              s = (e % 1) * 6,
              o = s % 1,
              a = 1 - o;
            let c = 0;
            switch (Math.floor(s)) {
              case 0:
                (i[0] = 1), (i[1] = o), (i[2] = 0);
                break;
              case 1:
                (i[0] = a), (i[1] = 1), (i[2] = 0);
                break;
              case 2:
                (i[0] = 0), (i[1] = 1), (i[2] = o);
                break;
              case 3:
                (i[0] = 0), (i[1] = a), (i[2] = 1);
                break;
              case 4:
                (i[0] = o), (i[1] = 0), (i[2] = 1);
                break;
              default:
                (i[0] = 1), (i[1] = 0), (i[2] = a);
            }
            return (
              (c = (1 - r) * n),
              [255 * (r * i[0] + c), 255 * (r * i[1] + c), 255 * (r * i[2] + c)]
            );
          }),
          (s.hcg.hsv = function (t) {
            const e = t[1] / 100,
              r = e + (t[2] / 100) * (1 - e);
            let n = 0;
            return r > 0 && (n = e / r), [t[0], 100 * n, 100 * r];
          }),
          (s.hcg.hsl = function (t) {
            const e = t[1] / 100,
              r = (t[2] / 100) * (1 - e) + 0.5 * e;
            let n = 0;
            return (
              r > 0 && r < 0.5
                ? (n = e / (2 * r))
                : r >= 0.5 && r < 1 && (n = e / (2 * (1 - r))),
              [t[0], 100 * n, 100 * r]
            );
          }),
          (s.hcg.hwb = function (t) {
            const e = t[1] / 100,
              r = e + (t[2] / 100) * (1 - e);
            return [t[0], 100 * (r - e), 100 * (1 - r)];
          }),
          (s.hwb.hcg = function (t) {
            const e = t[1] / 100,
              r = 1 - t[2] / 100,
              n = r - e;
            let i = 0;
            return n < 1 && (i = (r - n) / (1 - n)), [t[0], 100 * n, 100 * i];
          }),
          (s.apple.rgb = function (t) {
            return [
              (t[0] / 65535) * 255,
              (t[1] / 65535) * 255,
              (t[2] / 65535) * 255,
            ];
          }),
          (s.rgb.apple = function (t) {
            return [
              (t[0] / 255) * 65535,
              (t[1] / 255) * 65535,
              (t[2] / 255) * 65535,
            ];
          }),
          (s.gray.rgb = function (t) {
            return [(t[0] / 100) * 255, (t[0] / 100) * 255, (t[0] / 100) * 255];
          }),
          (s.gray.hsl = function (t) {
            return [0, 0, t[0]];
          }),
          (s.gray.hsv = s.gray.hsl),
          (s.gray.hwb = function (t) {
            return [0, 100, t[0]];
          }),
          (s.gray.cmyk = function (t) {
            return [0, 0, 0, t[0]];
          }),
          (s.gray.lab = function (t) {
            return [t[0], 0, 0];
          }),
          (s.gray.hex = function (t) {
            const e = 255 & Math.round((t[0] / 100) * 255),
              r = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();
            return "000000".substring(r.length) + r;
          }),
          (s.rgb.gray = function (t) {
            return [((t[0] + t[1] + t[2]) / 3 / 255) * 100];
          });
      },
      621: (t, e, r) => {
        const n = r(583),
          i = r(691),
          s = {};
        Object.keys(n).forEach((t) => {
          (s[t] = {}),
            Object.defineProperty(s[t], "channels", { value: n[t].channels }),
            Object.defineProperty(s[t], "labels", { value: n[t].labels });
          const e = i(t);
          Object.keys(e).forEach((r) => {
            const n = e[r];
            (s[t][r] = (function (t) {
              const e = function (...e) {
                const r = e[0];
                if (null == r) return r;
                r.length > 1 && (e = r);
                const n = t(e);
                if ("object" == typeof n)
                  for (let t = n.length, e = 0; e < t; e++)
                    n[e] = Math.round(n[e]);
                return n;
              };
              return "conversion" in t && (e.conversion = t.conversion), e;
            })(n)),
              (s[t][r].raw = (function (t) {
                const e = function (...e) {
                  const r = e[0];
                  return null == r ? r : (r.length > 1 && (e = r), t(e));
                };
                return "conversion" in t && (e.conversion = t.conversion), e;
              })(n));
          });
        }),
          (t.exports = s);
      },
      691: (t, e, r) => {
        const n = r(583);
        function i(t, e) {
          return function (r) {
            return e(t(r));
          };
        }
        function s(t, e) {
          const r = [e[t].parent, t];
          let s = n[e[t].parent][t],
            o = e[t].parent;
          for (; e[o].parent; )
            r.unshift(e[o].parent),
              (s = i(n[e[o].parent][o], s)),
              (o = e[o].parent);
          return (s.conversion = r), s;
        }
        t.exports = function (t) {
          const e = (function (t) {
              const e = (function () {
                  const t = {},
                    e = Object.keys(n);
                  for (let r = e.length, n = 0; n < r; n++)
                    t[e[n]] = { distance: -1, parent: null };
                  return t;
                })(),
                r = [t];
              for (e[t].distance = 0; r.length; ) {
                const t = r.pop(),
                  i = Object.keys(n[t]);
                for (let n = i.length, s = 0; s < n; s++) {
                  const n = i[s],
                    o = e[n];
                  -1 === o.distance &&
                    ((o.distance = e[t].distance + 1),
                    (o.parent = t),
                    r.unshift(n));
                }
              }
              return e;
            })(t),
            r = {},
            i = Object.keys(e);
          for (let t = i.length, n = 0; n < t; n++) {
            const t = i[n];
            null !== e[t].parent && (r[t] = s(t, e));
          }
          return r;
        };
      },
      771: (t) => {
        "use strict";
        t.exports = {
          aliceblue: [240, 248, 255],
          antiquewhite: [250, 235, 215],
          aqua: [0, 255, 255],
          aquamarine: [127, 255, 212],
          azure: [240, 255, 255],
          beige: [245, 245, 220],
          bisque: [255, 228, 196],
          black: [0, 0, 0],
          blanchedalmond: [255, 235, 205],
          blue: [0, 0, 255],
          blueviolet: [138, 43, 226],
          brown: [165, 42, 42],
          burlywood: [222, 184, 135],
          cadetblue: [95, 158, 160],
          chartreuse: [127, 255, 0],
          chocolate: [210, 105, 30],
          coral: [255, 127, 80],
          cornflowerblue: [100, 149, 237],
          cornsilk: [255, 248, 220],
          crimson: [220, 20, 60],
          cyan: [0, 255, 255],
          darkblue: [0, 0, 139],
          darkcyan: [0, 139, 139],
          darkgoldenrod: [184, 134, 11],
          darkgray: [169, 169, 169],
          darkgreen: [0, 100, 0],
          darkgrey: [169, 169, 169],
          darkkhaki: [189, 183, 107],
          darkmagenta: [139, 0, 139],
          darkolivegreen: [85, 107, 47],
          darkorange: [255, 140, 0],
          darkorchid: [153, 50, 204],
          darkred: [139, 0, 0],
          darksalmon: [233, 150, 122],
          darkseagreen: [143, 188, 143],
          darkslateblue: [72, 61, 139],
          darkslategray: [47, 79, 79],
          darkslategrey: [47, 79, 79],
          darkturquoise: [0, 206, 209],
          darkviolet: [148, 0, 211],
          deeppink: [255, 20, 147],
          deepskyblue: [0, 191, 255],
          dimgray: [105, 105, 105],
          dimgrey: [105, 105, 105],
          dodgerblue: [30, 144, 255],
          firebrick: [178, 34, 34],
          floralwhite: [255, 250, 240],
          forestgreen: [34, 139, 34],
          fuchsia: [255, 0, 255],
          gainsboro: [220, 220, 220],
          ghostwhite: [248, 248, 255],
          gold: [255, 215, 0],
          goldenrod: [218, 165, 32],
          gray: [128, 128, 128],
          green: [0, 128, 0],
          greenyellow: [173, 255, 47],
          grey: [128, 128, 128],
          honeydew: [240, 255, 240],
          hotpink: [255, 105, 180],
          indianred: [205, 92, 92],
          indigo: [75, 0, 130],
          ivory: [255, 255, 240],
          khaki: [240, 230, 140],
          lavender: [230, 230, 250],
          lavenderblush: [255, 240, 245],
          lawngreen: [124, 252, 0],
          lemonchiffon: [255, 250, 205],
          lightblue: [173, 216, 230],
          lightcoral: [240, 128, 128],
          lightcyan: [224, 255, 255],
          lightgoldenrodyellow: [250, 250, 210],
          lightgray: [211, 211, 211],
          lightgreen: [144, 238, 144],
          lightgrey: [211, 211, 211],
          lightpink: [255, 182, 193],
          lightsalmon: [255, 160, 122],
          lightseagreen: [32, 178, 170],
          lightskyblue: [135, 206, 250],
          lightslategray: [119, 136, 153],
          lightslategrey: [119, 136, 153],
          lightsteelblue: [176, 196, 222],
          lightyellow: [255, 255, 224],
          lime: [0, 255, 0],
          limegreen: [50, 205, 50],
          linen: [250, 240, 230],
          magenta: [255, 0, 255],
          maroon: [128, 0, 0],
          mediumaquamarine: [102, 205, 170],
          mediumblue: [0, 0, 205],
          mediumorchid: [186, 85, 211],
          mediumpurple: [147, 112, 219],
          mediumseagreen: [60, 179, 113],
          mediumslateblue: [123, 104, 238],
          mediumspringgreen: [0, 250, 154],
          mediumturquoise: [72, 209, 204],
          mediumvioletred: [199, 21, 133],
          midnightblue: [25, 25, 112],
          mintcream: [245, 255, 250],
          mistyrose: [255, 228, 225],
          moccasin: [255, 228, 181],
          navajowhite: [255, 222, 173],
          navy: [0, 0, 128],
          oldlace: [253, 245, 230],
          olive: [128, 128, 0],
          olivedrab: [107, 142, 35],
          orange: [255, 165, 0],
          orangered: [255, 69, 0],
          orchid: [218, 112, 214],
          palegoldenrod: [238, 232, 170],
          palegreen: [152, 251, 152],
          paleturquoise: [175, 238, 238],
          palevioletred: [219, 112, 147],
          papayawhip: [255, 239, 213],
          peachpuff: [255, 218, 185],
          peru: [205, 133, 63],
          pink: [255, 192, 203],
          plum: [221, 160, 221],
          powderblue: [176, 224, 230],
          purple: [128, 0, 128],
          rebeccapurple: [102, 51, 153],
          red: [255, 0, 0],
          rosybrown: [188, 143, 143],
          royalblue: [65, 105, 225],
          saddlebrown: [139, 69, 19],
          salmon: [250, 128, 114],
          sandybrown: [244, 164, 96],
          seagreen: [46, 139, 87],
          seashell: [255, 245, 238],
          sienna: [160, 82, 45],
          silver: [192, 192, 192],
          skyblue: [135, 206, 235],
          slateblue: [106, 90, 205],
          slategray: [112, 128, 144],
          slategrey: [112, 128, 144],
          snow: [255, 250, 250],
          springgreen: [0, 255, 127],
          steelblue: [70, 130, 180],
          tan: [210, 180, 140],
          teal: [0, 128, 128],
          thistle: [216, 191, 216],
          tomato: [255, 99, 71],
          turquoise: [64, 224, 208],
          violet: [238, 130, 238],
          wheat: [245, 222, 179],
          white: [255, 255, 255],
          whitesmoke: [245, 245, 245],
          yellow: [255, 255, 0],
          yellowgreen: [154, 205, 50],
        };
      },
      470: (t, e, r) => {
        "use strict";
        const n = r(37),
          i = r(224),
          s = r(560),
          { env: o } = process;
        let a;
        function c(t) {
          return (
            0 !== t && {
              level: t,
              hasBasic: !0,
              has256: t >= 2,
              has16m: t >= 3,
            }
          );
        }
        function l(t, e) {
          if (0 === a) return 0;
          if (s("color=16m") || s("color=full") || s("color=truecolor"))
            return 3;
          if (s("color=256")) return 2;
          if (t && !e && void 0 === a) return 0;
          const r = a || 0;
          if ("dumb" === o.TERM) return r;
          if ("win32" === process.platform) {
            const t = n.release().split(".");
            return Number(t[0]) >= 10 && Number(t[2]) >= 10586
              ? Number(t[2]) >= 14931
                ? 3
                : 2
              : 1;
          }
          if ("CI" in o)
            return [
              "TRAVIS",
              "CIRCLECI",
              "APPVEYOR",
              "GITLAB_CI",
              "GITHUB_ACTIONS",
              "BUILDKITE",
            ].some((t) => t in o) || "codeship" === o.CI_NAME
              ? 1
              : r;
          if ("TEAMCITY_VERSION" in o)
            return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)
              ? 1
              : 0;
          if ("truecolor" === o.COLORTERM) return 3;
          if ("TERM_PROGRAM" in o) {
            const t = parseInt(
              (o.TERM_PROGRAM_VERSION || "").split(".")[0],
              10
            );
            switch (o.TERM_PROGRAM) {
              case "iTerm.app":
                return t >= 3 ? 3 : 2;
              case "Apple_Terminal":
                return 2;
            }
          }
          return /-256(color)?$/i.test(o.TERM)
            ? 2
            : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
                o.TERM
              ) || "COLORTERM" in o
            ? 1
            : r;
        }
        s("no-color") || s("no-colors") || s("color=false") || s("color=never")
          ? (a = 0)
          : (s("color") ||
              s("colors") ||
              s("color=true") ||
              s("color=always")) &&
            (a = 1),
          "FORCE_COLOR" in o &&
            (a =
              "true" === o.FORCE_COLOR
                ? 1
                : "false" === o.FORCE_COLOR
                ? 0
                : 0 === o.FORCE_COLOR.length
                ? 1
                : Math.min(parseInt(o.FORCE_COLOR, 10), 3)),
          (t.exports = {
            supportsColor: function (t) {
              return c(l(t, t && t.isTTY));
            },
            stdout: c(l(!0, i.isatty(1))),
            stderr: c(l(!0, i.isatty(2))),
          });
      },
      61: (t, e, r) => {
        "use strict";
        const n = r(64),
          { stdout: i, stderr: s } = r(470),
          { stringReplaceAll: o, stringEncaseCRLFWithFirstIndex: a } = r(559),
          { isArray: c } = Array,
          l = ["ansi", "ansi", "ansi256", "ansi16m"],
          h = Object.create(null);
        class u {
          constructor(t) {
            return p(t);
          }
        }
        const p = (t) => {
          const e = {};
          return (
            ((t, e = {}) => {
              if (
                e.level &&
                !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3)
              )
                throw new Error(
                  "The `level` option should be an integer from 0 to 3"
                );
              const r = i ? i.level : 0;
              t.level = void 0 === e.level ? r : e.level;
            })(e, t),
            (e.template = (...t) => _(e.template, ...t)),
            Object.setPrototypeOf(e, d.prototype),
            Object.setPrototypeOf(e.template, e),
            (e.template.constructor = () => {
              throw new Error(
                "`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead."
              );
            }),
            (e.template.Instance = u),
            e.template
          );
        };
        function d(t) {
          return p(t);
        }
        for (const [t, e] of Object.entries(n))
          h[t] = {
            get() {
              const r = b(
                this,
                g(e.open, e.close, this._styler),
                this._isEmpty
              );
              return Object.defineProperty(this, t, { value: r }), r;
            },
          };
        h.visible = {
          get() {
            const t = b(this, this._styler, !0);
            return Object.defineProperty(this, "visible", { value: t }), t;
          },
        };
        const f = [
          "rgb",
          "hex",
          "keyword",
          "hsl",
          "hsv",
          "hwb",
          "ansi",
          "ansi256",
        ];
        for (const t of f)
          h[t] = {
            get() {
              const { level: e } = this;
              return function (...r) {
                const i = g(
                  n.color[l[e]][t](...r),
                  n.color.close,
                  this._styler
                );
                return b(this, i, this._isEmpty);
              };
            },
          };
        for (const t of f)
          h["bg" + t[0].toUpperCase() + t.slice(1)] = {
            get() {
              const { level: e } = this;
              return function (...r) {
                const i = g(
                  n.bgColor[l[e]][t](...r),
                  n.bgColor.close,
                  this._styler
                );
                return b(this, i, this._isEmpty);
              };
            },
          };
        const m = Object.defineProperties(() => {}, {
            ...h,
            level: {
              enumerable: !0,
              get() {
                return this._generator.level;
              },
              set(t) {
                this._generator.level = t;
              },
            },
          }),
          g = (t, e, r) => {
            let n, i;
            return (
              void 0 === r
                ? ((n = t), (i = e))
                : ((n = r.openAll + t), (i = e + r.closeAll)),
              { open: t, close: e, openAll: n, closeAll: i, parent: r }
            );
          },
          b = (t, e, r) => {
            const n = (...t) =>
              c(t[0]) && c(t[0].raw)
                ? y(n, _(n, ...t))
                : y(n, 1 === t.length ? "" + t[0] : t.join(" "));
            return (
              Object.setPrototypeOf(n, m),
              (n._generator = t),
              (n._styler = e),
              (n._isEmpty = r),
              n
            );
          },
          y = (t, e) => {
            if (t.level <= 0 || !e) return t._isEmpty ? "" : e;
            let r = t._styler;
            if (void 0 === r) return e;
            const { openAll: n, closeAll: i } = r;
            if (-1 !== e.indexOf(""))
              for (; void 0 !== r; )
                (e = o(e, r.close, r.open)), (r = r.parent);
            const s = e.indexOf("\n");
            return -1 !== s && (e = a(e, i, n, s)), n + e + i;
          };
        let v;
        const _ = (t, ...e) => {
          const [n] = e;
          if (!c(n) || !c(n.raw)) return e.join(" ");
          const i = e.slice(1),
            s = [n.raw[0]];
          for (let t = 1; t < n.length; t++)
            s.push(
              String(i[t - 1]).replace(/[{}\\]/g, "\\$&"),
              String(n.raw[t])
            );
          return void 0 === v && (v = r(515)), v(t, s.join(""));
        };
        Object.defineProperties(d.prototype, h);
        const w = d();
        (w.supportsColor = i),
          (w.stderr = d({ level: s ? s.level : 0 })),
          (w.stderr.supportsColor = s),
          (t.exports = w);
      },
      515: (t) => {
        "use strict";
        const e =
            /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
          r = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
          n = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
          i = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi,
          s = new Map([
            ["n", "\n"],
            ["r", "\r"],
            ["t", "\t"],
            ["b", "\b"],
            ["f", "\f"],
            ["v", "\v"],
            ["0", "\0"],
            ["\\", "\\"],
            ["e", ""],
            ["a", ""],
          ]);
        function o(t) {
          const e = "u" === t[0],
            r = "{" === t[1];
          return (e && !r && 5 === t.length) || ("x" === t[0] && 3 === t.length)
            ? String.fromCharCode(parseInt(t.slice(1), 16))
            : e && r
            ? String.fromCodePoint(parseInt(t.slice(2, -1), 16))
            : s.get(t) || t;
        }
        function a(t, e) {
          const r = [],
            s = e.trim().split(/\s*,\s*/g);
          let a;
          for (const e of s) {
            const s = Number(e);
            if (Number.isNaN(s)) {
              if (!(a = e.match(n)))
                throw new Error(
                  `Invalid Chalk template style argument: ${e} (in style '${t}')`
                );
              r.push(a[2].replace(i, (t, e, r) => (e ? o(e) : r)));
            } else r.push(s);
          }
          return r;
        }
        function c(t) {
          r.lastIndex = 0;
          const e = [];
          let n;
          for (; null !== (n = r.exec(t)); ) {
            const t = n[1];
            if (n[2]) {
              const r = a(t, n[2]);
              e.push([t].concat(r));
            } else e.push([t]);
          }
          return e;
        }
        function l(t, e) {
          const r = {};
          for (const t of e)
            for (const e of t.styles) r[e[0]] = t.inverse ? null : e.slice(1);
          let n = t;
          for (const [t, e] of Object.entries(r))
            if (Array.isArray(e)) {
              if (!(t in n)) throw new Error(`Unknown Chalk style: ${t}`);
              n = e.length > 0 ? n[t](...e) : n[t];
            }
          return n;
        }
        t.exports = (t, r) => {
          const n = [],
            i = [];
          let s = [];
          if (
            (r.replace(e, (e, r, a, h, u, p) => {
              if (r) s.push(o(r));
              else if (h) {
                const e = s.join("");
                (s = []),
                  i.push(0 === n.length ? e : l(t, n)(e)),
                  n.push({ inverse: a, styles: c(h) });
              } else if (u) {
                if (0 === n.length)
                  throw new Error(
                    "Found extraneous } in Chalk template literal"
                  );
                i.push(l(t, n)(s.join(""))), (s = []), n.pop();
              } else s.push(p);
            }),
            i.push(s.join("")),
            n.length > 0)
          ) {
            const t = `Chalk template literal is missing ${
              n.length
            } closing bracket${1 === n.length ? "" : "s"} (\`}\`)`;
            throw new Error(t);
          }
          return i.join("");
        };
      },
      559: (t) => {
        "use strict";
        t.exports = {
          stringReplaceAll: (t, e, r) => {
            let n = t.indexOf(e);
            if (-1 === n) return t;
            const i = e.length;
            let s = 0,
              o = "";
            do {
              (o += t.substr(s, n - s) + e + r),
                (s = n + i),
                (n = t.indexOf(e, s));
            } while (-1 !== n);
            return (o += t.substr(s)), o;
          },
          stringEncaseCRLFWithFirstIndex: (t, e, r, n) => {
            let i = 0,
              s = "";
            do {
              const o = "\r" === t[n - 1];
              (s +=
                t.substr(i, (o ? n - 1 : n) - i) + e + (o ? "\r\n" : "\n") + r),
                (i = n + 1),
                (n = t.indexOf("\n", i));
            } while (-1 !== n);
            return (s += t.substr(i)), s;
          },
        };
      },
      48: (t) => {
        t.exports = function (t, r) {
          for (var n = [], i = 0; i < t.length; i++) {
            var s = r(t[i], i);
            e(s) ? n.push.apply(n, s) : n.push(s);
          }
          return n;
        };
        var e =
          Array.isArray ||
          function (t) {
            return "[object Array]" === Object.prototype.toString.call(t);
          };
      },
      334: (t, e, r) => {
        (t.exports = h),
          (h.realpath = h),
          (h.sync = u),
          (h.realpathSync = u),
          (h.monkeypatch = function () {
            (n.realpath = h), (n.realpathSync = u);
          }),
          (h.unmonkeypatch = function () {
            (n.realpath = i), (n.realpathSync = s);
          });
        var n = r(147),
          i = n.realpath,
          s = n.realpathSync,
          o = process.version,
          a = /^v[0-5]\./.test(o),
          c = r(59);
        function l(t) {
          return (
            t &&
            "realpath" === t.syscall &&
            ("ELOOP" === t.code ||
              "ENOMEM" === t.code ||
              "ENAMETOOLONG" === t.code)
          );
        }
        function h(t, e, r) {
          if (a) return i(t, e, r);
          "function" == typeof e && ((r = e), (e = null)),
            i(t, e, function (n, i) {
              l(n) ? c.realpath(t, e, r) : r(n, i);
            });
        }
        function u(t, e) {
          if (a) return s(t, e);
          try {
            return s(t, e);
          } catch (r) {
            if (l(r)) return c.realpathSync(t, e);
            throw r;
          }
        }
      },
      59: (t, e, r) => {
        var n = r(17),
          i = "win32" === process.platform,
          s = r(147),
          o = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
        if ((n.normalize, i)) var a = /(.*?)(?:[\/\\]+|$)/g;
        else a = /(.*?)(?:[\/]+|$)/g;
        if (i) var c = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
        else c = /^[\/]*/;
        (e.realpathSync = function (t, e) {
          if (
            ((t = n.resolve(t)),
            e && Object.prototype.hasOwnProperty.call(e, t))
          )
            return e[t];
          var r,
            o,
            l,
            h,
            u = t,
            p = {},
            d = {};
          function f() {
            var e = c.exec(t);
            (r = e[0].length),
              (o = e[0]),
              (l = e[0]),
              (h = ""),
              i && !d[l] && (s.lstatSync(l), (d[l] = !0));
          }
          for (f(); r < t.length; ) {
            a.lastIndex = r;
            var m = a.exec(t);
            if (
              ((h = o),
              (o += m[0]),
              (l = h + m[1]),
              (r = a.lastIndex),
              !(d[l] || (e && e[l] === l)))
            ) {
              var g;
              if (e && Object.prototype.hasOwnProperty.call(e, l)) g = e[l];
              else {
                var b = s.lstatSync(l);
                if (!b.isSymbolicLink()) {
                  (d[l] = !0), e && (e[l] = l);
                  continue;
                }
                var y = null;
                if (!i) {
                  var v = b.dev.toString(32) + ":" + b.ino.toString(32);
                  p.hasOwnProperty(v) && (y = p[v]);
                }
                null === y && (s.statSync(l), (y = s.readlinkSync(l))),
                  (g = n.resolve(h, y)),
                  e && (e[l] = g),
                  i || (p[v] = y);
              }
              (t = n.resolve(g, t.slice(r))), f();
            }
          }
          return e && (e[u] = t), t;
        }),
          (e.realpath = function (t, e, r) {
            if (
              ("function" != typeof r &&
                ((r = (function (t) {
                  return "function" == typeof t
                    ? t
                    : (function () {
                        var t;
                        if (o) {
                          var e = new Error();
                          t = function (t) {
                            t && ((e.message = t.message), r((t = e)));
                          };
                        } else t = r;
                        return t;
                        function r(t) {
                          if (t) {
                            if (process.throwDeprecation) throw t;
                            if (!process.noDeprecation) {
                              var e =
                                "fs: missing callback " +
                                (t.stack || t.message);
                              process.traceDeprecation
                                ? console.trace(e)
                                : console.error(e);
                            }
                          }
                        }
                      })();
                })(e)),
                (e = null)),
              (t = n.resolve(t)),
              e && Object.prototype.hasOwnProperty.call(e, t))
            )
              return process.nextTick(r.bind(null, null, e[t]));
            var l,
              h,
              u,
              p,
              d = t,
              f = {},
              m = {};
            function g() {
              var e = c.exec(t);
              (l = e[0].length),
                (h = e[0]),
                (u = e[0]),
                (p = ""),
                i && !m[u]
                  ? s.lstat(u, function (t) {
                      if (t) return r(t);
                      (m[u] = !0), b();
                    })
                  : process.nextTick(b);
            }
            function b() {
              if (l >= t.length) return e && (e[d] = t), r(null, t);
              a.lastIndex = l;
              var n = a.exec(t);
              return (
                (p = h),
                (h += n[0]),
                (u = p + n[1]),
                (l = a.lastIndex),
                m[u] || (e && e[u] === u)
                  ? process.nextTick(b)
                  : e && Object.prototype.hasOwnProperty.call(e, u)
                  ? _(e[u])
                  : s.lstat(u, y)
              );
            }
            function y(t, n) {
              if (t) return r(t);
              if (!n.isSymbolicLink())
                return (m[u] = !0), e && (e[u] = u), process.nextTick(b);
              if (!i) {
                var o = n.dev.toString(32) + ":" + n.ino.toString(32);
                if (f.hasOwnProperty(o)) return v(null, f[o], u);
              }
              s.stat(u, function (t) {
                if (t) return r(t);
                s.readlink(u, function (t, e) {
                  i || (f[o] = e), v(t, e);
                });
              });
            }
            function v(t, i, s) {
              if (t) return r(t);
              var o = n.resolve(p, i);
              e && (e[s] = o), _(o);
            }
            function _(e) {
              (t = n.resolve(e, t.slice(l))), g();
            }
            g();
          });
      },
      772: (t, e, r) => {
        function n(t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }
        (e.setopts = function (t, e, r) {
          if ((r || (r = {}), r.matchBase && -1 === e.indexOf("/"))) {
            if (r.noglobstar)
              throw new Error("base matching requires globstar");
            e = "**/" + e;
          }
          (t.silent = !!r.silent),
            (t.pattern = e),
            (t.strict = !1 !== r.strict),
            (t.realpath = !!r.realpath),
            (t.realpathCache = r.realpathCache || Object.create(null)),
            (t.follow = !!r.follow),
            (t.dot = !!r.dot),
            (t.mark = !!r.mark),
            (t.nodir = !!r.nodir),
            t.nodir && (t.mark = !0),
            (t.sync = !!r.sync),
            (t.nounique = !!r.nounique),
            (t.nonull = !!r.nonull),
            (t.nosort = !!r.nosort),
            (t.nocase = !!r.nocase),
            (t.stat = !!r.stat),
            (t.noprocess = !!r.noprocess),
            (t.absolute = !!r.absolute),
            (t.fs = r.fs || i),
            (t.maxLength = r.maxLength || 1 / 0),
            (t.cache = r.cache || Object.create(null)),
            (t.statCache = r.statCache || Object.create(null)),
            (t.symlinks = r.symlinks || Object.create(null)),
            (function (t, e) {
              (t.ignore = e.ignore || []),
                Array.isArray(t.ignore) || (t.ignore = [t.ignore]),
                t.ignore.length && (t.ignore = t.ignore.map(h));
            })(t, r),
            (t.changedCwd = !1);
          var o = process.cwd();
          n(r, "cwd")
            ? ((t.cwd = s.resolve(r.cwd)), (t.changedCwd = t.cwd !== o))
            : (t.cwd = o),
            (t.root = r.root || s.resolve(t.cwd, "/")),
            (t.root = s.resolve(t.root)),
            "win32" === process.platform &&
              (t.root = t.root.replace(/\\/g, "/")),
            (t.cwdAbs = a(t.cwd) ? t.cwd : u(t, t.cwd)),
            "win32" === process.platform &&
              (t.cwdAbs = t.cwdAbs.replace(/\\/g, "/")),
            (t.nomount = !!r.nomount),
            (r.nonegate = !0),
            (r.nocomment = !0),
            (t.minimatch = new c(e, r)),
            (t.options = t.minimatch.options);
        }),
          (e.ownProp = n),
          (e.makeAbs = u),
          (e.finish = function (t) {
            for (
              var e = t.nounique,
                r = e ? [] : Object.create(null),
                n = 0,
                i = t.matches.length;
              n < i;
              n++
            ) {
              var s = t.matches[n];
              if (s && 0 !== Object.keys(s).length) {
                var o = Object.keys(s);
                e
                  ? r.push.apply(r, o)
                  : o.forEach(function (t) {
                      r[t] = !0;
                    });
              } else if (t.nonull) {
                var a = t.minimatch.globSet[n];
                e ? r.push(a) : (r[a] = !0);
              }
            }
            if (
              (e || (r = Object.keys(r)), t.nosort || (r = r.sort(l)), t.mark)
            ) {
              for (n = 0; n < r.length; n++) r[n] = t._mark(r[n]);
              t.nodir &&
                (r = r.filter(function (e) {
                  var r = !/\/$/.test(e),
                    n = t.cache[e] || t.cache[u(t, e)];
                  return r && n && (r = "DIR" !== n && !Array.isArray(n)), r;
                }));
            }
            t.ignore.length &&
              (r = r.filter(function (e) {
                return !p(t, e);
              })),
              (t.found = r);
          }),
          (e.mark = function (t, e) {
            var r = u(t, e),
              n = t.cache[r],
              i = e;
            if (n) {
              var s = "DIR" === n || Array.isArray(n),
                o = "/" === e.slice(-1);
              if (
                (s && !o ? (i += "/") : !s && o && (i = i.slice(0, -1)),
                i !== e)
              ) {
                var a = u(t, i);
                (t.statCache[a] = t.statCache[r]), (t.cache[a] = t.cache[r]);
              }
            }
            return i;
          }),
          (e.isIgnored = p),
          (e.childrenIgnored = function (t, e) {
            return (
              !!t.ignore.length &&
              t.ignore.some(function (t) {
                return !(!t.gmatcher || !t.gmatcher.match(e));
              })
            );
          });
        var i = r(147),
          s = r(17),
          o = r(171),
          a = r(95),
          c = o.Minimatch;
        function l(t, e) {
          return t.localeCompare(e, "en");
        }
        function h(t) {
          var e = null;
          if ("/**" === t.slice(-3)) {
            var r = t.replace(/(\/\*\*)+$/, "");
            e = new c(r, { dot: !0 });
          }
          return { matcher: new c(t, { dot: !0 }), gmatcher: e };
        }
        function u(t, e) {
          var r = e;
          return (
            (r =
              "/" === e.charAt(0)
                ? s.join(t.root, e)
                : a(e) || "" === e
                ? e
                : t.changedCwd
                ? s.resolve(t.cwd, e)
                : s.resolve(e)),
            "win32" === process.platform && (r = r.replace(/\\/g, "/")),
            r
          );
        }
        function p(t, e) {
          return (
            !!t.ignore.length &&
            t.ignore.some(function (t) {
              return (
                t.matcher.match(e) || !(!t.gmatcher || !t.gmatcher.match(e))
              );
            })
          );
        }
      },
      884: (t, e, r) => {
        t.exports = y;
        var n = r(334),
          i = r(171),
          s = (i.Minimatch, r(378)),
          o = r(361).EventEmitter,
          a = r(17),
          c = r(491),
          l = r(95),
          h = r(751),
          u = r(772),
          p = u.setopts,
          d = u.ownProp,
          f = r(844),
          m = (r(837), u.childrenIgnored),
          g = u.isIgnored,
          b = r(778);
        function y(t, e, r) {
          if (
            ("function" == typeof e && ((r = e), (e = {})),
            e || (e = {}),
            e.sync)
          ) {
            if (r) throw new TypeError("callback provided to sync glob");
            return h(t, e);
          }
          return new _(t, e, r);
        }
        y.sync = h;
        var v = (y.GlobSync = h.GlobSync);
        function _(t, e, r) {
          if (("function" == typeof e && ((r = e), (e = null)), e && e.sync)) {
            if (r) throw new TypeError("callback provided to sync glob");
            return new v(t, e);
          }
          if (!(this instanceof _)) return new _(t, e, r);
          p(this, t, e), (this._didRealPath = !1);
          var n = this.minimatch.set.length;
          (this.matches = new Array(n)),
            "function" == typeof r &&
              ((r = b(r)),
              this.on("error", r),
              this.on("end", function (t) {
                r(null, t);
              }));
          var i = this;
          if (
            ((this._processing = 0),
            (this._emitQueue = []),
            (this._processQueue = []),
            (this.paused = !1),
            this.noprocess)
          )
            return this;
          if (0 === n) return o();
          for (var s = 0; s < n; s++)
            this._process(this.minimatch.set[s], s, !1, o);
          function o() {
            --i._processing, i._processing <= 0 && i._finish();
          }
        }
        (y.glob = y),
          (y.hasMagic = function (t, e) {
            var r = (function (t, e) {
              if (null === e || "object" != typeof e) return t;
              for (var r = Object.keys(e), n = r.length; n--; )
                t[r[n]] = e[r[n]];
              return t;
            })({}, e);
            r.noprocess = !0;
            var n = new _(t, r).minimatch.set;
            if (!t) return !1;
            if (n.length > 1) return !0;
            for (var i = 0; i < n[0].length; i++)
              if ("string" != typeof n[0][i]) return !0;
            return !1;
          }),
          (y.Glob = _),
          s(_, o),
          (_.prototype._finish = function () {
            if ((c(this instanceof _), !this.aborted)) {
              if (this.realpath && !this._didRealpath) return this._realpath();
              u.finish(this), this.emit("end", this.found);
            }
          }),
          (_.prototype._realpath = function () {
            if (!this._didRealpath) {
              this._didRealpath = !0;
              var t = this.matches.length;
              if (0 === t) return this._finish();
              for (var e = this, r = 0; r < this.matches.length; r++)
                this._realpathSet(r, n);
            }
            function n() {
              0 == --t && e._finish();
            }
          }),
          (_.prototype._realpathSet = function (t, e) {
            var r = this.matches[t];
            if (!r) return e();
            var i = Object.keys(r),
              s = this,
              o = i.length;
            if (0 === o) return e();
            var a = (this.matches[t] = Object.create(null));
            i.forEach(function (r, i) {
              (r = s._makeAbs(r)),
                n.realpath(r, s.realpathCache, function (n, i) {
                  n
                    ? "stat" === n.syscall
                      ? (a[r] = !0)
                      : s.emit("error", n)
                    : (a[i] = !0),
                    0 == --o && ((s.matches[t] = a), e());
                });
            });
          }),
          (_.prototype._mark = function (t) {
            return u.mark(this, t);
          }),
          (_.prototype._makeAbs = function (t) {
            return u.makeAbs(this, t);
          }),
          (_.prototype.abort = function () {
            (this.aborted = !0), this.emit("abort");
          }),
          (_.prototype.pause = function () {
            this.paused || ((this.paused = !0), this.emit("pause"));
          }),
          (_.prototype.resume = function () {
            if (this.paused) {
              if (
                (this.emit("resume"),
                (this.paused = !1),
                this._emitQueue.length)
              ) {
                var t = this._emitQueue.slice(0);
                this._emitQueue.length = 0;
                for (var e = 0; e < t.length; e++) {
                  var r = t[e];
                  this._emitMatch(r[0], r[1]);
                }
              }
              if (this._processQueue.length) {
                var n = this._processQueue.slice(0);
                for (this._processQueue.length = 0, e = 0; e < n.length; e++) {
                  var i = n[e];
                  this._processing--, this._process(i[0], i[1], i[2], i[3]);
                }
              }
            }
          }),
          (_.prototype._process = function (t, e, r, n) {
            if (
              (c(this instanceof _), c("function" == typeof n), !this.aborted)
            )
              if ((this._processing++, this.paused))
                this._processQueue.push([t, e, r, n]);
              else {
                for (var s, o = 0; "string" == typeof t[o]; ) o++;
                switch (o) {
                  case t.length:
                    return void this._processSimple(t.join("/"), e, n);
                  case 0:
                    s = null;
                    break;
                  default:
                    s = t.slice(0, o).join("/");
                }
                var a,
                  h = t.slice(o);
                null === s
                  ? (a = ".")
                  : l(s) || l(t.join("/"))
                  ? ((s && l(s)) || (s = "/" + s), (a = s))
                  : (a = s);
                var u = this._makeAbs(a);
                if (m(this, a)) return n();
                h[0] === i.GLOBSTAR
                  ? this._processGlobStar(s, a, u, h, e, r, n)
                  : this._processReaddir(s, a, u, h, e, r, n);
              }
          }),
          (_.prototype._processReaddir = function (t, e, r, n, i, s, o) {
            var a = this;
            this._readdir(r, s, function (c, l) {
              return a._processReaddir2(t, e, r, n, i, s, l, o);
            });
          }),
          (_.prototype._processReaddir2 = function (t, e, r, n, i, s, o, c) {
            if (!o) return c();
            for (
              var l = n[0],
                h = !!this.minimatch.negate,
                u = l._glob,
                p = this.dot || "." === u.charAt(0),
                d = [],
                f = 0;
              f < o.length;
              f++
            )
              ("." !== (g = o[f]).charAt(0) || p) &&
                (h && !t ? !g.match(l) : g.match(l)) &&
                d.push(g);
            var m = d.length;
            if (0 === m) return c();
            if (1 === n.length && !this.mark && !this.stat) {
              for (
                this.matches[i] || (this.matches[i] = Object.create(null)),
                  f = 0;
                f < m;
                f++
              ) {
                var g = d[f];
                t && (g = "/" !== t ? t + "/" + g : t + g),
                  "/" !== g.charAt(0) ||
                    this.nomount ||
                    (g = a.join(this.root, g)),
                  this._emitMatch(i, g);
              }
              return c();
            }
            for (n.shift(), f = 0; f < m; f++)
              (g = d[f]),
                t && (g = "/" !== t ? t + "/" + g : t + g),
                this._process([g].concat(n), i, s, c);
            c();
          }),
          (_.prototype._emitMatch = function (t, e) {
            if (!this.aborted && !g(this, e))
              if (this.paused) this._emitQueue.push([t, e]);
              else {
                var r = l(e) ? e : this._makeAbs(e);
                if (
                  (this.mark && (e = this._mark(e)),
                  this.absolute && (e = r),
                  !this.matches[t][e])
                ) {
                  if (this.nodir) {
                    var n = this.cache[r];
                    if ("DIR" === n || Array.isArray(n)) return;
                  }
                  this.matches[t][e] = !0;
                  var i = this.statCache[r];
                  i && this.emit("stat", e, i), this.emit("match", e);
                }
              }
          }),
          (_.prototype._readdirInGlobStar = function (t, e) {
            if (!this.aborted) {
              if (this.follow) return this._readdir(t, !1, e);
              var r = this,
                n = f("lstat\0" + t, function (n, i) {
                  if (n && "ENOENT" === n.code) return e();
                  var s = i && i.isSymbolicLink();
                  (r.symlinks[t] = s),
                    s || !i || i.isDirectory()
                      ? r._readdir(t, !1, e)
                      : ((r.cache[t] = "FILE"), e());
                });
              n && r.fs.lstat(t, n);
            }
          }),
          (_.prototype._readdir = function (t, e, r) {
            if (!this.aborted && (r = f("readdir\0" + t + "\0" + e, r))) {
              if (e && !d(this.symlinks, t))
                return this._readdirInGlobStar(t, r);
              if (d(this.cache, t)) {
                var n = this.cache[t];
                if (!n || "FILE" === n) return r();
                if (Array.isArray(n)) return r(null, n);
              }
              this.fs.readdir(
                t,
                (function (t, e, r) {
                  return function (n, i) {
                    n ? t._readdirError(e, n, r) : t._readdirEntries(e, i, r);
                  };
                })(this, t, r)
              );
            }
          }),
          (_.prototype._readdirEntries = function (t, e, r) {
            if (!this.aborted) {
              if (!this.mark && !this.stat)
                for (var n = 0; n < e.length; n++) {
                  var i = e[n];
                  (i = "/" === t ? t + i : t + "/" + i), (this.cache[i] = !0);
                }
              return (this.cache[t] = e), r(null, e);
            }
          }),
          (_.prototype._readdirError = function (t, e, r) {
            if (!this.aborted) {
              switch (e.code) {
                case "ENOTSUP":
                case "ENOTDIR":
                  var n = this._makeAbs(t);
                  if (((this.cache[n] = "FILE"), n === this.cwdAbs)) {
                    var i = new Error(e.code + " invalid cwd " + this.cwd);
                    (i.path = this.cwd),
                      (i.code = e.code),
                      this.emit("error", i),
                      this.abort();
                  }
                  break;
                case "ENOENT":
                case "ELOOP":
                case "ENAMETOOLONG":
                case "UNKNOWN":
                  this.cache[this._makeAbs(t)] = !1;
                  break;
                default:
                  (this.cache[this._makeAbs(t)] = !1),
                    this.strict && (this.emit("error", e), this.abort()),
                    this.silent || console.error("glob error", e);
              }
              return r();
            }
          }),
          (_.prototype._processGlobStar = function (t, e, r, n, i, s, o) {
            var a = this;
            this._readdir(r, s, function (c, l) {
              a._processGlobStar2(t, e, r, n, i, s, l, o);
            });
          }),
          (_.prototype._processGlobStar2 = function (t, e, r, n, i, s, o, a) {
            if (!o) return a();
            var c = n.slice(1),
              l = t ? [t] : [],
              h = l.concat(c);
            this._process(h, i, !1, a);
            var u = this.symlinks[r],
              p = o.length;
            if (u && s) return a();
            for (var d = 0; d < p; d++)
              if ("." !== o[d].charAt(0) || this.dot) {
                var f = l.concat(o[d], c);
                this._process(f, i, !0, a);
                var m = l.concat(o[d], n);
                this._process(m, i, !0, a);
              }
            a();
          }),
          (_.prototype._processSimple = function (t, e, r) {
            var n = this;
            this._stat(t, function (i, s) {
              n._processSimple2(t, e, i, s, r);
            });
          }),
          (_.prototype._processSimple2 = function (t, e, r, n, i) {
            if (
              (this.matches[e] || (this.matches[e] = Object.create(null)), !n)
            )
              return i();
            if (t && l(t) && !this.nomount) {
              var s = /[\/\\]$/.test(t);
              "/" === t.charAt(0)
                ? (t = a.join(this.root, t))
                : ((t = a.resolve(this.root, t)), s && (t += "/"));
            }
            "win32" === process.platform && (t = t.replace(/\\/g, "/")),
              this._emitMatch(e, t),
              i();
          }),
          (_.prototype._stat = function (t, e) {
            var r = this._makeAbs(t),
              n = "/" === t.slice(-1);
            if (t.length > this.maxLength) return e();
            if (!this.stat && d(this.cache, r)) {
              var i = this.cache[r];
              if ((Array.isArray(i) && (i = "DIR"), !n || "DIR" === i))
                return e(null, i);
              if (n && "FILE" === i) return e();
            }
            var s = this.statCache[r];
            if (void 0 !== s) {
              if (!1 === s) return e(null, s);
              var o = s.isDirectory() ? "DIR" : "FILE";
              return n && "FILE" === o ? e() : e(null, o, s);
            }
            var a = this,
              c = f("stat\0" + r, function (n, i) {
                if (i && i.isSymbolicLink())
                  return a.fs.stat(r, function (n, s) {
                    n ? a._stat2(t, r, null, i, e) : a._stat2(t, r, n, s, e);
                  });
                a._stat2(t, r, n, i, e);
              });
            c && a.fs.lstat(r, c);
          }),
          (_.prototype._stat2 = function (t, e, r, n, i) {
            if (r && ("ENOENT" === r.code || "ENOTDIR" === r.code))
              return (this.statCache[e] = !1), i();
            var s = "/" === t.slice(-1);
            if (
              ((this.statCache[e] = n),
              "/" === e.slice(-1) && n && !n.isDirectory())
            )
              return i(null, !1, n);
            var o = !0;
            return (
              n && (o = n.isDirectory() ? "DIR" : "FILE"),
              (this.cache[e] = this.cache[e] || o),
              s && "FILE" === o ? i() : i(null, o, n)
            );
          });
      },
      751: (t, e, r) => {
        (t.exports = d), (d.GlobSync = f);
        var n = r(334),
          i = r(171),
          s = (i.Minimatch, r(884).Glob, r(837), r(17)),
          o = r(491),
          a = r(95),
          c = r(772),
          l = c.setopts,
          h = c.ownProp,
          u = c.childrenIgnored,
          p = c.isIgnored;
        function d(t, e) {
          if ("function" == typeof e || 3 === arguments.length)
            throw new TypeError(
              "callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167"
            );
          return new f(t, e).found;
        }
        function f(t, e) {
          if (!t) throw new Error("must provide pattern");
          if ("function" == typeof e || 3 === arguments.length)
            throw new TypeError(
              "callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167"
            );
          if (!(this instanceof f)) return new f(t, e);
          if ((l(this, t, e), this.noprocess)) return this;
          var r = this.minimatch.set.length;
          this.matches = new Array(r);
          for (var n = 0; n < r; n++)
            this._process(this.minimatch.set[n], n, !1);
          this._finish();
        }
        (f.prototype._finish = function () {
          if ((o(this instanceof f), this.realpath)) {
            var t = this;
            this.matches.forEach(function (e, r) {
              var i = (t.matches[r] = Object.create(null));
              for (var s in e)
                try {
                  (s = t._makeAbs(s)),
                    (i[n.realpathSync(s, t.realpathCache)] = !0);
                } catch (e) {
                  if ("stat" !== e.syscall) throw e;
                  i[t._makeAbs(s)] = !0;
                }
            });
          }
          c.finish(this);
        }),
          (f.prototype._process = function (t, e, r) {
            o(this instanceof f);
            for (var n, s = 0; "string" == typeof t[s]; ) s++;
            switch (s) {
              case t.length:
                return void this._processSimple(t.join("/"), e);
              case 0:
                n = null;
                break;
              default:
                n = t.slice(0, s).join("/");
            }
            var c,
              l = t.slice(s);
            null === n
              ? (c = ".")
              : a(n) || a(t.join("/"))
              ? ((n && a(n)) || (n = "/" + n), (c = n))
              : (c = n);
            var h = this._makeAbs(c);
            u(this, c) ||
              (l[0] === i.GLOBSTAR
                ? this._processGlobStar(n, c, h, l, e, r)
                : this._processReaddir(n, c, h, l, e, r));
          }),
          (f.prototype._processReaddir = function (t, e, r, n, i, o) {
            var a = this._readdir(r, o);
            if (a) {
              for (
                var c = n[0],
                  l = !!this.minimatch.negate,
                  h = c._glob,
                  u = this.dot || "." === h.charAt(0),
                  p = [],
                  d = 0;
                d < a.length;
                d++
              )
                ("." !== (g = a[d]).charAt(0) || u) &&
                  (l && !t ? !g.match(c) : g.match(c)) &&
                  p.push(g);
              var f = p.length;
              if (0 !== f)
                if (1 !== n.length || this.mark || this.stat)
                  for (n.shift(), d = 0; d < f; d++) {
                    var m;
                    (g = p[d]),
                      (m = t ? [t, g] : [g]),
                      this._process(m.concat(n), i, o);
                  }
                else {
                  this.matches[i] || (this.matches[i] = Object.create(null));
                  for (d = 0; d < f; d++) {
                    var g = p[d];
                    t && (g = "/" !== t.slice(-1) ? t + "/" + g : t + g),
                      "/" !== g.charAt(0) ||
                        this.nomount ||
                        (g = s.join(this.root, g)),
                      this._emitMatch(i, g);
                  }
                }
            }
          }),
          (f.prototype._emitMatch = function (t, e) {
            if (!p(this, e)) {
              var r = this._makeAbs(e);
              if (
                (this.mark && (e = this._mark(e)),
                this.absolute && (e = r),
                !this.matches[t][e])
              ) {
                if (this.nodir) {
                  var n = this.cache[r];
                  if ("DIR" === n || Array.isArray(n)) return;
                }
                (this.matches[t][e] = !0), this.stat && this._stat(e);
              }
            }
          }),
          (f.prototype._readdirInGlobStar = function (t) {
            if (this.follow) return this._readdir(t, !1);
            var e, r;
            try {
              r = this.fs.lstatSync(t);
            } catch (t) {
              if ("ENOENT" === t.code) return null;
            }
            var n = r && r.isSymbolicLink();
            return (
              (this.symlinks[t] = n),
              n || !r || r.isDirectory()
                ? (e = this._readdir(t, !1))
                : (this.cache[t] = "FILE"),
              e
            );
          }),
          (f.prototype._readdir = function (t, e) {
            if (e && !h(this.symlinks, t)) return this._readdirInGlobStar(t);
            if (h(this.cache, t)) {
              var r = this.cache[t];
              if (!r || "FILE" === r) return null;
              if (Array.isArray(r)) return r;
            }
            try {
              return this._readdirEntries(t, this.fs.readdirSync(t));
            } catch (e) {
              return this._readdirError(t, e), null;
            }
          }),
          (f.prototype._readdirEntries = function (t, e) {
            if (!this.mark && !this.stat)
              for (var r = 0; r < e.length; r++) {
                var n = e[r];
                (n = "/" === t ? t + n : t + "/" + n), (this.cache[n] = !0);
              }
            return (this.cache[t] = e), e;
          }),
          (f.prototype._readdirError = function (t, e) {
            switch (e.code) {
              case "ENOTSUP":
              case "ENOTDIR":
                var r = this._makeAbs(t);
                if (((this.cache[r] = "FILE"), r === this.cwdAbs)) {
                  var n = new Error(e.code + " invalid cwd " + this.cwd);
                  throw ((n.path = this.cwd), (n.code = e.code), n);
                }
                break;
              case "ENOENT":
              case "ELOOP":
              case "ENAMETOOLONG":
              case "UNKNOWN":
                this.cache[this._makeAbs(t)] = !1;
                break;
              default:
                if (((this.cache[this._makeAbs(t)] = !1), this.strict)) throw e;
                this.silent || console.error("glob error", e);
            }
          }),
          (f.prototype._processGlobStar = function (t, e, r, n, i, s) {
            var o = this._readdir(r, s);
            if (o) {
              var a = n.slice(1),
                c = t ? [t] : [],
                l = c.concat(a);
              this._process(l, i, !1);
              var h = o.length;
              if (!this.symlinks[r] || !s)
                for (var u = 0; u < h; u++)
                  if ("." !== o[u].charAt(0) || this.dot) {
                    var p = c.concat(o[u], a);
                    this._process(p, i, !0);
                    var d = c.concat(o[u], n);
                    this._process(d, i, !0);
                  }
            }
          }),
          (f.prototype._processSimple = function (t, e) {
            var r = this._stat(t);
            if (
              (this.matches[e] || (this.matches[e] = Object.create(null)), r)
            ) {
              if (t && a(t) && !this.nomount) {
                var n = /[\/\\]$/.test(t);
                "/" === t.charAt(0)
                  ? (t = s.join(this.root, t))
                  : ((t = s.resolve(this.root, t)), n && (t += "/"));
              }
              "win32" === process.platform && (t = t.replace(/\\/g, "/")),
                this._emitMatch(e, t);
            }
          }),
          (f.prototype._stat = function (t) {
            var e = this._makeAbs(t),
              r = "/" === t.slice(-1);
            if (t.length > this.maxLength) return !1;
            if (!this.stat && h(this.cache, e)) {
              var n = this.cache[e];
              if ((Array.isArray(n) && (n = "DIR"), !r || "DIR" === n))
                return n;
              if (r && "FILE" === n) return !1;
            }
            var i = this.statCache[e];
            if (!i) {
              var s;
              try {
                s = this.fs.lstatSync(e);
              } catch (t) {
                if (t && ("ENOENT" === t.code || "ENOTDIR" === t.code))
                  return (this.statCache[e] = !1), !1;
              }
              if (s && s.isSymbolicLink())
                try {
                  i = this.fs.statSync(e);
                } catch (t) {
                  i = s;
                }
              else i = s;
            }
            return (
              (this.statCache[e] = i),
              (n = !0),
              i && (n = i.isDirectory() ? "DIR" : "FILE"),
              (this.cache[e] = this.cache[e] || n),
              (!r || "FILE" !== n) && n
            );
          }),
          (f.prototype._mark = function (t) {
            return c.mark(this, t);
          }),
          (f.prototype._makeAbs = function (t) {
            return c.makeAbs(this, t);
          });
      },
      560: (t) => {
        "use strict";
        t.exports = (t, e = process.argv) => {
          const r = t.startsWith("-") ? "" : 1 === t.length ? "-" : "--",
            n = e.indexOf(r + t),
            i = e.indexOf("--");
          return -1 !== n && (-1 === i || n < i);
        };
      },
      844: (t, e, r) => {
        var n = r(479),
          i = Object.create(null),
          s = r(778);
        function o(t) {
          for (var e = t.length, r = [], n = 0; n < e; n++) r[n] = t[n];
          return r;
        }
        t.exports = n(function (t, e) {
          return i[t]
            ? (i[t].push(e), null)
            : ((i[t] = [e]),
              (function (t) {
                return s(function e() {
                  var r = i[t],
                    n = r.length,
                    s = o(arguments);
                  try {
                    for (var a = 0; a < n; a++) r[a].apply(null, s);
                  } finally {
                    r.length > n
                      ? (r.splice(0, n),
                        process.nextTick(function () {
                          e.apply(null, s);
                        }))
                      : delete i[t];
                  }
                });
              })(t));
        });
      },
      378: (t, e, r) => {
        try {
          var n = r(837);
          if ("function" != typeof n.inherits) throw "";
          t.exports = n.inherits;
        } catch (e) {
          t.exports = r(717);
        }
      },
      717: (t) => {
        "function" == typeof Object.create
          ? (t.exports = function (t, e) {
              e &&
                ((t.super_ = e),
                (t.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })));
            })
          : (t.exports = function (t, e) {
              if (e) {
                t.super_ = e;
                var r = function () {};
                (r.prototype = e.prototype),
                  (t.prototype = new r()),
                  (t.prototype.constructor = t);
              }
            });
      },
      171: (t, e, r) => {
        (t.exports = p), (p.Minimatch = d);
        var n = (function () {
          try {
            return r(17);
          } catch (t) {}
        })() || { sep: "/" };
        p.sep = n.sep;
        var i = (p.GLOBSTAR = d.GLOBSTAR = {}),
          s = r(644),
          o = {
            "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
            "?": { open: "(?:", close: ")?" },
            "+": { open: "(?:", close: ")+" },
            "*": { open: "(?:", close: ")*" },
            "@": { open: "(?:", close: ")" },
          },
          a = "[^/]",
          c = "[^/]*?",
          l = "().*{}+?[]^$\\!".split("").reduce(function (t, e) {
            return (t[e] = !0), t;
          }, {}),
          h = /\/+/;
        function u(t, e) {
          e = e || {};
          var r = {};
          return (
            Object.keys(t).forEach(function (e) {
              r[e] = t[e];
            }),
            Object.keys(e).forEach(function (t) {
              r[t] = e[t];
            }),
            r
          );
        }
        function p(t, e, r) {
          return (
            m(e),
            r || (r = {}),
            !(!r.nocomment && "#" === e.charAt(0)) && new d(e, r).match(t)
          );
        }
        function d(t, e) {
          if (!(this instanceof d)) return new d(t, e);
          m(t),
            e || (e = {}),
            (t = t.trim()),
            e.allowWindowsEscape ||
              "/" === n.sep ||
              (t = t.split(n.sep).join("/")),
            (this.options = e),
            (this.set = []),
            (this.pattern = t),
            (this.regexp = null),
            (this.negate = !1),
            (this.comment = !1),
            (this.empty = !1),
            (this.partial = !!e.partial),
            this.make();
        }
        function f(t, e) {
          return (
            e || (e = this instanceof d ? this.options : {}),
            (t = void 0 === t ? this.pattern : t),
            m(t),
            e.nobrace || !/\{(?:(?!\{).)*\}/.test(t) ? [t] : s(t)
          );
        }
        (p.filter = function (t, e) {
          return (
            (e = e || {}),
            function (r, n, i) {
              return p(r, t, e);
            }
          );
        }),
          (p.defaults = function (t) {
            if (!t || "object" != typeof t || !Object.keys(t).length) return p;
            var e = p,
              r = function (r, n, i) {
                return e(r, n, u(t, i));
              };
            return (
              ((r.Minimatch = function (r, n) {
                return new e.Minimatch(r, u(t, n));
              }).defaults = function (r) {
                return e.defaults(u(t, r)).Minimatch;
              }),
              (r.filter = function (r, n) {
                return e.filter(r, u(t, n));
              }),
              (r.defaults = function (r) {
                return e.defaults(u(t, r));
              }),
              (r.makeRe = function (r, n) {
                return e.makeRe(r, u(t, n));
              }),
              (r.braceExpand = function (r, n) {
                return e.braceExpand(r, u(t, n));
              }),
              (r.match = function (r, n, i) {
                return e.match(r, n, u(t, i));
              }),
              r
            );
          }),
          (d.defaults = function (t) {
            return p.defaults(t).Minimatch;
          }),
          (d.prototype.debug = function () {}),
          (d.prototype.make = function () {
            var t = this.pattern,
              e = this.options;
            if (e.nocomment || "#" !== t.charAt(0))
              if (t) {
                this.parseNegate();
                var r = (this.globSet = this.braceExpand());
                e.debug &&
                  (this.debug = function () {
                    console.error.apply(console, arguments);
                  }),
                  this.debug(this.pattern, r),
                  (r = this.globParts =
                    r.map(function (t) {
                      return t.split(h);
                    })),
                  this.debug(this.pattern, r),
                  (r = r.map(function (t, e, r) {
                    return t.map(this.parse, this);
                  }, this)),
                  this.debug(this.pattern, r),
                  (r = r.filter(function (t) {
                    return -1 === t.indexOf(!1);
                  })),
                  this.debug(this.pattern, r),
                  (this.set = r);
              } else this.empty = !0;
            else this.comment = !0;
          }),
          (d.prototype.parseNegate = function () {
            var t = this.pattern,
              e = !1,
              r = 0;
            if (!this.options.nonegate) {
              for (var n = 0, i = t.length; n < i && "!" === t.charAt(n); n++)
                (e = !e), r++;
              r && (this.pattern = t.substr(r)), (this.negate = e);
            }
          }),
          (p.braceExpand = function (t, e) {
            return f(t, e);
          }),
          (d.prototype.braceExpand = f);
        var m = function (t) {
          if ("string" != typeof t) throw new TypeError("invalid pattern");
          if (t.length > 65536) throw new TypeError("pattern is too long");
        };
        d.prototype.parse = function (t, e) {
          m(t);
          var r = this.options;
          if ("**" === t) {
            if (!r.noglobstar) return i;
            t = "*";
          }
          if ("" === t) return "";
          var n,
            s = "",
            h = !!r.nocase,
            u = !1,
            p = [],
            d = [],
            f = !1,
            b = -1,
            y = -1,
            v =
              "." === t.charAt(0)
                ? ""
                : r.dot
                ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
                : "(?!\\.)",
            _ = this;
          function w() {
            if (n) {
              switch (n) {
                case "*":
                  (s += c), (h = !0);
                  break;
                case "?":
                  (s += a), (h = !0);
                  break;
                default:
                  s += "\\" + n;
              }
              _.debug("clearStateChar %j %j", n, s), (n = !1);
            }
          }
          for (var O, E = 0, k = t.length; E < k && (O = t.charAt(E)); E++)
            if ((this.debug("%s\t%s %s %j", t, E, s, O), u && l[O]))
              (s += "\\" + O), (u = !1);
            else
              switch (O) {
                case "/":
                  return !1;
                case "\\":
                  w(), (u = !0);
                  continue;
                case "?":
                case "*":
                case "+":
                case "@":
                case "!":
                  if (
                    (this.debug("%s\t%s %s %j <-- stateChar", t, E, s, O), f)
                  ) {
                    this.debug("  in class"),
                      "!" === O && E === y + 1 && (O = "^"),
                      (s += O);
                    continue;
                  }
                  _.debug("call clearStateChar %j", n),
                    w(),
                    (n = O),
                    r.noext && w();
                  continue;
                case "(":
                  if (f) {
                    s += "(";
                    continue;
                  }
                  if (!n) {
                    s += "\\(";
                    continue;
                  }
                  p.push({
                    type: n,
                    start: E - 1,
                    reStart: s.length,
                    open: o[n].open,
                    close: o[n].close,
                  }),
                    (s += "!" === n ? "(?:(?!(?:" : "(?:"),
                    this.debug("plType %j %j", n, s),
                    (n = !1);
                  continue;
                case ")":
                  if (f || !p.length) {
                    s += "\\)";
                    continue;
                  }
                  w(), (h = !0);
                  var x = p.pop();
                  (s += x.close),
                    "!" === x.type && d.push(x),
                    (x.reEnd = s.length);
                  continue;
                case "|":
                  if (f || !p.length || u) {
                    (s += "\\|"), (u = !1);
                    continue;
                  }
                  w(), (s += "|");
                  continue;
                case "[":
                  if ((w(), f)) {
                    s += "\\" + O;
                    continue;
                  }
                  (f = !0), (y = E), (b = s.length), (s += O);
                  continue;
                case "]":
                  if (E === y + 1 || !f) {
                    (s += "\\" + O), (u = !1);
                    continue;
                  }
                  var A = t.substring(y + 1, E);
                  try {
                    RegExp("[" + A + "]");
                  } catch (t) {
                    var C = this.parse(A, g);
                    (s = s.substr(0, b) + "\\[" + C[0] + "\\]"),
                      (h = h || C[1]),
                      (f = !1);
                    continue;
                  }
                  (h = !0), (f = !1), (s += O);
                  continue;
                default:
                  w(),
                    u ? (u = !1) : !l[O] || ("^" === O && f) || (s += "\\"),
                    (s += O);
              }
          for (
            f &&
              ((A = t.substr(y + 1)),
              (C = this.parse(A, g)),
              (s = s.substr(0, b) + "\\[" + C[0]),
              (h = h || C[1])),
              x = p.pop();
            x;
            x = p.pop()
          ) {
            var S = s.slice(x.reStart + x.open.length);
            this.debug("setting tail", s, x),
              (S = S.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (t, e, r) {
                return r || (r = "\\"), e + e + r + "|";
              })),
              this.debug("tail=%j\n   %s", S, S, x, s);
            var j = "*" === x.type ? c : "?" === x.type ? a : "\\" + x.type;
            (h = !0), (s = s.slice(0, x.reStart) + j + "\\(" + S);
          }
          w(), u && (s += "\\\\");
          var M = !1;
          switch (s.charAt(0)) {
            case "[":
            case ".":
            case "(":
              M = !0;
          }
          for (var N = d.length - 1; N > -1; N--) {
            var I = d[N],
              T = s.slice(0, I.reStart),
              R = s.slice(I.reStart, I.reEnd - 8),
              P = s.slice(I.reEnd - 8, I.reEnd),
              $ = s.slice(I.reEnd);
            P += $;
            var F = T.split("(").length - 1,
              D = $;
            for (E = 0; E < F; E++) D = D.replace(/\)[+*?]?/, "");
            var L = "";
            "" === ($ = D) && e !== g && (L = "$"), (s = T + R + $ + L + P);
          }
          if (("" !== s && h && (s = "(?=.)" + s), M && (s = v + s), e === g))
            return [s, h];
          if (!h) return t.replace(/\\(.)/g, "$1");
          var H = r.nocase ? "i" : "";
          try {
            var B = new RegExp("^" + s + "$", H);
          } catch (t) {
            return new RegExp("$.");
          }
          return (B._glob = t), (B._src = s), B;
        };
        var g = {};
        (p.makeRe = function (t, e) {
          return new d(t, e || {}).makeRe();
        }),
          (d.prototype.makeRe = function () {
            if (this.regexp || !1 === this.regexp) return this.regexp;
            var t = this.set;
            if (!t.length) return (this.regexp = !1), this.regexp;
            var e = this.options,
              r = e.noglobstar
                ? c
                : e.dot
                ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?"
                : "(?:(?!(?:\\/|^)\\.).)*?",
              n = e.nocase ? "i" : "",
              s = t
                .map(function (t) {
                  return t
                    .map(function (t) {
                      return t === i
                        ? r
                        : "string" == typeof t
                        ? t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
                        : t._src;
                    })
                    .join("\\/");
                })
                .join("|");
            (s = "^(?:" + s + ")$"), this.negate && (s = "^(?!" + s + ").*$");
            try {
              this.regexp = new RegExp(s, n);
            } catch (t) {
              this.regexp = !1;
            }
            return this.regexp;
          }),
          (p.match = function (t, e, r) {
            var n = new d(e, (r = r || {}));
            return (
              (t = t.filter(function (t) {
                return n.match(t);
              })),
              n.options.nonull && !t.length && t.push(e),
              t
            );
          }),
          (d.prototype.match = function (t, e) {
            if (
              (void 0 === e && (e = this.partial),
              this.debug("match", t, this.pattern),
              this.comment)
            )
              return !1;
            if (this.empty) return "" === t;
            if ("/" === t && e) return !0;
            var r = this.options;
            "/" !== n.sep && (t = t.split(n.sep).join("/")),
              (t = t.split(h)),
              this.debug(this.pattern, "split", t);
            var i,
              s,
              o = this.set;
            for (
              this.debug(this.pattern, "set", o), s = t.length - 1;
              s >= 0 && !(i = t[s]);
              s--
            );
            for (s = 0; s < o.length; s++) {
              var a = o[s],
                c = t;
              if (
                (r.matchBase && 1 === a.length && (c = [i]),
                this.matchOne(c, a, e))
              )
                return !!r.flipNegate || !this.negate;
            }
            return !r.flipNegate && this.negate;
          }),
          (d.prototype.matchOne = function (t, e, r) {
            var n = this.options;
            this.debug("matchOne", { this: this, file: t, pattern: e }),
              this.debug("matchOne", t.length, e.length);
            for (
              var s = 0, o = 0, a = t.length, c = e.length;
              s < a && o < c;
              s++, o++
            ) {
              this.debug("matchOne loop");
              var l,
                h = e[o],
                u = t[s];
              if ((this.debug(e, h, u), !1 === h)) return !1;
              if (h === i) {
                this.debug("GLOBSTAR", [e, h, u]);
                var p = s,
                  d = o + 1;
                if (d === c) {
                  for (this.debug("** at the end"); s < a; s++)
                    if (
                      "." === t[s] ||
                      ".." === t[s] ||
                      (!n.dot && "." === t[s].charAt(0))
                    )
                      return !1;
                  return !0;
                }
                for (; p < a; ) {
                  var f = t[p];
                  if (
                    (this.debug("\nglobstar while", t, p, e, d, f),
                    this.matchOne(t.slice(p), e.slice(d), r))
                  )
                    return this.debug("globstar found match!", p, a, f), !0;
                  if (
                    "." === f ||
                    ".." === f ||
                    (!n.dot && "." === f.charAt(0))
                  ) {
                    this.debug("dot detected!", t, p, e, d);
                    break;
                  }
                  this.debug("globstar swallow a segment, and continue"), p++;
                }
                return !(
                  !r ||
                  (this.debug("\n>>> no match, partial?", t, p, e, d), p !== a)
                );
              }
              if (
                ("string" == typeof h
                  ? ((l = u === h), this.debug("string match", h, u, l))
                  : ((l = u.match(h)), this.debug("pattern match", h, u, l)),
                !l)
              )
                return !1;
            }
            if (s === a && o === c) return !0;
            if (s === a) return r;
            if (o === c) return s === a - 1 && "" === t[s];
            throw new Error("wtf?");
          });
      },
      890: (t, e, r) => {
        const n = r(231),
          i = r(610),
          { mkdirpNative: s, mkdirpNativeSync: o } = r(93),
          { mkdirpManual: a, mkdirpManualSync: c } = r(600),
          { useNative: l, useNativeSync: h } = r(167),
          u = (t, e) => ((t = i(t)), (e = n(e)), l(e) ? s(t, e) : a(t, e));
        (u.sync = (t, e) => ((t = i(t)), (e = n(e)), h(e) ? o(t, e) : c(t, e))),
          (u.native = (t, e) => s(i(t), n(e))),
          (u.manual = (t, e) => a(i(t), n(e))),
          (u.nativeSync = (t, e) => o(i(t), n(e))),
          (u.manualSync = (t, e) => c(i(t), n(e))),
          (t.exports = u);
      },
      812: (t, e, r) => {
        const { dirname: n } = r(17),
          i = (t, e, r) =>
            r === e
              ? Promise.resolve()
              : t.statAsync(e).then(
                  (t) => (t.isDirectory() ? r : void 0),
                  (r) => ("ENOENT" === r.code ? i(t, n(e), e) : void 0)
                ),
          s = (t, e, r) => {
            if (r !== e)
              try {
                return t.statSync(e).isDirectory() ? r : void 0;
              } catch (r) {
                return "ENOENT" === r.code ? s(t, n(e), e) : void 0;
              }
          };
        t.exports = { findMade: i, findMadeSync: s };
      },
      600: (t, e, r) => {
        const { dirname: n } = r(17),
          i = (t, e, r) => {
            e.recursive = !1;
            const s = n(t);
            return s === t
              ? e.mkdirAsync(t, e).catch((t) => {
                  if ("EISDIR" !== t.code) throw t;
                })
              : e.mkdirAsync(t, e).then(
                  () => r || t,
                  (n) => {
                    if ("ENOENT" === n.code)
                      return i(s, e).then((r) => i(t, e, r));
                    if ("EEXIST" !== n.code && "EROFS" !== n.code) throw n;
                    return e.statAsync(t).then(
                      (t) => {
                        if (t.isDirectory()) return r;
                        throw n;
                      },
                      () => {
                        throw n;
                      }
                    );
                  }
                );
          },
          s = (t, e, r) => {
            const i = n(t);
            if (((e.recursive = !1), i === t))
              try {
                return e.mkdirSync(t, e);
              } catch (t) {
                if ("EISDIR" !== t.code) throw t;
                return;
              }
            try {
              return e.mkdirSync(t, e), r || t;
            } catch (n) {
              if ("ENOENT" === n.code) return s(t, e, s(i, e, r));
              if ("EEXIST" !== n.code && "EROFS" !== n.code) throw n;
              try {
                if (!e.statSync(t).isDirectory()) throw n;
              } catch (t) {
                throw n;
              }
            }
          };
        t.exports = { mkdirpManual: i, mkdirpManualSync: s };
      },
      93: (t, e, r) => {
        const { dirname: n } = r(17),
          { findMade: i, findMadeSync: s } = r(812),
          { mkdirpManual: o, mkdirpManualSync: a } = r(600);
        t.exports = {
          mkdirpNative: (t, e) => (
            (e.recursive = !0),
            n(t) === t
              ? e.mkdirAsync(t, e)
              : i(e, t).then((r) =>
                  e
                    .mkdirAsync(t, e)
                    .then(() => r)
                    .catch((r) => {
                      if ("ENOENT" === r.code) return o(t, e);
                      throw r;
                    })
                )
          ),
          mkdirpNativeSync: (t, e) => {
            if (((e.recursive = !0), n(t) === t)) return e.mkdirSync(t, e);
            const r = s(e, t);
            try {
              return e.mkdirSync(t, e), r;
            } catch (r) {
              if ("ENOENT" === r.code) return a(t, e);
              throw r;
            }
          },
        };
      },
      231: (t, e, r) => {
        const { promisify: n } = r(837),
          i = r(147);
        t.exports = (t) => {
          if (t)
            if ("object" == typeof t) t = { mode: 511, fs: i, ...t };
            else if ("number" == typeof t) t = { mode: t, fs: i };
            else {
              if ("string" != typeof t)
                throw new TypeError("invalid options argument");
              t = { mode: parseInt(t, 8), fs: i };
            }
          else t = { mode: 511, fs: i };
          return (
            (t.mkdir = t.mkdir || t.fs.mkdir || i.mkdir),
            (t.mkdirAsync = n(t.mkdir)),
            (t.stat = t.stat || t.fs.stat || i.stat),
            (t.statAsync = n(t.stat)),
            (t.statSync = t.statSync || t.fs.statSync || i.statSync),
            (t.mkdirSync = t.mkdirSync || t.fs.mkdirSync || i.mkdirSync),
            t
          );
        };
      },
      610: (t, e, r) => {
        const n = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform,
          { resolve: i, parse: s } = r(17);
        t.exports = (t) => {
          if (/\0/.test(t))
            throw Object.assign(
              new TypeError("path must be a string without null bytes"),
              { path: t, code: "ERR_INVALID_ARG_VALUE" }
            );
          if (((t = i(t)), "win32" === n)) {
            const e = /[*|"<>?:]/,
              { root: r } = s(t);
            if (e.test(t.substr(r.length)))
              throw Object.assign(new Error("Illegal characters in path."), {
                path: t,
                code: "EINVAL",
              });
          }
          return t;
        };
      },
      167: (t, e, r) => {
        const n = r(147),
          i = (process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version)
            .replace(/^v/, "")
            .split("."),
          s = +i[0] > 10 || (10 == +i[0] && +i[1] >= 12),
          o = s ? (t) => t.mkdir === n.mkdir : () => !1,
          a = s ? (t) => t.mkdirSync === n.mkdirSync : () => !1;
        t.exports = { useNative: o, useNativeSync: a };
      },
      778: (t, e, r) => {
        var n = r(479);
        function i(t) {
          var e = function () {
            return e.called
              ? e.value
              : ((e.called = !0), (e.value = t.apply(this, arguments)));
          };
          return (e.called = !1), e;
        }
        function s(t) {
          var e = function () {
              if (e.called) throw new Error(e.onceError);
              return (e.called = !0), (e.value = t.apply(this, arguments));
            },
            r = t.name || "Function wrapped with `once`";
          return (
            (e.onceError = r + " shouldn't be called more than once"),
            (e.called = !1),
            e
          );
        }
        (t.exports = n(i)),
          (t.exports.strict = n(s)),
          (i.proto = i(function () {
            Object.defineProperty(Function.prototype, "once", {
              value: function () {
                return i(this);
              },
              configurable: !0,
            }),
              Object.defineProperty(Function.prototype, "onceStrict", {
                value: function () {
                  return s(this);
                },
                configurable: !0,
              });
          }));
      },
      95: (t) => {
        "use strict";
        function e(t) {
          return "/" === t.charAt(0);
        }
        function r(t) {
          var e =
              /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(
                t
              ),
            r = e[1] || "",
            n = Boolean(r && ":" !== r.charAt(1));
          return Boolean(e[2] || n);
        }
        (t.exports = "win32" === process.platform ? r : e),
          (t.exports.posix = e),
          (t.exports.win32 = r);
      },
      984: (t, e, r) => {
        const n = r(491),
          i = r(17),
          s = r(147);
        let o;
        try {
          o = r(884);
        } catch (t) {}
        const a = { nosort: !0, silent: !0 };
        let c = 0;
        const l = "win32" === process.platform,
          h = (t) => {
            if (
              (["unlink", "chmod", "stat", "lstat", "rmdir", "readdir"].forEach(
                (e) => {
                  (t[e] = t[e] || s[e]), (t[(e += "Sync")] = t[e] || s[e]);
                }
              ),
              (t.maxBusyTries = t.maxBusyTries || 3),
              (t.emfileWait = t.emfileWait || 1e3),
              !1 === t.glob && (t.disableGlob = !0),
              !0 !== t.disableGlob && void 0 === o)
            )
              throw Error(
                "glob dependency not found, set `options.disableGlob = true` if intentional"
              );
            (t.disableGlob = t.disableGlob || !1), (t.glob = t.glob || a);
          },
          u = (t, e, r) => {
            "function" == typeof e && ((r = e), (e = {})),
              n(t, "rimraf: missing path"),
              n.equal(typeof t, "string", "rimraf: path should be a string"),
              n.equal(
                typeof r,
                "function",
                "rimraf: callback function required"
              ),
              n(e, "rimraf: invalid options argument provided"),
              n.equal(typeof e, "object", "rimraf: options should be object"),
              h(e);
            let i = 0,
              s = null,
              a = 0;
            const l = (t, n) =>
              t
                ? r(t)
                : ((a = n.length),
                  0 === a
                    ? r()
                    : void n.forEach((t) => {
                        const n = (o) => {
                          if (o) {
                            if (
                              ("EBUSY" === o.code ||
                                "ENOTEMPTY" === o.code ||
                                "EPERM" === o.code) &&
                              i < e.maxBusyTries
                            )
                              return i++, setTimeout(() => p(t, e, n), 100 * i);
                            if ("EMFILE" === o.code && c < e.emfileWait)
                              return setTimeout(() => p(t, e, n), c++);
                            "ENOENT" === o.code && (o = null);
                          }
                          (c = 0),
                            ((t) => {
                              (s = s || t), 0 == --a && r(s);
                            })(o);
                        };
                        p(t, e, n);
                      }));
            if (e.disableGlob || !o.hasMagic(t)) return l(null, [t]);
            e.lstat(t, (r, n) => {
              if (!r) return l(null, [t]);
              o(t, e.glob, l);
            });
          },
          p = (t, e, r) => {
            n(t),
              n(e),
              n("function" == typeof r),
              e.lstat(t, (n, i) =>
                n && "ENOENT" === n.code
                  ? r(null)
                  : (n && "EPERM" === n.code && l && d(t, e, n, r),
                    i && i.isDirectory()
                      ? m(t, e, n, r)
                      : void e.unlink(t, (n) => {
                          if (n) {
                            if ("ENOENT" === n.code) return r(null);
                            if ("EPERM" === n.code)
                              return l ? d(t, e, n, r) : m(t, e, n, r);
                            if ("EISDIR" === n.code) return m(t, e, n, r);
                          }
                          return r(n);
                        }))
              );
          },
          d = (t, e, r, i) => {
            n(t),
              n(e),
              n("function" == typeof i),
              e.chmod(t, 438, (n) => {
                n
                  ? i("ENOENT" === n.code ? null : r)
                  : e.stat(t, (n, s) => {
                      n
                        ? i("ENOENT" === n.code ? null : r)
                        : s.isDirectory()
                        ? m(t, e, r, i)
                        : e.unlink(t, i);
                    });
              });
          },
          f = (t, e, r) => {
            n(t), n(e);
            try {
              e.chmodSync(t, 438);
            } catch (t) {
              if ("ENOENT" === t.code) return;
              throw r;
            }
            let i;
            try {
              i = e.statSync(t);
            } catch (t) {
              if ("ENOENT" === t.code) return;
              throw r;
            }
            i.isDirectory() ? y(t, e, r) : e.unlinkSync(t);
          },
          m = (t, e, r, i) => {
            n(t),
              n(e),
              n("function" == typeof i),
              e.rmdir(t, (n) => {
                !n ||
                ("ENOTEMPTY" !== n.code &&
                  "EEXIST" !== n.code &&
                  "EPERM" !== n.code)
                  ? n && "ENOTDIR" === n.code
                    ? i(r)
                    : i(n)
                  : g(t, e, i);
              });
          },
          g = (t, e, r) => {
            n(t),
              n(e),
              n("function" == typeof r),
              e.readdir(t, (n, s) => {
                if (n) return r(n);
                let o,
                  a = s.length;
                if (0 === a) return e.rmdir(t, r);
                s.forEach((n) => {
                  u(i.join(t, n), e, (n) => {
                    if (!o)
                      return n ? r((o = n)) : void (0 == --a && e.rmdir(t, r));
                  });
                });
              });
          },
          b = (t, e) => {
            let r;
            if (
              (h((e = e || {})),
              n(t, "rimraf: missing path"),
              n.equal(typeof t, "string", "rimraf: path should be a string"),
              n(e, "rimraf: missing options"),
              n.equal(typeof e, "object", "rimraf: options should be object"),
              e.disableGlob || !o.hasMagic(t))
            )
              r = [t];
            else
              try {
                e.lstatSync(t), (r = [t]);
              } catch (n) {
                r = o.sync(t, e.glob);
              }
            if (r.length)
              for (let t = 0; t < r.length; t++) {
                const n = r[t];
                let i;
                try {
                  i = e.lstatSync(n);
                } catch (t) {
                  if ("ENOENT" === t.code) return;
                  "EPERM" === t.code && l && f(n, e, t);
                }
                try {
                  i && i.isDirectory() ? y(n, e, null) : e.unlinkSync(n);
                } catch (t) {
                  if ("ENOENT" === t.code) return;
                  if ("EPERM" === t.code) return l ? f(n, e, t) : y(n, e, t);
                  if ("EISDIR" !== t.code) throw t;
                  y(n, e, t);
                }
              }
          },
          y = (t, e, r) => {
            n(t), n(e);
            try {
              e.rmdirSync(t);
            } catch (n) {
              if ("ENOENT" === n.code) return;
              if ("ENOTDIR" === n.code) throw r;
              ("ENOTEMPTY" !== n.code &&
                "EEXIST" !== n.code &&
                "EPERM" !== n.code) ||
                v(t, e);
            }
          },
          v = (t, e) => {
            n(t), n(e), e.readdirSync(t).forEach((r) => b(i.join(t, r), e));
            const r = l ? 100 : 1;
            let s = 0;
            for (;;) {
              let n = !0;
              try {
                const i = e.rmdirSync(t, e);
                return (n = !1), i;
              } finally {
                if (++s < r && n) continue;
              }
            }
          };
        (t.exports = u), (u.sync = b);
      },
      479: (t) => {
        t.exports = function t(e, r) {
          if (e && r) return t(e)(r);
          if ("function" != typeof e)
            throw new TypeError("need wrapper function");
          return (
            Object.keys(e).forEach(function (t) {
              n[t] = e[t];
            }),
            n
          );
          function n() {
            for (var t = new Array(arguments.length), r = 0; r < t.length; r++)
              t[r] = arguments[r];
            var n = e.apply(this, t),
              i = t[t.length - 1];
            return (
              "function" == typeof n &&
                n !== i &&
                Object.keys(i).forEach(function (t) {
                  n[t] = i[t];
                }),
              n
            );
          }
        };
      },
      491: (t) => {
        "use strict";
        t.exports = require("assert");
      },
      81: (t) => {
        "use strict";
        t.exports = require("child_process");
      },
      361: (t) => {
        "use strict";
        t.exports = require("events");
      },
      147: (t) => {
        "use strict";
        t.exports = require("fs");
      },
      37: (t) => {
        "use strict";
        t.exports = require("os");
      },
      17: (t) => {
        "use strict";
        t.exports = require("path");
      },
      224: (t) => {
        "use strict";
        t.exports = require("tty");
      },
      837: (t) => {
        "use strict";
        t.exports = require("util");
      },
      461: (t, e, r) => {
        const n = r(361).EventEmitter,
          i = r(81),
          s = r(17),
          o = r(147);
        class a {
          constructor() {
            (this.helpWidth = void 0),
              (this.sortSubcommands = !1),
              (this.sortOptions = !1);
          }
          visibleCommands(t) {
            const e = t.commands.filter((t) => !t._hidden);
            if (t._hasImplicitHelpCommand()) {
              const r = t._helpCommandnameAndArgs.split(/ +/),
                n = t.createCommand(r.shift()).helpOption(!1);
              n.description(t._helpCommandDescription),
                n._parseExpectedArgs(r),
                e.push(n);
            }
            return (
              this.sortSubcommands &&
                e.sort((t, e) => t.name().localeCompare(e.name())),
              e
            );
          }
          visibleOptions(t) {
            const e = t.options.filter((t) => !t.hidden),
              r =
                t._hasHelpOption &&
                t._helpShortFlag &&
                !t._findOption(t._helpShortFlag),
              n = t._hasHelpOption && !t._findOption(t._helpLongFlag);
            if (r || n) {
              let i;
              (i = r
                ? n
                  ? t.createOption(t._helpFlags, t._helpDescription)
                  : t.createOption(t._helpShortFlag, t._helpDescription)
                : t.createOption(t._helpLongFlag, t._helpDescription)),
                e.push(i);
            }
            if (this.sortOptions) {
              const t = (t) =>
                t.short ? t.short.replace(/^-/, "") : t.long.replace(/^--/, "");
              e.sort((e, r) => t(e).localeCompare(t(r)));
            }
            return e;
          }
          visibleArguments(t) {
            return t._argsDescription && t._args.length
              ? t._args.map(
                  (e) => ({
                    term: e.name,
                    description: t._argsDescription[e.name] || "",
                  }),
                  0
                )
              : [];
          }
          subcommandTerm(t) {
            const e = t._args.map((t) => d(t)).join(" ");
            return (
              t._name +
              (t._aliases[0] ? "|" + t._aliases[0] : "") +
              (t.options.length ? " [options]" : "") +
              (e ? " " + e : "")
            );
          }
          optionTerm(t) {
            return t.flags;
          }
          longestSubcommandTermLength(t, e) {
            return e
              .visibleCommands(t)
              .reduce((t, r) => Math.max(t, e.subcommandTerm(r).length), 0);
          }
          longestOptionTermLength(t, e) {
            return e
              .visibleOptions(t)
              .reduce((t, r) => Math.max(t, e.optionTerm(r).length), 0);
          }
          longestArgumentTermLength(t, e) {
            return e
              .visibleArguments(t)
              .reduce((t, e) => Math.max(t, e.term.length), 0);
          }
          commandUsage(t) {
            let e = t._name;
            t._aliases[0] && (e = e + "|" + t._aliases[0]);
            let r = "";
            for (let e = t.parent; e; e = e.parent) r = e.name() + " " + r;
            return r + e + " " + t.usage();
          }
          commandDescription(t) {
            return t.description();
          }
          subcommandDescription(t) {
            return t.description();
          }
          optionDescription(t) {
            if (t.negate) return t.description;
            const e = [];
            return (
              t.argChoices &&
                e.push(
                  `choices: ${t.argChoices
                    .map((t) => JSON.stringify(t))
                    .join(", ")}`
                ),
              void 0 !== t.defaultValue &&
                e.push(
                  `default: ${
                    t.defaultValueDescription || JSON.stringify(t.defaultValue)
                  }`
                ),
              e.length > 0
                ? `${t.description} (${e.join(", ")})`
                : t.description
            );
          }
          formatHelp(t, e) {
            const r = e.padWidth(t, e),
              n = e.helpWidth || 80;
            function i(t, i) {
              if (i) {
                const s = `${t.padEnd(r + 2)}${i}`;
                return e.wrap(s, n - 2, r + 2);
              }
              return t;
            }
            function s(t) {
              return t.join("\n").replace(/^/gm, " ".repeat(2));
            }
            let o = [`Usage: ${e.commandUsage(t)}`, ""];
            const a = e.commandDescription(t);
            a.length > 0 && (o = o.concat([a, ""]));
            const c = e
              .visibleArguments(t)
              .map((t) => i(t.term, t.description));
            c.length > 0 && (o = o.concat(["Arguments:", s(c), ""]));
            const l = e
              .visibleOptions(t)
              .map((t) => i(e.optionTerm(t), e.optionDescription(t)));
            l.length > 0 && (o = o.concat(["Options:", s(l), ""]));
            const h = e
              .visibleCommands(t)
              .map((t) => i(e.subcommandTerm(t), e.subcommandDescription(t)));
            return (
              h.length > 0 && (o = o.concat(["Commands:", s(h), ""])),
              o.join("\n")
            );
          }
          padWidth(t, e) {
            return Math.max(
              e.longestOptionTermLength(t, e),
              e.longestSubcommandTermLength(t, e),
              e.longestArgumentTermLength(t, e)
            );
          }
          wrap(t, e, r, n = 40) {
            if (t.match(/[\n]\s+/)) return t;
            const i = e - r;
            if (i < n) return t;
            const s = t.substr(0, r),
              o = t.substr(r),
              a = " ".repeat(r),
              c = new RegExp(
                ".{1," + (i - 1) + "}([\\s​]|$)|[^\\s​]+?([\\s​]|$)",
                "g"
              );
            return (
              s +
              (o.match(c) || [])
                .map(
                  (t, e) => (
                    "\n" === t.slice(-1) && (t = t.slice(0, t.length - 1)),
                    (e > 0 ? a : "") + t.trimRight()
                  )
                )
                .join("\n")
            );
          }
        }
        class c {
          constructor(t, e) {
            (this.flags = t),
              (this.description = e || ""),
              (this.required = t.includes("<")),
              (this.optional = t.includes("[")),
              (this.variadic = /\w\.\.\.[>\]]$/.test(t)),
              (this.mandatory = !1);
            const r = f(t);
            (this.short = r.shortFlag),
              (this.long = r.longFlag),
              (this.negate = !1),
              this.long && (this.negate = this.long.startsWith("--no-")),
              (this.defaultValue = void 0),
              (this.defaultValueDescription = void 0),
              (this.parseArg = void 0),
              (this.hidden = !1),
              (this.argChoices = void 0);
          }
          default(t, e) {
            return (
              (this.defaultValue = t), (this.defaultValueDescription = e), this
            );
          }
          argParser(t) {
            return (this.parseArg = t), this;
          }
          makeOptionMandatory(t = !0) {
            return (this.mandatory = !!t), this;
          }
          hideHelp(t = !0) {
            return (this.hidden = !!t), this;
          }
          _concatValue(t, e) {
            return e !== this.defaultValue && Array.isArray(e)
              ? e.concat(t)
              : [t];
          }
          choices(t) {
            return (
              (this.argChoices = t),
              (this.parseArg = (e, r) => {
                if (!t.includes(e))
                  throw new h(`Allowed choices are ${t.join(", ")}.`);
                return this.variadic ? this._concatValue(e, r) : e;
              }),
              this
            );
          }
          name() {
            return this.long
              ? this.long.replace(/^--/, "")
              : this.short.replace(/^-/, "");
          }
          attributeName() {
            return this.name()
              .replace(/^no-/, "")
              .split("-")
              .reduce((t, e) => t + e[0].toUpperCase() + e.slice(1));
          }
          is(t) {
            return this.short === t || this.long === t;
          }
        }
        class l extends Error {
          constructor(t, e, r) {
            super(r),
              Error.captureStackTrace(this, this.constructor),
              (this.name = this.constructor.name),
              (this.code = e),
              (this.exitCode = t),
              (this.nestedError = void 0);
          }
        }
        class h extends l {
          constructor(t) {
            super(1, "commander.invalidOptionArgument", t),
              Error.captureStackTrace(this, this.constructor),
              (this.name = this.constructor.name);
          }
        }
        class u extends n {
          constructor(t) {
            super(),
              (this.commands = []),
              (this.options = []),
              (this.parent = null),
              (this._allowUnknownOption = !1),
              (this._allowExcessArguments = !0),
              (this._args = []),
              (this.rawArgs = null),
              (this._scriptPath = null),
              (this._name = t || ""),
              (this._optionValues = {}),
              (this._storeOptionsAsProperties = !1),
              (this._actionResults = []),
              (this._actionHandler = null),
              (this._executableHandler = !1),
              (this._executableFile = null),
              (this._defaultCommandName = null),
              (this._exitCallback = null),
              (this._aliases = []),
              (this._combineFlagAndOptionalValue = !0),
              (this._description = ""),
              (this._argsDescription = void 0),
              (this._enablePositionalOptions = !1),
              (this._passThroughOptions = !1),
              (this._outputConfiguration = {
                writeOut: (t) => process.stdout.write(t),
                writeErr: (t) => process.stderr.write(t),
                getOutHelpWidth: () =>
                  process.stdout.isTTY ? process.stdout.columns : void 0,
                getErrHelpWidth: () =>
                  process.stderr.isTTY ? process.stderr.columns : void 0,
                outputError: (t, e) => e(t),
              }),
              (this._hidden = !1),
              (this._hasHelpOption = !0),
              (this._helpFlags = "-h, --help"),
              (this._helpDescription = "display help for command"),
              (this._helpShortFlag = "-h"),
              (this._helpLongFlag = "--help"),
              (this._addImplicitHelpCommand = void 0),
              (this._helpCommandName = "help"),
              (this._helpCommandnameAndArgs = "help [command]"),
              (this._helpCommandDescription = "display help for command"),
              (this._helpConfiguration = {});
          }
          command(t, e, r) {
            let n = e,
              i = r;
            "object" == typeof n && null !== n && ((i = n), (n = null)),
              (i = i || {});
            const s = t.split(/ +/),
              o = this.createCommand(s.shift());
            return (
              n && (o.description(n), (o._executableHandler = !0)),
              i.isDefault && (this._defaultCommandName = o._name),
              (o._outputConfiguration = this._outputConfiguration),
              (o._hidden = !(!i.noHelp && !i.hidden)),
              (o._hasHelpOption = this._hasHelpOption),
              (o._helpFlags = this._helpFlags),
              (o._helpDescription = this._helpDescription),
              (o._helpShortFlag = this._helpShortFlag),
              (o._helpLongFlag = this._helpLongFlag),
              (o._helpCommandName = this._helpCommandName),
              (o._helpCommandnameAndArgs = this._helpCommandnameAndArgs),
              (o._helpCommandDescription = this._helpCommandDescription),
              (o._helpConfiguration = this._helpConfiguration),
              (o._exitCallback = this._exitCallback),
              (o._storeOptionsAsProperties = this._storeOptionsAsProperties),
              (o._combineFlagAndOptionalValue =
                this._combineFlagAndOptionalValue),
              (o._allowExcessArguments = this._allowExcessArguments),
              (o._enablePositionalOptions = this._enablePositionalOptions),
              (o._executableFile = i.executableFile || null),
              this.commands.push(o),
              o._parseExpectedArgs(s),
              (o.parent = this),
              n ? this : o
            );
          }
          createCommand(t) {
            return new u(t);
          }
          createHelp() {
            return Object.assign(new a(), this.configureHelp());
          }
          configureHelp(t) {
            return void 0 === t
              ? this._helpConfiguration
              : ((this._helpConfiguration = t), this);
          }
          configureOutput(t) {
            return void 0 === t
              ? this._outputConfiguration
              : (Object.assign(this._outputConfiguration, t), this);
          }
          addCommand(t, e) {
            if (!t._name)
              throw new Error(
                "Command passed to .addCommand() must have a name"
              );
            return (
              (function t(e) {
                e.forEach((e) => {
                  if (e._executableHandler && !e._executableFile)
                    throw new Error(
                      `Must specify executableFile for deeply nested executable: ${e.name()}`
                    );
                  t(e.commands);
                });
              })(t.commands),
              (e = e || {}).isDefault && (this._defaultCommandName = t._name),
              (e.noHelp || e.hidden) && (t._hidden = !0),
              this.commands.push(t),
              (t.parent = this),
              this
            );
          }
          arguments(t) {
            return this._parseExpectedArgs(t.split(/ +/));
          }
          addHelpCommand(t, e) {
            return (
              !1 === t
                ? (this._addImplicitHelpCommand = !1)
                : ((this._addImplicitHelpCommand = !0),
                  "string" == typeof t &&
                    ((this._helpCommandName = t.split(" ")[0]),
                    (this._helpCommandnameAndArgs = t)),
                  (this._helpCommandDescription =
                    e || this._helpCommandDescription)),
              this
            );
          }
          _hasImplicitHelpCommand() {
            return void 0 === this._addImplicitHelpCommand
              ? this.commands.length &&
                  !this._actionHandler &&
                  !this._findCommand("help")
              : this._addImplicitHelpCommand;
          }
          _parseExpectedArgs(t) {
            if (t.length)
              return (
                t.forEach((t) => {
                  const e = { required: !1, name: "", variadic: !1 };
                  switch (t[0]) {
                    case "<":
                      (e.required = !0), (e.name = t.slice(1, -1));
                      break;
                    case "[":
                      e.name = t.slice(1, -1);
                  }
                  e.name.length > 3 &&
                    "..." === e.name.slice(-3) &&
                    ((e.variadic = !0), (e.name = e.name.slice(0, -3))),
                    e.name && this._args.push(e);
                }),
                this._args.forEach((t, e) => {
                  if (t.variadic && e < this._args.length - 1)
                    throw new Error(
                      `only the last argument can be variadic '${t.name}'`
                    );
                }),
                this
              );
          }
          exitOverride(t) {
            return (
              (this._exitCallback =
                t ||
                ((t) => {
                  if ("commander.executeSubCommandAsync" !== t.code) throw t;
                })),
              this
            );
          }
          _exit(t, e, r) {
            this._exitCallback && this._exitCallback(new l(t, e, r)),
              process.exit(t);
          }
          action(t) {
            return (
              (this._actionHandler = (e) => {
                const r = this._args.length,
                  n = e.slice(0, r);
                this._storeOptionsAsProperties
                  ? (n[r] = this)
                  : (n[r] = this.opts()),
                  n.push(this);
                const i = t.apply(this, n);
                let s = this;
                for (; s.parent; ) s = s.parent;
                s._actionResults.push(i);
              }),
              this
            );
          }
          createOption(t, e) {
            return new c(t, e);
          }
          addOption(t) {
            const e = t.name(),
              r = t.attributeName();
            let n = t.defaultValue;
            if (t.negate || t.optional || t.required || "boolean" == typeof n) {
              if (t.negate) {
                const e = t.long.replace(/^--no-/, "--");
                n = !this._findOption(e) || this._getOptionValue(r);
              }
              void 0 !== n && this._setOptionValue(r, n);
            }
            return (
              this.options.push(t),
              this.on("option:" + e, (e) => {
                const i = this._getOptionValue(r);
                if (null !== e && t.parseArg)
                  try {
                    e = t.parseArg(e, void 0 === i ? n : i);
                  } catch (r) {
                    if ("commander.invalidOptionArgument" === r.code) {
                      const n = `error: option '${t.flags}' argument '${e}' is invalid. ${r.message}`;
                      this._displayError(r.exitCode, r.code, n);
                    }
                    throw r;
                  }
                else null !== e && t.variadic && (e = t._concatValue(e, i));
                "boolean" == typeof i || void 0 === i
                  ? null == e
                    ? this._setOptionValue(r, !t.negate && (n || !0))
                    : this._setOptionValue(r, e)
                  : null !== e && this._setOptionValue(r, !t.negate && e);
              }),
              this
            );
          }
          _optionEx(t, e, r, n, i) {
            const s = this.createOption(e, r);
            if ((s.makeOptionMandatory(!!t.mandatory), "function" == typeof n))
              s.default(i).argParser(n);
            else if (n instanceof RegExp) {
              const t = n;
              (n = (e, r) => {
                const n = t.exec(e);
                return n ? n[0] : r;
              }),
                s.default(i).argParser(n);
            } else s.default(n);
            return this.addOption(s);
          }
          option(t, e, r, n) {
            return this._optionEx({}, t, e, r, n);
          }
          requiredOption(t, e, r, n) {
            return this._optionEx({ mandatory: !0 }, t, e, r, n);
          }
          combineFlagAndOptionalValue(t = !0) {
            return (this._combineFlagAndOptionalValue = !!t), this;
          }
          allowUnknownOption(t = !0) {
            return (this._allowUnknownOption = !!t), this;
          }
          allowExcessArguments(t = !0) {
            return (this._allowExcessArguments = !!t), this;
          }
          enablePositionalOptions(t = !0) {
            return (this._enablePositionalOptions = !!t), this;
          }
          passThroughOptions(t = !0) {
            if (
              ((this._passThroughOptions = !!t),
              this.parent && t && !this.parent._enablePositionalOptions)
            )
              throw new Error(
                "passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)"
              );
            return this;
          }
          storeOptionsAsProperties(t = !0) {
            if (((this._storeOptionsAsProperties = !!t), this.options.length))
              throw new Error(
                "call .storeOptionsAsProperties() before adding options"
              );
            return this;
          }
          _setOptionValue(t, e) {
            this._storeOptionsAsProperties
              ? (this[t] = e)
              : (this._optionValues[t] = e);
          }
          _getOptionValue(t) {
            return this._storeOptionsAsProperties
              ? this[t]
              : this._optionValues[t];
          }
          parse(t, e) {
            if (void 0 !== t && !Array.isArray(t))
              throw new Error(
                "first parameter to parse must be array or undefined"
              );
            let n;
            switch (
              ((e = e || {}),
              void 0 === t &&
                ((t = process.argv),
                process.versions &&
                  process.versions.electron &&
                  (e.from = "electron")),
              (this.rawArgs = t.slice()),
              e.from)
            ) {
              case void 0:
              case "node":
                (this._scriptPath = t[1]), (n = t.slice(2));
                break;
              case "electron":
                process.defaultApp
                  ? ((this._scriptPath = t[1]), (n = t.slice(2)))
                  : (n = t.slice(1));
                break;
              case "user":
                n = t.slice(0);
                break;
              default:
                throw new Error(
                  `unexpected parse option { from: '${e.from}' }`
                );
            }
            return (
              !this._scriptPath &&
                r.c[r.s] &&
                (this._scriptPath = r.c[r.s].filename),
              (this._name =
                this._name ||
                (this._scriptPath &&
                  s.basename(this._scriptPath, s.extname(this._scriptPath)))),
              this._parseCommand([], n),
              this
            );
          }
          parseAsync(t, e) {
            return (
              this.parse(t, e),
              Promise.all(this._actionResults).then(() => this)
            );
          }
          _executeSubCommand(t, e) {
            e = e.slice();
            let n = !1;
            const a = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
            this._checkForMissingMandatoryOptions();
            let c,
              h = this._scriptPath;
            !h && r.c[r.s] && (h = r.c[r.s].filename);
            try {
              const t = o.realpathSync(h);
              c = s.dirname(t);
            } catch (t) {
              c = ".";
            }
            let u = s.basename(h, s.extname(h)) + "-" + t._name;
            t._executableFile && (u = t._executableFile);
            const p = s.join(c, u);
            let d;
            o.existsSync(p)
              ? (u = p)
              : a.forEach((t) => {
                  o.existsSync(`${p}${t}`) && (u = `${p}${t}`);
                }),
              (n = a.includes(s.extname(u))),
              "win32" !== process.platform
                ? n
                  ? (e.unshift(u),
                    (e = m(process.execArgv).concat(e)),
                    (d = i.spawn(process.argv[0], e, { stdio: "inherit" })))
                  : (d = i.spawn(u, e, { stdio: "inherit" }))
                : (e.unshift(u),
                  (e = m(process.execArgv).concat(e)),
                  (d = i.spawn(process.execPath, e, { stdio: "inherit" }))),
              ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"].forEach(
                (t) => {
                  process.on(t, () => {
                    !1 === d.killed && null === d.exitCode && d.kill(t);
                  });
                }
              );
            const f = this._exitCallback;
            f
              ? d.on("close", () => {
                  f(
                    new l(
                      process.exitCode || 0,
                      "commander.executeSubCommandAsync",
                      "(close)"
                    )
                  );
                })
              : d.on("close", process.exit.bind(process)),
              d.on("error", (e) => {
                if ("ENOENT" === e.code) {
                  const e = `'${u}' does not exist\n - if '${t._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name`;
                  throw new Error(e);
                }
                if ("EACCES" === e.code)
                  throw new Error(`'${u}' not executable`);
                if (f) {
                  const t = new l(
                    1,
                    "commander.executeSubCommandAsync",
                    "(error)"
                  );
                  (t.nestedError = e), f(t);
                } else process.exit(1);
              }),
              (this.runningCommand = d);
          }
          _dispatchSubcommand(t, e, r) {
            const n = this._findCommand(t);
            n || this.help({ error: !0 }),
              n._executableHandler
                ? this._executeSubCommand(n, e.concat(r))
                : n._parseCommand(e, r);
          }
          _parseCommand(t, e) {
            const r = this.parseOptions(e);
            if (
              ((t = t.concat(r.operands)),
              (e = r.unknown),
              (this.args = t.concat(e)),
              t && this._findCommand(t[0]))
            )
              this._dispatchSubcommand(t[0], t.slice(1), e);
            else if (
              this._hasImplicitHelpCommand() &&
              t[0] === this._helpCommandName
            )
              1 === t.length
                ? this.help()
                : this._dispatchSubcommand(t[1], [], [this._helpLongFlag]);
            else if (this._defaultCommandName)
              p(this, e),
                this._dispatchSubcommand(this._defaultCommandName, t, e);
            else {
              !this.commands.length ||
                0 !== this.args.length ||
                this._actionHandler ||
                this._defaultCommandName ||
                this.help({ error: !0 }),
                p(this, r.unknown),
                this._checkForMissingMandatoryOptions();
              const n = () => {
                  r.unknown.length > 0 && this.unknownOption(r.unknown[0]);
                },
                i = `command:${this.name()}`;
              if (this._actionHandler) {
                n();
                const r = this.args.slice();
                this._args.forEach((t, e) => {
                  t.required && null == r[e]
                    ? this.missingArgument(t.name)
                    : t.variadic &&
                      ((r[e] = r.splice(e)),
                      (r.length = Math.min(e + 1, r.length)));
                }),
                  r.length > this._args.length && this._excessArguments(r),
                  this._actionHandler(r),
                  this.parent && this.parent.emit(i, t, e);
              } else
                this.parent && this.parent.listenerCount(i)
                  ? (n(), this.parent.emit(i, t, e))
                  : t.length
                  ? this._findCommand("*")
                    ? this._dispatchSubcommand("*", t, e)
                    : this.listenerCount("command:*")
                    ? this.emit("command:*", t, e)
                    : this.commands.length
                    ? this.unknownCommand()
                    : n()
                  : this.commands.length
                  ? this.help({ error: !0 })
                  : n();
            }
          }
          _findCommand(t) {
            if (t)
              return this.commands.find(
                (e) => e._name === t || e._aliases.includes(t)
              );
          }
          _findOption(t) {
            return this.options.find((e) => e.is(t));
          }
          _checkForMissingMandatoryOptions() {
            for (let t = this; t; t = t.parent)
              t.options.forEach((e) => {
                e.mandatory &&
                  void 0 === t._getOptionValue(e.attributeName()) &&
                  t.missingMandatoryOptionValue(e);
              });
          }
          parseOptions(t) {
            const e = [],
              r = [];
            let n = e;
            const i = t.slice();
            function s(t) {
              return t.length > 1 && "-" === t[0];
            }
            let o = null;
            for (; i.length; ) {
              const t = i.shift();
              if ("--" === t) {
                n === r && n.push(t), n.push(...i);
                break;
              }
              if (!o || s(t)) {
                if (((o = null), s(t))) {
                  const e = this._findOption(t);
                  if (e) {
                    if (e.required) {
                      const t = i.shift();
                      void 0 === t && this.optionMissingArgument(e),
                        this.emit(`option:${e.name()}`, t);
                    } else if (e.optional) {
                      let t = null;
                      i.length > 0 && !s(i[0]) && (t = i.shift()),
                        this.emit(`option:${e.name()}`, t);
                    } else this.emit(`option:${e.name()}`);
                    o = e.variadic ? e : null;
                    continue;
                  }
                }
                if (t.length > 2 && "-" === t[0] && "-" !== t[1]) {
                  const e = this._findOption(`-${t[1]}`);
                  if (e) {
                    e.required ||
                    (e.optional && this._combineFlagAndOptionalValue)
                      ? this.emit(`option:${e.name()}`, t.slice(2))
                      : (this.emit(`option:${e.name()}`),
                        i.unshift(`-${t.slice(2)}`));
                    continue;
                  }
                }
                if (/^--[^=]+=/.test(t)) {
                  const e = t.indexOf("="),
                    r = this._findOption(t.slice(0, e));
                  if (r && (r.required || r.optional)) {
                    this.emit(`option:${r.name()}`, t.slice(e + 1));
                    continue;
                  }
                }
                if (
                  (s(t) && (n = r),
                  (this._enablePositionalOptions || this._passThroughOptions) &&
                    0 === e.length &&
                    0 === r.length)
                ) {
                  if (this._findCommand(t)) {
                    e.push(t), i.length > 0 && r.push(...i);
                    break;
                  }
                  if (
                    t === this._helpCommandName &&
                    this._hasImplicitHelpCommand()
                  ) {
                    e.push(t), i.length > 0 && e.push(...i);
                    break;
                  }
                  if (this._defaultCommandName) {
                    r.push(t), i.length > 0 && r.push(...i);
                    break;
                  }
                }
                if (this._passThroughOptions) {
                  n.push(t), i.length > 0 && n.push(...i);
                  break;
                }
                n.push(t);
              } else this.emit(`option:${o.name()}`, t);
            }
            return { operands: e, unknown: r };
          }
          opts() {
            if (this._storeOptionsAsProperties) {
              const t = {},
                e = this.options.length;
              for (let r = 0; r < e; r++) {
                const e = this.options[r].attributeName();
                t[e] = e === this._versionOptionName ? this._version : this[e];
              }
              return t;
            }
            return this._optionValues;
          }
          _displayError(t, e, r) {
            this._outputConfiguration.outputError(
              `${r}\n`,
              this._outputConfiguration.writeErr
            ),
              this._exit(t, e, r);
          }
          missingArgument(t) {
            const e = `error: missing required argument '${t}'`;
            this._displayError(1, "commander.missingArgument", e);
          }
          optionMissingArgument(t) {
            const e = `error: option '${t.flags}' argument missing`;
            this._displayError(1, "commander.optionMissingArgument", e);
          }
          missingMandatoryOptionValue(t) {
            const e = `error: required option '${t.flags}' not specified`;
            this._displayError(1, "commander.missingMandatoryOptionValue", e);
          }
          unknownOption(t) {
            if (this._allowUnknownOption) return;
            const e = `error: unknown option '${t}'`;
            this._displayError(1, "commander.unknownOption", e);
          }
          _excessArguments(t) {
            if (this._allowExcessArguments) return;
            const e = this._args.length,
              r = 1 === e ? "" : "s",
              n = `error: too many arguments${
                this.parent ? ` for '${this.name()}'` : ""
              }. Expected ${e} argument${r} but got ${t.length}.`;
            this._displayError(1, "commander.excessArguments", n);
          }
          unknownCommand() {
            const t = [this.name()];
            for (let e = this.parent; e; e = e.parent) t.unshift(e.name());
            const e = t.join(" "),
              r =
                `error: unknown command '${this.args[0]}'.` +
                (this._hasHelpOption
                  ? ` See '${e} ${this._helpLongFlag}'.`
                  : "");
            this._displayError(1, "commander.unknownCommand", r);
          }
          version(t, e, r) {
            if (void 0 === t) return this._version;
            (this._version = t),
              (e = e || "-V, --version"),
              (r = r || "output the version number");
            const n = this.createOption(e, r);
            return (
              (this._versionOptionName = n.attributeName()),
              this.options.push(n),
              this.on("option:" + n.name(), () => {
                this._outputConfiguration.writeOut(`${t}\n`),
                  this._exit(0, "commander.version", t);
              }),
              this
            );
          }
          description(t, e) {
            return void 0 === t && void 0 === e
              ? this._description
              : ((this._description = t), (this._argsDescription = e), this);
          }
          alias(t) {
            if (void 0 === t) return this._aliases[0];
            let e = this;
            if (
              (0 !== this.commands.length &&
                this.commands[this.commands.length - 1]._executableHandler &&
                (e = this.commands[this.commands.length - 1]),
              t === e._name)
            )
              throw new Error("Command alias can't be the same as its name");
            return e._aliases.push(t), this;
          }
          aliases(t) {
            return void 0 === t
              ? this._aliases
              : (t.forEach((t) => this.alias(t)), this);
          }
          usage(t) {
            if (void 0 === t) {
              if (this._usage) return this._usage;
              const t = this._args.map((t) => d(t));
              return []
                .concat(
                  this.options.length || this._hasHelpOption ? "[options]" : [],
                  this.commands.length ? "[command]" : [],
                  this._args.length ? t : []
                )
                .join(" ");
            }
            return (this._usage = t), this;
          }
          name(t) {
            return void 0 === t ? this._name : ((this._name = t), this);
          }
          helpInformation(t) {
            const e = this.createHelp();
            return (
              void 0 === e.helpWidth &&
                (e.helpWidth =
                  t && t.error
                    ? this._outputConfiguration.getErrHelpWidth()
                    : this._outputConfiguration.getOutHelpWidth()),
              e.formatHelp(this, e)
            );
          }
          _getHelpContext(t) {
            const e = { error: !!(t = t || {}).error };
            let r;
            return (
              (r = e.error
                ? (t) => this._outputConfiguration.writeErr(t)
                : (t) => this._outputConfiguration.writeOut(t)),
              (e.write = t.write || r),
              (e.command = this),
              e
            );
          }
          outputHelp(t) {
            let e;
            "function" == typeof t && ((e = t), (t = void 0));
            const r = this._getHelpContext(t),
              n = [];
            let i = this;
            for (; i; ) n.push(i), (i = i.parent);
            n
              .slice()
              .reverse()
              .forEach((t) => t.emit("beforeAllHelp", r)),
              this.emit("beforeHelp", r);
            let s = this.helpInformation(r);
            if (e && ((s = e(s)), "string" != typeof s && !Buffer.isBuffer(s)))
              throw new Error(
                "outputHelp callback must return a string or a Buffer"
              );
            r.write(s),
              this.emit(this._helpLongFlag),
              this.emit("afterHelp", r),
              n.forEach((t) => t.emit("afterAllHelp", r));
          }
          helpOption(t, e) {
            if ("boolean" == typeof t) return (this._hasHelpOption = t), this;
            (this._helpFlags = t || this._helpFlags),
              (this._helpDescription = e || this._helpDescription);
            const r = f(this._helpFlags);
            return (
              (this._helpShortFlag = r.shortFlag),
              (this._helpLongFlag = r.longFlag),
              this
            );
          }
          help(t) {
            this.outputHelp(t);
            let e = process.exitCode || 0;
            0 === e && t && "function" != typeof t && t.error && (e = 1),
              this._exit(e, "commander.help", "(outputHelp)");
          }
          addHelpText(t, e) {
            const r = ["beforeAll", "before", "after", "afterAll"];
            if (!r.includes(t))
              throw new Error(
                `Unexpected value for position to addHelpText.\nExpecting one of '${r.join(
                  "', '"
                )}'`
              );
            const n = `${t}Help`;
            return (
              this.on(n, (t) => {
                let r;
                (r =
                  "function" == typeof e
                    ? e({ error: t.error, command: t.command })
                    : e),
                  r && t.write(`${r}\n`);
              }),
              this
            );
          }
        }
        function p(t, e) {
          t._hasHelpOption &&
            e.find((e) => e === t._helpLongFlag || e === t._helpShortFlag) &&
            (t.outputHelp(),
            t._exit(0, "commander.helpDisplayed", "(outputHelp)"));
        }
        function d(t) {
          const e = t.name + (!0 === t.variadic ? "..." : "");
          return t.required ? "<" + e + ">" : "[" + e + "]";
        }
        function f(t) {
          let e, r;
          const n = t.split(/[ |,]+/);
          return (
            n.length > 1 && !/^[[<]/.test(n[1]) && (e = n.shift()),
            (r = n.shift()),
            !e && /^-[^-]$/.test(r) && ((e = r), (r = void 0)),
            { shortFlag: e, longFlag: r }
          );
        }
        function m(t) {
          return t.map((t) => {
            if (!t.startsWith("--inspect")) return t;
            let e,
              r,
              n = "127.0.0.1",
              i = "9229";
            return (
              null !== (r = t.match(/^(--inspect(-brk)?)$/))
                ? (e = r[1])
                : null !== (r = t.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))
                ? ((e = r[1]), /^\d+$/.test(r[3]) ? (i = r[3]) : (n = r[3]))
                : null !==
                    (r = t.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) &&
                  ((e = r[1]), (n = r[3]), (i = r[4])),
              e && "0" !== i ? `${e}=${n}:${parseInt(i) + 1}` : t
            );
          });
        }
        ((e = t.exports = new u()).program = e),
          (e.Command = u),
          (e.Option = c),
          (e.CommanderError = l),
          (e.InvalidOptionArgumentError = h),
          (e.Help = a);
      },
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var s = (e[n] = { id: n, loaded: !1, exports: {} });
    return t[n](s, s.exports, r), (s.loaded = !0), s.exports;
  }
  (r.c = e),
    (r.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, { a: e }), e;
    }),
    (r.d = (t, e) => {
      for (var n in e)
        r.o(e, n) &&
          !r.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
    r((r.s = 530));
})();
