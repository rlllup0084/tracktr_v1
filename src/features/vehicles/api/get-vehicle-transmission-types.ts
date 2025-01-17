import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleTransmissionTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-transmission-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.transmission_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle transmission types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}