TrelloApp.Collections.Users = Backbone.Collection.extend({
	model: TrelloApp.Models.Card,
	url: "/api/cards",

	initialize: function () {

	},

	getOrFetch: function (id) {
		var user = this.get(id);
		var users = this;
		if (!user) {
			user = new TrelloApp.Models.user({ id: id });
			user.fetch({
				success: function () {
				  users.add(user);
				}
			});
		} else {
			user.fetch();
		}

		return user;
	}	
});