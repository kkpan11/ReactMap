// @ts-check
import * as React from 'react'

import { useStatic, useStore } from '@hooks/useStore'
import Utility from '@services/Utility'
import FilterPermCheck from './QueryData'

export default function Map() {
  Utility.analytics(window.location.pathname)

  const ready = useStatic((s) => !!s.map && !!s.Icons)
  const ui = useStatic((s) => s.ui)
  const profiling = useStore((s) => s.profiling)

  if (!ready) return null
  return (
    <>
      {Object.keys({ ...ui, ...ui.wayfarer, ...ui.admin }).map((category) => {
        if (category === 'settings') return null
        return process.env.NODE_ENV === 'development' && profiling ? (
          <React.Profiler
            key={category}
            id={category}
            onRender={(id, phase, actualDuration, baseDuration) => {
              // eslint-disable-next-line no-console
              console.log(`[Profiler] ${id} (${phase})`, {
                actualDuration,
                baseDuration,
              })
            }}
          >
            <FilterPermCheck key={category} category={category} />
          </React.Profiler>
        ) : (
          <FilterPermCheck key={category} category={category} />
        )
      })}
    </>
  )
}
