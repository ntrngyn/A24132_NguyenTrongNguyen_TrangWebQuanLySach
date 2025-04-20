<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.form-actions {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}
</style>

<template>
    <div class="form-container">
        <h3 class="form-title mb-4">{{ isEditMode ? 'Chỉnh sửa' : 'Thêm mới' }} Sách</h3>

        <form @submit.prevent="submitForm">
            <div class="form-grid">
                <div class="form-group">
                    <label>Mã sách</label>
                    <input v-model="bookLocal.MASACH" required>
                </div>

                <div class="form-group">
                    <label>Tên sách</label>
                    <input v-model="bookLocal.TENSACH" required>
                </div>

                <div class="form-group">
                    <label>Nhà xuất bản</label>
                    <select v-model="bookLocal.MANXB" required>
                        <option v-for="nxb in nxbList" :value="nxb._id">
                            {{ nxb.TENNXB }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Số lượng</label>
                    <input type="number" v-model.number="bookLocal.SOQUYEN" min="0" required>
                </div>

                <div class="form-group">
                    <label>Đơn giá</label>
                    <input type="number" v-model.number="bookLocal.DONGIA" min="0" required>
                </div>

                <div class="form-group">
                    <label>Năm XB</label>
                    <input type="number" v-model.number="bookLocal.NAMXUATBAN" required>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-secondary" @click="$emit('cancel')">
                    Hủy
                </button>
                <button type="submit" class="btn-primary">
                    {{ isEditMode ? 'Cập nhật' : 'Thêm mới' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        book: {
            type: Object,
            default: () => ({
                MASACH: "",
                TENSACH: "",
                MANXB: "",
                SOQUYEN: 1,
                DONGIA: 0,
                NAMXUATBAN: 2010,
                NGUONGOC_TACGIA: "",
                HINHANH: null
            })
        },
        nxbList: { type: Array, required: true },
    },
    data() {
        return {
            bookLocal: { ...this.book },
        };
    },
    watch: {
        book: {
            deep: true,
            immediate: true,
            handler(newVal, oldVal) {
                if (!newVal || JSON.stringify(newVal) === JSON.stringify(oldVal)) {
                    return;
                }
                //console.log("Book đã thay đổi:", newVal);
                this.bookLocal = { ...newVal };
            },
        },
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.bookLocal.HINHANH = file;
            }
        },
        submitForm() {
            if (!this.bookLocal.MANXB) {
                alert("Vui lòng chọn Nhà Xuất Bản!");
                return;
            }
            const bookData = { ...this.bookLocal };
            //console.log("Dữ liệu gửi đi:", bookData); 
            this.$emit("submit", bookData);
        },
    },
};
</script>