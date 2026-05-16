export const ResponseCode = {
  // Generics.
  SUCCESS: "SUCCESS",

  UNAUTHORIZED: "UNAUTHORIZED",

  NOT_FOUND: "NOT_FOUND",
  TOO_MANY_REQUEST: "TOO_MANY_REQUEST",

  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export const ResponseMessage: { [key in keyof typeof ResponseCode]: string } = {
  SUCCESS: "Yêu cầu thành công",

  UNAUTHORIZED: "Không đủ quyền hạn truy cập vào tài nguyên yêu cầu",
  NOT_FOUND: "Không tìm thấy tài nguyên yêu cầu",
  TOO_MANY_REQUEST:
    "Hệ thống đang tiếp nhận quá nhiều yêu cầu, vui lòng thử lại sau",

  INTERNAL_SERVER_ERROR:
    "Hệ thống đang gặp sự cố, mong bạn thông cảm và thư lại sau nhé",
};
