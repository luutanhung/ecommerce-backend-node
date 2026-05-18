export const AccessViLocale = {
  // User.
  USER_INVALID: "Thông tin tài khoản không hợp lệ",

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
