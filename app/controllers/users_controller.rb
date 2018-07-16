class UsersController < ApplicationController

    #before_action :require_login, only: [:show, :logout]

    def new
        @user = User.new
        render :signup
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

    def show
        @user = User.find(params[:id])
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

    def set_user
      @user ||= User.find(params[:id])
    end

    def require_login
        return head(:forbidden) unless session.include? :user_id
    end

end
