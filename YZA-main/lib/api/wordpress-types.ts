/**
 * TypeScript interfaces matching the live WordPress REST API responses
 * from http://yzasrilanka.local (acf_format=standard).
 *
 * Verified endpoints:
 * - GET /wp-json/wp/v2/pages?slug=home-page
 * - GET /wp-json/wp/v2/study-group
 * - GET /wp-json/wp/v2/event
 * - GET /wp-json/wp/v2/gallery-photo
 */

/** ACF file field object (e.g. PDF) returned with acf_format=standard. */
export interface AcfFileField {
  ID?: number;
  id?: number;
  title?: string;
  filename?: string;
  filesize?: number;
  url?: string;
  link?: string;
  mime_type?: string;
  type?: string;
  subtype?: string;
}

/** ACF image field object returned with acf_format=standard. */
export interface AcfImageField {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes?: Record<string, string | number>;
}

// ---------------------------------------------------------------------------
// Home Page — page ID 12, slug "home-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface HeroRotatingWordAcf {
  word: string;
}

export interface HeroSliderItemAcf {
  /** Repeater sub-field on the home page hero slider */
  hero_slider_images?: AcfImageField | false | null;
  hero_slider_image?: AcfImageField | false | null;
  slide_image?: AcfImageField | false | null;
  image?: AcfImageField | false | null;
}

/** Nested group: acf.hero */
export interface HeroSectionAcf {
  hero_eyebrow: string;
  hero_rotating_words: HeroRotatingWordAcf[];
  hero_subheadline: string;
  hero_background_image: AcfImageField | false | null;
  hero_slider?: HeroSliderItemAcf[] | AcfImageField[] | false | null;
  hero_cta_join_label: string;
  hero_cta_join_url: string;
  hero_cta_discover_label: string;
  hero_cta_discover_url: string;
  hero_cta_events_label: string;
  hero_cta_events_url: string;
}

export interface AboutParagraphAcf {
  paragraph_text: string;
}

export interface AboutStatAcf {
  stat_value: string;
  stat_suffix: string;
  stat_label: string;
}

/** Nested group: acf.about_section */
export interface AboutSectionAcf {
  about_eyebrow: string;
  about_title_line_1: string;
  about_title_line_2: string;
  about_paragraphs: AboutParagraphAcf[];
  about_image: AcfImageField | false | null;
  about_badge_title: string;
  about_badge_subtitle: string;
  about_stats: AboutStatAcf[];
}

/** Nested group: acf.study_group_section */
export interface StudyGroupSectionAcf {
  study_groups_eyebrow: string;
  study_groups_title_plain: string;
  study_groups_title_highlight: string;
  study_groups_description: string;
}

/** Nested group: acf.events_section */
export interface EventsSectionAcf {
  events_eyebrow: string;
  events_title_plain: string;
  events_title_highlight: string;
  events_description: string;
  events_calendar_month: string;
  events_details_button_label: string;
}

/** Nested group: acf.gallery_section */
export interface GallerySectionAcf {
  gallery_eyebrow: string;
  gallery_title_plain: string;
  gallery_title_highlight: string;
}

/**
 * Full ACF payload on the Home Page (pages/12).
 *
 * Note: WordPress also exposes duplicate flat hero_* fields at the top level
 * of acf (legacy copies). Prefer acf.hero when present.
 */
export interface HomePageAcf {
  hero?: HeroSectionAcf;
  about_section?: AboutSectionAcf;
  study_group_section?: StudyGroupSectionAcf;
  events_section?: EventsSectionAcf;
  gallery_section?: GallerySectionAcf;

  /** Legacy flat hero fields — use acf.hero instead when available. */
  hero_eyebrow?: string;
  hero_rotating_words?: HeroRotatingWordAcf[];
  hero_subheadline?: string;
  hero_background_image?: AcfImageField | false | null;
  hero_cta_join_label?: string;
  hero_cta_join_url?: string;
  hero_cta_discover_label?: string;
  hero_cta_discover_url?: string;
  hero_cta_events_label?: string;
  hero_cta_events_url?: string;
}

export interface WpRenderedField {
  rendered: string;
}

