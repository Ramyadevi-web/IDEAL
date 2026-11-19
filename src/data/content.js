// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Edit text, links and image paths in this one file.
//  Lines marked TODO need real details from the school.
//  (Photo albums are loaded automatically from src/assets/albums — see README.)
// ─────────────────────────────────────────────────────────────

export const school = {
  name: 'Ideal School',
  fullName: 'Ideal School CBSE, Mayiladuthurai',
  tagline: 'Passion to strive and excel',
  affiliationNo: '1930571',
  established: 2013,
  trust: 'MSJ Educational Trust',
  phone: '+91 90423 13360',
  phoneRaw: '919042313360', // used for tel: and WhatsApp links
  email: 'helpdesk.ideal@gmail.com',
  hours: 'Mon – Sat · 9:00 AM – 4:30 PM',
  address: ['MSJ Garden, West Ammakulam,', 'Nallathukudi Post, Mayiladuthurai – 609001,', 'Tamil Nadu'],
  mapsQuery: 'Ideal School CBSE Mayiladuthurai',
  directionsQr: 'https://qr.me-qr.com/yYRRr5lu', // decoded from routemap.jpg
  logo: '/images/brand/logo-ideal.png',
  webmail: 'https://www.ideal-school.in/webmail/', // TODO: confirm webmail address
  social: {
    facebook: 'https://www.facebook.com/IdealKids.IdealSchool/',
    instagram: 'https://www.instagram.com/ideal_school_cbse',
    youtube: 'https://www.youtube.com/@idealschoolcbse',
  },
  campusTourUrl: '', // TODO: paste the YouTube campus-tour link (falls back to the YouTube channel)
};

// One place for meeting times, so every page shows the same thing.
export const timings = {
  office: '9:00 AM – 4:30 PM, Monday to Saturday',
  school: '9:00 AM – 4:00 PM, Monday to Friday (Grades I – 10)',
  principal: '4:00 – 5:00 PM every working day, with prior appointment',
  principalShort: '4:00 – 5:00 PM',
  teacher: '2nd & 4th Saturday of every month, after school hours', // TODO: confirm (old site said 1st & 2nd)
  teacherShort: '2nd & 4th Saturday',
};

export const topLinks = [
  { label: 'Award', href: '/achievements', isNew: true },
  { label: 'Web Mail', href: school.webmail, external: true },
  { label: 'Feedback', href: '/feedback' },
  { label: 'Job Enquiry', href: '/job-enquiry' },
];

// ── Photo albums (folder names under src/assets/albums/<section>/<slug>/<year>/) ──
export const galleryCategories = [
  { slug: 'cultural-feat', label: 'Cultural Feat', years: ['2024-25', '2017-18', '2016-17'] },
  { slug: 'junior-olympics', label: 'Junior Olympics', years: ['2018-19', '2017-18', '2016-17'] },
  { slug: 'edu-concrete-expo', label: 'Edu Concrete Expo', years: ['2024-25', '2018-19', '2016-17'] },
  { slug: 'club-activity', label: 'Club Activity', years: ['2023-24', '2017-18'] },
  { slug: 'kids-activities', label: "Kids' Activities", years: ['2025-26', '2024-25', '2023-24', '2017-18'] },
  { slug: 'competition', label: 'Competition', years: ['2025-26', '2024-25', '2023-24', '2018-19', '2017-18'] },
  { slug: 'celebrations', label: 'Celebrations', years: ['2025-26', '2024-25', '2023-24', '2018-19', '2017-18', '2016-17'] },
  { slug: 'house-activities', label: 'House Activities', years: ['2024-25', '2018-19'] },
  { slug: 'star-of-the-week', label: 'Star of the Week', years: ['2023-24', '2018-19'] },
  { slug: 'grandparents-day', label: "Grandparents' Day", years: ['2018-19', '2017-18'] },
  { slug: 'independence-day', label: 'Independence Day', years: ['2018-19', '2017-18'] },
  { slug: 'republic-day', label: 'Republic Day', years: ['2018-19', '2017-18'] },
  { slug: 'teachers-day', label: "Teachers' Day", years: ['2018-19', '2017-18'] },
  { slug: 'childrens-day', label: "Children's Day", years: ['2018-19', '2017-18'] },
  { slug: 'graduation-day', label: 'Graduation Day', years: ['2018-19', '2017-18'] },
  { slug: 'christmas', label: 'Christmas Celebration', years: ['2018-19', '2017-18'] },
  { slug: 'cca', label: 'CCA', years: ['2023-24', '2017-18', '2016-17'] },
];

