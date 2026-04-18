export type LocaleCode = "en" | "ar";

export interface ChatMessage {
  role: "ai" | "user";
  content: string;
}

export interface MapLocation {
  id: string;
  title: string;
  details: string;
  dotClassName: string;
  latitude: number;
  longitude: number;
  category: string;
  status: string;
  highlight?: string;
}

export interface SiteContent {
  nav: {
    platform: string;
    services: string;
    map: string;
    roadmap: string;
    cta: string;
    localeSwitch: string;
  };
  hero: {
    overline: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    text: string;
    primaryAction: string;
    secondaryAction: string;
    dashboardTitle: string;
    dashboardStats: Array<{ value: string; label: string }>;
  };
  about: {
    overline: string;
    title: string;
    summary: string;
    highlights: string[];
    cards: Array<{
      icon: string;
      title: string;
      text: string;
    }>;
  };
  sections: {
    servicesOverline: string;
    servicesTitle: string;
    chatOverline: string;
    chatTitle: string;
    mapOverline: string;
    mapTitle: string;
  };
  services: Array<{
    icon: string;
    title: string;
    text: string;
    badge: string;
    badgeType: "live" | "soon" | "beta";
    size?: "wide" | "tall" | "normal";
    category?: "core" | "community" | "economy" | "education" | "lifestyle";
  }>;
  chat: {
    systemOnline: string;
    placeholder: string;
    send: string;
    loadingLabel: string;
    fallback: string;
    messages: ChatMessage[];
  };
  map: {
    subtitle: string;
    locations: MapLocation[];
  };
  event: {
    overline: string;
    title: string;
    titleHighlight?: string;
    subtitle: string;
    description: string;
    promoLabel: string;
    promoTitle: string;
    promoDescription: string;
    labTitle: string;
    labSubtitle: string;
    cta: string;
    stats: Array<{ value: string; label: string }>;
    safetyBadges?: Array<{ icon: string; label: string }>;
  };
  footer: {
    copy: string;
    links: string[];
    socialLinks: Array<{ icon: string; label: string; url: string }>;
    whatsappNumber: string;
    adminEmail: string;
  };
  vision: {
    overline: string;
    title: string;
    subtitle: string;
    genesisOverline: string;
    genesisTitle: string;
    genesisParagraphs: string[];
    pillarsOverline: string;
    pillarsTitle: string;
    roadmapOverline: string;
    roadmapTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
}
