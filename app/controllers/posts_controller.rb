class PostsController < ApplicationController
    before_action :lo_director

    def index
        @posts = Post.all 
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
