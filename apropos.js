
// Gérer les onglets
$('#apropos-onglets .nav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});