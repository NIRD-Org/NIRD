import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ThemeForm({ type, onSubmit, theme }) {
  const [formData, setFormData] = useState({
    id: theme ? theme.id : "",
    theme_name: theme ? theme.theme_name : "",
    status: theme ? theme.status : "",
    created_by: theme ? theme.created_by : "",
    modified_by: theme ? theme.modified_by : "",
    flag: theme ? theme.flag : "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPending(true);
    onSubmit(formData);
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add Theme" : "Update Theme"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new theme" : "Update theme details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-10">
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="theme_name" className="text-right mt-2">
            Theme Name
          </Label>
          <Input
            type="text"
            name="theme_name"
            value={formData.theme_name}
            onChange={handleChange}
            id="theme_name"
            placeholder="Enter Theme Name"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">
          {type === "add" ? "Add Theme" : "Update Theme"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default ThemeForm;
