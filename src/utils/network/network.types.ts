import { type POST } from "./network.constants";

export type METHOD = typeof POST;

// NETWORK CONFIG TYPES
export interface NETWORK_CONFIG_OPTION {
  method: METHOD;
  headers?: object;
  body?: any;
}

export interface NETWORK_CONFIG {
  url: string;
  options: NETWORK_CONFIG_OPTION;
}
