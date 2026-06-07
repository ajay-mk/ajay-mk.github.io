export const site = {
  name: 'Ajay Melekamburath',
  brand: 'ajay',
  role: 'computational chemist | C++ | HPC',
  bio: 'Graduate student in the Valeev Group at Virginia Tech, working on many-body electronic structure methods and the scientific software behind them.',
  orcidId: '0000-0002-0079-5443',
  email: '', // optional: set to render a contact link
  socials: {
    github: 'https://github.com/ajay-mk',
    scholar: 'https://scholar.google.com/citations?hl=en&user=VC-HIpUAAAAJ',
    orcid: 'https://orcid.org/0000-0002-0079-5443',
    linkedin: 'https://www.linkedin.com/in/ajaymk/',
    instagram: 'https://instagram.com/ajaymk_',
  },
} as const;

export const nav = [
  { href: '/', label: 'home' },
  { href: '/cv', label: 'cv' },
  { href: '/publications', label: 'publications' },
  { href: '/projects', label: 'projects' },
  { href: '/blog', label: 'blog' },
];
