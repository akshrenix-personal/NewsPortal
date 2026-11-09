import express from "express";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";
import { userModel, newsModel, contactUsModel } from "../model/table.js";
import { requireAuth, requireAdmin, signToken } from "../middleware/auth.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const ALLOWED_IMG = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const isStr = (v) => typeof v === "string";
const isHttpUrl = (v) => {
  try {
    return ["http:", "https:"].includes(new URL(v).protocol);
  } catch {
    return false;
  }
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ok = (res, message, data) => res.json({ code: 200, message, data });
const fail = (res, message = "Request failed", code = 400) =>
  res.json({ code, message, data: "" });
const serverError = (res, err) => {
  console.error(err);
  return fail(res, "Internal Server Error", 500);
};

const safeUser = (user, withToken = false) => {
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  if (withToken) obj.token = signToken(user);
  return obj;
};

// Saves an uploaded profile image with a safe random name. Returns filename or null.
const saveProfile = async (file) => {
  if (!file) return null;
  if (!ALLOWED_IMG.includes(file.mimetype))
    throw new Error("Only image files are allowed");
  const ext = path
    .extname(file.name)
    .toLowerCase()
    .replace(/[^.a-z0-9]/g, "");
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
  await file.mv(path.join(UPLOAD_DIR, filename));
  return filename;
};

/* ---------------- AUTH ---------------- */

router.post("/user-register", async (req, res) => {
  try {
    const { name, email, password, contact, address } = req.body;
    if (
      ![name, email, password].every(isStr) ||
      !name.trim() ||
      !EMAIL_RE.test(email) ||
      password.length < 8 ||
      password.length > 72
    )
      return fail(
        res,
        "Valid name, email and a password of 8-72 characters are required",
      );

    const isExist = await userModel.findOne({ email: email.toLowerCase() });
    if (isExist) return fail(res, "User already exist!");

    let profile = "";
    try {
      profile = (await saveProfile(req.files?.profile)) || "";
    } catch (e) {
      return fail(res, e.message);
    }

    const result = await userModel.create({
      name,
      email,
      contact,
      address,
      profile,
      password: await bcrypt.hash(password, 10),
      userType: "user", // admins can only be created with the seed script
    });
    ok(res, "User registered successfully!", safeUser(result));
  } catch (err) {
    serverError(res, err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isStr(email) || !isStr(password))
      return fail(res, "invalid credentials");
    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return fail(res, "invalid credentials");
    ok(res, "Login Successfully....", safeUser(user, true));
  } catch (err) {
    serverError(res, err);
  }
});

router.put("/user-update", requireAuth, async (req, res) => {
  try {
    const { name, email, password, contact, address } = req.body;
    if (
      [name, email, password, contact, address].some(
        (v) => v !== undefined && !isStr(v),
      )
    )
      return fail(res, "Invalid input");
    if (email !== undefined && !EMAIL_RE.test(email))
      return fail(res, "Invalid email");
    const update = {
      name,
      email: email?.toLowerCase(),
      contact,
      address,
      updateAt: Date.now(),
    };
    if (password) {
      if (password.length < 8 || password.length > 72)
        return fail(res, "Password must be 8-72 characters");
      update.password = await bcrypt.hash(password, 10);
    }
    try {
      const profile = await saveProfile(req.files?.profile);
      if (profile) update.profile = profile;
    } catch (e) {
      return fail(res, e.message);
    }
    Object.keys(update).forEach(
      (k) => update[k] === undefined && delete update[k],
    );

    if (update.email) {
      const taken = await userModel.findOne({
        email: update.email,
        _id: { $ne: req.auth.id },
      });
      if (taken) return fail(res, "Email already in use");
    }
    const result = await userModel.findByIdAndUpdate(req.auth.id, update, {
      new: true,
    });
    if (!result) return fail(res, "Profile Update Failed.");
    ok(res, "Profile Updated successfully..", safeUser(result, true));
  } catch (err) {
    serverError(res, err);
  }
});

/* ---------------- NEWS (logged-in users) ---------------- */

router.post("/add-news", requireAuth, async (req, res) => {
  try {
    const { title, category, city, type, url, desc } = req.body;
    if (![title, type, url].every(isStr) || !title.trim())
      return fail(res, "Title, type and url are required");
    if (!["image", "video"].includes(type))
      return fail(res, "Type must be image or video");
    if (!isHttpUrl(url))
      return fail(res, "URL must start with http:// or https://");
    if (title.length > 150 || (desc && String(desc).length > 5000))
      return fail(res, "Title or description too long");
    const isExist = await newsModel.findOne({ title });
    if (isExist) return fail(res, "Title Already Exist.");
    const result = await newsModel.create({
      title,
      category,
      type,
      city,
      url,
      desc,
      userId: req.auth.id,
    });
    ok(res, "News Added Successfully.", result);
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/user-your-news", requireAuth, async (req, res) => {
  try {
    const result = await newsModel
      .find({ userId: req.auth.id })
      .sort({ createAt: -1 });
    ok(res, "Data fetched succeessfully..", result);
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/all-approved-news", async (req, res) => {
  try {
    const result = await newsModel
      .find({ isApproved: true })
      .sort({ createAt: -1 });
    ok(res, "Data fetched succeessfully..", result);
  } catch (err) {
    serverError(res, err);
  }
});

/* ---------------- PUBLIC HOME PAGE DATA ---------------- */

router.get("/top-ten-news", async (req, res) => {
  try {
    const result = await newsModel
      .find({ type: "image", isApproved: true })
      .sort({ createAt: -1 })
      .limit(10);
    ok(res, "Data fetched successfully", result);
  } catch (err) {
    serverError(res, err);
  }
});

// first (latest) news item for each distinct value of `field`
const uniqueBy = async (field, limit) => {
  const result = await newsModel
    .find({ type: "image", isApproved: true })
    .sort({ createAt: -1 });
  const seen = new Set();
  const unique = result.filter((item) => {
    if (seen.has(item[field])) return false;
    seen.add(item[field]);
    return true;
  });
  return limit ? unique.slice(0, limit) : unique;
};

router.get("/top-category", async (req, res) => {
  try {
    ok(res, "Data fetched successfully", await uniqueBy("category", 6));
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/top-city", async (req, res) => {
  try {
    ok(res, "Data fetched successfully", await uniqueBy("city"));
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/top-video", async (req, res) => {
  try {
    const result = await newsModel
      .find({ type: "video", isApproved: true })
      .sort({ createAt: -1 });
    ok(res, "Data fetched successfully", result);
  } catch (err) {
    serverError(res, err);
  }
});

/* ---------------- CONTACT ---------------- */

router.post("/add-contact-us", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (
      ![name, email, message].every(isStr) ||
      !name.trim() ||
      !EMAIL_RE.test(email) ||
      !message.trim()
    )
      return fail(res, "Valid name, email and message are required");
    if (message.length > 3000) return fail(res, "Message too long");
    const result = await contactUsModel.create({
      name,
      email,
      phone: isStr(phone) ? phone : "",
      message,
    });
    ok(res, "Save successfully.", result);
  } catch (err) {
    serverError(res, err);
  }
});

/* ---------------- ADMIN ONLY ---------------- */

router.get("/admin-all-list", requireAuth, requireAdmin, async (req, res) => {
  try {
    ok(
      res,
      "Data fetched succeessfully..",
      await newsModel.find().sort({ createAt: -1 }),
    );
  } catch (err) {
    serverError(res, err);
  }
});

router.put(
  "/admin-news-approved",
  requireAuth,
  requireAdmin,
  async (req, res) => {
    try {
      const { _id, isApproved } = req.body;
      const result = await newsModel.findByIdAndUpdate(
        _id,
        { isApproved, updateAt: Date.now() },
        { new: true },
      );
      if (!result) return fail(res, "Updated Failed.");
      ok(res, "Updated succeessfully..", result);
    } catch (err) {
      serverError(res, err);
    }
  },
);

router.post("/delete-news", requireAuth, requireAdmin, async (req, res) => {
  try {
    const result = await newsModel.findByIdAndDelete(req.body._id);
    if (!result) return fail(res, "News Deleted failed");
    ok(res, "News Deleted Successfully", result);
  } catch (err) {
    serverError(res, err);
  }
});

router.get("/get-contact-us", requireAuth, requireAdmin, async (req, res) => {
  try {
    ok(
      res,
      "Data fetched successfully.",
      await contactUsModel.find().sort({ createAt: -1 }),
    );
  } catch (err) {
    serverError(res, err);
  }
});

export default router;
