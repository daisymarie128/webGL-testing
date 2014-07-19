class CreateThree < ActiveRecord::Migration
  def change
    create_table :threes do |t|
      t.string :name
      t.timestamps
    end
  end
end
