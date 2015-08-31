TrelloApp.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/new": "boardNew",
    "boards/:board_id/edit": "boardEdit",
    "boards/:board_id": "boardShow",
    "lists/:list_id": "listEdit"
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.collection = options.collection || new TrelloApp.Collections.Boards();
  },

  boardIndex: function () {
    this.collection.fetch();
    var view = new TrelloApp.Views.BoardIndex({ collection: this.collection });
    this._swapview(view);
    this._navbar();
  },

  boardNew: function () {
    var board = new TrelloApp.Models.Board();
    var view = new TrelloApp.Views.BoardForm({ model: board, collection: this.collection });
    // this._swapview(view);
    this._navbar();
  },

  boardShow: function (board_id) {
    var board = this.collection.getOrFetch(board_id);
    var view = new TrelloApp.Views.BoardShow({ model: board });
    this._swapview(view);
    this._navbar();
  },

  boardEdit: function (board_id) {
    var board = this.collection.getOrFetch(board_id);
    var view = new TrelloApp.Views.BoardForm({ model: board, collection: this.collection });
    this._swapview(view);
    this._navbar();
  },

  _swapview: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$el.html(this._view.$el);
    this._view.render();
  },

  _navbar: function () {
    var user = new TrelloApp.Models.User({ id: window.current_user_id });
    user.fetch();
    var navbar = new TrelloApp.Views.Navbar({ model: user, collection: this.collection });
    this.$el.prepend(navbar.render().$el);
  }
});
