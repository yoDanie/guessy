import styles from './Loader.module.css'
import { ReactComponent as LoaderIcon } from './cube-loader.svg'

const Loader = () => (
  <div className={styles.loaderWrapper}>
    <LoaderIcon className={styles.loader} />
  </div>
)

export default Loader