export const fieldTripYears = ['2025-26', '2024-25', '2023-24', '2022-23', '2017-18'];
export const achievementYears = ['2024-25', '2022-23', '2017-18'];

// Optional captions for albums (shown above the photos)
export const albumNotes = {
  'field-trip/2025-26': 'Field trip to the Fire & Rescue Station, Mayiladuthurai — live fire-fighting and water-rescue demonstrations.',
  'field-trip/2024-25': 'Visit to the 3rd Mayiladuthurai Book Festival 2025.',
};

// ── Main menu (dropdowns are built from this) ──
export const menu = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    children: [
      { label: 'About the School', to: '/about' },
      { label: 'Chairman’s Message', to: '/about/chairman' },
      { label: 'Principal’s Message', to: '/about/principal' },
      { label: 'Vision and Mission', to: '/about/vision-mission' },
    ],
  },
  {
    label: 'Academics',
    to: '/academics/curriculum',
    children: [
      { label: 'Curriculum', to: '/academics/curriculum' },
      { label: 'Timings', to: '/academics/timings' },
      { label: 'CCA', to: '/academics/cca' },
      { label: 'Certificates', to: '/academics/certificates' },
    ],
  },
  {
    label: 'Achievements',
    to: `/achievements/${achievementYears[0]}`,
    children: achievementYears.map((y) => ({ label: y, to: `/achievements/${y}` })),
  },
  { label: 'Infrastructure', to: '/infrastructure' },
  { label: 'Gallery', to: '/gallery', mega: true },
  {
    label: 'Field Trip',
    to: `/field-trip/${fieldTripYears[0]}`,
    children: fieldTripYears.map((y) => ({ label: y, to: `/field-trip/${y}` })),
  },
  { label: 'Contact', to: '/contact' },
  { label: 'Admissions', to: '/admissions', cta: true },
];

export const notices = [
  'Admissions open — book your campus visit today',
  `CBSE Affiliation No. 1930571`,
  `Principal meeting time: ${timings.principalShort}, with prior appointment`,
  `Parent–teacher meetings: ${timings.teacherShort}, after school`,
  'Office hours: 9:00 AM – 4:30 PM · Monday to Saturday',
];

export const slides = [
  {
    kicker: 'Education',
    title: 'Engaged learning, every single day',
    text: 'Joyful learning keeps our students engaged, self-directed and innovative — inside the classroom and beyond.',
    cta: 'View details',
    href: '/about',
    image: '/images/slider/slider1.jpg',
  },
  {
    kicker: 'Feed your knowledge',
    title: 'Scholars of tomorrow',
    text: 'We work every day to earn the trust of our parents and the confidence of our students.',
    cta: 'Apply now',
    href: '/admissions',
    image: '/images/slider/slider2.jpg',
  },
  {
    kicker: 'Best education',
    title: 'For your better future',
    text: 'Learn and lead with integrity — a CBSE education rooted in strong values.',
    cta: 'View now',
    href: '/academics/curriculum',
    image: '/images/slider/slider3.jpg',
  },
];

export const quickFacts = [
  { icon: 'star', title: 'Established 2013', text: 'Run by MSJ Educational Trust, Mayiladuthurai.' },
  { icon: 'monitor', title: 'IIT Bombay ICT curriculum', text: 'Digital skills built in from the early years.' },
  { icon: 'calendar', title: 'Admissions Open', text: 'Book a campus visit and meet our team →', highlight: true, href: '/admissions' },
];

export const about = {
  eyebrow: 'Welcome to Ideal School',
  title: 'Where every child learns, grows and leads with integrity',
  text: 'Ideal School CBSE opened its doors in 2013 under MSJ Educational Trust. We help children build strong speaking, reading and writing skills, nurture their talent and creativity, and grow in confidence and good values.',
  quote: 'We embrace the principles of Inclusion, Equality and Diversity.',
  images: ['/images/about/ideal22.jpg', '/images/about/ideal23.jpg', '/images/about/ideal24.jpg'],
};

