<template>
  <div class="container d-flex justify-content-center align-items-center vh-100" style="margin-top: -10%;">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <h2 class="text-center text-primary">Đăng ký</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="sdt" class="form-label">Số điện thoại</label>
          <input type="text" class="form-control" v-model="sdt" placeholder="Số điện thoại" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu</label>
          <input type="password" class="form-control" v-model="password" placeholder="Mật khẩu" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Nhập lại mật khẩu</label>
          <input type="password" class="form-control" v-model="confirmPassword" placeholder="Xác nhận mật khẩu"
            required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
      </form>
      <div class="text-center mt-3">
        <p class="mb-0">Bạn đã có tài khoản?
          <router-link to="/A24132_NguyenTrongNguyen_TrangWebQuanLySach/login-docgia" class="text-decoration-none">Đăng
            nhập</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sdt: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
      }

      try {
        await axios.post('https://a24132-nguyentrongnguyen.onrender.com/api/auth/register/docgia', {
          sdt: this.sdt,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
        alert('Đăng ký thành công');
        this.$router.push('/login-docgia');
      } catch (error) {
        alert(error.response?.data?.message || 'Đăng ký thất bại');
      }
    }
  }
};
</script>
