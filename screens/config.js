import { Platform } from "react-native";

// ✅ RevenueCat API Key
export const REVENUECAT_API_KEY = Platform.select({
  ios: "appl_YOUR_REVENUECAT_IOS_API_KEY", 
  android: "goog_owTvFdIGeXmmkXEXUTGkGnPWtWc", 
});

// ✅ RevenueCat Ürün ID (Google Play & App Store)
export const PRODUCT_ID = Platform.select({
  ios: "vip_access_1month_ios", 
  android: "vip_access_1month", 
});

// ✅ Eksik olabilecek bir default export ekleyin
export default {
  REVENUECAT_API_KEY,
  PRODUCT_ID
};
