class TeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]

    def index 
        @teas = Tea.all
    end 

    def new
        @tea = PendingTea.new
    end

    def create 
        raise "create"
        @tea = Tea.create(tea_params)
        redirect_to eanding_teas_path
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
