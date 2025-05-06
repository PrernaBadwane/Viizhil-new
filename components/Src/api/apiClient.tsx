import { ApiClient } from "./apiBaseUrl";

export const getShop = async (userId:number,shopId:number) => {
    try {
      const response = await ApiClient.get(`/sp_View_GroceryShop?id=${shopId}`, {
             params: { UserId: `${userId}` },
           });
      // Return the JSON data from the server's response
      return response;
    } catch (error: any) {
      // Log detailed error info
      console.error(
        "AddShop API Error:",
        error.response?.status, // Log status code
        error.response?.data || error.message // Log server message or general error
      );
      throw error;
    }
  };