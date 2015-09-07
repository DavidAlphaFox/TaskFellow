TaskFellow.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],
  className: 'board-index-item',

  

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    return this;
  }
});
