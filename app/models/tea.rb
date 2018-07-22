class Tea < ApplicationRecord
    has_many :user_teas
    has_many :users, through: :user_teas
    has_many :posts

    validates :name, presence: true
    validates :oxidation, presence: true

    def self.by_oxidation
      teas = {}
      teas[:Black] = where(oxidation: 'Black')
      teas[:Green] = where(oxidation: 'Green')
      teas[:Oolong] = where(oxidation: 'Oolong')
      teas[:Puerh] = where(oxidation: 'Puerh')
      teas[:White] = where(oxidation: 'White')
      teas[:Yellow] = where(oxidation: 'Yellow')
      teas
    end

    def name_post_count
        aka.nil? ? "#{name} (#{posts.size})" : "#{name}, AKA: #{aka} (#{posts.size})"
    end

    def klass
      'teas'
    end

    def rating(user)
      UserTea.find_by(tea_id: self.id, user_id: user.id ).rating
    end 
end
