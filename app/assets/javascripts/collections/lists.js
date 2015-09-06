TrelloApp.Collections.Lists = Backbone.Collection.extend({
  model: TrelloApp.Models.List,
  url: "/api/lists",
  comparator: "ord",

  initialize: function (models, options) {
  	if (options && options.board) {
  	  this.board = options.board;
  	}
  },

  getOrFetch: function (id) {
  	var list = this.get(id);
  	var lists = this;
  	if (!list) {
	  list = new TrelloApp.Models.list({ id: id });
	  list.fetch({
	  	success: function () {
	  	  lists.add(list);
	  	}
	  })
  	} else {
  	  list.fetch();
  	}

  	return list;
  }
});
