(function(a) {
	a.SKEET = {

		//获取浏览器参数
		getUrlParam: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			return r ? decodeURI(r[2]) : null;
		},
		//判断对象是否为空
		isEmptyObject: function(obj) {
			for(var _obj in obj) {
				return false;
			}
			return true;
		},
		//根据屏幕大小设定图片大小
		imgResize: function(fn) {
			var _that = this;
			var isLoad = true;
			$(".resizeImg").each(function() {
				var width = $(this).width();
				if(width === 0) {
					isLoad = false;
					return false;
				};
				var dataWidth = $(this).data("width");
				if(dataWidth) {
					width = dataWidth;
				}
				//图片加载完成 更改图片大小
				var _width = Math.ceil(width * _that.getScale());
				$(this).css("width", _width + "px");
				$(this).removeClass("resizeImg");
			});
			if(isLoad) {
				clearTimeout(TIMG);
				if(typeof(fn) === "function") {
					fn();
				}
				return;
			}
			TIMG = setTimeout(function() {
				_that.imgResize(fn);
			}, 500);
		},
		checkMobile: function(v) {
			var myreg = /^1[3,5,7,8]\d{9}$/;
			if(!myreg.test(v)) {
				return false;
			}
			return true;
		},
		msg: function(str, time, callback) {
			var cssName = "layerBox";
			if(arguments.length > 3) {
				cssName = arguments[3];
			}
			layer.msg(str, {
				skin: cssName,
				shade: 0.3,
				scrollbar: false,
				time: time ? time : 2000
			}, callback ? callback : null);
		},
		confirm: function(str, callback, btn, bt0, title, back, isClose) {
			layer.open({
				content: str,
				title: title ? title : false,
				skin: "layerConfirm", //title ? "layerConfirmTitle" : "layerConfirm",
				//closeBtn: isClose ? isClose : false,
				btn: [bt0 ? bt0 : "取消", btn],
				btn2: callback,
				btn1: back ? back : null				
			});
		},
		loading: function(str) {
			var loading = layer.open({
				content: str,
				title: false,
				skin: "layerLoading",
				closeBtn: false,
				btn: false
			});
			return loading;
		},
		extend: function(objs, opts) {
			for(var o in opts) {
				objs[o] = opts[o];
			}
			return objs;
		},
		mixin: function(objs, opts) {
			for(var key in objs) {
				if(!(key) in opts) {
					opts[key] = objs[key];
				}
			}
			return opts;
		},
		setTitle: function(title) {
			if(title && title.length > 0) {
				if($(".header").length > 0) {
					$(".header h1").html(title);
				} else if($(".fixHeader").length > 0) {
					$(".fixHeader h1").html(title);
				}
			}
		},
	};

})(window);