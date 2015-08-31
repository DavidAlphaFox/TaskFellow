TrelloApp.Views.Card = Backbone.CompositeView.extend({
  template: JST['cards/card'],
  tagName: 'div',
  className: 'card',

  events: {
  	'click .delete-card-button': 'deleteCard',
    'click .card-link': 'showCardModal'
  },

  initialize: function (options) {
  },

  deleteCard: function (e) {
  	e.preventDefault();
    bootbox.confirm("Are you sure you would like to delete the card?", function (result) {
      if (result === false) {
      } else {
        this.model.destroy();
        bootbox.alert("Your card was successfully deleted");
      }
    }.bind(this));
  },

  showCardModal: function (e) {
    e.preventDefault();
    modal = new TrelloApp.Views.CardModal({ model: this.model });
    this.$el.prepend(modal.render().$el);
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  },

  onRender: function () {
    this.$el.data('card-id', this.model.id);
  }
});