export interface WpPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: HomePageAcf | AboutPageAcf | Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// About Page — page ID 138, slug "about-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface AboutOverviewSectionAcf {
  overview_section_image: AcfImageField | false | null;
  overview_section_eyebrow_text: string;
  overview_section_title: string;
  overview_section_content: string;
}

export interface AboutFounderSectionAcf {
  founder_section_image: AcfImageField | false | null;
  founder_section_title: string;
  founder_name: string;
  founder_section_description: string;
}

export interface AboutEducationSectionAcf {
  education_section_image: AcfImageField | false | null;
  education_section_title: string;
  education_section_content: string;
}

export interface AboutVisionSectionAcf {
  about_section_vision_title: string;
  about_section_vision_statement: string;
}

export interface AboutPageAcf {
  about_section_overview?: AboutOverviewSectionAcf;
  about_section_founder?: AboutFounderSectionAcf;
  about_section_education?: AboutEducationSectionAcf;
  about_section_vision?: AboutVisionSectionAcf;
}

export interface WpAboutPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: AboutPageAcf;
}

// ---------------------------------------------------------------------------
// CMC Page — page ID 164, slug "cmc-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface CmcMemberRoleAcf {
  [key: string]: string | AcfImageField | false | null | undefined;
}

export interface CmcPageAcf {
  cmc_section_eyebrow_text?: string;
  cmc_main_heading?: string;
  cmc_year?: string;
  cmc_page_description?: string;
  cmc_page_hero_background_image?: AcfImageField | false | null;
  cmc_level_one?: Record<string, CmcMemberRoleAcf>;
  cmc_level_two?: Record<string, CmcMemberRoleAcf>;
  cmc_level_three?: Record<string, CmcMemberRoleAcf>;
  cmc_level_four?: Record<string, CmcMemberRoleAcf>;
  cmc_level_five?: Record<string, CmcMemberRoleAcf>;
  cmc_level_six?: Record<string, CmcMemberRoleAcf>;
}

export interface WpCmcPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: CmcPageAcf;
}

// ---------------------------------------------------------------------------
// Committees Page — page ID 264, slug "committees-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface CommitteeItemAcf {
  committee_title: string;
  committee_description: string;
  committee_image: AcfImageField | false | null;
}

export interface CommitteesPageAcf {
  committees_page_title?: string;
  committees?: CommitteeItemAcf[];
}

export interface WpCommitteesPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: CommitteesPageAcf;
}

// ---------------------------------------------------------------------------
// Presidents Page — page ID 278, slug "presidents-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface PresidentItemAcf {
  president_name: string;
  president_year: string;
  president_image: AcfImageField | false | null;
  is_current_president: boolean;
}

export interface PresidentsPageAcf {
  presidents_page_title?: string;
  presidents?: PresidentItemAcf[];
}

export interface WpPresidentsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: PresidentsPageAcf;
}

// ---------------------------------------------------------------------------
// Instructors Page — page ID 441, slug "instructors-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface InstructorItemAcf {
  instructor_image: AcfImageField | false | null;
  instructor_name: string;
}

export interface InstructorsPageAcf {
  instructors_page_title?: string;
  instructors_page_subtitle?: string;
  instructors?: InstructorItemAcf[];
}

export interface WpInstructorsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: InstructorsPageAcf;
}

// ---------------------------------------------------------------------------
// Events & Projects Page — page ID 451, slug "events-and-projects-page"
// ---------------------------------------------------------------------------

export interface ProjectsAtTheZooAcf {
  projects_at_the_zoo_title?: string;
  projects_at_the_zoo_description?: string;
}

export interface ProjectsAtTheFieldAcf {
  projects_at_the_field_title?: string;
  projects_at_the_field_description?: string;
}

export interface EventProgramsAcf {
  event_programs_title?: string;
  event_programs_description?: string;
}

export interface AwarenessProjectsBlockAcf {
  awareness_projects_title?: string;
  awareness_projects_description?: string;
}

export interface ProjectsSectionAcf {
  projects_at_the_zoo?: ProjectsAtTheZooAcf;
  projects_at_the_field?: ProjectsAtTheFieldAcf;
  event_programs?: EventProgramsAcf;
  awareness_projects?: AwarenessProjectsBlockAcf;
}

