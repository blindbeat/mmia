import Image from "next/image"
import photo from "assets/dummyPics/building/1.png"
import styles from "./BuildingPhoto.module.css"

const BuildingPhoto = () => {
  return <Image src={photo} alt="" className={styles.content} />
}

export default BuildingPhoto
