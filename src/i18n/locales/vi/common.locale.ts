export const CommonViLocale = {
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

  // Mongoose.
  INVALID_OBJECT_ID: "Định dạng ID không hợp lệ",
  INVALID_ID: "INVALID_ID",

  INTERNAL_SERVER_ERROR:
    "Hệ thống đang gặp sự cố, mong bạn thông cảm và thư lại sau nhé",

  UNAUTHENTICATED: "Thông tin đăng nhập không hợp lệ, vui lòng thử lại",

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
} as const;
