class TeaSerializer < ActiveModel::Serializer
  attributes :id, :name, :aka, :oxidation, :description, :posts
  has_many :posts, serializer: PostSerializer
end
