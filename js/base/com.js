//2018.8.23
var icom = importCom();
function importCom() {
	var com = {};

	var ishttps = 'https:' == document.location.protocol ? true : false;
	var article = $('article');
	//初始化
	com.init = function (callback) {
		
		IOSInput();

		
    
		if (ibase.dir == 'portrait') {
			lock_dected();
		}//edn if
		else {
			html_resize();
			$(window).on('resize', window_orientation);
			lock_dected();
		} //end else

		function lock_dected() {
			if (ibase.lock) requestAnimationFrame(lock_dected);
			else if (callback) callback();
		} //edn func

		function window_orientation(e) {
			if (os.ios) for (var i = 0; i < 3; i++) setTimeout(html_resize, i * 150);
			else html_resize();
		} //edn func

		function html_resize() {
			var dir=ibase.getOrient(true);
			console.log('html resize direction:'+dir);
			if(dir == 'portrait') {
				article.css({
					width: window.innerHeight,
					height: window.innerWidth,
					rotate: 90,
					left: window.innerWidth
				});
			} //end if
			else{
				article.css({
					width: window.innerWidth,
					height: window.innerHeight,
					rotate: 0,
					left: 0
				});
			}//end if
		} //edn func

		setTimeout(function(){
			resetFontSize();
		},10)



	} //edn func

	//解锁屏幕滑动
	com.screenScrollEnable = function () {
		var article = $('article');
		var html = $('html');
		if (ibase.dir == 'portrait') {
			article.css({ 'overflow-y': 'auto' });
			if (os.ios) html.css({ 'position': 'relative' });
			if (os.iphoneXFull) article.css({ height: '100%' });
			$(document).off('touchmove', noScroll);
		}//edn if
		else {
			article.off('touchmove', noScroll);
		}//edn else
	} //end func

	//解决安卓键盘问题
	com.androidKeyboard = function (option) {
		option = option || {}
		option.scrollbox = option.scrollbox || 'html,body'
		option.scrollbox = $(option.scrollbox)
		option.type = option.type || 'scroll'
		option.space = option.space || 50
		if (os.android) {
			var h = $(window).height()
			var sto = {
				scroll: function (y) {
					option.scrollbox.scrollTop(y)
				},
				transform: function (y) {
					$(option.scrollbox).css({
						transform: 'translate(0, ' + -y + 'px)'
					})
				}
			}
			var sy = {}
			$('input', option.scrollbox)
				.off('focus.androidKeyboard')
				.on('focus.androidKeyboard', function () {
					var that = this
					setTimeout(function () {
						var hh = $(window).height()
						sy.scroll = $(option.scrollbox).scrollTop()
						sy.transform =
							-parseInt(
								$(option.scrollbox)
									.css('transform')
									.split(',')[5]
							) || 0
						//键盘弹出后判断当前input是否在小屏幕区域中，在就不作处理，不在就scroll
						if ($(that).offset().top + that.clientHeight > hh) {
							var s =
								$(that).offset().top +
								sy[option.type] -
								hh +
								that.clientHeight +
								option.space
							sto[option.type](s)
						}
					}, 500)
				})
			$(window)
				.off('resize.androidKeyboard')
				.on('resize.androidKeyboard', function () {
					var hh = $(window).height()
					if (hh == h) {
						$('input').blur();
						sto[option.type](sy[option.type])
					}
				})
		}
	}

	//解决ios键盘问题
	com.IOSKeyboard = function(){
		if(os.ios){
			var itimer;
			document.body.addEventListener('focusin', function(){
				setTimeout(function(){
					clearTimeout(itimer);
				},200); 
			})
			document.body.addEventListener('focusout', function(){
				itimer = setTimeout(function(){
					$("body").scrollTop(0);
				},300);
			})
		}
	}

	//锁定屏幕滑动
	com.screenScrollUnable = function () {
		var article = $('article');
		var html = $('html');
		if (ibase.dir == 'portrait') {
			article.css({ 'overflow-y': 'hidden' });
			if (os.ios) html.css({ 'position': 'fixed' });
			if (os.iphoneXFull) article.css({ height: 'calc( 100% - 0.7rem )' });
			$(document).on('touchmove', noScroll);
		}//edn if
		else {
			article.on('touchmove', noScroll);
		}//edn else
	} //end func

	function noScroll(e) {
		e.preventDefault();
	} //end func

	//取代jquery的fadeIn
	com.fadeIn = function (obj, dur, callback) {
		if (obj) {
			dur = dur || 500;
			obj.show().css({
				opacity: 0
			}).transition({
				opacity: 1
			}, dur, function () {
				if (callback) callback($(this));
			});
		} //end if
	} //end func

	//取代jquery的fadeOut
	com.fadeOut = function (obj, dur, callback) {
		if (obj) {
			dur = dur || 500;
			obj.transition({
				opacity: 0
			}, dur, function () {
				$(this).hide().css({
					opacity: 1
				});
				if (callback) callback($(this));
			});
		} //end if
	} //end func

	//打开弹窗，会自动寻找a.close对象绑定关闭事件，并在关闭时执行回调
	com.popOn = function (obj, options) {
		if (obj && obj.length > 0) {
			var defaults = {
				closeEvent: 'touchend',
				closeType: 'button',
				fade: 500,
				closeBtn: obj.find('a.close'),
				remove: false
			};
			var opts = $.extend(defaults, options);
			if (opts.text) obj.find('.text').html(opts.text);
			if (opts.fade) com.fadeIn(obj, opts.fade);
			else obj.show();
			if (opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.one(opts.closeEvent, obj_close);
			else obj.one(opts.closeEvent, obj_close);
			obj.on('close', obj_close);
		} //end if
		function obj_close(e) {
			if (opts.closeBtn.length > 0 && opts.closeType == 'button') opts.closeBtn.off(opts.closeEvent, obj_close);
			else obj.off(opts.closeEvent, obj_close);
			if (opts.fade) com.fadeOut(obj, opts.fade, function () {
				if (opts.remove) obj.remove();
			});
			else if (opts.remove) obj.remove();
			else obj.hide();
			obj.off('close', obj_close);
			if (opts.onClose) opts.onClose(obj);
		} //end func
	} //end func

	//关闭使用popOn方法打开的弹窗
	com.popOff = function (obj) {
		if (obj && obj.length > 0) obj.trigger('close');
	} //end func

	//取代系统alert
	com.alert = function (text, callback) {
		if (text && text != '') {
			var box = $('<aside class="alertBox"><div><p class="text"></p><p class="btn"><a href="javascript:;" class="close">确定</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
			com.popOn(box, {
				text: text,
				onClose: callback,
				remove: true,
				closeEvent: 'click'
			});
		} //end if
	} //end func

	//带有“取消”和“确认”按钮的对话框
	com.confirm = function (text, callbackConfirm, callbackCancel, btnCancelText, btnConfirmText) {
		text = text || '';
		btnCancelText = btnCancelText || '取消';
		btnConfirmText = btnConfirmText || '确认';
		if (text != '') {
			var box = $('<aside class="confirmBox"><div><p class="text">' + text + '</p><p class="btn"><a href="javascript:;" class="cancel">' + btnCancelText + '</a><a href="javascript:;" class="confirm">' + btnConfirmText + '</a></p></div></aside>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
			var btn = box.find('a');
			btn.one('click', function (e) {
				if ($(this).index() == 0 && callbackCancel) callbackCancel();
				else if ($(this).index() == 1 && callbackConfirm) callbackConfirm();
				btn.off();
				box.remove();
			})
		} //end if
	} //end func

	//获得http url参数
	com.getQueryString = function (name) {
		if (name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		} //end if
		else return null;
	} //end func

	//载入图片函数
	com.imageLoad = function (src, callback) {
		if (src && src != '') {
			var loader = new PxLoader();
			if ($.type(src) === "string" && src != '') loader.addImage(src);
			else if ($.type(src) === "array" && src.length > 0) {
				for (var i = 0; i < src.length; i++) {
					loader.addImage(src[i]);
				} //end for
			} //end else
			loader.addCompletionListener(function () {
				console.log('images load complete');
				loader = null;
				if (callback) callback(src);
			});
			loader.start();
		} //end if
	} //end func	

	//常用正则
	com.checkStr = function (str, type) {
		if (str && str != '') {
			type = type || 0;
			switch (type) {
				case 0:
					var reg = new RegExp(/^1(3[0-9]|4[5,7]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/); //手机号码验证
					break;
				case 1:
					var reg = new RegExp(/^[1-9]\d{5}$/); //邮政编码验证
					break;
				case 2:
					var reg = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/); //匹配EMAIL
					break;
				case 3:
					var reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/); //匹配身份证
					break;
				case 4:
					var reg = new RegExp(/^\d+$/); //是否为0-9的数字
					break;
				case 5:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]*[\w\u0391-\uFFE5]*$/); //不能以数字或符号开头
					break;
				case 6:
					var reg = new RegExp(/^\w+$/); //匹配由数字、26个英文字母或者下划线组成的字符串
					break;
				case 7:
					var reg = new RegExp(/^[\u0391-\uFFE5]+$/); //匹配中文
					break;
				case 8:
					var reg = new RegExp(/^[a-zA-Z\u0391-\uFFE5]+$/); //不能包含数字和符号
					break;
				case 9:
					var reg = new RegExp(/^\d{6}$/); //6位验证码验证
					break;
				case 10:
					var reg = new RegExp(/^\d{4}$/); //4位验证码验证
					break;
			} //end switch
			if (reg.exec($.trim(str))) return true;
			else return false;
		} //end if
		else return false;
	} //end func

	//解决ios下input、textarea无法自动失去焦点的问题
	com.keyboard = function (input) {
		input = input || $('input,textarea,[contenteditable="true"]');
		if (input.length > 0) {
			var body = $('body');
			if (os.ios) input.on('focus', ios_focus);
			else body.height(body[0].clientHeight);
		} //end if

		function ios_focus(e) {
			body.one('touchend', ios_blur);
		} //edn func

		function ios_blur(e) {
			if (e.target != input[0]) input.blur();
		} //edn func

	} //end func

	//解决ios下select无法自动失去焦点的问题
	com.select = function (select) {
		select = select || $('select');
		if (select.length > 0) {
			if (os.ios) {
				select.on('focus', function (e) {
					$(document).one('touchend', ios_select);
				});
			} //end if
		} //end if

		function ios_select(e) {
			if (e.target != select[0]) select.blur();
		} //edn func

	} //end func

	//物体抖动
	com.shake = function (box, options) {
		if (box && box.length > 0) {
			var defaults = {
				rx: 5,
				ry: 5,
				delay: 33,
				now: 0,
				max: 5,
				restore: true
			};
			var opts = $.extend(defaults, options);
			var x = imath.randomRange(-opts.rx, opts.rx);
			var y = imath.randomRange(-opts.ry, opts.ry);
			box.css({
				x: x,
				y: y
			});
			opts.now++;
			if (opts.now > opts.max) {
				if (opts.restore) box.css({
					x: 0,
					y: 0
				});
				if (opts.onComplete) opts.onComplete();
			} //end if
			else setTimeout(com.shake, opts.delay, box, opts);
		} //end if
	} //end func

	//获取textarea里的回车和空格
	com.textareaGet = function (textarea, row) {
		row = row || 0;
		var str1 = textarea.val();
		if (str1 == '') return '';
		else {
			var str2 = str1.replaceAll("\n", "<br/>");
			return row_cut(str2, row);
		} //end else
	} //edn func

	//输入textarea里的回车和空格
	com.textareaSet = function (textarea, str) {
		if (str == '') textarea.val('');
		else textarea.val(str.replaceAll("<br/>", "\n"));
	} //edn func

	//限制textarea输入文字的行数
	com.textareaLock = function (textarea) {
		if (textarea && textarea.length > 0) {
			var timer;
			var row = parseInt(textarea.attr('rows')) || 0;
			var col = parseInt(textarea.attr('cols')) || 0;
			var max = parseInt(textarea.attr('maxlength')) || 0;
			max = max == 0 ? row * col : max;
			if (row > 0 && col > 0 && max > 0) textarea.on('focus', textarea_focus).on('blur', textarea_blur);
		} //end if

		function textarea_focus(e) {
			timer = requestAnimationFrame(textarea_lock);
		} //edn func

		function textarea_blur(e) {
			cancelAnimationFrame(timer);
			var first = com.textareaGet(textarea, row);
			if (first.indexOf('<br/>') != -1) {
				var str2 = first.split('<br/>');
				var str3 = '';
				for (var i = 0; i < str2.length; i++) {
					str3 += col_break(str2[i], col);
					if (i < str2.length - 1) str3 += '<br/>';
				} //end for
				str3 = row_cut(str3, row);
				var final1 = str3.replaceAll("<br/>", "\n");
				textarea.val(final1);
			} //end if
		} //edn func

		function textarea_lock() {
			var first = com.textareaGet(textarea, row);
			if (first.indexOf('<br/>') == -1) textarea.attr({
				maxlength: max
			});
			else textarea.attr({
				maxlength: max + (first.split('<br/>').length - 1) * 2
			});
		} //edn func
	} //edn func

	function row_cut(str, row) {
		row = row || 0;
		var str2 = str.split('<br/>');
		if (row <= 0 || str2.length <= row) return str;
		else {
			var str3 = '';
			for (var i = 0; i < row; i++) {
				str3 += str2[i];
				if (i < row - 1) str3 += '<br/>';
			} //edn for
			return str3;
		} //end else
	} //end func

	function col_break(str, col) {
		var line = Math.ceil(str.length / col);
		if (line == 1) return str;
		else {
			var str1 = '';
			for (var i = 0; i < line; i++) {
				if (i == 0) str1 += str.substr(0, col) + '<br/>';
				else if (i < line - 1) str1 += str.substr(i * col, col) + '<br/>';
				else str1 += str.substr(i * col);
			} //edn for
			return str1;
		} //end else
	} //end func

	function col_cut(str, col) {
		if (str.length > col) return str.substr(0, col);
		else return str;
	} //end func

	//限制textarea输入文字的行数
	com.textareaUnlock = function (textarea) {
		textarea.off();
	} //edn func

	//切割单行文字成几行
	com.textToMulti = function (str, col) {
		if (str != '' && col > 1) {
			if (str.indexOf('\n') == -1 && str.length > col) {
				var str1 = '';
				var line = Math.ceil(str.length / col);
				console.log('line:' + line);
				for (var i = 0; i < line; i++) {
					if (i < line - 1) str1 += str.substr(i * col, col) + '\n';
					else str1 += str.substr(i * col);
				} //edn for
				return str1;
			} //end if
			else return str;
		}//edn if
		else return null;
	} //edn func

	//拼带参数的url链接
	com.url = function (url, para) {
		var now = -1;
		for (var key in para) {
			now++;
			if (now == 0) url += '?';
			else url += '&';
			url += key + '=' + para[key]
		} //end for
		return url;
	}; //end func

	//以帧为单位的setTimeout
	com.setTimeout = function (callback, frame) {
		if (frame > 0 && callback) return setTimer(callback, frame, false);
	} //edn func

	com.clearTimeout = function (timer) {
		if (timer && timer.timer) clearTimer(timer);
	} //edn func

	//以帧为单位的setInterval
	com.setInterval = function (callback, frame) {
		if (frame > 0 && callback) return setTimer(callback, frame, true);
	} //edn func

	com.clearInterval = function (timer) {
		if (timer && timer.timer) clearTimer(timer);
	} //edn func

	function clearTimer(timer) {
		cancelAnimationFrame(timer.timer);
		timer = null;
	} //edn func

	function setTimer(callback, frame, interval) {
		var timer = {
			now: 0,
			timer: null
		};
		timer_handler();
		return timer;

		function timer_handler() {
			timer.now++;
			var timeup = timer.now == frame;
			if (timeup) {
				timer.now = 0;
				callback();
			} //end if
			if (interval || (!interval && !timeup)) timer.timer = requestAnimationFrame(timer_handler);
		} //end func

	} //edn func

	//将canvas转成存在cdn服务器上的远程图片地址
	com.canvas_send = function (canvas, callback, secretkey, type, compress) {
		if (canvas) {
			secretkey = secretkey || 'test';
			type = type || 'jpg';
			compress = compress || 0.95;
			if (type == 'png') var base64 = canvas.toDataURL('image/png');
			else var base64 = canvas.toDataURL('image/jpeg', compress);
			this.base64_send(base64, callback, secretkey);
		} //edn if
	} //end func

	//将base64数据格式转成存在cdn服务器上的远程图片地址
	com.base64_send = function (base64, callback, secretkey) {
		if (base64) {
			secretkey = secretkey || 'test';
			var apirul = "";
			if (ishttps) {
				// alert("这是一个https请求");
				apirul = 'https://tool.be-xx.com/cdn/base64'
			} else {
				// alert("这是一个http请求");
				apirul = 'http://tool.be-xx.com/cdn/base64'
			}
			$.post(apirul, {
				data: base64,
				key: secretkey
			}, function (resp) {
				if (resp.errcode == 0) {
					if (callback) callback(resp.result);
				}//edn if
				else {
					console.log('errmsg:' + resp.errmsg);
				}//edn else
			}, 'json');
		} //edn if
	} //end func

	//将跨域的远程图片地址转成base64数据格式，解决图片跨域问题
	com.base64_get = function (link, callback, secretkey) {
		if (link) {
			secretkey = secretkey || 'test';
			var apirul = "";
			if (ishttps) {
				// alert("这是一个https请求");
				apirul = 'https://tool.be-xx.com/image/base64'
			} else {
				// alert("这是一个http请求");
				apirul = 'http://tool.be-xx.com/image/base64'
			}



			$.post(apirul, {
				link: link,
				key: secretkey
			}, function (resp) {
				if (callback) callback(resp);
			}, 'text');
		} //edn if
	} //end func

	//将字符串转成二维码，返回base64数据格式
	com.qrcode = function (txt, options) {
		var defaults = { size: 200, color: '000000', bg: 'ffffff', border: 0, error: 0 };
		var data = $.extend(defaults, options);
		if (txt && txt != '') {

			var apirul = "";
			if (ishttps) {
				// alert("这是一个https请求");
				apirul = 'https://tool.be-xx.com/image/qrcode?txt='
			} else {
				// alert("这是一个http请求");
				apirul = 'http://tool.be-xx.com/image/qrcode?txt='
			}
			var src = apirul + txt + '&size=' + data.size + '&color=' + data.color + '&bg=' + data.bg + '&border=' + data.border + '&error=' + data.error + (data.logo ? '&logo=' + data.logo : '');
			return src;
		}//edn if
		else return null;
	} //end func

	//将字符串转成条形码，返回base64数据格式
	com.barcode = function (txt, options) {
		var defaults = { width: 400, height: 200, color: '000000', bg: 'ffffff', pure: true };
		var data = $.extend(defaults, options);
		if (txt && txt != '') {
			var apirul = "";
			if (ishttps) {
				// alert("这是一个https请求");
				apirul = 'https://tool.be-xx.com/image/barcode?txt='
			} else {
				// alert("这是一个http请求");
				apirul = 'http://tool.be-xx.com/image/barcode?txt='
			}
			var src = apirul + txt + '&width=' + data.width + '&height=' + data.height + '&color=' + data.color + '&bg=' + data.bg + '&pure=' + data.pure;
			return src;
		}//edn if
		else return null;
	} //end func

	//一键复制字符串到剪贴板
	com.clipboard = function (box, val, onComplete, onError) {
		var support = !!document.queryCommandSupported;
		console.log('support:' + support);
		if (support) {
			if (box.length > 0 && val != '') {
				box.attr({ 'data-copy': val }).on('click', { callback: onComplete }, copyText);
			}//edn if
		}//edn if
		else {
			console.log('浏览器不支持复制文本到剪贴板');
			if (onError) onError();
		}//end else
	}//edn func

	function copyText(e) {
		var val = $(this).attr('data-copy');
		var input = $('<textarea readonly="readonly"></textarea>').html(val).css({ position: 'absolute', left: 0, top: 0, width: 1, height: 1, visible: 'hidden' }).appendTo('body');
		input[0].select();
		input[0].setSelectionRange(0, input[0].value.length);
		console.log('copy content:' + input.val())
		document.execCommand('Copy');
		input.remove();
		input = null;
		if (e.data.callback) e.data.callback();
	}//edn func

	//显示页面渲染fps
	com.fpsShow = function (shell, space) {
		space = space || 30;
		space = space < 10 ? 10 : space;
		shell = shell || $('<div id="fpsShow"></div>').appendTo(ibase.dir == 'landscape' ? 'article' : 'body');
		requestAnimationFrame(function () {
			fps_dected(new Date().getTime(), -1);
		});

		function fps_dected(last, count) {
			var now = new Date().getTime();
			var fps = Math.round(1000 / (now - last));
			fps = fps > 60 ? 60 : fps;
			count++;
			if (count % space == 0) {
				if (fps >= 40) var classname = 'fpsFast';
				else if (fps >= 20) var classname = 'fpsNormal';
				else var classname = 'fpsSlow';
				shell.removeClass().addClass(classname).html('fps:' + fps);
			}//edn if
			requestAnimationFrame(function () {
				fps_dected(now, count);
			});
		}//edn func

	}//edn func

	com.countdown = function (btn, time, txt){
		btn = $(btn);
		time = time || 60;
		txt = txt || '#s秒后重新获取'
		var newbtn = btn.clone().addClass('countdown-disabled'), countdown, timer;
		btn.after(newbtn).hide();
		newbtn.html(txt.replace('#', '<span>'+time+'</span>'));
		countdown = $('span', newbtn);
		timer = setInterval(function(){
			if(time <= 0){
				clearInterval(timer);
				newbtn.remove();
				btn.html('重新发送')
				btn.show();
				return;
			};
			countdown.text(time);
			time--;
		}, 1000);
	};

	return com;

} //end import


