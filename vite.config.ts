import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    mdx({
       remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },

      ssr: false,
      basename: '/weblog/',
      buildEnd(args) {
        if(!args.viteConfig.isProduction) return
        const buildPath = args.viteConfig.build.outDir
        copyFileSync(
          join(buildPath, 'index.html'),
          join(buildPath, '404.html')
        )
      }
    }),
  ],
  resolve: {
    alias: {
      '~': '/app',
    }
  },
  base: '/weblog/',
});
