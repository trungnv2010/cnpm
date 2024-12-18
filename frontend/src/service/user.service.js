// import { changePasswordSchema } from "@/utils";
import apiSlice from "./api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `login`,
        method: "POST",
        body
      }),
    }),
    checkEmail: builder.mutation({
      query: (body ) => ({
        url: 'check-email?',
        method: "post",
        body
      }),
    }),
    register: builder.mutation({
      query: ( body ) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
    sendOtpApi: builder.mutation({
      query: (body) => ({
        url: "send-otp",
        method: "post",
        body
      }),
    }),
    restorePassword: builder.mutation({
      query: ({ email, otp }) => ({
        url: "otpreset",
        method: "GET",
        params: {
          email,
          otp,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "changepassword",
        method: 'get',
        params: { email, password }
      })
    })
  }),
});

export const {
  useLoginMutation,
  useCheckEmailMutation,
  useSendOtpApiMutation,
  useRegisterMutation,
  useRestorePasswordMutation,
  useChangePasswordMutation
} = userApiSlice;
