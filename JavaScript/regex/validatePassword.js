/**
 * This function validates a password string based on specific criteria and returns a
 * strength assessment ('strong", "medium" or "weak").
 * 
 * @param {string} password The password string to be validated.
 * @returns {string}
 * 
 * @description
 * #### Regular Expressions:
 * 
 * *strongReg*: This regex checks for all the following conditions for a strong password:
 * - At least one lowercase letter `((?=.*[a-z]))`
 * - At least one uppercase letter `((?=.*[A-Z]))`
 * - At least one digit `((?=.*[0-9]))`
 * - At least one special character `((?=.*[^A-Za-z0-9]))`
 * - Minimum length of 8 characters `((?=.{8,}))`
 * 
 * *mediumReg*: This regex checks for medium password strength with two options:
 * - Option 1: Meets all strong requirements except for special characters (at least 6 characters long).
 *     - This part checks for lowercase, uppercase, digits, and minimum length of 6 characters: `((?=.[a-z])(?=.[A-Z])(?=.*[0-9])(?=.{6,}))`.
 * - Option 2: Meets all requirements except for digits (at least 8 characters long).
 *     - This part checks for lowercase, uppercase, and minimum length of 8 characters: `((?=.[a-z])(?=.[A-Z])(?=.{8,}))`.
 * 
 * #### Strength Assessment
 * - The function first checks if the password matches the strongReg. If it does, return "strong".
 * - If not strong, it checks if the password matches the mediumReg. If it does, return "medium".
 * - If the password doesn't meet either, it returns "weak".
 * 
 * @author Nycolas Felipe
 */
const validatePassword = (password) => {
  const strongReg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
  const mediumReg = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.{8,}))');

  if (strongReg.test(String(password))) {
    return "strong";
  }
  if (mediumReg.test(String(password))) {
    return "medium";
  }
  return "weak";
};

export default validatePassword;