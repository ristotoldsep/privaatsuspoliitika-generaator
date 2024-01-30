import PropTypes from 'prop-types';

const Input = ({ id, name, value, onChange, error, label, type = "text" }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} name={name} value={value} onChange={onChange} />
    {error && <div className="error-message">{error}</div>}
  </>
);

Input.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string
  };

export default Input;

