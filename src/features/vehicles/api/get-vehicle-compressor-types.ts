import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleCompressorTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-vehicle-compressor-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.compressor_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle compressor types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}