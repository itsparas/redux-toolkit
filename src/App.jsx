import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/ui/uiSlice';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WhatIsRTK from './pages/basics/WhatIsRTK';
import ReduxVsRTK from './pages/basics/ReduxVsRTK';
import StoreConcept from './pages/basics/StoreConcept';
import ConfigureStorePage from './pages/setup/ConfigureStorePage';
import DevToolsMiddleware from './pages/setup/DevToolsMiddleware';
import CreateSlicePage from './pages/slices/CreateSlicePage';
import ImmerPage from './pages/slices/ImmerPage';
import ProviderPage from './pages/integration/ProviderPage';
import UseSelectorDispatchPage from './pages/integration/UseSelectorDispatchPage';
import ActionsReducersPage from './pages/actions/ActionsReducersPage';
import FeatureOrganizationPage from './pages/actions/FeatureOrganizationPage';
import AsyncThunkPage from './pages/async/AsyncThunkPage';
import AsyncDemoPage from './pages/async/AsyncDemoPage';
import RTKQueryIntroPage from './pages/rtkquery/RTKQueryIntroPage';
import RTKQueryDemoPage from './pages/rtkquery/RTKQueryDemoPage';
import StateDesignPage from './pages/statedesign/StateDesignPage';
import MiddlewarePage from './pages/middleware/MiddlewarePage';
import BestPracticesPage from './pages/bestpractices/BestPracticesPage';
import CommonMistakesPage from './pages/bestpractices/CommonMistakesPage';
import './App.css';

function App() {
  const theme = useSelector(selectTheme);

  return (
    <BrowserRouter>
      <div className={`app app--${theme}`}>
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/what-is-rtk" element={<WhatIsRTK />} />
            <Route path="/redux-vs-rtk" element={<ReduxVsRTK />} />
            <Route path="/store" element={<StoreConcept />} />
            <Route path="/configure-store" element={<ConfigureStorePage />} />
            <Route path="/devtools-middleware" element={<DevToolsMiddleware />} />
            <Route path="/create-slice" element={<CreateSlicePage />} />
            <Route path="/immer" element={<ImmerPage />} />
            <Route path="/provider" element={<ProviderPage />} />
            <Route path="/use-selector-dispatch" element={<UseSelectorDispatchPage />} />
            <Route path="/actions-reducers" element={<ActionsReducersPage />} />
            <Route path="/feature-organization" element={<FeatureOrganizationPage />} />
            <Route path="/async-thunk" element={<AsyncThunkPage />} />
            <Route path="/async-demo" element={<AsyncDemoPage />} />
            <Route path="/rtk-query-intro" element={<RTKQueryIntroPage />} />
            <Route path="/rtk-query-demo" element={<RTKQueryDemoPage />} />
            <Route path="/state-design" element={<StateDesignPage />} />
            <Route path="/middleware" element={<MiddlewarePage />} />
            <Route path="/best-practices" element={<BestPracticesPage />} />
            <Route path="/common-mistakes" element={<CommonMistakesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
