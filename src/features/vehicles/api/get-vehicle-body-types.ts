import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleBodyTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-body-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.body_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle body types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}