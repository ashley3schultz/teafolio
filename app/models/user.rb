class User < ApplicationRecord
    has_many :user_teas
    has_many :teas, through: user_teas
    has_many :posts
    has_many :pending_teas
end
