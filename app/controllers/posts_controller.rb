class PostsController < ApplicationController
    before_action :find_post, only: [:update, :edit, :destroy, :show]
    before_action :lo_redirector
    before_action :na_redirector, only: [:index]

    def owner
      post = Post.find(params[:post_id])
      a = owner?(post)
      respond_to do |format|
        format.json { render json: a }
        format.html { redirect_to tea_path(tea) }
      end
    end

    def show
      respond_to do |format|
        format.json { render json: @post, status: 201}
        format.html { redirect_to tea_path(@post.tea) }
      end
    end

    def index
      @posts = Post.all
    end

    def create
      @tea = Tea.find(params[:post][:tea_id])
      @new_post = Post.new(post_params)
      @user = current_user
      if @new_post.save
        @new_post.user.add_contribution
      else
      end
      respond_to do |format|
        format.json { render json: @new_post, status: 201}
        format.html { render :'teas/show'}
      end
    end

    def edit
      @new_post = Post.new
      @tea = Tea.find(params[:tea_id])
      @user = current_user
      if owner?(@post)
        @edit_post = @post
      end
      respond_to do |format|
        format.json { render json: @edit_post, status: 201}
        format.html { render :'teas/show'}
      end
    end

    def update
      @post.update(content: params[:post][:content])
      respond_to do |format|
        format.json { render json: @post, status: 201}
        format.html { redirect_to root_path }
      end
    end

    def destroy
      if owner?(@post) || admin?
        @post.destroy
      end
      respond_to do |format|
        format.json {  render json: true }
        format.html { redirect_to root_path }
      end
    end

    private

    def find_post
        @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:content, :user_id, :tea_id)
    end

end
