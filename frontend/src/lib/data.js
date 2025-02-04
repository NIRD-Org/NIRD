import { ArrowBigRight } from "lucide-react";

export const getSidebarItems = (user) => {
  // console.log(user);
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

  if (user.role == 7 ) {
    sidebarItems = [
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Plan Of Actions",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Sr.Consultant POA Approvals",
            link: "/admin/soepr/SirdPRDapprovals",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Consultant POA View",
            link: "/admin/soepr/viewconsultants",
          },
        ],
      },
    ];
    return sidebarItems;
  }

  if (user.role == 4 ) {
    sidebarItems = [
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Profile",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View Profile",
            link: "/admin/soepr/profile",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Edit Profile",
            link: "/admin/soepr/profile-form",
          },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "SOEPR Achievements",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "SOEPR Achievements Entry Form",
            link: "/admin/soepr/blog/create",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View Achievement Posts",
            link: "/admin/soepr/blogs/all",
          },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Training Material",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Training Material Entry Form",
            link: "/admin/soepr/training-material/create",
          },
        ],
      },
      
      // {
      //   type: "module",
      //   icon: ArrowBigRight,
      //   title: "Attendance",
      //   submodules: [
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "AM Entry Form",
      //       link: "/admin/soepr/attendance/amu-upload",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "PM Entry Form",
      //       link: "/admin/soepr/attendance/pmu-upload",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "View Attendance",
      //       link: "/admin/soepr/attendance/view",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "Leave Entry Form",
      //       link: "/admin/soepr/leave",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "Tour Entry Form",
      //       link: "/admin/soepr/Tour",
      //     },
      //   ],
      // },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Plan Of Action",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "KPI-POA(Trial)",
            link: "/admin/soepr/plan-of-action",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View POA",
            link: "/admin/soepr/POAView",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "POA1",
            link: "/admin/soepr/POA1",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "POA2",
            link: "/admin/soepr/POA2",
          },
        // {
        //     type: "sub-module",
        //     icon: ArrowBigRight,
        //     title: "POA2(Decembertemp)",
        //     link: "/admin/soepr/poa2temp",
        //   },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "KPI",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "KPI Data entry",
            link: "/admin/soepr/young-professionals",
          },
        ],
      },
    ];
    return sidebarItems;
  }

  if ( user.role == 5) {
    sidebarItems = [
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Profile",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View Profile",
            link: "/admin/soepr/profile",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Edit Profile",
            link: "/admin/soepr/profile-form",
          },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Plan Of Action",
        submodules: [
          
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View POA",
            link: "/admin/soepr/POAView",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "POA1",
            link: "/admin/soepr/POA1",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "POA2",
            link: "/admin/soepr/POA2",
          },
          //  {
          //   type: "sub-module",
          //   icon: ArrowBigRight,
          //   title: "POA2(December temp)",
          //   link: "/admin/soepr/poa2temp",
          // },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Consultant POA Approvals",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Consultant POA",
            link: "/admin/soepr/srcapprovals",
          },
         
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "SOEPR Achievements",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "SOEPR Achievements Entry Form",
            link: "/admin/soepr/blog/create",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View Achievement Posts",
            link: "/admin/soepr/blogs/all",
          },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Training Material",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "Training Material Entry Form",
            link: "/admin/soepr/training-material/create",
          },
        ],
      },
      // {
      //   type: "module",
      //   icon: ArrowBigRight,
      //   title: "Attendance",
      //   submodules: [
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "AM Entry Form",
      //       link: "/admin/soepr/attendance/amu-upload",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "PM Entry Form",
      //       link: "/admin/soepr/attendance/pmu-upload",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "View Attendance",
      //       link: "/admin/soepr/attendance/view",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "Leave Entry Form",
      //       link: "/admin/soepr/leave",
      //     },
      //     {
      //       type: "sub-module",
      //       icon: ArrowBigRight,
      //       title: "Tour Entry Form",
      //       link: "/admin/soepr/Tour",
      //     },
      //   ],
      // },
     
     
      {
        type: "module",
        icon: ArrowBigRight,
        title: "KPI",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "KPI-POA(Trial)",
            link: "/admin/soepr/plan-of-action",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "KPI Data entry",
            link: "/admin/soepr/young-professionals",
          },
        ],
      },
    ];
    return sidebarItems;
  }
  // console.log(user.role)
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
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "User Location Management",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Young Fellow Location",
              link: "/admin/users/all/young-fellow",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "SPC Location",
              link: "/admin/users/all/admin",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "SOEPR Location",
              link: "/admin/users/all/soepr",
            },
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Plan Of Action",
          submodules: [
          
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View POA",
              link: "/admin/PMU/POAView",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA1",
              link: "/admin/PMU/poa1",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA2",
              link: "/admin/PMU/poa2",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA3",
              link: "/admin/PMU/poa3",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA4",
              link: "/admin/PMU/poa4",
            },
          ],
        },

        {
          type: "module",
          icon: ArrowBigRight,
          title: "Model GP Clusters",
          submodules: [
          

            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View PRA POA Reports",
              link: "/admin/yf/poa1-data",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: " PRA POA Defaulters List ",
              link: "/admin/yf/poa-report",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View PMU POA  ",
              link: "/admin/POAadminView",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View SPC POA  ",
              link: "/admin/SPCPOAadminView",
            },
          
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "SPC POA Defaulters List ",
              link: "/admin/spc/poa-report",
            },
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "SOEPR",
          submodules: [
            
            //{
            //type: "sub-module",
            //icon: ArrowBigRight,
            //title: "SOEPR State",
            //link: "/admin/users/all/soepr/list",
            // },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "SOEPR POA Reports",
              link: "/admin/soepr/poa1-data",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "SOEPR KPI Data",
              link: "/admin/action/soepr/superadmin",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA Defaulters List ",
              link: "/admin/soepr/poa-report",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA Statewise Submission Status ",
              link: "/admin/soepr/pOAreport",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA Approval Status ",
              link: "/admin/soepr/pOa-Approvalreport",
            },
          ],
        },
        // {
        //   type: "module",
        //   icon: ArrowBigRight,
        //   title: "Attendance",
        //   submodules: [
        //     {
        //       type: "sub-module",
        //       icon: ArrowBigRight,
        //       title: "View Attendance",
        //       link: "/admin/view/attendance",
        //     },
        //   ],
        // },

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

        // Blogs

        {
          type: "module",
          title: "Blogs",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "All blogs",
              link: "/admin/superadmin/blogs",
            },
            
          ],
        },

        {
          type: "module",
          title: "Approvals",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "All  Approvals",
              link: "/admin/action/superadmin",
            },
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Master Tables",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "States",
              link: "/admin/master-states",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Districts",
              link: "/admin/master-districts",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Soepr Districts",
              link: "/admin/master-soepr-districts",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Blocks",
              link: "/admin/master-blocks",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Gram Panchayats",
              link: "/admin/master-gps",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Themes",
              link: "/admin/master-themes",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "KPI",
              link: "/admin/master-kpis",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Deleted",
              link: "/admin/master-deleted",
            },
          ],
        },
      ];
      break;

    case 2:
      sidebarItems = [
   //     {
  //        type: "module",
   //       icon: ArrowBigRight,
   //       title: "Access Management",
     //     submodules: [
       //     {
         //     type: "sub-module",
           //   icon: ArrowBigRight,
             // title: "Create User",
      //        link: "/admin/users/create",
       //     },
       //     {
       //       type: "sub-module",
       //       icon: ArrowBigRight,
       //       title: "User location",
       //       link: "/admin/users/all/young-fellow",
       //     },
       //   ],
       // },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "Approvals",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Themewise Kpi",
              link: "/admin/action/admin/gp-wise-kpi",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Institutional Strengthening",
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
              title: "LCVA",
              link: "/admin/action/admin/lcva",
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
          ],
        },
        {
          type: "module",
          title: "Plan Of Action",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View POA",
              link: "/admin/spc/POAView",
            },
          
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA1",
              link: "/admin/spc/POA1",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA2",
              link: "/admin/spc/POA2",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA3",
              link: "/admin/spc/POA3",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA4",
              link: "/admin/spc/POA4",
            },
          ],
        },
        {
          type: "module",
          title: "Monitor PRA Plan Of Action",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View PRA POA",
              link: "/admin/spcviewyfpoa",
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
          title: "Plan Of Action",
          submodules: [
         
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "View POA",
              link: "/admin/yf/POAView",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA1",
              link: "/admin/yf/POA1",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA2",
              link: "/admin/yf/POA2",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA3",
              link: "/admin/yf/POA3",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "POA4",
              link: "/admin/yf/POA4",
            },
          ],
        },
       

        {
          type: "module",
          icon: ArrowBigRight,
          title: "Approval Status",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Themewise Kpi",
              link: "/admin/action/admin/gp-wise-kpi",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Institutional Strengthening",
              link: "/admin/action/admin/indicator",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "Good Practice",
              link: "/admin/action/admin/good-practice",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "LCVA",
              link: "/admin/action/admin/lcva",
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
          ],
        },
        {
          type: "module",
          icon: ArrowBigRight,
          title: "KPIs & Uploads",
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
              title: "Institutional Strengthening",
              link: "/admin/indicator",
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
              title: "LCVA",
              link: "/admin/lcvas",
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
              title: "Training",
              link: "/admin/training",
            },
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: " Insight",
              link: "/admin/young-fellow-insight",
            },
          ],
        },
      ];
      break;

    case 4:
      sidebarItems = [
        // {
        //   type: "module",
        //   icon: ArrowBigRight,
        //   title: "Attendance",
        //   submodules: [
        //     {
        //       type: "sub-module",
        //       icon: ArrowBigRight,
        //       title: "AM Entry Form",
        //       link: "/admin/soepr/attendance/amu-upload",
        //     },
        //     {
        //       type: "sub-module",
        //       icon: ArrowBigRight,
        //       title: "PM Entry Form",
        //       link: "/admin/soepr/attendance/pmu-upload",
        //     },
        //   ],
        // },
       
        {
          type: "module",
          icon: ArrowBigRight,
          title: "KPI",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "KPI Data entry",
              link: "/admin/soepr/young-professionals",
            },
          ],
        },
      ];

    case 5:
      sidebarItems = [
        
        {
          type: "module",
          icon: ArrowBigRight,
          title: "KPI",
          submodules: [
            {
              type: "sub-module",
              icon: ArrowBigRight,
              title: "KPI Data entry",
              link: "/admin/soepr-sr/gp-wise-kpi",
            },
          ],
        },
      ];
  
  break;
  case 6:
    sidebarItems = [
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Access Management",
        submodules: [
          
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "All Users",
            link: "/admin/users/",
          },
        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Model GP Clusters",
        submodules: [
         

          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View PRA POA Reports",
            link: "/admin/yf/poa1-data",
          },
          {
            type: "sub-module",
             icon: ArrowBigRight,
             title: "View PMU POA  ",
             link: "/admin/POAadminView",
           },
           {
            type: "sub-module",
             icon: ArrowBigRight,
             title: "View SPC POA  ",
             link: "/admin/SPCPOAadminView",
           },
           {
            type: "sub-module",
            icon: ArrowBigRight,
            title: " PRA POA Defaulters List ",
            link: "/admin/yf/poa-report",
          },
        
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "SPC POA Defaulters List ",
            link: "/admin/spc/poa-report",
          },

        ],
      },
      {
        type: "module",
        icon: ArrowBigRight,
        title: "SOEPR",
        submodules: [
         
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "SOEPR POA Reports",
            link: "/admin/soepr/poa1-data",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "POA Defaulters List ",
            link: "/admin/soepr/poa-report",
          },
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "POA Statewise Submission Status ",
            link: "/admin/soepr/pOAreport",
          },
        ],
      },
    
      {
        type: "module",
        icon: ArrowBigRight,
        title: "Attendance",
        submodules: [
          {
            type: "sub-module",
            icon: ArrowBigRight,
            title: "View Attendance",
            link: "/admin/view/attendance",
          },
        ],
      },

  
      
    ];
  }
  return sidebarItems;
};

