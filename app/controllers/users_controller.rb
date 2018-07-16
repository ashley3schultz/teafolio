class UsersController < ApplicationController

    before_action :require_login

    def signup
        @user = User.new
    end

    def create
      #binding.pry
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else
            redirect_to '/signup'
        end
    end

    def login
        # @user.find_by(username: params[:username])
        # if @user && @user.authenticate(params[:password])
        #     session[:user_id] = @user.id
        #     redirect_to user_path(@user)
        # else
        #     redirect_to login_path
        # end
    end

    def logout
        session.clear
        redirect_to '/'
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
