class Tea < ApplicationRecord
    has_many :user_teas
    has_many :users, through: :user_teas
    has_many :posts

    validates :name, presence: true
    validates :oxidation, presence: true

    def name_post_count
        aka.nil? ? "#{name} (#{posts.size})" : "#{name}, AKA: #{aka} (#{posts.size})"
    end 
end
