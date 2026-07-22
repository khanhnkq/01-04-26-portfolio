"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COFFEE_PRESETS, BANK_CONFIG, getVietQRUrl, SupporterMessage } from "@/data/coffeeConfig";

interface CoffeeFormProps {
  cupsCount: number;
  setCupsCount: (count: number) => void;
  onSupporterAdd: (supporter: SupporterMessage) => void;
}

const PRESET_KAOMOJIS = ["(^ ᴗ ^)", "(♡ ‿ ♡)", "(づ｡◕‿‿◕｡)づ"];

export default function CoffeeForm({
  cupsCount,
  setCupsCount,
  onSupporterAdd,
}: CoffeeFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentPreset = COFFEE_PRESETS.find((p) => p.count === cupsCount);
  const totalAmount = currentPreset
    ? currentPreset.amountVnd
    : cupsCount * 30000;

  const memo = `${name.trim() ? name.trim() : "Friend"}-${cupsCount}Coffee`;
  const qrUrl = getVietQRUrl(totalAmount, memo);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BANK_CONFIG.accountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmSent = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupporter: SupporterMessage = {
      id: `sup-${Date.now()}`,
      name: name.trim() || "Kind Friend (^ ᴗ ^)",
      cups: cupsCount,
      amount: totalAmount,
      message: message.trim() || "Enjoy the warm coffee! (♡ ‿ ♡)",
      createdAt: "Just now",
      avatarBg: "#FFE06B",
    };

    onSupporterAdd(newSupporter);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <div className="w-full bg-paper text-gray-900 rounded-3xl p-6 sm:p-8 md:p-10  border-4 border-brand-yellow relative overflow-hidden">
      {/* Decorative Stamp Header */}
      <div className="absolute top-0 right-0 bg-brand-yellow text-brand-blue font-black px-6 py-2 rounded-bl-2xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm">
        <span>(♡ ‿ ♡)</span> VietQR Instant
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-blue uppercase tracking-tight mb-1.5">
        BUY A COFFEE (づ｡◕‿‿◕｡)づ
      </h2>
      <p className="text-gray-600 font-medium text-xs sm:text-sm mb-6">
        Support via instant VietQR code with customized amount & memo!
      </p>

      {/* Main 2-Column Grid inside Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">

        {/* Left Column: Presets + Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {/* Presets */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              1. Select Coffee Amount
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {COFFEE_PRESETS.map((preset, i) => {
                const isSelected = cupsCount === preset.count;
                return (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setCupsCount(preset.count)}
                    className={`relative flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl border-2 transition-all cursor-pointer font-sans ${isSelected
                        ? "bg-brand-blue text-brand-yellow border-brand-blue shadow-lg scale-105"
                        : "bg-white text-gray-800 border-gray-200 hover:border-brand-blue/50"
                      }`}
                  >
                    <span className="font-mono text-xs font-bold mb-1">
                      {PRESET_KAOMOJIS[i % PRESET_KAOMOJIS.length]}
                    </span>
                    <span className="font-bold text-sm sm:text-base">{preset.label}</span>
                    <span className={`text-xs ${isSelected ? "text-brand-white" : "text-gray-500"}`}>
                      {preset.amountVnd.toLocaleString("vi-VN")} đ
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Stepper */}
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border-2 border-gray-200 text-xs">
              <span className="font-bold text-gray-600 uppercase text-xs">
                Custom Cups Count:
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCupsCount(Math.max(1, cupsCount - 1))}
                  className="w-8 h-8 rounded-xl bg-gray-100 font-black text-base text-gray-700 hover:bg-brand-yellow hover:text-brand-blue transition-colors flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="font-black text-base text-brand-blue w-6 text-center">
                  {cupsCount}
                </span>
                <button
                  type="button"
                  onClick={() => setCupsCount(cupsCount + 1)}
                  className="w-8 h-8 rounded-xl bg-gray-100 font-black text-base text-gray-700 hover:bg-brand-yellow hover:text-brand-blue transition-colors flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              2. Your Name / Nickname (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Alex Dev, Anonymous Friend..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-blue outline-none text-sm font-medium bg-white"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              3. Message / Wishes (Optional)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a sweet note or thoughts..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-blue outline-none text-sm font-medium bg-white resize-none"
            />
          </div>
        </div>

        {/* Right Column: VietQR Code & Bank Info */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border-2 border-brand-blue/20 flex flex-col items-center text-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Scan VietQR Code To Transfer
          </span>
          <span className="text-2xl sm:text-3xl font-black text-brand-blue mb-3">
            {totalAmount.toLocaleString("vi-VN")} VNĐ
          </span>

          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-md mb-3">
            <img
              src={qrUrl}
              alt="VietQR Code"
              className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-lg"
            />
          </div>

          {/* Bank Copy Box */}
          <div className="w-full bg-gray-50 p-3 rounded-xl text-left text-xs space-y-1.5 border border-gray-200 font-medium">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Bank:</span>
              <span className="font-bold text-gray-800">{BANK_CONFIG.bankName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Account No:</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-brand-blue font-mono text-sm">{BANK_CONFIG.accountNo}</span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="px-2 py-0.5 bg-brand-blue text-white rounded text-[10px] font-bold hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-gray-200">
              <span className="text-gray-500">Transfer Memo:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono truncate max-w-[140px]">
                {memo}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ===== ACTION BUTTON ===== */}
      <button
        type="button"
        onClick={handleConfirmSent}
        className="w-full py-4 rounded-2xl bg-brand-blue text-brand-yellow font-black text-sm uppercase tracking-wider hover:bg-blue-600 active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>CONFIRM COFFEE SENT (づ｡◕‿‿◕｡)づ</span>
      </button>

      {/* Success Notification Toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            className="mt-4 p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg flex items-center justify-center gap-2"
          >
            <span>(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ Thank you so much! Message posted on Wall of Appreciation!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
