$(function () {

  $('.navbar__btn').on('click', function () {

    $(this).toggleClass('navbar__btn--active');
    $('.navbar-menu').toggleClass('navbar-menu--active');

  })

  $('.view-progects__item').hover(function () {

    let popupIndex = $('.view-progects__popup')[$(this).index()];
    $('.view-progects__popup').removeClass('view-progects__popup--active');
    $(popupIndex).toggleClass('view-progects__popup--active');

  })

  $('.testimonials__slider').slick({
    infinite: false,
    speed: 700,
    // autoplay: true,
  })

});