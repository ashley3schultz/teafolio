class TeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy]
    before_action :admin?, only: [:create, :update, :edit, :destroy]
    before_action :lo_redirector

    def index
        @teas = Tea.all
    end

    def add
        current_user.teas << Tea.find_by(id: params[:id])
        redirect_to root_path
    end

    def remove
        UserTea.find_by(tea_id: params[:id], user_id: current_user.id).destroy
        redirect_to root_path
    end


    def new
        @tea = PendingTea.new
        render :'pending_teas/new'
    end

    def create
      if admin?
        @tea = Tea.new(tea_params)
        if @tea.save
          PendingTea.find_by(id: params[:tea][:id]).destroy
          redirect_to pending_teas_path
        else
          @teas = PendingTea.all
          render :'pending_teas/index'
        end
      else
        redirect_to root_path
      end
    end

    def show
      @edit_post = Post.find(params[:post_id]) if params[:post_id]
      @new_post = Post.new
      @user = current_user
    end

    def edit
    end

    def update
        @tea.update(tea_params)
        redirect_to tea_path(@tea)
    end

    def destroy
        @tea.destroy
        redirect_to root_path
    end

    def find_tea
        @tea = Tea.find(params[:id])
    end

    private

        def tea_params
            params.require(:tea).permit(:name, :aka, :oxidation, :description)
        end

end
