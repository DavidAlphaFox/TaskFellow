TaskFellow.Views.BoardForm = Backbone.View.extend({
  template: JST['boards/form'],
  tagName: 'div',

  events: {
    "submit .new-board-form": "formHandler",
  },

  intitialize: function () {
  },

  render: function () {
    this.$el.html(this.template({ model: this.model }));
    return this;
  },

  formHandler: function (e) {
    e.preventDefault();
    var $form = $(e.currentTarget);
    var formData = $form.serializeJSON();
    var view = this;
    // if (!this.model.id) {
    this.model.save(formData, {
      success: function () {
        view.collection.add(view.model);
        Backbone.history.navigate("#/boards/" + view.model.id, { trigger: true });
      },
      error: function (model, response) {
        view.$('.errors').empty();
        response.responseJSON.forEach( function (error) {
          var $error = $('<li>').text(error);
          view.$('.errors').append($error);
        });
      }
    });
    // } else {
    //   this.model.save(formData, {
    //     success: function () {
    //       view.collection.getOrFetch(view.model.id);
    //       // view.collection.add(view.model, { merge: true });
    //       Backbone.history.navigate("#/boards/" + view.model.id, { trigger: true });
    //     },
    //     error: function (model, response) {
    //       view.$('.errors').empty();
    //       response.responseJSON.forEach( function (error) {
    //         var $error = $('<li>').text(error);
    //         view.$('.errors').append($error);
    //       });
    //     }
    //   });
    // }
  }
});
