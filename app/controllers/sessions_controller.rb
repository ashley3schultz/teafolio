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
      binding.pry
      render :login
    end
  end

  def logout
      session.clear
      redirect_to new_session_path
  end
end
