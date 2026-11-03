import type { Project } from './types';

/**
 * To add a screenshot: put the file in /public/images/projects and set `image`.
 * To add links: set `links.github` / `links.demo`. Buttons only render for links that exist.
 */
export const projects: Project[] = [
  {
    id: 'pharmatwin',
    title: 'PharmaTwin',
    subtitle: 'Pharmaceutical Supply Chain Digital Twin',
    category: 'Research Project',
    status: 'Ongoing research',
    featured: true,
    summary:
      'A research project developing a context-aware, AI-driven digital twin framework for optimizing pharmaceutical supply chains.',
    contribution: {
      title: 'IoT Cold-Chain Tracking & Logistics Risk Prediction',
      text: 'My component brings multi-source IoT sensor data together and uses time-series models to predict temperature excursions and delivery delays, so risks can be flagged while shipments are still in transit.',
    },
    // Update each status as the research progresses: 'implemented' | 'in-progress' | 'planned'.
    features: [
      { label: 'Multi-source IoT sensor data integration', status: 'in-progress' },
      { label: 'GPS, temperature and humidity monitoring', status: 'in-progress' },
      { label: 'CNN-LSTM time-series prediction', status: 'in-progress' },
      { label: 'Temperature excursion and delivery delay risk prediction', status: 'in-progress' },
      { label: 'Cold-chain logistics monitoring', status: 'in-progress' },
      { label: 'Real-time risk visualization', status: 'in-progress' },
    ],
    tech: ['Python', 'Machine Learning', 'CNN-LSTM', 'Kafka', 'MongoDB', 'React.js', 'Node.js'],
    visual: 'pharmatwin',
  },
  {
    id: 'event-management',
    title: 'Cross-Functional Event Management System',
    category: 'Full-Stack Web Application',
    summary:
      'A MERN application for planning events and managing the service providers behind them, with RESTful APIs in Node.js and Express and MongoDB for storage.',
    features: [
      { label: 'Event creation and registration' },
      { label: 'User management and roles' },
      { label: 'Service provider management' },
      { label: 'Review and rating system' },
      { label: 'RESTful API development' },
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    visual: 'events',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    category: 'Web Application',
    summary:
      'A web application that simplifies hospital operations, with Java handling the backend logic, MySQL storing records, and JavaScript powering the interactive front end.',
    features: [
      { label: 'Patient record management' },
      { label: 'Appointment management' },
      { label: 'Staff information management' },
    ],
    tech: ['Java', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    visual: 'hospital',
  },
  {
    id: 'finance-tracker',
    title: 'Personal Finance Tracker',
    category: 'Android Application',
    summary:
      'An Android app for tracking income and expenses, setting monthly budgets and understanding where money goes, with data stored locally on the device.',
    features: [
      { label: 'Income and expense tracking' },
      { label: 'Monthly budget management' },
      { label: 'Category-wise spending analysis' },
      { label: 'Budget alerts' },
      { label: 'Local data storage' },
    ],
    tech: ['Android Studio', 'Java/Kotlin', 'Shared Preferences'],
    visual: 'finance',
  },
  {
    id: 'career-guidance',
    title: 'AI-Powered Career Guidance App',
    category: 'UI/UX Design',
    summary:
      'A mobile UI/UX design project for an AI-driven career guidance app, designed and prototyped in Figma, with UI components implemented in Android Studio.',
    features: [
      { label: 'Intuitive mobile interface' },
      { label: 'Career guidance experience' },
      { label: 'User-friendly navigation' },
      { label: 'Interactive UI components' },
    ],
    tech: ['Figma', 'Android Studio'],
    visual: 'career',
  },
  {
    id: 'advertising-agency',
    title: 'Online Advertising Agency',
    category: 'Web Application',
    summary:
      'A dynamic web platform that connects advertisers and clients, using PHP for server-side processing and MySQL for data storage.',
    features: [
      { label: 'Campaign management' },
      { label: 'User registration' },
      { label: 'Real-time data tracking' },
    ],
    tech: ['HTML', 'CSS', 'PHP', 'JavaScript', 'MySQL'],
    visual: 'advertising',
  },
];
