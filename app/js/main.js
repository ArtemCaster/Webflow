

$(function () {

  $('.questions__list-item--active').find('.questions__list-info').slideDown(); //сделать при прокрутке
  
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
  })
  
  $('.questions__list-item').on('click', function () {
    $(this).toggleClass('questions__list-item--active');
    
    if ($(this).hasClass('questions__list-item--active')) {
      $(this).find('.questions__list-info').slideDown(500);
    } else {
      $(this).find('.questions__list-info').slideUp(500);
    }
    
  })

  var mixer = mixitup('.our-work__items');
  
});

