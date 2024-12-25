import { useAuthStore } from './authStore';

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
    _id: string;
    group_name: string;
    fast_input: FastInputData[];
    member: UserData[];
    type: any[];
}

export const useWebStatusStore = defineStore('webStatus', {
    state: () => ({
        isLoading: false,
        userData: null,
        currentGroup: null,
        groupList: [] as GroupData[],
    }),
    actions: {
        async getGroupList() {
            const authStore = useAuthStore();
            console.log(authStore.userId);
            const response = await $fetch<{ data: GroupData[] }>('/api/get_group', {
                method: 'POST',
                body: {
                    user_id: authStore.userId,
                },
            });
            this.groupList = response.data;
            console.log(response);
            console.log(this.groupList);
        },
    },
});
