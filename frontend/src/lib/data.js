import { ArrowBigRight } from "lucide-react";



export const districts = [
  {
    id: "d1",
    lgd_code: "1001",
    state_id: "s1",
    name: "District Alpha",
    special_area: "Special Area 1",
    special_area_id: "sa1",
    aspirational_district: "AD1",
    status: "Active",
    created_by: "User1",
    created_at: "2023-01-01T12:00:00Z",
    modified_by: "User1",
    modified_at: "2023-01-01T12:00:00Z",
  },
  {
    id: "d2",
    lgd_code: "1002",
    state_id: "s1",
    name: "District Beta",
    special_area: "",
    special_area_id: "",
    aspirational_district: null,
    status: "Active",
    created_by: "User2",
    created_at: "2023-01-02T12:00:00Z",
    modified_by: "User2",
    modified_at: "2023-01-02T12:00:00Z",
  },
  {
    id: "d3",
    lgd_code: "1003",
    state_id: "s2",
    name: "District Gamma",
    special_area: "Special Area 2",
    special_area_id: "sa2",
    aspirational_district: "AD2",
    status: "Inactive",
    created_by: "User3",
    created_at: "2023-01-03T12:00:00Z",
    modified_by: "User3",
    modified_at: "2023-01-03T12:00:00Z",
  },
  {
    id: "d4",
    lgd_code: "1004",
    state_id: "s2",
    name: "District Delta",
    special_area: "",
    special_area_id: "",
    aspirational_district: null,
    status: "Active",
    created_by: "User4",
    created_at: "2023-01-04T12:00:00Z",
    modified_by: "User4",
    modified_at: "2023-01-04T12:00:00Z",
  },
];

export const blocks = [
  {
    id: "T001",
    state_id: "S001",
    dist_id: "D001",
    lgd_code: "LGD123",
    lgd_code_feb11_2021: "LGD456",
    name: "block One",
    is_maped_to_another_district: null,
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "T002",
    state_id: "S001",
    dist_id: "D002",
    lgd_code: "LGD124",
    lgd_code_feb11_2021: null,
    name: "block Two",
    is_maped_to_another_district: null,
    status: "Inactive",
    created_by: "user1",
    created_at: new Date().toISOString(),
    modified_by: "user1",
    modified_at: new Date().toISOString(),
  },
  {
    id: "T003",
    state_id: "S002",
    dist_id: "D001",
    lgd_code: "LGD125",
    lgd_code_feb11_2021: null,
    name: "block Three",
    is_maped_to_another_district: "D002",
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "T004",
    state_id: "S003",
    dist_id: "D003",
    lgd_code: "LGD126",
    lgd_code_feb11_2021: "LGD789",
    name: "block Four",
    is_maped_to_another_district: null,
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "T005",
    state_id: "S003",
    dist_id: "D003",
    lgd_code: "LGD127",
    lgd_code_feb11_2021: "LGD101",
    name: "block Five",
    is_maped_to_another_district: null,
    status: "Inactive",
    created_by: "user2",
    created_at: new Date().toISOString(),
    modified_by: "user2",
    modified_at: new Date().toISOString(),
  },
];

export const states = [
  {
    id: "S001",
    lgd_code: "LGD123",
    name: "State One",
    state_shortcode: "ST1",
    country_id: "C001",
    state_icon: null,
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "S002",
    lgd_code: "LGD124",
    name: "State Two",
    state_shortcode: "ST2",
    country_id: "C001",
    state_icon: null,
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "S003",
    lgd_code: "LGD125",
    name: "State Three",
    state_shortcode: "ST3",
    country_id: "C001",
    state_icon: null,
    status: "Inactive",
    created_by: "user2",
    created_at: new Date().toISOString(),
    modified_by: "user2",
    modified_at: new Date().toISOString(),
  },
];

