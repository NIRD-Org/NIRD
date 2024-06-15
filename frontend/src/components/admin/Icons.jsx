import React from "react";
import { Edit, Trash,HamIcon,List} from "lucide-react";
import { cn } from "@/lib/utils";

export const NirdEditIcon = ({ props }) => (
  <Edit {...props} className={cn("hover:cursor-pointer", "text-green-500")} />
);

export const NirdDeleteIcon = ({ props }) => (
  <Trash {...props} className={cn("hover:cursor-pointer", "text-red-500")} />
);

export const NirdHamIcon = ({ props }) => (
  <List {...props} className={cn("hover:cursor-pointer")} />
);
