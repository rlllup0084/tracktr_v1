import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehiclePrimaryBodyTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-primary-body-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.primary_body_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle primary body types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}