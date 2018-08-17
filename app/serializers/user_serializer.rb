class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :admin
  has_many :posts, serializer: PostSerializer
end
