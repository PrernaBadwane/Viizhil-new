import AsyncStorage from "@react-native-async-storage/async-storage";
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

  export const getAddressById = async (addressId: number) => {
    try {
      const response = await ApiClient.get(`list_api_services?table_name=viewaddress&filter_field_1=Id&filter_condition_1=eq&filter_value_1=${ addressId}`);
      return response.data.data[0];
    } catch (error) {
      console.error(`API Error fetching address ${addressId}:`, error);
      throw error;
    }
  };

  export const getProductsInfo = async (selectedCategoryType:number,selectedCategory:number,selectedSubCategory:number) => {
    try {
      const tokenWithString = await AsyncStorage.getItem("accessToken");
    const token = tokenWithString!.replace(/^"|"$/g, "");
      const response = await ApiClient.get(
        `/sp_View_ShopItem?Limit=10&Offset=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response;
    } catch (error) {
      console.error(`API Error fetching :`, error);
      throw error;
    }
  };
  