class UsersController < ApplicationController

    def signup 
        @user = User.new
    end 

    def create
        @user = User.new(user_params)
        if @user.save 
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else 
            redirect_to '/signup'
        end
    end 

    def login
    end 

    def logout
    end 

    def create 
    end 

    def show
    end 

end
