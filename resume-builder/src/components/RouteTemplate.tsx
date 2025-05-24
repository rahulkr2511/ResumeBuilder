import React from 'react';
import { ITemplateIds } from '../configs/templates';

/**
 * * RouteTemplate component dynamically loads and renders the appropriate resume template
 * * based on the templateId passed as a prop.
 * * It uses React.lazy for code-splitting and lazy loading of components.
 * * This helps in reducing the initial load time of the application by loading templates only when needed.
 */

const ProfessionalResumeBasic = React.lazy(() => import('../templates/Professional/ProfessionalResumeBasic'));
const CreativeResumeBasic = React.lazy(() => import('../templates/Creative/CreativeResumeBasic'));
const BusinessResumeBasic = React.lazy(() => import('../templates/Business/BusinessResumeBasic'));  


const RouteTemplate = (props: any) => {
    const { templateId } = props;
    return (
        <>
            {templateId === ITemplateIds.PROFESSIONAL_BASIC && <ProfessionalResumeBasic />}
            {templateId === ITemplateIds.CREATIVE_BASIC && <CreativeResumeBasic />}
            {templateId === ITemplateIds.BUSINESS_BASIC && <BusinessResumeBasic />}
            {/* Add more templates as needed */}
        </>
    );
}

export default RouteTemplate; 