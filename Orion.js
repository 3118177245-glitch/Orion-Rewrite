/*
 * Orion Rewrite
 * Version: 1.0.0
 * Author: 3118177245-glitch
 * Project: Orion-Rewrite
 * Compatible:
 *   - Mihomo
 *   - Clash Mi
 *   - FiClash
 *   - Clash Meta
 */

function main(config) {
  console.log("Orion Rewrite v1.0.0");

  if (!config) return {};

  // 确保配置存在
  config.proxies = config.proxies || [];
  config["proxy-groups"] = config["proxy-groups"] || [];
  config.rules = config.rules || [];

  // 这里以后会添加更多功能

  return config;
}