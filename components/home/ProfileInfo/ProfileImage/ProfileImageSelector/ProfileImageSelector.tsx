import { useState } from 'react'
import { ProfileImageSelectorProps } from './ProfileImageSelector.types'
import { TabSelector } from './TabSelector'
import { TabUploadImage } from './TabUploadImage'

export function ProfileImageSelector(props: ProfileImageSelectorProps) {
  const { setShowDialog } = props

  const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null)

  return (
    <div className='pt-6'>
      {!showTab && <TabSelector setShowTab={setShowTab} />}

      {showTab === "upload" && <TabUploadImage setShowDialog={setShowDialog} setShowTab={setShowTab} />}

      {showTab === "delete" && (
        <div>
          <p>Delete image</p>
        </div>
      )}
    </div>
  )
}
