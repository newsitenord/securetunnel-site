// =============================================================================
// Troubleshooting pages — high-volume "not working" queries. These are the
// pages most likely to earn links and repeat visits, so the fixes are specific
// and ordered by likelihood rather than padded.
// =============================================================================

export const troubleshooting = [
  {
    id: 'not-connecting', name: 'NordVPN not connecting', intent: 'nordvpn not connecting',
    hook: 'Nine times out of ten this is one of four causes: a stale app state, a firewall blocking the adapter, a protocol the network dislikes, or an expired subscription.',
    symptom: 'The app shows "Connecting" indefinitely, or returns to disconnected after a few seconds, with no error message.',
    fixes: [
      { step: 'Restart the app and the device', detail: 'Full quit, not just closing the window. On Windows check Task Manager for a lingering process; on macOS use Quit rather than the red button. This resolves a surprising proportion of stuck-connection issues.' },
      { step: 'Switch protocol', detail: 'Go to Settings \u2192 Connection and change from NordLynx to OpenVPN UDP, or to NordWhisper if you are on a filtered network. A network that fingerprints WireGuard will block NordLynx while allowing OpenVPN.' },
      { step: 'Try a different server', detail: 'The specific server may be down for maintenance. Try a different city in the same country before changing country.' },
      { step: 'Check your firewall and antivirus', detail: 'Windows Defender Firewall, third-party antivirus and corporate endpoint software all block VPN adapters. Temporarily disable them to test, then add an exception rather than leaving them off.' },
      { step: 'Confirm your subscription is active', detail: 'An expired or failed-payment subscription produces a connection that appears to start and then drops. Check your account dashboard.' },
      { step: 'Reinstall the network adapter', detail: 'On Windows, uninstall the NordVPN app, then remove any leftover NordVPN or WireGuard adapters in Device Manager \u2192 Network adapters before reinstalling.' },
      { step: 'Reset your network stack', detail: 'On Windows run netsh winsock reset and netsh int ip reset from an elevated command prompt, then restart. On macOS, delete the VPN configuration in System Settings \u2192 Network and reconnect.' },
    ],
    escalation: 'If none of this works, contact NordVPN support over live chat with your OS version, protocol and the exact behaviour. They can see connection logs server-side that you cannot.',
    faq: [
      { q: 'Why does NordVPN connect then immediately disconnect?', a: 'Usually a firewall or antivirus blocking the adapter, or a protocol the network rejects. Try OpenVPN and temporarily disable security software to isolate it.' },
      { q: 'Is it my internet or the VPN?', a: 'Disconnect the VPN and confirm your connection works normally. If it does, the problem is in the VPN path rather than your ISP.' },
    ],
  },
  {
    id: 'netflix-blocked', name: 'Netflix blocks my VPN (Error M7111-5059)', intent: 'netflix vpn error m7111-5059',
    hook: 'This error means one specific IP address got added to Netflix\u2019s blocklist. It is not your account, not your VPN and not a permanent problem.',
    symptom: 'Netflix shows \u201cYou seem to be using an unblocker or proxy\u201d or Error Code M7111-5059, sometimes M7111-1331-5059 on the app rather than the browser.',
    fixes: [
      { step: 'Switch to a different city in the same country', detail: 'Blocklists are per IP range. New York, Los Angeles, Chicago and Dallas are refreshed more often than smaller cities and are far more likely to work.' },
      { step: 'Clear Netflix cookies', detail: 'Netflix caches your region. Clear cookies for netflix.com, or open a private window. On a TV or console, force-quit the app or restart the device.' },
      { step: 'Sign out and back in with the VPN connected', detail: 'Your session is labelled with the region it started in. A fresh sign-in with the tunnel already active re-reads your location.' },
      { step: 'Check for a DNS leak', detail: 'If your DNS is resolving through your ISP rather than NordVPN, Netflix can see your real location. Run a DNS leak test and fix any leak before assuming the IP is the problem.' },
      { step: 'Disable IPv6 temporarily', detail: 'An IPv6 connection can bypass an IPv4 tunnel and reveal your real location. NordVPN blocks IPv6 while connected, but verify with a leak test.' },
      { step: 'Use the browser instead of the app', detail: 'The Netflix web player is easier to reset than the app, and it is a useful way to confirm whether the problem is the IP or the app cache.' },
    ],
    escalation: 'If several major-city servers all fail, ask NordVPN support for a currently working server \u2014 they track this and can give you a specific recommendation.',
    faq: [
      { q: 'Is my Netflix account at risk?', a: 'The realistic risk is low. Netflix blocks the connection rather than the account in almost all cases, and account termination for VPN use is extremely rare.' },
      { q: 'Why do some servers work and others do not?', a: 'Because the blocklist is per IP range. Ranges used heavily by VPN customers get flagged faster, and major-city ranges are rotated more often.' },
    ],
  },
  {
    id: 'slow-speeds', name: 'NordVPN is slow', intent: 'nordvpn slow',
    hook: 'A VPN should cost you 5\u201315% on a nearby server. If you are losing half your speed, something is misconfigured rather than inherently slow.',
    symptom: 'Download speeds drop dramatically compared with your normal connection, streaming buffers, or video calls become unusable.',
    fixes: [
      { step: 'Switch to NordLynx', detail: 'If you are on OpenVPN, this alone often doubles throughput. NordLynx is WireGuard-based with far lower per-packet overhead.' },
      { step: 'Choose a closer server', detail: 'Distance is the dominant factor. A Sydney-to-London connection will be slow regardless of provider. Pick the closest server that gives you what you need.' },
      { step: 'Test your baseline without the VPN', detail: 'Run a speed test with the VPN off, then on, on the same server. If your baseline is already low, the VPN is not the cause.' },
      { step: 'Try a different server in the same city', detail: 'Individual servers get congested. A different server in the same city can be dramatically faster during peak hours.' },
      { step: 'Check for a router-level bottleneck', detail: 'If the VPN runs on your router, its CPU is your speed ceiling. OpenVPN on a mid-range router caps around 100\u2013200 Mbps; WireGuard goes considerably higher.' },
      { step: 'Disable Threat Protection temporarily', detail: 'The filtering layer adds a small amount of overhead. Test with it off to see whether it is a factor.' },
      { step: 'Check your Wi-Fi', detail: 'A weak Wi-Fi signal plus VPN encryption compounds badly. Test over Ethernet to rule this out.' },
    ],
    escalation: 'If speeds are poor on multiple nearby servers across protocols, run a speed test to several countries and send the results to support \u2014 it may indicate a routing problem specific to your ISP.',
    faq: [
      { q: 'How much speed should a VPN cost?', a: 'On a nearby server with NordLynx, typically 5\u201315%. Losing half your speed means a distant server, a congested server, or OpenVPN where NordLynx would work.' },
      { q: 'Is NordLynx really faster than OpenVPN?', a: 'Yes, consistently and often by a wide margin. It has less code, runs more in kernel space, and has a lighter handshake.' },
    ],
  },
  {
    id: 'dns-leak', name: 'DNS leak after connecting', intent: 'vpn dns leak fix',
    hook: 'Your traffic is encrypted and your ISP can still see every website you visit. That is a DNS leak, and it is usually a leftover manual DNS setting.',
    symptom: 'A DNS leak test shows resolvers belonging to your ISP or located in your real country, even though the VPN shows as connected.',
    fixes: [
      { step: 'Remove manual DNS settings', detail: 'Check your OS network settings for a manually configured DNS server and set it back to automatic. A manual setting overrides the VPN\u2019s DNS assignment and is the most common cause.' },
      { step: 'Enable the kill switch', detail: 'NordVPN\u2019s kill switch also protects DNS resolution during a tunnel drop. Without it, queries can escape at the moment of reconnection.' },
      { step: 'Disable IPv6', detail: 'An IPv6 connection can bypass an IPv4-only tunnel entirely. NordVPN blocks IPv6 while connected, but if you have a custom configuration, disable IPv6 at the OS level to test.' },
      { step: 'Flush your DNS cache', detail: 'On Windows run ipconfig /flushdns. On macOS run sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder. Cached entries can persist after connecting.' },
      { step: 'Restart your browser', detail: 'Browsers with their own DNS-over-HTTPS settings \u2014 Chrome and Firefox both have this \u2014 may resolve outside the tunnel. Set the browser to use system DNS or point it at NordVPN\u2019s resolver.' },
      { step: 'Reconnect', detail: 'Disconnect, wait five seconds, reconnect, and retest. A stale tunnel from a network change is a common cause of transient leaks.' },
    ],
    escalation: 'If the leak persists across devices and networks, it is likely a router-level DNS configuration. Check your router\u2019s DNS settings and disable any ISP-specific resolver.',
    faq: [
      { q: 'Is a DNS leak dangerous?', a: 'Your traffic content is still encrypted, but your ISP sees every domain you request \u2014 which is most of what a VPN is meant to hide. It largely defeats the purpose.' },
      { q: 'Do browsers cause DNS leaks?', a: 'Yes, if they are configured with their own DNS-over-HTTPS resolver. Chrome and Firefox both have this option and it bypasses the system DNS the VPN controls.' },
    ],
  },
  {
    id: 'kill-switch-no-internet', name: 'No internet when NordVPN is off (kill switch)', intent: 'nordvpn kill switch no internet',
    hook: 'This is the kill switch working exactly as designed. Your internet is cut because the tunnel is down and you told it to do that.',
    symptom: 'Your internet stops working entirely when NordVPN is closed, disconnected, or fails to connect.',
    fixes: [
      { step: 'Reconnect the VPN', detail: 'The simplest fix. Open the app and connect, and your internet returns immediately.' },
      { step: 'Disable the kill switch temporarily', detail: 'Settings \u2192 Kill Switch \u2192 off. Do this only to diagnose, and turn it back on afterwards.' },
      { step: 'Check whether it is app-level or system-wide', detail: 'An app-level kill switch only cuts the listed applications. If your whole connection is down, you have the system-wide kill switch enabled.' },
      { step: 'Restart the app rather than closing it', detail: 'Closing the window on macOS does not quit the app. Use Quit, or the tunnel state can be left inconsistent.' },
      { step: 'Reinstall if the state is stuck', detail: 'A crashed app can leave the firewall rule in place after uninstalling. On Windows, remove the leftover NordVPN Wintun or WireGuard adapter in Device Manager before reinstalling.' },
    ],
    escalation: 'If your internet stays down after uninstalling, there is a leftover firewall rule. On Windows check Windows Defender Firewall \u2192 Advanced Settings for NordVPN block rules and remove them.',
    faq: [
      { q: 'Should I turn the kill switch off?', a: 'No. It is the most important setting in the app. Find out why the tunnel is dropping instead \u2014 usually a protocol or server issue.' },
      { q: 'Why did uninstalling not fix it?', a: 'Because the firewall rule can survive uninstallation. Remove the leftover NordVPN adapter and any block rules manually.' },
    ],
  },
  {
    id: 'bbc-iplayer-blocked', name: 'BBC iPlayer says I am outside the UK', intent: 'bbc iplayer vpn not working',
    hook: 'The BBC runs one of the most aggressive VPN blocklists in Europe, and it has four UK server cities to work with. Use all four.',
    symptom: 'iPlayer shows \u201cBBC iPlayer only works in the UK. Sorry, it\u2019s due to rights issues.\u201d despite being connected to a UK server.',
    fixes: [
      { step: 'Try each of the four UK cities', detail: 'NordVPN runs London, Manchester, Edinburgh and Glasgow. They do not behave identically, and one usually works when the others do not.' },
      { step: 'Clear cookies or use a private window', detail: 'iPlayer caches your location. A private window removes the cached session entirely.' },
      { step: 'Enter any valid-format UK postcode', detail: 'When prompted, any correctly formatted UK postcode satisfies the check. It is used for regional news selection, not verification.' },
      { step: 'Sign out and back in', detail: 'Your account session carries the region it started in. Sign out with the VPN connected, then sign back in.' },
      { step: 'Check for a DNS leak', detail: 'iPlayer performs DNS-based location checks. Run a leak test and fix any resolver that is not NordVPN\u2019s.' },
      { step: 'Restart the app on smart TVs', detail: 'The iPlayer app on TVs caches location hard. Force-quit it, or restart the TV, after connecting the VPN.' },
    ],
    escalation: 'Ask NordVPN support which UK servers are currently working with iPlayer. They track this actively because it changes frequently.',
    faq: [
      { q: 'Is it legal to watch iPlayer abroad?', a: 'iPlayer\u2019s terms of use restrict it to the UK, so this is a terms breach rather than a criminal offence. The BBC actively blocks VPN ranges.' },
      { q: 'Why does on-demand work but live does not?', a: 'The BBC applies stricter location checks to live streams than to on-demand content, because live broadcast rights are more tightly controlled.' },
    ],
  },
  {
    id: 'mobile-drops', name: 'VPN keeps disconnecting on mobile', intent: 'vpn disconnects android iphone',
    hook: 'On Android this is almost always battery optimisation. On iOS it is usually Low Power Mode or a network handover. Both are fixable in about a minute.',
    symptom: 'The VPN connection drops when the screen turns off, after the phone has been idle, or when switching between Wi-Fi and mobile data.',
    fixes: [
      { step: 'Android: disable battery optimisation', detail: 'Settings \u2192 Apps \u2192 NordVPN \u2192 Battery \u2192 Unrestricted. This is the single most common cause on Android and fixes most drops.' },
      { step: 'Android: enable the persistent notification', detail: 'Without it, Android can treat the VPN as a background service to be reclaimed under memory pressure.' },
      { step: 'iOS: check Low Power Mode', detail: 'Low Power Mode restricts background activity and can affect VPN maintenance. Turn it off and test.' },
      { step: 'Switch to IKEv2 on iOS', detail: 'IKEv2 recovers faster after a network change than other protocols, which matters when moving between Wi-Fi and mobile data.' },
      { step: 'Enable auto-reconnect', detail: 'In the app settings, enable automatic reconnection so a drop is restored without your intervention.' },
      { step: 'Check carrier-level filtering', detail: 'Some mobile carriers filter VPN traffic on their networks. Test on Wi-Fi to isolate whether the carrier is the cause.' },
      { step: 'Update the app', detail: 'Mobile OS updates frequently change background-service behaviour, and app updates usually follow with fixes.' },
    ],
    escalation: 'If drops happen on Wi-Fi as well as mobile data and persist across OS versions, contact support with your device model and OS version.',
    faq: [
      { q: 'Why does my VPN drop when my screen turns off?', a: 'Android battery optimisation suspends background services. Marking NordVPN as unrestricted in battery settings resolves it in most cases.' },
      { q: 'Which protocol is best on mobile?', a: 'NordLynx for general use because of its fast handshake. IKEv2 on iOS if you move between networks frequently, because it recovers faster after a handover.' },
    ],
  },
  {
    id: 'router-setup-fails', name: 'NordVPN not working on my router', intent: 'nordvpn router setup not working',
    hook: 'Router failures are almost always one of three things: the router does not actually support a VPN client, the configuration file is wrong for your region, or the router\u2019s CPU cannot keep up.',
    symptom: 'The router accepts the configuration but shows no connection, or connects and immediately drops, or connects but no device has internet.',
    fixes: [
      { step: 'Confirm your router supports a VPN client', detail: 'Not a VPN server \u2014 a client. Most ISP-supplied routers support neither. You need OpenWrt, DD-WRT, Asuswrt-Merlin, Tomato, pfSense or OPNsense.' },
      { step: 'Download the correct configuration file', detail: 'NordVPN provides region-specific OpenVPN files. Using a file for the wrong server, or a generic one, produces authentication failures.' },
      { step: 'Check the credentials', detail: 'Router setups use your NordVPN service credentials from the account dashboard, not your email and password. This is the most common configuration error.' },
      { step: 'Verify the kill switch is not cutting everything', detail: 'A router kill switch misconfiguration can block all traffic including the tunnel itself. Disable it temporarily to test.' },
      { step: 'Try a different protocol', detail: 'If your firmware supports WireGuard, try NordLynx \u2014 it is far lighter on router CPUs than OpenVPN and may succeed where OpenVPN fails.' },
      { step: 'Check for an MTU mismatch', detail: 'An incorrect MTU causes connections that establish but fail to load pages. Try reducing MTU to 1400 or 1360.' },
      { step: 'Test one device directly', detail: 'Connect a single device and confirm it gets an IP and internet before troubleshooting the whole network.' },
    ],
    escalation: 'Router configuration varies enormously by firmware. NordVPN publishes guides for the major firmware types; if yours is not covered, the firmware project\u2019s own documentation is usually more useful.',
    faq: [
      { q: 'Why does my ISP router not work?', a: 'Most ISP-supplied routers have no VPN client capability at all, and the firmware is locked so you cannot add it. You need compatible firmware or a different router.' },
      { q: 'Why is my router VPN so slow?', a: 'The router\u2019s CPU is doing the encryption. OpenVPN on mid-range hardware caps around 100\u2013200 Mbps. WireGuard-based NordLynx is dramatically lighter.' },
    ],
  },
  {
    id: 'ip-leak', name: 'My real IP is showing while connected', intent: 'vpn ip leak test',
    hook: 'An IP leak while the app says "connected" usually means WebRTC in your browser, an IPv6 path outside the tunnel, or a tunnel that silently failed.',
    symptom: 'An IP-check site shows your real IP address, or an IP in your real country, while the NordVPN app shows you as connected.',
    fixes: [
      { step: 'Test WebRTC in your browser', detail: 'WebRTC can expose your real local and public IP addresses even with a VPN connected. Use a WebRTC leak test, and enable leak protection in NordVPN\u2019s browser extension.' },
      { step: 'Disable IPv6', detail: 'An IPv4-only tunnel leaves IPv6 traffic unprotected. NordVPN blocks IPv6 while connected, but if you have a custom setup, disable IPv6 at the OS level and retest.' },
      { step: 'Disconnect and reconnect', detail: 'A tunnel can silently fail after a network change while the UI still shows connected. A clean reconnect resets the state.' },
      { step: 'Enable the kill switch', detail: 'The kill switch prevents traffic from flowing while the tunnel is down, which is the window in which most leaks occur.' },
      { step: 'Check for split tunnelling', detail: 'If you have excluded an app or your browser from the tunnel, it is leaking by design. Review your split-tunnelling list.' },
      { step: 'Test in a different browser', detail: 'This isolates whether the leak is browser-specific (WebRTC) or connection-level (IPv6 or a failed tunnel).' },
    ],
    escalation: 'If the leak is consistent across browsers and devices, run a leak test immediately after connecting and again after five minutes. A delayed leak indicates a keepalive or reconnection problem worth raising with support.',
    faq: [
      { q: 'What is a WebRTC leak?', a: 'WebRTC is a browser API for real-time communication that can discover and expose your real IP addresses directly, bypassing the VPN tunnel. It needs to be disabled or protected.' },
      { q: 'Does an IP leak mean my traffic was exposed?', a: 'Not necessarily \u2014 an IPv6 or WebRTC leak may expose your address without exposing your traffic. But it defeats the anonymity purpose of the VPN and should be fixed.' },
    ],
  },
  {
    id: 'login-failed', name: 'NordVPN login failed or account locked', intent: 'nordvpn login failed',
    hook: 'Login failures are usually a password issue, a regional payment mismatch, or an account flagged for unusual activity. All three are quick to resolve.',
    symptom: 'The app refuses your credentials, shows "invalid username or password", or the account appears inactive despite payment.',
    fixes: [
      { step: 'Reset your password on the website', detail: 'Do this at nordvpn.com rather than in the app, then sign in on the website to confirm the new password works before returning to the app.' },
      { step: 'Check for two-factor issues', detail: 'If MFA is enabled, an incorrect device clock can cause valid codes to be rejected. Sync your device time automatically.' },
      { step: 'Confirm your subscription is active', detail: 'A failed renewal payment leaves the account in a state that looks active but cannot connect. Check the billing section of your dashboard.' },
      { step: 'Check the payment region', detail: 'A payment method from a country that does not match your account region can trigger a fraud hold. Contact support to clear it.' },
      { step: 'Clear the app cache or reinstall', detail: 'A corrupted credential cache produces persistent login failures that a reinstall resolves.' },
      { step: 'Try a different device or browser', detail: 'This isolates whether the problem is account-side or device-side.' },
    ],
    escalation: 'Contact NordVPN support over live chat with your account email and payment reference. They can see fraud holds and payment failures that are not visible to you.',
    faq: [
      { q: 'Why does my password work on the website but not the app?', a: 'Usually a corrupted credential cache. Reinstalling the app, or signing out fully and back in, resolves it.' },
      { q: 'My account says active but I cannot connect', detail: 'Check your billing status specifically. A failed renewal payment can leave the account in an ambiguous state that requires support to clear.' },
    ],
  },
];

export default troubleshooting;
