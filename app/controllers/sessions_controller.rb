class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_creds(params[:user][:username], params[:user][:password])
    if @user
      login!(@user)
      redirect_to '#'
    else
      flash.now[:errors] = ["Invalid login credentials"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
