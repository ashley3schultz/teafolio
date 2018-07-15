class User < ApplicationRecord
    has_many :user_teas
    has_many :teas, through: :user_teas
    has_many :posts
    has_many :pending_teas

    validates :username, :email, presence: true
    validates :username, :email, uniqueness: true
    validates :password, length: { minimum: 7 }
    #validates :email, inclusion: { in: ['@', '.'] }
end
