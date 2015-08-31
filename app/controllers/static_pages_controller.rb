class StaticPagesController < ApplicationController
  before_action :redirect_if_not_logged_in

  def index

  end
end
