class Api::V1::CarriersController < ApplicationController
    def index
      render json: Carrier.all
    end
  
    def create
      carrier = Carrier.create(carrier_params)
      render json: carrier
    end
  
    def destroy
      Carrier.destroy(params[:id])
    end
  
    def update
      carrier = Carrier.find(params[:id])
      carrier.update_attributes(carrier_params)
      render json: carrier
    end
  
    private
  
    def carrier_params
      params.require(:carrier).permit(:id, :name, :description)
    end
  end