/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    supabase_URL: 'https://jrrhuwbfbdkxcfcjfxac.supabase.co',
    supabase_PUBLIC_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impycmh1d2JmYmRreGNmY2pmeGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2NTg4MDgsImV4cCI6MjAwMzIzNDgwOH0.P26XR3WW35VBMTPNA3f3mcvaCp7h9_GUnXrI4pGfSbc',
    twilio_ACCOUNT_SID: 'AC04fc27f094b85359bebddf65b054af94',
    twilio_AUTH_TOKEN: '62827bc4f57eb1b5d2478fba5017a669',
    twilio_PHONE_NUMBER: '+18334102164',
  },
};

module.exports = nextConfig;
