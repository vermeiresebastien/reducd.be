/**
 * Vul je tracking-ID’s in na setup in Meta / GA4 / Google Ads.
 * Zolang PLACEHOLDER staat, laadt de site geen externe trackers.
 * Google Ads-tag moet jij nog koppelen (AW-… + conversion label).
 */
window.REDUCD_TRACKING = {
  metaPixelId: "PLACEHOLDER",
  ga4MeasurementId: "PLACEHOLDER",
  googleAdsId: "PLACEHOLDER",
  googleAdsConversionLabel: "PLACEHOLDER",
  popup: {
    enabled: true,
    delayMs: 45000,
    scrollPercent: 55,
    exitIntent: true,
    storageKey: "reducd_lead_popup_dismissed",
    cooldownDays: 7
  }
};
