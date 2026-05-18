import type { ResponseCodeKey } from "../types/core/response.type.js";

export const ResCode = {
  // Generics.
  // 200 range.
  SUCCESS: "SUCCESS",
  CREATED: "CREATED",

  // 400 range.
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
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

  // Refresh token.
  REFRESH_TOKEN_REQUIRED: "REFRESH_TOKEN_REQUIRED",
  REFRESH_TOKEN_EXPIRED: "REFRESH_TOKEN_EXPIRED",
  REFRESH_TOKEN_INVALID: "REFRESH_TOKEN_INVALID",
  REFRESH_TOKEN_REUSED: "REFRESH_TOKEN_REUSED",
  REFRESH_TOKEN_NOT_FOUND: "REFRESH_TOKEN_NOT_FOUND",
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",

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
  SHOP_IS_NOT_REGISTERED: "SHOP_IS_NOT_REGISTERED",
  SHOP_ALREADY_EXISTS: "SHOP_ALREADY_EXISTS",
  SHOP_ALREADY_REGISTERED: "SHOP_ALREADY_REGISTERED",
  SHOP_REGISTRATION_SUCCESS: "SHOP_REGISTRATION_SUCCESS",

  SHOP_NOT_LOGGED_IN: "SHOP_NOT_LOGGED_IN",
  SHOP_LOGIN_SUCCESS: "SHOP_LOGIN_SUCCESS",

  SHOP_LOGOUT_SUCCESS: "SHOP_LOGOUT_SUCCESS",

  // Product.
  PRODUCT_NAME_REQUIRED: "PRODUCT_NAME_REQUIRED",
  PRODUCT_NAME_INVALID_TYPE: "PRODUCT_NAME_INVALID_TYPE",

  PRODUCT_THUMB_REQUIRED: "PRODUCT_THUMB_REQUIRED",
  PRODUCT_THUMB_INVALID_TYPE: "PRODUCT_THUMB_INVALID_TYPE",

  PRODUCT_SHOP_REQUIRED: "PRODUCT_SHOP_REQUIRED",
  PRODUCT_SHOP_INVALID_TYPE: "PRODUCT_SHOP_INVALID_TYPE",

  PRODUCT_TYPE_INVALID: "PRODUCT_TYPE_INVALID",

  PRODUCT_PRICE_REQUIRED: "PRODUCT_PRICE_REQUIRED",
  PRODUCT_PRICE_INVALID_TYPE: "PRODUCT_PRICE_INVALID_TYPE",
  PRODUCT_PRICE_MUST_BE_POSITIVE: "PRODUCT_PRICE_MUST_BE_POSITIVE",

  PRODUCT_QUANTITY_INVALID_TYPE: "PRODUCT_QUANTITY_INVALID_TYPE",
  PRODUCT_QUANTITY_MUST_BE_POSITIVE: "PRODUCT_QUANTITY_MUST_BE_POSITIVE",

  PRODUCT_CREATION_SUCCESS: "PRODUCT_CREATION_SUCCESS",
  PRODUCT_CREATION_FAILURE: "PRODUCT_CREATION_FAILURE",

  CLOTHING_CREATION_FAILURE: "CLOTHING_CREATION_FAILURE",
  CLOTHING_CREATION_SUCCESS: "CLOTHING_CREATION_SUCCESS",

  ELECTRONIC_CREATION_FAILURE: "ELECTRONIC_CREATION_FAILURE",
} as const;

export const ResMsg: Record<ResponseCodeKey, string> = {
  // Generics.
  // 200 range.
  SUCCESS: "Yêu cầu thành công",
  CREATED: "Tài nguyên được tạo thành công",

  // 400 range
  UNAUTHORIZED: "Không đủ quyền hạn truy cập vào tài nguyên yêu cầu",
  FORBIDDEN: "Không đủ quyền hạn thực hiện yêu cầu",

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

  // Refresh token.
  REFRESH_TOKEN_REQUIRED: "Refresh Token là bắt buộc",
  REFRESH_TOKEN_EXPIRED: "Refresh Token đã hết hạn",
  REFRESH_TOKEN_INVALID: "Refresh Token không hợp lệ",
  REFRESH_TOKEN_REUSED:
    "Phát hiện Refresh Token được sử dụng lại. Thu hồi phiên đăng nhập",
  REFRESH_TOKEN_NOT_FOUND: "Không tìm thấy Refresh Token",
  REFRESH_TOKEN_SUCCESS: "Token được refresh thành công",

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
  SHOP_IS_NOT_REGISTERED: "Cửa hàng chưa được đăng kí",
  SHOP_ALREADY_EXISTS:
    "Cửa hàng đã tồn tại, vui lòng đăng kí cửa hàng với thông tin khác",
  SHOP_ALREADY_REGISTERED: "Cửa hàng đã được đăng kí trước đó",
  SHOP_REGISTRATION_SUCCESS: "Đăng kí cửa hàng thành công",

  SHOP_NOT_LOGGED_IN: "Chưa đăng nhập trước đó, vui lòng đăng nhập",
  SHOP_LOGIN_SUCCESS: "Đăng nhập thành công",
  SHOP_LOGOUT_SUCCESS: "Đăng xuất khỏi cửa hàng thành công",

  // Product.
  PRODUCT_NAME_REQUIRED: "Tên sản phẩm không được để trống",
  PRODUCT_NAME_INVALID_TYPE: "Tên sản phẩm phải là kiểu kí tự",

  PRODUCT_THUMB_REQUIRED: "Thumbnail của sản phẩm không được để trống",
  PRODUCT_THUMB_INVALID_TYPE: "Thumbnail của sản phẩm phải là kiểu kí tự",

  PRODUCT_PRICE_REQUIRED: "Giá của sản phẩm không được để trống",
  PRODUCT_PRICE_INVALID_TYPE: "Giá của sản phẩm phải là kiểu số",
  PRODUCT_PRICE_MUST_BE_POSITIVE: "Giá của sản phẩm phải lớn hơn 0",

  PRODUCT_QUANTITY_INVALID_TYPE: "Số lượng sản phẩm phải là kiểu số nguyên",
  PRODUCT_QUANTITY_MUST_BE_POSITIVE: "Số lượng sản phẩm phải lớn hơn không",

  PRODUCT_SHOP_REQUIRED:
    "Cửa hàng liên kết với sản phẩm này không được bỏ trống",
  PRODUCT_SHOP_INVALID_TYPE:
    "Cửa hàng liên kết với sản phẩm này phải là kiểu kí tự",

  PRODUCT_TYPE_INVALID: "Loại sản phẩm không hợp lệ",

  PRODUCT_CREATION_SUCCESS: "Tạo sản phẩm thành công",
  PRODUCT_CREATION_FAILURE: "Tạo sản phẩm thất bại",

  CLOTHING_CREATION_FAILURE: "Tạo sản phẩm quần áo thất bại",
  CLOTHING_CREATION_SUCCESS: "Tạo sản phẩm quần áo thành công",

  ELECTRONIC_CREATION_FAILURE: "Tạo sản phẩm điện thất bại",
} as const;
