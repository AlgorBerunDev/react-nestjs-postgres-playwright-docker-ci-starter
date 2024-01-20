import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const config = defineConfig({
  plugins: [pluginReact()],
});

export default { ...config, dev: { client: { port: 80 } } };
