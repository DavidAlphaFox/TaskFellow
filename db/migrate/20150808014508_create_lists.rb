class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :board_id, null: false
      t.string :title, null: false
      t.integer :ord, null: false
      t.timestamps null: false
    end
  end
end
