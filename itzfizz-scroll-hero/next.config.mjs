// Static export so it can sit on GitHub Pages.
// On Pages the site lives under /<repo-name>, so the workflow sets the base path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
