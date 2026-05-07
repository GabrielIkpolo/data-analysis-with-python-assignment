import './Navigation.css'

function Navigation({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: 'diabetes', name: 'Diabetes Prediction' },
    { id: 'recovery', name: 'Patient Recovery Forecast' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
