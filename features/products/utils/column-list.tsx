import {
  CirclePause,
  List,
  ListCheck,
  PhilippinePeso,
  Star,
} from "lucide-react";
import { ColConfig } from "../types/kanban-board.types";

export const COLUMN_CONFIG: Array<ColConfig> = [
  {
    color: "bg-gradient-to-r from-red-500 to-red-400",
    icon: <Star className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-orange-500 to-yellow-300",
    icon: <List className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-cyan-500 to-cyan-300",
    icon: <ListCheck className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-gray-500 to-gray-300",
    icon: <CirclePause className="h-4 w-4" />,
  },
  {
    color: "bg-gradient-to-r from-emerald-600 to-green-300",
    icon: <PhilippinePeso className="h-4 w-4" />,
  },
];
