<script setup lang="ts">
import Table from '@/composables/Table.vue';
import { TableCell, TableHead, TableRow } from './ui/table';
import { useAbsenStore } from '@/stores/absen';
import { onMounted } from 'vue';
import DropDwn from '@/composables/DropDwn.vue';


const useAbsen = useAbsenStore()
onMounted(async()=>{
  await useAbsen.fetchAbsenByUser()
})
</script>

<template>
  <p>{{ new Date().toISOString() }}</p>
  <main class="px-2">
    <div class="py-4">
      <h3 class="text-3xl text-black/90">
        Absensi Kelas X-PPLG 2
      </h3>
      <p class="py-2 font-semibold text-sm opacity-80">Lakukan absensi sesuai jadwal secara default absensi akan bernilai alpha</p>
    </div>
    <Table>
      <template #header>
        <TableRow class=" bg-gray-600/10">
          <TableHead class="text-black text-lg">Date</TableHead>
          <TableHead class="text-black text-lg">Description</TableHead>
          <TableHead class="text-black text-lg">Status</TableHead>
          <TableHead class="text-right text-lg text-black">Action</TableHead>
        </TableRow>
      </template>
      <template #body>
        <TableRow v-for="absen in useAbsen.absensData" :key="absen.id">
          <TableCell class="py-2">{{ absen.tanggal.split('T')[0] }}</TableCell>
          <TableCell class="py-2">Class session</TableCell>
          <TableCell v-if="absen.status==='ALPHA'" class="py-2">?</TableCell>
          <TableCell v-else class="py-2">{{ absen.status }}</TableCell>
          <TableCell v-if="absen.absens_status === 'FALSE' || absen.tanggal.split('T')[0] === new Date().toISOString().split('T')[0] " class="text-right py-2 pr-5">
            <DropDwn >
              <template #trigger>
                Absens
              </template>
            </DropDwn>
          </TableCell>
          <TableCell class="text-right py-2 pr-5"  v-else-if="absen.absens_status === 'TRUE' || absen.status === 'ALPHA' ">
            --
          </TableCell>
          <TableCell class="text-right py-2 pr-5" v-else >
            Self - recorded
          </TableCell>
        </TableRow>
      </template>
    </Table>
  </main>
</template>