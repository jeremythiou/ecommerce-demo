<script lang="ts" setup>
// import { TwicImg } from '@twicpics/components/vue3'

const props = defineProps<{
  name: string
}>()

const { name } = toRefs(props)
</script>

<template>
  <BaseCard class="product-card">
    <div class="px-5 pb-5">
      <BaseText
        size="m"
        class="mb-2 text-valhalla-500 product-name"
        :title="name"
      >
        {{ name }}
      </BaseText>
    </div>
  </BaseCard>
</template>

<style scoped>
.product-card {
  max-width: 250px;
  transition: transform ease-in-out 150ms;
}

.product-card:hover {
  box-shadow: 0px 0px 14px 8px rgba(77, 90, 125, 0.1), 0px 4px 66px rgba(77, 90, 125, 0.04);
  transform: translateY(-5px);
}

.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-rating {
  display: flex;
  align-items: baseline;
}
</style>
