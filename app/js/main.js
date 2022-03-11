$(function () {

  $('.navbar__btn').on('click', function () {
    $(this).toggleClass('navbar__btn--active');
    $('.navbar-menu').toggleClass('navbar-menu--active');
  })

  $('.view-progects__item').hover(function () {
    
    let popupIndex = $('.view-progects__popup')[$(this).index()];
    $(popupIndex).toggleClass('view-progects__popup--active');

  })

});