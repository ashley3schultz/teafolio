class TeasController < ApplicationController
    before_action :find_tea, only: [:show, :update, :edit, :destroy, :add, :remove]
    before_action :admin?, only: [:create, :update, :edit, :destroy]
    before_action :lo_redirector


    def search
      @teas = Tea.where('description LIKE (?)', "%#{params[:id]}%")
      respond_to do |format|
        format.json { render json: @teas, status: 201}
        format.html { redirect_to teas_path }
      end
    end

    def index
      if params[:user_id]
        @teas = current_user.teas.by_oxidation
      else
        @teas = Tea.by_oxidation
      end
    end

    def add
      current_user.teas << @tea
      respond_to do |format|
        format.json { render json: @tea, status: 201}
        format.html { redirect_to teas_path }
      end
    end

    def remove
      UserTea.find_by(tea_id: params[:id], user_id: current_user.id).destroy
      respond_to do |format|
        format.json { render json: @tea, status: 201}
        format.html { redirect_to teas_path }
      end
    end


    def new
        @tea = PendingTea.new
        render :'pending_teas/new'
    end

    def create
      if admin?
        @tea = Tea.new(tea_params)
        if @tea.save
          p_tea = PendingTea.find_by(id: params[:tea][:id])
          p_tea.user.add_contribution
          p_tea.destroy
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
      respond_to do |format|
        format.json { render json: @tea}
        format.html { render :show }
      end
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

    private

        def find_tea
            @tea = Tea.find(params[:id])
        end

        def tea_params
            params.require(:tea).permit(:name, :aka, :oxidation, :description)
        end

end
