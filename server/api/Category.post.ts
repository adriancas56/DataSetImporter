import formidable from 'formidable'

export default defineEventHandler(async (event) => {
    const form = new formidable.IncomingForm();
    
    const body = await useBody(event)
    const access_token = getCookie(event, 'access_token')
    const result = await $fetch(`http://localhost:5000/Category`, 
    { method: 'post', headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'multipart/form-data'}, body: body })
    return result

  // try {
  //   const fields: JobPayload = await new Promise((resolve, reject) => {
  //     form.parse(event.req, (err, fields, files) => {
  //       if (err || xxxxxxxxxxxxxxxxxxxxxxxx ) {
  //         event.res.statusCode = 401
  //         reject(new Error('Not allowed'))
  //       }
  //       resolve(JSON.parse(fields.rawRequest))
  //     });
  //   })
  //   return prisma.job.create({
  //     data: { ...fields }
  //     }
  //   })
  // }

})