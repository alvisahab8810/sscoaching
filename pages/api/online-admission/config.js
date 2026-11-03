// Public configuration for the admission pages: launch mode, live prices and
// the NIOS rules the wizard needs.
import {
  PACKAGES, INCLUSIONS, STREAMS, SUBJECTS, SCIENCE_CODES, STATUSES, currentBlock,
} from "@/lib/onlineAdmission/config";
import { route, getSettings } from "@/lib/onlineAdmission/server";

export default route({
  async GET() {
    const s = await getSettings();
    const packages = JSON.parse(JSON.stringify(PACKAGES));
    packages["10"].price = +s.price_10;
    packages["12"].price = +s.price_12;
    if (s.test_card !== false) packages.test = { label: "Test package", price: +s.test_price || 1, tagline: "Only for testing the payment flow (Class 10th form)", level: "Secondary" };
    return {
      launch_mode: s.launch_mode, packages, inclusions: INCLUSIONS, streams: STREAMS, subjects: SUBJECTS,
      science_codes: SCIENCE_CODES, statuses: STATUSES, current_block: currentBlock(),
      payment_mode: process.env.RAZORPAY_KEY_ID ? "razorpay" : "off",
    };
  },
});
