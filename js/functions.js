// leadpages_input_data variables come from the template.json "variables" section
var leadpages_input_data = {};

$(function () {
	/* Vertically center media object blocks when 'media--vc' class is added */
	$(window).on('resize', function() {
		$('.media--vc').each(function(index, el){
			el = $(this);
			var elHeight = el.outerHeight();
			var parentElHeight = el.parent().height();
			var delta = parentElHeight - elHeight;

			// media__img or media__img--rev that is stacked and not floating or
			// media__body when the paired media__img or media__img--rev is stacked and not floating
			if ( ((el.hasClass('media__img') || el.hasClass('media__img--rev')) && el.css('float') == 'none') ||
					(el.hasClass('media__body') && ((el.prev().hasClass('media__img') || el.prev().hasClass('media__img--rev')) && el.prev().css('float') == 'none')) ) {
				el.css('margin-top', '');
				return;
			}

			// set top margin to half of delta if delta is positive
			if (delta > 0) {
				el.css('margin-top', Math.round(delta/2) + 'px');
			}
		});

		/* Horizontally center the in-depth content block (needed to keep the top border wider than content) */
		$('.in-depth__content-block').each(function(index, el){
			el = $(this);
			var windowWidth = $(window).width();
			var sidePadding;

			if ( windowWidth > 960) {
				sidePadding = ((windowWidth - 960)/2) <= 105 ? ((windowWidth - 960)/2) : 105;
				el.css('padding-left', sidePadding + 'px');
				el.css('padding-right', sidePadding + 'px');
			} else {
				el.css('padding-left', '');
				el.css('padding-right', '');
			}
		});
	}).trigger('resize');

	// Trigger the window resize continuously if within the builder
	// to adjust vertical centering on edits
	if ( typeof window.top.App !== 'undefined' ) {
		// within the builder
		setInterval( function(){
			$(window).trigger('resize');
		}, 500);
	}

});