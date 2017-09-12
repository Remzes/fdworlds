'use strict';

//Function when the page is loaded: scroll the position to the top
$(document).ready(function () {
    $(this).scrollTop(0);

    //Function to move to the second block on scroll
    function moveToTheSecondBlock() {
        $('html, body').animate({
            scrollTop: $('.section_two').offset().top - 90
        }, 500);
    }

    //Function to open/close monitoring slide reveal
    function openCloseSlideMonitoringReveal() {
        var reveal = $(".slide_reveal_monitoring");
        var btn = $(".monitoring_toggle_btn");
        var new_class = reveal.hasClass("moved_down") ? "arrow_left left_rotated" : "arrow_left";
        reveal.width() !== 0 ? btn.html("<span class='" + new_class + "'><=</span> Развернуть Мониторинг") : btn.html("<span class='" + new_class + "'><=</span> Свернуть Мониторинг");

        reveal.animate({
            "width": reveal.width() === 0 ? "278px" : 0
        }, 'fast');

        $(".inside_slide_monitoring").css({
            "padding": reveal.width() < 270 ? "0 5px 5px 5px" : 0
        }, 'fast');
    }

    //Function to open/close shop slide reveal
    function openCloseSlideShopReveal() {
        var reveal = $(".slide_reveal_shop");
        var btn = $(".shop_toggle_btn");
        var new_class = reveal.hasClass("moved_down") ? "arrow_right right_rotated" : "arrow_right";
        reveal.width() !== 0 ? btn.html("Развернуть Магазин <span class='" + new_class + "'>=></span>") : btn.html("Свернуть Магазин <span class='" + new_class + "'>=></span>");

        reveal.animate({
            "width": reveal.width() === 0 ? "320px" : 0
        }, 'fast');
    }

    //Function to change navigation styles
    function changeNavigationStylesOnScroll() {
        if ($(window).scrollTop() > 0) {

            $(".navigation").css({
                "background-color": "rgba(0,0,0,0.95)",
                "height": "90px"
            });
            $(".navigation img").css({
                opacity: 1,
                transform: "translate(0,0)"
            });
            $(".slide_reveal_monitoring").addClass("moved_down");
            $(".arrow_left").css({
                transform: 'rotate(-17deg)'
            });

            $(".arrow_right").css({
                transform: 'rotate(17deg)'
            });
            $(".slide_reveal_shop").addClass("moved_down");
        } else if ($(window).scrollTop() < 100) {

            $(".navigation").css({
                "background-color": "transparent",
                "height": "70px"
            });
            $(".navigation img").css({
                opacity: 0,
                transform: "translate(-150px,0)"
            });
            $(".slide_reveal_monitoring").removeClass("moved_down");
            $(".arrow_left").css({
                transform: 'none'
            });

            $(".arrow_right").css({
                transform: 'none'
            });
            $(".slide_reveal_shop").removeClass("moved_down");
        }
    }

    //Function is responsible for changing the background-image of the first block on the page
    function changeBackgroundImageOfTheFirstBlockOnThePage() {
        $('.slides .slide:first').addClass('active');

        function changeImg() {
            var curr = $('.slides .slide.active');
            var next = curr.next();

            if (!next.length) {
                next = $('.slides .slide:first');
                next.addClass('active');

                curr.animate({
                    opacity: 0
                }, 2000, function () {
                    curr.removeClass('active');
                    curr.css({
                        opacity: 1
                    });
                });
            } else {
                next.css({ opacity: 0 }).addClass('active').animate({
                    opacity: 1
                }, 2000, function () {
                    curr.removeClass('active');
                });
            }
        }

        setInterval(changeImg, 6000);
    } //End of the function

    //Function to play with scroll down button
    function fadeOutScrollDownButtonOnScroll() {
        var scroll_down = $('.scroll_down');
        if ($(window).scrollTop() > 0) {
            scroll_down.css({
                display: 'none'
            });
        } else {
            scroll_down.fadeIn();
        }
    } //End of function

    //Function to move logo and menu elements on scroll
    function moveLogoAndMenuOnScroll() {

        var logo = $('.logo_image');
        var menu = $('.menu');
        var scrollTop = $(window).scrollTop();
        logo.css({
            'animation': 'none',
            'transform': 'translate(0px, ' + scrollTop / 1.9 + '%)'
        });

        menu.css({
            'transform': 'translate(0px, ' + scrollTop / 2 + '%)'
        });
    }

    //Function to appear in the about section
    function apperaInTheAboutSection() {
        var blocks = $('.desc_appearance_section section');
        $.each(blocks, function (index, element) {
            setTimeout(function () {
                $(element).css({
                    transform: "translateX(0)",
                    opacity: 1
                });
            }, index * 400);
        });
    }

    //Function is responsible for the slider on the second block
    function mainSliderOnTheSecondBlock() {

        var sliderWrapper = $('.cd-hero-slider');
        var sliderNav = $('.cd-slider-nav');
        var navigationMaker = $('.cd-maker');
        var slidesNumber = sliderWrapper.children('li').length;
        var visibleSlidePosition = 0;
        var autoPlayId = 0;
        var autoPlayDelay = 10000;

        setAutoplay(sliderWrapper, slidesNumber, autoPlayDelay);

        sliderNav.on('click', 'li', function (event) {
            event.preventDefault();
            var selectedItem = $(this);

            if (!selectedItem.hasClass('selected')) {

                var selectedPosition = selectedItem.index();
                var activePosition = sliderWrapper.find('li.selected').index();

                if (activePosition < selectedPosition) {
                    nextSlide(sliderWrapper.find('.selected'), sliderWrapper, sliderNav, selectedPosition);
                } else {
                    prevSlide(sliderWrapper.find('.selected'), sliderWrapper, sliderNav, selectedPosition);
                }

                visibleSlidePosition = selectedPosition;

                updateSliderNavigation(sliderNav, selectedPosition);
                updateNavigationMaker(navigationMaker, selectedPosition + 1);

                setAutoplay(sliderWrapper, slidesNumber, autoPlayDelay);
            }
        });

        function nextSlide(visibleSlide, container, pagination, n) {
            visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                visibleSlide.removeClass('is-moving');
            });

            container.children('li').eq(n).addClass('selected from-right').removeClass('move-left').prevAll().addClass('move-left');

            var fileName = parseInt(n) + ".png";

            $(".cd-maker").css({
                transform: 'translateX(' + 150 * n + 'px)',
                background: 'url(img/slider_nav_icons/' + fileName + ') top center no-repeat',
                "background-size": "cover"
            });
        }

        function prevSlide(visibleSlide, container, pagination, n) {
            visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                visibleSlide.removeClass('is-moving');
            });

            container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');

            var fileName = parseInt(n) + ".png";

            $(".cd-maker").css({
                transform: 'translateX(' + 150 * n + 'px)',
                background: 'url(img/slider_nav_icons/' + fileName + ') top center no-repeat',
                "background-size": "cover"
            });
        }

        function updateNavigationMaker(marker, n) {
            marker.removeClassPrefix('item').addClass('item-' + n);
        }

        function updateSliderNavigation(pagination, n) {
            var navigationDot = pagination.find('.selected');
            navigationDot.removeClass('selected');
            pagination.find('li').eq(n).addClass('selected');
        }

        function setAutoplay(wrapper, length, delay) {
            if (wrapper.hasClass('autoplay')) {
                clearInterval(autoPlayId);
                autoPlayId = window.setInterval(function () {
                    autoplaySlider(wrapper, length);
                }, delay);
            }
        }

        function autoplaySlider(slidesWrapper, length) {
            if (visibleSlidePosition < length - 1) {
                nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
                visibleSlidePosition += 1;
            } else {
                prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
                visibleSlidePosition = 0;
            }
            updateNavigationMaker(navigationMaker, visibleSlidePosition + 1);
            updateSliderNavigation(sliderNav, visibleSlidePosition);
        }

        $.fn.removeClassPrefix = function (prefix) {
            //remove all classes starting with 'prefix'
            this.each(function (i, el) {
                var classes = el.className.split(' ').filter(function (c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                el.className = $.trim(classes.join(' '));
            });
            return this;
        };
    } //End of function

    //Function to move to the third section
    function moveToThirdSection() {
        $('html, body').animate({
            scrollTop: $('.section_three').offset().top - 90
        }, 800);
    };

    // -----  Event listeners -------
    //Functions to be executed on load
    $(window).on('load', function () {
        mainSliderOnTheSecondBlock();

        var scroll_down = $('.scroll_down');
        scroll_down.animate({
            'opacity': 1
        }, 1000);
        setTimeout(function () {
            scroll_down.css({
                'animation': 'bounce 2s infinite'
            });
        }, 500);

        var lis = $('.menu li');
        $(lis).each(function (k, v) {
            setTimeout(function () {
                $(lis.get(k)).css({
                    'opacity': 1,
                    'transform': 'translate(0, 0)'
                });
            }, (k + 1) * 150);
        });
    }); //End of functions

    //Functions to be executed on scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() < 2000) {
            $(".section_four").css({
                display: "none"
            });
        } else {
            $(".section_four").css({
                display: "block"
            });
        }

        changeNavigationStylesOnScroll();
        fadeOutScrollDownButtonOnScroll();
        if ($(window).scrollTop() > 450) {
            apperaInTheAboutSection();
        }
    }); //End of function

    $('.scroll_down, #project_desc_btn').on('click', function () {
        moveToTheSecondBlock();
        $(".cd-hero-slider").addClass('autoplay');
    });
    $('#servers_btn').on('click', moveToThirdSection);
    // $(".monitoring_toggle_btn").on("click", openCloseSlideMonitoringReveal);
    $(".shop_toggle_btn").on("click", openCloseSlideShopReveal);
    $(".monitoring_toggle_btn").on("click", openCloseSlideMonitoringReveal);

    changeBackgroundImageOfTheFirstBlockOnThePage();
    // ----- End of Event Listeners -----
}); //End of the function