class UserTeasController < ApplicationController

  def rate
    @row = UserTea.find_by(tea_id: params[:tea_id], user_id: current_user.id)
    if @row
      @row.update(rating: params[:id])
    end
    tea = @row.tea
    respond_to do |format|
      format.json { render json: tea}
      format.html { redirect_to tea_path(tea) }
    end
  end

end
