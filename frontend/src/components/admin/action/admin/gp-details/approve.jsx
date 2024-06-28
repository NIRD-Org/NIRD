import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NirdViewIcon } from "@/components/admin/Icons";

const GpDetailsApprovalPage = () => {
  const { id } = useParams();
  const [gpDetails, setGpDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    decision: "",
    remarks: "",
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    panchayatDetails: {
      state: "",
      district: "",
      block: "",
      village: "",
      lgd: "",
      address: "",
      mobileNumber: "",
      emailAddress: "",
      distanceFromBusStop: 0,
      gpAttractions: "",
    },
    demography: {
      totalPopulation: 0,
      malePopulation: 0,
      femalePopulation: 0,
      stPopulation: 0,
      scPopulation: 0,
      obcPopulation: 0,
      generalPopulation: 0,
      childrenPopulation0to6: 0,
      childrenPopulation6to18: 0,
    },
    panchayatArea: {
      totalArea: 0,
      noOfRevenueVillages: 0,
      noOfWardsSansads: 0,
      noOfVillagesMappedWithLGD: 0,
    },
    sarpanchDetails: {
      nameOfSarpanch: "",
      education: "",
      gender: "",
      areaOfExpertise: "",
      email: "",
      mobile: "",
      sarpanchPhoto: "",
    },
    secretaryDetails: {
      nameOfSecretary: "",
      education: "",
      gender: "",
      numberOfGPCovered: 0,
      email: "",
      mobile: "",
      secretaryPhoto: "",
    },
    health: {
      primaryHealthCenters: 0,
      healthSubCenters: 0,
      wellBeingCenters: 0,
      dispensary: 0,
      ayurvedicClinics: 0,
    },
    education: {
      totalPrimarySchools: 0,
      totalPrePrimarySchools: 0,
      totalHigherSecondarySchools: 0,
      totalSecondarySchools: 0,
    },
    sports: {
      noOfVolleyballCourt: 0,
      noOfFootballCourt: 0,
      noOfBadmintonCourt: 0,
    },
    general: {
      noOfSHG: 0,
      noOfDestituteHomesOldAgeHomes: 0,
      noOfJobCardHolders: 0,
      noOfHouseholds: 0,
      noOfAnganwadiCenters: 0,
    },
    others: {
      noOfHouseholdsConnectedToTapWater: 0,
      noOfHouseholdToilets: 0,
      noOfDrinkingWaterSources: 0,
      noOfSeedCenters: 0,
      noOfChildrenParks: 0,
      noOfBusStandWithWaterSources: 0,
      noOfRuralLibrary: 0,
      noOfSolidWasteManagementCenters: 0,
      noOfBanks: 0,
      noOfATMs: 0,
      noOfCommunitySanitaryComplexes: 0,
      noOfDisasterRescueCenters: 0,
      noOfCommonServiceCenters: 0,
    },
    wardDetails: {
      wardName: "",
      memberName: "",
      gender: "",
      casteCategory: "",
      highestQualification: "",
      aproxAge: 0,
    },
    status: "1",
  });

  useEffect(() => {
    const fetchGpDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/gp-details/${id}`);
        setGpDetails(data?.data);
      } catch (error) {
        console.error("Error fetching GP Details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGpDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/v1/gp-details/${id}/approve`, formData);
      tst.success("GP Details approved");
    } catch (error) {
      console.error("Error approving GP Details:", error);
      tst.error("Error approving GP Details");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!gpDetails) {
    return <div>GP Details not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>GP Details Approval</AdminHeader>
      <Table>
        <TableBody>
          {/* Render fields dynamically */}
          {Object.entries(formData).map(([key, value]) => {
            if (typeof value === "object") {
              return Object.entries(value).map(([subKey, subValue]) => (
                <TableRow key={`${key}-${subKey}`}>
                  <TableCell>{subKey}</TableCell>
                  <TableCell>{subValue}</TableCell>
                </TableRow>
              ));
            } else {
              return (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            }
          })}
          {/* Example for fixed fields */}
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img className="w-[300px]" src={gpDetails.panchayatDetails.image} alt="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Document</TableCell>
            <TableCell>
              <a
                href={gpDetails.panchayatDetails.document}
                className="flex gap-3 items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Document</span>
                <NirdViewIcon />
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Video</TableCell>
            <TableCell>
              <a
                href={gpDetails.panchayatDetails.video}
                className="flex gap-3 items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Video</span>
                <NirdViewIcon />
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Created By</TableCell>
            <TableCell>{gpDetails.created_by}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="w-full md:w-1/2 my-4">
            <Label htmlFor="decision" className="mb-2 block">
              Decision
            </Label>
            <select
              required
              className="px-4 py-2 rounded-md bg-white"
              id="decision"
              name="decision"
              value={formData.decision}
              onChange={(e) =>
                setFormData({ ...formData, decision: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="1">Approve</option>
              <option value="2">Send for Modification</option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <Label htmlFor="remarks" className="mb-2 block">
              Remarks
            </Label>
            <Textarea
              required={formData.decision === "2"}
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              className="w-full"
              id="remarks"
              name="remarks"
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default GpDetailsApprovalPage;
