TaskFellow.Views.Comment = Backbone.View.extend({
	template: JST['comments/comment'],
	tagName: 'div',
	className: 'comments',

	events: {
		'click .edit-link': 'showCommentForm',
		'click .delete-link': 'deleteComment',
		'blur .edit-comment-textarea': 'hideCommentFormHelper',
		'submit .edit-comment-form': 'submitCommentForm'
	},

	initialize: function (options) {
		this.card = options.card;
		this.listenTo(this.model, 'sync', this.render);
	},

	showCommentForm: function (e) {
		e.preventDefault();
		this.$('.comment-content').addClass('hide');
		this.$('.edit-comment-textarea').addClass('show');
		this.$('.edit-comment-submit-button').addClass('show');
		this.$('.comment-info').addClass('hide');
		this.$('.edit-comment-textarea').focus();
	},

	deleteComment: function (e) {
		e.preventDefault();
		this.model.destroy();
	},

	hideCommentForm: function (e) {
		e.preventDefault();
		this.$('.comment-content').removeClass('hide');
		this.$('.edit-comment-textarea').removeClass('show');
		this.$('.edit-comment-submit-button').removeClass('show');
		this.$('.comment-info').removeClass('hide');
	},

	hideCommentFormHelper: function (e) {
		setTimeout(function () { this.hideCommentForm.call(this, e); }.bind(this), 200);
	},

	submitCommentForm: function (e) {
		e.preventDefault();
		var formData = $(e.currentTarget).serializeJSON();
		this.model.save(formData, {
			success: function (model, response, options) {
				bootbox.alert("Your comment was successfully saved");
			},
			error: function (model, response, options) {
				debugger
			}
		})
	},

	render: function () {
		this.$el.html(this.template({ comment: this.model }));
		this.onRender();
		return this;
	},

	onRender: function () {

	}
});