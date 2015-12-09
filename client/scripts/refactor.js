var Message = Backbone.Model.extend({

  url: 'https://api.parse.com/1/classes/chatterbox'



});

var Messages = Backbone.Collection.extend({

  url: 'https://api.parse.com/1/classes/chatterbox',

  model: Message,

  loadMsgs: function(){
    this.fetch({data: { order: '-createdAt' }});
  },

  parse: function(response, options){
    return response.results;
  }


});

var MessageView = Backbone.View.extend({

  template: _.template('<div class="chat" data-id="<%- objectId %>""> \
                        <div class="user"><%- username %></div> \
                        <div class="text"><%- text %></div> \
                        </div>'),

  render: function(){
    return this.template(this.model.attributes);
  }

});

var MessagesView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('sync', this.render, this);
  },

  render: function(){
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage: function(message){
    var messageView = new MessageView({model: message});
    var $html = messageView.render();
    $('#chats').prepend($html);
  }

});

