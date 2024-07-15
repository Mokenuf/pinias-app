<template>
  <div class="base-icon d-inline-block">
    <ClientOnly>
      <div
        :class="[
          `base-icon__icon ${classIcon}`,
          { [`bg-${variant}`]: variant }
        ]"
        :style="{
          'width': `${width}px`,
          'height': `${height}px`,
          '-webkit-mask': `url(${iconPath}) no-repeat center center / cover`,
          'mask': `url(${iconPath}) no-repeat center center / cover`
        }"
      />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
export interface IconProps {
  classIcon?: string,
  height: number,
  icon: string,
  variant?: string,
  width: number
}

const props = defineProps<IconProps>()

const iconPath = computed(() => new URL(`/assets/img/icons/${props.icon}.svg`, import.meta.url).href)
</script>
