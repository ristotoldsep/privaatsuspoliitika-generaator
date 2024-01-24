// src/Form.js
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    companyNumber: "",
    email: "",
    phone: "",
  });

  const [generatedText, setGeneratedText] = useState("");
  const [showGeneratedText, setShowGeneratedText] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate the text
    const text = `${formData.name} jaoks on oluline Teie privaatsus ja järgida kõiki kehtivaid seadusi ja määrusi mis tahes isikuandmete kohta, mida võime Teie kohta koguda, kui külastate meie veebilehte ${formData.website}. ...`;

    // Set the generated text and show it
    setGeneratedText(text);
    setShowGeneratedText(true);
  };

  const handleCopyClick = () => {
    // Create a textarea element to copy text to clipboard
    const textarea = document.createElement("textarea");
    textarea.value = generatedText;

    // Make the textarea invisible and append it to the document
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);

    // Select and copy text to clipboard
    textarea.select();
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    // Optionally, provide feedback to the user (e.g., toast message)
    alert("Text copied to clipboard!");
  };

  return (
    <>
    
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />

      <label htmlFor="website">Web Address:</label>
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={handleInputChange}
      />

      <label htmlFor="companyNumber">Company Number:</label>
      <input
        type="text"
        id="companyNumber"
        name="companyNumber"
        value={formData.companyNumber}
        onChange={handleInputChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />

      <label htmlFor="phone">Phone Number:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
      />

      <button type="submit">Submit</button>
    </form>

    {/* Display generated text if showGeneratedText is true */}
    {showGeneratedText && (
        <div className="generated-text">
            <button onClick={handleCopyClick}>Kopeeri</button>
            <h3>Generated Text:</h3>
            <p>{generatedText}</p>
            {/* Button to copy generated text */}
        </div>
      )}

    </>
  );
};

export default Form;
