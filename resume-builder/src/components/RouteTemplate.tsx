import React from 'react';

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