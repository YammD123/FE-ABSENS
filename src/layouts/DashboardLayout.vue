<script setup lang="ts">
import { Calendar, ChartSpline, CircleUser, Search, Settings } from "lucide-vue-next";
import { useRoute } from "vue-router";

const route = useRoute()
const items = [
  {
    title: "Profile",
    url: "/dashboard",
    icon: CircleUser,
  },
  {
    title: "Analytic",
    url: "/dashboard/analytic",
    icon: ChartSpline,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

function isActive(url:string){
  if (url === '/dashboard') {
    return route.path === url
  }
  return route.path.startsWith(url)
}
</script>

<template>
  <div class="flex gap-2">
    <aside class="fixed top-0 left-0 h-screen bg-blue-600 w-52 border-r shadow-sm p-4 flex flex-col gap-4">
      <h2 class="text-lg font-semibold px-2">Application</h2>
      <nav class="flex flex-col gap-1">
        <RouterLink
          v-for="item in items"
          :key="item.title"
          :to="item.url"
          :class="['flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors', isActive(item.url) ? 'bg-gray-100' : 'text-gray-700']"
        >
          <div class="flex gap-4">
            <component :is="item.icon" class="w-5 h-5 text-black" />
            <span class="text-black">{{ item.title }}</span>
          </div>
        </RouterLink>
      </nav>
    </aside>
    <!-- Tambah padding kiri supaya konten nggak ketutup sidebar -->
    <div class="pl-52">
      <RouterView v-slot="{Component}">
        <KeepAlive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </KeepAlive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </RouterView>
    </div>
  </div>
</template>