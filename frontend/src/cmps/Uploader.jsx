import { useState } from 'react'
import { useToggle } from '../hooks/useToggle'
import { cloudinaryService } from '../services/cloudinary.service.js'

export const Uploader = ({ onUpload }) => {

  const [isUploading, setIsUploading] = useToggle(false)
  const [imgUrl, setImgUrl] = useState('')

  const onUploadImg = async (ev) => {
    setIsUploading()
    const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0])
    setImgUrl(secure_url)
    setIsUploading()
    onUpload(ev, secure_url)
  }

  const uploadStyle = {
    backgroundImage: `url(${imgUrl})`,
  }
  return (
    <div className="uploader flex align-center justify-center"
      style={uploadStyle}>

      <label className="flex align-center justify-center" htmlFor="imageUploader">
        {imgUrl ? '' : (isUploading ? 'Uploading....' : <p className="flex col align-center justify-center" > <span className="plus"></span>choose profile picture <span></span> </p>)}
      </label>
      <input onChange={onUploadImg}
        type="file" accept="image/*" id="imageUploader" style={{ display: "none" }} name="imgUrl" />

    </div>
  )

}