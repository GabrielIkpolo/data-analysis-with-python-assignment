import React, { useState, useEffect } from 'react';
import './DiabetesForm.css'

function DiabetesForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    Age: '',
    BMI: '',
    Systolic_BP: '',
    Diastolic_BP: '',
    Hypertension: false,
    Obesity: false
  });

  // Automatically update conditions based on vitals
  useEffect(() => {
    const bmi = parseFloat(formData.BMI);
    const systolic = parseFloat(formData.Systolic_BP);
    const diastolic = parseFloat(formData.Diastolic_BP);

    setFormData(prev => ({
      ...prev,
      Obesity: !prev.Obesity && bmi >= 30 ? true : prev.Obesity,
      Hypertension: !prev.Hypertension && (systolic >= 140 || diastolic >= 90) ? true : prev.Hypertension
    }));
  }, [formData.BMI, formData.Systolic_BP, formData.Diastolic_BP]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const formattedData = {
      Age: parseFloat(formData.Age),
      BMI: parseFloat(formData.BMI),
      Systolic_BP: parseFloat(formData.Systolic_BP),
      Diastolic_BP: parseFloat(formData.Diastolic_BP),
      Hypertension: formData.Hypertension,
      Obesity: formData.Obesity
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
                  value={formData.Age}
                  onChange={handleChange}
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
                  value={formData.BMI}
                  onChange={handleChange}
                />
                <span className="hint">Obesity: BMI ≥ 30</span>
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
                  value={formData.Systolic_BP}
                  onChange={handleChange}
                />
                <span className="hint">Hypertension: ≥ 140 mmHg</span>
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
                  value={formData.Diastolic_BP}
                  onChange={handleChange}
                />
                <span className="hint">Hypertension: ≥ 90 mmHg</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Medical Conditions</h3>

            <div className="form-group">
              <label htmlFor="hypertension">Hypertension</label>
              <select id="hypertension" name="Hypertension" required value={formData.Hypertension ? "true" : "false"} onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="obesity">Obesity</label>
              <select id="obesity" name="Obesity" required value={formData.Obesity ? "true" : "false"} onChange={handleChange}>
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
