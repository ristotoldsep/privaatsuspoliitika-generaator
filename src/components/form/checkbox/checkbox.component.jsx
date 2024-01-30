import PropTypes from 'prop-types';

const Checkbox = ({ id, checked, onChange, label, wrapperClass = "" }) => (
  <div className={`checkbox-wrapper ${wrapperClass}`}>
    <label className="checkbox" htmlFor={id}>
      <input
        className="checkbox__trigger visuallyhidden"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox__symbol">
        <svg
          aria-hidden="true"
          className="icon-checkbox"
          width="28px"
          height="28px"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 14l8 7L24 7"></path>
        </svg>
      </span>
      <p className="checkbox__textwrapper">{label}</p>
    </label>
  </div>
);

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    wrapperClass: PropTypes.string
  };

export default Checkbox;

