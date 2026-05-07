import './ResultsCard.css'

function ResultsCard({ results, onClose, type }) {
  if (!results) return null

  const getRiskLevel = (probability) => {
    if (probability >= 0.7) return { text: 'High Risk', color: 'danger', bgColor: '#fee2e2' }
    if (probability >= 0.5) return { text: 'Moderate Risk', color: 'warning', bgColor: '#fef3c7' }
    return { text: 'Low Risk', color: 'success', bgColor: '#d1fae5' }
  }

  const getDiagnosis = (prediction) => {
    if (prediction === 'High Risk') return { text: 'Diabetes Likely', icon: '⚠️' }
    if (prediction === 'Moderate Risk') return { text: 'Diabetes Possible', icon: '❓' }
    return { text: 'Low Risk / No Diabetes', icon: '✅' }
  }

  const risk = getRiskLevel(results.probability)
  const diagnosis = getDiagnosis(results.prediction)

  return (
    <div className="results-overlay">
      <div className="results-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="results-header">
          <div className="results-icon">{diagnosis.icon}</div>
          <div className="results-title">
            <h2>{type === 'diabetes' ? 'Diabetes Assessment' : 'Recovery Forecast'}</h2>
            <p>{diagnosis.text}</p>
          </div>
        </div>

        <div className="results-content">
          {type === 'diabetes' ? (
            <div className="diabetes-results">
              <div className="prediction-box">
                <span className="prediction-label">Prediction</span>
                <span className={`prediction-value ${risk.color}`}>
                  {results.prediction}
                </span>
              </div>

              <div className="probability-box">
                <span className="probability-label">Risk Probability</span>
                <div className="probability-bar">
                  <div
                    className="probability-fill"
                    style={{ width: `${results.probability * 100}%` }}
                  />
                </div>
                <span className="probability-value">{(results.probability * 100).toFixed(1)}%</span>
              </div>

              {results.confidence && (
                <div className="confidence-box">
                  <span className="confidence-label">Model Confidence</span>
                  <span className="confidence-value">{results.confidence}</span>
                </div>
              )}

              <div className="interpretation-box">
                <h3>📋 Clinical Interpretation</h3>
                {results.probability >= 0.7 ? (
                  <p>
                    Based on the patient's vitals, there is a high likelihood of diabetes. We recommend
                    further confirmatory testing including fasting blood glucose and HbA1c levels.
                  </p>
                ) : results.probability >= 0.5 ? (
                  <p>
                    The patient shows moderate risk factors for diabetes. Consider monitoring blood
                    pressure, BMI, and other risk indicators closely.
                  </p>
                ) : (
                  <p>
                    The patient's risk profile for diabetes appears low. Maintain healthy lifestyle
                    habits and regular health check-ups.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="recovery-results">
              <div className="prediction-box">
                <span className="prediction-label">Predicted Recovery Days</span>
                <span className="prediction-value">
                  {results.predicted_days.toFixed(1)} days
                </span>
              </div>

              {results.range && (
                <div className="confidence-box">
                  <span className="confidence-label">95% Confidence Interval</span>
                  <span className="confidence-value">
                    {results.range[0].toFixed(1)} - {results.range[1].toFixed(1)} days
                  </span>
                </div>
              )}

              {results.model && (
                <div className="model-info">
                  <span className="model-label">Model Used</span>
                  <span className="model-value">{results.model}</span>
                </div>
              )}

              {results.r_squared !== undefined && (
                <div className="r2-box">
                  <span className="r2-label">Model Performance (R²)</span>
                  <span className="r2-value">{results.r_squared.toFixed(2)}</span>
                </div>
              )}

              <div className="interpretation-box">
                <h3>📋 Clinical Interpretation</h3>
                <p>
                  Based on the patient's clinical indicators, the expected recovery period is approximately{' '}
                  <strong>{results.predicted_days.toFixed(1)} days</strong>.
                  {
                    results.predicted_days > 14
                      ? ' We recommend extended hospitalization and close monitoring.'
                      : ' The patient is expected to recover well within the standard care period.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="results-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsCard
