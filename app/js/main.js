$(function () {

  $('.navbar__btn').on('click', function () {
    $(this).toggleClass('navbar__btn--active');
    $('.navbar-menu').toggleClass('navbar-menu--active');
  })

});