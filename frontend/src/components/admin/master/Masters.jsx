import React, { useState } from "react";
import DataTable from "./DataTable";

const Masters = () => {
  const [item, setItem] = useState("state");

  const configurations = {
    state: {
      title: "States",
      createLink: "/admin/state/create",
      endpoint: "/api/v1/state/all",
      crudpoint: "/api/v1/state",
      headers: ["ID", "Name", "Action"],
      columnItems: ["id", "name"],
    },
    dist: {
      title: "Districts",
      createLink: "/admin/district/create",
      endpoint: "/api/v1/dist/all",
      crudpoint: "/api/v1/dist",
      headers: ["ID", "State ID", "Name", "Special Area", "Actions"],
      columnItems: ["id", "state_id", "name", "special_area"],
    },
    block: {
      title: "Blocks",
      createLink: "/admin/block/create",
      endpoint: "/api/v1/block/all",
      crudpoint: "/api/v1/block",
      headers: ["ID", "State ID", "District ID", "Name", "Mapped to Another District"],
      columnItems: ["id", "state_id", "dist_id", "name", "is_maped_to_another_district"],
    },
    gp: {
      title: "GPs",
      createLink: "/admin/gp/create",
      endpoint: "/api/v1/gp/all",
      crudpoint: "/api/v1/gp",
      headers: ["ID", "State ID", "District ID", " Block ID", "Name", "Action"],
      columnItems: ["id", "state_id", "dist_id", "block_id", "name"],
    },
    theme: {
      title: "Themes",
      createLink: "/admin/theme/create",
      endpoint: "/api/v1/theme/all",
      crudpoint: "/api/v1/theme",
      headers: ["ID", "Theme Name", "Action"],
      columnItems: ["id", "theme_name"],
    },
    kpi: {
      title: "KPIs",
      createLink: "/admin/data-point/create",
      endpoint: "/api/v1/kpi/all",
      crudpoint: "/api/v1/kpi",
      headers: ["ID", "Theme", "KPI Name", "Data Point", "Input Type", "Weightage", "Action"],
      columnItems: ["id", "theme_name", "name", "kpi_datapoint", "input_type", "weightage"],
    },
    /*  user: {
      title: "Users",
      createLink: "/admin/users/create",
      endpoint: "/api/v1/users/all",
      headers: ["ID", "Name", "Username", "Role", "Action"],
      columnItems: ["id", "name", "username", "role"],
    }, */
  };

  const config = configurations[item];

  if (!config) {
    return <div>Select a Item</div>;
  }

  return (
    <div>
      <select
        className="text-sm px-4 py-2 rounded-md bg-white border mx-auto block mb-10 w-60 max-sm:w-full"
        name="item"
        id="item"
        onChange={e => setItem(e.target.value)}
        value={item}
      >
        <option value="state">State</option>
        <option value="dist">District</option>
        <option value="block">Block</option>
        <option value="gp">GP</option>
        <option value="theme">Theme</option>
        <option value="kpi">KPI</option>
        <option value="user">User</option>
      </select>
      <DataTable
        title={config.title}
        createLink={config.createLink}
        endpoint={config.endpoint}
        headers={config.headers}
        columnItems={config.columnItems}
        crudpoint={config.crudpoint}
        master
      />
    </div>
  );
};

export default Masters;

