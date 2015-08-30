TrelloApp.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],
  tagName: 'li',

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    return this;
  }
});
