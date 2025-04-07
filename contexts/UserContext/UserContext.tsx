import { createContext, useEffect, useState } from "react";
import { UserContextType, UserProviderProps } from "./UserContext.types";
import { useUser } from "@clerk/nextjs";
import { Link, User } from "@prisma/client";

export const UserContext = createContext<UserContextType>({
    user: null,
    links:  null,
    isLoading: false,
    reloadUser: () => {}
})

export function UserProvider({ children }: UserProviderProps) {
    const { user } = useUser()

    const [infoUser, setInfoUser] = useState<User | null>(null)
    const [links, setLinks] = useState<Link[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchUserData = async () => {
        if (!user) return

        try {
            setIsLoading(true)
            const response = await fetch("/api/info-user")
            const data = await response.json()
            setInfoUser(data || null) // Set the user info
            setLinks(data.links || []) // Set the links
        } catch (error) {
            console.error("Failed to fetch user data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Fetch user data when the component mounts or when `user` changes
        fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const reloadUser = () => fetchUserData()

    const data = {
        user: infoUser,
        links,
        isLoading,
        reloadUser
    }

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}