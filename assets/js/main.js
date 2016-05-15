/*
	Optics by Pixelarity
	pixelarity.com @pixelarity
	License: pixelarity.com/license
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Fix: IE8 objects.
			if (skel.vars.IEVersion < 9)
				$('object').remove();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Nav.
			$('#nav')
				.append('<a href="#nav" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-nav-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 5,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

		// Parallax.
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {
					return $(this);
				};

			}
			else {

				$.fn._parallax = function() {

					var $this = $(this);

					if (this.length == 0)
						return $this;

					if (this.length > 1) {

						for (var i=0; i < this.length; i++)
							$(this[i])._parallax(userOptions);

						return $this;

					}

					$this.each(function() {

						var $t = $(this),
							on, off;

						on = function() {

							$t.css('background-position', 'center 100%, center 100%, center 0px');

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

									$t.css('background-position', 'center 100%, center 100%, center ' + (pos * -0.15) + 'px');

								});

						};

						off = function() {

							$t
								.css('background-position', '');

							$window
								.off('scroll._parallax');

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)();
							else
								(on)();

						});

					});

					return $(this);

				};

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

			// Banner.
				$banner._parallax();

			// Main header.
				$('#main > header')._parallax();


	});

})(jQuery);