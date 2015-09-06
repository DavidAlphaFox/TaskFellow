TrelloApp.Views.CardModal = Backbone.View.extend({
	template: JST['cards/card_modal'],
	className: 'modal-container',

	events: {
		'click .modal-background': 'remove',
		'click .close': 'removeModal',
		'click .card-title-link': 'focusInput',
		'blur .card-title-input': 'hideInput',
		'submit .edit-card-form': 'submitForm',
	},

	initialize: function(options) {
		this.listenTo(this.model, 'sync', this.render);
		$(document).on('keyup', this.handleKey.bind(this));
	},

	removeModal: function (e) {
		e.preventDefault();
		this.remove();
	},

	focusInput: function (e) {
		e.preventDefault();
		this.$('.card-title-input').addClass('show');
		this.$('.card-title-input').select();
		this.$('.card-title-save-button').addClass('show');
		this.$('.card-title-link').addClass('hide');
		this.$('.card-title-input').focus();
	},

	hideInput: function (e) {
		e.preventDefault();
		this.$('.card-title-input').removeClass('show');
		this.$('.card-title-save-button').removeClass('show');
		this.$('.card-title-link').removeClass('hide');
	},

	submitForm: function (e) {
		e.preventDefault();
		var formData = $(e.currentTarget).serializeJSON();
		this.model.save(formData, {
			success: function (response, response_models, message) {
		        bootbox.alert("Your card was successfully edited");
			},
			error: function (response, messages) {
				debugger
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