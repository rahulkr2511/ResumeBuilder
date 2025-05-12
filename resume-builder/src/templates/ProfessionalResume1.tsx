import React, { useState } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Education {
    degree: string;
    institution: string;
    details: string;
    dates: string;
}

interface WorkExperience {
    title: string;
    company: string;
    dates: string;
    details: string[];
}

interface AdditionalInfo {
    skills: string;
    languages: string;
    certifications: string;
    awards: string;
}

interface ResumeData {
    name: string;
    summary: string;
    contact: string;
    education: Education[];
    workExperience: WorkExperience[];
    additionalInfo: AdditionalInfo;
}

const ProfessionalResume1: React.FC = () => {
  const navigate = useNavigate();
    const [resumeData, setResumeData] = useState<ResumeData>({
        name: 'JACQUELINE THOMPSON',
        summary: 'Results-oriented Engineering Executive with a proven track record of optimizing project outcomes. Skilled in strategic project management and team leadership. Seeking a challenging executive role to leverage technical expertise and drive engineering excellence.',
        contact: '123 Anywhere St., Any City • 123-456-7890 • hello@reallygreatsite.com • www.reallygreatsite.com',
        education: [
            {
                degree: 'Master of Science in Mechanical Engineering',
                institution: 'University of Engineering and Technology',
                details: 'Specialization in Advanced Manufacturing. Thesis on "Innovations in Sustainable Engineering Practices".',
                dates: 'Sep 2019 - Oct 2020'
            },
            {
                degree: 'Bachelor of Science in Civil Engineering',
                institution: 'City College of Engineering',
                details: 'Relevant coursework in Structural Design and Project Management.',
                dates: 'Aug 2015 - Aug 2019'
            }
        ],
        workExperience: [
            {
                title: 'Engineering Executive',
                company: 'Borcelle Technologies',
                dates: 'Jan 2023 - Present',
                details: [
                    'Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.',
                    'Streamlined project workflows, enhancing overall efficiency by 25%.',
                    'Led a team in successfully delivering a complex engineering project on time and within allocated budget.'
                ]
            },
            {
                title: 'Project Engineer',
                company: 'Salford & Co',
                dates: 'Mar 2021 - Dec 2022',
                details: [
                    'Managed project timelines, reducing delivery times by 30%.',
                    'Spearheaded the adoption of cutting-edge engineering software, improving project accuracy by 15%.',
                    'Collaborated with cross-functional teams, enhancing project success rates by 10%.'
                ]
            },
            {
                title: 'Graduate Engineer',
                company: 'Arowwai Industries',
                dates: 'Feb 2020 - Jan 2021',
                details: [
                    'Coordinated project tasks, ensuring adherence to engineering standards and regulations.',
                    'Conducted comprehensive project analyses, identifying and rectifying discrepancies in engineering designs.'
                ]
            }
        ],
        additionalInfo: {
            skills: 'Project Management, Structural Analysis, Robotics and Automation, CAD',
            languages: 'English, Malay, German',
            certifications: 'Professional Engineer (PE) License, Project Management Professional (PMP)',
            awards: 'Received the "Engineering Excellence" Award for outstanding contributions to project innovation, Borcelle Technologies'
        }
    });

    return (
        <Card className="p-6 max-w-3xl mx-auto my-10 rounded-2xl shadow-md">
            <CardContent>
                <h1 className="text-4xl font-bold mb-4">{resumeData.name}</h1>
                <p className="text-gray-600 mb-6">{resumeData.contact}</p>
                <h2 className="text-2xl font-semibold mb-2">SUMMARY</h2>
                <p className="text-gray-700 mb-6">{resumeData.summary}</p>

                <h2 className="text-2xl font-semibold mb-2">EDUCATION</h2>
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-xl font-bold">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-500 text-sm">{edu.dates}</p>
                        <p className="text-gray-600">{edu.details}</p>
                    </div>
                ))}

                <h2 className="text-2xl font-semibold mb-2">WORK EXPERIENCE</h2>
                {resumeData.workExperience.map((job, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-xl font-bold">{job.title} - {job.company}</h3>
                        <p className="text-gray-500 text-sm">{job.dates}</p>
                        <ul className="text-gray-600 list-disc pl-5">
                            {job.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                <h2 className="text-2xl font-semibold mb-2">ADDITIONAL INFORMATION</h2>
                <p><strong>Technical Skills:</strong> {resumeData.additionalInfo.skills}</p>
                <p><strong>Languages:</strong> {resumeData.additionalInfo.languages}</p>
                <p><strong>Certifications:</strong> {resumeData.additionalInfo.certifications}</p>
                <p><strong>Awards/Activities:</strong> {resumeData.additionalInfo.awards}</p>
            </CardContent>
        </Card>
    );
};

export default ProfessionalResume1; 