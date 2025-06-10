import { ReqConfig, Service } from "../../types/api"

function authService({ api }: Service) {
  const prefix = "/admin";

  const signin = (data: { email: string; password: string }) => {
    return api.post(`${prefix}/sign-in-admin`, data);
  };

  const registerAdmin = (data: any) => {
    return api.post(`${prefix}/register-admin`, data);
  };

  const verifyEmail = (data: { email: string; code: string }, reqConfig?: ReqConfig) => {
    return api.post(`${prefix}/verify-email-admin`, data, { ...reqConfig });
  };

  const updatePassword = (data: any, reqConfig?: ReqConfig) => {
    return api.patch(`${prefix}/password-admin`, data, { ...reqConfig });
  };

  const resetPassword = (data: { token: string; password: string }, reqConfig?: ReqConfig) => {
    return api.post(`${prefix}/reset-password/${data.token}`, { password: data.password }, { ...reqConfig });
  };

  const forgotPassword = (data: any, reqConfig?: ReqConfig) => {
    return api.post(`${prefix}/forgot-password-admin`, data, { ...reqConfig });
  };

  const verificationCode = (email: string, reqConfig?: ReqConfig) => {
    return api.get(`${prefix}/verification-code/${email}`, { ...reqConfig });
  };

  const memberCount = (reqConfig?: ReqConfig) => {
    return api.get(`/auth/count/members`, { ...reqConfig });
  };

  const partnerCount = (reqConfig?: ReqConfig) => {
    return api.get(`/auth/count/partners`, { ...reqConfig });
  };

  const userCount = (reqConfig?: ReqConfig) => {
    return api.get(`/auth/count/all/users`, { ...reqConfig });
  };

  const baseUserCount = (reqConfig?: ReqConfig) => {
    return api.get(`/auth/count/users`, { ...reqConfig });
  };

  const creditMemberCount = (reqConfig?: ReqConfig) => {
    return api.get(`/auth/count/credit-members`, { ...reqConfig });
  };

  return Object.freeze({
    signin,
    registerAdmin,
    verifyEmail,
    updatePassword,
    resetPassword,
    forgotPassword,
    verificationCode,
    memberCount,
    partnerCount,
    userCount,
    baseUserCount,
    creditMemberCount,
  });
}

export default authService;
