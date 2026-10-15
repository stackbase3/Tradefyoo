/**
 * Jarvis Client-Side Public Configuration
 * Note: Secret keys and payment fulfillment must stay on your secure backend.
 */
export const CONFIG = {
  BRAND: {
    name: 'Jarvis',
    category: 'AI Trading Assistant',
    tagline: 'Trade With Clarity. Let Jarvis Handle the Workflow.'
  },
  PRICING: {
    monthly: 12,
    annual: 133,
    currencySymbol: '$'
  },
  ENDPOINTS: {
    authSignIn: '/api/v1/auth/signin',
    authSignUp: '/api/v1/auth/signup',
    authReset: '/api/v1/auth/reset-password',
    checkoutMonthly: '/api/v1/checkout/monthly',
    checkoutAnnual: '/api/v1/checkout/annual',
    tokenTopUp: '/dashboard/tokens',
    downloadWindows: '/downloads/jarvis-setup.exe',
    downloadMac: '/downloads/jarvis-setup.dmg',
    legalPrivacy: '/privacy',
    legalTerms: '/terms',
    contactSupport: 'mailto:support@jarvistrading.ai'
  }
};
