import jwtDecode, { JwtPayload } from "jwt-decode"

export const validateTokenExp = (token: string): boolean => {
    const decoded = jwtDecode<JwtPayload>(token)
    // Validate token is still valid
    if (decoded.exp < Date.now() / 1000) return false
    
    return true
}