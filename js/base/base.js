//2020.12.16
//-----------------------------------os
var os = importOS();
function importOS() {
	var userAgent = navigator.userAgent;
	console.log(userAgent)
	var os = {};
	os.userAgent = userAgent;
	os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
	os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
	os.iphone = !os.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
	os.ios = os.ipad || os.iphone;
	os.wp = userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
	os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);
//	if(os.ios) os.iosVer = parseInt(userAgent.match(/OS\s\d+_/)[0].match(/\d+_/)[0]);
	os.weixin = userAgent.match(/MicroMessenger/) ? true : false;
	if(os.weixin) {
		var ver = userAgent.match(/MicroMessenger\/\d+.\d+.\d+/)[0].match(/\d+.\d+.\d+/)[0].split('.');
		os.weixinVer = 0;
		for(var i = 0; i < ver.length; i++) os.weixinVer += parseInt(ver[i]) * Math.pow(10, ver.length - i - 1);
	} //edn if
	os.wxApp= window.__wxjs_environment=='miniprogram' || userAgent.match(/miniprogram/) || userAgent.match(/miniProgram/)  ? true : false;
	os.weibo = userAgent.match(/Weibo/) || userAgent.match(/weibo/) ? true : false;
	os.ali = userAgent.match(/AliApp/) ? true : false;
	os.alipay = os.ali && userAgent.match(/Alipay/) ? true : false;
	os.taobao = os.ali && userAgent.match(/WindVane/) ? true : false;
	os.tianmao = os.ali && userAgent.match(/Tmall/) ? true : false;
	os.netease = userAgent.match(/NewsApp/) ? true : false;
	os.toutiao = userAgent.match(/NewsArticle/) ? true : false;
	os.facebook = userAgent.match(/(FB)/) ? true : false;
	os.baidu = userAgent.match(/Baidu/) ? true : false;
	os.qq = userAgent.match(/QQTheme/) ? true : false;
	os.qqlive=userAgent.match(/QQLiveBrowser/) ? true : false;
	os.bili = userAgent.match(/BiliApp/) ? true : false;
	os.safari = os.ios && userAgent.match(/Safari/) ? true : false;
	os.chrome = userAgent.match(/Chrome/) ? true : false;
	os.firefox = userAgent.match(/Firefox/) ? true : false;
	os.ie = document.documentMode;
	os.edge = userAgent.match(/Edge/) ? true : false;
	os.pc = !(os.android || os.ios || os.wp);
	os.simulation=userAgent.match(/Test/) ? true : false;
	if(os.ios) {
		os.iphoneX = (screen.width == 375 && screen.height == 812) || (screen.width == 375 && window.innerHeight >= 635) || (window.innerWidth == 724 && window.innerHeight == 375) || (window.innerWidth == 375 && window.innerHeight == 724) || (window.innerWidth == 812 && window.innerHeight == 343) || (window.innerWidth == 343 && window.innerHeight == 812) || (screen.width == 414 && screen.height == 896) || (screen.width == 414 && window.innerHeight >= 719);
		// os.iphoneXFull=os.iphoneX && window.innerHeight>667;
		os.iphone6Plus = (screen.width == 414 && screen.height == 736) || (screen.width == 414 && window.innerHeight >= 622);
		os.iphone6 = (screen.width == 375 && screen.height == 667) || (screen.width == 375 && window.innerHeight <= 603);
		os.iphone5 = (screen.width == 320 && screen.height == 568) || (screen.width == 320 && window.innerHeight >= 460);
		os.iphone4 = (screen.width == 320 && screen.height == 480) || (screen.width == 320 && window.innerHeight <= 450);
		os.screen159=false;
		os.screen169 = (screen.height==568 && screen.width ==320) || (screen.height==667 && screen.width ==375) || (screen.height==896 && screen.width ==414);
		os.screen189=false;
		os.screen209 = (screen.height==812 && screen.width ==375) || (screen.height==896 && screen.width ==414);
	} //edn if
	else {
		os.miui = userAgent.match(/MI/) || userAgent.match(/Redmi/) ? true : false;
		os.huawei = userAgent.match(/HUAWEI/) || userAgent.match(/HONOR/) ? true : false;
		os.oppo = userAgent.match(/OPPO/) ? true : false;
		os.oppoBrowser= userAgent.match(/OppoBrowser/) ? true : false;
		os.oppoApp= os.oppo && !os.oppoBrowser && !!window.JSCallJava;
		os.oppoR15 = userAgent.match(/PAAM00/) || userAgent.match(/PAAT00/) || userAgent.match(/PACM00/) || userAgent.match(/PACT00/) ? true : false;
		os.vivo = userAgent.match(/vivo/) ? true : false;
		os.screen159 = screen.height / window.innerWidth <= 540 / 360;
		os.screen169 = screen.height / screen.width <= 640 / 360 && screen.height / screen.width < 710 / 360;;
		os.screen189 = screen.height / screen.width >= 710 / 360 && screen.height / screen.width < 740 / 360;
		os.screen209 = screen.height / screen.width >= 740 / 360;
	} //edn if
	return os;
} //end func

