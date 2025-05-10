<script setup lang="ts">
import Table from '@/composables/Table.vue';
import { TableCell, TableHead, TableRow } from './ui/table';
import { useAbsenStore } from '@/stores/absen';
import { onMounted, ref, type Ref } from 'vue';
import { Button } from './ui/button';
import Dialogg from '@/composables/Dialogg.vue';
import { useModalStore } from '@/stores/modal';
import { DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import Swal from 'sweetalert2';


const useModal = useModalStore()
const useAbsen = useAbsenStore()

const statusItems = [
  {
    name:'Alpha',
    value:'ALPHA'
  },
  {
    name:'Sakit',
    value:'SAKIT'
  },
  {
    name:'Izin',
    value:'IZIN'
  },
  {
    name:'Hadir',
    value:'HADIR'
  }
]
const selectedStatus:Ref<string | null> = ref(null)

  async function handleAbsen(){
    try {
      
      await useAbsen.absenUser(selectedStatus.value || 'ALPHA')
      await useAbsen.fetchAbsenByUser()
      useModal.closeModal()
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Absen berhasil',
      })
    } catch (error:any) {
      const status = error.response?.status
      if(status === 400){
        useModal.closeModal()
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Absen gagal',
        })
        return
      }
    }
  }

  function getLocalDateFormatted() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${year}-${month}-${day}`;
}

onMounted(async()=>{
  await useAbsen.fetchAbsenByUser()
})
</script>

<template>
  <main class="px-2">
    <p>{{ getLocalDateFormatted() }}</p>
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
          <TableCell v-if="absen.absens_status === false && absen.tanggal.split('T')[0] === getLocalDateFormatted()" class="text-right py-2 pr-5">
            <Dialogg :is-open="useModal.isOpen('addAbsen')">
              <template #trigger>
                <Button @click="useModal.openModal('addAbsen')" variant="destructive">Absen</Button>
              </template>
              <template #content>
                <DialogTitle class="text-center">Absen</DialogTitle>
                <p>Lakukan absensi sesuai jadwal dan sesuai kedadaan kamu</p>
                <div class="gap-x-2 flex" v-for="item in statusItems" :key="item.value" >
                  <input type="radio" 
                  :value="item.value"
                  v-model="selectedStatus"
                  name="status"   
                  />
                    <Label class="capitalize">{{ item.name }}</Label>
                </div>
              </template>
              <template #footer>
                <Button @click="useModal.closeModal()" variant="outline">Absen</Button>
                <Button @click="handleAbsen" class="bg-green-600">Absen</Button>
              </template>
            </Dialogg>
          </TableCell>
          <TableCell class="text-right py-2 pr-5"  v-else-if="absen.absens_status === false && absen.status === 'ALPHA' ">
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