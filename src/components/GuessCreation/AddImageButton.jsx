import styles from '../../components/UI/Buttons/AddNew.module.css'

const AddImageButton = ({ handleImageInput }) => (
  <label className={styles.addNewButton}>
    <input className="fileInput" type="file" accept="image/*" onChange={handleImageInput} />
  </label>
)

export default AddImageButton
