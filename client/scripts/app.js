// YOUR CODE HERE:
var app = {};
app.init = function(){
  app.server ='https://api.parse.com/1/classes/chatterbox';
  

};
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

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}



app.addMessage = function(){
  for(var i = 0; i < messages.results.length; i++){
    var username = escapeHtml(messages.results[i].username);
    var currentMessage = escapeHtml(messages.results[i].text)
    $("#chats").append("<div class='comments'><strong>"+username+"</strong><br>"+currentMessage+"</div>")
  }
};

app.clearMessages = function(){
  $("#chats").empty();
};

app.addRoom = function(roomname) {
  $("#roomSelect").append("<option value ='"+roomname+"'>"+roomname+"</option>");
};


var message = {
  username: 'team KI',
  text: "message",
  roomname: 'floor 8'
};

app.send(message);
app.fetch();

setInterval(function(){
  app.fetch();
  app.addMessage();
},1000)
