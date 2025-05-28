/**
 * Content constants for a professional resume template.
 * This file defines the default content structure and values for a professional resume.
 * It includes sections like name, contact, summary, work experience, education, and additional information.
 * Each section contains a heading and content, which can be customized as needed.
 * The default content is structured to provide a comprehensive overview of the candidate's qualifications and experience.
 * This content can be used as a starting point for creating a professional resume.
 */

interface ResumeSection {
    heading: string;
    content: string;
  }

export interface IProfessionalResumeData {
    name: ResumeSection;
    contact: ResumeSection;
    summary: ResumeSection
    workExperience: ResumeSection;
    education: ResumeSection;
    additionalInfo: ResumeSection;
    profilePhoto?: ResumeSection;  // Optional profile photo section
}

export const defaultResumeContent: IProfessionalResumeData = {
    name: {
        heading: "NAME",
        content: "JACQUELINE THOMPSON"
    },
    contact: {
        heading: "CONTACT",
        content: `123 Anywhere St., Any City • 123-456-7890 • hello@reallygreatsite.com • www.reallygreatsite.com`
    },
    profilePhoto: {
        heading: "Profile Photo",
        content: ""  // Empty by default, will be populated when user selects an image
    },
    summary: {
        heading: "SUMMARY",
        content: `Results-oriented Engineering Executive with a proven track record of optimizing project outcomes. 
Skilled in strategic project management and team leadership. Seeking a challenging executive role 
to leverage technical expertise and drive engineering excellence.`
    },
    workExperience: {
        heading: "WORK EXPERIENCE",
        content: `Engineering Executive, Borcelle Technologies (Jan 2023 - Present)
- Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.
- Streamlined project workflows, enhancing overall efficiency by 25%.
- Led a team in successfully delivering a complex engineering project on time and within budget.

Project Engineer, Salford & Co (Mar 2021 - Dec 2022)
- Managed project timelines, reducing delivery times by 30%.
- Spearheaded the adoption of cutting-edge engineering software, improving project accuracy by 15%.
- Collaborated with cross-functional teams, enhancing project success rates by 10%.

Graduate Engineer, Arowwai Industries (Feb 2020 - Jan 2021)
- Coordinated project tasks, ensuring adherence to engineering standards and regulations.
- Conducted comprehensive project analyses, identifying and rectifying discrepancies in engineering designs.`
    },
    education: {
        heading: "EDUCATION",
        content: `Master of Science in Mechanical Engineering, University of Engineering and Technology (Sep 2019 - Oct 2020)
Specialization in Advanced Manufacturing. Thesis on "Innovations in Sustainable Engineering Practices".

Bachelor of Science in Civil Engineering, City College of Engineering (Aug 2015 - Aug 2019)
Relevant coursework in Structural Design and Project Management.`
    },
    additionalInfo: {
        heading: "ADDITIONAL INFORMATION",
        content: `Technical Skills: Project Management, Structural Analysis, Robotics and Automation, CAD
Languages: English, Malay, German
Certifications: Professional Engineer (PE) License, Project Management Professional (PMP)
Awards/Activities: Received the "Engineering Excellence" Award for outstanding contributions to project innovation, Borcelle Technologies`
    }
}; 


