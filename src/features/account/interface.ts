// import { z } from "zod";
// import { createAccountSchema } from "./schema";
import { Account } from "./types";

export interface AccountStepProps {
    onLoadingChange: (loading: boolean) => void;
    onSubmit: () => void;
    isUpdating: boolean;
    data: Account;
}