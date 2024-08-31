// Import các modules cần thiết
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const bcryptHash = promisify(bcrypt.hash);
const bcryptCompare = promisify(bcrypt.compare);

// Handler cho route GET /sign-in: Hiển thị form đăng nhập
exports.getSignIn = (req, res) => {
  res.render("login");
};

// Handler cho route GET /sign-up: Hiển thị form đăng ký
exports.getSignUp = (req, res) => {
  res.render("sign-up");
};

// Handler cho route GET /sign-out: Đăng xuất người dùng
exports.getSignOut = (req, res) => {
  // res.clearCookie(name, [options]);
  res.clearCookie("authorization");
  res.redirect("login");
};

// Handler cho route POST /sign-in: Xử lý đăng nhập người dùng
exports.postSignIn = async (req, res) => {
  // 1. Tìm người dùng dựa trên email
  const result = await User.findByEmail(req.body.email);
  const foundUser = result[0];
  console.log(result[0].email);

  // 2. Kiểm tra người dùng tồn tại
  if (!foundUser)
    return res.render("login", { error: "Email không tồn tại." });

  // 3. Kiểm tra mật khẩu
  if (!(await bcryptCompare(req.body.password, foundUser.password)))
    return res.render("login", { error: "Mật khẩu không đúng." });

  // 4. Tạo JWT (JSON Web Token)
  const expiresIn = 6 * 60 * 60 * 1000; // Token hết hạn sau 6 giờ
  // Tạo ra payload (chứa email và role), một secret key ("secret"), còn header thì thư viện sẽ tự động tạo ra header cần thiết cho JWT
  const token = jwt.sign(
    {
      email: foundUser.email
    },
    "secret",
    {
      expiresIn,
      encoding: "utf-8",
      issuer: "Server",
    }
  );

  // 5. Thiết lập Cookie và Chuyển hướng
  // res.cookie(name, value, [options])
  res.cookie("authorization", token, {
    expires: new Date(Date.now() + expiresIn),
  });
  res.redirect("/");
};

// Handler cho route POST /sign-up: Xử lý đăng ký người dùng
exports.postSignUp = async (req, res) => {
  // 1. Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
  const result = await User.findByEmail(req.body.email);
  const foundUser = result[0];
  const foundEmail = result[0].email;

  // 2. Nếu email đã tồn tại, trả về lỗi
  if (foundEmail)
    return res.render("login", { error: "Email đã tồn tại." });

  // 3. Mã hóa mật khẩu
  const hashedPassword = await bcryptHash(req.body.password, 10);

  // 4. Thêm người dùng mới vào cơ sở dữ liệu
  await User.insert(req.body.email, hashedPassword, req.body.name);

  // 5. Chuyển hướng người dùng đến trang đăng nhập
  res.redirect("login");
};
