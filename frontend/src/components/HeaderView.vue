<script>
export default {
  computed: {
    userRole() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout'); // Gọi action logout để xóa userRole trong Vuex
      this.$router.push('/A24132_NguyenTrongNguyen_TrangWebQuanLySach/login-docgia'); // Chuyển hướng về trang đăng nhập độc giả
    }
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/">BOOK STORE</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/">Trang chủ</router-link>
          </li>

          <!-- Nếu đăng nhập với vai trò Độc giả -->
          <template v-if="userRole === 'docgia'">
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/muon-sach">Mượn
                Sách</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/lich-su-muon">Lịch Sử
                Mượn</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/tai-khoan">Tài
                Khoản</router-link>
            </li>
          </template>

          <!-- Nếu đăng nhập với vai trò Quan ly -->
          <template v-else-if="userRole === 'quanly'">
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/quan-ly-sach">Quản Lý
                Sách</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/quan-ly-tai-khoan">Quản Lý
                Tài Khoản</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/theo-doi-muon">Theo Dõi
                Mượn</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/tai-khoan">Tài
                Khoản</router-link>
            </li>
          </template>

          <!-- Nếu đăng nhập với vai trò Nhân viên -->
          <template v-else-if="userRole === 'nhanvien'">
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/theo-doi-muon">Theo Dõi
                Mượn</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/tai-khoan">Tài
                Khoản</router-link>
            </li>
          </template>

          <!-- Nếu chưa đăng nhập -->
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/login-docgia">Đăng
                nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/register">Đăng
                ký</router-link>
            </li>
          </template>

          <!-- Logout -->
          <li class="nav-item" v-if="userRole">
            <router-link class="nav-link" to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/logout"
              @click="handleLogout">Đăng
              Xuất</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
