<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue", "submit"]);

const updateModelValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const submit = () => {
  emit("submit");
};
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
}

.search-btn {
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
}
</style>

<template>
  <div class="search-container position-relative">
    <input type="text" class="search-input w-100" placeholder="Tìm kiếm sách..." :value="modelValue"
      @input="updateModelValue" @keyup.enter="submit">
    <button class="search-btn position-absolute" @click="submit">
      <i class="fas fa-search text-primary"></i>
    </button>
  </div>
</template>