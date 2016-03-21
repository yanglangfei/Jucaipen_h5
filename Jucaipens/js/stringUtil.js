var subStr = function(S, H) {
	if (H == null || H.length <= 0) {
		return ""
	}
	var I = H.substr(0, 4);
	var N = H.indexOf("-");
	var C = H.lastIndexOf("-");
	var A = parseInt(C) - (parseInt(N) + 1);
	var z = H.substr(parseInt(N) + 1, A);
	var P = H.indexOf(" ");
	var B = P - C;
	var E = H.substr(C + 1, B);
	var Q = H.indexOf(":");
	var Q = H.indexOf(":");
	var M = H.substr(P + 1, 2);
	var R = H.lastIndexOf(":");
	var G = H.substr(Q + 1, 2);
	var y = H.substr(R + 1, 2);
	var O = new Date();
	var x = O.getFullYear();
	var J = O.getMonth() + 1;
	var K = O.getDate();
	var D = O.getHours();
	var L = O.getMinutes();
	if (S == 0) {
		if (x == I && J == z && K == E) {
			return "今日主题"
		}
		if (x == I && z == J && E == K - 1) {
			return "昨日主题"
		}
		return I + "/" + z + "/" + E
	} else {
		if (S == 1) {
			return M + ":" + G + ":" + y
		} else {
			if (S == 2) {
				return I + "-" + z + "-" + E + " " + M + ":" + G
			} else {
				if (S == 3) {
					return I + "-" + z + "-" + E
				} else {
					if (S == 4) {
						if (x == I && J == z && K == E) {
							var T = D - M;
							var F = L - G;
							if (T != 0 && F != 0) {
								return T + "小时" + F + "分前"
							} else {
								if (T == 0 && F != 0) {
									return F + "分前"
								} else {
									if (T != 0 && F == 0) {
										return T + "小时前"
									} else {
										return "刚刚"
									}
								}
							}
						}
						return I + "-" + z + "-" + E
					} else {
						if (S == 5) {
							return M + ":" + G
						}
					}
				}
			}
		}
	}
};
var subChatStr = function(S, H) {
	if (H == null && H.length <= 0) {
		return ""
	}
	var I = H.substr(0, 4);
	var N = H.indexOf("/");
	var C = H.lastIndexOf("/");
	var A = parseInt(C) - (parseInt(N) + 1);
	var z = H.substr(parseInt(N) + 1, A);
	var P = H.indexOf(" ");
	var B = P - C;
	var E = H.substr(C + 1, B);
	var Q = H.indexOf(":");
	var Q = H.indexOf(":");
	var M = H.substr(P + 1, 2);
	var R = H.lastIndexOf(":");
	var G = H.substr(Q + 1, 2);
	var y = H.substr(R + 1, 2);
	var O = new Date();
	var x = O.getFullYear();
	var J = O.getMonth() + 1;
	var K = O.getDate();
	var D = O.getHours();
	var L = O.getMinutes();
	if (S == 0) {
		if (x == I && J == z && K == E) {
			return "今日主题"
		}
		if (x == I && z == J && E == K - 1) {
			return "昨日主题"
		}
		return I + "/" + z + "/" + E
	} else {
		if (S == 1) {
			return M + ":" + G + ":" + y
		} else {
			if (S == 2) {
				return I + "-" + z + "-" + E + " " + M + ":" + G
			} else {
				if (S == 3) {
					return I + "-" + z + "-" + E
				} else {
					if (S == 4) {
						if (x == I && J == z && K == E) {
							var T = D - M;
							var F = L - G;
							if (T != 0 && F != 0) {
								return T + "小时" + F + "分前"
							} else {
								if (T == 0 && F != 0) {
									return F + "分前"
								} else {
									if (T != 0 && F == 0) {
										return T + "小时前"
									} else {
										return "刚刚"
									}
								}
							}
						}
						return I + "-" + z + "-" + E
					}
				}
			}
		}
	}
};
var dateForm = function(p) {
	var o = p.substr(0, 4);
	var q = p.indexOf("-");
	var s = p.lastIndexOf("-");
	var k = parseInt(s) - (parseInt(q) + 1);
	var m = p.substr(parseInt(q) + 1, k);
	var r = p.indexOf(" ");
	var l = r - s;
	var n = p.substr(s + 1, l);
	var t = new Date();
	t.setYear(o);
	t.setMonth(m, n);
	return t
};
var dateDistance = function(u) {
	var t = u.substr(0, 4);
	var x = u.indexOf("-");
	var B = u.lastIndexOf("-");
	var p = parseInt(B) - (parseInt(x) + 1);
	var r = u.substr(parseInt(x) + 1, p);
	var z = u.indexOf(" ");
	var q = z - B;
	var s = u.substr(B + 1, q);
	var v = new Date();
	var A = v.getFullYear();
	var w = v.getMonth() + 1;
	var y = v.getDate();
	var C = A * 365 + w * 30 + y;
	var D = t * 365 + r * 30 + s;
	return parseInt(C) - parseInt(D)
};
//计算  指定时间与今天相差的时间
var chat=function(last){
	var begin = Date.parse(new Date(last.replace(/-/g, "/"))); //last 为开始时间
    var curr=new Date().getTime();
    var date3=curr-begin;
    var days=Math.floor(date3/(24*3600*1000));
    return days;
} 

var mintChat=function(endTime){
	var begin = Date.parse(new Date(endTime.replace(/-/g, "/")));
	var curr=new Date().getTime();
    var date3=(curr-begin)/(1000);
    return date3;
}
