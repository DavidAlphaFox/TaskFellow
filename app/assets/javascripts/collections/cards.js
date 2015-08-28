TrelloApp.Collections.Cards = Backbone.Collection.extend({
  model: TrelloApp.Models.Card,
  url: "api/cards",

  initialize: function (models, options) {
    this.list = options.list;
  }
});
