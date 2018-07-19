class PostsController < ApplicationController
    before_action :find_post, only: [:update, :edit, :destroy]
    before_action :lo_redirector

    def new
    end

    def create
      @post = Post.create(post_params)
      redirect_to "/teas/#{params[:tea_id]}"
    end

    def edit
    end

    def update
      @post.update(content: params[:content])
    end

    def destroy
      @post.destroy
    end

    private

    def find_post
        @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:content, :user_id, :tea_id)
    end

end
