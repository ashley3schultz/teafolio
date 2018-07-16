class ApplicationController < ActionController::Base

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def valid_owner?(obj)
    obj.user_id == current_user.id
  end

end
