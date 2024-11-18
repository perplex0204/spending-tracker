<script setup lang="ts">
import { ref } from "vue";
import typeCard from "@/views/setting/typeCard.vue";

const tab = ref("option-1");
const items = ref(["option-1", "option-2"]);
</script>

<template>
	<v-card>
		<v-tabs bg-color="indigo-darken-2" v-model="tab">
			<v-tab text="記帳設定"></v-tab>
			<v-tab text="Another Option"></v-tab>
		</v-tabs>
		<v-tabs-window v-model="tab">
			<v-tabs-window-item value="option-1">
				<div class="d-flex flex-column m-2">
					<typeCard />
				</div>
			</v-tabs-window-item>
			<v-tabs-window-item value="option-2">
				<v-card color="basil" flat>
					<v-card-text>123</v-card-text>
				</v-card>
			</v-tabs-window-item>
		</v-tabs-window>
	</v-card>
</template>

<style scoped></style>