//2018.12.13
//-----------------------------------base
var ibase = importBase();
function importBase() {
	var base = {}
	base.dir = 'portrait';
	base.lock = false;
	base.screenWidth = 750;
	base.scrollTop = -1;
	base.iphoneXOffsetLandscape=44;//以iphoneX在微信横屏下有效内容区域724x343为准，并同比缩放对齐iphonePlus的739x350
	base.iphoneXOffsetPortrait=35;
	base.bleedScale=1;
	
	base.init = function(options) {
		var defaults = {dir:'portrait', lock:true};//dir：锁定方向、width：设计宽度、height：设计高度、scale：缩放模式(cover,contain,full)、lock：假横屏锁定
		var opts = extend(defaults,options);
		var _this=this;
		this.dir = opts.dir;
		this.landscapeWidth = opts.width;
		this.landscapeHeight = opts.height;
		this.landscapeScaleMode = opts.scale;
		this.screenLock = opts.lock;
		this.screenLock = os.simulation && this.dir=='landscape' ? false : this.screenLock;
		this.debug = parseInt(this.getQueryString('debug')) || 0;
		if(this.dir == 'portrait') {
			font_resize();
			window.addEventListener("orientationchange", window_fontResize, false);
			document.write('<aside class="turnBoxPortrait" id="turnBox"><div class="phone"><img src="images/common/turn_phone.png"><i class="yes"></i><i class="no"></i></div><p>竖屏体验更佳</p></aside>');
			this.turnBox = document.getElementById("turnBox");
			if(this.screenLock) {
				if(this.getOrient(true)=='landscape') {
					requestAnimationFrame(function(){
						_this.turnBox.style.display = "block";
						_this.lock = true;
					});
				} //edn if
				window.addEventListener("orientationchange", portait_lock, false);
			}//edn if
		} //edn if
		else {
			font_resize();
			window.addEventListener("orientationchange", window_fontResize, false);
			document.write('<aside class="turnBoxLandscape" id="turnBox"><div class="lock"><span></span><span></span></div><div class="sign"><span>竖排方向锁定：关闭</span><span>竖排方向锁定：打开</span></div><div class="phone"><img src="images/common/turn_phone.png"><i class="yes"></i><i class="no"></i></div><p>锁定竖屏体验更佳</p></aside>');
			this.turnBox = document.getElementById("turnBox");
			if(this.screenLock) {
				if(this.getOrient(true) == 'landscape') {
					requestAnimationFrame(function(){
						_this.turnBox.style.display = "block";
						_this.lock = true;
					});
				} //edn if
				window.addEventListener("orientationchange", landscape_lock, false);
			} //edn if
		} //end else
	} //end func
	
	function window_fontResize(e){
		font_resize();
		for(i=1; i<=3; i++) setTimeout(font_resize,100*i);
	}//edn func
	
	function font_resize(){
		if(base.dir == 'portrait'){
			var size=window.innerWidth / base.screenWidth * 100;
		}else{
			var size=base.getOrient(true) == 'portrait' ? window.innerWidth / base.screenWidth * 100 : window.innerHeight / base.screenWidth * 100;
		}//end else
		console.log('font size:'+size);
		base.fontSize=size;
		document.querySelector('html').style.fontSize=size + 'px';
	}//edn func
	
	function extend(obj1,obj2){
		if(obj2 && Object.keys(obj2).length>0){
			for(var key in obj1){ 
			   if(obj2.hasOwnProperty(key)) continue;//有相同的属性则略过 
			   obj2[key]=obj1[key]; 
			}//edn for
			return obj2; 
		}//edn if
	 	else return obj1;
	}//edn func

	base.unlockScreen = function() {
		this.screenLock=false;
		if(this.dir == 'portrait') window.removeEventListener("orientationchange", portait_lock, false);
		else if(this.screenLock) window.removeEventListener("orientationchange", landscape_lock, false);
		if(this.turnBox) this.turnBox.style.display = 'none';
		document.body.scrollTop = 0;
	}; //end func
	
	base.lockScreen = function() {
		base.screenLock=true;
		if(this.dir == 'portrait') {
			if(this.dir != base.getOrient()) {
				this.turnBox.style.display = "block";
				this.lock = true;
			} //edn if
			window.addEventListener("orientationchange", portait_lock, false);
		} //edn if
		else if(this.screenLock) {
			if(base.getOrient() == 'landscape') {
				this.turnBox.style.display = "block";
				this.lock = true;
			} //edn if
			window.addEventListener("orientationchange", landscape_lock, false);
		} //edn if
	}; //end func

	base.getOrient = function(resize) {
		resize = resize || 0;
		if(resize) var dir = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
		else var dir = window.orientation == 90 || window.orientation == -90 ? 'landscape' : 'portrait';
		console.log('window orientation:' + dir);
		return dir;
	}; //end func

	function landscape_lock(e) {
		if(base.getOrient() == 'landscape') {
			base.turnBox.style.display = "block";
			base.lock = true;
		} //edn if
		else {
			base.turnBox.style.display = 'none';
			base.lock = false;
		} //end else
	} //end func

	function portait_lock(e) {
		if(base.dir != base.getOrient()) {
			base.turnBox.style.display = 'block';
			base.lock = true;
			if(os.ios) {
				if(base.scrollTop == -1 && document.body.scrollTop > 0) {
					base.scrollTop = document.body.scrollTop;
					document.body.scrollTop = 0;
				} //edn if
			} //end if
		} //edn if
		else {
			base.turnBox.style.display = 'none';
			base.lock = false;
			if(os.ios) {
				if(base.scrollTop != -1) {
					document.body.scrollTop = base.scrollTop;
					base.scrollTop = -1;
				} //edn if
			} //edn if
		} //end else
	} //end func

	base.load = function(f, shell, callback, nocache) {
		nocache = nocache != null ? nocache : true;
		var file = get_filetype(f, nocache);
		if(file.type == "css")  this.loadCss(file.src, shell, callback);
		else if(file.type == "js") this.loadJs(file.src, shell, callback);
	} //end func
	
	base.loadCss=function(src,shell,callback){
		shell = shell || 'head';
		var fileref = document.createElement('link');
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", src);
		document.querySelector(shell).appendChild(fileref);
		if(callback) fileref.onload = callback;
	}//edn func
	
	base.loadJs=function(src,shell,callback){
		shell = shell || 'body';
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", src);
		document.querySelector(shell).appendChild(fileref);
		if(callback) fileref.onload = callback;
	}//edn func

	base.creatNode = function(nodeName, idName, className, innerHTML, wrapNode) {
		nodeName = nodeName || 'div';
		className = className || '';
		idName = idName || '';
		innerHTML = innerHTML || '';
		wrapNode = wrapNode || document.querySelector('body');
		var newNode = document.createElement(nodeName);
		if(className != '') newNode.className = className;
		if(idName != '') newNode.id = idName;
		if(innerHTML != '') newNode.innerHTML = innerHTML;
		wrapNode.appendChild(newNode);
	} //end func

	base.getUrl = function(url) {
		var hmsr = getQueryString('hmsr');
		hmsr = hmsr || '';
		var utm_source = getQueryString('utm_source');
		utm_source = utm_source || '';
		if(url && url != '') {
			url += (hmsr != '' ? (url.indexOf('?') == -1 ? '?' : '&') + 'hmsr=' + hmsr : '') + (utm_source != '' ? '&utm_source=' + utm_source : '');
			location.href = url;
		} //end if
	} //edn func

	//获得http url参数
	base.getQueryString = function(name) {
		if(name && name != '') {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return decodeURIComponent(r[2]);
			return null;
		} //end if
		else return null;
	} //end func

	function get_filetype(f, nocache) {
		nocache = nocache != null ? nocache : true;
		var tmp = f.split('.');
		var type = tmp[tmp.length - 1];
		var src = f + (nocache ? '?' + Math.random() : '');
		return {
			type: type,
			src: src
		};
	} //end func
	
	function setFrameout(callback, frame) {
		frame=frame||0;
		var now = 0;
		timer_handler();
		function timer_handler() {
			now++;
			var timeup = now >= frame;
			if(timeup) callback();
			else requestAnimationFrame(timer_handler);
		} //end func
	} //edn func
	
	return base;
} //end func