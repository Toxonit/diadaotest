


jQuery(document).ready(function ()
{

//	// Pour animer les éléments au scroll
//	var controller = new ScrollMagic.Controller();
//
//	// create a scene
//	new ScrollMagic.Scene({
//		duration: 100, // the scene should last for a scroll distance of 100px
//		offset: 50        // start this scene after scrolling for 50px
//	}).setPin("#my-sticky-element") // pins the element for the the scene's duration
//			.addTo(controller); // assign the scene to the controller

	setTimeout(function ()
	{
		$('.preloading').addClass('getOut');
	}, 2000);


	// =====================================================
	// parallax
	// =====================================================
	$('.home_landing').parallax({ imageSrc: 'resources/img/Calque_301.jpg' });


	// =====================================================
	// menu mobile
	// =====================================================
	$("#menu").mmenu({
		"extensions": [
			"fx-menu-zoom",
			"pagedim-black"
		]
	});



	// =====================================================
	// Effet au scroll
	// =====================================================
	window.sr = new ScrollReveal();

	sr.reveal('.sr_left', {
		origin: 'left',
		distance: '200px',
		duration: 1200
	});


	sr.reveal('.sr_right', {
		origin: 'right',
		distance: '200px',
		duration: 1200
	});

	sr.reveal('.sr_left_late', {
		origin: 'left',
		distance: '200px',
		duration: 1600
	});


	sr.reveal('.sr_right_late', {
		origin: 'right',
		distance: '200px',
		duration: 1600
	});
	sr.reveal('.sr_right_super_late', {
		origin: 'right',
		distance: '200px',
		duration: 2000
	});
	sr.reveal('.sr_left_super_late', {
		origin: 'left',
		distance: '200px',
		duration: 2000
	});




	// =====================================================
	//Scroll to
	// =====================================================
	// Gestion du header, pour ajouter une classe, permet aussi de basculer le boolean pour activer l'animation du scroll seulement la page en haut
	var isDone = false;
	var $header = $('.commons_header');
	var scrollClass = 'on-scroll';
	var activateAtY = 20;


	// On va regarder si on est coller en haut pour animer le header, et autoriser l'anim au scroll sur la landing page
	$(window).scroll(function ()
	{
		if ($(window).scrollTop() > activateAtY)
		{
//			deactivateHeader();
		}
		else
		{
			// On est en haut, on réautorise l'effet au scroll égqalement
			isDone = true;
//			activateHeader();
		}
	});


	// Scroll To Id init, permet également d'avoir le scroll au mouse wheel
	$("#scrollToButton").mPageScroll2id();

	// Prog defensive, ça fait pas* de mal, si le plug in avant n'est pas chargé on l'indique ds la console
	if (! $(document).data("mPS2id"))
	{
		console.log("Error: 'Page scroll to id' plugin not present or activated. Please run the code after plugin is loaded.");
		return;
	}


	//Scroll au mouse wheel
	$(document).data("mPS2idExtend",
	{
		selector: "._mPS2id-h",
		currentSelector: function ()
		{
			return this.index($(".mPS2id-highlight-first").length ? $(".mPS2id-highlight-first") : $(".mPS2id-highlight"));
		},
		input: { y: null, x: null },
		i: null,
		time: null
	}).on("scrollSection", function (e, dlt, i)
	{
		// Animation pr scroll, est déclanché par les autres "on" plus bas
		var d = $(this).data("mPS2idExtend");
		var sel = $(d.selector);

		if (! $("html,body").is(":animated"))
		{
			if (! i)
			{
				i = d.currentSelector.call(sel);
			}
			if (! (i === 0 && dlt > 0) && ! (i === sel.length - 1 && dlt < 0))
			{
				sel.eq(i - dlt).trigger("click.mPS2id");
			}
		}

	}).on("mousewheel DOMMouseScroll", function (event)
	{
		// Détection du scroll, on va check un bool pour ne déclancher qu'une fois et ne pas bloquer la molette de l'user ..
		if (! isDone)
		{
			if ($($(this).data("mPS2idExtend").selector).length)
				event.preventDefault();
			$(this).trigger("scrollSection", ((event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) ? 1 : - 1));
			// On met done à true pour bloquer par la suite, seul un scroll complet vers le haut réautorise l'effet
			isDone = true;
		}
	}).on("keydown", function (event)
	{
		// détection au clavier
		if (! isDone)
		{
			var code = event.keyCode ? event.keyCode : event.which;
			var keys = $(this).data("mPS2id").layout === "horizontal" ? [37, 39] : [38, 40];
			//détection de la touche
			if (code === keys[0] || code === keys[1])
			{
				if ($($(this).data("mPS2idExtend").selector).length)
				{
					event.preventDefault();
				}

				$(this).trigger("scrollSection", (code === keys[0] ? 1 : - 1));
			}
			isDone = true;

		}
	}).on("pointerdown touchstart", function (event)
	{
		// Gestion du touche pour mobile
		if (! isDone)
		{
			var originalEvent = event.originalEvent;
			var dataExtend = $(this).data("mPS2idExtend");


			if (originalEvent.pointerType === "touch" || event.type === "touchstart")
			{
				var screenYValue = originalEvent.screenY || originalEvent.changedTouches[0].screenY;
				dataExtend.input.y = screenYValue;


				if ($(this).data("mPS2id").layout === "horizontal")
				{
					var screenXValue = originalEvent.screenX || originalEvent.changedTouches[0].screenX;
					dataExtend.input.x = screenXValue;
				}
				dataExtend.time = originalEvent.timeStamp;
				dataExtend.i = dataExtend.currentSelector.call($(dataExtend.selector));
			}

			isDone = true;
		}
	}).on("touchmove", function (event)
	{
		// Gestion du touche pour mobile
		if (! isDone)
		{
			if ($("html,body").is(":animated"))
			{
				event.preventDefault();
			}

			isDone = true;
		}
	}).on("pointerup touchend", function (event)
	{
		if (! isDone)
		{
			var originalEvent = event.originalEvent;
			if (originalEvent.pointerType === "touch" || event.type === "touchend")
			{
				var screenYValue = originalEvent.screenY || originalEvent.changedTouches[0].screenY;
				var dataExtend = $(this).data("mPS2idExtend");
				var diff = dataExtend.input.y - screenYValue;
				var time = originalEvent.timeStamp - dataExtend.time;
				var i = dataExtend.currentSelector.call($(dataExtend.selector));


				if ($(this).data("mPS2id").layout === "horizontal")
				{
					var screenXValue = originalEvent.screenX || originalEvent.changedTouches[0].screenX;
					var diff = dataExtend.input.x - screenXValue;
				}
				if (Math.abs(diff) < 2)
				{
					return;
				}
				var _switch = function ()
				{
					return time < 200 && i === d.i;
				};
				$(this).trigger("scrollSection", [(diff > 0 && _switch() ? - 1 : diff < 0 && _switch() ? 1 : 0), (_switch() ? dataExtend.i : i)]);
			}
			isDone = true;
		}
	});




	function deactivateHeader()
	{
		if (! $header.hasClass(scrollClass))
		{
			$header.addClass(scrollClass);
		}
	}

	function activateHeader()
	{
		if ($header.hasClass(scrollClass))
		{
			$header.removeClass(scrollClass);
		}
	}
});