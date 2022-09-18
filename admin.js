/*
 * Fichier JavaScript de l'Administration
 */

$(function () {

    // Gérer Authentification
    (function () {
        var $supprimerActu = $('.supprimer-actu'),
                $formAdmin = $("#form-cnx-admin"),
                $imgLoader = $("#bloc-btn-cnx .ajax-loader"),
                $textValider = $("#text-valider"),
                $messageErreur = $("#message-erreur"),
                $login = $("#login"),
                $mdp = $("#mdp");
        $supprimerActu.on('click', function () {
            return confirm('Voulez-vous vraiment supprimer cette actualité ?');
        });
        $formAdmin.submit(function (e) {
            e.preventDefault();
            masquerMessageErreur();

            // Requête Ajax pour valider l'authentification
            $.post("index.php?module=admin&action=verifier_acces&content_alone",
                    // {login: $login.val(), mdp: axz($mdp.val())},
                   {login: $login.val(), mdp: $mdp.val()},
            function (rep) {
                if (rep === 'success') {
                    window.location.href = "index.php?module=admin";
                }
                else {
                    afficherMessageErreur(rep);
                    // console.log(axz('w@rren2019'));
                    console.log('w@rren2019');
                }
            }, "text");
        });
        function afficherMessageErreur(message) {
            $messageErreur.html(message);
            $messageErreur.fadeIn(500);
            $imgLoader.hide();
            $textValider.fadeIn(500);
        }

        function masquerMessageErreur() {
            $textValider.hide();
            $imgLoader.show();
            $messageErreur.html('').fadeOut(500);
        }
    })();

    // Gérer activation items menu & liens modules
    (function () {
        var $contenuAdmin = $("#contenu-admin"),
                $adminEnabled = $("#menu-items a:not('.disabled')"),
                $adminDisabled = $("#menu-items a.disabled"),
                $btnNewActu = $("#admin-new-actu"),
                $btnListeActu = $("#admin-liste-actu"),
                $lnkModifActu = $(".admin-modif-actu");

        $adminEnabled.click(function () {
            $contenuAdmin.fadeTo(500, 0.5);
            $adminEnabled.removeClass('active');
            $(this).addClass('active');
        });

        $adminDisabled.click(function (e) {
            e.preventDefault();
        });

        $btnNewActu.click(function () {
            $contenuAdmin.fadeTo(500, 0.5);
        });

        $btnListeActu.click(function () {
            $contenuAdmin.fadeTo(500, 0.5);
        });

        $lnkModifActu.click(function () {
            $contenuAdmin.fadeTo(500, 0.5);
        });
    })();

    // Gérer Chargement image
    (function () {
        var $imgLoader = $("#bloc-image .ajax-loader"),
                $imgActualite = $("#bloc-image #image"),
                $messageServeur = $("#bloc-image #message-serveur");
        $imgActualite.change(function (e) {
            $messageServeur.html('');
            $imgLoader.show();
            var fichier = $imgActualite.prop("files")[0];
            var formData = new FormData();
            formData.append("image", fichier);

            $.ajax({
                url: "index.php?module=admin&action=charger_image&content_alone",
                dataType: "script",
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                type: "post",
                success: function (rep) {
                    $imgLoader.hide();
                    if (rep === "success") {
                        $messageServeur.html("Image validée avec succès!");
                        $messageServeur.css("color", "green");
                        $messageServeur.fadeIn(2000);
                    }
                    else {
                        $messageServeur.html(rep);
                        $messageServeur.css("color", "red");
                        $messageServeur.fadeIn(2000);
                    }
                },
                error: function () {
                    $messageServeur.html("Erreur de chargement du fichier");
                    $messageServeur.css("color", "red");
                    $messageServeur.fadeIn(2000);
                }
            });
        });
    })();

    // Gérer chargement fichiers horaires
    (function () {
        var $fichierHoraire = $(".horaire-fichier");
        
        $fichierHoraire.change(function () {
            var $messageServeur = $(this).parent().find(".message-serveur"),
                $imgLoader = $(this).parent().find(".ajax-loader");
            
            $messageServeur.html('');
            $imgLoader.show();
            var fichier = $(this).prop("files")[0],
                horaire = $(this).attr("id"),
                formData = new FormData();
            
            formData.append(horaire, fichier);
            $.ajax({
                url: "index.php?module=admin&action=charger_horaire&content_alone&horaire=" + horaire,
                dataType: "script",
                cache: false,
                contentType: false,
                processData: false,
                data: formData,
                type: "post",
                success: function (rep) {
                    $imgLoader.hide();
                    if (rep === "success") {
                        $messageServeur.html("Fichier validé avec succès!");
                        $messageServeur.css("color", "green");
                        $messageServeur.fadeIn(2000);
                    }
                    else {
                        $messageServeur.html(rep);
                        $messageServeur.css("color", "red");
                        $messageServeur.fadeIn(2000);
                    }
                },
                error: function () {
                    $messageServeur.html("Erreur de chargement du fichier");
                    $messageServeur.css("color", "red");
                    $messageServeur.fadeIn(2000);
                }
            });
        });
    })();

    /*
     * Fonction de chiffrement de César inverse
     */
    function axz(chaine) {
        var t = '', n = chaine.length, code;

        if (n > 0) {
            for (var i = n - 1; i >= 0; i--) {
                code = chaine.charCodeAt(i) + i + 1;
                t += String.fromCharCode(code);
            }
            t += (n < 10) ? n - 1 : 7;
        }
        return t;
    }
});