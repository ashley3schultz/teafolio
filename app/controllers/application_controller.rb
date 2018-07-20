class ApplicationController < ActionController::Base
  helper_method :current_user, :set_ph, :set_value, :owner?, :logged_in?

  def home
    if logged_in?
      @posts = Post.where.not(user_id: "#{current_user.id}")
      if admin?
        @p_teas = PendingTea.all
        @users = User.all!current_user
        @teas = Tea.all
        render :admin
      else
        @p_teas = PendingTea.all
        @users = User.all
        render :home
      end
    else
      render :welcome
    end
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def owner?(obj)
    logged_in? && obj.user_id == current_user.id
  end

  def admin?
    logged_in? && current_user.admin == true
  end

  def lo_redirector
    if !logged_in?
      render :welcome
    end
  end

  def li_redirector
    if logged_in?
      redirect_to root_path
    end
  end

  def na_redirector
    if !admin?
      redirect_to root_path
    end
  end

  def set_ph(attr, obj)
    if obj.nil?
      attr.capitalize
    else
      "#{attr.capitalize} #{obj.errors[:"#{attr}"].first}" || attr.capitalize
    end
  end

  def set_value(attr, obj)
    if !obj.errors[:"#{attr}"].empty?
      ""
    else
      obj[:"#{attr}"] || ""
    end
  end

end
