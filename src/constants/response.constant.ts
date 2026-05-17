import type { ResponseCodeKey } from "../types/core/response.type.js";

export const ResponseCode = {
  // Generics.
  SUCCESS: "SUCCESS",

  CREATED: "CREATED",

  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_REQUEST: "INVALID_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  TOO_MANY_REQUEST: "TOO_MANY_REQUEST",
  CONFLICT: "CONFLICT",

  // Client ID.
  CLIENT_ID_REQUIRED: "CLIENT_ID_REQUIRED",

  // JSON.
  INVALID_JSON: "INVALID_JSON",

  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  UNAUTHENTICATED: "UNAUTHENTICATED",

  // User.
  USER_INVALID: "USER_INVALID",

  // Access token.
  ACCESS_TOKEN_REQUIRED: "ACCESS_TOKEN_REQUIRED",
  ACCESS_TOKEN_EXPIRED: "ACCESS_TOKEN_EXPIRED",
  ACCESS_TOKEN_INVALID: "ACCESS_TOKEN_INVALID",

  /*
   * Entity-focused.
   */
  // Name.
  NAME_REQUIRED: "NAME_REQUIRED",
  NAME_INVALID_TYPE: "NAME_INVALID_TYPE",

  // Email.
  EMAIL_REQUIRED: "EMAIL_REQUIRED",
  EMAIL_INVALID_TYPE: "EMAIL_INVALID_TYPE",
  EMAIL_INVALID: "EMAIL_INVALID",

  // Password.
  PASSWORD_REQUIRED: "PASSWORD_REQUIRED",
  PASSWORD_INVALID_TYPE: "PASSWORD_INVALID_TYPE",
  PASSWORD_INVALID: "PASSWORD_INVALID",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",
  PASSWORD_MISSING_UPPERCASE: "PASSWORD_MISSING_UPPERCASE",
  PASSWORD_MISSING_LOWERCASE: "PASSWORD_MISSING_LOWERCASE",
  PASSWORD_MISSING_NUMBER: "PASSWORD_MISSING_NUMBER",
  PASSWORD_MISSING_SPECIAL_CHAR: "PASSWORD_MISSING_SPECIAL_CHAR",

  // Key Token.
  KEY_TOKEN_ALREADY_EXISTS: "KEY_TOKEN_ALREADY_EXISTS",
  KEY_TOKEN_NOT_FOUND: "KEY_TOKEN_NOT_FOUND",

  // Shop.
  SHOP_NOT_FOUND: "SHOP_NOT_FOUND",
  SHOP_INVALID_NAME: "SHOP_INVALID_NAME",
  SHOP_ALREADY_EXISTS: "SHOP_ALREADY_EXISTS",
  SHOP_ALREADY_REGISTERED: "SHOP_ALREADY_REGISTERED",
  SHOP_REGISTRATION_SUCCESS: "SHOP_REGISTRATION_SUCCESS",
  SHOP_LOGIN_SUCCESS: "SHOP_LOGIN_SUCCESS",
  SHOP_LOGOUT_SUCCESS: "SHOP_LOGOUT_SUCCESS",
} as const;

export const ResponseMessage: Record<ResponseCodeKey, string> = {
  // Generics.
  SUCCESS: "Yêu cầu thành công",

  CREATED: "Tài nguyên được tạo thành công",

  UNAUTHORIZED: "Không đủ quyền hạn truy cập vào tài nguyên yêu cầu",
  INVALID_REQUEST: "Yêu cầu vừa rồi không hợp lệ",
  NOT_FOUND: "Không tìm thấy tài nguyên yêu cầu",
  TOO_MANY_REQUEST:
    "Hệ thống đang tiếp nhận quá nhiều yêu cầu, vui lòng thử lại sau",
  CONFLICT: "Hệ thống bị xung đột, vui lòng thử lại sau",

  // Client ID.
  CLIENT_ID_REQUIRED: "Client ID là bắt buộc",

  // JSON.
  INVALID_JSON: "Định dạng JSON đã tiếp nhận không hợp lệ",

  INTERNAL_SERVER_ERROR:
    "Hệ thống đang gặp sự cố, mong bạn thông cảm và thư lại sau nhé",

  UNAUTHENTICATED: "Thông tin đăng nhập không hợp lệ, vui lòng thử lại",

  // User.
  USER_INVALID: "Thông tin tài khoản không hợp lệ",

  // Access token.
  ACCESS_TOKEN_REQUIRED: "Access Token là bắt buộc",
  ACCESS_TOKEN_EXPIRED: "Access Token đã hết hạn",
  ACCESS_TOKEN_INVALID: "Access Token không hợp lệ",

  /**
   * Entity-focused.
   */
  // Name.
  NAME_REQUIRED: "Tên là bắt buộc",
  NAME_INVALID_TYPE: "Tên phải là kiểu kí tự",

  // Email.
  EMAIL_REQUIRED: "Địa chỉ email là bắt buộc",
  EMAIL_INVALID_TYPE: "Địa chỉ email phải là kiểu kí tự",
  EMAIL_INVALID: "Địa chỉ email không hợp lệ",

  // Password.
  PASSWORD_REQUIRED: "Mật khẩu là bắt buộc",
  PASSWORD_INVALID_TYPE: "Mật khẩu phải là kiểu kí tự",
  PASSWORD_INVALID: "Mật khẩu không hợp lệ",

  PASSWORD_TOO_SHORT: "Mật khẩu phải có ít nhất 8 ký tự.",
  PASSWORD_MISSING_UPPERCASE:
    "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.",
  PASSWORD_MISSING_LOWERCASE:
    "Mật khẩu phải chứa ít nhất một chữ cái viết thường.",
  PASSWORD_MISSING_NUMBER: "Mật khẩu phải chứa ít nhất một chữ số.",
  PASSWORD_MISSING_SPECIAL_CHAR:
    "Mật khẩu phải chứa ít nhất một ký tự đặc biệt.",

  // Key Token.
  KEY_TOKEN_NOT_FOUND: "Key Token không tồn tại",
  KEY_TOKEN_ALREADY_EXISTS: "Key Token đã tồn tại",

  // Shop.
  SHOP_NOT_FOUND: "Cửa hàng chưa được đăng kí",
  SHOP_INVALID_NAME: "Tên cửa hàng không hợp lệ",
  SHOP_ALREADY_EXISTS:
    "Cửa hàng đã tồn tại, vui lòng đăng kí cửa hàng với thông tin khác",
  SHOP_ALREADY_REGISTERED: "Cửa hàng đã được đăng kí trước đó",
  SHOP_REGISTRATION_SUCCESS: "Đăng kí cửa hàng thành công",
  SHOP_LOGIN_SUCCESS: "Đăng nhập thành công",
} as const;
