export interface MembershipInstructions {
  eyebrow: string;
  html: string;
}

export interface MembershipCategory {
  id: string;
  name: string;
  description: string;
  fee: string;
}

export interface MainBranchNoticeContent {
  eyebrow: string;
  title: string;
  message: string;
}

export interface ActiveMembersListItem {
  id: string;
  title: string;
  pdfUrl: string;
  filename: string;
  filesize?: number;
}

export interface ActiveMembersSectionContent {
  title: string;
  description: string;
  lists: ActiveMembersListItem[];
}

export interface MembershipPageContent {
  pageTitle: string;
  subtitle: string;
  howToTitle: string;
  howToSubtitle: string;
  howToIntro: string;
  branches: string[];
  instructions: MembershipInstructions;
  mainBranchNotice: MainBranchNoticeContent;
  categoriesTitle: string;
  categoriesIntro: string;
  categories: MembershipCategory[];
  activeMembers: ActiveMembersSectionContent | null;
}

const FALLBACK_INSTRUCTIONS_HTML = `
<p><span class="font-semibold">Venue:</span> Visit YZA at the National Zoological Gardens, Dehiwala</p>
<p><span class="font-semibold">Time:</span> 2.00 pm</p>
<p><span class="font-semibold">Date:</span> Every Sunday</p>
<p>Membership Fees:</p>
<ul>
<li>General LKR 2,000.00</li>
<li>Student LKR 1,000.00</li>
<li>Full-Time LKR 5,000.00</li>
<li>Overseas USD 50.00</li>
</ul>
<p>*Applications will be given at the office</p>
<p><span class="font-semibold">Age:</span> 13–35 Years</p>
`.trim();

export const MEMBERSHIP_PAGE_CONTENT: MembershipPageContent = {
  pageTitle: "Membership",
  subtitle: "Join the Young Zoologists' Association and become part of Sri Lanka's conservation community.",
  howToTitle: "How to Become a Member?",
  howToSubtitle: "Getting Started",
  howToIntro:
    "Membership is available at our centres. Review the details below for venue, programme times, membership fees, and application information.",
  branches: ["Dehiwala", "Pinnawala", "Ridiyagama"],
  instructions: {
    eyebrow: "General Membership",
    html: FALLBACK_INSTRUCTIONS_HTML,
  },
  mainBranchNotice: {
    eyebrow: "Important",
    title: "Membership issued at the main branch only",
    message:
      "New memberships and membership renewals are processed only at the Dehiwala Main Branch (National Zoological Gardens, Dehiwala). Please visit there to apply or collect application forms.",
  },
  categoriesTitle: "Membership Categories",
  categoriesIntro:
    "YZA offers several membership types to suit students, professionals, overseas supporters, and branch-based members.",
  categories: [
    {
      id: "general",
      name: "General",
      description:
        "General Membership is open to individuals between the ages of 13 and 35 who are interested in wildlife conservation, environmental protection, and nature education and who are not full-time students. Membership can be obtained through any of the three YZA branches: Dehiwala, Pinnawala, and Ridiyagama.",
      fee: "Membership Fee: LKR 2,000 per year",
    },
    {
      id: "student",
      name: "Student",
      description:
        "Student membership is designed for school students and full-time university students between the ages of 13 and 35 who are interested in learning about biodiversity, wildlife, and conservation through educational programs, field activities, and practical experiences. Membership can be obtained through any of the three YZA branches.",
      fee: "Membership Fee: LKR 1,000 per year",
    },
    {
      id: "full-time",
      name: "Full Time",
      description:
        "Full-time membership is available to members between the ages of 13 and 35 who have maintained continuous membership in the association for a minimum of five years. This category recognizes long-standing commitment to the association and provides continued membership benefits until the age of 35. Membership can be obtained through any of the three YZA branches.",
      fee: "Membership Fee: LKR 5,000 (one-time fee valid until the age of 35)",
    },
    {
      id: "associate",
      name: "Associate",
      description:
        "Associate membership is intended for individuals above the age of 35 who wish to remain involved in the association's conservation, educational, and outreach activities. Membership can be obtained through any of the three YZA branches.",
      fee: "Membership Fee: LKR 5,000 per year",
    },
    {
      id: "overseas",
      name: "Overseas",
      description:
        "Overseas Membership is intended for Sri Lankan and international supporters residing outside Sri Lanka who wish to remain connected with the association's conservation, educational, and research initiatives. This category enables members abroad to support and engage with the activities and objectives of the Association.",
      fee: "Membership applications for this category are accepted only through the Dehiwala Branch.",
    },
    {
      id: "junior",
      name: "Junior",
      description:
        "The Junior Young Zoologists' Association (JYZA) is a special membership category for children aged 6 to 12 years. It is designed to foster an early appreciation for wildlife, biodiversity, nature, and environmental conservation through age-appropriate educational and recreational activities.\nMembership applications for JYZA are accepted only through the Dehiwala Branch. Through this program, young members are encouraged to develop a lifelong interest in nature and conservation from an early age.\nJYZA educational sessions are conducted every other Saturday from 10.00 a.m. onwards at the Young Zoologists' Association premises, National Zoological Gardens, Dehiwala.",
      fee: "",
    },
  ],
  activeMembers: null,
};
