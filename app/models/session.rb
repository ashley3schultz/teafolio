class Session < ApplicationRecord
  validates :username, presence: true, message: "Username can't be blank"
  validates :password, presence: true, message: "Password can't be blank"
end
