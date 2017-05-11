class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  def create
    @contact = Contact.new(contact_params)
  end

  private

  def contact_params
    params.require(:contact).permit(:first)
  end
end
