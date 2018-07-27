class UserTea < ApplicationRecord
    belongs_to :user
    belongs_to :tea
    validates :rating, inclusion: {in: (0..5)}
end
