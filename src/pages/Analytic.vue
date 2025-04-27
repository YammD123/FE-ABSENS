
<script setup lang="ts">
import DataUser from '@/composables/DataUser.vue';
import { useAbsenStore } from '@/stores/absen';
import { useUserStore } from '@/stores/user';
import { computed, onMounted} from 'vue';


const userStore = useUserStore()
const absenStore = useAbsenStore()

// / charts user
const series = computed(() => [
  userStore.data?.find(user=>user.name === "ADMIN")?.total?? 0,
  userStore.data?.find(user=>user.name === "USER")?.total?? 0
])

const chartOptions ={
  labels: ['Admin', 'User'],
}

// charts absen
const categories = computed(()=>Object.keys(absenStore.absensi))
const series2 = computed(()=>[
  {
    name:"HADIR",
    data:categories.value.map((tanggal)=>absenStore.absensi[tanggal]?.HADIR?? 0)
  },
  {
    name:"ALPHA",
    data:categories.value.map((tanggal)=>absenStore.absensi[tanggal]?.ALPHA?? 0)
  },
  {
    name:"IZIN",
    data:categories.value.map((tanggal)=>absenStore.absensi[tanggal]?.IZIN?? 0)
  },
  {
    name:"SAKIT",
    data:categories.value.map((tanggal)=>absenStore.absensi[tanggal]?.SAKIT?? 0)
  }
])
const chartOptions2 = computed(() => ({
  chart: {
    type: "line",
    toolbar: {
      show: false
    }
  },
  colors: ['#00E396', '#FF4560', '#FEB019', '#775DD0'],
  xaxis: {
    categories: categories.value,
  }
}))

// kotak rousable untuk component DataUser
const userType = computed(()=>[
  {name: "ADMIN",route: "admin"},
  {name: "USER",route: "user"},
])

const getTotal = (name:string)=>(
  userStore.data?.find(user=>user.name === name)?.total?? 0
)

onMounted(async()=>{
  userStore.fetchUser()
  absenStore.fetchAbsen()
})

</script>
<template>
  <div class="py-8 flex flex-col gap-8">
    <div class="max-w-full mx-auto px-4 grid md:grid-cols-2 gap-28">
      <RouterLink 
      v-for="user in userType"
      :key="user.name"
      :to="`/dashboard/analytic/${user.route}`"

      >
        <DataUser 
        :title="`${user.name.toUpperCase()[0]}${user.name.slice(1).toLowerCase()} information`" 
        class="w-full"
        >
          <div class="flex flex-col gap-2">
            <h1 class="text-lg font-semibold">{{ user.name.toUpperCase()[0] + user.name.slice(1).toLowerCase() }}</h1>
            <p class="text-sm text-gray-500">datas {{ user.name.toLowerCase() }} yang ada di sini ada {{ getTotal(user.name)}} data</p>
          </div>
        </DataUser>
      </RouterLink>
    </div>
    <div class="p-4 flex flex-row justify-between gap-28 max-w-full mx-auto px-4">
      <!-- chart lingkaran -->
      <apexchart
      type="donut"
       width="400"
        height="400"
        :options="chartOptions"
        :series="series"
      />
      <apexchart
        type="line"
        width="600"
        height="400"
        :options="chartOptions2"
        :series="series2"
      />
    </div>
  </div>
</template>