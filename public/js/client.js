var socket = io();

/**
 * Connexion d'un utilisateur
 */
$('#login form').submit(function (e) {
  e.preventDefault();
  var user = {
    username :  $('#m').val().trim()
  };
  if (user.username.length > 0) { // Si le champ de connexion n'est pas vide
    socket.emit('user-login', user);
     $('body').attr('id','logged-in'); // Cache formulaire de connexion
    //$('#chat input').focus();  Focus sur le champ du message
    console.log(user);
    
  }
});






