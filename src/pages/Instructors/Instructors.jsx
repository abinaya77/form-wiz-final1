import React, { useState, useEffect } from 'react';





const Instructors = () => {
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
      const response = await fetch('http://localhost:5000/api/forms', {
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
      const response = await fetch(`http://localhost:5000/api/forms/${id}/html`);
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
    <div>
     
      <div className="App">
      <h1 className='text-red-400'>Formify</h1>


      <div className="form-builder">
        <h2>Create New Form</h2>
        <label htmlFor="formTitle">Form Title:</label>
        <input
          type="text"
          id="formTitle"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />


        <div className="fields">
          <label>Select Fields:</label>
          <button type="button" onClick={handleAddField}>
            Add Field
          </button>
          {formFields.map((field, index) => (
            <div key={index}>
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
                type="text"
                name="label"
                value={field.label}
                onChange={(e) => handleFieldChange(index, e)}
              />
              <button type="button" onClick={() => handleRemoveField(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>


        <button type="button" onClick={handleFormSubmit}>
          Create Form
        </button>
      </div>


      <div className="form-list">
        <h2>Existing Forms</h2>
        <ul>
          {forms.map((form) => (
            <li key={form.id}>
              {form.title}
              <button onClick={() => handleGenerateCode(form.id)}>
                Generate Code
              </button>
            </li>
          ))}
        </ul>
      </div>


      <div className="form-code">
        <h2>Form HTML Code</h2>
        <pre>{formCode}</pre>
      </div>


     
    </div>
    </div>
  );
}

export default Instructors
