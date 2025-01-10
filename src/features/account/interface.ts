import { z } from "zod";
import { createAccountSchema } from "./schema";

export interface AccountStepProps {
    onLoadingChange: (loading: boolean) => void;
    onSubmit: () => void;
    isUpdating: boolean;
    data: z.infer<typeof createAccountSchema>;
}