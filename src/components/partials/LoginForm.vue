<template>
  <div>
    <h3>{{ $t("Login") }}</h3>
    <VForm v-model="validForm" ref="loginForm" lazy-validation>
      <VTextField
        v-model="loginEmail"
        name="email"
        :label="$t('Email')"
        type="text"
        required
      ></VTextField>
      <VTextField
        v-model="loginPassword"
        name="password"
        :label="$t('Password')"
        type="password"
        required
      ></VTextField>
      <VBtn
        class="mt-4"
        color="primary"
        :loading="loginLoading"
        @click="submitLogin"
      >
        {{ $t("Login") }}
      </VBtn>
    </VForm>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import router from "@/router";
import api from "@/setup/api";
import { TokenService } from "@/setup/tokenService";
import { User } from "@/models";

export default defineComponent({
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      loginLoading: false,
      validForm: true,
    };
  },
  computed: {
    formIsValid() {
      return this.loginEmail && this.loginPassword;
    },
  },
  methods: {
    ...mapActions("notification", [
      "showWarningNotification",
      "showErrorNotification",
    ]),
    async submitLogin() {
      this.loginLoading = true;
      try {
        if ((await this.$refs.loginForm.validate()) && this.formIsValid) {
          const response = await api.post("/user/login/", {
            email: this.loginEmail,
            password: this.loginPassword,
          });
          if (response && response.status === 202) {
            const { token, user } = response.data;
            TokenService.saveToken(token);
            TokenService.saveUserUuid(user.uuid);
            await User.insertOrUpdate({
              data: { ...user, isCurrentUser: true },
            });
            router.push({ name: "dashboard" });
          }
        } else {
          this.showWarningNotification(this.$t("formNotValid"));
        }
        this.loginLoading = false;
      } catch (e) {
        this.loginLoading = false;
        if (e.response.status === 403) {
          this.showErrorNotification(this.$t("badCredentials"));
        } else {
          this.showErrorNotification(this.$t("errorOccured"));
        }
      } finally {
        this.loginPassword = "";
      }
    },
  },
});
</script>
