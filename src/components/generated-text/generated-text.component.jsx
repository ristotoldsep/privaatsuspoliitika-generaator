import PropTypes from 'prop-types';

const GeneratedTextContainer = ({ generatedText, handleCopyClick }) => {
  return (
    <div className="generated-text-container">
      <button className="kopeeri_btn" onClick={handleCopyClick}>
        Kopeeri
      </button>
      <div
        className="generated-text"
        dangerouslySetInnerHTML={{ __html: generatedText }}
      ></div>
    </div>
  );
};

GeneratedTextContainer.propTypes = {
  generatedText: PropTypes.string.isRequired,
  handleCopyClick: PropTypes.func.isRequired
}

export default GeneratedTextContainer;