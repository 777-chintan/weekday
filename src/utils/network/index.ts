import { POST } from "./network.constants";
import { NETWORK_CONFIG_OPTION } from "./network.types";

export const parseJSON = async (response: any) => {
  const json = await response.json();
  return json;
};

// to make API call use request
export const request = async (url: string, options = {}) => {
  return await new Promise<any>((resolve, reject) => {
    fetch(url, options)
      .then(async (response) => {
        const parsedResponse = await parseJSON(response);

        if (response.ok) {
          resolve(parsedResponse);
        }
        reject(parsedResponse);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// POST API CALL
export const post = async (url: string, options: NETWORK_CONFIG_OPTION) => {
  return await request(url, {
    ...options,
    headers: { ...options.headers },
    method: POST,
  });
};
