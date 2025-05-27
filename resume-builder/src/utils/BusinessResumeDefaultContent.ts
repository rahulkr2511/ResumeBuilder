import { Colors } from '../constants/Colors';

interface ResumeSection {
    heading: string;
    content: string;
  }
  
export interface IBusinessResumeData {
    name: ResumeSection;
    title: ResumeSection;
    profile: ResumeSection;
    education: ResumeSection;
    language: ResumeSection;
    computerSkills: ResumeSection;
    workExperience: ResumeSection;
    contact: ResumeSection;
  }
  
export const defaultResumeContent: IBusinessResumeData = {
    name: {
      heading: "Name",
      content: "CONNOR HAMILTON",
    },
    title: {
      heading: "Title",
      content: "Business Administration",
    },
    profile: {
      heading: "Profile",
      content:
        "As a business administration student, I am organized and eager for work opportunities. My academic journey has developed my critical thinking, problem-solving, and communication skills.",
    },
    education: {
      heading: "Education",
      content:
        "<b>BORCELLE UNIVERSITY</b><br/><i>Business Administration career, in progress.</i><br/><br/><b>BORCELLE COLLEGE</b><br/>2018–2022",
    },
    language: {
      heading: "Language",
      content: "<ul><li>Native English.</li><li>Advanced Spanish.</li></ul>",
    },
    computerSkills: {
      heading: "Computer Skills",
      content:
        "<ul><li>Text processor.</li><li>Spreadsheet.</li><li>Slide presentation.</li></ul>",
    },
    workExperience: {
      heading: "Work Experience",
      content:
        "<b>INGOUDE COMPANY</b><br/><i>Participation in collections to distribute in low-income schools.</i>",
    },
    contact: {
      heading: "Contact Me",
      content: `<div style="display: flex; flex-direction: column;">
      <div style="display: flex; align-items: center; padding: 8px 0;">
        <span style="font-weight: bold;">📞</span>
        <span style="color: ${Colors.BLUE.DARK};"> +123-456-7890</span>
      </div>
      
      <div style="display: flex; align-items: center; padding: 8px 0;">
        <span style="font-weight: bold;">✉️</span>
        <span style="color: ${Colors.BLUE.DARK};"> hello@reallygreatsite.com</span>
      </div>
      
      <div style="display: flex; align-items: center; padding: 8px 0;">
        <span style="font-weight: bold;">📍</span>
        <span style="color: ${Colors.BLUE.DARK};"> 123 Anywhere St., Any City, ST 12345</span>
      </div>
    </div>`
    }
  };