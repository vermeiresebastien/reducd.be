/**
 * Topic-cluster redirects. Weaker overlapping URLs consolidate onto four hubs.
 * Keep in sync with the inline map in blog/post.html.
 */
export const BLOG_REDIRECTS = {
  "hoeveel-geluid-maakt-een-warmtepomp-vlaanderen": "warmtepomp-geluidsoverlast-verminderen",
  "hoeveel-geluid-warmtepomp-per-soort": "warmtepomp-geluidsoverlast-verminderen",
  "buitenunit-warmtepomp-waarom-lawaai": "warmtepomp-geluidsoverlast-verminderen",
  "hoe-werkt-warmtepomp-buitenunit": "warmtepomp-geluidsoverlast-verminderen",
  "welk-type-warmtepomp-minste-geluid": "warmtepomp-geluidsoverlast-verminderen",
  "stilste-warmtepomp-praktijk": "warmtepomp-geluidsoverlast-verminderen",
  "warmtepomp-vrieskou-meer-geluid": "warmtepomp-geluidsoverlast-verminderen",
  "geluid-warmtepomp-ervaringen-horen": "warmtepomp-geluidsoverlast-verminderen",
  "voordelen-nadelen-warmtepomp-vlaanderen": "warmtepomp-geluidsoverlast-verminderen",
  "regels-buitenunit-warmtepomp-airco-vlaanderen": "warmtepomp-geluid-vlarem-berekenen",
  "tonaaltoeslag-k1-vlaanderen": "warmtepomp-geluid-vlarem-berekenen",
  "jurisprudentie-geluidsoverlast-warmtepomp-belgie": "warmtepomp-geluid-vlarem-berekenen",
  "warmtepomp-geluid-buren-regelgeving-belgie-nederland": "warmtepomp-geluid-buren-overlast-vlaanderen",
  "geluidsoverlast-warmtepomp-airco-oplossingen": "akoestische-omkasting-vs-suskast",
  "warmtepomp-geluid-dempen-vlaanderen": "akoestische-omkasting-vs-suskast",
  "airco-geluid-dempen-vlaanderen": "akoestische-omkasting-vs-suskast",
  "airco-ombouw-goed-idee": "akoestische-omkasting-vs-suskast",
  "geluiddempende-omkasting-maatwerk": "akoestische-omkasting-vs-suskast",
  "daikin-warmtepomp-ombouw-nodig": "geluidsoverlast-daikin-altherma-hybride-warmtepomp"
};

export const TOPIC_CLUSTERS = {
  geluid: {
    label: "Gids · warmtepompgeluid",
    hub: "warmtepomp-geluidsoverlast-verminderen",
    related: [
      ["warmtepomp-geluid-vlarem-berekenen", "VLAREM berekenen"],
      ["warmtepomp-geluid-buren-overlast-vlaanderen", "Burenklacht"],
      ["akoestische-omkasting-vs-suskast", "Oplossing kiezen"]
    ]
  },
  vlarem: {
    label: "Gids · VLAREM",
    hub: "warmtepomp-geluid-vlarem-berekenen",
    related: [
      ["warmtepomp-geluidsoverlast-verminderen", "Warmtepompgeluid"],
      ["warmtepomp-geluid-buren-overlast-vlaanderen", "Burenklacht"],
      ["akoestische-omkasting-vs-suskast", "Oplossing kiezen"]
    ]
  },
  buren: {
    label: "Gids · burenklacht",
    hub: "warmtepomp-geluid-buren-overlast-vlaanderen",
    related: [
      ["warmtepomp-geluidsoverlast-verminderen", "Warmtepompgeluid"],
      ["warmtepomp-geluid-vlarem-berekenen", "VLAREM berekenen"],
      ["akoestische-omkasting-vs-suskast", "Oplossing kiezen"]
    ]
  },
  oplossing: {
    label: "Gids · oplossing",
    hub: "akoestische-omkasting-vs-suskast",
    related: [
      ["warmtepomp-geluidsoverlast-verminderen", "Warmtepompgeluid"],
      ["vrijstaand-of-wandmodel-warmtepomp-omkasting", "Vrijstaand of wand"],
      ["warmtepomp-geluid-buren-overlast-vlaanderen", "Burenklacht"]
    ]
  }
};

export const POST_CLUSTER = {
  "warmtepomp-geluidsoverlast-verminderen": "geluid",
  "warmtepomp-geluid-vlarem-berekenen": "vlarem",
  "warmtepomp-geluid-buren-overlast-vlaanderen": "buren",
  "akoestische-omkasting-vs-suskast": "oplossing"
};

export function resolveBlogRedirect(slug) {
  if (!slug) return null;
  return BLOG_REDIRECTS[String(slug).trim().toLowerCase()] || null;
}

export function clusterBoxHtml(slug) {
  const id = POST_CLUSTER[slug];
  const cluster = id && TOPIC_CLUSTERS[id];
  if (!cluster) return "";
  const links = cluster.related
    .map(([s, label]) => `<a href="./post.html?slug=${s}">${label}</a>`)
    .join(" · ");
  return `<aside class="topic-cluster" aria-label="${cluster.label}"><p><strong>${cluster.label}</strong> — vier kernartikelen, geen dubbele pagina’s. ${links}</p></aside>`;
}
