<template>
    <div class="flex w-full h-full overflow-hidden">
        <div class="w-2/3">
            <calandar></calandar>
        </div>
        <div class="w-1/3">
            <itemTable></itemTable>
            <expensesPie></expensesPie>
        </div>
    </div>
</template>

<script setup lang="ts">
import calandar from '@/components/dashboard/calandar.vue';
import itemTable from '@/components/dashboard/itemTable.vue';
import expensesPie from '@/components/dashboard/expensesPie.vue';
</script>
