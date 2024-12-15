interface UserData {
    user_id: number;
    user_name: string;
    user_type: string;
}

interface FastInputData {
    time: Date;
    amount: number;
    type: string;
    description: string;
    recorder: string;
    group: string[];
    repeat: {};
}

interface GroupData {
    group_id: number;
    group_name: string;
    group_users: [];
}

export const useWebStatusStore = defineStore('webStatus', {
    state: () => ({
        isLoading: false,
        userData: null,
        currentGroup: null,
    }),
});
