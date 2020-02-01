class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :user, foreign_key: true, uniq: true
      t.timestamp :event_at
      t.text :content

      t.timestamps
    end
  end
end
