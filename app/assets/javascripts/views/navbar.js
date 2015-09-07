TaskFellow.Views.Navbar = Backbone.View.extend({
	template: JST['navbar'],
	tagName: 'nav',
	className: 'navbar navbar-default navbar-solid',

	events: {

	},

	initialize: function () {
		this.listenTo(this.model, 'sync change', this.render);
	},

	render: function () {
		this.$el.html(this.template({ user: this.model }));
		return this;
	}
})