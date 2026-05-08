import 'dotenv/config';
import {AppDataSource} from "@/data-source";
import argon2 from "argon2";
import {Role} from "@/core/enums/role.enum";
import {Users} from "@/features/auth/users.entity";

export async function createSuperAdmin() {
  const adminFullName = process.env.ADMIN_FULLNAME;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !adminUsername || !adminFullName) {
    throw new Error("Admin username and password not found in environment variables");
  }

  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository<Users>(Users);

  const alreadyExists = await userRepo.existsBy({userName: adminUsername});
  if (!alreadyExists) {
    const newSuperAdmin = userRepo.create({
      role: Role.SuperAdmin, userName: adminUsername, fullName: adminFullName, isActive: true, isVerified: true, password: ""
    } as Users);
    newSuperAdmin.password = await argon2.hash(adminPassword);
    await Users.save(newSuperAdmin);
  }
}