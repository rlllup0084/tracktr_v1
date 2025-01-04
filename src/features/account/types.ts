import { Models } from "node-appwrite";

export type Account = Models.Document & {
    company_name: string,
    fleet_size: string,
    industry:  string,
    company_role:  string,
    goals:  string,
    enable_demo_data: boolean,
    steps_done: number,
};