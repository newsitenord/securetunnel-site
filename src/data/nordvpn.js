// =============================================================================
// NordVPN product facts — verified 19 September 2026 against nordvpn.com,
// nordvpn.com/servers/ and independent 2026 reviews (ZDNet, PCMag, Tom's Guide,
// VPNpro, vpnoverview).
//
// EVERY price and number on the site is rendered from this file. When NordVPN
// changes a price you edit it here once and rebuild — nothing else to touch.
// =============================================================================

export const nordvpn = {
  name: 'NordVPN',
  vendor: 'NordSec B.V.',
  founded: 2012,
  jurisdiction: 'Panama',
  hqNote:
    'NordVPN is operated by NordSec B.V. and is legally registered in Panama, a country with no mandatory data-retention law. Nord Security also maintains large research and development offices in Vilnius, Lithuania.',
  users: '20 million+',

  network: {
    servers: '8,000+',
    serversExactPublished: '8,043',
    countries: 150,
    locations: 225,
    usStates: 'All 50 US states, 55 US cities',
    dedicatedIpCountries: '28+',
    ramOnly: true,
    tenGigabit: true,
  },

  protocols: [
    {
      name: 'NordLynx',
      base: 'WireGuard',
      note: 'NordVPN\u2019s default protocol. Built on WireGuard with a double NAT system so no persistent identifying data has to be stored on the server. Consistently the fastest option in our tests.',
    },
    {
      name: 'NordWhisper',
      base: 'Proprietary',
      note: 'Designed to establish a connection on restrictive networks that throttle or block ordinary VPN traffic \u2014 the first thing to try on hotel, campus, office or state-filtered networks.',
    },
    {
      name: 'OpenVPN',
      base: 'Open source',
      note: 'The battle-tested default in both UDP and TCP flavours. TCP over port 443 is the classic fallback for heavily filtered networks.',
    },
    {
      name: 'IKEv2/IPsec',
      base: 'Open standard',
      note: 'Excellent at surviving network changes, which makes it a good pick for phones moving between Wi-Fi and mobile data.',
    },
  ],

  encryption: 'AES-256-GCM (ChaCha20 on devices without hardware AES support), with support for post-quantum key exchange on supported apps.',

  devices: {
    simultaneous: 10,
    platforms: [
      'Windows', 'macOS', 'Linux', 'Android', 'iOS / iPadOS', 'ChromeOS',
      'Android TV / Google TV', 'tvOS (Apple TV)', 'Fire TV Stick',
      'PlayStation', 'Xbox', 'Nintendo Switch', 'Routers',
      'Chrome, Firefox and Edge browser extensions',
    ],
  },

  // ---- Pricing, as published for the US store, September 2026 ----
  pricing: {
    asOf: 'September 2026',
    currency: 'USD',
    note: 'US-store list prices. NordVPN prices vary by country, currency and active promotion, and introductory rates renew at a higher standard rate.',
    tiers: [
      {
        id: 'basic',
        name: 'Basic',
        monthly: 14.99,
        yearly: 5.49,
        twoYear: 3.49,
        twoYearTotal: 94.23,
        twoYearMonths: 27,
        renewal: 'Approximately $139.08/year (about $11.59/month)',
        pitch: 'The VPN on its own: full server network, kill switch, split tunnelling, Threat Protection (malicious-site and tracker blocking).',
        extras: [],
        bestFor: 'Most people. If you only want a VPN, this is the tier to buy.',
      },
      {
        id: 'complete',
        name: 'Complete',
        monthly: 19.99,
        yearly: 6.49,
        twoYear: 4.49,
        twoYearTotal: 121.23,
        twoYearMonths: 27,
        renewal: 'Approximately $219.48/year (about $18.29/month)',
        pitch: 'Basic plus the security bundle: Threat Protection Pro with anti-malware and an ad/tracker blocker, NordPass password manager and 1 TB of NordLocker encrypted cloud storage.',
        extras: ['Threat Protection Pro (anti-malware scanning)', 'Ad and tracker blocker', 'NordPass password manager', '1 TB NordLocker encrypted storage', 'Scam call protection', 'Dark Web Monitor Pro'],
        bestFor: 'Households that would otherwise pay separately for a password manager and cloud backup.',
      },
      {
        id: 'prime',
        name: 'Prime',
        monthly: 29.99,
        yearly: 9.49,
        twoYear: 7.49,
        twoYearTotal: 202.23,
        twoYearMonths: 27,
        renewal: 'Approximately $296.28/year (about $24.69/month)',
        pitch: 'Everything in Complete plus identity-theft insurance, credit monitoring and data-broker removal, largely aimed at the US market.',
        extras: ['Everything in Complete', 'Identity theft insurance', 'Cyber extortion insurance', 'Credit monitoring and credit-score tracking', 'Credit freeze assistance'],
        bestFor: 'US users who want identity protection bundled in. Outside the US the insurance features are thin \u2014 buy Basic or Complete instead.',
      },
    ],
    guarantee: '30-day money-back guarantee on every plan',
    trial: '3-day free trial for new Android users (via Google Play)',
    payment: 'Credit and debit cards, PayPal, Google Pay, Apple Pay, and major cryptocurrencies including Bitcoin.',
  },

  specialtyServers: [
    { name: 'Double VPN', note: 'Routes traffic through two VPN servers in different countries, so no single server sees both your real IP and your destination.' },
    { name: 'Onion Over VPN', note: 'Sends your traffic into the Tor network from the VPN server, so your ISP sees only an encrypted VPN connection.' },
    { name: 'Obfuscated', note: 'Disguises VPN traffic so it looks like ordinary HTTPS. The go-to category on filtered networks.' },
    { name: 'P2P', note: 'Optimised for file sharing, with port-forwarding-free operation and a kill switch to stop your real IP leaking mid-transfer.' },
    { name: 'Dedicated IP', note: 'A static address only your account uses. Sold separately; available in 28+ countries. Useful for banking logins and work systems that flag shared IPs.' },
  ],

  features: [
    { name: 'Threat Protection', note: 'Blocks malicious domains, trackers and invasive ads at the network layer. The Pro version also scans downloaded files for malware and keeps working while the VPN is disconnected.' },
    { name: 'Meshnet', note: 'Turns your own devices into a private encrypted network \u2014 route traffic through your home PC from abroad, or share files directly between devices.' },
    { name: 'Kill switch', note: 'Cuts the network connection if the tunnel drops, so your real IP is never exposed. Can be scoped to specific apps.' },
    { name: 'Split tunnelling', note: 'Choose which apps use the tunnel and which use your normal connection \u2014 handy for keeping local banking apps off the VPN.' },
    { name: 'Dark Web Monitor', note: 'Alerts you if credentials tied to your email appear in a known breach.' },
    { name: 'RAM-only servers', note: 'Server disks are volatile, so data is wiped on every reboot rather than sitting on a hard drive.' },
    { name: 'No-logs policy', note: 'Independently audited four times, most recently by Deloitte, under a warrant-canary-free no-activity-logs commitment.' },
    { name: '24/7 live chat', note: 'Human support around the clock, plus an unusually deep self-service knowledge base.' },
  ],

  streaming: {
    worksWith: [
      'Netflix (US, UK, Canada, Japan, Australia and other regional libraries)',
      'BBC iPlayer', 'ITVX', 'Channel 4', 'Disney+', 'Hulu',
      'Amazon Prime Video', 'Max (HBO Max)', 'Peacock', 'Paramount+',
      'Crunchyroll', 'DAZN', 'fuboTV', 'YouTube TV', 'Sling TV', 'Spotify',
    ],
    tech: 'SmartPlay DNS handling is built into the app, so streaming servers work automatically without a separate proxy setup.',
  },

  score: {
    overall: 4.6,
    speed: 4.7,
    privacy: 4.7,
    streaming: 4.6,
    easeOfUse: 4.4,
    value: 4.2,
    support: 4.5,
  },

  pros: [
    'One of the largest networks in the industry \u2014 8,000+ servers across 150 countries and 225 locations',
    'NordLynx is consistently among the fastest VPN protocols we have measured',
    'No-logs policy has been independently audited four times',
    'Reliably unblocks the major streaming libraries, including several Netflix regions',
    'NordWhisper gives it a real answer on restrictive networks, which most rivals lack',
    '10 simultaneous connections, apps for effectively every platform including routers and consoles',
    '30-day money-back guarantee means you can test it on your own network risk-free',
  ],

  cons: [
    'Monthly billing at $14.99 is one of the most expensive on the market \u2014 only worth it if you genuinely need one month',
    'Renewal pricing after the introductory term rises sharply; you have to remember to cancel',
    'The Windows and macOS map interface hides some settings behind extra clicks',
    'Advanced security features such as Threat Protection Pro are limited to the Complete tier and up',
    'Dedicated IP is a separate paid add-on rather than being included',
    'The cheapest tier is priced above budget rivals such as Surfshark and Proton VPN on a like-for-like basis',
  ],

  verdict:
    'NordVPN remains the safest single recommendation for most people in 2026. It is not the cheapest and not the most private-by-design (that title goes to Mullvad), but it is the one that does speed, streaming, unblocking, apps and support all at a level that clears the bar at once. Buy the two-year Basic plan, set a renewal reminder, and you get roughly $3.49 a month for a service that has almost no weak points.',
};

export default nordvpn;
