class PendingTea < ApplicationRecord
    belongs_to :user


    validates :name, presence: true
    validates :oxidation, presence: true
end
