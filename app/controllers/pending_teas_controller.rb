class PendingTeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]
    before_action :lo_director

    def index
      @teas = PendingTea.all
    end

    def create
      @tea = PendingTea.new(tea_params)
      if @tea.save
        redirect_to pending_teas_path
      else
        render :'teas/new'
      end
    end

    def show
    end

    def edit
    end

    def update
    end

    def destroy
    end

    private

        def find_tea
            @tea = Tea.find(params[:id])
        end

        def tea_params
            params.require(:pending_teas).permit(:name, :aka, :oxidation, :description, :user_id)
        end

end
