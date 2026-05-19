export const AccessViLocale = {
  // User.
  USER_INVALID: "Thông tin tài khoản không hợp lệ",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_IS_NOT_REGISTERED: "USER_IS_NOT_REGISTERED",
  USER_NOT_LOGGED_IN: "USER_NOT_LOGGED_IN",

  /**
   * Register.
   */
  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",

  /**
   * Login.
   */
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",

  /**
   * Logout.
   */
  USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS",

  // Access Token.
  ACCESS_TOKEN_REQUIRED: "Access Token là bắt buộc",
  ACCESS_TOKEN_EXPIRED: "Access Token đã hết hạn",
  ACCESS_TOKEN_INVALID: "Access Token không hợp lệ",

  // Refresh Token.
  REFRESH_TOKEN_REQUIRED: "Refresh Token là bắt buộc",
  REFRESH_TOKEN_EXPIRED: "Refresh Token đã hết hạn",
  REFRESH_TOKEN_INVALID: "Refresh Token không hợp lệ",
  REFRESH_TOKEN_REUSED:
    "Phát hiện Refresh Token được sử dụng lại. Thu hồi phiên đăng nhập",
  REFRESH_TOKEN_NOT_FOUND: "Không tìm thấy Refresh Token",
  REFRESH_TOKEN_SUCCESS: "Token được refresh thành công",
} as const;
