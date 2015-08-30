TrelloApp.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  tagName: 'div',
  className: 'list-container col-lg-4',

  events: {
    'submit .new-card-form': 'newCard'
  },

  initialize: function() {
  	this.listenTo(this.model, 'sync', this.render);
  	this.listenTo(this.model.cards(), 'add', this.addCard);
  	this.listenTo(this.model.cards(), 'remove', this.removeCard);
  	this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function(model) {
  	var subview = new TrelloApp.Views.Card({ model: model });
  	this.addSubview('.cards', subview);
  },

  removeCard: function (model) {
  	this.removeModelSubview('.cards', model);
  },

  newCard: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData.card.list_id = this.model.id;
    formData.card.ord = this.model.cards().length + 1;
    var card = new TrelloApp.Models.Card();
    card.save(formData, {
      success: function (response, response_models, message) {
        Backbone.history.navigate("#/" + Backbone.history.fragment, { trigger: true });
      },
      error: function (response, message) {
        debugger
      }
    })
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.onRender();
    return this;
  },

  onRender: function () {
    $('.cards').sortable(
      
    );
    // this adds the list id as a data attribute to this DOM element
    this.$el.data('list-id', this.model.id);
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
