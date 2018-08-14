class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user
  belongs_to :user, serializer: PostUserSerializer
end
