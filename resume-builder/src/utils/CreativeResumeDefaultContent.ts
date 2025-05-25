
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
        <div class='space-y-2'>
          <div class='flex items-center gap-2'><span class='font-bold'>📞</span> +123-456-7890</div>
          <div class='flex items-center gap-2'><span class='font-bold'>✉️</span> hello@reallygreatsite.com</div>
          <div class='flex items-center gap-2'><span class='font-bold'>📍</span> 123 Anywhere St., Any City, ST 12345</div>
        </div>
      `,
    },
    summary: {
      heading: "Professional Summary",
      content: `
        <ul class='list-disc list-inside space-y-1'>
          <li>Over 5 years of experience in family counseling, specializing in conflict resolution and communication.</li>
          <li>Proficient in assessing family dynamics and creating tailored wellness plans.</li>
          <li>Collaborated with a multidisciplinary team to develop holistic treatment plans for families.</li>
        </ul>
      `,
    },
    skills: {
      heading: "Skills",
      content: `
        <ul class='list-disc list-inside space-y-1'>
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
      content: `<p><strong>Certified Family Counselor</strong> <span class='bg-gray-300 px-2 py-1 text-xs rounded-full ml-2'>AUG 2021</span><br/>Arowwai Industries Training Center, Any City</p>`
    },
    membership: {
      heading: "Membership",
      content: `<p><strong>AMFT Member</strong> <span class='bg-green-200 px-2 py-1 text-xs rounded-full ml-2'>2022–PRESENT</span><br/>Association for Marriage and Family Therapy</p>`
    },
    education: {
      heading: "Education",
      content: `<div><p><strong>Master of Science in Marriage and Family Counseling</strong> <span class='float-right'>2021</span></p><p>Rimberio University <span class='float-right'>Graduated: May 2024</span></p></div>`
    },
    experience: {
      heading: "Experience",
      content: `<div><p><strong>Family Wellness Counselor at Giggling Platypus Co., Any City</strong> <span class='float-right'>2022</span></p><ul class='list-disc list-inside space-y-1'><li>Conducted individual and family counseling sessions, addressing issues such as domestic violence, abuse, and others.</li><li>Collaborated with a multidisciplinary team to develop holistic treatment plans for families.</li></ul></div>`
    },
  };