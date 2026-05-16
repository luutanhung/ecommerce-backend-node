export const ResponseCode = {
  // Generics.
  SUCCESS: "SUCCESS",

  UNAUTHORIZED: "UNAUTHORIZED",

  NOT_FOUND: "NOT_FOUND",
  TOO_MANY_REQUEST: "TOO_MANY_REQUEST",

  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  // Shop.
  SHOP_ALREADY_EXISTS: "SHOP_ALREADY_EXISTS",
  SHOP_ALREADY_REGISTERED: "SHOP_ALREADY_REGISTERED",
  SHOP_REGISTRATION_SUCCESS: "SHOP_REGISTRATION_SUCCESS",
} as const;

export const ResponseMessage: { [key in keyof typeof ResponseCode]: string } = {
  SUCCESS: "Yêu cầu thành công",

  UNAUTHORIZED: "Không đủ quyền hạn truy cập vào tài nguyên yêu cầu",
  NOT_FOUND: "Không tìm thấy tài nguyên yêu cầu",
  TOO_MANY_REQUEST:
    "Hệ thống đang tiếp nhận quá nhiều yêu cầu, vui lòng thử lại sau",

  INTERNAL_SERVER_ERROR:
    "Hệ thống đang gặp sự cố, mong bạn thông cảm và thư lại sau nhé",

  // Shop.
  SHOP_ALREADY_EXISTS:
    "Cửa hàng đã tồn tại, vui lòng đăng kí cửa hàng với thông tin khác",
  SHOP_ALREADY_REGISTERED: "Cửa hàng đã được đăng kí trước đó",
  SHOP_REGISTRATION_SUCCESS: "Đăng kí cửa hàng thành công",
};
