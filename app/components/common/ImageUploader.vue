<!-- ImageUploader Component
    * Keeps the real File object in v-model for FormData.
    * Preview uses URL.createObjectURL, never stored as the value.
    * Does NOT upload by itself.
-->

<template>
  <div class="image-uploader">
    <label v-if="label"  :for="inputId" class="image-uploader__label">
      {{ label }}
      <span v-if="required" class="image-uploader__required">*</span>
    </label>

    <div :class="['image-uploader__box', { 'image-uploader__box--error': displayError }]">
      <input
        :id="inputId"
        ref="fileInput"
        type="file"
        :accept="acceptedTypes.join(',')"
        class="image-uploader__input"
        @change="onFileChange"
      />

      <div v-if="previewUrl" class="image-uploader__preview-wrap">
        <img :src="previewUrl" alt="Selected image preview" class="image-uploader__preview" />
        <div class="image-uploader__actions">
          <button type="button" class="image-uploader__btn" @click="triggerInput">Change</button>
          <button type="button" class="image-uploader__btn image-uploader__btn--danger" @click="removeFile">Remove</button>
        </div>
      </div>

      <button v-else type="button" class="image-uploader__empty" @click="triggerInput">
        <span class="image-uploader__icon"><ImagePlus :size="24" /></span>
        <span class="image-uploader__text">{{ placeholder }}</span>
        <span class="image-uploader__sub">{{ hintText }}</span>
      </button>
    </div>

    <p v-if="displayError" class="image-uploader__error">{{ displayError }}</p>
    <p v-else-if="hint" class="image-uploader__hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { ImagePlus } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {type: File, default: null},
  label: { type: String, default: 'Profile image' },
  placeholder: { type: String, default: 'Click to upload profile image' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  maxSize: { type: Number, default: 2 * 1024 * 1024 }, 
  acceptedTypes: { type: Array, default: () => ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'] },
})

const emit = defineEmits(['update:modelValue', 'error'])
   
const inputId = useId()
const fileInput = ref(null)
const previewUrl = ref('')
const internalError = ref('')

// Computed property for hint text, using either the provided hint or a default message based on maxSize
const hintText = computed(() =>
  props.hint ||
  `JPG, PNG or WEBP, max ${(props.maxSize / 1024 / 1024).toFixed(1)}MB`
)
// Computed property for displaying error messages, prioritizing internal errors over prop errors
const displayError = computed(() => internalError.value || props.error)

function cleanupPreview() {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
}

function triggerInput() {
  fileInput.value?.click()
}

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  if (!props.acceptedTypes.includes(file.type)) {
    internalError.value = 'Please select a JPG, PNG or WEBP image.'
    emit('error', internalError.value)
    event.target.value = ''
    return
  }

  if (file.size > props.maxSize) {
    internalError.value = `Image must be less than ${Math.round(props.maxSize / 1024 / 1024)}MB.`
    emit('error', internalError.value)
    event.target.value = ''
    return
  }
  internalError.value = ''
  cleanupPreview()
  previewUrl.value = URL.createObjectURL(file)
  emit('update:modelValue', file)
}

// Function to remove the selected file
function removeFile() {
  cleanupPreview()
  internalError.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }

  emit('update:modelValue', null)
}

// Watch for changes in the modelValue prop to clean up the preview when the value is cleared
watch(() => props.modelValue, (val) => {
  if (!val) cleanupPreview()
})

onUnmounted(cleanupPreview)
</script>

<style scoped>
.image-uploader {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.image-uploader__label {
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 700;
  color: var(--ck-text);
}

.image-uploader__required {
  color: var(--ck-danger);
}

.image-uploader__box {
  border: 1.5px dashed var(--ck-border);
  border-radius: var(--ck-radius-sm);
  background: var(--ck-bg);
  overflow: hidden;
  transition: var(--transition);
}

.image-uploader__box--error {
  border-color: var(--ck-danger);
}

.image-uploader__input {
  display: none;
}

.image-uploader__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 20px 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-primary);
}

.image-uploader__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--ck-bg-soft);
  color: var(--ck-text-muted);
}

.image-uploader__text {
  font-size: 14px;
  font-weight: 700;
  color: var(--ck-text);
}

.image-uploader__sub {
  font-size: 12px;
  color: var(--ck-text-muted);
}

.image-uploader__preview-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 14px;
}

.image-uploader__preview {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--ck-border);
}

.image-uploader__actions {
  display: flex;
  gap: 8px;
}

.image-uploader__btn {
  background: var(--ck-bg-soft);
  border: 1px solid var(--ck-border);
  border-radius: var(--ck-radius-sm);
  padding: 6px 12px;
  font-family: var(--font-primary);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: var(--ck-text);
}

.image-uploader__btn--danger {
  color: var(--ck-danger);
}

.image-uploader__error {
  font-size: 12px;
  color: var(--ck-danger);
  font-weight: 600;
}

.image-uploader__hint {
  font-size: 12px;
  color: var(--ck-text-muted);
}
</style>