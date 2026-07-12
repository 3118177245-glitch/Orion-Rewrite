/*
 * Orion Rewrite
 * Version: 1.0.1
 * Author: 3118177245-glitch
 * Project: Orion-Rewrite
 */

function main(config) {
  if (!config) return {};

  config.proxies = config.proxies || [];
  config["proxy-groups"] = config["proxy-groups"] || [];
  config.rules = config.rules || [];

  // 获取所有节点名称
  const proxyNames = config.proxies.map(p => p.name);

  // 创建策略组
  const groups = [
    {
      name: "🚀 全球加速",
      type: "select",
      proxies: ["♻️ 自动选择", "🎯 直连", ...proxyNames]
    },
    {
      name: "♻️ 自动选择",
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: proxyNames
    },
    {
      name: "🎯 直连",
      type: "select",
      proxies: ["DIRECT"]
    },
    {
      name: "🤖 AI",
      type: "select",
      proxies: ["🚀 全球加速", "♻️ 自动选择", "🎯 直连"]
    }
  ];

  config["proxy-groups"].push(...groups);

  return config;
}