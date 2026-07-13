/*
 * Orion Rewrite
 * Version: 1.0.0
 * Author: 3118177245-glitch
 * Compatible:
 *   - Mihomo
 *   - Clash Mi
 *   - FiClash
 */

function main(config) {
  if (!config) return {};

  config.proxies = config.proxies || [];
  config["proxy-groups"] = config["proxy-groups"] || [];
  config.rules = config.rules || [];

  const proxyNames = config.proxies.map(p => p.name);
  const groupNames = config["proxy-groups"].map(g => g.name);

  function addGroup(group) {
    if (!groupNames.includes(group.name)) {
      config["proxy-groups"].push(group);
    }
  }

  // 自动选择
  addGroup({
    name: "♻️ 自动选择",
    type: "url-test",
    url: "https://www.gstatic.com/generate_204",
    interval: 300,
    tolerance: 50,
    proxies: proxyNames
  });

  // 节点选择
  addGroup({
    name: "🚀 节点选择",
    type: "select",
    proxies: ["♻️ 自动选择", "DIRECT", ...proxyNames]
  });

  // AI
  addGroup({
    name: "🤖 AI",
    type: "select",
    proxies: ["🚀 节点选择", "♻️ 自动选择", "DIRECT"]
  });

  // 流媒体
  addGroup({
    name: "🎬 流媒体",
    type: "select",
    proxies: ["🚀 节点选择", "♻️ 自动选择", "DIRECT"]
  });

  // Telegram
  addGroup({
    name: "📱 Telegram",
    type: "select",
    proxies: ["🚀 节点选择", "DIRECT"]
  });

  // GitHub
  addGroup({
    name: "🐙 GitHub",
    type: "select",
    proxies: ["🚀 节点选择", "DIRECT"]
  });

  // Apple
  addGroup({
    name: "🍎 Apple",
    type: "select",
    proxies: ["DIRECT", "🚀 节点选择"]
  });

  // 添加规则（避免重复）
  const rules = [
    "DOMAIN-SUFFIX,chatgpt.com,🤖 AI",
    "DOMAIN-SUFFIX,openai.com,🤖 AI",
    "DOMAIN-SUFFIX,oaistatic.com,🤖 AI",
    "DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI",

    "DOMAIN-SUFFIX,claude.ai,🤖 AI",
    "DOMAIN-SUFFIX,anthropic.com,🤖 AI",

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

  for (const rule of rules) {
    if (!config.rules.includes(rule)) {
      config.rules.push(rule);
    }
  }

  return config;
}