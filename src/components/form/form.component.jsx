import { useState } from "react";
import TextTemplate from "../text-template/TextTemplate";
import GeneratedTextContainer from "../generated-text/generated-text.component";

import { renderToStaticMarkup } from "react-dom/server";
import Input from "./input/input.component";
import Checkbox from "./checkbox/checkbox.component";
import Button from "./button/button.component";

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
      const allCheckboxValues = [
        "name",
        "email",
        "isikukood",
        "telefoninumber",
        "aadress",
        "vestlusajalugu",
        "brauseriipinfo",
        "referauthor",
      ];
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
      navigator.clipboard
        .writeText(generatedText)
        .then(() => {
          // Successfully copied
          alert("Privaatsuspoliitika kopeeritud!");
        })
        .catch((error) => {
          console.error("Teksti kopeerimine ebaõnnestus:", error);
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

              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name ? "Sisesta ettevõtte nimi" : ""}
                label="Ettevõtte nimi *"
              />

              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                error={errors.website ? "Sisesta ettevõtte veebiaadress" : ""}
                label="Ettevõtte veebiaadress *"
              />

              <Input
                id="companyNumber"
                name="companyNumber"
                value={formData.companyNumber}
                onChange={handleInputChange}
                label="Ettevõtte registreerimisnumber"
              />

              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email ? "Sisesta ettevõtte email" : ""}
                label="Ettevõtte e-posti aadress *"
                type="email"
              />

              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                label="Ettevõtte telefoni number"
              />

              <div className="buttons_container">
                <button className="submit_btn" type="submit">
                  Edasi
                </button>
              </div>
            </form>
          </>
        )}

        {formStep === 2 && (
          <>
            <form className="form">
              <h2>Märgi, milliseid andmeid kogute</h2>

              <Checkbox
                id="selectAllCheckbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
                label="Märgi kõik"
                wrapperClass="selectAll"
              />

              <Checkbox
                id="nameCheckbox"
                checked={selectedCheckboxes.includes("name")}
                onChange={() => handleCheckboxChange("name")}
                label="Ees- ja perekonnanimi"
              />

              <Checkbox
                id="emailCheckbox"
                checked={selectedCheckboxes.includes("email")}
                onChange={() => handleCheckboxChange("email")}
                label="E-posti aadress"
              />

              <Checkbox
                id="isikukoodCheckbox"
                checked={selectedCheckboxes.includes("isikukood")}
                onChange={() => handleCheckboxChange("isikukood")}
                label="Isikukood"
              />

              <Checkbox
                id="telefoninumberCheckbox"
                checked={selectedCheckboxes.includes("telefoninumber")}
                onChange={() => handleCheckboxChange("telefoninumber")}
                label="Telefoninumber"
              />

              <Checkbox
                id="aadressCheckbox"
                checked={selectedCheckboxes.includes("aadress")}
                onChange={() => handleCheckboxChange("aadress")}
                label="Postiaadress, riik, maakond, linn"
              />

              <Checkbox
                id="vestlusajaluguCheckbox"
                checked={selectedCheckboxes.includes("vestlusajalugu")}
                onChange={() => handleCheckboxChange("vestlusajalugu")}
                label="Vestlusajalugu kliendiga"
              />

              <Checkbox
                id="brauseriipinfoCheckbox"
                checked={selectedCheckboxes.includes("brauseriipinfo")}
                onChange={() => handleCheckboxChange("brauseriipinfo")}
                label="Informatsioon kliendi veebibrauseri ja IP-aadressi kohta"
              />

              <Checkbox
                id="referauthorCheckbox"
                checked={selectedCheckboxes.includes("referauthor")}
                onChange={() => handleCheckboxChange("referauthor")}
                label="Viita vDisaini privaatsuspoliitika generaatorile :)"
                wrapperClass="referauthor"
              />

              <div className="buttons_container">
                <Button
                  className="back_btn"
                  type="button"
                  onClick={handleBackClick}
                >
                  Tagasi
                </Button>

                <Button
                  className="submit_btn"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Genereeri
                </Button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Display generated text if showGeneratedText is true */}
      {showGeneratedText && (
        <GeneratedTextContainer
          generatedText={generatedText}
          handleCopyClick={handleCopyClick}
        />
      )}
    </>
  );
};

export default Form;
