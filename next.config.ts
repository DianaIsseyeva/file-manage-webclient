import type { NextConfig } from 'next';
import withTM from 'next-transpile-modules';
import type { Configuration, RuleSetRule } from 'webpack';

const withTMConfig = withTM(['apollo-upload-client']);

const nextConfig: NextConfig = withTMConfig({
  experimental: {
    esmExternals: true,
  },
  webpack: (config: Configuration) => {
    // Гарантируем, что config.module существует
    if (!config.module) {
      config.module = { rules: [] };
    }

    // Правило для файлов CSS из apollo-upload-client:
    const cssRule: RuleSetRule = {
      test: /\.css$/,
      // Применять правило только к файлам, путь которых содержит 'node_modules/apollo-upload-client'
      include: (filepath: string) => filepath.includes('node_modules/apollo-upload-client'),
      use: 'null-loader',
    };

    if (Array.isArray(config.module.rules)) {
      config.module.rules.push(cssRule);
    } else {
      config.module.rules = [cssRule];
    }

    // Гарантируем, что config.resolve и config.resolve.extensions существуют
    config.resolve = config.resolve || { extensions: [] };
    config.resolve.extensions = config.resolve.extensions || [];
    config.resolve.extensions.push('.mjs');

    return config;
  },
});

export default nextConfig;
