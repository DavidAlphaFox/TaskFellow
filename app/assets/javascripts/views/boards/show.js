TrelloApp.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],
  tagName: 'div',
  className: 'board',

  events: {
    'click .delete-list-button': 'deleteList'
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
    var subview = new TrelloApp.Views.List({ model: model });
    this.addSubview('.lists-container', subview);
  },

  removeList: function (model) {
    this.removeModelSubview('.lists-container', model);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function () {
    $('.lists-container').sortable({
      stop: function( event, ui ) {
        // event.preventDefault();
        var newOrder = [];
        $('.list-container').each( function (i, el) {
          newOrder.push($(el).data('list-id'));
        });
        var lists = this.model.lists();
        // newOrder.forEach( function (el, i) {
        //   var list = lists.get(el);
        //   list.set({'ord': i + 1});
        //   list.save({}, {
        //     success: function (response, response_models, message) {
        //       // debugger
        //       // Backbone.history.navigate("#/" + Backbone.history.fragment, { trigger: true });
        //       // window.location.reload();
        //     },
        //     error: function (response, message) {
        //       debugger
        //     }
        //   });
        // });
        for (i = 0; i < newOrder.length; i++) {
          var list = lists.get(newOrder[i]);
          list.save({ list: { ord: i + 1 } }, {
            success: function (response, response_models, message) {
              // debugger
              // Backbone.history.navigate("#/" + Backbone.history.fragment, { trigger: true });
              // window.location.reload();
            },
            error: function (response, message) {
              debugger
            }
          });
        }
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  renderListForm: function () {
    var list = new TrelloApp.Models.List();
    var view = new TrelloApp.Views.ListForm({ model: list, board: this.model });
    this.addSubview('div.list-form', view);
  },

  deleteBoard: function (e) {
    var target = $(e.currentTarget);
    var id = target.data('id');
    var list = this.lists().get(id);
    list.destroy();
  }
});
