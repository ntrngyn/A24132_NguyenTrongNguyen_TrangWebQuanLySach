<style scoped>
.data-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header {
    background: #4a90e2;
    color: white;
}

.table-row:hover {
    background-color: #f8fafc;
}

.action-btn {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.btn-edit {
    background: #e2e8f0;
    color: #2d3748;
}

.btn-delete {
    background: #fed7d7;
    color: #c53030;
}
</style>

<template>
    <div class="data-table">
        <table class="w-100">
            <thead class="table-header">
                <tr>
                    <th v-for="header in headers" :key="header">
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book._id" class="table-row">
                    <td>{{ book.MASACH }}</td>
                    <td>{{ book.TENSACH }}</td>
                    <td>{{ book.NGUONGOC_TACGIA || '-' }}</td>
                    <td>{{ getNXBName(book.MANXB) }}</td>
                    <td>{{ book.SOQUYEN }}</td>
                    <td>{{ formatCurrency(book.DONGIA) }}</td>
                    <td>
                        <div class="d-flex gap-1">
                            <button class="action-btn btn-edit" @click="$emit('edit', book)">
                                Sửa
                            </button>
                            <button class="action-btn btn-delete" @click="$emit('delete', book._id)">
                                Xóa
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        books: { type: Array, required: true },
        nxbs: { type: Array, required: true }
    },
    methods: {
        getNXBName(book) {
            if (!book || !book.MANXB) return "Chưa có NXB";

            const manxb = typeof book.MANXB === "object" ? book.MANXB.MANXB : book.MANXB;

            const nxb = this.nxbs.find(n =>
                n.MANXB === manxb ||
                n._id === manxb ||
                String(n._id) === String(manxb)
            );
            return nxb ? nxb.TENNXB : "Không tìm thấy";
        },
        formatCurrency(value) {
            //console.log("Giá trị đơn giá:", value);
            if (value == null || isNaN(value)) return "Không có giá";
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
        }
    }
};
</script>
