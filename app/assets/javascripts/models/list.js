TrelloApp.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",

  cards: function () {
  	if (!this._cards) {
  	  this._lists = new TrelloApp.Collections.Cards([], { list: this });
  	}

  	return this._cards;
  },

  parse: function () {
  	if (response.cards) {
	  this.cards().set(response.cards);
	  delete response.cards;
  	}
  	return response;
  }
});
