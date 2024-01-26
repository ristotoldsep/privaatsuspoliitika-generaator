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

   // State for tracking errors
   const [errors, setErrors] = useState({
    name: false,
    website: false,
    email: false,
  });

  // State for tracking form step
  const [formStep, setFormStep] = useState(1);

  // State for tracking selected checkboxes
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(["referauthor"]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (checkboxValue) => {
    // Logic to handle individual checkbox change
    const updatedCheckboxes = selectedCheckboxes.includes(checkboxValue)
      ? selectedCheckboxes.filter((value) => value !== checkboxValue)
      : [...selectedCheckboxes, checkboxValue];

    setSelectedCheckboxes(updatedCheckboxes);
  };

  const handleSelectAllChange = () => {
    // Logic to handle "select all" checkbox change
    if (selectAllChecked) {
      setSelectedCheckboxes([]);
    } else {
      // Add logic to get all checkbox values (e.g., ["name", "email", "isikukood"])
      const allCheckboxValues = ["name", "email", "isikukood", "telefoninumber", "aadress", "vestlusajalugu", "brauseriipinfo", "referauthor"];
      setSelectedCheckboxes(allCheckboxValues);
    }

    setSelectAllChecked(!selectAllChecked);
  };

  const handleBackClick = () => {
    setFormStep(1);
  };

  const handleContinueClick = () => {
    setFormStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formStep === 1) {
      // Check for required fields
      const requiredFields = ["name", "website", "email"];
      let formIsValid = true;
      const newErrors = {};

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = true;
          formIsValid = false;
        }
      });

      // Update the errors state
      setErrors(newErrors);

      if (formIsValid) {
        handleContinueClick(); // Move to the next step if the form is valid
      }
    } else if (formStep === 2) {
      // Generate the text with selected checkboxes
      const jsxContent = TextTemplate(formData, selectedCheckboxes);
      const textString = renderToStaticMarkup(jsxContent);

      // Set the generated text and show it
      setGeneratedText(textString);
      setShowGeneratedText(true);
    }
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
      <div className="form-container">

        {formStep === 1 && (
          <>
            <form className="form" onSubmit={handleSubmit}>

              <h2>Sisesta ettevõtte andmed</h2>

              <label htmlFor="name">Ettevõtte nimi *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="error-message">Sisesta ettevõtte nimi</div>}

              <label htmlFor="website">Ettevõtte veebiaadress *</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
              />
              {errors.website && <div className="error-message">Sisesta ettevõtte veebiaadress</div>}

              <label htmlFor="companyNumber">Ettevõtte registreerimisnumber</label>
              <input
                type="text"
                id="companyNumber"
                name="companyNumber"
                value={formData.companyNumber}
                onChange={handleInputChange}
              />

              <label htmlFor="email">Ettevõtte e-posti aadress *</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error-message">Sisesta ettevõtte email</div>}

              <label htmlFor="phone">Ettevõtte telefoni number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />

              <div className="buttons_container">
                <button className="submit_btn" type="submit">Edasi</button>
              </div>
              
            </form>

          </>
        )}

        {formStep === 2 && (
          <>
            <form className="form">

              <h2>Märgi, milliseid andmeid kogute</h2>

              <div className="checkbox-wrapper selectAll">
                <label className="checkbox" htmlFor="selectAllCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox" 
                    id="selectAllCheckbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAllChange}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Märgi kõik</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="nameCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="nameCheckbox"
                    value="name"
                    checked={selectedCheckboxes.includes("name")}
                    onChange={() => handleCheckboxChange("name")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Ees- ja perekonnanimi</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="emailCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="emailCheckbox"
                    value="email"
                    checked={selectedCheckboxes.includes("email")}
                    onChange={() => handleCheckboxChange("email")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">E-posti aadress</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="isikukoodCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="isikukoodCheckbox"
                    value="isikukood"
                    checked={selectedCheckboxes.includes("isikukood")}
                    onChange={() => handleCheckboxChange("isikukood")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Isikukood</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="telefoninumberCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="telefoninumberCheckbox"
                    value="telefoninumber"
                    checked={selectedCheckboxes.includes("telefoninumber")}
                    onChange={() => handleCheckboxChange("telefoninumber")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Telefoninumber</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="aadressCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="aadressCheckbox"
                    value="aadress"
                    checked={selectedCheckboxes.includes("aadress")}
                    onChange={() => handleCheckboxChange("aadress")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Postiaadress, riik, maakond, linn</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="vestlusajaluguCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="vestlusajaluguCheckbox"
                    value="vestlusajalugu"
                    checked={selectedCheckboxes.includes("vestlusajalugu")}
                    onChange={() => handleCheckboxChange("vestlusajalugu")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Vestlusajalugu kliendiga</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <label className="checkbox" htmlFor="brauseriipinfoCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="brauseriipinfoCheckbox"
                    value="brauseriipinfo"
                    checked={selectedCheckboxes.includes("brauseriipinfo")}
                    onChange={() => handleCheckboxChange("brauseriipinfo")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Informatsioon kliendi veebibrauseri ja IP-aadressi kohta</p>
                </label>
              </div>
              
              <div className="checkbox-wrapper referauthor">
                <label className="checkbox" htmlFor="referauthorCheckbox">
                  <input 
                    className="checkbox__trigger visuallyhidden" 
                    type="checkbox"
                    id="referauthorCheckbox"
                    value="referauthor"
                    checked={selectedCheckboxes.includes("referauthor")}
                    onChange={() => handleCheckboxChange("referauthor")}
                  />
                  <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
                  <p className="checkbox__textwrapper">Viita vDisaini privaatsuspoliitika generaatorile :&#41;</p>
                </label>
              </div>

              <div className="buttons_container">
                <button className="back_btn" type="button" onClick={handleBackClick}>
                  Tagasi
                </button>
                <button className="submit_btn" type="submit" onClick={handleSubmit}>
                  Genereeri
                </button>
              </div>

            </form>
          </>
        )}

      </div>

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
