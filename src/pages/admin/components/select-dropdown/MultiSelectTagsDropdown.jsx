import AsyncSelect from "react-select/async";

const MultiSelectTagsDropdown = ({
  defaultValue = [],
  loadOptions,
  onChange,
  placeholder = "Sélectionnez une ou plusieurs catégories",
  noOptionsMessage = () => "Aucune catégorie disponible",
}) => {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions}
      className="relative z-20"
      onChange={onChange}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default MultiSelectTagsDropdown;
