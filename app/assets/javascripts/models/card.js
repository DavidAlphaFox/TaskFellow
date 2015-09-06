TrelloApp.Models.Card = Backbone.Model.extend({
  urlRoot: "/api/cards",

  comments: function () {
  	if (!this._comments) {
  	  this._comments = new TrelloApp.Collections.Comments([], { card: this });
  	}

  	return this._comments;
  },

  parse: function (response) {
  	if (response.comments) {
	    this.comments().set(response.comments, { parse: true });
	    delete response.comments;
  	}
  	return response;
  }
});
