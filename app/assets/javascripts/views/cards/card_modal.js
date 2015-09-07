TaskFellow.Views.CardModal = Backbone.CompositeView.extend({
	template: JST['cards/card_modal'],
	className: 'modal-container',

	events: {
		'click .modal-background': 'remove',
		'click .close': 'removeModal',
		'click .card-title-link': 'focusTitleInput',
		'blur .card-title-input': 'hideTitleInputHelper',
		'click .card-description-link': 'focusDescriptionInput',
		'blur .card-description-input': 'hideDescriptionInputHelper',
		'submit .edit-card-form': 'submitCardForm',
		'submit .edit-card-description-form': 'submitCardForm',
		'submit .comment-form': 'submitCommentForm'
	},

	initialize: function(options) {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.comments(), 'add', this.addComment);
		this.listenTo(this.model.comments(), 'remove', this.removeComment);
		this.model.comments().each(this.addComment.bind(this));
		$(document).on('keyup', this.handleKey.bind(this));
	},

	addComment: function (model) {
		var subview = new TaskFellow.Views.Comment({ model: model, card: this.model });
		this.addSubview('.comments-container', subview);
	},

	removeComment: function (model) {
		this.removeModelSubview('.comments-container', model);
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

	hideTitleInputHelper: function (e) {
		setTimeout(function () { this.hideTitleInput.call(this, e) }.bind(this), 200);
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

	hideDescriptionInputHelper: function (e) {
		setTimeout(function () { this.hideDescriptionInput.call(this, e) }.bind(this), 200);
	},

	submitCardForm: function (e) {
		e.preventDefault();
		var formData = $(e.currentTarget).serializeJSON();
		this.model.save(formData, {
			success: function (model, response, options) {
		        bootbox.alert("Your card was successfully edited");
			},
			error: function (model, response, options) {
				debugger
			}
		});
	},

	submitCommentForm: function (e) {
		e.preventDefault();
		var view = this;
		var formData = $(e.currentTarget).serializeJSON();
		formData.comment.card_id = this.model.id;
		var comment = new TaskFellow.Models.Comment({ card: this.model });
		comment.save(formData, {
			success: function (model, response, options) {
				view.model.comments().add(comment);
				bootbox.alert("Your comment was successfully submitted");
			},
			error: function (model, response, options) {
				debugger
			}
		})
	},

	handleKey: function (e) {
		if (e.keyCode === 27) {
			this.remove();
		}
	},

	render: function () {
		this.$el.html(this.template({ card: this.model }));
		this.attachSubviews();
		return this;
	}
});