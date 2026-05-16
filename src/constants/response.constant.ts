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

  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  /*
   * Entity-focused.
   */
  // Name.
  NAME_REQUIRED: "NAME_REQUIRED",
  NAME_INVALID_TYPE: "NAME_INVALID_TYPE",

  // Email.
  EMAIL_REQUIRED: "EMAIL_REQUIRED",
  EMAIL_INVALID_TYPE: "EMAIL_INVALID_TYPE",
  EMAIL_INVALID: "INVALID_EMAIL",

  // Password.
  PASSWORD_REQUIRED: "PASSWORD_REQUIRED",
  PASSWORD_INVALID_TYPE: "PASSWORD_INVALID_TYPE",
  PASSWORD_INVALID: "PASSWORD_INVALID",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",
  PASSWORD_MISSING_UPPERCASE: "PASSWORD_TOO_SHORT",
  PASSWORD_MISSING_LOWERCASE: "PASSWORD_MISSING_LOWERCASE",
  PASSWORD_MISSING_NUMBER: "PASSWORD_MISSING_NUMBER",
  PASSWORD_MISSING_SPECIAL_CHAR: "PASSWORD_MISSING_SPECIAL_CHAR",

  // Shop.
  SHOP_ALREADY_EXISTS: "SHOP_ALREADY_EXISTS",
  SHOP_ALREADY_REGISTERED: "SHOP_ALREADY_REGISTERED",
  SHOP_REGISTRATION_SUCCESS: "SHOP_REGISTRATION_SUCCESS",

  SHOP_INVALID_NAME: "SHOP_INVALID_NAME",
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

  INTERNAL_SERVER_ERROR:
    "Hệ thống đang gặp sự cố, mong bạn thông cảm và thư lại sau nhé",

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

  // Shop.
  SHOP_ALREADY_EXISTS:
    "Cửa hàng đã tồn tại, vui lòng đăng kí cửa hàng với thông tin khác",
  SHOP_ALREADY_REGISTERED: "Cửa hàng đã được đăng kí trước đó",
  SHOP_REGISTRATION_SUCCESS: "Đăng kí cửa hàng thành công",

  SHOP_INVALID_NAME: "Tên cửa hàng không hợp lệ",
} as const;
