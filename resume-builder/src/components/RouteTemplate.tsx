import React from 'react';

/**
 * * RouteTemplate component dynamically loads and renders the appropriate resume template
 * * based on the templateId passed as a prop.
 * * It uses React.lazy for code-splitting and lazy loading of components.
 * * This helps in reducing the initial load time of the application by loading templates only when needed.
 */

const ProfessionalResumeBasic = React.lazy(() => import('../templates/Professional/ProfessionalResumeBasic'));
const CreativeResumeBasic = React.lazy(() => import('../templates/Creative/CreativeResumeBasic'));

const RouteTemplate = (props: any) => {
    const { templateId } = props;
    return (
        <>
            {templateId === 'professionalBasic' && <ProfessionalResumeBasic />}
            {templateId === 'creative' && <CreativeResumeBasic />}
        </>
    );
}

export default RouteTemplate; 