export interface SponsorAcf {
  sponsorship_name?: string;
}

export interface InSponsorshipAcf {
  partnership_name?: string;
  sponsorship_description?: string;
  sponsors?: SponsorAcf[] | false | null;
}

export interface CollaborativePartnershipAcf {
  collaborative_and_partnership_title?: string;
  collaborative_and_partnership_description?: string;
}

export interface EventsAndProjectsPageAcf {
  events_and_projects_page_title?: string;
  events_and_projects_page_subtitle?: string;
  projects_section?: ProjectsSectionAcf;
  in_sponsorship?: InSponsorshipAcf;
  collaborative_and_partnership?: CollaborativePartnershipAcf;
}

export interface WpEventsAndProjectsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: EventsAndProjectsPageAcf;
}

// ---------------------------------------------------------------------------
// News and Updates Page — page ID 471, slug "news-and-updates-page"
// ---------------------------------------------------------------------------

export interface NewsItemAcf {
  news_title?: string;
  news_image?: AcfImageField | false | null;
  news_description?: string;
  news_author?: string;
}

export interface NewsAndUpdatesPageAcf {
  news_and_updates_page_title?: string;
  news_and_updates_page_subtitle?: string;
  news?: NewsItemAcf[];
}

export interface WpNewsAndUpdatesPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: NewsAndUpdatesPageAcf;
}

// ---------------------------------------------------------------------------
// Symposium Page — page ID 501, slug "symposium-page"
// ---------------------------------------------------------------------------

export interface SymposiumPageAcf {
  symposium_page_title?: string;
  symposium_page_subtitle?: string;
  symposium_description?: string;
  symposium_page_submission_guidelines?: AcfFileField | false | null;
}

export interface WpSymposiumPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: SymposiumPageAcf;
}

// ---------------------------------------------------------------------------
// Store Page — page ID 636, slug "store"
// ---------------------------------------------------------------------------

export interface StoreProductAcf {
  product_title?: string;
  product_description?: string;
  product_image?: AcfImageField | false | null;
  product_price?: string;
}

export interface StorePageAcf {
  store_title?: string;
  store_subtitle?: string;
  products?: StoreProductAcf[] | false | null;
}

export interface WpStorePageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: StorePageAcf;
}

// ---------------------------------------------------------------------------
// Naturalist Page — page ID 512, slug "naturalist-page"
// ---------------------------------------------------------------------------

export interface NaturalistPageAcf {
  naturalist_page_title?: string;
  naturalist_page_sub_title?: string;
  naturalist_page_guidelines?: AcfFileField | false | null;
}

export interface WpNaturalistPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: NaturalistPageAcf;
}

// ---------------------------------------------------------------------------
// Contact Us Page — page ID 545, slug "contact-us-page"
// ---------------------------------------------------------------------------

export interface ContactUsPageAcf {
  contact_us_page_title?: string;
  contact_us_page_sub_title?: string;
}

export interface WpContactUsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: ContactUsPageAcf;
}

// ---------------------------------------------------------------------------
// Study Groups Page — page ID 290, slug "study-groups-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface StudyGroupsPageAcf {
  study_groups_page_title?: string;
}

export interface WpStudyGroupsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: StudyGroupsPageAcf;
}

// ---------------------------------------------------------------------------
// Wildlife Art Page — page ID 295, slug "wildlife-art-page", acf at response.acf
// ---------------------------------------------------------------------------

export interface WildlifeArtItemAcf {
  wildlife_art_image: AcfImageField | false | null;
  wildlife_art_title: string;
  wildlife_art_artist_name: string;
}

export interface WildlifeArtPageAcf {
  wildlife_art_page_title?: string;
  wildlife_arts?: WildlifeArtItemAcf[];
}

export interface WpWildlifeArtPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: WildlifeArtPageAcf;
}

// ---------------------------------------------------------------------------
// Wildlife Photography Page — page ID 311, slug "wildlife-photography-page"
// ---------------------------------------------------------------------------

export interface WildlifePhotographyPageAcf {
  wildlife_photography_title?: string;
  wildlife_photography_page_subtitle?: string;
  wildlife_photography_page_hero_background_image?: AcfImageField | false | null;
}

