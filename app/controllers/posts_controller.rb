class PostsController < ApplicationController

    def new
    end

    def create
      binding.pry
      @post = Post.create(post_params)
      redirect_to "/teas/#{params[:tea_id]}"
    end

    def edit
    end

    def update
    end

    def destroy
    end

    private

    def post_params
      params.require(:post).permit(:cuntent, :user_id, :tea_id)
    end

end
