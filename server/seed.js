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
    const existingAdmin = await Admin.findOne({ email: "admin@synchomes.com" });
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create admin
    const newAdmin = new Admin({
      email: "admin@synchomes.com",
      password: hashedPassword,
      name: "Admin",
    });

    await newAdmin.save();
    console.log("✓ Admin user created successfully!");
    console.log("  Email: admin@synchomes.com");
    console.log("  Password: Admin@123");
    console.log("  ⚠️  Change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
