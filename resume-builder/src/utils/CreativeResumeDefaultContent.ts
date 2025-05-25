
export interface ICreativeResumeData {
name: {
    heading: string;
    content: string;
    };
contact: {
    heading: string;
    content: string;
    };
    summary: {
    heading: string;
    content: string;
    };
skills: {
    heading: string;
    content: string;
    };
certification: {
    heading: string;   
    content: string;
    };
membership: {
    heading: string;
    content: string;
    };
education: {
    heading: string;
    content: string;
    };
experience: {
    heading: string;
    content: string;
    };
}


export const defaultResumeContent: ICreativeResumeData = {
    name: {
      heading: "Juliana Silva",
      content: "Family Wellness Counselor",
    },
    contact: {
      heading: "Contact",
      content: `
        <p>📞 +123-456-7890</p>
        <p>✉️ hello@reallygreatsite.com</p>
        <p>📍 123 Anywhere St., Any City, ST 12345</p>
      `,
    },
    summary: {
      heading: "Professional Summary",
      content: `
        <ul>
          <li>Over 5 years of experience in family counseling, specializing in conflict resolution and communication.</li>
          <li>Proficient in assessing family dynamics and creating tailored wellness plans.</li>
          <li>Collaborated with a multidisciplinary team to develop holistic treatment plans for families.</li>
        </ul>
      `,
    },
    skills: {
      heading: "Skills",
      content: `
        <ul>
          <li>Family Assessment</li>
          <li>Conflict Resolution</li>
          <li>Communication Improvement</li>
          <li>Crisis Intervention</li>
          <li>Group Therapy</li>
          <li>Case Management</li>
        </ul>
      `,
    },
    certification: {
      heading: "Certification",
      content: `
        <p><strong>Certified Family Counselor</strong> – Arowwai Industries Training Center, Any City (Aug 2021)</p>
      `,
    },
    membership: {
      heading: "Membership",
      content: `
        <p><strong>AMFT Member</strong> – Association for Marriage and Family Therapy (2022–Present)</p>
      `,
    },
    education: {
      heading: "Education",
      content: `
        <p><strong>Master of Science in Marriage and Family Counseling</strong><br />
        Rimberio University – Graduated: May 2024</p>
      `,
    },
    experience: {
      heading: "Experience",
      content: `
        <p><strong>Family Wellness Counselor</strong> at Giggling Platypus Co., Any City (2022)</p>
        <ul>
          <li>Conducted individual and family counseling sessions, addressing issues such as domestic violence, abuse, and others.</li>
          <li>Collaborated with a multidisciplinary team to develop holistic treatment plans for families.</li>
        </ul>
      `,
    },
  };