class UserTeasController < ApplicationController

    def rate 
        @row = UserTea.find_by(tea_id: params[:tea_id], user_id: current_user.id)
        if @row
            @row.update(rating: params[:id])
        end 
        redirect_to tea_path(@row.tea)
    end 
end 