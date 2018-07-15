class CreateUserTeas < ActiveRecord::Migration[5.2]
  def change
    create_table :user_teas do |t|
      t.integer :user_id
      t.integer :tea_id
      t.timestamps
    end
  end
end
