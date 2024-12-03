<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import calandar from "@/views/index/calandar.vue";
import itemTable from "@/views/index/itemTable.vue";
import expensesPie from "@/views/index/expensesPie.vue";
</script>

<template>
	<div class="w-100 mh-100 d-flex">
		<div class="col-8">
			<calandar></calandar>
		</div>
		<div class="col-4">
			<itemTable></itemTable>
			<expensesPie></expensesPie>
		</div>
	</div>
</template>
