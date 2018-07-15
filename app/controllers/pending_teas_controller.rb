class PendingTeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]

    def index 
    end 

    def create 
        @tea = PendingTea.new(tea_params)
        if @tea.save
            redirect_to pending_tea_path(@tea)
        else 
            redirect_to new_tea_path
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

    def find_tea
        @tea = Tea.find(params[:id])
    end 

    private 

        def tea_params
            params.require(:pending_tea).permit(:name, :aka, :oxidation, :description)
        end 
    
end
