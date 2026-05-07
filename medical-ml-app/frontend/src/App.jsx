import { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import DiabetesForm from './pages/DiabetesForm'
import RecoveryForm from './pages/RecoveryForm'
import ResultsCard from './components/ResultsCard'
import LoadingSpinner from './components/LoadingSpinner'
import Toast from './components/Toast'
import './styles/global.css'

function App() {
  const [currentTab, setCurrentTab] = useState('diabetes')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="app">
      <Header />
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="main-content">
        {currentTab === 'diabetes' ? (
          <DiabetesForm
            onSubmit={(data) => {
              setLoading(true)
              fetch('/api/predict/diabetes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((data) => {
                  setResults(data)
                  showToast('Diabetes prediction complete!')
                })
                .catch((err) => {
                  showToast('Prediction failed. Please try again.', 'error')
                  console.error(err)
                })
                .finally(() => setLoading(false))
            }}
          />
        ) : (
          <RecoveryForm
            onSubmit={(data) => {
              setLoading(true)
              fetch('/api/predict/recovery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((data) => {
                  setResults(data)
                  showToast('Recovery prediction complete!')
                })
                .catch((err) => {
                  showToast('Prediction failed. Please try again.', 'error')
                  console.error(err)
                })
                .finally(() => setLoading(false))
            }}
          />
        )}
        {results && !loading && (
          <ResultsCard
            results={results}
            onClose={() => setResults(null)}
            type={currentTab}
          />
        )}
        {loading && <LoadingSpinner />}
        {toast && <Toast message={toast.message} type={toast.type} />}
      </main>
    </div>
  )
}

export default App
