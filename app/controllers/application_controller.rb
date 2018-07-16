class ApplicationController < ActionController::Base
  helper_method :current_user

  def home
    @posts = Post.all.limit(10)
    if current_user.admin == true
      @p_teas = PendingTea.all
      @users = User.all
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
