import axios from "axios";
import { apiService } from "./apiBaseUrl";

export const AddShop = async (shopdata: any) => {
  try {
    const Response = await apiService.post("/api/groceryshop/add", shopdata, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    return Response.data;
  } catch (error) {
    console.error(error);
  }
};

export const UpdateShop = async (shopdata: any) => {
  try {
    const Response = await apiService.put("/api/groceryshop/update", shopdata, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    });
    return Response.data;
  } catch (error) {
    console.error(error);
  }
};

export const AddBrand = async (branddata: any) => {
  try {
    const Response = await apiService.post("/api/grocerybrand/add", branddata);
    return Response.data;
  } catch (error) {
    console.error(error);
  }
};

export const UpdateBrand = async (branddata: any) => {
  try {
    const Response = await apiService.put(
      "/api/grocerybrand/update",
      branddata
    );
    return Response.data;
  } catch (error) {
    console.error(error);
  }
};

export const BankDetailsVerify = async (
  shopId: any,
  ifscCode: any,
  accountNumber: any,
  createdBy: any
) => {
  try {
    const response = await apiService.post(
      "/api/groceryshop/verifybankdetails?shopId=" +
        shopId +
        "&ifscCode=" +
        ifscCode +
        "&accountNumber=" +
        accountNumber +
        "&createdBy=" +
        createdBy
    );
    console.log("Response", response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


// GST Verification
export const VerificedGst = async (shopId: number, gstNumber: string) => {
  try {
    const response = await apiService.post(
      "/api/groceryshop/verifygst",
      {
        shopId,
        gstNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response", response);
    return response.data;
  } catch (error: any) {
    console.error(
      "GST Verification Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
