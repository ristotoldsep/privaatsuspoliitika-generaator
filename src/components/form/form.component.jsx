// src/Form.js
import { useState } from "react";
import TextTemplate from "../text-template/TextTemplate";

import { renderToStaticMarkup } from "react-dom/server"; 

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
    const jsxContent = TextTemplate(formData);

    // Convert the JSX to a string using renderToStaticMarkup
    const textString = renderToStaticMarkup(jsxContent);

    console.log(textString);

    // Set the generated text and show it
    setGeneratedText(textString);
    setShowGeneratedText(true);
  };

  const handleCopyClick = () => {
    // Check if the Clipboard API is supported
    if (navigator.clipboard) {
      // Use the Clipboard API to copy text to clipboard
      navigator.clipboard.writeText(generatedText)
        .then(() => {
          // Successfully copied
          alert("Text copied to clipboard!");
        })
        .catch((error) => {
          console.error("Unable to copy text to clipboard:", error);
        });
    } else {
      // Fallback to execCommand for browsers that do not support the Clipboard API
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

      // Provide feedback to the user
      alert("Privaatsuspoliitika kopeeritud!");
    }
  };

  return (
    <>
      <h2>Sisesta ettevõtte andmed</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Ettevõtte nimi</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="website">Ettevõtte veebiaadress</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
        />

        <label htmlFor="companyNumber">Ettevõtte registreerimisnumber</label>
        <input
          type="text"
          id="companyNumber"
          name="companyNumber"
          value={formData.companyNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Ettevõtte e-posti aadress*:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="phone">Ettevõtte telefoni number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <button type="submit">Genereeri</button>
      </form>

      {/* Display generated text if showGeneratedText is true */}
      {showGeneratedText && (
          <div className="generated-text-container">
            <button className="kopeeri_btn" onClick={handleCopyClick}>Kopeeri</button>
            <div className="generated-text" dangerouslySetInnerHTML={{ __html: generatedText }}></div>
          </div>
      )}
    </>
  );
};

export default Form;
