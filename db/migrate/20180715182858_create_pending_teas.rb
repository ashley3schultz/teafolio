class CreatePendingTeas < ActiveRecord::Migration[5.2]
  def change
    create_table :pending_teas do |t|
      t.string :name
      t.string :aka
      t.string :oxidation
      t.string :description
      t.integer :user_id
      t.timestamps
    end
  end
end
