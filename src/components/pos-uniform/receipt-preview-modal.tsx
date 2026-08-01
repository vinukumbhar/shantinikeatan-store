"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Info,
  Share2,
  Printer,
  Download,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Barcode from "react-barcode";

import { useState } from "react";
interface ReceiptItem {
  sNo: number;
  name: string;
  qty: number;
  rate: number;
  amount: number;
}

interface ReceiptPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  billData: {
    billNo: string;
    date: string;
    time: string;
    cashier: string;
    counter: string;
    items: ReceiptItem[];
    subtotal: number;
    discount: number;
    tax: number;
    totalAmount: number;
  };
}

export function ReceiptPreviewModal({
  isOpen,
  onClose,
  billData,
}: ReceiptPreviewModalProps) {
  const totalItemsCount =
    billData?.items?.reduce((acc, curr) => acc + curr.qty, 0) || 0;
  const [isPaymentReceived, setIsPaymentReceived] = useState(false);

  const [paymentMode, setPaymentMode] = useState<"CASH" | "ONLINE">("CASH");
  const [transactionId, setTransactionId] = useState("");
  const [confirmedPaymentMode, setConfirmedPaymentMode] = useState<
    "CASH" | "ONLINE"
  >("CASH");
  const [confirmedTxnId, setConfirmedTxnId] = useState("");

  return (
    <AnimatePresence>
      {isOpen && billData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* BLURRED BACKGROUND OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-sm transition-all duration-300"
          />

          {/* MAIN MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-100 dark:bg-neutral-900 rounded-2xl border shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* MODAL DIALOG HEADER */}
            <div className="flex items-center justify-between px-6 py-4 bg-background border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg border">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Receipt Preview
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Thermal Receipt (80mm)
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* MODAL WORKSPACE CONTENT GRID */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: THERMAL RECEIPT VIEWPORT WRAPPER */}
              <div className="col-span-12 md:col-span-7 flex justify-center">
                <div className="w-full max-w-[390px] bg-white text-black p-5 shadow-lg border relative select-none">
                  {/* STORE IDENTITY BANNER */}
                  <div className="text-center space-y-1">
                    <div className="flex justify-center mb-1">
                      <div className="h-10 w-10 border-2 border-black rounded-full flex items-center justify-center font-black text-sm tracking-tighter">
                        ABC
                      </div>
                    </div>
                    <h2 className="text-sm font-black tracking-wider uppercase">
                      Shantinikeatan
                    </h2>
                    <p className="text-[10px] font-bold text-neutral-600">
                    R. S. No. 134 Morewadi Road , Kolhapur 416013
                    </p>
                    {/* <p className="text-[9px] leading-tight text-neutral-500 font-medium">
                      Shivaji Road, New Delhi - 110001 <br /> Ph: +91 11 2345
                      6789
                    </p> */}
                  </div>

                  <div className="border-b border-dashed border-neutral-400 my-3" />
                  <h3 className="text-center text-xs font-black tracking-widest my-1 uppercase">
                    Final Bill
                  </h3>
                  <div className="border-b border-dashed border-neutral-400 my-3" />

                  {/* TRANSACTION METADATA */}
                  <div className="grid grid-cols-12 gap-x-2 text-[10px] font-mono leading-relaxed text-neutral-800">
                    <div className="col-span-6">
                      Bill No : {billData.billNo}
                    </div>
                    <div className="col-span-6">
                      Cashier : {billData.cashier}
                    </div>
                    <div className="col-span-6">
                      Date &nbsp; : {billData.date}
                    </div>
                    <div className="col-span-6">
                      Counter : {billData.counter}
                    </div>
                    <div className="col-span-12">
                      Time &nbsp; : {billData.time}
                    </div>
                  </div>

                  <div className="border-b border-dashed border-neutral-400 my-3" />

                  {/* ITEMIZATION DATA TABLE MODULE */}
                  <div className="text-[9px] font-mono w-full">
                    <div className="grid grid-cols-12 gap-1 font-bold text-neutral-900 border-b pb-1 mb-1">
                      <div className="col-span-1">S.N</div>
                      <div className="col-span-6">Item Name</div>
                      <div className="col-span-1 text-center">Qty</div>
                      <div className="col-span-2 text-right">Rate(₹)</div>
                      <div className="col-span-2 text-right">Amt(₹)</div>
                    </div>

                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
                      {billData.items?.map((item) => (
                        <div
                          key={item.sNo}
                          className="grid grid-cols-12 gap-1 text-neutral-800 leading-tight"
                        >
                          <div className="col-span-1 tabular-nums">
                            {item.sNo}
                          </div>
                          <div className="col-span-6 font-medium break-words">
                            {item.name}
                          </div>
                          <div className="col-span-1 text-center tabular-nums">
                            {item.qty}
                          </div>
                          <div className="col-span-2 text-right tabular-nums">
                            {item.rate.toFixed(2)}
                          </div>
                          <div className="col-span-2 text-right tabular-nums font-bold">
                            {item.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-b border-dashed border-neutral-400 my-3" />

                  {/* FINANCIAL TOTAL COMPILATION */}
                  <div className="space-y-1 text-[10px] font-mono text-neutral-800">
                    <div className="flex justify-between">
                      <span>Items / Qty</span>
                      <span className="tabular-nums font-bold">
                        {totalItemsCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums font-bold">
                        ₹{billData.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="tabular-nums font-bold">
                        ₹{billData.discount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST / Tax (5%)</span>
                      <span className="tabular-nums font-bold">
                        ₹{billData.tax.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-b border-dashed border-neutral-400 my-3" />

                  {/* INVOICE FINAL NET GRAND TOTAL */}
                  <div className="flex justify-between items-center text-xs font-mono font-black text-neutral-900 uppercase">
                    <span>Total Amount</span>
                    <span className="text-sm tabular-nums font-black border-b-2 border-double border-black pb-0.5">
                      ₹{billData.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* BARCODE LOGIC */}
                  <div className="flex flex-col items-center justify-center mt-5 space-y-1">
                    <Barcode
                      value={billData.billNo.replace(/[^A-Z0-9]/gi, "")}
                      format="CODE128"
                      width={1.2}
                      height={25}
                      displayValue={false}
                      margin={0}
                      background="white"
                    />
                    <span className="text-[8px] font-mono tracking-widest text-neutral-500 mt-1">
                      {billData.billNo}
                    </span>
                  </div>

                  {/* PAYMENT STATUS WATERMARK STAMP */}
                  <div className="my-4 flex justify-center">
                    <div
                      className={`text-[10px] font-mono font-black tracking-widest uppercase border-2 px-3 py-1 rounded rotate-[-3deg] ${
                        isPaymentReceived
                          ? "border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500"
                          : "border-red-600 text-red-600 dark:border-red-500 dark:text-red-500"
                      }`}
                    >
                      {isPaymentReceived ? "● PAID RECEIVED" : "● PAYMENT DUE"}
                    </div>
                  </div>

                  {/* DECORATIVE JAGGED CUT PAPER TRAILING MARGIN EFFECT */}
                  <div className="absolute -bottom-2 left-0 right-0 h-2 bg-transparent pointer-events-none overflow-hidden flex">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SIDEBAR DASHBOARD PANELS */}
              <div className="col-span-12 md:col-span-5 flex flex-col gap-4 items-center md:items-start">
                {/* BILL DETAILS CARD */}
                <div className="w-full max-w-[390px] bg-background border rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex items-center gap-2 px-4 py-3 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold text-sm border-b">
                    <Info className="h-4 w-4" />
                    <span>Bill Details</span>
                  </div>
                  <div className="p-4 space-y-3 text-xs font-medium text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span>Bill No</span>
                      <span className="text-foreground font-semibold">
                        {billData?.billNo}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
                      <span>Date</span>
                      <span className="text-foreground font-semibold">
                        {billData?.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
                      <span>Time</span>
                      <span className="text-foreground font-semibold">
                        {billData?.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
                      <span>Items</span>
                      <span className="text-foreground font-semibold tabular-nums">
                        {totalItemsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800 pt-3 text-sm font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-base font-black tabular-nums">
                        ₹{billData?.totalAmount?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* DYNAMIC ACTION ENTRY: CONFIGURATION AND DISPLAY PANEL */}
                <div className="w-full max-w-[390px] flex flex-col gap-3">
                  {!isPaymentReceived ? (
                    <div className="bg-background border rounded-2xl p-4 space-y-4 shadow-sm">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground">
                          Select Payment Mode
                        </label>

                        {/* RADIO BUTTON GROUP */}
                        <div className="grid grid-cols-2 gap-2">
                          <label
                            className={`flex items-center justify-center gap-2 border rounded-xl py-2.5 px-3 cursor-pointer transition-all ${
                              paymentMode === "CASH"
                                ? "border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-600 font-bold"
                                : "border-input bg-background text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMode"
                              checked={paymentMode === "CASH"}
                              onChange={() => setPaymentMode("CASH")}
                              className="sr-only"
                            />
                            <span className="text-xs">💵 Cash</span>
                          </label>

                          <label
                            className={`flex items-center justify-center gap-2 border rounded-xl py-2.5 px-3 cursor-pointer transition-all ${
                              paymentMode === "ONLINE"
                                ? "border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-600 font-bold"
                                : "border-input bg-background text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMode"
                              checked={paymentMode === "ONLINE"}
                              onChange={() => setPaymentMode("ONLINE")}
                              className="sr-only"
                            />
                            <span className="text-xs">🌐 Online / UPI</span>
                          </label>
                        </div>
                      </div>

                      {/* DYNAMIC TRANSACTION ID INPUT BOX */}
                      {paymentMode === "ONLINE" && (
                        <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                          <label className="text-[11px] font-bold text-muted-foreground">
                            Transaction ID / Ref No.
                          </label>
                          <input
                            type="text"
                            placeholder="Enter UPI or Bank Ref No."
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full text-xs font-mono px-3 py-2 bg-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                          />
                        </div>
                      )}

                      {/* ACTION TRIGGER BUTTON */}
                      <Button
                        onClick={() => {
                          setConfirmedPaymentMode(paymentMode);
                          setConfirmedTxnId(transactionId);
                          setIsPaymentReceived(true);
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm h-11 rounded-xl shadow-md transition-colors"
                      >
                        Mark Payment as Received
                      </Button>
                    </div>
                  ) : (
                    /* RECEIVED PAYMENT ALERT STATUS PANEL */
                    <div className="w-full bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30 rounded-2xl p-4 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div className="space-y-0.5 w-full">
                        <div className="flex justify-between items-center w-full">
                          <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-300">
                            Payment Status
                          </h4>
                          <span className="text-[10px] bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Received
                          </span>
                        </div>

                        <div className="space-y-1 pt-2 text-[11px] font-medium text-emerald-800/80 dark:text-emerald-400/80 border-t border-emerald-500/10 dark:border-emerald-500/20 mt-2">
                          <div className="flex justify-between items-center">
                            <span>Amount Collected</span>
                            <span className="font-bold text-emerald-900 dark:text-emerald-300">
                              ₹{billData?.totalAmount?.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Payment Mode</span>
                            <span className="font-bold text-emerald-900 dark:text-emerald-300 uppercase">
                              {confirmedPaymentMode}
                            </span>
                          </div>
                          {confirmedPaymentMode === "ONLINE" &&
                            confirmedTxnId && (
                              <div className="flex justify-between items-center">
                                <span>Transaction ID</span>
                                <span className="font-mono font-bold text-emerald-900 dark:text-emerald-300">
                                  {confirmedTxnId}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* SHARE / EXPORT CARD */}
                <div className="w-full max-w-[390px] bg-background border rounded-2xl overflow-hidden shadow-sm">
                  <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50/50 dark:bg-neutral-950/20 text-foreground font-bold text-sm border-b">
                    <Share2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Share / Export</span>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs h-10 gap-2 rounded-xl">
                      <MessageSquare className="h-4 w-4 fill-current" />
                      Send via WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-bold text-xs h-10 gap-2 border rounded-xl hover:bg-muted text-foreground"
                    >
                      <Download className="h-4 w-4" />
                      Download PNG
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-bold text-xs h-10 gap-2 border rounded-xl hover:bg-muted text-foreground"
                    >
                      <FileText className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-bold text-xs h-10 gap-2 border rounded-xl hover:bg-muted text-foreground"
                    >
                      <Printer className="h-4 w-4" />
                      Print Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
