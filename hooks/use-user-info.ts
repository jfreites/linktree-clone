import { useContext } from "react";
import { UserContext } from "@/contexts";

export const useUserInfo = () => useContext(UserContext)