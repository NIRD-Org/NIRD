import React from "react";
import DynamicForm from "./DynamicForm";
import useStates from "@/components/hooks/location/useState";
import useDistrict from "@/components/hooks/location/useDistrict";

const BlockFormConfig = ({item}) => {
  const { states } = useStates();
  const { districts } = useDistrict({ state_id: formData.stateId });

  return {
    title: "Block",
    endpoint: "/api/v1/block",
    fields: [
      {
        name: "state_id",
        label: "State",
        type: "select",
        options: states.map(state => ({ value: state.id, label: state.name })),
        required: true,
      },
      {
        name: "dist_id",
        label: "District",
        type: "select",
        options: districts.map(district => ({ value: district.id, label: district.name })),
        required: true,
      },
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "is_maped_to_another_district",
        label: "Mapped to Another District",
        type: "select",
        options: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
      },
    ],
  };
};

const StateFormConfig = () => ({
  title: "State",
  endpoint: "/api/v1/state",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "state_shortcode", label: "State Shortcode", type: "text", required: true },
    { name: "country_id", label: "Country ID", type: "text", required: true },
  ],
});

export function BlockForm({ update }) {
  const formConfig = BlockFormConfig();
  return <DynamicForm formConfig={formConfig} endpoint={formConfig.endpoint} update={update} />;
}

export function StateForm({ update }) {
  const formConfig = StateFormConfig();
  return <DynamicForm formConfig={formConfig} endpoint={formConfig.endpoint} update={update} />;
}
