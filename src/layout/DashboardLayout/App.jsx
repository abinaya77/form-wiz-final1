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
            <div className='grid grid-cols-12 mt-20 md:gap-[30px]'>
              {/**left side page grid */}
              <div className='lg:col-span-8 bg-slate-100 col-span-12'>
                <h2 className='text-2xl mb-2'>STEP 1: Create Form </h2>

                <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-6 space-y-5 sm:space-y-0 items-center'>
                  <div className='flex space-x-3 items-center group'>
                    <div className='text-black dark:text-white border-black hover:text-gray-400'>
                      <label className='block text-gray-700 font-bold mb-2' htmlFor="formTitle">Form Title:</label>
                      <input
                        className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                        type="text"
                        id="formTitle"
                        placeholder='Enter form title'
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-6 space-y-5 sm:space-y-0 items-center'>
                    <div className='flex flex-col space-y-3 items-start group'>
                      <div className='text-black dark:text-white border-black'>
                        <label className='text-[20px]' htmlFor="formTitle">Select Fields:</label>
                        <button className='bg-gray-300 text-semibold hover:text-gray-400 mt-2' type="button" onClick={handleAddField}>
                          Add Field
                        </button>
                      </div>
                      <div className='mt-4 space-y-3'>
                        {formFields.map((field, index) => (
                          <div key={index} className='flex flex-col space-y-2'>
                            <select
                              name="type"
                              value={field.type}
                              onChange={(e) => handleFieldChange(index, e)}
                            >
                              <option value="text">Text Input</option>
                              <option value="email">Email Input</option>
                              <option value="textarea">Textarea</option>
                              {/* Add more field options as needed */}
                            </select>
                            <input
                              className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'
                              type="text"
                              name="label"
                              placeholder='Enter field name'
                              value={field.label}
                              onChange={(e) => handleFieldChange(index, e)}
                            />
                            <button className='bg-red-100' type="button" onClick={() => handleRemoveField(index)}>
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="bg-gray-500 text-white " type="button" onClick={handleFormSubmit}>
                      Create Form
                    </button>
                  </div>
                </div>
              </div>

              {/**right side */}
              <div className='lg:col-span-4 col-span-12 bg-slate-100 mt-8 md:mt-0'>
                <div className='sidebarWrapper space-y-[30px]'>
                  <div className='widget custom-text space-y-5'>
                    <h2 className='font-bold text-[20px]'>STEP 2:Generate Forms-code</h2>
                    <ul >
                      {forms.map((form) => (
                        <li  className='mt-2 mb-2 ml-2' key={form.id}>
                          {form.title}
                          <button  className='bg-gray-300 ml-3'onClick={() => handleGenerateCode(form.id)}>
                            Generate Code
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-slate-100 mt-20 shadow-lg'>
              <div className="">
                <h2 className='text-center  text-[20px] mt-10 text-lg font-bold dark:text-white'>STEP 3: Output Form HTML Code</h2>
                <p className='font-semibold text-gray-400 text-center'>Copy the below code and paste in your code</p>
                <div className='text-1xl mt-5'>
                  <pre>{formCode}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;




