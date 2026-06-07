export const site = {
  name: 'Ajay Melekamburath',
  brand: 'ajay',
  role: '// computational chemist & developer',
  bio: 'PhD student in the Valeev Group at Virginia Tech, building automated implementations of many-body electronic structure methods. I ship code for science.',
  orcidId: '0000-0002-0079-5443',
  email: '', // optional: set to render a contact link
  socials: {
    github: 'https://github.com/ajay-mk',
    scholar: 'https://scholar.google.com/citations?hl=en&user=VC-HIpUAAAAJ',
    orcid: 'https://orcid.org/0000-0002-0079-5443',
    instagram: 'https://instagram.com/ajaymk_',
  },
} as const;

export const nav = [
  { href: '/', label: 'home' },
  { href: '/cv', label: 'cv' },
  { href: '/publications', label: 'publications' },
  { href: '/blog', label: 'blog' },
];
