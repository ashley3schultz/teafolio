class PostsController < ApplicationController
    before_action :find_post, only: [:update, :edit, :destroy]
    before_action :lo_redirector


    def create
      @post = Post.create(post_params)
      redirect_to "/teas/#{params[:tea_id]}"
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
