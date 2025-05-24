
/**
 * This file contains the configuration for available resume templates.
 * And any other configuration related to templates can be added here.
 */

interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
}

export const ITemplateIds = {
    PROFESSIONAL_BASIC: 'professionalBasic',
    CREATIVE_BASIC: 'creativeBasic',
    BUSINESS_BASIC: 'businessBasic',        
}


const availableTemplates: Template[] = [
    {
      id: ITemplateIds.PROFESSIONAL_BASIC,
      name: 'Professional Basic',
      description: 'A clean and professional template suitable for most industries',
      thumbnail: 'images/professional-basic-thumbnail.png'
    },
    {
      id: ITemplateIds.CREATIVE_BASIC,
      name: 'Creative Basic',
      description: 'A modern and creative template for design and creative roles',
      thumbnail: 'images/creative-basic-thumbnail.png'
    },
    {
      id: ITemplateIds.BUSINESS_BASIC,
      name: 'Business Basic',
      description: 'A sophisticated template designed for business professionals and executives',
      thumbnail: 'images/business-basic-thumbnail.png'
    },


    /* Add more templates as needed */



  ];

export default availableTemplates;