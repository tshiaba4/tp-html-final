/*
 * Fichier JavaScript Global
 */
var $carousel = $("#CarouselPrincipal");

/* Fixer les paramètres du Carousel */
$carousel.carousel({
    interval: 27000, // 15 secondes
    pause: "hover"
});

$(function () {
    /* Gérer le lien vers le début de la page */
    $('body').append("<a class='lien-top' title='Haut de page'>" +
            "<span class='glyphicon glyphicon-arrow-up'></span></a>");
   
    $(window).scroll(function () {
        if ($(document).scrollTop() >= 300)
            $('.lien-top').fadeIn(600);
        else
            $('.lien-top').fadeOut(600);
    });

    $('.lien-top').click(function (e) {
        e.preventDefault();
        
        if ($(document).scrollTop() > 0) {
            $('html, body').animate({scrollTop: 0}, 'slow');
        }
    });
});