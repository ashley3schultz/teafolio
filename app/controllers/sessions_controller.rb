class SessionsController < ApplicationController
  before_action :lo_redirector, except: [:new, :create]
  before_action :li_redirector, only: [:new, :create]

  def new
    render :login
  end

  def create
     @user = User.find_by(username: params[:user][:username])
     if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to root_path
    else
      @un_err = "Username can't be blank" if params[:user][:username].blank?
      @pw_err = "Password can't be blank" if params[:user][:password].blank?
      render :login
    end
  end

  def logout
      session.clear
      redirect_to login_path
  end
end
