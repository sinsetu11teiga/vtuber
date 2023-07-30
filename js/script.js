//ハンバーガーメニュー
$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
    $("#header,#container").toggleClass('mainblur');//ぼかしたいエリアにmainblurクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスを除去し
    $("#header,#container").removeClass('mainblur');//ぼかしているエリアのmainblurクラスを除去
});
//END

//マウスストーカー
const stalker = document.getElementById('mouse-stalker'); 
document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});
//END

//スクロール
	
$(function(){
    $('a[href^="#"]').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });
  });

  $(window).on('load',function(){
    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述
	
    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    $("#splash").delay(1500).fadeOut('slow',function(){//ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
    
        $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与
	
    });
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    
   //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
    $('.splashbg').on('animationend', function() {    
       



        $(".openbtn").click(function () {//ボタンがクリックされたら
            $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
            $(".g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
        });
        
        $(".g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
            $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
            $(".g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
        });
        //マウスストーカー
        const stalker = document.getElementById('mouse-stalker');
        let hovFlag = false;
        
        document.addEventListener('mousemove', function (e) {
            stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        });
        
        const linkElem = document.querySelectorAll('a:not(.no_stick_)');
        for (let i = 0; i < linkElem.length; i++) {
            linkElem[i].addEventListener('mouseover', function (e) {
                hovFlag = true;
                stalker.classList.add('is_active');
            });
            linkElem[i].addEventListener('mouseout', function (e) {
                hovFlag = false;
                stalker.classList.remove('is_active');
            });
        }

        

    });
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる
        
});
//END


//pagetop
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 200){//上から200pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

//END

// ニュースティッカー//
var slider;
var sliderFlag = false;
var breakpoint = 768;//768px以下の場合
  
function sliderSet() {
        var windowWidth = window.innerWidth;
        if (windowWidth >= breakpoint && !sliderFlag) {//768px以上は1行でスライダー表示
            slider = $('.slider').bxSlider({
            touchEnabled:false,//リンクを有効にするためスライドをマウスでドラッグした際にスライドの切り替えを可能にする機能を無効化
			mode: 'vertical',//縦スライド指定
			controls: false,//前後のコントロールを表示させない。
			auto: 'true',//自動的にスライド
			pager: false//ページ送り無効化
		});
            sliderFlag = true;
        } else if (windowWidth < breakpoint && sliderFlag) {
            slider.destroySlider();//bxSliderのOptionであるdestroySliderを使用してスライダーの動きを除去
            sliderFlag = false;
        }
    }

$(window).on('load resize', function() {
        sliderSet();
});

//ツールチップ//

tippy('.cap', {//指定した要素にツールチップが出現
	placement: 'top-start',//ツールチップの表示位置⇒top、top-start、top-end、right、right-start、right-end、bottom、bottom-start、bottom-end、left、left-start、left-end。指定をしなくてもtopに表示
	animation: 'shift-toward-subtle',//ツールチップ出現の動き。動きを指定するにはhttps://unpkg.com/browse/tippy.js@5.0.3/animations/から任意の動きを選び<head>内に読み込むことが必要。使用できる動き⇒shift-away、shift-away-subtle、shift-away-extreme、shift-toward、shift-toward-subtle、shift-toward-extreme、scale、scale-subtle、scale-extreme、perspective、perspective-subtle、perspective-extreme。指定をしなくてもfadeで表示
	theme: 'light-border',//ツールチップのテーマの色。色を指定するにはhttps://unpkg.com/browse/tippy.js@5.0.3/themes/からテーマを選び<head>内に読み込んで指定する。テーマの種類⇒light、light-border、material、translucent。指定をしなくても黒色で表示
	duration: 200,//ツールチップの出現の速さをミリ秒単位で指定
}
)

// JavaScript
window.addEventListener("load", function() {
    let snowflakes = [];
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
  
    // Set canvas dimensions to window dimensions
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  
    // Generate a random number of snowflakes
    let numSnowflakes = Math.floor(Math.random() * 100) + 50;
  
    // An array of snowflakes
    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push({
        x: Math.random() * W, // x-coordinate
        y: Math.random() * H, // y-coordinate
        r: Math.random() * 4 + 1, // radius
        d: Math.random() + 1 // density
      });
    }
  
    // Draw the snowflakes
    function drawSnowflakes() {
      ctx.clearRect(0, 0, W, H);
  
      ctx.fillStyle = "white";
      ctx.beginPath();
      for (let i = 0; i < numSnowflakes; i++) {
        let snowflake = snowflakes[i];
  
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      moveSnowflakes();
    }
  
    // Move the snowflakes
    function moveSnowflakes() {
      for (let i = 0; i < numSnowflakes; i++) {
        let snowflake = snowflakes[i];
  
        // Update X and Y coordinates
        snowflake.y += snowflake.d;
        snowflake.x += Math.sin(snowflake.d);
  
        // If snowflake falls below the canvas, create a new one at the top
        if (snowflake.y > H) {
          snowflakes[i] = { x: Math.random() * W, y: 0, r: snowflake.r, d: snowflake.d };
        }
      }
    }
  
    // Update canvas
    setInterval(drawSnowflakes, 25);
  });
  

  /*じわっ*/ 

  // blurTriggerにblurというクラス名を付ける定義

function BlurTextAnimeControl() {
	$('.blurTrigger').each(function(){ //blurTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('blur');// 画面内に入ったらblurというクラス名を追記
		}else{
		$(this).removeClass('blur');// 画面外に出たらblurというクラス名を外す
		}
		});
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	BlurTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
	BlurTextAnimeControl();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述