export interface WpWildlifePhotographyPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: WildlifePhotographyPageAcf;
}

// ---------------------------------------------------------------------------
// Junior YZA Page — page ID 318, slug "junior-yza-page"
// ---------------------------------------------------------------------------

export interface JuniorYzaPageImageAcf {
  junior_yza_page_image: AcfImageField | false | null;
}

export interface JuniorYzaPageAcf {
  junior_yza_page_title?: string;
  junior_yza_page_subtitle?: string;
  junior_yza_page_description?: string;
  junior_yza_page_images?: JuniorYzaPageImageAcf[];
}

export interface WpJuniorYzaPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: JuniorYzaPageAcf;
}

// ---------------------------------------------------------------------------
// Membership Page — page ID 331, slug "membership-page"
// ---------------------------------------------------------------------------

export interface MembershipBranchAcf {
  htbm_section_branch_labels?: string;
}

export interface MembershipCategoryAcf {
  membership_category_name?: string;
  membership_category_description?: string;
  membership_category_fee?: string;
}

export interface MembershipHtbmSectionAcf {
  htbm_section_title?: string;
  htbm_section_subtitle?: string;
  htbm_section_branches?: MembershipBranchAcf[];
  htbm_section_description?: string;
  htbm_section_general_instructions?: string;
}

export interface MembershipCategoriesSectionAcf {
  membership_categories_section_title?: string;
  membership_categories?: MembershipCategoryAcf[];
}

export interface ActiveMembersListItemAcf {
  active_members_list_title?: string;
  active_members_list_pdf?: unknown;
  active_member_list_title?: string;
  active_member_list_pdf?: unknown;
}

export interface ActiveMembersSectionAcf {
  active_members_section_title?: string;
  active_members_section_description?: string;
  active_members_section_subtitle?: string;
  active_members_lists?: ActiveMembersListItemAcf[];
  active_members_list?: ActiveMembersListItemAcf[];
  /** Single list (title + PDF) without repeater */
  active_members_list_title?: string;
  active_members_list_pdf?: unknown;
}

export interface MembershipPageAcf {
  membership_page_title?: string;
  membership_page_subtitle?: string;
  htbm_section?: MembershipHtbmSectionAcf;
  membership_categories_section?: MembershipCategoriesSectionAcf;
  active_members_section?: ActiveMembersSectionAcf;
}

export interface WpMembershipPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: MembershipPageAcf;
}

/** Media library item (PDF/file attachment on a page). */
export interface WpMediaAttachmentResponse {
  id: number;
  date: string;
  title: WpRenderedField;
  mime_type: string;
  source_url: string;
  filename?: string;
  filesize?: number;
  media_details?: {
    filesize?: number;
  };
}

// ---------------------------------------------------------------------------
// Branches Page — page ID 352, slug "branches-page"
// ---------------------------------------------------------------------------

export interface BranchItemAcf {
  branch_name?: string;
  branch_description?: string;
  branch_image?: AcfImageField | false | null;
  main_branch_or_not?: boolean;
}

export interface BranchesPageAcf {
  branches_page_hero_background?: AcfImageField | false | null;
  branches_page_title?: string;
  branches?: BranchItemAcf[];
}

export interface WpBranchesPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: BranchesPageAcf;
}

// ---------------------------------------------------------------------------
// Videos Page — page ID 365, slug "videos-page"
// ---------------------------------------------------------------------------

export interface VideoItemAcf {
  video_title?: string;
  video_description?: string;
  video_url?: string;
}

export interface SocialLinkItemAcf {
  platform_name?: string;
  platform_url?: string;
}

export interface VideosPageAcf {
  videos_page_title?: string;
  videos_page_description?: string;
  videos?: VideoItemAcf[];
  social_links?: SocialLinkItemAcf[];
}

export interface WpVideosPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: VideosPageAcf;
}

// ---------------------------------------------------------------------------
// Articles Page — page ID 380, slug "articles-page"
// ---------------------------------------------------------------------------

export interface ArticleItemAcf {
  article_title?: string;
  article_pdf?: AcfFileField | false | null;
  article_published_date?: string;
}

