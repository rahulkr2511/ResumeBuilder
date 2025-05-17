import React from 'react';

const ProfessionalResumeBasic = React.lazy(() => import('../templates/ProfessionalResumeBasic'));


const RoutTemplate = (props: any) => {
    const { templateId } = props;
    return (
        <>
            {templateId === 'professionalBasic' && <ProfessionalResumeBasic />}
            {templateId === 'creative' && <div>Creative Template</div>}
        </>
    );
}

export default RoutTemplate;