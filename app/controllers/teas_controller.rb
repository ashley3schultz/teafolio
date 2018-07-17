class TeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]
    before_action :admin?, except: [:index, :show]
    before_action :lo_director

    def index
        @teas = Tea.all
    end

    def new
        @tea = PendingTea.new
    end

    def create
        @tea = Tea.create(tea_params)
        redirect_to root_path
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


    private

        def find_tea
            @tea = Tea.find(params[:id])
        end

        def tea_params
            params.require(:tea).permit(:name, :aka, :oxidation, :description)
        end

end
