import styles from './ErrorContainer.module.css'

const ErrorContainer = ({ children }) => {
  return (
    <div>
      <p className={styles.errorMessage}>{children}</p>
    </div>
  )
}

export default ErrorContainer
