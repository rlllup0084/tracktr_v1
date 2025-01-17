import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleEpaClasses = () => {
    const query = useQuery({
        queryKey: ['vehicle-epa-classes'],
        queryFn: async () => {
        const response = await client.api.vehicles.epa_classes.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle EPA classes');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}