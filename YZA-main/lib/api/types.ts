export interface WpImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface WpFile {
  url: string;
  filename: string;
  filesize?: number;
}

export interface NavDropdownItem {
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  url: string;
  highlight: boolean;
  dropdown: NavDropdownItem[];
}

export interface UtilityLink {
  label: string;
  url: string;
}

export interface HeroRotatingWord {
  word: string;
}

export interface HeroCta {
  label: string;
  url: string;
}

export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
  iconKey: string;
}

export interface StudyGroup {
  id: number;
  slug: string;
  name: string;
  tag: string;
  description: string;
  image: WpImage;
  accentColor: string;
  readMoreUrl: string;
}

export interface EventItem {
  id: number;
  title: string;
  dateDisplay: string;
  day: string;
  month: string;
  time: string;
  location: string;
  category: string;
  categoryColor: string;
  description: string;
  featured: boolean;
  detailsUrl: string;
}

export interface GalleryPhoto {
  id: number;
  image: WpImage;
  tag: string;
  tagColor: string;
}

export interface HomePageSeo {
  title: string;
  metaDescription: string;
}

export interface NavbarData {
  logo: WpImage;
  brandTitle: string;
  brandSubtitle: string;
  utilityLinks: UtilityLink[];
  utilityLogin: HeroCta;
  utilityRegister: HeroCta;
  mainItems: NavItem[];
}

export interface HeroData {
  eyebrow: string;
  headlinePrefix: string;
  rotatingWords: string[];
  headlineSecondary: string;
  subheadline: string;
  backgroundImage: WpImage;
  backgroundSlides: WpImage[];
  ctas: {
    join: HeroCta;
    discover: HeroCta;
    events: HeroCta;
  };
  scrollLabel: string;
}

export interface AboutData {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  paragraphs: string[];
  readMore: HeroCta;
  image: WpImage;
  badgeTitle: string;
  badgeSubtitle: string;
  stats: AboutStat[];
}

export interface StudyGroupsSection {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  description: string;
  cardReadMoreLabel: string;
  cta: HeroCta;
  cards: StudyGroup[];
}

export interface EventsSection {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  description: string;
  calendarMonth: string;
  calendarLegendEventDates: string;
  calendarLegendToday: string;
  viewCalendar: HeroCta;
  registerButtonLabel: string;
  detailsButtonLabel: string;
  featuredBadgeLabel: string;
  cards: EventItem[];
}

export interface GallerySection {
  eyebrow: string;
  titlePlain: string;
  titleHighlight: string;
  cta: HeroCta;
  photos: GalleryPhoto[];
}

export interface FooterSocialLink {
  label: string;
  url: string;
  iconKey: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterData {
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  brand: {
    logo: WpImage;
    title: string;
    subtitle: string;
    description: string;
  };
  socialLinks: FooterSocialLink[];
  quickLinksTitle: string;
  quickLinks: FooterLink[];
  resourcesTitle: string;
  resourcesLinks: FooterLink[];
  contactTitle: string;
  address: string;
  email: string;
  phone: string;
  copyrightText: string;
  legalLinks: FooterLink[];
}

export interface AboutOverviewData {
  image: WpImage;
  eyebrow: string;
  title: string;
  content: string;
}

export interface AboutFounderData {
  image: WpImage;
  title: string;
  name: string;
  paragraphs: string[];
}

export interface AboutEducationData {
  image: WpImage;
  title: string;
  content: string;
}

export interface AboutVisionData {
  title: string;
  statement: string;
}

export interface AboutPageData {
  id: number;
  slug: string;
  overview: AboutOverviewData;
  founder: AboutFounderData;
  education: AboutEducationData;
  vision: AboutVisionData;
}

export interface CmcMemberData {
  role: string;
  name: string;
  image: WpImage;
}

export interface CmcLevelData {
  level: number;
  label: string;
  members: CmcMemberData[];
}

export interface CmcPageData {
  id: number;
  slug: string;
  eyebrow: string;
  mainHeading: string;
  year: string;
  heroImage: WpImage;
  descriptionParagraphs: string[];
  levels: CmcLevelData[];
}

export interface CommitteeData {
  title: string;
  description: string;
  image: WpImage;
}

export interface CommitteesPageData {
  id: number;
  slug: string;
  pageTitle: string;
  committees: CommitteeData[];
}

export interface StudyGroupsPageData {
  id: number;
  slug: string;
  pageTitle: string;
}

export interface PresidentData {
  name: string;
  year: string;
  image: WpImage;
  isCurrent: boolean;
}

export interface PresidentsPageData {
  id: number;
  slug: string;
  pageTitle: string;
  presidents: PresidentData[];
}

export interface InstructorData {
  id: number;
  name: string;
  image: WpImage;
}

export interface InstructorsPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  instructors: InstructorData[];
}

export interface NewsItemData {
  id: number;
  title: string;
  image: WpImage;
  description: string;
  author: string;
}

export interface NewsAndUpdatesPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  news: NewsItemData[];
}

export interface SymposiumGuidelinesData {
  title: string;
  pdfUrl: string;
  filename: string;
  filesize?: number;
}

export interface SymposiumPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  description: string;
  submissionGuidelines: SymposiumGuidelinesData | null;
}

export interface StoreProductDetailField {
  key: string;
  label: string;
  value: string;
  prominent?: boolean;
}

export interface StoreProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  priceLabel: string;
  image: WpImage;
  detailFields: StoreProductDetailField[];
}

export interface StorePageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  products: StoreProductData[];
}

export interface NaturalistGuidelinesData {
  title: string;
  pdfUrl: string;
  filename: string;
  filesize?: number;
}

