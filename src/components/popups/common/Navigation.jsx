import React from 'react'
import Map from '@mui/icons-material/Map'
import { IconButton } from '@mui/material'

import { useStore, useStatic } from '@hooks/useStore'

export default function Navigation({ lat, lon, size = 'large' }) {
  const url = useStore(
    (s) =>
      useStatic.getState().settings.navigation?.[s.settings.navigation]?.url,
  )
  return (
    <IconButton
      href={url.replace('{x}', lat).replace('{y}', lon)}
      target="_blank"
      rel="noreferrer"
      size={size}
      style={{ color: 'inherit' }}
    >
      <Map />
    </IconButton>
  )
}
