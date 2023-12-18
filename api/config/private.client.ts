import axios, { AxiosRequestHeaders } from "axios";

interface User {
  accessToken: string;
  // Add other properties as needed
}

const baseURL = "https://be-phone-eu7f.onrender.com/";

// Check if user information is available in localStorage
let user: User | null = null;

try {
  if (typeof window !== "undefined") {
    const userD = localStorage.getItem("user");
    if (userD) {
      user = JSON.parse(userD) as User;
    }
  }
} catch (error) {
  console.error(
    "Error accessing or parsing user information from localStorage:",
    error
  );
}

const privateClient = axios.create({
  baseURL,
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken || ""}`,
    } as AxiosRequestHeaders,
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default privateClient;
