// =============================================================================
// Use-case pages. Each targets a distinct search intent ("vpn for torrenting",
// "vpn for gaming") and carries specific, non-interchangeable guidance.
// =============================================================================

export const usecases = [
  {
    id: 'torrenting', name: 'Torrenting and P2P', intent: 'vpn for torrenting',
    hook: 'The single most important feature for torrenting is not speed \u2014 it is a kill switch that actually works. Your real IP only needs to appear in the swarm once.',
    keyFeatures: ['P2P-optimised servers', 'Kill switch (essential, not optional)', 'No activity logs', 'Split tunnelling', 'Port forwarding (add-on)'],
    body: [
      'When you join a BitTorrent swarm, every other peer sees your IP address. That list is trivially loggable, and it is the basis on which copyright monitoring firms generate their reports. A VPN replaces your IP with the server\u2019s, so what appears in the swarm belongs to NordVPN rather than to you.',
      'The kill switch is what makes this reliable. If the tunnel drops mid-transfer \u2014 which happens routinely on mobile networks and during server maintenance \u2014 a client without a working kill switch immediately reconnects your torrent client over your real connection, exposing your IP to the entire swarm. NordVPN\u2019s kill switch can be applied to specific applications, so you can set it to cut only your torrent client.',
      'NordVPN operates dedicated P2P servers and does not log activity, a policy that has been independently audited four times. It does not offer port forwarding on standard servers, which some seedbox-style users want; TorGuard and PIA are better choices if inbound connections matter to you.',
      'Practical setup: enable the kill switch first, choose a P2P server in a country with a strong stance on file sharing such as the Netherlands or Switzerland, use NordLynx for throughput, and add your torrent client to the split-tunnelling list if you want the rest of your traffic to stay off the tunnel.',
    ],
    warnings: 'A VPN hides your IP; it does not make downloading copyrighted material legal. In Germany in particular, Abmahnung warning letters are generated from swarm logs and are expensive even for small infringements.',
    faq: [
      { q: 'Does NordVPN allow torrenting?', a: 'Yes. It runs dedicated P2P servers and its audited no-logs policy means it has nothing to hand over about your activity.' },
      { q: 'Will a VPN slow down my downloads?', a: 'Slightly. NordLynx typically costs 5\u201315% of throughput. On most connections the VPN is not the bottleneck \u2014 the number of seeders is.' },
      { q: 'Does NordVPN support port forwarding?', a: 'Not on standard servers. If inbound connections matter for your seeding, PIA or TorGuard are better suited.' },
    ],
  },
  {
    id: 'gaming', name: 'Gaming', intent: 'vpn for gaming',
    hook: 'A VPN usually adds latency, so the honest answer for most competitive gamers is not to use one. The cases where it genuinely helps are narrower than marketing suggests.',
    keyFeatures: ['NordLynx for lowest overhead', 'Meshnet for LAN play over the internet', 'DDoS protection in peer-to-peer lobbies', 'Split tunnelling to exclude the game'],
    body: [
      'Let us be direct: a VPN adds a hop, and a hop adds latency. If you are playing a competitive shooter on a well-routed connection, a VPN will make things worse, not better. Anyone telling you otherwise is selling something.',
      'The genuine use cases are different. First, DDoS protection: in peer-to-peer lobbies your IP is visible to opponents, and targeted disconnects are a real problem in some communities. Routing through a VPN means attackers hit a NordVPN server rather than your home connection. Second, Meshnet: you can build an encrypted LAN between your own devices or friends\u2019 devices and play LAN-only games over the internet. Third, routing around bad ISP peering \u2014 if your provider\u2019s route to a game server is genuinely poor, a VPN server closer to that server can reduce ping.',
      'NordVPN\u2019s advantage here is NordLynx. WireGuard-based protocols have far lower per-packet overhead than OpenVPN, which matters when every millisecond counts. On a fibre connection to a nearby NordLynx server, the added latency is typically single-digit milliseconds.',
      'The right setup is split tunnelling: route only the apps that need the VPN through the tunnel and leave the game on your direct connection, or vice versa. That way you get protection where you want it without paying latency everywhere.',
    ],
    warnings: 'Never route a competitive game through a distant VPN server and expect better ping. Test with and without the VPN before deciding.',
    faq: [
      { q: 'Does a VPN reduce ping?', a: 'Usually not \u2014 it adds one. It can reduce ping if your ISP\u2019s route to the game server is poor and the VPN offers a better path, but that is the exception rather than the rule.' },
      { q: 'What is Meshnet useful for in gaming?', a: 'It creates an encrypted private network between devices, which lets you play LAN-only multiplayer games with friends over the internet without port forwarding.' },
      { q: 'Which protocol should gamers use?', a: 'NordLynx. It has the lowest per-packet overhead of the protocols NordVPN offers, which is what keeps added latency in single-digit milliseconds on a nearby server.' },
    ],
  },
  {
    id: 'streaming', name: 'Streaming and unblocking', intent: 'vpn for streaming',
    hook: 'Streaming is where cheap VPNs fall apart. It is an arms race between providers maintaining IP blocklists and VPNs rotating addresses, and network size decides who wins.',
    keyFeatures: ['8,000+ servers across 150 countries', 'SmartPlay built into the app', 'Fast NordLynx for 4K', 'Multiple cities per country for IP rotation'],
    body: [
      'Streaming services block VPNs by maintaining lists of IP ranges belonging to known providers. When a range gets flagged, everyone using it is blocked at once. This is why server count matters more than almost any other spec for streaming: a provider with 8,000 servers across 225 locations has far more addresses to rotate through than one with 400.',
      'NordVPN\u2019s SmartPlay technology handles the DNS side automatically, so you do not need to configure a separate smart DNS service. It is built into every app, which is why streaming works the same way on a Fire TV Stick as it does on a laptop.',
      'Having multiple cities in a country matters more than people expect. When a London IP range gets blocked, NordVPN can move you to Manchester, Edinburgh or Glasgow. Providers with a single location per country have nowhere to go.',
      'For 4K you need sustained throughput of roughly 25 Mbps. NordLynx on a nearby server comfortably exceeds that on any reasonable connection; the distance to the content\u2019s CDN is usually the limiting factor rather than the VPN.',
    ],
    warnings: 'No VPN can guarantee access to any specific service at any time. Blocklists are updated continuously, and a server that works today may not work next month.',
    faq: [
      { q: 'Which VPN is best for Netflix?', a: 'NordVPN is consistently among the most reliable, largely because its large network gives it more IP ranges to rotate when Netflix flags one. See our Netflix guide for the specific servers that work.' },
      { q: 'Why does my VPN stop working with Netflix?', a: 'Because that IP range was added to Netflix\u2019s blocklist. Switch to a different city in the same country and clear your cookies \u2014 that resolves it in most cases.' },
      { q: 'Do I need a fast connection for 4K with a VPN?', a: 'About 25 Mbps sustained. A nearby NordLynx server will not be your bottleneck at that level; the distance to the content CDN is more likely to be.' },
    ],
  },
  {
    id: 'remote-work', name: 'Remote work and business travel', intent: 'vpn for remote work',
    hook: 'For remote work the VPN is not about hiding \u2014 it is about making hotel and airport Wi-Fi safe enough to touch company systems from.',
    keyFeatures: ['Kill switch on untrusted networks', 'Auto-connect on untrusted Wi-Fi', 'Meshnet to reach your home or office machine', 'Dedicated IP for systems that block shared IPs'],
    body: [
      'Public Wi-Fi in hotels, airports and caf\u00e9s is trivially easy to attack. On an open network, other guests can see broadcast traffic, rogue access points with plausible names are common, and captive portals inject content into your connection. None of this requires sophistication.',
      'A VPN encrypts everything between your laptop and the VPN server, which removes the local network from the threat model entirely. Someone on the same hotel Wi-Fi sees only an encrypted tunnel to a NordVPN server. Enable auto-connect on untrusted networks so you cannot forget, and keep the kill switch on so a drop does not silently expose you.',
      'Meshnet is the underrated feature here. It lets you reach a machine on your home or office network directly and securely from anywhere \u2014 pull a file from your desktop, reach a network printer, or RDP into a workstation without exposing it to the internet.',
      'One problem VPNs create for remote workers: some corporate systems, banks and government portals flag datacentre IPs as suspicious. If your employer\u2019s VPN or SSO objects to your connection, a NordVPN dedicated IP gives you a consistent address that stops looking like shared VPN traffic.',
    ],
    warnings: 'If your employer already requires its own VPN, ask before layering a personal one on top. Some corporate VPN clients conflict with consumer VPN adapters.',
    faq: [
      { q: 'Do I need a VPN on hotel Wi-Fi?', a: 'Yes, if you are doing anything you would not want intercepted. HTTPS protects most web traffic already, but a VPN also hides which domains you visit and protects non-HTTPS applications.' },
      { q: 'What is Meshnet for?', a: 'It builds a private encrypted network between your own devices, so you can reach a home or office machine directly without exposing it to the public internet.' },
      { q: 'Why does my bank block me when I use a VPN?', a: 'Because your IP suddenly belongs to a datacentre shared with many other people, which looks like fraud risk. A dedicated IP solves it, or use split tunnelling to keep banking off the VPN.' },
    ],
  },
  {
    id: 'public-wifi', name: 'Public Wi-Fi security', intent: 'vpn for public wifi',
    hook: 'The threat on public Wi-Fi is not usually someone decrypting your HTTPS. It is everything around it \u2014 the domains you visit, the non-HTTPS apps, and the rogue hotspot with a familiar name.',
    keyFeatures: ['Automatic encryption on connect', 'Auto-connect on untrusted networks', 'Threat Protection for malicious hotspots', 'Kill switch'],
    body: [
      'Modern browsers encrypt most traffic with HTTPS, so the classic "someone reading your passwords on caf\u00e9 Wi-Fi" scenario is largely obsolete. The real risks are different and less discussed.',
      'First, metadata: even with HTTPS, your destination domains are visible to the network operator unless you use DNS over HTTPS everywhere. That reveals what you are doing even when it does not reveal the content. Second, non-HTTPS traffic: mail clients using older protocols, some enterprise software, printer discovery, and a surprising amount of IoT chatter is still unencrypted. Third, rogue access points: an attacker sets up a hotspot named after the venue, and devices that have connected to similarly named networks before may join it automatically.',
      'A VPN addresses all three. It encrypts the whole tunnel, including DNS, so the network operator sees only that you connected to a VPN server. NordVPN\u2019s auto-connect on untrusted networks means it engages before you have opened anything.',
      'Set it up once: enable auto-connect for untrusted Wi-Fi, turn on the kill switch, and enable Threat Protection so malicious domains served by a compromised hotspot are blocked before your browser resolves them.',
    ],
    warnings: 'A VPN does not protect you from malware already on your device, and it does not make a compromised endpoint safe. It protects the connection, not the machine.',
    faq: [
      { q: 'Is HTTPS enough on public Wi-Fi?', a: 'For the content of most web pages, largely yes. It does not hide which domains you visit, and it does nothing for non-HTTPS traffic from mail clients, IoT devices or older software.' },
      { q: 'Should my VPN connect automatically?', a: 'Yes. Set NordVPN to auto-connect on untrusted networks. The failure mode you are protecting against is forgetting, and automation removes it.' },
    ],
  },
  {
    id: 'travel', name: 'Travel and living abroad', intent: 'vpn for travel',
    hook: 'Two things break when you cross a border: your streaming subscriptions and your bank\u2019s opinion of you. A VPN fixes the second and mostly fixes the first.',
    keyFeatures: ['Servers in your home country for banking', 'Servers in 150 countries for content', 'Auto-connect', '10 devices for the whole trip'],
    body: [
      'Banks and payment providers use IP geolocation as a fraud signal. Log in from a country you have never visited and you trigger a challenge, a card block, or a locked account. Connecting to a server in your home country before you log in avoids almost all of this.',
      'The streaming side is the reverse: your home subscriptions follow your home country, so BBC iPlayer, Hulu, Peacock and regional Netflix catalogues all stop working. Connecting to a server back home restores them.',
      'The practical advice is to install and test your VPN before you leave. In some countries app stores are filtered and VPN apps are removed, so downloading it on arrival may not be possible. Install on every device you are taking \u2014 NordVPN allows ten simultaneous connections, which covers a phone, laptop and tablet with room to spare.',
      'If you are travelling somewhere with active filtering, learn where the obfuscated server and NordWhisper settings are before you go. Figuring it out on a hotel network that is already blocking VPN traffic is a miserable experience.',
    ],
    warnings: 'Set the VPN up before you travel. Several countries restrict VPN app distribution, and installing on arrival may not be possible.',
    faq: [
      { q: 'Will a VPN stop my bank blocking me abroad?', a: 'Usually yes. Connect to a server in your home country before logging in and your session looks domestic.' },
      { q: 'Should I install a VPN before travelling?', a: 'Yes, always. Some countries block VPN downloads from their app stores, so installing on arrival can be impossible.' },
      { q: 'How many devices can I protect?', a: 'Ten simultaneously on one NordVPN subscription, which covers most travellers with room for a family member.' },
    ],
  },
  {
    id: 'privacy', name: 'Privacy and anti-surveillance', intent: 'vpn for privacy',
    hook: 'A VPN is one layer of a privacy stack, not the whole stack. Being honest about what it does and does not cover is the most useful thing a review can do.',
    keyFeatures: ['Audited no-logs policy', 'Panama jurisdiction', 'RAM-only servers', 'Double VPN', 'Onion Over VPN', 'Threat Protection'],
    body: [
      'Here is what a VPN does: it stops your ISP from seeing which sites you visit, it replaces your IP address with the server\u2019s, and it encrypts your traffic on the local network. In the UK, where ISPs retain twelve months of connection metadata under the Investigatory Powers Act, that is a substantial change to what the record contains.',
      'Here is what it does not do. It does not stop websites from identifying you \u2014 cookies, logged-in accounts and browser fingerprinting all survive a VPN. It does not protect a compromised device. It does not make you anonymous, because the VPN provider can in principle see your traffic, which is exactly why jurisdiction and audit history matter.',
      'NordVPN\u2019s credentials here are strong: Panama jurisdiction with no mandatory retention, RAM-only servers that hold nothing across a reboot, and a no-logs policy audited four times by independent firms including Deloitte. For users who want more, Double VPN chains two servers so that no single one sees both your IP and your destination, and Onion Over VPN routes into Tor from the server.',
      'If you want the strongest privacy-per-euro in the industry, Mullvad is arguably better: no email address, no account, cash by post. NordVPN is the better choice if you also want streaming, a large network and ten devices.',
    ],
    warnings: 'No VPN makes you anonymous. Combine it with a privacy-respecting browser, tracker blocking and separate accounts for separate purposes.',
    faq: [
      { q: 'Can NordVPN see what I do?', a: 'It can see your connection, but its no-logs policy has been independently audited four times and its servers are RAM-only, so there is nothing persistent to retrieve. This is why jurisdiction and audit history matter more than a privacy policy page.' },
      { q: 'What is Double VPN for?', a: 'It routes your traffic through two servers in different countries, so no single server sees both your real IP and your destination. It costs speed and is only worth it for high-risk situations.' },
      { q: 'Is a VPN enough for privacy?', a: 'No. It is one layer. Browser fingerprinting, cookies and account logins all identify you regardless of your IP address.' },
    ],
  },
  {
    id: 'students', name: 'Students and campus networks', intent: 'vpn for students',
    hook: 'Campus networks are filtered, throttled and shared with thousands of people. A VPN restores your control over your own connection \u2014 within your institution\u2019s rules.',
    keyFeatures: ['NordWhisper for filtered networks', 'Threat Protection on shared Wi-Fi', '10 devices', 'Cheap 2-year pricing'],
    body: [
      'University networks are heavily managed. Filtering blocks categories of sites, bandwidth shaping throttles video and P2P, and shared Wi-Fi in halls of residence is open to everyone in the building. All three are legitimate network-management decisions \u2014 and all three are things you may want to work around on your own device.',
      'The filtering is the part most students notice. Campus firewalls typically use deep packet inspection to identify and block VPN protocols, which is exactly what NordWhisper is built for. It disguises VPN traffic so it resembles ordinary HTTPS, which is the correct tool for this situation.',
      'Throttling is the second issue. If your institution shapes traffic by type, encrypting it removes the signal that shaping depends on, and speeds often improve noticeably.',
      'One important caveat: most universities have acceptable-use policies, and circumventing network controls can breach them. A VPN does not make you invisible to your institution \u2014 they can see that you are using one, and they control the network you are connecting from. Read your acceptable-use policy before relying on this.',
      'On cost, the two-year Basic plan at roughly $3.49 a month is the cheapest sensible route, and ten simultaneous connections cover a laptop, phone and tablet.',
    ],
    warnings: 'Using a VPN may breach your institution\u2019s acceptable-use policy even where it is legal. Your university can see that you are using one. Check the policy before you rely on it.',
    faq: [
      { q: 'Is using a VPN at university allowed?', a: 'It is legal almost everywhere, but many acceptable-use policies prohibit circumventing network controls. Check yours \u2014 the consequences are usually academic or disciplinary rather than legal.' },
      { q: 'Why does my campus network block VPNs?', a: 'Filtering and bandwidth management. Campus firewalls use deep packet inspection to identify VPN protocols, which is why obfuscation such as NordWhisper is needed rather than a simple protocol switch.' },
    ],
  },
  {
    id: 'journalists', name: 'Journalists and activists', intent: 'vpn for journalists',
    hook: 'For high-risk users the honest advice is that a commercial VPN is one tool among several, and it is not the strongest one available.',
    keyFeatures: ['Onion Over VPN', 'Double VPN', 'Obfuscated servers', 'No-logs with audits', 'Cryptocurrency payment'],
    body: [
      'If your threat model includes a state actor, a commercial VPN is a useful layer but not the primary one. Tor, secure devices, compartmented accounts and operational discipline matter more. Saying otherwise would be irresponsible.',
      'What a VPN adds is protection on the local network and from your ISP, plus an IP that is not your own. Onion Over VPN is the feature most relevant here: it routes your traffic into the Tor network from the NordVPN server, so your ISP sees only an encrypted VPN connection rather than Tor usage, which in some jurisdictions is itself a marker.',
      'Double VPN is worth understanding properly. It chains two servers so that neither sees both your IP and your destination. It is not the same as Tor and offers less protection against a determined adversary, but it raises the cost of correlation.',
      'NordVPN accepts cryptocurrency payment, which avoids tying the subscription to a card. It does not offer anonymous signup in the way Mullvad does \u2014 you still need an email address.',
      'For genuinely high-risk work, consider a combination: Tor Browser for research, a commercial VPN for general connectivity, a device used for nothing else, and a realistic understanding that metadata and human error are the usual failure points rather than the encryption.',
    ],
    warnings: 'If your threat model includes a state adversary, consult specialist organisations such as the Committee to Protect Journalists or Access Now before relying on any single tool. This page is not security advice.',
    faq: [
      { q: 'Is a VPN enough protection for a journalist?', a: 'No. It protects the connection, not the device or the accounts. Tor, device separation and operational security matter more in high-risk situations.' },
      { q: 'What is Onion Over VPN?', a: 'It routes your traffic into the Tor network from the VPN server, so your ISP sees only VPN traffic rather than Tor. Useful where Tor usage itself attracts attention.' },
    ],
  },
  {
    id: 'censorship', name: 'Bypassing censorship', intent: 'vpn to bypass censorship',
    hook: 'Censorship is the hardest thing a VPN does, and the honest framing is that it is an arms race with no permanent winner.',
    keyFeatures: ['NordWhisper', 'Obfuscated servers', 'OpenVPN over TCP 443', 'Large server network'],
    body: [
      'Modern censorship does not usually block destinations one by one. It blocks the protocols. Russia has moved to disrupting WireGuard and OpenVPN traffic directly, China uses deep packet inspection to identify VPN handshakes, and South Korea inspects the SNI field in TLS connections. A VPN that cannot disguise itself simply does not connect.',
      'NordWhisper exists for exactly this. It is designed to establish a connection on networks that block or shape traditional VPN traffic. Obfuscated servers do something similar for OpenVPN by making the traffic resemble ordinary HTTPS. As a last resort, OpenVPN over TCP port 443 is hard to distinguish from normal web traffic, which is why it remains the classic fallback.',
      'Server diversity matters more here than anywhere else. When a censor blocks a specific IP range, you need somewhere else to go. NordVPN\u2019s 150 countries and 225 locations give it far more options than a small provider.',
      'Two practical points. First, set everything up before you need it \u2014 several countries remove VPN apps from their app stores. Second, never rely on a single tool. In Russia, China and Iran, connectivity changes without warning and no provider can promise uninterrupted access. Have a backup.',
    ],
    warnings: 'No VPN can guarantee access in China, Russia, Iran or similar environments. Rules and filtering change without notice. Always have a second method available.',
    faq: [
      { q: 'Which protocol works best against censorship?', a: 'NordWhisper first, then obfuscated OpenVPN over TCP 443. Standard NordLynx is usually the first thing a censor blocks, because WireGuard has a distinctive handshake.' },
      { q: 'Does a VPN work in China?', a: 'Intermittently. Obfuscated servers work some of the time, but the Great Firewall is continuously updated and no provider can promise consistent access. Set it up before you travel.' },
    ],
  },
];

export default usecases;
