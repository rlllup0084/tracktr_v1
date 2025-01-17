import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleFuelTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-fuel-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.fuel_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle fuel types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}