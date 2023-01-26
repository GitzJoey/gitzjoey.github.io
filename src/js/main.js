import '../scss/style.scss';

import $ from 'jquery';
import AOS from 'aos';
import feather from 'feather-icons';
import 'slick-carousel';
import * as bootstrap from 'bootstrap';

window.$ = $;

/* #region Animation-Hero */

$(() => {
    (function () {
        var animationDelay = 3500,
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000,
            lettersDelay = 50,
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
            revealDuration = 600,
            revealAnimationDelay = 2500;

        initHeadline();

        function initHeadline() {
            singleLetters($('.cd-headline.letters').find('b'));
            animateHeadline($('.cd-headline'));
            $('.cd-words-wrapper').css('width', '200px');
        }

        function singleLetters($words) {
            $words.each(function(){
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (var i in letters) {
                    if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function(){
                var headline = $(this);

                if(headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
                } else if (headline.hasClass('clip')){
                    var spanWrapper = headline.find('.cd-words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type') ) {
                    var words = headline.find('.cd-words-wrapper b'),
                        width = 0;
                    words.each(function(){
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.cd-words-wrapper').css('width', width);
                };

                setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if($word.parents('.cd-headline').hasClass('type')) {
                var parentSpan = $word.parent('.cd-words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function(){
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

            } else if($word.parents('.cd-headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            }  else if($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.cd-headline').hasClass('loading-bar')){
                $word.parents('.cd-words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
                setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if($word.parents('.cd-headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            }  else if($word.parents('.cd-headline').hasClass('clip')) {
                $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
                    setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if(!$letter.is(':last-child')) {
                setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
            } else if($bool) {
                setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
            }

            if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if(!$letter.is(':last-child')) {
                setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
            } else {
                if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
                if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }
    })();
});

/* #endregion */

/* #region AOS & feathericons */

$(() => {
    AOS.init();
    feather.replace();
});

/* #endregion */

/* #region ScrollToTop */

function getScrollTop() {
    var B = document.body;
    var D = document.documentElement;
    D = (D.clientHeight) ? D : B;

    return D.scrollTop;
}

$(() => {
    $(window).on('scroll', () => {
        if (getScrollTop() > 100) {
            $('.backto-top').css('opacity', '1');
        } else {
            $('.backto-top').css('opacity', '0');
        }
    });
    
    $('.backto-top').on('click', function () {
        $('html, body').animate({
            scrollTop: 0,
            easingType: 'linear',
        }, 500);
        return false;
    });
});

/* #endregion */

/* #region MobileMenu */

$(() => {
    $('.humberger-menu').on('click', function (e) {
        e.preventDefault();
        $('.popup-mobile-menu').addClass('menu-open');
        $('html').css({
            overflow: 'hidden'
        });
    });

    $('.close-menu-activation, .popup-mobile-menu .primary-menu .nav-item a').on('click', function (e) {
        e.preventDefault();
        $('.popup-mobile-menu').removeClass('menu-open');
        $('.popup-mobile-menu .has-droupdown > a').removeClass('open').siblings('.submenu').removeClass('active').slideUp('400');
        $('html').css({
            overflow: ''
        });
    });

    $('.popup-mobile-menu').on('click', function (e) {
        e.target === this && $('.popup-mobile-menu').removeClass('menu-open');
        $('html').css({
            overflow: ''
        });
    });

    $('.popup-mobile-menu .has-droupdown > a').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.submenu').toggleClass('active').slideToggle('400');
        $(this).toggleClass('open');
        $('html').css({
            overflow: ''
        });
    });

    $('.nav-pills .nav-link').on('click', function (e) {
        $('.rn-popup-mobile-menu').removeClass('menu-open');
        $('html').css({
            overflow: ''
        });
    });
});

/* #endregion */

/* #region jQuery One Page Nav */

(function($, window, document, undefined){

	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.$nav = this.$elem.find(this.config.navItems);

			if(this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter);
			}

			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

			this.getPositions();

			this.bindInterval();

			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos);
				}
			});
		},

		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if(!$parent.hasClass(self.config.currentClass)) {
				if(self.config.begin) {
					self.config.begin();
				}

				self.adjustNav(self, $parent);

				self.unbindInterval();

				self.scrollTo(newLoc, function() {
					if(self.config.changeHash) {
						window.location.hash = newLoc;
					}

					self.bindInterval();

					if(self.config.end) {
						self.config.end();
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();

				if(!$parent.hasClass(this.config.currentClass)) {
					this.adjustNav(this, $parent);

					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		scrollTo: function(target, callback) {
			var offset = $(target).offset().top;

			$('html, body').animate({
				scrollTop: offset
			}, this.config.scrollSpeed, this.config.easing, callback);
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};

})($, window, document);

$(() => {
    $('.onepagenav').onePageNav({
        currentClass: 'current',
        changeHash: true,
        scrollSpeed: 500,
        scrollThreshold: 0.2,
        filter: ':not(.external)',
        easing: 'swing',
        scrollChange: function($currentListItem) {
            
        }
    });
});

/* #endregion */

/* #region Slick */

$(() => {
    $('.testimonial-activation').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: 'linear',
        prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>'
    });
    
    $('.testimonial-item-one').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        cssEase: 'linear',
        prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                arrows: false,
            }
        }]
    });
    
    
    $('.portfolio-slick-activation').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
        responsive: [{
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 868,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });
    
    
    $('.blog-slick-activation').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
        responsive: [{
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 868,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });
    
    $('.testimonial-activation-item-3').slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
        responsive: [{
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });
    
    $('.brand-activation-item-5').slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-chevron-left"></i></button>',
        nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-chevron-right"></i></button>',
        responsive: [{
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 868,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

/* #endregion */

/* #region Demo */

$(() => {
    $('.popuptab-area li a.demo-dark').on('click', function (e) {
        $('.demo-modal-area').addClass('dark-version');
        $('.demo-modal-area').removeClass('white-version');
    });

    $('.popuptab-area li a.demo-light').on('click', function (e) {
        $('.demo-modal-area').removeClass('dark-version');
        $('.demo-modal-area').addClass('white-version');
    })

    $('.rn-right-demo').on('click', function (e) {
        $('.demo-modal-area').addClass('open');
    })

    $('.demo-close-btn').on('click', function (e) {
        $('.demo-modal-area').removeClass('open');
    })
});

/* #endregion */