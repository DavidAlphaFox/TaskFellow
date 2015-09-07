TaskFellow.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: TaskFellow.Models.Board,

  getOrFetch: function (board_id) {
    var board = this.get(board_id);
    var boards = this;
    if (!board) {
      board = new TaskFellow.Models.Board({ id: board_id });
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
