import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const handleResponse = (response: any) => {
  if (response.data && response.data.success) {
    return response.data;
  }
  return {
    success: false,
    message: response.data.error || "Un error has occurred.",
  };
};

export const getFunctionMesh = (body: any) => {
  if (!body || !body.function) {
    return new Promise((resolve, reject) => reject);
  }

  if (body.function.includes("y")) {
    return get3DGraphMesh(body);
  } else {
    return get2DGraphMesh(body);
  }
};

export const get2DGraphMesh = async (body: any) => {
  try {
    const response = await axiosInstance.post("/function/2d", body);
    return handleResponse(response);
  } catch (error) {
    return { success: false, message: error };
  }
};

export const get3DGraphMesh = async (body: any) => {
  try {
    const response = await axiosInstance.post("/function/3d", body);
    return handleResponse(response);
  } catch (error) {
    return { success: false, message: error };
  }
};
