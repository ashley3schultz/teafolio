class User < ApplicationRecord
    has_many :user_teas
    has_many :teas, through: :user_teas
    has_many :posts
    has_many :pending_teas

    has_secure_password

    validates :username, :email, presence: true
    validates :username, :email, uniqueness: true, :on => :create
    validates :password, length: { minimum: 7 }, :on => :create
    validates :password, presence: true, :on => :create

    def friends
        friends = []
        posts.each do |post|
            post.tea.posts.each do |p| 
                friends << p.user if p.user != self
            end
        end
        friends.uniq
    end

end
