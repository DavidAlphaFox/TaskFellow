TaskFellow.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	initialize: function (options) {
		if (options && options.comment) {
			this.comment = options.comment;
		}
	}
});