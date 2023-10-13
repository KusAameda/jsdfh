'use strict';

$(document).ready(function () {

	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox = $('aside.loadBox');
	var articleBox = $('article');
	var windowScale = window.innerWidth / 750;

	//----------------------------------------有微信授权放这里  授权完在 icom.init(init)----------------------------------------


	icom.init(init); //初始化
	icom.screenScrollUnable(); //如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

	function init() {
		requestAnimationFrame(function () {
			var screenProp = window.innerWidth / window.innerHeight;
			console.log("os.screenProp:" + screenProp);
			if (screenProp < 0.54) articleBox.addClass("screen189");
			if (screenProp > 0.61) articleBox.addClass("screen159");
			sound_handler();
			load_handler();
		});
	} //edn func


	//----------------------------------------加载页面图片----------------------------------------
	function load_handler() {
		var loader = new PxLoader();
		var random = 2;
		var obj = "http://hitarget.online/";
		loader.addImage(obj + 'images/common/turn_phone.png?v=' + random);
		loader.addImage(obj + 'images/loading/bg.jpg?v=' + random);
		loader.addImage(obj + 'images/loading/horse.png?v=' + random);
		loader.addImage(obj + 'images/loading/line.png?v=' + random);
		loader.addImage(obj + 'images/loading/logo.png?v=' + random);

		for (var i = 1; i < 5; i++) {
			loader.addImage(obj + 'images/p1/' + i + '.png?v=' + random);
		}

		loader.addImage(obj + 'images/p1/bg.jpg?v=' + random);
		loader.addImage(obj + 'images/p1/box.png?v=' + random);

		loader.addImage(obj + 'images/p2/back.png?v=' + random);
		loader.addImage(obj + 'images/p2/next.png?v=' + random);
		loader.addImage(obj + 'images/p2/prev.png?v=' + random);
		loader.addImage(obj + 'images/p2/tip.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/1/1.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/1/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/1/3.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/1/bg.jpg?v=' + random);

		loader.addImage(obj + 'images/p2/content/2/1.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/2/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/2/3.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/2/bg.png?v=' + random);

		loader.addImage(obj + 'images/p2/content/3/1.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/3/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/3/bg.png?v=' + random);

		loader.addImage(obj + 'images/p2/content/4/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/5/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/6/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/7/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/8/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/9/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/10/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/11/2.png?v=' + random);
		loader.addImage(obj + 'images/p2/content/12/2.png?v=' + random);

		loader.addImage(obj + 'images/p3/1/1.png?v=' + random);
		loader.addImage(obj + 'images/p3/1/2.png?v=' + random);
		loader.addImage(obj + 'images/p3/1/3.png?v=' + random);

		loader.addImage(obj + 'images/p3/2/1.png?v=' + random);
		loader.addImage(obj + 'images/p3/2/2.png?v=' + random);
		loader.addImage(obj + 'images/p3/2/3.png?v=' + random);

		loader.addImage(obj + 'images/p3/3/1.png?v=' + random);
		loader.addImage(obj + 'images/p3/3/2.png?v=' + random);
		loader.addImage(obj + 'images/p3/3/3.png?v=' + random);

		loader.addImage(obj + 'images/p4/1/1.png?v=' + random);
		loader.addImage(obj + 'images/p4/1/2.png?v=' + random);
		loader.addImage(obj + 'images/p4/1/3.png?v=' + random);

		loader.addImage(obj + 'images/p4/2/1.png?v=' + random);
		loader.addImage(obj + 'images/p4/2/2.png?v=' + random);
		loader.addImage(obj + 'images/p4/2/3.png?v=' + random);
		loader.addImage(obj + 'images/p4/2/4.png?v=' + random);

		loader.addImage(obj + 'images/p4/3/1.png?v=' + random);
		loader.addImage(obj + 'images/p4/3/2.png?v=' + random);
		loader.addImage(obj + 'images/p4/3/3.png?v=' + random);
		loader.addImage(obj + 'images/p4/3/4.png?v=' + random);

		loader.addImage(obj + 'images/p4/4/1.png?v=' + random);
		loader.addImage(obj + 'images/p4/4/2.png?v=' + random);
		loader.addImage(obj + 'images/p4/4/3.png?v=' + random);
		loader.addImage(obj + 'images/p4/4/4.png?v=' + random);

		loader.addImage(obj + 'images/p4/5/1.png?v=' + random);
		loader.addImage(obj + 'images/p4/5/2.png?v=' + random);
		loader.addImage(obj + 'images/p4/5/3.png?v=' + random);
		loader.addImage(obj + 'images/p4/5/4.png?v=' + random);

		//实际加载进度
		//		loader.addProgressListener(function(e) {
		//			var per=Math.round(e.completedCount/e.totalCount*50);
		//			loadPer.html(per+'%');
		//		});

		loader.addCompletionListener(function () {
			loadBox.hide();
			icom.fadeIn(articleBox);
			pageInit();
			//			load_timer(50);//模拟加载进度
			loader = null;
		});
		loader.start();
	} //end func

	//模拟加载进度
	function load_timer(per) {
		per = per || 0;
		per += imath.randomRange(1, 3);
		per = per > 100 ? 100 : per;
		loadPer.html(per + '%');
		if (per == 100) setTimeout(pageInit, 200);else setTimeout(load_timer, 33, per);
	} //edn func

	// 音乐 -start
	function sound_handler() {
		if (os.weixin) {
			var wsb = window;
			if (wsb.WeixinJSBridge) {
				try {
					wsb.WeixinJSBridge.invoke("getNetworkType", {}, sound_creat);
				} catch (e) {
					wx.ready(sound_creat);
				}
			} else {
				document.addEventListener("WeixinJSBridgeReady", sound_creat, false);
			}
		} else {
			sound_creat();
		}
	} //edn func

	// var soundList = "";

	function sound_creat() {
		console.log('sound_creat');
		//bgm
		//webaudio在ios下自动播放目前不行
		ibgm.init({
			src: 'sound/bgm.mp3',
			autoplay: os.weixin || os.taobao,
			webAudio: false,
			onLoaded: bgm_loaded_complete
		});
		//audio
		// soundList = iaudio.on([{ src: 'sound/btn.mp3', onTimeupdate: audio_timeupdate_handler }], { onProgress: soundList_loaded_progress, onLoadComplete: soundList_loaded_complete });
		//webaudio
		//		soundList=iaudio.on([{src:'sound/sound.mp3',onTimeupdate:webaudio_timeupdate_handler,volume:1}],{onProgress:soundList_loaded_progress,onLoadComplete:soundList_loaded_complete,webAudio:1});

		//测试mp3转base64
		var sound = new Audio();
		// sound.src=base64Sound;
		sound.play();
	} //end func

	function audio_timeupdate_handler(event) {}
	//		console.log(this.currentTime/this.duration*100+'%');
	//edn func

	function webaudio_timeupdate_handler(_this) {}
	//		console.log(_this.context.currentTime/_this.buffer.duration*100+'%');
	//edn func

	function bgm_loaded_complete() {
		console.log('bgm load complete');
		console.log(ibgm.audio);

		setTimeout(function () {
			//			ibgm.pause();
			//			ibgm.hide(true);
			//			console.log(ibgm.currentTime());
		}, 1000);

		// setTimeout(function () {
		// 	ibgm.play();
		// }, 2000);

		ibgm.play();
	} //edn func


	//----------------------------------------页面逻辑代码----------------------------------------


	/**
  * 页面初始化
  */
	function pageInit() {

		$(".p1 .menu .menu_img1").on("click", menu1_btn);
		$(".p1 .menu .menu_img2").on("click", menu2_btn);
		$(".p1 .menu .menu_img3").on("click", menu3_btn);
		$(".p1 .menu .menu_img4").on("click", menu4_btn);
		$(".p2 .back").on("click", p2_back_btn);
		$(".p3 .back").on("click", p3_back_btn);
		$(".p4 .back").on("click", p4_back_btn);
		$(".p2 .p2_1 .look_video").on("click", look_video_btn);
		$(".p2 .p2_13 .look_video").on("click", play_video1_btn);
		$(".p2 .p2_13 .look_video2").on("click", play_video2_btn);

		$(".p2 .p2_menu .prev").on("click", prev_btn);
		$(".p2 .p2_menu .next").on("click", next_btn);
		$(".p3 .down_icon").on("click", p3_down_btn);
		$(".p4 .down_icon").on("click", p4_down_btn);
		$(".video_mask .close_video").on("click", close_video);
		loading();
		// menu1_btn();
		monitor_handler();

		// icom.countdown($('.btnCode'), 60, '#s');
	} //end func


	function loading() {
		setTimeout(function () {
			$(".loading").hide();
			$(".p1").show();
		}, 2000);
	}

	function menu1_btn() {
		$(".p1").hide();
		$(".p2").show();
		prevNextSwiper();
	}

	function menu2_btn() {
		$(".p1").hide();
		$(".p3").show();
		downUpSwiper();
	}

	function menu3_btn() {
		$(".p1").hide();
		$(".p4").show();
		wealSwiper();
	}

	function menu4_btn() {
		window.location.replace("https://720yun.com/t/62vkchryO7b#scene_id=67940903");
	}

	function p2_back_btn() {
		$(".p2").hide();
		$(".p1").show();
	}

	function p3_back_btn() {
		$(".p3").hide();
		$(".p1").show();
	}

	function p4_back_btn() {
		$(".p4").hide();
		$(".p1").show();
	}

	function look_video_btn() {
		prev_next_swiper.slideNext();
	}

	function prev_btn() {
		prev_next_swiper.slidePrev();
	}

	function next_btn() {
		prev_next_swiper.slideNext();
	}

	// 初始化左右滑动
	var prev_next_swiper = "";

	function prevNextSwiper() {
		prev_next_swiper = new Swiper('.p2 .swiper-container', {
			loop: true
		});
	}

	function p3_down_btn() {
		down_up_swiper.slideNext();
	}

	function play_video1_btn() {
		ibgm.pause();
		$(".video_mask").show();
		$("#video1").show();
		$("#video2").hide();
		$("#video1").trigger('play');
		$("#video2").trigger('pause');
	}

	function play_video2_btn() {
		ibgm.pause();
		$(".video_mask").show();
		$("#video2").show();
		$("#video1").hide();
		$("#video2").trigger('play');
		$("#video1").trigger('pause');
	}

	function close_video() {
		ibgm.play();
		$(".video_mask").hide();
		$("#video1").trigger('pause');
		$("#video2").trigger('pause');
	}

	// 初始化上下滑动
	var down_up_swiper;

	function downUpSwiper() {
		down_up_swiper = new Swiper('.p3 .swiper-container', {
			direction: 'vertical',
			on: {
				slideChange: function slideChange() {
					// 获取当前活动下标
					var index = this.realIndex;
					index == 2 ? $(".p3 .down_icon").hide() : $(".p3 .down_icon").show();
				}
			}
		});
	}

	function p4_down_btn() {
		weal_swiper.slideNext();
	}

	var down_up_swiper2;

	function downUpSwiper2() {
		down_up_swiper2 = new Swiper('.p5 .swiper-container', {
			direction: 'vertical',
			on: {
				slideChange: function slideChange() {
					// 获取当前活动下标
					var index = this.realIndex;
				}
			}
		});
	}

	var weal_swiper;

	function wealSwiper() {
		weal_swiper = new Swiper('.p4 .swiper-container', {
			direction: 'vertical',
			on: {
				slideChange: function slideChange() {
					// 获取当前活动下标
					var index = this.realIndex;
					index == 4 ? $(".p4 .down_icon").hide() : $(".p4 .down_icon").show();
				}
			}
		});
	}

	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler() {}
	//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
	//end func
}); //end ready
