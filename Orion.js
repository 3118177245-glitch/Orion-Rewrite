/*
 * Orion Rewrite
 * Version: 1.0.0
 * Author: 3118177245-glitch
 * Compatible:
 * - Mihomo
 * - Clash Mi
 * - FiClash
 */

function main(config) {
  if (!config) return {};

  const proxies = config.proxies || [];
  const proxyNames = proxies.map(p => p.name);

  config["proxy-groups"] = [
    {
      name: "🚀 节点选择",
      type: "select",
      proxies: ["♻️ 自动选择", "DIRECT", ...proxyNames]
    },
    {
      name: "♻️ 自动选择",
      type: "url-test",
      url: "https://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: proxyNames
    },
    {
      name: "🤖 AI",
      type: "select",
      proxies: ["🚀 节点选择", "♻️ 自动选择", "DIRECT"]
    },
    {
      name: "🎬 流媒体",
      type: "select",
      proxies: ["🚀 节点选择", "♻️ 自动选择", "DIRECT"]
    },
    {
      name: "📱 Telegram",
      type: "select",
      proxies: ["🚀 节点选择", "♻️ 自动选择", "DIRECT"]
    },
    {
      name: "🐙 GitHub",
      type: "select",
      proxies: ["🚀 节点选择", "DIRECT"]
    },
    {
      name: "🍎 Apple",
      type: "select",
      proxies: ["DIRECT", "🚀 节点选择"]
    }
  ];

  config.rules = [
    "DOMAIN-SUFFIX,chatgpt.com,🤖 AI",
    "DOMAIN-SUFFIX,openai.com,🤖 AI",
    "DOMAIN-SUFFIX,claude.ai,🤖 AI",
    "DOMAIN-SUFFIX,gemini.google.com,🤖 AI",

    "DOMAIN-SUFFIX,telegram.org,📱 Telegram",
    "DOMAIN-SUFFIX,t.me,📱 Telegram",

    "DOMAIN-SUFFIX,github.com,🐙 GitHub",
    "DOMAIN-SUFFIX,githubusercontent.com,🐙 GitHub",

    "DOMAIN-SUFFIX,apple.com,🍎 Apple",
    "DOMAIN-SUFFIX,icloud.com,🍎 Apple",

    "DOMAIN-SUFFIX,youtube.com,🎬 流媒体",
    "DOMAIN-SUFFIX,googlevideo.com,🎬 流媒体",
    "DOMAIN-SUFFIX,netflix.com,🎬 流媒体",

    "GEOIP,CN,DIRECT",
    "MATCH,🚀 节点选择"
  ];

  return config;
}