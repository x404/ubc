$(document).ready(function(){

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
});

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




// google map
var map;
function initMap() {
var myLatlng = new google.maps.LatLng(48.4229925,35.028076);
var mapOptions = {
	zoom: 17 ,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	scrollwheel : false
};
var styles = [{
	stylers: [
		{saturation: 0}
		]
	}];
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	map.setOptions({styles: styles});

	var image = '/template/images/balloon.png';
	var primna = new google.maps.Marker({
		position: {lat: 48.4229925, lng: 35.028076},
		map: map,
		icon: image
	});
}