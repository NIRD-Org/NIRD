import React from "react";
import Select from "react-select";
const SelectComponent = ({ data, name }) => {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={data[0]}
      isClearable={true}
      isSearchable={true}
      name={name}
      options={data}
    />
  );
};

export default SelectComponent;
