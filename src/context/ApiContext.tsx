import { createContext, useContext } from "react";
import { ApiService } from "../types/api";

// Create context
const ApiContext = createContext<ApiService | null>(null);

// Context provider component
export function ApiProvider({ 
  children, 
  api 
}: { 
  children: React.ReactNode; 
  api: ApiService 
}) {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

// Custom hook to use the API context
export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}