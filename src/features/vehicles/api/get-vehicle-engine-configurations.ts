import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleEngineConfigurations = () => {
    const query = useQuery({
        queryKey: ['vehicle-engine-configurations'],
        queryFn: async () => {
        const response = await client.api.vehicles.engine_configurations.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle engine configurations');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}