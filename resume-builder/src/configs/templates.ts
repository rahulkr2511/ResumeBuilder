
/**
 * This file contains the configuration for available resume templates.
 * And any other configuration related to templates can be added here.
 */

interface Template {
    id: string;
    name: string;
    description: string;
}


const availableTemplates: Template[] = [
    {
      id: 'professionalBasic',
      name: 'Professional Basic',
      description: 'A clean and professional template suitable for most industries',
      // thumbnail: 'path-to-thumbnail'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A modern and creative template for design and creative roles',
      // thumbnail: 'path-to-thumbnail'
    },


    /* Add more templates as needed */



  ];

export default availableTemplates;