(function() {
	var gP, gM, gObject, topBarType, gRuntime, gOs, gPackage;
	window.dongyi = window.dj = window.castapp = window.ca = {
		init: function(BarType, packageName) {
			if (BarType) {
				topBarType = "UIStatusBarStyleDefault"
			} else {
				topBarType = "UIStatusBarStyleBlackOpaque"
			}
			var topBar = dongyi.tagName("header")["0"];
			gM = mui;
			gM.plusReady(function() {
				gP = plus;
				gOs = plus.os;
				gRuntime = plus.runtime;
				if (packageName) {
					localStorage.setItem("packageName", packageName);
					gPackage = packageName
				} else {
					gPackage = localStorage.getItem("packageName");
					if (gPackage == null) {
						gPackage = dongyi.getRuntime("appid")
					}
				}
				if (topBar) {
					var topBarColor = getComputedStyle(topBar, false)["backgroundColor"];
					if (gM.os.ios) {
						gP.navigator.setStatusBarStyle(topBarType);
						gP.navigator.setStatusBarBackground(topBarColor)
					}
				}
				var logTime = localStorage.getItem("logTime");
				var CurrentTime = dongyi.getCurrentTime();
				CurrentTime.length = 3;
				CurrentStrTime = CurrentTime.join("");
				if (CurrentStrTime != logTime) {
					localStorage.setItem("logTime", CurrentStrTime);
					localStorage.removeItem("isFirstStart")
				}
				var isFirstStart = localStorage.getItem("isFirstStart");
				if (isFirstStart != gPackage) {
					isFirstStartData = 1;
					localStorage.setItem("isFirstStart", gPackage);
					dongyi.getCurrentPosition({
						succFn: function(data) {
							var city = JSON.parse(data).result.addressComponent.city;
							dongyi.synchronousStatistics(isFirstStartData, 0, city)
						}
					});
					dongyi.update("system")
				} else {
					isFirstStartData = 0;
					dongyi.synchronousStatistics(isFirstStartData, 0, "")
				}
				var onlineTime = 0;
				var timeLog = localStorage.getItem(timeLog);
				if (timeLog == null) {
					setStartTime()
				}
				document.addEventListener("resume", function() {
					setStartTime()
				}, false);
				document.addEventListener("pause", function() {
					var startTime = localStorage.getItem(timeLog);
					var endTime = dongyi.getCurrentTime()["7"];
					onlineTime = endTime - startTime;
					isFirstStartData = 2;
					dongyi.synchronousStatistics(isFirstStartData, onlineTime)
				}, false);

				function setStartTime() {
					var startTime = dongyi.getCurrentTime()["7"];
					localStorage.setItem(timeLog, startTime)
				}
			})
		},
		synchronousStatistics: function(isFirstStartData, onlineTime, city) {
			if (!city) {
				city = ""
			}
			var system = gP.os.name;
			var version = gP.os.version;
			var language = gP.os.language;
			var vendor = gP.os.vendor;
			var types = {};
			types[gP.networkinfo.CONNECTION_UNKNOW] = "未知";
			types[gP.networkinfo.CONNECTION_NONE] = "未连接网络";
			types[gP.networkinfo.CONNECTION_ETHERNET] = "有线网络";
			types[gP.networkinfo.CONNECTION_WIFI] = "WiFi网络";
			types[gP.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
			types[gP.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
			types[gP.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
			var network = types[gP.networkinfo.getCurrentType()];
			var model = gP.device.model;
			var imei = gP.device.imei;
			var uuid = gP.device.uuid;
			var imsi = "";
			for (i = 0; i < gP.device.imsi.length; i++) {
				imsi += gP.device.imsi[i]
			}
			var resolution = gP.screen.resolutionWidth * gP.screen.scale + " x " + gP.screen.resolutionHeight * gP.screen.scale;
			var self = gP.webview.currentWebview().getURL();
			if (self) {
				var currentInterface = self.substring(self.lastIndexOf("/") + 1)
			}
			var app_version = gP.runtime.version;
			var client_id = gP.push.getClientInfo().clientid;
			var token_id = gP.push.getClientInfo().token;
			dongyi.get({
				url: "http://api.castapp.cn/count_service",
				data: {
					app_version_data: app_version,
					currentInterface_data: currentInterface,
					system_data: system,
					system_version_data: version,
					language_data: language,
					company_data: vendor,
					network_data: network,
					model_data: model,
					imei_data: imei,
					uuid_data: uuid,
					imsi_data: imsi,
					resolution_data: resolution,
					is_first_start_data: isFirstStartData,
					online_time_data: onlineTime,
					city_data: city,
					client_data: client_id,
					token_data: token_id,
				}
			})
		},
		update: function(state) {
			dongyi.get({
				url: "http://api.castapp.cn/update_service",
				data: {
					platform_data: dongyi.getOs("name"),
					version_data: dongyi.getRuntime("version"),
				},
				succFn: function(data) {
					if (data == 0) {
						if (state != "system") {
							dongyi.prompt("没有发现新版本");
							return
						}
					} else {
						dongyi.confirm({
							title: "更新提示",
							content: "发现新版本，是否更新？",
							callback: function(rvalue) {
								if (rvalue) {
									dongyi.openUrl(JSON.parse(data))
								}
							}
						})
					}
				}
			})
		},
		id: function(id_element) {
			return document.getElementById(id_element)
		},
		className: function(parentElement, classElement) {
			if (classElement == undefined) {
				return document.getElementsByClassName(parentElement)
			}
			return parentElement.getElementsByClassName(classElement)
		},
		tagName: function(parentElement, tagElement) {
			if (tagElement == undefined) {
				return document.getElementsByTagName(parentElement)
			}
			return parentElement.getElementsByTagName(tagElement)
		},
		getScreenInfo: function(element) {
			if (element == "width") {
				return document.documentElement.clientWidth || document.body.clientWidth
			} else {
				return document.documentElement.clientHeight || document.body.clientHeigth
			}
		},
		getCurrentTime: function() {
			var oDate = new Date();
			var aDate = [];
			aDate.push(oDate.getFullYear());
			aDate.push(oDate.getMonth() + 1);
			aDate.push(oDate.getDate());
			aDate.push(oDate.getHours());
			aDate.push(oDate.getMinutes());
			aDate.push(oDate.getSeconds());
			aDate.push(oDate.getDay());
			aDate.push(oDate.getTime());
			return aDate
		},
		click: function(elementData, succfn) {
			elementData.addEventListener("tap", function() {
				succfn(this)
			})
		},
		newInterface: function(jsonData) {
			if (jsonData.styles == undefined) {
				var styles = {};
				styles.top = "0px";
				styles.bottom = "0px";
				styles.width = "100%";
				styles.height = "100%";
				jsonData.styles = styles
			} else {
				if (jsonData.styles.top == undefined) {
					jsonData.styles.top = "0px"
				}
				if (jsonData.styles.bottom == undefined) {
					jsonData.styles.bottom = "0px"
				} else {
					jsonData.styles.height = dongyi.getScreenInfo("height") - parseInt(jsonData.styles.bottom) + "px"
				}
				if (jsonData.styles.width == undefined) {
					jsonData.styles.width = "100%"
				}
				if (jsonData.styles.height == undefined) {
					jsonData.styles.height = "100%"
				}
			}
			if (jsonData.show == undefined) {
				jsonData.show = true
			}
			if (jsonData.showType == undefined) {
				jsonData.showType = "zoom-fade-out"
			}
			if (jsonData.showTime == undefined) {
				jsonData.showTime = 350
			}
			if (jsonData.waiting == undefined) {
				jsonData.waiting = false
			}
			gM.openWindow({
				url: jsonData.url,
				id: jsonData.id,
				styles: {
					top: jsonData.styles.top,
					bottom: jsonData.styles.bottom,
					width: jsonData.styles.width,
					height: jsonData.styles.height,
				},
				show: {
					autoShow: jsonData.show,
					aniShow: jsonData.showType,
					duration: jsonData.showTime
				},
				waiting: {
					autoShow: jsonData.waiting,
				}
			})
		},
		closeCurrentInterface: function() {
			gM.back()
		},
		tabBar: function(arrayData) {
			var subpage_style = {
				top: "0px",
				bottom: "50px",
				scrollIndicator: "none",
			};
			gM.plusReady(function() {
				dongyi.getCurrentInterface(function(self) {
					for (var i = 0; i < arrayData.length; i++) {
						var subpage = arrayData[i];
						var suff = subpage.indexOf(".");
						var objectName = subpage.substring(0, suff);
						var sub = plus.webview.create(arrayData[i], objectName, subpage_style);
						if (i > 0) {
							sub.hide()
						}
						self.append(sub)
					}
				})
			});
			var activeTab = arrayData[0];
			gM(".mui-bar-tab").on("tap", "a", function(e) {
				var targetTab = this.getAttribute("href");
				if (targetTab == activeTab) {
					return
				}
				var suff = targetTab.indexOf(".");
				targetTab = targetTab.substring(0, suff);
				plus.webview.show(targetTab);
				plus.webview.hide(activeTab);
				activeTab = targetTab + ".html"
			});
			document.addEventListener("gohome", function() {
				var defaultTab = document.getElementById("defaultTab");
				mui.trigger(defaultTab, "tap");
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				if (defaultTab !== current) {
					current.classList.remove("mui-active");
					defaultTab.classList.add("mui-active")
				}
			})
		},
		tabBarInit: function(isRoot, interfaceId) {
			if (isRoot == true) {
				var objectId = "root"
			} else {
				var objectId = interfaceId
			}
			dongyi.sendNotice(objectId, "gohome", {})
		},
		refreshLoad: function(element, downFn, upFn) {
			gM.init({
				pullRefresh: {
					container: "#" + element,
					down: {
						contentdown: "下拉可以刷新",
						contentover: "释放立即刷新",
						contentrefresh: "正在刷新...",
						callback: down
					},
					up: {
						contentrefresh: "正在加载...",
						callback: up
					}
				}
			});

			function down() {
				downFn(function() {
					mui("#" + element).pullRefresh().endPulldownToRefresh()
				})
			}

			function up() {
				var _this = this;
				upFn(function(state) {
					_this.endPullupToRefresh(state)
				})
			}
		},
		get: function(jsonData) {
			dongyi.ajax({
				url: jsonData.url,
				data: jsonData.data,
				succFn: jsonData.succFn,
				type: "get"
			})
		},
		post: function(jsonData) {
			dongyi.ajax({
				url: jsonData.url,
				data: jsonData.data,
				succFn: jsonData.succFn,
				type: "post"
			})
		},
		ajax: function(json) {
			var timer = null;
			json = json || {};
			if (!json.url) {
				dongyi.prompt("请求url不存在");
				return
			}
			json.type = json.type || "get";
			json.time = json.time || 10;
			json.data = json.data || {};
			if (window.XMLHttpRequest) {
				var oAjax = new XMLHttpRequest()
			} else {
				var oAjax = new ActiveXObject("Microsoft.XMLHTTP")
			}
			switch (json.type.toLowerCase()) {
				case "get":
					oAjax.open("GET", json.url + "?" + json2url(json.data), true);
					//console.log(json.url + "?" + json2url(json.data));
					oAjax.send();
					break;
				case "post":
					oAjax.open("POST", json.url, true);
					oAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					oAjax.send(json2url(json.data));
					break
			}
			oAjax.onreadystatechange = function() {
				if (oAjax.readyState == 4) {
					if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
						clearTimeout(timer);
						json.succFn && json.succFn(oAjax.responseText)
					} else {
						clearTimeout(timer);
						json.errFn && json.errFn(oAjax.status)
					}
				}
			};
			timer = setTimeout(function() {
				dongyi.prompt("网络超时");
				oAjax.onreadystatechange = null
			}, json.time * 1000);

			function json2url(json) {
				json.t = Math.random();
				json.package_name_data = gPackage;
				var arr = [];
				for (var name in json) {
					arr.push(name + "=" + json[name])
				}
				return arr.join("&")
			}
		},
		getStartInterface: function(callback) {
			gM.plusReady(function() {
				callback && callback(gP.webview.getLaunchWebview())
			})
		},
		getCurrentInterface: function(callback) {
			gM.plusReady(function() {
				callback && callback(gP.webview.currentWebview())
			})
		},
		getTargetInterface: function(targetInterface, callback) {
			gM.plusReady(function() {
				callback && callback(gP.webview.getWebviewById(targetInterface))
			})
		},
		sendNotice: function(targetId, fnName, jsonData) {
			if (targetId.constructor == Array) {
				for (var i = 0; i < targetId.length; i++) {
					if (targetId[i] == "root") {
						dongyi.getStartInterface(function(targetObject) {
							gM.fire(targetObject, fnName, jsonData)
						})
					} else {
						dongyi.getTargetInterface(targetId[i], function(targetObject) {
							gM.fire(targetObject, fnName, jsonData)
						})
					}
				}
			} else {
				if (targetId == "root") {
					dongyi.getStartInterface(function(targetObject) {
						gM.fire(targetObject, fnName, jsonData)
					})
				} else {
					dongyi.getTargetInterface(targetId, function(targetObject) {
						gM.fire(targetObject, fnName, jsonData)
					})
				}
			}
		},
		receiveNotice: function(fnName, fn) {
			document.addEventListener(fnName, function(event) {
				fn(event)
			})
		},
		preLoad: function(arrayData, fn) {
			var array = [];
			gM.plusReady(function() {
				for (var a = 0; a < arrayData.length; a++) {
					var productView = gM.preload({
						url: arrayData[a].url,
						id: arrayData[a].id,
					});
					array.push(productView)
				}
				fn && fn(array)
			})
		},
		alert: function(jsonData) {
			gM.alert(jsonData.content, jsonData.title, function() {
				jsonData.callback && jsonData.callback()
			})
		},
		confirm: function(jsonData) {
			var btnArray = ["是", "否"];
			gM.confirm(jsonData.content, jsonData.title, btnArray, function(e) {
				if (e.index == 0) {
					jsonData.callback && jsonData.callback(true)
				} else {
					jsonData.callback && jsonData.callback(false)
				}
			})
		},
		inputPrompt: function(jsonData) {
			var btnArray = ["确定", "取消"];
			gM.prompt(jsonData.content, "", jsonData.title, btnArray, function(e) {
				if (e.index == 0) {
					jsonData.callback && jsonData.callback(e.value)
				} else {
					jsonData.callback && jsonData.callback(false)
				}
			})
		},
		dateSelect: function(jsonData) {
			var dDate = new Date();
			dDate.setFullYear(jsonData.defaultTime.split("-")["0"], jsonData.defaultTime.split("-")["1"] - 1, jsonData.defaultTime.split("-")["2"]);
			var minDate = new Date();
			minDate.setFullYear(jsonData.minTime.split("-")["0"], jsonData.minTime.split("-")["1"] - 1, jsonData.minTime.split("-")["2"]);
			var maxDate = new Date();
			maxDate.setFullYear(jsonData.maxTime.split("-")["0"], jsonData.maxTime.split("-")["1"] - 1, jsonData.maxTime.split("-")["2"]);
			gM.plusReady(function() {
				plus.nativeUI.pickDate(function(e) {
					var d = e.date;
					if (d.getDate() < 10) {
						var day = "0" + d.getDate()
					} else {
						var day = d.getDate()
					}
					jsonData.callback && jsonData.callback(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + day)
				}, function(e) {
					jsonData.callback && jsonData.callback(false)
				}, {
					title: "请选择日期",
					date: dDate,
					minDate: minDate,
					maxDate: maxDate
				})
			})
		},
		timeSelect: function(jsonData) {
			var dTime = new Date();
			dTime.setHours(jsonData.defaultTime.split(":")["0"], jsonData.defaultTime.split(":")["1"]);
			gM.plusReady(function() {
				plus.nativeUI.pickTime(function(e) {
					var d = e.date;
					if (d.getHours() < 10) {
						var h = "0" + d.getHours()
					} else {
						var h = d.getHours()
					}
					if (d.getMinutes() < 10) {
						var m = "0" + d.getMinutes()
					} else {
						var m = d.getMinutes()
					}
					jsonData.callback && jsonData.callback(h + ":" + m)
				}, function(e) {
					jsonData.callback && jsonData.callback(false)
				}, {
					title: "请选择时间",
					is24Hour: true,
					time: dTime
				})
			})
		},
		prompt: function(m) {
			mui.toast(m)
		},
		actionSheet: function(arrayData, jsonData) {
			if (arrayData[0].title == undefined) {
				var transferArr = [];
				for (var a = 0; a < arrayData.length; a++) {
					var json = {
						title: arrayData[a]
					};
					transferArr.push(json)
				}
				arrayData = transferArr
			}
			gM.plusReady(function() {
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: arrayData
				}, function(e) {
					var index = e.index;
					if (index == 0) {
						return
					}
					index--;
					if (arrayData[index].title == "照相机") {
						dongyi.camera({
							succFn: function(path, name) {
								if (jsonData && jsonData.isUpload) {
									dongyi.uploadFiles(jsonData.uploadUrl, path, function(imgPath) {
										jsonData.succFn(imgPath)
									}, function(error) {
										jsonData.errFn && jsonData.errFn(error)
									})
								} else {
									jsonData.succFn(path, name)
								}
							}
						})
					} else {
						if (arrayData[index].title == "相册") {
							dongyi.album({
								succFn: function(path) {
									if (jsonData && jsonData.isUpload) {
										dongyi.uploadFiles(jsonData.uploadUrl, path, function(imgPath) {
											jsonData.succFn(imgPath)
										}, function(error) {
											jsonData.errFn && jsonData.errFn(error)
										})
									} else {
										jsonData.succFn(path)
									}
								}
							})
						} else {
							jsonData.succFn(index)
						}
					}
				})
			})
		},
		gesture: function(element, event, fn) {
			gM.init({
				gestureConfig: {
					tap: true,
					doubletap: true,
					longtap: true,
					swipe: true,
					drag: true,
					hold: true,
					release: true
				}
			});
			element.addEventListener(event, function() {
				fn()
			})
		},
		showMask: function(callback) {
			var mask = gM.createMask(callback);
			mask.show()
		},
		pictureScroll: function(jsonData) {
			var gallery = gM(".mui-slider");
			if (jsonData.isAutoScroll) {
				gallery.slider({
					interval: jsonData.scrollTime * 1000
				})
			}
			document.querySelector(".mui-slider").addEventListener("slide", function(event) {
				jsonData.callback && jsonData.callback(event.detail.slideNumber + 1)
			})
		},
		createChildInterface: function(jsonData) {
			var styles = {};
			if (jsonData.styles == undefined) {
				styles.top = "0px";
				styles.bottom = "0px";
				styles.width = "100%";
				styles.height = "100%";
				jsonData.styles = styles
			} else {
				if (jsonData.styles.top == undefined) {
					jsonData.styles.top = "0px"
				}
				if (jsonData.styles.bottom == undefined) {
					jsonData.styles.bottom = "0px"
				} else {
					jsonData.styles.height = dongyi.getScreenInfo("height") - parseInt(jsonData.styles.bottom) - parseInt(jsonData.styles.top) + "px"
				}
				if (jsonData.styles.width == undefined) {
					jsonData.styles.width = "100%"
				}
				if (jsonData.styles.height == undefined) {
					jsonData.styles.height = "100%"
				}
			}
			gM.init({
				subpages: [{
					url: jsonData.url,
					id: jsonData.id,
					styles: {
						top: jsonData.styles.top,
						bottom: jsonData.styles.bottom,
						width: jsonData.styles.width,
						height: jsonData.styles.height,
					},
				}]
			})
		},
		showWaiting: function(watingPrompt) {
			gP.nativeUI.showWaiting(watingPrompt)
		},
		closeWaiting: function() {
			gP.nativeUI.closeWaiting()
		},
		camera: function(jsonData) {
			gM.plusReady(function() {
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name;
						var img_path = entry.toLocalURL();
						jsonData.succFn && jsonData.succFn(img_path, img_name)
					}, function(e) {
						jsonData.errFn && jsonData.errFn(e.message)
					})
				}, function(e) {
					jsonData.errFn && jsonData.errFn(e.message)
				}, {
					filename: "_doc/camera/",
					index: 1
				})
			})
		},
		album: function(jsonData) {
			gM.plusReady(function() {
				plus.gallery.pick(function(path) {
					jsonData.succFn && jsonData.succFn(path)
				}, function(e) {
					jsonData.errFn && jsonData.errFn(e.message)
				}, {
					filter: "image"
				})
			})
		},
		beep: function() {
			gM.plusReady(function() {
				switch (plus.os.name) {
					case "iOS":
						if (plus.device.model.indexOf("iPhone") >= 0) {
							plus.device.beep()
						} else {
							dongyi.prompt("此设备不支持蜂鸣")
						}
						break;
					default:
						plus.device.beep();
						break
				}
			})
		},
		vibrate: function() {
			gM.plusReady(function() {
				switch (plus.os.name) {
					case "iOS":
						if (plus.device.model.indexOf("iPhone") >= 0) {
							plus.device.vibrate()
						} else {
							dongyi.prompt("此设备不支持震动")
						}
						break;
					default:
						plus.device.vibrate();
						break
				}
			})
		},
		getDeviceInfo: function(callback) {
			gM.plusReady(function() {
				var json = {};
				json.model = gP.device.model;
				json.vendor = gP.device.vendor;
				json.imei = gP.device.imei;
				json.uuid = gP.device.uuid;
				var str = "";
				for (i = 0; i < gP.device.imsi.length; i++) {
					str += gP.device.imsi[i]
				}
				json.imsi = str;
				json.resolution = gP.screen.resolutionWidth * gP.screen.scale + " x " + gP.screen.resolutionHeight * gP.screen.scale;
				json.pixel = gP.screen.dpiX + " x " + gP.screen.dpiY;
				callback(json)
			})
		},
		getMachineInfo: function(callback) {
			gM.plusReady(function() {
				var json = {};
				json.name = gP.os.name;
				json.version = gP.os.version;
				json.language = gP.os.language;
				json.vendor = gP.os.vendor;
				var types = {};
				types[gP.networkinfo.CONNECTION_UNKNOW] = "未知";
				types[gP.networkinfo.CONNECTION_NONE] = "未连接网络";
				types[gP.networkinfo.CONNECTION_ETHERNET] = "有线网络";
				types[gP.networkinfo.CONNECTION_WIFI] = "WiFi网络";
				types[gP.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
				types[gP.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
				types[gP.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
				json.network = types[gP.networkinfo.getCurrentType()];
				callback(json)
			})
		},
		sendSms: function(sendPhone, sendContent) {
			var msg = gP.messaging.createMessage(plus.messaging.TYPE_SMS);
			msg.to = sendPhone;
			msg.body = sendContent;
			gP.messaging.sendMessage(msg)
		},
		callPhone: function(targetPhone) {
			gP.device.dial(targetPhone, false)
		},
		sendEmail: function(targetEmail) {
			location.href = "mailto:" + targetEmail
		},
		uploadFiles: function(uploadUrl, filePath, succFn, errFn) {
			var files = [];
			var n = filePath.substr(filePath.lastIndexOf("/") + 1);
			files.push({
				name: "uploadkey",
				path: filePath
			});
			if (files.length <= 0) {
				this.prompt("没有添加上传文件");
				return
			}
			dongyi.showWaiting("上传中...");
			var task = gP.uploader.createUpload(uploadUrl, {
				method: "POST"
			}, function(t, status) {
				if (status == 200) {
					var responseText = t.responseText;
					var json = eval("(" + responseText + ")");
					var files = json.files;
					var img_url = files.uploadkey.url;
					succFn(img_url);
					dongyi.closeWaiting()
				} else {
					errFn && errFn(status);
					dongyi.closeWaiting()
				}
			});
			task.addData("client", "");
			task.addData("uid", Math.floor(Math.random() * 100000000 + 10000000).toString());
			for (var i = 0; i < files.length; i++) {
				var f = files[i];
				task.addFile(f.path, {
					key: f.name
				})
			}
			task.start()
		},
		getCurrentPosition: function(jsonData) {
			gM.plusReady(function() {
				gP.geolocation.getCurrentPosition(function(position) {
					var timeflag = position.timestamp;
					var codns = position.coords;
					var lat = codns.latitude;
					var longt = codns.longitude;
					var alt = codns.altitude;
					var accu = codns.accuracy;
					var altAcc = codns.altitudeAccuracy;
					var head = codns.heading;
					var sped = codns.speed;
					var baidu_map = "http://api.map.baidu.com/geocoder/v2/?output=json&ak=BFd9490df8a776482552006c538d6b27&location=" + lat + "," + longt;
					dongyi.ajax({
						url: baidu_map,
						data: {},
						succFn: function(data) {
							jsonData.succFn && jsonData.succFn(data)
						}
					})
				}, function(e) {
					jsonData.errFn && jsonData.errFn(e.message)
				})
			})
		},
		openUrl: function(targetUrl) {
			dongyi.getRuntime().openURL(targetUrl)
		},
		closeStartPage: function() {
			gM.plusReady(function() {
				plus.navigator.closeSplashscreen()
			})
		},
		setStartpage: function(jsonData) {
			gM.init({
				swipeBack: true,
				scrollIndicator: "none"
			});
			var vH = dongyi.getScreenInfo("height");
			var slider = document.getElementById("slider");
			slider.style.height = vH + "px";
			var img = slider.getElementsByTagName("img");
			for (var a = 0; a < img.length; a++) {
				img[a].style.height = vH + "px"
			}
			var appWelcome = localStorage.getItem("appWelcome");
			if (appWelcome) {
				gM.plusReady(function() {
					var terger_path = plus.webview.create(jsonData.url, jsonData.id, "");
					terger_path.show();
					setTimeout(function() {
						dongyi.closeStartPage()
					}, 500)
				})
			} else {
				gM.plusReady(function() {
					dongyi.closeStartPage();
					dongyi.preLoad([{
						url: jsonData.url,
						id: jsonData.id
					}], function(data) {
						var productView = data["0"];
						if (productView) {
							clickEvent(productView)
						}
					})
				});

				function clickEvent(productView) {
					var dy_enter = dongyi.id("dy_enter");
					dy_enter.onclick = function() {
						localStorage.setItem("appWelcome", true);
						productView.show("pop-in", 300)
					}
				}
			}
			dongyi.dblclickExit()
		},
		dblclickExit: function() {
			var first = null;
			gM.back = function() {
				if (!first) {
					first = new Date().getTime();
					dongyi.prompt("再按一次退出应用");
					setTimeout(function() {
						dongyi.dblclickExit()
					}, 1000)
				} else {
					if (new Date().getTime() - first < 1000) {
						gP.runtime.quit()
					}
				}
			}
		},
		hiddenScroll: function() {
			gM.plusReady(function() {
				var self = plus.webview.currentWebview();
				self.setStyle({
					scrollIndicator: "none"
				})
			})
		},
		stopBounce: function() {
			var self = gP.webview.currentWebview();
			self.setStyle({
				setBounce: "none"
			})
		},
		getIdCode: function(length) {
			if (length == undefined) {
				length = 4
			}
			var pow = Math.pow(10, length);
			var code = Math.floor(Math.random() * pow + pow / 10).toString();
			return code.substr(0, length)
		},
		pay: function(json) {
			gM.ready(function() {
				var pays = {};
				plus.payment.getChannels(function(channels) {
					for (var i in channels) {
						var channel = channels[i];
						pays[channel.id] = channel
					}
				}, function(e) {
					dongyi.prompt("获取支付通道失败：" + e.message)
				});
				var url = "";
				if (json.url == undefined || json.url == "") {
					url = "http://api.castapp.cn/alipay.php?name=" + json.name + "&package_name_data=" + gPackage + "&dyappid=" + json.appid + "&dyappkey=" + json.appkey + "&payid="
				} else {
					url = json.url + "?payid="
				}
				if (json.type == "alipay" || json.type == "wxpay") {
					if (json.type == "wxpay") {
						url += "wxpay"
					} else {
						url += json.type
					}
				} else {
					dongyi.prompt("不支持此支付通道！");
					return
				}
				url += "&appid=dongyijs&total=";
				dongyi.showWaiting();
				var amount = json.money;
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					switch (xhr.readyState) {
						case 4:
							if (xhr.status == 200) {
								dongyi.closeWaiting();
								var order = xhr.responseText;
								if (json.url == undefined || json.url == "") {
									if (order == "-1") {
										dongyi.prompt("连接服务器错误");
										return
									} else {
										if (order == "-2") {
											dongyi.prompt("应用配置信息错误");
											return
										}
									}
								}
								plus.payment.request(pays[json.type], order, function(result) {
									json.succFn && json.succFn()
								}, function(e) {
									json.errFn && json.errFn(e.code + e.message)
								})
							} else {
								json.errFn && json.errFn(xhr.status)
							}
							break;
						default:
							break
					}
				};
			//	console.log(url + amount);
				xhr.open("GET", url + amount);
				xhr.send()
			})
		},
		share: function(jsonData) {
			gM.ready(function() {
				var shares = null,
					bhref = false;
				var Intent = null,
					File = null,
					Uri = null,
					main = null;
				updateSerivces();
				if (plus.os.name == "Android") {
					Intent = plus.android.importClass("android.content.Intent");
					File = plus.android.importClass("java.io.File");
					Uri = plus.android.importClass("android.net.Uri");
					main = plus.android.runtimeMainActivity()
				}

				function updateSerivces() {
					plus.share.getServices(function(s) {
						shares = {};
						for (var i in s) {
							var t = s[i];
							shares[t.id] = t
						}
					}, function(e) {
						dongyi.closeWaiting();
						dongyi.prompt("获取分享服务列表失败：" + e.message)
					})
				}

				function shareAction(id, ex) {
					var s = null;
					if (!id || !(s = shares[id])) {
						dongyi.prompt("无效的分享服务！");
						return
					}
					if (s.authenticated) {
						//console.log("---已授权---");
						shareMessage(s, ex)
					} else {
						//console.log("---未授权---");
						s.authorize(function() {
							shareMessage(s, ex)
						}, function(e) {
							dongyi.prompt("认证授权失败：" + e.code + " - " + e.message)
						})
					}
				}

				function shareMessage(s, ex) {
					var msg = {
						content: jsonData.shareContent,
						extra: {
							scene: ex
						}
					};
					var pic = jsonData.shareImg;
					if (jsonData.shareLink) {
						msg.href = jsonData.shareLink;
						if (jsonData.shareTitle) {
							msg.title = jsonData.shareTitle
						}
						if (jsonData.shareContent) {
							msg.content = jsonData.shareContent
						}
						if (jsonData.shareImg) {
							msg.thumbs = [jsonData.shareImg];
							msg.pictures = msg.thumbs = [jsonData.shareImg]
						}
					} else {
						if (jsonData.shareImg) {
							msg.pictures = msg.thumbs = [jsonData.shareImg]
						}
					}
					s.send(msg, function() {
						dongyi.closeWaiting();
						dongyi.prompt("分享成功")
					}, function(e) {
						dongyi.closeWaiting();
						dongyi.prompt("分享取消")
					})
				}
				var ids = [{
						id: "weixin",
						ex: "WXSceneSession"
					}, {
						id: "weixin",
						ex: "WXSceneTimeline"
					}, {
						id: "sinaweibo"
					}],
					bts = [{
						title: "发送给微信好友"
					}, {
						title: "分享到微信朋友圈"
					}, {
						title: "分享到新浪微博"
					}];
				if (plus.os.name == "iOS") {
					ids.push({
						id: "qq"
					});
					bts.push({
						title: "分享到QQ"
					})
				}
				plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: bts
				}, function(e) {
					var i = e.index;
					if (i > 0) {
						shareAction(ids[i - 1].id, ids[i - 1].ex)
					}
					dongyi.showWaiting()
				})
			})
		},
		sendIdCode: function(jsonData) {
			dongyi.showWaiting();
			setTimeout(function() {
				dongyi.closeWaiting()
			}, 10000);
			if (jsonData.package_name == undefined) {
				jsonData.package_name = dongyi.getRuntime("appid")
			}
			dongyi.get({
				url: "http://api.castapp.cn/sms_service/index.php",
				data: {
					code: jsonData.code,
					target_phone: jsonData.target_phone,
					appid: jsonData.appid,
					appkey: jsonData.appkey,
					sms_templates: jsonData.sms_templates,
					package_name: jsonData.package_name,
				},
				succFn: function(data) {
					dongyi.closeWaiting();
					if (data == -2) {
						dongyi.prompt("应用配置信息不正确");
						return
					} else {
						if (data == -1) {
							dongyi.prompt("账户余额不足");
							return
						} else {
							if (data == -3) {
								dongyi.prompt("发送失败");
								return
							} else {
								if (data == 500) {
									dongyi.prompt("服务器端错误");
									return
								} else {
									if (data == 1) {
										jsonData.callback && jsonData.callback(true)
									}
								}
							}
						}
					}
					if (data != 1) {
						jsonData.callback && jsonData.callback(false)
					}
				}
			})
		},
		getAddressBook: function(type, callback) {
			gM.plusReady(function() {
				var listLength = 0;
				if (type == "phone") {
					var getType = "plus.contacts.ADDRESSBOOK_PHONE"
				} else {
					var getType = "plus.contacts.ADDRESSBOOK_SIM"
				}
				gP.contacts.getAddressBook(getType, function(addressbook) {
					addressbook.find(null, function(contacts) {
						dongyi.showWaiting();
						if (contacts.length < 1) {
							dongyi.prompt("没有发现通讯录内容");
							dongyi.closeWaiting()
						} else {
							listLength = contacts.length;
							listFilter(contacts)
						}
					}, function(e) {}, {
						multi: true
					})
				});

				function listFilter(arr) {
					var backArr = [];
					for (var i = 0; i < arr.length; i++) {
						if (gM.os.ios) {
							var data = arr[i];
							var json = JSON.stringify(data);
							var datas = eval("(" + json + ")");
							var ios_name = datas.name;
							if (ios_name.familyName != null) {
								if (ios_name.givenName != null) {
									var name = ios_name.familyName + ios_name.givenName
								} else {
									var name = ios_name.familyName
								}
							} else {
								if (ios_name.givenName != null) {
									var name = ios_name.givenName
								} else {
									var name = "#"
								}
							}
							var ios_phone = datas.phoneNumbers;
							var phone = "";
							var telephone = "";
							for (var a in ios_phone) {
								var data = ios_phone[a];
								if (data.type == "home") {
									telephone = ios_phone[a].value
								}
								if (data.type == "mobile") {
									phone = ios_phone[a].value
								}
								if (phone == "") {
									if (data.type == "other") {
										phone = ios_phone[a].value
									}
								}
							}
							var ios_emails = datas.emails;
							var email = "";
							for (var b in ios_emails) {
								email = ios_emails[b].value
							}
							var company = ""
						} else {
							if (arr[i].displayName) {
								var name = arr[i].displayName
							}
							if (arr[i].phoneNumbers[0]) {
								var phone = arr[i].phoneNumbers[0].value
							}
						}
						if (/^[\u4e00-\u9fa5]+$/.test(name)) {
							var first = dongyi.getFirstLetter(name)
						} else {
							if (name) {
								var s = name.substring(0, 1);
								if (/^[A-Za-z]+$/.test(s)) {
									var first = s.toUpperCase()
								} else {
									if (!/^[0-9]+$/.test(s)) {
										var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
										if (!containSpecial.test(s)) {
											name = escape(name)
										}
									}
									var first = "#"
								}
							} else {
								var first = "#"
							}
						}
						if (phone.length != "11") {
							var s = phone.substring(0, 5);
							if (s == "17951" || s == "12593") {
								phone = phone.substring(5, 16)
							}
						}
						phone = phone.replace("+86", "");
						phone = phone.replace("/ /g", "");
						phone = phone.replace(/-/g, "");
						var str = '{"name":"' + name + '","phone":"' + phone + '","firstLetter":"' + first.toUpperCase() + '"}';
						backArr.push(str);
						dongyi.closeWaiting()
					}
					callback(backArr, listLength)
				}
			})
		},
		getRuntime: function(path) {
			if (path) {
				return gRuntime[path]
			} else {
				return gRuntime
			}
		},
		getOs: function(path) {
			if (path) {
				return gOs[path]
			} else {
				return gOs
			}
		},
		getFirstLetter: function(data) {
			var val = data.substr(0, 1);
			var name = arraySearch(val);
			if (name) {
				var first = name.substr(0, 1)
			} else {
				var first = "#"
			}
			return first.toUpperCase();

			function arraySearch(l1) {
				for (var name in PinYin) {
					if (PinYin[name].indexOf(l1) != -1) {
						return name;
						break
					}
				}
				return false
			}
		},
		combinationSelect: function(selectNumber, data, callback) {
			if (!selectNumber) {
				selectNumber = 1
			}
			var selector = new gM.PopPicker({
				layer: selectNumber
			});
			if (!selectNumber || selectNumber == 1) {
				var transferArr = [];
				for (var a = 0; a < data.length; a++) {
					var datajson = {
						text: data[a]
					};
					transferArr.push(datajson)
				}
				data = transferArr
			}
			selector.setData(data);
			selector.show(function(items) {
				var backArr = [];
				if (selectNumber == 1) {
					backArr = [items[0].text]
				} else {
					if (selectNumber == 2) {
						backArr = [items[0].text, items[1].text]
					} else {
						if (selectNumber == 3) {
							backArr = [(items[0] || {}).text, (items[1] || {}).text, (items[2] || {}).text]
						}
					}
				}
				callback && callback(backArr)
			})
		},
		db: function(table_name, mode, data, callback) {
			var newJson = {};
			for (var a in data) {
				newJson[a] = data[a]
			}
			newJson.db_table_name = table_name;
			newJson.db_table_mode = mode;
			dongyi.get({
				url: "http://api.castapp.cn/db",
				data: newJson,
				succFn: function(cb_data) {
					if (mode == "select" && cb_data != "error") {
						cb_data = JSON.parse(cb_data)
					}
					callback && callback(cb_data)
				}
			})
		},
	}
})();