import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sheet } from '../../features/sheets/types/sheet';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  sheetEndpoint = 'sheets';
  organizationEndpoint = 'organizations';
  rowEndpoint = 'rows';
  schemaEndpoint = 'schema';

  organizations = mockOrganizations;
  sheets = mockSheets;
  rows = mockRows;
  schemas = mockSchemas;

  constructor() {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const endpointParts = endpoint.split('/').filter(Boolean);
    if (endpointParts.length === 1 && endpointParts[0] === 'organizations') {
      return new Observable((observer) => {
        observer.next(this.organizations as unknown as T);
        observer.complete();
      });
    } else if (
      endpointParts.length === 2 &&
      endpointParts[0] === this.organizationEndpoint
    ) {
      const organizationId = parseInt(endpointParts[1], 10);
      const organization = this.organizations.find(
        (organization) => organization.id === organizationId
      );

      if (organization) {
        return new Observable((observer) => {
          observer.next(organization as unknown as T);
          observer.complete();
        });
      }
    } else if (
      endpointParts.length === 3 &&
      endpointParts[0] === this.organizationEndpoint &&
      endpointParts[2] === this.sheetEndpoint
    ) {
      const organizationId = parseInt(endpointParts[1], 10);
      const organization = this.organizations.find(
        (organization) => organization.id === organizationId
      );
      const sheets = this.sheets.filter(
        (sheet) => sheet.organizationId === organizationId
      );

      if (organization) {
        return new Observable((observer) => {
          observer.next(sheets as unknown as T);
          observer.complete();
        });
      }
    } else if (
      endpointParts.length === 4 &&
      endpointParts[0] === this.organizationEndpoint &&
      endpointParts[2] === this.sheetEndpoint
    ) {
      const organizationId = parseInt(endpointParts[1], 10);
      const sheetId = parseInt(endpointParts[3], 10);
      const sheet = this.sheets.find(
        (sheet) =>
          sheet.id === sheetId && sheet.organizationId === organizationId
      );

      if (sheet) {
        return new Observable((observer) => {
          observer.next(sheet as unknown as T);
          observer.complete();
        });
      }
    } else if (
      endpointParts.length === 5 &&
      endpointParts[0] === this.organizationEndpoint &&
      endpointParts[2] === this.sheetEndpoint &&
      endpointParts[4] === this.rowEndpoint
    ) {
      const sheetId = parseInt(endpointParts[3], 10);
      const rows = this.rows.filter((row) => row.sheetId === sheetId);

      return new Observable((observer) => {
        observer.next(rows as unknown as T);
        observer.complete();
      });
    } else if (
      endpointParts.length === 5 &&
      endpointParts[0] === this.organizationEndpoint &&
      endpointParts[2] === this.sheetEndpoint &&
      endpointParts[4] === this.schemaEndpoint
    ) {
      const sheetId = parseInt(endpointParts[3], 10);
      const schema = this.schemas.find((schema) => schema.sheetId === sheetId);

      return new Observable((observer) => {
        observer.next(schema as unknown as T);
        observer.complete();
      });
    }

    return new Observable((observer) => {
      observer.error(new Error(`Endpoint ${endpoint} not found.`));
    });
  }
}

const mockOrganizations = [
  {
    id: 1,
    name: 'Platonic Academy',
    type: 'ancient_institution',
    founded: '387 BC',
    location: 'Athens',
  },
  {
    id: 2,
    name: 'Electronic Frontier Foundation',
    type: 'digital_rights',
    founded: '1990',
    location: 'San Francisco',
  },
  {
    id: 3,
    name: 'House of Wisdom',
    type: 'medieval_institution',
    founded: '825',
    location: 'Baghdad',
  },
  {
    id: 4,
    name: 'Bell Labs',
    type: 'research_corp',
    founded: '1925',
    location: 'New Jersey',
  },
  {
    id: 5,
    name: 'Creative Commons',
    type: 'open_knowledge',
    founded: '2001',
    location: 'Mountain View',
  },
];

