export default defineEventHandler((event) => {
  const query = useQuery(event)

  return $fetch(`http://localhost:5000/Category/${query.categoryId}`, { body:{ 'token': useState('access_token')} })
})