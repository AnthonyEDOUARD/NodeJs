var socket = io();


  /**
 * Liste des utilisateurs connectés
 */
var users = [];
var users2 =[];

/**
 * Connexion d'un utilisateur
 */
$('#login form').submit(function (e) {
  e.preventDefault();
  var user = {
    username :  $('#m').val().trim()
  };
  if (user.username.length > 0 && user.username ==! $.inArray(users)) { // Si le champ de connexion n'est pas vide
    socket.emit('user-login', user);
     $('body').removeAttr('id'); // Cache formulaire de connexion
    //$('#chat input').focus();  Focus sur le champ du message
    users.push(user);
    console.log(users);   
  }
});








