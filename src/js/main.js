//Function when the page is loaded: scroll the position to the top
$(document).ready(function () {
  $(this).scrollTop(0)
})//End of the function

//Function to move to the second block on scroll
function moveToTheSecondBlock () {
  // $(".scroll_down").click(function() {
  $('html, body').animate({
    scrollTop: $('.section_two').offset().top
  }, 600)
  // });
}

//Function is responsible for changing the background-image of the first block on the page
function changeBackgroundImageOfTheFirstBlockOnThePage () {
  $('.slides .slide:first').addClass('active')

  function changeImg () {
    let curr = $('.slides .slide.active')
    let next = curr.next()

    if (!next.length) {
      next = $('.slides .slide:first')
      next.addClass('active')

      curr.animate({
        opacity: 0
      }, 2000, function () {
        curr.removeClass('active')
        curr.css({
          opacity: 1
        })
      })
    } else {
      next
        .css({opacity: 0})
        .addClass('active')
        .animate({
          opacity: 1
        }, 2000, function () {
          curr.removeClass('active')
        })
    }
  }

  setInterval(changeImg, 6000)

}//End of the function

//Function to play with scroll down button
function fadeOutScrollDownButtonOnScroll () {
  let scroll_down = $('.scroll_down')
  if ($(window).scrollTop() > 0) {
    scroll_down.css({
      display: 'none'
    })
  } else {
    scroll_down.fadeIn()
  }
}//End of function

//Function to move logo and menu elements on scroll
function moveLogoAndMenuOnScroll () {

  let logo = $('.logo_image')
  let menu = $('.menu')
  let scrollTop = $(window).scrollTop()
  logo.css({
      'animation': 'none',
      'transform': `translate(0px, ${scrollTop / 1.9}%)`
    }
  )

  menu.css({
    'transform': `translate(0px, ${scrollTop / 2}%)`
  })
}

//Function is responsible for the slider on the second block
function mainSliderOnTheSecondBlock () {

  let sliderWrapper = $('.cd-hero-slider')
  let sliderNav = $('.cd-slider-nav')
  let navigationMaker = $('.cd-maker')
  let slidesNumber = sliderWrapper.children('li').length
  let visibleSlidePosition = 0
  let autoPlayId = 0
  let autoPlayDelay = 10000

  setAutoplay(sliderWrapper, slidesNumber, autoPlayDelay)

  sliderNav.on('click', 'li', function (event) {
    event.preventDefault()
    let selectedItem = $(this)

    if (!selectedItem.hasClass('selected')) {

      console.log('This item is not selected right now')
      let selectedPosition = selectedItem.index()
      let activePosition = sliderWrapper.find('li.selected').index()

      if (activePosition < selectedPosition) {
        nextSlide(sliderWrapper.find('.selected'), sliderWrapper, sliderNav, selectedPosition)
      } else {
        prevSlide(sliderWrapper.find('.selected'), sliderWrapper, sliderNav, selectedPosition)
      }

      visibleSlidePosition = selectedPosition

      updateSliderNavigation(sliderNav, selectedPosition)
      updateNavigationMaker(navigationMaker, selectedPosition + 1)

      setAutoplay(sliderWrapper, slidesNumber, autoPlayDelay)
    }
  })

  function nextSlide (visibleSlide, container, pagination, n) {
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      visibleSlide.removeClass('is-moving')
    })

    container.children('li').eq(n).addClass('selected from-right').removeClass('move-left').prevAll().addClass('move-left')
  }

  function prevSlide (visibleSlide, container, pagination, n) {
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
      visibleSlide.removeClass('is-moving')
    })

    container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left')
  }

  function updateNavigationMaker (marker, n) {
    marker.removeClassPrefix('item').addClass('item-' + n)
  }

  function updateSliderNavigation (pagination, n) {
    let navigationDot = pagination.find('.selected')
    navigationDot.removeClass('selected')
    pagination.find('li').eq(n).addClass('selected')
  }

  function setAutoplay (wrapper, length, delay) {
    if (wrapper.hasClass('autoplay')) {
      clearInterval(autoPlayId)
      autoPlayId = window.setInterval(function () {
        autoplaySlider(wrapper, length)
      }, delay)
    }
  }

  function autoplaySlider (slidesWrapper, length) {
    if (visibleSlidePosition < length - 1) {
      nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1)
      visibleSlidePosition += 1
    } else {
      prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0)
      visibleSlidePosition = 0
    }
    updateNavigationMaker(navigationMaker, visibleSlidePosition + 1)
    updateSliderNavigation(sliderNav, visibleSlidePosition)
  }

  $.fn.removeClassPrefix = function (prefix) {
    //remove all classes starting with 'prefix'
    this.each(function (i, el) {
      let classes = el.className.split(' ').filter(function (c) {
        return c.lastIndexOf(prefix, 0) !== 0
      })
      el.className = $.trim(classes.join(' '))
    })
    return this
  }
}//End of function

// -----  Event listeners -------
//Functions to be executed on load
$(window).on('load', function () {
  mainSliderOnTheSecondBlock();

  let scroll_down = $('.scroll_down')
  scroll_down.animate({
    'opacity': 1
  }, 1000)
  setTimeout(function () {
    scroll_down.css({
      'animation': 'bounce 2s infinite'
    })
  }, 500)

  let lis = $('.menu li')
  $(lis).each(function (k, v) {
    setTimeout(function () {
      $(lis.get(k)).css({
        'opacity': 1,
        'transform': 'translate(0, 0)'
      })
    }, (k + 1) * 150)
  })

})//End of functions
//Functions to be executed on scroll
$(window).on('scroll', function () {
  fadeOutScrollDownButtonOnScroll()
  moveLogoAndMenuOnScroll()
})//End of function
$('.scroll_down').on('click', function () {
  moveToTheSecondBlock()
  $(".cd-hero-slider").addClass('autoplay');
})
changeBackgroundImageOfTheFirstBlockOnThePage()
// ----- End of Event Listeners -----

