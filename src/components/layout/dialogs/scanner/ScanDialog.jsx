// @ts-check
import * as React from 'react'
import { Dialog, DialogContent, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Header from '@components/layout/general/Header'
import Footer from '@components/layout/general/Footer'

import { useScanStore } from './store'

const { setScanMode } = useScanStore.getState()

export default function ScanDialog() {
  const { t } = useTranslation()
  const scanNext = useScanStore((s) => s.scanNextMode)
  const scanZone = useScanStore((s) => s.scanZoneMode)

  const scanMode = React.useMemo(
    () => scanNext || scanZone,
    [scanNext, scanZone],
  )

  const handleClose = React.useCallback(() => {
    if (scanNext) return setScanMode('scanNextMode')
    if (scanZone) return setScanMode('scanZoneMode')
  }, [scanNext, scanZone])

  return (
    <Dialog
      onClose={handleClose}
      open={['confirmed', 'loading', 'error'].includes(scanMode)}
      maxWidth="xs"
    >
      <Header titles={[`scan_${scanMode}_title`]} action={handleClose} />
      <DialogContent className="flex-center" sx={{ mt: 2 }}>
        <Typography variant="subtitle1" align="center">
          {t(`scan_${scanMode}`)}
        </Typography>
      </DialogContent>
      <Footer
        role="alertdialog"
        options={[
          {
            name: 'close',
            icon: 'Clear',
            color: 'primary',
            align: 'right',
            action: handleClose,
          },
        ]}
      />
    </Dialog>
  )
}
