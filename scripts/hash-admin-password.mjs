import bcrypt from "bcryptjs";

const plainPassword = process.argv[2] || "admin123";
const rounds = 12;

const hash = await bcrypt.hash(plainPassword, rounds);

console.log("Plain password:", plainPassword);
console.log("Bcrypt hash:", hash);
console.log("Use this value in site_settings.admin_password or ADMIN_PASSWORD_HASH.");
