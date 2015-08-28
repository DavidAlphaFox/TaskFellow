TrelloApp.Views.List = Backbone.View.extend({
  template: JST['list/list'],
  tagName: 'div',

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    return this;
  }
});
