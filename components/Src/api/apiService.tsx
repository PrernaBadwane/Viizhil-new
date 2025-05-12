import { apiService } from "./apiBaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface ProductDataFromComponent {
  id: string; // Product's own ID (will be productId)
  quantity: string;
  shopId: string; // The ID of the shop
  price: string;
  discount: string; // for offerPercentage
}

interface ProfileFormData {
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  email: string;
  phonenumber: string;
  password: string;
  userType: string;
  signintype: string;
  createdBy: string;
  referrerId: string;
  isAdminUser: boolean;
  captainType: number;
  userRoleId?: number;
}
// login with opt(get otp)
// Working fine
export const login = async (phoneno: string) => {
  const formattedPhoneNo = typeof phoneno === "string" ? phoneno.slice(1) : "";

  const body = {
    phoneNo: formattedPhoneNo,
  };

  try {
    const response = await apiService.post("/api/Users/api/otpsignin", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("login API Error Status:", error.response.status);
      console.error("login API Error Data:", error.response.data);
      console.error("login API Error Headers:", error.response.headers);
    } else if (error.request) {
      console.error("login API No Response:", error.request);
    } else {
      console.error("login API Setup Error:", error.message);
    }
    console.error("login API Error Config:", error.config);
    throw error;
  }
};

// Working fine
export const phoneVerifyOtp = async (phoneno: string, otp: string) => {
  const body = {
    phoneNo: phoneno.slice(1),
    otp: otp,
    browser: "string",
    device: "string",
    address: "string",
    location_Lat: 0,
    location_Lang: 0,
    ip: "string",
    loggedInDateTime: "2025-04-07T23:09:17.778Z",
    devicetype: "string",
    etype: "ecom",
    referrerId: "string",
    captainType: 0,
  };
  try {
    const response = await apiService.post(
      "/api/Users/api/verifyotpsignin",
      body
    );
    return response.data;
  } catch (error) {
    // console.error('API Error:', error);
    throw error;
  }
};

// Working fine
export const createProfile = async (formdata: ProfileFormData) => {
  try {
    const body = {
      firstname: formdata.firstname,
      lastname: formdata.lastname,
      dob: formdata.dob,
      gender: formdata.gender,
      email: formdata.email,
      phonenumber: formdata.phonenumber.slice(1), // Remove '+' from phone number
      password: formdata.password,
      userType: formdata.userType,
      signintype: formdata.signintype,
      createdBy: formdata.createdBy,
      referrerId: formdata.referrerId,
      isAdminUser: formdata.isAdminUser,
      captainType: formdata.captainType,
    };
    const response = await apiService.post(
      "/api/Users/api/profilecreation",
      body
    );
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// Function to get the token
export const getAuthToken = async () => {
  try {
    const tokenWithString = await AsyncStorage.getItem("userToken");
    const token = tokenWithString!.replace(/^"|"$/g, "");
    return token;
  } catch (e) {
    console.error("Failed to fetch auth token from storage", e);
    return null;
  }
};

// Working fine
export const AddShop = async (formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const cleanToken = token!.replace(/^"|"$/g, "");

    const headers = {
      Authorization: `Bearer ${cleanToken}`,
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    };

    if (!token) {
      console.error("AddShop Error: Access token not found");
      throw new Error("Access token not found. Please log in again.");
    }

    const response = await axios.post(
      "https://api.vizhil.com/api/groceryshop/add",
      formData,
      {
        headers,
      }
    );

    console.log("Api hit");
    return response;
  } catch (error: any) {
    console.error(
      "AddShop API Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    const message =
      error.response?.data?.message || error.message || "Failed to add shop.";
    throw new Error(message);
  }
};

// Working fine
export const addAddress = async (addressData: any) => {
  try {
    const token = await getAuthToken();
    const response = await apiService.post("/api/address/add", addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
export const updateAddress = async (addressData: any) => {
  try {
    const token = await getAuthToken();
    const response = await apiService.put("/api/address/update", addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Working fine
export const updateShopDetails = async (formData: FormData) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const cleanToken = token!.replace(/^"|"$/g, "");

    const headers = {
      Authorization: `Bearer ${cleanToken}`,
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    };

    console.log(headers);

    if (!token) {
      console.error("update shop Error: Access token not found");
      throw new Error("Access token not found. Please log in again.");
    }

    const response = await axios.put(
      "https://api.vizhil.com/api/groceryshop/update",
      formData,
      {
        headers,
      }
    );

    console.log("Api hit");
    return response;
  } catch (error: any) {
    console.error(
      "updateShop API Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    const message =
      error.response?.data?.message || error.message || "Failed to add shop.";
    throw new Error(message);
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
    console.log("brand added sucesfilly");
    return Response.data;
  } catch (error) {
    console.log("brand added failed");
    console.error(error);
  }
};

// Working fine
export const BankDetailsVerify = async (
  shopId: number,
  ifscCode: string,
  accountNumber: string,
  createdBy: number
) => {
  const token = await getAuthToken();
  try {
    const response = await apiService.post(
      "/api/groceryshop/verifybankdetails",
      {
        shopId,
        ifscCode,
        accountNumber,
        createdBy,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response", response);
    return response.data;
  } catch (error: any) {
    console.error("BankDetailsVerify Error:", error);
    throw error;
  }
};

// GST Verification
// Working fine
export const verifyGst = async (shopId: number, gstNumber: string) => {
  try {
    const token = await getAuthToken();
    const body = {};
    console.log(body);
    const response = await apiService.post(
      "/api/groceryshop/verifygst",
      {
        shopId,
        gstNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error: any) {
    console.error(
      "GST Verification Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Working fine
export const addShopDocuments = async (formData: FormData) => {
  try {
    const response = await apiService.post(
      "/api/groceryshopdocument/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "AddShopDocuments API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// *****giving 404 error
export const updateShopDocument = async (formData: FormData) => {
  try {
    const response = await apiService.put(
      "/api/groceryshopdocument/update",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "updateShopDocument API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Verify phone number
// Not needed
export const phoneVerify = async (shopId: string, otpNo: string) => {
  try {
    const accessToken = await getAuthToken();
    const response = await apiService.post(
      "/api/groceryshop/verifyotp",
      {
        shopId,
        otpNo,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log("Response", response);
    return response.data;
  } catch (error: any) {
    console.error(
      "GST Verification Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Verify email
// Working fine
export const sendOtpOnEmail = async (id: number, emailId: string) => {
  try {
    const accessToken = await getAuthToken();
    const response = await apiService.post(
      "/api/groceryshop/sendemailotp",
      {
        shopId: id,
        emailId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log("Response", response);
    return response.data;
  } catch (error: any) {
    console.error(
      "GST Verification Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Verify email
// Working fine
export const emailVerify = async (shopId: number, otpNo: number) => {
  console.log(shopId, otpNo, "hello from email otp");
  try {
    const accessToken = await getAuthToken();
    const response = await apiService.post(
      "/api/groceryshop/verifyemailotp",
      {
        shopId,
        otpNo,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // console.log("Response", response);
    return response.data;
  } catch (error: any) {
    console.error(
      "GST Verification Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Working fine for adding address id
export const updateShopDetailsForAddress = async (shopdata: any) => {
  const token = await getAuthToken();
  try {
    const Response = await apiService.put("/api/groceryshop/update", shopdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-Type": "multipart/form-data",
      },
    });
    return Response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addProduct = async (productData: any): Promise<any> => {
  try {
    const accessToken = await getAuthToken();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await apiService.post("/api/shopitem/add", productData, {
      headers,
    });

    console.log("API response for adding product:", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
