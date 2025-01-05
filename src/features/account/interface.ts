import { Account } from "./types";

export interface AccountStepProps {
    onLoadingChange: (loading: boolean) => void;
    onSubmit: () => void;
    isUpdating: boolean;
    data: Account;
}