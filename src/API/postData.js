// import serverInfo from "../constants/serverInfo";
import Cookies from "js-cookie";

const host = "http://localhost:4000";

async function postData(url, data) {
  url = `${host}${url}`;
  console.log(url);
  console.log(data);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt_token")}`,
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    if (!response.ok) {
      return {
        success: false,
        errorCode: 0,
        message: "HTTP Request Failed",
      };
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return {
      success: false,
      errorCode: 0,
      message: "HTTP Request Failed",
    };
    throw error; // Rethrow the error to handle it further if needed
  }
}

export default postData;
