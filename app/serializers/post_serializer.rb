class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :tea_id
  #belongs_to :tea
  #belongs_to :user
end
