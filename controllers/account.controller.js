const Account = require("../models/account.model");
const cloudinary = require("../config/cloudinary");
const Cart = require("../models/cart.model");
const bcrypt = require("bcrypt");
module.exports.createAccount = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (role == "user") {
      const account = await Account.create({ email, password, role });
      const cart = await Cart.create({ user_id: account._id });
      res.status(200).send(account);
    }
    else {
      const account = await Account.create({ email, password });
      res.status(200).send(account);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.updateAccount = async (req, res) => {
  const { id } = req.params;
  const currentAccount = await Account.findById(id);
  const ImgId = currentAccount.avatar.public_id;
  if (ImgId != "null") {
    await cloudinary.uploader.destroy(ImgId);
  }
  try {
    if(req.body.avatar.public_id == "null"){
    const result = await cloudinary.uploader.upload(req.body.avatar.url, {
      folder: "accounts",
      // width: 300,
      // crop: "scale"
  })
    console.log(result);
    req.body.avatar = {public_id: result.public_id, url: result.secure_url};
  }
    const account = await Account.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ account });
  } catch (error) {
    res.status(400).json({ error });
  }
}
module.exports.deleteAccount = async (req, res) => {
  const { id } = req.params;
  const currentAccount = await Account.findById(id);
  const ImgId = currentAccount.avatar.public_id;
  if (ImgId != "null") {
    await cloudinary.uploader.destroy(ImgId);
  }
  try {
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    const cart = await Cart.findOneAndDelete({ user_id: id });
    res.status(200).json({ account });
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldpassword, newpassword } = req.body;
  try {
    console.log("Change password");
    const account = await Account.findById(id);
    const check = await bcrypt.compare(oldpassword, account.password);
    if(!check){
      console.log("Old password is incorrect");
      res.status(400).json({ error: "Old password is incorrect" });
    } else {
      account.password = newpassword;
      await account.save();
      console.log("Change password successfully");
      res.status(200).json({ account });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};