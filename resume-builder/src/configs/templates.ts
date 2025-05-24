
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


const availableTemplates: Template[] = [
    {
      id: 'professionalBasic',
      name: 'Professional Basic',
      description: 'A clean and professional template suitable for most industries',
      thumbnail: 'images/professional-basic-thumbnail.png'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A modern and creative template for design and creative roles',
      thumbnail: 'images/creative-basic-thumbnail.png'
    },


    /* Add more templates as needed */



  ];

export default availableTemplates;