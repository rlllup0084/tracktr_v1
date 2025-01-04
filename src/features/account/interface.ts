import { Account } from "./types";

export interface AccountStepProps {
    onLoadingChange: (loading: boolean) => void;
    onSubmit: () => void;
    isUpdating: (updating: boolean) => void;
    data: Account;
}