export const kpiScoringRules = {
  1: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  2: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
  3: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  4: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  5: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
  6: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  7: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  8: { thresholds: [80, 60, 40, 20], scores: [4, 3, 2, 1, 0] },
  9: { thresholds: [80, 60, 40, 20], scores: [6, 5, 4, 3, 2] },
  10: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  11: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  12: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  13: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  14: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  15: { thresholds: [80, 60, 40, 20, 0], scores: [5, 4, 3, 2, 1] },
  16: { thresholds: [12, 1], scores: [2, 1, 0] },
  17: { thresholds: [500, 1], scores: [2, 1, 0] },
  18: { thresholds: [12, 1], scores: [2, 1, 0] },
  19: { thresholds: [12, 1], scores: [2, 1, 0] },
  20: { thresholds: [12, 1], scores: [2, 1, 0] },
  21: { thresholds: [12, 1], scores: [2, 1, 0] },
  22: { thresholds: [12, 1], scores: [2, 1, 0] },
  23: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  24: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
  25: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
  26: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
  27: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
  28: { thresholds: [80, 61, 41, 21, 0], scores: [10, 8, 6, 4, 2, 0] },
  29: { thresholds: [12, 10, 7, 4, 1], scores: [5, 4, 3, 2, 1, 0] },
  30: { thresholds: [80, 61, 41, 21, 0], scores: [10, 8, 6, 4, 2] },
  31: { thresholds: [80, 61, 41, 21, 0], scores: [10, 8, 6, 4, 2] },
  32: { thresholds: [60, 40, 20, 10, 0], scores: [0, 1, 2, 3, 4] },
  33: { thresholds: [40, 20, 10, 0], scores: [0, 1, 2, 3] },
  34: { thresholds: [40, 20, 10, 0], scores: [0, 1, 2, 3] },
  35: { thresholds: [80, 60, 40, 20, 0], scores: [5, 4, 3, 2, 1] },
  36: { thresholds: [80, 60, 40, 20, 0], scores: [5, 4, 3, 2, 1] },
  37: { thresholds: [80, 60, 40, 20, 0], scores: [0, 2, 4, 6, 8, 10] },
  38: { thresholds: [80, 60, 40, 20, 0], scores: [5, 4, 3, 2, 1] },
  39: { thresholds: [4, 1, 0], scores: [2, 1, 0] },
  40: { thresholds: [4, 1, 0], scores: [2, 1, 0] },
  41: { thresholds: [100, 2, 0], scores: [2, 1, 0] },
  42: { thresholds: [4, 1, 0], scores: [2, 1, 0] },
  43: { thresholds: [100, 2, 0], scores: [2, 1, 0] },
  44: { thresholds: [4, 1, 0], scores: [2, 1, 0] },
  45: { thresholds: [100, 2, 0], scores: [2, 1, 0] },
  46: { thresholds: [80, 60, 40, 20, 0], scores: [10, 8, 6, 4, 2] },
  47: { thresholds: [4, 1, 0], scores: [2, 1, 0] },
  48: { thresholds: [100, 2, 0], scores: [2, 1, 0] },
  49: { thresholds: [4, 1, 0], scores: [2, 1, 0] },
  50: { thresholds: [100, 2, 0], scores: [2, 1, 0] },
  51: { thresholds: [80, 60, 40, 20, 0], scores: [10, 8, 6, 4, 2] },
  // Define the rules for KPIs 52 to 128 here
  52: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  53: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  54: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  55: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  56: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  57: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  58: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  59: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  60: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  61: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  62: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  63: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  64: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  65: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  66: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  67: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  68: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  69: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  70: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  71: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  72: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  73: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  74: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  75: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  76: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  77: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  78: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  79: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  80: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  81: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  82: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  83: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  84: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  85: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  86: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  87: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  88: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  89: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  90: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  91: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  92: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  93: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  94: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  95: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  96: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  97: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  98: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  99: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  100: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  101: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  102: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  103: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  104: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  105: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  106: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  107: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  108: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  109: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  110: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  111: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  112: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  113: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  114: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  115: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  116: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  117: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  118: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  119: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  120: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  121: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  122: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  123: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  124: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  125: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  126: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
  127: { thresholds: [100, 80, 60, 40], scores: [10, 8, 6, 4, 2] },
  128: { thresholds: [4, 2, 1, 0], scores: [6, 4, 2, 0] },
};

export const disabledKpis = [
  16, 17, 18, 19, 20, 21, 22, 23, 29, 39, 40, 41, 45, 48, 49,
];
// {id:{$in:["16", "17", "18", "19", "20", "21", "22", "23", "29", "39", "40", "41", "45", "48", "49"]}}
