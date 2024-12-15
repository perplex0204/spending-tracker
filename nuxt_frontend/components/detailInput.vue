<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
// import 'element-plus/theme-chalk/el-date-picker.css';

const props = defineProps({
    dialog: {
        type: Boolean,
        default: false,
    },
});

const authStore = ref();
const emit = defineEmits(['update:dialog']);

const localDialog = ref(false);
const time = ref(new Date());
const inputAmount = ref<number | null>(null);
const inputType = ref<string | null>(null);
const inputDescription = ref<string | null>(null);

// 驗證規則：金額只能是數字
const amountRules = [(value: number) => !isNaN(value) || '金額必須是數字'];

// panel
const autoRepeatInterval = ref<string | null>(null);
const autoRepeatUntil = ref(false);
const autoRepeatUntilDate = ref<Date | null>(null);
const tempUserList = ['用戶1', '用戶2', '用戶3'];
const cosumeBy = ref({
    userType: '',
    username: null,
});

const typeList = ref([]);

const addDisabled = computed(() => {
    return !inputAmount.value || !inputType.value;
});

watch(
    () => props.dialog,
    (val) => {
        localDialog.value = val;
        inputAmount.value = null;
        inputType.value = null;
        inputDescription.value = null;
        time.value = new Date();
        typeList.value = authStore.value.userData.user_data.type;
    }
);

watch(
    () => localDialog.value,
    (val) => {
        if (!val) {
            emit('update:dialog', val);
        }
    }
);

function test() {
    axios
        .post('/api/add_spending', {
            time: time.value,
            amount: inputAmount.value,
            type: inputType.value,
            description: inputDescription.value,
            recorder: 'admin',
            group: [],
            repeat: {},
            split: {},
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

function formatDateToChinese(time: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
    return time.toLocaleDateString('zh-CN', options);
}

onMounted(async () => {
    const useAuthStore = await authStorePromise;
    authStore.value = useAuthStore();
});
</script>

<template>
    <v-dialog max-width="1000" v-model="localDialog">
        <v-card class="d-flex flex-row">
            <div class="w-50 m-2">
                <div class="d-flex justify-content-center">
                    <v-btn class="flex-grow-1 mx-2" @click="time = new Date(time.setDate(time.getDate() - 1))">往前一天</v-btn>
                    <v-btn class="flex-grow-1 mx-2" @click="date = new Date()">今日</v-btn>
                    <v-btn class="flex-grow-1 mx-2" @click="time = new Date(time.setDate(time.getDate() + 1))">往後一天</v-btn>
                </div>
                <div class="d-flex justify-content-center">
                    <v-date-picker v-model="time" show-adjacent-months>
                        <template v-slot:title></template>
                        <template v-slot:header>
                            <transition name="fade" mode="out-in">
                                <div :key="time.toISOString()" class="d-flex justify-content-center fs-1">
                                    {{ formatDateToChinese(time) }}
                                </div>
                            </transition>
                        </template>
                    </v-date-picker>
                </div>
            </div>
            <div class="w-50 m-2 d-flex flex-column justify-content-between">
                <div>
                    <div class="mx-4 my-2">
                        <v-select v-model="inputType" label="種類" :items="typeList" variant="underlined" hide-details item-title="name" item-value="name">
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-bind="props" :title="item.raw.name">
                                    <template v-slot:prepend>
                                        <v-icon :icon="item.raw.icon" :color="item.raw.color"></v-icon>
                                    </template>
                                </v-list-item>
                            </template>
                            <template v-slot:selection="{ item }">
                                <v-icon :icon="item.raw.icon" :color="item.raw.color" class="mr-2"></v-icon>
                                {{ item.raw.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="m-2">
                        <v-text-field v-model="inputDescription" class="m-2" label="敘述" variant="underlined" hide-details></v-text-field>
                    </div>
                    <div class="m-2">
                        <v-text-field v-model="inputAmount" class="m-2" :rules="amountRules" label="金額" variant="underlined"></v-text-field>
                    </div>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-title>
                                <template v-slot:default="{ expanded }">
                                    <v-row no-gutters>
                                        <v-col class="d-flex justify-start" cols="4"> 自動重複 </v-col>
                                        <v-col class="text-grey" cols="8">
                                            <v-fade-transition leave-absolute>
                                                <span v-if="expanded" key="0"> 這是經常性開銷嗎？ </span>
                                                <span v-else key="1">
                                                    <div>
                                                        {{ autoRepeatInterval !== '不重複' ? '開啟' : '關閉' }}
                                                        <span v-if="autoRepeatInterval !== '不重複'">，{{ autoRepeatInterval }}</span>
                                                    </div>
                                                </span>
                                            </v-fade-transition>
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-select :items="['不重複', '每週重複', '雙週重複', '每月重複', '每季重複', '每年重複']" v-model="autoRepeatInterval" label="自動重複間隔" hide-details variant="underlined"></v-select>
                                <div class="d-flex align-items-center">
                                    <v-switch v-model="autoRepeatUntil" :label="autoRepeatUntil ? '重複直到' : '不設定結束日期'" hide-details inset> </v-switch>
                                    <!-- <el-date-picker v-model="autoRepeatUntilDate" class="ms-4" :teleported="false" size="small" v-if="autoRepeatUntil"></el-date-picker> -->
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-title v-slot="{ expanded }">
                                <v-row no-gutters>
                                    <v-col class="d-flex justify-start" cols="4"> 帳戶選擇 </v-col>
                                    <v-col class="text-grey" cols="8">
                                        <v-fade-transition leave-absolute>
                                            <span v-if="expanded" key="0"> 開銷的消費者是? </span>
                                            <span v-else key="1">
                                                {{ cosumeBy.userType ? cosumeBy.userType : '存入共同帳戶' }}
                                            </span>
                                        </v-fade-transition>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <div class="d-flex w-100 align-items-center">
                                    <v-btn-toggle class="w-100" v-model="cosumeBy.userType">
                                        <v-btn class="flex-grow-1" value="單一用戶"> 單一 </v-btn>
                                        <v-btn class="flex-grow-1" value="均分開銷"> 均分 </v-btn>
                                        <v-btn class="flex-grow-1" value="比例分配"> 比例 </v-btn>
                                        <v-btn class="flex-grow-1" value="金額分配"> 金額 </v-btn>
                                    </v-btn-toggle>
                                </div>
                                <v-select v-if="cosumeBy.userType === '單一用戶'" label="請選擇用戶" v-model="cosumeBy.username" :items="tempUserList" variant="underlined" chips flat class="ms-4"></v-select>
                                <div v-else-if="cosumeBy.userType === '比例分配' || cosumeBy.userType === '金額分配'">
                                    <!-- v-for當前群組 -->
                                    <v-text-field v-model="cosumeBy.username" label="請輸入比例" variant="underlined" hide-details></v-text-field>
                                </div>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
                <v-btn @click="test" :disabled="addDisabled">確定新增</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>
