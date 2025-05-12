import axios, { AxiosInstance } from "axios";
import { GROCERY_BASEURL } from "./Url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_BASE_URL = "https://api.vizhil.com/";

const apiService: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    token ? prom.resolve(token) : prom.reject(error);
  });
  failedQueue = [];
};

const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const token = refreshToken!.replace(/^"|"$/g, "");
  const phoneNo = await AsyncStorage.getItem("phoneNo");

  if (!refreshToken || !phoneNo) {
    throw new Error("Missing refresh token or user data");
  }

  try {
    const { data } = await axios.post(`${API_BASE_URL}api/Users/refreshtoken`, {
      accessToken: token,
      emailid: "",
      phonenumber: phoneNo,
    });
    console.log(data, "data");

    if (!data?.message) throw new Error("No new access token returned");

    // await AsyncStorage.setItem("accessToken", data.message);
    // await AsyncStorage.setItem("tokenExpiryDateTime", data.expiryDateTime);

    return data.message;
  } catch (err) {
    console.error("Token refresh failed:", err);
    throw err;
  }
};

const convertTo24HourFormat = (time: any) => {
  let [hour, minute, second] = time.split(":");
  let period = second.slice(-2); // Extract AM/PM
  second = second.slice(0, 2); // Get the seconds value

  // Convert to 24-hour time
  if (period === "PM" && hour !== "12") {
    hour = String(Number(hour) + 12); // Convert PM times to 24-hour format (except for 12 PM)
  }
  if (period === "AM" && hour === "12") {
    hour = "00"; // Convert 12 AM to 00
  }

  return `${hour}:${minute}:${second}`; // Return time in 24-hour format
};

const getCurrentFormattedDate = async () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const hours12 = hours % 12 || 12;

  return `${year}-${month}-${day} ${hours12
    .toString()
    .padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
};

const isTokenExpired = async (): Promise<boolean> => {
  const tokenExpiryDateTime = await AsyncStorage.getItem("tokenExpiryDateTime");
  if (!tokenExpiryDateTime) return true;

  const [date, time] = tokenExpiryDateTime.split(" ");
  const formattedTime = convertTo24HourFormat(time);
  const formattedDateTime = `${date}T${formattedTime}`;
  const expiryTime = new Date(formattedDateTime).getTime();

  const currentFormatDate = await getCurrentFormattedDate();
  const [date2, time2] = currentFormatDate.split(" ");
  const currentFormattedTime = convertTo24HourFormat(time2);
  const currentFormattedDateTime = `${date2}T${currentFormattedTime}`;
  const currentTime = new Date(currentFormattedDateTime).getTime();
  return expiryTime <= currentTime;
};

apiService.interceptors.request.use(
  async (config) => {
    if (await isTokenExpired()) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          processQueue(null, newToken);
        } catch (err) {
          processQueue(err, null);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If another request is already refreshing, wait
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          config.headers["Authorization"] = `Bearer ${newToken}`;
          return config;
        });
      }
    }

    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const ApiClient = axios.create({
  baseURL: GROCERY_BASEURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiService, ApiClient };
