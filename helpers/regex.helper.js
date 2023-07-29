const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const username = /^[a-z0-9_-]{3,15}$/;
const name = /^[A-Za-z]{2,30}$/;

export const RegExHelper = {
  email,
  password,
  username,
  name
}