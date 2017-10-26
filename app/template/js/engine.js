var ESC_KEY = 27;
$(document).ready(function(){

	// scroll page
	$('nav a[href*=\\#]:not([href=\\#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top-80
				}, 1000);
				return false;
			}
		}
	});
	
	// scroll Page
	var panel = $('.header'),
		pos = panel.offset();


	$(window).resize(function(){
		if ($(window).width() > 767 ){
			$('#navbar').removeAttr('style');
			$('.o-menu').removeClass();
		}
	});

	$(window).scroll(function(){
		$this = $(this);

		if ($(this).scrollTop() > 200){
			$("#up").fadeIn();
		} else{
			$("#up").fadeOut();
		}


		h = $('.header').height() + 9;
		if($this.scrollTop() > h && panel.hasClass('default')) {
			panel.removeClass('default').addClass('fixed');
			$("body").addClass('bodyFixed');
		}
		else {
			if ($this.scrollTop() < h){
				if($this.scrollTop() <= pos.top && panel.hasClass('fixed')) {
					panel.removeClass('fixed').addClass('default');
					$("body").removeClass('bodyFixed');
				}
			}
		}
	});



	setTimeout(function() {
		$('select').styler();
	}, 100);


	// карусель
	$('#foo1').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:3,
		startPosition : 2,
		stagePadding : 250,
		navText: ["", ""],
		onInitialized: function (event) {
			refreshFirstLastVisible(event);
		},
		onChanged: function (event) {
			refreshFirstLastVisible(event);
		},
		responsive:{
			0:{
				items:1,
				stagePadding: 20
			},
			900:{
				items:2,
				stagePadding: 0
			},
			992:{
				items:1
			},
			1250:{
				items:2
			},
			1550:{
				items:3
			}
		}
	});


	// production
	$('#foo2').owlCarousel({
		loop:false,
		nav:true,
		dots: true,
		items:1,
		navText: ["", ""]
	});


	$('#foo3').owlCarousel({
		loop:false,
		nav:false,
		dots: true,
		items:7,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 70
			},
			400:{
				items:2,
				stagePadding: 30
			},
			500:{
				items:3,
				stagePadding: 0
			},
			700:{
				items:3,
				stagePadding: 0
			},
			992:{
				items:5
			},
			1250:{
				items:6
			},
			1550:{
				items:7
			}
		}
	});


	// news
	$('#foo4').owlCarousel({
		loop:false,
		nav:true,
		dots: false,
		items:5,
		navText: ["", ""],
		responsive:{
			0:{
				items:1,
				stagePadding: 10
			},
			360:{
				items:1,
				stagePadding: 30
			},
			430:{
				items:1,
				stagePadding: 60
			},
			500:{
				items:1,
				stagePadding: 70
			},
			600:{
				items:1,
				stagePadding: 100
			},
			900:{
				items:2,
				stagePadding: 0
			},
			992:{
				items:3
			},
			1250:{
				items:4
			},
			1550:{
				items:5
			}
		}
	});


	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				h = $(document).height();
				$('body').addClass('o-menu');
				$('#navbar').height(h);
			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
				$('#navbar').height('auto');
			};
		init();
	});	


	$('.modal-email').each(function(){
		var $this = $(this),
			$link = $('.addmsg'),
			$close = $this.find('.close'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				$('.modal-email').toggle();
				$link.toggleClass('active');
				$('.modal-email').find('.modal-title, form').show();
				$('body').append('<div class="backdrop"></div>');
				addKeyPressHandler($this);


				var elem = $(".modal-email"),
					top = 0,
					height_block = $(elem).height();

					top = $('#clients').offset().top - height_block/2;


				if ($(window).width() > 991){
					$('html,body').animate({
						scrollTop: top
					}, 1000);
				};

			},
			closeMenu = function(e){
				e.preventDefault();
				$('.modal-email').fadeOut();
				$link.removeClass('active');
				$('.backdrop').remove();
			};
		init();
	});


	var thankTxt = '<div class="thank text-center"><p>Дякуємо. Ваше повідомлення успішно надіслано.</p></div>';
	var errorTxt = 'Возникла помилка!';

	// validation
	$('#quickemail-form').validate({
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$.ajax({type: "POST",url: $(form).attr('action'),data: strSubmit,
				success: function(){
					$('#quickemail-form').html(thankTxt);
					$('.modal-email').addClass('modal-thank');
					$('.modal-email .modal-title').remove();
					startClock('quickemail-form');
					console.log("success");
				}
			}).fail(function(error){alert(errorTxt)});
		}
	}); 



	// structure
	$('.structure__box > div:not(.structure__center)').hover(
		function(){$(this).closest('.structure__box').find('.structure__center').addClass('hover')},
		function(){$(this).closest('.structure__box').find('.structure__center').removeClass('hover')}
	);

	$('.structure__link').click(function(e){
		e.preventDefault();
		var $this = $(this),
			target = $this.attr('href');

		$('.structure__modal').fadeIn();
		$(target).removeClass('hide').addClass('show');
	});

	$('.structure__modal .close').click(function(e){
		e.preventDefault();
		var $this = $(this);

		$('.structure__modal').fadeOut('normal', function(){
			$('.structure__modal').find('.show').removeClass('show').addClass('hide');
		});

	});

});


function addKeyPressHandler(modal){
	'use strict';
	document.body.addEventListener("keyup", function(event){
		event.preventDefault();
		console.log(event.keyCode);
		if (event.keyCode === ESC_KEY){
			modal.find('.close').trigger('click')
		}
	});
};

// =заглушка для IE
//event listener: DOM ready
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
//call plugin function after DOM ready
addLoadEvent(function(){
	outdatedBrowser({
		bgColor: '#f25648',
		color: '#ffffff',
		lowerThan: 'transform',
		languagePath: '/outdatedbrowser/lang/ru.html'
	})
});
// =/заглушка для IE



var timer,
	sec = 3;


function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			case 'quickemail-form':
				$('.modal-email').fadeOut('normal',function(){
					// $('.modal-email .thank').remove();
					$('.backdrop').remove();
				});
				break;	
			default:
				modal = $("#" + sendform).closest('.modal');
				modal.fadeOut('normal',function(){
					modal.modal('hide');
				});
				break;
		}
	}
}
function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}