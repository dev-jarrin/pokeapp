// api.js
import axios from "axios";
import Cookies from "js-cookie";

export const fetchPokemonData = async (offset) => {
  try {
    const csrfToken = Cookies.get("csrfToken");

    const response = await axios.get(
      `http://localhost:3001/get-pokemon?limit=20&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          csrfSecret: csrfToken,
        },
        withCredentials: true,
      }
    );
    console.log(response);

    console.log("data", response.data);
    return response.data.data.results;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const getCsrfToken = async () => {
  try {
    await axios.get("http://localhost:3001/api/csrf-token", {
      withCredentials: true,
    });
    const csrfToken = Cookies.get("csrfToken");

    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};
