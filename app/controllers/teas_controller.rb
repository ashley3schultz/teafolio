class TeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]

    def index
        @teas = Tea.all
    end

    def new
        @tea = PendingTea.new
    end

    def create
        @tea = PendingTea.new(tea_params)
        if @tea.save
          redirect_to pending_teas_path
        else
          render :new
        end
    end

    def show
    end

    def edit
    end

    def update
        @tea.update(tea_params)
    end

    def destroy
        @tea.destroy
    end

    def find_tea
        @tea = Tea.find(params[:id])
    end

    private

        def tea_params
            params.require(:tea).permit(:name, :aka, :oxidation, :description)
        end

end
