import React from "react";
import { Edit, Trash,HamIcon,List,Eye,Download ,Ban,UserRoundPlus} from "lucide-react";
import { cn } from "@/lib/utils";

export const NirdEditIcon = ({ props }) => (
  <Edit {...props} className={cn("hover:cursor-pointer", "text-primary")} />
);

export const NirdDeleteIcon = ({ props }) => (
  <Trash {...props} className={cn("hover:cursor-pointer", "text-red-500")} />
);

export const NirdHamIcon = ({ props }) => (
  <List {...props} className={cn("hover:cursor-pointer")} />
);


export const NirdViewIcon = ({ props }) => (
  <Eye {...props} className={cn("hover:cursor-pointer", "text-primary")} />
);

export const NirdDownloadIcon = ({ props }) => (
  <Download {...props} className={cn("hover:cursor-pointer", "text-primary")} />
);

export const NirdBanIcon = ({ props }) => (
  <Ban {...props} className={cn("hover:cursor-pointer", "text-red-700")} />
);

export const NirdAssignIcon = ({ props }) => (
  <UserRoundPlus {...props} className={cn("hover:cursor-pointer", "text-primary")} />
);
