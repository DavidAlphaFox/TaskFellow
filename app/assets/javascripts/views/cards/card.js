TrelloApp.Views.Card = Backbone.CompositeView.extend({
  template: JST['cards/card'],
  tagName: 'div',
  className: 'card',

  events: {
  	'click .delete-card-button': 'deleteCard'
  },

  deleteCard: function (e) {
  	e.preventDefault();
  	this.model.destroy();
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  }
});
