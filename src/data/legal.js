// =============================================================================
// VPN legality pages. These target a genuinely different search intent from the
// "best VPN for X" pages (informational vs commercial), which is why both sets
// exist. Facts are hedged because this area changes frequently.
//
// Every page carries a "not legal advice" notice.
// =============================================================================

export const legalCountries = [
  {
    id: 'china', name: 'China', status: 'restricted', statusLabel: 'Restricted \u2014 licensed services only',
    summary: 'China does not ban VPN use by individuals outright, but it requires VPN services to be government-licensed, and providing or selling an unlicensed VPN is clearly illegal. In practice, unlicensed VPNs are widely used by foreign residents, business travellers and Chinese citizens, and enforcement against individuals has historically been light \u2014 but that is a description of past practice, not a guarantee.',
    laws: ['Regulations on the administration of international networking (1997), which require cross-border network channels to use approved channels', 'MIIT notices from 2017 onward requiring VPN services to be licensed', 'Cybersecurity Law 2017', 'Data Security Law 2021 and Personal Information Protection Law 2021'],
    enforcement: 'Enforcement has focused on providers and sellers rather than individual users. Individuals have been penalised in some cases, particularly where VPN use accompanied other offences. Enforcement intensity rises around politically sensitive dates and varies by province.',
    blocked: 'Google and all Google services, YouTube, Facebook, Instagram, WhatsApp, X, most Western news organisations, Dropbox, parts of Wikipedia, and many VPN provider websites.',
    advice: 'If you are travelling to China, install and fully configure your VPN before you arrive. VPN apps are removed from Chinese app stores and provider websites may be unreachable once you are there. Use obfuscated servers or NordWhisper, and have a second provider configured as a backup, because no service works reliably all the time.',
    faq: [
      { q: 'Can tourists get in trouble for using a VPN in China?', a: 'Enforcement against foreign visitors has historically been rare, but the legal framework does not clearly permit unlicensed VPN use and there is no formal exemption for tourists. The safest assumption is that it is tolerated rather than legal.' },
      { q: 'Does NordVPN work in China?', a: 'Intermittently. Obfuscated servers and NordWhisper work some of the time, but the Great Firewall is continuously updated and no provider can promise consistent access.' },
    ],
  },
  {
    id: 'russia', name: 'Russia', status: 'restricted', statusLabel: 'Restricted \u2014 protocols actively blocked',
    summary: 'Using a VPN is not itself a criminal offence for individuals in Russia, but the environment has tightened repeatedly. Roskomnadzor blocks VPN protocols rather than only destinations, VPN apps were removed from Russian app stores, and from 2025 restrictions extended to advertising VPN bypass tools. Rules differ by region and change frequently.',
    laws: ['Federal Law No. 276-FZ (2017), requiring VPNs to block access to banned content', 'Roskomnadzor orders from 2024 blocking VPN protocols including WireGuard and OpenVPN', '2025 legislation restricting advertising of VPN bypass tools, with fines', 'Sovereign internet law (2019), establishing the TSPU filtering infrastructure'],
    enforcement: 'The state\u2019s focus has been on providers, advertisers and the technical layer rather than prosecuting individuals for use. However, using a VPN to access material that is itself illegal remains an offence, and the TSPU infrastructure means the state can see that a VPN is in use even when it cannot see through it.',
    blocked: 'Instagram, Facebook, X, most independent Russian media, many international news organisations, LinkedIn, and thousands of other resources.',
    advice: 'Assume nothing works permanently. Configure everything in advance, test NordWhisper and obfuscated OpenVPN before you need them, keep the app updated, and always have a second method available. Do not rely on a VPN as your only means of accessing anything critical.',
    faq: [
      { q: 'Is it illegal to use a VPN in Russia?', a: 'Individual use has not been criminalised in the way that advertising bypass tools has been, but the legal picture has tightened repeatedly and varies by region. Verify the current position from a local source.' },
      { q: 'Why does Russia block VPN protocols rather than websites?', a: 'Because blocking protocols defeats all VPNs at once, whereas blocking destinations is a permanent game of whack-a-mole. It is the more effective approach for a censor.' },
    ],
  },
  {
    id: 'iran', name: 'Iran', status: 'effectively-banned', statusLabel: 'Severely restricted \u2014 high risk',
    summary: 'Iran has moved towards requiring state approval for VPN access, removes VPN apps from app stores, promotes government-approved alternatives, and has repeatedly imposed near-total national internet shutdowns. This is among the most restrictive environments in the world and a VPN should not be treated as protection.',
    laws: ['Computer Crimes Law (2009)', 'Regulations requiring government authorisation for VPN services', 'Repeated directives restricting unapproved circumvention tools', 'National Information Network programme'],
    enforcement: 'Enforcement is active and consequences are severe. Iran has prosecuted people for online activity, and internet shutdowns during protest periods have removed connectivity entirely, which no VPN can circumvent.',
    blocked: 'Facebook, X, YouTube, Telegram (intermittently), most international news, and a very large share of the international internet.',
    advice: 'If you are in Iran, understand that a VPN is one partial tool in a genuinely dangerous environment. Configure everything before arrival, use obfuscated protocols, and consult specialist digital-safety organisations rather than relying on commercial VPN marketing. Do not assume anonymity.',
    faq: [
      { q: 'Are VPNs banned in Iran?', a: 'Iran requires state approval for VPN services and restricts unapproved ones. Enforcement against individuals varies, but this is a high-risk environment and the rules are not transparent.' },
      { q: 'Does a VPN work during an Iranian internet shutdown?', a: 'No. A shutdown removes connectivity entirely. No VPN restores it.' },
    ],
  },
  {
    id: 'united-arab-emirates', name: 'United Arab Emirates', status: 'grey', statusLabel: 'Legal tool, penalised misuse',
    summary: 'Using a VPN is legal in the UAE. What carries severe penalties is using one to commit a crime, and the cybercrime decree-law sets fines that reach into the millions of dirhams. The most common everyday restriction is on VoIP calling, which is blocked on consumer connections.',
    laws: ['Federal Decree-Law No. 5 of 2012 on cybercrime, as amended in 2021 \u2014 Article 9 covers using a VPN or fake IP to commit a crime', 'TDRA regulatory policy on VoIP services', 'Telecommunications Law (2006)'],
    enforcement: 'The VoIP block is enforced technically and consistently at ISP level. Prosecutions under the cybercrime law focus on content offences and fraud rather than VPN use as such, but the penalties are severe enough that the distinction matters.',
    blocked: 'VoIP calling services including WhatsApp calls, FaceTime audio and Viber; gambling sites; adult content; some dating sites; certain political content.',
    advice: 'The most common reason visitors and residents use a VPN in the UAE is to restore VoIP calling, which sits in a genuine grey area. Use a VPN for security and content access, keep the kill switch on for public Wi-Fi, and understand that the law punishes the underlying conduct heavily regardless of the tool.',
    faq: [
      { q: 'Can I be fined for using a VPN in the UAE?', a: 'Not for using one. The cybercrime law penalises using a VPN to commit a crime, with fines reported between AED 500,000 and AED 2 million. The tool itself is legal.' },
      { q: 'Are WhatsApp calls legal in the UAE?', a: 'VoIP calling apps are blocked on consumer connections under TDRA policy. Licensed alternatives such as Botim are permitted.' },
    ],
  },
  {
    id: 'saudi-arabia', name: 'Saudi Arabia', status: 'grey', statusLabel: 'Legal tool, penalised misuse',
    summary: 'Saudi Arabia does not ban VPNs, and they are used openly by businesses. The Anti-Cyber Crime Law imposes imprisonment and fines of up to SAR 3 million for defined content offences, and the state filters extensively. The practical position is that the tool is tolerated and the conduct is policed.',
    laws: ['Anti-Cyber Crime Law (2007), as amended', 'CITC/CST filtering framework', 'Telecommunications Law'],
    enforcement: 'Content filtering is enforced technically and comprehensively. Prosecutions focus on social media posts and content offences, with several high-profile cases involving long sentences.',
    blocked: 'VoIP calling on consumer connections, gambling, adult content, some political and religious content, and various news sites.',
    advice: 'Use a VPN for connection security, particularly on hotel and public Wi-Fi. Understand that there is no realistic expectation of anonymity, that social media activity is monitored, and that the legal consequences for content offences are severe.',
    faq: [
      { q: 'Is a VPN legal in Saudi Arabia?', a: 'Yes, VPNs are not banned and are widely used by businesses. The offences relate to what you access or publish rather than the tool.' },
      { q: 'Why are VoIP calls blocked?', a: 'To protect the voice revenue of licensed telecom operators, which is the same economic rationale as in the UAE and several other Gulf states.' },
    ],
  },
  {
    id: 'egypt', name: 'Egypt', status: 'grey', statusLabel: 'Legal tool, blocked content is an offence',
    summary: 'Egypt has no explicit ban on VPNs, but Law No. 175 of 2018 makes accessing blocked websites an offence, and several hundred sites are blocked. Since a VPN is the obvious means of reaching them, the practical risk is real for anyone using one for political content.',
    laws: ['Anti-Cyber and Information Technology Crimes Law No. 175 of 2018', 'Telecommunications Regulation Law No. 10 of 2003', 'Emergency-era provisions on media and internet'],
    enforcement: 'Blocking is comprehensive and actively maintained. Prosecutions under Law 175 have targeted journalists, activists and ordinary social media users.',
    blocked: 'Several hundred sites including human-rights organisations, independent news outlets, some messaging services, and a large number of news domains.',
    advice: 'If you need a VPN in Egypt for safety or journalism, treat it as one layer rather than a solution. Use obfuscated servers, enable the kill switch, and consult organisations such as Access Now or the Committee to Protect Journalists for threat-appropriate guidance.',
    faq: [
      { q: 'Is it illegal to use a VPN in Egypt?', a: 'There is no explicit ban on VPNs. However, Law 175 of 2018 criminalises accessing blocked sites, and a VPN is the standard means of doing so \u2014 so the risk attaches to the use rather than the tool.' },
      { q: 'Does a VPN make me anonymous in Egypt?', a: 'No. No VPN does. Device identifiers, accounts and behaviour identify people far more often than IP addresses.' },
    ],
  },
  {
    id: 'turkey', name: 'Turkey', status: 'legal', statusLabel: 'Legal',
    summary: 'VPN use is legal in Turkey. The state blocks and throttles specific platforms rather than the tool \u2014 Wikipedia was blocked for over two years, Instagram was blocked in 2024, and X has been repeatedly throttled. VPNs are widely used to reach these services.',
    laws: ['Law No. 5651 on internet broadcasting and combating crimes committed online', 'Law No. 6518 amendments extending blocking powers', 'Provisions of the Turkish Penal Code applied to online posts'],
    enforcement: 'Platform blocking and throttling are enforced at ISP level and are common. Prosecutions focus on content, particularly presidential insult and terrorism-related offences, and Turkey has one of the highest rates of social-media prosecutions in Europe.',
    blocked: 'Thousands of URLs under Law 5651; Wikipedia (2017\u20132020); Instagram (2024); repeated throttling of X; RT\u00dcK-licensed streaming restrictions.',
    advice: 'A VPN is legal and works well in Turkey. Because the state often throttles rather than blocks, a slow-but-working connection is a common symptom \u2014 switch protocol before concluding anything is broken.',
    faq: [
      { q: 'Is a VPN legal in Turkey?', a: 'Yes. Turkish law restricts content rather than VPN tools, and VPNs are openly sold and used.' },
      { q: 'Why is Instagram throttled rather than blocked?', a: 'Throttling is harder for users to notice and attribute than an outright block, which reduces the political cost. A VPN removes the ability to identify the destination and typically restores full speed.' },
    ],
  },
  {
    id: 'pakistan', name: 'Pakistan', status: 'restricted', statusLabel: 'Registration required \u2014 unclear enforcement',
    summary: 'Pakistan has long blocked thousands of URLs through the PTA and imposed repeated nationwide platform bans. In 2024 the government announced a requirement for VPN users and businesses to register their VPN usage with a newly created national body, and deployed a national firewall that disrupted VPN and messaging traffic. Enforcement against individuals has been inconsistent and the position remains unclear.',
    laws: ['Prevention of Electronic Crimes Act 2016 (PECA)', 'Pakistan Telecommunication (Re-organisation) Act 1996', '2024 directives establishing a National Cyber Emergency Centre and VPN registration requirement', 'PTA blocking orders under PECA Section 37'],
    enforcement: 'PTA blocking is comprehensive and routine. The 2024 VPN registration requirement was announced with threats of action against unregistered use, but enforcement against individual users has been inconsistent and the technical firewall caused widespread disruption to ordinary services.',
    blocked: 'Thousands of URLs; YouTube (2012\u20132016); repeated TikTok bans; X (heavily restricted); various political and religious content.',
    advice: 'Use NordWhisper or obfuscated OpenVPN, because the national firewall targets standard VPN protocols. Assume your usage may be attributable. If you need a VPN for work or safety, consult a specialist organisation rather than relying on a commercial service alone.',
    faq: [
      { q: 'Is a VPN legal in Pakistan?', a: 'The position is unclear and has shifted. In 2024 the government introduced a registration requirement and threatened action against unregistered use, while enforcement against individuals has been inconsistent. Check current rules before relying on it.' },
      { q: 'Why does my VPN keep disconnecting in Pakistan?', a: 'The national firewall actively disrupts VPN protocols. NordWhisper and obfuscated OpenVPN over TCP 443 are the most likely to hold a connection.' },
    ],
  },
  {
    id: 'bangladesh', name: 'Bangladesh', status: 'grey', statusLabel: 'Not explicitly banned \u2014 shifting rules',
    summary: 'Bangladesh has no statute that explicitly bans VPN use, and VPNs are widely used for work, gaming and unblocking. However, the BTRC maintains a large blocking list and the regulatory position on circumvention tools has shifted over time, including periods of mass blocking and mobile data restriction around elections.',
    laws: ['Bangladesh Telecommunications Act 2001', 'ICT Act 2006, as amended in 2013', 'BTRC licensing and blocking directives', 'Public Safety Act provisions used during periods of unrest'],
    enforcement: 'BTRC blocking has included mass actions covering thousands of sites, notably in 2019. Mobile data has been restricted around elections and during periods of political tension, and enforcement of ICT Act provisions against online content has been active.',
    blocked: 'Thousands of sites blocked by BTRC, including large 2019 actions against pornographic, gambling and VoIP-related sites; Facebook and WhatsApp have been restricted during political events.',
    advice: 'A VPN is a normal, widely used tool in Bangladesh. Use the geographically nearest server \u2014 usually Singapore \u2014 because international bandwidth is constrained. Keep the kill switch on, and be aware that during a mobile data restriction no VPN restores connectivity.',
    faq: [
      { q: 'Is a VPN legal in Bangladesh?', a: 'There is no explicit statutory ban and VPNs are commonly used. The regulatory position on circumvention tools has shifted over time, so check current BTRC guidance before relying on one for anything sensitive.' },
      { q: 'Why is my internet slow in Bangladesh even with a VPN off?', a: 'International bandwidth is constrained by limited submarine cable capacity. A VPN adds to an already long route, so choose the nearest server.' },
    ],
  },
  {
    id: 'india', name: 'India', status: 'legal', statusLabel: 'Legal \u2014 with provider data duties',
    summary: 'VPN use is completely legal in India. What changed in 2022 is what providers must do: CERT-In directions require VPN providers operating servers inside India to retain specified user data for five years, which prompted many international providers to withdraw their domestic servers.',
    laws: ['Information Technology Act 2000, Section 69A (blocking powers)', 'CERT-In Direction No. 20(3)/2022-CERT-In (data retention for VPN providers)', 'Telegraph Act provisions used for internet shutdowns', 'IT Rules 2021'],
    enforcement: 'India has one of the highest counts of internet shutdowns in the world, with dozens recorded in most years, concentrated in Jammu & Kashmir, Punjab, Haryana and Manipur. Section 69A blocking orders cover hundreds of URLs, and app bans have removed dozens of foreign applications.',
    blocked: 'Hundreds of URLs under Section 69A; dozens of apps including TikTok, WeChat and various Chinese services; frequent regional internet shutdowns.',
    advice: 'Use a VPN freely \u2014 it is legal. Be aware that providers with Indian servers face retention obligations, which is one reason many now route Indian traffic through servers abroad. On Indian mobile networks, NordLynx is markedly better than OpenVPN because of its lighter handshake.',
    faq: [
      { q: 'Is a VPN legal in India?', a: 'Yes, completely. There is no law restricting VPN use. The 2022 CERT-In rules affect what providers must retain, not what users may do.' },
      { q: 'Will a VPN help during an internet shutdown?', a: 'No. A shutdown removes the underlying connectivity, and no VPN restores it. Shutdowns and site blocking are different things.' },
    ],
  },
  {
    id: 'vietnam', name: 'Vietnam', status: 'legal', statusLabel: 'Legal \u2014 tightening content rules',
    summary: 'VPN use is legal and widespread in Vietnam, particularly for business and gaming. The restrictions target content and platforms: Decree 147, effective December 2024, tightened rules on cross-border content, real-name verification and livestreaming.',
    laws: ['Cybersecurity Law 2018, including data localisation requirements', 'Decree 147/2024 on internet services and online information', 'Decree 72/2013 on internet services', 'Penal Code provisions on anti-state propaganda'],
    enforcement: 'Content enforcement is active, with prosecutions under anti-state provisions. The technical layer is comparatively open \u2014 Vietnam does not operate a China-style firewall, and VPN traffic is not systematically blocked.',
    blocked: 'Some overseas political, religious and human-rights sites; restricted content categories under Decree 147.',
    advice: 'Use a VPN freely. Singapore is the best server for Vietnamese users because of proximity and peering. Understand that a VPN does not protect you from prosecution for content posted under an identified account.',
    faq: [
      { q: 'Is a VPN legal in Vietnam?', a: 'Yes. VPNs are legal and widely used, particularly by businesses and online gamers.' },
      { q: 'What did Decree 147 change?', a: 'It tightened requirements around cross-border content, real-name verification for social media accounts, and licensing for livestreaming \u2014 aimed at platforms and creators rather than VPN users.' },
    ],
  },
  {
    id: 'indonesia', name: 'Indonesia', status: 'legal', statusLabel: 'Legal',
    summary: 'VPN use is legal and extremely common in Indonesia. The Kominfo ministry applies DNS-level filtering through Internet Positif and has blocked non-compliant platforms under the PSE registration regime \u2014 in 2022 that briefly included Steam, PayPal and Yahoo.',
    laws: ['Ministerial Regulation 5/2020 on private electronic system operators (PSE regime)', 'Electronic Information and Transactions Law (UU ITE)', 'Kominfo blocking regulations', '2023\u20132025 online gambling enforcement directives'],
    enforcement: 'Internet Positif DNS filtering is applied by ISPs and is straightforward to circumvent. PSE enforcement has blocked major international services temporarily. The online-gambling crackdown has blocked tens of thousands of sites and frozen associated bank accounts.',
    blocked: 'Internet Positif categories including adult content and gambling; non-PSE-registered platforms; tens of thousands of gambling-related domains.',
    advice: 'Because Internet Positif is largely DNS-based, changing DNS sometimes works \u2014 but a full VPN tunnel changes both DNS and IP and is more reliable. Singapore is the best nearby server.',
    faq: [
      { q: 'Is a VPN legal in Indonesia?', a: 'Yes, with no restrictions on personal use.' },
      { q: 'Why did Steam and PayPal get blocked in Indonesia?', a: 'They had not completed PSE registration with Kominfo by the deadline in 2022. Both registered shortly afterwards and access was restored.' },
    ],
  },
  {
    id: 'thailand', name: 'Thailand', status: 'legal', statusLabel: 'Legal',
    summary: 'VPN use is legal and common in Thailand, including among the large expat and remote-worker population. The legal risk comes from content rather than the tool: the Computer Crime Act enables blocking, and Article 112 l\u00e8se-majest\u00e9 is applied to online posts with severe penalties.',
    laws: ['Computer Crime Act 2007, as amended in 2017', 'Criminal Code Article 112 (l\u00e8se-majest\u00e9)', 'Emergency decree provisions used during periods of protest'],
    enforcement: 'Site blocking is routine under the Computer Crime Act. Article 112 prosecutions for online posts carry sentences of three to fifteen years per count, and have been applied to social media activity with VPN use offering no protection where an account is identified.',
    blocked: 'Gambling sites, some streaming piracy sites, and content deemed a threat to national security or public morals.',
    advice: 'A VPN is legal and useful in Thailand \u2014 particularly for home-country banking, which frequently blocks foreign IPs. Understand that it does not protect you from prosecution for identified online posts.',
    faq: [
      { q: 'Is a VPN legal in Thailand?', a: 'Yes. VPN use is legal and widely used by businesses, expats and remote workers.' },
      { q: 'Does a VPN protect me from Article 112?', a: 'No. Prosecutions are based on account ownership and content, not IP address. A VPN changes your IP; it does not change who owns the account.' },
    ],
  },
  {
    id: 'malaysia', name: 'Malaysia', status: 'legal', statusLabel: 'Legal',
    summary: 'VPN use is legal in Malaysia and commonly used for business, gaming and streaming. The MCMC blocks selected sites under the Communications and Multimedia Act, and the country introduced an Online Safety Act alongside a 2025 licensing regime for social media and messaging platforms.',
    laws: ['Communications and Multimedia Act 1998, Section 233', 'Online Safety Act provisions', '2025 social media licensing regime', 'Sedition Act 1948 as applied online'],
    enforcement: 'MCMC blocking is applied at ISP level. Prosecutions under Section 233 target offensive or obscene content, and the licensing regime has required major platforms to obtain local licences.',
    blocked: 'Selected gambling, adult and content-deemed-harmful sites; platform-level obligations under the licensing regime.',
    advice: 'Use a VPN freely. Singapore is effectively the local hub, typically under 10 ms from Kuala Lumpur, and gives access to a wider range of content than domestic servers.',
    faq: [
      { q: 'Is a VPN legal in Malaysia?', a: 'Yes, with no licensing requirement for personal use.' },
      { q: 'What is the 2025 licensing regime?', a: 'It requires social media and messaging platforms above a size threshold to obtain a Malaysian licence. It targets platforms, not VPN users.' },
    ],
  },
  {
    id: 'belarus', name: 'Belarus', status: 'restricted', statusLabel: 'Severely restricted',
    summary: 'Belarus blocks extensively, restricts VPN and Tor use, and has repeatedly imposed internet shutdowns during periods of political unrest. It is among the most restrictive environments in Europe and a VPN should not be relied on as protection.',
    laws: ['Mass Media Law, as amended', 'Operative-Investigative Activity Law', 'Decrees restricting anonymisation tools', 'Provisions used to restrict internet access during unrest'],
    enforcement: 'Blocking is comprehensive and enforced through state-controlled ISPs. Internet shutdowns have been imposed during protest periods, and enforcement against online activity is severe.',
    blocked: 'Independent media, opposition resources, many international news organisations, and a large share of independent political content.',
    advice: 'Treat this as a high-risk environment. Configure everything in advance, use obfuscated protocols, and do not assume a VPN provides meaningful protection against a state adversary.',
    faq: [
      { q: 'Are VPNs legal in Belarus?', a: 'Belarus restricts anonymisation tools and blocks VPN services extensively. Enforcement is active and the legal framework is opaque.' },
      { q: 'Does a VPN work during a Belarus internet shutdown?', a: 'No. A shutdown removes connectivity, which no VPN can restore.' },
    ],
  },
  {
    id: 'turkmenistan', name: 'Turkmenistan', status: 'effectively-banned', statusLabel: 'Effectively banned',
    summary: 'Turkmenistan operates one of the most closed internet environments in the world. VPN use is prohibited in practice, foreign social media and messaging apps are blocked, and internet access is expensive, slow and heavily monitored.',
    laws: ['Law on Communications', 'Provisions prohibiting circumvention tools', 'State control of the sole ISP, Turkmentelekom'],
    enforcement: 'The state controls the only ISP, blocks VPNs technically, and has prosecuted individuals for VPN use and for accessing blocked content. Independent reporting from inside the country is extremely limited.',
    blocked: 'Nearly all independent news, foreign social media including Facebook, Instagram, X and YouTube, most messaging apps, and virtually all independent political content.',
    advice: 'This is an extreme environment with real personal risk. If you are travelling there, understand that no consumer VPN offers reliable protection and that the legal consequences are serious. Consult specialist safety organisations.',
    faq: [
      { q: 'Are VPNs legal in Turkmenistan?', a: 'No, in practice. VPN use is prohibited and technically blocked, and individuals have faced consequences for using them.' },
      { q: 'Is there any way to access the open internet in Turkmenistan?', a: 'Reliably, no. This is one of the most restricted internet environments in the world.' },
    ],
  },
  {
    id: 'north-korea', name: 'North Korea', status: 'effectively-banned', statusLabel: 'No public internet',
    summary: 'North Korea has no public internet. Foreigners have tightly controlled access, and the domestic population uses Kwangmyong, a closed national intranet. The question of VPN legality is not meaningful in this context.',
    laws: ['State control of all telecommunications', 'Severe penalties for accessing foreign media'],
    enforcement: 'Absolute. Accessing foreign media carries extreme penalties, and there is no public internet access to protect.',
    blocked: 'The entire global internet for the domestic population.',
    advice: 'Not applicable. This page exists for completeness of the country list.',
    faq: [
      { q: 'Are VPNs legal in North Korea?', a: 'The question does not arise. There is no public internet, and accessing foreign media carries extreme penalties.' },
      { q: 'Can visitors use a VPN in North Korea?', a: 'Foreign visitors have heavily monitored, restricted internet access in specific locations. There is no expectation of privacy of any kind.' },
    ],
  },
  {
    id: 'uganda', name: 'Uganda', status: 'legal', statusLabel: 'Legal \u2014 but taxed',
    summary: 'VPN use is legal in Uganda. The country became notable for imposing an over-the-top social media tax in 2018, which drove widespread VPN adoption before being replaced by a broader data levy in 2021. Blocking has been imposed during elections.',
    laws: ['Computer Misuse Act 2011, as amended in 2022', 'Excise Duty Act amendments imposing the OTT tax (2018) and data levy (2021)', 'Communications Act provisions used during elections'],
    enforcement: 'Social media was blocked during the 2021 elections, and the Computer Misuse Act has been used against online speech. The 2018 OTT tax was widely circumvented with VPNs and was replaced in 2021.',
    blocked: 'Social media platforms during election periods; some content categories.',
    advice: 'A VPN is legal and useful in Uganda. European servers generally give the best routing. Understand that the Computer Misuse Act applies to content regardless of your IP address.',
    faq: [
      { q: 'Is a VPN legal in Uganda?', a: 'Yes. VPN use is legal, and adoption rose sharply after the 2018 social media tax.' },
      { q: 'What was the OTT tax?', a: 'A daily levy on access to social media platforms introduced in 2018. It was widely circumvented with VPNs and was replaced by a general data levy in 2021.' },
    ],
  },
  {
    id: 'venezuela', name: 'Venezuela', status: 'grey', statusLabel: 'Legal tool, extensive blocking',
    summary: 'VPN use is not banned in Venezuela, but the state blocks news sites extensively, has blocked X, and throttles or blocks access during political events. ISPs comply with blocking orders from the telecommunications regulator.',
    laws: ['Law on Social Responsibility in Radio, Television and Electronic Media (RESORTE-ME)', 'Ley del Odio (2017)', 'CONATEL blocking orders'],
    enforcement: 'CONATEL blocking orders are comprehensive and cover hundreds of news domains. Access to news sites is frequently restricted during political events, and VPN use has become common as a result.',
    blocked: 'Hundreds of news domains, X, some messaging services, and international news organisations.',
    advice: 'A VPN is a practical necessity for accessing independent news in Venezuela. Use obfuscated servers if standard protocols fail, and keep the app updated as blocking methods change.',
    faq: [
      { q: 'Is a VPN legal in Venezuela?', a: 'There is no explicit ban on VPN use. Blocking targets specific sites and platforms rather than the tool.' },
      { q: 'Why are so many news sites blocked?', a: 'CONATEL issues blocking orders to ISPs, and hundreds of independent news domains have been affected, particularly during political events.' },
    ],
  },
  {
    id: 'united-states', name: 'United States', status: 'legal', statusLabel: 'Fully legal',
    summary: 'VPN use is legal in all 50 states with no registration or licensing requirement. The US has no general ISP data-retention mandate, though it is one of the jurisdictions VPN providers most avoid registering in because of the reach of US legal process.',
    laws: ['No federal statute restricting VPN use', 'Electronic Communications Privacy Act', 'CLOUD Act (affects US-registered providers)', 'State-level privacy laws including CCPA'],
    enforcement: 'There is no enforcement against VPN use because there is no restriction on it. The relevant legal risk is entirely about the underlying conduct.',
    blocked: 'Nothing at national level. Some ISPs offer optional filtering, and schools and workplaces apply their own policies.',
    advice: 'Use a VPN freely. The main reasons Americans use one are public Wi-Fi security, streaming blackouts, ISP throttling and price comparison.',
    faq: [
      { q: 'Are VPNs legal in all 50 states?', a: 'Yes. There is no state or federal law restricting VPN use.' },
      { q: 'Why do VPN companies avoid US registration?', a: 'Because US legal process \u2014 including national security letters \u2014 reaches US-registered companies directly and can come with secrecy obligations. Panama or Switzerland registration avoids that.' },
    ],
  },
  {
    id: 'united-kingdom', name: 'United Kingdom', status: 'legal', statusLabel: 'Fully legal',
    summary: 'VPN use is completely legal in the UK. The relevant issue is not the tool but the Investigatory Powers Act 2016, which requires ISPs to retain twelve months of connection metadata accessible to a wide range of public bodies.',
    laws: ['Investigatory Powers Act 2016', 'Data Retention and Investigatory Powers Act 2014', 'Online Safety Act 2023', 'Regulation of Investigatory Powers Act 2000'],
    enforcement: 'There is no enforcement against VPN use. The Investigatory Powers Act obligations fall on ISPs and operators rather than users, and VPN use is openly sold and advertised in the UK.',
    blocked: 'Court-ordered blocking of copyright-infringing sites; age-verification requirements on adult content; ISP-level family filters applied at account level.',
    advice: 'Use a VPN freely. Its main value in the UK is that it changes what the retained metadata contains \u2014 your ISP sees only a connection to a VPN server, not the destinations beyond it.',
    faq: [
      { q: 'Is a VPN legal in the UK?', a: 'Yes, completely, with no registration requirement.' },
      { q: 'Does a VPN defeat the Investigatory Powers Act?', a: 'It changes what your ISP retains, because your ISP only sees the VPN server. It does not hide that you used a VPN, and it does not affect other forms of surveillance.' },
    ],
  },
  {
    id: 'germany', name: 'Germany', status: 'legal', statusLabel: 'Fully legal',
    summary: 'VPN use is entirely legal in Germany with no restrictions. Germany\u2019s long-running dispute over data retention was resolved in 2023 with a "quick freeze" model replacing blanket retention.',
    laws: ['Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (2023), replacing blanket retention with quick freeze', 'NetzDG (Network Enforcement Act)', 'GDPR as applied nationally'],
    enforcement: 'No enforcement against VPN use. Copyright enforcement is active but civil rather than criminal, and operates through the Abmahnung warning-letter system.',
    blocked: 'Very little at state level. Some gambling sites are restricted, and NetzDG requires platforms to remove illegal content.',
    advice: 'Use a VPN freely. The most common German use case is P2P: a VPN with a working kill switch prevents your real IP appearing in the swarm logs that Abmahnung letters are generated from.',
    faq: [
      { q: 'Is a VPN legal in Germany?', a: 'Yes, entirely, with no restrictions of any kind.' },
      { q: 'Does a VPN protect me from Abmahnungen?', a: 'It prevents your IP appearing in the P2P swarm, which is what those letters are based on. Downloading copyrighted material remains illegal, and this is not legal advice.' },
    ],
  },
  {
    id: 'japan', name: 'Japan', status: 'legal', statusLabel: 'Fully legal',
    summary: 'VPN use is legal and common in Japan, including for business. Japan has no data-retention mandate and comparatively light internet regulation.',
    laws: ['Telecommunications Business Act', 'Act on the Protection of Personal Information (APPI)', 'No data-retention mandate'],
    enforcement: 'No enforcement against VPN use. Regulation focuses on personal information handling by businesses rather than on user tools.',
    blocked: 'Very little. Some piracy sites have been subject to ISP-level blocking requests.',
    advice: 'Use a VPN freely. The most common Japanese use case is accessing larger streaming catalogues, since Netflix Japan carries materially fewer Western titles than Netflix US.',
    faq: [
      { q: 'Is a VPN legal in Japan?', a: 'Yes, with no restrictions.' },
      { q: 'Why do Japanese users use VPNs?', a: 'Mostly for streaming catalogues. Netflix Japan has a much smaller Western library than Netflix US because many titles are licensed to Japanese broadcasters instead.' },
    ],
  },
  {
    id: 'brazil', name: 'Brazil', status: 'legal', statusLabel: 'Fully legal \u2014 with a court-order caveat',
    summary: 'VPN use is legal in Brazil. The notable exception arose in 2024, when a Supreme Court order blocking X also authorised fines for people using VPNs to circumvent that specific block. The order was lifted after the platform complied, but the precedent stands.',
    laws: ['Marco Civil da Internet (Law 12.965/2014)', 'Lei Geral de Prote\u00e7\u00e3o de Dados (LGPD, 2018)', 'Judicial blocking orders under the Marco Civil'],
    enforcement: 'Court-ordered platform blocking has happened, most prominently with X in 2024. The LGPD is actively enforced by the ANPD. VPN use itself is unregulated.',
    blocked: 'X (August\u2013October 2024); various piracy and illegal-content sites under court order.',
    advice: 'A VPN is legal and widely used in Brazil. The 2024 precedent is a useful reminder that circumventing a specific court order is a different matter from using the tool.',
    faq: [
      { q: 'Is a VPN legal in Brazil?', a: 'Yes. In 2024 a court order blocking X also authorised fines for circumventing that block with a VPN \u2014 the tool is legal, but circumventing a specific order was not.' },
      { q: 'What happened with X in Brazil?', a: 'A Supreme Court order blocked X nationally in August 2024 over a compliance dispute. It was lifted in October 2024 after the platform appointed a legal representative and complied.' },
    ],
  },
  {
    id: 'australia', name: 'Australia', status: 'legal', statusLabel: 'Fully legal',
    summary: 'VPN use is completely legal in Australia. The relevant context is the 2015 metadata retention scheme, which requires carriers to keep two years of connection data, and the Assistance and Access Act 2018, which affects locally registered providers.',
    laws: ['Telecommunications (Interception and Access) Amendment (Data Retention) Act 2015', 'Telecommunications and Other Legislation Amendment (Assistance and Access) Act 2018', 'Online Safety Act 2021'],
    enforcement: 'No enforcement against VPN use. The eSafety Commissioner has site-blocking powers, and the metadata scheme applies to carriers rather than users.',
    blocked: 'Refused-classification content; some piracy sites under court order; eSafety takedown notices.',
    advice: 'Use a VPN freely. The main Australian use cases are geoblocking, sports blackouts and the metadata retention scheme.',
    faq: [
      { q: 'Is a VPN legal in Australia?', a: 'Yes, completely, with no restrictions.' },
      { q: 'What is the Assistance and Access Act?', a: 'It allows Australian authorities to compel local companies to assist with decryption. It is a reason to prefer a VPN registered outside Australia rather than a reason to avoid VPNs.' },
    ],
  },
  {
    id: 'canada', name: 'Canada', status: 'legal', statusLabel: 'Fully legal',
    summary: 'VPN use is completely legal in Canada. Canada has lawful-access provisions and a tested history of warrantless subscriber lookups, but no blanket retention regime comparable to the UK or Australia.',
    laws: ['Personal Information Protection and Electronic Documents Act (PIPEDA)', 'Telecommunications Act', 'Copyright Notice-and-Notice regime'],
    enforcement: 'No enforcement against VPN use. The Copyright Notice-and-Notice system forwards infringement allegations to subscribers, and VPN use prevents the IP in those notices from being yours.',
    blocked: 'Very little at federal level. Some court-ordered blocking of piracy sites.',
    advice: 'Use a VPN freely. The main Canadian use cases are sports blackouts, US-only content libraries and the notice-and-notice copyright system.',
    faq: [
      { q: 'Is a VPN legal in Canada?', a: 'Yes, completely, with no restrictions.' },
      { q: 'Does a VPN stop copyright notices?', a: 'It stops your IP appearing in the P2P swarm, which is what the notices are generated from. Downloading copyrighted material remains infringing.' },
    ],
  },
];

export default legalCountries;
