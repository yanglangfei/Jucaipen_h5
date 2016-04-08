/*! layer-v2.1 弹层组件 License LGPL  http://layer.layui.com/ By 贤心 */ ! function(d, e) {
	var f, g, h = {
			getPath: function() {
				var j = document.scripts,
					k = j[j.length - 1],
					i = k.src;
				if (!k.getAttribute("merge")) {
					return i.substring(0, i.lastIndexOf("/") + 1)
				}
			}(),
			enter: function(i) {
				13 === i.keyCode && i.preventDefault()
			},
			config: {},
			end: {},
			btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
			type: ["dialog", "page", "iframe", "loading", "tips"]
		},
		a = {
			v: "2.1",
			ie6: !!d.ActiveXObject && !d.XMLHttpRequest,
			index: 0,
			path: h.getPath,
			config: function(k, l) {
				var i = 0;
				return k = k || {}, a.cache = h.config = f.extend(h.config, k), a.path = h.config.path || a.path, "string" == typeof k.extend && (k.extend = [k.extend]), a.use("skin/layer.css", k.extend && k.extend.length > 0 ? function j() {
					var m = k.extend;
					a.use(m[m[i] ? i : i - 1], i < m.length ? function() {
						return ++i, j
					}() : l)
				}() : l), this
			},
			use: function(o, p, i) {
				var j = f("head")[0],
					o = o.replace(/\s/g, ""),
					k = /\.css$/.test(o),
					l = document.createElement(k ? "link" : "script"),
					m = "layui_layer_" + o.replace(/\.|\//g, "");
				return a.path ? (k && (l.rel = "stylesheet"), l[k ? "href" : "src"] = /^http:\/\//.test(o) ? o : a.path + o, l.id = m, f("#" + m)[0] || j.appendChild(l), function n() {
					(k ? 1989 === parseInt(f("#" + m).css("width")) : a[i || m]) ? function() {
						p && p();
						try {
							k || j.removeChild(l)
						} catch (q) {}
					}() : setTimeout(n, 100)
				}(), this) : void 0
			},
			ready: function(j, k) {
				var i = "function" == typeof j;
				return i && (k = j), a.config(f.extend(h.config, function() {
					return i ? {} : {
						path: j
					}
				}()), k), this
			},
			alert: function(k, l, i) {
				var j = "function" == typeof l;
				return j && (i = l), a.open(f.extend({
					content: k,
					yes: i
				}, j ? {} : l))
			},
			confirm: function(l, m, i, k) {
				var j = "function" == typeof m;
				return j && (k = i, i = m), a.open(f.extend({
					content: l,
					btn: h.btn,
					yes: i,
					cancel: k
				}, j ? {} : m))
			},
			msg: function(o, k, m) {
				var j = "function" == typeof k,
					l = h.config.skin,
					n = (l ? l + " " + l + "-msg" : "") || "layui-layer-msg",
					i = c.anim.length - 1;
				return j && (m = k), a.open(f.extend({
					content: o,
					time: 3000,
					shade: !1,
					skin: n,
					title: !1,
					closeBtn: !1,
					btn: !1,
					end: m
				}, j && !h.config.skin ? {
					skin: n + " layui-layer-hui",
					shift: i
				} : function() {
					return k = k || {}, (-1 === k.icon || k.icon === e && !h.config.skin) && (k.skin = n + " " + (k.skin || "layui-layer-hui")), k
				}()))
			},
			load: function(i, j) {
				return a.open(f.extend({
					type: 3,
					icon: i || 0,
					shade: 0.01
				}, j))
			},
			tips: function(j, k, i) {
				return a.open(f.extend({
					type: 4,
					content: [j, k],
					closeBtn: !1,
					time: 3000,
					maxWidth: 210
				}, i))
			}
		},
		b = function(i) {
			var j = this;
			j.index = ++a.index, j.config = f.extend({}, j.config, h.config, i), j.creat()
		};
	b.pt = b.prototype;
	var c = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
	c.anim = ["layui-anim", "layui-anim-01", "layui-anim-02", "layui-anim-03", "layui-anim-04", "layui-anim-05", "layui-anim-06"], b.pt.config = {
		type: 0,
		shade: 0.3,
		fix: !0,
		move: c[1],
		title: "&#x4FE1;&#x606F;",
		offset: "auto",
		area: "auto",
		closeBtn: 1,
		time: 0,
		zIndex: 19891014,
		maxWidth: 360,
		shift: 0,
		icon: -1,
		scrollbar: !0,
		tips: 2
	}, b.pt.vessel = function(m, n) {
		var o = this,
			p = o.index,
			x = o.config,
			i = x.zIndex + p,
			j = "object" == typeof x.title,
			k = x.maxmin && (1 === x.type || 2 === x.type),
			l = x.title ? '<div class="layui-layer-title" style="' + (j ? x.title[1] : "") + '">' + (j ? x.title[0] : x.title) + "</div>" : "";
		return x.zIndex = i, n([x.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + p + '" times="' + p + '" style="' + ("z-index:" + (i - 1) + "; background-color:" + (x.shade[1] || "#000") + "; opacity:" + (x.shade[0] || x.shade) + "; filter:alpha(opacity=" + (100 * x.shade[0] || 100 * x.shade) + ");") + '"></div>' : "", '<div class="' + c[0] + " " + (c.anim[x.shift] || "") + (" layui-layer-" + h.type[x.type]) + (0 != x.type && 2 != x.type || x.shade ? "" : " layui-layer-border") + " " + (x.skin || "") + '" id="' + c[0] + p + '" type="' + h.type[x.type] + '" times="' + p + '" showtime="' + x.time + '" conType="' + (m ? "object" : "string") + '" style="z-index: ' + i + "; width:" + x.area[0] + ";height:" + x.area[1] + (x.fix ? "" : ";position:absolute;") + '">' + (m && 2 != x.type ? "" : l) + '<div class="layui-layer-content' + (0 == x.type && -1 !== x.icon ? " layui-layer-padding" : "") + (3 == x.type ? " layui-layer-loading" + x.icon : "") + '">' + (0 == x.type && -1 !== x.icon ? '<i class="layui-layer-ico layui-layer-ico' + x.icon + '"></i>' : "") + (1 == x.type && m ? "" : x.content || "") + '</div><span class="layui-layer-setwin">' + function() {
			var q = k ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
			return x.closeBtn && (q += '<a class="layui-layer-ico ' + c[7] + " " + c[7] + (x.title ? x.closeBtn : 4 == x.type ? "1" : "2") + '" href="javascript:;"></a>'), q
		}() + "</span>" + (x.btn ? function() {
			var r = "";
			"string" == typeof x.btn && (x.btn = [x.btn]);
			for (var s = 0, q = x.btn.length; q > s; s++) {
				r += '<a class="' + c[6] + s + '">' + x.btn[s] + "</a>"
			}
			return '<div class="' + c[6] + '">' + r + "</div>"
		}() : "") + "</div>"], l), o
	}, b.pt.creat = function() {
		var l = this,
			m = l.config,
			i = l.index,
			j = m.content,
			k = "object" == typeof j;
		switch ("string" == typeof m.area && (m.area = "auto" === m.area ? ["", ""] : [m.area, ""]), m.type) {
			case 0:
				m.btn = "btn" in m ? m.btn : h.btn[0], a.closeAll("dialog");
				break;
			case 2:
				var j = m.content = k ? m.content : [m.content || "http://layer.layui.com", "auto"];
				m.content = '<iframe scrolling="' + (m.content[1] || "auto") + '" allowtransparency="true" id="' + c[4] + i + '" name="' + c[4] + i + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + m.content[0] + '"></iframe>';
				break;
			case 3:
				m.title = !1, m.closeBtn = !1, -1 === m.icon && 0 === m.icon, a.closeAll("loading");
				break;
			case 4:
				k || (m.content = [m.content, "body"]), m.follow = m.content[1], m.content = m.content[0] + '<i class="layui-layer-TipsG"></i>', m.title = !1, m.shade = !1, m.fix = !1, m.tips = "object" == typeof m.tips ? m.tips : [m.tips, !0], m.tipsMore || a.closeAll("tips")
		}
		l.vessel(k, function(n, o) {
			f("body").append(n[0]), k ? function() {
				2 == m.type || 4 == m.type ? function() {
					f("body").append(n[1])
				}() : function() {
					j.parents("." + c[0])[0] || (j.show().addClass("layui-layer-wrap").wrap(n[1]), f("#" + c[0] + i).find("." + c[5]).before(o))
				}()
			}() : f("body").append(n[1]), l.layero = f("#" + c[0] + i), m.scrollbar || c.html.css("overflow", "hidden").attr("layer-full", i)
		}).auto(i), 2 == m.type && a.ie6 && l.layero.find("iframe").attr("src", j[0]), f(document).off("keydown", h.enter).on("keydown", h.enter), l.layero.on("keydown", function(n) {
			f(document).off("keydown", h.enter)
		}), 4 == m.type ? l.tips() : l.offset(), m.fix && g.on("resize", function() {
			l.offset(), (/^\d+%$/.test(m.area[0]) || /^\d+%$/.test(m.area[1])) && l.auto(i), 4 == m.type && l.tips()
		}), m.time <= 0 || setTimeout(function() {
			a.close(l.index)
		}, m.time), l.move().callback()
	}, b.pt.auto = function(o) {
		function p(q) {
			q = l.find(q), q.height(m[1] - n - k - 2 * (0 | parseFloat(q.css("padding"))))
		}
		var i = this,
			j = i.config,
			l = f("#" + c[0] + o);
		"" === j.area[0] && j.maxWidth > 0 && (/MSIE 7/.test(navigator.userAgent) && j.btn && l.width(l.innerWidth()), l.outerWidth() > j.maxWidth && l.width(j.maxWidth));
		var m = [l.innerWidth(), l.innerHeight()],
			n = l.find(c[1]).outerHeight() || 0,
			k = l.find("." + c[6]).outerHeight() || 0;
		switch (j.type) {
			case 2:
				p("iframe");
				break;
			default:
				"" === j.area[1] ? j.fix && m[1] >= g.height() && (m[1] = g.height(), p("." + c[5])) : p("." + c[5])
		}
		return i
	}, b.pt.offset = function() {
		var k = this,
			m = k.config,
			j = k.layero,
			l = [j.outerWidth(), j.outerHeight()],
			i = "object" == typeof m.offset;
		k.offsetTop = (g.height() - l[1]) / 2, k.offsetLeft = (g.width() - l[0]) / 2, i ? (k.offsetTop = m.offset[0], k.offsetLeft = m.offset[1] || k.offsetLeft) : "auto" !== m.offset && (k.offsetTop = m.offset, "rb" === m.offset && (k.offsetTop = g.height() - l[1], k.offsetLeft = g.width() - l[0])), m.fix || (k.offsetTop = /%$/.test(k.offsetTop) ? g.height() * parseFloat(k.offsetTop) / 100 : parseFloat(k.offsetTop), k.offsetLeft = /%$/.test(k.offsetLeft) ? g.width() * parseFloat(k.offsetLeft) / 100 : parseFloat(k.offsetLeft), k.offsetTop += g.scrollTop(), k.offsetLeft += g.scrollLeft()), j.css({
			top: k.offsetTop,
			left: k.offsetLeft
		})
	}, b.pt.tips = function() {
		var o = this,
			p = o.config,
			i = o.layero,
			j = [i.outerWidth(), i.outerHeight()],
			l = f(p.follow);
		l[0] || (l = f("body"));
		var m = {
				width: l.outerWidth(),
				height: l.outerHeight(),
				top: l.offset().top,
				left: l.offset().left
			},
			n = i.find(".layui-layer-TipsG"),
			k = p.tips[0];
		p.tips[1] || n.remove(), m.autoLeft = function() {
			m.left + j[0] - g.width() > 0 ? (m.tipLeft = m.left + m.width - j[0], n.css({
				right: 12,
				left: "auto"
			})) : m.tipLeft = m.left
		}, m.where = [function() {
			m.autoLeft(), m.tipTop = m.top - j[1] - 10, n.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", p.tips[1])
		}, function() {
			m.tipLeft = m.left + m.width + 10, m.tipTop = m.top, n.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", p.tips[1])
		}, function() {
			m.autoLeft(), m.tipTop = m.top + m.height + 10, n.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", p.tips[1])
		}, function() {
			m.tipLeft = m.left - j[0] - 10, m.tipTop = m.top, n.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", p.tips[1])
		}], m.where[k - 1](), 1 === k ? m.top - (g.scrollTop() + j[1] + 16) < 0 && m.where[2]() : 2 === k ? g.width() - (m.left + m.width + j[0] + 16) > 0 || m.where[3]() : 3 === k ? m.top - g.scrollTop() + m.height + j[1] + 16 - g.height() > 0 && m.where[0]() : 4 === k && j[0] + 16 - m.left > 0 && m.where[1](), i.find("." + c[5]).css({
			"background-color": p.tips[1],
			"padding-right": p.closeBtn ? "30px" : ""
		}), i.css({
			left: m.tipLeft,
			top: m.tipTop
		})
	}, b.pt.move = function() {
		var k = this,
			l = k.config,
			i = {
				setY: 0,
				moveLayer: function() {
					var n = i.layero,
						o = parseInt(n.css("margin-left")),
						m = parseInt(i.move.css("left"));
					0 === o || (m -= o), "fixed" !== n.css("position") && (m -= n.parent().offset().left, i.setY = 0), n.css({
						left: m,
						top: parseInt(i.move.css("top")) - i.setY
					})
				}
			},
			j = k.layero.find(l.move);
		return l.move && j.attr("move", "ok"), j.css({
			cursor: l.move ? "move" : "auto"
		}), f(l.move).on("mousedown", function(m) {
			if (m.preventDefault(), "ok" === f(this).attr("move")) {
				i.ismove = !0, i.layero = f(this).parents("." + c[0]);
				var n = i.layero.offset().left,
					o = i.layero.offset().top,
					p = i.layero.outerWidth() - 6,
					t = i.layero.outerHeight() - 6;
				f("#layui-layer-moves")[0] || f("body").append('<div id="layui-layer-moves" class="layui-layer-moves" style="left:' + n + "px; top:" + o + "px; width:" + p + "px; height:" + t + 'px; z-index:2147483584"></div>'), i.move = f("#layui-layer-moves"), l.moveType && i.move.css({
					visibility: "hidden"
				}), i.moveX = m.pageX - i.move.position().left, i.moveY = m.pageY - i.move.position().top, "fixed" !== i.layero.css("position") || (i.setY = g.scrollTop())
			}
		}), f(document).mousemove(function(m) {
			if (i.ismove) {
				var n = m.pageX - i.moveX,
					o = m.pageY - i.moveY;
				if (m.preventDefault(), !l.moveOut) {
					i.setY = g.scrollTop();
					var p = g.width() - i.move.outerWidth(),
						t = i.setY;
					0 > n && (n = 0), n > p && (n = p), t > o && (o = t), o > g.height() - i.move.outerHeight() + i.setY && (o = g.height() - i.move.outerHeight() + i.setY)
				}
				i.move.css({
					left: n,
					top: o
				}), l.moveType && i.moveLayer(), n = o = p = t = null
			}
		}).mouseup(function() {
			try {
				i.ismove && (i.moveLayer(), i.move.remove(), l.moveEnd && l.moveEnd()), i.ismove = !1
			} catch (m) {
				i.ismove = !1
			}
		}), k
	}, b.pt.callback = function() {
		function k() {
			var m = j.cancel && j.cancel(l.index);
			m === !1 || a.close(l.index)
		}
		var l = this,
			i = l.layero,
			j = l.config;
		l.openLayer(), j.success && (2 == j.type ? i.find("iframe").on("load", function() {
			j.success(i, l.index)
		}) : j.success(i, l.index)), a.ie6 && l.IE6(i), i.find("." + c[6]).children("a").on("click", function() {
			var m = f(this).index();
			j["btn" + (m + 1)] && j["btn" + (m + 1)](l.index, i), 0 === m ? j.yes ? j.yes(l.index, i) : a.close(l.index) : 1 === m ? k() : j["btn" + (m + 1)] || a.close(l.index)
		}), i.find("." + c[7]).on("click", k), j.shadeClose && f("#layui-layer-shade" + l.index).on("click", function() {
			a.close(l.index)
		}), i.find(".layui-layer-min").on("click", function() {
			a.min(l.index, j), j.min && j.min(i)
		}), i.find(".layui-layer-max").on("click", function() {
			f(this).hasClass("layui-layer-maxmin") ? (a.restore(l.index), j.restore && j.restore(i)) : (a.full(l.index, j), j.full && j.full(i))
		}), j.end && (h.end[l.index] = j.end)
	}, h.reselect = function() {
		f.each(f("select"), function(j, k) {
			var i = f(this);
			i.parents("." + c[0])[0] || 1 == i.attr("layer") && f("." + c[0]).length < 1 && i.removeAttr("layer").show(), i = null
		})
	}, b.pt.IE6 = function(k) {
		function l() {
			k.css({
				top: j + (i.config.fix ? g.scrollTop() : 0)
			})
		}
		var i = this,
			j = k.offset().top;
		l(), g.scroll(l), f("select").each(function(n, o) {
			var m = f(this);
			m.parents("." + c[0])[0] || "none" === m.css("display") || m.attr({
				layer: "1"
			}).hide(), m = null
		})
	}, b.pt.openLayer = function() {
		var i = this;
		a.zIndex = i.config.zIndex, a.setTop = function(j) {
			var k = function() {
				a.zIndex++, j.css("z-index", a.zIndex + 1)
			};
			return a.zIndex = parseInt(j[0].style.zIndex), j.on("mousedown", k), a.zIndex
		}
	}, h.record = function(i) {
		var j = [i.outerWidth(), i.outerHeight(), i.position().top, i.position().left + parseFloat(i.css("margin-left"))];
		i.find(".layui-layer-max").addClass("layui-layer-maxmin"), i.attr({
			area: j
		})
	}, h.rescollbar = function(i) {
		c.html.attr("layer-full") == i && (c.html[0].style.removeProperty ? c.html[0].style.removeProperty("overflow") : c.html[0].style.removeAttribute("overflow"), c.html.removeAttr("layer-full"))
	}, d.layer = a, a.getChildFrame = function(i, j) {
		return j = j || f("." + c[4]).attr("times"), f("#" + c[0] + j).find("iframe").contents().find(i)
	}, a.getFrameIndex = function(i) {
		return f("#" + i).parents("." + c[4]).attr("times")
	}, a.iframeAuto = function(l) {
		if (l) {
			var m = a.getChildFrame("html", l).outerHeight(),
				j = f("#" + c[0] + l),
				k = j.find(c[1]).outerHeight() || 0,
				i = j.find("." + c[6]).outerHeight() || 0;
			j.css({
				height: m + k + i
			}), j.find("iframe").css({
				height: m
			})
		}
	}, a.iframeSrc = function(i, j) {
		f("#" + c[0] + i).find("iframe").attr("src", j)
	}, a.style = function(m, n) {
		var j = f("#" + c[0] + m),
			k = j.attr("type"),
			l = j.find(c[1]).outerHeight() || 0,
			i = j.find("." + c[6]).outerHeight() || 0;
		(k === h.type[1] || k === h.type[2]) && (j.css(n), k === h.type[2] && j.find("iframe").css({
			height: parseFloat(n.height) - l - i
		}))
	}, a.min = function(k, l) {
		var i = f("#" + c[0] + k),
			j = i.find(c[1]).outerHeight() || 0;
		h.record(i), a.style(k, {
			width: 180,
			height: j,
			overflow: "hidden"
		}), i.find(".layui-layer-min").hide(), "page" === i.attr("type") && i.find(c[4]).hide(), h.rescollbar(k)
	}, a.restore = function(j) {
		var k = f("#" + c[0] + j),
			i = k.attr("area").split(",");
		k.attr("type");
		a.style(j, {
			width: parseFloat(i[0]),
			height: parseFloat(i[1]),
			top: parseFloat(i[2]),
			left: parseFloat(i[3]),
			overflow: "visible"
		}), k.find(".layui-layer-max").removeClass("layui-layer-maxmin"), k.find(".layui-layer-min").show(), "page" === k.attr("type") && k.find(c[4]).show(), h.rescollbar(j)
	}, a.full = function(j) {
		var k, i = f("#" + c[0] + j);
		h.record(i), c.html.attr("layer-full") || c.html.css("overflow", "hidden").attr("layer-full", j), clearTimeout(k), k = setTimeout(function() {
			var l = "fixed" === i.css("position");
			a.style(j, {
				top: l ? 0 : g.scrollTop(),
				left: l ? 0 : g.scrollLeft(),
				width: g.width(),
				height: g.height()
			}), i.find(".layui-layer-min").hide()
		}, 100)
	}, a.title = function(j, k) {
		var i = f("#" + c[0] + (k || a.index)).find(c[1]);
		i.html(j)
	}, a.close = function(m) {
		var n = f("#" + c[0] + m),
			j = n.attr("type");
		if (n[0]) {
			if (j === h.type[1] && "object" === n.attr("conType")) {
				n.children(":not(." + c[5] + ")").remove();
				for (var l = 0; 2 > l; l++) {
					n.find(".layui-layer-wrap").unwrap().hide()
				}
			} else {
				if (j === h.type[2]) {
					try {
						var i = f("#" + c[4] + m)[0];
						i.contentWindow.document.write(""), i.contentWindow.close(), n.find("." + c[5])[0].removeChild(i)
					} catch (k) {}
				}
				n[0].innerHTML = "", n.remove()
			}
			f("#layui-layer-moves, #layui-layer-shade" + m).remove(), a.ie6 && h.reselect(), h.rescollbar(m), f(document).off("keydown", h.enter), "function" == typeof h.end[m] && h.end[m](), delete h.end[m]
		}
	}, a.closeAll = function(i) {
		f.each(f("." + c[0]), function() {
			var j = f(this),
				k = i ? j.attr("type") === i : 1;
			k && a.close(j.attr("times")), k = null
		})
	}, h.run = function() {
		f = jQuery, g = f(d), c.html = f("html"), a.open = function(i) {
			var j = new b(i);
			return j.index
		}
	}, "function" == typeof define ? define(function() {
		return h.run(), a
	}) : function() {
		h.run(), a.use("skin/layer.css")
	}()
}(window);