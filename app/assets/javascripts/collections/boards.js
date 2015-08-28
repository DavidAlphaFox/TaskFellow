TrelloApp.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: TrelloApp.Models.Board,

  getOrFetch: function (board_id) {
    var board = this.get(board_id);
    var boards = this;
    if (!board) {
      board = new TrelloApp.Models.Board({ id: board_id });
      boards.add(board);
      board.fetch({
        error: function () {
          boards.remove(board);
        }
      });
    } else {
      board.fetch();
    }
    return board;
  }
});
