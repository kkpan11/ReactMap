const router = require('express').Router()

const config = require('@rm/config')
const { log, HELPERS } = require('@rm/logger')
const { loadLatestAreas } = require('../../../services/areas')

router.get('/reload', async (req, res) => {
  try {
    const newAreas = await loadLatestAreas()
    config.areas = newAreas

    res.status(200).json({ status: 'ok', message: 'reloaded areas' })
  } catch (e) {
    log.error(HELPERS.api, req.originalUrl, e)
    res.status(500).json({ status: 'error', reason: e.message })
  }
})

module.exports = router
