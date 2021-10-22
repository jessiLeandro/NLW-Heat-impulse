defmodule HeatTags.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:message) do
      add :email, :string
      add :message, :string
      add :username, :string
      
      timestamps()
    end
  end
end
