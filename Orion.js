/*
 * Orion Rewrite
 * Version: 2.0.0
 * Author: 3118177245-glitch
 * Compatible:
 *  - Mihomo
 *  - Clash Mi
 *  - FiClash
 */

const SETTINGS = {
  CLEAN_NAME: true,
  ADD_FLAG: true,
  REMOVE_DUPLICATES: true,

  AUTO_SORT: true,
  KEEP_DIRECT: true,

  URL_TEST: "https://cp.cloudflare.com/generate_204",
  TEST_INTERVAL: 180,
  TOLERANCE: 50
};

function main(config) {

  if (!config) return {};

  config.proxies = config.proxies || [];
  config["proxy-groups"] = config["proxy-groups"] || [];
  config.rules = config.rules || [];

  ProxyProcessor(config);

  GroupBuilder(config);

  RuleBuilder(config);

  return config;

}

/* =====================================
 * Proxy Processor
 * ===================================== */

function ProxyProcessor(config){

  const seen = new Set();

  const result = [];

  for (let proxy of config.proxies){

      proxy.name = normalizeName(proxy.name);

      if(SETTINGS.ADD_FLAG){

          proxy.name = addFlag(proxy.name);

      }

      if(
          SETTINGS.REMOVE_DUPLICATES &&
          seen.has(proxy.name)
      ){
          continue;
      }

      seen.add(proxy.name);

      result.push(proxy);

  }

  config.proxies = result;

}

/* =====================================
 * Name Cleaner
 * ===================================== */

function normalizeName(name){

    if(!SETTINGS.CLEAN_NAME)
        return name;

    return name

        .replace(/倍率.*$/ig,"")
        .replace(/剩余.*$/ig,"")
        .replace(/流量.*$/ig,"")
        .replace(/到期.*$/ig,"")
        .replace(/Expire.*$/ig,"")
        .replace(/套餐.*$/ig,"")
        .replace(/会员.*$/ig,"")
        .replace(/\|/g," ")
        .replace(/【.*?】/g,"")
        .replace(/\[.*?\]/g,"")
        .replace(/\(.*?\)/g,"")
        .replace(/\s+/g," ")
        .trim();

}

/* =====================================
 * Flag
 * ===================================== */

function addFlag(name){

    const n = name.toUpperCase();

    if(
        n.includes("HK") ||
        n.includes("香港")
    ){
        return "🇭🇰 " + removeEmoji(name);
    }

    if(
        n.includes("JP") ||
        n.includes("日本") ||
        n.includes("TOKYO")
    ){
        return "🇯🇵 " + removeEmoji(name);
    }

    if(
        n.includes("SG") ||
        n.includes("新加坡")
    ){
        return "🇸🇬 " + removeEmoji(name);
    }

    if(
        n.includes("US") ||
        n.includes("USA") ||
        n.includes("美国") ||
        n.includes("LOS ANGELES")
    ){
        return "🇺🇸 " + removeEmoji(name);
    }

    if(
        n.includes("TW") ||
        n.includes("台湾")
    ){
        return "🇹🇼 " + removeEmoji(name);
    }

    if(
        n.includes("KR") ||
        n.includes("韩国")
    ){
        return "🇰🇷 " + removeEmoji(name);
    }

    return "🌍 " + removeEmoji(name);

}

function removeEmoji(text){

    return text.replace(
        /[\u{1F300}-\u{1FAFF}]/gu,
        ""
    ).trim();

}

/* =====================================
 * Group Builder
 * Part2...
 * ===================================== */

function GroupBuilder(config) {

  const proxies = config.proxies.map(p => p.name);
  const groups = config["proxy-groups"];

  function byFlag(flag) {
    return proxies.filter(name => name.startsWith(flag));
  }

  function addGroup(group) {
    if (!groups.some(g => g.name === group.name)) {
      groups.push(group);
    }
  }

  // 地区节点
  const HK = byFlag("🇭🇰");
  const JP = byFlag("🇯🇵");
  const SG = byFlag("🇸🇬");
  const US = byFlag("🇺🇸");
  const TW = byFlag("🇹🇼");
  const KR = byFlag("🇰🇷");
  const OTHER = byFlag("🌍");

  // 自动测速
  addGroup({
    name: "♻️ 自动选择",
    type: "url-test",
    url: SETTINGS.URL_TEST,
    interval: SETTINGS.TEST_INTERVAL,
    tolerance: SETTINGS.TOLERANCE,
    lazy: true,
    proxies
  });

  // 主选择
  addGroup({
    name: "🚀 节点选择",
    type: "select",
    proxies: ["♻️ 自动选择", "DIRECT", ...proxies]
  });

  // 地区组
  const regionGroups = [
    ["🇭🇰 香港", HK],
    ["🇯🇵 日本", JP],
    ["🇸🇬 新加坡", SG],
    ["🇺🇸 美国", US],
    ["🇹🇼 台湾", TW],
    ["🇰🇷 韩国", KR],
    ["🌍 其它", OTHER]
  ];

  for (const [name, list] of regionGroups) {
    if (list.length === 0) continue;

    addGroup({
      name,
      type: "select",
      proxies: list
    });
  }

  // 服务分组
  [
    "🤖 AI",
    "🎬 Streaming",
    "🔍 Google",
    "🪟 Microsoft",
    "🍎 Apple",
    "🐙 GitHub",
    "📱 Telegram",
    "🎮 Gaming",
    "☁️ Cloud",
    "🐟 Final"
  ].forEach(name => {

    addGroup({
      name,
      type: "select",
      proxies: [
        "🚀 节点选择",
        "♻️ 自动选择",
        "DIRECT"
      ]
    });

  });

}

