<template>
  <div class="min-h-screen bg-base-200">
    <div class="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

      <!-- Drawer content -->
      <div class="drawer-content">
        <!-- Page content -->
        <div class="flex flex-col">
          <div class="flex justify-start p-4">
            <label
              for="sidebar-drawer"
              class="btn btn-square btn-ghost drawer-button lg:hidden"
            >
              <IconsBurger class="w-6 h-6" />
            </label>
          </div>

          <main class="flex-1 p-8 lg:pl-8">
            <NuxtPage />
          </main>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="sidebar-drawer" class="drawer-overlay"></label>
        <aside class="w-80 min-h-screen bg-base-100">
          <div class="p-4 border-b border-base-300">
            <h1 class="text-center text-xl font-bold">My Reading Notes</h1>
          </div>
          <div class="overflow-y-auto h-[calc(100vh-4rem)]">
            <BookList />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
