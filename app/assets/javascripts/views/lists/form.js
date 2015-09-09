TaskFellow.Views.ListForm = Backbone.View.extend({
  template: JST['lists/form'],

  events: {
    'click .new-list-form-button': 'submitForm',
    'click .add-list-link': 'showListForm',
    'blur .add-list-input': 'hideListFormHelper'
  },

  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.model, 'sync', this.render);
  },

  showListForm: function (e) {
    e.preventDefault();
    this.$('.add-list-link').addClass('clicked');
    this.$('.new-list-form').addClass('clicked');
    this.$('.add-list-input').focus();
  },

  hideListFormHelper: function (e) {
    setTimeout(function () { this.hideListForm.call(this, e) }.bind(this), 200);
  },

  hideListForm: function (e) {
    e.preventDefault();
    this.$('.add-list-link').removeClass('clicked');
    this.$('.new-list-form').removeClass('clicked');
    this.$('.add-list-input').val("");
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
    var newList = new TaskFellow.Models.List();
    newList.save(formData, {
      success: function () {
        view.board.lists().add(newList);
        // Backbone.history.navigate("#/boards/" + view.board.id, { trigger: true });
      }
    });
  }
});