const mockSheets: Sheet[] = [
  // Platonic Academy
  {
    id: 1,
    name: 'Philosophers',
    organizationId: 1,
    description: 'Notable teachers and their methods',
  },
  {
    id: 2,
    name: 'Manuscripts',
    organizationId: 1,
    description: 'Key philosophical works and their impact',
  },
  {
    id: 3,
    name: 'Disciplines',
    organizationId: 1,
    description: 'Areas of study and research',
  },

  // EFF
  {
    id: 4,
    name: 'Digital Rights Advocates',
    organizationId: 2,
    description: 'Leaders in digital freedom',
  },
  {
    id: 5,
    name: 'Legal Cases',
    organizationId: 2,
    description: 'Landmark digital rights cases',
  },
  {
    id: 6,
    name: 'Tech Projects',
    organizationId: 2,
    description: 'Privacy and security initiatives',
  },

  // House of Wisdom
  {
    id: 7,
    name: 'Scholars',
    organizationId: 3,
    description: 'Notable researchers and translators',
  },
  {
    id: 8,
    name: 'Translations',
    organizationId: 3,
    description: 'Major works preserved and translated',
  },
  {
    id: 9,
    name: 'Inventions',
    organizationId: 3,
    description: 'Scientific discoveries and devices',
  },

  // Bell Labs
  {
    id: 10,
    name: 'Researchers',
    organizationId: 4,
    description: 'Notable scientists and engineers',
  },
  {
    id: 11,
    name: 'Innovations',
    organizationId: 4,
    description: 'Groundbreaking technological advances',
  },
  {
    id: 12,
    name: 'Patents',
    organizationId: 4,
    description: 'Key technological patents',
  },

  // Creative Commons
  {
    id: 13,
    name: 'Contributors',
    organizationId: 5,
    description: 'Key figures in open knowledge',
  },
  {
    id: 14,
    name: 'Licenses',
    organizationId: 5,
    description: 'Different types of CC licenses',
  },
  {
    id: 15,
    name: 'Projects',
    organizationId: 5,
    description: 'Major open knowledge initiatives',
  },
];

