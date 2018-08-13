class PostUserSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :posts, serializer: PostSerializer
end
