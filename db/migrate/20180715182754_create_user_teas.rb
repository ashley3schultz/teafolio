class CreateUserTeas < ActiveRecord::Migration[5.2]
  def change
    create_table :user_teas do |t|
      t.string :user_id
      t.string :tea_id

      t.timestamps
    end
  end
end
