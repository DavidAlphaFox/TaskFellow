TrelloApp.Views.CardModal = Backbone.View.extend({
	template: JST['cards/card_modal'],
	className: 'modal-container',

	events: {
		'click .modal-background': 'remove',
		'click .close': 'removeModal',
		'submit .edit-card-form': 'submitForm'
	},

	initialize: function(options) {
		this.listenTo(this.model, 'sync', this.render);
		$(document).on('keyup', this.handleKey.bind(this));
	},

	removeModal: function (e) {
		e.preventDefault();
		this.remove();
	},

	submitForm: function (e) {
		e.preventDefault();
		var formData = $(e.currentTarget).serializeJSON();
		this.model.save(formData, {
			success: function (response, response_models, message) {
				bootbox
			},
			error: function (response, messages) {

			}
		});
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