class AddFieldsToProject < ActiveRecord::Migration
  def change
    add_column :projects, :name, :string
    add_column :projects, :img_url, :string
    add_column :projects, :video_url, :string
    add_column :projects, :description, :string
  end
end
