<template>
  <div>
    <h3>{{ $t("Sign up") }}</h3>
    <VForm>
      <VTextField
        v-model="signupFirstName"
        name="firstName"
        :label="$t('FirstName')"
        type="text"
        required
      ></VTextField>
      <VTextField
        v-model="signupLastName"
        name="lastName"
        :label="$t('LastName')"
        type="text"
        required
      ></VTextField>
      <VTextField
        v-model="signupEmail"
        name="email"
        :label="$t('Email')"
        type="text"
        required
      ></VTextField>
      <VTextField
        v-model="signupPassword"
        name="password"
        :label="$t('Password')"
        type="password"
        required
      ></VTextField>
      <VBtn
        class="mt-4"
        color="primary"
        :loading="loading"
        @click="submitSignup"
      >
        {{ $t("Sign up") }}
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
      signupFirstName: "",
      signupLastName: "",
      signupEmail: "",
      signupPassword: "",
      loading: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.signupFirstName &&
        this.signupLastName &&
        this.signupEmail &&
        this.signupPassword &&
        this.validateEmail(this.signupEmail)
      );
    },
  },
  methods: {
    ...mapActions("user", ["signupUser"]),
    ...mapActions("notification", [
      "showErrorNotification",
      "showWarningNotification",
    ]),
    async submitSignup() {
      try {
        this.loading = true;
        if (this.isFormValid) {
          const response = await api.post("/user/signup/", {
            first_name: this.signupFirstName,
            last_name: this.signupLastName,
            email: this.signupEmail,
            password: this.signupPassword,
          });
          if (response.status === 201) {
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
        this.loading = false;
      } catch (e) {
        console.error(e);
        if (e.response.status === 400) {
          const { email, password } = e.response.data;
          if (email && email.length) {
            this.showErrorNotification(
              this.$t("emailError", { message: email[0] })
            );
          } else if (password && password.length) {
            this.showErrorNotification(
              this.$t("passwordError", {
                message: password[0],
              })
            );
          }
        } else {
          this.showErrorNotification(this.$t("errorOccured"));
        }
        this.loading = false;
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
  },
});
</script>
