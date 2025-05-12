export interface ResumeData {
    name: string;
    summary: string;
    workExperience: string;
    education: string;
    additionalInfo: string;
    contact: string;
}

export const defaultResumeContent: ResumeData = {
    name: "JACQUELINE THOMPSON",
    contact: `123 Anywhere St., Any City • 123-456-7890 • hello@reallygreatsite.com • www.reallygreatsite.com`,
    summary: `Results-oriented Engineering Executive with a proven track record of optimizing project outcomes. 
Skilled in strategic project management and team leadership. Seeking a challenging executive role 
to leverage technical expertise and drive engineering excellence.`,
    workExperience: `Engineering Executive, Borcelle Technologies (Jan 2023 - Present)
- Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.
- Streamlined project workflows, enhancing overall efficiency by 25%.
- Led a team in successfully delivering a complex engineering project on time and within budget.

Project Engineer, Salford & Co (Mar 2021 - Dec 2022)
- Managed project timelines, reducing delivery times by 30%.
- Spearheaded the adoption of cutting-edge engineering software, improving project accuracy by 15%.
- Collaborated with cross-functional teams, enhancing project success rates by 10%.

Graduate Engineer, Arowwai Industries (Feb 2020 - Jan 2021)
- Coordinated project tasks, ensuring adherence to engineering standards and regulations.
- Conducted comprehensive project analyses, identifying and rectifying discrepancies in engineering designs.`,
    education: `Master of Science in Mechanical Engineering, University of Engineering and Technology (Sep 2019 - Oct 2020)
Specialization in Advanced Manufacturing. Thesis on "Innovations in Sustainable Engineering Practices".

Bachelor of Science in Civil Engineering, City College of Engineering (Aug 2015 - Aug 2019)
Relevant coursework in Structural Design and Project Management.`,
    additionalInfo: `Technical Skills: Project Management, Structural Analysis, Robotics and Automation, CAD
Languages: English, Malay, German
Certifications: Professional Engineer (PE) License, Project Management Professional (PMP)
Awards/Activities: Received the "Engineering Excellence" Award for outstanding contributions to project innovation, Borcelle Technologies`
}; 