export const gp = [
  {
    id: "G001",
    state_id: "S001",
    dist_id: "D001",
    block_id: "T001",
    lgd_code: "LGD123",
    name: "Gram Panchayat One",
    is_maped_to_another_district: null,
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "G002",
    state_id: "S002",
    dist_id: "D002",
    block_id: "T002",
    lgd_code: "LGD124",
    name: "Gram Panchayat Two",
    is_maped_to_another_district: null,
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
  {
    id: "G003",
    state_id: "S003",
    dist_id: "D003",
    block_id: "T003",
    lgd_code: "LGD125",
    name: "Gram Panchayat Three",
    is_maped_to_another_district: null,
    status: "Inactive",
    created_by: "user2",
    created_at: new Date().toISOString(),
    modified_by: "user2",
    modified_at: new Date().toISOString(),
  },
];

export const themes = [
  {
    id: "T001",
    theme_name: "Theme One",
    status: "Active",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
    flag: null,
  },
  {
    id: "T002",
    theme_name: "Theme Two",
    status: "Inactive",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
    flag: null,
  },
  {
    id: "T003",
    theme_name: "Theme Three",
    status: "Active",
    created_by: "user2",
    created_at: new Date().toISOString(),
    modified_by: "user2",
    modified_at: new Date().toISOString(),
    flag: null,
  },
];

export const gpWiseKpi = [
  {
    id: "GK001",
    state_id: "S001",
    district_id: "D001",
    block_id: "T001",
    gp_id: "G001",
    date: new Date(),
    theme_id: "T001",
    kpi_id: "K001",
    question_id: "Q001",
    max_range: 50,
    input_data: 40,
    score: 80,
    remarks: "Good job",
    status: "Active",
    submitteed_id: "U001",
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
  },
];

export const kpiApprovals = [
  {
    id: "1",
    state_id: "State1",
    district_id: "District1",
    block_id: "block1",
    gp_id: "GP1",
    theme_id: "Theme1",
    decision: "Approved",
    submitted_id: "User1",
    remarks: "Well done",
    status: "Active",
    created_by: "Admin",
    created_at: "2021-01-01T00:00:00Z",
    modified_by: "Admin",
    modified_at: "2021-01-01T00:00:00Z",
  },
  // Add more KPI approvals
];

export const kpiData = [
  {
    id: "K001",
    theme_id: "T001",
    kpi_name: "KPI One",
    max_range: null,
    Input_Type: null,
    status: "Active",
    weightage: 50,
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
    flag: null,
  },
  {
    id: "K002",
    theme_id: "T001",
    kpi_name: "KPI Two",
    max_range: null,
    Input_Type: null,
    status: "Inactive",
    weightage: 50,
    created_by: "admin",
    created_at: new Date().toISOString(),
    modified_by: "admin",
    modified_at: new Date().toISOString(),
    flag: null,
  },
];

export const sidebarItems = [
  {
    icon: ArrowBigRight,
    title: "States",
    link: "/admin/states",
  },
  {
    icon: ArrowBigRight,
    title: "Districts",
    link: "/admin/districts",
  },
  {
    icon: ArrowBigRight,
    title: "Taluks",
    link: "/admin/taluks",
  },
  {
    icon: ArrowBigRight,
    title: "Gram Panchayats",
    link: "/admin/gram-panchayats",
  },
  {
    icon: ArrowBigRight,
    title: "Themes",
    link: "/admin/themes",
  },
  {
    icon: ArrowBigRight,
    title: "KPI",
    link: "/admin/kpi",
  },
  {
    icon: ArrowBigRight,
    title: "Kpi questions",
    link: "/admin/kpi-questions",
  },
  {
    icon: ArrowBigRight,
    title: "Kpi approvals",
    link: "/admin/kpi-approvals",
  },
  {
    icon: ArrowBigRight,
    title: "Create User",
    link: "/admin/users/create",
  },
];


export const getSidebarItems = (user)=>{
  let sidebarItems;
  switch (user.role) {
    case 1:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Access Management",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Create User",
          link: "/admin/users/create",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Admin location",
          link: "/admin/users/all/admin",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Young Fellow location",
          link: "/admin/users/all/young-fellow",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Master",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "States",
          link: "/admin/states",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Districts",
          link: "/admin/districts",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Blocks",
          link: "/admin/blocks",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Gram Panchayats",
          link: "/admin/gram-panchayats",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Themes",
          link: "/admin/themes",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "KPI",
          link: "/admin/data-point",
        },
      ];
      break;
    case 2:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Access Management",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Create User",
          link: "/admin/users/create",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "User location",
          link: "/admin/users/all/young-fellow",
        },
       /*  {
          type: "module",
          icon: ArrowBigRight,
          title: "Master",
        }, */
      
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Young Fellow",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Action Form",
          link: "/admin/admin-action-form",
        },
      ];
      break;
    case 3:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Attendance",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "All Attendance",
          link: "/admin/attendance/attendance",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "AM Entry Form",
          link: "/admin/attendance/amu-upload",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "PM Entry Form",
          link: "/admin/attendance/pmu-upload",
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Young Fellow",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Themewise KPI",
          link: "/admin/young-professionals",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Indicator",
          link: "/admin/indicator/create",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Action Form",
          link: "/admin/action-form",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "GP Details",
          link: "/admin/gp-details-form",
        },
        {
          type: "sub-module",
          icon: ArrowBigRight,
          title: "Yonng Fellow Insight",
          link: "/admin/young-fellow-insight",
        },
      ];
      break;
  }

  return sidebarItems;

}