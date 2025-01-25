import { AppRoutes } from '@/constant/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CityCountry = () => {
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await axios.get(AppRoutes?.cityAndCountry);
                console.log("data=>>>>", data);                
                setCities(data.cities || []);
                setCountries(data.countries || []);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return [cities, countries];
};

export default CityCountry;
