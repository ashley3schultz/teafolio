class SessionsController < ApplicationController

  def new
    render :login
  end

  def create
     @user = User.find_by(username: params[:username])
     if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      redirect_to login_path
    end
  end

  def logout
      session.clear
      redirect_to login_path
  end
end
