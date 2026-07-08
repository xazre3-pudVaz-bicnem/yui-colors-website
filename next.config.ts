import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 親ディレクトリにも lockfile があるため、ワークスペースのルートを明示する
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
