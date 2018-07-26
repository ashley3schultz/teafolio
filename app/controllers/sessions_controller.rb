class SessionsController < ApplicationController
  before_action :lo_redirector, except: [:new, :create]
  before_action :li_redirector, only: [:new, :create]

  def new
    render :login
  end

  def create
     if auth = request.env["omniauth.auth"]
        @user = User.find_or_create_by_omniauth(auth)
        session[:user_id] = @user.id
        redirect_to root_path
    else
      @user = User.find_by(username: params[:user][:username])
      if @user && @user.authenticate(params[:user][:password])
        session[:user_id] = @user.id
        redirect_to root_path
      else
        @un_err = "Username can't be blank" if params[:user][:username].blank?
        @un_err = "Invalid Username" if @user.nil?
        params[:user][:password].blank? ? @pw_err = "Password can't be blank" : @pw_err = "Invalid password"
        render :login
      end
    end
  end

  def logout
      session.clear
      redirect_to login_path
  end
end
