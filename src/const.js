export const BASE_URL = "https://attendance.moneyforward.com";

export const PATH = {
  SIGN_IN: `${BASE_URL}/employee_session/new`,
  STAMP_TABLE: `${BASE_URL}/my_page/attendances`,
  MY_PAGE: `${BASE_URL}/my_page`,
};

export const ELEMENTS = {
  SIGN_IN: {
    FORM_COMPANY_ID: "#employee_session_form_office_account_name",
    FORM_EMAIL: "#employee_session_form_account_name_or_email",
    FORM_PASSWORD: "#employee_session_form_password",
    BUTTON_SUBMIT: "input[type=submit]",
  },
  STAMP_TABLE: {
    TABLE_ROW: ".attendance-table-row-",
    TABLE_DATA_HOLIDAY: ".column-classification",
    TABLE_DATA_OVERTIME: ".column-status",
    ANCHOR_OVERTIME_REQUEST:
      'a[href*="/my_page/workflow_requests/late_overtime_works"]',
  },
  OVERTIME_REQUEST: {
    FORM_OVERTIME:
      "workflow_request_workflow_request_content_late_overtime_work_attributes_workable_time",
    FORM_COMMENT: "#workflow_request_comment",
    BUTTON_SUBMIT: 'input[type="submit"]',
  },
};
