import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import AuthProvider from './auth/AuthProvider';
import RouteMenu from './routes/RouteMenu';
import store, { persistor } from './store';

function App() {
  return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AuthProvider>
					<BrowserRouter>
						<div className="flex flex-col min-h-screen h-full">
							<RouteMenu/>
						</div>
					</BrowserRouter>
				</AuthProvider>
			</PersistGate>
		</Provider>
	);
}

export default App
