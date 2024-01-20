import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const config = defineConfig({
  plugins: [pluginReact()],
});
console.log(config);
export default { ...config, dev: { client: { port: 80 } } };