export interface ArticlesPageAcf {
  articles_page_title?: string;
  articles_page_subtitle?: string;
  articles_page_hero_background_image?: AcfImageField | false | null;
  articles?: ArticleItemAcf[];
}

export interface WpArticlesPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: ArticlesPageAcf;
}

// ---------------------------------------------------------------------------
// Leaflets Page — page ID 397, slug "leaflets-page"
// ---------------------------------------------------------------------------

export interface LeafletItemAcf {
  leaflet_title?: string;
  leaflet_pdf?: AcfFileField | false | null;
  leaflet_posted_date?: string;
}

export interface LeafletsPageAcf {
  leaflets_page_title?: string;
  leaflets_page_subtitle?: string;
  leaflets_page_hero_background_image?: AcfImageField | false | null;
  leaflets?: LeafletItemAcf[];
}

export interface WpLeafletsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: LeafletsPageAcf;
}

// ---------------------------------------------------------------------------
// Abstract Books Page — page ID 428, slug "abstract-books-page"
// ---------------------------------------------------------------------------

export interface AbstractBookItemAcf {
  abstract_book_title?: string;
  abstract_book_pdf?: AcfFileField | false | null;
  abstract_book_post_date?: string;
}

export interface AbstractBooksPageAcf {
  abstract_books_page_title?: string;
  abstract_books_page_subtitle?: string;
  abstract_books?: AbstractBookItemAcf[];
}

export interface WpAbstractBooksPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: AbstractBooksPageAcf;
}

// ---------------------------------------------------------------------------
// Booklets Page — page ID 419, slug "booklets-page"
// ---------------------------------------------------------------------------

export interface BookletItemAcf {
  booklet_title?: string;
  booklet_pdf?: AcfFileField | false | null;
  booklet_posted_date?: string;
}

export interface BookletsPageAcf {
  booklets_page_title?: string;
  booklets_page_subtitle?: string;
  booklets?: BookletItemAcf[];
}

export interface WpBookletsPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: BookletsPageAcf;
}

// ---------------------------------------------------------------------------
// Sinhala publication archive pages (Thithmuwa, Panivudaya, Sanrakshana)
// ACF field keys are Sinhala — mapped via publication-archive-mappers.ts
// ---------------------------------------------------------------------------

export interface WpPublicationPageResponse {
  id: number;
  slug: string;
  title: WpRenderedField;
  acf?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Study Group CPT — type "study-group", REST /wp-json/wp/v2/study-group
// ACF fields at response.acf (flat, no wrapper group)
// ---------------------------------------------------------------------------

export interface StudyGroupPostAcf {
  group_name: string;
  group_tag: string;
  group_description: string;
  group_image: AcfImageField | false | null;
}

export interface WpStudyGroupPost {
  id: number;
  slug: string;
  type: "study-group";
  title: WpRenderedField;
  acf: StudyGroupPostAcf;
}

// ---------------------------------------------------------------------------
// Event CPT — type "event", REST /wp-json/wp/v2/event
// ACF fields at response.acf (flat, no wrapper group)
// ---------------------------------------------------------------------------

export interface EventPostAcf {
  event_title: string;
  event_date_display: string;
  event_start_time: string;
  event_end_time: string;
  event_location: string;
  event_category: string;
  event_description: string;
}

export interface WpEventPost {
  id: number;
  slug: string;
  type: "event";
  title: WpRenderedField;
  acf: EventPostAcf;
}

// ---------------------------------------------------------------------------
// Gallery Photo CPT — type "gallery-photo", REST /wp-json/wp/v2/gallery-photo
// ACF fields at response.acf (flat, no wrapper group)
// ---------------------------------------------------------------------------

export interface GalleryPhotoPostAcf {
  photo_image: AcfImageField | false | null;
  photo_tag: string;
}

export interface WpGalleryPhotoPost {
  id: number;
  slug: string;
  type: "gallery-photo";
  title: WpRenderedField;
  acf: GalleryPhotoPostAcf;
}

/** Generic CPT post shape used by fetchCustomPostsRaw. */
export interface WpPostResponse {
  id: number;
  slug: string;
  type?: string;
  title: WpRenderedField;
  acf?: StudyGroupPostAcf | EventPostAcf | GalleryPhotoPostAcf | Record<string, unknown>;
}
