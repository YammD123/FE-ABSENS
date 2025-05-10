<script setup lang="ts">
import Table from '@/composables/Table.vue';
import { TableCell, TableRow } from './ui/table';
import { useAbsenStore } from '@/stores/absen';
import { onMounted } from 'vue';
import Dialogg from '@/composables/Dialogg.vue';
import { useModalStore } from '@/stores/modal';
import { Button } from './ui/button';
import { Plus } from 'lucide-vue-next';
import Swal from 'sweetalert2';



const useAbsen = useAbsenStore()
const useModal = useModalStore()


async function handleAddAbsens(){
    try {
        await useAbsen.addAbsens()
        useModal.closeModal()
     Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Absen berhasil',
      })
    } catch (error:any) {
        console.log('error',error)
        const status = error.response?.status
        if(status === 400){
        console.log('error33')
        useModal.closeModal()
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Absen sudah ada',
      })
      return
        }
    }
}
onMounted(async()=>{
    await useAbsen.getAbsenToday()
})
</script>

<template>
    <main class="px-4 py-6">
        <div>
            <Dialogg :is-open="useModal.isOpen('addAbsenToday')">
                <template #trigger>
                    <Button @click="useModal.openModal('addAbsenToday')" variant="destructive">
                        <Plus class="h-4 w-4 mr-2" />
                        Add Absen
                    </Button>
                </template>
                <template #content>
                    <DialogTitle class="text-center">Add Absen</DialogTitle>
                    <DialogDescription >Apakah anda ingin menambahkan absen hari ini?</DialogDescription>
                </template>
                <template #footer>
                    <Button @click="useModal.closeModal" variant="outline">Cancel</Button>
                    <Button @click="handleAddAbsens" class="bg-green-600 hover:bg-gray-950/80" variant="destructive">Save</Button>
                </template>
            </Dialogg>
        </div>
        <div class="py-4">
            <h1 class="text-3xl font-semibold text-black/70">Absensi Hari ini</h1>
            <p>ini adalah data siswa yang absen hari ini</p>
        </div>

        <Table>
            <template #header>
                <TableRow class="bg-blue-600/45">
                    <TableCell>nama</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell class="text-right" >tanggal</TableCell>
                </TableRow>
            </template>
            <template #body>
                <TableRow v-for="absen in useAbsen.absenTodayData" :key="absen.id">
                    <TableCell>{{ absen.user.name }}</TableCell>
                    <TableCell>{{ absen.user.email }}</TableCell>
                    <TableCell>{{ absen.status }}</TableCell>
                    <TableCell class="text-right">{{ absen.tanggal.split('T')[0] }}</TableCell>
                </TableRow>
            </template>
        </Table>
    </main>
</template>