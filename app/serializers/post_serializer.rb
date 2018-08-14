class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :tea
  belongs_to :user, serializer: PostUserSerializer
  belongs_to :tea, serializer: TeaSerializer
end
