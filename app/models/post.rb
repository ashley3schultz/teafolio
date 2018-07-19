class Post < ApplicationRecord
    belongs_to :user
    belongs_to :tea

    validates :content, presence: true
end
