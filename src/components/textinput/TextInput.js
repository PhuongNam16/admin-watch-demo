export const TextInput = ({type, value,name,onChange,placeholder}) => {
  return (
    <div className="form-group">
      <input
        type= {type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
