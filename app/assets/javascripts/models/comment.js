TrelloApp.Models.Comment = Backbone.Model.extend({
	urlRoot: "/api/comments",

	user: function () {
		if (!this._user) {
		  this._user = new TrelloApp.Models.User({ comment: this });
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