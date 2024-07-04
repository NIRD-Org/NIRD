import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormField = ({ name, label, type, options, required, disabled, value, onChange, onFileChange }) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <select
            required={required}
            disabled={disabled}
            className="w-full col-span-3 px-4 py-2 rounded-md bg-white border text-sm"
            value={value}
            name={name}
            onChange={onChange}
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map(option => (
              <option className="text-base " key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <Textarea
            required={required}
            disabled={disabled}
            name={name}
            value={value}
            onChange={onChange}
            id={name}
            placeholder={`Enter ${label}`}
            className="col-span-3"
          />
        );
      case "file":
        return (
          <Input
            type="file"
            required={required}
            disabled={disabled}
            name={name}
            onChange={onFileChange}
            className="block"
          />
        );
      default:
        return (
          <Input
            required={required}
            disabled={disabled}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            id={name}
            placeholder={`Enter ${label}`}
            className="col-span-3"
          />
        );
    }
  };

  return (
    <div key={name}>
      <Label htmlFor={name} className="inline-block mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};

export default FormField;
