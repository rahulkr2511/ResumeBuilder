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

export const defaultTextContentCSS = `
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: black;
    white-space: pre-wrap;
    margin: 0;
    padding: 0;
    width: 100%;
    background: white;
`;

export const defaultResumeStaticCSS = `.resume-container {
                    background: white !important;
                    color: black !important;
                    padding: 20px !important;
                    width: 100% !important;
                }
                .resume-header {
                    text-align: center !important;
                    width: 100% !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    margin: 0 auto !important;
                }
                .resume-header div {
                    font-size: 36px !important;
                    font-weight: bold !important;
                    color: #000000 !important;
                    text-align: center !important;
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    font-family: Arial, sans-serif !important;
                    display: block !important;
                }
                .resume-header .MuiInputBase-root {
                    width: 100% !important;
                    text-align: center !important;
                }
                .resume-header .MuiInputBase-input {
                    text-align: center !important;
                    width: 100% !important;
                }

                .resume-contact {
                    text-align: center !important;
                    width: 100% !important;
                }
                .resume-contact div {
                    text-align: center !important;
                    color: #555 !important;
                    font-size: 14px !important;
                    width: 70% !important;
                    margin: 0 auto !important;
                    font-family: Arial, sans-serif !important;
                    white-space: pre-wrap !important;
                }

                .resume-section {
                    margin: 20px 0 !important;
                    text-align: left !important;
                }
                .resume-section h2 {
                    color: #000000 !important;
                    font-size: 14px !important;
                    margin-bottom: 10px !important;
                    font-weight: bold !important;
                    text-align: left !important;
                    padding-left: 0 !important;
                }
                .resume-section div {
                    font-size: 14px !important;
                    line-height: 1.6 !important;
                    color: black !important;
                    background: white !important;
                    white-space: pre-wrap !important;
                    text-align: left !important;
                    font-family: Arial, sans-serif !important;
                }
                .resume-divider {
                    margin: 15px 0 !important;
                    border-color: #e0e0e0 !important;
                    border-width: 0.5px !important;
                }`;
