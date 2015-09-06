TrelloApp.Views.Comment = Backbone.View.extend({
	template: JST['comments/comment'],
	tagName: 'div',
	className: 'comments',

	events: {

	},

	initialize: function () {

	},

	render: function () {
		this.$el.html(this.template({ comment: this.model }));
		this.onRender();
		return this;
	},

	onRender: function () {

	}
});