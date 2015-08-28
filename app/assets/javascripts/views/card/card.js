TrelloApp.Views.Card = Backbone.View.extend({
  template: JST['card/card'],
  tagName: 'div',

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  }
});
