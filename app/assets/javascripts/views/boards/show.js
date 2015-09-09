TaskFellow.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  tagName: 'div',
  className: 'board',

  events: {
    // 'mousedown .list-container': 'drag',
    // 'mouseup .list-container': 'drop',
    'click .add-list-link': 'grayFormBackground',
    'blur .add-list-input': 'blueFormBackground'
  },

  initialize: function () {
    // replace CollectionView pattern with CompositeView pattern
    this.renderListForm();
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.lists(), 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);
    this.model.lists().each(this.addList.bind(this));
  },

  addList: function (model) {
    var subview = new TaskFellow.Views.List({ model: model, collection: this.model.lists() });
    this.addSubview('.lists-container', subview);
  },

  removeList: function (model) {
    this.removeModelSubview('.lists-container', model);
  },

  grayFormBackground: function (e) {
    e.preventDefault();
    this.$('.list-form-container').addClass('clicked');
  },

  blueFormBackground: function (e) {
    e.preventDefault();
    setTimeout(function () { this.$('.list-form-container').removeClass('clicked'); }.bind(this), 200);
  },

  // drag: function (e) {
  //   $(e.currentTarget).addClass('dragged');
  // },

  // drop: function (e) {
  //   $(e.currentTarget).removeClass('dragged');
  // },

  renderListForm: function () {
    var list = new TaskFellow.Models.List();
    var view = new TaskFellow.Views.ListForm({ model: list, board: this.model });
    this.addSubview('div.list-form-container', view);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function () {
    var view = this;
    $('.lists-container').sortable({
      start: function (event, ui) {
        ui.item.addClass('dragged');
      },
      stop: function( event, ui ) {
        var newOrder = [];
        // var cardOrder = [];
        // var listOrder = [];
        $('.list-container').each( function (i, el) {
          newOrder.push($(el).data('list-id'));
        });
        // $('.card').each( function (i, el) {
        //   cardOrder.push($(el).data('card-id'));
        //   listOrder.push($(el).parent().parent().data('list-id'));
        // });
        newOrder.forEach( function (el, i) {
          var list = this.model.lists().get(el);
          list.set({'ord': i + 1});
          list.save({}, {
            success: function (model, response, options) {
              ui.item.removeClass('dragged');
            }.bind(this),
            error: function (model, response, options) {
              debugger
            }
          });
        }.bind(this));
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
