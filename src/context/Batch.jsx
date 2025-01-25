import { createContext, useEffect, useState } from "react";

export const BatchContext = createContext();

function BatchContextProvider({ children }) {
  const [batches, setBatches] = useState([]);
  const [countriesAndCities, setCountriesAndCities] = useState({
    countries: [],
    cities: {},
  });

  useEffect(() => {
    const storedBatches = JSON.parse(localStorage.getItem("batches"));
    if (storedBatches) {
      setBatches(storedBatches);
    }
  }, []);

  useEffect(() => {
    if (batches.length > 0) {
      localStorage.setItem("batches", JSON.stringify(batches));
    }
  }, [batches]);

  useEffect(() => {
    countriesAndCities;
  }, []);

  return (
    <BatchContext.Provider value={{ setBatches, batches,  countriesAndCities, setCountriesAndCities }}>
      {children}
    </BatchContext.Provider>
  );
}

export default BatchContextProvider;
