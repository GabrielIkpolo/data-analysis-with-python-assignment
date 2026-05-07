import './LoadingSpinner.css'

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">Processing prediction...</p>
        <p className="loading-subtext">This may take a few seconds</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
