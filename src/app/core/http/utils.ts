

/*

import { createHmac } from "crypto-browserify";
import { Buffer } from "buffer";

export const getSignature = (data: string, key: string): string => {
  return createHmac("sha256", key).update(data).digest("hex");
};

export const getSignatureData = (
  message: string,
  timestamp: number
): string => {
  return Buffer.from(message).toString("base64") + timestamp;
};
*/