import type {
  AboutData,
  AboutStat,
  EventItem,
  FooterData,
  FooterLink,
  FooterSocialLink,
  GalleryPhoto,
  GallerySection,
  HeroCta,
  HeroData,
  HomePageData,
  HomePageSeo,
  NavbarData,
  NavDropdownItem,
  NavItem,
  StudyGroup,
  StudyGroupsSection,
  EventsSection,
  UtilityLink,
  WpImage,
} from "./types";
import type {
  AboutSectionAcf,
  EventPostAcf,
  EventsSectionAcf,
  GalleryPhotoPostAcf,
  GallerySectionAcf,
  HeroSectionAcf,
  HomePageAcf,
  StudyGroupPostAcf,
  StudyGroupSectionAcf,
  WpEventPost,
  WpGalleryPhotoPost,
  WpPageResponse,
  WpPostResponse,
  WpStudyGroupPost,
} from "./wordpress-types";

type AcfRecord = Record<string, unknown>;

function asRecord(value: unknown): AcfRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as AcfRecord)
    : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    if (cleaned !== "") {
      const parsed = Number(cleaned);
      return Number.isNaN(parsed) ? fallback : parsed;
    }
  }
  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function mapAcfImage(value: unknown, fallbackAlt = ""): WpImage {
  if (typeof value === "string") {
    return { url: value, alt: fallbackAlt };
  }

  const image = asRecord(value);

  return {
    url: asString(image.url),
    alt: asString(image.alt, fallbackAlt),
    width: asNumber(image.width) || undefined,
    height: asNumber(image.height) || undefined,
  };
}

export function mapAcfFile(value: unknown): import("./types").WpFile {
  if (typeof value === "string") {
    const filename = value.split("/").pop() ?? "document.pdf";
    return { url: value, filename };
  }

  const file = asRecord(value);

  return {
    url: asString(file.url),
    filename: asString(file.filename, "document.pdf"),
    filesize: asNumber(file.filesize) || undefined,
  };
}

function mapCta(labelKey: string, urlKey: string, acf: AcfRecord): HeroCta {
  return {
    label: asString(acf[labelKey]),
    url: asString(acf[urlKey]),
  };
}

function mapUtilityLinks(acf: AcfRecord): UtilityLink[] {
  return asArray<AcfRecord>(acf.navbar_utility_links).map((item) => ({
    label: asString(item.link_label),
    url: asString(item.link_url),
  }));
}

function mapNavDropdownItems(items: unknown): NavDropdownItem[] {
  return asArray<AcfRecord>(items).map((item) => ({
    label: asString(item.dropdown_label),
    url: asString(item.dropdown_url),
  }));
}

function mapNavItems(acf: AcfRecord): NavItem[] {
  return asArray<AcfRecord>(acf.navbar_main_items).map((item) => ({
    label: asString(item.nav_label),
    url: asString(item.nav_url),
    highlight: asBoolean(item.nav_highlight),
    dropdown: mapNavDropdownItems(item.nav_dropdown_items),
  }));
}

export function mapNavbar(acf: AcfRecord): NavbarData {
  return {
    logo: mapAcfImage(acf.navbar_logo, asString(acf.navbar_logo_alt, "YZA Sri Lanka")),
    brandTitle: asString(acf.navbar_brand_title),
    brandSubtitle: asString(acf.navbar_brand_subtitle),
    utilityLinks: mapUtilityLinks(acf),
    utilityLogin: mapCta("navbar_utility_login_label", "navbar_utility_login_url", acf),
    utilityRegister: mapCta(
      "navbar_utility_register_label",
      "navbar_utility_register_url",
      acf,
    ),
    mainItems: mapNavItems(acf),
  };
}

function getHeroAcf(acf: AcfRecord): AcfRecord {
  const grouped = asRecord(acf.hero);
  return Object.keys(grouped).length > 0 ? grouped : acf;
}

