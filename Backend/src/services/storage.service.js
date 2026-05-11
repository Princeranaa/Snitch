import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";
import { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: config.PRIVATE_KEY,
});

export const uploadFile = async (buffer, filename, folder = "Snitch") => {
  const resulte = await client.files.upload({
    file: await toFile(buffer, filename),
    fileName: filename,
    folder,
  });
  return resulte.url; // return the url...
};

export default client;
