window.TrelloApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TrelloApp.Routers.Router({ $el: $('#content') });
    Backbone.history.start();
  }
};