function mapHeroSliderImages(hero: AcfRecord, fallbackAlt: string): WpImage[] {
  const raw =
    hero.hero_slider ??
    hero.hero_slider_images ??
    hero.hero_slides ??
    false;

  if (!raw || raw === false) {
    return [];
  }

  const items = asArray<unknown>(raw);

  return items
    .map((item, index) => {
      const alt = `${fallbackAlt} — slide ${index + 1}`;

      if (item && typeof item === "object" && !Array.isArray(item)) {
        const record = item as AcfRecord;
        if (typeof record.url === "string") {
          return mapAcfImage(record, alt);
        }
        const nested =
          record.hero_slider_images ??
          record.hero_slider_image ??
          record.slide_image ??
          record.hero_slide_image ??
          record.image;
        return mapAcfImage(nested, alt);
      }

      return mapAcfImage(item, alt);
    })
    .filter((image) => image.url.trim());
}

export function mapHero(acf: AcfRecord): HeroData {
  const hero = getHeroAcf(acf);
  const backgroundImage = mapAcfImage(hero.hero_background_image);
  const backgroundSlides = mapHeroSliderImages(hero, backgroundImage.alt || "YZA hero");

  return {
    eyebrow: asString(hero.hero_eyebrow),
    headlinePrefix: "",
    rotatingWords: asArray<AcfRecord>(hero.hero_rotating_words).map((item) =>
      asString(item.word),
    ),
    headlineSecondary: "",
    subheadline: asString(hero.hero_subheadline),
    backgroundImage,
    backgroundSlides,
    ctas: {
      join: mapCta("hero_cta_join_label", "hero_cta_join_url", hero),
      discover: mapCta("hero_cta_discover_label", "hero_cta_discover_url", hero),
      events: mapCta("hero_cta_events_label", "hero_cta_events_url", hero),
    },
    scrollLabel: "",
  };
}

function getAboutAcfFields(acf: AcfRecord): AcfRecord {
  const grouped = asRecord(acf.about_section);
  return Object.keys(grouped).length > 0 ? grouped : acf;
}

function mapAboutStats(acf: AcfRecord): AboutStat[] {
  return asArray<AcfRecord>(acf.about_stats).map((item) => ({
    value: asNumber(item.stat_value),
    suffix: asString(item.stat_suffix),
    label: asString(item.stat_label),
    iconKey: "",
  }));
}

export function mapAbout(acf: AcfRecord): AboutData {
  const about = getAboutAcfFields(acf);

  return {
    eyebrow: asString(about.about_eyebrow),
    titleLine1: asString(about.about_title_line_1),
    titleLine2: asString(about.about_title_line_2),
    paragraphs: asArray<AcfRecord>(about.about_paragraphs).map((item) =>
      asString(item.paragraph_text),
    ),
    readMore: { label: "", url: "" },
    image: mapAcfImage(about.about_image),
    badgeTitle: asString(about.about_badge_title),
    badgeSubtitle: asString(about.about_badge_subtitle),
    stats: mapAboutStats(about),
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function mapStudyGroupFromAcf(
  item: AcfRecord,
  id = 0,
): StudyGroup {
  return {
    id,
    slug: asString(item.group_slug) || slugify(asString(item.group_name)),
    name: asString(item.group_name),
    tag: asString(item.group_tag),
    description: asString(item.group_description),
    image: mapAcfImage(item.group_image, asString(item.group_name)),
    accentColor: asString(item.group_accent_color),
    readMoreUrl: asString(item.group_read_more_url),
  };
}

export function mapStudyGroupsFromHomeAcf(acf: AcfRecord): StudyGroup[] {
  return asArray<AcfRecord>(acf.study_groups_cards).map((item, index) =>
    mapStudyGroupFromAcf(item, index + 1),
  );
}

export function mapStudyGroupFromPost(post: WpStudyGroupPost | WpPostResponse): StudyGroup {
  const acf = asRecord(post.acf) as StudyGroupPostAcf & AcfRecord;

  return {
    id: post.id,
    slug: post.slug ?? "",
    name: asString(acf.group_name, post.title.rendered),
    tag: asString(acf.group_tag),
    description: asString(acf.group_description),
    image: mapAcfImage(acf.group_image, post.title.rendered),
    accentColor: "",
    readMoreUrl: "",
  };
}

function getStudyGroupsSectionAcf(acf: AcfRecord): AcfRecord {
  const grouped = asRecord(acf.study_group_section);
  return Object.keys(grouped).length > 0 ? grouped : acf;
}

export function mapStudyGroupsSection(
  acf: AcfRecord,
  cards: StudyGroup[],
): StudyGroupsSection {
  const section = getStudyGroupsSectionAcf(acf);

  return {
    eyebrow: asString(section.study_groups_eyebrow),
    titlePlain: asString(section.study_groups_title_plain),
    titleHighlight: asString(section.study_groups_title_highlight),
    description: asString(section.study_groups_description),
    cardReadMoreLabel: "",
    cta: { label: "", url: "" },
    cards,
  };
}

function formatEventTime(startTime: string, endTime: string, legacyTime = ""): string {
  if (startTime && endTime) {
    return `${startTime} – ${endTime}`;
  }
  if (startTime) {
    return startTime;
  }
  return legacyTime;
}

function parseEventDateBadge(
  dateDisplay: string,
  fallbackDay = "01",
  fallbackMonth = "JAN",
): { day: string; month: string } {
  const slashMatch = dateDisplay.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const monthIndex = Number(slashMatch[2]) - 1;
    const monthNames = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
    ];
    return {
      day: slashMatch[1].padStart(2, "0"),
      month: monthNames[monthIndex] ?? fallbackMonth,
    };
  }

  const match = dateDisplay.match(/([A-Za-z]+)\s+(\d{1,2})/);
  if (!match) {
    return { day: fallbackDay, month: fallbackMonth };
  }

  return {
    day: match[2].padStart(2, "0"),
    month: match[1].slice(0, 3).toUpperCase(),
  };
}

function getEventCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "Field Study": "#1F8A7B",
    Workshop: "#A0673A",
    "Marine Survey": "#1F8A7B",
    Symposium: "#F2A93B",
  };

  return colors[category] ?? "#3F7A4E";
}

function mapEventFields(
  item: EventPostAcf & AcfRecord,
  id: number,
  titleFallback = "",
): EventItem {
  const dateDisplay = asString(item.event_date_display);
  const startTime = asString(item.event_start_time);
  const endTime = asString(item.event_end_time);
  const badge = parseEventDateBadge(dateDisplay);
  const category = asString(item.event_category);

  return {
    id,
    title: asString(item.event_title, titleFallback),
    dateDisplay,
    day: badge.day,
    month: badge.month,
    time: formatEventTime(startTime, endTime),
    location: asString(item.event_location),
    category,
    categoryColor: getEventCategoryColor(category),
    description: asString(item.event_description),
    featured: false,
    detailsUrl: "",
  };
}

export function mapEventFromAcf(item: AcfRecord, id = 0): EventItem {
  return mapEventFields(item as EventPostAcf & AcfRecord, id);
}

export function mapEventsFromHomeAcf(acf: AcfRecord): EventItem[] {
  return asArray<AcfRecord>(acf.events_cards).map((item, index) =>
    mapEventFromAcf(item, index + 1),
  );
}

export function mapEventFromPost(post: WpEventPost | WpPostResponse): EventItem {
  const acf = asRecord(post.acf) as EventPostAcf & AcfRecord;
  return mapEventFields(acf, post.id, post.title.rendered);
}

function getEventsSectionAcf(acf: AcfRecord): AcfRecord {
  const grouped = asRecord(acf.events_section);
  return Object.keys(grouped).length > 0 ? grouped : acf;
}

export function mapEventsSection(
  acf: AcfRecord,
  cards: EventItem[],
): EventsSection {
  const section = getEventsSectionAcf(acf);

  return {
    eyebrow: asString(section.events_eyebrow),
    titlePlain: asString(section.events_title_plain),
    titleHighlight: asString(section.events_title_highlight),
    description: asString(section.events_description),
    calendarMonth: asString(section.events_calendar_month),
    calendarLegendEventDates: "",
    calendarLegendToday: "",
    viewCalendar: { label: "", url: "" },
    registerButtonLabel: "",
    detailsButtonLabel: asString(section.events_details_button_label),
    featuredBadgeLabel: "",
    cards,
  };
}

