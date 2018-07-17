class PostsController < ApplicationController
    before_action :lo_redirector
    before_action :na_redirector, only: [:index]

    def index
        @posts = Post.all
        redirect_to root_path
    end

    def new 
    end 

    def create 
    end 

    def edit 
    end 

    def update
    end 

    def destroy
    end 
    
end
