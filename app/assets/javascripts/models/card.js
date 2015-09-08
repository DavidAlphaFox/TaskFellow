TaskFellow.Models.Card = Backbone.Model.extend({
  urlRoot: "/api/cards",

  initialize: function (options) {
    if (options && options.list) {
      this.list = options.list;
    }
  },

  comments: function () {
  	if (!this._comments) {
  	  this._comments = new TaskFellow.Collections.Comments([], { card: this });
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
