const router = require('express').Router()
const { Link } = require('../db/model')
const { getIp, visitPage } = require('../utils')

const LINKS_API = '/api/links'
const FAKE_API = '/api/fake'
const INFO_API = '/api/info'

// Info API
router.get(INFO_API, (req, res) =>{
  return res.json({ 
    ip: getIp() 
  })
})

// Fake Visit API
router.get(FAKE_API, (req, res) =>{
  Link.find()
  .then(links => {
    links.forEach(link => {
      visitPage(link.url)
      link.count = link.count + 1
      link.save()
      .catch(error => console.error(error))
    })
  })
  .then(() => res.status(200).send('done'))
  .catch(error => {
    console.log(error)
    return res.status(500).send('error')
  })
})

// Links API
router.get(LINKS_API, (req, res) => {
  Link.find()
  .then(links => res.json(links))
  .catch(error => res.status(500).json({ message: error }))
})

router.post(LINKS_API, (req, res) => {
  const link = new Link({
    url: req.body.url,
  })
  link.save()
  .then(savedLink => res.json(savedLink))
  .catch(error => {
    console.error(error)
    res.status(500).json({ message: error })
  })
})

router.get(`${LINKS_API}/:linkId`, (req, res) => {
  Link.findOne({ _id: req.params.linkId })
  .then(link => res.json(link))
  .catch(() => res.status(404).send())
})

router.delete(LINKS_API, (req, res) => {
  Link.deleteOne({ _id: req.params.linkId })
  .then(res.json)
  .catch(() => res.status(404).send())
})

module.exports = router