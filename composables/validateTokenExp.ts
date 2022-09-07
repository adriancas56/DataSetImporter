import jwtDecode, { JwtPayload } from "jwt-decode"

export const validateTokenExp = (token: string): boolean => {
    if (!token) return false 

    const decoded = jwtDecode<JwtPayload>(token)
    // Validate token is still valid
    if (decoded.exp < Date.now() / 1000) return false
    
    return true
}