import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleEngineTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-engine-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.engine_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle engine types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}