import { connect } from "mongoose";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

async function seedAdmin() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Check if admin already exists
    const adminEmail = process.env.ADMIN_EMAIL || "admin@synchomes.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin
    const newAdmin = new Admin({
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
    });

    await newAdmin.save();
    console.log("✓ Admin user created successfully!");
    console.log("  Email:", adminEmail);
    console.log("  Password: [HIDDEN]");
    console.log("  ⚠️  Password is set from ADMIN_PASSWORD environment variable");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
