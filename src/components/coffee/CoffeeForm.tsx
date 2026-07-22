"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  COFFEE_PRESETS,
  COFFEE_PRICE_VND,
  MAX_CUPS,
} from "@/data/coffeeConfig";
import type {
  DonationCheckout,
  DonationStatusResponse,
} from "@/types/donation";

interface CoffeeFormProps {
  cupsCount: number;
  setCupsCount: (count: number) => void;
  onDonationPaid: () => void | Promise<void>;
}

type CopyField = "account" | "paymentCode" | null;

const PRESET_KAOMOJIS = ["(^ ᴗ ^)", "(♡ ‿ ♡)", "(づ｡◕‿‿◕｡)づ"];
const ACTION_BUTTON_CLASS =
  "w-full min-h-14 px-5 py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-[transform,background-color,box-shadow,opacity] shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none";

export default function CoffeeForm({
  cupsCount,
  setCupsCount,
  onDonationPaid,
}: CoffeeFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [checkout, setCheckout] = useState<DonationCheckout | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<CopyField>(null);
  const [isPaidToastVisible, setIsPaidToastVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const totalAmount = cupsCount * COFFEE_PRICE_VND;
  const isLocked = Boolean(checkout && checkout.status !== "paid" && !isExpired);
  const checkoutId = checkout?.id;
  const checkoutStatus = checkout?.status;
  const checkoutExpiresAt = checkout?.expiresAt;

  useEffect(() => {
    if (checkoutStatus !== "paid") {
      return;
    }

    setIsPaidToastVisible(true);
    const timeoutId = window.setTimeout(
      () => setIsPaidToastVisible(false),
      6_000,
    );

    return () => window.clearTimeout(timeoutId);
  }, [checkoutStatus]);

  useEffect(() => {
    if (!checkoutId || !checkoutExpiresAt || checkoutStatus === "paid" || isExpired) {
      return;
    }

    let isActive = true;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/donations/${checkoutId}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as DonationStatusResponse;
        if (!isActive) {
          return;
        }

        setCheckout((current) => {
          if (!current || current.status === data.status) {
            return current;
          }
          return { ...current, status: data.status };
        });

        if (data.status === "paid") {
          setError(null);
          await onDonationPaid();
        }
      } catch {
        // A transient polling error should not destroy an active checkout.
      }
    };

    const remainingMs = new Date(checkoutExpiresAt).getTime() - Date.now();
    if (remainingMs <= 0) {
      setIsExpired(true);
      return;
    }

    void checkStatus();
    const intervalId = window.setInterval(() => void checkStatus(), 3_000);
    const timeoutId = window.setTimeout(() => setIsExpired(true), remainingMs);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [checkoutExpiresAt, checkoutId, checkoutStatus, isExpired, onDonationPaid]);

  const copyText = async (value: string, field: Exclude<CopyField, null>) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2_000);
    } catch {
      setError("Không thể sao chép tự động. Vui lòng sao chép thủ công.");
    }
  };

  const createCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCreating || isLocked) {
      return;
    }

    setIsCreating(true);
    setError(null);
    setIsExpired(false);

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cups: cupsCount, name, message }),
      });
      const data = (await response.json()) as DonationCheckout | { error: string };

      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Unable to create donation");
      }

      setCheckout(data);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Không thể tạo mã thanh toán lúc này.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const resetCheckout = () => {
    setCheckout(null);
    setIsExpired(false);
    setIsPaidToastVisible(false);
    setError(null);
    setName("");
    setMessage("");
    setCupsCount(3);
  };

  return (
    <>
      <form
        onSubmit={createCheckout}
        className="w-full bg-paper text-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 border-4 border-brand-yellow relative overflow-hidden"
      >
      <div className="absolute top-0 right-0 bg-brand-yellow text-brand-blue font-black px-6 py-2 rounded-bl-2xl text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm">
        <span>(♡ ‿ ♡)</span> SePay Verified
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-blue uppercase tracking-tight mb-1.5">
        BUY A COFFEE (づ｡◕‿‿◕｡)づ
      </h2>
      <p className="text-gray-600 font-medium text-xs sm:text-sm mb-6">
        Tạo VietQR riêng và tự động xác nhận giao dịch qua SePay.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-6">
        <div className="lg:col-span-7 space-y-4">
          <fieldset disabled={isLocked || isCreating}>
            <legend className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              1. Select Coffee Amount
            </legend>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {COFFEE_PRESETS.map((preset, index) => {
                const isSelected = cupsCount === preset.count;
                return (
                  <button
                    key={preset.count}
                    type="button"
                    onClick={() => setCupsCount(preset.count)}
                    className={`relative flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl border-2 transition-all cursor-pointer font-sans disabled:cursor-not-allowed disabled:opacity-70 ${
                      isSelected
                        ? "bg-brand-blue text-brand-yellow border-brand-blue shadow-lg scale-105"
                        : "bg-white text-gray-800 border-gray-200 hover:border-brand-blue/50"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold mb-1">
                      {PRESET_KAOMOJIS[index % PRESET_KAOMOJIS.length]}
                    </span>
                    <span className="font-bold text-sm sm:text-base">
                      {preset.label}
                    </span>
                    <span
                      className={`text-xs ${
                        isSelected ? "text-brand-white" : "text-gray-500"
                      }`}
                    >
                      {preset.amountVnd.toLocaleString("vi-VN")} đ
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border-2 border-gray-200 text-xs">
              <span className="font-bold text-gray-600 uppercase text-xs">
                Custom Cups Count:
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Giảm số ly cà phê"
                  onClick={() => setCupsCount(Math.max(1, cupsCount - 1))}
                  className="w-8 h-8 rounded-xl bg-gray-100 font-black text-base text-gray-700 hover:bg-brand-yellow hover:text-brand-blue transition-colors flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="font-black text-base text-brand-blue w-6 text-center">
                  {cupsCount}
                </span>
                <button
                  type="button"
                  aria-label="Tăng số ly cà phê"
                  onClick={() => setCupsCount(Math.min(MAX_CUPS, cupsCount + 1))}
                  className="w-8 h-8 rounded-xl bg-gray-100 font-black text-base text-gray-700 hover:bg-brand-yellow hover:text-brand-blue transition-colors flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="supporter-name"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              2. Your Name / Nickname (Optional)
            </label>
            <input
              id="supporter-name"
              type="text"
              maxLength={80}
              disabled={isLocked || isCreating}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="E.g., Alex Dev, Anonymous Friend..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-blue outline-none text-sm font-medium bg-white disabled:opacity-70"
            />
          </div>

          <div>
            <label
              htmlFor="supporter-message"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5"
            >
              3. Message / Wishes (Optional)
            </label>
            <textarea
              id="supporter-message"
              rows={2}
              maxLength={500}
              disabled={isLocked || isCreating}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a sweet note or thoughts..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-blue outline-none text-sm font-medium bg-white resize-none disabled:opacity-70"
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border-2 border-brand-blue/20 flex flex-col items-center text-center min-h-[390px] justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {checkout ? "Scan VietQR To Transfer" : "Secure VietQR Preview"}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-brand-blue mb-3">
            {(checkout?.amount ?? totalAmount).toLocaleString("vi-VN")} VNĐ
          </span>

          {checkout ? (
            <>
              <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-md mb-3">
                {/* The bank-generated QR must be fetched fresh and must not pass through image optimization caches. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={checkout.qrUrl}
                  alt={`VietQR ${checkout.paymentCode}`}
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-lg"
                />
              </div>
              <div className="w-full bg-gray-50 p-3 rounded-xl text-left text-xs space-y-2 border border-gray-200 font-medium">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-500">Bank:</span>
                  <span className="font-bold text-gray-800">{checkout.bank.code}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-500">Account:</span>
                  <button
                    type="button"
                    onClick={() =>
                      void copyText(checkout.bank.accountNumber, "account")
                    }
                    className="font-black text-brand-blue font-mono text-sm cursor-pointer"
                  >
                    {checkout.bank.accountNumber} · {copiedField === "account" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="flex justify-between items-center gap-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-500">Transfer memo:</span>
                  <button
                    type="button"
                    onClick={() =>
                      void copyText(checkout.paymentCode, "paymentCode")
                    }
                    className="font-black text-amber-700 bg-amber-50 px-2 py-1 rounded font-mono cursor-pointer"
                  >
                    {checkout.paymentCode} · {copiedField === "paymentCode" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-52 h-52 rounded-2xl border-2 border-dashed border-brand-blue/20 bg-brand-blue/5 flex flex-col items-center justify-center px-6 text-brand-blue">
              <span className="text-4xl mb-3">☕</span>
              <span className="font-black text-sm uppercase">Create your QR</span>
              <span className="text-xs mt-2 text-gray-500">
                Mã chuyển khoản riêng được tạo ở bước tiếp theo.
              </span>
            </div>
          )}
        </div>
      </div>

      {checkout?.status === "paid" ? (
        <button
          type="button"
          onClick={resetCheckout}
          className={`${ACTION_BUTTON_CLASS} bg-brand-blue text-brand-yellow hover:bg-blue-600`}
        >
          GỬI THÊM MỘT LY CÀ PHÊ
        </button>
      ) : isExpired ? (
        <button
          type="button"
          onClick={resetCheckout}
          className={`${ACTION_BUTTON_CLASS} bg-gray-700 text-white hover:bg-gray-800`}
        >
          QR EXPIRED · CREATE A NEW ONE
        </button>
      ) : (
        <button
          type="submit"
          disabled={isCreating || isLocked}
          className={`${ACTION_BUTTON_CLASS} bg-brand-blue text-brand-yellow hover:bg-blue-600 disabled:cursor-wait disabled:opacity-80`}
        >
          {isCreating
            ? "CREATING SECURE VIETQR..."
            : checkout?.status === "amount_mismatch"
              ? "TRANSFER AMOUNT DOES NOT MATCH"
              : checkout
                ? "WAITING FOR SEPAY VERIFICATION..."
                : "CREATE SECURE VIETQR (づ｡◕‿‿◕｡)づ"}
        </button>
      )}

      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            role="alert"
            className="mt-4 p-4 rounded-2xl bg-red-600 text-white font-bold text-xs sm:text-sm text-center shadow-lg"
          >
            {error}
          </motion.div>
        ) : null}
        {checkout?.status === "amount_mismatch" ? (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            role="status"
            className="mt-4 p-4 rounded-2xl bg-amber-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg"
          >
            SePay đã nhận giao dịch nhưng số tiền chưa khớp. Vui lòng chuyển đúng số tiền hiển thị với cùng nội dung.
          </motion.div>
        ) : null}
      </AnimatePresence>
      </form>

      <AnimatePresence>
        {isPaidToastVisible ? (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { y: 12, opacity: 0 }
            }
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="fixed inset-x-4 bottom-4 z-[100] flex items-start gap-3 rounded-2xl border-2 border-brand-yellow bg-brand-blue p-4 text-brand-white shadow-[0_18px_50px_rgba(10,44,110,0.28)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[390px]"
          >
            <div
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-yellow text-lg font-black text-brand-blue"
            >
              ✓
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-black uppercase tracking-wide text-brand-yellow">
                Thanh toán đã xác nhận
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-white/85 sm:text-sm">
                Cảm ơn bạn! Lời nhắn đã được đăng lên danh sách supporters.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPaidToastVisible(false)}
              aria-label="Đóng thông báo"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl text-xl leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
            >
              ×
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
