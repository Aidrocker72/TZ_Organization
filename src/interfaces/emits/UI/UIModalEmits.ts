export interface UIModalEmits {
  (e: 'update:modelValue', v: boolean): void;
  (e: 'close'): void;
}