import { Platform } from "react-native";

// ✅ RevenueCat API Key'lerini tanımlayın
export const REVENUECAT_API_KEY = Platform.select({
  ios: "appl_YOUR_REVENUECAT_IOS_API_KEY", // 🚀 iOS için API anahtarınızı girin
  android: "goog_owTvFdIGeXmmkXEXUTGkGnPWtWc", // 🚀 Android için API anahtarınızı girin
});

// ✅ Google Play ve Apple Store Ürün Kimliklerini tanımlayın
export const PRODUCT_ID = Platform.select({
  ios: "vip_access_1month_ios", // 🚀 iOS'taki ürün kimliği
  android: "vip_access_1month", // 🚀 Google Play'deki ürün kimliği
});

// ✅ Geliştirme veya üretim ortamı ayarları
export const IS_PRODUCTION = true; // 🚀 Eğer üretim ortamında test ediyorsanız true yapın

// ✅ Gelir raporlama, kullanıcı takipleri için gerekli RevenueCat Logları (isteğe bağlı)
export const ENABLE_REVENUECAT_DEBUG = false;
