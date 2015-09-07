TaskFellow.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  events: {
    "click .delete-board-button": "deleteBoard"
  },

  initialize: function () {
    // remove CollectionView pattern and implement CompositeView pattern
    // this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItem);
    this.listenTo(this.collection, "remove", this.removeIndexItem);
    this.collection.each(this.addIndexItem.bind(this));
  },

  addIndexItem: function (model) {
    var subview = new TaskFellow.Views.BoardIndexItem({ model: model });
    this.addSubview('.boards', subview);
  },

  removeIndexItem: function (model) {
    this.removeModelSubview('.boards', model);
  },

  render: function () {
    // remove CollectionView pattern and implement CompositeView pattern
    // this.$el.html(this.template({ collection: this.collection }))
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  deleteBoard: function (e) {
    e.preventDefault();
    bootbox.confirm("Are you sure you would like to delete the board?", function (result) {
      if (result === false) {

      } else {
        var target = $(e.currentTarget);
        var id = target.data('id');
        var board = this.collection.getOrFetch(id);
        board.destroy();
      }
    }.bind(this));
  }
});