const mockSchemas = [
  {
    id: 1,
    sheetId: 1,
    name: 'Philosopher',
    columns: [
      { id: 1, schemaId: 1, name: 'name', type: 'string' },
      { id: 2, schemaId: 1, name: 'specialty', type: 'string' },
      { id: 3, schemaId: 1, name: 'contribution', type: 'string' },
      { id: 4, schemaId: 1, name: 'notable_students', type: 'string' },
      { id: 5, schemaId: 1, name: 'years_active', type: 'number' },
    ],
  },
  {
    id: 2,
    sheetId: 2,
    name: 'Manuscript',
    columns: [
      { id: 1, schemaId: 2, name: 'title', type: 'string' },
      { id: 2, schemaId: 2, name: 'author', type: 'string' },
      { id: 3, schemaId: 2, name: 'theme', type: 'string' },
      { id: 4, schemaId: 2, name: 'impact', type: 'string' },
      { id: 5, schemaId: 2, name: 'year_written', type: 'number' },
    ],
  },
  {
    id: 3,
    sheetId: 3,
    name: 'Discipline',
    columns: [
      { id: 1, schemaId: 3, name: 'name', type: 'string' },
      { id: 2, schemaId: 3, name: 'description', type: 'string' },
      { id: 3, schemaId: 3, name: 'notable_contributors', type: 'string' },
      { id: 4, schemaId: 3, name: 'foundational_work', type: 'string' },
    ],
  },
  {
    id: 4,
    sheetId: 4,
    name: 'Digital Rights Advocate',
    columns: [
      { id: 1, schemaId: 4, name: 'name', type: 'string' },
      { id: 2, schemaId: 4, name: 'role', type: 'string' },
      { id: 3, schemaId: 4, name: 'contribution', type: 'string' },
      { id: 4, schemaId: 4, name: 'impact', type: 'string' },
      { id: 5, schemaId: 4, name: 'years_active', type: 'number' },
    ],
  },
  {
    id: 5,
    sheetId: 5,
    name: 'Legal Case',
    columns: [
      { id: 1, schemaId: 5, name: 'name', type: 'string' },
      { id: 2, schemaId: 5, name: 'type', type: 'string' },
      { id: 3, schemaId: 5, name: 'outcome', type: 'string' },
      { id: 4, schemaId: 5, name: 'year_filed', type: 'number' },
    ],
  },
  {
    id: 6,
    sheetId: 6,
    name: 'Tech Project',
    columns: [
      { id: 1, schemaId: 6, name: 'name', type: 'string' },
      { id: 2, schemaId: 6, name: 'description', type: 'string' },
      { id: 3, schemaId: 6, name: 'impact', type: 'string' },
      { id: 4, schemaId: 6, name: 'year_started', type: 'number' },
    ],
  },
  {
    id: 7,
    sheetId: 7,
    name: 'Scholar',
    columns: [
      { id: 1, schemaId: 7, name: 'name', type: 'string' },
      { id: 2, schemaId: 7, name: 'specialty', type: 'string' },
      { id: 3, schemaId: 7, name: 'contribution', type: 'string' },
    ],
  },
  {
    id: 8,
    sheetId: 8,
    name: 'Translation',
    columns: [
      { id: 1, schemaId: 8, name: 'title', type: 'string' },
      { id: 2, schemaId: 8, name: 'author', type: 'string' },
      { id: 3, schemaId: 8, name: 'translator', type: 'string' },
      { id: 4, schemaId: 8, name: 'impact', type: 'string' },
      { id: 5, schemaId: 8, name: 'year_translated', type: 'number' },
    ],
  },
  {
    id: 9,
    sheetId: 9,
    name: 'Invention',
    columns: [
      { id: 1, schemaId: 9, name: 'name', type: 'string' },
      { id: 2, schemaId: 9, name: 'inventor', type: 'string' },
      { id: 3, schemaId: 9, name: 'purpose', type: 'string' },
      { id: 4, schemaId: 9, name: 'impact', type: 'string' },
      { id: 5, schemaId: 9, name: 'year_invented', type: 'number' },
    ],
  },
  {
    id: 10,
    sheetId: 10,
    name: 'Researcher',
    columns: [
      { id: 1, schemaId: 10, name: 'name', type: 'string' },
      { id: 2, schemaId: 10, name: 'specialty', type: 'string' },
      { id: 3, schemaId: 10, name: 'contribution', type: 'string' },
      { id: 4, schemaId: 10, name: 'innovations', type: 'string' },
      { id: 5, schemaId: 10, name: 'awards', type: 'number' },
      { id: 6, schemaId: 10, name: 'years_active', type: 'number' },
    ],
  },
  {
    id: 11,
    sheetId: 11,
    name: 'Innovation',
    columns: [
      { id: 1, schemaId: 11, name: 'name', type: 'string' },
      { id: 2, schemaId: 11, name: 'inventors', type: 'string' },
      { id: 3, schemaId: 11, name: 'impact', type: 'string' },
      { id: 4, schemaId: 11, name: 'year_invented', type: 'number' },
    ],
  },
  {
    id: 12,
    sheetId: 12,
    name: 'Patent',
    columns: [
      { id: 1, schemaId: 12, name: 'name', type: 'string' },
      { id: 2, schemaId: 12, name: 'inventors', type: 'string' },
      { id: 3, schemaId: 12, name: 'patent_number', type: 'string' },
      { id: 4, schemaId: 12, name: 'year_granted', type: 'number' },
      { id: 5, schemaId: 12, name: 'impact', type: 'string' },
    ],
  },
  {
    id: 13,
    sheetId: 13,
    name: 'Contributor',
    columns: [
      { id: 1, schemaId: 13, name: 'name', type: 'string' },
      { id: 2, schemaId: 13, name: 'role', type: 'string' },
      { id: 3, schemaId: 13, name: 'contribution', type: 'string' },
      { id: 4, schemaId: 13, name: 'impact', type: 'string' },
      { id: 5, schemaId: 13, name: 'years_active', type: 'number' },
    ],
  },
  {
    id: 14,
    sheetId: 14,
    name: 'License',
    columns: [
      { id: 1, schemaId: 14, name: 'name', type: 'string' },
      { id: 2, schemaId: 14, name: 'description', type: 'string' },
      { id: 3, schemaId: 14, name: 'use_case', type: 'string' },
      { id: 4, schemaId: 14, name: 'introduced', type: 'number' },
    ],
  },
  {
    id: 15,
    sheetId: 15,
    name: 'Project',
    columns: [
      { id: 1, schemaId: 15, name: 'name', type: 'string' },
      { id: 2, schemaId: 15, name: 'description', type: 'string' },
      { id: 3, schemaId: 15, name: 'impact', type: 'string' },
      { id: 4, schemaId: 15, name: 'year_started', type: 'number' },
    ],
  },
];

