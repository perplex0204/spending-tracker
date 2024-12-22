<template>
    <div class="flex w-full h-screen mx-auto">
        <SidebarMenu :menu="menu" style="position: static" :collapsed="sidebarStatus" @update:collapsed="onToggleCollapse" />
        <div class="flex-1 flex flex-col">
            <header class="bg-gray-100 flex justify-between">
                <router-link to="/">
                    <img src="@/assets/img/SPS_Logo.png" style="width: 200px" />
                </router-link>
                <div class="flex align-center">
                    <v-btn @click="test">test</v-btn>
                    <div class="mx-4">
                        <v-speed-dial location="left center" transition="slide-y-transition">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn v-bind="activatorProps">快速記帳</v-btn>
                            </template>
                            <v-btn key="1" icon="$success"></v-btn>
                        </v-speed-dial>
                    </div>
                    <v-btn class="mx-4" @click="onToggleDialog">詳細記帳</v-btn>
                    <v-select width="16rem" class="mx-4" v-model="currentGroup" :items="authStore.groupList" :item-title="(item: GroupItem) => item.title" return-object label="目前群組" hide-details> </v-select>
                    <div class="mx-4">
                        <v-badge color="info" content="12">
                            <v-avatar color="brown" size="large" rounded="0">
                                <span class="text-h5">{{ getUserInitial }}</span>
                            </v-avatar>
                        </v-badge>
                    </div>
                </div>
            </header>

            <main class="flex-1 overflow-y-auto">
                <slot></slot>
            </main>

            <!-- <footer class="bg-gray-100 p-2 text-center">
                <p>© 2024 Your Website</p>
            </footer> -->
        </div>
        <!-- <addGroup :dialog="addGroupDialog" @update:dialog="updateAddGroupDialog"></addGroup>
        <detailInput :dialog="detailDialog" @update:dialog="updateDialog"></detailInput> -->
    </div>
</template>

<script setup lang="ts">
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

interface GroupItem {
    title: string;
}

const sidebarStatus = ref(false);
provide('sidebarStatus', sidebarStatus);

const detailDialog = ref(false);
const onToggleDialog = () => {
    console.log('onToggleDialog');
    detailDialog.value = true;
};
// const currentGroup = useState<GroupItem>('currentGroup');
const currentGroup = ref<GroupItem>({
    title: '個人',
});
const getUserInitial = ref('A');
const authStore = {
    groupList: [{ title: 'Group 1' }, { title: 'Group 2' }, { title: 'Group 3' }],
};

const menu = [
    {
        header: 'Main Navigation',
        icon: 'mdi-home',
        title: 'Home',
        to: '/',
    },
];

const test = async () => {
    console.log('test');
    const res = await $fetch('/api/test', {
        method: 'POST',
        body: {
            name: 'test',
        },
    });
    console.log(res);
};

function onToggleCollapse(collapsed: boolean) {
    sidebarStatus.value = collapsed;
    // if (sidebarStatus.value === false) {
    // 	blockStatus.value = false;
    // }
}
</script>
