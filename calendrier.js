/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    // Activer les tooltips
    $('[data-toggle="tooltip"]').tooltip(); 
    
    // Gérer mois calendrier
    (function () {
        var $calendrier = $("#calendrier-content"),
                $btnPrecedent = $("#calendrier-precedent"),
                $btnSuivant = $("#calendrier-suivant"),
                $btnToday = $("#calendrier-today"),
                $textMois = $("#text-mois");

        var mois = $("#calendrier-mois-actuel").val(),
                annee = $("#calendrier-annee-actuelle").val(),
                anneeDebut = $("#calendrier-annee-debut").val(),
                anneeFin = $("#calendrier-annee-fin").val();

        $btnPrecedent.on("click", function () {
            gererMoisAnnee("precedent");
        });

        $btnSuivant.on("click", function () {
            gererMoisAnnee("suivant");
        });
        
        $btnToday.on("click", function(){
            gererMoisAnnee();
        });

        // Gérer les années
        function gererMoisAnnee(bouton) {
            masquerMoisAnnee();
            
            if (bouton === "precedent") {
                mois--;

                if (mois === 0) {
                    mois = 12;
                    annee--;
                }
            }
            else if (bouton === "suivant") {
                mois++;

                if (mois === 13) {
                    mois = 1;
                    annee++;
                }
            }
            else{
                date = new Date();
                mois = date.getMonth() + 1;
                annee = date.getFullYear();
            }
            
            $calendrier.load("index.php?module=calendrier&content_alone",
                    {mois: mois, annee: annee},
            function () {
                afficherMoisAnnee(mois, annee);
            });
        }

        function afficherMoisAnnee(mois, annee) {
            var isAnneeAcad = true;
            
            if (annee < anneeDebut || annee > anneeFin) {
                isAnneeAcad = false;
            }
            else if (annee == anneeDebut && mois < 10) {
                isAnneeAcad = false;
            }
            else if (annee == anneeFin && mois > 10) {
                isAnneeAcad = false;
            }
            
            if (!isAnneeAcad){
                $textMois.addClass("mois-non-defini");
                $(".calendrier-jours-semaine").css("background-color", "silver");
                $(".jour-ouvert").css("background-color", "silver");
                $(".jour-event").css("background-color", "silver");
                $(".jour-repos").css("background-color", "silver");
                $(".jour-desc").html("");
            }
            else{
                $textMois.removeClass("mois-non-defini");
            }

            $textMois.html(getNomMois(mois) + " " + annee).fadeTo(500, 1);
            $calendrier.fadeTo(500, 1);
            $('[data-toggle="tooltip"]').tooltip();
        }

        function masquerMoisAnnee() {
            $calendrier.fadeTo(500, 0.6);
            $textMois.fadeTo(500, 0.3);
        }

        function getNomMois($moisChiffre) {
            switch ($moisChiffre) {
                case 1:
                    $nomMois = 'Janvier';
                    break;
                case 2:
                    $nomMois = 'Février';
                    break;
                case 3:
                    $nomMois = 'Mars';
                    break;
                case 4:
                    $nomMois = 'Avril';
                    break;
                case 5:
                    $nomMois = 'Mai';
                    break;
                case 6:
                    $nomMois = 'Juin';
                    break;
                case 7:
                    $nomMois = 'Juillet';
                    break;
                case 8:
                    $nomMois = 'Août';
                    break;
                case 9:
                    $nomMois = 'Septembre';
                    break;
                case 10:
                    $nomMois = 'Octobre';
                    break;
                case 11:
                    $nomMois = 'Novembre';
                    break;
                case 12:
                    $nomMois = 'Décembre';
                    break;
                default :
                    $nomMois = 'Inconnu';
            }
            return $nomMois;
        }
    })();
});
