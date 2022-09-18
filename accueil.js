jQuery(document).ready(function () {
    var $titrePage = $('.titre-fixe'),
            $scrollMsg = $('#scroll-msg'),
            $cadreScrollMsg = $('#cadre-scroll-msg');

    // Vérifier si l'objet existe
    if ($titrePage.length === 1) {
        var posTitrePage = $('#CarouselPrincipal').height();
        
        /* Fixer le Titre de la page en dessous du menu */
        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= posTitrePage) {
                $titrePage.addClass('titre-fixe-on');
            } else {
                $titrePage.removeClass('titre-fixe-on');
            }
        });
        // Charger les images du carousel
        $('.carousel-inner img').on('load', function () {
            $(this).hide().css('visibility', 'visible').show('slow');
        }).each(function () {
            if (this.complete)
                $(this).trigger('load');
        });
    }
    /* Charger dynamiquement les images */
    $(".image-dynamique").on('load', function () {
        $(this).parent().find('.image-loader').hide();
        $(this).fadeIn('slow');
    }).each(function () {
        if (this.complete)
            $(this).trigger('load');
    });
    /*
     * Paramètres texte défilant de la page Accueil
     */
    if ($scrollMsg.length === 1) {
        var timer = setInterval(defiler, 10);
        var largeurCadre = parseInt($cadreScrollMsg.width()),
                largeurMsg = $scrollMsg.width(),
                limiteMsg = -parseInt(largeurMsg),
                posMsg = largeurCadre;
        $scrollMsg.css('left', posMsg + 'px'); // Positionne le message au début

        // Relancer au redimenssionnement
        $(window).resize(initScrollMsg);

        $cadreScrollMsg.mouseenter(function () {
            clearInterval(timer);
        });
        $cadreScrollMsg.mouseleave(function () {
            timer = setInterval(defiler, 10);
        });
    }

    function initScrollMsg() {
        largeurCadre = parseInt($cadreScrollMsg.width()),
                largeurMsg = $scrollMsg.width(),
                limiteMsg = -parseInt(largeurMsg),
                posMsg = largeurCadre;
        $scrollMsg.css('left', posMsg + 'px'); // Positionne le message au début
    }

    function defiler() {
        $scrollMsg.css('left', posMsg + 'px');
        posMsg--;
        // Repositionne le message au début
        if (posMsg === limiteMsg) {
            posMsg = largeurCadre;
        }
    }
});