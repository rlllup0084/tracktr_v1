import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleMakers = () => {
    const query = useQuery({
        queryKey: ['vehicle-makers'],
        queryFn: async () => {
        const response = await client.api.vehicles.makers.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle makers');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}