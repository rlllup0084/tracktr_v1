import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicles = () => {
    const query = useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => {
        const response = await client.api.vehicles.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicles');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}