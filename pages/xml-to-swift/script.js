
$(document).ready(function () {

  function convert(text) {
    text = text.replace("<resources>", "");
    text = text.replace("</resources>", "");
    text = text.replace(/<string name=\"/g, "static let ");
    text = text.replace(/<\/string>/g, "\"");
    text = text.replace(/">/g, " = \"");
    return text;
  }

   $('#textarea1').val("<resources>\n" +
                "    <string name=\"app_name\">Great Eastern</string>\n" +
                "    <string name=\"no_internet\">Connectivity Issue</string>\n" +
                "    <string name=\"plese_select_country_code\">Select your country code</string>\n" +
                "    <string name=\"enter_valid_phone_number\">Enter valid phone number</string>\n" +
                "    <string name=\"otp_not_sent\">OTP not sent! Please enter valid mobile number.</string>\n" +
                "    <string name=\"wrong_otp_entered\">OTP did not matched!</string>\n" +
                "    <string name=\"enter_otp\">Enter 6 digit OTP</string>\n" +
                "    <string name=\"please_wait_sending_otp\">Please wait. Sending OTP...</string>\n" +
                "    <string name=\"please_wait_while_we_verify\">Please wait while verify OTP...</string>\n" +
                "    <string name=\"please_wait_while_we_submit_answer\">Please wait while submitting your answer...</string>\n" +
                "    <string name=\"empty_field\">Empty field!</string>\n" +
                "    <string name=\"enter_valid_email\">Enter valid email id</string>\n" +
                "    <string name=\"enter_valid_mobile\">Enter valid mobile number</string>\n" +
                "    <string name=\"select_item\">Select item first</string>\n" +
                "</resources>");

    var src = $("#textarea1").val();
    var dest = convert(src);
    $("#textarea2").val(dest);            

  $('#textarea1').bind('keypress', function () {
    var src = $("#textarea1").val();
    var dest = convert(src);
    $("#textarea2").val(dest);
  });

  $("#button1").click(function () {
    var src = $("#textarea1").val();
    var dest = convert(src);
    $("#textarea2").val(dest);
  });
});
