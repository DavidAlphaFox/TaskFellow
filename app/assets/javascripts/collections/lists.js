TrelloApp.Collections.Lists = Backbone.Collection.extend({
  model: TrelloApp.Models.List,
  url: "/api/lists",

  initialize: function (models, options) {
    this.board = options.board;
  }
});
