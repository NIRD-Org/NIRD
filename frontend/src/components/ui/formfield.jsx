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
      case "checkbox":
        return (
          <input
            required={required}
            disabled={disabled}
            type="checkbox"
            name={name}
            value={value}
            onChange={onChange}
            id={name}
            className="col-span-3 block border border-slate-200 bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
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
