TrelloApp.Views.ListForm = Backbone.View.extend({
  template: JST['list/form'],

  events: {
    "click .new-list-form-button": "submitForm"
  },

  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ model: this.model, board: this.board }));
    return this;
  },

  submitForm: function (e) {
    e.preventDefault();
    var formData = $('.new-list-form').serializeJSON();
    formData.list.ord = this.board.lists().length + 1;
    formData.list.board_id = $(e.currentTarget).data('board-id');
    var view = this;
    this.model.save(formData, {
      success: function () {
        view.board.lists().add(view.list);
        Backbone.history.navigate("#/boards/" + view.board.id, { trigger: true });
      }
    });
  }
});
