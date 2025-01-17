import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleMarketClasses = () => {
    const query = useQuery({
        queryKey: ['vehicle-market-classes'],
        queryFn: async () => {
        const response = await client.api.vehicles.market_classes.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle market classes');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}