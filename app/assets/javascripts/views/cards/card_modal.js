TrelloApp.Views.CardModal = Backbone.View.extend({
	template: JST['cards/card_modal'],
	className: 'modal-container',

	events: {
		'click .modal-background': 'remove',
		'click .close': 'removeModal',
		'click .form-submit-button': 'submitForm'
	},

	initialize: function(options) {
		this.listenTo(this.model, 'sync', this.render);
		$(document).on('keyup', this.handleKey.bind(this));
	},

	removeModal: function (e) {
		e.preventDefault();
		this.remove();
	},

	handleKey: function (e) {
		if (e.keyCode === 27) {
			this.remove();
		}
	},

	render: function () {
		this.$el.html(this.template({ card: this.model }));
		return this;
	}
});