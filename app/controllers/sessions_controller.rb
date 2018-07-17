class SessionsController < ApplicationController
  before_action :lo_director, except: [:new, :create]
  before_action :li_director, only: [:new, :create]

  def new
    render :login
  end

  def create
     @user = User.find_by(username: params[:user][:username])
     #binding.pry  
     if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      render :login
    end
  end

  def logout
      session.clear
      redirect_to login_path
  end
end
