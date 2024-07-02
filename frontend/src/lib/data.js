import { ArrowBigRight } from "lucide-react";


export const getSidebarItems = (user) => {
  let sidebarItems;

  if (user.username == "cpr") {
    sidebarItems = [
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Submissions",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Young Fellow Insights",
            link: "/admin/young-fellow-insight/submissions",
          },
        ],
      },
    ];
    return sidebarItems;
  }

  switch (user.role) {
    case 1:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Access Management",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Create User",
              link: "/admin/users/create",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "All Users",
              link: "/admin/users/",
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
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Master",
          submodules: [
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
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Deleted",
              link: "/admin/master-deleted",
            },
          ],
        },
        {
          type: "module",
          title: "Training",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Training",
              link: "/admin/training",
            },
          ],
        },
        {
          type: "module",
          title: "Action",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Action",
              link: "/admin/action/superadmin",
            },
          ],
        },
      ];
      break;

    case 2:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Access Management",
          submodules: [
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
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Action",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Kpi",
              link: "/admin/action/admin/gp-wise-kpi",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Indicator",
              link: "/admin/action/admin/indicator",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Good practice",
              link: "/admin/action/admin/good-practice",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Training",
              link: "/admin/action/admin/training",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Gp details",
              link: "/admin/action/admin/gp-details",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "LCVA",
              link: "/admin/action/admin/lcva",
            },
          ],
        },
        {
          type: "module",
          title: "Training",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Training",
              link: "/admin/training",
            },
          ],
        },
      ];
      break;

    case 3:
      sidebarItems = [
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Attendance",
          submodules: [
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
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Action",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Kpi",
              link: "/admin/action/admin/gp-wise-kpi",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Indicator",
              link: "/admin/action/admin/indicator",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Good practice",
              link: "/admin/action/admin/good-practice",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Training",
              link: "/admin/action/admin/training",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Gp details",
              link: "/admin/action/admin/gp-details",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "LCVA",
              link: "/admin/action/admin/lcva",
            },
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Young Fellow",
          submodules: [
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
              link: "/admin/indicator",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "GP Details",
              link: "/admin/gp-details",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Young Fellow Insight",
              link: "/admin/young-fellow-insight",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Good Practices",
              link: "/admin/good-practices",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Training",
              link: "/admin/training",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "LCVA",
              link: "/admin/lcvas",
            },
          ],
        },
      ];
      break;
  }

  return sidebarItems;
};
