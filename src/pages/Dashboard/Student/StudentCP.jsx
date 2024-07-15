import React, { useState, useEffect } from 'react';

function App() {
  const [forms, setForms] = useState([]);
  const [formTitle, setFormTitle] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formCode, setFormCode] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('https://form-wiz.onrender.com/api/forms');
      const data = await response.json();
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleAddField = () => {
    const newField = { type: 'text', label: '' };
    setFormFields([...formFields, newField]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index][name] = value;
    setFormFields(updatedFields);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('https://form-wiz.onrender.com/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: formTitle, fields: formFields }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create form: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setForms([...forms, data]);
      setFormFields([]);
      setFormTitle('');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  const handleGenerateCode = async (id) => {
    try {
      const response = await fetch(`https://form-wiz.onrender.com/api/forms/${id}/html`);
      const htmlCode = await response.text();

      // Log the HTML code received from the server
      console.log('HTML Code:', htmlCode);

      if (!htmlCode) {
        throw new Error('Form element not found in HTML code');
      }

      // Update state with the form HTML
      setFormCode(htmlCode);
    } catch (error) {
      console.error('Error fetching form HTML code:', error);
    }
  };

  return (
    <>
      <div className='font-gilroy font-medium text-gray dark:text-gray-400 text-lg leading-[27px] w-[90%] mx-auto'>
        

        <div className='nav-tab-wrapper tabs section-padding mt-8'>
          <div className='container'>
            <h1 className='text-4xl text-black text-center items-center mb-5'>All Existing Forms</h1>
            


                
                 
                    
                    <div className='ml-10 border shadow-lg'>
                    <ul >
                      {forms.map((form) => (
                        <li  className='mt-2 mb-2 ml-2' key={form.id}>
                          {form.title}  
                        </li>
                      ))}
                    </ul>
                    </div>
                    
                  
                
              
            
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;




