var socket = io();

/**
 * champ de saisie des messages
 */
$('#login form').submit(function(e) {
    e.preventDefault(); // On évite le recharchement de la page lors de la validation du formulaire
    // On crée notre objet JSON correspondant à notre message
    var message = {
        text : $('#u').val()
    }

    $('#u').val(''); // On vide le champ texte
    if (message.text.length !== 0) { // Gestion message vide
      socket.emit('chat-message', message);
     console.log(message)
    }
    $('#chat input').focus(); // Focus sur le champ du message

});
/**
 * Réception d'un message
 */
socket.on('chat-message', function (message) {
	switch(message.version){
		case 2:
			$('#messages').append($('<li>').html('<span class="username">' + message.username + '</span> ' + message.text));
			break;

		default:
			$('#messages').append($('<li>').html(message.text));
  			break;	
	}
	scrollToBottom();
});

/**
 * Réception d'un message de service
 */
socket.on('service-message', function (message) {  
    $('#messages').append($('<li class="' + message.type + '">').html('<span class="info">information</span> ' + message.text));
     scrollToBottom();
});


/**
* Scroll vers le bas de page si l'utilisateur n'est pas remonté pour lire d'anciens messages
*/
function scrollToBottom() {  
if ($(window).scrollTop() + $(window).height() + 2 * $('#messages li').last().outerHeight() >= $(document).height()) {
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
}
}