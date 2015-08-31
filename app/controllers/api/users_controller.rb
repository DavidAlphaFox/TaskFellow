class Api::UsersController < ApplicationController
  def index
    # somehow this increases the execution time?
    @users = User.all
    render "index"
  end

  def show
    @user = User.find(params[:id])
    render "show"
  end

  def update
    @user = User.find(params[:id])

    if @user.update!(user_params)
      render "show"
    else
      render :json => { error: @user.errors.full_messages }, status: :unproccessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :name, :age, :gender, :about_me, :hometown)
  end

end
