export default defineEventHandler((event) => {
    const cookies = parseCookies(event)
    const query = useQuery(event)
    console.log(query.categoryName)
  return $fetch(`http://localhost:5000/Diagnostics/${query.categoryName}`, {headers: { Authorization: `Bearer ${cookies['access_token']}`}})
})