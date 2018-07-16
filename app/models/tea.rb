class Tea < ApplicationRecord
    has_many :user_teas
    has_many :users, through: :user_teas
    has_many :posts

    validates :name, presence: true
    validates :oxidation, presence: true
end
