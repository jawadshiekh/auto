const responses = {
	CAR_RESPONSES: {
    CREATE_SUCCESS: "Car created successfully.",
    UPDATE_SUCCESS: "Car updated successfully.",
    DELETE_SUCCESS: "Car deleted successfully.",
    NOT_FOUND: "Car not found."
	},
	WATCH_RESPONSES: {
    CREATE_SUCCESS: "Watch created successfully.",
    UPDATE_SUCCESS: "Watch updated successfully.",
    DELETE_SUCCESS: "Watch deleted successfully.",
    NOT_FOUND: "Watch not found."
	},
  USER_RESPONSES: {
    EMAIL_NOT_FOUND: "Email not found.",
    EMAIL_ALREADY_EXISTS: "Email already exists.",
    DUPLICATE_FACE_ID: "Duplicate face ID",
    EMAIL_NOT_VERIFIED: "Email not verified.",
    INCORRECT_CREDENTIALS: "Incorrect credentials.",
    FACE_ID_REQUIRED: "Face id required to complete login process.",
    FACE_ID_DOES_NOT_MATCH: "Face id does not match.",
    PASSWORD_CHANGED_SUCCESS: "Password changed successfully.",
    FORGET_PASSWORD_EMAIL_SENT: "Forget password email sent.",
    USER_UPDATED: "User data has been updated.",
    COULD_NOT_UPDATE_USER: "Could not update user.",
    INCORRECT_OLD_PASSWORD: "Old password is incorrect.",
  },
  ENTITY_RESPONSES: {
    NOT_FOUND: "Could not find any record for this entity yet.",
  },
  DIRECTOR_EMAILS: {
    CREATE_SUCCESS: "Emails added successfully.",
  },
  POLL_RESPONSES: {
    CREATE_SUCCESS: "Poll created successfully.",
    REPLACE_SUCCESS: "Poll has been replaced successfully.",
    CANNOT_CREATE: "Poll cannot be created, voting days bro.",
    NOT_FOUND: "Poll not found.",
  },
  VOTE_RESPONSES: {
    CREATE_SUCCESS: "Vote added successfully.",
    CANNOT_VOTE: "Vote cannot be added, creating days bro.",
  },
  ERROR_RESPONSES: {
    INVALID_REQUEST: "kya chahta he bhai???",
    TOKEN_NOT_PROVIDED: "Token not provided.",
    INVALID_TOKEN: "Invalid token.",
  },
  CONTACT_RESPONSE: {
    SENT_SUCCESS: "Email sent successfully.",
  },
  COURSES_RESPONSES: {
    CREATE_SUCCESS: "Course created successfully.",
    UPDATE_SUCCESS: "Course updated successfully.",
    DELETE_SUCCESS: "Course deleted successfully.",
    NOT_FOUND: "Course not found."
  },
  NEWS_RESPONSES: {
    CREATE_SUCCESS: "News created successfully.",
    UPDATE_SUCCESS: "News updated successfully.",
    DELETE_SUCCESS: "News deleted successfully.",
    NOT_FOUND: "News not found."
  },
  NEWS_COMMENT_RESPONSES: {
    CREATE_SUCCESS: "News comment created successfully.",
    UPDATE_SUCCESS: "News comment updated successfully.",
    DELETE_SUCCESS: "News comment deleted successfully.",
    NOT_FOUND: "News comment not found."
  },
  genericResponse: (
    status,
    success,
    data = null,
    error = null,
    message = null
  ) => {
    return {
      status: {
        code: status,
        success: success,
      },
      data: data,
      error: error,
      message: message,
    };
  }
};

module.exports = responses;
