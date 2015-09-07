window.TaskFellow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TaskFellow.Routers.Router({ $el: $('#content') });
    Backbone.history.start();
  }
};
