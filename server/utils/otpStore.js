const otpStore = new Map();

export const saveOtp = (email, data) => {
  otpStore.set(email, {
    ...data,
    otpExpiry: Date.now() + 10 * 60 * 1000,
  });
};

export const getOtpData = (email) => otpStore.get(email);

export const deleteOtp = (email) => otpStore.delete(email);