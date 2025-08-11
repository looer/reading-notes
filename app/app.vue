<template>
  <div class="min-h-screen bg-base-200">
    <div class="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

      <!-- Drawer content -->
      <div class="drawer-content">
        <!-- Page content -->
        <div class="flex flex-col">
          <div class="flex justify-between p-4">
            <div class="flex gap-2">
              <label
                for="sidebar-drawer"
                class="btn btn-square btn-ghost drawer-button lg:hidden">
                <IconsBurger class="w-6 h-6" />
              </label>
            </div>
            <div class="flex gap-2">
              <label class="swap swap-rotate">
                <!-- this hidden checkbox controls the state -->
                <input
                  type="checkbox"
                  class="theme-controller"
                  value="halloween" />
                <IconsSun class="w-6 h-6" />
                <IconsMoon class="w-6 h-6" />
              </label>
            </div>
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
            <h1 class="text-center font-serif text-xl font-bold">
              <NuxtLink to="/" class="link link-hover">
                My Reading Notes
              </NuxtLink>
            </h1>
          </div>
          <div class="overflow-y-auto h-[calc(100vh-4rem)]">
            <BookList />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
