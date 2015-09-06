TrelloApp.Collections.Comments = Backbone.Collection.extend({
  model: TrelloApp.Models.Comment,
  url: "/api/comments",
  // comparator: "ord",

  initialize: function (models, options) {
  	if (options && options.card) {
	    this.card = options.card;
  	}
  },

  getOrFetch: function (id) {
  	var comment = this.get(id);
  	var comments = this;
  	if (!comment) {
  	  comment = new TrelloApp.Models.Comment({ id: id });
  	  comment.fetch({
  	  	success: function () {
  	  	  comments.add(comment);
  	  	}
  	  });
  	} else {
  	  comment.fetch();
  	}

  	return comment;
  }
});
