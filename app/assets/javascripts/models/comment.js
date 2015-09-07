TaskFellow.Models.Comment = Backbone.Model.extend({
	urlRoot: "/api/comments",

	initialize: function (options) {
		if (options && options.card) {
			this.card = options.card;
		}
	},

	user: function () {
		if (!this._user) {
		  this._user = new TaskFellow.Models.User({ comment: this });
		}

		return this._user;
	},

	parse: function (response) {
		if (response.user) {
		    this.user().set(response.user);
		    delete response.user;
		}
		return response;
	}
});