const mockRows = [
  // Platonic Academy - Philosophers
  {
    id: 1,
    sheetId: 1,
    name: 'Socrates',
    specialty: 'Dialectics',
    contribution: 'Socratic Method',
    notable_students: 'Plato, Xenophon',
    years_active: '470-399 BC',
  },
  {
    id: 2,
    sheetId: 1,
    name: 'Plato',
    specialty: 'Metaphysics',
    contribution: 'Theory of Forms',
    notable_students: 'Aristotle, Speusippus',
    years_active: '428-348 BC',
  },
  {
    id: 3,
    sheetId: 1,
    name: 'Aristotle',
    specialty: 'Logic and Biology',
    contribution: 'Formal Logic',
    notable_students: 'Alexander the Great',
    years_active: '384-322 BC',
  },

  // Platonic Academy - Manuscripts
  {
    id: 4,
    sheetId: 2,
    title: 'The Republic',
    author: 'Plato',
    theme: 'Justice and Governance',
    impact: 'Philosophical foundations of politics',
    year_written: '375 BC',
  },
  {
    id: 5,
    sheetId: 2,
    title: 'Nicomachean Ethics',
    author: 'Aristotle',
    theme: 'Virtue Ethics',
    impact: 'Moral philosophy',
    year_written: '340 BC',
  },

  // Platonic Academy - Disciplines
  {
    id: 6,
    sheetId: 3,
    name: 'Ethics',
    description: 'Study of moral principles',
    notable_contributors: ['Socrates', 'Plato', 'Aristotle'],
    foundational_work: 'Nicomachean Ethics',
  },
  {
    id: 7,
    sheetId: 3,
    name: 'Metaphysics',
    description: 'Study of existence and reality',
    notable_contributors: ['Plato', 'Aristotle'],
    foundational_work: 'Metaphysics by Aristotle',
  },

  // EFF - Digital Rights Advocates
  {
    id: 8,
    sheetId: 4,
    name: 'Aaron Swartz',
    role: 'Internet Activist',
    contribution: 'RSS, Creative Commons, Reddit',
    impact: 'Open Access Movement',
    years_active: '2001-2013',
  },
  {
    id: 9,
    sheetId: 4,
    name: 'John Perry Barlow',
    role: 'Founder',
    contribution: 'Declaration of Independence of Cyberspace',
    impact: 'Digital Rights Philosophy',
    years_active: '1990-2018',
  },
  {
    id: 10,
    sheetId: 4,
    name: 'Cory Doctorow',
    role: 'Advocate and Author',
    contribution: 'Digital Rights Activism',
    impact: 'Advancing freedom in tech',
    years_active: '2000-present',
  },

  // House of Wisdom - Scholars
  {
    id: 11,
    sheetId: 7,
    name: 'Al-Khwarizmi',
    specialty: 'Mathematics',
    contribution: 'Algebra, Algorithms',
    works: ['Kitab al-Jabr', 'Kitab al-Khwarizmi'],
    years_active: '800-850',
  },
  {
    id: 12,
    sheetId: 7,
    name: 'Ibn al-Haytham',
    specialty: 'Optics and Physics',
    contribution: 'Book of Optics',
    works: ['Kitab al-Manazir'],
    years_active: '965-1040',
  },

  // Bell Labs - Researchers
  {
    id: 13,
    sheetId: 10,
    name: 'Claude Shannon',
    specialty: 'Information Theory',
    contribution: 'Digital Circuit Design Theory',
    innovations: 'Information Theory, Digital Circuit Design',
    years_active: '1941-1972',
  },
  {
    id: 14,
    sheetId: 10,
    name: 'John Bardeen',
    specialty: 'Physics',
    contribution: 'Invention of the Transistor',
    awards: 'Nobel Prize in Physics (1956, 1972)',
    years_active: '1940-1991',
  },
  {
    id: 15,
    sheetId: 10,
    name: 'Bell Labs Research Team',
    specialty: 'Various',
    contribution: 'Development of Unix OS',
    years_active: '1969-present',
  },

  // Creative Commons - Contributors
  {
    id: 16,
    sheetId: 13,
    name: 'Lawrence Lessig',
    role: 'Founder',
    contribution: 'CC License System',
    impact: 'Free Culture Movement',
    years_active: '2001-present',
  },
  {
    id: 17,
    sheetId: 13,
    name: 'Hal Abelson',
    role: 'Contributor',
    contribution: 'Open Education Initiatives',
    impact: 'MIT OpenCourseWare',
    years_active: '1970-present',
  },
  // Platonic Academy - Manuscripts
  {
    id: 18,
    sheetId: 2,
    title: 'A Copy of the Republic',
    author: 'Plato 2.0',
    theme: 'Justice and Governance',
    impact: 'Politics, Foundations',
    year_written: '2025',
  },
  {
    id: 19,
    sheetId: 2,
    title: 'The Apology',
    author: 'Plato',
    theme: 'Defense of Philosophy',
    impact: 'Socratic ethics and ideals',
    year_written: '399 BC',
  },
  {
    id: 20,
    sheetId: 2,
    title: 'Metaphysics',
    author: 'Aristotle',
    theme: 'Nature of Reality',
    impact: 'Foundational text in metaphysics',
    year_written: '340 BC',
  },

  // Platonic Academy - Disciplines
  {
    id: 21,
    sheetId: 3,
    name: 'Ethics',
    description: 'Study of moral principles',
    notable_contributors: ['Socrates', 'Plato', 'Aristotle'],
    foundational_work: 'Nicomachean Ethics',
  },
  {
    id: 22,
    sheetId: 3,
    name: 'Epistemology',
    description: 'Study of knowledge and belief',
    notable_contributors: ['Plato', 'Aristotle'],
    foundational_work: 'Theaetetus by Plato',
  },
  {
    id: 23,
    sheetId: 3,
    name: 'Politics',
    description: 'Study of governance and society',
    notable_contributors: ['Plato', 'Aristotle'],
    foundational_work: 'Politics by Aristotle',
  },

  // EFF - Legal Cases
  {
    id: 24,
    sheetId: 5,
    name: 'EFF v. NSA',
    type: 'Privacy Lawsuit',
    outcome: 'Raised awareness on mass surveillance',
    year_filed: 2008,
  },
  {
    id: 25,
    sheetId: 5,
    name: 'Bernstein v. US Department of State',
    type: 'Encryption Advocacy',
    outcome: 'Encryption ruled as free speech',
    year_filed: 1995,
  },
  {
    id: 26,
    sheetId: 5,
    name: 'Sony v. Universal',
    type: 'Copyright Law',
    outcome: 'Set precedent for fair use',
    year_filed: 1984,
  },

  // House of Wisdom - Translations
  {
    id: 27,
    sheetId: 8,
    title: 'The Almagest',
    author: 'Ptolemy',
    translator: 'Al-Battani',
    impact: 'Advancement in Astronomy',
    year_translated: '9th Century',
  },
  {
    id: 28,
    sheetId: 8,
    title: 'Elements',
    author: 'Euclid',
    translator: 'Al-Hajjaj ibn Yusuf',
    impact: 'Foundation of Geometry',
    year_translated: '10th Century',
  },
  {
    id: 29,
    sheetId: 8,
    title: 'Medical Compendium',
    author: 'Galen',
    translator: 'Hunayn ibn Ishaq',
    impact: 'Advancements in Medicine',
    year_translated: '9th Century',
  },

  // House of Wisdom - Inventions
  {
    id: 30,
    sheetId: 9,
    name: 'Astrolabe',
    inventor: 'Muhammad al-Fazari',
    purpose: 'Astronomical measurements',
    impact: 'Navigation and timekeeping',
    year_invented: '8th Century',
  },
  {
    id: 31,
    sheetId: 9,
    name: 'Camera Obscura',
    inventor: 'Ibn al-Haytham',
    purpose: 'Study of optics',
    impact: 'Foundation for modern cameras',
    year_invented: '11th Century',
  },
  {
    id: 32,
    sheetId: 9,
    name: 'Crankshaft',
    inventor: 'Al-Jazari',
    purpose: 'Mechanical rotation',
    impact: 'Engineering advancements',
    year_invented: '13th Century',
  },

  // Bell Labs - Innovations
  {
    id: 33,
    sheetId: 11,
    name: 'Transistor',
    inventors: 'John Bardeen, Walter Brattain, William Shockley',
    impact: 'Foundation of modern electronics',
    year_invented: 1947,
  },
  {
    id: 34,
    sheetId: 11,
    name: 'Unix Operating System',
    inventors: 'Ken Thompson, Dennis Ritchie',
    impact: 'Revolutionized software development',
    year_invented: 1969,
  },
  {
    id: 35,
    sheetId: 11,
    name: 'C Programming Language',
    inventors: 'Dennis Ritchie',
    impact: 'Widely used programming language',
    year_invented: 1972,
  },

  // Creative Commons - Licenses
  {
    id: 36,
    sheetId: 14,
    name: 'CC BY',
    description: 'Attribution required',
    use_case: 'Open research and education',
    introduced: 2002,
  },
  {
    id: 37,
    sheetId: 14,
    name: 'CC BY-SA',
    description: 'Attribution and share-alike',
    use_case: 'Collaborative projects',
    introduced: 2002,
  },
  {
    id: 38,
    sheetId: 14,
    name: 'CC BY-NC',
    description: 'Non-commercial use only',
    use_case: 'Non-profit initiatives',
    introduced: 2002,
  },
  // EFF - Tech Projects
  {
    id: 39,
    sheetId: 6,
    name: 'HTTPS Everywhere',
    description: 'Browser extension to encrypt web browsing',
    impact: 'Improved online security',
    year_started: 2010,
  },
  {
    id: 40,
    sheetId: 6,
    name: 'Privacy Badger',
    description: 'Anti-tracking browser extension',
    impact: 'Increased awareness of data privacy',
    year_started: 2014,
  },
  {
    id: 41,
    sheetId: 6,
    name: 'Certbot',
    description: 'Tool for obtaining HTTPS certificates',
    impact: 'Facilitated widespread HTTPS adoption',
    year_started: 2015,
  },

  // Bell Labs - Patents
  {
    id: 42,
    sheetId: 12,
    name: 'Transistor Patent',
    inventors: 'John Bardeen, Walter Brattain, William Shockley',
    patent_number: 'US2524035',
    year_granted: 1950,
    impact: 'Launched the semiconductor revolution',
  },
  {
    id: 43,
    sheetId: 12,
    name: 'Laser Patent',
    inventors: 'Arthur Schawlow, Charles Townes',
    patent_number: 'US2878866',
    year_granted: 1960,
    impact: 'Enabled advancements in communication and medicine',
  },
  {
    id: 44,
    sheetId: 12,
    name: 'Solar Cell Patent',
    inventors: 'Daryl Chapin, Calvin Fuller, Gerald Pearson',
    patent_number: 'US2780765',
    year_granted: 1957,
    impact: 'Pioneered solar power technology',
  },

  // Creative Commons - Projects
  {
    id: 45,
    sheetId: 15,
    name: 'Open Access Movement',
    description: 'Promotes free and unrestricted access to research',
    impact: 'Improved access to academic publications',
    year_started: 2001,
  },
  {
    id: 46,
    sheetId: 15,
    name: 'CC Search',
    description: 'Search tool for CC-licensed content',
    impact: 'Simplified discovery of open resources',
    year_started: 2017,
  },
  {
    id: 47,
    sheetId: 15,
    name: 'Creative Commons Global Network',
    description: 'Community for open knowledge advocacy',
    impact: 'Fostered global collaboration',
    year_started: 2018,
  },
];
