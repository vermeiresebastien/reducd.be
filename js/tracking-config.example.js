/**
 * Tracking config example — copy values into tracking-config.js
 *
 * Meta: Events Manager → Data sources → Pixel → Pixel ID
 * GA4: Admin → Data streams → Measurement ID (G-XXXXXXXX)
 * Google Ads: Ads → Tools → Conversions / tag setup (AW-XXXXXXXXX)
 *   Conversion label: from the conversion action “Tag setup” (AW-XXX/label)
 */
window.REDUCD_TRACKING = {
  metaPixelId: "YOUR_META_PIXEL_ID",
  ga4MeasurementId: "G-XXXXXXXX",
  googleAdsId: "AW-XXXXXXXXX",
  /** Optional: send_to becomes AW-XXX/YYYY when both are set */
  googleAdsConversionLabel: "YOUR_CONVERSION_LABEL",
  popup: {
    enabled: true,
    delayMs: 45000,
    scrollPercent: 55,
    exitIntent: true,
    storageKey: "reducd_lead_popup_dismissed",
    cooldownDays: 7
  }
};
