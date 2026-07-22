const MOBILE_RE = /^\d{10}$/;
const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function validateEventRegistration(body) {
  const errors = {};
  if (!body.name || !body.name.trim()) errors.name = 'Required';
  if (!MOBILE_RE.test(body.mobile || '')) errors.mobile = 'Enter a valid 10-digit number';
  if (!EMAIL_RE.test(body.email || '')) errors.email = 'Enter a valid email';
  if (!body.org || !body.org.trim()) errors.org = 'Required';
  if (!body.designation || !body.designation.trim()) errors.designation = 'Required';
  if (!body.city || !body.city.trim()) errors.city = 'Required';
  if (!body.bio || !body.bio.trim()) errors.bio = 'Required';
  return errors;
}
