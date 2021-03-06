class UsersController < ApplicationController
    before_action :lo_redirector, except: [:new, :create]
    before_action :li_redirector, only: [:new, :create]
    before_action :na_redirector, only: [:index, :update]

    def index
        @users = User.where.not(id: current_user.id)
    end

    def new
        @user = User.new
        render :signup
    end

    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            redirect_to root_path
        else
            render :signup
        end
    end

    def show
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if @user.admin == true
            @user.update(admin: false)
        else
            @user.update(admin: true)
        end
        respond_to do |format|
          format.json {render json: @user, status: 201}
          format.html {redirect_to root_path}
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

    def set_user
      @user ||= User.find(params[:id])
    end
end
