<template>
  <div class="ui-header">
    <slot />  
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.ui-header {
 display: flex;
  flex-direction: column;
  gap: var(--space-md);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);

  background-color: var(--color-surface);
  padding: var(--space-md) var(--space-lg);

  border-bottom: 1px solid var(--color-border-muted);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
}
</style>