type AnalyticsValue = string | number | boolean;

export function pushDataLayerEvent(event: string, parameters: Record<string, AnalyticsValue> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}
