class ApplicationController < ActionController::Base

  def home
    if current_user.admin == true
      rendor :admin
    else
      rendor :home
    end
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def valid_owner?(obj)
    logged_in? && obj.user_id == current_user.id
  end

end
