
interface ResumeSection {
    heading: string;
    content: string;
  }
  
export interface IBusinessResumeData {
    name: ResumeSection;
    title: ResumeSection;
    profile: ResumeSection;
    education1: ResumeSection;
    education2: ResumeSection;
    language: ResumeSection;
    computerSkills: ResumeSection;
    workExperience: ResumeSection;
    contact: ResumeSection;
  }
  
export const defaultResumeContent: IBusinessResumeData = {
    name: {
      heading: "Name",
      content: "Connor Hamilton",
    },
    title: {
      heading: "Title",
      content: "Business Administrative",
    },
    profile: {
      heading: "Profile",
      content:
        "As a business administration student, I am organized and eager for work opportunities. My academic journey has developed my critical thinking, problem-solving, and communication skills.",
    },
    education1: {
      heading: "BORCELLE UNIVERSITY",
      content: "Business Administration career, in progress.",
    },
    education2: {
      heading: "BORCELLE COLLEGE",
      content: "2018–2022",
    },
    language: {
      heading: "Language",
      content: "Native English. Advanced Spanish.",
    },
    computerSkills: {
      heading: "Computer Skills",
      content: "Text processor. Spreadsheet. Slide presentation.",
    },
    workExperience: {
      heading: "Work Experience",
      content:
        "INGOUDE COMPANY — Participation in collections to distribute in low-income schools.",
    },
    contact: {
      heading: "Contact Me",
      content:
        "123-456-7890\nhello@reallygreatsite.com\n123 Anywhere St., Any City, ST 12345",
    },
  };
  