export interface NaturalistPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  guidelines: NaturalistGuidelinesData | null;
}

export interface ContactUsPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
}

export interface ProjectSectionData {
  id: string;
  title: string;
  description: string;
}

export interface SponsorshipSectionData {
  title: string;
  description: string;
  sponsorNames: string[];
}

export interface CollaborativeSectionData {
  title: string;
  description: string;
}

export interface EventsAndProjectsPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  projectSections: ProjectSectionData[];
  sponsorship: SponsorshipSectionData | null;
  collaborative: CollaborativeSectionData | null;
}

export interface WildlifeArtItemData {
  id: number;
  title: string;
  artistName: string;
  image: WpImage;
}

export interface WildlifeArtPageData {
  id: number;
  slug: string;
  pageTitle: string;
  arts: WildlifeArtItemData[];
}

export interface WildlifePhotographyPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  heroImage: WpImage;
}

export interface JuniorYzaPageImageData {
  id: number;
  image: WpImage;
}

export interface JuniorYzaPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  description: string;
  images: JuniorYzaPageImageData[];
}

export interface MembershipCategoryData {
  id: string;
  name: string;
  description: string;
  fee: string;
}

export interface ActiveMembersListData {
  id: string;
  title: string;
  pdfUrl: string;
  filename: string;
  filesize?: number;
}

export interface ActiveMembersSectionData {
  title: string;
  description: string;
  lists: ActiveMembersListData[];
}

export interface MembershipPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  howToTitle: string;
  howToSubtitle: string;
  howToIntro: string;
  branches: string[];
  instructionsEyebrow: string;
  instructionsHtml: string;
  categoriesTitle: string;
  categories: MembershipCategoryData[];
  activeMembers: ActiveMembersSectionData | null;
}

export interface BranchData {
  id: string;
  slug: string;
  name: string;
  description: string;
  isMain: boolean;
  image: WpImage;
}

export interface BranchesPageData {
  id: number;
  slug: string;
  pageTitle: string;
  heroImage: WpImage;
  branches: BranchData[];
}

export interface VideoItemData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  youtubeId: string | null;
  thumbnailUrl: string | null;
}

export interface SocialLinkData {
  id: string;
  platformName: string;
  platformUrl: string;
}

export interface VideosPageData {
  id: number;
  slug: string;
  pageTitle: string;
  description: string;
  videos: VideoItemData[];
  socialLinks: SocialLinkData[];
}

export interface PdfResourceItemData {
  id: string;
  title: string;
  pdfUrl: string;
  filename: string;
  filesize?: number;
  date: string;
}

export interface ArticlesPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  heroImage: WpImage;
  articles: PdfResourceItemData[];
}

export interface LeafletsPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  heroImage: WpImage;
  leaflets: PdfResourceItemData[];
}

export interface AbstractBooksPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  books: PdfResourceItemData[];
}

export interface BookletsPageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  booklets: PdfResourceItemData[];
}

export interface PublicationArchivePageData {
  id: number;
  slug: string;
  pageTitle: string;
  subtitle: string;
  items: PdfResourceItemData[];
}

export interface HomePageData {
  id: number;
  slug: string;
  seo: HomePageSeo;
  navbar: NavbarData;
  hero: HeroData;
  about: AboutData;
  studyGroups: StudyGroupsSection;
  events: EventsSection;
  gallery: GallerySection;
  footer: FooterData;
}

export type {
  AcfImageField,
  AboutOverviewSectionAcf,
  AboutPageAcf,
  AboutFounderSectionAcf,
  AboutEducationSectionAcf,
  AboutVisionSectionAcf,
  WpAboutPageResponse,
  CmcPageAcf,
  WpCmcPageResponse,
  CommitteesPageAcf,
  WpCommitteesPageResponse,
  PresidentsPageAcf,
  WpPresidentsPageResponse,
  InstructorItemAcf,
  InstructorsPageAcf,
  WpInstructorsPageResponse,
  ProjectsAtTheZooAcf,
  ProjectsAtTheFieldAcf,
  EventProgramsAcf,
  AwarenessProjectsBlockAcf,
  ProjectsSectionAcf,
  InSponsorshipAcf,
  CollaborativePartnershipAcf,
  EventsAndProjectsPageAcf,
  WpEventsAndProjectsPageResponse,
  StudyGroupsPageAcf,
  WpStudyGroupsPageResponse,
  WildlifeArtItemAcf,
  WildlifeArtPageAcf,
  WpWildlifeArtPageResponse,
  WildlifePhotographyPageAcf,
  WpWildlifePhotographyPageResponse,
  JuniorYzaPageAcf,
  JuniorYzaPageImageAcf,
  WpJuniorYzaPageResponse,
  MembershipPageAcf,
  WpMembershipPageResponse,
  BranchesPageAcf,
  WpBranchesPageResponse,
  VideosPageAcf,
  WpVideosPageResponse,
  ArticlesPageAcf,
  WpArticlesPageResponse,
  LeafletsPageAcf,
  WpLeafletsPageResponse,
  AbstractBooksPageAcf,
  WpAbstractBooksPageResponse,
  BookletsPageAcf,
  WpBookletsPageResponse,
  AboutSectionAcf,
  AboutStatAcf,
  EventPostAcf,
  EventsSectionAcf,
  GalleryPhotoPostAcf,
  GallerySectionAcf,
  HeroRotatingWordAcf,
  HeroSectionAcf,
  HomePageAcf,
  StudyGroupPostAcf,
  StudyGroupSectionAcf,
  WpEventPost,
  WpGalleryPhotoPost,
  WpPageResponse,
  WpPostResponse,
  WpRenderedField,
  WpStudyGroupPost,
} from "./wordpress-types";
