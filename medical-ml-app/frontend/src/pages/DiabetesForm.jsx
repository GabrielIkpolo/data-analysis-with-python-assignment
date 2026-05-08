import './DiabetesForm.css'

function DiabetesForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    
    // Convert types to match the backend model requirements
    const formattedData = {
      Age: parseFloat(data.Age),
      BMI: parseFloat(data.BMI),
      Systolic_BP: parseFloat(data.Systolic_BP),
      Diastolic_BP: parseFloat(data.Diastolic_BP),
      Hypertension: data.Hypertension === 'true',
      Obesity: data.Obesity === 'true'
    }
    onSubmit(formattedData)
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Diabetes Risk Assessment</h2>
          <p>Predict diabetes risk based on patient vitals</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Patient Demographics</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age (years)</label>
                <input
                  type="number"
                  id="age"
                  name="Age"
                  min="1"
                  max="120"
                  required
                  placeholder="Enter age"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bmi">BMI</label>
                <input
                  type="number"
                  id="bmi"
                  name="BMI"
                  step="0.1"
                  min="10"
                  max="70"
                  required
                  placeholder="Enter BMI"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="systolic">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  id="systolic"
                  name="Systolic_BP"
                  min="50"
                  max="250"
                  required
                  placeholder="Enter systolic BP"
                />
              </div>

              <div className="form-group">
                <label htmlFor="diastolic">Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  id="diastolic"
                  name="Diastolic_BP"
                  min="30"
                  max="150"
                  required
                  placeholder="Enter diastolic BP"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Medical Conditions</h3>

            <div className="form-group">
              <label htmlFor="hypertension">Hypertension</label>
              <select id="hypertension" name="Hypertension" required>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="obesity">Obesity</label>
              <select id="obesity" name="Obesity" required>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Predict Risk
            </button>
          </div>
        </form>
      </div>

      <div className="info-card">
        <h3>📋 Information</h3>
        <ul>
          <li>Uses Decision Tree Classifier</li>
          <li>Predicts diabetes risk based on vitals</li>
          <li>Features: Age, BMI, Blood Pressure (Systolic/Diastolic), Hypertension, Obesity</li>
          <li>High accuracy for clinical decision support</li>
        </ul>
      </div>
    </div>
  )
}

export default DiabetesForm
