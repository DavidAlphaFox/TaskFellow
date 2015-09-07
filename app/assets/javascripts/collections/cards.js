TaskFellow.Collections.Cards = Backbone.Collection.extend({
  model: TaskFellow.Models.Card,
  url: "/api/cards",
  comparator: "ord",

  initialize: function (models, options) {
  	if (options && options.list) {
	    this.list = options.list;
  	}
  },

  getOrFetch: function (id) {
  	var card = this.get(id);
  	var cards = this;
  	if (!card) {
  	  card = new TaskFellow.Models.Card({ id: id });
  	  card.fetch({
  	  	success: function () {
  	  	  cards.add(card);
  	  	}
  	  });
  	} else {
  	  card.fetch();
  	}

  	return card;
  }
});
