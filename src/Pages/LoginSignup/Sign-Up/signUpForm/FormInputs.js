function SignUpInput({
  type,
  id,
  placeholder,
  handleChange,
  label,
  error,
}) {
  return (
    <label className="Input-rapper" htmlFor={id}>
      <span className="required-icon_rapper">
        {label}
        {error === null ? (
          <i className="fa-solid fa-circle-check valid-icon"></i>
        ) : id === 'referral'? "" : (
          <i className="fa-solid fa-star required-icon"></i>
        )}
      </span>

      <input
        className="input-field"
        onChange={handleChange}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={id === "referral" ? false : true}
        spellCheck={false}
        autoComplete="off"
      />
      <p className="error-text">{error}</p>
    </label>
  );
}

export default SignUpInput;
