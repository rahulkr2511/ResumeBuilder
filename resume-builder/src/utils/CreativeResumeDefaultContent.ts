/**
 * This file contains the default content for a creative resume.
 * It defines the structure and initial content for various sections of the resume.
 * The content includes sections like name, contact information, professional summary, skills, certification, membership, education, experience, and an optional profile photo.
 * Each section is represented by an object with a heading and content.
 */


interface ResumeSection {
  heading: string;
  content: string;
}
export interface ICreativeResumeData {
    name: ResumeSection;
    contact: ResumeSection;
    summary: ResumeSection
    skills: ResumeSection;
    certification: ResumeSection;
    membership: ResumeSection;
    education: ResumeSection;
    experience: ResumeSection;
    profilePhoto?: ResumeSection;  // Optional profile photo section
}


export const defaultResumeContent: ICreativeResumeData = {
    name: {
      heading: "Juliana Silva",
      content: "Family Wellness Counselor",
    },
    contact: {
      heading: "CONTACT",
      content: `
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0;">
            <span style="font-weight: bold;">📞</span>
            <span>+123-456-7890</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0;">
            <span style="font-weight: bold;">✉️</span>
            <span>hello@reallygreatsite.com</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0;">
            <span style="font-weight: bold;">📍</span>
            <span>123 Anywhere St., Any City</span>
          </div>
        </div>
      `,
    },
    profilePhoto: {
        heading: "Profile Photo",
        content: ""  // Empty by default, will be populated when user selects an image
    },
    summary: {
      heading: "PROFESSIONAL SUMMARY",
      content: `
        <ul class='list-disc list-inside space-y-1'>
          <li>Over 5 years of experience in family counseling, specializing in conflict resolution and communication.</li>
          <li>Proficient in assessing family dynamics and creating tailored wellness plans.</li>
          <li>Collaborated with a multidisciplinary team to develop holistic treatment plans for families.</li>
        </ul>
      `,
    },
    skills: {
      heading: "SKILLS",
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
      heading: "CERTIFICATION",
      content: `<p><strong>Certified Family Counselor</strong> <span class='bg-gray-300 px-2 py-1 text-xs rounded-full ml-2'>AUG 2021</span><br/>Arowwai Industries Training Center, Any City</p>`
    },
    membership: {
      heading: "MEMBERSHIP",
      content: `<p><strong>AMFT Member</strong> <span class='bg-green-200 px-2 py-1 text-xs rounded-full ml-2'>2022–PRESENT</span><br/>Association for Marriage and Family Therapy</p>`
    },
    education: {
      heading: "EDUCATION",
      content: `<div><p><strong>Master of Science in Marriage and Family Counseling</strong> <span class='float-right'>2021</span></p><p>Rimberio University <span class='float-right'>Graduated: May 2024</span></p></div>`
    },
    experience: {
      heading: "EXPERIENCE",
      content: `<div><p><strong>Family Wellness Counselor at Giggling Platypus Co., Any City</strong> <span class='float-right'>2022</span></p><ul class='list-disc list-inside space-y-1'><li>Conducted individual and family counseling sessions, addressing issues such as domestic violence, abuse, and others.</li><li>Collaborated with a multidisciplinary team to develop holistic treatment plans for families.</li></ul></div>`
    },
  };