export const vision = {
  vision: ['A vibrant learning organisation', 'The Best from All, In All'],
  mission: 'A school which nurtures creative thinkers, lifelong learners and responsible citizens.',
  motto: 'Passion to strive and excel',
  values: [
    { letter: 'I', word: 'Integrity', text: 'Being honest and doing what is right, even when no one is watching.', tone: 'crimson' },
    { letter: 'D', word: 'Discipline', text: 'Self-control, punctuality and respect for rules and routines.', tone: 'green' },
    { letter: 'E', word: 'Empathy', text: 'Understanding and caring for the feelings of others.', tone: 'purple' },
    { letter: 'A', word: 'Aspiration', text: 'Dreaming big and working hard to reach our goals.', tone: 'crimson' },
    { letter: 'L', word: 'Loyalty', text: 'Standing by our school, our friends and our nation.', tone: 'green' },
  ],
};

// Counters. Add real numbers if you have them, e.g. { count: 450, suffix: '+', label: 'Ideal Stars' }
export const stats = [
  { count: new Date().getFullYear() - 2013, suffix: '+', label: 'Years of excellence' },
  { text: 'CBSE', label: 'Affiliation No. 1930571' },
  { text: 'IIT-B', label: 'Designed ICT curriculum' },
  { text: 'Phonics', label: 'Australian-based, in KG' },
];

export const leaders = [
  {
    slug: 'principal',
    role: "Principal's Message",
    name: 'Pushpavalli N',
    qualification: 'M.Com., M.Phil., B.Ed., M.A. (English)',
    title: 'Principal, Ideal School CBSE',
    photo: '/images/leaders/principal.jpg',
    highlight:
      'As my children come to school, I wish them joy on their face to learn, and to learn to face tomorrow’s world courageously.',
    message: [
      'To my loving Children,',
      'School, the abode of learning, influences the all-round development of every pupil. Education is synonymous with breeding, civilization, coaching, cultivation, culture, development, discipline, training and tutoring. Threading all these together, we strive to incorporate the four pillars of learning described by Jacques Delors: to know, to do, to live and to share together.',
      'As my children come to school, I wish them joy on their face to learn, and to learn to face tomorrow’s world courageously. Every child of mine is unique, and my children are ready to show their potential. Along with my teachers, I strive to bring out their real potential and hidden talents, and to display their skills for tomorrow’s India.',
      'In our daily prayer, we ask the Lord to take all our talents, skills, understanding and knowledge to transform us. I join with my children and ask the Almighty to bless each one of them with their uniqueness.',
    ],
  },
  {
    slug: 'chairman',
    role: "Chairman's Message",
    name: 'Mr. N. M. A. Mohamed Siddique',
    qualification: '',
    title: 'Chairman, MSJ Educational Trust',
    photo: '/images/leaders/chairman.jpg',
    highlight:
      'An inviting school with a community of happy learners. New outlook, new vision and new approach — we can all certainly look forward to a great year ahead.',
    message: [
      'In the quest to provide all Idealists with a complete education, the school programmes are designed to develop them cognitively, aesthetically, morally, physically and socially. Our challenge is to foster a school environment and culture conducive to learning, growth, innovation and enterprise. At Ideal, we have confident, competent, caring and committed teachers and staff; supportive and collaborative parents; and partners with whom we have grown purposeful and sustainable partnerships in education.',
      'In the 21st century, globalisation and advancement in technology will affect nearly every aspect of our lives. The way we work, learn and live is getting more dynamic and involves rapid changes. We want our students to grow up as responsible and ethical users in the digital age, equipped with the knowledge and skills to navigate a dynamic world.',
      'Passionate and dedicated teachers are key to the development of our pupils. With concerted efforts and support from the School Management Committee, alumni and parents, we will nurture our pupils, enrich their learning, appreciate their innate capabilities and bring out the best in them so that they will grow, blossom and shape tomorrow.',
      'An inviting school with a community of happy learners. New outlook, new vision and new approach — we can all certainly look forward to a great year ahead. Together we can achieve. I welcome you all to IDEAL to be an IDEALIST!',
    ],
  },
];

