import { NavItem, Testimonial, ProcessItem, ContactInfo } from '@/types';

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'blog', label: 'Blog', href: '#blog' },
];

// Testimonials data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Diya Charity has transformed our community by providing free education to our children. They truly light up lives!",
    author: 'Vijaya'
  },
  {
    id: '2',
    quote: "The healthcare camps organized by Diya Charity have been a blessing for our village. We are forever grateful.",
    author: 'Kannan'
  },
  {
    id: '3',
    quote: "Through their women empowerment programs, I learned skills that helped me start my own business. Thank you Diya Charity!",
    author: 'Kaviya'
  }
];

// Process items
export const PROCESS_ITEMS: ProcessItem[] = [
  {
    id: 'education',
    title: 'Education',
    description: 'Providing Quality Education to Underprivileged Children'
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'Ensuring Access to Medical Care for All'
  },
  {
    id: 'empowerment',
    title: 'Women Empowerment',
    description: 'Building Strong, Independent Women Leaders'
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Protecting Our Planet for Future Generations'
  }
];

// Contact information
export const CONTACT_INFO: ContactInfo = {
  phone: '9445205771',
  email: 'dctnow.ngo@gmail.com',
  address: {
    street: '2/43, Veteran Lines, Pallavaram',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zip: '600043'
  }
};

// Mission content
export const MISSION_CONTENT = {
  title: 'Our Mission',
  description: `At Diya Charity, we are a newly established NGO dedicated to serving society through comprehensive social welfare programs. Our mission is to illuminate lives and bring hope to underserved communities through education, healthcare, women's empowerment, and environmental sustainability. Like a diya (lamp) that dispels darkness, we strive to light up the path towards a better tomorrow for all.`,
  aboutUs: `Founded in 2024, Diya Charity emerged from a simple yet powerful vision: to be the light that guides communities out of darkness. As a startup NGO, we believe that every individual deserves access to quality education, healthcare, and opportunities for growth. Our name "Diya" symbolizes the light of hope, knowledge, and compassion that we bring to every life we touch.`,
  vision: `To create a world where no one is left behind, where every child has access to education, every family has healthcare, and every woman has the power to shape her own destiny.`,
  values: `Compassion, Integrity, Transparency, and Service to Humanity are the core values that guide everything we do.`
};

// Hero content
export const HERO_CONTENT = {
  title: 'Illuminating Lives Through Service',
  subtitle: "Empowering Communities, Building Hope",
  ctaText: 'Join Our Mission'
};

// Contact form content
export const CONTACT_CONTENT = {
  title: 'Get in Touch',
  description: 'Join us in our mission to serve society. Whether you want to volunteer, donate, or partner with us, we would love to hear from you. Together, we can make a difference in the lives of those who need it most.'
};

// Footer content
export const FOOTER_CONTENT = {
  organizationName: 'Diya Charity',
  copyright: '© 2035 by Diya Charity.',
  poweredBy: 'Powered and secured by Wix',
  links: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Accessibility Statement', href: '#accessibility' }
  ]
};