/* =====================================
 * Rule Builder
 * Part3...
 * ===================================== */

function RuleBuilder(config) {

  const rules = config.rules;

  function add(rule) {
    if (!rules.includes(rule)) {
      rules.push(rule);
    }
  }

  /* ========= AI ========= */

  [
    "DOMAIN-SUFFIX,chatgpt.com,🤖 AI",
    "DOMAIN-SUFFIX,openai.com,🤖 AI",
    "DOMAIN-SUFFIX,oaistatic.com,🤖 AI",
    "DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI",
    "DOMAIN-SUFFIX,anthropic.com,🤖 AI",
    "DOMAIN-SUFFIX,claude.ai,🤖 AI",
    "DOMAIN-SUFFIX,gemini.google.com,🤖 AI",
    "DOMAIN-SUFFIX,deepseek.com,🤖 AI",
    "DOMAIN-SUFFIX,perplexity.ai,🤖 AI",
    "DOMAIN-SUFFIX,cursor.sh,🤖 AI",
    "DOMAIN-SUFFIX,copilot.microsoft.com,🤖 AI",
    "DOMAIN-SUFFIX,x.ai,🤖 AI"
  ].forEach(add);

  /* ========= Streaming ========= */

  [
    "DOMAIN-SUFFIX,youtube.com,🎬 Streaming",
    "DOMAIN-SUFFIX,googlevideo.com,🎬 Streaming",
    "DOMAIN-SUFFIX,youtu.be,🎬 Streaming",
    "DOMAIN-SUFFIX,netflix.com,🎬 Streaming",
    "DOMAIN-SUFFIX,nflxvideo.net,🎬 Streaming",
    "DOMAIN-SUFFIX,disneyplus.com,🎬 Streaming",
    "DOMAIN-SUFFIX,dssott.com,🎬 Streaming",
    "DOMAIN-SUFFIX,primevideo.com,🎬 Streaming",
    "DOMAIN-SUFFIX,spotify.com,🎬 Streaming",
    "DOMAIN-SUFFIX,tiktok.com,🎬 Streaming"
  ].forEach(add);

  /* ========= Google ========= */

  [
    "DOMAIN-SUFFIX,google.com,🔍 Google",
    "DOMAIN-SUFFIX,gstatic.com,🔍 Google",
    "DOMAIN-SUFFIX,googleapis.com,🔍 Google"
  ].forEach(add);

  /* ========= Microsoft ========= */

  [
    "DOMAIN-SUFFIX,microsoft.com,🪟 Microsoft",
    "DOMAIN-SUFFIX,live.com,🪟 Microsoft",
    "DOMAIN-SUFFIX,office.com,🪟 Microsoft",
    "DOMAIN-SUFFIX,bing.com,🪟 Microsoft"
  ].forEach(add);

  /* ========= Apple ========= */

  [
    "DOMAIN-SUFFIX,apple.com,🍎 Apple",
    "DOMAIN-SUFFIX,icloud.com,🍎 Apple"
  ].forEach(add);

  /* ========= GitHub ========= */

  [
    "DOMAIN-SUFFIX,github.com,🐙 GitHub",
    "DOMAIN-SUFFIX,githubusercontent.com,🐙 GitHub"
  ].forEach(add);

  /* ========= Telegram ========= */

  [
    "DOMAIN-SUFFIX,t.me,📱 Telegram",
    "DOMAIN-SUFFIX,telegram.org,📱 Telegram"
  ].forEach(add);

  /* ========= 默认 ========= */

  add("GEOIP,CN,DIRECT");
  add("MATCH,🐟 Final");

}