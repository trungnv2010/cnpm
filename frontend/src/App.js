import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CartProvider } from "@/context/CartContext";

import { store } from "@/store";

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartProvider>
          <Router>
            <AppRoutes />
          </Router>
        </CartProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
