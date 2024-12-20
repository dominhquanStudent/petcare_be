const Voucher = require('../models/voucher.model');

// Get all vouchers
exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserVouchers = async (req, res) => {
    try {
      const currentDate = new Date();
      const vouchers = await Voucher.find({
        status: 'active',
        // beginDate: { $lte: currentDate },
        // endDate: { $gte: currentDate }
      });
      res.status(200).json(vouchers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
// Create a new voucher
exports.createVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.create(req.body);
        res.status(201).json(voucher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a voucher by ID
exports.updateVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!voucher) {
            return res.status(404).json({ error: 'Voucher not found' });
        }
        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a voucher by ID
exports.deleteVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) {
            return res.status(404).json({ error: 'Voucher not found' });
        }
        res.status(200).json({ message: 'Voucher deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};  
module.exports.getVouchertById = async (req, res) => {
    const { id } = req.params;
    try {
      const voucher = await Voucher.findById(id);
      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }
      res.status(200).json({ voucher });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
module.exports.getVoucherByCode = async (req, res) => {
    const { code } = req.params;
    try {
      const voucher = await Voucher.findOne({ code });
        if (!voucher) {
            return res.status(404).json({ error: "Voucher not found" });
        }
        res.status(200).json({ voucher });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};







