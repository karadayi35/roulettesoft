import { Platform } from "react-native";

// ✅ RevenueCat API Key'ini ve Ürün ID'sini Doğru Kullan
export const REVENUECAT_API_KEY = Platform.select({
  ios: "appl_YOUR_REVENUECAT_IOS_API_KEY", 
  android: "goog_owTvFdIGeXmmkXEXUTGkGnPWtWc", 
});

// ✅ Google Play'deki "basePlanId" ve "subscriptionId" değerleri ile eşleşmeli
export const PRODUCT_ID = "vip_access_1month"; 
export const BASE_PLAN_ID = "premium-1-monthly"; 

export default {
  REVENUECAT_API_KEY,
  PRODUCT_ID,
  BASE_PLAN_ID,
};
