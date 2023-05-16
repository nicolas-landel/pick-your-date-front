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
      <div>
        <VTextField
          v-if="!showPassword"
          v-model="loginPassword"
          name="password"
          :label="$t('Password')"
          type="password"
          required
          append-inner-icon="mdi-eye"
          @click:append-inner="toggleShowPassword"
        ></VTextField>
        <VTextField
          v-if="showPassword"
          v-model="loginPassword"
          name="password"
          :label="$t('Password')"
          type="text"
          required
          append-inner-icon="mdi-eye-off"
          @click:append-inner="toggleShowPassword"
        ></VTextField>
      </div>
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
import { formatResponse } from "@/utils/helpers"

export default defineComponent({
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      loginLoading: false,
      validForm: true,
      showPassword: false,
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
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async submitLogin() {
      this.loginLoading = true;
      try {
        if ((await this.$refs.loginForm.validate()) && this.formIsValid) {
          const response = await api.post("/user/login/", {
            email: this.loginEmail,
            password: this.loginPassword,
          });
          if (response && response.status === 202) {
            const { token, user } = formatResponse(response.data);
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

<style scoped></style>
