import './RecoveryForm.css'

function RecoveryForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    
    // Convert types to match the backend model requirements
    const formattedData = {
      Age: parseFloat(data.Age),
      Admission_Temp: parseFloat(data.Admission_Temp),
      Parasite_Density: parseFloat(data.Parasite_Density),
      High_Fever: data.High_Fever === 'true',
      Severe_Density: data.Severe_Density === 'true',
      Treatment_Protocol: data.Treatment_Protocol
    }
    onSubmit(formattedData)
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Patient Recovery Forecast</h2>
          <p>Predict expected length of hospital stay</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Patient Demographics</h3>

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
                <label htmlFor="temp">Admission Temperature (°C)</label>
                <input
                  type="number"
                  id="temp"
                  name="Admission_Temp"
                  step="0.1"
                  min="35"
                  max="45"
                  required
                  placeholder="Enter temperature"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Medical Indicators</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="parasites">Parasite Density</label>
                <input
                  type="number"
                  id="parasites"
                  name="Parasite_Density"
                  min="0"
                  max="1000000"
                  required
                  placeholder="Enter parasite density"
                />
              </div>

              <div className="form-group">
                <label htmlFor="highFever">High Fever</label>
                <select id="highFever" name="High_Fever" required>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="severeDensity">Severe Density</label>
                <select id="severeDensity" name="Severe_Density" required>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="protocol">Treatment Protocol</label>
                <select id="protocol" name="Treatment_Protocol" required>
                  <option value="">Select protocol</option>
                  <option value="Quinine_IV">Quinine IV</option>
                  <option value="ACT_plus_Antibiotic">ACT + Antibiotic</option>
                  <option value="ACT_Only">ACT Only</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Predict Recovery
            </button>
          </div>
        </form>
      </div>

      <div className="info-card">
        <h3 className="info-title">📋 Information</h3>
        <ul className="info-list">
          <li>Uses Linear Regression Model</li>
          <li>Predicts recovery days based on clinical indicators</li>
          <li>Features: Age, Admission Temp, Parasite Density, Fever/Density status, Treatment Protocol</li>
          <li>R² Score: 0.82 (Good fit)</li>
        </ul>
      </div>
    </div>
  )
}

export default RecoveryForm
