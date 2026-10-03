import { networkInterfaces } from "node:os";

// Allow this machine's IPv4 addresses when opening the dev server over the LAN.
const localAddresses = Object.values(networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .filter((address) => address.family === "IPv4")
  .map((address) => address.address);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [...new Set(localAddresses)],
};

export default nextConfig;
