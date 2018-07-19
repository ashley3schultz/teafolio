class UsersController < ApplicationController
    before_action :lo_redirector, except: [:new, :create]
    before_action :li_redirector, only: [:create]
    before_action :na_redirector, only: [:index]

    def index 
        @users = User.all
    end 

    def new
        if params[:tea_id]
            current_user.teas << Tea.find_by(id: params[:tea_id])
            current_user.save
            redirect_to root_path 
        else 
            @user = User.new
            render :signup
        end
    end

    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else
            render :signup
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
end
