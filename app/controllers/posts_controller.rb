class PostsController < ApplicationController
    before_action :find_post, only: [:update, :edit, :destroy]
    before_action :lo_redirector

    def create
      @tea = Tea.find(params[:post][:tea_id])
      @new_post = Post.new(post_params)
      @user = current_user
      if @new_post.save
        redirect_to tea_path(@tea)
      else 
        render :'teas/show'
      end
    end

    def edit
      @tea = Tea.find(params[:tea_id])
      redirect_to post_tea_path(@post, @tea)
    end

    def update
      @post.update(content: params[:post][:content])
      redirect_to root_path
    end

    def destroy
      @post.destroy
      redirect_to root_path
    end

    private

    def find_post
        @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:content, :user_id, :tea_id)
    end

end
