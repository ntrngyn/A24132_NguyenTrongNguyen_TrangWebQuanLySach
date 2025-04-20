import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/store";

// Import các trang
import HomeView from "@/views/HomeView.vue";
import LoginNhanVien from "@/views/LoginNhanVien.vue";
import LoginDocGia from "@/views/LoginDocGia.vue";
import RegisterView from "@/views/RegisterView.vue";
import NotFound from "@/views/NotFound.vue";
import QuanLySachView from "@/views/QuanLySachView.vue";
import AccountView from "@/views/AccountView.vue";
import MuonSachView from "@/views/MuonSachView.vue";
import LichSuMuonView from "@/views/LichSuMuonView.vue";
import TheoDoiMuonView from "@/views/TheoDoiMuonView.vue";
import QuanLyTaiKhoanView from "../views/QuanLyTaiKhoanView.vue";

const routes = [
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/",
    component: HomeView,
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/login-nhanvien",
    component: LoginNhanVien,
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/login-docgia",
    component: LoginDocGia,
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/register",
    component: RegisterView,
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/:pathMatch(.*)*",
    component: NotFound,
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/quan-ly-sach",
    component: QuanLySachView,
    meta: { requiresAuth: true, role: "quanly" },
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/tai-khoan",
    component: AccountView,
    meta: { requiresAuth: true },
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/muon-sach",
    component: MuonSachView,
    meta: { requiresAuth: true, role: "docgia" },
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/lich-su-muon",
    component: LichSuMuonView,
    meta: { requiresAuth: true, role: "docgia" },
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/theo-doi-muon",
    component: TheoDoiMuonView,
    meta: { requiresAuth: true, role: ["quanly", "nhanvien"] },
  },
  {
    path: "/A24132_NguyenTrongNguyen_TrangWebQuanLySach/quan-ly-tai-khoan",
    component: QuanLyTaiKhoanView,
    meta: { requiresAuth: true, role: "quanly" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.getters.getToken;
  const role = store.getters.getUserRole;

  if (to.meta.requiresAuth && !token) {
    alert("Bạn chưa đăng nhập!");
    next("/A24132_NguyenTrongNguyen_TrangWebQuanLySach/login-docgia");
  } else if (to.meta.role && ![].concat(to.meta.role).includes(role)) {
    alert("Bạn không đủ quyền truy cập vào trang này!");
    next(from.fullPath);
  } else {
    next();
  }
});

export default router;
