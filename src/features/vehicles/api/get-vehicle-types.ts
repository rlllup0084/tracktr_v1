import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}