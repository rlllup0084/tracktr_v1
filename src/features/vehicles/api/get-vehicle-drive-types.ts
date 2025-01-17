import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicleDriveTypes = () => {
    const query = useQuery({
        queryKey: ['vehicle-drive-types'],
        queryFn: async () => {
        const response = await client.api.vehicles.drive_types.$get();
    
        if (!response.ok) {
            throw new Error('Failed to fetch vehicle drive types');
        }
    
        const result = await response.json();
    
        return result;
        },
    });
    
    return query;
}