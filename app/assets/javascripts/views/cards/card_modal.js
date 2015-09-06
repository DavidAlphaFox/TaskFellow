TrelloApp.Views.CardModal = Backbone.View.extend({
	template: JST['cards/card_modal'],
	className: 'modal-container',

	events: {
		'click .modal-background': 'remove',
		'click .close': 'removeModal',
		'click .card-title-link': 'focusTitleInput',
		'blur .card-title-input': 'hideTitleInput',
		'click .card-description-link': 'focusDescriptionInput',
		'blur .card-description-input': 'hideDescriptionInput',
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

	focusTitleInput: function (e) {
		e.preventDefault();
		this.$('.card-title-input').addClass('show');
		this.$('.card-title-input').select();
		this.$('.card-title-save-button').addClass('show');
		this.$('.card-title-link').addClass('hide');
		this.$('.card-title-input').focus();
	},

	hideTitleInput: function (e) {
		e.preventDefault();
		this.$('.card-title-input').removeClass('show');
		this.$('.card-title-save-button').removeClass('show');
		this.$('.card-title-link').removeClass('hide');
	},

	focusDescriptionInput: function (e) {
		e.preventDefault();
		this.$('.card-description-input').addClass('show');
		this.$('.card-description-input').select();
		this.$('.card-description-save-button').addClass('show');
		this.$('.card-description-link').addClass('hide');
		this.$('.card-description-input').focus();
	},

	hideDescriptionInput: function (e) {
		e.preventDefault();
		this.$('.card-description-input').removeClass('show');
		this.$('.card-description-save-button').removeClass('show');
		this.$('.card-description-link').removeClass('hide');
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