String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

/**
 * 扩展一个可以指定时间输出格式的 Date 的方法
 * 年(y)可以用 1-4 个占位符、月(M)、日(d)、季度(q)可以用 1-2 个占位符
 * 小时(h)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param  fmt  | 格式化表达式
 */
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

Array.prototype.myFind = function myFind(fn){
    // 循环传进来的每一项   谁调用this就是谁
    for(var i=0; i<this.length; i++){
        // 判断有没有符合条件的值
        if(fn(this[i],i,this)){
            // 如果有，就把这个值 return 出去
            return this[i];
            // 跳出循环
            break;
        }//需要注意的是这里不能写else.
       //如果写了，循环第一次有不符合条件的值就会走这里，其他的值就不会继续判断了
    }
};
Array.prototype.myFilter = function (fn){
    // 设置一个空数组
    var arr = [];
    // 循环传进来的数组
    for (var i = 0 ; i < this.length; i++){
        // 判断符合条件的值
        if(fn(this[i],i,this)){
            // 将符合条件的值push进空数组中
            arr.push(this[i]);
        }
    }
    // 循环结束时，返回arr。
    // 此时如果数组中有值，就返回新数组，如果没有值，就会返回空数组
    return arr;
}

Array.prototype.myFindIndex = function ( fn ){
    // 设置循环 遍历传进来的每个数
    for (var i = 0; i < this.length; i++){
        // 判断符合条件的值
        if(fn(this[i],i,this)){
            // 将符合条件的值return出去
            return i ;
            break ;
        }
    }
    // 默认循环走完之后没有符合条件的就return-1
    return -1 ;
}

/**
 * 处理ios输入框的问题
 */

function IOSInput () {
    var itimer
    document.body.addEventListener('focusin', function () {
      clearTimeout(itimer)
    })
    document.body.addEventListener('focusout', function () {
      itimer = setTimeout(function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 300)
    })
  }

function resetFontSize(){
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            handleFontSize();
        } else {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
            }
        }
    }

    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }