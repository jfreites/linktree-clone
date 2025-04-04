import { NavbarProps } from "./Navbar.types"

export function Navbar(prop: NavbarProps) {
    const { user } = prop
    return (
        <p>Hello {user}</p>
    )
}