// YOUR CODE HERE:


var app = {};
app.init = function(){
  app.server ='https://api.parse.com/1/classes/chatterbox';
  

};

var friends = [];

app.send = function(message){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

};

var messages = {};

app.fetch = function(){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message fetched');
      messages = data;
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message');
    }
  });  
}



var escapeHtml = function (string) {
 
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}



app.addMessage = function(){
  for(var i = 0; i < messages.results.length; i++){
    var username = escapeHtml(messages.results[i].username);
    var currentMessage = escapeHtml(messages.results[i].text)
    $("#chats").append("<div class='block'><div class='username'><strong>"+username+"</div></strong><br><div class='comments'>"+currentMessage+"</div></div>")
  }
};

app.clearMessages = function(){
  $("#chats").empty();
};

app.addRoom = function(roomname) {
  $("#roomSelect").append("<option value ='"+roomname+"'>"+roomname+"</option>");
};

app.addFriend = function(){

}


app.handleSubmit = function(user, text, room) {
  var toSend = {
    username: user,
    text: text,
    roomname: room
  };

  app.send(toSend);
}


var message = {
username: 'team KI',
text: "message",
roomname: 'floor 8'
};

app.send(message);
app.fetch();

$( document ).ready(function() {
  setInterval(function(){
    app.fetch();
    app.clearMessages();
    app.addMessage();
  },1000)

  $(".username").click(function(){
    console.log("hey");
    friends.push(this);
  });


  $('#submit').click(function(e){

    e.preventDefault();
    var user = $('#name').val();
    var text = $('#msg').val();
    var room = $('#roomSelect :selected').text();
    $('#msg').val("");
    $('#name').val("");
    app.handleSubmit(user, text, room);
  });




});




