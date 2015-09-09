TaskFellow.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  tagName: 'div',
  className: 'list-container',

  events: {
    'submit .new-card-form': 'newCard',
    'click .delete-list-button': 'deleteList',
    // 'mousedown .card': 'drag',
    // 'mouseup .card': 'drop',
    'click .add-card-link': 'showCardForm',
    'blur .add-card-input': 'hideCardFormHelper'
  },

  initialize: function(options) {
  	this.listenTo(this.model, 'sync', this.renderHelper);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);
    this.model.cards().each(this.addCard.bind(this));
    this.board = options.board;
  },

  addCard: function (model) {
  	var subview = new TaskFellow.Views.Card({ model: model, list: this.model });
  	this.addSubview('.cards', subview);
  },

  removeCard: function (model) {
  	this.removeModelSubview('.cards', model);
    // var view = this;
    // var cardOrder = [];
    // var listOrder = [];
    // $('.card').each( function (i, el) {
    //   cardOrder.push($(el).data('card-id'));
    //   listOrder.push($(el).parent().parent().data('list-id'));
    // });
    // cards = new TaskFellow.Collections.Cards();
    // cards.fetch({
    //   success: function () {
    //     cardOrder.forEach( function (el, i) {
    //       var card = cards.get(el);
    //         card.set({'ord': i + 1, 'list_id': listOrder[i] });
    //         card.save({}, {
    //           success: function (model, response, options) {
    //           },
    //           error: function (model, response, options) {
    //             debugger
    //           }
    //         });
    //     }.bind(this));
    //   }.bind(this)
    // });
  },

  newCard: function (e) {
    e.preventDefault();
    var view = this;
    var formData = $(e.currentTarget).serializeJSON();
    formData.card.list_id = this.model.id;
    if (this.model.cards().length - 1 === -1) {
      formData.card.ord = 1;
    } else {
      formData.card.ord = this.model.cards().at(this.model.cards().length - 1).get('ord') + 1;
    }
    var card = new TaskFellow.Models.Card();
    card.save(formData, {
      success: function (model, response, options) {
        view.model.cards().add(card);
      },
      error: function (model, response, options) {
        debugger
      }
    })
  },

  deleteList: function (e) {
    e.preventDefault();
    bootbox.confirm("Are you sure you would like to delete the list?", function (result) {
      if (result === false) {
      } else {
        this.model.destroy();
        bootbox.alert("Your list was successfully deleted");
      }
    }.bind(this));
  },

  // drag: function (e) {
  //   $(e.currentTarget).addClass('dragged');
  // },

  // drop: function (e) {
  //   $(e.currentTarget).removeClass('dragged');
  // },

  showCardForm: function (e) {
    e.preventDefault();
    this.$('.add-card-link').addClass('clicked');
    this.$('.new-card-form').addClass('clicked');
    this.$('.add-card-input').focus();
  },

  hideCardFormHelper: function (e) {
    setTimeout(function () { this.hideCardForm.call(this, e) }.bind(this), 200);
  },

  hideCardForm: function (e) {
    // e.preventDefault();
    this.$('.add-card-link').removeClass('clicked');
    this.$('.new-card-form').removeClass('clicked');
    this.$('.add-card-input').val("");
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.attachSubviews();
    this.onRender();
    return this;
  },

  renderHelper: function () {
    this.$el.html(this.template({ list: this.model }));
    this._subviews = {};
    this.model.cards().each(this.addCard.bind(this));
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function () {
    var view = this;
    // this adds the list id as a data attribute to this DOM element
    this.$el.data('list-id', this.model.id);

    $('.cards').sortable ({
      connectWith: ".cards",
      start: function (event, ui) {
        ui.item.addClass('dragged');
      },
      stop: function( event, ui ) {
        var cardOrder = [];
        var listOrder = [];
        $('.card').each( function (i, el) {
          cardOrder.push($(el).data('card-id'));
          listOrder.push($(el).parent().parent().data('list-id'));
        });
        cards = new TaskFellow.Collections.Cards();
        cards.fetch({
          success: function () {
            var counter = 1;
            var listId = listOrder[0];
            for (var i = 0; i < cardOrder.length; i++) {
              var card = cards.get(cardOrder[i]);
              // debugger
              card.set({'ord': i, 'list_id': listOrder[i] });
              card.save({}, {
                success: function (model, response, options) {
                  ui.item.removeClass('dragged');
                },
                error: function (model, response, options) {
                  debugger
                }
              });
            }
          }.bind(this)
        });
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
