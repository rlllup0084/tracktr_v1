import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleSizes = () => {
    const query = useQuery({
        queryKey: ['vehicle-sizes'],
        queryFn: async () => {
        const response = await client.api.vehicles.vehicle_sizes.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle sizes');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}