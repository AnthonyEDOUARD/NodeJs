var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

http.listen(8080, function(){
    console.log('Server is listening on *:8080');
  });

io.on('connection', function (socket) {
    /**
     * Utilisateur connecté à la socket
     */
    var loggedUser;
  
    /**
     * Log de connexion et de déconnexion des utilisateurs
     */
    console.log('un utilisateur est connecté');
  
    /**
   * Connexion d'un utilisateur via le formulaire :
   */
  socket.on('user-login', function (user, callback) {
    // Vérification que l'utilisateur n'existe pas
    var userIndex = -1;
    for (i = 0; i < users.length; i++) {
      if (users[i].username === user.username) {
        userIndex = i;
      }
    }
    console.log(user);
    if (user !== undefined && userIndex === -1) { // S'il est bien nouveau
      // Sauvegarde de l'utilisateur et ajout à la liste des connectés
      loggedUser = user;
      users.push(loggedUser);
      // Envoi des messages de service
      var userServiceMessage = {
        text: 'You logged in as "' + loggedUser.username + '"',
        type: 'login'
      };
      var broadcastedServiceMessage = {
        text: 'User "' + loggedUser.username + '" logged in',
        type: 'login'
      };
      socket.emit('service-message', userServiceMessage);
      socket.broadcast.emit('service-message', broadcastedServiceMessage);
      // Emission de 'user-login' et appel du callback
      io.emit('user-login', loggedUser);
      callback(true);
    } else {
      callback(false);
    }
  });

    /**
     * Connexion d'un utilisateur via le formulaire :
     *  - sauvegarde du user
     *  - broadcast d'un 'service-message'
     
    socket.on('user-login', function (user) {
      loggedUser = user;
      console.log(user)
       if (loggedUser !== undefined) {
        console.log('utilisateur connecté : ' + loggedUser.username);
        var serviceMessage = {
          text: 'Votre Ami ' + loggedUser.username + ' est connecté(e)',
          type: login
        };
        console.log(serviceMessage)
        socket.broadcast.emit('service-message', serviceMessage);
      }
    });
  */
  
   /**
     * Déconnexion d'un utilisateur : broadcast d'un 'service-message'
     */
    socket.on('disconnect', function () {
      if (loggedUser !== undefined) {
        console.log('user disconnected : ' + loggedUser.username);
        var serviceMessage = {
          text: 'Votre Ami "' + loggedUser.username + '"est déconnecté(e)',
          type: 'logout'
        };
        socket.broadcast.emit('service-message', serviceMessage);
      }
      });
  
    /**
     * Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
     */
    socket.on('chat-message', function (message) {
      message.version=2;
      message.username = loggedUser.username; // On intègre ici le nom d'utilisateur au message
      io.emit('chat-message', message);
      // logging en console
      console.log('Message de ' + loggedUser.username +' : ' + message.text);
    });
});

app.get('/', function(req, res) { 
    res.render('home.ejs');
})
app.get('/admin', function(req, res) { 
    res.render('admin.ejs');
})
app.get('/client', function(req, res) { 
    res.render('client.ejs');
})
app.post('/client', function(req, res) { 
    res.redirect('chat.ejs',{user:req.submit.user.username});
})
app.get('/chat', function(req, res) { 
    res.render('chat.ejs');
})


// middleware pour application/x-www-form-urlencoded 
function loadFile(path,onSuccess,onError){
    fs.exists(path,function(exists){  
    if(!exists){
        onError(path);
    } else {
        fs.readFile(path, "utf8", function(err, data){
        if(err){
            onError(path);
        }else{
            onSuccess(path,data);
        }
        });
    }
    });
}; 