export function mapGalleryPhotoFromAcf(
  item: AcfRecord,
  id = 0,
): GalleryPhoto {
  const alt = asString(item.photo_alt);

  return {
    id,
    image: mapAcfImage(item.photo_image, alt),
    tag: asString(item.photo_tag),
    tagColor: asString(item.photo_tag_color),
  };
}

export function mapGalleryPhotosFromHomeAcf(acf: AcfRecord): GalleryPhoto[] {
  return asArray<AcfRecord>(acf.gallery_photos).map((item, index) =>
    mapGalleryPhotoFromAcf(item, index + 1),
  );
}

export function mapGalleryPhotoFromPost(
  post: WpGalleryPhotoPost | WpPostResponse,
): GalleryPhoto {
  const acf = asRecord(post.acf) as GalleryPhotoPostAcf & AcfRecord;

  return {
    id: post.id,
    image: mapAcfImage(acf.photo_image, post.title.rendered),
    tag: asString(acf.photo_tag),
    tagColor: "",
  };
}

function getGallerySectionAcf(acf: AcfRecord): AcfRecord {
  const grouped = asRecord(acf.gallery_section);
  return Object.keys(grouped).length > 0 ? grouped : acf;
}

export function mapGallerySection(
  acf: AcfRecord,
  photos: GalleryPhoto[],
): GallerySection {
  const section = getGallerySectionAcf(acf);

  return {
    eyebrow: asString(section.gallery_eyebrow),
    titlePlain: asString(section.gallery_title_plain),
    titleHighlight: asString(section.gallery_title_highlight),
    cta: { label: "", url: "" },
    photos,
  };
}

function mapFooterLinks(items: unknown): FooterLink[] {
  return asArray<AcfRecord>(items).map((item) => ({
    label: asString(item.link_label),
    url: asString(item.link_url),
  }));
}

function mapSocialLinks(acf: AcfRecord): FooterSocialLink[] {
  return asArray<AcfRecord>(acf.footer_social_links).map((item) => ({
    label: asString(item.platform_label),
    url: asString(item.platform_url),
    iconKey: asString(item.platform_icon_key),
  }));
}

export function mapFooter(acf: AcfRecord): FooterData {
  return {
    newsletter: {
      title: asString(acf.footer_newsletter_title),
      description: asString(acf.footer_newsletter_description),
      placeholder: asString(acf.footer_newsletter_placeholder),
      buttonLabel: asString(acf.footer_newsletter_button_label),
    },
    brand: {
      logo: mapAcfImage(acf.footer_logo, "YZA Sri Lanka"),
      title: asString(acf.footer_brand_title),
      subtitle: asString(acf.footer_brand_subtitle),
      description: asString(acf.footer_brand_description),
    },
    socialLinks: mapSocialLinks(acf),
    quickLinksTitle: asString(acf.footer_quick_links_title),
    quickLinks: mapFooterLinks(acf.footer_quick_links),
    resourcesTitle: asString(acf.footer_resources_title),
    resourcesLinks: mapFooterLinks(acf.footer_resources_links),
    contactTitle: asString(acf.footer_contact_title),
    address: asString(acf.footer_contact_address),
    email: asString(acf.footer_contact_email),
    phone: asString(acf.footer_contact_phone),
    copyrightText: asString(acf.footer_copyright_text),
    legalLinks: mapFooterLinks(acf.footer_legal_links),
  };
}

function mapSeo(acf: AcfRecord, page: WpPageResponse): HomePageSeo {
  return {
    title: asString(acf.page_title, page.title.rendered),
    metaDescription: asString(acf.page_meta_description),
  };
}

export function mapHomePage(page: WpPageResponse): HomePageData {
  const acf = asRecord(page.acf);

  return {
    id: page.id,
    slug: page.slug,
    seo: mapSeo(acf, page),
    navbar: mapNavbar(acf),
    hero: mapHero(acf),
    about: mapAbout(acf),
    studyGroups: mapStudyGroupsSection(acf, []),
    events: mapEventsSection(acf, []),
    gallery: mapGallerySection(acf, []),
    footer: mapFooter(acf),
  };
}
