class TeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]

    def index 
        @teas = Tea.all
    end 

    def new
        @tea = Tea.new
    end

    def create 
        @tea = Tea.new 

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
            params.require(:tea).permit(:name, :aka, :oxidation, :description)
        end 
    
end
