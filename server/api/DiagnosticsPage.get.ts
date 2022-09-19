export default defineEventHandler((event) => {
    const query = useQuery(event)
    const cookies = parseCookies(event)
  return $fetch(`http://localhost:5000/DiagnosticsPage/${query.page}/${query.limit}`, { headers: { Authorization: `Bearer ${cookies['access_token']}`}})
})