// Home page "Academics" cards — matches the real curriculum grades
export const stages = [
  { mark: 'KG', title: 'Kindergarten', text: 'Play-based learning with an Australian-based phonics programme for confident early readers and writers.', tone: 'green' },
  { mark: 'I–3', title: 'Grades I to 3', text: 'English, Mathematics, E.V.S, Tamil, Hindi, Computer Science and Life Skills.', tone: 'crimson' },
  { mark: '4–8', title: 'Grades 4 to 8', text: 'English, Mathematics, Science, Social Science, Tamil, Hindi, Computer Science and Life Skills.', tone: 'purple' },
  { mark: '9–10', title: 'Grades 9 & 10', text: 'Physics, Chemistry, Botany, Zoology, History & Civics, Geography & Economics and more.', tone: 'navy' },
];

export const curriculum = {
  intro: [
    'Our aim is to provide a holistic school education that focuses on excellence. Our academic team plans balanced academic activities in line with the objectives of the national curriculum. The curriculum offers core and extended versions to suit students with varying levels of learning ability.',
    'Assessment is not based only on conventional examinations; it uses a variety of assessment tools. We believe the curriculum should let a child choose a combination of subjects that interests them, instead of offering a fixed menu that does little to help them build their careers.',
    'A mark sheet is merely meant to qualify a student for the next level, not to measure their ability — a mark sheet will not speak for a person. Schools must function not as factories producing prospective professionals, but as storehouses of knowledge and character, producing well-rounded human beings.',
  ],
  image: '/images/pages/ideal26.jpg',
  table: [
    { grades: 'I to 3', subjects: ['English', 'Mathematics', 'E.V.S', 'Language II (Tamil)', 'Language III (Hindi)', 'Computer Science', 'Life Skill Lessons'] },
    { grades: '4 to 8', subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Language II (Tamil)', 'Language III (Hindi)', 'Computer Science', 'Life Skill Lessons'] },
    { grades: '9 & 10', subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Botany', 'Zoology', 'Social Science', 'History & Civics', 'Geography & Economics', 'Language II (Tamil)', 'Computer Science', 'Life Skill Lessons'] },
  ],
};

export const schoolTimings = {
  intro:
    'Regular school works Monday to Friday. Special academic sessions and club activities may be conducted on Saturdays for Grade 4 upwards. Co-curricular activities are conducted twice a week.',
  rows: [
    { label: 'Grades I to 10', value: '9:00 AM – 4:00 PM', note: 'Monday to Friday' },
    { label: 'School office', value: '9:00 AM – 4:30 PM', note: 'Monday to Saturday' },
    { label: 'Principal meeting', value: timings.principalShort, note: 'Every working day, with prior appointment' },
    { label: 'Parent–teacher meeting', value: 'After school', note: timings.teacherShort },
    { label: 'Sunday', value: 'Closed', note: '' },
  ],
};

export const cca = {
  intro: [
    'To ensure the development of the total personality of our students, the school provides ample opportunities to engage in a wide variety of activities. Co-curricular activities stimulate interest in hobbies and give room for self-expression, shaping balanced and well-integrated personalities.',
    'Ideal School gives as much importance to CCA as it does to academics. CCA and regular sports give a boost to mind and body, and develop teamwork and leadership. Our CCA reinforce the school’s core values — Integrity, Discipline, Empathy, Aspiration and Loyalty: sports and games instil integrity and discipline and cultivate empathy; clubs and societies promote aspiration and loyalty.',
  ],
  note: 'CCA is strongly encouraged for students from Grade 1 onwards.',
  image: '/images/pages/ideal25.jpg',
  groups: [
    { title: 'For all grades', icon: 'star', items: ['Skating', 'Taekwondo', 'Archery'] },
    { title: 'Sports & games (Grade 4 – 10)', icon: 'trophy', items: ['Basketball', 'Badminton', 'Volleyball', 'Table Tennis', 'Soccer', 'Track & Field', 'Shot Put', 'Javelin', 'Long Jump'] },
    { title: 'Performing arts', icon: 'music', items: ['Classical Dance', 'Keyboard', 'Conga (Drum)'] },
    {
      title: 'Clubs',
      icon: 'users',
      items: ['Phoenix Club — Literary', 'Splash Club — Art & Craft', 'Wellness Club — Eco & Health', 'Young Scientist Club — Science', 'Infinity Club — Maths'],
    },
  ],
};

export const faqs = [
  { q: 'How will my child transform at Ideal?', a: 'We aim to develop creative thinkers, lifelong learners and responsible citizens who are ready for the world ahead.' },
  { q: 'What is the learning ambience like?', a: 'Spacious, well-ventilated classrooms with smart boards, plus science, maths and computer labs and an air-conditioned library.' },
  { q: 'Which ICT curriculum do you follow?', a: 'Our students learn computing through an ICT curriculum designed by IIT Bombay.' },
  { q: 'How do you teach reading in kindergarten?', a: 'Our kindergarten uses an Australian-based phonics programme to build strong early reading and writing skills.' },
  { q: 'How do children build self-confidence?', a: 'Our facilitators motivate every student to discover and develop their full potential through activities, stage time and encouragement.' },
];

// Home page infrastructure cards (copy ideal1.jpg … ideal5.jpg from the old site's images/infra/ into public/images/infra/)
export const infrastructure = [
  { title: 'Spacious campus', text: 'Wide, airy passages and safe open spaces.', image: '/images/infra/ideal1.jpg' },
  { title: 'Laboratories', text: 'Science, maths and computer labs.', image: '/images/infra/ideal2.jpg' },
  { title: 'School transport', text: 'Safe, reliable buses across the region.', image: '/images/infra/ideal3.jpg' },
  { title: 'Library', text: 'Air-conditioned, from fiction to non-fiction.', image: '/images/infra/ideal4.jpg' },
  { title: 'Learning rooms', text: 'Smart-board classrooms.', image: '/images/infra/ideal5.jpg' },
];

// Infrastructure page
export const facilities = [
  { icon: 'board', title: 'Classrooms', text: 'Spacious, well-ventilated classrooms with smart-board technology.' },
  { icon: 'flask', title: 'Science lab', text: 'College-style laboratory with full lab equipment.' },
  { icon: 'calc', title: 'Maths lab', text: 'Air-conditioned lab using maths play-group methods to make maths fun to learn.' },
  { icon: 'monitor', title: 'Computer lab', text: 'Air-conditioned lab that brings computer knowledge to every student.' },
  { icon: 'book', title: 'Library', text: 'Air-conditioned library — fiction, non-fiction and many more collections.' },
  { icon: 'track', title: 'Running track', text: 'A 200 m running track for athletics.' },
  { icon: 'trophy', title: 'Courts & rink', text: 'Volleyball court, basketball court and a skating rink.' },
  { icon: 'users', title: 'Multipurpose hall', text: 'For school activities and events, plus a dining area for students.' },
];

// Copy these from the old site's images/gallery/ folder into public/images/infrastructure/
export const facilityPhotos = [
  { title: 'Ideal Ground', image: '/images/infrastructure/ideal01.jpg' },
  { title: 'Ideal Van', image: '/images/infrastructure/ideal001.jpg' },
  { title: 'Ideal Library', image: '/images/infrastructure/ideal002.jpg' },
  { title: 'Ideal Ground', image: '/images/infrastructure/ideal003.jpg' },
  { title: 'Ideal Laboratories', image: '/images/infrastructure/ideal004.jpg' },
  { title: 'Ideal Digital Classroom', image: '/images/infrastructure/ideal005.jpg' },
  { title: 'Ideal Work Place', image: '/images/infrastructure/ideal006.jpg' },
];

export const admissionSteps = [
  { title: 'Enquire', text: 'Call, WhatsApp or visit the office. Registration forms are available at the school office.' },
  { title: 'Apply', text: 'Pay the admission and application fee to obtain the application form, and fill in all particulars.' },
  { title: 'Entrance', text: 'Submit the filled form with the required certificates when you are called for the entrance. Results are shared on the spot.' },
  { title: 'Join', text: 'Complete admission with the documents listed below and welcome to the Ideal family!' },
];

export const admissions = {
  image: '/images/pages/Admission.jpg',
  procedure: [
    'Registration forms are available at the school office.',
    'Admission and application fees must be paid to obtain the application form.',
    'Duly filled applications must be submitted with the required certificates when you are asked to come for the entrance.',
    'Applications without complete particulars will be rejected.',
    'Entrance results will be shared on the spot, depending on schedules.',
    'Recommendations will not be entertained.',
    'Please call us for any enquiry.',
  ],
  documents: [
    'Filled-in admission form with admission fee',
    'Four passport-size and two stamp-size colour photographs of the child',
    'Photocopy of the birth certificate',
    'Photocopy of the original mark sheet from the previous school',
    'Transfer certificate / school leaving certificate from the last school attended',
  ],
  outcomesIntro: 'At the end of six years of primary education, our pupils should:',
  outcomes: [
    'Be able to distinguish right from wrong',
    'Have learnt to share and put others first',
    'Be able to build friendships with others',
    'Have a lively curiosity about things',
    'Be able to think for and express themselves',
    'Take pride in their work',
    'Have cultivated healthy habits',
    'Love India',
  ],
};

export const news = [
  {
    date: 'Academic year 2025-26',
    title: 'Field trip to the Fire & Rescue Station, Mayiladuthurai',
    text: 'Students watched live fire-fighting and water-rescue demonstrations and learnt everyday safety from the officers.',
    image: '/images/fieldtrip/2025-26/3.jpg',
    href: '/field-trip/2025-26',
  },
  {
    date: 'Academic year 2024-25',
    title: 'Visit to the Mayiladuthurai Book Festival 2025',
    text: 'Our students explored hundreds of stalls, picked their own books and celebrated the joy of reading.',
    image: '/images/fieldtrip/2024-25/5.jpg',
    href: '/field-trip/2024-25',
  },
];

export const noticeBoard = [
  { tag: 'ADMISSIONS', text: 'Admissions are open. Book a campus visit through the office or WhatsApp.' },
  { tag: 'MEETINGS', text: `Principal meeting time is ${timings.principal}.` },
  { tag: 'PARENTS', text: `Teacher meetings are held on the ${timings.teacher}.` },
  { tag: 'OFFICE', text: `Office hours: ${timings.office}. Closed on Sundays.` },
];

// Real parent testimonials only. The section stays hidden while this list is empty.
// e.g. { quote: '…', name: 'Mr. Kumar', role: 'Parent, Class 4' }
export const testimonials = [];

// PDFs: copy from the old site's images/ folder into public/docs/
export const downloads = [
  { label: 'Mandatory Disclosure Details', href: '/docs/MandatoryDisclosureDetails.pdf', key: true },
  { label: 'Extension of Affiliation', href: '/docs/ExtensionAffiliation.pdf', key: true },
  { label: 'Fee Structure', href: '/docs/feestructure.pdf', key: true },
  { label: 'Academic Calendar', href: '/docs/AcademicCalendar.pdf', key: true },
  { label: 'Building Safety Certificate', href: '/docs/BUILDINGSAFETYCERTIFICATE.pdf', key: true },
  { label: 'Fire and Safety Certificate', href: '/docs/fireandsafetycertificate.pdf', key: true },
  { label: 'Trust Registration', href: '/docs/TrustRegistration.pdf' },
  { label: 'NOC', href: '/docs/noc.pdf' },
  { label: 'Sanitary Certificate', href: '/docs/sanitarycertificate.pdf' },
  { label: 'DEO Certificate', href: '/docs/DEOcertificate.pdf' },
  { label: 'Certificate of Recognition', href: '/docs/CertificateofRecognition.pdf' },
  { label: 'School Management Committee', href: '/docs/smc.pdf' },
];

export const schoolRules = [
  `Office hours: ${timings.office}`,
  `Principal meeting: ${timings.principal}`,
  `Teacher meetings: ${timings.teacher}`,
  'Sunday: closed',
];

export const jobPosts = ['Teacher', 'Accountant'];

export const whatsappOptions = [
  { label: 'Admission enquiry', message: 'Hello Ideal School, I would like to enquire about admissions for my child.' },
  { label: 'Fee details', message: 'Hello Ideal School, could you please share the fee structure?' },
  { label: 'Book a campus visit', message: 'Hello Ideal School, I would like to book a campus visit.' },
  { label: 'Transport enquiry', message: 'Hello Ideal School, I would like to know about school transport routes.' },
];

export const waLink = (message) =>
  `https://wa.me/${school.phoneRaw}?text=${encodeURIComponent(message)}`;
