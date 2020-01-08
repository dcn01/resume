const { Photo, Com } = require('./model/index')
!(async function() {
  const res = await Photo.findAll({
    include: [
      {
        model: Com
      }
    ]
  })
  console.log(res)
})()