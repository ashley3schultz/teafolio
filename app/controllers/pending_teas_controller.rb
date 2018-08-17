class PendingTeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]
    before_action :lo_redirector
    before_action :na_redirector, only: [:index]

    def index
      @tea = Tea.new
      @teas = PendingTea.all
    end

    def create
      @tea = current_user.pending_teas.build(tea_params)
      if @tea.save
        redirect_to root_path
      else
        render :new
      end
    end

    def show
      if !owner?(@tea)
        redirect_to root_path
      else
        render :show
      end
    end

    def edit
      if !owner?(@tea)
        redirect_to root_path
      else
        render :edit
      end
    end

    def update
      if owner?(@tea)
        if @tea.update(tea_params)
          redirect_to root_path
        else
          render :edit
        end
      else
        redirect_to root_path
      end
    end

    def destroy
      if owner?(@tea) || admin?
        @tea.destroy
      end
      respond_to do |format|
        format.json { render json: true }
        format.html { redirect_to root_path }
      end
    end

    private

        def find_tea
            @tea = PendingTea.find(params[:id])
        end

        def tea_params
            params.require(:pending_tea).permit(:name, :aka, :oxidation, :description, :user_id)
        end

end
